import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { query } = useParams();

  useEffect(() => {
    handleSearch(query);
  }, [query]);

  const apiKey = "AIzaSyDpZtXkR6ljXZM6C1Y9LPfWDEl8974-MUU";

  // Function to handle search and update searchResults state
  const handleSearch = (searchTerm) => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?key=${apiKey}&q=${searchTerm}&part=snippet&type=video&maxResults=10`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error searching for videos");
        }
      })
      .then((data) => {
        setSearchResults(data.items);
      })
      .catch((error) => {
        console.error("Error searching for videos:", error);
      });
  };

  console.log(searchResults);

  return <h1>search {query}</h1>;
};

export default Search;
