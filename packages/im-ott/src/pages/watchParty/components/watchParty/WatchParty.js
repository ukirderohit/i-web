import React, { useEffect, useState } from "react";
import queryString from "query-string";
import cx from "classnames";
import { useParams, useHistory, useLocation } from "react-router-dom";
import io from "socket.io-client";

// Components
import { Title, Label } from "imcomponents/atoms/typography";
import Player from "imcomponents/organisms/player";
import {
  LeftOutlined,
  RightOutlined,
  InfoCircleOutlined,
} from "imcomponents/atoms/icon";
import Input from "imcomponents/atoms/input";
import Participants from "../participants/Participants";
import Tooltip from "imcomponents/atoms/toolTip";
import Button, { BUTTON_TYPES } from "imcomponents/atoms/button";
// import { getCurrentUser } from "imbase/services/firebase";

import { EMPTY_STRING } from "imbase/constants/base.constants";

// Styles
import styles from "./watchParty.module.scss";

let socket;

function WatchParty() {
  const [visible, setVisibility] = useState(true);
  const [userName, setUserName] = useState(EMPTY_STRING);
  const [userId, setUserId] = useState(EMPTY_STRING);
  const [room, setRoom] = useState(EMPTY_STRING);
  // const uid = getCurrentUser()?.uid;
  // const uName = getCurrentUser()?.displayName;
  const { partyId } = useParams();
  const history = useHistory();
  const location = useLocation();
  const { uid, uName } = location.state;

  // const ENDPOINT = process.env.REACT_APP_HOST_PARTY_SERVER;
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    socket = io(ENDPOINT);

    console.log(uName);

    setUserId(uid);
    setUserName(uName);
    setRoom(partyId);

    socket.emit("join", { userId: uid, userName: uName, room: partyId });

    return () => {
      socket.emit("disconnectTheSocket", {
        userId: uid,
        userName: uName,
        room: partyId,
      });

      socket.off();
    };
  }, [partyId]);

  const toggleSettingsVisibility = () => {
    setVisibility(!visible);
  };

  const settingsClassName = cx(styles.watchPartySettings, {
    [styles.zeroWidth]: !visible,
  });

  const handleEndWatchParty = () => {
    history.push(`/film/${partyId}`);
  };

  return (
    <div className={styles.container}>
      <Player
        videoUrl={"https://www.youtube.com/watch?v=linlz7-Pnvw"}
        containerClassName={styles.playerContainerClassName}
        playerWrapperClassName={styles.playerContainerClassName}
      />
      <div className={settingsClassName}>
        <div className={styles.triggerIcon} onClick={toggleSettingsVisibility}>
          {visible ? <RightOutlined /> : <LeftOutlined />}
        </div>
        {visible && (
          <div className={styles.settings}>
            <div className={`${styles.section} ${styles.bordered}`}>
              <Title>
                <span className={styles.inviteFriendsTitle}>
                  Invite friends
                </span>
                <Tooltip
                  title="Only users registered on the platform can be added to watchlist"
                  zIndex={99999}
                >
                  <InfoCircleOutlined className={styles.infoIcon} />
                </Tooltip>
              </Title>
              <Label>
                Share the link with others and then everyone can watch together.
                They'll need to join from a web browser on their computer
              </Label>
              <Input
                className={styles.input}
                placeholder={"Enter Email Address"}
              />
            </div>
            <div className={`${styles.section} ${styles.bordered}`}>
              <Title className={styles.inviteFriendsTitle}>
                Watch Party Details
              </Title>
              <Label>6 Participants joined</Label>
              <Participants count={6} />
            </div>
            <div className={styles.section}>
              <Button
                type={BUTTON_TYPES.PRIMARY}
                className={styles.endWatchPartyButton}
                onClick={handleEndWatchParty}
              >
                <span className={styles.endWatchPartyButtonLabel}>
                  {"End Watch Party"}
                </span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WatchParty;
