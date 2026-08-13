# Flow: Nghiệp vụ độc lập

> Màn hình thuộc flow này: nhatky-xe-list, nhien-lieu-list, baocao-km (3 màn độc lập, không có luồng chuyển tiếp cho nhau, truy cập trực tiếp từ menu). Flow tổng xem `../srs/dang-ky-xe-tkv-userflow.md` Mục 1.

---

## Screen: nhatky-xe-list — Nhật ký xe ngoài chuyến đăng ký

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Nhật ký xe ngoài chuyến đăng ký              [ + Thêm bản ghi ]  │
├──────────────────────────────────────────────────────────────────┤
│ Xe: [v: Tất cả]  Người lái: [v: Tôi]  Từ-đến ngày [__/__][1]│
├──────────────────────────────────────────────────────────────────┤
│ Ngày       | Xe          | Người lái | Mục đích     | Km  |   [2]│
│ 03/08/2026 | 29A-123.45  | Lê Văn D  | Đổ xăng      | 5   |[Sửa]│
│ 02/08/2026 | 29A-678.90  | Phạm Văn E| Sửa xe       | 12  |[Sửa]│
│ (scroll xuống xem thêm)                                          │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Lọc (xe, người lái, khoảng ngày) | Dropdown + Datepicker | Select | • Mặc định "Người lái = Tôi" (chỉ thấy bản ghi của mình); người có quyền "xem tất cả" (OQ-10 — chưa chốt ai có quyền này) đổi được bộ lọc sang xem theo xe/người khác. |
| 2 | Bảng nhật ký + Sửa | Label (bảng) + Button | ReadOnly + Click | • "+ Thêm bản ghi": mở form nhập số km, thời gian từ-đến, mục đích, xe, người lái (mặc định là người đang đăng nhập).<br>• "Sửa": chỉ khả dụng với bản ghi của chính mình, hoặc mọi bản ghi nếu có quyền xem tất cả. Có nút Xóa kèm xác nhận trong form sửa. |

---

## Screen: nhien-lieu-list — Quản lý nhiên liệu

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Quản lý nhiên liệu                                                │
├──────────────────────────────────────────────────────────────────┤
│ (!) Đang chờ TKV cung cấp biểu mẫu nhập cụ thể — khung dưới  [1]│
│     đây là tối thiểu, sẽ bổ sung khi có biểu mẫu.                 │
├──────────────────────────────────────────────────────────────────┤
│ Tháng: [v: 08/2026]  Xe: [v: Tất cả  ]                        [2]│
├──────────────────────────────────────────────────────────────────┤
│ Xe          | Số lít tiêu thụ | Định mức | Chênh lệch         [3]│
│ 29A-123.45  | 180             | 200      | -20 (trong định mức)│
│ (scroll xuống xem thêm)                                          │
│                                                                    │
│ [ + Thêm bản ghi ]                                            [4]│
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Cảnh báo chờ biểu mẫu | Label (warning) | ReadOnly | • Ghi nhận OQ-11: chờ TKV cung cấp biểu mẫu nhập nhiên liệu cụ thể (GAP B6). |
| 2 | Lọc (tháng, xe) | Dropdown | Select | • Không bắt buộc. |
| 3 | Bảng tổng hợp nhiên liệu | Label (bảng) | ReadOnly | • Khung tối thiểu: số lít tiêu thụ so định mức. Nguồn định mức cụ thể chưa có (chờ TKV). |
| 4 | Thêm bản ghi | Button (primary) | Click | • Mở form tối thiểu (xe, tháng, số lít) — sẽ mở rộng khi có biểu mẫu chuẩn từ TKV. |

---

## Screen: baocao-km — Báo cáo thống kê km

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Báo cáo thống kê km                                               │
├──────────────────────────────────────────────────────────────────┤
│ (!) Đang chờ TKV cung cấp biểu mẫu báo cáo cụ thể — khung    [1]│
│     dưới đây là tối thiểu, sẽ bổ sung khi có biểu mẫu.            │
├──────────────────────────────────────────────────────────────────┤
│ Loại báo cáo [v: Km từng xe/tháng                        ]  [2]│
│  ( Km từng xe/tháng | Km từng ban/tháng | Tổng hợp tất cả xe |    │
│    Tổng hợp các ban | Tổng km cả đội xe | Theo định biên )        │
│                                                                    │
│ Khoảng thời gian [v: Tháng] [__/____]                        [3]│
│                                                                    │
│ [ Xuất báo cáo ]                                              [4]│
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Cảnh báo chờ biểu mẫu | Label (warning) | ReadOnly | • Ghi nhận OQ-12: chờ TKV cung cấp biểu mẫu báo cáo cụ thể (sheet "KM năm 2026", "TH HN - HL theo xe" — GAP B7). |
| 2 | Loại báo cáo | Dropdown | Select | • Bắt buộc, 6 loại theo đúng liệt kê GAP B7. "Theo định biên" phụ thuộc `dinh-bien-km-list` (đã duyệt) — nhưng vì chưa có cơ chế tính đã dùng/còn lại (cùng vấn đề với `thong-bao-list`), báo cáo loại này ở đợt này chỉ hiển thị số định biên đã nhập, chưa tính được phần đã dùng. |
| 3 | Khoảng thời gian | Dropdown + Datepicker | Select | • Bắt buộc. Tháng/quý/năm/khoảng tùy chọn theo GAP B7. |
| 4 | Xuất báo cáo | Button (primary) | Click | • Xuất theo khung tối thiểu hiện có; định dạng file xuất cụ thể chờ biểu mẫu TKV. |
