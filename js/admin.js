/**
 * Admin functionality for HoatHinH3D
 * Allows adding new movies and episodes
 */

document.addEventListener("DOMContentLoaded", function () {
  console.log("Admin page loaded");

  // Tab navigation
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");

      // Remove active class from all tabs and contents
      tabs.forEach((t) => t.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      // Add active class to current tab and content
      this.classList.add("active");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Populate series select dropdown with existing movies
  populateMovieSelects();

  // Add episode row button
  const addEpisodeRowBtn = document.getElementById("add-episode-row");
  addEpisodeRowBtn.addEventListener("click", addEpisodeRow);

  // Initial episode row removal handlers
  setupEpisodeRowRemovals();

  // Save episodes button
  const saveEpisodesBtn = document.getElementById("save-episodes");
  saveEpisodesBtn.addEventListener("click", saveEpisodes);

  // Save movie button
  const saveMovieBtn = document.getElementById("save-movie");
  saveMovieBtn.addEventListener("click", saveMovie);

  // Quản lý phim
  setupMovieManagement();
});

/**
 * Cập nhật tất cả select box chứa danh sách phim
 */
function populateMovieSelects() {
  // Cập nhật dropdown chọn phim trong tab thêm tập phim
  const seriesSelect = document.getElementById("series-select");
  if (seriesSelect) {
    seriesSelect.innerHTML = '<option value="">-- Chọn phim --</option>';
    for (const movieId in movieData) {
      const option = document.createElement("option");
      option.value = movieId;
      option.textContent = movieData[movieId].title;
      seriesSelect.appendChild(option);
    }
    console.log(
      "Populated add episodes dropdown with",
      Object.keys(movieData).length,
      "movies"
    );
  }

  // Cập nhật dropdown chọn phim trong tab quản lý phim
  const movieList = document.getElementById("movie-list");
  if (movieList) {
    movieList.innerHTML = '<option value="">-- Chọn phim --</option>';
    for (const movieId in movieData) {
      const option = document.createElement("option");
      option.value = movieId;
      option.textContent = movieData[movieId].title;
      movieList.appendChild(option);
    }
    console.log(
      "Populated movie management dropdown with",
      Object.keys(movieData).length,
      "movies"
    );
  }
}

/**
 * Add a new episode row to the episodes container
 */
function addEpisodeRow() {
  const episodesContainer = document.getElementById("episodes-container");
  const newRow = document.createElement("div");
  newRow.className = "episode-row";
  newRow.innerHTML = `
    <input type="text" class="episode-title" placeholder="Tên tập (VD: Tập 1)" />
    <textarea class="episode-url" placeholder="URL hoặc mã nhúng đầy đủ (VD: https://geo.dailymotion.com/player.html?video=x9eede4 hoặc <iframe>...</iframe>)" rows="3" style="resize: vertical;"></textarea>
    <i class="fas fa-times remove-episode"></i>
  `;
  episodesContainer.appendChild(newRow);

  // Setup removal handler for the new row
  const removeBtn = newRow.querySelector(".remove-episode");
  removeBtn.addEventListener("click", function () {
    episodesContainer.removeChild(newRow);
  });

  console.log("Added new episode row");
}

/**
 * Setup event handlers for removing episode rows
 */
function setupEpisodeRowRemovals() {
  const removeButtons = document.querySelectorAll(".remove-episode");
  removeButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const row = this.parentElement;
      row.parentElement.removeChild(row);
    });
  });
}

/**
 * Show a success message with customizable content
 * @param {string} message - The message to display
 * @param {string} [link] - Optional URL to include as a link
 * @param {string} [linkText] - Optional text for the link
 */
function showSuccess(message, link, linkText) {
  const successMessage = document.getElementById("success-message");

  // If a custom message is provided, use it
  if (message) {
    let html = `<i class="fas fa-check-circle"></i> ${message}`;

    // Add link if provided
    if (link && linkText) {
      html += ` <a href="${link}" target="_blank" style="color: #27ae60; text-decoration: underline;">${linkText}</a>`;
    }

    successMessage.innerHTML = html;
  }

  successMessage.style.display = "block";
  setTimeout(() => {
    successMessage.style.display = "none";
    // Reset to default message after timeout
    if (message) {
      successMessage.innerHTML =
        '<i class="fas fa-check-circle"></i> Thao tác thành công!';
    }
  }, 5000);
}

