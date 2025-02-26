<template>
  <div>
    <div class="tabs">
      <button :class="{ active: currentTab === 'dev' }" @click="switchTab('dev')">Developer</button>
      <button :class="{ active: currentTab === 'designer' }" @click="switchTab('designer')">Designer</button>
    </div>
  <Transition name="fade" mode="out-in">
    <div v-if="currentTab === 'dev'">
      <slot name="dev" />
    </div>
    <div v-else-if="currentTab === 'designer'">
      <slot name="designer" />
    </div>
  </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['tab-changed'])
const currentTab = ref('dev')

function switchTab(tab) {
  currentTab.value = tab
  emit('tab-changed', tab)
}

</script>

<style scoped>
.tabs {
  display: flex;
  border-bottom: 2px solid #e8e8e8;
  margin-bottom: 20px;
}

button {
  display: block;
  padding: 10px 20px;
  margin: 0 5px 1px 0;
  background: #fff;
  font-size: 20px;
  font-weight: 700;
  color: #112529;
  text-align: center;
  border: none;
  border-radius: 0;
  z-index: 2;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
}

button.active {
  color: #198df8;
  border: none;
}

button.active:after {
  content: "";
  width: 100%;
  height: 3px;
  background: #198df8;
  position: absolute;
  bottom: -1px;
  left: 0;
  z-index: -1;
  transition: all 0.3s ease;
}

button:hover {
  color: #198df8;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.tab-content {
  padding: 30px 20px 20px;
  margin-top: 0;
  background: #fff;
  font-size: 15px;
  color: #7a9181;
  line-height: 30px;
  border-radius: 0 0 5px 5px;
}

.tab-content h3 {
  font-size: 24px;
  margin-top: 0;
}
</style>

