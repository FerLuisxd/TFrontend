import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Mode from './components/Mode.vue'
import Tournament from './components/Tournament.vue'
import Player from './components/Players.vue'
import Team from './components/Teams.vue'
import Match from './components/Matches.vue'
import VueRouter from 'vue-router';
import Statistics from './components/Statistics.vue'

Vue.use(VueRouter)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/mode',
      name: 'mode',
      component: Mode
    },
    {
      path: '/tournament',
      name: 'tournament',
      component: Tournament
    },
    {
      path: '/player',
      name: 'player',
      component: Player
    },
    {
      path: '/team',
      name: 'team',
      component: Team
    },
    {
      path: '/match',
      name: 'match',
      component: Match
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: Statistics
    }


  ]
})

