# Flow: Cấu hình AI, đơn giá, hạn mức

> Màn hình thuộc flow này: nha-cung-cap-danh-sach → nha-cung-cap-form → canh-bao-tat-ra-soat; nha-cung-cap-xoa-xac-nhan; chon-ncc-mac-dinh-don-vi; thiet-lap-don-gia; thiet-lap-han-muc; cau-hinh-luu-giu. Flow tổng xem `../srs/kiem-tra-phap-ly-userflow.md` Mục 1. Nguồn mô tả: `../SRS.md` v1.1 (FC-028 đến FC-034). Thiết bị: Desktop 1440, bố cục tràn khung. Số liệu trong khung chỉ minh họa.
>
> Màn dùng chung từ flow khác: `trang-chu` [1.7] (điểm vào), `truy-cap-bi-tu-choi` [1.10], `chon-don-vi-thao-tac` [10.1] (Quản trị đơn vị nhiều đơn vị). Phần lớn màn chỉ Quản trị hệ thống; Hạn mức tài khoản dành cho Quản trị đơn vị.

---

## Screen: nha-cung-cap-danh-sach — Danh sách nhà cung cấp AI

### Wireframe (ASCII)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Gửi dự thảo | Lịch sử kiểm tra | Kho văn bản                                           (o)3  [An v] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Cấu hình AI và chi phí   │ Nhà cung cấp AI                                     [1][ + Thêm nhà cung cấp ]  │
│ ----------------------   │ ---------------------------------------------------------------------------     │
│ *Nhà cung cấp AI         │ Tên         Loại        Model       Rà soát  Trạng thái   Mặc định cho  [2]     │
│ NCC mặc định đơn vị      │                                                              đơn vị             │
│ Đơn giá                  │ Viettel AI  Trong nước  vt-legal-1  Tắt      Đang dùng       12                 │
│ Hạn mức                  │ VNPT AI     Trong nước  vnpt-llm-2  Bật      Đang dùng       5                  │
│ Lưu giữ dữ liệu          │ OpenAI      Nước ngoài  gpt-model   Bật      Đang dùng       3                  │
│                          │ Claude      Nước ngoài  claude-m    Bật      Ngừng dùng      0                  │
│ (Quản trị đơn vị chỉ     │                                          < Sửa >  < Xóa >  mỗi dòng [3]         │
│ thấy mục Hạn mức tài     │                                                                                 │
│ khoản)                   │ (!) [4] Không tải được danh sách. Vui lòng thử lại.   (chỉ hiện khi lỗi tải)    │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Thêm nhà cung cấp | Button | Click | • Mở `nha-cung-cap-form` trống. Chỉ Quản trị hệ thống thấy màn này; vai trò khác → `truy-cap-bi-tu-choi` (FC-028 EX-05). |
| 2 | Bảng nhà cung cấp | Table | ReadOnly | • Cột: Tên, Loại (Trong nước / Nước ngoài), Model, Rà soát nhạy cảm (Bật / Tắt), Trạng thái (Đang dùng / Ngừng sử dụng), Số đơn vị đang dùng làm mặc định. Danh sách trống → trạng thái rỗng kèm nút Thêm.<br>• Nhà cung cấp Ngừng sử dụng: không chọn được làm mặc định mới, không nhận lượt mới; các lượt đã chạy giữ nguyên (BR-03). |
| 3 | Sửa / Xóa | Link | Click | • Sửa → `nha-cung-cap-form` với dữ liệu hiện có (khóa kết nối không hiện lại). Xóa → `nha-cung-cap-xoa-xac-nhan`; nhà cung cấp đã có lượt dùng hoặc đang là mặc định của đơn vị không xóa được, chuyển Ngừng sử dụng (`E-kiem-tra-phap-ly-079`). |
| 4 | Thông báo lỗi tải | Label | ReadOnly | • Không tải được danh sách → thông báo lỗi chung kèm nút Thử lại. Hai quản trị cùng sửa một nhà cung cấp: lần lưu sau báo đã thay đổi, tải lại. |

---

## Screen: nha-cung-cap-form — Thêm hoặc sửa nhà cung cấp AI (hộp thoại)

### Wireframe (ASCII)

> Hộp thoại phủ lên `nha-cung-cap-danh-sach`.

