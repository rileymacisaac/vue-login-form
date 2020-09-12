<template>
	<article class="login">
		<h1 class="color-dark-blue roboto-medium">Login</h1>

		<form class="login__form" @submit="validation" novalidate>
			<div class="login__input">
				<label for="username" class="color-light-blue roboto-medium">Username (required)</label>
				<input type="text" id="username" name="username" ref="username" v-model="username" autocomplete="username" v-bind="uAttrs" autofocus required/>

				<div class="login__msg login__msg--error" v-if="uError"><strong>Error:</strong> <span id="username-error">{{ uError }}</span></div>
			</div>

			<div class="login__input">
				<label for="password" class="color-light-blue roboto-medium">Password (required)</label>

				<button class="login__show-pw bg-light-blue" type="button" aria-label="Show password as plain text" :aria-pressed="showPw ? 'true' : 'false'" @click="showPw = !showPw">{{ !showPw ? 'Show' : 'Hide' }}</button>

				<div id="pw-hint" class="login__msg">{{ pwHint }}</div>

				<input :type="showPw ? 'text' : 'password'" id="password" name="password" ref="password" v-model="password" autocomplete="current-password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*" v-bind="pwAttrs" required/>

				<div class="login__msg login__msg--error" v-if="pwError"><strong>Error:</strong> <span id="password-error">{{ pwError }}</span></div>
			</div>

			<button class="bg-dark-blue roboto-medium" type="submit">Login</button>
		</form>
	</article>
</template>

<script>
export default {
	name: "LoginForm",
	data: function () {
		let defaultAttrs = {'aria-invalid': 'false'};

		return {
			username: null,
			password: null,
			uError: null,
			pwError: null,
			uAttrs: defaultAttrs,
			pwAttrs: defaultAttrs,
			defaultAttrs: defaultAttrs,
			showPw: false,
			pwHint: 'Password must contain at least one number, one uppercase letter, and one lowercase letter.'
		}
	},
	methods: {
		validation: function (e) {
			const username = this.$refs.username;
			const password = this.$refs.password;

			// If both inputs pass validity and has correct login details, submit form (aka redirect in this case)
			// If not, prevent default and pass validation
			if (username.checkValidity() && password.checkValidity() && this.checkCredentials) {
				e.preventDefault();
				window.location.href = "/success";
				return true;
			} else {
				e.preventDefault();
			}

			// Validate username
			if (!username.checkValidity()) {

				this.uError = 'Username is required to login';

				// Set attributes for input
				setTimeout(() => {
					this.uAttrs = this.setErrors(username);
				},0);

			} else {

				// No errors so reset data
				this.uAttrs = this.defaultAttrs;
				this.uError = null;

			}

			// Validate password
			if (!password.checkValidity()) {

				if (!this.password) { // If password is empty
					this.pwError = 'Password is required to login';
				} else if (password.validity.patternMismatch) { // If pattern is not matched
					this.pwError = this.pwHint + ' For Example, "Access123"';
				}

				// Set attributes for input
				setTimeout(() => {
					this.pwAttrs = this.setErrors(password);
				},0);

			} else {

				// No errors so reset data
				this.pwAttrs = this.defaultAttrs;
				this.pwError = null;

			}

			// Find first input with error and send focus to it
			setTimeout(() => {
				this.$el.querySelector('input[aria-invalid="true"]').focus()
			},100);
		},

		checkCredentials: function () {
			return (this.username === 'level' && this.password === 'Access123');
		},

		setErrors: function(input) {
			return {
				'aria-invalid': 'true',
				'aria-describedby': input.parentNode.querySelector('.login__error [id*="-error"]').getAttribute('id'),
			}
		},
	},
}
</script>

<style lang="scss" type="text/css">
	@import '../assets/sass/components/login.scss';
</style>