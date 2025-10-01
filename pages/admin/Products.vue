<script setup>
import ProductTable from '~/components/products/ProductTable.vue';



definePageMeta({
  layout: "admin",
});
const showModal = ref(false);
function toggleProductModal() {
  showModal.value = !showModal.value;
}

const productStore = useProductStore();
const { productInput, edit } = storeToRefs(productStore);
const { data: productList, getProducts } = await productStore.fetchProducts()

const categoryStore = useCategoryStore()
const { data } = await categoryStore.fetchCategories()

function showProductModal() {
  showModal.value = true;
}

function editProduct(product) {
  toggleProductModal()
  productInput.value = product
  edit.value = true
}
</script>
<template>
  <div class="h-screen">
    <div class="flex justify-end mb-4. pt-4">
      <BaseBtn label="create" @click="showProductModal"></BaseBtn>

      <ProductModal  :categories="data?.data?.categories" @toggleProductModal="toggleProductModal"
        @getProducts="getProducts" :show="showModal"></ProductModal>
    </div>
    <ProductTable :products="productList.data.products"  ></ProductTable>
  </div>
</template>