```text
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│ Thêm nhà cung cấp AI                                                     (x)             │
├──────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│ Tên nhà cung cấp (*) [1]  [OpenAI________________________]                               │
│ Loại (*) [2]              ( ) Trong nước   (*) Nước ngoài  (không đổi nếu đã có lượt)    │
│ Địa chỉ dịch vụ (*) [3]   [https://api.example.com/v1_______________]                    │
│ Model (*) [4]             [gpt-model__________]                                          │
│ Khóa kết nối (*) [5]      [••••••••••••••••••] (sửa: để trống = giữ nguyên)              │
│ Rà soát nhạy cảm [6]      (*) Bật   ( ) Tắt                                              │
│ Trạng thái [7]            [v: Đang dùng]                                                 │
│ (!) [8] Vui lòng nhập đầy đủ và đúng thông tin nhà cung cấp.                             │
│ (ok) [9] Kết nối thành công.   (!) Kết nối thất bại: hết thời gian chờ.                  │
│                                                                                          │
│   [10][ Kiểm tra kết nối ]                    [11] < Hủy >    [12][ Lưu ]                │
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Tên nhà cung cấp | Textbox | Text | • **Bắt buộc**, tối đa 100 ký tự, không trùng. |
| 2 | Loại | Radio | Select | • Trong nước / Nước ngoài, **bắt buộc**; không đổi được nếu đã có lượt dùng. Quyết định chế độ cảnh báo khi tắt rà soát. |
| 3 | Địa chỉ dịch vụ | Textbox | Text | • **Bắt buộc**, tối đa 500 ký tự, bắt đầu bằng https://. |
| 4 | Model | Textbox | Text | • **Bắt buộc**, tối đa 100 ký tự. |
| 5 | Khóa kết nối | Password | Text | • Bắt buộc khi thêm; khi sửa để trống = giữ khóa cũ. Lưu mã hóa, không hiện lại, không ghi vào log hay thông báo (BR-01). |
| 6 | Rà soát dữ liệu nhạy cảm | Radio | Select | • Bật / Tắt, mặc định Bật. Tắt cho "Trong nước": được, không cảnh báo. Tắt cho "Nước ngoài": mở hộp cảnh báo `canh-bao-tat-ra-soat`, chỉ lưu khi xác nhận (`E-kiem-tra-phap-ly-078`); thao tác ghi nhật ký và gửi thông báo cho mọi Quản trị hệ thống `[CẦN XÁC NHẬN chính sách]`. |
| 7 | Trạng thái | Combobox | Select | • Đang dùng / Ngừng sử dụng, mặc định Đang dùng. |
| 8 | Thông báo lỗi nhập | Label | ReadOnly | • Thiếu trường bắt buộc, địa chỉ không phải https, tên trùng → `E-kiem-tra-phap-ly-077` "Vui lòng nhập đầy đủ và đúng thông tin nhà cung cấp." tại ô. |
| 9 | Kết quả kiểm tra kết nối | Label | ReadOnly | • Thành công hoặc thất bại kèm nguyên nhân rút gọn; thất bại → `E-kiem-tra-phap-ly-076` "Kết nối thất bại: <nguyên nhân rút gọn>. Kiểm tra lại địa chỉ, khóa kết nối rồi thử lại." Không hiện khóa trong thông báo. |
| 10 | Kiểm tra kết nối | Button | Click | • Gọi thử một lần tối thiểu, hết giờ 15 giây, không thử lại; không lưu dữ liệu. Ghi log kết quả. |
| 11 | Hủy | Link | Click | • Đóng hộp thoại, về `nha-cung-cap-danh-sach`. |
| 12 | Lưu | Button | Click | • Kiểm tra hợp lệ rồi mã hóa và lưu khóa, lưu thông tin, ghi nhật ký (đặc biệt khi đổi cờ rà soát: giá trị trước và sau). Lượt đang chạy giữ cấu hình lúc bắt đầu `[GIẢ ĐỊNH]`. |

---

## Screen: chon-ncc-mac-dinh-don-vi — Chọn nhà cung cấp mặc định cho đơn vị

### Wireframe (ASCII)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Gửi dự thảo | Lịch sử kiểm tra | Kho văn bản                                           (o)3  [An v] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Cấu hình AI và chi phí   │ Nhà cung cấp mặc định cho đơn vị                                                │
│ ----------------------   │ ---------------------------------------------------------------------------     │
│ Nhà cung cấp AI          │ Đơn vị (*) [1]                       [v: Sở TN&MT                  ]            │
│ *NCC mặc định đơn vị     │ Nhà cung cấp mặc định hiện tại [2]   VNPT AI (rà soát nhạy cảm: Bật)            │
│ Đơn giá                  │ Nhà cung cấp mặc định mới (*) [3]    [v: OpenAI                    ]            │
│ Hạn mức                  │ Chế độ rà soát sẽ áp dụng [4]        Bật (theo cấu hình nhà cung cấp)           │
│ Lưu giữ dữ liệu          │                                                                                 │
│                          │ (!) [5] Nhà cung cấp không còn khả dụng, vui lòng chọn nhà cung cấp khác.       │
│ (Quản trị đơn vị chỉ     │                                                                                 │
│ thấy mục Hạn mức tài     │                                                  [6] < Hủy >   [7][ Lưu ]       │
│ khoản)                   │                                                                                 │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Đơn vị | Combobox | Select | • **Bắt buộc**, danh sách đơn vị đang hoạt động. Đơn vị bị vô hiệu hóa → `E-kiem-tra-phap-ly-081` "Đơn vị đã ngừng hoạt động, không thể thay đổi cấu hình." |
| 2 | Nhà cung cấp mặc định hiện tại | Label | ReadOnly | • Chỉ đọc. Đơn vị chưa có mặc định → "Chưa có" (đơn vị không gửi kiểm tra được, FC-012 EX-04). |
| 3 | Nhà cung cấp mặc định mới | Combobox | Select | • **Bắt buộc**, chỉ nhà cung cấp Đang dùng; hiển thị kèm chế độ rà soát nhạy cảm áp dụng. |
| 4 | Chế độ rà soát sẽ áp dụng | Label | ReadOnly | • Hiện rõ ở bước xác nhận, nhất là khi chuyển từ rà soát Bật sang Tắt, để quản trị không bỏ sót. |
| 5 | Thông báo lỗi | Label | ReadOnly | • Chọn nhà cung cấp Ngừng sử dụng hoặc đã xóa → `E-kiem-tra-phap-ly-080` "Nhà cung cấp không còn khả dụng, vui lòng chọn nhà cung cấp khác." |
| 6 | Hủy | Link | Click | • Bỏ thay đổi, giữ nhà cung cấp hiện tại. |
| 7 | Lưu | Button | Click | • Lưu, ghi log giá trị trước và sau, áp dụng cho lượt gửi sau; lượt đang chạy giữ nhà cung cấp lúc bắt đầu, lượt chạy lại dùng mặc định hiện tại (BR-02). |

---

## Screen: thiet-lap-don-gia — Thiết lập đơn giá AI

### Wireframe (ASCII)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Gửi dự thảo | Lịch sử kiểm tra | Kho văn bản                                           (o)3  [An v] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Cấu hình AI và chi phí   │ Thiết lập đơn giá AI                                                            │
│ ----------------------   │ ---------------------------------------------------------------------------     │
│ Nhà cung cấp AI          │ Nhà cung cấp (*) [1]  [v: OpenAI        ]  Ngày hiệu lực (*) [4] [17/10/2026]   │
│ NCC mặc định đơn vị      │ Đơn giá token vào [2] (đồng / 1 triệu token)    [52000.0000___]                 │
│ *Đơn giá                 │ Đơn giá token ra [3]  (đồng / 1 triệu token)    [156000.0000__]                 │
│ Hạn mức                  │ (!) [5] Đơn giá phải ≥ 0, tối đa 4 chữ số thập phân; ngày hiệu lực không        │
│ Lưu giữ dữ liệu          │         được trước bản đơn giá gần nhất.                                        │
│                          │                                                         [6][ Lưu đơn giá ]      │
│ (Quản trị đơn vị chỉ     │ Lịch sử đơn giá [7]                                                             │
│ thấy mục Hạn mức tài     │ Ngày hiệu lực   Giá vào    Giá ra      Người đặt                                │
│ khoản)                   │ 17/10/2026      52.000     156.000     admin.he.thong                           │
│                          │ 01/07/2026      48.000     144.000     admin.he.thong                           │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Nhà cung cấp | Combobox | Select | • **Bắt buộc**. Chọn xong hiện đơn giá hiện tại và lịch sử. |
| 2 | Đơn giá token vào | Textbox số | Number | • Đồng / 1 triệu token, ≥ 0, tối đa 4 chữ số thập phân. Đơn giá 0 hợp lệ (mô hình nội bộ) và khác "chưa có đơn giá" (BR-03). |
| 3 | Đơn giá token ra | Textbox số | Number | • Như ô token vào. |
| 4 | Ngày hiệu lực | DatePicker | Date | • **Bắt buộc**, mặc định ngày hiện tại, không trước ngày đơn giá hiệu lực gần nhất. Hai bản cùng ngày: bản đặt sau thay bản trước, ghi cả hai vào log. |
| 5 | Thông báo lỗi | Label | ReadOnly | • Đơn giá âm, quá 4 chữ số thập phân hoặc ngày hiệu lực không hợp lệ → `E-kiem-tra-phap-ly-082` tại ô. |
| 6 | Lưu đơn giá | Button | Click | • Lưu bản đơn giá mới, giữ nguyên bản cũ, ghi log. Chi phí một lượt tính theo đơn giá có hiệu lực lúc ghi nhận, đổi sau không làm đổi lượt đã ghi (BR-01). Nhà cung cấp chưa có đơn giá → chi phí lượt để trống, báo cáo ghi "N lượt chưa có chi phí" (BR-02). |
| 7 | Lịch sử đơn giá | Table | ReadOnly | • Chỉ đọc: Ngày hiệu lực, Đơn giá vào, Đơn giá ra, Người đặt. Không tính lại chi phí các lượt cũ `[CẦN XÁC NHẬN, ngoài phạm vi]`. |

---

## Screen: thiet-lap-han-muc — Thiết lập hạn mức

### Wireframe (ASCII)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Gửi dự thảo | Lịch sử kiểm tra | Kho văn bản                                           (o)3  [An v] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Cấu hình AI và chi phí   │ Thiết lập hạn mức và ngân sách                                                  │
│ ----------------------   │ ---------------------------------------------------------------------------     │
│ Nhà cung cấp AI          │ Đối tượng (*) [1]  [v: Sở TN&MT (đơn vị)]  (Quản trị đơn vị: chọn tài khoản)    │
│ NCC mặc định đơn vị      │ Mức đã dùng tháng 10/2026 [2]:  3.250.000 đ | 128 lượt | 82% hạn mức            │
│ Đơn giá                  │ Ngân sách tháng (đồng) [3]      [4000000.00___]  (trống = không đặt)            │
│ *Hạn mức                 │ Số lượt tối đa mỗi tháng [4]    [150_____]       (trống = không giới hạn)       │
│ Lưu giữ dữ liệu          │ Cách xử lý khi vượt [5]         (*) Cảnh báo, vẫn cho gửi   ( ) Chặn gửi        │
│                          │ (!) [6] Giá trị hạn mức phải là số không âm.                                    │
│ (Quản trị đơn vị chỉ     │ (!) [7] Hạn mức tài khoản không được vượt hạn mức đơn vị.                       │
│ thấy mục Hạn mức tài     │                                                  [8] < Hủy >   [9][ Lưu ]       │
│ khoản)                   │                                                                                 │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Đối tượng | Combobox | Select | • Quản trị hệ thống: chọn đơn vị. Quản trị đơn vị: chọn tài khoản trong đơn vị đang thao tác (chỉ đặt cho đơn vị đang chọn, phụ trách nhiều đơn vị). |
| 2 | Mức đã dùng trong tháng | Label | ReadOnly | • Chi phí, số lượt và phần trăm so với hạn mức, theo giờ Việt Nam; chỉ tính lượt có gọi nhà cung cấp (BR-01). Đổi hạn mức giữa tháng: tính lại phần trăm ngay. |
| 3 | Ngân sách tháng | Textbox số | Number | • ≥ 0, tối đa 2 chữ số thập phân; để trống = không đặt. Ngân sách và số lượt tính độc lập, vượt bất kỳ giới hạn nào đã đặt đều là vượt hạn mức (BR-02). |
| 4 | Số lượt tối đa mỗi tháng | Textbox số | Number | • Số nguyên ≥ 0; để trống = không giới hạn. |
| 5 | Cách xử lý khi vượt | Radio | Select | • "Cảnh báo, vẫn cho gửi" (mặc định) / "Chặn gửi"; chỉ Quản trị hệ thống chọn "Chặn gửi". Cảnh báo ở 80% và 100% gửi thông báo trong ứng dụng và email, mỗi mức một lần mỗi tháng (FC-033). |
| 6 | Lỗi giá trị | Label | ReadOnly | • Giá trị âm hoặc sai định dạng → `E-kiem-tra-phap-ly-083` "Giá trị hạn mức phải là số không âm." |
| 7 | Lỗi quyền hoặc vượt hạn mức đơn vị | Label | ReadOnly | • Hạn mức tài khoản vượt hạn mức đơn vị, hoặc Quản trị đơn vị chọn Chặn gửi → `E-kiem-tra-phap-ly-084`. Đơn vị và tài khoản cùng đặt thì áp dụng giới hạn chặt hơn (BR-04). |
| 8 | Hủy | Link | Click | • Bỏ thay đổi. |
| 9 | Lưu | Button | Click | • Kiểm tra rồi lưu, ghi log giá trị trước và sau, áp dụng ngay cho lượt gửi sau. |

---

## Screen: cau-hinh-luu-giu — Cấu hình lưu giữ dữ liệu

### Wireframe (ASCII)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Gửi dự thảo | Lịch sử kiểm tra | Kho văn bản                                           (o)3  [An v] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Cấu hình AI và chi phí   │ Cấu hình lưu giữ dữ liệu dự thảo                                                │
│ ----------------------   │ ---------------------------------------------------------------------------     │
│ Nhà cung cấp AI          │ Thời hạn lưu giữ mặc định (ngày) (*) [1]     [90____]   (7 đến 365)             │
│ NCC mặc định đơn vị      │                                                                                 │
│ Đơn giá                  │ Thời hạn theo đơn vị (ghi đè) [2]                                               │
│ Hạn mức                  │ Đơn vị                    Thời hạn (ngày)                                       │
│ *Lưu giữ dữ liệu         │ Sở TN&MT                  [60___]                                               │
│                          │ Sở Xây dựng               [_____]  (trống = dùng mặc định)                      │
│ (Quản trị đơn vị chỉ     │ Sở Tài chính              [180__]                                               │
│ thấy mục Hạn mức tài     │ (!) [3] Thời hạn lưu giữ phải là số nguyên từ 7 đến 365 ngày.                   │
│ khoản)                   │ (!) [4] Rút ngắn thời hạn: 14 lượt sẽ bị xóa ở lần dọn kế tiếp.                 │
│                          │                                                  [5] < Hủy >   [6][ Lưu ]       │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Thời hạn lưu giữ mặc định | Textbox số | Number | • Số nguyên 7 đến 365 ngày, mặc định 90. Tính từ lúc gửi lượt (hoặc từ câu hỏi cuối với hội thoại không gắn lượt). |
| 2 | Thời hạn theo đơn vị | Table | Number | • Cột: Đơn vị, Thời hạn (ngày, 7 đến 365, để trống = dùng mặc định). Đơn vị có thời hạn riêng thì dùng riêng (BR-01). |
| 3 | Lỗi giá trị | Label | ReadOnly | • Ngoài khoảng 7 đến 365 hoặc không phải số nguyên → `E-kiem-tra-phap-ly-085` tại ô "Thời hạn lưu giữ phải là số nguyên từ 7 đến 365 ngày." |
| 4 | Cảnh báo rút ngắn | Label | ReadOnly | • Hiện số lượt sẽ bị xóa trước khi lưu `[GIẢ ĐỊNH]`; xóa thật ở lần dọn kế tiếp (01:00 hằng ngày), không xóa ngay khi lưu; lượt Chờ xử lý hoặc Đang xử lý không bị xóa; xóa là xóa thật, không khôi phục (FC-034). |
| 5 | Hủy | Link | Click | • Bỏ thay đổi. |
| 6 | Lưu | Button | Click | • Kiểm tra rồi lưu, ghi log giá trị trước và sau. |

---

## Screen: canh-bao-tat-ra-soat — Cảnh báo tắt rà soát nhạy cảm (hộp thoại)

### Wireframe (ASCII)

> Hộp thoại phủ lên `nha-cung-cap-form`.

```text
┌────────────────────────────────────────────────────────────────────────────────────┐
│ Tắt rà soát dữ liệu nhạy cảm?                                           (x)        │
├────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                    │
│ (!) [1] Dữ liệu dự thảo sẽ được gửi ra nhà cung cấp nước ngoài mà                  │
│     không rà soát dữ liệu nhạy cảm. Thao tác này được ghi nhật ký.                 │
│     Bạn chắc chắn tắt?                                                             │
│                                                                                    │
│ Nhà cung cấp: OpenAI (Nước ngoài)                                                  │
│                                                                                    │
│                                 [2] < Hủy >   [3][ Xác nhận tắt ]                  │
└────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Nội dung cảnh báo | Label | ReadOnly | • `E-kiem-tra-phap-ly-078` "Dữ liệu dự thảo sẽ được gửi ra nhà cung cấp nước ngoài mà không rà soát dữ liệu nhạy cảm. Thao tác này được ghi nhật ký. Bạn chắc chắn tắt?" Nêu rõ tên và loại nhà cung cấp. |
| 2 | Hủy | Link | Click | • Đóng hộp thoại, giữ rà soát Bật, quay về `nha-cung-cap-form`. |
| 3 | Xác nhận tắt | Button | Click | • Tắt rà soát, quay về form để lưu; khi lưu ghi nhật ký (giá trị trước và sau) và gửi thông báo "Rà soát dữ liệu nhạy cảm của nhà cung cấp <tên> (nước ngoài) đã bị tắt bởi <người thực hiện>." cho mọi Quản trị hệ thống đang hoạt động `[CẦN XÁC NHẬN chính sách có cho tắt với nhà cung cấp nước ngoài]`. |

