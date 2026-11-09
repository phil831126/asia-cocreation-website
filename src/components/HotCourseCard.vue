<script setup lang="ts">
/*
 * 首頁 Hero 右側：熱門課程圖卡（固定一張，不輪播）
 * 顯示試算表「亞創網站｜熱門課程」排序最前面的一筆；課程總覽頁的輪播使用同一份資料。
 */
import HotCourseItem from './HotCourseItem.vue'
import { useHotCourse } from '@/composables/sheetData'

const { course } = useHotCourse()
</script>

<template>
  <section class="hot" aria-label="熱門課程">
    <HotCourseItem :course="course" />

    <div class="hot__foot">
      <RouterLink to="/cases" class="hot__all">課程總覽</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.hot {
  width: 100%;
}

/* ---------- 下方連結 ---------- */
.hot__foot {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.8vh;
}

.hot__all {
  padding: 2px 0;
  font-size: 0.85rem;
  font-weight: 700;
  border-bottom: 2px solid var(--c-yellow);
}

.hot__all:hover {
  color: var(--c-yellow-deep);
}
</style>
