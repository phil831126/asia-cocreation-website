<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Phone, Mail, MapPin, Clock, Info } from 'lucide-vue-next'
import PageHeader from '@/components/PageHeader.vue'
import BaseButton from '@/components/BaseButton.vue'
import { contact, contactFields } from '@/data/site'

const route = useRoute()
const fieldIcons = { phone: Phone, email: Mail, address: MapPin, hours: Clock }

const needOptions = [
  { value: 'government', label: '政府委訓' },
  { value: 'enterprise', label: '企業內訓' },
  { value: 'brand', label: '品牌服務' },
  { value: 'academia', label: '產學合作' },
  { value: 'course', label: '課程諮詢' },
  { value: 'other', label: '其他' },
]

const topic = String(route.query.topic ?? '')
const form = reactive({
  name: '',
  org: '',
  email: '',
  need: needOptions.some((o) => o.value === topic) ? topic : '',
  message: '',
})
const errors = reactive<Record<string, string>>({})
const checked = ref(false)

function validate() {
  for (const k of Object.keys(errors)) delete errors[k]
  if (!form.name.trim()) errors.name = '請填寫姓名'
  if (!form.email.trim()) errors.email = '請填寫電子郵件'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = '電子郵件格式不正確'
  if (!form.need) errors.need = '請選擇合作需求'
  if (!form.message.trim()) errors.message = '請填寫留言內容'
  return Object.keys(errors).length === 0
}

function onSubmit() {
  checked.value = false
  if (!validate()) {
    const first = Object.keys(errors)[0]
    document.getElementById(`f-${first}`)?.focus()
    return
  }
  // 尚未串接後端或電子郵件服務：不送出任何資料，也不顯示「已送出」
  checked.value = true
}
</script>

<template>
  <div class="page">
    <PageHeader
      eyebrow="Contact"
      title="聯絡我們"
      desc="從需求交流到專業培訓規劃，歡迎與我們聊聊合作的可能。"
      :crumbs="[{ label: '聯絡我們' }]"
    />

    <section class="section">
      <div class="container contact">
        <aside class="info">
          <h2 class="info__title">聯絡資訊</h2>
          <ul class="info__list">
            <li v-for="f in contactFields" :key="f.key" class="info__item">
              <span class="info__icon"><component :is="fieldIcons[f.key]" :size="20" aria-hidden="true" /></span>
              <div>
                <span class="info__label">{{ f.label }}</span>
                <span v-if="contact[f.key]" class="info__value">{{ contact[f.key] }}</span>
                <span v-else class="pending-tag">待補</span>
              </div>
            </li>
          </ul>
          <p class="info__note">實際聯絡電話、電子郵件與地址待企業提供後更新。</p>
        </aside>

        <div class="form-card">
          <div class="demo-note" role="note">
            <Info :size="20" aria-hidden="true" />
            <p><strong>展示版本：</strong>此表單尚未串接後端或電子郵件寄送服務，按下按鈕不會送出任何資料。</p>
          </div>

          <form class="form" novalidate @submit.prevent="onSubmit">
            <div class="form__row">
              <div class="field" :class="{ 'has-error': errors.name }">
                <label for="f-name">姓名 <span class="req" aria-hidden="true">*</span></label>
                <input id="f-name" v-model="form.name" type="text" autocomplete="name" required :aria-invalid="!!errors.name" aria-describedby="e-name" />
                <span id="e-name" class="field__err">{{ errors.name }}</span>
              </div>
              <div class="field">
                <label for="f-org">單位名稱</label>
                <input id="f-org" v-model="form.org" type="text" autocomplete="organization" />
              </div>
            </div>

            <div class="form__row">
              <div class="field" :class="{ 'has-error': errors.email }">
                <label for="f-email">電子郵件 <span class="req" aria-hidden="true">*</span></label>
                <input id="f-email" v-model="form.email" type="email" autocomplete="email" required :aria-invalid="!!errors.email" aria-describedby="e-email" />
                <span id="e-email" class="field__err">{{ errors.email }}</span>
              </div>
              <div class="field" :class="{ 'has-error': errors.need }">
                <label for="f-need">合作需求 <span class="req" aria-hidden="true">*</span></label>
                <select id="f-need" v-model="form.need" required :aria-invalid="!!errors.need" aria-describedby="e-need">
                  <option value="" disabled>請選擇</option>
                  <option v-for="o in needOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
                </select>
                <span id="e-need" class="field__err">{{ errors.need }}</span>
              </div>
            </div>

            <div class="field" :class="{ 'has-error': errors.message }">
              <label for="f-message">留言 <span class="req" aria-hidden="true">*</span></label>
              <textarea id="f-message" v-model="form.message" rows="6" required :aria-invalid="!!errors.message" aria-describedby="e-message"></textarea>
              <span id="e-message" class="field__err">{{ errors.message }}</span>
            </div>

            <div class="form__foot">
              <p class="form__hint"><span aria-hidden="true">*</span> 為必填欄位</p>
              <BaseButton type="submit" variant="dark">檢查表單（展示）</BaseButton>
            </div>

            <div aria-live="polite">
              <p v-if="checked" class="form__result">
                欄位檢查完成。<strong>此為展示版本，訊息並未送出</strong>，正式上線前需串接表單寄送服務。
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: clamp(24px, 4vw, 56px);
  align-items: start;
}

