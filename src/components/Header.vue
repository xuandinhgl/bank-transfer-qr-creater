<script setup lang="ts">
defineEmits(["addQr"])
</script>

<template>
  <div class="flex gap-5 dark:bg-gray-600 px-4 py-2 rounded-t">
    <button
        type="button"
        class="border border-gray-400 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto dark:hover:bg-gray-600 dark:hover:text-white inline-flex items-center justify-center"
        @click="$emit('addQr')"
        title="Tạo mới QR"
    >
      <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4V20M4 12H20" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="sr-only">Tạo mới QR</span>
    </button>
  </div>
</template>

<style scoped>

</style>