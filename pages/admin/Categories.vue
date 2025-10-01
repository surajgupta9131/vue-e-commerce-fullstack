<script setup>
import CategoryModal from "../../components/categories/CategoryModal.vue";
import { useCategoryStore } from "../../stores/category-store";


definePageMeta({
  layout: "admin",
});
const categoryStore = useCategoryStore()
const { categoryInput, edit } = storeToRefs(categoryStore)
const { getCategories , data } = await categoryStore.fetchCategories()


const showModal = ref(false);


function toggleCategoryModal() {
  showModal.value = !showModal.value;
}

function showCategoryModal() {
  showModal.value = true;
}

function editCategory(category) {
  toggleCategoryModal()
  categoryInput.value = category
  edit.value = true
}
</script>
<template>
  <div class="h-screen">
    {{ categoryInput }}
    <div class="flex justify-end mb-4. pt-4">
      <BaseBtn label="create" @click="showCategoryModal"></BaseBtn>

      <CategoryModal @toggleCategoryModal="toggleCategoryModal" @getCategories="getCategories" :show="showModal">
      </CategoryModal>
    </div>
    <CategoryTable :categories="data?.data?.categories" @editCategory="editCategory"></CategoryTable>
  </div>
</template>
