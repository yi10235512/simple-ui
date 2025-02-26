<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'

import demo1 from './demo1.vue'
const mode = ref<'designer' | 'developer'>('designer')
const MyDesigner = defineAsyncComponent(() => import('./designer.md'))
const MyDeveloper = defineAsyncComponent(() => import('./developer.md'))
</script>

# Button 按钮
button component

<Tab v-model="mode">
  <template #designer>

<!-- @include: ./designer.md-->

  </template>

  <template #developer>

<!-- @include: ./developer.md-->

  </template>

</Tab>
