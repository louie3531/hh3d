const apiUrl = "http://localhost:3001/api/movies";

const movieForm = document.getElementById("movie-form");
const movieIdInput = document.getElementById("movie-id");
const titleInput = document.getElementById("title");
const imageUrlInput = document.getElementById("image-url");
const genreInput = document.getElementById("genre");
const yearInput = document.getElementById("year");
const descriptionInput = document.getElementById("description");
const movieList = document.getElementById("movie-list");
const isFeaturedInput = document.getElementById("isFeatured");
const episodesContainer = document.getElementById("episodes-container");
const addEpisodeBtn = document.getElementById("add-episode-btn");

const totalMoviesSpan = document.getElementById("total-movies");
const totalEpisodesSpan = document.getElementById("total-episodes");

// Function to get the Dailymotion embed URL
const getEmbedUrl = (dailymotionLink) => {
  console.log("Processing Dailymotion link:", dailymotionLink);

  if (!dailymotionLink) {
    console.error("Empty Dailymotion link provided");
    return null;
  }

  // Handle various Dailymotion URL formats
  let videoId = null;

  // Format: dailymotion.com/video/x9lq3wc
  const standardMatch = dailymotionLink.match(
    /dailymotion\.com\/video\/([a-zA-Z0-9]+)/
  );
  if (standardMatch && standardMatch[1]) {
    videoId = standardMatch[1];
    console.log("Matched standard format, video ID:", videoId);
  }

  // Format: dai.ly/x9lq3wc
  if (!videoId) {
    const shortMatch = dailymotionLink.match(/dai\.ly\/([a-zA-Z0-9]+)/);
    if (shortMatch && shortMatch[1]) {
      videoId = shortMatch[1];
      console.log("Matched short format, video ID:", videoId);
    }
  }

  // Format: dailymotion.com/embed/video/x9lq3wc
  if (!videoId) {
    const embedMatch = dailymotionLink.match(
      /dailymotion\.com\/embed\/video\/([a-zA-Z0-9]+)/
    );
    if (embedMatch && embedMatch[1]) {
      videoId = embedMatch[1];
      console.log("Matched embed format, video ID:", videoId);
    }
  }

  // If we found a video ID, return the embed URL
  if (videoId) {
    const embedUrl = `https://www.dailymotion.com/embed/video/${videoId}`;
    console.log("Generated embed URL:", embedUrl);
    return embedUrl;
  }

  console.error("Could not extract video ID from Dailymotion link");
  return null;
};

// Function to add a new episode input field
const addEpisodeField = (episode = { number: "", dailymotionLink: "" }) => {
  console.log("Adding episode field with data:", episode);

  // Create the container div
  const episodeDiv = document.createElement("div");
  episodeDiv.className = "form-group episode-field";
  episodeDiv.style.display = "flex";
  episodeDiv.style.gap = "1rem";
  episodeDiv.style.alignItems = "center";

  // Create number input
  const numberInput = document.createElement("input");
  numberInput.type = "number";
  numberInput.className = "episode-number";
  numberInput.placeholder = "Tập số";
  numberInput.value = episode.number || "";
  numberInput.style.width = "100px";

  // Create URL input
  const linkInput = document.createElement("input");
  linkInput.type = "url";
  linkInput.className = "episode-link";
  linkInput.placeholder = "https://www.dailymotion.com/video/...";
  linkInput.value = episode.dailymotionLink || "";
  linkInput.style.flex = "1";

  // Create delete button
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-episode-btn";
  deleteButton.textContent = "Xóa";
  deleteButton.style.background = "#e50914";
  deleteButton.style.border = "none";
  deleteButton.style.color = "white";
  deleteButton.style.padding = "5px 10px";
  deleteButton.style.borderRadius = "4px";
  deleteButton.style.cursor = "pointer";

  // Add event listener to delete button
  deleteButton.addEventListener("click", () => {
    episodeDiv.remove();
    console.log("Episode field removed");
  });

  // Append all elements to the container
  episodeDiv.appendChild(numberInput);
  episodeDiv.appendChild(linkInput);
  episodeDiv.appendChild(deleteButton);

  // Append the container to the episodes container
  episodesContainer.appendChild(episodeDiv);

  console.log("Episode field added successfully");
};

// This listener should only be active on the movie management page
if (addEpisodeBtn) {
  console.log("Add Episode button found, attaching event listener");
  addEpisodeBtn.addEventListener("click", () => {
    console.log("Add Episode button clicked");
    addEpisodeField();
  });
}

