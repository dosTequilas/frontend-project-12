import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetChannelsQuery } from "../store/channelSlice";
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from "../store/messagesSlice"; // хуки RTK query
import { messagesApi } from "../store/messagesSlice";
import { io } from "socket.io-client";
import Messages from "./Messages";
import ChannelsList from "./ChannelsList";
import { Navbar, Button, Container, Row, Col } from "react-bootstrap";

const socket = io("http://localhost:3000");

const ChatPage = () => {
  // создаем состояние в компоненте, null потому что канал не выбран
  const [currentChannel, setCurrentChannel] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  //получаем данные от сервера через RTK Query
  const { data: channels = [], isLoading: channelsLoading } =
    useGetChannelsQuery();
  const { data: messages = [], isLoading: messagesLoading } =
    useGetMessagesQuery();

  const dispatch = useDispatch();
  const [sendMessage] = useSendMessageMutation();

  // По умолчанию выбираем первый канал
  useEffect(() => {
    if (channels.length > 0) {
      setCurrentChannel(channels[0]);
    }
  }, [channels]);

  // Обновление состояния сообщений
  useEffect(() => {
    socket.on("newMessage", (message) => {
      dispatch(
        messagesApi.util.updateQueryData("getMessages", undefined, (draft) => {
          draft.push(message);
        })
      );
    });

    return () => {
      socket.off("newMessage");
    };
  }, [dispatch]);

  const handleChannelChange = (channel) => {
    setCurrentChannel(channel); // Устанавливаем новый текущий канал
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    try {
      await sendMessage({
        body: newMessage,
        channelId: currentChannel.id,
        username: localStorage.getItem("username"),
      }).unwrap();
      setNewMessage("");
      dispatch(messagesApi.util.invalidateTags(["Messages"]));
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  if (channelsLoading || messagesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-100">
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
          <Button variant="primary">Выйти</Button>
        </Container>
      </Navbar>

      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100">
          <Col
            md={2}
            className="border-end px-0 bg-light h-100 d-flex flex-column"
          >
            <ChannelsList
              channels={channels}
              currentChannel={currentChannel}
              setCurrentChannel={handleChannelChange}
            />
          </Col>
          <Col md={10} className="p-0 h-100 d-flex flex-column">
            <Messages
              messages={messages}
              currentChannel={currentChannel}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ChatPage;
