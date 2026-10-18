# Flow: Báo cáo và nhật ký

> Màn hình thuộc flow này: bao-cao-chi-phi-don-vi → bao-cao-chi-tiet-don-vi; bao-cao-chi-phi-tai-khoan; nhat-ky-gui-ai → chi-tiet-luot-gui, lich-su-doi-cau-hinh. Flow tổng xem `../srs/kiem-tra-phap-ly-userflow.md` Mục 1. Nguồn mô tả: `../SRS.md` v1.1 (FC-035 đến FC-037). Thiết bị: Desktop 1440, bố cục tràn khung. Số liệu trong khung chỉ minh họa.
>
> Màn dùng chung từ flow khác: `trang-chu` [1.7], `truy-cap-bi-tu-choi` [1.10], `chon-don-vi-thao-tac` [10.1], `danh-sach-luot-kiem-tra` [5.1] (từ báo cáo theo tài khoản). Báo cáo theo đơn vị chỉ Quản trị hệ thống; theo tài khoản chỉ Quản trị đơn vị; nhật ký cho cả hai theo phạm vi.

---

## Screen: bao-cao-chi-phi-don-vi — Báo cáo chi phí theo đơn vị

### Wireframe (ASCII)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Gửi dự thảo | Lịch sử kiểm tra | Kho văn bản                                           (o)3  [An v] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Báo cáo và nhật ký       │ Báo cáo chi phí theo đơn vị                          [7][ Xuất Excel ]          │
│ ----------------------   │ Kỳ [1] [v: Tháng này]  Đơn vị [2] [v: Tất cả]  Nhà cung cấp [3] [v: Tất cả]     │
│ *Chi phí theo đơn vị     │ (!) [8] Khoảng thời gian không hợp lệ (tối đa 366 ngày).  (khi chọn Tùy chọn)   │
│ Chi phí theo tài khoản   │ ---------------------------------------------------------------------------     │
│ Nhật ký gửi dữ liệu AI   │ Đơn vị     Lượt AI Token vào  Token ra  Chi phí(đ) %HM Lỗi Chưa CP  [4]         │
│ Lịch sử đổi cấu hình     │ Sở TN&MT    128 118  1,92 tr   0,64 tr  3.250.000  82%  2   0                   │
│                          │ Sở XD        96  90  1,40 tr   0,48 tr  2.480.000  62%  1   3                   │
│ Theo đơn vị: Quản trị hệ │ Sở TC (đã vô hiệu hóa) 40 38  0,60 tr   0,21 tr  1.020.000  --  0   0           │
│ thống. Theo tài khoản:   │ Tổng        264 246  3,92 tr   1,33 tr  6.750.000       3   3  [5]              │
│ Quản trị đơn vị. Nhật ký:│                                                                                 │
│ cả hai (theo phạm vi).   │ Click một dòng để xem chi tiết các lượt của đơn vị [6]                          │
│                          │ (info) [9] Không có dữ liệu trong kỳ đã chọn. Thử đổi kỳ hoặc bộ lọc.           │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Kỳ báo cáo | Combobox + DatePicker | Select | • Tháng này (mặc định) / Tháng trước / Quý này / Năm nay / Tùy chọn (Từ ngày – Đến ngày, Từ ≤ Đến, tối đa 366 ngày). Theo giờ Việt Nam. Chỉ Quản trị hệ thống xem màn này (FC-035 BR-03). |
| 2 | Đơn vị | Combobox nhiều giá trị | Select | • Mặc định tất cả đơn vị. |
| 3 | Nhà cung cấp AI | Combobox | Select | • Mặc định "-- Tất cả --". |
| 4 | Bảng theo đơn vị | Table | Click | • Cột: Đơn vị, Tổng lượt, Lượt đã gọi AI, Token vào, Token ra, Chi phí (đồng), % hạn mức, Lượt lỗi, Lượt chưa có chi phí. Sắp xếp mặc định theo Chi phí giảm dần. Chi phí = tổng chi phí đã chốt từng lượt; lượt chưa có chi phí (thiếu token hoặc đơn giá) hiển thị riêng, không tính vào Chi phí. % hạn mức luôn theo tháng hiện tại, trống nếu chưa đặt ngân sách (BR-01).<br>• Lượt Đã hủy vẫn tính chi phí phát sinh; lượt đã xóa vẫn trong tổng nhưng không hiện chi tiết (BR-02). Đơn vị bị vô hiệu hóa vẫn hiện số liệu kỳ, gắn nhãn "Đã vô hiệu hóa". |
| 5 | Dòng tổng | Label | ReadOnly | • Tổng các cột theo bộ lọc đang áp dụng. Đơn giá đổi trong kỳ: chi phí từng lượt giữ theo đơn giá lúc ghi. |
| 6 | Click dòng đơn vị | Table row | Click | • Sang `bao-cao-chi-tiet-don-vi` với đơn vị và kỳ đã chọn. |
| 7 | Xuất Excel | Button | Click | • Xuất theo đúng bộ lọc, thứ tự và tên cột như bảng; số tiền #,##0, ngày dd/MM/yyyy; tối đa 100.000 dòng `[GIẢ ĐỊNH]`; tên tệp BaoCaoChiPhiDonVi_<yyyyMMdd_HHmm>.xlsx; ghi log người xuất, bộ lọc, thời gian. Lỗi tạo tệp hoặc quá số dòng → `E-kiem-tra-phap-ly-088` "Không xuất được báo cáo. Hãy thu hẹp bộ lọc rồi thử lại." |
| 8 | Lỗi kỳ tùy chọn | Label | ReadOnly | • Từ ngày lớn hơn Đến ngày hoặc quá 366 ngày → `E-kiem-tra-phap-ly-089` "Khoảng thời gian không hợp lệ (tối đa 366 ngày)." tại ô. |
| 9 | Trạng thái rỗng | Label | ReadOnly | • "Không có dữ liệu trong kỳ đã chọn" kèm gợi ý đổi kỳ hoặc bộ lọc. Số liệu tính trực tiếp từ dữ liệu ghi nhận, làm mới mỗi lần mở; không hiện nội dung dự thảo (BR-04). |

