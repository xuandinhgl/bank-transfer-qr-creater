<script setup lang="ts">
import Modal from "./Modal.vue";
import {useSyncProps} from "../useSyncProps.ts";
import {computed, PropType} from "vue";
import {Account} from "../types.ts";
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  account: {
    type: Object as PropType<Account>,
    required: true
  }
})

const emit = defineEmits(["update:modelValue"])

const isShow = useSyncProps<boolean, typeof props>(props, "modelValue", emit)

</script>

<template>
  <Modal v-model="isShow" footer>
    <div class="max-w-[300px] p-1 border">
      <img width="290" height="344" :src="account?.qr" alt="" class="mx-auto">
    </div>
    <template #footer>
      <div class="flex gap-3">
        <button
           type="button"
           @click="$emit('update:modelValue', false)"
            class="w-full flex items-center text-green-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-green-500 dark:border-gray-500 dark:hover:text-green-400 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          <svg fill="currentcolor" class="mr-2" width="20px" height="20px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
            <path d="M790.706 338.824v112.94H395.412c-31.06 0-56.47 25.3-56.47 56.471v744.509c17.73-6.325 36.592-10.391 56.47-10.391h1129.412c19.877 0 38.738 4.066 56.47 10.39V508.236c0-31.171-25.412-56.47-56.47-56.47h-395.295V338.824h395.295c93.402 0 169.411 76.009 169.411 169.411v1242.353c0 93.403-76.01 169.412-169.411 169.412H395.412C302.009 1920 226 1843.99 226 1750.588V508.235c0-93.402 76.01-169.411 169.412-169.411h395.294Zm734.118 1016.47H395.412c-31.06 0-56.47 25.299-56.47 56.47v338.824c0 31.172 25.41 56.47 56.47 56.47h1129.412c31.058 0 56.47-25.298 56.47-56.47v-338.823c0-31.172-25.412-56.47-56.47-56.47ZM1016.622-.023v880.151l246.212-246.325 79.85 79.85-382.532 382.644-382.645-382.644 79.85-79.85L903.68 880.128V-.022h112.941ZM564.824 1468.235c-62.344 0-112.942 50.71-112.942 112.941s50.598 112.942 112.942 112.942c62.343 0 112.94-50.71 112.94-112.942 0-62.23-50.597-112.94-112.94-112.94Z" fill-rule="evenodd"/>
          </svg>
          Đóng
        </button>

      </div>
    </template>
  </Modal>
</template>

<style scoped>

</style>