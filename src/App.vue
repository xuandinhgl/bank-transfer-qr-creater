<script setup lang="ts">
import {v4 as uuid} from "uuid";

import Form from "./components/Form.vue"
import Modal from "./components/Modal.vue";
import {computed, onBeforeMount, ref} from "vue";
import {Bank, Account} from "./types.ts";
import {accountEmpty} from "./constant.ts";
import {getBanks, getQRCodeURL} from "./utils.ts";
import AccountRow from "./components/AccountRow.vue";
import {deleteAccountInfo, getAccountInfo, saveAccountInfo, updateAccountInfo} from "./accountService.ts";
import Header from "./components/Header.vue";

const info = ref<Account>({...accountEmpty})
const accounts = ref<Account[]>([])

const recentAccount = ref("")

onBeforeMount(async () => {
  banks.value = await getBanks();
  getAccount()
})

const getAccount = () => {
  accounts.value = getAccountInfo().map(item => ({
    ...item,
    bankInfo: banks.value.find(i => i.short_name === item.bank)
  }))
}

const banks = ref<Bank[]>([])

const onCreateQR = async (account: Account) => {
  const qrCode = getQRCodeURL(account)
  if (!!account.id) {
    updateAccountInfo(account)
  } else {
    const id = uuid()
    recentAccount.value = id
    saveAccountInfo({...account, qr: qrCode, id})
  }
  getAccount()
  info.value = {...accountEmpty}
  isShowForm.value = false;
}

const onDeleteAccount = (id: string) => {
  accounts.value = accounts.value.filter(a => a.id !== id)
  deleteAccountInfo(id)
}

const onEdit = (id: string) => {
  isShowForm.value = true
  recentAccount.value = ""
  info.value = accounts.value.find(a => a.id === id) as Account
}

const isShowForm = ref(false)

const isShowQr = computed({
  get() {
    const account = accounts.value.find(a => a.id === recentAccount.value)
    return !!recentAccount.value && !!account
  },
  set() {
    recentAccount.value = ""
  }
})
const recentQrCode = computed(() => accounts.value.find(a => a.id === recentAccount.value)?.qr || "")
</script>

<template>
  <div class="md:max-w-[500px] mx-auto py-2">
    <Header @add-qr="isShowForm = true"/>
    <Modal v-model="isShowQr" footer>
      <div class="max-w-[300px] p-1 border">
        <img width="290" height="344" :src="recentQrCode" alt="">
      </div>
      <template #footer>
        <button
            type="button"
            class="w-full text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            @click="onEdit(recentAccount)"
        >
          Sửa
        </button>
      </template>
    </Modal>
    <Modal v-model="isShowForm">
      <div class="w-full md:w-[500px]">
        <Form v-model="info" @create-qr="onCreateQR" :banks="banks"/>
      </div>
    </Modal>
    <div class="border border-gray-500 p-3 rounded-b">
      <template v-if="accounts.length">
        <div
            class=" bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 min-w-full overflow-hidden">
          <ul class="text-sm text-gray-700 dark:text-gray-200 max-h-[190px] overflow-y-auto">
            <AccountRow v-for="(item, index) in accounts"
                        :account="item"
                        :key="`${item.bank}-${index}`"
                        @open-qr="recentAccount = item.id"
                        @delete="onDeleteAccount(item.id)"
            />
          </ul>
        </div>
      </template>
      <template v-else>
        <h2 class="text-xl dark:text-white">Bạn chưa tạo mã QR nào, hãy <a @click.prevent="isShowForm= true"
                                                                            class="text-yellow-700 cursor-pointer">tạo
          ngay</a> nhé</h2>
      </template>
    </div>

  </div>
</template>