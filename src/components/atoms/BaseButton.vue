<template>
    <button :type="type"
        :class="`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:-translate-y-0.5 cursor-pointer ${variantClasses[variant]}`"
        @click="$emit('click')" :disabled="loading">
        <div class="flex items-center justify-center">
            <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
            </svg>
            <slot></slot>
        </div>
    </button>
</template>

<script setup>
defineProps({
    type: String,
    variant: {
        type: String,
        default: 'primary',
        validator: value => ['primary', 'secondary', 'danger'].includes(value)
    },
    loading: Boolean
})
const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
    danger: 'bg-red-700 hover:bg-red-700 text-white',
}
defineEmits(['click'])
</script>