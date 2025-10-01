<script setup>
import BaseModal from "../base-components/BaseModal.vue";
import BaseInput from "../base-components/BaseInput.vue";
import BaseBtn from "../base-components/BaseBtn.vue";
import { useProductStore } from "~/stores/product-store";

const props = defineProps(["show", "categories"]);
const productStore = useProductStore();
const { productInput, edit } = storeToRefs(productStore);
const emits = defineEmits(["toggleProductModal", "getProducts"]);
const loading = ref(false);

async function submitInput() {
    loading.value = true;
    try {
        const url = edit.value
            ? "/api/admin/product/update"
            : "/api/admin/product/create";
        const method = edit.value ? "PUT" : "POST";
        const res = await $fetch(url, {
            method,
            body: JSON.stringify(productInput.value),
        });
        loading.value = false;
        successMsg(res.data.message);
        closeHandler();
        emits("getProducts");
    } catch (err) {
        loading.value = false;
        apiErrorHandler(err);
    }
}

function closeHandler() {
    emits("toggleProductModal");
}
</script>
<template>
    <BaseModal v-show="show">
        <template #title>
            <h1 class="text-2xl">
                <!-- {{ edit ? "Update Product" : "Create Product" }} -->
                Create Products
            </h1>
        </template>

        <template #body>
            <div class="flex flex-col gap-2">
                <BaseInput v-model="productInput.name" :type="'text'" :placeholder="'Enter product name'" />
                <BaseInput v-model="productInput.price" :type="'text'" :placeholder="'Enter product price'" min="1" />
                <BaseInput v-model="productInput.color" :type="'text'" :placeholder="'Enter product color'" />
                <select
                    class="w-full px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    v-model="productInput.categoryId">
                    <option value="">Categories</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}
                    </option>
                </select>
            </div>

        </template>

        <template #footer>
            <BaseBtn class="bg-slate-400" @click="closeHandler" label="Close"></BaseBtn>
            <BaseBtn class="bg-blue-400" :loading="loading" @click="submitInput" :label="edit ? 'Update' : 'Create'">
            </BaseBtn>
        </template>
    </BaseModal>
</template>
