<template>
    <div class="p-4">
        <div class="mb-4">
            <router-link to="/schedule" class="bg-gray-300 hover:bg-gray-400 transition-colors rounded-md py-2 px-4">&larr; Back</router-link>
        </div>
        <h1 class="text-3xl font-bold mb-4">Edit Schedule</h1>
        <form class="flex flex-col space-y-4" v-if="schedule" @submit.prevent="updateSchedule">
        <label class="text-lg font-semibold" for="day_of_week">Day of Week:</label>
        <input class="border rounded-md p-2" v-model="schedule.day_of_week" type="text" id="day_of_week"/>
        <br/>
        <label class="text-lg font-semibold" for="menu_items">Menu Items:</label>
        <input class="border rounded-md p-2" v-model="schedule.menu_items" type="text" id="menu_items" />
        <br/>
        <label class="text-lg font-semibold" for="description">Description:</label>
        <input class="border rounded-md p-2" v-model="schedule.description" type="text" id="description" />
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
const schedule = ref(null);

onMounted(async () => {
    const response = await axios.get(
        `http://localhost:8000/api/schedules/${route.params.id}`
    );
    schedule.value = response.data.data;
});

const updateSchedule = async () => {
    await axios.put(`http://localhost:8000/api/schedules/${schedule.value.id}`, {
        day_of_week: schedule.value.day_of_week,
        menu_items: schedule.value.menu_items,
        description: schedule.value.description,
    });
    router.push(`/schedule/${schedule.value.id}`);
};
</script>