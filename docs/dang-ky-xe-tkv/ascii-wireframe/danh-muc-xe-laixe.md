# Flow: Danh mục xe & lái xe

> Màn hình thuộc flow này: danh-muc-xe-list → danh-muc-xe-form, danh-muc-laixe-list → danh-muc-laixe-form / danh-muc-laixe-detail. Flow tổng xem `../srs/dang-ky-xe-tkv-userflow.md` Mục 1.

---

## Screen: danh-muc-xe-list — Danh mục xe

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Danh mục xe                                    [ + Thêm xe ]     │
├──────────────────────────────────────────────────────────────────┤
│ Tìm kiếm: [________________]                                     │
│ Đơn vị: [v: Tất cả          ]   Trạng thái: [v: Tất cả       ][1]│
├──────────────────────────────────────────────────────────────────┤
│ Biển số   | Loại xe      | Đơn vị QL   | Lái xe biên chế | TT [2]│
│ 29A-123.45| Ford Transit | VP trụ sở   | Lê Văn D        | HĐ    │
│ 29A-678.90| Toyota Innova| VP trụ sở   | Phạm Văn E      | HĐ    │
│ 15A-111.22| Ford Transit | VP Hạ Long  | Trần Văn F      | Ngừng │
│ (scroll xuống xem thêm)                                          │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Tìm kiếm + Lọc (đơn vị, trạng thái) | Textbox + Dropdown | Text + Select | • Không bắt buộc. Lọc theo biển số/loại xe (text), đơn vị quản lý (2 văn phòng — GAP A1 "không đăng ký chéo"), trạng thái (Đang hoạt động/Ngừng sử dụng).<br>• Người dùng thuộc 1 văn phòng mặc định chỉ thấy xe của văn phòng mình (phân quyền phạm vi đơn vị — đối chiếu `phan-quyen-thamso`), trừ khi có quyền xem toàn bộ. |
| 2 | Bảng danh sách xe | Label (bảng) + Link mỗi dòng | ReadOnly + Click | • Click 1 dòng → điều hướng `danh-muc-xe-form` (chế độ sửa).<br>• Cột "TT" (trạng thái) hiển thị "HĐ" (đang hoạt động) hoặc "Ngừng" (đã ngừng sử dụng) — xe "Ngừng" bị loại khỏi danh sách gợi ý ở màn `cap-xe` (flow `cap-xe-dieudong`). |

---

## Screen: danh-muc-xe-form — Thêm/sửa xe

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Thêm/sửa xe                                                       │
├──────────────────────────────────────────────────────────────────┤
│ Biển số        [________________]                            [1]│
│ Loại xe        [________________]                                │
│ Đơn vị quản lý [v: VP trụ sở chính            ]                  │
│ Lái xe biên chế cố định [v: -- chọn lái xe --  ]              [2]│
│                                                                    │
│ Chu kỳ đăng kiểm                                              [3]│
│  Ngày đăng kiểm gần nhất [__/__/____]  Chu kỳ (tháng) [____]     │
│ Chu kỳ mua bảo hiểm                                               │
│  Ngày mua gần nhất       [__/__/____]  Chu kỳ (tháng) [____]     │
│ Chu kỳ bảo dưỡng                                                  │
│  Ngày bảo dưỡng gần nhất [__/__/____]  Chu kỳ (tháng) [____]     │
│                                                                    │
│ Tổng km theo đăng ký xe : 12.450 km  (tự cộng dồn)           [4]│
│ Km công tơ thực tế      : 12.450 km  (tự cộng dồn)                │
│                                                                    │
│ Trạng thái                                                    [5]│
│ (*) Đang hoạt động                                                │
│ ( ) Ngừng sử dụng — Lý do: [v: -- chọn lý do --      ]           │
│                                                                    │
│ [ Lưu ]                                                           │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Biển số | Textbox | Text | • Bắt buộc, duy nhất. Trùng với xe khác đã tồn tại → chặn lưu, báo "Biển số đã tồn tại trong danh mục". |
| 2 | Lái xe biên chế cố định | Dropdown | Select | • Không bắt buộc. Là nguồn gợi ý mặc định ở màn `cap-xe` (flow `cap-xe-dieudong`) khi cấp xe — người điều vận vẫn chọn được lái xe khác tại đó (GAP A1 "gợi ý khi cấp xe, cho phép chọn lái xe khác"). |
| 3 | Chu kỳ đăng kiểm / bảo hiểm / bảo dưỡng | Datepicker + Textbox (số) | Text | • Không bắt buộc tại thời điểm tạo mới, nhưng cần để hệ thống tính ngày đến hạn tiếp theo và làm căn cứ cảnh báo (GAP A7/B5 — ngoài phạm vi đợt này, chỉ nhập dữ liệu nguồn ở đây). |
| 4 | Tổng km theo đăng ký xe / Km công tơ thực tế | Label (số) | ReadOnly | • Tự động cộng dồn từ các phiếu xác nhận đi về (`xacnhan-diove-nhap`) — tính theo **vòng đời xe, không phân biệt đơn vị quản lý** (GAP A1). Không sửa tay được ở màn này. |
| 5 | Trạng thái | Radio + Dropdown (ẩn/hiện) | Select | • Bắt buộc chọn 1 trong 2. Chọn "Ngừng sử dụng" → bắt buộc chọn lý do (thanh lý / đang sửa chữa dài hạn / khác).<br>• Xe "Ngừng sử dụng" bị loại khỏi danh sách gợi ý xe trống ở `cap-xe` — validate: không cho chuyển "Ngừng sử dụng" nếu xe đang có phiếu ở trạng thái "Đã cấp xe" chưa hoàn tất (chặn lưu, báo rõ mã phiếu đang dùng xe này). |

