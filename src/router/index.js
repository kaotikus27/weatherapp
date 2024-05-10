import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CityView from '@/views/CityView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      title:"Home"
    }
  },
  {
    path: '/weather/:state/:city',
    name: 'cityView',
    component: CityView,
    meta:{
      title:"Weather"
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

/* basic route title manipulation*/
router.beforeEach((to, from, next) =>{
  document.title=`${to.meta.title} | The Local Weather`;
  next();
})

/* Advance route title manipulation */
// router.beforeEach((to, from, next) =>{
//   document.title=`${to.params.state 
//     ? `${to.params.city} , ${to.params.state}` 
//     : to.meta.title} | The Local Weather`;
//   next();
// })


export default router
