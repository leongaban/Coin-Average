<script setup lang="ts">
import SearchHeader from '../components/SearchHeader.vue';
</script>

<template>
  <main className="main-container">
    <div className="parent">
      <div className="left-column">
        <h1 id="main-logo">COIN AVERAGE</h1>
        <!-- Left Side Bar -->
      </div>
      <div className="center-column">Crypto Tables</div>
      <div className="right-column">
        <section>
          <SearchHeader />
        </section>
      </div>
    </div>
  </main>
</template>
