# Flow: Trang đầu & tổng quan nội bộ theo vai trò

> Màn hình thuộc flow này: noibo-tai-khoan-ca-nhan → noibo-tong-quan. Flow tổng xem `../srs/ho-tro-cskh-userflow.md` Mục 1. Vào từ màn đăng nhập chung `dang-nhap` (màn `noibo-dang-nhap` đã gộp vào đó, OQ-32). Khung điều hướng nội bộ dùng chung: bản Figma là sidebar trái + thanh trên có chip Site/Vai trò; ASCII vẽ gọn thành 1 dòng đầu.
>
> Các mục ghi "(OQ-n)" đã được **khách hàng xác nhận (21/09/2026)** ở bảng cuối file (cập nhật 19/09/2026), cũng đã ghi vào tài liệu "Đề xuất Hệ thống Hỗ trợ & Chăm sóc Khách hàng.docx".
>
> **Cập nhật 23/09/2026 (khách hàng xác nhận, qua phiên chốt SRS):** Họ tên/SĐT sửa được, nút hành động chính theo vai trò — xác nhận đúng như bản vẽ; **bổ sung mới**: đổi mật khẩu (nội bộ) bắt buộc đăng xuất toàn bộ session khác, cụ thể hóa OQ-5.

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
| 1 | Họ tên | Textbox | Text | • Sửa được (UC57: "thông tin cần sửa"); **bắt buộc** (đã chốt 23/09/2026). |
| 2 | Số điện thoại | Textbox | Text | • Sửa được, không bắt buộc (đã chốt 23/09/2026). |
| 3 | Email | Label | ReadOnly | • Chỉ đọc vì là định danh đăng nhập; đổi do quản trị viên. |
| 4 | Vai trò | Label | ReadOnly | • Hiển thị vai trò hiện có (Agent tỉnh / Agent trung tâm / Biên tập nội dung / Quản trị viên / Chủ quản dịch vụ). Chỉ Quản trị viên đổi được (`qt-phan-quyen`, UC56). |
| 5 | Team | Label | ReadOnly | • Team được gán (trung tâm hoặc tỉnh/thành cụ thể) — quyết định phạm vi ticket agent thấy; chỉ Quản trị viên đổi (`qt-tao-tai-khoan-noibo`). |
| 6 | Lưu thông tin | Button | Click | • **Disabled** khi chưa đổi gì hoặc [1] rỗng; thành công → báo "Đã cập nhật" (wording tạm); lỗi → giữ nguyên, báo lỗi [chưa có mã E-…]. |
| 7 | Mật khẩu hiện tại | Textbox (password) | Text | • **Bắt buộc** khi đổi mật khẩu; hệ thống xác thực trước khi cập nhật (UC57). Sai → báo "Mật khẩu hiện tại không đúng" (wording tạm). |
| 8 | Mật khẩu mới | Textbox (password) | Text | • **Bắt buộc**; quy tắc độ mạnh: đã chốt (OQ-5). |
| 9 | Nhập lại mật khẩu mới | Textbox (password) | Text | • **Bắt buộc**, phải khớp [8]. |
| 10 | Đổi mật khẩu | Button | Click | • **Disabled** tới khi [7][8][9] hợp lệ; thành công → **bắt buộc đăng xuất toàn bộ session khác** (kể cả thiết bị/tab khác), báo "Đã đổi mật khẩu" và yêu cầu đăng nhập lại (đã chốt 23/09/2026, cụ thể hóa OQ-5). Việc đổi mật khẩu KHÔNG ghi vào nhật ký thao tác nhạy cảm — nguồn chỉ liệt kê đổi quyền, xóa tài liệu, đổi định tuyến (đã chốt 23/09/2026). |

- Header nội bộ dùng chung (không đánh số): menu Ticket / Nội dung / Người dùng / Cấu hình / Báo cáo **chỉ hiện mục đúng quyền** của vai trò (agent chỉ thấy Ticket + Báo cáo cơ bản team mình; chủ quản dịch vụ chỉ thấy Báo cáo).


---

