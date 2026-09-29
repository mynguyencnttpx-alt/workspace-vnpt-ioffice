# Review snapshot — don-doc-cong-viec-web (SRS v0.1, 2026-09-26)

## 1. Bảng tổng hợp vấn đề

| STT | Mục SRS | Vấn đề tóm tắt | Mức độ | Góc nhìn | Gợi ý sửa ngắn |
|---|---|---|---|---|---|
| 1 | Edge cases | Chưa chốt: người được chuyển tiếp có nhận đôn đốc của dòng gốc không; người mới thay Trưởng đơn vị có thấy đôn đốc cũ không; có giới hạn số lần đôn đốc không | 🟡 Minor | BA | Chốt với khách hàng |
| 2 | Thông báo | Mã sự kiện và nội dung thông báo đôn đốc chưa có trong Phụ lục cấu hình thông báo QLCV: [CẦN XÁC NHẬN] | 🟡 Minor | BA/Dev | Bổ sung mã EVT vào Phụ lục |
| 3 | BR-04, BR-11 | Trạng thái đã đọc tính riêng từng người và đánh dấu cả dòng khi mở màn xem: [GIẢ ĐỊNH] | 🟡 Minor | BA/QA | Xác nhận |
| 4 | Wording | Các thông báo lỗi (file quá số lượng, đơn vị chưa có người tiếp nhận, quyền truy cập) là [GIẢ ĐỊNH] | 🟡 Minor | QA | Khách hàng duyệt wording |
| 5 | Yêu cầu giao diện | Chưa có ảnh mockup (Web) | 🟡 Minor | Dev/QA | Bổ sung ảnh vào images/ |
| 6 | Điều kiện nghiệm thu | Nội dung mẫu: [CẦN XÁC NHẬN] | 💡 Suggestion | BA | Xác nhận theo hợp đồng |

Đã xử lý so với bản gốc (mục II.2.1.9.7): đôn đốc theo dòng nhận việc; xóa đôn đốc khi xóa dòng, giữ log; người nhận đơn vị theo nguyên tắc nhận việc; điểm vào xem lịch sử; phân quyền; kênh gửi tất cả; định nghĩa file; điều kiện hiển thị nút theo bảng nút chức năng; đánh số EX/BR liên tục, bỏ nhãn phiên bản, bỏ chi tiết SQL.

## 2. Quality Gate

| Tiêu chí | Trọng số | Điểm | Có trọng số |
|---|---|---|---|
| Completeness | 50% | 8.0 | 4.0 |
| Clarity | 20% | 8.5 | 1.7 |
| Consistency | 20% | 8.5 | 1.7 |
| Formatting | 10% | 9.0 | 0.9 |
| **Tổng** | | | **8.3/10** |

Trạng thái: ✅ Approved (không có Critical/Major, ≥ 7.0).
