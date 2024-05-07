import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Coin } from '../constants/coins-to-search'

export const useCoinsStore = defineStore('coinsStore', () => {
  const name = 'coinsStore'
  let coins = ref<Coin[]>([])

  // ? Total Portfolio Value
  const totalValue = computed(() =>
    coins.value.reduce((acc, coin: Coin) => acc + (coin.total ?? 0), 0),
  )

  const getCoins = async () => {
    try {
      const res = await fetch('http://localhost:3000/coins')
      const data = await res.json()

      coins.value = data
    } catch (error) {
      console.error(error)
    }
  }

  // ? Add Coin
  const addCoin = (coin: Coin) => coins.value.push(coin)

  // ? Remove Coin
  const removeCoin = (coin: Coin) => {
    const index = coins.value.findIndex(c => c.id === coin.id)
    if (index !== -1) {
      coins.value.splice(index, 1)
    }
  }

  return { name, coins, totalValue, getCoins, addCoin, removeCoin }
})
