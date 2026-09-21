# Flow: Đăng nhập chung & kích hoạt tài khoản

> Màn hình thuộc flow này: dang-nhap → kh-kich-hoat-tk → kh-kich-hoat-tk-het-han → kh-quen-mat-khau → kh-danh-sach-thanh-vien → kh-moi-thanh-vien → kh-tai-khoan-ca-nhan. Flow tổng xem `../srs/ho-tro-cskh-userflow.md` Mục 1.
>
> Các mục ghi "(OQ-n)" đã có **đề xuất chờ khách hàng xác nhận** ở bảng cuối file (cập nhật 19/09/2026), cũng đã ghi vào tài liệu "Đề xuất Hệ thống Hỗ trợ & Chăm sóc Khách hàng.docx".

---

## Screen: dang-nhap — Đăng nhập (dùng chung mọi vai trò)

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Hỗ trợ & Chăm sóc Khách hàng                                         │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│            ┌────────────────────────────────────────────┐            │
│            │ Đăng nhập                                  │            │
│            │                                            │            │
│            │ Email đăng nhập                            │            │
│            │ [1] [nguyen.van.a@ubnd.gov.vn__________]   │            │
│            │                                            │            │
│            │ Mật khẩu                                   │            │
│            │ [2] [********________________] (eye) [3]   │            │
│            │                                            │            │
│            │ [4] [            Đăng nhập             ]   │            │
│            │                                            │            │
│            │ [5] < Quên mật khẩu >                      │            │
│            ├────────────────────────────────────────────┤            │
│            │ [6] Chưa có tài khoản? Liên hệ đầu         │            │
│            │     mối đơn vị hoặc quản trị viên.         │            │
│            └────────────────────────────────────────────┘            │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Email đăng nhập | Textbox | Text | • **Bắt buộc**. Định danh tài khoản do đơn vị cấp / đầu mối mời (khách hàng) hoặc do quản trị viên tạo (nhân viên) — không có đăng ký công khai (Đề xuất, mục Quản trị hệ thống 2).<br>• [GIẢ ĐỊNH] email làm tên đăng nhập, **duy nhất toàn hệ thống**; một email có thể có cả quyền khách hàng lẫn vai trò nội bộ (OQ-33). Màn dùng chung cho mọi vai trò, không có màn đăng nhập nội bộ riêng (OQ-32).<br>• States: default / focus / lỗi. |
| 2 | Mật khẩu | Textbox (password) | Text | • **Bắt buộc**. Che ký tự mặc định.<br>• Đăng nhập chỉ so khớp mật khẩu; quy tắc độ mạnh mật khẩu áp ở màn đặt mật khẩu [2] — đã đề xuất, chờ xác nhận (OQ-5). |
| 3 | Hiện/ẩn mật khẩu | Icon button (eye) | Click | • Bật/tắt hiển thị ký tự mật khẩu, không đổi giá trị đã nhập. |
| 4 | Đăng nhập | Button | Click | • **Disabled** tới khi [1] và [2] đều có giá trị; trạng thái submitting: khóa nút, chống double-submit.<br>• Đúng → chuyển tới trang đầu theo loại tài khoản và vai trò: khách hàng → `kb-trang-chu`; Agent, Quản trị viên → `agent-hang-doi`; Chủ quản dịch vụ → `baocao-tong-quan`; Biên tập nội dung → `kb-cho-duyet` (OQ-18). Người có cả tài khoản khách hàng lẫn vai trò nội bộ vào giao diện nội bộ trước, chuyển giao diện ở menu tài khoản (OQ-33). Nhiều vai trò → trang đầu của vai trò cao nhất; chưa có vai trò → `loi-403` (OQ-37).<br>• Sai → giữ nguyên màn, báo chung "Sai email hoặc mật khẩu" (không phân biệt email không tồn tại; wording tạm, chưa có mã E-…), xóa ô mật khẩu, cho thử lại.<br>• Sai 5 lần liên tiếp → tạm khóa 15 phút, báo còn bao lâu được thử lại (UC47, OQ-5).<br>• Tài khoản bị vô hiệu hóa (UC41/UC42): chỉ báo **sau khi mật khẩu đúng**, hướng dẫn liên hệ đầu mối/quản trị viên [wording chưa có nguồn].<br>• Tài khoản chờ kích hoạt: báo dùng link mời trong email (link hết hạn xem `kh-kich-hoat-tk-het-han`). |
| 5 | Quên mật khẩu | Link | Click | • Navigate → `kh-quen-mat-khau`.<br>• Dùng chung cho cả khách hàng và nhân viên (OQ-18, OQ-32). |
| 6 | Ghi chú cấp tài khoản | Label | ReadOnly | • Nhắc: khách hàng — tài khoản chỉ tạo qua lời mời của đầu mối/agent/quản trị viên; nhân viên — do quản trị viên cấp (UC41); không tự đăng ký (tự đăng ký không xác minh được người đăng ký là khách hàng thật).<br>• MVP chưa SSO; thiết kế cho phép bổ sung nút SSO sau mà không đổi bố cục. |

