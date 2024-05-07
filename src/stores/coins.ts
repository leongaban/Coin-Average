import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Coin } from '../constants/coins-to-search'

export const useCoinsStore = defineStore('coinsStore', () => {
  const name = 'coinsStore'
  const coins = ref<Coin[]>([])

  // ? Total Portfolio Value
  const totalValue = computed(() =>
    coins.value.reduce((acc, coin: Coin) => acc + (coin.total ?? 0), 0),
  )

  // ? Add Coin
  const addCoin = (coin: Coin) => coins.value.push(coin)

  // ? Remove Coin
  const removeCoin = (coin: Coin) => {
    const index = coins.value.findIndex(c => c.id === coin.id)
    if (index !== -1) {
      coins.value.splice(index, 1)
    }
  }

  return { name, coins, totalValue, addCoin, removeCoin }
})
