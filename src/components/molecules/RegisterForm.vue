<template>
    <form @submit.prevent="handleSubmit" class="space-y-6">
        <BaseInput id="username" label="Username" v-model="form.username" placeholder="Enter your username" />
        <BaseInput id="name" label="Name" v-model="form.name" placeholder="Enter your name" />
        <BaseInput id="email" type="email" label="Email" v-model="form.email" placeholder="Enter your email" />
        <BaseInput id="password" type="password" label="Password" v-model="form.password"
            placeholder="Enter your password" />
        <BaseInput id="c_password" type="password" label="Confirm Password" v-model="form.confirm_password"
            placeholder="Confirm your password" />
        <p v-if="passwordMissmatch" class="text-red-500 text-sm -mt-2 mb-4">Passwords do not match</p>

        <div class="flex space-x-4">
            <BaseButton type="submit" :loading="loading">
                {{ loading ? 'Creating Account...' : 'Create Account' }}
            </BaseButton>
            <BaseButton type="button" variant="secondary" @click="$emit('login')" :disabled="loading">
                Sign In
            </BaseButton>
        </div>
    </form>
</template>

<script setup>
import BaseInput from '../atoms/BaseInput.vue';
import BaseButton from '../atoms/BaseButton.vue';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const form = ref({
    username: '',
    name: '',
    email: '',
    password: '',
    confirm_password: ''
})

const router = useRouter()
const loading = ref(false)
const emit = defineEmits(['login', 'submit', 'error'])

const passwordMissmatch = computed(() => {
    return form.value.password !== form.value.confirm_password && form.value.confirm_password.length > 0
})

const handleSubmit = async () => {
    if (loading.value) return

    if (passwordMissmatch.value) {
        emit('error', 'Passwords do not match!')
        return
    }

    loading.value = true

    try {
        const response = await fetch('http://127.0.0.1:8000/api/register', {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify(form.value)
        })

        const data = await response.json()

        if (response.ok) {
            emit('submit', 'Account created successfully! 🎉')
            setTimeout(() => {
                router.push('/')
            }, 1000)
        } else {
            throw new Error(data.data || 'Registration failed')
        }

    } catch (error) {
        emit('error', error.message)
    } finally {
        loading.value = false
    }
}

</script>