# Flow: Biểu mẫu động

> Màn hình thuộc flow này: bieumau-list → bieumau-form → xem trước → lưu bản active. Flow tổng xem `../srs/dang-ky-xe-tkv-userflow.md` Mục 1.

---

## Screen: bieumau-list — Danh mục biểu mẫu động

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Danh mục biểu mẫu động                     [ + Thêm biểu mẫu ]   │
├──────────────────────────────────────────────────────────────────┤
│ Đơn vị/khối: [v: Tất cả  ]  Loại: [v: Tất cả          ]      [1]│
├──────────────────────────────────────────────────────────────────┤
│ Tên biểu mẫu          | Đơn vị/khối | Loại          | TT     [2]│
│ Phiếu ĐK xe - VP HN   | VP trụ sở   | Đăng ký xe    | Active   │
│ Phiếu ĐK xe - Đảng ủy | Khối đảng   | Đăng ký xe    | Active   │
│ Phiếu XN đi về - VP HN| VP trụ sở   | Xác nhận đi về| Active   │
│ (scroll xuống xem thêm)                                          │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Lọc (đơn vị/khối, loại) | Dropdown | Select | • Không bắt buộc. |
| 2 | Bảng biểu mẫu | Label (bảng) + Link | ReadOnly + Click | • Click 1 dòng → điều hướng `bieumau-form` (chế độ sửa). Chỉ 1 biểu mẫu "Active" cho mỗi cặp đơn vị/khối + loại (validate khi active bản mới). |

---

## Screen: bieumau-form — Upload/cấu hình biểu mẫu

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Upload/cấu hình biểu mẫu                                          │
├──────────────────────────────────────────────────────────────────┤
│ Loại biểu mẫu     [v: Đăng ký xe            ]                [1]│
│ Đơn vị/khối áp dụng [v: VP trụ sở chính      ]                   │
│ File biểu mẫu (.docx) [ Tải lên ]   Đã chọn: mau-dkxe-vp.docx    │
│                                                                    │
│ Cấu hình vị trí/tên người duyệt-ký                            [2]│
│ ┌────────────────────────────────────────────────────────────┐  │
│ │ Vị trí ký       | Vai trò tương ứng                         │  │
│ │ Ô ký 1          | [v: Lãnh đạo Ban            ]             │  │
│ │ Ô ký 2          | [v: CVP/PCVP                ]             │  │
│ └────────────────────────────────────────────────────────────┘  │
│                                                                    │
│ Mapping trường dữ liệu insert                                 [3]│
│ [v: {ho_ten_nguoi_dang_ky}] → Ô "Người đăng ký" trên file        │
│ [ + Thêm mapping ]                                                │
│                                                                    │
│ [ Xem trước ]                                                 [4]│
└──────────────────────────────────────────────────────────────────┘
```

### Trạng thái: Xem trước (sau khi bấm "Xem trước")

```text
┌──────────────────────────────────────────────────────────────────┐
│ Xem trước biểu mẫu (dữ liệu mẫu)         < Quay lại chỉnh sửa >  │
├──────────────────────────────────────────────────────────────────┤
│  [ IMG: bản render file .docx với dữ liệu mẫu đã insert,        │
│         vị trí ký đánh dấu khung viền ]                           │
│                                                                    │
│ [ Cần chỉnh sửa ]                    [ Đạt yêu cầu, lưu active ]│
│                                                                [5]│
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Loại biểu mẫu / Đơn vị áp dụng / File upload | Dropdown + Upload | Select + File | • Bắt buộc cả 3. Chỉ nhận file .docx. |
| 2 | Cấu hình vị trí người ký | Dropdown (bảng) | Select | • Ánh xạ mỗi "ô ký" trên file tới 1 vai trò hệ thống (Lãnh đạo Ban/CVP-PCVP/đại diện ban...) — dùng khi hệ thống chèn chữ ký SignServer đúng vị trí lúc `cvp-duyet`/`xacnhan-diove-banxacnhan` (đã duyệt). |
| 3 | Mapping trường dữ liệu | Dropdown + Button | Select | • Ánh xạ field hệ thống (vd `{ho_ten_nguoi_dang_ky}`) tới vị trí insert trên file. |
| 4 | Xem trước | Button (primary) | Click | • **Bắt buộc** qua bước này trước khi có thể lưu bản active — không có đường tắt "Lưu" trực tiếp từ màn cấu hình. |
| 5 | Cần chỉnh sửa / Đạt yêu cầu, lưu active | Button (secondary/primary) | Click | • "Cần chỉnh sửa": quay lại `bieumau-form` giữ nguyên dữ liệu đã nhập.<br>• "Đạt yêu cầu, lưu active": kích hoạt bản này, các phiếu **đang xử lý dở** (đã gen trước đó) giữ nguyên bản template snapshot cũ, chỉ phiếu **mới gen sau thời điểm này** dùng bản active mới. |
