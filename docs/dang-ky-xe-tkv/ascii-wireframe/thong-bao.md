# Flow: Thông báo

> Màn hình thuộc flow này: thong-bao-list → thong-bao-cauhinh. Flow tổng xem `../srs/dang-ky-xe-tkv-userflow.md` Mục 1.

---

## Screen: thong-bao-list — Trung tâm thông báo

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Thông báo                                    [ Cấu hình kênh ]   │
├──────────────────────────────────────────────────────────────────┤
│ Trạng thái: [v: Tất cả  ]  Loại: [v: Tất cả sự kiện        ][1]│
├──────────────────────────────────────────────────────────────────┤
│ (*) Phiếu DKX-0231 chờ bạn duyệt              05/08 09:00   [2]│
│ ( ) Xe 29A-123.45 đã cấp cho DKX-0230          05/08 08:30    │
│ ( ) Xe 29A-678.90 sắp đến hạn đăng kiểm (còn 5 ngày) 04/08     │
│ (scroll xuống xem thêm)                                          │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Lọc (trạng thái đọc, loại sự kiện) | Dropdown | Select | • Không bắt buộc. Danh sách rỗng (chưa có thông báo) hiển thị empty state "Chưa có thông báo nào". |
| 2 | Danh sách thông báo | Label (list) + Link mỗi dòng | ReadOnly + Click | • (*) = chưa đọc, ( ) = đã đọc. Click 1 dòng → đánh dấu đã đọc + điều hướng tới màn nghiệp vụ tương ứng: đăng ký mới → `lanhdao-xacnhan`/`cvp-duyet`; cấp xe → `laixe-xacnhan-chuyen`; sắp đến hạn → `so-dangkiem`/`so-baohiem`/`so-baoduong` tương ứng.<br>• **Không có sự kiện "sắp hết định biên km"** ở đợt này — `dinh-bien-km-list` (đã duyệt) chưa có cơ chế tính đã dùng/còn lại nên chưa có gì để cảnh báo. |

---

## Screen: thong-bao-cauhinh — Cấu hình kênh thông báo

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Cấu hình kênh thông báo               < Quay lại thông báo >    │
├──────────────────────────────────────────────────────────────────┤
│ Sự kiện                          | App | Chuông | SMS | Email[1]│
│ Đăng ký mới (→ người duyệt)      | [x] | [x]    | [ ] | [ ]   │
│ Cấp xe (→ lái xe)                 | [x] | [x]    | [x] | [ ]   │
│ Sắp đến hạn đăng kiểm/BH/BD       | [x] | [ ]    | [ ] | [x]   │
│                                                                    │
│ (info) Ngưỡng "sắp đến hạn" áp dụng theo cấu hình chung của  [2]│
│        3 sổ theo dõi định kỳ (chưa chốt số ngày cụ thể).          │
│                                                                    │
│ [ Lưu ]                                                           │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Ma trận kênh theo sự kiện | Checkbox (bảng) | Check | • Bật/tắt độc lập từng ô (GAP A8: app mobile/chuông/SMS/email). Không cấu hình dòng nào → mặc định dùng kênh "App". |
| 2 | Ghi chú ngưỡng cảnh báo | Label (info) | ReadOnly | • Nhắc rõ: số ngày "sắp đến hạn" chưa chốt (OQ-8, ở `so-dangkiem`/`so-baohiem`/`so-baoduong`) — cấu hình kênh ở đây độc lập với ngưỡng đó. |
