# Flow: Sổ theo dõi định kỳ

> Màn hình thuộc flow này: so-baoduong, so-dangkiem, so-baohiem (3 màn độc lập, mỗi màn filter theo xe). Flow tổng xem `../srs/dang-ky-xe-tkv-userflow.md` Mục 1.

---

## Screen: so-baoduong — Sổ bảo dưỡng

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Sổ bảo dưỡng                                                      │
├──────────────────────────────────────────────────────────────────┤
│ Chọn xe: [v: Tất cả          ]                                [1]│
├──────────────────────────────────────────────────────────────────┤
│ (!) 1 xe sắp đến hạn bảo dưỡng — xem cột "Cảnh báo"          [2]│
├──────────────────────────────────────────────────────────────────┤
│ Xe          | Ngày bảo dưỡng | Cấp bảo dưỡng | File | Cảnh báo[3]│
│ 29A-123.45  | 01/06/2026     | Cấp 2         | [xem]|          │
│ 29A-678.90  | 15/03/2026     | Cấp 1         | [xem]| Sắp đến hạn│
│ (chưa có bản ghi cho 15A-111.22 — Chưa có lịch sử bảo dưỡng) [4]│
│                                                                    │
│ [ + Thêm bản ghi bảo dưỡng ]                                  [5]│
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Chọn xe | Dropdown | Select | • Không bắt buộc, mặc định "Tất cả" (bảng gộp mọi xe). Chọn 1 xe → lọc riêng lịch sử xe đó. |
| 2 | Cảnh báo tổng hợp | Label (warning) | ReadOnly | • Đếm số xe sắp đến hạn trong ngưỡng cảnh báo (số ngày cụ thể: OQ-8, chưa chốt). |
| 3 | Bảng lịch sử bảo dưỡng | Label (bảng) + Link | ReadOnly + Click | • "Cấp bảo dưỡng" là dropdown nhập tay khi thêm bản ghi (chưa tách danh mục riêng — OQ-9). "Cảnh báo" tính từ ngày bảo dưỡng gần nhất + chu kỳ (tháng) đã nhập ở `danh-muc-xe-form`. |
| 4 | Empty state | Label | ReadOnly | • Xe chưa có bản ghi nào hiển thị dòng ghi chú "Chưa có lịch sử bảo dưỡng" thay vì để trống không giải thích. |
| 5 | Thêm bản ghi bảo dưỡng | Button (primary) | Click | • Mở form: chọn xe, ngày bảo dưỡng, cấp bảo dưỡng (dropdown), đính kèm file. Lưu xong cập nhật lại ngày đến hạn tiếp theo (tự tính theo chu kỳ). |

---

## Screen: so-dangkiem — Sổ đăng kiểm

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Sổ đăng kiểm                                                      │
├──────────────────────────────────────────────────────────────────┤
│ Chọn xe: [v: Tất cả          ]                                [1]│
├──────────────────────────────────────────────────────────────────┤
│ Xe          | Ngày đăng kiểm | Kỳ  | Đăng kiểm tiếp | File |CB[2]│
│ 29A-123.45  | 10/01/2026     | 6th | 10/07/2026     |[xem] │  │
│ 29A-678.90  | 20/02/2026     | 6th | 20/08/2026     |[xem] │  │
│ (scroll xuống xem thêm)                                          │
│                                                                    │
│ [ + Thêm bản ghi đăng kiểm ]                                  [3]│
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Chọn xe | Dropdown | Select | • Giống `so-baoduong`. |
| 2 | Bảng lịch sử đăng kiểm | Label (bảng) | ReadOnly | • "Đăng kiểm tiếp" tự tính = ngày đăng kiểm + chu kỳ (tháng) đã nhập ở `danh-muc-xe-form`, không sửa tay. Cột "CB" (cảnh báo) đánh dấu khi trong ngưỡng sắp đến hạn (OQ-8). |
| 3 | Thêm bản ghi đăng kiểm | Button (primary) | Click | • Mở form: chọn xe, ngày đăng kiểm, kỳ, đính kèm file. Hệ thống tự tính lại ngày đăng kiểm tiếp theo. |

---

## Screen: so-baohiem — Sổ bảo hiểm

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Sổ bảo hiểm                                                       │
├──────────────────────────────────────────────────────────────────┤
│ Chọn xe: [v: Tất cả          ]                                [1]│
├──────────────────────────────────────────────────────────────────┤
│ Xe          | Ngày mua      | Ngày hết hạn | Mua tiếp theo |CB[2]│
│ 29A-123.45  | 01/01/2026    | 31/12/2026   | 01/01/2027     |  │
│ 29A-678.90  | 15/01/2026    | 14/01/2027   | 15/01/2027     |  │
│ (scroll xuống xem thêm)                                          │
│                                                                    │
│ [ + Thêm bản ghi bảo hiểm ]                                   [3]│
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Chọn xe | Dropdown | Select | • Giống `so-baoduong`/`so-dangkiem`. |
| 2 | Bảng lịch sử bảo hiểm | Label (bảng) | ReadOnly | • "Mua tiếp theo" gợi ý = ngày hết hạn + 1 ngày (đơn giản hoá theo GAP; không có chu kỳ tháng riêng như 2 sổ kia). Cột "CB" cảnh báo khi gần ngày hết hạn (OQ-8). |
| 3 | Thêm bản ghi bảo hiểm | Button (primary) | Click | • Mở form: chọn xe, ngày mua, ngày hết hạn, đính kèm file (nếu có). |
