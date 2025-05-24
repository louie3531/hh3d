/**
 * Quản lý lịch sử xem và phim yêu thích cho MovieStream
 */

// Phim yêu thích - Giữ danh sách phim yêu thích cho mỗi người dùng
const FAVORITES_KEY = "userFavorites";
// Lịch sử xem - Giữ danh sách phim đã xem và thời gian xem
const HISTORY_KEY = "userHistory";
// Số lượng tối đa mục lưu trong lịch sử
const MAX_HISTORY_ITEMS = 50;

/**
 * Khởi tạo dữ liệu người dùng
 * @returns {Object} Dữ liệu người dùng hiện tại
 */
function initUserData() {
  // Tạo dữ liệu trống nếu chưa có
  if (!localStorage.getItem(FAVORITES_KEY)) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify({}));
  }

  if (!localStorage.getItem(HISTORY_KEY)) {
    localStorage.setItem(HISTORY_KEY, JSON.stringify({}));
  }

  return {
    favorites: JSON.parse(localStorage.getItem(FAVORITES_KEY)),
    history: JSON.parse(localStorage.getItem(HISTORY_KEY)),
  };
}

/**
 * Thêm hoặc xóa phim khỏi danh sách yêu thích
 * @param {string} userId - ID người dùng
 * @param {string} movieId - ID của phim
 * @param {Object} movieData - Thông tin cơ bản về phim (tên, poster, v.v.)
 * @returns {boolean} true nếu phim được thêm, false nếu phim bị xóa
 */
function toggleFavorite(userId, movieId, movieData) {
  try {
    // Lấy dữ liệu hiện tại
    const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || {};

    // Tạo danh sách cho người dùng nếu chưa có
    if (!favorites[userId]) {
      favorites[userId] = {};
    }

    // Kiểm tra xem phim đã có trong danh sách yêu thích chưa
    const isAdded = !favorites[userId][movieId];

    if (isAdded) {
      // Thêm phim vào danh sách yêu thích với thông tin cơ bản
      favorites[userId][movieId] = {
        id: movieId,
        title: movieData.title,
        poster: movieData.poster,
        year: movieData.year,
        addedAt: new Date().toISOString(),
      };
    } else {
      // Xóa phim khỏi danh sách yêu thích
      delete favorites[userId][movieId];
    }

    // Lưu lại vào localStorage
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));

    return isAdded;
  } catch (error) {
    console.error("Lỗi khi cập nhật danh sách yêu thích:", error);
    return false;
  }
}

/**
 * Kiểm tra xem phim có trong danh sách yêu thích không
 * @param {string} userId - ID người dùng
 * @param {string} movieId - ID của phim
 * @returns {boolean} true nếu phim đã nằm trong danh sách yêu thích
 */
function isFavorite(userId, movieId) {
  try {
    const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || {};
    return Boolean(favorites[userId] && favorites[userId][movieId]);
  } catch (error) {
    console.error("Lỗi khi kiểm tra phim yêu thích:", error);
    return false;
  }
}

/**
 * Lấy danh sách phim yêu thích của người dùng
 * @param {string} userId - ID người dùng
 * @returns {Array} Danh sách phim yêu thích
 */
function getFavorites(userId) {
  try {
    const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || {};

    if (!favorites[userId]) {
      return [];
    }

    // Chuyển đổi từ object sang array và sắp xếp theo thời gian thêm vào (mới nhất trước)
    return Object.values(favorites[userId]).sort(
      (a, b) => new Date(b.addedAt) - new Date(a.addedAt)
    );
  } catch (error) {
    console.error("Lỗi khi lấy danh sách phim yêu thích:", error);
    return [];
  }
}

/**
 * Thêm phim vào lịch sử xem
 * @param {string} userId - ID người dùng
 * @param {string} movieId - ID của phim
 * @param {Object} movieData - Thông tin cơ bản về phim
 * @param {string} episodeId - ID của tập phim (nếu có)
 */
function addToHistory(userId, movieId, movieData, episodeId = null) {
  try {
    // Lấy dữ liệu lịch sử hiện tại
    const history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || {};

    // Tạo danh sách cho người dùng nếu chưa có
    if (!history[userId]) {
      history[userId] = [];
    }

    // Tìm mục trong lịch sử nếu đã có
    const existingIndex = history[userId].findIndex(
      (item) => item.id === movieId
    );

    // Thông tin về phim để lưu vào lịch sử
    const historyItem = {
      id: movieId,
      title: movieData.title,
      poster: movieData.poster,
      year: movieData.year,
      lastWatched: new Date().toISOString(),
      episodeId: episodeId,
    };

    if (existingIndex !== -1) {
      // Nếu phim đã có trong lịch sử, cập nhật thông tin và đưa lên đầu
      history[userId].splice(existingIndex, 1);
    }

    // Thêm vào đầu danh sách
    history[userId].unshift(historyItem);

    // Giới hạn số lượng mục trong lịch sử
    if (history[userId].length > MAX_HISTORY_ITEMS) {
      history[userId] = history[userId].slice(0, MAX_HISTORY_ITEMS);
    }

    // Lưu lại vào localStorage
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error("Lỗi khi cập nhật lịch sử xem:", error);
  }
}

/**
 * Lấy lịch sử xem của người dùng
 * @param {string} userId - ID người dùng
 * @param {number} limit - Số lượng mục tối đa trả về (mặc định là tất cả)
 * @returns {Array} Danh sách phim đã xem
 */
function getHistory(userId, limit = null) {
  try {
    const history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || {};

    if (!history[userId]) {
      return [];
    }

    // Trả về số lượng mục yêu cầu hoặc toàn bộ
    return limit ? history[userId].slice(0, limit) : history[userId];
  } catch (error) {
    console.error("Lỗi khi lấy lịch sử xem:", error);
    return [];
  }
}

/**
 * Xóa một mục khỏi lịch sử xem
 * @param {string} userId - ID người dùng
 * @param {string} movieId - ID của phim cần xóa
 * @returns {boolean} true nếu xóa thành công
 */
function removeFromHistory(userId, movieId) {
  try {
    const history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || {};

    if (!history[userId]) {
      return false;
    }

    // Tìm vị trí của phim trong lịch sử
    const index = history[userId].findIndex((item) => item.id === movieId);

    if (index === -1) {
      return false;
    }

    // Xóa phim khỏi lịch sử
    history[userId].splice(index, 1);

    // Lưu lại vào localStorage
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));

    return true;
  } catch (error) {
    console.error("Lỗi khi xóa phim khỏi lịch sử:", error);
    return false;
  }
}

/**
 * Xóa toàn bộ lịch sử xem của người dùng
 * @param {string} userId - ID người dùng
 * @returns {boolean} true nếu xóa thành công
 */
function clearHistory(userId) {
  try {
    const history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || {};

    if (history[userId]) {
      history[userId] = [];
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    }

    return true;
  } catch (error) {
    console.error("Lỗi khi xóa lịch sử xem:", error);
    return false;
  }
}

// Khởi tạo dữ liệu khi tải trang
document.addEventListener("DOMContentLoaded", initUserData);

// Gán các hàm vào window để có thể gọi từ các tập tin khác
window.toggleFavorite = toggleFavorite;
window.isFavorite = isFavorite;
window.getFavorites = getFavorites;
window.addToHistory = addToHistory;
window.getHistory = getHistory;
window.removeFromHistory = removeFromHistory;
window.clearHistory = clearHistory;
