import React from "react";
import { MovieControls } from "./MovieControls";

export const MovieCard = ({ movie, type }) => {
  return (
    <div className="movie-card">
      <div className="overlay"></div>

      <img
  src="https://via.placeholder.com/150" // Placeholder
  alt={`${movie.title} Poster`}
/>


      <MovieControls type={type} movie={movie} />
    </div>
  );
};

export default MovieCard
