<script setup lang="ts">
import { computed } from 'vue'
import type { CoinRow } from '../types/coins'
import { formatPrice, parsePrice } from '../utils/formatters'

const props = defineProps<{
  coinRow: CoinRow
}>()

const formattedPrice = computed({
  get: () => formatPrice(props.coinRow.price),
  set: value => {
    props.coinRow.price = parsePrice(value)
  },
})
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
      <input type="text" v-model="formattedPrice" />
    </td>
    <td class="td-total">{{ formatPrice(coinRow.total) }}</td>
  </tr>
</template>

<!-- TODO
  - TODO 1: Changing Amount or Price should update the Total and Portfolio Value
  - TODO 2: Changing Date should update the CoinRow
-->
