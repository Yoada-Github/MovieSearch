import React from "react";
import "./index.css"; 

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
        alt={movie.Title}
        className="movie-poster"
      />
      <div className="movie-details">
        <h4 className="movie-title">Title: {movie.Title}</h4>
        <p className="movie-year">Year: {movie.Year}</p>
      </div>
    </div>
  );
}

export default MovieCard;
