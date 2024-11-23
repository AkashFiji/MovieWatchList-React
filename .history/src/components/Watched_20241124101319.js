import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { MovieCard } from "./MovieCard";
import { toPng } from "html-to-image";
import download from "downloadjs";

export const Watched = () => {
  const { watched } = useContext(GlobalContext);

  // Function to generate and download the image
  const handleGenerateImage = () => {
    const node = document.getElementById("watched-movie-list");

    toPng(node)
      .then((dataUrl) => {
        download(dataUrl, "watched-movies.png");
        alert("Image downloaded! Share it on Instagram.");
      })
      .catch((error) => {
        console.error("Error generating image:", error);
        alert("Something went wrong while generating the image.");
      });
  };

  return (
    <div className="movie-page">
      <div className="container">
        <div className="header">
          <h1 className="heading">Watched Movies</h1>
          <button className="btn-share" onClick={handleGenerateImage}>
            Generate Image for Instagram
          </button>
        </div>

        {watched.length > 0 ? (
          <div id="watched-movie-list" className="movie-grid">
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
