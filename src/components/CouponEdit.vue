<template>
    <div class="p-4">
        <div class="mb-4">
            <router-link to="/coupon" class="bg-gray-300 hover:bg-gray-400 transition-colors rounded-md py-2 px-4">&larr; Back</router-link>
        </div>
        <h1 class="text-3xl font-bold mb-4">Edit Coupon</h1>
        <form class="flex flex-col space-y-4" v-if="coupon" @submit.prevent="updateCoupon">
        <label class="text-lg font-semibold" for="expiration_date">Expiration Date:</label>
        <input class="border rounded-md p-2" v-model="coupon.expiration_date" type="text" id="expiration_date" />
        <br/>
        <label class="text-lg font-semibold" for="redeemed">Redeemed:</label>
        <input class="border rounded-md p-2" v-model="coupon.redeemed" type="text" id="redeemed" />
        <br/>
        <label class="text-lg font-semibold" for="payment_method">Payment Method:</label>
        <input class="border rounded-md p-2" v-model="coupon.payment_method" type="text" id="payment_method" />
        <br/>
        <label class="text-lg font-semibold" for="price">Price:</label>
        <input class="border rounded-md p-2" v-model="coupon.price" type="text" id="price" />
        <br/>
        <button class="bg-orange-500 text-white rounded-md py-2 px-4 hover:bg-orange-600 transition-colors" type="submit">Save Changes</button>
        </form>
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

const updateCoupon = async () => {
    await axios.put(`http://localhost:8000/api/coupons/${coupon.value.id}`, {
        expiration_date: coupon.value.expiration_date,
        redeemed: coupon.value.redeemed,
        payment_method: coupon.value.payment_method,
        price: coupon.value.price,
    });
    router.push(`/coupon/${coupon.value.id}`);
};
</script>