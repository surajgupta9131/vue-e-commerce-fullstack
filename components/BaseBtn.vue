<script setup>
import { Loader2 } from 'lucide-vue-next'

const props = defineProps({
  loading: Boolean,
  label: String,
  type: {
    type: String,
    default: 'button',
  },
})

// This ensures native events/attributes are passed down
defineOptions({ inheritAttrs: true })
</script>

<template>
  <button
    v-bind="$attrs"
    :type="type"
    :disabled="loading"
    class="flex w-full justify-center bg-blue-500 text-white font-bold py-2 px-4 rounded items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <Loader2 v-if="loading" class="animate-spin" :size="24" />
    {{ label }}
  </button>
</template>
