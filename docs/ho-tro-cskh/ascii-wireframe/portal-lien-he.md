# Flow: Gửi thông tin liên hệ tư vấn

> Màn hình thuộc flow này: portal-lien-he → portal-lien-he-thanh-cong. Flow tổng xem `../srs/ho-tro-cskh-userflow-portal.md` Mục 1 (Flow 14). Khách chưa đăng nhập; dữ liệu gửi đi hiện ở màn nhân viên [80] (Flow 15).
>
> Thiết bị: desktop 1024. Cập nhật 28/09/2026: bổ sung 2 màn [78]-[79]. Header portal như [74].

---

## Screen: portal-lien-he — Liên hệ tư vấn

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ LINE Trang chủ|Giải pháp v|Bảng giá|Liên hệ        [ Đăng nhập ]     │
├──────────────────────────────────────────────────────────────────────┤
│                            Liên hệ tư vấn                            │
│                                                                      │
│          ┌────────────────────────────────────────────────┐          │
│          │ Họ và tên *                                    │          │
│          │ [1][Nguyễn Văn A_________________]             │          │
│          │ Email *                                        │          │
│          │ [2][nguyenvana@ubnd.gov.vn_______]             │          │
│          │ Số điện thoại *                                │          │
│          │ [3][0912345678___________________]             │          │
│          │ Địa bàn *                                      │          │
│          │ [4][v: Chọn tỉnh/TP hoặc Bộ, ban, ngành]       │          │
│          │ Giải pháp quan tâm * (chọn ít nhất 1)          │          │
│          │ [5][x] Quản lý văn bản và điều hành            │          │
│          │    [ ] Lưu trữ điện tử                         │          │
│          │ Nội dung quan tâm                              │          │
│          │ [6][Muốn tìm hiểu ký số và phân quyền_         │          │
│          │    _________________________________]          │          │
│          │ [7][ Gửi ]   [8][ Hủy ]                        │          │
│          └────────────────────────────────────────────────┘          │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Họ và tên | Textbox | Text | • **Bắt buộc.** Bỏ trống: báo tại ô "(!) Vui lòng nhập họ và tên" [GIẢ ĐỊNH lời báo], các ô khác giữ nguyên nội dung.<br>• Độ dài tối đa: chưa chốt (OQ-48). |
| 2 | Email | Textbox | Text | • **Bắt buộc**, đúng định dạng email; sai: "(!) Email chưa đúng định dạng" [GIẢ ĐỊNH lời báo].<br>• Chỉ để nhân viên liên hệ lại; hệ thống **không gửi email** cho khách (chốt 28/09/2026). |
| 3 | Số điện thoại | Textbox | Text | • **Bắt buộc.** Định dạng số điện thoại và lời báo lỗi: chưa chốt (OQ-48). |
| 4 | Địa bàn | Dropdown | Select | • **Bắt buộc**, chọn 1 trong 34 tỉnh/thành phố hoặc "Bộ, ban, ngành" (OQ-44); danh sách lấy từ danh mục Địa bàn [73] (mục đang dùng; dòng hệ thống Trung ương hiển thị nhãn "Bộ, ban, ngành").<br>• Địa bàn bị ngừng dùng trong lúc khách đang mở form: báo tại ô, tải lại danh sách, chọn lại (OQ-44). Mặc định chưa chọn. |
| 5 | Giải pháp quan tâm | Checkbox group | Check | • **Bắt buộc chọn ít nhất 1** (Quản lý văn bản và điều hành / Lưu trữ điện tử). Chọn nhiều được.<br>• Chọn sẵn theo màn nguồn ([75], [76] hoặc khối tương ứng ở [77]); vào từ [74] không chọn sẵn; đổi được. Bỏ trống: "(!) Chọn ít nhất 1 giải pháp" [GIẢ ĐỊNH lời báo]. |
| 6 | Nội dung quan tâm | Textarea | Text | • Tùy chọn [GIẢ ĐỊNH, OQ-48]; độ dài tối đa chưa chốt. |
| 7 | Gửi | Button | Click | • Hợp lệ: lưu vào danh sách đề nghị tư vấn [80] rồi sang [79]; **không gửi email, không chống spam** (chốt 28/09/2026).<br>• Khi đang gửi: nút khóa "Đang gửi..." (chống bấm 2 lần). Lỗi hệ thống: báo, giữ nguyên nội dung, cho thử lại.<br>• Thiếu/sai: báo tại từng ô, giữ nội dung đã nhập. Ô đồng ý xử lý dữ liệu cá nhân và thời hạn lưu: chưa chốt (OQ-47). |
| 8 | Hủy | Button | Click | • Về đúng màn đã bấm vào ([74], [75], [76] hoặc [77]); nội dung đã nhập không được lưu. |

