<script setup lang="ts">
import {computed, PropType, } from "vue";

import Dropdown from "./Dropdown.vue";
import QInput from "./QInput.vue";
import {useSyncProps} from "../useSyncProps.ts";
import {Bank, Account, DropdownItem} from "../types.ts";

const props = defineProps({
  modelValue: {
    type: Object as PropType<Account>,
    default: () =>({
      id: "",
      account: "",
      bank: "",
      name: "",
    })
  },
  banks: {
    type: Array as PropType<Bank[]>,
    default: () => ([])
  }
})

const emit = defineEmits(["update:modelValue", "createQr"])

const info =  useSyncProps<Account, typeof props>(props,"modelValue", emit)

const onSubmit = () => {
  emit("createQr", info.value)
}

const isEdit = computed(() => !!props.modelValue.id)

const items = computed(() => {
  return  props.banks.map((bank: Bank) => ({
    id: bank.short_name,
    logo: bank.logo,
    text: bank.shortName,
    name: bank.name,
  }))
})

const selected = computed((): DropdownItem | undefined => items.value.find(bank => bank.id === info.value.bank))

</script>

<template>
  <form @submit.prevent="onSubmit">
    <QInput v-model="info.name" placeholder="Nhập tên chủ tài khoản" label="Chủ tài khoản:"/>
    <Dropdown :items="items" v-model="info.bank" class="block" label="Ngân hàng">
      <template #selected>
        <template v-if="selected">
          <img :src="selected.logo" class="max-w-[55px] mr-2 dark:bg-white" alt=""/>
          {{ selected.text }}
        </template>
        <template v-else>Chọn ngân hàng</template>
      </template>
      <template #item="{text, logo, name}">
        <div class="flex items-center p-3 cursor-pointer">
          <img :src="logo" alt="" class="max-w-[58px] mr-2 dark:bg-white">
          <div>
            {{ text }}: <span class="text-sm">{{ name }}</span>
          </div>
        </div>
      </template>
    </Dropdown>
    <QInput v-model="info.account" placeholder="Nhập số tài khoản" label="Số tài khoản:"/>
    <QInput v-model="info.amount" type="number" placeholder="Nhập số tiền" label="Số tiền:"/>
    <button type="button"
            @click.prevent="onSubmit"
            class="block w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
      {{ isEdit ? "Cập nhật" : "Tạo ngay"}}
    </button>
  </form>
</template>

<style scoped>

</style>