import {isRenderingOnServer} from "@/utils/is-rendering-on-server"

const getLanguage = () => (navigator.languages && navigator.languages[0]) ||
navigator.language ||
navigator.userLanguage

export const useLanguage = () => {
    return isRenderingOnServer ? null : getLanguage()
}