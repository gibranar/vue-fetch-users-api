<template>
    <div class="mb-4">
        <label :for="id" class="block text-sm font-semibold text-gray-700 mb-1">{{ label }}</label>
        <input :id="id" :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white/50 backdrop-blur-sm"
            :placeholder="placeholder">
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
    id: String,
    label: String,
    type: String,
    modelValue: String,
    placeholder: String
})
defineEmits(['update:modelValue'])
</script>