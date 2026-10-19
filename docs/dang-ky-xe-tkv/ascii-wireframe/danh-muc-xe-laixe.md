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
│ Thêm/sửa xe                                                      │
├──────────────────────────────────────────────────────────────────┤
│ Biển số * [__________]   Loại xe * [v ___________]           [1] │
│ Đơn vị quản lý * [v ________]  Ngày sử dụng * [__/__/____]       │
│ Lái xe * [v -- chọn lái xe --]      Số chỗ [__]              [2] │
│ Tình trạng xe [v Xe mới]   Đơn vị sử dụng [v ___________]        │
│ Thông tin khác: dung tích động cơ, hộp số, năm SX, nguồn     [3] │
│ gốc, màu sơn, ngày mua, ngày đăng ký lần đầu/mới nhất,           │
│ ngày biên chế về đội xe, mục đích/phạm vi sử dụng, ảnh, mô tả    │
├──────────────────────────────────────────────────────────────────┤
│ Thông tin bổ sung                                            [4] │
│ Thời gian kiểm định [v 3 tháng]  Mua bảo hiểm [v 3 tháng]        │
│ Số Km bảo dưỡng [______] km                                      │
│ Gần nhất: đăng kiểm [__/__/____]  bảo hiểm [__/__/____]          │
│           bảo dưỡng [__/__/____]                                 │
│ Tổng km theo đăng ký xe : 0 km (tự cộng dồn)                 [5] │
│ Km công tơ thực tế      : 0 km (tự cộng dồn)                     │
│ Trạng thái hoạt động [v Đang hoạt động]                      [6] │
│ Lý do ngừng sử dụng  [____________] (bắt buộc khi Ngừng)         │
├──────────────────────────────────────────────────────────────────┤
│ Định mức nhiên liệu                                          [7] │
│ Loại nhiên liệu * (*) Xăng ( ) Dầu  Dung tích thùng * [__] lít   │
│ [ ] Xe phục vụ khai trường     Định mức riêng [____] lít/100km   │
│ Văn bản căn cứ [< Tải tệp lên >]  Hiệu lực từ [__/__/____]       │
│ Đang áp dụng (tự tính): 18,7 lít/100km                       [8] │
│   = 17,0 (loại xe) x 1,10 (tuổi xe, nhóm C) x 1,00 (khai trường) │
│   < Xem lịch sử định mức >                                       │
│                                                                  │
│ [ Lưu ]  [ Lưu và đóng ]  [ Đóng ]                               │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Biển số / Loại xe | Textbox + Dropdown | Text + Select | • Biển số bắt buộc, duy nhất. Trùng xe khác → chặn lưu, báo "Biển số đã tồn tại trong danh mục".<br>• Loại xe bắt buộc, chọn từ danh mục loại xe (`loai-xe-list`) — loại xe quyết định định mức gốc (lít/100km) của xe. |
| 2 | Đơn vị quản lý / Ngày sử dụng / Lái xe / Số chỗ / Tình trạng xe / Đơn vị sử dụng | Dropdown + Datepicker + Textbox | Select + Text | • Đơn vị quản lý bắt buộc (VP trụ sở chính / VP Hạ Long, không đăng ký chéo trừ khi cấu hình mượn chéo cho phép).<br>• Ngày sử dụng bắt buộc — căn cứ tính TUỔI XE để xác định nhóm hệ số A (đến 7 năm) / B (trên 7 đến 14 năm) / C (trên 14 năm) ở `he-so-config` [GIẢ ĐỊNH — mốc tính tuổi chờ chốt, OQ-13].<br>• Lái xe (biên chế cố định theo xe) là nguồn gợi ý mặc định ở `cap-xe` (flow `cap-xe-dieudong`); người điều vận vẫn chọn được lái xe khác. Figma đánh dấu bắt buộc, trong khi bản trước ghi không bắt buộc (OQ-20).<br>• Số chỗ: số nguyên dương. Tình trạng xe: dropdown (mặc định "Xe mới"; danh mục giá trị chưa chốt, OQ-20). Đơn vị sử dụng: dropdown không bắt buộc. |
| 3 | Thông tin chung khác | Textbox + Datepicker + Upload | Text | • Không bắt buộc: dung tích động cơ, loại hộp số, năm sản xuất, nguồn gốc, màu sơn, ngày mua, ngày đăng ký lần đầu, ngày đăng ký mới nhất, ngày biên chế về đội xe, mục đích sử dụng, phạm vi sử dụng, ảnh xe (tải tệp), mô tả. Chỉ lưu thông tin, không tham gia tính toán. |
| 4 | Thời gian kiểm định / mua bảo hiểm / Số Km bảo dưỡng / ngày gần nhất | Dropdown + Textbox (số) + Datepicker | Select + Text | • Thời gian kiểm định và thời gian mua bảo hiểm: chọn chu kỳ (vd 3 tháng). Ngày đăng kiểm / mua bảo hiểm / bảo dưỡng gần nhất: nhập tay.<br>• Số Km bảo dưỡng (km): chu kỳ bảo dưỡng theo km (Figma không có chu kỳ bảo dưỡng theo tháng như bản trước — OQ-20).<br>• Không bắt buộc khi tạo mới, nhưng là dữ liệu nguồn để tính ngày đến hạn và cảnh báo ở 3 sổ định kỳ (`so-baoduong`, `so-dangkiem`, `so-baohiem`; ngưỡng cảnh báo OQ-8). |
| 5 | Tổng km theo đăng ký xe / Km công tơ thực tế | Label (số) | ReadOnly | • Tự cộng dồn từ các phiếu xác nhận đi về (`xacnhan-diove-nhap`) theo vòng đời xe, không phân biệt đơn vị quản lý. Không sửa tay được ở màn này. |
| 6 | Trạng thái hoạt động / Lý do ngừng sử dụng | Dropdown + Textbox | Select + Text | • Trạng thái hoạt động: Đang hoạt động / Ngừng sử dụng. Chọn "Ngừng sử dụng" → bắt buộc nhập lý do (ô nhập tự do; lý do thường gặp: thanh lý, sửa chữa dài hạn).<br>• Xe "Ngừng sử dụng" bị loại khỏi danh sách gợi ý xe trống ở `cap-xe`. Không cho chuyển "Ngừng sử dụng" nếu xe đang có phiếu "Đã cấp xe" chưa hoàn tất (chặn lưu, báo mã phiếu đang dùng xe). |
| 7 | Khối Định mức nhiên liệu | Radio + Textbox (số) + Checkbox + Button Tải tệp lên + Datepicker | Select + Text | • Loại nhiên liệu bắt buộc (Xăng / Dầu): quyết định xe vào Tổng xăng hay Tổng dầu ở `linh-ton-thang` (danh mục loại nhiên liệu cụ thể như Xăng A95, Dầu DO: OQ-18). Dung tích thùng bắt buộc, số dương (lít): là mức trần khi kiểm tra tồn ở `linh-ton-thang` và hóa đơn mua ngoài ở `mua-ngoai-popup`.<br>• "Xe phục vụ khai trường" (checkbox): xe bố trí phục vụ tại Trung tâm Điều hành sản xuất tại Quảng Ninh → nhân thêm hệ số 1,05 (xem `he-so-config`).<br>• Định mức riêng (lít/100km, tùy chọn): để trống thì dùng định mức gốc của loại xe; nhập thì thay thế định mức gốc từ ngày hiệu lực, có văn bản căn cứ kèm theo [GIẢ ĐỊNH — định mức riêng có nhân thêm hệ số tuổi/khai trường hay không: OQ-21].<br>• Hiệu lực từ ngày: ngày áp dụng khai báo nhiên liệu/định mức riêng này [GIẢ ĐỊNH]. Mỗi lần đổi ghi nhật ký, giữ lịch sử.<br>• Văn bản căn cứ: chỉ chọn tệp bằng nút Tải tệp lên, KHÔNG hỗ trợ kéo thả; tệp đã chọn hiện tên, dung lượng và nút xóa. |
| 8 | Định mức đang áp dụng (tự tính) + Xem lịch sử định mức | Label + Link | ReadOnly + Click | • Hiển thị định mức giao khoán đang áp dụng = định mức loại xe x hệ số tuổi x hệ số khai trường (vd 17,0 x 1,10 x 1,00 = 18,7 lít/100km), kèm diễn giải từng thành phần. Không nhập tay; thay thế ô "Định mức tiêu hao nhiên liệu" trước đây bị hiển thị trùng.<br>• Xem lịch sử định mức: mở danh sách các mốc định mức đã áp dụng cho xe này [GIẢ ĐỊNH — nội dung popup chưa thiết kế riêng]. |

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
