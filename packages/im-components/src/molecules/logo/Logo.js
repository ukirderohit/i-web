import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Components
import { VideoCameraFilled } from "@im/components/src/atoms/icon";
import { isMobile } from "@im/components/src/atoms/device";

// Utils
import getRoute from "@im/base/src/utils/getRoute";
import VIEWS from "@im/base/src/constants/route.views";
import APPS from "@im/base/src/constants/route.apps";

// Styles
import styles from "./logo.module.scss";

// Constants
import { EMPTY_STRING } from "@im/base/src/constants/base.constants";

const Logo = (props) => {
  const { text, application } = props;
  const textStyle = isMobile ? styles.textMobile : styles.text;
  const imgStyle = isMobile ? styles.imageMobile : styles.image;

  let homeRoute;
  if (application === APPS.OTT) {
    homeRoute = getRoute(APPS.OTT, VIEWS.HOME);
  }
  if (application === APPS.STUDIO) {
    homeRoute = getRoute(APPS.STUDIO, VIEWS.HOME);
  }

  return (
    <>
      <Link to={homeRoute} className={styles.logo}>
        <VideoCameraFilled className={imgStyle} />
        <div className={textStyle}>{text}</div>
      </Link>
    </>
  );
};

Logo.propTypes = {
  text: PropTypes.string,
  application: PropTypes.string,
  children: PropTypes.element,
};

Logo.defaultProps = {
  text: EMPTY_STRING,
  application: EMPTY_STRING,
};

export default Logo;
