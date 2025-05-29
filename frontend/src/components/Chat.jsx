import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import AddChannelModal from './modals/AddChannelModal.jsx'
import RenameChannelModal from './modals/RenameChannelModal.jsx'
import RemoveChannelModal from './modals/RemoveChannelsModal.jsx'
import { messagesApi } from '../store/messagesSlice.js'
import Messages from './Messages.jsx'
import { ChannelsList } from './ChannelsList.jsx'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import leoProfanity from 'leo-profanity'

import {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
  useRenameChannelMutation,
} from '../store/channelSlice.js'
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from '../services/messagesSlice.js' // хуки RTK query

const ChatPage = () => {
  // получаем данные от сервера через хуки RTK Query
  const { data: channels = [], isLoading: channelsLoading }
    = useGetChannelsQuery()
  const { data: messages = [], isLoading: messagesLoading }
    = useGetMessagesQuery()

  // создаем состояние в компоненте, null потому что канал не выбран
  const [currentChannel, setCurrentChannel] = useState(null)
  const [newMessage, setNewMessage] = useState('')

  // создаем модальные окна с помощью хука useState.
  // show... - это состояние, setShow - это функция для управления состоянием
  const [showAddChannelModal, setShowAddChannelModal] = useState(false)
  const [showRenameChannelModal, setShowRenameChannelModal] = useState(false)
  const [showRemoveChannelModal, setShowRemoveChannelModal] = useState(false)

  const dispatch = useDispatch()
  const [sendMessage] = useSendMessageMutation()
  const [addChannel] = useAddChannelMutation()
  const [removeChannel] = useRemoveChannelMutation()
  const [renameChannel] = useRenameChannelMutation()

  // useEffect с пустым массивом = component did mount. - еще до смены каналов будет выбранный канал.
  // По умолчанию выбираем первый канал при изменении каналов.
  useEffect(() => {
    if (channels.length > 0 && !currentChannel) {
      setCurrentChannel(channels[0])
    }
  }, [channels, currentChannel])

  const handleChannelChange = (channel) => {
    setCurrentChannel(channel) // Устанавливаем новый текущий канал
  }
  const { t } = useTranslation()
  const handleChannelRemove = async (channel) => {
    if (currentChannel?.id === channel.id) {
      setCurrentChannel(channels.find(c => c.name === 'General'))
    }
    setShowRemoveChannelModal(true)
    try {
      await removeChannel(channel.id).unwrap()
      toast.success(t('deleted'))
    }
    catch (err) {
      console.error('Failed to remove channel: ', err)
    }
  }

  const handleChannelAdd = async (channelName) => {
    const cleanedName = leoProfanity.clean(channelName)
    setCurrentChannel(cleanedName)
    try {
      await addChannel({ name: cleanedName }).unwrap()
      toast.success(t('added'), {
        toastId: 'channelAddedToast', // метод с html for не срабтал - все равно не видит
        id: 'channelAddedToast',
      })
      setShowAddChannelModal(false)
    }
    catch (error) {
      console.error('Failed to add channel:', error)
    }
  }

  const handleChannelRename = async (channelId, newName) => {
    try {
      if (!channelId) {
        console.error('Channel ID is undefined')
        return
      }
      console.log('Renaming channel with ID:', channelId) // Логирование
      const result = await renameChannel({ channelId, newName }).unwrap()
      console.log('Rename successful:', result)
      toast.success(t('renamed'))
      setShowRenameChannelModal(false)
    }
    catch (err) {
      console.error('Failed to rename channel:', err)
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    // Проверка на наличие выбранного канала
    if (!currentChannel) {
      console.error('No channel selected')
      return
    }

    // Фильтрация сообщения
    const cleanMessage = leoProfanity.clean(newMessage)

    try {
      await sendMessage({
        body: cleanMessage,
        channelId: currentChannel.id,
        username: localStorage.getItem('username'),
      }).unwrap()
      setNewMessage('')
      dispatch(messagesApi.util.invalidateTags(['Messages']))
      // refetch();
    }
    catch (err) {
      console.error('Failed to send message:', err)
    }
  }

  if (channelsLoading || messagesLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="h-100">
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
        onRename={newName =>
          handleChannelRename(showRenameChannelModal?.id, newName)}
        currentChannel={showRenameChannelModal}
      />

      <RemoveChannelModal
        show={showRemoveChannelModal}
        onHide={() => setShowRemoveChannelModal(false)}
        onRemove={handleChannelRemove}
        currentChannel={currentChannel}
      />
    </div>
  )
}

export default ChatPage
