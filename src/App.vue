<template>

    <nav v-if="authStore.isLoggedIn" class="bg-gray-800 p-4 px-8 flex justify-between items-center gap-10">

        <RouterLink to="/users" class="ml-4 text-white hover:text-gray-200 transition-colors">Users</RouterLink>
        <RouterLink to="/" class="text-white hover:text-gray-200 transition-colors">Menu</RouterLink>
        <RouterLink to="/schedule" class="text-white hover:text-gray-200 transition-colors">Schedule</RouterLink>
        <RouterLink to="/coupon" class="text-white hover:text-gray-200 transition-colors">Coupon</RouterLink>
        <RouterLink to="/orders" class="text-white hover:text-gray-200 transition-colors">Order</RouterLink>
        <RouterLink to="/transaction" class="text-white hover:text-gray-200 transition-colors">Transaction</RouterLink>

    <button
      @click="logout" class="ml-auto text-white hover:text-gray-200 transition-colors">Logout</button>
  </nav>

  <div>
    <RouterView />
  </div>
</template>
<script setup>
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push({ name: "login" });
};
</script>
<style></style>
