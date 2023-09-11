import "./Home.css";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Home = ({ isLeftContainerOpen }) => {
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

  return (
    <div className="home-container">
      <div className={`left-side ${isLeftContainerOpen ? "open" : "closed"}`}>
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

        <div className="video-list">
          {videos.map((video) => (
            <div className="video-item" key={video.id}>
              <Link to={`/video/${video.id}`}>
                <img
                  className="video-thumbnail"
                  src={video.snippet.thumbnails.default.url}
                  alt={video.snippet.title}
                />
                <div className="video-info">
                  <h2 className="video-title">{video.snippet.title}</h2>
                  <p className="video-channel">
                    Channel: {video.snippet.channelTitle}
                  </p>
                  <p className="video-views">
                    Views: {video.statistics.viewCount}
                  </p>
                  <p className="video-duration">
                    Duration: {video.contentDetails.duration}
                  </p>
                  <p className="video-upload-date">
                    Uploaded:{" "}
                    {new Date(video.snippet.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  isLeftContainerOpen: PropTypes.bool.isRequired,
};

export default Home;