/**
 * Show an error message
 * @param {string} message - The error message to display
 */
function showError(message) {
  const errorMessage = document.getElementById("error-message");
  const errorText = document.getElementById("error-text");
  errorText.textContent = message;
  errorMessage.style.display = "block";
  setTimeout(() => {
    errorMessage.style.display = "none";
  }, 5000);
}

/**
 * Create embed code from a video URL or full embed code
 * @param {string} input - The video URL or full embed code
 * @returns {string} The embed code for the URL
 */
function createEmbedCode(input) {
  input = input.trim();

  // Kiểm tra xem input có phải là mã nhúng đầy đủ không
  if (input.includes("<iframe") && input.includes("</iframe>")) {
    console.log("Đã nhận mã nhúng đầy đủ");
    return input;
  }

  // Kiểm tra nếu đây là div wrap bao quanh iframe
  if (
    input.includes("<div") &&
    input.includes("</div>") &&
    input.includes("<iframe")
  ) {
    console.log("Đã nhận mã nhúng div+iframe");
    return input;
  }

  // Nếu là URL Dailymotion
  if (input.includes("dailymotion.com") || input.includes("dai.ly")) {
    return `<iframe frameborder="0" width="100%" height="100%" src="${input}" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`;
  }

  // Với các URL khác
  return `<iframe frameborder="0" width="100%" height="100%" src="${input}" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`;
}

/**
 * Extract URL from embed code if needed
 * @param {string} input - The embed code or URL
 * @returns {string} The extracted URL or original input if not embed code
 */
function extractUrlFromEmbed(input) {
  input = input.trim();

  // Kiểm tra xem input có phải là mã nhúng không
  if (input.includes("<iframe") && input.includes("src=")) {
    // Trích xuất URL từ thuộc tính src
    const srcMatch = input.match(/src=["']([^"']+)["']/);
    if (srcMatch && srcMatch[1]) {
      console.log("Trích xuất URL:", srcMatch[1]);
      return srcMatch[1];
    }
  }

  return input;
}

/**
 * Save episodes to the selected movie
 */
function saveEpisodes() {
  const seriesId = document.getElementById("series-select").value;

  if (!seriesId) {
    showError("Vui lòng chọn phim trước khi thêm tập mới");
    return;
  }

  const episodeRows = document.querySelectorAll(".episode-row");
  if (episodeRows.length === 0) {
    showError("Vui lòng thêm ít nhất một tập phim");
    return;
  }

  // Collect episode data
  const episodes = [];
  episodeRows.forEach((row) => {
    const titleInput = row.querySelector(".episode-title");
    const urlInput = row.querySelector(".episode-url");

    const title = titleInput.value.trim();
    const inputContent = urlInput.value.trim();

    if (title && inputContent) {
      const videoUrl = extractUrlFromEmbed(inputContent);
      const embedCode = createEmbedCode(inputContent);

      episodes.push({
        title: title,
        url: videoUrl,
        embedCode: embedCode,
      });
    }
  });

  if (episodes.length === 0) {
    showError("Vui lòng nhập đầy đủ thông tin cho ít nhất một tập phim");
    return;
  }

  // Initialize the series in videoData if it doesn't exist
  if (!videoData[seriesId]) {
    videoData[seriesId] = {};
  }

  console.log("Saving episodes for movie:", seriesId);

  // Add episodes to videoData
  episodes.forEach((episode) => {
    // Generate a key for the episode based on the title
    // Example: "Tập 10" becomes "ep10"
    let episodeKey = "ep" + (episode.title.match(/\d+/)?.[0] || Date.now());

    // Add the episode to videoData
    videoData[seriesId][episodeKey] = {
      title: episode.title,
      videoUrl: episode.url,
      embedCode: episode.embedCode,
    };

    console.log("Added episode:", episodeKey, episode.title);
  });

  // Call the updateVideoData function if it exists
  if (typeof updateVideoData === "function") {
    episodes.forEach((episode) => {
      let episodeKey = "ep" + (episode.title.match(/\d+/)?.[0] || Date.now());
      updateVideoData(
        seriesId,
        episodeKey,
        episode.title,
        episode.url,
        episode.embedCode
      );
    });
  }

  // Update localStorage to persist changes  try {    localStorage.setItem("videoData", JSON.stringify(videoData));    console.log("Saved videoData to localStorage");  } catch (e) {    console.error("Không thể lưu vào localStorage:", e);    showError("Không thể lưu dữ liệu: " + e.message);    return;  }  // Get movie title for success message  const movieTitle = movieData[seriesId].title;    // Update movie episode count in movieData  const totalEpisodes = Object.keys(videoData[seriesId]).length;  movieData[seriesId].episodes = totalEpisodes;  // Save updated movieData  try {    localStorage.setItem("movieData", JSON.stringify(movieData));    console.log("Updated movie episode count in movieData");        // Show detailed success message    const successMessage = document.getElementById("success-message");    successMessage.innerHTML = `      <i class="fas fa-check-circle"></i> Đã thêm ${episodes.length} tập phim vào "${movieTitle}".       Tổng số tập hiện tại: ${totalEpisodes}.       <a href="movie-detail.html?id=${seriesId}" target="_blank" style="color: #27ae60; text-decoration: underline;">        Xem phim ngay      </a>    `;        successMessage.style.display = "block";    setTimeout(() => {      successMessage.style.display = "none";    }, 5000);      } catch (e) {    console.error("Không thể cập nhật số tập trong movieData:", e);    showError("Lỗi khi cập nhật số tập: " + e.message);  }

  // Clear episode inputs
  document.getElementById("episodes-container").innerHTML = `
    <div class="episode-row">
      <input type="text" class="episode-title" placeholder="Tên tập (VD: Tập 1)" />
      <textarea class="episode-url" placeholder="URL hoặc mã nhúng đầy đủ (VD: https://geo.dailymotion.com/player.html?video=x9eede4 hoặc <iframe>...</iframe>)" rows="3" style="resize: vertical;"></textarea>
      <i class="fas fa-times remove-episode"></i>
    </div>
  `;

  // Re-setup removal handlers
  setupEpisodeRowRemovals();
}

