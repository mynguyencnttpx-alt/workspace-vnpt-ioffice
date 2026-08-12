# Flow: Đăng ký & duyệt xe

> Màn hình thuộc flow này: dk-xe-form → dk-xe-list → dk-xe-detail → lanhdao-xacnhan → cvp-duyet. Flow tổng xem `../srs/dang-ky-xe-tkv-userflow.md` Mục 1.

---

## Screen: dk-xe-form — Form đăng ký xe

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Đăng ký xe                                                        │
├──────────────────────────────────────────────────────────────────┤
│ Người đăng ký : Nguyễn Văn A (Ban Tổ chức)                        │
│ Đơn vị đăng ký: [v: Ban Tổ chức - Hành chính        ]             │
│                                                                    │
│ Mục đích / lộ trình chuyến đi                                [1] │
│ [________________________________________________________]      │
│                                                                    │
│ Thời gian đi         [__/__/____ __:__]                          │
│ Thời gian về dự kiến [__/__/____ __:__]                          │
│                                                                    │
│ Đơn vị tham gia chuyến đi                                    [2] │
│ ┌────────────────────────────────────────────────────────────┐  │
│ │ Đơn vị               | Số người   |                        │  │
│ │ [v: Ban Tổ chức    ] | [___]      | [ Xóa ]                 │  │
│ │ [v: Ban Kỹ thuật   ] | [___]      | [ Xóa ]                 │  │
│ └────────────────────────────────────────────────────────────┘  │
│ [ + Thêm đơn vị ]                                                 │
│                                                                    │
│ Văn bản liên quan (nếu có)                                        │
│ [ < Đính kèm / chọn văn bản > ]   Đã chọn: Không có               │
│                                                                    │
│ Hạch toán km                                                 [3] │
│ (*) Km chung theo đơn vị                                          │
│ ( ) Hạch toán cho ban khác:      [v: -- chọn ban --      ]        │
│ ( ) Hạch toán cho cá nhân đặc thù: [v: -- chọn người --  ]        │
│                                                                    │
│ [ ] Đăng ký backdate (chuyến đã hoàn thành, nhập sau)        [4] │
│    Xe đã sử dụng     [v: -- chọn xe --      ]                    │
│    Lái xe đã sử dụng [v: -- chọn lái xe --   ]                   │
│                                                                    │
│ [ Lưu nháp ]    [ Gen biểu mẫu đăng ký xe ]    [ Gửi đăng ký ]   │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Mục đích / lộ trình chuyến đi | Textbox | Text | • Bắt buộc. Mô tả điểm đi–đến/mục đích chuyến (vd "Hà Nội – Hạ Long, họp giao ban").<br>• Cùng với Thời gian đi/về xác định lộ trình dùng để đối chiếu "cùng lộ trình" khi gợi ý ghép xe (B3).<br>• Điều hướng: dữ liệu này hiển thị lại xuyên suốt các bước duyệt sau (`dk-xe-detail`, `lanhdao-xacnhan`, `cvp-duyet`). |
| 2 | Đơn vị tham gia chuyến đi (bảng động) | Dropdown + Textbox (nhiều dòng) | Select + Text | • Bắt buộc ≥1 dòng. Chọn đơn vị + nhập số người mỗi đơn vị — dùng làm căn cứ chia km định biên khi xác nhận đi về (A6).<br>• `[ + Thêm đơn vị ]` thêm dòng mới; `[ Xóa ]` xóa dòng (validate còn ≥1 dòng).<br>• Là nguồn xác định danh sách "ban phải xác nhận đi về" — **bắt buộc tất cả các đơn vị ở đây xác nhận thì phiếu xác nhận đi về mới hoàn tất** (business rule đã chốt). |
| 3 | Hạch toán km | Radio | Select | • Bắt buộc chọn 1 trong 3: km chung theo đơn vị / hạch toán cho ban khác / hạch toán cho cá nhân đặc thù.<br>• Chọn "ban khác" hoặc "cá nhân đặc thù" → hiện dropdown chọn tương ứng (bắt buộc nếu đã chọn radio đó).<br>• Ảnh hưởng trực tiếp cách chia km ở màn `xacnhan-diove-nhap`. |
| 4 | Đăng ký backdate | Checkbox + 2 dropdown ẩn/hiện | Check + Select | • Tùy chọn. Dùng khi chuyến đã hoàn thành, nhập thủ tục sau (kể cả chuyến phát sinh đưa đón khách).<br>• Check → hiện bắt buộc "Xe đã sử dụng" + "Lái xe đã sử dụng" (vì hệ thống sẽ bỏ qua bước Cấp xe/điều động và Lái xe xác nhận chuyến).<br>• Navigation: sau khi CVP/PCVP duyệt (`cvp-duyet`), backdate = có → đi thẳng `xacnhan-diove-nhap` (bỏ qua flow `cap-xe-dieudong`); backdate = không → đi `cap-xe` như luồng thường. |
| 5 | Gen biểu mẫu đăng ký xe | Button (secondary) | Click | • Sinh file biểu mẫu đăng ký xe từ dữ liệu đã nhập trên form (template động theo đơn vị — xem GAP B2, ngoài phạm vi đợt này).<br>• Không bắt buộc trước khi Gửi đăng ký. |
| 6 | Gửi đăng ký | Button (primary) | Click | • Validate đủ trường bắt buộc (mục đích, thời gian, ≥1 đơn vị tham gia, hạch toán, và 2 field xe/lái xe nếu backdate).<br>• Thành công → tạo phiếu trạng thái "Chờ xác nhận"/"Chờ duyệt" tùy cấu hình đơn vị, điều hướng sang `dk-xe-list`. |

