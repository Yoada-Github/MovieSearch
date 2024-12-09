import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "./Loading";
import axios from "axios";
import "./index.css";
import MovieCard from "./MovieCard";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "http://www.omdbapi.com/";
  const API_KEY = "9cc9ffee"; 
  const fetchMovies = async (query) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(API_URL, {
        params: { s: query, apikey: API_KEY },
      });
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
        setError(response.data.Error);
      }
    } catch (err) {
      setError("Error fetching movies. Please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (search.trim() !== "") {
      fetchMovies(search);
    } else {
      setMovies([]);
    }
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 text-success">Collection of Movies</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control border-secondary rounded-pill text-center"
            placeholder="Search for movies..."
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>
      {loading && <Loading />}
      {error && <p className="text-danger text-center mt-3">{error}</p>}
      <div className="row mt-4">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div className="col-md-3 mb-4" key={movie.imdbID}>
              <MovieCard movie={movie} />
            </div>
          ))
        ) : (
          !loading && !error && (
            <p className="text-center mt-2">Start searching for movies!</p>
          )
        )}
      </div>
    </div>
  );
}

export default App;
