import {Account} from "./types.ts";
import {accountEmpty, localStorageKey} from "./constant.ts";

export const getAccountInfo = (): Account => {
    try {
        const items = window.localStorage.getItem(localStorageKey)

        if (items) {
            return JSON.parse(items) as Account
        }
        return {...accountEmpty}
    } catch (e) {
        console.log(e)
        return  {...accountEmpty}
    }
}

export const saveAccountInfo = (item: Account) => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(item))
}