---

## Screen: bao-cao-chi-tiet-don-vi — Báo cáo chi tiết đơn vị

### Wireframe (ASCII)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Gửi dự thảo | Lịch sử kiểm tra | Kho văn bản                                           (o)3  [An v] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Báo cáo và nhật ký       │ Chi tiết đơn vị: Sở TN&MT  (kỳ: tháng 10/2026)        [1] < Quay lại >          │
│ ----------------------   │ ---------------------------------------------------------------------------     │
│ *Chi phí theo đơn vị     │ Thời gian         Tài khoản    Loại      Trạng thái  Token vào/ra  Chi phí [2]  │
│ Chi phí theo tài khoản   │ 16/10/2026 09:15  nguyenvana   Kiểm tra  Hoàn tất    12k / 4k      58.000       │
│ Nhật ký gửi dữ liệu AI   │ 16/10/2026 08:40  tranthib     Hỏi đáp   Hoàn tất    2k / 1k       9.500        │
│ Lịch sử đổi cấu hình     │ 15/10/2026 16:05  nguyenvana   Kiểm tra  Lỗi         3k / 0        --           │
│                          │ 15/10/2026 10:12  lethic       Kiểm tra  Đã hủy      5k / 1k       12.000       │
│ Theo đơn vị: Quản trị hệ │ 14/10/2026 14:20  tranthib     Kiểm tra  Hết hạn lưu giữ  9k / 3k   41.000      │
│ thống. Theo tài khoản:   │                                                                                 │
│ Quản trị đơn vị. Nhật ký:│ Không hiển thị tên dự thảo hay nội dung [3]            < 1 2 3 > phân trang     │
│ cả hai (theo phạm vi).   │                                                                                 │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Quay lại | Link | Click | • Về `bao-cao-chi-phi-don-vi`, giữ nguyên bộ lọc kỳ và đơn vị. |
| 2 | Bảng lượt của đơn vị | Table | ReadOnly | • Cột: Thời gian, Tài khoản, Loại (Kiểm tra / Hỏi đáp), Trạng thái, Token vào/ra, Chi phí. Lượt chưa có chi phí hiện "--". Phân trang 20 dòng mỗi trang.<br>• Kỳ không có dữ liệu → "Không có dữ liệu trong kỳ đã chọn". |
| 3 | Quyền riêng tư | Label | ReadOnly | • Không hiển thị tên dự thảo hay nội dung; chỉ số liệu vận hành (FC-035 BR-04). Lượt đã xóa vẫn có dòng số liệu nhưng không mở được chi tiết. |

