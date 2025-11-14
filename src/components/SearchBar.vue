<template>
    <div class="relative">
      <input
        class="search pl-9"
        type="text"
        :value="text"
        placeholder="搜尋標題/描述/標籤…"
        @input="onInput"
      />
      <span class="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔎</span>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watchEffect } from 'vue'
  import { useUiStore } from '@/stores/uiStore'
  
  const ui = useUiStore()
  const text = ref(ui.searchText)
  
  // debounce
  let timer: number | undefined
  function onInput(e: Event) {
    const v = (e.target as HTMLInputElement).value
    text.value = v
    clearTimeout(timer)
    timer = window.setTimeout(() => {
      ui.setSearch(v)
    }, 180)
  }
  
  watchEffect(() => { if (ui.searchText !== text.value) text.value = ui.searchText })
  </script>
  