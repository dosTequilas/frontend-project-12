/* global process */
import React from 'react'
import App from '../App'
import { io } from 'socket.io-client'
import { store } from '../store/store'
import { messagesApi } from '../store/messagesSlice.js'
import { channelsApi } from '../store/channelSlice.js'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import i18next from 'i18next'
import { Provider } from 'react-redux'
import { Provider as RollBarProvider } from '@rollbar/react'
import en from '../locales/en/translation.json'
import ru from '../locales/ru/translation.json'

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  environment: 'testenv',
}

const init = async () => {
  const initializeApp = () => {
    const socket = io()
    socket.on('newMessage', (message) => {
      store.dispatch(
        messagesApi.util.updateQueryData('getMessages', undefined, (draft) => {
          draft.push(message)
        }),
      )
    })

    socket.on('newChannel', () => {
      store.dispatch(channelsApi.util.invalidateTags(['Channels']))
    })

    socket.on('removeChannel', () => {
      store.dispatch(channelsApi.util.invalidateTags(['Channels']))
    })

    socket.on('renameChannel', () => {
      store.dispatch(channelsApi.util.invalidateTags(['Channels']))
    })
  }
  initializeApp() // чтобы убрать ошибку eslint
  const i18n = i18next.createInstance()

  await i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
    },
    lng: 'ru',
    fallbackLng: 'ru',
    debug: true,
    interpolation: {
      escapeValue: false, // React уже экранирует текст
    },
  })

  return (
    <RollBarProvider config={rollbarConfig}>
      <React.StrictMode>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </Provider>
      </React.StrictMode>
    </RollBarProvider>
  )
}

// export default i18next

export default init // чтобы убрать ошибку 'init assigned but never used' в eslint
