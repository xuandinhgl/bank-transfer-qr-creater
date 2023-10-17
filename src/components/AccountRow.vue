<script setup lang="ts">
import {formatCurrency} from "../utils.ts";
import {PropType} from "vue";
import {Account} from "../types.ts";

defineProps({
  account: {
    type: Object as PropType<Account>,
    required: true
  }
})

defineEmits(['openQr', 'delete'])
</script>

<template>
  <li
      @click="$emit('openQr', account.id)"
      class=" px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center cursor-pointer">
    <img :src="account?.bankInfo?.logo" alt="" class="max-h-[30px] dark:bg-white mr-2 rounded">
    <div>
      {{ account.name }} - {{ formatCurrency(account.amount || 0) }}
      <p>
        {{ account?.bankInfo?.name }}
      </p>
    </div>
    <button
        type="button"
        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white ml-auto"
        @click.prevent="$emit('delete', false)"
    >
      <svg
          class="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
      >
        <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
      <span class="sr-only">Delete account</span>
    </button>
  </li>
</template>

<style scoped>

</style>