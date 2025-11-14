<template>
    <div class="flex flex-wrap items-center gap-2">
      <span
        class="chip"
        :class="{'chip--active': ui.selectedTags.length === 0}"
        @click="clearAll"
        title="顯示全部"
      >全部</span>
  
      <span
        v-for="tag in allTags"
        :key="tag"
        class="chip"
        :class="{'chip--active': ui.selectedTags.includes(tag)}"
        @click="toggle(tag)"
      >
        #{{ tag }}
      </span>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { useTaskStore } from '@/stores/taskStore'
  import { useUiStore } from '@/stores/uiStore'
  
  const taskStore = useTaskStore()
  const ui = useUiStore()
  
  const allTags = computed(() => {
    const set = new Set<string>()
    for (const t of taskStore.tasks) {
      for (const tag of t.tags ?? []) set.add(tag)
    }
    // 排序
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  })
  
  function toggle(tag: string) {
    ui.toggleTag(tag)
  }
  function clearAll() {
    ui.clearFilters()
  }
  </script>
  