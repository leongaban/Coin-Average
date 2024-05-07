<script setup lang="ts">
import { defineProps } from 'vue'
import type { Coin } from '../constants/coins-to-search'
import TableColumn from './TableColumn.vue'
import { useCoinsStore } from '../stores/coins'

// Access the coins store
const coinsStore = useCoinsStore()

// Define props to receive the coins array
const props = defineProps<{
  portfolio: Coin[]
}>()

// Define a method to handle removal of a coin
const onRemoveCoin = (coinToRemove: Coin) => {
  // Instead of managing a local state, directly use the store's method to remove a coin
  coinsStore.removeCoin(coinToRemove)
}
</script>

<template>
  <div id="tables-container">
    <div class="table-columns">
      <div v-if="props.portfolio.length === 0" class="empty-portfolio">
        <p class="text-center">
          Your portfolio is empty. Search for a coin to add it to your
          portfolio.
        </p>
      </div>
      <div v-for="coin in props.portfolio" :key="coin.id" class="coin-table">
        <TableColumn :coin="coin" @remove="onRemoveCoin" />
      </div>
    </div>
  </div>
</template>
