import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const Search = ({ isLeftContainerOpen }) => {
  const [searchResults, setSearchResults] = useState([]);
  const { query } = useParams();
  const [pageToken, setPageToken] = useState("");
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    handleSearch(query);
  }, [query]);

  const apiKey = import.meta.env.VITE_APP_API_KEY;

  // Function to handle search and update searchResults state
  const handleSearch = (searchTerm) => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?key=${apiKey}&q=${searchTerm}&part=snippet&type=video&maxResults=10&pageToken=${pageToken}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error searching for videos");
        }
      })
      .then((data) => {
        // Concatenate the new items with the existing searchResults
        setSearchResults((prevResults) => [...prevResults, ...data.items]);

        // Use the nextPageToken from the response
        setPageToken(data.nextPageToken || "");
        setHasMore(!!data.nextPageToken);
      })
      .catch((error) => {
        console.error("Error searching for videos:", error);
      });
  };

  console.log(searchResults);

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

      <div className="search-videos">
        <h2>Related Videos</h2>

        <InfiniteScroll
          dataLength={searchResults.length}
          next={handleSearch(query)} // Use handleSearch to load more results
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          scrollThreshold={0.9} // Adjust this threshold as needed
        >
          {searchResults ? (
            <ul>
              {searchResults.map((video) => (
                <li key={video.id.videoId}>
                  <Link to={`/video/${video.id.videoId}`}>
                    <img
                      src={video.snippet.thumbnails.default.url}
                      alt={video.snippet.title}
                    />
                    <p>{video.snippet.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div>Loading related videos...</div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

Search.propTypes = {
  isLeftContainerOpen: PropTypes.bool.isRequired,
};

export default Search;
