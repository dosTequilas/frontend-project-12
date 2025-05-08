import { io } from 'socket.io-client';
import { store } from '../store/store';
import { messagesApi } from '../store/messagesSlice';
import { channelsApi } from '../store/channelSlice';
import '../i18n';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import { Provider } from 'react-redux';
import { Provider as RollBarProvider } from '@rollbar/react';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  environment: 'testenv',
};

const init = async () => {
  const initializeApp = () => {
    // слушатели событий сервера.
    const socket = io();
    socket.on('newMessage', (message) => {
      store.dispatch(
        messagesApi.util.updateQueryData('getMessages', undefined, (draft) => {
          draft.push(message);
        }),
      );
    });

    socket.on('newChannel', () => {
      store.dispatch(channelsApi.util.invalidateTags(['Channels']));
    });

    socket.on('removeChannel', () => {
      store.dispatch(channelsApi.util.invalidateTags(['Channels']));
    });

    socket.on('renameChannel', () => {
      store.dispatch(channelsApi.util.invalidateTags(['Channels']));
    });
  };

  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
  });

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
  );
};
