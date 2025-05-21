/**
 * Quản lý mã nhúng video
 * File này chứa các hàm để xử lý mã nhúng video cho HoatHinH3D
 */

// Dữ liệu lưu trữ cục bộ để theo dõi mã nhúng đã thêm
let lastAddedEmbeds = [];

/**
 * Trích xuất thông tin từ mã nhúng
 * @param {string} embedCode - Mã nhúng video (iframe hoặc URL)
 * @returns {object} - Thông tin video
 */
function extractEmbedInfo(embedCode) {
  // Loại bỏ khoảng trắng thừa
  const code = embedCode.trim();

  // Đối tượng lưu thông tin
  const info = {
    type: "unknown",
    videoId: null,
    videoUrl: null,
    embedCode: code,
    platform: "unknown",
  };

  // Xác định loại embed và nền tảng
  if (code.includes("iframe") && code.includes("src=")) {
    info.type = "iframe";

    // Trích xuất URL từ src
    const srcMatch = code.match(/src=["']([^"']+)["']/);
    if (srcMatch && srcMatch[1]) {
      info.videoUrl = srcMatch[1];
    }
  } else if (code.startsWith("http")) {
    info.type = "url";
    info.videoUrl = code;
  }

  // Xác định nền tảng video và ID
  if (info.videoUrl) {
    // Dailymotion
    if (
      info.videoUrl.includes("dailymotion.com") ||
      info.videoUrl.includes("dai.ly")
    ) {
      info.platform = "dailymotion";

      // Trích xuất ID video từ URL Dailymotion
      const patterns = [
        /dailymotion.com\/embed\/video\/([a-zA-Z0-9]+)/,
        /dailymotion.com\/video\/([a-zA-Z0-9]+)/,
        /dai.ly\/([a-zA-Z0-9]+)/,
        /video=([a-zA-Z0-9]+)/,
      ];

      for (const pattern of patterns) {
        const match = info.videoUrl.match(pattern);
        if (match && match[1]) {
          info.videoId = match[1];
          break;
        }
      }
    }
    // YouTube
    else if (
      info.videoUrl.includes("youtube.com") ||
      info.videoUrl.includes("youtu.be")
    ) {
      info.platform = "youtube";

      // Trích xuất ID video từ URL YouTube
      const patterns = [
        /youtube.com\/embed\/([a-zA-Z0-9_-]+)/,
        /youtube.com\/watch\?v=([a-zA-Z0-9_-]+)/,
        /youtu.be\/([a-zA-Z0-9_-]+)/,
      ];

      for (const pattern of patterns) {
        const match = info.videoUrl.match(pattern);
        if (match && match[1]) {
          info.videoId = match[1];
          break;
        }
      }
    }
    // Facebook
    else if (
      info.videoUrl.includes("facebook.com") ||
      info.videoUrl.includes("fb.watch")
    ) {
      info.platform = "facebook";

      // Trích xuất ID video từ URL Facebook
      const patterns = [
        /facebook.com\/([^/]+)\/videos\/([0-9]+)/,
        /facebook.com\/watch\/\?v=([0-9]+)/,
        /fb.watch\/([a-zA-Z0-9_-]+)/,
      ];

      for (const pattern of patterns) {
        const match = info.videoUrl.match(pattern);
        if (match) {
          info.videoId = match[match.length - 1]; // Lấy nhóm cuối cùng
          break;
        }
      }
    }
    // Các nền tảng khác
    else {
      info.platform = "other";
    }
  }

  return info;
}

/**
 * Chuẩn hóa mã nhúng để đảm bảo định dạng thống nhất
 * @param {string} embedCode - Mã nhúng video ban đầu
 * @returns {string} - Mã nhúng đã được chuẩn hóa
 */
