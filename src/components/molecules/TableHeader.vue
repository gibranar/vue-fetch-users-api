<template>
    <th @click="$emit('sort', field)"
        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50">
        <div class="flex items-center space-x-1">
            <span>{{ label }}</span>
            <span v-if="sortField === field">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
            </span>
        </div>
    </th>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
    label: String,
    field: String,
    sortField: String,
    sortDirection: String
})
defineEmits(['sort'])
</script>