- Menu tài khoản ở mọi màn sau đăng nhập có "Đăng xuất" → quay về màn này; người có cả hai loại tài khoản có thêm "Chuyển giao diện khách hàng / nội bộ" (OQ-33). Màn đăng nhập nội bộ riêng (`noibo-dang-nhap`, số thứ tự [20]) đã gộp vào màn này.

#### Trạng thái phụ — sai email hoặc mật khẩu

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Hỗ trợ & Chăm sóc Khách hàng                                         │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│            ┌────────────────────────────────────────────┐            │
│            │ Đăng nhập                                  │            │
│            │                                            │            │
│            │ (!) Sai email hoặc mật khẩu. [1]           │            │
│            │                                            │            │
│            │ Email đăng nhập                            │            │
│            │ [nguyen.van.a@ubnd.gov.vn________]         │            │
│            │                                            │            │
│            │ Mật khẩu                                   │            │
│            │ [________________] (eye)                   │            │
│            │                                            │            │
│            │ [            Đăng nhập             ]       │            │
│            │                                            │            │
│            │ < Quên mật khẩu >                          │            │
│            └────────────────────────────────────────────┘            │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- [1] báo chung, không nói email có tồn tại hay không; ô mật khẩu được xóa, giữ email đã nhập; nút Đăng nhập trở lại bình thường.

#### Trạng thái phụ — tạm khóa 15 phút

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Hỗ trợ & Chăm sóc Khách hàng                                         │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│            ┌────────────────────────────────────────────┐            │
│            │ Đăng nhập                                  │            │
│            │                                            │            │
│            │ (!) Sai quá 5 lần, tạm khóa 15 phút. [1]   │            │
│            │                                            │            │
│            │ Email đăng nhập                            │            │
│            │ [nguyen.van.a@ubnd.gov.vn________]         │            │
│            │                                            │            │
│            │ Mật khẩu                                   │            │
│            │ [________________] (eye)                   │            │
│            │                                            │            │
│            │ [       Đăng nhập (đang khóa)      ]       │            │
│            │                                            │            │
│            │ < Quên mật khẩu >                          │            │
│            └────────────────────────────────────────────┘            │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- Sai 5 lần liên tiếp (UC47): [1] báo thời gian còn lại; nút Đăng nhập bị khóa tới hết 15 phút; đăng nhập đúng trong thời gian khóa cũng không vào được.


---

