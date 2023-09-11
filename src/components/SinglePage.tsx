import React from "react";
import "./SinglePage.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SinglePage = () => {
  const { videoId } = useParams();
  const [videoDetails, setVideoDetails] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState(null);
  const apiKey = "AIzaSyDpZtXkR6ljXZM6C1Y9LPfWDEl8974-MUU"; // Replace with your API key

  useEffect(() => {
    fetchData();
  }, [videoId]);

  // Await for video details to grab and fetch by channelId
  const fetchData = async () => {
    try {
      const videoResponse = await fetchVideoDetails();
      setVideoDetails(videoResponse);

      if (
        videoResponse &&
        videoResponse.snippet &&
        videoResponse.snippet.channelId
      ) {
        const relatedVideosResponse = await fetchRelated(
          videoResponse.snippet.channelId
        );
        setRelatedVideos(relatedVideosResponse);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch video details
  const fetchVideoDetails = async () => {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,statistics&key=${apiKey}`
    );

    if (response.ok) {
      const data = await response.json();
      return data.items[0];
    } else {
      throw new Error("Error fetching video details");
    }
  };

  // Fetch related videos for a channel id
  const fetchRelated = async (channelId) => {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&type=video&part=snippet&maxResults=10`
    );

    if (response.ok) {
      const data = await response.json();
      return data.items;
    } else {
      throw new Error("Error fetching related videos");
    }
  };

  if (!videoDetails) {
    return <div>Loading...</div>;
  }

  console.log(relatedVideos);

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
