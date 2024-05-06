<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import SearchHeader from '../components/SearchHeader.vue'
import TablesContainer from '../components/TablesContainer.vue'
import type { Coin } from '../constants/coins-to-search'

const KEY_NAME: string = import.meta.env.VITE_CG_API_KEY_NAME || ''
const API_KEY: string = import.meta.env.VITE_CG_API_KEY || ''

const selectedCoin = ref<Coin>()
const portfolioCoins = ref<Coin[]>([])
const toast = useToast()

const fetchCoinData = async (id: string): Promise<number | null> => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}?${KEY_NAME}=${API_KEY}`,
    )
    const json = await response.json()
    const currentPriceUSD = json?.market_data?.current_price?.usd
    return currentPriceUSD || null
  } catch (error) {
    console.error('Error fetching coin data:', error)
    return null
  }
}

const handleCoinSelected = async (value: Coin) => {
  selectedCoin.value = value
  const searchedCoin = selectedCoin.value
  const { name: coinName, id } = searchedCoin
  portfolioCoins.value.push(searchedCoin)
  toast.success(`Start tracking ${coinName} in your portfolio!`)
  console.group('Dashboard')
  console.log('searchedCoin', searchedCoin)

  // const fetchPromises: Promise<any>[] = portfolioCoins.value.map(coin =>
  //   fetchCoinData(coin.name),
  // )

  try {
    // Fetch the current price for the selected coin
    const currentPriceUSD = await fetchCoinData(id)

    if (currentPriceUSD !== null) {
      searchedCoin.price = currentPriceUSD
    } else {
      console.warn('Failed to fetch current price for', coinName)
    }

    // Update the portfolioCoins array with the modified coin object
    const index = portfolioCoins.value.findIndex(
      coin => coin.id === searchedCoin.id,
    )
    if (index !== -1) {
      portfolioCoins.value.splice(index, 1, searchedCoin)
    } else {
      console.warn('Coin not found in portfolio:', coinName)
    }
  } catch (error) {
    console.error('Error handling selected coin:', error)
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
          <TablesContainer :portfolio="portfolioCoins" />
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
