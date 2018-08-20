import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login/template.vue'
import Register from '@/pages/Register/template.vue'
import Index from '@/pages/Index/template.vue'
import Create from '@/pages/Create/template.vue'
import Detail from '@/pages/Detail/template.vue'
import Edit from '@/pages/Edit/template.vue'
import My from '@/pages/My/template.vue'
import User from '@/pages/User/template.vue'
import store from '../store/index'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/create',
      component: Create,
      meta: { requiresAuth: true }
    },
    {
      path: '/detail/:blogId',
      component: Detail
    },
    {
      path: '/edit/:blogId',
      component: Edit,
      meta: { requiresAuth: true }
    },
    {
      path: '/my',
      component: My,
      meta: { requiresAuth: true }
    },
    {
      path: '/user/:userId',
      component: User
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    store.dispatch('checkLogin').then((isLogin)=>{

      if (!isLogin) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    })
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router