## Screen: kh-kich-hoat-tk — Đặt mật khẩu kích hoạt

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Hỗ trợ & Chăm sóc Khách hàng                                         │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│            ┌────────────────────────────────────────────┐            │
│            │ Kích hoạt tài khoản                        │            │
│            │                                            │            │
│            │ [1] Đơn vị: UBND tỉnh Bình Định            │            │
│            │     Tài khoản: nguyen.van.a@ubnd.gov.vn    │            │
│            ├────────────────────────────────────────────┤            │
│            │ Mật khẩu mới                               │            │
│            │ [2] [********________________] (eye) [3]   │            │
│            │                                            │            │
│            │ Nhập lại mật khẩu                          │            │
│            │ [4] [********________________] (eye) [5]   │            │
│            │                                            │            │
│            │ [6] [       Kích hoạt tài khoản        ]   │            │
│            └────────────────────────────────────────────┘            │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Thông tin lời mời | Label | ReadOnly | • Hiện đơn vị/site và email được mời (lấy từ lời mời) để người nhận xác nhận đúng tài khoản; không sửa được.<br>• Người được mời tự động gắn cố định vào site của đầu mối (Đề xuất — Cơ chế cấp tài khoản), không chọn được site khác. |
| 2 | Mật khẩu mới | Textbox (password) | Text | • **Bắt buộc**. Quy tắc độ dài/ký tự: đã đề xuất, chờ xác nhận (OQ-5).<br>• Sai quy tắc → báo lỗi inline dưới ô [wording chưa có, chưa có mã E-…]. |
| 3 | Hiện/ẩn mật khẩu mới | Icon button (eye) | Click | • Bật/tắt hiển thị ô [2]. |
| 4 | Nhập lại mật khẩu | Textbox (password) | Text | • **Bắt buộc**, phải khớp [2]; lệch → báo "Mật khẩu nhập lại chưa khớp" (wording tạm). |
| 5 | Hiện/ẩn nhập lại | Icon button (eye) | Click | • Bật/tắt hiển thị ô [4]. |
| 6 | Kích hoạt tài khoản | Button | Click | • **Disabled** tới khi [2], [4] hợp lệ và khớp nhau; khóa khi submitting.<br>• Thành công → chuyển `dang-nhap` (theo userflow: đặt mật khẩu xong quay về đăng nhập).<br>• **Link mời hết hạn hoặc đã dùng** (khi mở link hoặc khi bấm nút) → không hiện form, chuyển sang `kh-kich-hoat-tk-het-han`. Thời hạn link: đề xuất 7 ngày (OQ-6). |

- Màn dùng chung: mở từ link mời (kích hoạt) hoặc từ link đặt lại mật khẩu gửi bởi `kh-quen-mat-khau` (tiêu đề và nút đổi thành "Đặt lại mật khẩu", link hiệu lực 30 phút; hết hạn hoặc đã dùng → `kh-kich-hoat-tk-het-han`). Nhân viên (email mời do quản trị viên tạo, OQ-18) dùng chính màn này; dòng "Đơn vị" chỉ hiện với khách hàng (OQ-40).


---

## Screen: kh-kich-hoat-tk-het-han — Liên kết mời hết hạn

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Hỗ trợ & Chăm sóc Khách hàng                                         │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│            ┌────────────────────────────────────────────┐            │
│            │ Liên kết đã hết hạn                        │            │
│            │                                            │            │
│            │ Liên kết mời kích hoạt tài khoản này đã    │            │
│            │ hết hạn hoặc đã được sử dụng. [1]          │            │
│            │                                            │            │
│            │ Vui lòng liên hệ đầu mối đơn vị hoặc quản  │            │
│            │ trị viên để được gửi lại lời mời. [2]      │            │
│            ├────────────────────────────────────────────┤            │
│            │ [3] < Về trang đăng nhập >                 │            │
│            └────────────────────────────────────────────┘            │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Thông báo hết hạn | Label | ReadOnly | • Hiện khi mở link mời đã **hết hạn (đề xuất 7 ngày, OQ-6) hoặc đã dùng rồi**; không hiện form đặt mật khẩu và không tiết lộ thông tin tài khoản/đơn vị. Tách thành màn riêng vì loại trừ với form `kh-kich-hoat-tk` (ba-conventions Mục 8). |
| 2 | Hướng dẫn liên hệ | Label | ReadOnly | • Nhắc liên hệ đầu mối đơn vị hoặc quản trị viên để **gửi lại lời mời** (nút "Gửi lại lời mời" ở `qt-chi-tiet-tai-khoan`; đề xuất tối đa 5 lần/ngày/tài khoản). Người nhận mở link mới → quay lại `kh-kich-hoat-tk`. |
| 3 | Về trang đăng nhập | Link | Click | • Navigate → `dang-nhap` (nếu đã kích hoạt xong trước đó thì đăng nhập được bình thường). |


---

