# Flow: Quản trị đơn vị, tài khoản, phân quyền

> Màn hình thuộc flow này: chon-don-vi-thao-tac (dùng chung), danh-sach-don-vi → form-don-vi → vo-hieu-hoa-don-vi-xac-nhan; danh-sach-tai-khoan → tao-tai-khoan, vo-hieu-hoa-tai-khoan; tao-tai-khoan-quan-tri; phan-quyen-vai-tro. Flow tổng xem `../srs/kiem-tra-phap-ly-userflow.md` Mục 1. Nguồn mô tả: `../SRS.md` v1.1 (FC-038 đến FC-042). Thiết bị: Desktop 1440, bố cục tràn khung. Số liệu trong khung chỉ minh họa.
>
> Màn dùng chung từ flow khác: `trang-chu` [1.7] (điểm vào), `truy-cap-bi-tu-choi` [1.10]. Quản lý đơn vị, tài khoản quản trị, phân quyền chỉ Quản trị hệ thống; tài khoản người dùng do Quản trị đơn vị. FC-042 là API đồng bộ từ iOffice, không có màn hình.

---

## Screen: chon-don-vi-thao-tac — Ô chọn đơn vị thao tác (dùng chung)

### Wireframe (ASCII)

> Thành phần dùng chung của các màn quản trị, không phải màn riêng; vẽ minh họa danh sách thả xuống và hộp xác nhận khi có thay đổi chưa lưu.

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ Ô chọn đơn vị thao tác (đầu trang, dùng chung)                             │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│ Đơn vị đang thao tác [1]:  [v: Sở TN&MT                     ]              │
│                            +---------------------------------+             │
│                            | (*) Sở TN&MT                    |             │
│                            | ( ) Sở Xây dựng                 |             │
│                            | ( ) Sở Giao thông               |             │
│                            +---------------------------------+             │
│                                                                            │
│ (!) [2] Có thay đổi chưa lưu. Đổi đơn vị sẽ bỏ các thay đổi này.           │
│                                    [3] < Ở lại >   [4][ Đổi đơn vị ]       │
└────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Đơn vị đang thao tác | Combobox | Select | • Chỉ hiện với Quản trị đơn vị phụ trách từ 2 đơn vị trở lên; danh sách là các đơn vị đang phụ trách và hoạt động. Mặc định đơn vị chọn lần cuối hoặc đơn vị đầu tiên. Đặt ở đầu trang của các màn quản trị (hạn mức, báo cáo theo tài khoản, quản lý tài khoản, nhật ký). Mọi chức năng quản trị chỉ tác động tới đơn vị đang chọn (FC-040 BR-01).<br>• Bị bớt khỏi danh sách đơn vị phụ trách khi đang thao tác → thao tác tiếp theo báo mất quyền và chuyển về đơn vị còn lại. |
| 2 | Cảnh báo thay đổi chưa lưu | Label | ReadOnly | • Đổi đơn vị khi đang có dữ liệu chưa lưu → hỏi xác nhận bỏ thay đổi. |
| 3 | Ở lại | Link | Click | • Giữ đơn vị hiện tại và dữ liệu đang nhập. |
| 4 | Đổi đơn vị | Button | Click | • Bỏ thay đổi, tải dữ liệu của đơn vị mới. |

---

## Screen: danh-sach-don-vi — Danh sách đơn vị

