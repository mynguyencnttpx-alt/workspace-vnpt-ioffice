# Flow: Thông báo & trang trạng thái hệ thống

> Màn hình thuộc flow này: thong-bao, loi-403, loi-404, phien-het-han (3 màn sau dùng chung nhiều flow). Flow tổng xem `../srs/ho-tro-cskh-userflow.md` Mục 1 (Flow 11) và quy tắc trang trạng thái ở Mục 5.
>
> Toàn bộ flow này là **đề xuất bổ sung ngày 21/09/2026, đã được khách hàng xác nhận** (OQ-24, OQ-31).
>
> **Cập nhật 23/09/2026 (khách hàng xác nhận, qua phiên chốt SRS):** bỏ nút "Gửi yêu cầu hỗ trợ" ở màn 403 (chỉ còn "Về trang chủ"); thông báo giữ **90 ngày** (không phải 30 ngày như đề xuất gốc OQ-24) rồi tự động xóa; không ghi log riêng cho việc đọc/đánh dấu đã đọc thông báo và cho việc hiển thị 403/404/phiên hết hạn.

---

## Screen: thong-bao — Thông báo

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│ Thông báo                             [1] [ Đánh dấu đã đọc hết ]    │
│ [2] [Tất cả (6)] [Chưa đọc (3)] [Ticket] [Hệ thống]                  │
├──────────────────────────────────────────────────────────────────────┤
│ [3] * Ticket #T-0123 được phân công cho bạn            5 phút trước  │
│       Không ký số được - Khẩn cấp - site-bd                          │
│     * Ticket #T-0121 sắp quá hạn SLA phản hồi         32 phút trước  │
│       Còn 42 phút                                                    │
│     * Khách hàng phản hồi ticket #T-0118                 1 giờ trước │
│       "Đã thử lại nhưng vẫn lỗi 403..."                              │
│       Bài "Lỗi 403 khi ký số" đã được duyệt                 Hôm qua  │
│       Chỉ mục AI: 3 bài cần tái lập                        Hôm qua   │
│       Đồng bộ Drive lỗi kết nối                                19/09 │
│ [4] < Quay lại >                                                     │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Đánh dấu tất cả đã đọc | Button | Click | • Đặt mọi thông báo về đã đọc; ẩn chấm chưa đọc; thao tác không hoàn tác được nhưng vô hại. |
| 2 | Bộ lọc | Chip filter | Select | • Tất cả / Chưa đọc / Ticket / Hệ thống; kèm số lượng; mặc định Tất cả. |
| 3 | Danh sách thông báo | List | Click | • Mỗi dòng: icon theo loại, tiêu đề, mô tả ngắn, thời gian tương đối, chấm xanh nếu chưa đọc. Loại: ticket được giao/khách phản hồi (→ `agent-chi-tiet-ticket`), sắp quá hạn SLA (→ `agent-canh-bao-sla`), bài chờ duyệt (→ `kb-cho-duyet`, chỉ Quản trị viên), lỗi hệ thống (đồng bộ Drive, OneBSS).<br>• Thông báo trỏ tới mục người nhận không còn quyền → `loi-403`. Bấm 1 dòng đánh dấu đã đọc. |
| 4 | Quay lại | Link | Click | • Về màn đang xem trước khi mở thông báo. |

- Mở từ biểu tượng chuông ở header mọi màn nội bộ. Lưu giữ **90 ngày** rồi tự động xóa (cập nhật 23/09/2026, thay số liệu "30 ngày" ở đề xuất gốc OQ-24, đồng bộ với thời hạn lưu hội thoại Hỏi đáp AI). Màn `agent-canh-bao-sla` vẫn là màn riêng, không thay bằng màn này.

#### Trạng thái phụ — chưa có thông báo

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│ Thông báo                                                            │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│               Chưa có thông báo nào                                  │
│      Thông báo về ticket và hệ thống sẽ hiện ở đây.                  │
│                   [4] < Quay lại >                                   │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- Khác màn gốc: danh sách rỗng → "Chưa có thông báo nào"; chỉ còn [4] Quay lại.


---

