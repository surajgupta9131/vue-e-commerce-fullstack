<script setup>
import CategoryModal from "../../components/categories/CategoryModal.vue";
definePageMeta({
  layout: "admin",
});

const showModal = ref(false);

const { data,refresh:getCategories} = useFetch("/api/admin/category/get-categories",{
headers:{
  Accept:"application/json",
  // Authorization:"Bearer"
}
});
console.log("Data:::",data)
function toggleCategoryModal() {
  showModal.value = !showModal.value;
}

// const categoryStore=useCategoryStore()
// const {categoryInput,edit}=storeToRefs(categoryStore)

// const {data,getCategories}=await categoryStore.fetchCategories()

// function editCategory(category){
//   categoryInput.value=category
//   edit.value=true
//   toggleCategoryModal()
// }
function showCategoryModal() {
  showModal.value = true;
}
</script>
<template>
  <div class="h-screen">
    <div class="flex justify-end mb-4. pt-4">
      <BaseBtn label="create" @click="showCategoryModal"></BaseBtn>

      <CategoryModal
        @toggleCategoryModal="toggleCategoryModal"
        @getCategories="getCategories"
        :show="showModal"
      >
      </CategoryModal>
    </div>
    <CategoryTable :categories="data?.data?.categories"></CategoryTable>
  </div>
</template>
