<template>
	<article class="login">
		<h1 class="color-dark-blue roboto-medium">Login</h1>

		<form class="login__form" @submit="validation" novalidate>
			<div class="login__input">
				<label for="username" class="color-light-blue roboto-medium">Username (required)</label>
				<input type="text" id="username" name="username" ref="username" v-model="username" autocomplete="username" v-bind="uAttrs" autofocus required/>
				<div class="login__msg login__msg--error" v-show="uError"><strong>Error:</strong> <span id="username-error">{{ uError }}</span></div>
			</div>

			<div class="login__input">
				<label for="password" class="color-light-blue roboto-medium">Password (required)</label>

				<button class="login__show-pw bg-light-blue" type="button" aria-label="Show password as plain text" :aria-pressed="showPw ? 'true' : 'false'" @click="showPw = !showPw">{{ !showPw ? 'Show' : 'Hide' }}</button>

				<div id="pw-hint" class="login__msg">{{ pwHint }}</div>

				<input :type="showPw ? 'text' : 'password'" id="password" name="password" ref="password" v-model="password" autocomplete="current-password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*" v-bind="pwAttrs" required/>

				<div class="login__msg login__msg--error" v-show="pwError"><strong>Error:</strong> <span id="password-error">{{ pwError }}</span></div>
			</div>

			<button class="bg-dark-blue roboto-medium" type="submit">Login</button>
		</form>
	</article>
</template>

<script>
export default {
	name: "LoginForm",
	data: function () {

		return {
			username: null,
			password: null,
			uError: null,
			pwError: null,
			uAttrs: null,
			pwAttrs: null,
			defaultUAttrs: {'aria-invalid': 'false'},
			defaultPwAttrs: {'aria-invalid': 'false', 'aria-describedby': 'pw-hint'},
			showPw: false,
			pwHint: 'Password must contain at least one number, one uppercase letter, and one lowercase letter.'
		}
	},
	mounted() {
		this.uAttrs = this.defaultUAttrs;
		this.pwAttrs = this.defaultPwAttrs;
	},
	methods: {
		validation: function (e) {
			const username = this.$refs.username;
			const password = this.$refs.password;

			// Reset all inputs and errors
			this.resetInputs();

			// If both inputs pass validity and has correct login details, submit form (aka redirect in this case)
			// If not, prevent default and pass validation
			if (username.checkValidity() && password.checkValidity() && this.checkCredentials()) {
				e.preventDefault();
				window.location.href = "/success";
				return true;
			} else {
				e.preventDefault();
			}

			// Check if credentials are valid
			if (!this.checkCredentials()) {
				this.uError = 'Username and/or password is invalid.';
				this.uAttrs = {'aria-invalid': 'true', 'aria-describedby': 'username-error'};
				this.pwAttrs = {'aria-invalid': 'true', 'aria-describedby': 'username-error pw-hint'};
			}

			// Validate username
			if (!username.checkValidity()) {
				this.uError = 'Username is required to login';
				this.uAttrs = {'aria-invalid': 'true', 'aria-describedby': 'username-error'};
			}

			// Validate password
			if (!password.checkValidity()) {
				let pwAriaDescribedBy = 'password-error pw-hint';

				if (!this.password) { // If password is empty

					this.pwError = 'Password is required to login';

				} else if (password.validity.patternMismatch) { // If pattern is not matched

					this.pwError = this.pwHint + ' For Example, "Access123".';
					pwAriaDescribedBy = 'password-error';

					if (!this.checkCredentials()) {
						pwAriaDescribedBy += ' username-error';
					}
				}

				this.pwAttrs = {'aria-invalid': 'true', 'aria-describedby': pwAriaDescribedBy};
			}

			// Find first input with error and send focus to it
			setTimeout(() => {
				this.$el.querySelector('input[aria-invalid="true"]').focus()
			},100);
		},

		checkCredentials: function () {
			return (this.username === 'level' && this.password === 'Access123');
		},

		resetInputs: function() {
			this.uAttrs = this.defaultUAttrs;
			this.uError = null;
			this.pwAttrs = this.defaultPwAttrs;
			this.pwError = null;
		}
	},
}
</script>

<style lang="scss" type="text/css">
	@import '../assets/sass/components/login.scss';
</style>