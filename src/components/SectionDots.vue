<script setup lang="ts">
import type { SnapSection } from '@/composables/sectionSnap'

defineProps<{ sections: SnapSection[]; active: number }>()
defineEmits<{ go: [index: number] }>()
</script>

<template>
  <nav class="dots" aria-label="首頁區塊導覽">
    <ul>
      <li v-for="(s, i) in sections" :key="s.label">
        <button
          type="button"
          class="dots__btn"
          :class="{ 'is-active': i === active }"
          :aria-current="i === active ? 'true' : undefined"
          @click="$emit('go', i)"
        >
          <span class="dots__label">{{ s.label }}</span>
          <span class="dots__dot" aria-hidden="true"></span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.dots {
  position: fixed;
  right: 20px;
  top: 50%;
  z-index: 90;
  transform: translateY(-50%);
}

.dots ul {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 10px 30px -14px rgba(34, 34, 34, 0.35);
  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
}

.dots__btn {
  position: relative;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
}

.dots__dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--c-gray-300);
  transition:
    height 0.4s var(--ease-out),
    background-color 0.3s;
}

.dots__btn:hover .dots__dot {
  background: var(--c-gray);
}

.dots__btn.is-active .dots__dot {
  height: 22px;
  background: var(--c-yellow);
}

/* 滑鼠移入或鍵盤聚焦時，於左側顯示區塊名稱 */
.dots__label {
  position: absolute;
  right: calc(100% + 14px);
  top: 50%;
  padding: 4px 12px;
  border-radius: 999px;
  background: var(--c-text);
  color: #fff;
  font-size: 0.8rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transform: translate(6px, -50%);
  transition:
    opacity 0.25s,
    transform 0.25s var(--ease-out);
}

.dots__btn:hover .dots__label,
.dots__btn:focus-visible .dots__label {
  opacity: 1;
  transform: translate(0, -50%);
}

/* 側邊留白不足時隱藏，避免壓到內容與案例箭頭（快捷捲動仍可使用） */
@media (max-width: 1399px) {
  .dots {
    display: none;
  }
}
</style>
