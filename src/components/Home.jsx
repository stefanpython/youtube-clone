import "./Home.css";
import { useState, useEffect } from "react";

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = () => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=AIzaSyDpZtXkR6ljXZM6C1Y9LPfWDEl8974-MUU&maxResults=50`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Invalid api key");
        }
      })
      .then((data) => {
        setVideos(data);
      })
      .catch((err) => {
        console.log("Error retrieving data:", err);
      });
  };

  console.log(videos);

  return <h1>home</h1>;
};

export default Home;
