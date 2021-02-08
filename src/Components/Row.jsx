import axios from "../axios";
import { useEffect, useState } from "react";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import "../Css/Row.css";
const Row = ({ title, fetchURL, isLarge }) => {
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const opts = {
    height: "380px",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.original_title || movie?.original_name || "")
        .then((url) => {
          const urlParam = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParam.get("v"));
          console.log(urlParam);
        })
        .catch((error) => alert(`No trailer for this part start with Top Rated part`));
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchURL);
      setMovie(request.data.results);
      return request;
    };
    fetchData();
  }, [fetchURL]);
  console.log(movie);
  return (
    <div className="row">
      <h2 className="title">{title}</h2>
      <div className="row__posters">
        {movie.map((movies, index) => (
          <img
            style={{ cursor: "pointer" }}
            onClick={() => handleClick(movies)}
            className={`row__poster ${isLarge && "row__posterLarge"}`}
            key={index}
            src={`${base_url}${
              isLarge ? movies?.backdrop_path : movies?.poster_path
            }`}
            alt=""
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};
export default Row;
