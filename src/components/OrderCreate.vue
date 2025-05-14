<template>
    <!-- A div container with padding of 4 -->
    <div class="p-4">
      <!-- A heading with font size 3xl, bold and margin bottom of 4 -->
      <h1 class="text-3xl font-bold mb-4">Create Order</h1>
      <!-- A form that will call createOrder function on submit -->
      <form @submit.prevent="createOrder">
        <!-- A div container with margin bottom of 4 -->
        <div class="mb-4">
          <!-- A label for User dropdown with font color gray, font weight bold and margin bottom of 2 -->
          <label for="user_id" class="block text-gray-700 font-bold mb-2"
            >User:</label
          >
          <!-- A dropdown for selecting user with shadow, border, rounded corners, full width, padding top and bottom of 2, font color gray, focus shadow outline and required field -->
          <select
            id="user_id"
            v-model="form.user_id"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <!-- A loop to display the list of users with their names -->
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.name }}
            </option>
          </select>
        </div>
        <!-- A div container with margin bottom of 4 -->
        <div class="mb-4">
          <!-- A label for Product dropdown with font color gray, font weight bold and margin bottom of 2 -->
          <label for="product_id" class="block text-gray-700 font-bold mb-2"
            >Coupon:</label
          >
          <!-- A dropdown for selecting product with shadow, border, rounded corners, full width, padding top and bottom of 2, font color gray, focus shadow outline, required field and call updateTotalPrice function on change -->
          <select
            id="product_id"
            v-model="form.coupon_id"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            @change="updatePrice"
          >
            <!-- A loop to display the list of products with their names and prices -->
            <option
              v-for="coupon in coupons"
              :key="coupon.id"
              :value="coupon.id"
            >
              {{ coupon.id }} - ${{ coupon.price }}
            </option>
          </select>
        </div>
        <!-- A div container with margin bottom of 4 -->
        <div class="mb-4">
          <!-- A label for Quantity input with font color gray, font weight bold and margin bottom of 2 -->
          <label for="quantity" class="block text-gray-700 font-bold mb-2"
            >Quantity:</label
          >
          <!-- An input field for entering quantity with type number, shadow, border, rounded corners, full width, padding top and bottom of 2, font color gray, focus shadow outline, required field and call updateTotalPrice function on change -->
          <input
            type="number"
            id="quantity"
            v-model="form.quantity"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            @input="updatePrice"
          />
        </div>
        <!-- A div container with margin bottom of 4 -->
        <div class="mb-4">
          <!-- A label for Total Price input with font color gray, font weight bold and margin bottom of 2 -->
          <label for="total_price" class="block text-gray-700 font-bold mb-2"
            >Total Price:</label
          >
          <!-- An input field for     total price with type number, shadow, border, rounded corners, full width, padding top and bottom of 2, font color gray, disabled, and required field -->
          <input
            type="number"
            id="total_price"
            v-model="form.total_price"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  
          />
        </div>
        <!-- A div container with margin bottom of 4 -->
        <div class="mb-4">
          <!-- A label for Status dropdown with font color gray, font weight bold and margin bottom of 2 -->
          <label for="status" class="block text-gray-700 font-bold mb-2"
            >Status:</label
          >
          <!-- A dropdown for selecting order status with shadow, border, rounded corners, full width, padding top and bottom of 2, font color gray, focus shadow outline, and required field -->
          <select
            id="redeemed"
            v-model="form.redeemed"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <!-- Options for order status -->
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
        <!-- A div container with flexbox layout, items centered and justified space between -->
        <div class="flex items-center justify-between">
          <!-- A button to submit the form with background color blue, font color white, font weight bold, padding top and bottom of 2, padding left and right of 4, rounded corners, focus shadow outline -->
          <button
            type="submit"
            class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Order
          </button>
          <!-- A router link to cancel the form with background color gray, font color white, font weight bold, padding top and bottom of 2, padding left and right of 4, rounded corners, focus shadow outline -->
          <router-link
            to="/orders"
            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >Cancel</router-link
          >
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import axios from "axios"; // import axios library for HTTP requests
  import { ref, onMounted } from "vue"; // import ref and onMounted functions from Vue
  import { useRouter } from "vue-router"; // import useRouter function from Vue Router
  import { useAuthStore } from "@/stores/auth"; // import useAuthStore function from the auth store
  
  const router = useRouter(); // create router variable using useRouter function
  
  const authStore = useAuthStore(); // create authStore variable using useAuthStore function from the auth store
  
  const form = ref({
    // create form variable with initial values
    user_id: null,
    product_id: null,
    quantity: null,
    total_price: null,
    redeemed: "pending",
  });
  
  const users = ref([]); // create users variable as an empty array
  const coupons = ref([]); // create products variable as an empty array
  
  onMounted(async () => {
    // run this code when the component is mounted
    try {
      const [usersResponse, couponsResponse] = await Promise.all([
        axios.get("http://localhost:8000/api/users", {
          // get users data
          headers: {
            // set headers for authentication
            Authorization: `Bearer ${authStore.accessToken}`,
          },
        }),
        axios.get("http://localhost:8000/api/coupons", {
          // get products data
          headers: {
            // set headers for authentication
            Authorization: `Bearer ${authStore.accessToken}`,
          },
        }),
      ]);
  
      users.value = usersResponse.data.data; // set users variable with response data
      console.log(users.value);
      coupons.value = couponsResponse.data.data; // set products variable with response data
      console.log(coupons.value);
    } catch (error) {
      // handle any errors
      console.log(error);
    }
  });
  
  const createOrder = async () => {
    // function to create a new order
    try {
      const response = await axios.post(
        // make an API request to create a new order
        "http://localhost:8000/api/orders", // endpoint for creating orders
        form.value, // data for creating order
        {
          headers: {
            // set headers for authentication
            Authorization: `Bearer ${authStore.accessToken}`,
          },
        }
      );
  
      router.push({ name: "orderlist" }); // navigate to order list page after order creation
    } catch (error) {
      // handle any errors
      console.log(error);
    }
  };

  const updatePrice = () => {
    const coupon = coupons.value.find((coupon) => coupon.id === Number(form.value.coupon_id));
    if(coupon) {
      form.value.total_price = coupon.price * form.value.quantity;
    };
  }
  </script>