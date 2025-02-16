<template>
    <div class="w-full max-w-md">
        <div class="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 border border-gray-100">
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p class="text-gray-600">Please sign in to continue</p>
            </div>

            <LoginForm @register="handleRegister" @submit="handleSuccess" @error="handleError" />

            <div v-if="error" class="mt-6 p-4 rounded-lg bg-red-50 border border-red-200">
                <p class="text-red-600 text-sm text-center">{{ error }}</p>
            </div>
            <div v-if="successMessage" class="mt-6 p-4 rounded-lg bg-green-50 border border-green-200">
                <p class="text-green-600 text-sm text-center">{{ successMessage }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import LoginForm from '../molecules/LoginForm.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const error = ref('')
const successMessage = ref('')

const handleSuccess = (message) => {
    successMessage.value = message
    error.value = ''
}
const handleRegister = () => {
    router.push('/register')
}
const handleError = (errorMessage) => {
    error.value = errorMessage
}

</script>