---

## Screen: bao-cao-chi-phi-tai-khoan — Báo cáo chi phí theo tài khoản

### Wireframe (ASCII)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Gửi dự thảo | Lịch sử kiểm tra | Kho văn bản                                           (o)3  [An v] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Báo cáo và nhật ký       │ Báo cáo chi phí theo tài khoản                       [6][ Xuất Excel ]          │
│ ----------------------   │ Kỳ [1] [v: Tháng này]    Đơn vị thao tác [2] [v: Sở TN&MT]                      │
│ Chi phí theo đơn vị      │ (!) [7] Bạn không quản lý đơn vị này.   (khi chọn đơn vị ngoài phạm vi)         │
│ *Chi phí theo tài khoản  │ ---------------------------------------------------------------------------     │
│ Nhật ký gửi dữ liệu AI   │ Tài khoản    Họ tên         Lượt  Token vào  Token ra  Chi phí(đ)  %HM [3]      │
│ Lịch sử đổi cấu hình     │ nguyenvana   Nguyễn Văn A    58   0,92 tr    0,31 tr   1.480.000   74%          │
│                          │ tranthib     Trần Thị B      41   0,70 tr    0,22 tr   1.050.000   --           │
│ Theo đơn vị: Quản trị hệ │ lethic       Lê Thị C        29   0,30 tr    0,11 tr     720.000   36%          │
│ thống. Theo tài khoản:   │ Tổng                        128   1,92 tr    0,64 tr   3.250.000                │
│ Quản trị đơn vị. Nhật ký:│                                                                                 │
│ cả hai (theo phạm vi).   │ Click một tài khoản để xem danh sách lượt (chỉ thông tin cơ bản) [4]            │
│                          │ (info) [5] Không có dữ liệu trong kỳ đã chọn.  (khi rỗng)                       │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Kỳ báo cáo | Combobox + DatePicker | Select | • Như báo cáo theo đơn vị (mặc định Tháng này, Tùy chọn tối đa 366 ngày → `E-kiem-tra-phap-ly-089`). |
| 2 | Đơn vị thao tác | Combobox | Select | • Chỉ các đơn vị đang phụ trách; Quản trị đơn vị nhiều đơn vị xem một đơn vị mỗi lần (màn dùng chung `chon-don-vi-thao-tac`, BR-02). Mặc định đơn vị đang thao tác. |
| 3 | Bảng theo tài khoản | Table | Click | • Cột: Tài khoản, Họ tên, Tổng lượt, Token vào, Token ra, Chi phí (đồng), % hạn mức tài khoản (trống nếu tài khoản không đặt hạn mức riêng). Công thức như FC-035 BR-01 nhóm theo tài khoản. Tài khoản chuyển đơn vị giữa kỳ: số liệu trước chuyển tính cho đơn vị cũ. |
| 4 | Click dòng tài khoản | Table row | Click | • Mở danh sách lượt của tài khoản (FC-017), chỉ thông tin cơ bản, không mở nội dung dự thảo (BR-03). |
| 5 | Trạng thái rỗng | Label | ReadOnly | • "Không có dữ liệu trong kỳ đã chọn". |
| 6 | Xuất Excel | Button | Click | • Quy tắc như báo cáo theo đơn vị; tên tệp BaoCaoChiPhiTaiKhoan_<yyyyMMdd_HHmm>.xlsx; ghi log xuất. |
| 7 | Lỗi phạm vi | Label | ReadOnly | • Chọn đơn vị ngoài phạm vi phụ trách → `E-kiem-tra-phap-ly-090` "Bạn không quản lý đơn vị này." Không trả số liệu. |

