import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Main = ()=>import('@/views/Main');
const Singer = ()=>import('@/views/Singer');
const MusicList = ()=>import('@/views/MusicList');
const Friends = ()=>import('@/views/Friends');
const Shop = ()=>import('@/views/Shop');

const routes = [
  {
    path: '/',
    redirect:'/Main'
  },
  {
    path: '/Main',
    name: 'Main',
    component: Main
  },
  {
    path: '/Singer',
    name: 'Singer',
    component: Singer
  },
  {
    path: '/MusicList',
    name: 'MusicList',
    component: MusicList
  },
  {
    path: '/Friends',
    name: 'Friends',
    component: Friends
  },
  {
    path: '/Shop',
    name: 'Shop',
    component: Shop
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
