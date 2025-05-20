# HoatHinh3D - Trang web xem phim hoạt hình Trung Quốc

Đây là mã nguồn cho trang web HoatHinh3D - nơi xem phim hoạt hình Trung Quốc (donghua) chất lượng cao. Trang web được thiết kế với giao diện hiện đại, thân thiện với người dùng và dễ dàng mở rộng.

## Tính năng

- Thiết kế đáp ứng, tương thích với các thiết bị di động
- Danh sách phim với bộ lọc và chức năng tìm kiếm
- Trang chi tiết phim với thông tin và danh sách tập
- Trình phát video được tích hợp
- Các tập phim có thể tự động chuyển tiếp
- Đề xuất phim liên quan

## Cấu trúc thư mục

```
├── index.html              # Trang chủ
├── movie-detail.html       # Trang chi tiết phim
├── movies.html             # Trang danh sách phim
├── search.html             # Trang kết quả tìm kiếm
├── css/
│   ├── style.css           # Stylesheet chính
│   └── movie-detail.css    # Stylesheet cho trang chi tiết phim
├── js/
│   ├── movies-data.js      # Dữ liệu phim
│   ├── video-data.js       # Dữ liệu tập phim
│   └── script.js           # Mã JavaScript chính
└── README.md               # Tài liệu hướng dẫn
```

## Hướng dẫn thêm phim mới

### Bước 1: Thêm dữ liệu phim vào movies-data.js

Mở file `js/movies-data.js` và thêm một đối tượng phim mới vào biến `movieData`. Bạn có thể sao chép mẫu có sẵn và điều chỉnh thông tin:

```javascript
"ten-phim-khong-dau": {
  id: "ten-phim-khong-dau", // ID phải trùng với key, không dấu, không khoảng trắng
  title: "Tên Phim",        // Tên phim hiển thị bằng tiếng Việt
  originalTitle: "Original Name", // Tên gốc của phim (tiếng Trung, tiếng Anh...)
  year: "2023",             // Năm phát hành
  description: "Mô tả chi tiết về nội dung phim...", // Mô tả phim
  genre: ["Thể loại 1", "Thể loại 2"], // Danh sách thể loại
  episodes: 12,             // Số tập
  status: "Đang cập nhật",  // Trạng thái: "Đang cập nhật" hoặc "Hoàn thành"
  rating: "9.0",            // Đánh giá (thang điểm 10)
  type: "series",           // Loại: "series" hoặc "movie"
  poster: "URL-hinh-poster", // URL hình ảnh poster (tỷ lệ 2:3)
  backdrop: "URL-hinh-nen"   // URL hình ảnh nền (tỷ lệ 16:9)
}
```

Lưu ý:

- `id` phải là duy nhất và không chứa dấu, khoảng trắng hoặc ký tự đặc biệt
- URL poster nên có tỷ lệ 2:3 (ví dụ: 300x450 pixels)
- URL backdrop nên có tỷ lệ 16:9 (ví dụ: 1920x1080 pixels)
- Bạn có thể sử dụng [imgur.com](https://imgur.com/) để lưu trữ hình ảnh

### Bước 2: Thêm dữ liệu video vào video-data.js

Mở file `js/video-data.js` và thêm thông tin các tập phim tương ứng với ID phim đã tạo:

```javascript
"ten-phim-khong-dau": {
  "ep1": {
    title: "Tập 1",
    videoUrl: "https://www.example.com/embed/video1"
  },
  "ep2": {
    title: "Tập 2",
    videoUrl: "https://www.example.com/embed/video2"
  },
  // Thêm các tập khác...
}
```

Lưu ý:

- Key của đối tượng phải trùng với `id` phim đã thêm trong `movies-data.js`
- `videoUrl` là đường dẫn nhúng (embed URL) của video từ các nền tảng như Dailymotion, YouTube, hoặc các trang khác
- Đối với Dailymotion, định dạng URL nhúng là: `https://www.dailymotion.com/embed/video/VIDEO_ID`

### Bước 3: Kiểm tra

Sau khi thêm dữ liệu, hãy truy cập trang web và kiểm tra:

1. Phim mới có xuất hiện trong danh sách phim không
2. Trang chi tiết phim hiển thị đúng thông tin không
3. Các tập phim có thể phát được không

## Tùy chỉnh giao diện

### Thay đổi màu sắc chủ đạo

Để thay đổi màu sắc chủ đạo của trang web, mở file `css/style.css` và chỉnh sửa các biến CSS trong phần `:root`:

```css
:root {
  --primary-color: #ff6b00; /* Màu chủ đạo */
  --primary-hover: #ff8c38; /* Màu khi hover */
  /* Các biến màu khác... */
}
```

### Thay đổi logo và tiêu đề

Để thay đổi logo và tiêu đề trang web, chỉnh sửa phần sau trong các file HTML:

```html
<div class="logo">
  <a href="index.html">HoatHinh<span>3D</span></a>
</div>
```

### Thêm thể loại phim mới

Để thêm thể loại phim mới, hãy cập nhật danh sách trong dropdown menu ở tất cả các file HTML:

```html
<div class="dropdown-menu">
  <a href="#">Thể Loại Mới</a>
  <!-- Các thể loại khác -->
</div>
```

Đồng thời cập nhật danh sách trong bộ lọc ở file `movies.html`:

```html
<select id="genre-filter">
  <option value="all">Tất cả thể loại</option>
  <option value="the-loai-moi">Thể Loại Mới</option>
  <!-- Các thể loại khác -->
</select>
```

## Hỗ trợ và đóng góp

Nếu bạn gặp vấn đề hoặc có đề xuất cải tiến, vui lòng tạo issue hoặc liên hệ với chúng tôi qua email.

## Giấy phép

Dự án này được phân phối dưới Giấy phép MIT. Xem file `LICENSE` để biết thêm chi tiết.
