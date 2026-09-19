# Flow: Agent/Quản trị viên đăng nhập

> Màn hình thuộc flow này: noibo-dang-nhap → noibo-tai-khoan-ca-nhan. Flow tổng xem `../srs/ho-tro-cskh-userflow.md` Mục 1.
>
> Các mục ghi "(OQ-n)" đã có **đề xuất chờ khách hàng xác nhận** ở bảng cuối file (cập nhật 19/09/2026), cũng đã ghi vào tài liệu "Đề xuất Hệ thống Hỗ trợ & Chăm sóc Khách hàng.docx".

---

## Screen: noibo-dang-nhap — Đăng nhập nội bộ

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH Nội bộ - Đăng nhập cho agent / quản trị viên                    │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│            ┌────────────────────────────────────────────┐            │
│            │ Đăng nhập nội bộ                           │            │
│            │                                            │            │
│            │ Email đăng nhập                            │            │
│            │ [1] [tran.thi.b@vnpt.vn________________]   │            │
│            │                                            │            │
│            │ Mật khẩu                                   │            │
│            │ [2] [********________________] (eye) [3]   │            │
│            │                                            │            │
│            │ [4] [            Đăng nhập             ]   │            │
│            ├────────────────────────────────────────────┤            │
│            │ [5] Tài khoản nội bộ do quản trị viên      │            │
│            │     cấp. Quên mật khẩu hoặc bị khóa:       │            │
│            │     liên hệ quản trị viên.                 │            │
│            └────────────────────────────────────────────┘            │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Email đăng nhập | Textbox | Text | • **Bắt buộc**. Tài khoản nội bộ (agent tỉnh/trung tâm, biên tập nội dung, quản trị viên, chủ quản dịch vụ) do quản trị viên tạo và gán team (UC41); phân biệt với tài khoản khách hàng (Đề xuất — Đăng nhập & xác thực).<br>• [GIẢ ĐỊNH] dùng email làm tên đăng nhập, giống màn khách hàng. |
| 2 | Mật khẩu | Textbox (password) | Text | • **Bắt buộc**, che ký tự. Quy tắc độ mạnh/khóa tạm sau nhiều lần sai: đã đề xuất, chờ xác nhận (OQ-5). |
| 3 | Hiện/ẩn mật khẩu | Icon button (eye) | Click | • Bật/tắt hiển thị ký tự đã nhập. |
| 4 | Đăng nhập | Button | Click | • **Disabled** tới khi [1], [2] có giá trị; khóa khi submitting.<br>• Đúng → vào Trang chủ nội bộ theo vai trò [GIẢ ĐỊNH]: Agent → `agent-hang-doi`; Chủ quản dịch vụ → `baocao-tong-quan` (chỉ có quyền xem báo cáo); Biên tập nội dung → `kb-cho-duyet`; Quản trị viên → `agent-hang-doi` (thấy toàn bộ) [chốt landing: OQ-18]. Menu chỉ hiện mục đúng quyền (RBAC).<br>• Sai → giữ nguyên, báo "Sai email hoặc mật khẩu" (wording tạm, chưa có mã E-…), xóa ô mật khẩu.<br>• **Tài khoản đã bị vô hiệu hóa** (nhân sự nghỉ việc, UC41) → không cho đăng nhập, báo "Tài khoản đã bị khóa, vui lòng liên hệ quản trị viên" (wording tạm), giữ nguyên màn. |
| 5 | Ghi chú cấp tài khoản | Label | ReadOnly | • Nhắc tài khoản do quản trị viên cấp; **không có link tự đăng ký hay tự đặt lại mật khẩu** vì nguồn chưa mô tả cơ chế quên mật khẩu cho tài khoản nội bộ (OQ-18).<br>• MVP chưa SSO; thiết kế cho phép bổ sung SSO sau mà không đổi bố cục (Đề xuất — Đăng nhập & xác thực). |

- Chỉ 1 màn đăng nhập cho mọi vai trò nội bộ; "tài khoản bị vô hiệu hóa" xử lý bằng thông báo tại màn (userflow không có slug riêng).


---

