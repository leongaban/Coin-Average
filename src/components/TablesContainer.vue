<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Coin } from '../constants/coins-to-search'
import TableColumn from './TableColumn.vue'
import { useCoinsStore } from '../stores/coins'

const coinsStore = useCoinsStore()

const portfolioCoins = ref<Coin[]>([])

const props = defineProps({
  portfolio: {
    type: Array as () => Coin[],
    required: true,
  },
})

const onRemoveCoin = (coinToRemove: Coin) => {
  // Remove the coin from the local state
  portfolioCoins.value = portfolioCoins.value.filter(
    coin => coin.id !== coinToRemove.id,
  )
  console.log('Coin removed:', coinToRemove)
  console.log('portfolioCoins:', portfolioCoins.value)
  // You can also update other states or stores if necessary
}

watch(props.portfolio, (newValue: Coin[]) => {
  portfolioCoins.value = newValue as Coin[]
  console.group('Tables')
  console.log('portfolioCoins:', portfolioCoins.value)
  console.log('coinStore', coinsStore.coins)
})
</script>

<template>
  <div id="tables-container">
    <div class="table-columns">
      <div v-if="portfolioCoins.length === 0" class="empty-portfolio">
        <p class="text-center">
          Your portfolio is empty. Search for a coin to add it to your
          portfolio.
        </p>
      </div>
      <div v-for="coin in portfolioCoins" :key="coin.id" class="coin-table">
        <TableColumn :coin="coin" @remove="onRemoveCoin" />
      </div>
    </div>
  </div>
</template>