.info {
  position: sticky;
  top: calc(var(--nav-h) + 24px);
  padding: 32px;
  border-radius: var(--radius-lg);
  background: var(--c-bg-alt);
}

.info__title {
  font-size: 1.3rem;
}

.info__list {
  display: grid;
  gap: 18px;
  margin-top: 24px;
}

.info__item {
  display: flex;
  align-items: center;
  gap: 14px;
}

.info__item > div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}

.info__icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 46px;
  height: 46px;
  border-radius: 14px;
  background: var(--c-yellow);
}

.info__label {
  font-size: 0.85rem;
  color: var(--c-text-2);
}

.info__value {
  font-weight: 500;
}

.info__note {
  margin-top: 24px;
  padding-top: 18px;
  border-top: 1px solid var(--c-line);
  font-size: 0.88rem;
  color: var(--c-text-2);
}

.form-card {
  padding: clamp(24px, 4vw, 44px);
  border-radius: var(--radius-lg);
  border: 1px solid var(--c-line);
  background: #fff;
  box-shadow: var(--shadow-md);
}

.demo-note {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 18px;
  border-radius: var(--radius-sm);
  background: var(--c-yellow-tint);
  border: 1px solid rgba(224, 165, 0, 0.4);
  font-size: 0.94rem;
}

.demo-note svg {
  flex: none;
  margin-top: 3px;
}

.form {
  display: grid;
  gap: 20px;
  margin-top: 28px;
}

.form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field label {
  font-size: 0.94rem;
  font-weight: 500;
}

.req {
  color: #b45309;
}

.field input,
.field select,
.field textarea {
  width: 100%;
  padding: 13px 16px;
  border: 1px solid var(--c-line-strong);
  border-radius: var(--radius-sm);
  background: var(--c-bg-alt);
  font-size: 1rem;
  transition:
    border-color 0.25s,
    background-color 0.25s,
    box-shadow 0.25s;
}

.field textarea {
  resize: vertical;
  min-height: 140px;
}

.field input:hover,
.field select:hover,
.field textarea:hover {
  border-color: var(--c-gray);
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  outline: none;
  border-color: var(--c-text);
  background: #fff;
  box-shadow: 0 0 0 4px rgba(248, 190, 32, 0.35);
}

.has-error input,
.has-error select,
.has-error textarea {
  border-color: #c2410c;
}

.field__err {
  min-height: 1.2em;
  font-size: 0.85rem;
  line-height: 1.2;
  color: #b42318;
}

.form__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.form__hint {
  font-size: 0.88rem;
  color: var(--c-text-2);
}

.form__result {
  padding: 14px 18px;
  border-radius: var(--radius-sm);
  background: var(--c-bg-alt);
  border: 1px dashed var(--c-gray);
  font-size: 0.94rem;
}

@media (max-width: 900px) {
  .contact {
    grid-template-columns: 1fr;
  }

  .info {
    position: static;
  }
}

@media (max-width: 560px) {
  .form__row {
    grid-template-columns: 1fr;
  }

  .form__foot :deep(.btn) {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
