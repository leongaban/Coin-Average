<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import SearchHeader from '../components/SearchHeader.vue'
import TablesContainer from '../components/TablesContainer.vue'
import type { Coin } from '../constants/coins-to-search'

const selectedCoin = ref<Coin>()
const portfolioCoins = ref<Coin[]>([])
const toast = useToast()

const handleCoinSelected = (value: Coin) => {
  console.group('Dashboard')
  selectedCoin.value = value
  const searchedCoin = selectedCoin.value
  const { name: coinName } = searchedCoin
  portfolioCoins.value.push(searchedCoin)
  console.log('searchedCoin', searchedCoin)
  toast.success(`Start tracking ${coinName} in your portfolio!`)
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