---

## Screen: dk-xe-list — Danh sách phiếu đăng ký

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Danh sách phiếu đăng ký xe                    [ + Đăng ký mới ]  │
├──────────────────────────────────────────────────────────────────┤
│ Tìm kiếm: [________________]   Trạng thái: [v: Tất cả        ]   │
│ Từ ngày [__/__/____]  Đến ngày [__/__/____]        [ Lọc ]  [1]  │
├──────────────────────────────────────────────────────────────────┤
│ Mã phiếu | Người ĐK | Lộ trình      | Ngày đi   | Trạng thái  [2]│
│ DKX-0231 | Ng.Văn A | HN - Hạ Long  | 05/08/26  | Chờ LĐ Ban     │
│ DKX-0230 | Tr.Thị B | HN - Sân bay  | 04/08/26  | CVP đang duyệt │
│ DKX-0229 | Ph.Văn C | Nội thành HN  | 03/08/26  | Đã cấp xe      │
│ DKX-0228 | Ng.Văn A | HN - Hạ Long  | 01/08/26  | Đã hủy         │
│ (scroll xuống xem thêm)                                          │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Tìm kiếm + Lọc (trạng thái, khoảng ngày) | Textbox + Dropdown + Button | Text + Select + Click | • Không bắt buộc. Lọc theo mã phiếu/người đăng ký (text), trạng thái (dropdown gồm các trạng thái ở Mục 3.5 userflow), khoảng ngày đi.<br>• Click "Lọc" → refresh bảng danh sách theo điều kiện. |
| 2 | Bảng danh sách phiếu | Label (bảng) + Link mỗi dòng | ReadOnly + Click | • Click 1 dòng → điều hướng `dk-xe-detail` của phiếu đó.<br>• Trạng thái hiển thị theo đúng bước hiện tại trong luồng duyệt 5 bước (Mục 3.5 userflow): Chờ LĐ Ban / CVP đang duyệt / Đã cấp xe / Lái xe đã xác nhận / Chờ xác nhận đi về / Hoàn tất / Đã hủy / Đã từ chối.<br>• Danh sách dài → scroll, không phân trang ở bản lo-fi này. |

---

## Screen: dk-xe-detail — Chi tiết phiếu đăng ký

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Phiếu đăng ký DKX-0231                 < Quay lại danh sách >    │
├──────────────────────────────────────────────────────────────────┤
│ Trạng thái: Chờ Lãnh đạo Ban xác nhận                        [1] │
│                                                                    │
│ Tiến trình duyệt                                             [2] │
│ (*)Đăng ký -> ( )LĐ Ban -> ( )CVP/PCVP -> ( )Cấp xe -> ( )Lái xe  │
│                                                                    │
│ Thông tin chuyến đi                                               │
│  Người đăng ký    : Nguyễn Văn A (Ban Tổ chức)                    │
│  Lộ trình          : Hà Nội - Hạ Long                             │
│  Thời gian         : 05/08/2026 07:00 - dự kiến 18:00            │
│  Đơn vị tham gia   : Ban Tổ chức (3 người), Ban Kỹ thuật (2)      │
│  Hạch toán         : Km chung theo đơn vị                        │
│  Backdate          : Không                                        │
│                                                                    │
│ Lịch sử xử lý                                                [3] │
│  05/08 08:00 - Nguyễn Văn A tạo phiếu                             │
│                                                                    │
│ [ Sửa phiếu ]              [ Hủy phiếu ]                     [4] │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Trạng thái phiếu | Label | ReadOnly | • Hiển thị đúng 1 trong các trạng thái tại thời điểm hiện tại (xem Mục 3.5 userflow) — màn này dùng chung xuyên suốt cả 3 flow, tra cứu được ở bất kỳ giai đoạn nào của vòng đời phiếu. |
| 2 | Tiến trình duyệt (stepper) | Label | ReadOnly | • Hiển thị 5 bước: Đăng ký → LĐ Ban → CVP/PCVP → Cấp xe → Lái xe xác nhận. Nếu đơn vị tắt cấu hình "LĐ Ban xác nhận" → bước đó hiển thị dạng bỏ qua (gạch nối, không phải bước bị bỏ lỡ). |
| 3 | Lịch sử xử lý | Label (timeline) | ReadOnly | • Log mọi thao tác trên phiếu (tạo, xác nhận, duyệt, yêu cầu bổ sung, từ chối, hủy...) kèm người thực hiện + thời gian — phục vụ audit log (đối chiếu GAP A10). |
| 4 | Sửa phiếu / Hủy phiếu | Button (secondary) / Button (danger) | Click | • "Sửa phiếu": chỉ khả dụng khi trạng thái ở bước Đăng ký hoặc đang "Yêu cầu bổ sung" — điều hướng lại `dk-xe-form` với dữ liệu hiện có.<br>• "Hủy phiếu": khả dụng khi phiếu chưa hoàn tất (chưa tới trạng thái Hoàn tất/Đã từ chối). Xác nhận hủy → trạng thái "Đã hủy". Nếu phiếu thuộc nhóm ghép xe (B3) → hệ thống tự động **tính lại km cho các phiếu còn lại trong nhóm theo phần còn tham gia** (business rule đã chốt với khách hàng). |

