// Constants
import { EMPTY_STRING } from "@im/base/src/constants/base.constants";

// Lodash
import _isEmpty from "lodash/isEmpty";

// Services
import youtubeService from "../../../services/youtubeService";

const isUploadDisabled = (videoData) => {
  return _isEmpty(videoData);
};

export { isUploadDisabled };
