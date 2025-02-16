<template>
    <BackButton />
    <div class="mt-4 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div class="p-6">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">Update Profile</h2>
            <EditForm @submit="handleUpdate" @error="handleError" />

            <div v-if="Object.keys(errors).length > 0" class="mt-6 p-4 rounded-lg bg-red-50 border border-red-200">
                <ul>
                    <li v-for="(messages, field) in errors" :key="field" class="text-red-600 text-sm text-center">
                        {{ messages[0] }}
                    </li>
                </ul>
            </div>
            <div v-if="successMessage" class="mt-6 p-4 rounded-lg bg-green-50 border border-green-200">
                <p class="text-green-600 text-sm text-center">{{ successMessage }}</p>
            </div>
        </div>

    </div>
</template>

<script setup>
import BackButton from '../atoms/BackButton.vue';
import EditForm from '../molecules/EditForm.vue';
import { ref } from 'vue';

const errors = ref({});
const successMessage = ref('');

const handleUpdate = (success) => {
    errors.value = '';
    successMessage.value = success;
}
const handleError = (error) => {
    if (typeof error === 'String') {
        errors.value = { message: [error] };
    } else {
        errors.value = error;
    }
}
</script>