## Screen: loi-403 — Không có quyền truy cập

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│                    [ Khóa ]                                          │
│                         403                                          │
│        Bạn không có quyền truy cập trang này [1]                     │
│   Chức năng này chỉ dành cho một số vai trò nhất định.               │
│   Liên hệ quản trị viên nếu cần quyền.                               │
│               [2] [ Về trang chủ ]                                   │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Thông báo | Label + Icon | ReadOnly | • "Bạn không có quyền truy cập trang này" — **chỉ dành cho người dùng nội bộ** vào chức năng có thật nhưng vai trò không được phép (vd Agent vào cấu hình AI). Khách hàng không bao giờ thấy màn này (dùng `loi-404` trung lập). |
| 2 | Về trang chủ | Button | Click | • Về trang chủ nội bộ theo vai trò. Màn 403 chỉ có nút này — **KHÔNG có nút "Gửi yêu cầu hỗ trợ"** (đã chốt 23/09/2026, bỏ so với bản vẽ trước). |

- Dùng chung mọi flow nội bộ. Quy tắc phân biệt 403/404/66: userflow Mục 5.


---

## Screen: loi-404 — Không tìm thấy nội dung

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi   [BĐ - iOffice] (o) A v │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│                    [ Tìm kiếm ]                                      │
│                         404                                          │
│        Không tìm thấy nội dung [1]                                   │
│   Liên kết có thể đã cũ hoặc nội dung không thuộc phạm vi của bạn.   │
│   Vui lòng quay về trang chủ.                                        │
│               [2] [ Về trang chủ ]  [3] [ Tra cứu bài viết ]         │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Thông báo | Label + Icon | ReadOnly | • Lời lẽ **trung lập**: link cũ, nội dung không tồn tại hoặc ngoài phạm vi của người xem (ticket, tài khoản, khách hàng...) đều hiện như nhau — **không xác nhận tài nguyên có tồn tại** (chống dò dữ liệu, cùng tinh thần anti-enumeration của `kh-quen-mat-khau`). Bài KB dùng `kb-bai-viet-khong-con`. |
| 2 | Về trang chủ | Button | Click | • Khách hàng → `kb-trang-chu`; nội bộ → trang chủ theo vai trò. |
| 3 | Tra cứu bài viết | Button | Click | • Sang `kb-trang-chu` để tìm nội dung khác. |

- Dùng chung mọi flow.


---

## Screen: phien-het-han — Phiên đăng nhập hết hạn

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi   [BĐ - iOffice] (o) A v │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│                    [ Đồng hồ ]                                       │
│                                                                      │
│        Phiên đăng nhập đã hết hạn [1]                                │
│   Vì lý do bảo mật, bạn cần đăng nhập lại để tiếp tục.               │
│   Nội dung đang soạn chưa gửi sẽ không được giữ lại.                 │
│               [2] [ Đăng nhập lại ]                                  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Thông báo | Label + Icon | ReadOnly | • Hiện khi phiên hết hạn ở màn bất kỳ; nêu lý do bảo mật và **nội dung đang soạn chưa gửi sẽ không được giữ lại** (OQ-31, đề xuất). Hành động đang gửi dở (tạo ticket, gửi OneBSS): kiểm tra kết quả trước khi cho làm lại. |
| 2 | Đăng nhập lại | Button | Click | • Mọi người dùng → `dang-nhap` (đăng nhập chung). Đăng nhập xong quay về đúng màn trước đó nếu cùng loại tài khoản và còn quyền; khác loại hoặc mất quyền → trang đầu tương ứng hoặc `loi-403`/`loi-404`. |

- Dùng chung mọi flow.


---

## Đề xuất đã cập nhật (đã chốt với khách hàng 21/09/2026)

| Mã | Nội dung cần chốt | Đề xuất | Trạng thái |
|----|-------------------|---------|------------|
| OQ-24 | Trung tâm thông báo trong ứng dụng cho tài khoản nội bộ (bổ sung OQ-19d) | Có; ~~giữ 30 ngày~~ **giữ 90 ngày** (cập nhật 23/09/2026); loại: ticket được giao/khách phản hồi, sắp quá hạn SLA, bài chờ duyệt (chỉ Quản trị viên), lỗi hệ thống. | Đã chốt (khách hàng xác nhận, 21/09/2026; số ngày lưu **đã sửa lại** 23/09/2026) |
| OQ-31 | Hết phiên (bổ sung OQ-5) | Quay về đúng màn cũ sau đăng nhập lại; nội dung soạn dở không giữ; hành động đang gửi dở kiểm tra kết quả trước khi làm lại. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
