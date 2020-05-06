import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/Helloworld'
import upload from '@/components/upload'
import test from '@/components/test'
import signup from '@/components/Signup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/upload',
      name: 'upload',
      component: upload
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path : '/signup',
      name : 'signup',
      component : signup
    }
  ]
})
