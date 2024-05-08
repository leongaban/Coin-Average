import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Coin } from '../types/coins'

export const useCoinsStore = defineStore('coinsStore', () => {
  const name = 'coinsStore'
  let loadingCoins = ref(false)
  let coins = ref<Coin[]>([])

  // ? Total Portfolio Value
  const totalValue = computed(() =>
    coins.value.reduce((acc, coin: Coin) => acc + (coin.total ?? 0), 0),
  )

  const getCoins = async () => {
    try {
      loadingCoins.value = true
      const res = await fetch('http://localhost:3000/coins')
      const data = await res.json()
      loadingCoins.value = false
      coins.value = data
    } catch (error) {
      console.error(error)
    }
  }

  // ? Add Coin
  const addCoin = async (coin: Coin): Promise<boolean> => {
    const exists = coins.value.some(existingCoin => existingCoin.id === coin.id)
    if (!exists) {
      coins.value = [...coins.value, coin]

      loadingCoins.value = true
      try {
        await fetch('http://localhost:3000/coins', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(coin),
        })
      } catch (error) {
        console.error('Failed to save coin:', error)
        loadingCoins.value = false
        return false
      }
      loadingCoins.value = false
      return true
    } else {
      console.warn('Attempted to add a coin that already exists:', coin.name)
      return false
    }
  }

  // ? Update Coin Price
  const updateCoinPrice = (coinId: string, price: number) => {
    const index = coins.value.findIndex(c => c.id === coinId)
    if (index !== -1) {
      coins.value[index].price = price
    }
  }

  // ? Remove Coin
  const removeCoin = async (coin: Coin) => {
    const index = coins.value.findIndex(c => c.id === coin.id)
    if (index !== -1) {
      coins.value.splice(index, 1)
    }

    const res = await fetch(`http://localhost:3000/coins/${coin.id}`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      console.error(res.statusText)
    }
  }

  // ? Reset State
  const resetState = async () => {
    const currentCoins = [...coins.value]
    for (const coin of currentCoins) {
      try {
        const res = await fetch(`http://localhost:3000/coins/${coin.id}`, {
          method: 'DELETE',
        })
        if (!res.ok) throw new Error(res.statusText)

        const index = coins.value.findIndex(c => c.id === coin.id)
        if (index !== -1) {
          coins.value.splice(index, 1)
        }
      } catch (error) {
        console.error('Failed to delete coin:', coin.name, error)
      }
    }
  }

  return {
    name,
    loadingCoins,
    coins,
    totalValue,
    getCoins,
    addCoin,
    updateCoinPrice,
    removeCoin,
    resetState,
  }
})
