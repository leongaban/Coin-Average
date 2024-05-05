<script setup lang="ts">
import { ref, watch } from 'vue';
import coins_to_search from '../constants/coins-to-search';
import type { Coin } from '../constants/coins-to-search';

const inputValue = ref('');
const filteredCoins = ref<Coin[]>([]);

watch(inputValue, (newValue: string) => {
  if (newValue.length > 1) {
    filterCoins(newValue);
  }
  console.log('filteredCoins', filteredCoins.value);
});

const filterCoins = (input: string) => {
  filteredCoins.value = coins_to_search.filter(coin =>
    coin.name.toLowerCase().includes(input.toLowerCase())
  );
};

// Initialize filteredCoins with an empty array
filterCoins('');

</script>

<template>
  <div id="search-container">
      <header class="flex items-center justify-between">
        <div class="flex w-full flex-wrap md:flex-nowrap gap-4">
          <input
            type="text"
            color="default"
            label="Coin Search"
            v-model="inputValue"
          />
        </div>
      </header>
    </div>
</template>
