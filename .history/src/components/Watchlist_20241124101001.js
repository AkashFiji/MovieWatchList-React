import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { MovieCard } from "./MovieCard";

export const Watchlist = () => {
  const { watchlist } = useContext(GlobalContext);

  // Function to share the Watchlist
  const handleShareWatchlist = () => {
    const watchlistData = JSON.stringify(watchlist, null, 2);
    navigator.clipboard.writeText(watchlistData).then(() => {
      alert("Watchlist copied to clipboard! Share it with your friends.");
    });
  };

  return (
    <div className="movie-page">
      <div className="container">
        <div className="header">
          <h1 className="heading">My Watchlist</h1>

          <span className="count-pill">
            {watchlist.length} {watchlist.length === 1 ? "Movie" : "Movies"}
          </span>
          <button className="btn-share" onClick={handleShareWatchlist}>
            Share Watchlist
          </button>
        </div>

        {watchlist.length > 0 ? (
          <div className="movie-grid">
            {watchlist.map((movie) => (
              <MovieCard movie={movie} key={movie.id} type="watchlist" />
            ))}
          </div>
        ) : (
          <h2 className="no-movies">No movies in your list! Add some!</h2>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
