# Review SRS — Bộ API chuẩn cung cấp dữ liệu văn bản cho hệ thống tích hợp

> Tự review (Bước 3.5, Gate 3) · 26/10/2026 · Tài liệu: [SRS.md](../api-tich-hop-van-ban/SRS.md) v0.1 · Nguồn đối chiếu: [catalog v0.6.0](../api-tich-hop-van-ban/api-tich-hop-van-ban-catalog.md)

## 1. Bảng tổng hợp vấn đề

| STT | Mục SRS | Vấn đề tóm tắt | Mức độ | Góc nhìn | Gợi ý sửa ngắn |
|-----|---------|----------------|--------|----------|----------------|
| 1 | FC-007 BR-02 / EX-05 | Mâu thuẫn: BR-02 trả danh sách rỗng khi tiêu chí ngoài giá trị cố định của hồ sơ, EX-05 trả `FORBIDDEN_SCOPE` | 🟠 Major | Dev | **Đã sửa** trong vòng review: thống nhất trả 403 `FORBIDDEN_SCOPE` |
| 2 | YC-08 NFR-06, NFR-11 | Chưa có con số ngưỡng lượt gọi và thời gian phản hồi | 🟠 Major | Dev / QA | Nhóm phát triển đo tải, chốt con số trước khi viết test hiệu năng |
| 3 | YC-04, Phụ lục A, cột Mapping | Mapping mới ở mức nguồn nghiệp vụ, chưa có tên bảng / cột CSDL | 🟠 Major | Dev | Dev bổ sung bảng.cột khi thiết kế; BA rà lại nghĩa nghiệp vụ |
| 4 | FC-007 BR-04, FC-012 BR-03 | Khoảng ngày mặc định khi không truyền là giả định | 🟡 Minor | BA | Xác nhận với PO: mặc định theo khoảng tối đa hồ sơ hay bắt buộc truyền |
| 5 | FC-001 | Có `refresh_token` nhưng chưa đặc tả cách dùng; chưa có quy tắc khóa tạm khi sai nhiều lần | 🟡 Minor | Dev / QA | Chốt bỏ `refresh_token` hoặc bổ sung luồng xin lại token; chốt ngưỡng khóa tạm |
| 6 | Phạm vi | Quản trị hồ sơ tích hợp ngoài phạm vi nhưng mọi API phụ thuộc dữ liệu hồ sơ | 🟡 Minor | BA | Lập SRS riêng cho quản trị hồ sơ trước hoặc song song khi phát triển |
| 7 | FC-008, FC-010, FC-011 Edge cases | Chưa có giới hạn dung lượng response khi bật Base64 và dung lượng tải file | 🟡 Minor | Dev / QA | Chốt ngưỡng dung lượng + hành vi khi vượt |
| 8 | FC-005 Bảng Response | Bảng 5 cột (thêm cột Nhóm), khác khung 4 cột của template | 🟡 Minor | — | Giữ, đã ghi chú lý do ngay dưới bảng |
| 9 | Module 2 | Danh mục chỉ cho chế độ `DON_VI`; ứng dụng chế độ `CA_NHAN` cần mã lĩnh vực / hình thức để lọc sẽ phải có thêm token `DON_VI` | 💡 Suggestion | BA | Cân nhắc cho phép `CA_NHAN` gọi FC-006 |
| 10 | Phụ lục D | 12 điểm cần xác nhận | 💡 Suggestion | BA | Lên lịch chốt với PO / dev trước khi duyệt bản 1.0 |

## 2. Phân tích chi tiết (Critical / Major)

**Vấn đề 1 — Đã sửa**
- **Vấn đề:** FC-007 BR-02 ghi "Tiêu chí gửi lên mâu thuẫn với giá trị cố định → trả `data = []`, không báo lỗi", trong khi EX-05 và bảng lỗi ghi loại văn bản ngoài hồ sơ → `FORBIDDEN_SCOPE`.
- **Vị trí:** FC-007 ③ BR-02, ② EX-05, Bảng Response lỗi.
- **Rủi ro nếu không sửa:** 2 dev hiểu 2 cách, hệ thống tích hợp không phân biệt được "không có dữ liệu" với "không được phép".
- **Đã sửa:** BR-02 → "giá trị nằm ngoài giá trị cố định → 403 `FORBIDDEN_SCOPE` (EX-05)"; EX-05 và bảng lỗi bổ sung "trạng thái ngoài giá trị cố định".

