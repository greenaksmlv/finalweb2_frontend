<template>
    <div class="p-4">
        <div class="mb-4">
            <router-link to="/transaction" class="bg-gray-300 hover:bg-gray-400 transition-colors rounded-md py-2 px-4">&larr; Back</router-link>
        </div>
        <h1 class="text-3xl font-bold mb-4">Edit Transaction</h1>
        <form class="flex flex-col space-y-4" v-if="transaction" @submit.prevent="updateTransaction">
        <label class="text-lg font-semibold" for="transaction_amout">Transaction Amount:</label>
        <input class="border rounded-md p-2" v-model="transaction.transaction_amount" type="text" id="transaction_amount" />
        <br/>
        <label class="text-lg font-semibold" for="total_price">Total Price:</label>
        <input class="border rounded-md p-2" v-model="transaction.total_price" type="text" id="total_price" required @input="updateTotalPrice" disabled />
        <br/>
        <label class="text-lg font-semibold" for="payment_method">Payment Method:</label>
        <input class="border rounded-md p-2" v-model="transaction.payment_method" type="text" id="payment_method" />
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
const transaction = ref(null);

onMounted(async () => {
    const response = await axios.get(
        `http://localhost:8000/api/transactions/${route.params.id}`
    );
    transaction.value = response.data.data;
});

const updateTRansaction = async () => {
    await axios.put(`http://localhost:8000/api/transactions/${transaction.value.id}`, {
        transaction_amount: transaction.value.transaction_amount,
        total_price: transaction.value.total_price,
        payment_method: transaction.value.payment_method,
    });
    router.push(`/transaction/${transaction.value.id}`);
};
</script>