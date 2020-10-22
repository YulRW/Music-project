import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Main = ()=>import('@/views/Main');

const routes = [
  {
    path: '/',
    redirect:'/Main'
  },
  {
    path: '/Main',
    name: 'Main',
    component: Main
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
