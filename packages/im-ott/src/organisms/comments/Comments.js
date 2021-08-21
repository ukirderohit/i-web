import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// Lodash
import _map from "lodash/map";
import _isEmpty from "lodash/isEmpty";

// Components
import CommentThread from "./components/commentThread";
import { Label } from "@im/components/src/atoms/typography";
import AllComments from "./components/allComments";
import { isMobile } from "@im/components/src/atoms/device";

// Services
import youtubeService from "@im/base/src/services/youtubeService";

// Utils
import getYTDataFromResponse from "@im/base/src/utils/getYTDataFromResponse";

// Constants
import {
  EMPTY_ARRAY,
  EMPTY_OBJECT,
} from "@im/base/src/constants/base.constants";
import { MAX_COMMENT_COUNT_NORMAL_MODE } from "./constants/general";

// Readers
import commentThreadReader from "@im/base/src/readers/CommentThread";

// Styles
import styles from "./comments.module.scss";

const renderComment =
  (isFullScreenView) =>
  (commentThread = EMPTY_OBJECT, index) => {
    if (index > MAX_COMMENT_COUNT_NORMAL_MODE) {
      return null;
    }
    const commentTheadId = commentThreadReader.id(commentThread);
    const commentTheadEtag = commentThreadReader.etag(commentThread);
    return (
      <CommentThread
        key={commentTheadId + commentTheadEtag}
        commentThread={commentThread}
        isFullScreenView={isFullScreenView}
      />
    );
  };

function Comments({ videoId }) {
  const [isFullScreenView, setFullScreenView] = useState(false);
  const [comments, setComments] = useState(EMPTY_ARRAY);

  useEffect(() => {
    youtubeService
      .getComments({ videoId })
      .then((response) => {
        const commentsDetails = getYTDataFromResponse(response) || EMPTY_OBJECT;
        const commentsList = commentsDetails.items || EMPTY_ARRAY;
        setComments(commentsList);
      })
      .catch((error) => {
        console.log(`Error: Failed to load comments, ${error}`);
      });
  }, [videoId]);

  const handleViewAllComments = () => {
    setFullScreenView(true);
  };

  const handleCloseAllComments = () => {
    setFullScreenView(false);
  };

  if (_isEmpty(comments)) {
    return "This movie does not have any comments yet!";
  }

  const viewAllCommentsClassname = cx(styles.viewAllCommentsLabel, {
    [styles.mobileViewAllCommentsLable]: isMobile,
  });

  return (
    <div className={styles.container}>
      {_map(comments, renderComment(!isMobile))}

      <Label
        className={viewAllCommentsClassname}
        onClick={handleViewAllComments}
      >
        {`View all comments`}
      </Label>
      <AllComments
        onClose={handleCloseAllComments}
        visible={isFullScreenView}
        videoId={videoId}
      />
    </div>
  );
}

Comments.propTypes = {
  videoId: PropTypes.string.isRequired,
};

Comments.defaultProps = {};

export default Comments;
