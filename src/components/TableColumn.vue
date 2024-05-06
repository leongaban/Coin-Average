<script setup lang="ts">
import { defineProps } from 'vue'
import type { Coin } from '../constants/coins-to-search'
import { formatPrice } from '../utils/formatters'

const props = defineProps<{
  coin: Coin
}>()
</script>

<template>
  <div class="va-table-responsive">
    <h2>{{ coin.name }}</h2>
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
        <!-- <tr v-for="user in users" :key="user.id">
          <td>{{ user.fullName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.country }}</td>
          <td>
            <VaBadge :text="user.status" :color="user.status" />
          </td>
        </tr> -->
      </tbody>
    </table>
  </div>
</template>
