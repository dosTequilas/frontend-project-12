import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AddChannelModal from "./modals/AddChannelModal";
import RenameChannelModal from "./modals/RenameChannelModal";
import RemoveChannelModal from "./modals/RemoveChannelsModal";
import { messagesApi } from "../store/messagesSlice";
import { io } from "socket.io-client";
import Messages from "./Messages";
import ChannelsList from "./ChannelsList";
import { Navbar, Button, Container, Row, Col } from "react-bootstrap";
import {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
  useRenameChannelMutation,
} from "../store/channelSlice";
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from "../store/messagesSlice"; // хуки RTK query

const socket = io("http://localhost:3000");

const ChatPage = () => {
  // создаем состояние в компоненте, null потому что канал не выбран
  const [currentChannel, setCurrentChannel] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  // состояние модальных окон
  const [showAddChannelModal, setShowAddChannelModal] = useState(false);
  const [showRenameChannelModal, setShowRenameChannelModal] = useState(false);
  const [showRemoveChannelModal, setShowRemoveChannelModal] = useState(false);

  //получаем данные от сервера через хуки RTK Query
  const { data: channels = [], isLoading: channelsLoading } =
    useGetChannelsQuery();
  const { data: messages = [], isLoading: messagesLoading } =
    useGetMessagesQuery();

  const dispatch = useDispatch();
  const [sendMessage] = useSendMessageMutation();
  const [addChannel] = useAddChannelMutation();
  const [removeChannel] = useRemoveChannelMutation();
  const [renameChannel] = useRenameChannelMutation();

  // По умолчанию выбираем первый канал
  useEffect(() => {
    if (channels.length > 0 && !currentChannel) {
      setCurrentChannel(channels.find((channel) => channel.name === "General"));
    }
  }, [channels]);

  const handleChannelChange = (channel) => {
    setCurrentChannel(channel); // Устанавливаем новый текущий канал
  };

  const handleChannelRemove = async (channel) => {
    if (currentChannel?.id === channel.id) {
      setCurrentChannel(channels.find((c) => c.name === "General"));
    }
    setShowRemoveChannelModal(true);
    try {
      await removeChannel(channel.id).unwrap();
    } catch (err) {
      console.error("Failed to remove channel: ", err);
    }
  };

  const handleChannelAdd = async (channelName) => {
    try {
      await addChannel({ name: channelName }).unwrap();
      console.log("канал добавлен");
      setShowAddChannelModal(false);
    } catch (error) {
      console.error("Failed to add channel:", error);
    }
  };

  const handleChannelRename = async (channelId, newName) => {
    try {
      if (!channelId) {
        console.error("Channel ID is undefined");
        return;
      }
      console.log("Renaming channel with ID:", channelId); // Логирование
      const result = await renameChannel({ channelId, newName }).unwrap();
      console.log("Rename successful:", result);
      setShowRenameChannelModal(false);
    } catch (err) {
      console.error("Failed to rename channel:", err);
    }
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
      // refetch();
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
          <Button href="/" variant="primary">
            Выйти
          </Button>
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
              setShowAddChannelModal={setShowAddChannelModal}
              setShowRemoveChannelModal={setShowRemoveChannelModal}
              setShowRenameChannelModal={setShowRenameChannelModal}
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
      <AddChannelModal
        show={showAddChannelModal}
        onHide={() => setShowAddChannelModal(false)}
        onAdd={handleChannelAdd}
        channels={channels}
      />
      <RenameChannelModal
        show={showRenameChannelModal !== false}
        onHide={() => setShowRenameChannelModal(false)}
        onRename={(newName) =>
          handleChannelRename(showRenameChannelModal?.id, newName)
        }
        currentChannel={showRenameChannelModal}
      />

      <RemoveChannelModal
        show={showRemoveChannelModal}
        onHide={() => setShowRemoveChannelModal(false)}
        onRemove={handleChannelRemove}
        currentChannel={currentChannel}
      />
    </div>
  );
};

export default ChatPage;
