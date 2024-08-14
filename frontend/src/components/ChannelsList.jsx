import React from "react";
import { ListGroup, Button } from "react-bootstrap";

const ChannelsList = ({ channels, currentChannel, setCurrentChannel }) => {
  return (
    <div>
      <div className="d-flex mt-1 justify-content-between mb-2 p-4">
        <b>Каналы</b>
        <Button variant="link" className="p-0 text-primary">
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
              # {channel.name}
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