---

## Screen: nha-cung-cap-xoa-xac-nhan — Xác nhận xóa nhà cung cấp (hộp thoại)

### Wireframe (ASCII)

> Hai trạng thái loại trừ: chưa dùng (Xác nhận xóa) hoặc đã dùng (Ngừng sử dụng); khung vẽ trường hợp đã dùng.

```text
┌────────────────────────────────────────────────────────────────────────────────────┐
│ Xác nhận xóa nhà cung cấp                                              (x)         │
├────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                    │
│ Bạn chắc chắn muốn xóa nhà cung cấp "Claude"? [1]                                  │
│ Chỉ xóa được khi chưa có lượt dùng và không là mặc định của đơn vị nào.            │
│                                                                                    │
│ (!) [2] Nhà cung cấp đã được sử dụng, chỉ có thể chuyển sang Ngừng sử dụng.        │
│     (hiện thay cho nút xóa khi đã dùng hoặc còn là mặc định)                       │
│                                                                                    │
│                [3] < Hủy >   [4][ Xác nhận xóa ]  hoặc  [5][ Ngừng sử dụng ]       │
└────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Nội dung xác nhận | Label | ReadOnly | • Nêu tên nhà cung cấp; xóa là xóa thật, không khôi phục. |
| 2 | Cảnh báo đã dùng | Label | ReadOnly | • Đã có lượt dùng hoặc đang là mặc định → `E-kiem-tra-phap-ly-079` "Nhà cung cấp đã được sử dụng, chỉ có thể chuyển sang Ngừng sử dụng."; ẩn nút Xác nhận xóa. Còn đơn vị dùng làm mặc định thì yêu cầu đổi mặc định cho các đơn vị đó trước (`chon-ncc-mac-dinh-don-vi`). |
| 3 | Hủy | Link | Click | • Đóng hộp thoại, về `nha-cung-cap-danh-sach`. |
| 4 | Xác nhận xóa | Button | Click | • Chỉ khi chưa dùng và không là mặc định: xóa, ghi log. |
| 5 | Ngừng sử dụng | Button | Click | • Chuyển nhà cung cấp sang Ngừng sử dụng; không chọn làm mặc định mới, các lượt đã chạy giữ nguyên. |

---
