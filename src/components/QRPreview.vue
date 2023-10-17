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

const emit = defineEmits(["update:modelValue", "edit"])

const isShow = useSyncProps<boolean, typeof props>(props, "modelValue", emit)
const fileName = computed(() => `${props.account?.name}-${props.account?.account}.png`)

</script>

<template>
  <Modal v-model="isShow" footer>
    <div class="max-w-[300px] p-1 border">
      <img width="290" height="344" :src="account?.qr" alt="">
    </div>
    <template #footer>
      <div class="flex gap-3">
        <a
           :href="account.qr"
           :download="fileName"
            class="w-1/2 inline-flex items-center text-green-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-green-500 dark:border-gray-500 dark:hover:text-green-400 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          <svg fill="currentcolor" class="mr-2" width="20px" height="20px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
            <path d="M790.706 338.824v112.94H395.412c-31.06 0-56.47 25.3-56.47 56.471v744.509c17.73-6.325 36.592-10.391 56.47-10.391h1129.412c19.877 0 38.738 4.066 56.47 10.39V508.236c0-31.171-25.412-56.47-56.47-56.47h-395.295V338.824h395.295c93.402 0 169.411 76.009 169.411 169.411v1242.353c0 93.403-76.01 169.412-169.411 169.412H395.412C302.009 1920 226 1843.99 226 1750.588V508.235c0-93.402 76.01-169.411 169.412-169.411h395.294Zm734.118 1016.47H395.412c-31.06 0-56.47 25.299-56.47 56.47v338.824c0 31.172 25.41 56.47 56.47 56.47h1129.412c31.058 0 56.47-25.298 56.47-56.47v-338.823c0-31.172-25.412-56.47-56.47-56.47ZM1016.622-.023v880.151l246.212-246.325 79.85 79.85-382.532 382.644-382.645-382.644 79.85-79.85L903.68 880.128V-.022h112.941ZM564.824 1468.235c-62.344 0-112.942 50.71-112.942 112.941s50.598 112.942 112.942 112.942c62.343 0 112.94-50.71 112.94-112.942 0-62.23-50.597-112.94-112.94-112.94Z" fill-rule="evenodd"/>
          </svg>
          Lưu
        </a>
        <button
            type="button"
            class="w-50 inline-flex items-center text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-blue-500 dark:border-gray-500 dark:hover:text-blue-400 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            @click="$emit('edit', account.id)"
        >
          <svg width="20px" height="20px"  class="mr-2" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Dribbble-Light-Preview" transform="translate(-419.000000, -359.000000)" fill="currentcolor">
                <g id="icons" transform="translate(56.000000, 160.000000)">
                  <path d="M384,209.210475 L384,219 L363,219 L363,199.42095 L373.5,199.42095 L373.5,201.378855 L365.1,201.378855 L365.1,217.042095 L381.9,217.042095 L381.9,209.210475 L384,209.210475 Z M370.35,209.51395 L378.7731,201.64513 L380.4048,203.643172 L371.88195,212.147332 L370.35,212.147332 L370.35,209.51395 Z M368.25,214.105237 L372.7818,214.105237 L383.18415,203.64513 L378.8298,199 L368.25,208.687714 L368.25,214.105237 Z" id="edit_cover-[#1481]">
                  </path>
                </g>
              </g>
            </g>
          </svg>
          Sửa
        </button>
      </div>
    </template>
  </Modal>
</template>

<style scoped>

</style>