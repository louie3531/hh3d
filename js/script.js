// Cấu trúc dữ liệu cho phim được định nghĩa trong movies-data.js và video-data.js

// Function to load page-specific content
function loadPageSpecificContent() {
  // Khởi tạo giao diện người dùng (đăng nhập/đăng xuất)
  initializeUserInterface();

  const pagePath = window.location.pathname;

  // Home page
  if (
    pagePath.includes("index.html") ||
    pagePath.endsWith("/") ||
    pagePath.endsWith("\\")
  ) {
    loadHomePage();
    // Hiển thị lịch sử xem và phim yêu thích
    loadHistoryAndFavorites();
  }

  // Movies page
  else if (pagePath.includes("movies.html")) {
    loadMoviesPage();
  }

  // TV Shows page
  else if (pagePath.includes("tv-shows.html")) {
    loadTVShowsPage();
  }

  // Genres page
  else if (pagePath.includes("genres.html")) {
    loadGenresPage();
  }
}

/**
 * Khởi tạo giao diện người dùng dựa trên trạng thái đăng nhập
 */
function initializeUserInterface() {
  const loginButton = document.getElementById("login-button");
  const adminButtonContainer = document.getElementById(
    "admin-button-container"
  );

  // Kiểm tra đăng nhập
  const isLoggedIn = window.checkLoginSession && window.checkLoginSession();
  const currentUser = isLoggedIn ? window.getCurrentUser() : null;

  if (loginButton) {
    if (isLoggedIn) {
      // Người dùng đã đăng nhập
      loginButton.innerHTML = `<i class="fas fa-user"></i> ${
        currentUser.displayName || currentUser.username
      }`;
      loginButton.href = "profile.html";

      // Thêm dropdown menu cho user
      const headerRight = loginButton.parentElement;

      // Kiểm tra xem đã có dropdown chưa
      let userDropdown = document.getElementById("user-dropdown");
      if (!userDropdown) {
        // Tạo dropdown cho user
        userDropdown = document.createElement("div");
        userDropdown.id = "user-dropdown";
        userDropdown.className = "dropdown-menu user-dropdown";
        userDropdown.innerHTML = `
          <a href="profile.html"><i class="fas fa-user-circle"></i> Trang cá nhân</a>
          <a href="#" id="logout-button"><i class="fas fa-sign-out-alt"></i> Đăng xuất</a>
        `;
        headerRight.appendChild(userDropdown);

        // Xử lý sự kiện đăng xuất
        const logoutButton = document.getElementById("logout-button");
        if (logoutButton) {
          logoutButton.addEventListener("click", function (e) {
            e.preventDefault();
            if (window.logoutUser) {
              window.logoutUser();
            }
          });
        }

        // Thêm class để xử lý dropdown
        loginButton.classList.add("dropdown-toggle");

        // Xử lý hiển thị/ẩn dropdown
        loginButton.addEventListener("click", function (e) {
          e.preventDefault();
          userDropdown.classList.toggle("active");
        });

        // Đóng dropdown khi click ra ngoài
        document.addEventListener("click", function (e) {
          if (
            !loginButton.contains(e.target) &&
            !userDropdown.contains(e.target)
          ) {
            userDropdown.classList.remove("active");
          }
        });
      }

      // Hiển thị nút admin nếu người dùng có quyền admin
      if (adminButtonContainer && window.isAdmin && window.isAdmin()) {
        adminButtonContainer.style.display = "inline-block";
      } else if (adminButtonContainer) {
        adminButtonContainer.style.display = "none";
      }
    } else {
      // Người dùng chưa đăng nhập
      loginButton.innerHTML = "Đăng Nhập";
      loginButton.href = "login.html";

      // Xóa dropdown menu nếu có
      const userDropdown = document.getElementById("user-dropdown");
      if (userDropdown) {
        userDropdown.parentElement.removeChild(userDropdown);
      }

      // Xóa class dropdown-toggle
      loginButton.classList.remove("dropdown-toggle");

      // Ẩn nút admin
      if (adminButtonContainer) {
        adminButtonContainer.style.display = "none";
      }
    }
  }
}