## Screen: kh-quen-mat-khau — Quên mật khẩu / đặt lại

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Hỗ trợ & Chăm sóc Khách hàng                                         │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│            ┌────────────────────────────────────────────┐            │
│            │ Quên mật khẩu                              │            │
│            │ Nhập email đã được cấp tài khoản để        │            │
│            │ nhận liên kết đặt lại mật khẩu.            │            │
│            │                                            │            │
│            │ [1] [nguyen.van.a@ubnd.gov.vn__________]   │            │
│            │                                            │            │
│            │ [2] [       Gửi liên kết đặt lại       ]   │            │
│            │                                            │            │
│            │ [3] < Quay lại đăng nhập >                 │            │
│            ├────────────────────────────────────────────┤            │
│            │ [4] Không nhận được email? Liên hệ         │            │
│            │     đầu mối đơn vị hoặc quản trị viên.     │            │
│            └────────────────────────────────────────────┘            │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Email | Textbox | Text | • **Bắt buộc**, đúng định dạng email.<br>• States: default / focus / lỗi định dạng (inline). |
| 2 | Gửi liên kết đặt lại | Button | Click | • **Disabled** tới khi [1] hợp lệ; khóa khi submitting.<br>• Email có trong danh mục tài khoản (khách hàng hoặc nhân viên) → gửi liên kết đặt lại; người dùng mở link → `kh-kich-hoat-tk` (đặt lại mật khẩu, OQ-40), đặt xong quay về `dang-nhap` (userflow).<br>• Email KHÔNG có trong danh mục → vẫn hiện thông báo trung lập giống trường hợp có, không xác nhận email tồn tại hay không (chống dò tài khoản), kèm gợi ý [4].<br>• Thời hạn liên kết, giới hạn số lần gửi: đã đề xuất, chờ xác nhận (OQ-6). |
| 3 | Quay lại đăng nhập | Link | Click | • Navigate → `dang-nhap`. |
| 4 | Gợi ý liên hệ đầu mối | Label | ReadOnly | • Hiện sau khi gửi (và luôn hiện dưới nút) để người không nhận được email biết đường xử lý — vì tài khoản không tự đăng ký được (userflow edge: email không có trong danh mục). |


---

## Screen: kh-danh-sach-thanh-vien — Danh sách thành viên đơn vị

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi | Thành viên   (o) A v   │
├──────────────────────────────────────────────────────────────────────┤
│ Thành viên đơn vị - UBND Bình Định  [1] [ + Mời thêm người dùng ]    │
├──────────────────────────────────────────────────────────────────────┤
│ Họ tên            Email                  Vai trò     Trạng thái [2]  │
│ -------------------------------------------------------------------- │
│ Nguyễn Văn A      a.nguyen@ubnd.gov.vn   Đầu mối     Đang hoạt động  │
│ Trần Thị B        b.tran@ubnd.gov.vn     Thành viên  Đang hoạt động  │
│ Lê Văn C          c.le@ubnd.gov.vn       Thành viên  Chờ kích hoạt   │
│                                                                      │
│ [3] Tổng: 3 thành viên                                               │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | + Mời thêm người dùng | Button | Click | • Chỉ tài khoản **đầu mối** thấy màn này và nút này (RBAC: khách hàng thường không có mục "Thành viên" trên menu).<br>• Click → `kh-moi-thanh-vien`. |
| 2 | Bảng thành viên | Table | ReadOnly | • Cột: Họ tên, Email, Vai trò (Đầu mối/Thành viên), Trạng thái (Chờ kích hoạt/Đang hoạt động) — [GIẢ ĐỊNH] tập cột; đề xuất/UC22 chỉ nói "danh sách tài khoản trong phạm vi quản lý".<br>• Phạm vi dữ liệu: chỉ người dùng thuộc cùng đơn vị/site của đầu mối (không thấy site khác).<br>• Không có thao tác khóa/đổi vai trò tại đây — việc đó thuộc Quản trị viên (UC42/43).<br>• Empty state: chỉ có chính đầu mối → hiện "Chưa mời thành viên nào" [wording tạm]. |
| 3 | Tổng số thành viên | Label | ReadOnly | • Đếm theo bảng [2]. Phân trang/tìm kiếm khi danh sách dài: đã đề xuất, chờ xác nhận (OQ-7). |

- Chỉ đầu mối thấy màn này. Header dùng chung (không đánh số): logo, menu Tra cứu / Hỏi đáp AI / Ticket của tôi / Thành viên (chỉ đầu mối), menu người dùng.


---