## Screen: noibo-tong-quan — Tổng quan nội bộ

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│ Xin chào, Trần Thị B                    [1] [ Xem hàng đợi ticket ]  │
├──────────────────────────────────────────────────────────────────────┤
│ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐          │
│ │ [2] 7      │ │ [3] 2      │ │ [4] 4      │ │ [5] 5      │          │
│ │ Ticket mới │ │ Sắp quá hạn│ │ KH phản hồi│ │ Bài chờ    │          │
│ │ 3 khẩn cấp │ │ dưới 1 giờ │ │ cần trả lời│ │ duyệt      │          │
│ └────────────┘ └────────────┘ └────────────┘ └────────────┘          │
├──────────────────────────────────────────────────────────────────────┤
│ Việc cần làm ngay [6]                 | Hoạt động gần đây [7]        │
│ #T-0123 Không ký số được  Khẩn cấp    | Ticket #T-0110 đã đóng       │
│ #T-0121 Lỗi tải tệp       Sắp quá hạn | Bài "Lỗi 403" được duyệt     │
│ #T-0118 Hướng dẫn quyền   KH phản hồi | 3 bài cần tái lập chỉ mục    │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Nút hành động chính | Button | Click | • Theo vai trò (đã chốt 23/09/2026): Agent/Quản trị viên → "Xem hàng đợi ticket" (`agent-hang-doi`); Chủ quản dịch vụ → "Xem báo cáo" (`baocao-tong-quan`); Biên tập nội dung → "Xem chờ duyệt" (`kb-cho-duyet`). |
| 2 | Thẻ Ticket mới cho tôi | Stat card | Click | • Số ticket mới được giao cho tài khoản (kèm số khẩn cấp); bấm → `agent-hang-doi` lọc "của tôi". Chỉ vai trò xử lý ticket (Agent, Quản trị viên). |
| 3 | Thẻ Sắp quá hạn SLA | Stat card | Click | • Số ticket còn dưới ngưỡng cảnh báo SLA (cấu hình ở `cauhinh-sla`); bấm → `agent-canh-bao-sla`. Chỉ Agent/Quản trị viên phụ trách. |
| 4 | Thẻ Khách vừa phản hồi | Stat card | Click | • Số ticket khách hàng vừa phản hồi cần trả lời; bấm → `agent-hang-doi` lọc trạng thái tương ứng. |
| 5 | Thẻ Bài chờ duyệt | Stat card | Click | • **Chỉ Quản trị viên thấy** (chỉ Quản trị viên duyệt — OQ-4); bấm → `kb-cho-duyet`. Vai trò khác không hiện thẻ (tránh bấm vào màn không có quyền). |
| 6 | Việc cần làm ngay | List | Click | • Tối đa 3 mục ưu tiên (khẩn cấp, sắp quá hạn, khách phản hồi); bấm 1 dòng → `agent-chi-tiet-ticket`. Rỗng → "Chưa có việc cần làm". |
| 7 | Hoạt động gần đây | List | ReadOnly | • Sự kiện gần nhất liên quan đến tài khoản (ticket đóng, bài được duyệt, chỉ mục cần tái lập...). Chỉ hiển thị mục thuộc phạm vi/quyền của vai trò. |

- **Đề xuất bổ sung, đã chốt (OQ-25).** Màn này KHÔNG thay landing mặc định theo vai trò (OQ-18: Agent/Quản trị viên → hàng đợi, Chủ quản → báo cáo tổng quan, Biên tập → chờ duyệt); mở từ menu "Tổng quan". Mọi thẻ hiển thị theo vai trò; lối sang `noibo-tai-khoan-ca-nhan` giữ nguyên.


---

## Đề xuất đã cập nhật (đã chốt với khách hàng 21/09/2026)

| Mã | Nội dung cần chốt | Đề xuất | Trạng thái |
|----|-------------------|---------|------------|
| OQ-18 | Tài khoản nội bộ | Quản trị viên tạo → hệ thống gửi email mời đặt mật khẩu (không cấp mật khẩu qua kênh khác); có "quên mật khẩu" qua email; đăng nhập dùng chung một màn với khách hàng (OQ-32); trang đầu: Agent và Quản trị viên → hàng đợi ticket, Chủ quản dịch vụ → báo cáo tổng quan, Biên tập → chờ duyệt. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-25 | [63] Tổng quan nội bộ có làm landing không (bổ sung OQ-18) | Không; landing giữ theo OQ-18, Tổng quan mở từ menu, thẻ chỉ hiện theo vai trò. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
