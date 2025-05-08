import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en/translation.json'
import ru from './locales/ru/translation.json'

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  lng: 'ru', // Язык по умолчанию
  fallbackLng: 'en',
  debug: true,
  interpolation: {
    escapeValue: false, // React уже экранирует текст
  },
})

export default i18next
