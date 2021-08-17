import dotenv from "dotenv";

dotenv.config();

const MODULES = {
  YOUTUBE: "youtube",
};

const BASE_URL = {
  [MODULES.YOUTUBE]: "https://youtube.googleapis.com/youtube/v3",
};

const BASE_PARAMS = {
  [MODULES.YOUTUBE]: {
    part: "snippet",
    key: "AIzaSyBPwGl3hMnB2Spu-ijEmafDFwNG_Ta1f7I",
  },
};

const BASE_HEADERS = {
  [MODULES.YOUTUBE]: {},
};

const URL_REGEX = {
  [MODULES.YOUTUBE]:
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
};

export { BASE_HEADERS, BASE_PARAMS, BASE_URL, MODULES, URL_REGEX };