// Function to load homepage content
function loadHomePage() {
  // Kiểm tra xem có dữ liệu phim hay không
  if (typeof movieData === "undefined" || Object.keys(movieData).length === 0) {
    console.log("Chưa có dữ liệu phim. Hãy thêm phim mới.");
    return;
  }

  // Load trending movies (đang thịnh hành) dưới dạng băng chuyền
  const trendingCarousel = document.getElementById("trending-movies-carousel");
  const trendingEmptyMessage = document.getElementById(
    "trending-empty-message"
  );

  if (trendingCarousel) {
    // Lấy tối đa 10 phim để hiển thị trong băng chuyền
    const movies = Object.values(movieData);
    const trendingMovies = movies
      .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
      .slice(0, 10);

    if (trendingMovies.length > 0) {
      let trendingMoviesHTML = "";
      trendingMovies.forEach((movie) => {
        trendingMoviesHTML += createMovieCard(movie);
      });

      // Ẩn thông báo trống nếu có phim
      if (trendingEmptyMessage) {
        trendingEmptyMessage.style.display = "none";
      }

      // Thêm các thẻ movie-card vào băng chuyền
      trendingCarousel.innerHTML = trendingMoviesHTML;

      // Thiết lập các nút điều khiển băng chuyền
      const prevBtn = document.getElementById("trending-prev");
      const nextBtn = document.getElementById("trending-next");

      if (prevBtn && nextBtn) {
        // Xử lý nút prev
        prevBtn.addEventListener("click", function () {
          trendingCarousel.scrollBy({
            left: -600,
            behavior: "smooth",
          });
        });

        // Xử lý nút next
        nextBtn.addEventListener("click", function () {
          trendingCarousel.scrollBy({
            left: 600,
            behavior: "smooth",
          });
        });
      }
    }
  }

  // Load latest movies (mới cập nhật)
  const latestMoviesGrid = document.getElementById("latest-movies-grid");
  if (latestMoviesGrid) {
    let latestMoviesHTML = "";
    // Lấy tối đa 8 phim mới nhất (giả định theo năm)
    const movies = Object.values(movieData);
    const latestMovies = movies
      .sort((a, b) => parseInt(b.year) - parseInt(a.year))
      .slice(0, 8);

    if (latestMovies.length > 0) {
      latestMovies.forEach((movie) => {
        latestMoviesHTML += createMovieCard(movie);
      });
      latestMoviesGrid.innerHTML = latestMoviesHTML;
    }
  }

  // Cập nhật số lượng phim trong các thể loại
  updateCategoryCounts();
}

// Hàm cập nhật số lượng phim trong các thể loại
function updateCategoryCounts() {
  const categoryItems = document.querySelectorAll(".category-item");
  if (!categoryItems.length) return;

  // Đếm số lượng phim cho mỗi thể loại
  const genreCounts = {};

  if (typeof movieData !== "undefined") {
    Object.values(movieData).forEach((movie) => {
      movie.genre.forEach((genre) => {
        if (!genreCounts[genre]) {
          genreCounts[genre] = 0;
        }
        genreCounts[genre]++;
      });
    });
  }

  // Cập nhật hiển thị
  categoryItems.forEach((item) => {
    const genreName = item.querySelector("h3").textContent;
    const countElement = item.querySelector(".count");
    if (countElement) {
      const count = genreCounts[genreName] || 0;
      countElement.textContent = `${count} phim`;
    }
  });
}

