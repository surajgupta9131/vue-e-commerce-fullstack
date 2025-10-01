<script setup>
import { Edit, Trash } from 'lucide-vue-next'

const props = defineProps(['categories'])
const emits = defineEmits(['editCategory', 'deleteCategory'])

const onEdit = (category) => {
  emits('editCategory', category)
}

const onDelete = (category) => {
  emits('deleteCategory', category)
}
</script>

<template>
  <table class="bg-white rounded-md w-full shadow-sm border border-gray-300">
    <thead>
      <tr class="bg-gray-100 text-left text-gray-700">
        <th class="border border-gray-300 py-3 px-4">#</th>
        <th class="border border-gray-300 py-3 px-4">Name</th>
        <th class="border border-gray-300 py-3 px-4">Actions</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="(category, index) in categories"
        :key="category.id"
        class="hover:bg-gray-50 transition"
      >
        <td class="border border-gray-300 py-2 px-4">{{ index + 1 }}</td>
        <td class="border border-gray-300 py-2 px-4">{{ category.name }}</td>
        <td class="border border-gray-300 py-2 px-4">
          <div class="flex gap-2">
            <button
              @click="onEdit(category)"
              class="p-1 rounded hover:bg-blue-100 text-blue-600 transition"
              title="Edit"
            >
              <Edit :size="18" />
            </button>
            <button
              @click="onDelete(category)"
              class="p-1 rounded hover:bg-red-100 text-red-600 transition"
              title="Delete"
            >
              <Trash :size="18" />
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
