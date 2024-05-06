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

watch(props.portfolio, (newValue: Coin[]) => {
  console.log('newValue', newValue)
  console.log('newValue', newValue[0])
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
          {{ coin.symbol.toUpperCase() }}
        </div>
      </div>
    </header>
  </div>
</template>
