import {Account} from "./types.ts";
import {localStorageKey} from "./constant.ts";

export const getAccountInfo = (): Account[] => {
    try {
        const items = window.localStorage.getItem(localStorageKey)

        if (items) {
            return JSON.parse(items) as Account[]
        }

        return []
    } catch (e) {
        console.log(e)
        return []
    }
}

export const saveAccountInfo = (item: Account) => {
    const items = getAccountInfo()
    window.localStorage.setItem(localStorageKey, JSON.stringify([...items, item]))
}

export const deleteAccountInfo = (id: string) => {
    const items = getAccountInfo()
    const filtered = items.filter(a => a.id !== id)
    window.localStorage.setItem(localStorageKey, JSON.stringify(filtered))
}

export const updateAccountInfo = (account: Account) => {
    const items = getAccountInfo();
    const newItems = items.map(item => {
        if (item.id === account.id) {
            return account
        }
        return item
    })

    window.localStorage.setItem(localStorageKey, JSON.stringify(newItems))
}