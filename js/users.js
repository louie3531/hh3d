/**
 * Quản lý người dùng cho MovieStream
 */

// Khởi tạo dữ liệu người dùng mặc định
let userData = {
  admin: {
    username: "admin",
    password: "admin123", // Trong thực tế nên mã hóa mật khẩu
    role: "admin",
    displayName: "Quản trị viên",
    email: "admin@moviestream.com",
    createdAt: new Date().toISOString(),
  },
};

// Người dùng hiện tại
let currentUser = null;

/**
 * Khởi tạo dữ liệu người dùng từ localStorage
 */
function initUserData() {
  try {
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      userData = JSON.parse(savedUserData);
      console.log("Đã tải dữ liệu người dùng từ localStorage");
    } else {
      // Lưu dữ liệu người dùng mặc định vào localStorage
      localStorage.setItem("userData", JSON.stringify(userData));
      console.log("Đã khởi tạo dữ liệu người dùng mặc định");
    }

    // Kiểm tra phiên đăng nhập
    checkLoginSession();
  } catch (e) {
    console.error("Lỗi khi khởi tạo dữ liệu người dùng:", e);
  }
}

/**
 * Đăng nhập người dùng
 * @param {string} username - Tên đăng nhập
 * @param {string} password - Mật khẩu
 * @returns {boolean} Kết quả đăng nhập
 */
function loginUser(username, password) {
  if (!username || !password) return false;

  const user = userData[username];
  if (user && user.password === password) {
    // Lưu thông tin đăng nhập vào session
    currentUser = {
      username: user.username,
      role: user.role,
      displayName: user.displayName,
      profilePicture: user.profilePicture || null,
      email: user.email,
    };

    // Lưu phiên đăng nhập vào localStorage
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("loginTime", new Date().getTime());

    console.log("Đăng nhập thành công:", username);
    return true;
  }

  console.log("Đăng nhập thất bại:", username);
  return false;
}

/**
 * Đăng xuất người dùng
 */
function logoutUser() {
  currentUser = null;
  localStorage.removeItem("currentUser");
  localStorage.removeItem("loginTime");
  console.log("Đã đăng xuất");

  // Chuyển hướng về trang đăng nhập
  window.location.href = "login.html";
}

/**
 * Kiểm tra phiên đăng nhập
 * @returns {boolean} Trạng thái đăng nhập
 */
function checkLoginSession() {
  try {
    const savedUser = localStorage.getItem("currentUser");
    const loginTime = localStorage.getItem("loginTime");

    if (savedUser && loginTime) {
      // Kiểm tra thời gian đăng nhập (hết hạn sau 24 giờ)
      const now = new Date().getTime();
      const expireTime = parseInt(loginTime) + 24 * 60 * 60 * 1000;

      if (now < expireTime) {
        currentUser = JSON.parse(savedUser);
        console.log("Phiên đăng nhập hợp lệ:", currentUser.username);
        return true;
      } else {
        // Phiên đăng nhập đã hết hạn
        localStorage.removeItem("currentUser");
        localStorage.removeItem("loginTime");
        console.log("Phiên đăng nhập đã hết hạn");
      }
    }
  } catch (e) {
    console.error("Lỗi khi kiểm tra phiên đăng nhập:", e);
  }

  return false;
}

/**
 * Kiểm tra quyền admin
 * @returns {boolean} Có phải admin không
 */
function isAdmin() {
  return currentUser && currentUser.role === "admin";
}

/**
 * Thêm người dùng mới
 * @param {object} user - Thông tin người dùng
 * @returns {boolean} Kết quả thêm người dùng
 */
function addUser(user) {
  if (!user.username || !user.password || userData[user.username]) {
    return false;
  }

  // Thêm thông tin mặc định
  user.createdAt = new Date().toISOString();
  user.role = user.role || "user";

  // Thêm người dùng vào userData
  userData[user.username] = user;

  // Lưu vào localStorage
  try {
    localStorage.setItem("userData", JSON.stringify(userData));
    console.log("Đã thêm người dùng mới:", user.username);
    return true;
  } catch (e) {
    console.error("Lỗi khi lưu dữ liệu người dùng:", e);
    return false;
  }
}

/**
 * Cập nhật thông tin người dùng
 * @param {string} username - Tên đăng nhập
 * @param {object} userInfo - Thông tin cần cập nhật
 * @returns {boolean} Kết quả cập nhật
 */
