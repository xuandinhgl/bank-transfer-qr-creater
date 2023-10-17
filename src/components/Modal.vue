<script setup lang="ts">
import {ref} from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  footer: {
    type: Boolean,
    default: false,
  },
  header: {
    type: Boolean,
    default: false,
  },
  closeOnConfirm: {
    type: Boolean,
    default: false,
  },
  confirmButton: {
    type: String,
    default: "Confirm",
  },
  closeButton: {
    type: String,
    default: "Close",
  },
  title: {
    type: String,
    default: null,
  },
});

const backdrop = ref(null)
const emit = defineEmits(["update:modelValue", "confirm"]);
const onConfirm = () => {
  emit("confirm");
  if (props.closeOnConfirm) {
    emit("update:modelValue", false);
  }
};


const onClickOut = (e: any) => {
  if (props.modelValue && e.target === backdrop.value) {
    emit("update:modelValue", false)
  }
}
</script>

<template>
  <div
      v-if="modelValue"
      tabindex="-1"
      aria-hidden="true"
      @click.stop="onClickOut"
      ref="backdrop"
      class="fixed top-0 left-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative w-full lg:w-fit max-w-2xl mx-auto max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div v-if="header"
             class="flex items-start justify-between px-4 py-3 border-b rounded-t dark:border-gray-600/60"
        >
          <h3 v-if="title" class="c-heading--h3">
            {{ title }}
          </h3>
          <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              @click.prevent="emit('update:modelValue', false)"
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
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <slot/>
        </div>
        <!-- Modal footer -->
        <div
            v-if="footer"
            class="flex items-center px-6 py-2 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600/60"
        >
          <slot name="footer">
            <button type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    @click="onConfirm"
            >I accept
            </button>
            <button
                type="button"
                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                @click.prevent="emit('update:modelValue', false)"
            >Cancel
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
