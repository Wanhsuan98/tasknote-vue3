<template>
    <div class="modal-backdrop" @click="onBackdrop">
      <section class="modal-panel" @click.stop>
        <header class="flex items-center justify-between mb-3">
          <h2 class="text-lg font-semibold">
            {{ isEdit ? '編輯任務' : '新增任務' }}
          </h2>
          <button class="btn btn--danger" @click="close">關閉</button>
        </header>
  
        <form @submit.prevent="onSubmit" novalidate>
          <!-- 標題 -->
          <label class="label" for="title">標題 *</label>
          <input id="title" v-model.trim="form.title" class="input" placeholder="輸入任務標題" />
          <p v-if="errors.title" class="error">{{ errors.title }}</p>
  
          <!-- 描述 -->
          <label class="label mt-3" for="desc">描述</label>
          <textarea id="desc" v-model.trim="form.description" class="input" rows="3" placeholder="補充說明"></textarea>
  
          <!-- 標籤 -->
          <label class="label mt-3" for="tags">標籤（以逗號分隔）</label>
          <input id="tags" v-model="form.tagsText" class="input" placeholder="例如：work, urgent" />
          <p class="helper">會自動拆成陣列：["work","urgent"]</p>
  
          <!-- 日期 -->
          <label class="label mt-3" for="due">截止日</label>
          <input id="due" v-model="form.dueDate" class="input" type="date" />
          <p v-if="errors.dueDate" class="error">{{ errors.dueDate }}</p>
  
          <!-- 狀態（編輯時可改；新增時預設為 todo） -->
          <div class="mt-3">
            <span class="label">狀態</span>
            <div class="flex gap-2">
              <label class="text-sm">
                <input type="radio" value="todo" v-model="form.status" /> todo
              </label>
              <label class="text-sm">
                <input type="radio" value="doing" v-model="form.status" /> doing
              </label>
              <label class="text-sm">
                <input type="radio" value="done" v-model="form.status" /> done
              </label>
            </div>
          </div>
  
          <div class="actions">
            <button type="button" class="btn btn--secondary" @click="close">取消</button>
            <button type="submit" class="btn btn--primary">
              {{ isEdit ? '更新' : '新增' }}
            </button>
          </div>
        </form>
      </section>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, onBeforeUnmount, reactive, computed } from 'vue'
  import { useTaskStore } from '@/stores/taskStore'
  import { useUiStore } from '@/stores/uiStore'
  import type { Task } from '@/types/task'
  
  const taskStore = useTaskStore()
  const ui = useUiStore()
  
  const isEdit = computed(() => !!ui.editingTaskId)
  
  type FormState = {
    title: string
    description: string
    tagsText: string
    dueDate: string // yyyy-mm-dd
    status: 'todo' | 'doing' | 'done'
  }
  
  const form = reactive<FormState>({
    title: '',
    description: '',
    tagsText: '',
    dueDate: '',
    status: 'todo',
  })
  
  const errors = reactive<{ title?: string; dueDate?: string }>({})
  
  function loadEditingTask() {
    if (!ui.editingTaskId) return
    const t = taskStore.tasks.find((x) => x.id === ui.editingTaskId)
    if (!t) return
    form.title = t.title
    form.description = t.description ?? ''
    form.tagsText = (t.tags ?? []).join(', ')
    form.dueDate = t.dueDate ?? ''
    form.status = t.status
  }
  
  /** 驗證：標題必填、日期格式 yyyy-mm-dd */
  function validate() {
    errors.title = !form.title ? '標題為必填' : undefined
    // 日期非必填；若有填，做基本檢查
    if (form.dueDate) {
      const ok = /^\d{4}-\d{2}-\d{2}$/.test(form.dueDate)
      errors.dueDate = ok ? undefined : '日期格式需為 yyyy-mm-dd'
    } else {
      errors.dueDate = undefined
    }
    return !errors.title && !errors.dueDate
  }
  
  function parseTags(text: string) {
    return text
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  }
  
  /** 送出：新增或更新 */
  function onSubmit() {
    if (!validate()) return
    const payload = {
      title: form.title,
      description: form.description || undefined,
      tags: parseTags(form.tagsText),
      dueDate: form.dueDate || undefined,
      status: form.status,
    }
  
    if (isEdit.value && ui.editingTaskId) {
      taskStore.updateTask(ui.editingTaskId, payload as Partial<Task>)
    } else {
      // 新增忽略 status，維持預設 'todo'
      taskStore.addTask({
        title: payload.title,
        description: payload.description,
        tags: payload.tags,
        dueDate: payload.dueDate,
      })
    }
    close()
  }
  
  function close() {
    ui.closeModal()
  }
  
  /** 背景點擊關閉 */
  function onBackdrop() {
    close()
  }
  
  /** Esc 關閉 */
  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') close()
  }
  
  onMounted(() => {
    loadEditingTask()
    window.addEventListener('keydown', onKeydown)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeydown)
  })
  </script>
  