### Wireframe (ASCII)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Gửi dự thảo | Lịch sử kiểm tra | Kho văn bản                                           (o)3  [An v] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Quản trị người dùng      │ Danh sách đơn vị                                      [1][ + Thêm đơn vị ]      │
│ ----------------------   │ ---------------------------------------------------------------------------     │
│ *Đơn vị                  │ Mã đơn vị  Tên đơn vị   Mã iOffice  Trạng thái    Số TK  NCC mặc định [2]       │
│ Tài khoản người dùng     │ SO-TNMT    Sở TN&MT     IO-0101     Hoạt động      86    VNPT AI                │
│ Tài khoản quản trị       │ SO-XD      Sở Xây dựng  IO-0102     Hoạt động      54    OpenAI                 │
│ Phân quyền theo vai trò  │ SO-TC      Sở Tài chính IO-0103     Vô hiệu hóa    31    VNPT AI                │
│                          │                                         < Sửa > mỗi dòng [3]                    │
│ Đơn vị, tài khoản quản   │                                                                                 │
│ trị, phân quyền: Quản    │ (!) [4] Mã đơn vị hoặc mã iOffice đã tồn tại, hoặc thiếu thông tin bắt buộc.    │
│ trị hệ thống. Tài khoản  │                                                                                 │
│ người dùng: Quản trị     │                                                                                 │
│ đơn vị.                  │                                                                                 │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Thêm đơn vị | Button | Click | • Mở `form-don-vi` trống. Chỉ Quản trị hệ thống; vai trò khác → `truy-cap-bi-tu-choi` (FC-038 EX-03). |
| 2 | Bảng đơn vị | Table | Click | • Cột: Mã đơn vị, Tên, Mã iOffice, Trạng thái (Hoạt động / Vô hiệu hóa), Số tài khoản, Nhà cung cấp mặc định. Sắp xếp mặc định theo Tên.<br>• Đơn vị đồng bộ từ iOffice: mã iOffice và tên cập nhật tự động, không sửa tay `[GIẢ ĐỊNH]` (BR-02). |
| 3 | Sửa | Link | Click | • Mở `form-don-vi` với dữ liệu hiện có. |
| 4 | Thông báo lỗi | Label | ReadOnly | • Hiển thị khi lưu lỗi ở `form-don-vi`: `E-kiem-tra-phap-ly-092` "Mã đơn vị hoặc mã iOffice đã tồn tại, hoặc thiếu thông tin bắt buộc." |

---

## Screen: form-don-vi — Thêm hoặc sửa đơn vị (hộp thoại)

### Wireframe (ASCII)

> Hộp thoại phủ lên `danh-sach-don-vi`.

