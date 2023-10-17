<script setup lang="ts">
import {computed, PropType, ref} from "vue";
import {DropdownItem} from "../types.ts";
import QInput from "./QInput.vue";


const props = defineProps({
  items: {
    type: Array as PropType<DropdownItem[]>,
    default: () => ([])
  },
  modelValue: {
    type: String,
    default: null
  },
  label: {
    type: String,
    default: null
  }
})

const emit = defineEmits(["update:modelValue"])
const isOpen = ref(false)
const total = props.items?.length - 1

const onSelect = (item: DropdownItem) => {
  emit('update:modelValue', item.id)
  isOpen.value = false
}

const selected = computed(() => (props.items?.find(item => item.id === props.modelValue))?.text || "Select")

const search = ref("")

const itemFiltered = computed(() => {
  if (search.value) {
    return props.items?.filter(item => {
      return item.name.toLowerCase().includes(search.value.toLowerCase()) || item.text.toLowerCase().includes(search.value)
    })
  }

  return props.items
})

</script>

<template>
  <div class="relative inline-block w-full" v-click-out-side="() => {isOpen = false}">
    <label v-if="label" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{label}}</label>
    <button
        class="text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-1.5 dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-700 dark:border-gray-700 flex items-center w-full"
        @click="isOpen = !isOpen"
        type="button">
      <slot name="selected">
        {{selected }}
      </slot>
      <svg class="w-2.5 h-2.5 ml-2.5 ml-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
           viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
      </svg>
    </button>
    <div class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 left-0 absolute min-w-full overflow-hidden"
         :class="{hidden: !isOpen}">
      <div class="px-2">
        <QInput v-model="search" placeholder="Tìm kiếm ngân hàng" />
      </div>
      <ul class="text-sm text-gray-700 dark:text-gray-200 max-h-[190px] overflow-y-auto">
        <li v-for="(item, index) in itemFiltered" :key="item.id"
            @click="onSelect(item)"
            class="hover:bg-gray-800"
            :class="{'border-b': index < total}">
          <slot name="item" v-bind="item">
            <a class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              {{ item.text }}
            </a>
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>