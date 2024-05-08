<script setup lang="ts">
import type { CoinRow } from '../types/coins'

const props = defineProps<{
  coinRow: CoinRow
}>()
</script>

<template>
  <tr>
    <td class="td-date">
      <input type="date" v-model="coinRow.date" />
    </td>
    <td class="td-amount">
      <input type="number" v-model="coinRow.amount" />
    </td>
    <td class="td-price">
      <input type="number" v-model="coinRow.price" />
    </td>
    <td class="td-total">{{ coinRow.total }}</td>
  </tr>
</template>
