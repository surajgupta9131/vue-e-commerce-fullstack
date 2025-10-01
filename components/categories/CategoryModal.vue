<script setup>
const props = defineProps(["show"]);
const categoryInput = ref({name:''})
import BaseModal from '../base-components/BaseModal.vue';
import BaseInput from '../base-components/BaseInput.vue';
import BaseBtn from '../base-components/BaseBtn.vue';


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
       
      <BaseBtn class="bg-slate-400" 
      label="Close"></BaseBtn>
        <BaseBtn class="bg-blue-400" 
      label="Save"></BaseBtn>
    </template>
  </BaseModal>
</template>