---

## Screen: nhat-ky-gui-ai — Nhật ký gửi dữ liệu ra AI

### Wireframe (ASCII)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Gửi dự thảo | Lịch sử kiểm tra | Kho văn bản                                           (o)3  [An v] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Báo cáo và nhật ký       │ Nhật ký gửi dữ liệu ra AI                   [7] < Lịch sử đổi cấu hình rà soát >│
│ ----------------------   │ Thời gian [1] [v: 7 ngày gần nhất] Người dùng [2][____] Đơn vị [3][v: Tất cả]   │
│ Chi phí theo đơn vị      │ Nhà cung cấp [4] [v: Tất cả]   Rà soát [5] [v: Tất cả / Bật / Tắt]              │
│ Chi phí theo tài khoản   │ ---------------------------------------------------------------------------     │
│ *Nhật ký gửi dữ liệu AI  │ Thời điểm   Người dùng  Loại   Nhà cung cấp  Rà soát  Mục  Cho/Che/Xóa [6]      │
│ Lịch sử đổi cấu hình     │ 16/10 09:15 nguyenvana  KT     VNPT AI(TN)   Bật       5   2/2/1                │
│                          │ 16/10 08:40 tranthib    HĐ     OpenAI(NN)    Bật       1   0/1/0                │
│ Theo đơn vị: Quản trị hệ │ 15/10 16:05 lethic      KT     OpenAI(NN)    Tắt       0   --                   │
│ thống. Theo tài khoản:   │                                                                                 │
│ Quản trị đơn vị. Nhật ký:│ (!) [8] Bạn không có quyền xem nhật ký của đơn vị này.                          │
│ cả hai (theo phạm vi).   │ (info) [9] Không có lượt gửi nào phù hợp  (khi rỗng)                            │
│                          │ 20 dòng mỗi trang                                      < 1 2 3 >                │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Thời gian | Combobox + DatePicker | Select | • Mặc định 7 ngày gần nhất (FC-037). |
| 2 | Người dùng | Textbox | Text | • Lọc theo tài khoản hoặc họ tên, so khớp tương đối. |
| 3 | Đơn vị | Combobox | Select | • Quản trị đơn vị chỉ thấy đơn vị đang phụ trách; Quản trị hệ thống toàn hệ thống (BR-03). |
| 4 | Nhà cung cấp | Combobox | Select | • Mặc định Tất cả. |
| 5 | Rà soát nhạy cảm | Combobox | Select | • Tất cả / Bật / Tắt. |
| 6 | Bảng nhật ký | Table | Click | • Cột: Thời điểm, Người dùng, Đơn vị, Loại (Kiểm tra / Hỏi đáp), Nhà cung cấp, Loại nhà cung cấp (TN: trong nước, NN: nước ngoài), Rà soát (Bật / Tắt), Số mục nhạy cảm phát hiện, Cho phép / Che ẩn / Xóa. Mỗi lần gửi sang nhà cung cấp là một dòng; phân trang 20 dòng.<br>• Click dòng → `chi-tiet-luot-gui`. Nhật ký không chứa giá trị nhạy cảm, nội dung dự thảo hay câu hỏi (BR-02); bản ghi không bị xóa theo thời hạn lưu giữ dự thảo `[CẦN XÁC NHẬN, đề xuất 2 năm]`. Ghi log ai xem, bộ lọc, thời gian. |
| 7 | Lịch sử đổi cấu hình rà soát | Link | Click | • Mở `lich-su-doi-cau-hinh`. |
| 8 | Lỗi phạm vi | Label | ReadOnly | • Quản trị đơn vị xem đơn vị ngoài phạm vi → `E-kiem-tra-phap-ly-091` "Bạn không có quyền xem nhật ký của đơn vị này." |
| 9 | Trạng thái rỗng | Label | ReadOnly | • "Không có lượt gửi nào phù hợp". |

---

## Screen: chi-tiet-luot-gui — Chi tiết lượt gửi (hộp thoại)

### Wireframe (ASCII)