```text
┌────────────────────────────────────────────────────────────────────────────────────┐
│ Thêm đơn vị                                                              (x)       │
├────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                    │
│ Mã đơn vị (*) [1]         [SO-GTVT________] (không sửa sau khi lưu)                │
│ Tên đơn vị (*) [2]        [Sở Giao thông vận tải______________]                    │
│ Mã đơn vị iOffice [3]     [IO-0104________] (trống = chưa liên kết)                │
│ Trạng thái [4]            Hoạt động (chỉ đọc)                                      │
│ (!) [5] Mã đơn vị hoặc mã iOffice đã tồn tại, hoặc thiếu thông tin bắt buộc.       │
│                                                                                    │
│   [6][ Vô hiệu hóa đơn vị ]            [7] < Hủy >    [8][ Lưu ]                   │
└────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Mã đơn vị | Textbox | Text | • **Bắt buộc**, tối đa 30 ký tự, không trùng, chỉ chữ, số, gạch ngang, gạch dưới; không sửa sau khi lưu. |
| 2 | Tên đơn vị | Textbox | Text | • **Bắt buộc**, tối đa 200 ký tự. |
| 3 | Mã đơn vị iOffice | Textbox | Text | • Không bắt buộc, tối đa 50 ký tự; nếu có thì không trùng đơn vị khác. Dùng liên kết đồng bộ với iOffice (FC-042). |
| 4 | Trạng thái | Label | ReadOnly | • Chỉ đọc; đổi bằng nút Vô hiệu hóa / Kích hoạt lại. |
| 5 | Thông báo lỗi | Label | ReadOnly | • Trùng mã hoặc thiếu thông tin → `E-kiem-tra-phap-ly-092` tại ô. Hai quản trị cùng sửa: lần lưu sau báo đã thay đổi, tải lại. |
| 6 | Vô hiệu hóa đơn vị | Button | Click | • Chỉ khi sửa đơn vị đang hoạt động (đơn vị đã vô hiệu hóa hiện nút "Kích hoạt lại"). Mở `vo-hieu-hoa-don-vi-xac-nhan`. |
| 7 | Hủy | Link | Click | • Đóng hộp thoại, về `danh-sach-don-vi`. |
| 8 | Lưu | Button | Click | • Kiểm tra rồi lưu, ghi log giá trị trước và sau. |

---

## Screen: danh-sach-tai-khoan — Danh sách tài khoản

### Wireframe (ASCII)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Gửi dự thảo | Lịch sử kiểm tra | Kho văn bản                                           (o)3  [An v] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Quản trị người dùng      │ Danh sách tài khoản   Đơn vị thao tác [v: Sở TN&MT]       [1][ + Tạo tài khoản ]│
│ ----------------------   │ Từ khóa [2][______]  Đơn vị [3][v]  Trạng thái [4][v: Hoạt động]  Loại [5][v]   │
│ Đơn vị                   │ ---------------------------------------------------------------------------     │
│ *Tài khoản người dùng    │ Tên ĐN      Họ tên        Email           Vai trò   Loại   TT    Đăng nhập [6]  │
│ Tài khoản quản trị       │ nguyenvana  Nguyễn Văn A  a@sotnmt.vn     Người dùng iOffice HĐ    16/10 09:10  │
│ Phân quyền theo vai trò  │ tranthib    Trần Thị B    b@sotnmt.vn     Người dùng Rời    HĐ    15/10 14:00   │
│                          │ lethic      Lê Thị C      c@sotnmt.vn     Người dùng Rời    VHH   01/10 08:30   │
│ Đơn vị, tài khoản quản   │                                                  < Vô hiệu hóa > mỗi dòng [7]   │
│ trị, phân quyền: Quản    │                                                                                 │
│ trị hệ thống. Tài khoản  │ (!) [8] Bạn không quản lý tài khoản này.                                        │
│ người dùng: Quản trị     │ (!) [9] Không thể vô hiệu hóa tài khoản này.                                    │
│ đơn vị.                  │                                                                                 │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Tạo tài khoản | Button | Click | • Mở `tao-tai-khoan`. Danh sách trống → hiện nút này. Chỉ Quản trị đơn vị (đơn vị đang phụ trách). |
| 2 | Từ khóa | Textbox | Text | • Tên đăng nhập, họ tên hoặc email, so khớp tương đối. |
| 3 | Đơn vị | Combobox | Select | • Chỉ đơn vị trong phạm vi quản lý; dùng ô chọn đơn vị thao tác (`chon-don-vi-thao-tac`). |
| 4 | Trạng thái | Combobox | Select | • -- Tất cả -- / Hoạt động / Vô hiệu hóa; mặc định Hoạt động. |
| 5 | Loại | Combobox | Select | • -- Tất cả -- / Tài khoản iOffice / Tài khoản rời. |
| 6 | Bảng tài khoản | Table | ReadOnly | • Cột: Tên đăng nhập, Họ tên, Email, Đơn vị, Vai trò, Loại, Trạng thái, Lần đăng nhập gần nhất. Tài khoản iOffice tạo/cập nhật qua đồng bộ hoặc đăng nhập đầu; Quản trị đơn vị không sửa thông tin cá nhân của tài khoản iOffice (BR-02). |
| 7 | Vô hiệu hóa / Kích hoạt lại | Link | Click | • Mở `vo-hieu-hoa-tai-khoan`. Không thao tác trên tài khoản ngoài đơn vị phụ trách. |
| 8 | Lỗi phạm vi | Label | ReadOnly | • Tài khoản không thuộc đơn vị phụ trách → `E-kiem-tra-phap-ly-094` "Bạn không quản lý tài khoản này." |
| 9 | Lỗi vô hiệu hóa | Label | ReadOnly | • Vô hiệu hóa chính mình hoặc tài khoản quản trị → `E-kiem-tra-phap-ly-095` "Không thể vô hiệu hóa tài khoản này." (tài khoản quản trị do Quản trị hệ thống quản lý). |

---

## Screen: tao-tai-khoan — Tạo tài khoản người dùng (hộp thoại)

### Wireframe (ASCII)

> Hộp thoại phủ lên `danh-sach-tai-khoan`.

```text
┌────────────────────────────────────────────────────────────────────────────────────┐
│ Tạo tài khoản người dùng                                                  (x)      │
├────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                    │
│ Đơn vị (*) [1]            [v: Sở TN&MT]                                            │
│ Tên đăng nhập (*) [2]     [nguyenvanc_____________]                                │
│ Họ tên (*) [3]            [Nguyễn Văn C___________________]                        │
│ Email (*) [4]             [nguyenvanc@sotnmt.vn____________]                       │
│ Số điện thoại [5]         [0912345678__]                                           │
│ Vai trò [6]               Người dùng (cố định)                                     │
│ (!) [7] Tên đăng nhập hoặc email đã tồn tại, hoặc thiếu thông tin bắt buộc.        │
│ (!) [8] Đã tạo tài khoản nhưng chưa gửi được email kích hoạt.   < Gửi lại >        │
│                                                                                    │
│                                         [9] < Hủy >    [10][ Lưu ]                 │
└────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Đơn vị | Combobox | Select | • **Bắt buộc**, chỉ đơn vị đang phụ trách, mặc định đơn vị đang thao tác. |
| 2 | Tên đăng nhập | Textbox | Text | • **Bắt buộc**, tối đa 100 ký tự, không trùng toàn hệ thống (không phân biệt hoa thường), chỉ chữ, số, dấu chấm, gạch dưới, gạch ngang. |
| 3 | Họ tên | Textbox | Text | • **Bắt buộc**, tối đa 150 ký tự. |
| 4 | Email | Textbox | Text | • **Bắt buộc**, tối đa 150 ký tự, đúng định dạng, không trùng tài khoản khác (kể cả người đã có tài khoản iOffice → hướng dẫn dùng tài khoản iOffice). |
| 5 | Số điện thoại | Textbox | Text | • Không bắt buộc, tối đa 15 ký tự. |
| 6 | Vai trò | Label | ReadOnly | • Cố định "Người dùng"; Quản trị đơn vị không tạo hay sửa vai trò quản trị (BR-01). |
| 7 | Lỗi nhập | Label | ReadOnly | • Trùng hoặc thiếu trường → `E-kiem-tra-phap-ly-093` "Tên đăng nhập hoặc email đã tồn tại, hoặc thiếu thông tin bắt buộc." tại ô. |
| 8 | Lỗi gửi email | Label | ReadOnly | • Vẫn tạo tài khoản, hiện `E-kiem-tra-phap-ly-096` "Đã tạo tài khoản nhưng chưa gửi được email kích hoạt." kèm nút Gửi lại. |
| 9 | Hủy | Link | Click | • Đóng hộp thoại, về `danh-sach-tai-khoan`. |
| 10 | Lưu | Button | Click | • Tạo tài khoản rời vai trò Người dùng, trạng thái Hoạt động; gửi email kích hoạt có liên kết đặt mật khẩu lần đầu (hiệu lực 30 phút `[GIẢ ĐỊNH]`); ghi log. |