---

## Screen: lanhdao-xacnhan — Lãnh đạo Ban xác nhận

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Lãnh đạo Ban xác nhận — Phiếu DKX-0231                            │
├──────────────────────────────────────────────────────────────────┤
│  Người đăng ký: Nguyễn Văn A (Ban Tổ chức)                        │
│  Lộ trình     : Hà Nội - Hạ Long, 05/08/2026                     │
│  (xem đầy đủ tại < Chi tiết phiếu >)                              │
│                                                                    │
│ Ý kiến (bắt buộc nếu yêu cầu bổ sung / từ chối)              [1] │
│ [________________________________________________________]      │
│                                                                    │
│ [ Duyệt ]   [ Yêu cầu bổ sung ]   [ Từ chối dứt điểm ]       [2] │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Ý kiến | Text area | Text | • Bắt buộc khi bấm "Yêu cầu bổ sung" hoặc "Từ chối dứt điểm" (validate rỗng thì chặn 2 nút này); không bắt buộc khi "Duyệt".<br>• Nội dung hiển thị lại cho Chuyên viên Ban ở `dk-xe-detail` Mục Lịch sử xử lý. |
| 2 | Duyệt / Yêu cầu bổ sung / Từ chối dứt điểm | Button (primary/secondary/danger) | Click | • "Duyệt" → điều hướng sang `cvp-duyet` (bước tiếp theo).<br>• "Yêu cầu bổ sung" → phiếu về trạng thái "Yêu cầu bổ sung", điều hướng Chuyên viên về `dk-xe-form` để sửa; sau khi sửa gửi lại, quay lại đúng bước này (không cần duyệt lại từ đầu).<br>• "Từ chối dứt điểm" → trạng thái "Đã từ chối", đóng phiếu; Chuyên viên phải tạo phiếu mới nếu muốn tiếp tục.<br>• Chỉ hiển thị màn này khi đơn vị của phiếu có bật cấu hình "Lãnh đạo Ban xác nhận"; đơn vị tắt cấu hình → phiếu đi thẳng `cvp-duyet`. |

---

## Screen: cvp-duyet — CVP/PCVP duyệt + ký số

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ CVP/PCVP duyệt + ký số — Phiếu DKX-0231                           │
├──────────────────────────────────────────────────────────────────┤
│  Người đăng ký      : Nguyễn Văn A (Ban Tổ chức)                  │
│  Lộ trình           : Hà Nội - Hạ Long, 05/08/2026               │
│  LĐ Ban đã xác nhận : Có (05/08/2026 09:00)                      │
│                                                                    │
│ Ý kiến (bắt buộc nếu yêu cầu bổ sung / từ chối)                   │
│ [________________________________________________________]      │
│                                                                    │
│ [ Duyệt + Ký số (SignServer) ] [ Yêu cầu bổ sung ] [ Từ chối ][1]│
│                                                                    │
│ (info) Đang kết nối SignServer để ký số...                   [2] │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Duyệt + Ký số (SignServer) / Yêu cầu bổ sung / Từ chối dứt điểm | Button (primary/secondary/danger) | Click | • "Duyệt + Ký số": gọi dịch vụ SignServer ký số biểu mẫu đăng ký. Backdate = có → sau ký thành công điều hướng thẳng `xacnhan-diove-nhap`; backdate = không → điều hướng `cap-xe`.<br>• "Yêu cầu bổ sung" / "Từ chối dứt điểm": cùng hành vi như `lanhdao-xacnhan` (quay lại `dk-xe-form` để sửa, hoặc đóng phiếu). |
| 2 | Trạng thái kết nối SignServer | Label (info/error) | ReadOnly | • Hiển thị khi đang chờ phản hồi ký số (round-trip bên thứ 3 có thể chậm).<br>• Lỗi/timeout kết nối → hiển thị thông báo lỗi + nút "Thử lại ký số", phiếu giữ nguyên trạng thái chờ (không tự chuyển bước khi ký chưa thành công). |