> Hộp thoại phủ lên `nhat-ky-gui-ai`.

```text
┌────────────────────────────────────────────────────────────────────────────────────┐
│ Chi tiết lượt gửi                                                          (x)     │
├────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                    │
│ Thời điểm: 16/10/2026 09:15    Người dùng: nguyenvana    Đơn vị: Sở TN&MT          │
│ Loại: Kiểm tra    Nhà cung cấp: VNPT AI (Trong nước)    Rà soát: Bật   [1]         │
│ ---------------------------------------------------------------------------        │
│ Loại dữ liệu nhạy cảm [2]        Cho phép   Che ẩn   Xóa                           │
│ Số CCCD/CMND                          0          2       0                         │
│ Mã số thuế                            0          0       1                         │
│ Số điện thoại                         2          0       0                         │
│ Tổng 5 mục: cho phép 2, che ẩn 2, xóa 1                                            │
│                                                                                    │
│ (info) [3] Không hiển thị giá trị gốc hoặc nội dung dự thảo.                       │
│                                                                                    │
│                                                        [4][ Đóng ]                 │
└────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Thông tin lượt gửi | Label | ReadOnly | • Thời điểm, người dùng, đơn vị, loại (Kiểm tra / Hỏi đáp), nhà cung cấp, loại nhà cung cấp, trạng thái rà soát lúc gửi. |
| 2 | Loại dữ liệu nhạy cảm | Table | ReadOnly | • Số lượng theo từng loại và từng cách xử lý (Cho phép gửi / Che ẩn / Xóa). Rà soát Tắt → "Không rà soát nhạy cảm cho lượt này". |
| 3 | Lưu ý riêng tư | Label | ReadOnly | • Không hiển thị giá trị gốc, nội dung dự thảo hay câu hỏi (FC-037 BR-02). |
| 4 | Đóng | Button | Click | • Đóng hộp thoại, về `nhat-ky-gui-ai`. |

---

## Screen: lich-su-doi-cau-hinh — Lịch sử đổi cấu hình rà soát

### Wireframe (ASCII)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Gửi dự thảo | Lịch sử kiểm tra | Kho văn bản                                           (o)3  [An v] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Báo cáo và nhật ký       │ Lịch sử đổi cấu hình rà soát nhạy cảm                  [1] < Quay lại >         │
│ ----------------------   │ ---------------------------------------------------------------------------     │
│ Chi phí theo đơn vị      │ Thời điểm         Người đổi       Nhà cung cấp   Giá trị trước  Giá trị sau [2] │
│ Chi phí theo tài khoản   │ 14/10/2026 10:02  admin.he.thong  OpenAI (NN)    Bật            Tắt             │
│ Nhật ký gửi dữ liệu AI   │ 02/10/2026 15:30  admin.he.thong  OpenAI (NN)    Tắt            Bật             │
│ *Lịch sử đổi cấu hình    │ 20/09/2026 09:00  admin.he.thong  Viettel AI(TN) Bật            Tắt             │
│                          │                                                                                 │
│ Theo đơn vị: Quản trị hệ │ Chỉ đọc, không sửa tại đây [3]            < 1 2 3 > phân trang                  │
│ thống. Theo tài khoản:   │                                                                                 │
│ Quản trị đơn vị. Nhật ký:│                                                                                 │
│ cả hai (theo phạm vi).   │                                                                                 │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Quay lại | Link | Click | • Về `nhat-ky-gui-ai`. |
| 2 | Bảng lịch sử đổi cấu hình | Table | ReadOnly | • Cột: Thời điểm, Người đổi, Nhà cung cấp, Giá trị trước, Giá trị sau của cờ rà soát nhạy cảm. Mới nhất ở trên; dữ liệu từ nhật ký đổi cấu hình nhà cung cấp (FC-028). Tắt rà soát nhà cung cấp nước ngoài đã có cảnh báo và thông báo cho Quản trị hệ thống. |
| 3 | Chỉ đọc | Label | ReadOnly | • Đổi cấu hình thực hiện tại `nha-cung-cap-form` (flow cấu hình AI); không sửa ở đây. |

---
