<script setup lang="ts">
import type { Coin } from '../types/coins'
import TableColumn from './TableColumn.vue'
import { useCoinsStore } from '../stores/coins'

const coinsStore = useCoinsStore()

const props = defineProps<{
  portfolio: Coin[]
}>()

const onRemoveCoin = (coinToRemove: Coin) => {
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
