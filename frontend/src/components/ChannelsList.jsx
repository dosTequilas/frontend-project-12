import { PlusSquare } from 'react-bootstrap-icons'
import { ListGroup, Button, Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

export const ChannelsList = ({
  channels,
  currentChannel,
  setCurrentChannel,
  setShowAddChannelModal,
  setShowRemoveChannelModal,
  setShowRenameChannelModal,
}) => {
  const { t } = useTranslation()

  return (
    <div>
      <div className="d-flex mt-1 justify-content-between mb-2 p-4">
        <b>{t('channels')}</b>
        <Button
          type="button"
          variant="group-vertical"
          className="p-0 text-primary"
          onClick={() => setShowAddChannelModal(true)}
        >
          <span className="visually-hidden">+</span>
          <PlusSquare />
        </Button>
      </div>
      <ListGroup variant="flush" className="overflow-auto flex-grow-1">
        {channels && channels.length > 0
          ? (
              channels.map(channel => (
                <div
                  onClick={() => setCurrentChannel(channel)}
                  key={channel.id}
                  className="d-flex justify-content-between align-items-center channel-name"
                >
                  <ListGroup.Item
                    action
                    active={currentChannel?.id === channel.id}
                    className="w-100"
                  >
                    #
                    {' '}
                    {channel.name}
                  </ListGroup.Item>
                  {channel.removable && (
                    <Dropdown>
                      <Dropdown.Toggle split className="flex-grow-0" variant="down">
                        <label className="visually-hidden">
                          {t('channelControl')}
                        </label>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => setShowRemoveChannelModal(channel)}
                        >
                          {t('remove')}
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setShowRenameChannelModal(channel)
                          }}
                        >
                          {t('rename')}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </div>
              ))
            )
          : (
              <ListGroup.Item>{t('noChannelsAvailable')}</ListGroup.Item>
            )}
      </ListGroup>
    </div>
  )
}