## Screen: kh-moi-thanh-vien — Mời thêm người dùng

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi | Thành viên   (o) A v   │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│        ┌────────────────────────────────────────────────────┐        │
│        │ Mời thêm người dùng                                │        │
│        │                                                    │        │
│        │ Họ tên                                             │        │
│        │ [1] [Trần Thị B______________________________]     │        │
│        │ Email                                              │        │
│        │ [2] [b.tran@ubnd.gov.vn______________________]     │        │
│        │ Số điện thoại                                      │        │
│        │ [3] [0912345678______________________________]     │        │
│        │                                                    │        │
│        │ [4] Site: UBND tỉnh Bình Định (cố định)            │        │
│        ├────────────────────────────────────────────────────┤        │
│        │ [5] [   Gửi lời mời    ] [6] [    Hủy     ]        │        │
│        └────────────────────────────────────────────────────┘        │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Họ tên | Textbox | Text | • **Bắt buộc** [GIẢ ĐỊNH — UC10 chỉ nói "thông tin người dùng cần mời"]. |
| 2 | Email | Textbox | Text | • **Bắt buộc**, đúng định dạng; nơi nhận lời mời kích hoạt và là định danh đăng nhập [GIẢ ĐỊNH].<br>• Email đã có tài khoản trong hệ thống → báo trùng, không tạo mới [wording/mã lỗi chưa có nguồn]. |
| 3 | Số điện thoại | Textbox | Text | • [GIẢ ĐỊNH] tùy chọn; dùng nhận lời mời qua SMS (brandname) khi kênh SMS bật (`cauhinh-kenh-thongbao`). |
| 4 | Site gắn kèm | Label | ReadOnly | • Hiển thị site của đầu mối, **không chọn/sửa được** — mọi tài khoản mời thêm tự gắn cố định vào đúng site của đầu mối (Đề xuất — Cơ chế cấp tài khoản). |
| 5 | Gửi lời mời | Button | Click | • **Disabled** tới khi [1], [2] hợp lệ; khóa khi submitting.<br>• Thành công → hệ thống tạo tài khoản chờ kích hoạt, gửi lời mời qua Email/SMS, quay về `kh-danh-sach-thanh-vien` (thành viên mới trạng thái "Chờ kích hoạt").<br>• Lỗi gửi (kênh thông báo lỗi) → giữ nguyên form, báo lỗi [wording chưa có nguồn]. |
| 6 | Hủy | Button | Click | • Bỏ nhập, quay về `kh-danh-sach-thanh-vien`; nếu đã nhập dở → hỏi xác nhận bỏ [GIẢ ĐỊNH]. |


---

## Screen: kh-tai-khoan-ca-nhan — Tài khoản cá nhân

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi | Thành viên   (o) A v   │
├──────────────────────────────────────────────────────────────────────┤
│ Tài khoản cá nhân                                                    │
├──────────────────────────────────────────────────────────────────────┤
│ Thông tin cá nhân                                                    │
│ Họ tên [1] [Nguyễn Văn A________]  SĐT [2] [0912345678____]          │
│ Email  [3] a.nguyen@ubnd.gov.vn (chỉ đọc)    [4] [ Lưu thông tin  ]  │
├──────────────────────────────────────────────────────────────────────┤
│ Đổi mật khẩu                                                         │
│ Hiện tại [5] [********__________]  Mới [6] [********__________]      │
│ Nhập lại mới [7] [********__________]    [8] [  Đổi mật khẩu  ]      │
├──────────────────────────────────────────────────────────────────────┤
│ Tài liệu đã lưu [9]                      [10] < Xem lịch sử ticket > │
│  - Hướng dẫn tạo văn bản đi                            < Bỏ lưu >    │
│  - Lỗi 403 khi ký số                                   < Bỏ lưu >    │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Họ tên | Textbox | Text | • [GIẢ ĐỊNH] sửa được (UC44 chỉ nói "thông tin cần sửa"). **Bắt buộc**. |
| 2 | Số điện thoại | Textbox | Text | • [GIẢ ĐỊNH] sửa được; dùng nhận thông báo SMS. |
| 3 | Email | Label | ReadOnly | • [GIẢ ĐỊNH] chỉ đọc vì là định danh đăng nhập + đích lời mời; muốn đổi phải qua quản trị viên/đầu mối. |
| 4 | Lưu thông tin | Button | Click | • **Disabled** khi chưa đổi gì hoặc [1] rỗng; thành công → báo "Đã cập nhật" (wording tạm); lỗi → giữ nguyên, báo lỗi [chưa có mã E-…]. |
| 5 | Mật khẩu hiện tại | Textbox (password) | Text | • **Bắt buộc** khi đổi mật khẩu (UC44: hệ thống xác thực trước khi cập nhật). Sai → báo "Mật khẩu hiện tại không đúng" (wording tạm), không đổi. |
| 6 | Mật khẩu mới | Textbox (password) | Text | • **Bắt buộc**; quy tắc độ mạnh: đã đề xuất, chờ xác nhận (OQ-5). |
| 7 | Nhập lại mật khẩu mới | Textbox (password) | Text | • **Bắt buộc**, phải khớp [6]. |
| 8 | Đổi mật khẩu | Button | Click | • **Disabled** tới khi [5][6][7] hợp lệ; thành công → báo "Đã đổi mật khẩu", giữ phiên hiện tại hay buộc đăng nhập lại: đã đề xuất, chờ xác nhận (OQ-5). |
| 9 | Tài liệu đã lưu | List | ReadOnly | • Danh sách bài KB khách hàng đã bấm "Lưu bài viết" ở `kb-chi-tiet-bai-viet`; click tên bài → `kb-chi-tiet-bai-viet`; "Bỏ lưu" gỡ khỏi danh sách.<br>• Chỉ hiện bài trong phạm vi dịch vụ/site của người dùng; bài đã bị ẩn/hủy → ẩn khỏi danh sách.<br>• Chưa làm "theo dõi cập nhật" ở MVP (đề xuất giai đoạn sau, OQ-8). Empty: "Chưa lưu tài liệu nào" (wording tạm). |
| 10 | Xem lịch sử ticket | Link | Click | • Navigate → `ticket-danh-sach-kh` (đề xuất mục 5: xem lịch sử ticket đã gửi). |

