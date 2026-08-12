# Flow: Cấp xe & điều động

> Màn hình thuộc flow này: cap-xe → ghep-xe → doi-laixe → laixe-xacnhan-chuyen. Flow tổng xem `../srs/dang-ky-xe-tkv-userflow.md` Mục 1.

---

## Screen: cap-xe — Cấp xe / điều động

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Cấp xe / điều động — Phiếu DKX-0231     < Xem chi tiết phiếu >   │
├──────────────────────────────────────────────────────────────────┤
│  Lộ trình: Hà Nội - Hạ Long, 05/08/2026 07:00                    │
│  Đơn vị tham gia: Ban Tổ chức (3), Ban Kỹ thuật (2)               │
│                                                                    │
│ Gợi ý xe trống (theo kế hoạch điều vận)                      [1] │
│ ┌────────────────────────────────────────────────────────────┐  │
│ │(*)29A-123.45 | Ford Transit | Lái xe biên chế: Lê Văn D      │  │
│ │( )29A-678.90 | Toyota Innova| Lái xe biên chế: Phạm Văn E    │  │
│ └────────────────────────────────────────────────────────────┘  │
│ (!) Không có xe trống phù hợp? < Xem toàn bộ danh sách xe >  [2] │
│                                                                    │
│ Lái xe thực hiện                                              [3]│
│ (*) Lê Văn D (biên chế theo xe)                                  │
│ ( ) Chọn lái xe khác: [v: -- chọn lái xe --          ]           │
│                                                                    │
│ [ Ghép với phiếu khác cùng lộ trình > ]                      [4] │
│                                                                    │
│ [ Cấp xe ]                                                   [5] │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Danh sách xe gợi ý | Radio (bảng) | Select | • Hệ thống tự gợi ý xe trống theo kế hoạch điều vận (đối chiếu lịch các xe đã cấp cho phiếu khác cùng khung giờ) + lái xe biên chế cố định theo từng xe (GAP A1/A5).<br>• Chọn 1 xe → tự điền lái xe biên chế tương ứng ở mục [3]. |
| 2 | Cảnh báo không có xe trống | Label (warning) + Link | ReadOnly + Click | • Hiện khi không có xe nào trống trùng khung giờ. Click `< Xem toàn bộ danh sách xe >` → mở danh sách đầy đủ (kể cả xe đang bận) để điều vận thủ công linh hoạt. |
| 3 | Lái xe thực hiện | Radio + Dropdown | Select | • Mặc định chọn lái xe biên chế cố định theo xe đã chọn ở [1]; cho phép override chọn lái xe khác (GAP A1 "gợi ý khi cấp xe, cho phép chọn lái xe khác"). |
| 4 | Ghép với phiếu khác cùng lộ trình | Button (secondary, link) | Click | • Điều hướng sang `ghep-xe`, mang theo phiếu hiện tại làm phiếu gốc để chọn ghép thêm các phiếu khác cùng lộ trình/khung giờ (B3). Không bắt buộc — chỉ dùng khi có phiếu khác trùng lộ trình. |
| 5 | Cấp xe | Button (primary) | Click | • Xác nhận gán xe + lái xe cho phiếu. Thành công → trạng thái phiếu "Đã cấp xe", điều hướng `laixe-xacnhan-chuyen` (thông báo tới lái xe).<br>• Validate: phải chọn đúng 1 xe ở [1] trước khi bấm. |

---