/**
 * Save a new movie to movieData
 */
function saveMovie() {
  // Get all movie data from the form
  const movieId = document.getElementById("movie-id").value.trim();
  const title = document.getElementById("movie-title").value.trim();
  const originalTitle = document
    .getElementById("movie-original-title")
    .value.trim();
  const description = document.getElementById("movie-description").value.trim();
  const poster = document.getElementById("movie-poster").value.trim();
  const backdrop = document.getElementById("movie-backdrop").value.trim();
  const year = document.getElementById("movie-year").value.trim();
  const episodesCount = document.getElementById("movie-episodes").value.trim();
  const status = document.getElementById("movie-status").value;
  const rating = document.getElementById("movie-rating").value.trim();
  const genresInput = document.getElementById("movie-genres").value.trim();

  // Validate required fields
  if (!movieId || !title || !poster || !backdrop) {
    showError(
      "Vui lòng nhập đầy đủ thông tin bắt buộc (ID, tên phim, poster, backdrop)"
    );
    return;
  }

  // Check if movie ID already exists
  if (movieData[movieId]) {
    showError("ID phim đã tồn tại. Vui lòng chọn ID khác.");
    return;
  }

  // Parse genres
  const genres = genresInput
    .split(",")
    .map((g) => g.trim())
    .filter((g) => g);

  // Create new movie object
  const newMovie = {
    id: movieId,
    title: title,
    originalTitle: originalTitle || title,
    description: description || "Chưa có mô tả.",
    poster: poster,
    backdrop: backdrop,
    year: year || new Date().getFullYear().toString(),
    episodes: parseInt(episodesCount) || 0,
    status: status,
    rating: rating || "0.0",
    genre: genres.length > 0 ? genres : ["Chưa phân loại"],
    type: "series",
  };

  console.log("Adding new movie:", newMovie);

  // Add the new movie to movieData
  movieData[movieId] = newMovie;

  // Create empty video data for the new movie
  videoData[movieId] = {};

  // Update localStorage to persist changes
  try {
    localStorage.setItem("movieData", JSON.stringify(movieData));
    localStorage.setItem("videoData", JSON.stringify(videoData));
    console.log("Saved movieData and videoData to localStorage");
  } catch (e) {
    console.error("Không thể lưu vào localStorage:", e);
    showError("Không thể lưu dữ liệu: " + e.message);
    return;
  }

  // Add the new movie to the series select dropdown
  const option = document.createElement("option");
  option.value = movieId;
  option.textContent = title;
  document.getElementById("series-select").appendChild(option);

  showSuccess(null, null, `Đã thêm phim mới: ${title}`);

  // Clear all inputs
  document.getElementById("movie-id").value = "";
  document.getElementById("movie-title").value = "";
  document.getElementById("movie-original-title").value = "";
  document.getElementById("movie-description").value = "";
  document.getElementById("movie-poster").value = "";
  document.getElementById("movie-backdrop").value = "";
  document.getElementById("movie-year").value = "";
  document.getElementById("movie-episodes").value = "";
  document.getElementById("movie-rating").value = "";
  document.getElementById("movie-genres").value = "";
}

