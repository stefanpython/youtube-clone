import React from "react";
import "./SinglePage.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SinglePage = () => {
  const { videoId } = useParams();
  const [videoDetails, setVideoDetails] = useState(null);

  useEffect(() => {
    const fetchVideoDetails = () => {
      const apiKey = "AIzaSyDpZtXkR6ljXZM6C1Y9LPfWDEl8974-MUU";

      fetch(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,statistics&key=${apiKey}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error fetching video details");
          }
        })
        .then((data) => {
          if (data.items.length > 0) {
            setVideoDetails(data.items[0]);
          }
        })
        .catch((error) => {
          console.error("Error fetching video details:", error);
        });
    };

    fetchVideoDetails();
  }, [videoId]);

  if (!videoDetails) {
    return <div>Loading...</div>;
  }

  console.log(videoDetails);

  return (
    <div className="single-page-container">
      <iframe
        width="420"
        height="345"
        src={`http://www.youtube.com/embed/${videoId}?autoplay=1`}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default SinglePage;
