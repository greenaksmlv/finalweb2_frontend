import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MenuList from '@/components/MenuList.vue'
import MenuCreate from '@/components/MenuCreate.vue'
import MenuDetails from '@/components/MenuDetails.vue'
import MenuEdit from '@/components/MenuEdit.vue'
import ScheduleList from '@/components/ScheduleList.vue'
import ScheduleCreate from '@/components/ScheduleCreate.vue'
import ScheduleDetails from '@/components/ScheduleDetails.vue'
import ScheduleEdit from '@/components/ScheduleEdit.vue'
import CouponList from '@/components/CouponList.vue'
import CouponCreate from '@/components/CouponCreate.vue'
import CouponDetails from '@/components/CouponDetails.vue'
import CouponEdit from '@/components/CouponEdit.vue'
import TransactionList from '@/components/TransactionList.vue'
import TransactionCreate from '@/components/TransactionCreate.vue'
import TransactionDetails from '@/components/TransactionDetails.vue'
import TransactionEdit from '@/components/TransactionEdit.vue'
import UserList from '@/components/UserList.vue'
import UserCreate from '@/components/UserCreate.vue'
import UserDetails from '@/components/UserDetails.vue'
import UserEdit from '@/components/UserEdit.vue'
import OrderList from '@/components/OrderList.vue'
import OrderCreate from '@/components/OrderCreate.vue'
import OrderDetails from '@/components/OrderDetails.vue'
import OrderEdit from '@/components/OrderEdit.vue'
import Login from '@/components/Login.vue'
import { useAuthStore } from '@/stores/auth'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MenuList,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: "/menu",
      name: "menucreate",
      component: MenuCreate,
    },
    {
      path: "/menu/:id",
      name: "menudetail",
      component: MenuDetails,
    },
    {
      path: "/menu/:id/edit",
      name: "menuedit",
      component: MenuEdit,
    },
    {
      path: "/schedule",
      name: "schedulelist",
      component: ScheduleList,
    },
    {
      path: "/schedule/create",
      name: "schedulecreate",
      component: ScheduleCreate,
    },
    {
      path: "/schedule/:id",
      name: "scheduledetail",
      component: ScheduleDetails,
    },
    {
      path: "/schedule/:id/edit",
      name: "scheduleedit",
      component: ScheduleEdit,
    },
    {
      path: "/coupon",
      name: "couponlist",
      component: CouponList,
    },
    {
      path: "/coupon/create",
      name: "couponcreate",
      component: CouponCreate,
    },
    {
      path: "/coupon/:id",
      name: "coupondetail",
      component: CouponDetails,
    },
    {
      path: "/coupon/:id/edit",
      name: "couponedit",
      component: CouponEdit,
    },
    {
      path: "/transaction",
      name: "transactionlist",
      component: TransactionList,
    },
    {
      path: "/transaction/create",
      name: "transactioncreate",
      component: TransactionCreate,
    },
    {
      path: "/transaction/:id",
      name: "transactiondetail",
      component: TransactionDetails,
    },
    {
      path: "/transaction/:id/edit",
      name: "transactionedit",
      component: TransactionEdit,
    },
    {
      path: "/users",
      name: "userlist",
      component: UserList,
    },
    {
      path: "/users/create",
      name: "usercreate",
      component: UserCreate,
    },
    {
      path: "/users/:id",
      name: "userdetail",
      component: UserDetails,
    },
    {
      path: "/users/:id/edit",
      name: "useredit",
      component: UserEdit,
    },
    {
      path: "/orders",
      name: "orderlist",
      component: OrderList,
    },
    {
      path: "/orders/create",
      name: "ordercreate",
      component: OrderCreate,
    },
    {
      path: "/orders/:id",
      name: "orderdetail",
      component: OrderDetails,
    },
    {
      path: "/order/:id/edit",
      name: "orderedit",
      component: OrderEdit,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.name !== "login" && !authStore.isLoggedIn) {
    next({ name: "login" });
  }else {
    next();
  }
});

export default router;