// Function to fetch and display movies, and calculate stats
const getMovies = async () => {
  try {
    const response = await fetch(apiUrl);
    const movies = await response.json();

    // This logic is for the dashboard, but we can reuse it if the elements exist
    if (totalMoviesSpan && totalEpisodesSpan) {
      const totalMovies = movies.length;
      const totalEpisodes = movies.reduce((acc, movie) => {
        // Handle both string and array formats for episodes
        if (Array.isArray(movie.episodes)) {
          return acc + movie.episodes.length;
        } else if (typeof movie.episodes === "string") {
          return acc + 1; // Count as 1 episode if it's a string
        }
        return acc;
      }, 0);
      totalMoviesSpan.textContent = totalMovies;
      totalEpisodesSpan.textContent = totalEpisodes;
    }

    if (!movieList) return; // Exit if we're not on a page with a movie list

    movieList.innerHTML = "";
    // No longer storing all movies in dataset, it's inefficient
    // movieList.dataset.movies = JSON.stringify(movies);

    // Create a table for the movie list
    const table = document.createElement("table");
    table.innerHTML = `
      <thead>
        <tr>
          <th>Ảnh Bìa</th>
          <th>Tên Phim</th>
          <th>Năm</th>
          <th>Số tập</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    `;
    const tbody = table.querySelector("tbody");

    movies.forEach((movie) => {
      const featuredTag = movie.isFeatured
        ? '<strong style="color: var(--sidebar-active-bg);">★</strong> '
        : "";
      const tr = document.createElement("tr");
      tr.dataset.movieId = movie.id; // Set movie id on the row
      tr.innerHTML = `
        <td><img src="${
          movie.imageUrl || "https://placehold.co/50x70?text=N/A"
        }" alt="Poster"></td>
        <td>${featuredTag}${movie.title}</td>
        <td>${movie.year || "N/A"}</td>
        <td>${getEpisodeCount(movie.episodes)}</td>
        <td class="actions">
          <a href="#" class="edit-btn" title="Sửa"><i class="fa-solid fa-pencil"></i></a>
          <a href="#" class="delete-btn" title="Xóa"><i class="fa-solid fa-trash"></i></a>
        </td>
      `;
      tbody.appendChild(tr);
    });
    movieList.appendChild(table);
  } catch (error) {
    console.error("Error fetching movies:", error);
    alert(
      "Lỗi khi tải danh sách phim. Vui lòng kiểm tra console để biết thêm chi tiết."
    );
  }
};

// Helper function to get episode count from either string or array
const getEpisodeCount = (episodes) => {
  if (Array.isArray(episodes)) {
    return episodes.length;
  } else if (typeof episodes === "string") {
    return 1; // If it's the old format, count as 1 episode
  }
  return 0;
};

// Handle clicks on Edit/Delete buttons using Event Delegation
if (movieList) {
  movieList.addEventListener("click", (e) => {
    const target = e.target.closest("a"); // Find the clicked link
    if (!target) return;

    const tr = target.closest("tr");
    const id = tr.dataset.movieId;

    if (target.classList.contains("edit-btn")) {
      e.preventDefault();
      editMovie(id);
    }

    if (target.classList.contains("delete-btn")) {
      e.preventDefault();
      deleteMovie(id);
    }
  });
}

// Handle form submission for adding/updating movies
if (movieForm) {
  movieForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    const movieId = movieIdInput.value;

    const movieData = {
      title: titleInput.value,
      imageUrl: imageUrlInput.value,
      isFeatured: isFeaturedInput.checked,
      genre: genreInput.value,
      year: yearInput.value,
      description: descriptionInput.value,
      episodes: [],
    };

    const episodeFields = episodesContainer.querySelectorAll(".episode-field");
    console.log(`Found ${episodeFields.length} episode fields`);

    for (const field of episodeFields) {
      const numberInput = field.querySelector(".episode-number");
      const linkInput = field.querySelector(".episode-link");

      if (!numberInput || !linkInput) {
        console.error("Could not find number or link input in episode field");
        continue;
      }

      const number = numberInput.value;
      const dailymotionLink = linkInput.value;

      console.log(
        `Processing episode: Number=${number}, Link=${dailymotionLink}`
      );

      // Only add if both fields have values
      if (number && dailymotionLink) {
        const embedUrl = getEmbedUrl(dailymotionLink);
        console.log(`Generated embed URL: ${embedUrl}`);

        if (!embedUrl) {
          alert(
            `Link Dailymotion ở tập ${number} không hợp lệ. Vui lòng kiểm tra lại.`
          );
          return; // Stop submission
        }
        movieData.episodes.push({
          number: parseInt(number),
          dailymotionLink,
          embedUrl,
        });
      }
    }

    console.log("Final movie data:", movieData);

    if (movieData.episodes.length === 0) {
      alert("Vui lòng thêm ít nhất một tập phim hợp lệ.");
      return;
    }

    // Sort episodes by number
    movieData.episodes.sort((a, b) => a.number - b.number);

    const method = movieId ? "PUT" : "POST";
    const url = movieId ? `${apiUrl}/${movieId}` : apiUrl;

    try {
      console.log(`Sending ${method} request to ${url}`);
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movieData),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const responseData = await response.json();
      console.log("Server response:", responseData);

      movieForm.reset();
      movieIdInput.value = "";
      episodesContainer.innerHTML = "";
      addEpisodeField(); // Add one empty field for the next movie
      getMovies(); // Refresh the list
      alert(`Đã ${movieId ? "cập nhật" : "thêm"} phim thành công!`);
    } catch (error) {
      console.error("Error saving movie:", error);
      alert(`Lỗi khi lưu phim: ${error.message}`);
    }
  });
}

