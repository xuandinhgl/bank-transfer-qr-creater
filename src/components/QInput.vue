<script setup lang="ts">
defineProps({
  modelValue: {
    type: [String, Number],
    default: ""
  },
  label: {
    type: String,
    default: ""
  },
  placeholder: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: "text"
  }
})
const emit = defineEmits(["update:modelValue"])
const onInput = (event: any) => {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div class="py-4">
    <label v-if="label" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{label}}</label>
    <input :type="type" step="1" :value="modelValue" @input="onInput"
           :placeholder="placeholder"
           class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  </div>
</template>

<style scoped>

</style>