// Function to load all movies
function loadMoviesPage() {
  // Kiểm tra xem có dữ liệu phim hay không
  if (typeof movieData === "undefined" || Object.keys(movieData).length === 0) {
    console.log("Chưa có dữ liệu phim. Hãy thêm phim mới.");
    const moviesContainer = document.getElementById("movies-container");
    if (moviesContainer) {
      moviesContainer.innerHTML = `
        <div class="empty-message">
          <i class="fas fa-film"></i>
          <p>Chưa có phim nào. Vui lòng thêm phim mới.</p>
        </div>
      `;
    }
    return;
  }

  // Get references to DOM elements
  const moviesContainer = document.getElementById("movies-container");
  const sortOption = document.getElementById("sort-option");
  const genreFilter = document.getElementById("genre-filter");
  const prevPageBtn = document.getElementById("prev-page");
  const nextPageBtn = document.getElementById("next-page");
  const currentPageSpan = document.querySelector(".current-page");
  const totalPagesSpan = document.getElementById("total-pages");

  if (!moviesContainer) return;

  // Pagination state
  let currentPage = 1;
  const itemsPerPage = 12;
  let filteredMovies = [];
  let totalPages = 1;

  // Function to render movies
  function renderMovies() {
    // Apply filters and sorting
    let movies = Object.values(movieData);

    // Filter by genre if not 'all'
    if (genreFilter && genreFilter.value !== "all") {
      const selectedGenre = genreFilter.value;
      movies = movies.filter((movie) =>
        movie.genre.some(
          (genre) =>
            genre.toLowerCase() === selectedGenre ||
            genre.toLowerCase().replace(/\s+/g, "-") === selectedGenre
        )
      );
    }

    // Apply sorting
    if (sortOption) {
      switch (sortOption.value) {
        case "latest":
          movies.sort((a, b) => parseInt(b.year) - parseInt(a.year));
          break;
        case "name":
          movies.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "rating":
          movies.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
          break;
        case "year":
          movies.sort((a, b) => parseInt(b.year) - parseInt(a.year));
          break;
      }
    }

    filteredMovies = movies;

    // Calculate total pages
    totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
    if (totalPagesSpan) totalPagesSpan.textContent = totalPages;

    // Adjust current page if needed
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;
    if (currentPageSpan) currentPageSpan.textContent = currentPage;

    // Update pagination buttons
    if (prevPageBtn) prevPageBtn.disabled = currentPage <= 1;
    if (nextPageBtn) nextPageBtn.disabled = currentPage >= totalPages;

    // Get movies for current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMovies = filteredMovies.slice(startIndex, endIndex);

    // Render movies
    let moviesHTML = "";

    if (currentMovies.length > 0) {
      currentMovies.forEach((movie) => {
        moviesHTML += createMovieCard(movie);
      });
    } else {
      moviesHTML = `
        <div class="empty-message">
          <i class="fas fa-search"></i>
          <p>Không tìm thấy phim phù hợp với bộ lọc.</p>
        </div>
      `;
    }

    moviesContainer.innerHTML = moviesHTML;
  }

  // Event listeners for sorting and filtering
  if (sortOption) {
    sortOption.addEventListener("change", function () {
      currentPage = 1;
      renderMovies();
    });
  }

  if (genreFilter) {
    genreFilter.addEventListener("change", function () {
      currentPage = 1;
      renderMovies();
    });
  }

  // Event listeners for pagination
  if (prevPageBtn) {
    prevPageBtn.addEventListener("click", function () {
      if (currentPage > 1) {
        currentPage--;
        renderMovies();
      }
    });
  }

  if (nextPageBtn) {
    nextPageBtn.addEventListener("click", function () {
      if (currentPage < totalPages) {
        currentPage++;
        renderMovies();
      }
    });
  }

  // Initial render
  renderMovies();
}

// Function to load TV shows page (simplified for now)
function loadTVShowsPage() {
  // Placeholder for TV shows page functionality
  console.log("TV Shows page loaded");
}

// Function to load genres page (simplified for now)
function loadGenresPage() {
  // Placeholder for genres page functionality
  console.log("Genres page loaded");
}

// Function to create movie card HTML
function createMovieCard(movie) {
  return `
    <div class="movie-card">
      <a href="movie-detail.html?id=${movie.id}">
        <div class="movie-poster">
          <img src="${movie.poster}" alt="${movie.title}" loading="lazy" />
          <div class="rating-badge">${movie.rating}</div>
          ${
            movie.type === "series"
              ? `<div class="episode-count">${movie.episodes} tập</div>`
              : ""
          }
          <div class="movie-overlay">
          </div>
        </div>
        <div class="movie-info">
          <h3 class="movie-title">${movie.title}</h3>
          <div class="movie-category">
            ${movie.genre.slice(0, 2).join(" • ")}
          </div>
        </div>
      </a>
    </div>
  `;
}

// Function to search movies
function searchMovies(query) {
  query = query.toLowerCase().trim();
  const results = [];

  for (const id in movieData) {
    const movie = movieData[id];
    // Tìm trong tiêu đề và mô tả
    if (
      movie.title.toLowerCase().includes(query) ||
      movie.originalTitle.toLowerCase().includes(query) ||
      movie.description.toLowerCase().includes(query)
    ) {
      results.push(movie);
    }
  }

  return results;
}

// Initialize search functionality
document.addEventListener("DOMContentLoaded", function () {
  const searchBox = document.querySelector(".search-box input");
  const searchButton = document.querySelector(".search-box button");

  if (searchBox && searchButton) {
    // Handle search button click
    searchButton.addEventListener("click", function () {
      const query = searchBox.value;
      if (query.trim().length > 0) {
        // Redirect to search results page
        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
      }
    });

    // Handle enter key press
    searchBox.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        const query = searchBox.value;
        if (query.trim().length > 0) {
          window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        }
      }
    });
  }
});

// Khởi tạo trang khi tải xong DOM
document.addEventListener("DOMContentLoaded", function () {
  // Xử lý menu di động
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector("nav");

  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      nav.classList.toggle("active");
      menuBtn.classList.toggle("active");
    });
  }

  // Xử lý dropdown menu
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentElement.classList.toggle("active");
    });
  });

  // Đóng dropdown khi click ra ngoài
  document.addEventListener("click", function (e) {
    dropdownToggles.forEach((toggle) => {
      if (
        !toggle.contains(e.target) &&
        !e.target.classList.contains("dropdown-toggle")
      ) {
        toggle.parentElement.classList.remove("active");
      }
    });
  });

  // Tải nội dung dựa trên trang hiện tại
  loadPageSpecificContent();
});