**Vấn đề 2**
- **Vấn đề:** NFR-06 "[CẦN XÁC NHẬN — nhóm phát triển đề xuất sau khi đo tải]", NFR-11 "đề xuất ≤ 3 giây" chưa chốt.
- **Vị trí:** YC-08.
- **Rủi ro nếu không sửa:** không viết được test hiệu năng, không cấu hình được `RATE_LIMITED`.
- **Đề xuất sửa:** "NFR-06: mặc định {N} lượt / phút / hồ sơ"; "NFR-11: ≤ {T} giây ở mức {C} yêu cầu đồng thời, 1 trang 100 bản ghi không kèm nội dung file".

**Vấn đề 3**
- **Vấn đề:** Cột "Mapping với hệ thống" ghi "Form thông tin văn bản — Số ký hiệu", chưa có bảng.cột.
- **Vị trí:** YC-04, mọi bảng Request / Response, Phụ lục A.
- **Rủi ro nếu không sửa:** dev tự chọn nguồn dữ liệu, dễ lấy sai trường khi 1 khái niệm có nhiều nơi lưu (vd người ký ở form văn bản và ở chữ ký số).
- **Đề xuất sửa:** dev bổ sung cột CSDL trong Phụ lục A; BA duyệt lại nghĩa nghiệp vụ từng dòng.

## 3. Điểm mạnh của tài liệu

- Phần dùng chung viết 1 lần (YC-01 → YC-10) — kiểm tra chung KT-01 → KT-07, mã lỗi, nhật ký — các chức năng chỉ tham chiếu, không lặp.
- Phạm vi dữ liệu toàn agent / 1 đơn vị con / đơn vị độc lập / phòng ban có quy tắc cụ thể, kiểm thử được (YC-03), khớp catalog D18 → D20.
- Mỗi API có đủ bảng Request (vị trí, kiểu so khớp), Response thành công, Response lỗi theo HTTP status, và mỗi lỗi có EX tương ứng.
- API thống kê FC-012 có bảng chỉ tiêu với công thức và điều kiện lọc.
- Nhật ký YC-09 loại rõ thông tin nhạy cảm (mật khẩu, khóa bí mật, token).

## 4. Đánh giá tổng thể

| Tiêu chí | Trọng số | Điểm (0–10) | Điểm có trọng số |
|---|---|---|---|
| Tính đầy đủ (Completeness) | 50% | 8 | 4.0 |
| Tính rõ ràng (Clarity) | 20% | 8 | 1.6 |
| Tính nhất quán (Consistency) | 20% | 9 | 1.8 |
| Đúng định dạng (Formatting) | 10% | 9 | 0.9 |
| **Tổng điểm** | **100%** | | **8.3/10** |

**Trạng thái phê duyệt:** ⚠️ **Conditional Approval** — không có Critical; còn Major 2 và 3.

**Điều kiện để approve:**
- Chốt con số NFR-06, NFR-11.
- Dev bổ sung tên bảng / cột CSDL cho cột Mapping (có thể làm song song đầu giai đoạn thiết kế).

## 5. Checklist sẵn sàng phát triển

- ✅ Tất cả yêu cầu có ID duy nhất (FC, YC, KT, BR, EX, NFR) và trace về catalog
- ✅ Acceptance criteria đo lường được cho mọi chức năng (request / response / mã lỗi cụ thể)
- ⚠️ Non-functional requirements có con số định lượng — còn NFR-06, NFR-11
- ✅ Trường dữ liệu mô tả đủ theo nghiệp vụ (Phụ lục A)
- ✅ Tiêu chí tìm kiếm có kiểu so khớp; trường tính toán có quy tắc
- ✅ API xác định đúng loại List / Detail / Report và mô tả đủ nguyên tắc tương ứng
- ✅ Luồng lỗi, edge case, negative case đã mô tả
- ✅ Phân quyền và yêu cầu an toàn có đặc tả (YC-02, YC-03, YC-07, YC-08)
- ✅ Đã được sign-off bởi stakeholder có thẩm quyền — xem Mục 6

## 6. Phê duyệt (Bước 3.6, Gate 4)

- **Kết quả:** Phê duyệt SRS v1.0 kèm điều kiện
- **Người duyệt:** @mynguyen.cntt.px · **Ngày:** 26/10/2026
- **Điều kiện chuyển sang giai đoạn thiết kế:**
  - Chốt con số NFR-06 (ngưỡng số lượt gọi) sau khi nhóm phát triển đo tải
  - Chốt con số NFR-11 (thời gian phản hồi)
  - Nhóm phát triển bổ sung tên bảng / cột CSDL cho cột "Mapping với hệ thống" (YC-04, Phụ lục A)
