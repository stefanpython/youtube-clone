import "./Home.css";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = ({ isLeftContainerOpen }) => {
  const [videos, setVideos] = useState([]);
  const [pageToken, setPageToken] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const apiKey = import.meta.env.VITE_APP_API_KEY;

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = () => {
    if (!hasMore) return;

    fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=${apiKey}&maxResults=10&pageToken=${pageToken}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Invalid API key");
        }
      })
      .then((data) => {
        setVideos((prevVideos) => [...prevVideos, ...data.items]);
        setPageToken(data.nextPageToken || "");
        setHasMore(!!data.nextPageToken);
      })
      .catch((err) => {
        console.error("Error retrieving data:", err);
      });
  };

  console.log(videos);

  return (
    <div className="home-container">
      <div className={`left-side ${isLeftContainerOpen ? "open" : "closed"}`}>
        <div className="item home">
          <img className="home-img" src="./home.png" alt="home" />
          <p>Home</p>
        </div>
        <div className="item subscription">
          <img
            className="subscription-img"
            src="./subscribe.png"
            alt="subscriptions"
          />
          <p>Subscriptions</p>
        </div>
        <div className="item shorts">
          <img className="shorts-img" src="./shorts.png" alt="shorts" />
          <p>Shorts</p>
        </div>
        <div className="item library">
          <img className="library-img" src="./library.png" alt="library" />
          <p>Library</p>
        </div>
      </div>

      <div className="right-side">
        <h1>Right Container</h1>

        <InfiniteScroll
          dataLength={videos.length}
          next={fetchVideos}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          scrollThreshold={0.9}
        >
          <div className="video-list">
            {videos.map((video) => (
              <div className="video-item" key={video.id.videoId}>
                <Link to={`/video/${video.id.videoId}`}>
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
        </InfiniteScroll>
      </div>
    </div>
  );
};

Home.propTypes = {
  isLeftContainerOpen: PropTypes.bool.isRequired,
};

export default Home;
