import "./SinglePage.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const SinglePage = () => {
  const { videoId } = useParams();
  const [videoDetails, setVideoDetails] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState(null);
  const [comments, setComments] = useState(null);
  const apiKey = import.meta.env.VITE_APP_API_KEY;

  useEffect(() => {
    fetchComments();
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

  // Fetch video comments
  const fetchComments = () => {
    fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=id%2Csnippet&videoId=${videoId}&key=${apiKey}&maxResults=10
  `)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Could not fetch comments");
        }
      })
      .then((data) => {
        setComments(data.items);
      })
      .catch((err) => {
        console.log("Error fetching comments:", err);
      });
  };

  if (!videoDetails) {
    return <div>Loading...</div>;
  }

  console.log(relatedVideos);

  return (
    <div className="single-page-container">
      <div className="video-container">
        <iframe
          className="video-frame"
          title={videoDetails.snippet.title}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          allowFullScreen
        ></iframe>
        <div className="video-details">
          <h1>{videoDetails.snippet.title}</h1>
          <p>{videoDetails.snippet.description}</p>
          {/* Add more details here */}
        </div>

        {/* Display comments */}
        {comments ? (
          <div className="comments">
            <h2>Comments</h2>
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>
                  <div className="comment-author">
                    <img
                      src={
                        comment.snippet.topLevelComment.snippet
                          .authorProfileImageUrl
                      }
                      alt={
                        comment.snippet.topLevelComment.snippet
                          .authorDisplayName
                      }
                    />
                    <p>
                      {
                        comment.snippet.topLevelComment.snippet
                          .authorDisplayName
                      }
                    </p>
                  </div>
                  <p>
                    {comment.snippet.topLevelComment.snippet.textDisplay}{" "}
                    <span>
                      {comment.snippet.topLevelComment.snippet.publishedAt}
                    </span>
                  </p>

                  <span>
                    {comment.snippet.topLevelComment.snippet.likeCount}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>Loading comments...</div>
        )}

        {/*Display related videos*/}
      </div>
      <div className="related-videos">
        <h2>Related Videos</h2>
        {relatedVideos ? (
          <ul>
            {relatedVideos.map((video) => (
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
      </div>
    </div>
  );
};

export default SinglePage;
