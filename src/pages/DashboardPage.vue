<template>
    <div>
        <DashboardTemplate :users="users" @update="handleUpdate" @delete="confirmDelete">
            <div v-if="successMessage" class="mt-6 p-4 rounded-lg bg-green-50 border border-green-200">
                <p class="text-green-600 text-sm text-center">{{ successMessage }}</p>
            </div>
            <div v-if="Object.keys(errors).length > 0" class="mt-6 p-4 rounded-lg bg-red-50 border border-red-200">
                <ul>
                    <li v-for="(messages, field) in errors" :key="field" class="text-red-600 text-sm text-center">
                        {{ messages[0] }}
                    </li>
                </ul>
            </div>
        </DashboardTemplate>

        <div id="modal" class="fixed inset-0 bg-black/50 flex items-center justify-center" v-if="isModalOpen">
            <div class="bg-white p-6 rounded-lg w-96">
                <h2 class="text-xl font-semibold mb-4">Are you sure you want to delete?</h2>
                <p class="mb-4">This action cannot be undone.</p>
                <div class="flex justify-end">
                    <BaseButton variant="secondary" @click="closeModal" class="mr-2">Cancel</BaseButton>
                    <BaseButton variant="danger" @click="deleteUser">Delete</BaseButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import DashboardTemplate from '../components/templates/DashboardTemplate.vue';
import BaseButton from '../components/atoms/BaseButton.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const users = ref([]);
const isModalOpen = ref(false);
const userIdToDelete = ref(null);
const successMessage = ref('');
const errors = ref({});
const router = useRouter();

const fetchUsers = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/users', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
        const data = await response.json();
        users.value = data.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

const handleUpdate = (user) => {
    router.push(`/dashboard/user/${user.id}`);
};

const confirmDelete = (userId) => {
    userIdToDelete.value = userId;
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
    userIdToDelete.value = null;
};

const deleteUser = async () => {
    if (!userIdToDelete.value) return;

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/users/${userIdToDelete.value}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });

        if (response.ok) {
            successMessage.value = 'User deleted successfully! 🎉';
            users.value = users.value.filter(user => user.id !== userIdToDelete.value);
            setTimeout(() => successMessage.value = '', 2000);
        } else {
            const data = await response.json();
            errors.value = data.errors || { general: ['Delete failed'] };
            setTimeout(() => errors.value = {}, 2000);
        }
    } catch (error) {
        console.error('Error deleting user:', error);
    } finally {
        closeModal();
    }
};

fetchUsers();
</script>
