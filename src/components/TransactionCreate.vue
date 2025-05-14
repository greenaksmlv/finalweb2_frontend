<template>
    <div class="p-4">
        <div class="mb-4">
            <router-link to="/transaction" class="bg-gray-300 hover:bg-gray-400 transition-colors rounded-md py-2 px-4">&larr; Back</router-link>
        </div>
        <h1 class="text-3xl font-bold mb-4">Create Transaction</h1>
        <form @submit="createTransaction" class="flex flex-col space-y-4">
            <div>
                <label class="text-lg font-semibold" for="order_id">Orders:</label><br>
                <select v-model="form.order_id" id="order_id" class="border rounded-md p-2" required @change="updatePrice($event.target.value)">
                <option v-for="order in orders" :key="order.id" :value="order.id">{{ order.id }}</option>
                </select>
            </div>
            <div>
                <label class="text-lg font-semibold" for="transaction_amount">Total Price:</label><br>
                <input class="border rounded-md p-2" v-model="form.total_price" type="number" id="total_price" required  />
            </div>
            <div>
                <label class="text-lg font-semibold" for="payment_method">Payment Method:</label><br>
                <select v-model="form.payment_method" id="payment_method" class="border rounded-md p-2" required>
                <option value="Cash">Cash</option>
                <option value="DANA">DANA</option>
                <option value="Transfer">Transfer</option>
                </select>
            </div>
            <br/><br/><br/><br/>

            <button class="bg-orange-500 text-white rounded-md py-2 px-4 hover:bg-orange-600 
            transition-colors" type="submit">Create</button>
        </form>
    </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();

const router = useRouter();
const transaction_amount = ref("");
const total_price = ref("");
const payment_method = ref("");
const form = ref({
    user_id: null,
    order_id: null,
    total_price: null,
})
const users = ref("");
const orders = ref("");

onMounted(async () => {
    try{
        const [user, order] = await Promise.all([
            axios.get("http://localhost:8000/api/users", {
                headers: {
                    Authorization: `Bearer ${authStore.accessToken}`
                }
            }),

            axios.get("http://localhost:8000/api/orders", {
                headers: {
                    Authorization: `Bearer ${authStore.accessToken}`
                }
            }),
        ]);
        users.value = user.data.data;
        orders.value = order.data.data;
        console.log(orders.value);
    } catch (error) {
        console.log(error)
    }
});

const createTransaction = async () => {
    await axios.post("http://localhost:8000/api/transactions", {
        transaction_amount: transaction_amount.value,
        total_price: total_price.value,
        payment_method: payment_method.value,
    }, {
        headers: {
            // set headers for authentication
            Authorization: `Bearer ${authStore.accessToken}`,
          },
    });
    router.push("/transaction");
};

const updatePrice = () => {
    const order = orders.value.find((order) => order.id === Number(form.value.order_id));
    if(order) {
      form.value.total_price = order.price * form.value.quantity;
    };
  }
</script>