# Review snapshot — Gợi ý nơi nhận cho văn bản đến (v0.2, review lần 2)

> Context: SRS HNI (phần Tham mưu/Duyệt hàng loạt), Figma `ioffice_v5`, và các chốt nghiệp vụ của BA sau lần review 1. Chưa đối chiếu SRS gốc của màn hình (BA tự trỏ `based_on`).

## 0. Bài toán nghiệp vụ

- Mục tiêu: người xử lý văn bản đến của UBND (Hưng Yên) bớt thao tác chọn nơi nhận, duyệt hàng loạt theo gợi ý.
- Actor: người dùng có quyền (XLC), job quét, dịch vụ AI, người nhận.
- Kích hoạt → kết quả: văn bản đến mới / bấm nút gợi ý → gợi ý CĐ/CT/PH/Xem → Duyệt chuyển thẳng 1 lần.
- Ràng buộc: phân loại Trung ương / Nội tỉnh theo mã liên thông, dữ liệu văn bản đi của UBND, API AI chưa có tài liệu.

## 1. Bảng tổng hợp vấn đề

| STT | Mục SRS | Vấn đề tóm tắt | Mức độ | Góc nhìn | Gợi ý sửa ngắn |
|-----|---------|----------------|--------|----------|----------------|
| 1 | FC-001 Đặc tả tích hợp API AI | Endpoint, xác thực, field request/response đều `[CẦN XÁC NHẬN]` | 🟠 Major | Dev | Xin tài liệu API AI, điền 2 bảng mapping |
| 2 | FC-001 BR-07, BR-08; FC-002 BR-01 | Văn bản mật không gửi AI, bắt buộc có CT, ghi đè gợi ý cũ là giả định của tác giả | 🟡 Minor | BA | Xác nhận với KH |
| 3 | Toàn tài liệu | Tên quyền, tham số, thông báo, chu kỳ job, giới hạn 20/50/120s đều `[GIẢ ĐỊNH]` | 🟡 Minor | Dev | Dev/KH xác nhận 1 lần |
| 4 | FC-001 BR-06 | Đơn vị có nhiều Trưởng đơn vị → gợi ý tất cả vào Xem là giả định | 🟡 Minor | BA | Xác nhận với KH |
| 5 | FC-004 | Chưa xử lý người nhận đang vắng mặt/ủy quyền | 🟡 Minor | Luồng | Xác nhận có cần xử lý ngoài luồng chuyển xử lý hiện có không |

Đã đóng từ lần 1: chuyển thẳng 1 lần khi Duyệt; phân loại Trung ương/Nội tỉnh (BR-03); khớp văn bản đi theo `doc_id` (BR-04); Trưởng đơn vị theo vai trò cố định (BR-06). Đã sửa thuật ngữ "Hưng Yên" còn sót ở Bước 2, BR-04, sơ đồ, nghiệm thu cho khớp "Nội tỉnh".

## 2. Phân tích chi tiết (Major)

#### #1 🟠 Tích hợp API AI chưa đặc tả — FC-001
**Vì sao phải sửa:** Dev không implement được Bước 4 và QA không viết được test cho nhánh AI.
**Sửa thế nào:**
- Lấy tài liệu API AI, điền endpoint, xác thực, tên field vào bảng Mapping Request và Mapping Response.
- Chốt AI có tự tra danh bạ hay hệ thống phải gửi danh sách người/đơn vị sang `[Cần xác nhận với KH]`.

## 3. Đề xuất tối ưu

**3a. Luồng:** phù hợp bài toán (rule rẻ trước, AI sau, người duyệt cuối).

| # | Hiện trạng | Đề xuất | Lợi ích | Đánh đổi | Nhãn |
|---|-----------|---------|---------|----------|------|
| 1 | Duyệt không sửa được gợi ý (BR-05 FC-004) | Cho sửa nhanh người nhận ngay trong cột gợi ý trước khi Duyệt | Bớt chuyển sang màn xử lý từng văn bản khi gợi ý gần đúng | Thêm UI và effort | `[Cần xác nhận với KH]` |
| 2 | Chỉ gợi ý CT/Xem theo văn bản đi | Thêm PH từ đơn vị phối hợp của văn bản đi | Gợi ý đầy đủ hơn | Cần dữ liệu văn bản đi | `[Cần xác nhận với KH]` |

**3b. Bố cục:** thứ tự FC theo vòng đời (quét → thủ công → xem → duyệt). Có thể đổi FC-003 lên trước FC-002 cho đúng trình tự người dùng thấy.

**3c. Trùng lặp:** không phát hiện mô tả trùng lặp lệch nhau.

**3d. Văn phong:** gọn; nhãn `[GIẢ ĐỊNH]` còn dày ở FC-004 và bảng giao diện, nên gom khi KH chốt.

## 4. Điểm mạnh

- Phân tách rõ quy tắc (FC-001) và hiển thị (FC-003).
- Quy tắc phân loại đơn vị và người nhận đã bám đúng nghiệp vụ BA cung cấp.
- Có Phụ lục dữ liệu lưu trữ và tham số cấu hình.
- Mọi điểm chưa chắc đều gắn nhãn `[GIẢ ĐỊNH]` / `[CẦN XÁC NHẬN]`.
- Có xử lý tranh chấp (job và thủ công, 2 người cùng Duyệt).

## 5. Đánh giá tổng thể

| Tiêu chí | Trọng số | Điểm | Có trọng số |
|---|---|---|---|
| Completeness | 40% | 7.5 | 3.00 |
| Clarity | 15% | 8.5 | 1.28 |
| Consistency | 15% | 9.0 | 1.35 |
| Flow Design | 15% | 8.0 | 1.20 |
| Structure | 10% | 8.5 | 0.85 |
| Formatting | 5% | 9.0 | 0.45 |
| **Tổng** | 100% | | **8.1/10** |

(Lần 1: 7.6/10.)

**Trạng thái:** ⚠️ Conditional Approval (còn 1 Major, không có Critical; điểm ≥ 7.0 nhưng chưa đủ điều kiện Approved vì còn Major).

**Điều kiện để approve:** có tài liệu API AI và điền xong 2 bảng mapping ở FC-001.

## 6. Checklist sẵn sàng phát triển

- [ ] ID duy nhất, truy vết: ✅
- [ ] Acceptance criteria đo được: ⚠️ giá trị job/giới hạn là `[GIẢ ĐỊNH]`
- [ ] NFR có số: ⚠️ giá trị là `[GIẢ ĐỊNH]`
- [ ] Trường lưu trữ mô tả đủ: ✅ (Phụ lục)
- [ ] API tích hợp (Consume) mô tả đủ: ❌ xem #1
- [ ] Luồng lỗi, edge case: ✅
- [ ] Phân quyền: ⚠️ tên quyền là `[GIẢ ĐỊNH]`
- [ ] Sign-off stakeholder: ❌ chưa
