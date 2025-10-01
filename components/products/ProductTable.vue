<script setup>
import { Edit, Trash } from 'lucide-vue-next'

const props = defineProps(['products'])
const emits = defineEmits(['editProducts', 'deleteProduct'])

const handleEdit = (product) => {
  emits('editProducts', product)
}

const handleDelete = (product) => {
  emits('deleteProduct', product)
}
</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white rounded-md shadow border border-gray-200">
      <thead>
        <tr class="bg-gray-50 text-left text-gray-600 text-sm uppercase tracking-wider">
          <th class="py-3 px-4 border-b">#</th>
          <th class="py-3 px-4 border-b">Name</th>
          <th class="py-3 px-4 border-b">Category</th>
          <th class="py-3 px-4 border-b">Color</th>
          <th class="py-3 px-4 border-b">Price</th>
          <th class="py-3 px-4 border-b text-center">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr 
          v-for="(product, index) in products" 
          :key="product.id"
          class="hover:bg-gray-50 text-sm text-gray-700"
        >
          <td class="py-3 px-4 border-b">{{ index + 1 }}</td>
          <td class="py-3 px-4 border-b font-medium">{{ product?.name }}</td>
          <td class="py-3 px-4 border-b">{{ product.category?.name }}</td>
          <td class="py-3 px-4 border-b">
            <span 
              class="inline-block w-4 h-4 rounded-full border border-gray-300"
              :style="{ backgroundColor: product.color }"
              :title="product.color"
            ></span>
          </td>
          <td class="py-3 px-4 border-b">₹{{ product.price }}</td>
          <td class="py-3 px-4 border-b text-center">
            <button
              @click="handleEdit(product)"
              class="text-blue-600 hover:text-blue-800 mr-3"
              title="Edit"
            >
              <Edit :size="18" />
            </button>
            <button
              @click="handleDelete(product)"
              class="text-red-600 hover:text-red-800"
              title="Delete"
            >
              <Trash :size="18" />
            </button>
          </td>
        </tr>

        <!-- If no products -->
        <tr v-if="products.length === 0">
          <td colspan="6" class="text-center text-gray-500 py-6">
            No products found.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
