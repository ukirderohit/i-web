import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

// Components
import { Title, Label } from "@im/components/src/atoms/typography";
import { isMobile } from "@im/components/src/atoms/device";
import Logo from "@im/components/src/molecules/logo";
import GoogleLogin from "@im/components/src/molecules/googleLogin";

// Utils
import getRoute from "@im/base/src/utils/getRoute";
import VIEWS from "@im/base/src/constants/route.views";
import APPS from "@im/base/src/constants/route.apps";

// Providers
import { UserContext } from "@im/base/src/providers/UserProvider";

// Styles
import styles from "./login.module.scss";

const Login = () => {
  const { user } = useContext(UserContext);
  const [redirect, setredirect] = useState(null);
  const homeRoute = getRoute(APPS.OTT, VIEWS.HOME);

  useEffect(() => {
    if (user) {
      setredirect(homeRoute);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  if (isMobile) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <Logo application={APPS.OTT} />
          <Title className={styles.title}>Welcome to iFlix</Title>
          <Label className={styles.subTitle}>
            To enjoy watching interactive films, please login with your google
            account
          </Label>
          <div className={styles.googleLogin}>
            <GoogleLogin />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.animation}></div>
      <div className={styles.loginForm}>
        <div className={styles.content}>
          <Logo application={APPS.OTT} />
          <Title className={styles.title}>Welcome to iFlix</Title>
          <Label className={styles.subTitle}>
            To enjoy watching interactive films, please login with your google
            account
          </Label>
          <div className={styles.googleLogin}>
            <GoogleLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
