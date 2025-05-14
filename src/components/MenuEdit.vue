<template>
    <div class="p-4">
        <div class="mb-4">
            <router-link to="/menu" class="bg-gray-300 hover:bg-gray-400 transition-colors rounded-md py-2 px-4">&larr; Back</router-link>
        </div>
        <h1 class="text-3xl font-bold mb-4">Edit Menu</h1>
        <form class="flex flex-col space-y-4" v-if="menu" @submit.prevent="updateMenu">
        <label class="text-lg font-semibold" for="dish_name">Dish Name:</label>
        <input class="border rounded-md p-2" v-model="menu.dish_name" type="text" id="dish_name"/>
        <br/>
        <label class="text-lg font-semibold" for="dish_category">Dish Category:</label>
        <input class="border rounded-md p-2" v-model="menu.dish_category" type="text" id="dish_category" />
        <br/>
        <label class="text-lg font-semibold" for="image">Image URL:</label>
        <input class="border rounded-md p-2" v-model="menu.image" type="text" id="image" />
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
const menu = ref(null);

onMounted(async () => {
    const response = await axios.get(
        `http://localhost:8000/api/menus/${route.params.id}`
    );
    menu.value = response.data.data;
});

const updateMenu = async () => {
    await axios.put(`http://localhost:8000/api/menus/${menu.value.id}`, {
        dish_name: menu.value.dish_name,
        dish_category: menu.value.dish_category,
        image: menu.value.image,
    });
    router.push(`/menu/${menu.value.id}`);
};
</script>