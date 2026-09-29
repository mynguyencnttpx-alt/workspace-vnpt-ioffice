# Review snapshot — xoa-thong-tin-nhan-viec-mobile (SRS v0.1, 2026-09-26)

## 1. Bảng tổng hợp vấn đề

| STT | Mục SRS | Vấn đề tóm tắt | Mức độ | Góc nhìn | Gợi ý sửa ngắn |
|---|---|---|---|---|---|
| 1 | Edge cases | Xóa thẻ đơn vị: công việc con do người thuộc đơn vị tạo có bị hủy không — chưa chốt (còn mở từ bản web) | 🟡 Minor | BA | Chốt cùng lúc với bản web |
| 2 | M-BR-10 | Công việc con "Đã hủy" có ẩn khỏi tab "DS công việc con" hay không: [GIẢ ĐỊNH] (đã chốt số N giảm) | 🟡 Minor | BA/QA | Xác nhận với khách hàng |
| 3 | M-EX-01, M-EX-06, toast | Wording cảnh báo/toast và ngưỡng timeout 10 giây là [GIẢ ĐỊNH] | 🟡 Minor | QA | Khách hàng duyệt wording |
| 4 | Edge cases | Wording khi người bị xóa đang mở màn hình công việc: [CẦN XÁC NHẬN] | 🟡 Minor | QA | Chốt wording |
| 5 | Yêu cầu giao diện | Mockup là dạng khung nổi từ dưới lên (có thanh kéo), trong khi trao đổi gọi là "dialog giống web"; đã mô tả theo mockup | 💡 Suggestion | Dev | Xác nhận đúng dạng khung nổi |
| 6 | Điều kiện nghiệm thu | Nội dung mẫu, [CẦN XÁC NHẬN] | 💡 Suggestion | BA | Xác nhận theo hợp đồng |

## 2. Quality Gate

| Tiêu chí | Trọng số | Điểm | Có trọng số |
|---|---|---|---|
| Completeness | 50% | 8.5 | 4.25 |
| Clarity | 20% | 8.5 | 1.7 |
| Consistency | 20% | 8.5 | 1.7 |
| Formatting | 10% | 9.0 | 0.9 |
| **Tổng** | | | **8.55 ≈ 8.6/10** |

Trạng thái: ✅ Approved (không có Critical/Major, ≥ 7.0).

Đã đối chiếu: bản web `docs/xoa-thong-tin-nhan-viec-web/SRS.md` (v1.0, bản người dùng cập nhật), SRS app (Box Phân công thực hiện, menu ba chấm, tiền tố M-BR/M-EX, tab "DS công việc con (N)"). Chưa có mockup của menu ba chấm/thẻ nhận việc — chỉ có mockup popup xác nhận.
