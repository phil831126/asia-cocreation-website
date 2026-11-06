<script setup lang="ts">
/**
 * 首頁最底層的背景點綴：網點、虛線與幾何圖形，透明度約 6～10%。
 * 放在所有區塊後方（z-index: -1），只會在沒有底色的區塊之間透出來；不攔截滑鼠操作。
 * 位置以整頁高度的百分比定位，頁面變長或變短時會跟著分布。
 */
</script>

<template>
  <div class="bd" aria-hidden="true">
    <!-- 網點 -->
    <span class="bd__dots bd__dots--a"></span>
    <span class="bd__dots bd__dots--b"></span>
    <span class="bd__dots bd__dots--c"></span>

    <!-- 橫跨畫面的虛線弧線 -->
    <svg class="bd__curve bd__curve--a" viewBox="0 0 1440 220" preserveAspectRatio="none">
      <path d="M-20 170 C 260 40, 520 210, 820 110 S 1260 20, 1460 90" />
    </svg>
    <svg class="bd__curve bd__curve--b" viewBox="0 0 1440 220" preserveAspectRatio="none">
      <path d="M-20 60 C 300 190, 640 10, 940 120 S 1300 200, 1460 140" />
    </svg>

    <!-- 幾何圖形 -->
    <svg class="bd__shape bd__ring" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="52" />
      <circle cx="60" cy="60" r="34" class="bd__dash" />
    </svg>
    <svg class="bd__shape bd__tri" viewBox="0 0 100 100">
      <path d="M50 10 L92 86 L8 86 Z" />
    </svg>
    <svg class="bd__shape bd__plus" viewBox="0 0 120 60">
      <path d="M14 22 V38 M6 30 H22 M60 8 V24 M52 16 H68 M100 34 V50 M92 42 H108" />
    </svg>
    <svg class="bd__shape bd__square" viewBox="0 0 100 100">
      <rect x="14" y="14" width="72" height="72" rx="10" class="bd__dash" />
    </svg>
    <svg class="bd__shape bd__lens" viewBox="0 0 120 120">
      <circle cx="50" cy="50" r="34" />
      <path d="M75 75 L106 106" />
    </svg>
    <span class="bd__blob bd__blob--a"></span>
    <span class="bd__blob bd__blob--b"></span>
  </div>
</template>

<style scoped>
.bd {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

.bd > * {
  position: absolute;
}

/* ---------- 網點 ---------- */
.bd__dots {
  background-image: radial-gradient(#222 1.3px, transparent 1.5px);
  background-size: 20px 20px;
  -webkit-mask-image: radial-gradient(ellipse, #000 35%, transparent 72%);
  mask-image: radial-gradient(ellipse, #000 35%, transparent 72%);
  opacity: 0.08;
}

.bd__dots--a {
  left: -60px;
  top: 14%;
  width: 360px;
  height: 300px;
}

.bd__dots--b {
  right: -40px;
  top: 47%;
  width: 420px;
  height: 340px;
}

.bd__dots--c {
  left: 30%;
  top: 80%;
  width: 380px;
  height: 260px;
}

/* ---------- 虛線弧線 ---------- */
.bd__curve {
  left: 0;
  width: 100%;
  height: 220px;
  overflow: visible;
}

.bd__curve path {
  fill: none;
  stroke: #222;
  stroke-width: 1.5;
  stroke-dasharray: 5 10;
  stroke-linecap: round;
  vector-effect: non-scaling-stroke;
  opacity: 0.08;
}

.bd__curve--a {
  top: 24%;
}

.bd__curve--b {
  top: 66%;
}

/* ---------- 幾何圖形 ---------- */
.bd__shape {
  overflow: visible;
}

.bd__shape :is(circle, path, rect) {
  fill: none;
  stroke: #222;
  stroke-width: 2;
  stroke-linecap: round;
  vector-effect: non-scaling-stroke;
}

.bd__dash {
  stroke-dasharray: 4 7;
}

.bd__ring {
  right: 6%;
  top: 9%;
  width: 150px;
  opacity: 0.08;
}

.bd__tri {
  left: 7%;
  top: 38%;
  width: 90px;
  opacity: 0.07;
  transform: rotate(-12deg);
}

.bd__plus {
  right: 12%;
  top: 33%;
  width: 120px;
  opacity: 0.1;
}

.bd__square {
  left: 4%;
  top: 60%;
  width: 110px;
  opacity: 0.07;
  transform: rotate(14deg);
}

.bd__lens {
  right: 8%;
  top: 86%;
  width: 130px;
  opacity: 0.08;
}

/* 品牌黃的柔和圓形 */
.bd__blob {
  border-radius: 50%;
  background: var(--c-yellow);
  opacity: 0.06;
}

.bd__blob--a {
  left: 42%;
  top: 4%;
  width: 220px;
  height: 220px;
}

.bd__blob--b {
  right: 20%;
  top: 74%;
  width: 160px;
  height: 160px;
}

/* 手機：圖形縮小、減少數量，避免畫面太滿 */
@media (max-width: 767px) {
  .bd__dots--a,
  .bd__dots--b,
  .bd__dots--c {
    width: 240px;
    height: 200px;
  }

  .bd__ring {
    width: 96px;
  }

  .bd__tri,
  .bd__square {
    width: 64px;
  }

  .bd__plus,
  .bd__lens,
  .bd__blob--b {
    display: none;
  }

  .bd__blob--a {
    width: 140px;
    height: 140px;
  }
}
</style>