function normalizeEmbedCode(embedCode) {
  const info = extractEmbedInfo(embedCode);

  // Nếu là URL mà không phải iframe, chuyển thành iframe
  if (info.type === "url" && info.videoUrl) {
    // Dailymotion
    if (info.platform === "dailymotion" && info.videoId) {
      return `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/${info.videoId}" allowfullscreen allow="autoplay"></iframe>`;
    }
    // YouTube
    else if (info.platform === "youtube" && info.videoId) {
      return `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${info.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }
    // Facebook
    else if (info.platform === "facebook" && info.videoId) {
      return `<iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fwatch%2F%3Fv%3D${info.videoId}&show_text=0" width="100%" height="100%" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true"></iframe>`;
    }
  }

  // Nếu đã là iframe và có thông tin hợp lệ, điều chỉnh kích thước
  if (info.type === "iframe") {
    // Thay thế kích thước cố định bằng kích thước tương đối
    return embedCode
      .replace(/width="[^"]*"/g, 'width="100%"')
      .replace(/height="[^"]*"/g, 'height="100%"')
      .replace(/width='[^']*'/g, "width='100%'")
      .replace(/height='[^']*'/g, "height='100%'");
  }

  // Trả về mã nhúng gốc nếu không xử lý được
  return embedCode;
}

/**
 * Thêm video mới vào dữ liệu
 * @param {string} seriesId - ID của series phim
 * @param {number|string} episode - Số tập hoặc tên tập
 * @param {string} embedCode - Mã nhúng video
 * @returns {object} - Kết quả thêm video
 */
function addVideo(seriesId, episode, embedCode) {
  try {
    if (!seriesId || !episode || !embedCode) {
      return {
        success: false,
        message: "Vui lòng nhập đầy đủ thông tin series, tập và mã nhúng",
      };
    }

    // Chuẩn hóa ID series
    seriesId = seriesId.toLowerCase().replace(/[^a-z0-9-]/g, "-");

    // Chuẩn hóa mã nhúng
    const normalizedEmbed = normalizeEmbedCode(embedCode);

    // Xử lý số tập
    let episodeKey = episode;
    if (!isNaN(episode)) {
      // Nếu là số, thêm tiền tố "ep"
      episodeKey = `ep${episode}`;
    } else if (!episode.startsWith("ep")) {
      // Nếu là chuỗi nhưng không bắt đầu bằng "ep", thêm vào
      episodeKey = `ep${episode}`;
    }

    // Kiểm tra xem biến videoData đã tồn tại chưa
    if (typeof videoData === "undefined") {
      console.error("Biến videoData chưa được khởi tạo");
      return {
        success: false,
        message: "Lỗi: Không tìm thấy dữ liệu video của trang web",
      };
    }

    // Tạo series mới nếu chưa tồn tại
    if (!videoData[seriesId]) {
      videoData[seriesId] = {};
    }

    // Lấy thông tin từ mã nhúng
    const embedInfo = extractEmbedInfo(normalizedEmbed);
    const videoUrl = embedInfo.videoUrl || normalizedEmbed;

    // Thêm video vào dữ liệu
    videoData[seriesId][episodeKey] = {
      title: `Tập ${episode}`,
      videoUrl: videoUrl,
      embedCode: normalizedEmbed,
    };

    // Lưu vào lịch sử thêm gần đây
    lastAddedEmbeds.unshift({
      seriesId,
      episodeKey,
      title: `Tập ${episode}`,
      videoUrl,
      embedCode: normalizedEmbed,
      timestamp: new Date().toISOString(),
    });

    // Giới hạn lịch sử thêm gần đây
    if (lastAddedEmbeds.length > 10) {
      lastAddedEmbeds = lastAddedEmbeds.slice(0, 10);
    }

    // Lưu vào localStorage để khôi phục khi tải lại trang
    try {
      localStorage.setItem("lastAddedEmbeds", JSON.stringify(lastAddedEmbeds));
    } catch (e) {
      console.warn("Không thể lưu lịch sử vào localStorage:", e);
    }

    // Cập nhật dữ liệu vào localStorage
    saveVideoData();

    return {
      success: true,
      message: `Đã thêm Tập ${episode} vào series "${seriesId}"`,
      data: {
        seriesId,
        episodeKey,
        videoUrl,
        embedCode: normalizedEmbed,
      },
    };
  } catch (error) {
    console.error("Lỗi khi thêm video:", error);
    return {
      success: false,
      message: `Lỗi: ${error.message || "Không thể thêm video"}`,
    };
  }
}

/**
 * Lưu dữ liệu video vào localStorage để khôi phục khi cần
 */
function saveVideoData() {
  try {
    // Chỉ lưu một phần dữ liệu để tránh vượt quá giới hạn localStorage
    const simplifiedData = {};

    // Chỉ lưu 5 series gần đây nhất
    const recentSeries = lastAddedEmbeds
      .map((item) => item.seriesId)
      .filter((value, index, self) => self.indexOf(value) === index)
      .slice(0, 5);

    recentSeries.forEach((seriesId) => {
      if (videoData[seriesId]) {
        simplifiedData[seriesId] = videoData[seriesId];
      }
    });

    localStorage.setItem("videoDataBackup", JSON.stringify(simplifiedData));
    console.log("Đã lưu dữ liệu video vào localStorage");

    return true;
  } catch (error) {
    console.error("Lỗi khi lưu dữ liệu vào localStorage:", error);
    return false;
  }
}

/**
 * Khôi phục lịch sử thêm gần đây từ localStorage
 */
function restoreFromLocalStorage() {
  try {
    // Khôi phục lịch sử thêm gần đây
    const savedEmbeds = localStorage.getItem("lastAddedEmbeds");
    if (savedEmbeds) {
      lastAddedEmbeds = JSON.parse(savedEmbeds);
    }

    // Khôi phục dữ liệu video nếu cần thiết
    const savedData = localStorage.getItem("videoDataBackup");
    if (savedData && typeof videoData !== "undefined") {
      const parsedData = JSON.parse(savedData);

      // Cập nhật videoData với dữ liệu từ localStorage
      Object.keys(parsedData).forEach((seriesId) => {
        if (!videoData[seriesId]) {
          videoData[seriesId] = {};
        }

        Object.keys(parsedData[seriesId]).forEach((episodeKey) => {
          videoData[seriesId][episodeKey] = parsedData[seriesId][episodeKey];
        });
      });

      console.log("Đã khôi phục dữ liệu video từ localStorage");
    }

    return true;
  } catch (error) {
    console.error("Lỗi khi khôi phục dữ liệu từ localStorage:", error);
    return false;
  }
}

/**
 * Xuất dữ liệu video thành file JS
 * @returns {string} - Nội dung file JS
 */
function exportVideoDataJS() {
  try {
    let content = "// Dữ liệu video cho các bộ phim\n";
    content +=
      "const videoData = " + JSON.stringify(videoData, null, 2) + ";\n\n";

    // Thêm hàm cập nhật
    content += `
/**
 * Cập nhật dữ liệu video
 * @param {string} seriesId - ID của series phim
 * @param {string} episodeKey - Khóa của tập phim (ví dụ: ep1, ep2)
 * @param {string} title - Tiêu đề của tập phim
 * @param {string} videoUrl - URL của video
 */
function updateVideoData(seriesId, episodeKey, title, videoUrl) {
  // Tạo series mới nếu chưa tồn tại
  if (!videoData[seriesId]) {
    videoData[seriesId] = {};
  }
  
  // Cập nhật hoặc thêm mới tập phim
  videoData[seriesId][episodeKey] = {
    title: title,
    videoUrl: videoUrl
  };
  
  console.log(\`Đã cập nhật video: \${seriesId} - \${episodeKey}\`);
}
`;

    return content;
  } catch (error) {
    console.error("Lỗi khi xuất dữ liệu:", error);
    return null;
  }
}

/**
 * Tạo file tải xuống từ dữ liệu
 * @param {string} content - Nội dung file
 * @param {string} filename - Tên file
 */
function downloadFile(content, filename) {
  const blob = new Blob([content], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// Khởi tạo lịch sử từ localStorage khi tải trang
document.addEventListener("DOMContentLoaded", function () {
  restoreFromLocalStorage();
});

// Xuất các hàm để sử dụng trong các file khác
const EmbedManager = {
  addVideo,
  extractEmbedInfo,
  normalizeEmbedCode,
  saveVideoData,
  exportVideoDataJS,
  downloadFile,
  getLastAddedEmbeds: () => lastAddedEmbeds,
};

// Gán vào window để có thể truy cập từ các file HTML
if (typeof window !== "undefined") {
  window.EmbedManager = EmbedManager;
}
