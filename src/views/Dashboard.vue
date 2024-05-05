<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import SearchHeader from '../components/SearchHeader.vue'

const selectedCoinName = ref('')
const toast = useToast()

const handleCoinSelected = (value: string) => {
  console.group('Dashboard')
  selectedCoinName.value = value
  console.log('selectedCoinName', selectedCoinName.value)
  toast.success(`Start tracking your ${selectedCoinName.value} portfolio!`)
}
</script>

<template>
  <main class="main-container">
    <div class="parent">
      <div class="left-column">
        <h1 class="va-h1">COIN AVERAGE</h1>
        <!-- Left Side Bar -->
      </div>
      <div class="center-column">Crypto Tables</div>
      <div class="right-column">
        <section>
          <SearchHeader @coinSelected="handleCoinSelected" />
        </section>
      </div>
    </div>
  </main>
</template>