---

## Screen: vo-hieu-hoa-tai-khoan — Vô hiệu hóa hoặc kích hoạt lại tài khoản (hộp thoại)

### Wireframe (ASCII)

> Hộp thoại phủ lên `danh-sach-tai-khoan`.

```text
┌────────────────────────────────────────────────────────────────────────────────────┐
│ Vô hiệu hóa tài khoản                                                    (x)       │
├────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                    │
│ Tên đăng nhập: tranthib          Họ tên: Trần Thị B     [1]                        │
│ Trạng thái: Hoạt động            Hoạt động gần nhất: 15/10/2026 14:00              │
│                                                                                    │
│ Hành động [2]   (*) Vô hiệu hóa    ( ) Kích hoạt lại  (theo trạng thái hiện tại)   │
│                                                                                    │
│ (info) [3] Vô hiệu hóa: tài khoản không đăng nhập được, mọi phiên đang mở          │
│            bị đóng; văn bản cá nhân và lượt kiểm tra được giữ nguyên.              │
│                                                                                    │
│                                    [4] < Hủy >   [5][ Xác nhận ]                   │
└────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Thông tin tài khoản | Label | ReadOnly | • Tên đăng nhập, họ tên, trạng thái, hoạt động gần nhất. |
| 2 | Hành động | Radio | Select | • "Vô hiệu hóa" hoặc "Kích hoạt lại" tùy trạng thái hiện tại (chỉ hiện giá trị phù hợp). |
| 3 | Lưu ý | Label | ReadOnly | • Vô hiệu hóa: không đăng nhập được, đóng mọi phiên, giữ văn bản Cá nhân và lượt kiểm tra; kích hoạt lại khôi phục quyền truy cập (BR-03). |
| 4 | Hủy | Link | Click | • Đóng hộp thoại, không đổi. |
| 5 | Xác nhận | Button | Click | • Kiểm tra quyền trên tài khoản (`E-kiem-tra-phap-ly-094` nếu ngoài phạm vi; `E-kiem-tra-phap-ly-095` nếu là chính mình hoặc tài khoản quản trị), cập nhật trạng thái, ghi log. |

---

## Screen: tao-tai-khoan-quan-tri — Tạo hoặc sửa tài khoản quản trị (hộp thoại)

### Wireframe (ASCII)

> Mở từ menu "Tài khoản quản trị" (chỉ Quản trị hệ thống); khi sửa thì dùng chính hộp thoại này với dữ liệu hiện có.

```text
┌────────────────────────────────────────────────────────────────────────────────────┐
│ Tạo tài khoản quản trị đơn vị                                             (x)      │
├────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                    │
│ Tên đăng nhập (*) [1]     [quantri.sotnmt_________]                                │
│ Họ tên (*)                [Phạm Văn Quản___________________]                       │
│ Email (*)                 [quantri@sotnmt.vn_______________]                       │
│ Số điện thoại             [0987654321__]                                           │
│ Vai trò [2]               Quản trị đơn vị (cố định)                                │
│ Đơn vị quản lý (*) [3]    [v: Sở TN&MT, Sở Xây dựng (2)]                           │
│ (!) [4] Quản trị đơn vị cần phụ trách ít nhất một đơn vị.                          │
│ (!) [5] Không thể bỏ hết đơn vị. Hãy vô hiệu hóa tài khoản nếu không dùng nữa.     │
│                                                                                    │
│                                         [6] < Hủy >    [7][ Lưu ]                  │
└────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Tên đăng nhập, Họ tên, Email, Số điện thoại | Textbox | Text | • Như `tao-tai-khoan`, cùng ràng buộc; trùng hoặc thiếu → `E-kiem-tra-phap-ly-097` "Tên đăng nhập hoặc email đã tồn tại, hoặc thiếu thông tin bắt buộc." |
| 2 | Vai trò | Label | ReadOnly | • Cố định "Quản trị đơn vị". Chỉ Quản trị hệ thống tạo, sửa và vô hiệu hóa tài khoản quản trị (BR-02). |
| 3 | Đơn vị quản lý | Combobox nhiều giá trị | Select | • **Bắt buộc**, ít nhất 1 đơn vị đang hoạt động. Một tài khoản có thể phụ trách nhiều đơn vị; thêm hoặc bớt có hiệu lực từ phiên đăng nhập kế tiếp; được gán thêm đơn vị thì nhận thông báo "Bạn được gán quản lý thêm đơn vị <tên>". |
| 4 | Lỗi chưa chọn đơn vị | Label | ReadOnly | • `E-kiem-tra-phap-ly-098` "Quản trị đơn vị cần phụ trách ít nhất một đơn vị." |
| 5 | Lỗi bỏ hết đơn vị | Label | ReadOnly | • Khi sửa: `E-kiem-tra-phap-ly-099` "Không thể bỏ hết đơn vị. Hãy vô hiệu hóa tài khoản nếu không dùng nữa." |
| 6 | Hủy | Link | Click | • Đóng hộp thoại, về danh sách tài khoản quản trị. |
| 7 | Lưu | Button | Click | • Tạo tài khoản vai trò Quản trị đơn vị, gán đơn vị, gửi email kích hoạt như `tao-tai-khoan`; ghi log danh sách đơn vị trước và sau. |

