import Form from "@/views/Form.vue";
import { createRouter,createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:[
   
    {
      path:'/',
      name:'form',
      component:Form
    },
    {
      path:'/form2',
      name:'form2',
      component: () => import('@/views/From2.vue')
    }
    
  ]
})
export default router;