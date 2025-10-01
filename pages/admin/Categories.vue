<script setup>
import CategoryModal from "../../components/categories/CategoryModal.vue"
definePageMeta({
  layout: "admin",
});

// const showModal = ref(false);

// function toggleCategoryModal() {
//   showModal.value = !showModal.value;
// }

// const categoryStore=useCategoryStore()
// const {categoryInput,edit}=storeToRefs(categoryStore)

// const {data,getCategories}=await categoryStore.fetchCategories()

// function editCategory(category){
//   categoryInput.value=category
//   edit.value=true
//   toggleCategoryModal()
// }
</script>
<template>
  <div class="h-screen">
    <div class="flex justify-end mb-4. pt-4">
      <CategoryModal :loading="true" :show="true"> </CategoryModal>
    </div>
    <!-- <CategoryTable></CategoryTable> -->
  </div>
</template>
