<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Coin } from '../constants/coins-to-search'
const portfolioCoins = ref<Coin[]>([])

const props = defineProps({
  portfolio: {
    type: Array as () => Coin[],
    required: true,
  },
})

const formatPrice = (price: number | undefined): string => {
  if (price !== undefined) {
    // Check if the price is less than 1
    if (price < 1) {
      // Return the price without any formatting
      return price.toString()
    } else {
      // Format the price with commas for thousands separators and 2 decimal places, and add $ sign
      return `$${price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
    }
  }
  return ''
}

watch(props.portfolio, (newValue: Coin[]) => {
  console.group('Tables')
  portfolioCoins.value = newValue as Coin[]
  console.log('portfolioCoins:', portfolioCoins.value)
})

console.log('Portfolio:', props.portfolio)
</script>

<template>
  <div id="tables-container">
    <header>
      <div class="portfolio-tags">
        <div v-for="coin in portfolioCoins" :key="coin.id" class="tag">
          {{ coin.symbol.toUpperCase() }} ({{ formatPrice(coin.price) }})
        </div>
      </div>
    </header>
  </div>
</template>