- Header dùng chung (không đánh số). Mục [9] phụ thuộc OQ-8.


---

## Đề xuất đã cập nhật (chờ khách hàng xác nhận)

| Mã | Nội dung cần chốt | Đề xuất | Trạng thái |
|----|-------------------|---------|------------|
| OQ-5 | Mật khẩu; khóa đăng nhập; đổi mật khẩu | Tối thiểu 8 ký tự gồm chữ hoa, chữ thường, số; sai 5 lần khóa 15 phút; đổi mật khẩu xong đăng xuất các phiên khác (giữ phiên hiện tại). | Chờ khách hàng xác nhận |
| OQ-6 | Thời hạn link mời/đặt lại; giới hạn gửi lại | Link mời 7 ngày; link đặt lại mật khẩu 30 phút; link đã dùng coi như hết hạn; gửi lại tối đa 5 lần/ngày/tài khoản. | Chờ khách hàng xác nhận |
| OQ-7 | Danh sách thành viên đơn vị | 20 dòng/trang, có tìm kiếm theo tên/email. | Chờ khách hàng xác nhận |
| OQ-8 | Cách lưu/theo dõi tài liệu | Nút "Lưu bài viết" ở chi tiết bài; danh sách "Bài viết đã lưu" trong Tài khoản cá nhân; chưa làm "theo dõi cập nhật" ở MVP. | Chờ khách hàng xác nhận |
| OQ-32 | Đường truy cập đăng nhập (bổ sung OQ-18) | Một địa chỉ duy nhất, một màn đăng nhập; hệ thống nhận biết loại tài khoản và chuyển tới trang đầu tương ứng, không tách hai cổng. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-33 | Người có cả tài khoản khách hàng và nội bộ | Email duy nhất toàn hệ thống; đăng nhập vào giao diện nội bộ trước, có nút chuyển giao diện ở menu tài khoản của cả hai giao diện. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-37 | Nhiều vai trò hoặc chưa có vai trò sau đăng nhập (bổ sung OQ-18) | Nhiều vai trò: trang đầu của vai trò cao nhất (Quản trị viên, Chủ quản dịch vụ, Agent, Biên tập nội dung); chưa có vai trò hoặc chưa có team: `loi-403`. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-40 | Đặt lại mật khẩu (bổ sung OQ-6, OQ-18) | Dùng chung màn `kh-kich-hoat-tk`, tiêu đề "Đặt lại mật khẩu"; link hiệu lực 30 phút, hết hạn hoặc đã dùng sang `kh-kich-hoat-tk-het-han`; áp dụng cả nhân viên. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
