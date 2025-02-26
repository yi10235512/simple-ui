<template>
	<button>按钮{{ text }}
		<!-- @slot Use this slot to have a header -->
		<slot name="header" />
	</button>
</template>
<script>
/**
* 组件使用的命名
* @displayName Best Button
* @author Yoge
*/
export default {		
	name: 'BestButton',
	props: {
		/**
		 * 按钮文本
		 */
		text: {
			type: String,
			required: true,
		},
		/**
		 * 按钮大小
		 * @values small, medium, large
		 */
		size:{
			type: String,
			default: 'small',
		}
	},
	methods: {
		/**
		 * Insert text at cursor position.
		 *
		 * @param {string} text
		 * @public
		 */
		add(text) {
			console.log('add');
			/**
			 * 成功事件.
			 *
			 * @event success
			 * @type {object}
			 */
			this.$emit('success', {})
		},
	},
};
</script>

