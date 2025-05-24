<?php
/**
 * Script xử lý upload ảnh đại diện người dùng
 */

// Thư mục lưu ảnh
$target_dir = "media/user-avatars/";

// Đảm bảo thư mục tồn tại
if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}

// Khởi tạo response
$response = array(
    'success' => false,
    'message' => '',
    'file_url' => ''
);

// Kiểm tra request method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response['message'] = 'Phương thức không được hỗ trợ';
    echo json_encode($response);
    exit;
}

// Kiểm tra có file được gửi lên không
if (!isset($_FILES['avatar']) || $_FILES['avatar']['error'] != UPLOAD_ERR_OK) {
    $response['message'] = 'Không có file hoặc file bị lỗi';
    echo json_encode($response);
    exit;
}

// Giới hạn kích thước file (2MB)
$max_size = 2 * 1024 * 1024; // 2MB
if ($_FILES['avatar']['size'] > $max_size) {
    $response['message'] = 'Kích thước file không được vượt quá 2MB';
    echo json_encode($response);
    exit;
}

// Kiểm tra loại file
$allowed_types = array('image/jpeg', 'image/png', 'image/gif', 'image/webp');
$file_info = new finfo(FILEINFO_MIME_TYPE);
$file_type = $file_info->file($_FILES['avatar']['tmp_name']);

if (!in_array($file_type, $allowed_types)) {
    $response['message'] = 'Chỉ chấp nhận file ảnh (JPEG, PNG, GIF, WEBP)';
    echo json_encode($response);
    exit;
}

// Tạo tên file ngẫu nhiên để tránh trùng lặp
$file_name = uniqid() . '_' . basename($_FILES['avatar']['name']);
$target_file = $target_dir . $file_name;

// Di chuyển file tải lên vào thư mục đích
if (move_uploaded_file($_FILES['avatar']['tmp_name'], $target_file)) {
    $response['success'] = true;
    $response['message'] = 'Tải lên thành công';
    $response['file_url'] = $target_file;
    echo json_encode($response);
} else {
    $response['message'] = 'Có lỗi xảy ra khi tải lên file';
    echo json_encode($response);
} 