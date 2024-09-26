import React from "react";
import { PlusSquare } from "react-bootstrap-icons";
import {
  ListGroup,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton,
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
          <PlusSquare />
        </Button>
      </div>
      <ListGroup variant="flush" className="overflow-auto flex-grow-1">
        {channels && channels.length > 0 ? (
          channels.map((channel) => (
            <div
              key={channel.id}
              className="d-flex justify-content-between align-items-center"
            >
              <ListGroup.Item
                action
                active={currentChannel?.id === channel.id}
                onClick={() => setCurrentChannel(channel)}
                className="w-100"
              >
                # {channel.name}
              </ListGroup.Item>
              {channel.name !== "general" && channel.name !== "random" && (
                <DropdownButton
                  as={ButtonGroup}
                  variant="link"
                  title={<i className="bi bi-three-dots"></i>}
                  id={`dropdown-${channel.id}`}
                  className="ml-2"
                >
                  <Dropdown.Item
                    onClick={() => {
                      console.log("Renaming channel:", channel);
                      setShowRenameChannelModal(channel);
                    }}
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
            </div>
          ))
        ) : (
          <ListGroup.Item>No channels available</ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
};

export default ChannelsList;
