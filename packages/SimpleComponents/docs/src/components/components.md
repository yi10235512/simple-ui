---
sidebarDepth: 2
---

# components

## Best Button

> 组件使用的命名

Author: Yoge

### Props

| Prop name | Description | Type   | Values                     | Default |
| --------- | ----------- | ------ | -------------------------- | ------- |
| text      | 按钮文本    | string | -                          |         |
| size      | 按钮大小    | string | `small`, `medium`, `large` | 'small' |

### Methods

#### add

> Insert text at cursor position.

##### Params

| Param name | Type   | Description |
| ---------- | ------ | ----------- |
| text       | string |             |

### Events

| Event name | Properties | Description |
| ---------- | ---------- | ----------- |
| success    |            | 成功事件.   |

### Slots

| Name   | Description                    | Bindings |
| ------ | ------------------------------ | -------- |
| header | Use this slot to have a header |          |

---

## Button

Author: nora

### Props

| Prop name | Description | Type   | Values                     | Default  |
| --------- | ----------- | ------ | -------------------------- | -------- |
| text      | button text | string | -                          | 'Button' |
| size      | button size | string | `small`, `medium`, `large` | 'small'  |

### Events

| Event name | Properties | Description               |
| ---------- | ---------- | ------------------------- |
| click      |            | emit when component click |

### Slots

| Name    | Description           | Bindings |
| ------- | --------------------- | -------- |
| default | Use this slot at post |          |
| post    | Use this slot at post |          |

---
