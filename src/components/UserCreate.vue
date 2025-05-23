<template>
    <!-- A container with some padding -->
    <div class="p-4">
      <!-- A button to go back to the previous page -->
      <button
        class="bg-gray-300 hover:bg-gray-400 transition-colors rounded-md py-2 px-4 mb-6"
        @click="goBack"
      >
        &larr; Back
      </button>
      <!-- A heading to indicate the purpose of the page -->
      <h1 class="text-3xl font-bold mb-4">Create User</h1>
      <!-- A form to capture user details -->
      <form class="flex flex-col space-y-4" @submit.prevent="createUser">
        <!-- A label and input field for user name -->
        <label class="text-lg font-semibold" for="name">Name:</label>
        <input
          class="border rounded-md p-2"
          v-model="name"
          type="text"
          id="name"
          required
        />
        <!-- A label and input field for user email -->
        <label class="text-lg font-semibold" for="email">Email:</label>
        <input
          class="border rounded-md p-2"
          v-model="email"
          type="email"
          id="email"
          required
        />
        <!-- A label and input field for user password -->
        <label class="text-lg font-semibold" for="password">Password:</label>
        <input
          class="border rounded-md p-2"
          v-model="password"
          type="password"
          id="password"
          required
        />
        <!-- A button to submit the form -->
        <button
          class="bg-orange-500 text-white rounded-md py-2 px-4 hover:bg-orange-600 transition-colors"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  </template>
  
  <!-- Script section -->
  <script setup>
  // Import required dependencies
  import axios from "axios";
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useAuthStore } from "@/stores/auth";
  
  // Get the authentication store and router instances
  const authStore = useAuthStore();
  const router = useRouter();
  
  // Define reactive variables to store user details
  const name = ref("");
  const email = ref("");
  const password = ref("");
  
  // Function to go back to the previous page
  const goBack = () => {
    router.go(-1);
  };
  
  // Function to create a new user
  const createUser = async () => {
    try {
      // Send a POST request to the API to create a new user
      const response = await axios.post(
        "http://localhost:8000/api/users",
        {
          name: name.value,
          email: email.value,
          password: password.value,
        },
        {
          // Include the access token in the request headers for authentication
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`,
          },
        }
      );
      // Log the response data to the console
      console.log(response.data);
      // Reset the form fields
      name.value = "";
      email.value = "";
      password.value = "";
      // Navigate to the user list page
      router.push("/users");
    } catch (error) {
      // Log any errors to the console
      console.error(error);
    }
  };
  </script>
  
  <!-- No style required -->
  <style></style>