---

## Screen: danh-muc-laixe-list — Danh mục lái xe

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Danh mục lái xe                              [ + Thêm lái xe ]   │
├──────────────────────────────────────────────────────────────────┤
│ Tìm kiếm: [________________]                                     │
│ Đơn vị: [v: Tất cả          ]   Trạng thái: [v: Tất cả       ][1]│
├──────────────────────────────────────────────────────────────────┤
│ Họ tên      | Đơn vị      | Hạng GPLX | GPLX hết hạn | TT    [2]│
│ Lê Văn D    | VP trụ sở   | D         | 12/2028      | Đang LV │
│ Phạm Văn E  | VP trụ sở   | C         | 03/2027      | Đang LV │
│ Trần Văn F  | VP Hạ Long  | B2        | 01/2026      | Ngừng   │
│ (scroll xuống xem thêm)                                          │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Tìm kiếm + Lọc (đơn vị, trạng thái) | Textbox + Dropdown | Text + Select | • Tương tự `danh-muc-xe-list`, lọc theo đơn vị + trạng thái (Đang làm việc/Ngừng sử dụng). |
| 2 | Bảng danh sách lái xe | Label (bảng) + Link mỗi dòng | ReadOnly + Click | • Click 1 dòng → điều hướng `danh-muc-laixe-detail` (xem hồ sơ).<br>• Cột "GPLX hết hạn" đã qua hạn → hiển thị highlight cảnh báo (màu đỏ trong bản màu thật; ASCII lo-fi không thể hiện màu). |

---

## Screen: danh-muc-laixe-form — Thêm/sửa lái xe

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Thêm/sửa lái xe                                                   │
├──────────────────────────────────────────────────────────────────┤
│ Họ tên          [________________]                           [1]│
│ Đơn vị          [v: VP trụ sở chính            ]                 │
│ Số điện thoại   [________________]                               │
│                                                                    │
│ Giấy phép lái xe                                              [2]│
│  Hạng          [v: -- chọn hạng --   ]                            │
│  Ngày cấp      [__/__/____]                                      │
│  Ngày hết hạn  [__/__/____]                                      │
│  Ảnh GPLX      [ Tải ảnh lên ]   (chưa có ảnh)                   │
│                                                                    │
│ Trạng thái                                                    [3]│
│ (*) Đang làm việc                                                 │
│ ( ) Ngừng sử dụng — Lý do: [v: -- chọn lý do --      ]           │
│                                                                    │
│ [ Lưu ]                                                           │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Họ tên / Đơn vị / Số điện thoại | Textbox + Dropdown | Text + Select | • Bắt buộc. Trùng số điện thoại/GPLX với lái xe khác đã tồn tại → chặn lưu, báo "Đã tồn tại lái xe với GPLX/số điện thoại này". |
| 2 | Giấy phép lái xe (hạng/ngày cấp/hết hạn/ảnh) | Dropdown + Datepicker + Upload | Select + Text + File | • Bắt buộc hạng + ngày hết hạn. Ngày hết hạn đã qua hiện tại → không chặn lưu (vẫn cho lưu để ghi nhận), nhưng hiển thị cảnh báo ngay trên form "GPLX đã hết hạn — cần cập nhật trước khi phân công chuyến".<br>• Ảnh GPLX không bắt buộc. |
| 3 | Trạng thái | Radio + Dropdown (ẩn/hiện) | Select | • Bắt buộc chọn 1 trong 2. Chọn "Ngừng sử dụng" → bắt buộc chọn lý do (nghỉ việc / GPLX hết hạn không gia hạn / khác).<br>• Lái xe "Ngừng sử dụng" bị loại khỏi gợi ý biên chế ở `danh-muc-xe-form` [2] và gợi ý điều vận ở `cap-xe`. |

---

## Screen: danh-muc-laixe-detail — Chi tiết lái xe

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Hồ sơ lái xe — Lê Văn D                    [ Sửa hồ sơ ]         │
├──────────────────────────────────────────────────────────────────┤
│  Đơn vị: VP trụ sở chính     SĐT: 090xxxxxxx     TT: Đang LV     │
│  GPLX: Hạng D, hết hạn 12/2028                                    │
│                                                                    │
│ [ Lịch sử phục vụ ]  [ Đánh giá ]                             [1]│
│ ┌────────────────────────────────────────────────────────────┐  │
│ │ Ngày       | Lộ trình            | Km    | Đánh giá          │  │
│ │ 05/08/2026 | Hà Nội - Hạ Long    | 110   | 4/5                │  │
│ │ 01/08/2026 | Nội thành Hà Nội    | 35    | 5/5                │  │
│ └────────────────────────────────────────────────────────────┘  │
│ (scroll xuống xem thêm)                                      [2]│
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Tab Lịch sử phục vụ / Đánh giá | Tab | Click | • "Lịch sử phục vụ": liệt kê các chuyến đã lái, tổng hợp từ phiếu đã hoàn tất — read-only, không nhập tay.<br>• "Đánh giá": tổng hợp điểm đánh giá + ý kiến từ `xacnhan-diove-banxacnhan` (đại diện các ban đánh giá) — read-only.<br>• **Không có tab "vi phạm"/"tai nạn" ở đợt này** (đã bỏ theo quyết định — nguồn dữ liệu GAP ghi "thống kê từ dữ liệu liên kết" nhưng chưa xác định liên kết từ đâu). |
| 2 | Bảng lịch sử (trong tab) | Label (bảng) | ReadOnly | • Mỗi dòng 1 chuyến: ngày, lộ trình, km đã chia cho chuyến đó, điểm đánh giá trung bình của chuyến. Dài → scroll. |
