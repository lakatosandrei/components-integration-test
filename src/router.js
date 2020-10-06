import Vue from 'vue'
import Router from 'vue-router'
import PieAuthorDemo from './components/PieAuthorDemo';
import PiePlayerDemo from './components/PiePlayerDemo';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: PieAuthorDemo
    },
    {
      path: '/author',
      name: 'author',
      component: PieAuthorDemo
    },
    {
      path: '/player',
      name: 'player',
      component: PiePlayerDemo
    }

  ]
})