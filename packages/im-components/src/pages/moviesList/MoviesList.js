import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { isMobile } from "@im/components/src/atoms/device";
import cx from "classnames";

// Lodash
import _map from "lodash/map";
import _isEmpty from "lodash/isEmpty";
import _get from "lodash/get";
import _times from "lodash/times";

// Components
import FilmCard from "@im/components/src/molecules/filmCard";
import FilmCardMobile from "@im/components/src/molecules/filmCardMobile";
import Skeleton from "@im/components/src/atoms/skeleton";
import Error from "@im/components/src/molecules/error";

// Readers
import FilmReader from "@im/base/src/readers/Film";

// graphql
import { gqlClient } from "@im/base/src/graphql/gqlClient";

// Constants
import {
  EMPTY_ARRAY,
  EMPTY_OBJECT,
} from "@im/base/src/constants/base.constants";

// Utils
import getRoute from "@im/base/src/utils/getRoute";
import VIEWS from "@im/base/src/constants/route.views";
import APPS from "@im/base/src/constants/route.apps";

// Styles
import styles from "./moviesList.module.scss";
import { getCurrentUser } from "@im/base/src/services/firebase";
import { getQueryParams } from "./utils";

const renderMovie = (filmDetails = EMPTY_OBJECT, isFeatured) => {
  const filmId = FilmReader.id(filmDetails);
  const filmTitle = FilmReader.title(filmDetails);
  const filmRating = FilmReader.rating(filmDetails);
  const filmGenre = FilmReader.genre(filmDetails);
  const filmImgSrc =
    FilmReader.userThumbnail(filmDetails) || FilmReader.thumbnail(filmDetails);

  const filmDetailsRoute = getRoute(APPS.OTT, VIEWS.FILMDETAILS, { filmId });

  if (isMobile) {
    return (
      <Link to={filmDetailsRoute}>
        <FilmCardMobile
          key={filmId}
          title={filmTitle}
          genre={filmGenre}
          imgSrc={filmImgSrc}
          rating={filmRating}
          {...filmDetails}
          isFeatured={false}
        />
      </Link>
    );
  }

  return (
    <Link to={filmDetailsRoute}>
      <FilmCard
        key={filmId}
        title={filmTitle}
        genre={filmGenre}
        imgSrc={filmImgSrc}
        rating={filmRating}
        {...filmDetails}
        isFeatured={false}
      />
    </Link>
  );
};

const MoviesList = () => {
  const currentUser = getCurrentUser()?.uid;
  const { movieCriteria } = useParams();
  const [loading, setLoading] = useState(true);
  const [movieList, setMovieList] = useState(EMPTY_ARRAY);
  const [error, setError] = useState(EMPTY_OBJECT);

  let { headingName, query, variables, dataPath } = getQueryParams(
    movieCriteria,
    currentUser
  );

  useEffect(() => {
    setLoading(true);
    gqlClient
      .query({
        query,
        variables,
      })
      .then((response) => {
        const { data } = response;
        setMovieList(_get(data, dataPath));
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieCriteria]);

  if (!_isEmpty(error)) {
    return <Error {...error} />;
  }

  return (
    <div className={styles.container}>
      {loading ? (
        <Skeleton width="100%" paragraph={{ rows: 0 }} active={true} />
      ) : (
        <h1 className={styles.heading}>{headingName}</h1>
      )}
      <div className={styles.content}>
        {loading ? (
          _times(8, (movie) => (
            <Skeleton.Image active={true} className={styles.skeleton} />
          ))
        ) : (
          <div className={styles.movies}>{_map(movieList, renderMovie)}</div>
        )}
      </div>
    </div>
  );
};

export default MoviesList;
