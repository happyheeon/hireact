import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const [moviedl, setMoviedl] = useState(null);
  const [loding, setLoding] = useState(true);
  const { id } = useParams();

  const getMovie = async () => {
    const response = await fetch(
      `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
    );
    const json = await response.json();
    setMoviedl(json);
    console.log(json);
    setLoding(false);
  };

  useEffect(() => {
    getMovie();
  }, [id]);

  return (
    <div>
      {loding ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <img
            src={moviedl.data.movie.background_image}
            alt={moviedl.data.movie.title}
          />
          <h1>{moviedl.data.movie.title}</h1>
          <h3>{moviedl.data.movie.rating}★</h3>
          <span>{`like : ${moviedl.data.movie.like_count}`}</span>
          <p>{moviedl.data.movie.description_intro || "No summary"}</p>
          <ul>
            {moviedl.data.movie.genres.map((genre, index) => (
              <li key={index}>{genre}</li>
            ))}
          </ul>
          {moviedl.data.movie.torrents.map((torrent, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "8px",
                cursor: "pointer",
                display: "inline-block",
              }}
              onClick={() => window.open(torrent.url, "_blank")}
            >
              {torrent.quality} Download a Torrent
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Detail;
