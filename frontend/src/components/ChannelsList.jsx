import React from "react";
import { PlusSquare } from "react-bootstrap-icons";
import {
  ListGroup,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";

export const ChannelsList = ({
  channels,
  currentChannel,
  setCurrentChannel,
  setShowAddChannelModal,
  setShowRemoveChannelModal,
  setShowRenameChannelModal,
}) => {
  //i18n
  const { t } = useTranslation();

  return (
    <div>
      <div className="d-flex mt-1 justify-content-between mb-2 p-4">
        <b>{t("channels")}</b>
        <Button
          variant="link"
          className="p-0 text-primary"
          onClick={() => setShowAddChannelModal(true)}
        >
          <PlusSquare />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ListGroup variant="flush" className="overflow-auto flex-grow-1">
        {channels && channels.length > 0 ? (
          channels.map((channel) => (
            <div
              key={channel.id}
              className="d-flex justify-content-between align-items-center channel-name"
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
                  onClick={() => setCurrentChannel(channel)}
                >
                  <Dropdown.Item
                    //использование setShow
                    onClick={() => setShowRemoveChannelModal(channel)}
                  >
                    {t("remove")}
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      console.log("Renaming channel:", channel);
                      setShowRenameChannelModal(channel);
                    }}
                  >
                    {t("rename")}
                  </Dropdown.Item>
                </DropdownButton>
              )}
            </div>
          ))
        ) : (
          <ListGroup.Item>{t("noChannelsAvailable")}</ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
};
