<template>
	<article class="success">
		<h1 ref="success">Hey, you logged in. Congratulations!</h1>
		<p>We are so proud of you, especially since there is no way to know about this page unless you somehow know about the only username and password that is accepted. You're a smart cookie.</p>
	</article>
</template>

<script>

export default {
	name: 'success',
	head: {
		title: {
			inner: 'Successful login',
			separator: '-',
			complement: 'Login Form'
		},
		// Meta tags
		meta: [
			{name: 'description', content: 'Successful logins were had all around', id: 'desc'},
		]
	},
	mounted() {
		setTimeout(() => {
			this.$refs.success.focus();
		}, 250);
	}
}
</script>

