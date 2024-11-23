import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { MovieCard } from "./MovieCard";
import { toPng } from "html-to-image";

export const Watched = () => {
  const { watched } = useContext(GlobalContext);
  const [previewUrl, setPreviewUrl] = useState("");

  // Function to generate and preview the image
  const handleGenerateImage = () => {
    const node = document.getElementById("watched-movie-list");

    if (!node) {
      alert("The movie list element is missing in the DOM!");
      return;
    }

    toPng(node)
      .then((dataUrl) => {
        setPreviewUrl(dataUrl); // Set the preview URL to display the image
      })
      .catch((error) => {
        console.error("Error generating image:", error);
        alert("Something went wrong while generating the image.");
      });
  };

  // Function to download the image after preview
  const handleDownloadImage = () => {
    if (!previewUrl) {
      alert("No image available to download!");
      return;
    }

    const link = document.createElement("a");
    link.download = "watched-movies.png";
    link.href = previewUrl;
    link.click();
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

        {/* Display preview if available */}
        {previewUrl && (
          <div className="preview">
            <h2>Preview</h2>
            <img src={previewUrl} alt="Watched Movies Preview" />
            <button className="btn-download" onClick={handleDownloadImage}>
              Download Image
            </button>
          </div>
        )}

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
