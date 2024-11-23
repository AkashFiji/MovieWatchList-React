import React, { useState } from "react";
import Plotly from "plotly.js-basic-dist";
import { FacebookShareButton, FacebookIcon } from "react-share";
import axios from "axios";

const ChartShare = () => {
  const [imgURI, setImgURI] = useState(null);

  const handleClick = () => {
    Plotly.toImage("chartContainer", {
      format: "png",
      width: 1000,
      height: 600,
    })
      .then((dataUrl) =>
        axios.post("/image/base64ToPng", { image: dataUrl })
      )
      .then((response) => {
        setImgURI(response.data.imgURI); // Save the URL in state
      })
      .catch((error) => console.error("Image upload failed:", error));
  };

  return (
    <div>
      <div id="chartContainer" style={{ width: "100%", height: "500px" }}>
        {/* Plotly Chart Rendered Here */}
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

export default ChartShare;
