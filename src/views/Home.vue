<template>
	<LoginForm/>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'

export default {
	name: 'home',
	components: {
		LoginForm
	},
	head: {
		title: {
			inner: 'Login',
			separator: '-',
			complement: 'Login Form'
		},
		// Meta tags
		meta: [
			{name: 'description', content: 'Just a simple login form using Vue', id: 'desc'},
		]
	}
}
</script>

