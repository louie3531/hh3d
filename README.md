# HoatHinH3D - Quản lý Video Đơn Giản

Hệ thống quản lý phim hoạt hình 3D đơn giản - Hỗ trợ thêm video bằng mã nhúng và tự động cập nhật vào trang web chính.

## Tính năng chính

1. **Thêm video bằng mã nhúng**: Dễ dàng thêm phim bằng cách dán mã nhúng (iframe) hoặc URL video từ các nền tảng phổ biến như Dailymotion, YouTube, Facebook.
2. **Tự động chuẩn hóa mã nhúng**: Tự động chuẩn hóa các URL thành mã nhúng iframe hoàn chỉnh, đảm bảo phát video mượt mà.
3. **Quản lý series phim**: Phân loại video theo series phim, dễ dàng thêm series mới.
4. **Xuất dữ liệu JS**: Tự động xuất file JavaScript cập nhật cho trang web chính.
5. **Lưu lịch sử thêm video**: Theo dõi video đã thêm gần đây, dễ dàng kiểm tra.

## Hướng dẫn sử dụng

### 1. Thêm video mới

1. Mở trang **admin.html**
2. Chọn series phim từ danh sách hoặc thêm series mới
3. Nhập số tập của video
4. Dán mã nhúng (iframe) hoặc URL video từ Dailymotion, YouTube, Facebook,...
5. Nhấn "Xem trước" để kiểm tra video
6. Nhấn "Lưu phim" để thêm video vào cơ sở dữ liệu

### 2. Cập nhật trang web chính

1. Sau khi thêm video, nhấn "Xuất File JS"
2. Tải xuống file video-data.js đã được cập nhật
3. Thay thế file video-data.js hiện tại trên máy chủ web
4. Trang web chính sẽ hiển thị video mới đã thêm

## Hỗ trợ các nền tảng video

Hệ thống hỗ trợ các nền tảng video phổ biến:

- **Dailymotion**: Hỗ trợ URL dạng dailymotion.com/video/x... hoặc mã nhúng iframe
- **YouTube**: Hỗ trợ URL dạng youtube.com/watch?v=... hoặc youtu.be/... hoặc mã nhúng iframe
- **Facebook**: Hỗ trợ URL video Facebook hoặc mã nhúng iframe
- **Các nền tảng khác**: Hỗ trợ bất kỳ mã nhúng iframe nào

## Cách thêm series mới

1. Trong trang admin, chọn "+ Thêm series mới" từ menu thả xuống
2. Nhập tên series mới (hệ thống sẽ tự động chuyển đổi thành dạng URL: không dấu, thay khoảng trắng bằng dấu gạch ngang)
3. Điền thông tin video như bình thường và lưu

## Lưu ý quan trọng

- Đảm bảo mã nhúng video hoạt động chính xác trước khi lưu
- Sử dụng "Xem trước" để kiểm tra trước khi lưu
- Luôn xuất và cập nhật file video-data.js sau khi thêm video
- Nên sử dụng máy chủ web (như Live Server, XAMPP) thay vì mở file trực tiếp để tránh lỗi CORS

## Cấu trúc dữ liệu

Dữ liệu video được lưu trong cấu trúc sau trong file `video-data.js`:

```javascript
const videoData = {
  "ten-series": {
    ep1: {
      title: "Tập 1",
      videoUrl: "URL của video",
    },
    ep2: {
      title: "Tập 2",
      videoUrl: "URL của video",
    },
    // Thêm các tập khác...
  },
  // Thêm các series khác...
};
```

## Sao lưu dữ liệu

Hệ thống tự động lưu dữ liệu vào localStorage của trình duyệt, giúp phục hồi thông tin khi cần. Tuy nhiên, nên thường xuyên xuất file video-data.js và lưu trữ an toàn.

## Yêu cầu hệ thống

- Trình duyệt hiện đại (Chrome, Firefox, Edge, Safari)
- Kết nối internet để xem trước video
- Máy chủ web (để tránh lỗi CORS khi tải dữ liệu)

## Câu hỏi thường gặp

### Video không hiển thị khi xem trước?

- Kiểm tra mã nhúng hoặc URL có chính xác không
- Đảm bảo định dạng URL phù hợp với nền tảng (Dailymotion, YouTube, v.v.)
- Một số video có thể bị hạn chế nhúng, hãy thử video khác

### Làm thế nào để chỉnh sửa video đã thêm?

- Thêm lại video với cùng series và số tập sẽ ghi đè dữ liệu cũ

### Trang web không hiển thị video mới sau khi cập nhật?

- Đảm bảo đã cập nhật đúng file video-data.js trên máy chủ
- Xóa cache trình duyệt và tải lại trang
