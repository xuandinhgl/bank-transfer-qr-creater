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
    <div class="relative w-full lg:w-fit max-w-2xl mx-auto max-h-full border border-gray-300 rounded">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <slot/>
        </div>
        <!-- Modal footer -->
        <div
            v-if="footer"
            class="flex items-center px-6 py-2 space-x-2 border-t border-gray-200 dark:border-gray-600/60"
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
