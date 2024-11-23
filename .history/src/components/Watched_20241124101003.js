import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { MovieCard } from "./MovieCard";

export const Watched = () => {
  const { watched } = useContext(GlobalContext);

  // Function to share the Watched list
  const handleShareWatched = () => {
    const watchedData = JSON.stringify(watched, null, 2);
    navigator.clipboard.writeText(watchedData).then(() => {
      alert("Watched list copied to clipboard! Share it with your friends.");
    });
  };

  return (
    <div className="movie-page">
      <div className="container">
        <div className="header">
          <h1 className="heading">Watched Movies</h1>

          <span className="count-pill">
            {watched.length} {watched.length === 1 ? "Movie" : "Movies"}
          </span>
          <button className="btn-share" onClick={handleShareWatched}>
            Share Watched List
          </button>
        </div>

        {watched.length > 0 ? (
          <div className="movie-grid">
            {watched.map((movie) => (
              <MovieCard movie={movie} key={movie.id} type="watched" />
            ))}
          </div>
        ) : (
          <h2 className="no-movies">No movies in your list! Add some!</h2>
        )}
      </div>
    </div>
  );
};

export default Watched;
