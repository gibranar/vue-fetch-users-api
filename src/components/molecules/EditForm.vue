<template>
    <form @submit.prevent="handleSubmit" class="space-y-6">
        <BaseInput id="username" label="Username" v-model="form.username" placeholder="Enter your username"
            :error="errors.username ? errors.username[0] : ''" />
        <BaseInput id="name" label="Name" v-model="form.name" placeholder="Enter your name"
            :error="errors.name ? errors.name[0] : ''" />
        <BaseInput id="email" type="email" label="Email" v-model="form.email" placeholder="Enter your email"
            :error="errors.email ? errors.email[0] : ''" />
        <BaseInput id="password" type="password" label="Password" v-model="form.password"
            placeholder="Enter your password" :error="errors.password ? errors.password[0] : ''" />
        <BaseInput id="c_password" type="password" label="Confirm Password" v-model="form.confirm_password"
            placeholder="Confirm your password" :error="errors.confirm_password ? errors.confirm_password[0] : ''" />

        <div class="flex space-x-4">
            <BaseButton type="submit" :loading="loading">
                {{ loading ? 'Updating User...' : 'Update User' }}
            </BaseButton>
        </div>
    </form>
</template>

<script setup>
import BaseInput from '../atoms/BaseInput.vue';
import BaseButton from '../atoms/BaseButton.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const form = ref({
    username: '',
    name: '',
    email: '',
    password: '',
    confirm_password: ''
})

const emit = defineEmits(['submit', 'error'])
const loading = ref(false)
const router = useRouter()
const user = ref({})
const errors = ref({})

const handleSubmit = async () => {
    if (loading.value) return

    loading.value = true
    errors.value = {}

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/users/${router.currentRoute.value.params.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form.value)
        })

        const data = await response.json()

        if (response.ok) {
            emit('submit', 'User updated successfully! 🎉')
            setTimeout(() => {
                router.push('/dashboard')
            }, 1000);
        } else {
            errors.value = data.errors || {}
            emit('error', data.errors || { general: ['Update failed'] })
            throw new Error(data.message || 'Update failed')
        }

    } catch (error) {
        console.error('Error updating user:', error)
    } finally {
        loading.value = false
    }
}

const fetchUser = async () => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/users/${router.currentRoute.value.params.id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })

        const data = await response.json()
        if (response.ok) {
            user.value = data.data
            form.value = { ...data.data }
        } else {
            throw new Error(data.message || 'User not found')
        }
    } catch (error) {
        console.error('Error fetching user:', error)
    }
}

fetchUser()
</script>