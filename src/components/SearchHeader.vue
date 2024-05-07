<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import coins_to_search from '../constants/coins-to-search'
import type { Coin } from '../constants/coins-to-search'
import { useCoinsStore } from '../stores/coins'

const coinsStore = useCoinsStore()

const emit = defineEmits(['coinSelected'])
const inputValue = ref('')
const filteredCoins = ref<Coin[]>([])

onMounted(() => {
  coinsStore.getCoins()
})

watch(inputValue, (newValue: string) => {
  if (newValue.length === 0) {
    filterCoins('  ')
  }

  if (newValue.length > 1) {
    filterCoins(newValue)
  }
})

const filterCoins = (input: string) => {
  filteredCoins.value = coins_to_search.filter(
    coin =>
      coin.name.toLowerCase().includes(input.toLowerCase()) ||
      coin.id.toLowerCase().includes(input.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(input.toLowerCase()),
  )
}

const resetSearchInput = () => {
  inputValue.value = ''
  filterCoins('  ')
}

const selectCoin = (coin: Coin) => {
  if (coin) {
    emit('coinSelected', coin)
    resetSearchInput()
  }
}
</script>

<template>
  <div id="search-container">
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
          @click="selectCoin(coin)"
        >
          {{ coin.name }}
        </li>
      </ul>
    </div>
    <div class="render-state mt-8">
      <pre class="source-code-pro">
        <h4>Pinia state: {{ coinsStore.name }}</h4>
        <p v-for="coin in coinsStore.coins">{{ coin }}</p>
      </pre>
    </div>
  </div>
</template>
