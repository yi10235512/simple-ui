<template>
  <button class="s-button">
    {{ text }}
    <!-- @slot Use this slot at post -->
    <slot />
    <slot name="post" />
  </button>
</template>

<script setup>
/**
* @displayName Button
* @author nora
*/
defineOptions({
  name: "s-button",
});
defineProps({
  /**
  * button text
  */
  text: {
    type: String,
    default: 'Button'
  },
  /**
  * button size 
  * @values small, medium, large
  */
  size:{
	  type: String,
		default: 'small',
	}
})
const emit = defineEmits({
  /**
   * emit when component click
   */
  click: e => {
     console.log(e)
  }
})

</script>