// Lọc phim theo thể loại
function filterMoviesByGenre(movies, genre) {
  if (genre === "all") return Object.values(movies);

  return Object.values(movies).filter((movie) => {
    return movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase());
  });
}

// Hàm để đảm bảo video player hiển thị đúng
function initializeVideoPlayer() {
  const videoContainer = document.querySelector(".video-container");

  if (videoContainer) {
    // Đảm bảo iframe luôn được đặt đúng kích thước
    function adjustVideoSize() {
      const iframe = videoContainer.querySelector("iframe");
      if (iframe && iframe.src) {
        // Force a repaint to fix potential display issues
        iframe.style.display = "none";
        setTimeout(() => {
          iframe.style.display = "block";
        }, 10);
      }
    }

    // Điều chỉnh kích thước khi trang tải xong
    window.addEventListener("load", adjustVideoSize);

    // Điều chỉnh kích thước khi thay đổi kích thước cửa sổ
    window.addEventListener("resize", adjustVideoSize);
  }
}

// Chạy hàm khởi tạo khi tài liệu đã tải xong
document.addEventListener("DOMContentLoaded", initializeVideoPlayer);

// Template cho dữ liệu phim
/*
Cấu trúc dữ liệu phim:

const movieData = {
  "movie-id": {
    id: "movie-id",
    title: "Tên Phim",
    originalTitle: "Original Title",
    description: "Mô tả phim...",
    poster: "đường dẫn đến poster",
    backdrop: "đường dẫn đến backdrop",
    genre: ["Thể loại 1", "Thể loại 2"],
    rating: "9.5",
    year: "2023",
    episodes: 50,
    status: "Hoàn thành/Đang cập nhật",
    type: "movie/series"
  },
  // Thêm phim khác...
};

const videoData = {
  "movie-id": {
    "tap-1": {
      title: "Tập 1",
      videoId: "DailyMotion ID"
    },
    "tap-2": {
      title: "Tập 2",
      videoId: "DailyMotion ID"
    }
    // Thêm tập phim khác...
  }
};
*/

// Hàm hiển thị lịch sử xem và phim yêu thích
function loadHistoryAndFavorites() {
  console.log("Đang tải lịch sử xem và phim yêu thích...");

  // Kiểm tra đăng nhập
  if (!window.checkLoginSession || !window.checkLoginSession()) {
    console.log(
      "Người dùng chưa đăng nhập, không hiển thị lịch sử và yêu thích"
    );
    return; // Chỉ hiển thị cho người dùng đã đăng nhập
  }

  console.log("Người dùng đã đăng nhập, tiếp tục tải dữ liệu");
  const currentUser = window.getCurrentUser();
  const userId = currentUser.username;
  console.log("User ID:", userId);

  // Tạo hoặc lấy phần tử chứa lịch sử xem và phim yêu thích
  let userSectionContainer = document.getElementById(
    "user-preferences-container"
  );

  // Nếu chưa có, tạo mới và chèn vào trước footer
  if (!userSectionContainer) {
    console.log("Tạo container mới để hiển thị liên kết đến trang cá nhân");
    userSectionContainer = document.createElement("div");
    userSectionContainer.id = "user-preferences-container";
    const footer = document.querySelector("footer");
    if (footer) {
      footer.parentNode.insertBefore(userSectionContainer, footer);
    } else {
      document.body.appendChild(userSectionContainer);
    }
  } else {
    console.log("Đã tìm thấy container hiện có");
  }

  // Hiển thị liên kết đến trang cá nhân
  userSectionContainer.style.display = "block";
  let html = '<main class="user-preferences-main"><div class="container">';

  html += `
    <section class="user-section">
      <div class="user-section-header">
        <h2><i class="fas fa-user"></i> Quản lý tài khoản</h2>
      </div>
      <div class="account-links">
        <a href="profile.html" class="account-link">
          <i class="fas fa-user-circle"></i>
          <span>Trang cá nhân</span>
        </a>
        <a href="profile.html#history" class="account-link">
          <i class="fas fa-history"></i>
          <span>Lịch sử xem</span>
          <span class="badge">${
            window.getHistory ? window.getHistory(userId).length : 0
          }</span>
        </a>
        <a href="profile.html#favorites" class="account-link">
          <i class="fas fa-heart"></i>
          <span>Phim yêu thích</span>
          <span class="badge">${
            window.getFavorites ? window.getFavorites(userId).length : 0
          }</span>
        </a>
      </div>
    </section>
  `;

  html += "</div></main>";
  userSectionContainer.innerHTML = html;
  console.log("Đã tạo liên kết đến trang cá nhân");
}
