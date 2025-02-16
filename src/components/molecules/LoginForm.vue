<template>
    <form @submit.prevent="handleSubmit" class="space-y-6">
        <BaseInput id="username" label="Username" v-model="form.username" placeholder="Enter your username" />
        <BaseInput id="password" type="password" label="Password" v-model="form.password"
            placeholder="Enter your password" />

        <div class="flex space-x-4">
            <BaseButton type="submit" :loading="loading">
                {{ loading ? 'Signing in...' : 'Sign In' }}
            </BaseButton>
            <BaseButton type="button" variant="secondary" @click="$emit('register')" :disabled="loading">
                Create Account
            </BaseButton>
        </div>
    </form>
</template>

<script setup>
import BaseInput from '../atoms/BaseInput.vue'
import BaseButton from '../atoms/BaseButton.vue'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const form = ref({
    username: '',
    password: ''
})

const router = useRouter()
const loading = ref(false)
const emit = defineEmits(['register', 'submit', 'error'])

const handleSubmit = async () => {
    if (loading.value) return

    loading.value = true

    try {
        const response = await fetch('http://127.0.0.1:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form.value)
        })

        const data = await response.json()

        if (response.ok) {
            localStorage.setItem('token', `Bearer ${data.data.token}`)
            emit('submit', 'Login successful! 🎉')
            setTimeout(() => {
                router.push('/dashboard')
            }, 1000);
        } else {
            if (data.error) {
                emit('error', data.error)
            } 
            throw new Error(data.data.message || 'Login failed')
        }
    } catch (error) {
        console.error('Error logging in:', error)
    } finally {
        loading.value = false
    }
}

</script>