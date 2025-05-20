// Dữ liệu video cho các bộ phim
const videoData = {
  // Video cho Tiên Ngịch
  "tien-ngich": {
    ep80: {
      title: "Tập 80",
      videoUrl: "https://geo.dailymotion.com/player.html?video=x9g6qlm",
    },
    ep81: {
      title: "Tập 81",
      videoUrl: "https://geo.dailymotion.com/player.html?video=x9gmhnm",
    },
    ep82: {
      title: "Tập 82",
      videoUrl: "https://geo.dailymotion.com/player.html?video=x9h167o",
    },
    ep83: {
      title: "Tập 83",
      videoUrl: "https://geo.dailymotion.com/player.html?video=x9hg2o8",
    },
    ep84: {
      title: "Tập 84",
      videoUrl: "https://geo.dailymotion.com/player.html?video=x9htw2o",
    },
    ep85: {
      title: "Tập 85",
      videoUrl: "https://geo.dailymotion.com/player.html?video=x9i7jbe",
    },
    ep86: {
      title: "Tập 86",
      videoUrl: "https://geo.dailymotion.com/player.html?video=x9ilbso",
    },
    ep87: {
      title: "Tập 87",
      videoUrl: "https://geo.dailymotion.com/player.html?video=x9iyhzi",
    },
    ep88: {
      title: "Tập 88",
      videoUrl: "https://geo.dailymotion.com/player.html?video=x9jbiba",
    },
    ep89: {
      title: "Tập 89",
      videoUrl: "https://geo.dailymotion.com/player.html?video=x9jqkh0",
    },
  },

  // Video cho Đấu Phá Thương Khung
  "dau-pha-thuong-khung": {
    ep1: {
      title: "Tập 1",
      videoUrl: "https://www.dailymotion.com/embed/video/x88lh17",
    },
    ep2: {
      title: "Tập 2",
      videoUrl: "https://www.dailymotion.com/embed/video/x88lh2s",
    },
    ep3: {
      title: "Tập 3",
      videoUrl: "https://www.dailymotion.com/embed/video/x88lh4b",
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
    ep1: {
      title: "Tập 1",
      videoUrl: "https://www.dailymotion.com/embed/video/example4",
    },
    ep2: {
      title: "Tập 2",
      videoUrl: "https://www.dailymotion.com/embed/video/example5",
    },
    ep3: {
      title: "Tập 3",
      videoUrl: "https://www.dailymotion.com/embed/video/example6",
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
    ep1: {
      title: "Tập 1",
      videoUrl: "https://www.dailymotion.com/embed/video/example9",
    },
    ep2: {
      title: "Tập 2",
      videoUrl: "https://www.dailymotion.com/embed/video/example10",
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

// Nếu bạn muốn xuất dữ liệu video trong môi trường module
if (typeof module !== "undefined") {
  module.exports = { videoData };
}