// Initialize data from localStorage if available
window.addEventListener("load", function () {
  try {
    console.log("Admin page init");

    // Log initial movie data
    console.log("Initial movieData:", Object.keys(movieData));
    console.log("Initial videoData:", Object.keys(videoData));

    // Load saved data from localStorage if available
    const savedMovieData = localStorage.getItem("movieData");
    const savedVideoData = localStorage.getItem("videoData");

    if (savedMovieData) {
      const parsedMovieData = JSON.parse(savedMovieData);
      Object.assign(movieData, parsedMovieData);
      console.log(
        "Loaded movieData from localStorage:",
        Object.keys(parsedMovieData)
      );
    }

    if (savedVideoData) {
      const parsedVideoData = JSON.parse(savedVideoData);
      Object.assign(videoData, parsedVideoData);
      console.log(
        "Loaded videoData from localStorage:",
        Object.keys(parsedVideoData)
      );
    }
  } catch (e) {
    console.error("Lỗi khi tải dữ liệu từ localStorage:", e);
  }
});

/**
 * Thiết lập chức năng quản lý phim
 */
function setupMovieManagement() {
  const movieList = document.getElementById("movie-list");
  const editMovieBtn = document.getElementById("edit-movie-btn");
  const deleteMovieBtn = document.getElementById("delete-movie-btn");
  const editMovieForm = document.getElementById("edit-movie-form");
  const manageEpisodesSection = document.getElementById(
    "manage-episodes-section"
  );
  const episodesList = document.getElementById("episodes-list");

  // Chức năng khi chọn phim từ danh sách
  if (movieList) {
    movieList.addEventListener("change", function () {
      const selectedMovieId = this.value;

      // Kích hoạt/vô hiệu hóa các nút
      editMovieBtn.disabled = !selectedMovieId;
      deleteMovieBtn.disabled = !selectedMovieId;

      // Ẩn form chỉnh sửa
      editMovieForm.style.display = "none";

      // Hiển thị danh sách tập nếu có phim được chọn
      if (selectedMovieId) {
        manageEpisodesSection.style.display = "block";
        loadEpisodesList(selectedMovieId);
      } else {
        manageEpisodesSection.style.display = "none";
      }
    });
  }

  // Chức năng khi nhấn nút Sửa phim
  if (editMovieBtn) {
    editMovieBtn.addEventListener("click", function () {
      const selectedMovieId = movieList.value;
      if (selectedMovieId) {
        loadMovieToEditForm(selectedMovieId);
        editMovieForm.style.display = "block";
      }
    });
  }

  // Chức năng khi nhấn nút Xóa phim
  if (deleteMovieBtn) {
    deleteMovieBtn.addEventListener("click", function () {
      const selectedMovieId = movieList.value;
      if (selectedMovieId) {
        if (
          confirm(
            `Bạn có chắc chắn muốn xóa phim "${movieData[selectedMovieId].title}" không?`
          )
        ) {
          deleteMovie(selectedMovieId);
        }
      }
    });
  }

  // Chức năng khi nhấn nút Lưu thay đổi
  const saveEditMovieBtn = document.getElementById("save-edit-movie-btn");
  if (saveEditMovieBtn) {
    saveEditMovieBtn.addEventListener("click", function () {
      const selectedMovieId = movieList.value;
      if (selectedMovieId) {
        saveEditedMovie(selectedMovieId);
      }
    });
  }

  // Chức năng khi nhấn nút Hủy
  const cancelEditMovieBtn = document.getElementById("cancel-edit-movie-btn");
  if (cancelEditMovieBtn) {
    cancelEditMovieBtn.addEventListener("click", function () {
      editMovieForm.style.display = "none";
    });
  }
}

