<script setup lang="ts">
import { ref, computed } from 'vue'
import { defineProps } from 'vue'
import type { Coin } from '../constants/coins-to-search'
import { formatPrice } from '../utils/formatters'

const amountVal = ref('')
const priceVal = ref('')
const emits = defineEmits(['remove'])

const total = computed(() => {
  const amount = Number(amountVal.value)
  const price = Number(priceVal.value)

  if (isNaN(amount) || isNaN(price)) {
    return ''
  }

  return formatPrice(amount * price)
})

const removeCoin = () => emits('remove', props.coin)

const props = defineProps<{
  coin: Coin
}>()
</script>

<template>
  <div class="va-table-responsive">
    <div class="table-col-header">
      <h2>{{ coin.name }}</h2>
      <button class="btn-remove-coin" @click="removeCoin">Remove Coin</button>
    </div>
    <p>Current price: {{ formatPrice(coin.price) }}</p>
    <table class="va-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="td-date">
            <input type="date" />
          </td>
          <td class="td-amount">
            <input type="number" v-model="amountVal" />
          </td>
          <td class="td-price">
            <input type="number" v-model="priceVal" />
          </td>
          <td class="td-total">{{ total }}</td>
        </tr>
        <tr class="td-button">
          <td colspan="4">
            <button>Add row</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
