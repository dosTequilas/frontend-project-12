import { useEffect, useRef } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const Messages = ({
  messages,
  currentChannel,
  newMessage,
  setNewMessage,
  handleSendMessage,
}) => {
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Отфильтровываем сообщения для текущего канала
  const filteredMessages = messages.filter((message) => {
    const messageChannelId
      = typeof message.channelId === 'object'
        ? message.channelId.id
        : message.channelId
    return messageChannelId === currentChannel?.id
  })

  // i18n
  const { t } = useTranslation()

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm">
        <p className="m-0">
          <b>
            #
            {currentChannel ? currentChannel.name : 'No Channel'}
          </b>
        </p>
        <span className="text-muted">
          {filteredMessages.length}
          {t('messages')}
        </span>
      </div>
      <div
        id="messages-box"
        className="chat-messages overflow-auto px-5 flex-grow-1"
        style={{ maxHeight: '70vh' }}
      >
        {filteredMessages.length > 0
          ? (
              filteredMessages.map(message => (
                <div key={message.id} className="mb-2">
                  <strong>
                    {message.username}
                    :
                  </strong>
                  {' '}
                  {message.body}
                </div>
              ))
            )
          : (
              <div>{t('noMessages')}</div>
            )}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-auto px-5 py-3">
        <Form noValidate onSubmit={handleSendMessage} className="py-1">
          <InputGroup>
            <Form.Control
              type="text"
              name="body"
              aria-label="Новое сообщение"
              placeholder="Введите сообщение..."
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              className="border"
            />
            <Button type="submit" variant="outline-secondary">
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
              <span className="visually-hidden">{t('send')}</span>
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  )
}

export default Messages
