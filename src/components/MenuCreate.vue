<template>
    <div class="p-4">
        <div class="mb-4">
            <router-link to="/" class="bg-gray-300 hover:bg-gray-400 transition-colors rounded-md py-2 px-4">&larr; Back</router-link>
        </div>
        <h1 class="text-3xl font-bold mb-4">Create Menu</h1>
        <form class="flex flex-col space-y-4" @submit.prevent="createMenu">
            <label class="text-lg font-semibold" for="dish_name">Dish Name:</label>
            <input class="border rounded-md p-2" v-model="dish_name" type="text" id="dish_name" />
            <br/>
            <label class="text-lg font-semibold" for="dish_category">Dish Category:</label>
            <input class="border rounded-md p-2" v-model="dish_category" type="text" id="dish_category" />
            <br/>
            <label class="text-lg font-semibold" for="image">Image URL:</label>
            <input class="border rounded-md p-2" v-model="image" type="text" id="image"/>
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
const dish_name = ref("");
const dish_category = ref("");
const image = ref("");

const createMenu = async () => {
    await axios.post("http://localhost:8000/api/menus", {
        dish_name: dish_name.value,
        dish_category: dish_category.value,
        image: image.value,
    });
    router.push("/");
};
</script>