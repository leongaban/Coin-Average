<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Coin } from '../constants/coins-to-search'
import TableColumn from './TableColumn.vue'
import { formatPrice } from '../utils/formatters'

const portfolioCoins = ref<Coin[]>([])

const props = defineProps({
  portfolio: {
    type: Array as () => Coin[],
    required: true,
  },
})

watch(props.portfolio, (newValue: Coin[]) => {
  console.group('Tables')
  portfolioCoins.value = newValue as Coin[]
  console.log('portfolioCoins:', portfolioCoins.value)
})

console.log('Portfolio:', props.portfolio)
</script>

<template>
  <div id="tables-container">
    <div class="table-columns">
      <div v-for="coin in portfolioCoins" :key="coin.id" class="coin-table">
        <TableColumn :coin="coin" />
      </div>
    </div>
  </div>
</template>
