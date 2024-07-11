<script setup lang="ts">
import { ref, computed, onMounted, onUpdated } from 'vue'
import { storeToRefs } from 'pinia'
import type { Coin, CoinRow } from '../types/coins'
import { formatPrice } from '../utils/formatters'
import TableRow from './TableRow.vue'
import { useCoinsStore } from '../stores/coins'

const coinsStore = useCoinsStore()
const dateVal = ref('')
const amountVal = ref('')
const priceVal = ref('')
const avgPriceVal = ref('')
const coinPortfolioVal = ref(0)
const coinRows = ref<CoinRow[]>([])
const emits = defineEmits(['remove'])

const props = defineProps<{
  coin: Coin
}>()

const total = computed(() => {
  const amount = Number(amountVal.value)
  const price = Number(priceVal.value)

  if (isNaN(amount) || isNaN(price)) {
    return ''
  }

  return formatPrice(amount * price)
})

const { coins } = storeToRefs(coinsStore)

onMounted(() => {
  coinsStore.getCoins()
  console.log(
    `TableColumn onMounted coins for coin: ${props.coin.name}:`,
    coins.value,
  )

  if (coins.value && coins.value.length > 0) {
    const coin = coins.value.find(coin => coin.id === props.coin.id)
    if (coin && coin.coinRows) {
      coinRows.value = coin.coinRows
      coinPortfolioVal.value = coin.coinRows.reduce(
        (acc, row) => acc + row.total,
        0,
      )
    }
  }
  const totalAmount = coinRows.value.reduce((acc, row) => acc + row.amount, 0)

  const totalPrice = coinRows.value.reduce((acc, row) => acc + row.total, 0)

  avgPriceVal.value = (totalPrice / totalAmount).toFixed(2)
})

onUpdated(() => {
  // console.log('TableColumn onUpdated coins:', coins)
})

const addCoinRow = () => {
  const coinRowObject = {
    id: props.coin.id,
    date: dateVal.value,
    amount: Number(amountVal.value),
    price: Number(priceVal.value),
    total: Number(amountVal.value) * Number(priceVal.value),
  }

  coinRows.value.push(coinRowObject)

  coinPortfolioVal.value = coinRows.value.reduce(
    (acc, row) => acc + row.total,
    0,
  )

  coinsStore.addCoinRow(coinRowObject)

  dateVal.value = ''
  amountVal.value = ''
  priceVal.value = ''
}

const removeCoin = () => emits('remove', props.coin)
</script>

<template>
  <div class="va-table-responsive">
    <div class="table-col-header">
      <h2>{{ coin.name }}</h2>
      <div class="coin-portfolio-value">
        Portfolio: {{ formatPrice(coinPortfolioVal) }}
      </div>
      <button class="btn-remove-coin" @click="removeCoin">✖</button>
    </div>
    <p>Current price: {{ formatPrice(coin.price) }}</p>
    <p>Average price: ${{ avgPriceVal }}</p>
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
