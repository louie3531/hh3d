// Dữ liệu video cho các bộ phim
const videoData = {
  // Video cho Tiên Ngịch
  "tien-ngich": {
    ep80: {
      title: "Tập 80",
      videoUrl: "https://geo.dailymotion.com/player.html?video=x9g6qlm",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://geo.dailymotion.com/player.html?video=x9g6qlm" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep81: {
      title: "Tập 81",
      videoUrl: "https://geo.dailymotion.com/player.html?video=x9gmhnm",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://geo.dailymotion.com/player.html?video=x9gmhnm" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep82: {
      title: "Tập 82",
      videoUrl: "https://geo.dailymotion.com/player.html?video=x9h167o",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://geo.dailymotion.com/player.html?video=x9h167o" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep83: {
      title: "Tập 83",
      videoUrl: "https://geo.dailymotion.com/player.html?video=x9hg2o8",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://geo.dailymotion.com/player.html?video=x9hg2o8" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep84: {
      title: "Tập 84",
      videoUrl: "https://geo.dailymotion.com/player.html?video=x9htw2o",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://geo.dailymotion.com/player.html?video=x9htw2o" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep85: {
      title: "Tập 85",
      videoUrl: "https://geo.dailymotion.com/player.html?video=x9i7jbe",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://geo.dailymotion.com/player.html?video=x9i7jbe" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep86: {
      title: "Tập 86",
      videoUrl: "https://geo.dailymotion.com/player.html?video=x9ilbso",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://geo.dailymotion.com/player.html?video=x9ilbso" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep87: {
      title: "Tập 87",
      videoUrl: "https://geo.dailymotion.com/player.html?video=x9iyhzi",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://geo.dailymotion.com/player.html?video=x9iyhzi" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep88: {
      title: "Tập 88",
      videoUrl: "https://geo.dailymotion.com/player.html?video=x9jbiba",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://geo.dailymotion.com/player.html?video=x9jbiba" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep89: {
      title: "Tập 89",
      videoUrl: "https://geo.dailymotion.com/player.html?video=x9jqkh0",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://geo.dailymotion.com/player.html?video=x9jqkh0" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
  },

  // Video cho Đấu Phá Thương Khung
  "dau-pha-thuong-khung": {
    ep140: {
      title: "Tập 140",
      videoUrl: "https://www.dailymotion.com/embed/video/x9gztvu",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9gztvu" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep141: {
      title: "Tập 141",
      videoUrl: "https://www.dailymotion.com/embed/video/x9he6x4",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9he6x4" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep142: {
      title: "Tập 142",
      videoUrl: "https://www.dailymotion.com/embed/video/x9hsgcm",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9hsgcm" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep143: {
      title: "Tập 143",
      videoUrl: "https://www.dailymotion.com/embed/video/x9i6v58",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9i6v58" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep144: {
      title: "Tập 144",
      videoUrl: "https://www.dailymotion.com/embed/video/x9ijd6c",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9ijd6c" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep145: {
      title: "Tập 145",
      videoUrl: "https://www.dailymotion.com/embed/video/x9ix0b8",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9ix0b8" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep146: {
      title: "Tập 146",
      videoUrl: "https://www.dailymotion.com/embed/video/x9j9s8w",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9j9s8w" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep147: {
      title: "Tập 147",
      videoUrl: "",
    },
  },

  // Video cho Thế Giới Hoàn Mỹ
  "the-gioi-hoan-my": {
    ep1: {
      title: "Tập 1",
      videoUrl: "https://www.dailymotion.com/embed/video/example1",
    },
    ep2: {
      title: "Tập 2",
      videoUrl: "https://www.dailymotion.com/embed/video/example2",
    },
    ep3: {
      title: "Tập 3",
      videoUrl: "https://www.dailymotion.com/embed/video/example3",
    },
  },

  // Video cho Phàm Nhân Tu Tiên
  "pham-nhan-tu-tien": {
    // Các tập đầu đã được xóa theo yêu cầu
    ep130: {
      title: "Tập 130",
      videoUrl: "https://www.dailymotion.com/embed/video/x9eede4",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9eede4" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep131: {
      title: "Tập 131",
      videoUrl: "https://www.dailymotion.com/embed/video/x9evo5g",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9evo5g" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep132: {
      title: "Tập 132",
      videoUrl: "https://www.dailymotion.com/embed/video/x9fecxg",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9fecxg" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep133: {
      title: "Tập 133",
      videoUrl: "https://www.dailymotion.com/embed/video/x9frlfm",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9frlfm" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep134: {
      title: "Tập 134",
      videoUrl: "https://www.dailymotion.com/embed/video/x9g4raq",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9g4raq" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep135: {
      title: "Tập 135",
      videoUrl: "https://www.dailymotion.com/embed/video/x9gkh8q",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9gkh8q" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep136: {
      title: "Tập 136",
      videoUrl: "https://www.dailymotion.com/embed/video/x9gz88c",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9gz88c" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep137: {
      title: "Tập 137",
      videoUrl: "https://www.dailymotion.com/embed/video/x9he6ka",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9he6ka" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep138: {
      title: "Tập 138",
      videoUrl: "https://www.dailymotion.com/embed/video/x9hrrs6",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9hrrs6" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep139: {
      title: "Tập 139",
      videoUrl: "https://www.dailymotion.com/embed/video/x9i6uzw",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9i6uzw" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep140: {
      title: "Tập 140",
      videoUrl: "https://www.dailymotion.com/embed/video/x9iiwwy",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9iiwwy" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep141: {
      title: "Tập 141",
      videoUrl: "https://www.dailymotion.com/embed/video/x9iwms2",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9iwms2" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep142: {
      title: "Tập 142",
      videoUrl: "https://www.dailymotion.com/embed/video/x9j9dfi",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9j9dfi" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep143: {
      title: "Tập 143",
      videoUrl: "https://www.dailymotion.com/embed/video/x9jnsq2",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9jnsq2" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
  },

  // Video cho Già Thiên
  "gia-thien": {
    ep1: {
      title: "Tập 1",
      videoUrl: "https://www.dailymotion.com/embed/video/example7",
    },
    ep2: {
      title: "Tập 2",
      videoUrl: "https://www.dailymotion.com/embed/video/example8",
    },
  },

  // Video cho Thôn Phệ Tinh Không
  "thon-phe-tinh-khong": {
    ep160: {
      title: "Tập 160",
      videoUrl: "https://www.dailymotion.com/embed/video/x9f3cx0",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9f3cx0" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep161: {
      title: "Tập 161",
      videoUrl: "https://www.dailymotion.com/embed/video/x9fibdw",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9fibdw" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep162: {
      title: "Tập 162",
      videoUrl: "https://www.dailymotion.com/embed/video/x9fvmeo",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9fvmeo" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep163: {
      title: "Tập 163",
      videoUrl: "https://www.dailymotion.com/embed/video/x9g8v1s",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9g8v1s" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep164: {
      title: "Tập 164",
      videoUrl: "https://www.dailymotion.com/embed/video/x9goq82",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9goq82" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep165: {
      title: "Tập 165",
      videoUrl: "https://www.dailymotion.com/embed/video/x9h2shy",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9h2shy" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep166: {
      title: "Tập 166",
      videoUrl: "https://www.dailymotion.com/embed/video/x9hh9lk",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9hh9lk" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep167: {
      title: "Tập 167",
      videoUrl: "https://www.dailymotion.com/embed/video/x9hvm5o",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9hvm5o" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep168: {
      title: "Tập 168",
      videoUrl: "https://www.dailymotion.com/embed/video/x9i96uw",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9i96uw" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep169: {
      title: "Tập 169",
      videoUrl: "https://www.dailymotion.com/embed/video/x9imv2e",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9imv2e" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep170: {
      title: "Tập 170",
      videoUrl: "https://www.dailymotion.com/embed/video/x9j08cg",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9j08cg" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep171: {
      title: "Tập 171",
      videoUrl: "https://www.dailymotion.com/embed/video/x9jdzcq",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9jdzcq" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
    ep172: {
      title: "Tập 172",
      videoUrl: "https://www.dailymotion.com/embed/video/x9jrmv6",
      embedCode: `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/x9jrmv6" allowfullscreen allow="autoplay" style="position:absolute;left:0;top:0;"></iframe>`,
    },
  },

  // Video cho Kiếm Lai
  "kiem-lai": {
    ep1: {
      title: "Tập 1",
      videoUrl: "https://www.dailymotion.com/embed/video/example11",
    },
    ep2: {
      title: "Tập 2",
      videoUrl: "https://www.dailymotion.com/embed/video/example12",
    },
  },

  // Mẫu dữ liệu, hãy thay thế khi thêm phim mới
  "mau-phim": {
    ep1: {
      title: "Tập 1",
      videoUrl: "https://www.example.com/embed/video1",
    },
    ep2: {
      title: "Tập 2",
      videoUrl: "https://www.example.com/embed/video2",
    },
  },

  // Thêm dữ liệu video cho các phim khác ở đây
};

// Export videoData nếu đang trong môi trường Node.js
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = videoData;
}

/**
 * Cập nhật dữ liệu video
 * @param {string} seriesId - ID của series phim
 * @param {string} episodeKey - Khóa của tập phim (ví dụ: ep1, ep2)
 * @param {string} title - Tiêu đề của tập phim
 * @param {string} videoUrl - URL của video
 * @param {string} embedCode - Mã nhúng video (nếu có)
 */
function updateVideoData(seriesId, episodeKey, title, videoUrl, embedCode) {
  // Tạo series mới nếu chưa tồn tại
  if (!videoData[seriesId]) {
    videoData[seriesId] = {};
  }

  // Cập nhật hoặc thêm mới tập phim
  videoData[seriesId][episodeKey] = {
    title: title,
    videoUrl: videoUrl,
  };

  // Thêm mã nhúng nếu có
  if (embedCode) {
    videoData[seriesId][episodeKey].embedCode = embedCode;
  }

  // Lưu vào localStorage
  try {
    localStorage.setItem("videoData", JSON.stringify(videoData));
  } catch (e) {
    console.error("Không thể lưu vào localStorage:", e);
  }

  console.log(`Đã cập nhật video: ${seriesId} - ${episodeKey}`);
}
