import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "./MovieDetail.css";


interface MovieDetail {
  Title: string;
  Year: string;
  Plot: string;
  Actors: string;
  Director: string;
  Ratings: { Source: string; Value: string }[];
}

function MovieDetail() {

  const { imdbID } = useParams<{ imdbID: string }>();
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`);
        const data = await response.json();
        setMovieDetail(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetail();
  }, [imdbID]);


  return (
    <div className="movie-information-container">
      {movieDetail ? (
        <div className="movie-stats">
          <h2>{movieDetail.Title}</h2>
          <p>Year: {movieDetail.Year}</p>
          <p>Plot: {movieDetail.Plot}</p>
          <p>Actors: {movieDetail.Actors}</p>
          <p>Director: {movieDetail.Director}</p>
          <p>Ratings:</p>
          <ul>
            {movieDetail.Ratings.map((rating, index) => (
              <li key={index}>
                {rating.Source}: {rating.Value}
              </li>
            ))}
          </ul>
          <Link to="/" className="back-button">Back</Link>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default MovieDetail;
