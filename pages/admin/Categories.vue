<script setup>
import CategoryModal from "../../components/categories/CategoryModal.vue";
import { useCategoryStore } from "../../stores/category-store";


definePageMeta({
  layout: "admin",
});
const categoryStore = useCategoryStore()
const {categoryInput,edit} = storeToRefs(categoryStore)


const showModal = ref(false);

const { data, refresh: getCategories } = useFetch(
  "/api/admin/category/get-categories",
  {
    headers: {
      Accept: "application/json",
      // Authorization:"Bearer"
    },
  }
);

function toggleCategoryModal() {
  showModal.value = !showModal.value;
}

function showCategoryModal() {
  showModal.value = true;
}

function editCategory(category) {
  toggleCategoryModal()
  categoryInput.value= category
  edit.value = true
}
</script>
<template>
  <div class="h-screen">
    {{ categoryInput }}
    <div class="flex justify-end mb-4. pt-4">
      <BaseBtn label="create" @click="showCategoryModal"></BaseBtn>

      <CategoryModal
        @toggleCategoryModal="toggleCategoryModal"
        @getCategories="getCategories"
        :show="showModal"
      >
      </CategoryModal>
    </div>
    <CategoryTable
      :categories="data?.data?.categories"
      @editCategory="editCategory"
    ></CategoryTable>
  </div>
</template>