function updateUser(username, userInfo) {
  if (!username || !userData[username]) {
    return false;
  }

  // Cập nhật thông tin người dùng
  Object.assign(userData[username], userInfo);

  // Lưu vào localStorage
  try {
    localStorage.setItem("userData", JSON.stringify(userData));
    console.log("Đã cập nhật thông tin người dùng:", username);

    // Nếu đang cập nhật người dùng hiện tại, cập nhật thông tin phiên đăng nhập
    if (currentUser && currentUser.username === username) {
      currentUser.displayName = userData[username].displayName;
      currentUser.role = userData[username].role;

      // Cập nhật ảnh đại diện nếu có
      if (userInfo.profilePicture) {
        currentUser.profilePicture = userInfo.profilePicture;
      }

      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }

    return true;
  } catch (e) {
    console.error("Lỗi khi lưu dữ liệu người dùng:", e);
    return false;
  }
}

/**
 * Xóa người dùng
 * @param {string} username - Tên đăng nhập
 * @returns {boolean} Kết quả xóa
 */
function deleteUser(username) {
  if (!username || !userData[username] || username === "admin") {
    return false;
  }

  // Xóa người dùng
  delete userData[username];

  // Lưu vào localStorage
  try {
    localStorage.setItem("userData", JSON.stringify(userData));
    console.log("Đã xóa người dùng:", username);
    return true;
  } catch (e) {
    console.error("Lỗi khi lưu dữ liệu người dùng:", e);
    return false;
  }
}

/**
 * Lấy danh sách người dùng
 * @returns {Array} Danh sách người dùng
 */
function getUsers() {
  return Object.values(userData);
}

/**
 * Lấy thông tin người dùng hiện tại
 * @returns {object|null} Thông tin người dùng
 */
function getCurrentUser() {
  return currentUser;
}

// Khởi tạo dữ liệu người dùng khi tải trang
document.addEventListener("DOMContentLoaded", initUserData);

// Đặt các hàm vào window để có thể gọi từ các file khác
window.loginUser = loginUser;
window.logoutUser = logoutUser;
window.isAdmin = isAdmin;
window.getCurrentUser = getCurrentUser;
window.addUser = addUser;
window.updateUser = updateUser;
window.deleteUser = deleteUser;
window.getUsers = getUsers;
window.checkLoginSession = checkLoginSession;

/**
 * Cập nhật ảnh đại diện của người dùng
 * @param {string} username - Tên đăng nhập
 * @param {string} profilePicture - URL hoặc data URL của ảnh đại diện
 * @returns {boolean} Kết quả cập nhật
 */
function updateProfilePicture(username, profilePicture) {
  return updateUser(username, { profilePicture });
}

/**
 * Cập nhật tên hiển thị của người dùng
 * @param {string} username - Tên đăng nhập
 * @param {string} displayName - Tên hiển thị mới
 * @returns {boolean} Kết quả cập nhật
 */
function updateDisplayName(username, displayName) {
  return updateUser(username, { displayName });
}

/**
 * Cập nhật email của người dùng
 * @param {string} username - Tên đăng nhập
 * @param {string} email - Email mới
 * @returns {boolean} Kết quả cập nhật
 */
function updateEmail(username, email) {
  return updateUser(username, { email });
}

/**
 * Cập nhật mật khẩu của người dùng
 * @param {string} username - Tên đăng nhập
 * @param {string} currentPassword - Mật khẩu hiện tại
 * @param {string} newPassword - Mật khẩu mới
 * @returns {boolean} Kết quả cập nhật
 */
function updatePassword(username, currentPassword, newPassword) {
  // Kiểm tra mật khẩu hiện tại
  if (!userData[username] || userData[username].password !== currentPassword) {
    console.log("Mật khẩu hiện tại không đúng");
    return false;
  }

  return updateUser(username, { password: newPassword });
}

/**
 * Lấy thông tin đầy đủ của người dùng hiện tại
 * @returns {object|null} Thông tin đầy đủ của người dùng
 */
function getFullUserData(username) {
  return userData[username] || null;
}

window.updateProfilePicture = updateProfilePicture;
window.updateDisplayName = updateDisplayName;
window.updateEmail = updateEmail;
window.updatePassword = updatePassword;
window.getFullUserData = getFullUserData;
