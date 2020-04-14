import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import upload from '@/components/upload'
import test from '@/components/test'


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
    }
  ]
})
