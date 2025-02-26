# Button

Author: nora

## Props

| Prop name | Description | Type   | Values                     | Default  |
| --------- | ----------- | ------ | -------------------------- | -------- |
| text      | button text | string | -                          | 'Button' |
| size      | button size | string | `small`, `medium`, `large` | 'small'  |

## Events

| Event name | Properties | Description               |
| ---------- | ---------- | ------------------------- |
| click      |            | emit when component click |

## Slots

| Name    | Description           | Bindings |
| ------- | --------------------- | -------- |
| default | Use this slot at post |          |
| post    | Use this slot at post |          |

---

<script setup>
import Usage from '../../examples/button/usage.vue'
</script>
<Usage />
