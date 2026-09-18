# AI Self-Review — Module Lấy ý kiến (Mobile App)

> Review nội bộ theo Bước 3.5 (`references/review-rules.md`), thực hiện ngay sau khi viết SRS lần đầu.

## 1. Bảng tổng hợp vấn đề

| STT | Mục SRS | Vấn đề tóm tắt | Mức độ | Góc nhìn | Gợi ý sửa ngắn | Trạng thái |
|-----|---------|----------------|--------|----------|----------------|------------|
| 1 | Chức năng 1 & 4 — bảng field tìm kiếm | Ô tìm kiếm/combobox tiêu chí không nêu rõ cách so khớp (gần đúng/tuyệt đối) cho từng tiêu chí | 🟠 Major | Dev | Bổ sung BR-03 định nghĩa cách so khớp theo từng tiêu chí | ✅ Đã sửa |
| 2 | Chức năng 4 — bảng field danh sách | Danh sách "Văn bản cần cho ý kiến" thiếu nút 3 chấm (Đánh dấu/Lịch sử xử lý) trong khi danh sách 1 đã có | 🟡 Minor | BA | Bổ sung dòng "Nút 3 chấm" cho nhất quán với danh sách 1 | ✅ Đã sửa |
| 3 | Toàn tài liệu — Push Notification | Chưa mô tả việc tôn trọng cấu hình bật/tắt nhận thông báo cá nhân trước khi gửi Push Notification xin/cho ý kiến | 💡 Suggestion | Dev | Bổ sung điều kiện: chỉ gửi cho người đang bật cấu hình "Nhận thông báo văn bản" ở Thông tin cá nhân | ✅ Đã sửa (BR-05 Chức năng 2, BR-03 Chức năng 5, bảng Thông báo hệ thống, sequence diagram) |

## 2. Điểm mạnh của tài liệu

- Luồng thành công của Chức năng 2 (Lấy ý kiến) và Chức năng 5 (Cho ý kiến) đánh số bước khớp hoàn toàn với sequence diagram Mermaid tương ứng, dễ đối chiếu khi implement.
- Business rule tách bạch rõ điều kiện hiển thị nút theo từng vai trò (BR-01, BR-03, BR-04 ở Chức năng 2) — tránh nhầm lẫn giữa Người xin ý kiến và Người được xin ý kiến khi cùng xem 1 màn hình.
- Bảng field 5 cột dùng dòng header nhóm rõ ràng cho từng màn hình/popup (Lấy ý kiến, Gia hạn, Xem chi tiết ý kiến, Chọn người xin ý kiến, Cho ý kiến), không trộn lẫn ràng buộc giữa các màn hình khác nhau.
- Đã tách đúng Chức năng 3 (Xuất báo cáo) thành chức năng riêng thay vì gộp vào Chức năng 2, vì output khác nhau (file Word vs màn hình) — đúng nguyên tắc tách chức năng của `writing-rules.md` Rule B.

## 3. Đánh giá tổng thể

**Quality Gate:**

| Tiêu chí | Trọng số | Điểm (0–10) | Điểm có trọng số |
|---|---|---|---|
| Tính đầy đủ (Completeness) | 50% | 8.5 | 4.25 |
| Tính rõ ràng (Clarity) | 20% | 9.0 | 1.80 |
| Tính nhất quán (Consistency) | 20% | 9.0 | 1.80 |
| Đúng định dạng (Formatting) | 10% | 9.5 | 0.95 |
| **Tổng điểm** | **100%** | | **8.8/10** |

**Trạng thái phê duyệt:** ✅ **Approved** — không còn Critical/Major issue sau khi sửa; tổng điểm ≥ 7.0.

**Ghi chú:** Toàn bộ 3 vấn đề (2 Major/Minor + 1 Suggestion) đã được xử lý trực tiếp trong SRS.

## 4. Addendum — cập nhật theo mockup mobile thực tế

Sau lần review đầu, user cung cấp bộ 9 ảnh mockup mobile thực tế (`C:\Users\USA\OneDrive\Documents\TQG_Lay y kien`). Đã đối chiếu và điều chỉnh SRS cho khớp:

- Danh sách/xem nhanh văn bản: đổi mô tả "combobox trạng thái" → đúng UI thật là tab bar; bảng field chỉ còn phần bổ sung (tab, badge, nút mới) — không lặp lại field vốn có của màn hình danh sách/xem nhanh văn bản đi hiện hành.
- Màn hình Lấy ý kiến → đổi tên chính xác theo tiêu đề thật "XIN Ý KIẾN"; khối tổng hợp ý kiến là danh sách thẻ (không phải bảng); popup Chọn người xin ý kiến/Chi tiết cho ý kiến thực chất là màn hình riêng (không phải overlay popup), có thêm combobox Chọn đơn vị.
- Gia hạn hạn xử lý: sửa kiểu control từ DatePicker → DateTimePicker (mockup có giờ:phút).
- Cho ý kiến: sửa giới hạn ký tự nội dung từ 2000 → 1000 theo đúng mockup; nội dung xử lý đổi từ "không bắt buộc" (theo web) → "bắt buộc" (theo mockup mobile có dấu `*`) — divergence có chủ đích so với web, đã ghi nhận rõ trong tài liệu; bổ sung 2 icon Lịch sử/Xóa cạnh tệp đính kèm (trước đó chỉ có Ký số).
- Đã chèn 9 ảnh mockup thật vào `images/` và nhúng link đúng vị trí từng chức năng.

Các thay đổi trên là làm khớp đặc tả với UI thực tế đã build, không phát sinh vấn đề mới ở mức Critical/Major — điểm và trạng thái phê duyệt giữ nguyên như Mục 3.

## 5. Addendum 2 — bổ sung chức năng Tìm kiếm nhanh (Chức năng 1 & 4)

Theo yêu cầu user: 2 màn hình danh sách chỉ dùng bộ lọc nhanh (không có tìm kiếm nâng cao — icon lọc nâng cao sẽ được bỏ khỏi UI), tìm theo Số ký hiệu HOẶC Trích yếu chứa từ khóa. Đã bổ sung:
- Field "Ô tìm kiếm nhanh" vào bảng field của cả 2 danh sách.
- Bước 3 trong Luồng thành công của Chức năng 1 & 4, mô tả rõ cơ chế so khớp.
- BR-04 (mỗi chức năng) định nghĩa Trigger → Logic → Output cho tìm kiếm.
- EX-02 (mỗi chức năng): tìm kiếm không có kết quả → "Không có dữ liệu" (đồng thời bỏ bullet trùng lặp cũ ở Edge cases).

Không phát sinh vấn đề Critical/Major mới.
