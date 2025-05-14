<template>
    <div class="p-4">
        <div class="mb-4">
            <router-link to="/coupon" class="bg-gray-300 hover:bg-gray-400 transition-colors rounded-md py-2 px-4">&larr; Back</router-link>
            </div>
        <h1 class="text-3xl font-bold mb-4">Create Coupon</h1>
        <form class="flex flex-col space-y-4" @submit.prevent="createCoupon">
            <label class="text-lg font-semibold" for="expiration_date">Expiration Date:</label>
            <input class="border rounded-md p-2" v-model="expiration_date" type="text" id="expiration_date" />
            <br/>
            <label class="text-lg font-semibold" for="redeemed">Redeemed:</label>
            <input class="border rounded-md p-2" v-model="redeemed" type="text" id="redeemed" />
            <br/>
            <label class="text-lg font-semibold" for="payment_method">Payment Method:</label>
            <input class="border rounded-md p-2" v-model="payment_method" type="text" id="payment_method" />
            <br/>
            <label class="text-lg font-semibold" for="price">Price:</label>
            <input class="border rounded-md p-2" v-model="price" type="text" id="price" />
            <br/>
            <button class="bg-orange-500 text-white rounded-md py-2 px-4 hover:bg-orange-600 
transition-colors" type="submit">Create</button>
        </form>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();

const router = useRouter();
const expiration_date = ref("");
const redeemed = ref("");
const payment_method = ref("");
const price = ref("");

const createCoupon = async () => {
    await axios.post("http://localhost:8000/api/coupons", {
        expiration_date: expiration_date.value,
        redeemed: redeemed.value,
        payment_method: payment_method.value,
        price: price.value,
    });
    router.push("/coupon");
};
</script>