/**
 * Tải thông tin phim vào form chỉnh sửa
 * @param {string} movieId - ID của phim cần chỉnh sửa
 */
function loadMovieToEditForm(movieId) {
  const movie = movieData[movieId];
  if (!movie) return;

  document.getElementById("edit-movie-title").value = movie.title || "";
  document.getElementById("edit-movie-original-title").value =
    movie.originalTitle || "";
  document.getElementById("edit-movie-description").value =
    movie.description || "";
  document.getElementById("edit-movie-poster").value = movie.poster || "";
  document.getElementById("edit-movie-backdrop").value = movie.backdrop || "";
  document.getElementById("edit-movie-year").value = movie.year || "";
  document.getElementById("edit-movie-status").value =
    movie.status || "Đang cập nhật";
  document.getElementById("edit-movie-rating").value = movie.rating || "";
  document.getElementById("edit-movie-genres").value = movie.genre
    ? movie.genre.join(", ")
    : "";

  console.log("Loaded movie data for editing:", movieId);
}

/**
 * Lưu thông tin phim sau khi chỉnh sửa
 * @param {string} movieId - ID của phim cần lưu
 */
function saveEditedMovie(movieId) {
  const title = document.getElementById("edit-movie-title").value.trim();
  const originalTitle = document
    .getElementById("edit-movie-original-title")
    .value.trim();
  const description = document
    .getElementById("edit-movie-description")
    .value.trim();
  const poster = document.getElementById("edit-movie-poster").value.trim();
  const backdrop = document.getElementById("edit-movie-backdrop").value.trim();
  const year = document.getElementById("edit-movie-year").value.trim();
  const status = document.getElementById("edit-movie-status").value;
  const rating = document.getElementById("edit-movie-rating").value.trim();
  const genres = document
    .getElementById("edit-movie-genres")
    .value.trim()
    .split(",")
    .map((g) => g.trim())
    .filter((g) => g);

  // Kiểm tra các trường bắt buộc
  if (!title || !poster || !backdrop) {
    showError(
      "Vui lòng nhập đầy đủ thông tin bắt buộc (tên phim, poster, backdrop)"
    );
    return;
  }

  // Cập nhật thông tin phim
  movieData[movieId].title = title;
  movieData[movieId].originalTitle = originalTitle || title;
  movieData[movieId].description = description || "Chưa có mô tả.";
  movieData[movieId].poster = poster;
  movieData[movieId].backdrop = backdrop;
  movieData[movieId].year = year || new Date().getFullYear().toString();
  movieData[movieId].status = status;
  movieData[movieId].rating = rating || "0.0";
  movieData[movieId].genre = genres.length > 0 ? genres : ["Chưa phân loại"];

  // Lưu vào localStorage
  try {
    localStorage.setItem("movieData", JSON.stringify(movieData));
    console.log("Saved edited movie to localStorage:", movieId);

    // Cập nhật tùy chọn trong select box
    const movieList = document.getElementById("movie-list");
    const selectedOption = movieList.querySelector(
      `option[value="${movieId}"]`
    );
    if (selectedOption) {
      selectedOption.textContent = title;
    }

    // Cập nhật danh sách phim trong các dropdown khác
    populateMovieSelects();

    // Ẩn form chỉnh sửa
    document.getElementById("edit-movie-form").style.display = "none";

    // Hiển thị thông báo thành công
    showSuccess(null, null, `Đã cập nhật thông tin phim: ${title}`);
  } catch (e) {
    console.error("Không thể lưu thay đổi vào localStorage:", e);
    showError("Lỗi: " + e.message);
  }
}

/**
 * Xóa phim
 * @param {string} movieId - ID của phim cần xóa
 */
