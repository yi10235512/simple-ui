<template>
  <nav class="outline">
    <h3>Outline</h3>
    <ul>
      <li v-for="(item, index) in outline" :key="index" :class="{ active: isActive(item.id) }">
        <a :href="`#${item.id}`">{{ item.text }}</a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vitepress'

const outline = ref([])
const route = useRoute()
const activeId = ref('')

function updateOutline() {
  const headers = Array.from(document.querySelectorAll('h2, h3'))
  outline.value = headers.map(header => ({
    id: header.id,
    text: header.innerText
  }))
}

function isActive(id) {
  return activeId.value === id
}

const handleScroll = () => {
  const sections = outline.value.map(item => document.getElementById(item.id))
  const scrollPosition = window.scrollY + window.innerHeight

  sections.forEach(section => {
    if (section) {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        activeId.value = section.id
      }
    }
  })
}

onMounted(() => {
  updateOutline()
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.outline {
  position: fixed;
  right: 20px;
  top: 100px;
  width: 200px;
  border-left: 2px solid #e8e8e8;
  padding-left: 10px;
}

.outline ul {
  list-style-type: none;
  padding: 0;
}

.outline li {
  margin: 5px 0;
}

.outline li.active a {
  font-weight: bold;
  color: #198df8; /* Active link color */
}

.outline li a {
  text-decoration: none;
  color: #333; /* Default link color */
}

.outline li a:hover {
  text-decoration: underline; /* Hover effect */
}
</style>