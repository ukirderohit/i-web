import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

// Components
import { UserContext } from "@im/base/src/providers/UserProvider";
import Error from "@im/components/src/molecules/error";
import Button, { BUTTON_TYPES } from "@im/components/src/atoms/button";
import { PlusOutlined, MinusOutlined } from "@im/components/src/atoms/icon";

// Lodash
import _isEmpty from "lodash/isEmpty";

// graphql
import { gqlClient } from "@im/base/src/graphql/gqlClient";
import { IS_WATCHLISTED } from "@im/base/src/graphql/queries";
import {
  MUTATION_ADD_WATCHLIST,
  MUTATION_DELETE_WATCHLIST,
} from "@im/base/src/graphql/mutation";

// Styles
import styles from "./watchlist.module.scss";

const Watchlist = (props) => {
  const { className, movieId } = props;
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useContext(UserContext);
  const label = isWatchlisted ? "Watchlist" : "Watchlist";
  const labelIcon = isWatchlisted ? (
    <MinusOutlined data-testid="minus" />
  ) : (
    <PlusOutlined data-testid="plus" />
  );

  useEffect(() => {
    gqlClient
      .query({
        query: IS_WATCHLISTED,
        variables: {
          movieId: movieId,
          userId: user?.uid,
        },
      })
      .then((response) => {
        const { data } = response;
        if (data?.isWatchlisted) {
          setIsWatchlisted(true);
        } else {
          setIsWatchlisted(false);
        }
      });
  }, [movieId, user?.uid]);

  const handleWatchlist = () => {
    let mutateQuery;
    if (!isWatchlisted) {
      mutateQuery = MUTATION_ADD_WATCHLIST;
    } else {
      mutateQuery = MUTATION_DELETE_WATCHLIST;
    }
    setLoading(true);
    gqlClient
      .mutate({
        mutation: mutateQuery,
        variables: {
          movieId: movieId,
          userid: user?.uid,
        },
      })
      .then((response) => {
        const { data } = response;
        if (data?.addToWatchlist) {
          setIsWatchlisted(true);
        } else {
          setIsWatchlisted(false);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  if (!_isEmpty(error)) {
    return <Error {...error} />;
  }

  return (
    <Button
      loading={loading}
      className={`${styles.button} ${className}`}
      onClick={handleWatchlist}
      type={BUTTON_TYPES.TERTIARY}
      data-testid="add-remove-watchlist-button"
    >
      {labelIcon}
      <span className={styles.label} data-testid="add-remove-watchlist-label">
        {label}
      </span>
    </Button>
  );
};

Watchlist.propTypes = {
  className: PropTypes.string,
  movieId: PropTypes.string,
};

Watchlist.defaultProps = {
  className: undefined,
  movieId: undefined,
};

export default Watchlist;
