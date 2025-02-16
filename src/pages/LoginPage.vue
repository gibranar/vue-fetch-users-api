<template>
    <div
        class="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div class="relative">
            <div
                class="absolute -top-20 -left-20 w-40 h-40 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob">
            </div>
            <div
                class="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000">
            </div>

            <LoginCard />
        </div>
    </div>
</template>

<script setup>
import LoginCard from "../components/organisms/LoginCard.vue";
</script>

<style>
.bg-grid-pattern {
    background-image: linear-gradient(to right, #e5e7eb 1px, transparent 1px),
        linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
    background-size: 24px 24px;
}

@keyframes blob {
    0% {
        transform: scale(1);
    }

    33% {
        transform: scale(1.1) translate(10px, -10px);
    }

    66% {
        transform: scale(0.9) translate(-10px, 10px);
    }

    100% {
        transform: scale(1);
    }
}

.animate-blob {
    animation: blob 7s infinite;
}

.animation-delay-2000 {
    animation-delay: 2s;
}
</style>
