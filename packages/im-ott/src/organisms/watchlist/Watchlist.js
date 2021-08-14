import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

// Components
import { UserContext } from "imbase/providers/UserProvider";
import Error from "imcomponents/molecules/error";
import Button from "imcomponents/atoms/button";

// Lodash
import _isEmpty from "lodash/isEmpty";

// graphql
import { gqlClient } from "imbase/graphql/gqlClient";
import { IS_WATCHLISTED } from "imbase/graphql/queries";
import {
  MUTATION_ADD_WATCHLIST,
  MUTATION_DELETE_WATCHLIST,
} from "imbase/graphql/mutation";

const Watchlist = (props) => {
  const { className, movieId } = props;
  const [isWatchlisted, setIsWatchlisted] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useContext(UserContext);
  const label = isWatchlisted ? "Remove Watchlist" : "Add Watchlist";

  useEffect(() => {
    gqlClient
      .query({
        query: IS_WATCHLISTED,
        variables: {
          movieId: movieId,
          userId: user.uid,
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
  }, [movieId, user.uid]);

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
          userid: user.uid,
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
    <div>
      <Button
        loading={loading}
        className={className}
        label={label}
        danger
        onClick={handleWatchlist}
      ></Button>
    </div>
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