---

## Screen: phan-quyen-vai-tro — Phân quyền theo vai trò

### Wireframe (ASCII)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Gửi dự thảo | Lịch sử kiểm tra | Kho văn bản                                           (o)3  [An v] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Quản trị người dùng      │ Phân quyền theo vai trò   Vai trò (*) [1] [v: Quản trị đơn vị]                  │
│ ----------------------   │ ---------------------------------------------------------------------------     │
│ Đơn vị                   │ Chức năng                    Xem  Thêm  Sửa  Hủy/Xóa  Xuất    [2]               │
│ Tài khoản người dùng     │ Văn bản kho cá nhân          [x]  [x]   [x]   [x]      (-)                      │
│ Tài khoản quản trị       │ Văn bản kho đơn vị           [x]  [x]   [x]   [x]      (-)                      │
│ *Phân quyền theo vai trò │ Gửi dự thảo, kết quả của mình [x]  [x]   (-)   [x]     [x]                      │
│                          │ Tài khoản người dùng         [x]  [x]   [x]   [x]      [ ]                      │
│ Đơn vị, tài khoản quản   │ Hạn mức tài khoản            [x]  (-)   [x]   (-)      (-)                      │
│ trị, phân quyền: Quản    │ Báo cáo theo tài khoản       [x]  (-)   (-)   (-)      [x]                      │
│ trị hệ thống. Tài khoản  │ Nhật ký gửi dữ liệu ra AI    [x]  (-)   (-)   (-)      [x]                      │
│ người dùng: Quản trị     │ (!) [3] Không thể bỏ quyền tối thiểu: Quản trị hệ thống phải giữ quyền phân     │
│ đơn vị.                  │     quyền và quản lý đơn vị.     (!) [4] Chưa lưu được phân quyền.              │
│                          │                                                  [5] < Hủy >   [6][ Lưu ]       │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Chọn vai trò | Combobox | Select | • Ba giá trị cố định: Người dùng / Quản trị đơn vị / Quản trị hệ thống; Quản trị hệ thống chỉ điều chỉnh quyền của vai trò, không tạo vai trò mới `[GIẢ ĐỊNH]` (BR-04). Chỉ Quản trị hệ thống mở màn này. |
| 2 | Ma trận quyền | Table + Checkbox | Check | • Hàng: chức năng; cột: Xem, Thêm, Sửa, Hủy/Xóa, Xuất; ô là checkbox, ô không áp dụng hiển thị xám (-). Quyền mặc định theo FC-041 BR-01 đến BR-03: Quản trị đơn vị = quyền Người dùng + kho đơn vị, quy tắc nhạy cảm đơn vị, tài khoản trong đơn vị, hạn mức, báo cáo theo tài khoản, nhật ký; không xem nội dung dự thảo và kết quả của người khác.<br>• Quyền mới áp dụng từ phiên đăng nhập kế tiếp `[CẦN XÁC NHẬN hiệu lực ngay]`. |
| 3 | Lỗi quyền tối thiểu | Label | ReadOnly | • `E-kiem-tra-phap-ly-100` "Không thể bỏ quyền tối thiểu: Quản trị hệ thống phải giữ quyền phân quyền và quản lý đơn vị." Không lưu. |
| 4 | Lỗi lưu | Label | ReadOnly | • Mất kết nối khi lưu → `E-kiem-tra-phap-ly-101` "Chưa lưu được phân quyền. Vui lòng thử lại." Giữ ma trận cũ. |
| 5 | Hủy | Link | Click | • Bỏ thay đổi chưa lưu. |
| 6 | Lưu | Button | Click | • Kiểm tra ràng buộc quyền tối thiểu, lưu ma trận, ghi log (vai trò, chức năng, quyền trước và sau, người đổi). |

