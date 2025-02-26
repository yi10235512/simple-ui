<script setup>
import { ref, defineAsyncComponent, watch, computed } from 'vue';
import { useData, useRoute } from 'vitepress';

const tabs = ['Developer', 'Designer'];
const activeTab = ref('Developer');

const route = useRoute();

// const components = {
//   Developer: defineAsyncComponent(() => import('../button/dev.md')),
//   Designer: defineAsyncComponent(() => import('../button/designer.md')),
// };
// 获取当前组件的基础路径（如 `button` 或 `checkbox`）
const basePath = computed(() => {
  const segments = route.path.split('/').filter(Boolean);
  return segments.length > 1 ? segments[segments.length - 1] : 'unknown';
});

// 计算当前选中 Tab 的 .md 路径
const currentMdPath = computed(() => {
    console.log('currentMdpath', `/${basePath.value}/${activeTab.value.toLowerCase()}.md`)
  return `/${basePath.value}/${activeTab.value.toLowerCase()}.md`;
});

const { frontmatter } = useData();

// 监听 Tab 切换时，触发 VitePress 更新大纲
watch(activeTab, () => {
  setTimeout(() => {
    window.dispatchEvent(new Event('vitepress:updated'));
  }, 100);
});
</script>

<template>
  <div>
    <div v-if="frontmatter.title">
      <h1>{{ frontmatter.title }}</h1>
    </div>
    <Content />
    
    <div class="tabs">
      <span
        v-for="tab in tabs"
        :key="tab"
        :class="{ active: activeTab === tab }"
        @click="activeTab = tab"
      >
        {{ tab }}
      </span>
    </div>

    <!-- <component :is="components[activeTab]" /> -->
    <Markdown :src="currentMdPath" />
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  gap: 10px;
  cursor: pointer;
  margin-top: 20px;
  border-bottom: 2px solid #ddd;
}
.tabs span {
  padding: 8px 16px;
  cursor: pointer;
}
.tabs .active {
  font-weight: bold;
  color: blue;
  border-bottom: 2px solid blue;
}
</style>
