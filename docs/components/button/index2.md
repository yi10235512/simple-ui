# Button 2

<script setup lang="ts">
import { ref } from 'vue'
import MyDesigner from './designer.md'
import MyDeveloper from './developer.md'

const mode = ref<'designer' | 'developer'>(
  (localStorage.getItem('mode') as 'designer' | 'developer') || 'designer'
)
</script>

<ModeSwitch />


<div class="options-api" >
   
## Developer Mode \* {#developer-mode}

<!-- @include: ./developer.md-->

</div>


<div class="composition-api" >
    
## Designer Mode \*\* {#designer-mode}

<!-- @include: ./designer.md-->

</div>

<style scoped>
.hidden {
  display: none;
}
</style>

