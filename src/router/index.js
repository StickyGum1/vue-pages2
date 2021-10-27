import { createRouter, createWebHistory } from 'vue-router'
import Khampha from '../views/Home.vue'

const routes = [
  {
    path: '/mymusic',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "personal" */ '../views/About.vue'),
    children: [
      {
        path: '/library/song',
        name: 'Mysong',
        component: () => import(/* webpackChunkName: "personal" */ '../components/personcompos/mysongs.vue'),
      },
      {
        path: '/library/playlist',
        name: 'Myplaylist',
        component: () => import(/* webpackChunkName: "personal" */ '../components/personcompos/myplaylist.vue'),
      },
      {
        path: '/library/singer',
        name: 'Mysinger',
        component: () => import(/* webpackChunkName: "personal" */ '../components/personcompos/mysingers.vue'),
      },
      {
        path: '/library/anlbum',
        name: 'Myanlbum',
        component: () => import(/* webpackChunkName: "personal" */ '../components/personcompos/myanlbum.vue'),
      },
      {
        path: '/library/uploaded',
        name: 'Myuploaded',
        component: () => import(/* webpackChunkName: "personal" */ '../components/personcompos/myuploaded.vue'),
      }
    ]
  },
  {
    path: '/',
    name: 'Khampha',
    component: Khampha
  },
  {
    path: '/zingchart',
    name: 'Zingchart',
    component: () => import(/* webpackChunkName: "zingchart" */ '../views/Zingchart.vue')
  },
  {
    path: '/radio',
    name: 'Radio',
    component: () => import(/* webpackChunkName: "radio" */ '../views/Radio.vue')
  },
  {
    path: '/follow',
    name: 'Follow',
    component: () => import(/* webpackChunkName: "follow" */ '../views/Follow.vue')
  },
  {
    path: '/newsongs',
    name: 'Newsongs',
    component: () => import(/* webpackChunkName: "Newsongs" */ '../views/Newsongs.vue')
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import(/* webpackChunkName: "Category" */ '../views/Category.vue')
  },
  {
    path: '/top100',
    name: 'Top100',
    component: () => import(/* webpackChunkName: "Top100" */ '../views/Top100.vue')
  },
  {
    path: '/mv',
    name: 'Mv',
    component: () => import(/* webpackChunkName: "Mv" */ '../views/Mv.vue')
  },
  {
    path: '/amlbum/songs',
    name: 'Songsanlbum',
    component: () => import(/* webpackChunkName: "songsanlbum" */ '../components/sidecomponents/anlbum/anlbumsong.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
