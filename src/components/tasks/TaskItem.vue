<template>
    <li class="card">
      <!-- 左側內容 -->
      <div class="flex flex-col gap-1 w-full min-w-0">
        <div class="flex items-center justify-between gap-3">
          <h2
            :class="[
              'font-semibold text-base truncate',
              task.status === 'done' ? 'line-through text-slate-400' : 'text-slate-100'
            ]"
            :title="task.title"
          >
            {{ task.title }}
          </h2>
  
          <span
            :class="[
              'pill',
              task.status === 'todo' && 'pill--todo',
              task.status === 'doing' && 'pill--doing',
              task.status === 'done' && 'pill--done'
            ]"
          >
            {{ task.status }}
          </span>
        </div>
  
        <p v-if="task.description" class="text-xs text-slate-400 line-clamp-2">
          {{ task.description }}
        </p>
  
        <div v-if="task.tags.length" class="flex flex-wrap gap-1 mt-1">
          <span
            v-for="tag in task.tags"
            :key="tag"
            class="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300"
          >
            #{{ tag }}
          </span>
        </div>
      </div>
  
      <!-- 右側按鈕 -->
      <div class="flex items-center gap-2 ml-1 shrink-0">
        <button class="btn btn--secondary" @click="$emit('edit', task.id)">編輯</button>
        <button class="btn btn--primary" @click="$emit('toggle-status', task.id)">完成</button>
        <button class="btn btn--danger" @click="$emit('remove', task.id)">刪除</button>
      </div>
    </li>
  </template>
  
  <script setup lang="ts">
  import type { Task } from '@/types/task'
  
  defineProps<{ task: Task }>()
  defineEmits<{
    (e: 'toggle-status', id: string): void
    (e: 'remove', id: string): void
    (e: 'edit', id: string): void
  }>()
  </script>
  