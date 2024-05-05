<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue'
import coins_to_search from '../constants/coins-to-search'
import type { Coin } from '../constants/coins-to-search'

const emit = defineEmits(['coinSelected'])
const inputValue = ref('')
const filteredCoins = ref<Coin[]>([])

watch(inputValue, (newValue: string) => {
  if (newValue.length === 0) {
    filterCoins('  ')
  }

  if (newValue.length > 1) {
    filterCoins(newValue)
  }
  console.log('filteredCoins', filteredCoins.value)
})

const filterCoins = (input: string) => {
  filteredCoins.value = coins_to_search.filter(
    coin =>
      coin.name.toLowerCase().includes(input.toLowerCase()) ||
      coin.id.toLowerCase().includes(input.toLowerCase())
  )
}

const selectCoin = (value: string) => {
  console.group('SearchHeader')
  console.log(value)
  if (value) {
    emit('coinSelected', value)
  }
  filterCoins('  ')
}

// Initialize filteredCoins with an empty array
filterCoins('  ')
</script>

<template>
  <div id="search-container">
    <header class="flex items-center justify-between">
      <div class="flex w-full flex-wrap md:flex-nowrap gap-4">
        <input
          type="text"
          color="default"
          label="Coin Search"
          placeholder="Search Coins"
          v-model="inputValue"
        />
        <div v-if="filteredCoins.length > 0" class="search-selection">
          <ul>
            <li
              v-for="coin in filteredCoins"
              :key="coin.id"
              @click="selectCoin(coin.name)"
            >
              {{ coin.name }}
            </li>
          </ul>
        </div>
      </div>
    </header>
  </div>
</template>
