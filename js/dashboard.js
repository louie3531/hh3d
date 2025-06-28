document.addEventListener("DOMContentLoaded", () => {
  const totalMoviesSpan = document.getElementById("total-movies");
  const totalEpisodesSpan = document.getElementById("total-episodes");
  const apiUrl = "http://localhost:3001/api/movies";

  const fetchStats = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        console.error("Failed to fetch stats");
        return;
      }
      const movies = await response.json();

      const totalMovies = movies.length;
      const totalEpisodes = movies.reduce(
        (acc, movie) =>
          acc + (Array.isArray(movie.episodes) ? movie.episodes.length : 0),
        0
      );

      if (totalMoviesSpan) totalMoviesSpan.textContent = totalMovies;
      if (totalEpisodesSpan) totalEpisodesSpan.textContent = totalEpisodes;
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  fetchStats();
});
