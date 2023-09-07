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
        setVideos(data.items);
      })
      .catch((err) => {
        console.log("Error retrieving data:", err);
      });
  };

  console.log(videos);

  return (
    <div className="home-container">
      <div className="left-side">
        <div className="home">
          <img className="home-img" src="./home.png" alt="home" />
        </div>
        <div className="subscription">
          <img
            className="subscription-img"
            src="./subscribe.png"
            alt="subscriptions"
          />
        </div>
        <div className="shorts">
          <img className="shorts-img" src="./shorts.png" alt="shorts" />
        </div>
        <div className="library">
          <img className="library-img" src="./library.png" alt="library" />
        </div>
      </div>

      <div className="right-side">
        <h1>Right Container</h1>
      </div>
    </div>
  );
};

export default Home;