- Form khách chưa đăng nhập, vẽ trong khung hẹp căn giữa (quy tắc form không trải rộng). Vào từ 4 màn ([74] [75] [76] [77]) nên nút Hủy phải về đúng màn nguồn.

#### Trạng thái phụ — lỗi nhập liệu / khóa nút khi đang gửi (chỉ phần form)

```text
┌──────────────────────────────────────────────────────────────────────┐
│          ┌────────────────────────────────────────────────┐          │
│          │ Họ và tên *                                    │          │
│          │ [_________________________________]            │          │
│          │ (!) Vui lòng nhập họ và tên                    │          │
│          │ Email *                                        │          │
│          │ [nguyenvana@ubnd_________________]             │          │
│          │ (!) Email chưa đúng định dạng                  │          │
│          │ ...                                            │          │
│          │ Giải pháp quan tâm *                           │          │
│          │ (!) Chọn ít nhất 1 giải pháp                   │          │
│          │ [ Đang gửi... ]  (nút bị khóa khi đang gửi)    │          │
│          └────────────────────────────────────────────────┘          │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Screen: portal-lien-he-thanh-cong — Gửi liên hệ thành công

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ LINE Trang chủ|Giải pháp v|Bảng giá|Liên hệ        [ Đăng nhập ]     │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│          ┌────────────────────────────────────────────────┐          │
│          │ (i) Đã gửi thông tin thành công                │          │
│          │                                                │          │
│          │ Line sẽ liên hệ lại trong khoảng               │          │
│          │ 3 ngày làm việc.                               │          │
│          │                                                │          │
│          │ [1][ Về trang chủ ]   [2][ Gửi liên hệ khác ]  │          │
│          └────────────────────────────────────────────────┘          │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Về trang chủ | Button | Click | • Sang [74]. |
| 2 | Gửi liên hệ khác | Button | Click | • Sang [78] với form **trống**. |

- Nội dung "Line sẽ liên hệ lại trong khoảng 3 ngày làm việc" đã chốt (OQ-48). Không có mã tham chiếu vì không gửi email.

- Nội dung form đã được xóa. Bấm Back hoặc F5 ở màn này quay về form trống, **không tạo liên hệ thứ hai**.

- Trạng thái thành công là màn riêng, không nhồi chung với form [78] (mỗi trạng thái loại trừ một màn).

---

## Open Questions / quyết định của flow này

| Mã | Nội dung | Trạng thái |
|----|----------|------------|
| OQ-44 | Địa bàn: 34 tỉnh/TP và "Bộ, ban, ngành" theo danh mục [73]; địa bàn ngừng dùng giữa chừng báo tại ô | Đã chốt (khách hàng xác nhận, 28/09/2026) |
| OQ-47 | Dữ liệu cá nhân từ form: có ô đồng ý xử lý dữ liệu và thời hạn lưu (tự xóa) không | Mở — chờ khách hàng |
| OQ-48 | [79] ghi liên hệ lại trong khoảng 3 ngày làm việc (đã chốt). Còn mở: độ dài nội dung quan tâm, định dạng số điện thoại; trường bắt buộc tạm là họ tên, email, số điện thoại, địa bàn, giải pháp | Một phần đã chốt |
| — | Không gửi email, không chống spam (captcha, giới hạn tần suất) | Đã chốt (28/09/2026) |
