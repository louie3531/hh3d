// This file is currently empty.
// We will add JavaScript functionality in the next steps.

document.addEventListener("DOMContentLoaded", () => {
  const featuredSwiperWrapper = document.querySelector(
    ".featured-swiper .swiper-wrapper"
  );
  const latestGrid = document.querySelector(".latest-updates .movie-grid");
  const apiUrl = "http://localhost:3001/api/movies";

  const fetchMovies = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const movies = await response.json();

      // Reverse to show latest movies first in the "Mới cập nhật" section
      const allMovies = movies.slice().reverse();

      const featuredMovies = allMovies.filter((m) => m.isFeatured);

      displayFeaturedMovies(featuredMovies, featuredSwiperWrapper);
      displayMovies(allMovies, latestGrid);

      // Khởi tạo Swiper sau khi đã thêm dữ liệu
      initSwiper();
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      if (latestGrid)
        latestGrid.innerHTML =
          "<p>Không thể tải danh sách phim. Vui lòng thử lại sau.</p>";
    }
  };

  const initSwiper = () => {
    // Đảm bảo thư viện Swiper đã được tải
    if (typeof Swiper === "undefined") {
      console.error("Swiper library is not loaded!");
      return;
    }

    try {
      console.log("Initializing Swiper...");
      const swiper = new Swiper(".featured-swiper", {
        slidesPerView: "auto",
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        },
      });
      console.log("Swiper initialized successfully:", swiper);
    } catch (error) {
      console.error("Error initializing Swiper:", error);
    }
  };

  const displayFeaturedMovies = (movies, swiperWrapper) => {
    if (!swiperWrapper) {
      console.error("Swiper wrapper element not found");
      return;
    }

    swiperWrapper.innerHTML = ""; // Clear existing slides

    if (movies.length === 0) {
      swiperWrapper.innerHTML =
        "<div class='swiper-slide'><p>Hiện chưa có phim nổi bật nào.</p></div>";
      return;
    }

    console.log(`Adding ${movies.length} movies to featured slider`);

    movies.forEach((movie) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";

      // Use the provided image URL or a placeholder if it's missing.
      const imageUrl =
        movie.imageUrl ||
        `https://placehold.co/200x300/1f1f1f/ffffff?text=${encodeURIComponent(
          movie.title
        )}`;

      const movieItem = document.createElement("div");
      movieItem.className = "movie-item";

      movieItem.innerHTML = `
        <a href="details.html?id=${movie.id}">
          <div class="movie-item-image">
            <img src="${imageUrl}" alt="${movie.title}" onerror="this.onerror=null;this.src='https://placehold.co/200x300/1f1f1f/ffffff?text=Image+Error';">
            <div class="play-overlay"><i class="fas fa-play"></i></div>
          </div>
          <div class="movie-item-content">
            <h3>${movie.title}</h3>
          </div>
        </a>
      `;
      slide.appendChild(movieItem);
      swiperWrapper.appendChild(slide);
    });
  };

  const displayMovies = (movies, gridElement) => {
    if (!gridElement) return; // Do nothing if the grid element doesn't exist

    gridElement.innerHTML = ""; // Clear existing static movies

    if (movies.length === 0) {
      gridElement.innerHTML = "<p>Hiện chưa có phim nào.</p>";
      return;
    }

    movies.forEach((movie) => {
      const movieItem = document.createElement("div");
      movieItem.className = "movie-item";

      // Use the provided image URL or a placeholder if it's missing.
      const imageUrl =
        movie.imageUrl ||
        `https://placehold.co/200x300/1f1f1f/ffffff?text=${encodeURIComponent(
          movie.title
        )}`;

      movieItem.innerHTML = `
                <a href="details.html?id=${movie.id}">
                    <div class="movie-item-image">
                        <img src="${imageUrl}" alt="${movie.title}" onerror="this.onerror=null;this.src='https://placehold.co/200x300/1f1f1f/ffffff?text=Image+Error';">
                        <div class="play-overlay"><i class="fas fa-play"></i></div>
                    </div>
                    <div class="movie-item-content">
                        <h3>${movie.title}</h3>
                    </div>
                </a>
            `;
      gridElement.appendChild(movieItem);
    });
  };

  fetchMovies();
});
