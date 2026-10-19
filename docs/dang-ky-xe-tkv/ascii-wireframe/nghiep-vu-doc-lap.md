# Flow: Nghiệp vụ độc lập

> Màn hình thuộc flow này: nhatky-xe-list, baocao-km (2 màn độc lập, không có luồng chuyển tiếp cho nhau, truy cập trực tiếp từ menu; nhiên liệu đã chuyển sang flow `quan-ly-nhien-lieu`). Flow tổng xem `../srs/dang-ky-xe-tkv-userflow.md` Mục 1.

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
| 5 | Quy ước tên cột trên các biểu báo cáo thống kê km (theo thiết kế Figma, 12 biểu: Tháng/Quý/Năm x theo đơn vị/theo xe x trạng thái combobox mở) | Label (tiêu đề cột) | ReadOnly | • Cột "Định biên QĐ (km/năm)" đổi thành **"Định mức khoán theo tháng (km/tháng)"**; cột "KM khoán HĐ" đổi thành **"KM định mức khoán (km/năm)"**. Đổi đồng loạt ở mọi biểu cùng format.<br>• Định mức khoán theo tháng = định biên km theo quyết định chia 12 (vd 18.000 km/năm thành 1.500 km/tháng; tổng toàn hệ thống 246.000 thành 20.500) [GIẢ ĐỊNH — cách quy đổi từ định biên năm sang tháng]. KM định mức khoán vẫn tính theo năm.<br>• Lưu ý: màn `dinh-bien-km-form` vẫn nhập "Km định biên / năm"; cần thống nhất đơn vị nhập (năm) với đơn vị hiển thị trên báo cáo (tháng) hoặc đổi cả nhãn nhập sau khi anh/chị xác nhận. |
