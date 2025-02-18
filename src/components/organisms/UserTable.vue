<template>
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <div class="p-4 border-b">
            <BaseInput placeholder="Search users..." v-model="searchQuery" @input="handleSearch" />
        </div>
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <TableHeader v-for="header in headers" :key="header.field" :label="header.label"
                            :field="header.field" :sort-field="sortField" :sort-direction="sortDirection"
                            @sort="handleSort" />
                        <th class="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="user in sortedAndFilteredUsers" :key="user.id">
                        <td class="px-6 py-4 whitespace-nowrap">{{ user.id }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ user.username }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ user.name }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ user.email }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-right space-x-2">
                            <BaseButton variant="primary" class="!px-3 !py-2 !text-sm" @click="$emit('update', user)">
                                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z">
                                    </path>
                                    <path fill-rule="evenodd"
                                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                Update
                            </BaseButton>
                            <BaseButton variant="danger" class="!px-6 !py-2 !text-sm" @click="handleDelete(user.id)">
                                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                Delete
                            </BaseButton>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import BaseInput from '../atoms/BaseInput.vue';
import BaseButton from '../atoms/BaseButton.vue';
import TableHeader from '../molecules/TableHeader.vue'
import { computed, ref } from 'vue';


const props = defineProps({
    users: Array
})
const emit = defineEmits(['update', 'delete'])

const searchQuery = ref('')
const sortField = ref('id')
const sortDirection = ref('asc')

const headers = [
    { label: 'ID', field: 'id' },
    { label: 'Username', field: 'username' },
    { label: 'Name', field: 'name' },
    { label: 'Email', field: 'email' }
]

const sortedAndFilteredUsers = computed(() => {
    let filtered = props.users.filter(user => {
        return Object.values(user).some(value =>
            value?.toString().toLowerCase().includes((searchQuery.value || '').toLowerCase())
        )
    })

    return filtered.sort((a, b) => {
        let modifier = sortDirection.value === 'asc' ? 1 : -1
        if (a[sortField.value] < b[sortField.value]) return -1 * modifier
        if (a[sortField.value] > b[sortField.value]) return 1 * modifier
        return 0
    })
})

const handleSort = (field) => {
    if (sortField.value === field) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
    } else {
        sortField.value = field
        sortDirection.value = 'asc'
    }
}

const handleSearch = (event) => {
    searchQuery.value = event.target.value
}

const handleDelete = async (userId) => {
    try {
        emit('delete', userId)
    } catch (error) {
        console.error('Error deleting user:', error)
    }
}
</script>