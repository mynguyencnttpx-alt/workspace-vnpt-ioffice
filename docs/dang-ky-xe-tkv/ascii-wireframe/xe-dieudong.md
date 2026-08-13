# Flow: Xe điều động & sổ lệnh

> Màn hình thuộc flow này: xe-dieudong-list → xe-hanhtrinh-detail (→ link dk-xe-detail, flow khác), xe-dieudong-list → so-nhap-lenh. Flow tổng xem `../srs/dang-ky-xe-tkv-userflow.md` Mục 1.

---

## Screen: xe-dieudong-list — DS xe đang/chưa điều động

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Danh sách xe đang/chưa điều động                                  │
├──────────────────────────────────────────────────────────────────┤
│ Tìm kiếm: [________________]   Đơn vị: [v: Tất cả          ][1]│
├──────────────────────────────────────────────────────────────────┤
│ Biển số    | Loại xe      | Đơn vị     | Trạng thái điều động[2]│
│ 29A-123.45 | Ford Transit | VP trụ sở  | Đang điều động (DKX-0231)│
│ 29A-678.90 | Toyota Innova| VP trụ sở  | Trống                  │
│ 15A-111.22 | Ford Transit | VP Hạ Long | Ngừng sử dụng          │
│ (scroll xuống xem thêm)                                          │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Tìm kiếm + Lọc đơn vị | Textbox + Dropdown | Text + Select | • Không bắt buộc. Kế thừa màn QLDKX004/005 hiện có — chỉ bổ sung điều hướng (không đổi cấu trúc tìm kiếm/lọc gốc, GAP A9). |
| 2 | Bảng trạng thái điều động | Label (bảng) + Link (có điều kiện) | ReadOnly + Click | • 3 nhóm trạng thái tách riêng, không lẫn: "Đang điều động (mã phiếu)" — **click được**, điều hướng `xe-hanhtrinh-detail`; "Trống" — không click; "Ngừng sử dụng" (đọc từ `danh-muc-xe-form`) — không click, hiển thị tách nhóm để không lẫn với "Trống" (xe sẵn sàng điều động thật sự). |

---

## Screen: xe-hanhtrinh-detail — Chi tiết hành trình xe

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Hành trình xe 29A-123.45              < Quay lại danh sách >    │
├──────────────────────────────────────────────────────────────────┤
│  Lái xe        : Lê Văn D                                         │
│  Người đăng ký : Nguyễn Văn A (Ban Tổ chức)                       │
│  Lộ trình      : Hà Nội - Hạ Long                                 │
│  Thời gian     : 05/08/2026 07:00 - dự kiến 18:00                │
│  Trạng thái    : Lái xe đã xác nhận                               │
│                                                                    │
│ < Xem chi tiết phiếu đăng ký DKX-0231 >                      [1]│
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Xem chi tiết phiếu đăng ký | Link | Click | • Điều hướng sang `dk-xe-detail` (flow `dang-ky-va-duyet-xe`, đã duyệt) — xem đầy đủ thông tin phiếu gốc (hạch toán, đơn vị tham gia, lịch sử xử lý). Đáp ứng finding review: trước đây không có lối ra từ hành trình về phiếu gốc. |

---

## Screen: so-nhap-lenh — Sổ nhập lệnh

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Sổ nhập lệnh                                    [ In sổ ]        │
├──────────────────────────────────────────────────────────────────┤
│ Xe: [v: Tất cả  ]  Lái xe: [v: Tất cả  ]  Từ-đến ngày [__/__][1]│
├──────────────────────────────────────────────────────────────────┤
│ Mã lệnh  | Ngày giao lệnh | Xe          | Lái xe   | Lộ trình [2]│
│ DKX-0231 | 05/08/2026     | 29A-123.45  | Lê Văn D | HN-Hạ Long │
│ DKX-0230 | 04/08/2026     | 29A-678.90  | Ph.Văn E | HN-Sân bay │
│ (scroll xuống xem thêm)                                          │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Lọc (xe, lái xe, khoảng ngày) | Dropdown + Datepicker | Select + Text | • Không bắt buộc. |
| 2 | Bảng lệnh | Label (bảng) | ReadOnly | • **Không có nút thêm/sửa** — mỗi dòng tự động sinh khi hoàn tất bước Cấp xe tại `cap-xe` (đã chốt với khách hàng: view tự động, không ký nhận thủ công). "Mã lệnh" dùng chung mã phiếu đăng ký (DKX-xxx) — không tách mã lệnh riêng.<br>• Nút "In sổ" xuất danh sách đang lọc ra bản in/PDF phục vụ lưu hồ sơ giấy. |
