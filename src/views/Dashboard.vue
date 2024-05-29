<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, onMounted, onUpdated } from 'vue'
// import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import SearchHeader from '../components/SearchHeader.vue'
import TablesContainer from '../components/TablesContainer.vue'
import type { Coin } from '../types/coins'
import { useCoinsStore } from '../stores/coins'

const coinsStore = useCoinsStore()
const { coins, loadingCoins } = storeToRefs(coinsStore)
// const router = useRouter()

const KEY_NAME: string = import.meta.env.VITE_CG_API_KEY_NAME || ''
const API_KEY: string = import.meta.env.VITE_CG_API_KEY || ''

const selectedCoin = ref<Coin>()
const toast = useToast()

onMounted(() => {
  coinsStore.getCoins()
})

onUpdated(() => {
  // console.log('Dashboard onUpdated coins:', coins)
})

const fetchCoinData = async (id: string): Promise<number | null> => {
  const errorMessage = `Failed to fetch current price for ${id}.`
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}?${KEY_NAME}=${API_KEY}`,
    )
    const json = await response.json()
    const currentPriceUSD = json?.market_data?.current_price?.usd
    return currentPriceUSD || null
  } catch (error) {
    console.error(errorMessage)
    toast.error(errorMessage)
    return null
  }
}

const handleCoinSelected = async (value: Coin) => {
  selectedCoin.value = value
  const searchedCoin = selectedCoin.value
  const { name: coinName, id } = searchedCoin

  // ? Add the coin to the Pinia store
  const wasAdded = await coinsStore.addCoin(searchedCoin)
  const errorMessage = `Failed to fetch current price for ${coinName}.`

  console.log('wasAdded:', wasAdded)

  if (wasAdded) {
    toast.success(`Start tracking ${coinName} in your portfolio!`)
  } else {
    toast.error(`${coinName} is already in your portfolio.`)
  }

  try {
    // ? Fetch the current price for the selected coin
    const currentPriceUSD = await fetchCoinData(id)

    if (currentPriceUSD !== null) {
      coinsStore.updateCoinPrice(id, currentPriceUSD)
    } else {
      toast.error(errorMessage)
      console.warn(errorMessage)
    }
  } catch (error) {
    toast.error(errorMessage)
    console.error(errorMessage, error)
  }
}
</script>

<template>
  <div class="big-parent">
    <div></div>
    <main class="main-container">
      <div class="parent">
        <div class="left-column">
          <h1 class="va-h1">COIN AVERAGE</h1>
        </div>
        <div class="center-column">
          <div class="loading" v-if="loadingCoins">Loading coin...</div>
          <TablesContainer :portfolio="coins" />
        </div>
        <div class="right-column">
          <section>
            <SearchHeader @coinSelected="handleCoinSelected" />
          </section>
        </div>
      </div>
    </main>
    <div></div>
  </div>
</template>
