import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, fetchChannels } from "../store/chatSlice";
import axios from "axios";

const ChatPage = () => {
  const dispatch = useDispatch();
  const { channels, messages, status, error } = useSelector(
    (state) => state.chat
  );
  const [currentChannel, setCurrentChannel] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
  }, [dispatch]);

  useEffect(() => {
    if (channels.length > 0) {
      setCurrentChannel(channels[0].id); // По умолчанию выбираем первый канал, это правильно делать вот таким образом?
    }
  }, [channels]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    try {
      await axios.post(
        "/api/v1/messages",
        {
          body: newMessage,
          channelId: currentChannel,
          username: username,
        },
        {
          headers: {
            //	headers — это объект, содержащий набор пар “ключ-значение”, где каждый ключ представляет собой имя заголовка HTTP, а значение — это значение этого заголовка
            Authorization: `Bearer ${token}`, // Authorization — это один из заголовков HTTP, который используется для передачи информации о проверке подлинности (authentication) клиента. Этот заголовок сообщает серверу, что запрос исходит от авторизованного пользователя, и передает данные, необходимые для проверки этой авторизации.
          }, // Bearer — это схема (тип) токена, который используется для авторизации. token — это переменная, которая содержит токен доступа (access token), полученный при успешном входе пользователя в систему (логине), Bearer ${token} — это полная строка, которая указывает серверу, что в запросе передается Bearer токен для авторизации.
        }
      );
      setNewMessage("");
      dispatch(fetchMessages()); // Обновляем список сообщений
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="/">
                Hexlet Chat
              </a>
              <button type="button" className="btn btn-primary">
                Выйти
              </button>
            </div>
          </nav>

          <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">
              <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                  <b>Каналы</b>
                  <button
                    type="button"
                    className="p-0 text-primary tn btn-group-vertical"
                  >
                    +<i className="bi bi-plus-square"></i>
                    <span className="visually-hidden">+</span>
                  </button>
                </div>
                <ul
                  id="channels-box"
                  className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
                >
                  {channels && channels.length > 0 ? (
                    channels.map((channel) => (
                      <li key={channel.id} className="nav-item w-100">
                        <button
                          type="button"
                          className={`w-100 rounded-0 text-start btn ${
                            currentChannel === channel.id ? "btn-secondary" : ""
                          }`}
                          onClick={() => setCurrentChannel(channel.id)}
                        >
                          # {channel.name}
                        </button>
                      </li>
                    ))
                  ) : (
                    <li className="nav-item">No channels available</li>
                  )}
                </ul>
              </div>

              <div className="col p-0 h-100">
                <div className="d-flex flex-column h-100">
                  <div className="bg-light mb-4 p-3 shadow-sm small">
                    <p className="m-0">
                      <b>
                        {`# ${
                          channels.find(
                            (channel) => channel.id === currentChannel
                          )?.name
                        }`}
                      </b>
                    </p>
                    <span className="text-muted">0 Сообщений</span>
                  </div>

                  <div
                    id="messages-box"
                    className="chat-messages overflow-auto px-5"
                  >
                    {messages && messages.length > 0 ? (
                      messages
                        .filter(
                          (message) => message.channelId === currentChannel
                        )
                        .map((message) => (
                          <div key={message.id} className="mb-2">
                            <strong>{message.username}:</strong> {message.body}
                          </div>
                        ))
                    ) : (
                      <div>No messages available</div>
                    )}
                  </div>
                  <div className="mt-auto px-5 py-3">
                    <form
                      noValidate
                      onSubmit={handleSendMessage}
                      className="py-1 border rounded-2"
                    >
                      <div className="input-group has-validation">
                        <input
                          name="body"
                          aria-label="Новое Сообщение"
                          placeholder="Введите сообщение..."
                          className="border-0 p-0 ps-2 form-control"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button
                          type="submit"
                          // disabled
                          className="btn btn-group-vertical"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-arrow-right"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M1.5 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 1 1-.708-.708L13.793 8.5H2a.5.5 0 0 1-.5-.5z"
                            />
                          </svg>
                          <span className="visually-hidden">Отправить</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
