<template>
    <div class="p-4">
        <div class="mb-4">
            <router-link to="/coupon" class="bg-gray-300 hover:bg-gray-400 transition-colors rounded-md py-2 px-4">&larr; Back</router-link>
        </div>
        <h1 class="text-3xl font-bold mb-4">Coupon Details</h1>
        <div class="bg-white rounded-lg p-4 shadow-md" v-if="coupon">
        <h3 class="text-xl font-bold mb-2">{{ coupon.expiration_date }}</h3>
        <p class="text-gray-500 text-sm mb-2">{{ coupon.redeemed }}</p>  
        <p class="text-gray-500 text-sm mb-2">{{ coupon.payment_method }}</p>     
        <p class="text-gray-500 text-sm mb-2">{{ coupon.price }}</p>
        <br />
        <div class="flex justify-between">
        <router-link :to="`/coupon/${coupon.id}/edit`" class="bg-green-500 text-white rounded-md py-2 px-4 hover:bg-green-600 transition-colors">Edit</router-link>
        <button @click="deleteCoupon" class="bg-red-500 text-white rounded-md py-2 px-4 hover:bg-red-600 transition-colors">Delete</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();

const router = useRouter();
const route = useRoute();
const coupon = ref(null);

onMounted(async () => {
    const response = await axios.get(
        `http://localhost:8000/api/coupons/${route.params.id}`
    );
    coupon.value = response.data.data;
});

const deleteCoupon = async () => {
    if (confirm("Are you sure you want to delete this couponn?")) {
        await axios.delete(
            `http://localhost:8000/api/coupons/${coupon.value.id}`
        );
        router.push("/coupon");
    }
};
</script>