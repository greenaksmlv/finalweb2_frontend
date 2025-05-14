<template>
    <div class="p-4">
        <div class="mb-4">
            <router-link to="/schedule" class="bg-gray-300 hover:bg-gray-400 transition-colors rounded-md py-2 px-4">&larr; Back</router-link>     
        </div>
        <h1 class="text-3xl font-bold mb-4">Create Schedule</h1>
        <form class="flex flex-col space-y-4" @submit.prevent="createSchedule">
            <label class="text-lg font-semibold" for="day_of_week">Day of Week:</label>
            <input class="border rounded-md p-2" v-model="day_of_week" type="text" id="day_of_week" />
            <br/>
            <label class="text-lg font-semibold" for="menu_items">Menu Items:</label>
            <input class="border rounded-md p-2" v-model="menu_items" type="text" id="menu_items"/>
            <br/>
            <label class="text-lg font-semibold" for="description">Description:</label>
            <input class="border rounded-md p-2" v-model="description" type="text" id="description"/>
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
const day_of_week = ref("");
const menu_items = ref("");
const description = ref("");

const createSchedule = async () => {
    await axios.post("http://localhost:8000/api/schedules", {
        day_of_week: day_of_week.value,
        menu_items: menu_items.value,
        description: description.value,
    });
    router.push("/schedule");
};
</script>