---

## Screen: vo-hieu-hoa-don-vi-xac-nhan — Xác nhận vô hiệu hóa đơn vị (hộp thoại)

### Wireframe (ASCII)

> Hộp thoại phủ lên `form-don-vi`.

```text
┌────────────────────────────────────────────────────────────────────────────────────┐
│ Xác nhận vô hiệu hóa đơn vị                                              (x)       │
├────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                    │
│ Vô hiệu hóa đơn vị "Sở TN&MT"? [1]                                                 │
│                                                                                    │
│ (!) [2] Ảnh hưởng 86 tài khoản: không đăng nhập được và không tạo được lượt        │
│     kiểm tra mới. Lịch sử được giữ nguyên.                                         │
│ (info) [3] Đơn vị đang có 4 lượt Chờ xử lý hoặc Đang xử lý; các lượt này           │
│     vẫn hoàn tất bình thường.                                                      │
│                                                                                    │
│                                  [4] < Hủy >   [5][ Xác nhận vô hiệu hóa ]         │
└────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Nội dung xác nhận | Label | ReadOnly | • Nêu tên đơn vị. Đơn vị đã vô hiệu hóa thì màn đổi thành "Kích hoạt lại đơn vị" (khôi phục đăng nhập cho tài khoản đang Hoạt động, BR-03). |
| 2 | Số tài khoản bị ảnh hưởng | Label | ReadOnly | • Nêu số tài khoản; vô hiệu hóa chặn đăng nhập và tạo lượt mới của mọi tài khoản trong đơn vị, giữ nguyên lịch sử (BR-01); văn bản "Đơn vị" vẫn lưu. |
| 3 | Lượt đang chạy | Label | ReadOnly | • Có lượt Chờ xử lý hoặc Đang xử lý → cảnh báo nêu số lượt; vẫn cho vô hiệu hóa, lượt hoàn tất bình thường (EX-02). |
| 4 | Hủy | Link | Click | • Đóng hộp thoại, về `form-don-vi`. |
| 5 | Xác nhận vô hiệu hóa | Button | Click | • Đặt trạng thái Vô hiệu hóa, ghi log, gửi thông báo và email cho Quản trị đơn vị phụ trách: "Đơn vị <tên> đã bị vô hiệu hóa. Tài khoản trong đơn vị không thể đăng nhập." |

---
