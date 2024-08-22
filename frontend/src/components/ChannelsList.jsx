import React from "react";
import {
  ListGroup,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton,
  DropdownItem,
} from "react-bootstrap";

const ChannelsList = ({
  channels,
  currentChannel,
  setCurrentChannel,
  setShowAddChannelModal,
  setShowRemoveChannelModal,
  setShowRenameChannelModal,
}) => {
  return (
    <div>
      <div className="d-flex mt-1 justify-content-between mb-2 p-4">
        <b>Каналы</b>
        <Button
          variant="link"
          className="p-0 text-primary"
          onClick={() => setShowAddChannelModal(true)}
        >
          +<i className="bi bi-plus-square"></i>
        </Button>
      </div>
      <ListGroup variant="flush" className="overflow-auto flex-grow-1">
        {channels && channels.length > 0 ? (
          channels.map((channel) => (
            <ListGroup.Item
              key={channel.id}
              action
              active={currentChannel?.id === channel.id}
              onClick={() => setCurrentChannel(channel)}
            >
              <span># {channel.name}</span>
              {channel.name !== "general" && channel.name !== "random" && (
                <DropdownButton
                  as={ButtonGroup}
                  variant="link"
                  title={<i className="bi bi-three-dots"></i>}
                  id={`dropdown-${channel.id}`}
                  classname="ml-auto"
                >
                  <Dropdown.Item
                    onClick={() => setShowRenameChannelModal(channel)}
                  >
                    Rename
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setShowRemoveChannelModal(channel)}
                  >
                    Remove
                  </Dropdown.Item>
                </DropdownButton>
              )}
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>No channels available</ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
};

export default ChannelsList;
