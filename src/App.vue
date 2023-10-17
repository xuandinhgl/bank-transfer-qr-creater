<script setup lang="ts">

import Form from "./components/Form.vue"
import { onMounted, ref} from "vue";
import {Bank, Account} from "./types.ts";
import {accountEmpty} from "./constant.ts";
import {getBanks, getQRCodeURL} from "./utils.ts";
import { getAccountInfo, saveAccountInfo} from "./accountService.ts";
import QRPreview from "./components/QRPreview.vue";

const info = ref<Account>({...accountEmpty})

onMounted(async () => {
  banks.value = await getBanks();
  getAccount()
})

const getAccount = () => {
  const acc = getAccountInfo()
  info.value = {...acc, bankInfo: banks.value.find(i => i.short_name === acc.bank)}
}

const banks = ref<Bank[]>([])

const onCreateQR = async (account: Account) => {
  const qrCode = getQRCodeURL(account)
  saveAccountInfo({...account, qr: qrCode})
  info.value = {...account, qr: qrCode}
  isShowQr.value = true
}
const onEdit = () => {
  isShowQr.value = false
}

const isShowQr = ref(false)

</script>

<template>
  <div class="md:max-w-[500px] mx-auto p-2">
    <QRPreview v-model="isShowQr" :account="info" @edit="onEdit" />
    <Form v-model="info" @create-qr="onCreateQR" :banks="banks"/>
  </div>
</template>