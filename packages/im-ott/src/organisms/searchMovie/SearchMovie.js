import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import cx from "classnames";

//Components
import noDataFound from "@im/base/src/assets/images/noDataFound.png";
import SearchBox from "@im/components/src/atoms/searchBox";
import Image from "@im/components/src/atoms/image";
import { isMobile } from "@im/components/src/atoms/device";
import FilmCard from "@im/components/src/molecules/filmCard";
import FilmCardMobile from "@im/components/src/molecules/filmCardMobile";
import Skeleton from "@im/components/src/atoms/skeleton";
import Error from "@im/components/src/molecules/error";

// graphql
import { gqlClient } from "@im/base/src/graphql/gqlClient";
import { QUERY_ALL_MOVIES } from "@im/base/src/graphql/queries";

// Lodash
import _map from "lodash/map";
import _isEmpty from "lodash/isEmpty";
import _times from "lodash/times";

// Readers
import FilmReader from "@im/base/src/readers/Film";

// Constants
import {
  EMPTY_OBJECT,
  EMPTY_STRING,
} from "@im/base/src/constants/base.constants";

// Utils
import getRoute from "@im/base/src/utils/getRoute";
import VIEWS from "@im/base/src/constants/route.views";
import APPS from "@im/base/src/constants/route.apps";

// Styles
import styles from "./searchMovie.module.scss";

const renderMovie = (filmDetails = EMPTY_OBJECT, isFeatured) => {
  const filmId = FilmReader.id(filmDetails);
  const filmTitle = FilmReader.title(filmDetails);
  const filmRating = FilmReader.rating(filmDetails);
  const filmGenre = FilmReader.genre(filmDetails);
  const filmImgSrc = FilmReader.thumbnail(filmDetails);

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
        isFeatured={false}
      />
    </Link>
  );
};

const SearchMovie = (props) => {
  const [searchDetails, setSearchDetails] = useState(EMPTY_OBJECT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(EMPTY_OBJECT);
  const [searchValue, setSearchValue] = useState(EMPTY_STRING);
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchInit, setSearchInit] = useState(true);

  useEffect(() => {
    if (_isEmpty(searchValue)) {
      setSearchInit(true);
    }
    setLoading(true);
    gqlClient
      .query({
        query: QUERY_ALL_MOVIES,
        variables: {
          isPublished: true,
          queryText: searchValue,
        },
      })
      .then((response) => {
        const { data } = response;
        setSearchDetails(data.movies);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [searchValue]);

  const handleSearch = (value) => {
    if (_isEmpty(value)) {
      return;
    }
    setSearchInit(false);
    setSearchValue(value);
    setSearchClicked(true);
  };

  if (!_isEmpty(error)) {
    return <Error {...error} />;
  }

  const containerClassName = cx(styles.container, {
    [styles.mobileContainer]: isMobile,
  });

  const headingClassName = cx({
    [styles.mobileHeading]: isMobile,
  });

  const searchBoxClassName = cx(styles.searchbox, {
    [styles.webSearchBox]: !isMobile,
    [styles.mobileSearchBox]: isMobile,
  });

  return (
    <div className={containerClassName}>
      <div className={searchBoxClassName}>
        <SearchBox
          placeholder={"Search Movies"}
          size={"large"}
          onSearch={handleSearch}
          allowClear
        />
      </div>

      <div className={styles.content}>
        {loading ? (
          <Skeleton width="100%" paragraph={{ rows: 0 }} active={true} />
        ) : (
          searchInit && (
            <h1 className={headingClassName}>Frequently Searched Movies</h1>
          )
        )}
        {!loading &&
          !searchInit &&
          searchClicked &&
          searchDetails.length === 1 && (
            <p className={styles.searchResultText}>
              Found {searchDetails.length} result
            </p>
          )}
        {!loading &&
          !searchInit &&
          searchClicked &&
          searchDetails.length > 1 && (
            <p className={styles.searchResultText}>
              Found {searchDetails.length} results
            </p>
          )}
        {loading ? (
          _times(8, (movie) => (
            <Skeleton.Image active={true} className={styles.skeleton} />
          ))
        ) : (
          <div className={styles.movies}>
            {_map(searchDetails, renderMovie)}
          </div>
        )}
        <div>
          {!loading &&
            !searchInit &&
            searchClicked &&
            searchDetails.length === 0 && (
              <div className={styles.dataNotFound}>
                <p className={styles.searchResultText}>No results found</p>
                <Image src={noDataFound} />
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

SearchMovie.propTypes = {
  children: PropTypes.element,
};

SearchMovie.defaultProps = {};

export default SearchMovie;
