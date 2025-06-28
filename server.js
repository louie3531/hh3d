const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const https = require("https");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies
app.use(express.static(__dirname)); // Serve static files from the root directory

// Database path
const dbPath = path.join(__dirname, "db.json");

// Helper function to read the database
const readDB = () => {
  try {
    const data = fs.readFileSync(dbPath, "utf8");
    const jsonData = JSON.parse(data);
    // Ensure we always have a movies array
    return { movies: jsonData.movies || [] };
  } catch (error) {
    console.error("Error reading database:", error);
    return { movies: [] };
  }
};

// Helper function to write to the database (only for movies)
const writeMoviesToDB = (movies) => {
  try {
    console.log("Writing movies to database:", movies);
    const db = readDB();
    db.movies = movies;
    const jsonData = JSON.stringify(db, null, 2);
    console.log("Writing to db.json:", jsonData);
    fs.writeFileSync(dbPath, jsonData, "utf8");
    console.log("Successfully wrote to db.json");
  } catch (error) {
    console.error("Error writing to database:", error);
    throw error; // Re-throw to handle in the route handler
  }
};

// Helper function to extract playlist ID from URL
const extractPlaylistId = (url) => {
  const regex = /playlist\/([a-zA-Z0-9]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Helper function to fetch data from an API
const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

// API Routes

// Get all movies
app.get("/api/movies", (req, res) => {
  const db = readDB();
  res.json(db.movies);
});

// --- DEBUGGING ROUTE ---
// This route lets us see the entire database content.
app.get("/debug/db", (req, res) => {
  console.log("Serving database for debugging...");
  const db = readDB();
  res.json(db);
});
// --- END DEBUGGING ROUTE ---

// Get a single movie by ID
app.get("/api/movies/:id", (req, res) => {
  const db = readDB();
  const movieId = parseInt(req.params.id, 10);
  const movie = db.movies.find((m) => m.id === movieId);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: "Movie not found" });
  }
});

// Add a new movie
app.post("/api/movies", (req, res) => {
  try {
    console.log("Received POST request to add movie:", req.body);
    const db = readDB();
    const newMovie = {
      id: Date.now(), // simple unique ID
      ...req.body,
    };
    db.movies.push(newMovie);
    writeMoviesToDB(db.movies);
    console.log("Movie added successfully:", newMovie);
    res.status(201).json(newMovie);
  } catch (error) {
    console.error("Error adding movie:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Update a movie
app.put("/api/movies/:id", (req, res) => {
  try {
    const movieId = parseInt(req.params.id, 10);
    console.log(`Received PUT request to update movie ${movieId}:`, req.body);

    const db = readDB();
    const movieIndex = db.movies.findIndex((m) => m.id === movieId);

    if (movieIndex === -1) {
      console.log(`Movie with ID ${movieId} not found`);
      return res.status(404).json({ message: "Movie not found" });
    }

    const updatedMovie = { ...db.movies[movieIndex], ...req.body };
    db.movies[movieIndex] = updatedMovie;
    writeMoviesToDB(db.movies);
    console.log("Movie updated successfully:", updatedMovie);
    res.json(updatedMovie);
  } catch (error) {
    console.error("Error updating movie:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Delete a movie
app.delete("/api/movies/:id", (req, res) => {
  const db = readDB();
  const movieId = parseInt(req.params.id, 10);
  const movieIndex = db.movies.findIndex((m) => m.id === movieId);

  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }

  db.movies.splice(movieIndex, 1);
  writeMoviesToDB(db.movies);
  res.status(204).send(); // No Content
});

// Import videos from a Dailymotion playlist
app.post("/api/import-playlist", async (req, res) => {
  try {
    const { playlistUrl, title, imageUrl, genre, year, description } = req.body;

    if (!playlistUrl) {
      return res
        .status(400)
        .json({ message: "URL playlist không được để trống" });
    }

    const playlistId = extractPlaylistId(playlistUrl);

    if (!playlistId) {
      return res.status(400).json({ message: "URL playlist không hợp lệ" });
    }

    // Fetch playlist info from Dailymotion API
    const playlistData = await fetchData(
      `https://api.dailymotion.com/playlist/${playlistId}?fields=name,description`
    );

    if (!playlistData || playlistData.error) {
      return res.status(404).json({ message: "Không tìm thấy playlist" });
    }

    // Lấy tất cả video từ playlist sử dụng phân trang
    let allVideos = [];
    let page = 1;
    let hasMoreVideos = true;

    console.log("Bắt đầu lấy video từ playlist...");

    while (hasMoreVideos) {
      console.log(`Đang lấy trang ${page}...`);
      // Sử dụng limit=100 để lấy số lượng video tối đa mỗi trang
      const videosData = await fetchData(
        `https://api.dailymotion.com/playlist/${playlistId}/videos?fields=id,title,thumbnail_url&limit=100&page=${page}`
      );

      if (
        !videosData ||
        videosData.error ||
        !videosData.list ||
        videosData.list.length === 0
      ) {
        console.log("Không có thêm video hoặc có lỗi xảy ra");
        hasMoreVideos = false;
      } else {
        console.log(
          `Đã tìm thấy ${videosData.list.length} video ở trang ${page}`
        );
        allVideos = [...allVideos, ...videosData.list];

        // Kiểm tra xem còn video nữa không
        if (videosData.has_more && page < 10) {
          // API Dailymotion giới hạn tối đa 10 trang
          page++;
        } else {
          hasMoreVideos = false;
        }
      }
    }

    console.log(`Tổng số video đã lấy: ${allVideos.length}`);

    if (allVideos.length === 0) {
      return res.status(404).json({ message: "Playlist không có video nào" });
    }

    // Create a new movie with episodes from the playlist
    const db = readDB();
    const episodes = [];

    for (let i = 0; i < allVideos.length; i++) {
      const video = allVideos[i];
      const dailymotionLink = `https://www.dailymotion.com/video/${video.id}`;
      const embedUrl = `https://www.dailymotion.com/embed/video/${video.id}`;

      episodes.push({
        number: i + 1,
        dailymotionLink,
        embedUrl,
      });
    }

    const newMovie = {
      id: Date.now(),
      title: title || playlistData.name || "Phim từ playlist",
      imageUrl:
        imageUrl || (allVideos.length > 0 ? allVideos[0].thumbnail_url : ""),
      isFeatured: false,
      genre: genre || "",
      year: year || new Date().getFullYear().toString(),
      description:
        description ||
        playlistData.description ||
        "Phim được nhập từ playlist Dailymotion",
      episodes: episodes,
    };

    db.movies.push(newMovie);
    writeMoviesToDB(db.movies);

    res.status(201).json({
      message: `Đã nhập thành công ${episodes.length} tập phim từ playlist`,
      movie: newMovie,
    });
  } catch (error) {
    console.error("Error importing playlist:", error);
    res
      .status(500)
      .json({ message: "Lỗi khi nhập playlist", error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
