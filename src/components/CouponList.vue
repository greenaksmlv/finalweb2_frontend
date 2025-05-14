<template>
    <div class="p-4">
        <h1 class="text-3xl font-bold mb-4">Coupon List</h1>
        <router-link to="/coupon/create" class="bg-orange-300 text-white rounded-md py-2 px-4 mb-4 inline-block hover:bg-orange-400 transition-colors">Create a new Coupon</router-link>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="coupon in coupons" :key="coupon.id" class="bg-white rounded-lg p-4 shadow-md">
        <h3 class="text-xl font-bold mb-2">{{ coupon.expiration_date }}</h3>
        <p class="text-gray-500 text-sm mb-2">{{ coupon.redeemed }}</p>
        <p class="text-gray-500 text-sm mb-2">{{ coupon.payment_method }}</p>
        <p class="text-gray-500 text-sm mb-2">{{ coupon.price }}</p>
        <router-link :to="`/coupon/${coupon.id}`" class="bg-orange-500 text-white rounded-md py-2 px-4 mt-4 inline-block 
hover:bg-orange-600 transition-colors">View Details</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const coupons = ref([]);

onMounted(async () => {
    const response = await axios.get("http://localhost:8000/api/coupons", {
        headers: {
            Authorization: `Bearer ${authStore.accessToken}`,
        },
    });
    coupons.value = response.data.data;
});
</script>

<style scoped>
.bg-orange-300 {
  background-color: #FFA07A;
}

.hover\:bg-orange-400:hover {
  background-color: #FF8C00;
}
</style>