import Vue from 'vue'
import VueRouter from 'vue-router'
import VueHead from 'vue-head'
import Home from '../views/Home.vue'
import Success from '../views/Success.vue'

Vue.use(VueRouter)
Vue.use(VueHead)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/success',
		name: 'Success',
		component: Success
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
