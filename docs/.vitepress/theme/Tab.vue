<script setup>
const props = defineProps({
  modelValue: String 
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <div class="tab-buttons">
      <button :class="{ active: modelValue === 'designer' }" @click="emit('update:modelValue', 'designer')">Designer Mode</button>
      <button :class="{ active: modelValue === 'developer' }" @click="emit('update:modelValue', 'developer')">Developer Mode</button>
    </div>

    <div v-show="modelValue === 'designer'">
      <slot name="designer" />
    </div>
    <div v-show="modelValue === 'developer'">
      <slot name="developer" />
    </div>
  </div>
</template>

<style scoped>
.tab-buttons {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
button {
  padding: 8px 12px;
  border: none;
  background: #ddd;
  cursor: pointer;
}
button.active {
  background: #007bff;
  color: white;
}
</style>

