<script setup>
import BaseModal from "../base-components/BaseModal.vue";
import BaseInput from "../base-components/BaseInput.vue";
import BaseBtn from "../base-components/BaseBtn.vue";

const props = defineProps(["show"]);
const categoryInput = ref({ name: "" });
const emits = defineEmits(["toggleCategoryModal",'getCategories']);
const loading = ref(false);

async function submitInput() {
  loading.value = true;
  try {
    const res = await $fetch("/api/admin/category/create-category", {
      method: "POST",
      body: JSON.stringify(categoryInput.value),
    });

    loading.value = false;
     successMsg(res.data.message);
     closeHandler()
     emits("getCategories")
  } catch (err) {
    loading.value = false;
    apiErrorHandler(err)
  }
}

function closeHandler () {
  emits("toggleCategoryModal");
};
</script>
<template>
  <BaseModal v-show="show">
    <template #title>
      <h1 class="text-2xl">Create category</h1>
    </template>

    <template #body>
      <BaseInput
        v-model="categoryInput.name"
        :type="'text'"
        :placeholder="''"
      />
    </template>

    <template #footer>
      <BaseBtn
        class="bg-slate-400"
        @click="closeHandler"
        label="Close"
      ></BaseBtn>
      <BaseBtn
        class="bg-blue-400"
        :loading="loading"
        @click="submitInput"
        label="Save"
      ></BaseBtn>
    </template>
  </BaseModal>
</template>
