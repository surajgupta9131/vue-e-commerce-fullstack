<script setup>
import { Loader2 } from 'lucide-vue-next';

const props = defineProps(["loading","label"]);
</script>
<template>
  <button
  class=" flex w-full justify-center bg-blue-500 text-white font-bold py-2 px-4 rounded items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
  :disabled="loading"
>
 <Loader2 v-if="loading" class="animate-spin" :size="24"  />

  {{label}}
</button>
</template>