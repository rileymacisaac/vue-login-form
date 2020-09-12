<template>
  <div id="app" ref="app" class="roboto">
    <header class="header">
      <div class="header__wrapper">
        <span class="header__lock">{{ $route.name === 'Success' ? '🔓' : '🔒' }}</span>

        <nav class="header__nav">
          <ul role="list" class="header__nav-items">
            <li><router-link to="/" class="color-dark-blue roboto-medium">Login</router-link></li>
            <li><a href="mailto:rileymacisaac@gmail.com" class="color-dark-blue roboto-medium">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <main>
      <router-view/>
    </main>

    <footer>
      <p>Just a simple client-side login form built on <a href="https://vuejs.org/" rel="noopener">Vue</a> by <strong>Riley MacIsaac</strong></p>
    </footer>
  </div>
</template>

<style lang="scss">
  @import 'assets/sass/core.scss';
</style>

<script>
export default {
	name: "App",
	watch: {
		$route: function () {
			setTimeout(() => {
				this.$refs.app.focus();
			}, 0);
		}
	},
};
</script>