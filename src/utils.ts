import {Bank, Account} from "./types.ts";
export const clickOutSide = {
    mounted: function (el: any, binding: any) {
        el.clickOutsideEvent = function (event: any) {
            if (!(el == event.target || el.contains(event.target))) {
                binding.value(event, el)
            }
        }
        document.addEventListener("click", el.clickOutsideEvent)
    },
    unmounted: function (el: any) {
        document.removeEventListener("click", el.clickOutsideEvent)
    },
}

export const getQRCodeURL = ({bank, account, name, amount}: Account) => {
    return `https://img.vietqr.io/image/${bank}-${account}-compact2.png?amount=${amount}&addInfo=&accountName=${encodeURIComponent(name)}`
}

export const getBanks = async (): Promise<Bank[]> => {
    const {data} = await fetch('https://api.vietqr.io/v2/banks').then(res => res.json())
    return data || []
}

export const formatCurrency = (number: number) =>
    new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(number);

