import React, { useState } from "react";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { toPng } from "html-to-image";
import axios from "axios";

const MovieListShare = ({ movies }) => {
  const [imgURI, setImgURI] = useState(null);

  const handleClick = async () => {
    const node = document.getElementById("movieListContainer");

    try {
      const dataUrl = await toPng(node, { cacheBust: true });
      const response = await axios.post("/image/base64ToPng", { image: dataUrl });
      setImgURI(response.data.imgURI); // Set the image URL
    } catch (error) {
      console.error("Error generating or uploading image:", error);
    }
  };

  return (
    <div>
      <div id="movieListContainer" style={{ padding: "20px", backgroundColor: "#fff" }}>
        <h2>My Movie List</h2>
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      </div>

      <button onClick={handleClick}>Generate & Share</button>

      {imgURI && (
        <FacebookShareButton url={imgURI}>
          <FacebookIcon size={32} />
        </FacebookShareButton>
      )}
    </div>
  );
};

export default MovieListShare;