// Function to populate form for editing
const editMovie = async (id) => {
  try {
    console.log(`Fetching movie with ID: ${id}`);
    const response = await fetch(`${apiUrl}/${id}`);
    if (!response.ok) {
      throw new Error("Movie not found on server");
    }
    const movie = await response.json();
    console.log("Movie data received:", movie);

    movieIdInput.value = movie.id;
    titleInput.value = movie.title || "";
    imageUrlInput.value = movie.imageUrl || "";
    genreInput.value = movie.genre || "";
    yearInput.value = movie.year || "";
    descriptionInput.value = movie.description || "";
    isFeaturedInput.checked = movie.isFeatured || false;

    episodesContainer.innerHTML = "";

    // Handle different episode formats
    if (Array.isArray(movie.episodes) && movie.episodes.length > 0) {
      // New format - array of episode objects
      console.log("Processing array of episodes:", movie.episodes);
      movie.episodes.forEach((ep) => addEpisodeField(ep));
    } else if (typeof movie.episodes === "string" && movie.episodes) {
      // Old format - single episode as string
      console.log("Processing legacy episode format:", movie.episodes);
      addEpisodeField({
        number: "1", // Default to episode 1
        dailymotionLink: movie.dailymotionLink || "",
      });
    } else {
      // No episodes or invalid format
      console.log("No valid episodes found, adding empty field");
      addEpisodeField(); // Add a blank field if no episodes exist
    }

    window.scrollTo(0, 0);
  } catch (error) {
    console.error("Error fetching movie for edit:", error);
    alert("Không thể tải thông tin phim để sửa: " + error.message);
  }
};

// Function to delete a movie
const deleteMovie = async (id) => {
  if (confirm("Bạn có chắc chắn muốn xóa phim này?")) {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete movie from server.");
      }
      getMovies();
      alert("Đã xóa phim thành công!");
    } catch (error) {
      console.error("Error deleting movie:", error);
      alert(`Lỗi khi xóa phim: ${error.message}`);
    }
  }
};

// Initial fetch
document.addEventListener("DOMContentLoaded", () => {
  // Check which page we are on and run appropriate functions
  if (document.getElementById("movie-form")) {
    getMovies();
    addEpisodeField(); // Start with one empty episode field
  } else if (document.querySelector(".stats-grid")) {
    // This is the dashboard
    getMovies();
  }

  // Xử lý nhập playlist từ Dailymotion
  const importPlaylistBtn = document.getElementById("import-playlist-btn");
  const playlistUrlInput = document.getElementById("playlist-url");
  const importStatusDiv = document.getElementById("import-status");

  if (importPlaylistBtn) {
    importPlaylistBtn.addEventListener("click", async function () {
      const playlistUrl = playlistUrlInput.value.trim();
      const title = document.getElementById("playlist-title")?.value.trim();
      const imageUrl = document.getElementById("playlist-image")?.value.trim();
      const genre = document.getElementById("playlist-genre")?.value.trim();
      const year = document.getElementById("playlist-year")?.value.trim();
      const description = document
        .getElementById("playlist-description")
        ?.value.trim();

      if (!playlistUrl) {
        showImportStatus("error", "Vui lòng nhập URL playlist Dailymotion");
        return;
      }

      try {
        showImportStatus("info", "Đang xử lý playlist, vui lòng đợi...");
        importPlaylistBtn.disabled = true;

        const response = await fetch("/api/import-playlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            playlistUrl,
            title,
            imageUrl,
            genre,
            year,
            description,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Lỗi khi nhập playlist");
        }

        showImportStatus("success", data.message);
        getMovies(); // Tải lại danh sách phim
        playlistUrlInput.value = ""; // Xóa input
      } catch (error) {
        showImportStatus("error", error.message);
      } finally {
        importPlaylistBtn.disabled = false;
      }
    });
  }

  function showImportStatus(type, message) {
    if (!importStatusDiv) return;

    importStatusDiv.innerHTML = `
      <div class="alert ${
        type === "success"
          ? "alert-success"
          : type === "error"
          ? "alert-error"
          : "alert-info"
      }">
        ${message}
      </div>
    `;

    // Tự động ẩn thông báo sau 5 giây nếu là thành công
    if (type === "success") {
      setTimeout(() => {
        importStatusDiv.innerHTML = "";
      }, 5000);
    }
  }
});

// Thêm CSS cho thông báo
const style = document.createElement("style");
style.textContent = `
  .alert {
    padding: 10px;
    border-radius: 4px;
    margin: 10px 0;
  }
  .alert-success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }
  .alert-error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }
  .alert-info {
    background-color: #d1ecf1;
    color: #0c5460;
    border: 1px solid #bee5eb;
  }
`;
document.head.appendChild(style);