## Screen: noibo-tai-khoan-ca-nhan — Tài khoản cá nhân (nội bộ)

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│ Tài khoản cá nhân                                                    │
├──────────────────────────────────────────────────────────────────────┤
│ Thông tin cá nhân                                                    │
│ Họ tên [1] [Trần Thị B__________]  SĐT [2] [0987654321____]          │
│ Email  [3] tran.thi.b@vnpt.vn (chỉ đọc)                              │
│ Vai trò [4] Agent tỉnh        Team [5] Bình Định     (chỉ đọc)       │
│                                                   [6] [Lưu thông tin]│
├──────────────────────────────────────────────────────────────────────┤
│ Đổi mật khẩu                                                         │
│ Hiện tại [7] [********__________]  Mới [8] [********__________]      │
│ Nhập lại mới [9] [********__________]    [10] [ Đổi mật khẩu ]       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Họ tên | Textbox | Text | • [GIẢ ĐỊNH] sửa được (UC44: "thông tin cần sửa"); **bắt buộc**. |
| 2 | Số điện thoại | Textbox | Text | • [GIẢ ĐỊNH] sửa được, không bắt buộc. |
| 3 | Email | Label | ReadOnly | • Chỉ đọc vì là định danh đăng nhập; đổi do quản trị viên. |
| 4 | Vai trò | Label | ReadOnly | • Hiển thị vai trò hiện có (Agent tỉnh / Agent trung tâm / Biên tập nội dung / Quản trị viên / Chủ quản dịch vụ). Chỉ Quản trị viên đổi được (`qt-phan-quyen`, UC43). |
| 5 | Team | Label | ReadOnly | • Team được gán (trung tâm hoặc tỉnh/thành cụ thể) — quyết định phạm vi ticket agent thấy; chỉ Quản trị viên đổi (`qt-tao-tai-khoan-noibo`). |
| 6 | Lưu thông tin | Button | Click | • **Disabled** khi chưa đổi gì hoặc [1] rỗng; thành công → báo "Đã cập nhật" (wording tạm); lỗi → giữ nguyên, báo lỗi [chưa có mã E-…]. |
| 7 | Mật khẩu hiện tại | Textbox (password) | Text | • **Bắt buộc** khi đổi mật khẩu; hệ thống xác thực trước khi cập nhật (UC44). Sai → báo "Mật khẩu hiện tại không đúng" (wording tạm). |
| 8 | Mật khẩu mới | Textbox (password) | Text | • **Bắt buộc**; quy tắc độ mạnh: đã đề xuất, chờ xác nhận (OQ-5). |
| 9 | Nhập lại mật khẩu mới | Textbox (password) | Text | • **Bắt buộc**, phải khớp [8]. |
| 10 | Đổi mật khẩu | Button | Click | • **Disabled** tới khi [7][8][9] hợp lệ; thành công → báo "Đã đổi mật khẩu"; có buộc đăng nhập lại/đăng xuất phiên khác không: OQ-5. Việc đổi mật khẩu không ghi vào nhật ký thao tác nhạy cảm [GIẢ ĐỊNH — nguồn chỉ liệt kê đổi quyền, xóa tài liệu, đổi định tuyến]. |

- Header nội bộ dùng chung (không đánh số): menu Ticket / Nội dung / Người dùng / Cấu hình / Báo cáo **chỉ hiện mục đúng quyền** của vai trò (agent chỉ thấy Ticket + Báo cáo cơ bản team mình; chủ quản dịch vụ chỉ thấy Báo cáo).


---

## Đề xuất đã cập nhật (chờ khách hàng xác nhận)

| Mã | Nội dung cần chốt | Đề xuất | Trạng thái |
|----|-------------------|---------|------------|
| OQ-18 | Tài khoản nội bộ | Quản trị viên tạo → hệ thống gửi email mời đặt mật khẩu (không cấp mật khẩu qua kênh khác); có "quên mật khẩu" qua email; trang đầu: Agent và Quản trị viên → hàng đợi ticket, Chủ quản dịch vụ → báo cáo tổng quan, Biên tập → chờ duyệt. | Chờ khách hàng xác nhận |
