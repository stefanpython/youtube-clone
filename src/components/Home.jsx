import "./Home.css";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { formatDistance } from "date-fns";

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

  // Format Duration
  function formatVideoDuration(duration) {
    if (!duration) return "N/A"; // Handle cases where duration is null

    const durationParts = duration.match(/PT(\d+)M(\d+)S/);

    if (!durationParts) return "N/A"; // Handle cases where duration doesn't match the expected pattern

    const minutes = parseInt(durationParts[1], 10);
    const seconds = parseInt(durationParts[2], 10);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  // Format views
  function formatViewCount(viewCount) {
    if (viewCount >= 1000000) {
      return (viewCount / 1000000).toFixed(1) + "M";
    } else if (viewCount >= 1000) {
      return (viewCount / 1000).toFixed(1) + "k";
    } else {
      return viewCount.toString();
    }
  }

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
                <Link to={`/video/${video.id}`}>
                  <img
                    className="video-thumbnail"
                    src={video.snippet.thumbnails.default.url}
                    alt={video.snippet.title}
                  />

                  <div className="video-duration">
                    <p>{formatVideoDuration(video.contentDetails.duration)}</p>
                  </div>

                  <div className="video-info">
                    <h2 className="video-title">{video.snippet.title}</h2>
                    <p className="video-channel">
                      {video.snippet.channelTitle}
                    </p>
                    <p className="video-views">
                      {formatViewCount(video.statistics.viewCount)} views •{" "}
                      <span className="upload-date">
                        {formatDistance(
                          new Date(video.snippet.publishedAt),
                          new Date(),
                          { addSuffix: true }
                        )}
                      </span>
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
