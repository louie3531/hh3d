/**
 * Profile page JavaScript
 */
document.addEventListener("DOMContentLoaded", function () {
  // Kiểm tra đăng nhập
  if (!window.checkLoginSession || !window.checkLoginSession()) {
    // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
    window.location.href = "index.html";
    return;
  }

  // Lấy thông tin người dùng hiện tại
  const currentUser = window.getCurrentUser();
  const username = currentUser.username;
  let fullUserData = window.getFullUserData(username);

  // Đặt ảnh avatar mặc định (data URL của một ảnh đại diện đơn giản)
  const defaultAvatar =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzM5MzgzOCIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjcwIiByPSI0MCIgZmlsbD0iI2VlZSIvPjxwYXRoIGQ9Ik00MCwxOTBjMC01NSwzMC01MCw2MC02NXM2MCwxMCw2MCw2NVoiIGZpbGw9IiNlZWUiLz48L3N2Zz4=";

  // Khởi tạo giao diện người dùng
  initializeUI();

  // Xử lý sự kiện cho các tab
  setupTabs();

  // Xử lý sự kiện cho form thông tin cá nhân
  setupProfileForm();

  // Xử lý sự kiện cho form đổi mật khẩu
  setupPasswordForm();

  // Xử lý sự kiện cho upload ảnh đại diện
  setupAvatarUpload();

  // Tải lịch sử xem và phim yêu thích
  loadHistory();
  loadFavorites();

  /**
   * Khởi tạo giao diện người dùng
   */
  function initializeUI() {
    // Hiển thị thông tin người dùng
    document.getElementById("display-name").textContent =
      currentUser.displayName || username;
    document.getElementById("username").textContent = "@" + username;

    // Hiển thị ảnh đại diện nếu có
    if (currentUser.profilePicture) {
      document.getElementById("profile-picture").src =
        currentUser.profilePicture;
      document.getElementById("upload-preview").src =
        currentUser.profilePicture;
    } else {
      document.getElementById("profile-picture").src = defaultAvatar;
      document.getElementById("upload-preview").src = defaultAvatar;
    }

    // Điền thông tin vào form
    document.getElementById("edit-display-name").value =
      currentUser.displayName || "";
    document.getElementById("edit-email").value = fullUserData.email || "";

    // Cập nhật số lượng phim đã xem và yêu thích
    updateStatCounts();

    // Cập nhật header với nút đăng xuất
    updateNavbar();
  }

  /**
   * Cập nhật thanh điều hướng (navbar)
   */
  function updateNavbar() {
    const loginButton = document.getElementById("login-button");
    const adminButtonContainer = document.getElementById(
      "admin-button-container"
    );

    // Đổi nút đăng nhập thành đăng xuất
    loginButton.textContent = "Đăng Xuất";
    loginButton.href = "#";
    loginButton.addEventListener("click", function (e) {
      e.preventDefault();
      window.logoutUser();
    });

    // Hiển thị nút admin nếu người dùng có quyền admin
    if (window.isAdmin && window.isAdmin()) {
      adminButtonContainer.style.display = "inline-block";
    }
  }

  /**
   * Cập nhật số lượng phim đã xem và yêu thích
   */
  function updateStatCounts() {
    // Lấy số lượng phim đã xem
    const history = window.getHistory ? window.getHistory(username) : [];
    document.getElementById(
      "watched-count"
    ).textContent = `${history.length} phim đã xem`;

    // Lấy số lượng phim yêu thích
    const favorites = window.getFavorites ? window.getFavorites(username) : [];
    document.getElementById(
      "favorites-count"
    ).textContent = `${favorites.length} phim yêu thích`;
  }

  /**
   * Thiết lập hệ thống tab
   */
  function setupTabs() {
    const tabs = document.querySelectorAll(".profile-tab");
    const tabContents = document.querySelectorAll(".tab-content");

    // Hàm để kích hoạt tab
    function activateTab(tabId) {
      // Xóa class active từ tất cả tabs
      tabs.forEach((t) => t.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      // Thêm class active cho tab được chọn
      const targetTab = document.querySelector(
        `.profile-tab[data-tab="${tabId}"]`
      );
      if (targetTab) {
        targetTab.classList.add("active");
        const tabContent = document.getElementById(tabId);
        if (tabContent) {
          tabContent.classList.add("active");
        }
      }

      // Ẩn tất cả thông báo thành công khi chuyển tab
      hideAllSuccessMessages();
    }

    // Khi click vào tab
    tabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        const tabId = this.getAttribute("data-tab");

        // Cập nhật URL hash
        window.location.hash = tabId;

        // Kích hoạt tab
        activateTab(tabId);
      });
    });

    // Kiểm tra hash URL khi trang được tải
    window.addEventListener("load", function () {
      // Lấy hash từ URL (bỏ dấu #)
      const hash = window.location.hash.substring(1);

      // Nếu hash là tên của một tab, kích hoạt tab đó
      if (hash && document.getElementById(hash)) {
        activateTab(hash);
      }
    });

    // Theo dõi thay đổi hash
    window.addEventListener("hashchange", function () {
      const hash = window.location.hash.substring(1);
      if (hash && document.getElementById(hash)) {
        activateTab(hash);
      }
    });
  }

  /**
   * Ẩn tất cả thông báo thành công
   */
  function hideAllSuccessMessages() {
    document.querySelectorAll(".success-message").forEach((msg) => {
      msg.classList.remove("visible");
    });
  }

  /**
   * Thiết lập form thông tin cá nhân
   */
  function setupProfileForm() {
    const profileForm = document.getElementById("profile-form");
    const cancelBtn = document.getElementById("cancel-profile");

    // Xử lý sự kiện submit form
    profileForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Lấy giá trị từ form
      const displayName = document
        .getElementById("edit-display-name")
        .value.trim();
      const email = document.getElementById("edit-email").value.trim();

      // Validate dữ liệu
      let isValid = true;

      if (!displayName) {
        showError("display-name-error", "Vui lòng nhập tên hiển thị");
        isValid = false;
      } else {
        hideError("display-name-error");
      }

      if (!email) {
        showError("email-error", "Vui lòng nhập email");
        isValid = false;
      } else if (!isValidEmail(email)) {
        showError("email-error", "Email không hợp lệ");
        isValid = false;
      } else {
        hideError("email-error");
      }

      if (!isValid) return;

      // Cập nhật thông tin người dùng
      const updateData = {
        displayName: displayName,
        email: email,
      };

      if (window.updateUser(username, updateData)) {
        // Cập nhật thành công
        fullUserData = window.getFullUserData(username);

        // Cập nhật UI
        document.getElementById("display-name").textContent = displayName;

        // Hiển thị thông báo thành công
        const successMsg = document.getElementById("profile-success");
        successMsg.classList.add("visible");

        // Ẩn thông báo sau 3 giây
        setTimeout(() => {
          successMsg.classList.remove("visible");
        }, 3000);
      }
    });

    // Xử lý sự kiện hủy
    cancelBtn.addEventListener("click", function () {
      // Reset form về giá trị ban đầu
      document.getElementById("edit-display-name").value =
        currentUser.displayName || "";
      document.getElementById("edit-email").value = fullUserData.email || "";

      // Ẩn thông báo lỗi
      hideError("display-name-error");
      hideError("email-error");
    });
  }

  /**
   * Thiết lập form đổi mật khẩu
   */
  function setupPasswordForm() {
    const passwordForm = document.getElementById("password-form");
    const cancelBtn = document.getElementById("cancel-password");

    // Xử lý sự kiện submit form
    passwordForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Lấy giá trị từ form
      const currentPassword = document.getElementById("current-password").value;
      const newPassword = document.getElementById("new-password").value;
      const confirmPassword = document.getElementById("confirm-password").value;

      // Validate dữ liệu
      let isValid = true;

      if (!currentPassword) {
        showError("current-password-error", "Vui lòng nhập mật khẩu hiện tại");
        isValid = false;
      } else {
        hideError("current-password-error");
      }

      if (!newPassword) {
        showError("new-password-error", "Vui lòng nhập mật khẩu mới");
        isValid = false;
      } else if (newPassword.length < 6) {
        showError("new-password-error", "Mật khẩu phải có ít nhất 6 ký tự");
        isValid = false;
      } else {
        hideError("new-password-error");
      }

      if (!confirmPassword) {
        showError("confirm-password-error", "Vui lòng xác nhận mật khẩu mới");
        isValid = false;
      } else if (confirmPassword !== newPassword) {
        showError("confirm-password-error", "Mật khẩu xác nhận không khớp");
        isValid = false;
      } else {
        hideError("confirm-password-error");
      }

      if (!isValid) return;

      // Cập nhật mật khẩu
      if (window.updatePassword(username, currentPassword, newPassword)) {
        // Đổi mật khẩu thành công

        // Reset form
        passwordForm.reset();

        // Hiển thị thông báo thành công
        const successMsg = document.getElementById("password-success");
        successMsg.classList.add("visible");

        // Ẩn thông báo sau 3 giây
        setTimeout(() => {
          successMsg.classList.remove("visible");
        }, 3000);
      } else {
        // Mật khẩu hiện tại không đúng
        showError("current-password-error", "Mật khẩu hiện tại không đúng");
      }
    });

    // Xử lý sự kiện hủy
    cancelBtn.addEventListener("click", function () {
      // Reset form
      passwordForm.reset();

      // Ẩn thông báo lỗi
      hideError("current-password-error");
      hideError("new-password-error");
      hideError("confirm-password-error");
    });
  }

  /**
   * Thiết lập chức năng upload ảnh đại diện
   */
  function setupAvatarUpload() {
    const changeAvatarBtn = document.getElementById("change-avatar-btn");
    const uploadModal = document.getElementById("upload-modal");
    const closeModalBtn = document.getElementById("close-upload-modal");
    const cancelUploadBtn = document.getElementById("cancel-upload");
    const fileInput = document.getElementById("avatar-upload");
    const uploadPreview = document.getElementById("upload-preview");
    const saveAvatarBtn = document.getElementById("save-avatar");

    let selectedFile = null;

    // Hiển thị modal upload ảnh
    changeAvatarBtn.addEventListener("click", function () {
      uploadModal.classList.add("active");
    });

    // Đóng modal
    function closeModal() {
      uploadModal.classList.remove("active");
      fileInput.value = ""; // Reset file input
      selectedFile = null;
      saveAvatarBtn.disabled = true;
      hideError("upload-error");

      // Reset preview về ảnh hiện tại
      uploadPreview.src = document.getElementById("profile-picture").src;
    }

    closeModalBtn.addEventListener("click", closeModal);
    cancelUploadBtn.addEventListener("click", closeModal);

    // Xử lý khi chọn file
    fileInput.addEventListener("change", function (e) {
      const file = e.target.files[0];

      if (!file) return;

      // Kiểm tra loại file
      if (!file.type.match("image.*")) {
        showError("upload-error", "Vui lòng chọn file ảnh");
        fileInput.value = "";
        return;
      }

      // Kiểm tra kích thước file (giới hạn 2MB)
      if (file.size > 2 * 1024 * 1024) {
        showError("upload-error", "Kích thước file không được vượt quá 2MB");
        fileInput.value = "";
        return;
      }

      hideError("upload-error");
      selectedFile = file;
      saveAvatarBtn.disabled = false;

      // Hiển thị ảnh preview
      const reader = new FileReader();
      reader.onload = function (e) {
        uploadPreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });

    // Lưu ảnh đại diện
    saveAvatarBtn.addEventListener("click", function () {
      if (!selectedFile) return;

      // Sử dụng 2 phương pháp:
      // 1. Upload file qua AJAX (cần máy chủ PHP)
      // 2. Lưu trực tiếp dưới dạng Data URL (fallback)

      // Nếu có API upload, sử dụng AJAX
      if (typeof fetch !== "undefined") {
        // Tạo FormData object để gửi file
        const formData = new FormData();
        formData.append("avatar", selectedFile);
        formData.append("username", username);

        // Hiển thị trạng thái đang xử lý
        saveAvatarBtn.textContent = "Đang xử lý...";
        saveAvatarBtn.disabled = true;

        // Gửi yêu cầu upload
        fetch("upload.php", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              // Upload thành công, cập nhật URL ảnh
              const imageUrl = data.file_url;

              // Cập nhật ảnh đại diện
              if (window.updateProfilePicture(username, imageUrl)) {
                // Cập nhật thành công
                document.getElementById("profile-picture").src = imageUrl;

                // Đóng modal
                closeModal();
              } else {
                showError("upload-error", "Không thể cập nhật ảnh đại diện");
              }
            } else {
              // Upload thất bại
              showError(
                "upload-error",
                data.message || "Lỗi khi tải lên ảnh đại diện"
              );
            }

            // Khôi phục trạng thái nút
            saveAvatarBtn.textContent = "Lưu ảnh đại diện";
            saveAvatarBtn.disabled = false;
          })
          .catch((error) => {
            console.error("Upload error:", error);

            // Fallback to Data URL if server error
            useDataUrlFallback();
          });
      } else {
        // Phương pháp fallback: Sử dụng Data URL
        useDataUrlFallback();
      }

      // Hàm fallback sử dụng Data URL
      function useDataUrlFallback() {
        const reader = new FileReader();
        reader.onload = function (e) {
          const profilePicture = e.target.result;

          // Cập nhật ảnh đại diện
          if (window.updateProfilePicture(username, profilePicture)) {
            // Cập nhật thành công
            document.getElementById("profile-picture").src = profilePicture;

            // Đóng modal
            closeModal();
          } else {
            showError("upload-error", "Không thể cập nhật ảnh đại diện");
          }

          // Khôi phục trạng thái nút
          saveAvatarBtn.textContent = "Lưu ảnh đại diện";
          saveAvatarBtn.disabled = false;
        };
        reader.readAsDataURL(selectedFile);
      }
    });
  }

  /**
   * Tải lịch sử xem
   */
  function loadHistory() {
    const historyGrid = document.getElementById("history-grid");

    // Lấy lịch sử xem
    const history = window.getHistory ? window.getHistory(username) : [];

    if (history.length === 0) {
      // Hiển thị trạng thái trống
      historyGrid.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-history"></i>
          <p>Bạn chưa xem phim nào.</p>
          <a href="index.html" class="btn-browse">Duyệt phim</a>
        </div>
      `;
      return;
    }

    // Hiển thị danh sách phim đã xem
    let historyHTML = "";

    history.forEach((item) => {
      historyHTML += `
        <div class="media-card">
          <a href="movie-detail.html?id=${item.id}">
            <img src="${item.poster}" alt="${item.title}" loading="lazy" />
          </a>
          <div class="media-info">
            <h3 class="media-title">${item.title}</h3>
            <p class="media-year">${item.year}</p>
          </div>
          <button class="remove-btn" data-id="${item.id}" data-type="history">
            <i class="fas fa-times"></i>
          </button>
        </div>
      `;
    });

    historyGrid.innerHTML = historyHTML;

    // Xử lý sự kiện xóa phim khỏi lịch sử
    setupRemoveButtons("history");
  }

  /**
   * Tải danh sách phim yêu thích
   */
  function loadFavorites() {
    const favoritesGrid = document.getElementById("favorites-grid");

    // Lấy danh sách phim yêu thích
    const favorites = window.getFavorites ? window.getFavorites(username) : [];

    if (favorites.length === 0) {
      // Hiển thị trạng thái trống
      favoritesGrid.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-heart"></i>
          <p>Bạn chưa có phim yêu thích nào.</p>
          <a href="index.html" class="btn-browse">Duyệt phim</a>
        </div>
      `;
      return;
    }

    // Hiển thị danh sách phim yêu thích
    let favoritesHTML = "";

    favorites.forEach((item) => {
      favoritesHTML += `
        <div class="media-card">
          <a href="movie-detail.html?id=${item.id}">
            <img src="${item.poster}" alt="${item.title}" loading="lazy" />
          </a>
          <div class="media-info">
            <h3 class="media-title">${item.title}</h3>
            <p class="media-year">${item.year}</p>
          </div>
          <button class="remove-btn" data-id="${item.id}" data-type="favorite">
            <i class="fas fa-times"></i>
          </button>
        </div>
      `;
    });

    favoritesGrid.innerHTML = favoritesHTML;

    // Xử lý sự kiện xóa phim khỏi danh sách yêu thích
    setupRemoveButtons("favorite");
  }

  /**
   * Thiết lập các nút xóa phim
   * @param {string} type - Loại danh sách ("history" hoặc "favorite")
   */
  function setupRemoveButtons(type) {
    const removeButtons = document.querySelectorAll(
      `.remove-btn[data-type="${type}"]`
    );

    removeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const movieId = this.getAttribute("data-id");

        if (type === "history") {
          // Xóa khỏi lịch sử
          if (
            window.removeFromHistory &&
            window.removeFromHistory(username, movieId)
          ) {
            // Tải lại lịch sử
            loadHistory();
            // Cập nhật số liệu thống kê
            updateStatCounts();
          }
        } else if (type === "favorite") {
          // Xóa khỏi danh sách yêu thích
          if (window.toggleFavorite) {
            // Hàm toggleFavorite sẽ xóa nếu đã yêu thích
            const movieInfo = {}; // Không cần thông tin chi tiết để xóa
            window.toggleFavorite(username, movieId, movieInfo);

            // Tải lại danh sách yêu thích
            loadFavorites();
            // Cập nhật số liệu thống kê
            updateStatCounts();
          }
        }
      });
    });
  }

  /**
   * Hiển thị thông báo lỗi
   * @param {string} elementId - ID của phần tử hiển thị lỗi
   * @param {string} message - Nội dung thông báo lỗi
   */
  function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.classList.add("visible");
  }

  /**
   * Ẩn thông báo lỗi
   * @param {string} elementId - ID của phần tử hiển thị lỗi
   */
  function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = "";
    errorElement.classList.remove("visible");
  }

  /**
   * Kiểm tra email hợp lệ
   * @param {string} email - Email cần kiểm tra
   * @returns {boolean} Kết quả kiểm tra
   */
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});
