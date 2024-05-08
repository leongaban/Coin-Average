<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { defineProps } from 'vue'
import type { Coin, CoinRow } from '../types/coins'
import { formatPrice } from '../utils/formatters'
import TableRow from './TableRow.vue'
import { useCoinsStore } from '../stores/coins'

const coinsStore = useCoinsStore()
const dateVal = ref('')
const amountVal = ref('')
const priceVal = ref('')
const coinRows = ref<CoinRow[]>([])
const emits = defineEmits(['remove'])

const total = computed(() => {
  const amount = Number(amountVal.value)
  const price = Number(priceVal.value)

  if (isNaN(amount) || isNaN(price)) {
    return ''
  }

  return formatPrice(amount * price)
})

onMounted(() => {
  coinsStore.getCoins()
})

const addCoinRow = () => {
  console.log(dateVal.value, amountVal.value, priceVal.value)

  coinRows.value.push({
    id: Math.random().toString(36).substr(2, 9),
    date: dateVal.value,
    amount: Number(amountVal.value),
    price: Number(priceVal.value),
    total: Number(amountVal.value) * Number(priceVal.value),
  })

  dateVal.value = ''
  amountVal.value = ''
  priceVal.value = ''
}

const removeCoin = () => emits('remove', props.coin)

const props = defineProps<{
  coin: Coin
}>()
</script>

<template>
  <div class="va-table-responsive">
    <div class="table-col-header">
      <h2>{{ coin.name }}</h2>
      <div class="coin-portfolio-value">Portfolio Value: $100,000</div>
      <button class="btn-remove-coin" @click="removeCoin">✖</button>
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
        <TableRow
          v-for="coinRow in coinRows"
          :key="coinRow.id"
          :coinRow="coinRow"
        />

        <tr>
          <td class="td-date">
            <input type="date" v-model="dateVal" />
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
            <button @click="addCoinRow">Add row</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