function deleteMovie(movieId) {
  // Xóa phim khỏi movieData
  delete movieData[movieId];

  // Xóa dữ liệu video của phim
  if (videoData[movieId]) {
    delete videoData[movieId];
  }

  // Lưu vào localStorage
  try {
    localStorage.setItem("movieData", JSON.stringify(movieData));
    localStorage.setItem("videoData", JSON.stringify(videoData));
    console.log("Deleted movie from localStorage:", movieId);

    // Cập nhật danh sách phim trong các dropdown
    populateMovieSelects();

    // Ẩn form chỉnh sửa và danh sách tập
    document.getElementById("edit-movie-form").style.display = "none";
    document.getElementById("manage-episodes-section").style.display = "none";

    // Reset select box
    document.getElementById("movie-list").value = "";

    // Vô hiệu hóa các nút
    document.getElementById("edit-movie-btn").disabled = true;
    document.getElementById("delete-movie-btn").disabled = true;

    // Hiển thị thông báo thành công
    showSuccess(null, null, `Đã xóa phim: ${movieData[movieId].title}`);
  } catch (e) {
    console.error("Không thể lưu thay đổi vào localStorage:", e);
    showError("Lỗi: " + e.message);
  }
}

/**
 * Tải danh sách tập phim
 * @param {string} movieId - ID của phim
 */
function loadEpisodesList(movieId) {
  const episodesList = document.getElementById("episodes-list");
  if (!episodesList) return;

  if (!videoData[movieId] || Object.keys(videoData[movieId]).length === 0) {
    episodesList.innerHTML = `
      <div class="empty-message" style="text-align: center; padding: 20px; color: #aaa;">
        <i class="fas fa-film" style="font-size: 24px; margin-bottom: 10px;"></i>
        <p>Phim này chưa có tập nào. Hãy thêm tập phim trong tab "Thêm Tập Phim".</p>
      </div>
    `;
    return;
  }

  // Tạo danh sách tập phim
  let episodesHTML = `
    <style>
      .episode-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 15px;
        background-color: #333;
        border-radius: 4px;
        margin-bottom: 10px;
      }
      .episode-item:hover {
        background-color: #444;
      }
      .episode-info {
        flex: 1;
      }
      .episode-title {
        font-weight: 500;
        margin-bottom: 5px;
      }
      .episode-url {
        font-size: 12px;
        color: #aaa;
        word-break: break-all;
      }
      .delete-episode {
        color: #e74c3c;
        cursor: pointer;
        padding: 5px;
        transition: all 0.2s;
      }
      .delete-episode:hover {
        transform: scale(1.2);
      }
    </style>
  `;

  // Sắp xếp tập phim theo số tập
  const episodes = Object.entries(videoData[movieId]).sort((a, b) => {
    const numA = a[0].match(/\d+/);
    const numB = b[0].match(/\d+/);
    if (numA && numB) {
      return parseInt(numA[0]) - parseInt(numB[0]);
    }
    return a[0].localeCompare(b[0]);
  });

  episodes.forEach(([episodeKey, episode]) => {
    const videoUrl = episode.videoUrl || "Không có URL";
    episodesHTML += `
      <div class="episode-item" data-episode-key="${episodeKey}">
        <div class="episode-info">
          <div class="episode-title">${episode.title}</div>
          <div class="episode-url">${
            videoUrl.length > 60 ? videoUrl.substring(0, 60) + "..." : videoUrl
          }</div>
        </div>
        <div class="delete-episode" onclick="deleteEpisode('${movieId}', '${episodeKey}')">
          <i class="fas fa-trash"></i>
        </div>
      </div>
    `;
  });

  episodesList.innerHTML = episodesHTML;
}

// Đặt hàm deleteEpisode trong window để có thể gọi từ inline onclick
window.deleteEpisode = function (movieId, episodeKey) {
  if (
    confirm(
      `Bạn có chắc chắn muốn xóa tập "${videoData[movieId][episodeKey].title}" không?`
    )
  ) {
    // Xóa tập phim
    delete videoData[movieId][episodeKey];

    // Cập nhật số tập trong movieData
    movieData[movieId].episodes = Object.keys(videoData[movieId]).length;

    // Lưu vào localStorage
    try {
      localStorage.setItem("videoData", JSON.stringify(videoData));
      localStorage.setItem("movieData", JSON.stringify(movieData));
      console.log("Deleted episode from localStorage:", movieId, episodeKey);

      // Cập nhật lại danh sách tập phim
      loadEpisodesList(movieId);

      // Hiển thị thông báo thành công
      showSuccess(
        null,
        null,
        `Đã xóa tập: ${videoData[movieId][episodeKey].title}`
      );
    } catch (e) {
      console.error("Không thể lưu thay đổi vào localStorage:", e);
      showError("Lỗi: " + e.message);
    }
  }
};