## Screen: ghep-xe — Ghép xe

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Ghép xe — cùng lộ trình với DKX-0231    < Quay lại cấp xe >      │
├──────────────────────────────────────────────────────────────────┤
│  Xe / lái xe đã chọn: 29A-123.45 / Lê Văn D                      │
│  Lộ trình gốc: Hà Nội - Hạ Long, 05/08/2026 07:00                │
│                                                                    │
│ Phiếu khác cùng lộ trình + khung giờ                         [1] │
│ ┌────────────────────────────────────────────────────────────┐  │
│ │[x] DKX-0233 | Ban Kế hoạch (2 người) | 05/08 07:15           │  │
│ │[ ] DKX-0235 | Ban Tài chính (1 người)| 05/08 08:00            │  │
│ └────────────────────────────────────────────────────────────┘  │
│                                                                    │
│ (info) Sau chuyến, km sẽ tự chia theo từng phiếu gốc và      [2] │
│        sinh riêng phiếu xác nhận đi về cho mỗi đơn vị.            │
│                                                                    │
│ [ Xác nhận ghép xe ]                                          [3]│
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Danh sách phiếu cùng lộ trình | Checkbox (bảng) | Check | • Liệt kê các phiếu đăng ký khác (có thể khác đơn vị) đã duyệt xong, cùng lộ trình + khung giờ gần với phiếu gốc — chọn nhiều để ghép chung 1 xe (GAP B3).<br>• Không giới hạn số phiếu ghép, nhưng nên hiển thị cảnh báo nếu tổng số người vượt sức chứa xe (không có số liệu cụ thể từ GAP — cần TKV xác nhận thêm, tạm ghi Open Question ở `srs-baket` sau nếu chạy tiếp). |
| 2 | Ghi chú hệ quả ghép xe | Label (info) | ReadOnly | • Nhắc rõ hệ quả nghiệp vụ: 1 chuyến ghép nhiều phiếu → khi xác nhận đi về, hệ thống tách sinh N phiếu xác nhận riêng theo từng đơn vị gốc (đúng theo GAP B3 "mỗi phiếu xác nhận đi về tương ứng"). |
| 3 | Xác nhận ghép xe | Button (primary) | Click | • Gán chung xe/lái xe (đã chọn ở `cap-xe`) cho phiếu gốc + các phiếu vừa tick chọn.<br>• Thành công → tất cả phiếu trong nhóm chuyển trạng thái "Đã cấp xe", điều hướng về `laixe-xacnhan-chuyen`. |

---

## Screen: doi-laixe — Đổi lái xe

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Đổi lái xe — Phiếu DKX-0231                                       │
├──────────────────────────────────────────────────────────────────┤
│  Xe: 29A-123.45                                                   │
│  Lái xe hiện tại: Lê Văn D                                        │
│                                                                    │
│ Lái xe mới                                                    [1]│
│ [v: -- chọn lái xe --                    ]                       │
│                                                                    │
│ Lý do đổi                                                      [2]│
│ [________________________________________________________]      │
│                                                                    │
│ [ Hủy ]                                    [ Xác nhận đổi ]  [3]│
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Lái xe mới | Dropdown | Select | • Bắt buộc. Danh sách lái xe khác (loại trừ lái xe hiện tại), lọc theo còn rảnh trong khung giờ chuyến. |
| 2 | Lý do đổi | Textbox | Text | • Không bắt buộc theo GAP (chỉ ghi "cho phép đổi lái xe khi phát sinh"), nhưng nên có để phục vụ audit log (đối chiếu GAP A10 "ghi log mọi thao tác"). |
| 3 | Xác nhận đổi | Button (primary) | Click | • Có thể trigger từ `cap-xe`, `ghep-xe`, hoặc `laixe-xacnhan-chuyen` (trước khi khởi hành) — theo đúng nhánh đa điểm đã chốt ở user flow.<br>• Thành công → cập nhật lái xe cho phiếu (và mọi phiếu cùng nhóm ghép nếu có), quay lại màn xuất phát (nơi user vừa bấm "Đổi lái xe"), ghi log lịch sử xử lý. |

---

## Screen: laixe-xacnhan-chuyen — Lái xe xác nhận chuyến

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Xác nhận chuyến — DKX-0231                                        │
├──────────────────────────────────────────────────────────────────┤
│  Lộ trình      : Hà Nội - Hạ Long                                 │
│  Thời gian đi  : 05/08/2026 07:00                                 │
│  Người đăng ký : Nguyễn Văn A (Ban Tổ chức)                       │
│  Xe            : 29A-123.45                                       │
│                                                                    │
│ (info) Bạn đã được phân công chuyến này. Vui lòng xác nhận  [1] │
│        trước giờ khởi hành.                                       │
│                                                                    │
│ [ Yêu cầu đổi lái xe ]                  [ Xác nhận nhận chuyến ]│
│                                                                [2]│
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Thông báo phân công | Label (info) | ReadOnly | • Lái xe nhận thông báo khi được cấp xe (đối chiếu GAP A8 "cấp xe → lái xe (app)" — bản đợt này vẽ khung desktop, kênh thông báo cụ thể ngoài phạm vi). |
| 2 | Xác nhận nhận chuyến / Yêu cầu đổi lái xe | Button (primary) / Button (secondary) | Click | • "Xác nhận nhận chuyến": trạng thái phiếu chuyển "Lái xe đã xác nhận", điều hướng tiếp `xacnhan-diove-nhap` sau khi chuyến kết thúc.<br>• "Yêu cầu đổi lái xe": điều hướng `doi-laixe` — nhánh phát sinh có thể trigger ngay cả sau bước này, trước khi khởi hành thực tế. |
