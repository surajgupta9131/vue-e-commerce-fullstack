<script setup>
const props = defineProps(["type", "modelValue", "placeholder"]);

const emit = defineEmits(["update:modelValue"]);

function updateInput(e) {
  const value = e.target.value;
  emit("update:modelValue", value);
}


</script>

<template>
  <input
    @input="updateInput"
    :value="props.modelValue"
    :type="props.type || 'text'"
    :placeholder="props.placeholder"
    class="w-full px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
    required
  />
</template>
