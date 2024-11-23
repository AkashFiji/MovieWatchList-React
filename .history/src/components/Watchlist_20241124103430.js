import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { MovieCard } from "./MovieCard";
import { toPng } from "html-to-image";
import axios from "axios";
import { FacebookShareButton, FacebookIcon } from "react-share";

export const Watchlist = () => {
  const { watchlist } = useContext(GlobalContext);
  const [imgURI, setImgURI] = useState(null); // To hold the image URL

  // Handle image generation and sharing
  const handleGenerateImage = async () => {
    const node = document.getElementById("watchlistContainer");

    try {
      const dataUrl = await toPng(node, { cacheBust: true });
      const response = await axios.post("/image/base64ToPng", { image: dataUrl });
      setImgURI(response.data.imgURI); // Set the image URL
    } catch (error) {
      console.error("Error generating or uploading image:", error);
    }
  };

  return (
    <div className="movie-page">
      <div className="container">
        <div className="header">
          <h1 className="heading">My Watchlist</h1>

          <span className="count-pill">
            {watchlist.length} {watchlist.length === 1 ? "Movie" : "Movies"}
          </span>
        </div>

        <div id="watchlistContainer">
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

        <button onClick={handleGenerateImage}>Generate & Share</button>

        {imgURI && (
          <FacebookShareButton url={imgURI}>
            <FacebookIcon size={32} />
          </FacebookShareButton>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
