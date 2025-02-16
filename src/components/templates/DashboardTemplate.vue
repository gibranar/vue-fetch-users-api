<template>
    <div class="min-h-screen bg-gray-100">
        <header class="bg-white shadow">
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold text-gray-900">User Dashboard</h1>
            </div>
        </header>
        <main>
            <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div class="px-4 py-6 sm:px-0">
                    <UserTable :users="users" @update="handleUpdate" @delete="handleDelete" />

                    <div v-if="Object.keys(errors).length > 0"
                        class="mt-6 p-4 rounded-lg bg-red-50 border border-red-200">
                        <ul>
                            <li v-for="(messages, field) in errors" :key="field"
                                class="text-red-600 text-sm text-center">
                                {{ messages[0] }}
                            </li>
                        </ul>
                    </div>
                    <div v-if="successMessage" class="mt-6 p-4 rounded-lg bg-green-50 border border-green-200">
                        <p class="text-green-600 text-sm text-center">{{ successMessage }}</p>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import UserTable from '../organisms/UserTable.vue'
import { useRouter } from 'vue-router';

const emit = defineEmits(['update', 'delete'])
const users = ref([])
const router = useRouter()
const errors = ref({});
const successMessage = ref('');

async function fetchUsers() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/users', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        const data = await response.json()
        users.value = data.data
    } catch (error) {
        console.error('Error fetching users:', error)
    }
}

const handleUpdate = (user) => {
    emit('update', user)
    router.push(`/dashboard/user/${user.id}`)
}

const handleDelete = async (userId) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })

        if (response.ok) {
            successMessage.value = 'User deleted successfully! 🎉'
            setTimeout(() => {
                successMessage.value = ''
            }, 2000);
            users.value = users.value.filter(user => user.id !== userId)
        } else {
            const data = await response.json()
            errors.value = data.errors || { general: ['Delete failed'] }
            setTimeout(() => {
                errors.value = {}
            }, 2000);
            throw new Error(data.message || 'Delete failed')
        }

    } catch (error) {
        console.error('Error deleting user:', error)
    }
}

fetchUsers()
</script>