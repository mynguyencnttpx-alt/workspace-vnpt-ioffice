# Flow: Quản trị người dùng & phân quyền

> Màn hình thuộc flow này: qt-danh-muc-khach-hang → qt-form-khach-hang → qt-moi-dau-moi → qt-danh-sach-tai-khoan → qt-chi-tiet-tai-khoan → qt-tao-tai-khoan-noibo → qt-phan-quyen → qt-ma-tran-phan-quyen → qt-nhat-ky-thao-tac. Flow tổng xem `../srs/ho-tro-cskh-userflow.md` Mục 1. Khung điều hướng nội bộ dùng chung: bản Figma là sidebar trái + thanh trên có chip Site/Vai trò; ASCII vẽ gọn thành 1 dòng đầu.
>
> Các mục ghi "(OQ-n)" đã có **đề xuất chờ khách hàng xác nhận** ở bảng cuối file (cập nhật 19/09/2026), cũng đã ghi vào tài liệu "Đề xuất Hệ thống Hỗ trợ & Chăm sóc Khách hàng.docx".

---

## Screen: qt-danh-muc-khach-hang — Danh mục khách hàng/site

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│ Danh mục khách hàng / site            [1] [ + Thêm khách hàng/site ] │
├──────────────────────────────────────────────────────────────────────┤
│ Tìm [2] [Bình Định___] Loại KH [v: Tất cả] [3] Dịch vụ [v: Tất cả]   │
├──────────────────────────────────────────────────────────────────────┤
│ Đơn vị               Loại   Dịch vụ    Site/tenant     Đầu mối       │
│ -------------------------------------------------------------------- │
│ UBND tỉnh Bình Định  Tỉnh   iOffice    site-bd         Nguyễn Văn A  │
│ Sở Nội vụ            Tỉnh   iOffice    site-snv        (chưa có)     │
│ Cty ABC              DN     iStorage   site-abc        Lê Văn C      │
│ Bộ Nội vụ            TW     iOffice    site-bnv        Phạm Thị D    │
│                                                                      │
│ Dòng chọn: UBND tỉnh Bình Định [4] < Sửa > [5] < Khởi tạo đầu mối >  │
│ [6] Trang 1/3                                                        │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | + Thêm khách hàng/site | Button | Click | • Chỉ **Quản trị viên** (UC1). Mở form thêm inline/panel: tên đơn vị, loại khách hàng (UBND tỉnh/thành, doanh nghiệp, trung ương), dịch vụ đang dùng (iOffice/iStorage), site/tenant, đầu mối liên hệ ban đầu (tên, email, SĐT lấy từ hợp đồng/biên bản bàn giao).<br>• Lưu → tạo bản ghi khách hàng/site mới; **đây là dữ liệu gốc** để định tuyến ticket (tỉnh/trung tâm) và phân vùng tài liệu (Đề xuất — Quản trị danh mục người dùng). Sau khi lưu hỏi "Khởi tạo tài khoản đầu mối ngay?" → `qt-moi-dau-moi` (theo userflow).<br>• Trùng site/tenant → báo trùng, không lưu [wording, mã E-… chưa có]. |
| 2 | Tìm kiếm | Textbox | Text | • Tìm theo tên đơn vị/site/đầu mối; rỗng → hiện tất cả. |
| 3 | Lọc loại KH / dịch vụ | Dropdown | Select | • Loại: Tất cả / UBND tỉnh-thành / Doanh nghiệp / Trung ương; Dịch vụ: theo danh mục. Kết hợp được. |
| 4 | Sửa | Link | Click | • Sửa thông tin đơn vị/site/đầu mối ngay tại dòng (UC25); không có màn chi tiết riêng. Lưu → cập nhật và **áp dụng cho định tuyến & phân vùng tài liệu** từ đó về sau.<br>• **Đổi loại KH (tỉnh ⇄ DN/TW) làm đổi team tiếp nhận** — thao tác nhạy cảm: hỏi xác nhận, ghi `qt-nhat-ky-thao-tac` (đổi định tuyến khách hàng); ticket đang xử lý có chuyển team theo không: đã đề xuất, chờ xác nhận (OQ-20).<br>• Xóa khách hàng/site: nguồn không nêu — không có nút xóa [GIẢ ĐỊNH]. |
| 5 | Khởi tạo đầu mối | Link | Click | • Sang `qt-moi-dau-moi` với đơn vị/site của dòng đã chọn. Dòng "(chưa có)" đầu mối cần làm bước này trước khi khách hàng dùng được hệ thống. |
| 6 | Phân trang | Pagination | Click | • Số bản ghi/trang: đã đề xuất, chờ xác nhận (OQ-11). |

- Header nội bộ dùng chung (không đánh số); Flow 7/8/9 là khu vực menu quản trị — các màn truy cập độc lập, không phải wizard. Dữ liệu mẫu chỉ minh họa.

- Bổ sung 21/09/2026: nút "Thêm khách hàng/site" mở `qt-form-khach-hang` (không còn mở thẳng `qt-moi-dau-moi`). **Sửa và đổi loại khách hàng vẫn làm tại chỗ ở màn này**, có hộp xác nhận và ghi `qt-nhat-ky-thao-tac`; ticket đang mở giữ team cũ (OQ-20c). Khách hàng đã tạo nhưng bỏ dở bước mời đầu mối hiện nhãn "Chưa có đầu mối" để mời sau.


---

## Screen: qt-form-khach-hang — Thêm khách hàng/site

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│     ┌──────────────────────────────────────────────────────────┐     │
│     │ Thêm khách hàng / site                                   │     │
│     │                                                          │     │
│     │ Tên đơn vị [1] [UBND tỉnh Bình Định_______________]      │     │
│     │ Loại khách hàng [2]                                      │     │
│     │   (*) UBND tỉnh/thành  ( ) Doanh nghiệp  ( ) Trung ương  │     │
│     │ (i) Loại khách hàng quyết định team tiếp nhận.           │     │
│     │ Dịch vụ đang dùng [3]  [x] iOffice  [ ] iStorage         │     │
│     │ Site/tenant [4] [site-bd_____]  (mã duy nhất)            │     │
│     ├──────────────────────────────────────────────────────────┤     │
│     │ [5] [ Lưu và mời đầu mối ]  [6] [ Hủy ]                  │     │
│     └──────────────────────────────────────────────────────────┘     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Tên đơn vị | Textbox | Text | • **Bắt buộc**. Tên đơn vị khách hàng (vd UBND tỉnh Bình Định). |
| 2 | Loại khách hàng | Radio group | Select | • **Bắt buộc**: UBND tỉnh/thành, Doanh nghiệp, Trung ương. **Quyết định team tiếp nhận**: khách hàng tỉnh → team tỉnh; doanh nghiệp/trung ương → team trung tâm (OQ-20c).<br>• Màn này chỉ để tạo mới; đổi loại về sau thao tác ở `qt-danh-muc-khach-hang` (xác nhận + ghi nhật ký). |
| 3 | Dịch vụ đang dùng | Checkbox group | Check | • **Chọn ≥1** trong iOffice, iStorage (danh mục dùng chung, `danhmuc-dich-vu-loai-van-de`); thiếu → báo lỗi tại nhóm. |
| 4 | Site/tenant | Textbox | Text | • **Bắt buộc**, mã site **duy nhất** (OQ-20b); trùng → lỗi ngay tại ô (xem Trạng thái phụ). |
| 5 | Lưu và mời đầu mối | Button | Click | • Disabled tới khi đủ [1]–[4] hợp lệ. Lưu khách hàng/site rồi sang `qt-moi-dau-moi` để nhập đầu mối và gửi lời mời; ghi nhật ký thao tác. |
| 6 | Hủy | Button | Click | • Về `qt-danh-muc-khach-hang`, không lưu gì. |

- **Đề xuất bổ sung theo thiết kế Figma (21/09/2026)** — tách bước tạo khách hàng/site khỏi bước mời đầu mối; sửa vẫn inline ở `qt-danh-muc-khach-hang`.

#### Trạng thái phụ — mã site trùng

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│     ┌──────────────────────────────────────────────────────────┐     │
│     │ Thêm khách hàng / site                                   │     │
│     │                                                          │     │
│     │ Tên đơn vị [1] [UBND tỉnh Bình Định_______________]      │     │
│     │ Site/tenant [4] [site-bd_____]                           │     │
│     │ (!) Mã site đã tồn tại. Vui lòng nhập mã khác.           │     │
│     ├──────────────────────────────────────────────────────────┤     │
│     │ [5] [ Lưu và mời đầu mối ]  [6] [ Hủy ]                  │     │
│     └──────────────────────────────────────────────────────────┘     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- Khác màn gốc: ô [4] báo "Mã site đã tồn tại. Vui lòng nhập mã khác." (wording tạm, chưa có mã E-…); [5] mờ tới khi sửa.


---

## Screen: qt-moi-dau-moi — Khởi tạo đầu mối + gửi lời mời

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│       ┌──────────────────────────────────────────────────────┐       │
│       │ Khởi tạo tài khoản đầu mối                           │       │
│       │                                                      │       │
│       │ Khách hàng / site                                    │       │
│       │ [1] [v: UBND tỉnh Bình Định - site-bd  ]             │       │
│       │                                                      │       │
│       │ Đầu mối liên hệ chính thức                           │       │
│       │ Họ tên [2] [Nguyễn Văn A____________________]        │       │
│       │ Email  [3] [a.nguyen@ubnd.gov.vn____________]        │       │
│       │ SĐT    [4] [0912345678______________________]        │       │
│       │                                                      │       │
│       │ Gửi lời mời kích hoạt qua [5]                        │       │
│       │   [x] Email   [x] SMS                                │       │
│       ├──────────────────────────────────────────────────────┤       │
│       │ [6] [ Tạo & gửi lời mời ]  [7] [  Hủy  ]             │       │
│       └──────────────────────────────────────────────────────┘       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Khách hàng / site | Dropdown | Select | • **Bắt buộc**. Chọn từ danh mục khách hàng/site (tự chọn sẵn khi đi từ `qt-danh-muc-khach-hang`). Không có trong danh mục thì không tạo được tài khoản (neo xác thực vào dữ liệu hợp đồng/dự án, Đề xuất — Cơ chế cấp tài khoản). |
| 2 | Họ tên đầu mối | Textbox | Text | • **Bắt buộc**. Điền sẵn từ đầu mối đã lưu trong danh mục nếu có (tên/email/SĐT lấy từ hợp đồng/biên bản bàn giao); sửa ở đây thì cập nhật lại danh mục [GIẢ ĐỊNH]. |
| 3 | Email | Textbox | Text | • **Bắt buộc**, đúng định dạng; là nơi gửi lời mời và là định danh đăng nhập [GIẢ ĐỊNH]. Đã có tài khoản → báo trùng. |
| 4 | SĐT | Textbox | Text | • Bắt buộc khi chọn kênh SMS [GIẢ ĐỊNH]; định dạng số VN. |
| 5 | Kênh gửi lời mời | Checkbox group | Check | • Email / SMS (brandname) theo kênh đang bật ở `cauhinh-kenh-thongbao`; kênh đang tắt thì disabled. Ít nhất 1 kênh. |
| 6 | Tạo & gửi lời mời | Button | Click | • Tạo tài khoản đầu mối **chờ kích hoạt** rồi gửi lời mời (UC9); khóa khi submitting. Thành công → về `qt-danh-muc-khach-hang`, dòng đơn vị hiện đầu mối trạng thái "Chờ kích hoạt". Người nhận bấm link → `kh-kich-hoat-tk`.<br>• **Ai được tạo:** Agent tỉnh (với KH tỉnh) hoặc Agent trung tâm/Quản trị viên (với KH doanh nghiệp/TW) — mỗi vai trò chỉ thấy khách hàng thuộc phạm vi mình. Không có trang đăng ký công khai.<br>• Lỗi gửi (Email/SMS lỗi) → tài khoản vẫn tạo, báo lỗi và cho gửi lại ở `qt-chi-tiet-tai-khoan` [GIẢ ĐỊNH]. |
| 7 | Hủy | Button | Click | • Về `qt-danh-muc-khach-hang`, không tạo gì. |

- Bổ sung 21/09/2026: **đầu mối chỉ nhập tại màn này** (`qt-form-khach-hang` không thu đầu mối). Vào từ `qt-form-khach-hang` sau khi lưu khách hàng/site; bỏ dở → về `qt-danh-muc-khach-hang`, khách hàng ở trạng thái "Chưa có đầu mối".


---

## Screen: qt-danh-sach-tai-khoan — Danh sách tài khoản

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│ Danh sách tài khoản                   [1] [ + Tạo tài khoản nội bộ ] │
├──────────────────────────────────────────────────────────────────────┤
│ Tìm [2] [nguyen________] Loại [v: Tất cả] [3] Vai trò [v: Tất cả] [4]│
├──────────────────────────────────────────────────────────────────────┤
│ Họ tên        Email             Vai trò     Đơn vị/Team Trạng thái   │
│ [5] ---------------------------------------------------------------  │
│ Nguyễn Văn A  a.nguyen@ubnd.vn  Đầu mối     UBND BĐ     Hoạt động    │
│ Trần Thị B    b.tran@vnpt.vn    Agent tỉnh  Team BĐ     Hoạt động    │
│ Lê Văn C      c.le@abc.vn       Khách hàng  Cty ABC     Chờ kích hoạt│
│ Hoàng E       e.hoang@vnpt.vn   Quản trị    Toàn HT     Vô hiệu      │
│                                                                      │
│ Trang 1/4                                                            │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | + Tạo tài khoản nội bộ | Button | Click | • Chỉ **Quản trị viên** → `qt-tao-tai-khoan-noibo` (UC41). |
| 2 | Tìm kiếm | Textbox | Text | • Theo họ tên/email; rỗng → tất cả. |
| 3 | Lọc loại tài khoản | Dropdown | Select | • Tất cả / Nội bộ / Khách hàng (Đề xuất — phân biệt 2 nhóm tài khoản). |
| 4 | Lọc vai trò / trạng thái | Dropdown | Select | • Vai trò: 6 vai trò RBAC; Trạng thái: Hoạt động / Chờ kích hoạt / Vô hiệu hóa. |
| 5 | Bảng tài khoản | Table | Select | • Cột: Họ tên, Email, Vai trò, Đơn vị/Team, Trạng thái. Bấm 1 dòng → `qt-chi-tiet-tai-khoan` (UC22, UC23).<br>• **Phạm vi:** Quản trị viên thấy mọi tài khoản (nội bộ + khách hàng); màn tương tự cho đầu mối chỉ thấy đúng thành viên đơn vị mình là `kh-danh-sach-thanh-vien`.<br>• Trạng thái "Vô hiệu" hiển thị mờ. Phân trang: OQ-11. |

- Dữ liệu mẫu chỉ minh họa (tên/email/đơn vị).

- Bổ sung 21/09/2026: có lối "Xem bảng quyền" (chỉ Quản trị viên) tới `qt-ma-tran-phan-quyen`.


---

## Screen: qt-chi-tiet-tai-khoan — Chi tiết tài khoản

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│ [1] < Quay lại danh sách >                                           │
├──────────────────────────────────────────────────────────────────────┤
│ Trần Thị B  (tài khoản nội bộ)             [2] Trạng thái: Hoạt động │
├──────────────────────────────────────────────────────────────────────┤
│ Email: b.tran@vnpt.vn          SĐT: 0987654321                       │
│ Vai trò: Agent tỉnh [3]        Team: Bình Định [4]                   │
│ Tạo ngày: 01/09/2026           Đăng nhập gần nhất: 17/09 08:00       │
├──────────────────────────────────────────────────────────────────────┤
│ [5] [ Phân quyền ]  [6] [ Vô hiệu hóa ]  [7] [ Gửi lại lời mời ]     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Quay lại danh sách | Link | Click | • Navigate → `qt-danh-sach-tai-khoan`. |
| 2 | Trạng thái tài khoản | Label (badge) | ReadOnly | • Hoạt động / Chờ kích hoạt / Vô hiệu hóa. |
| 3 | Vai trò | Label | ReadOnly | • Vai trò và phạm vi/site gắn kèm (UC23); đổi qua nút [5]. |
| 4 | Team / Đơn vị-site | Label | ReadOnly | • Nội bộ: team (trung tâm hoặc tỉnh/thành cụ thể). Khách hàng: đơn vị + site (không đổi được site của người được mời). |
| 5 | Phân quyền | Button | Click | • → `qt-phan-quyen` để gán/đổi vai trò (UC43). |
| 6 | Vô hiệu hóa / Kích hoạt lại | Button | Click | • Nhãn đổi theo trạng thái. **Vô hiệu hóa** (nhân sự nghỉ việc UC41; tài khoản khách hàng UC42): hộp thoại xác nhận nêu rõ tên + hậu quả "khóa quyền truy cập ngay" (tránh vô hiệu hóa nhầm tài khoản đang hoạt động); xác nhận → khóa, ghi nhật ký. **Kích hoạt lại** khôi phục quyền cũ.<br>• Tài khoản nội bộ đang giữ ticket dở → ticket xử lý thế nào: đã đề xuất, chờ xác nhận (OQ-20).<br>• Không tự vô hiệu hóa chính mình [GIẢ ĐỊNH]. |
| 7 | Gửi lại lời mời | Button | Click | • Chỉ hiện khi "Chờ kích hoạt" (kể cả link mời hết hạn — userflow edge): tạo link mới gửi Email/SMS. Số lần/khoảng cách gửi lại: OQ-6. |

- Vẽ ở tài khoản nội bộ đang hoạt động; nút [7] chỉ hiện khi "Chờ kích hoạt", nút [6] đổi nhãn theo trạng thái.


---

## Screen: qt-tao-tai-khoan-noibo — Tạo tài khoản nội bộ

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│       ┌──────────────────────────────────────────────────────┐       │
│       │ Tạo tài khoản nội bộ                                 │       │
│       │                                                      │       │
│       │ Họ tên   [1] [Trần Thị B____________________]        │       │
│       │ Email    [2] [b.tran@vnpt.vn________________]        │       │
│       │ SĐT      [3] [0987654321____________________]        │       │
│       │ Vai trò  [4] [v: Agent tỉnh               ]          │       │
│       │ Team     [5] [v: Bình Định                ]          │       │
│       │                                                      │       │
│       │ Vô hiệu hóa tài khoản nội bộ: thực hiện ở            │       │
│       │ màn Chi tiết tài khoản [6]                           │       │
│       ├──────────────────────────────────────────────────────┤       │
│       │ [7] [ Tạo tài khoản ]      [8] [  Hủy  ]             │       │
│       └──────────────────────────────────────────────────────┘       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Họ tên | Textbox | Text | • **Bắt buộc**. |
| 2 | Email | Textbox | Text | • **Bắt buộc**, đúng định dạng, duy nhất; là định danh đăng nhập nội bộ [GIẢ ĐỊNH]. Trùng → báo trùng, không tạo. |
| 3 | SĐT | Textbox | Text | • Không bắt buộc [GIẢ ĐỊNH]. |
| 4 | Vai trò | Dropdown | Select | • **Bắt buộc**: Agent tỉnh / Agent trung tâm / Biên tập nội dung / Quản trị viên / Chủ quản dịch vụ (Đề xuất — RBAC; vai trò Khách hàng không tạo ở đây). Chi tiết quyền xem `qt-phan-quyen`. |
| 5 | Team | Dropdown | Select | • **Bắt buộc với Agent**: team trung tâm hoặc 1 tỉnh/thành cụ thể (quyết định hàng đợi ticket agent thấy). Các vai trò khác: ẩn ô này; Chủ quản dịch vụ thay bằng ô chọn dịch vụ phụ trách [GIẢ ĐỊNH]. |
| 6 | Ghi chú vô hiệu hóa | Label | ReadOnly | • Vô hiệu hóa (UC41) thực hiện ở `qt-chi-tiet-tai-khoan` cho thống nhất với tài khoản khách hàng; màn này chỉ tạo tài khoản (đã đổi tên từ "Tạo/vô hiệu hóa"). |
| 7 | Tạo tài khoản | Button | Click | • **Disabled** tới khi [1], [2], [4] (và [5] nếu là agent) hợp lệ. Thành công → tạo tài khoản, gán team, về `qt-danh-sach-tai-khoan`. Cách cấp mật khẩu ban đầu/gửi thông tin đăng nhập: đã đề xuất, chờ xác nhận (OQ-18). |
| 8 | Hủy | Button | Click | • Về `qt-danh-sach-tai-khoan`, không tạo gì. |


---

## Screen: qt-phan-quyen — Phân quyền theo vai trò (RBAC)

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│ Phân quyền - Trần Thị B (b.tran@vnpt.vn)                             │
├──────────────────────────────────────────────────────────────────────┤
│ Vai trò hiện tại: Agent tỉnh          Chọn vai trò mới [1]           │
│                                                                      │
│ (*) Agent tỉnh          ticket thuộc tỉnh phụ trách                  │
│ ( ) Agent trung tâm     ticket khách hàng DN/trung ương              │
│ ( ) Biên tập nội dung   KB theo phạm vi được gán                     │
│ ( ) Quản trị viên       toàn hệ thống                                │
│ ( ) Chủ quản dịch vụ    chỉ xem báo cáo dịch vụ phụ trách            │
│ ( ) Khách hàng          chỉ site/dịch vụ của mình                    │
│                                                                      │
│ Phạm vi [2]: Team [v: Bình Định]                                     │
├──────────────────────────────────────────────────────────────────────┤
│ [3] [ Áp dụng ]   [4] [  Hủy  ]   [5] < Xem nhật ký thao tác >       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Danh sách vai trò | Radio group | Check | • 6 vai trò tối thiểu của đề xuất, mỗi vai trò kèm phạm vi dữ liệu: Khách hàng (site/dịch vụ của mình) · Agent tỉnh (ticket tỉnh phụ trách; xử lý, tạo phiếu OneBSS, xem KB chung + KB tỉnh) · Agent trung tâm (toàn bộ ticket KH doanh nghiệp/TW; xử lý, tạo phiếu OneBSS, xem báo cáo vận hành) · Biên tập nội dung (KB theo phạm vi gán; soạn/duyệt, không quản lý người dùng) · Quản trị viên (toàn hệ thống) · Chủ quản dịch vụ (chỉ xem báo cáo phạm vi dịch vụ phụ trách).<br>• Mỗi tài khoản 1 vai trò [GIẢ ĐỊNH]; tạo vai trò tùy chỉnh/chỉnh tay từng quyền: không có trong nguồn (chỉ gán/đổi vai trò cố định, UC43). "Đầu mối" có là vai trò riêng không: OQ-20.<br>• Không hạ quyền của quản trị viên cuối cùng (luôn còn ≥1) [GIẢ ĐỊNH]. |
| 2 | Phạm vi | Dropdown | Select | • Hiện theo vai trò: Team (agent), dịch vụ (chủ quản dịch vụ), phạm vi KB (biên tập). Khách hàng: đơn vị/site không đổi được ở đây. |
| 3 | Áp dụng | Button | Click | • Hộp thoại xác nhận nêu vai trò cũ → mới. Xác nhận → **áp dụng quyền tương ứng ngay** (UC43), về `qt-chi-tiet-tai-khoan`; **ghi nhật ký thao tác nhạy cảm (đổi quyền)**. Disabled khi chưa đổi gì. |
| 4 | Hủy | Button | Click | • Về `qt-chi-tiet-tai-khoan`, không đổi. |
| 5 | Xem nhật ký thao tác | Link | Click | • Sang `qt-nhat-ky-thao-tac` (theo userflow: từ phân quyền xem lịch sử thao tác nhạy cảm). |

- Bổ sung 21/09/2026: có link "Xem bảng quyền tổng quan" tới `qt-ma-tran-phan-quyen`.


---

## Screen: qt-ma-tran-phan-quyen — Bảng quyền theo vai trò (chỉ xem)

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│ Bảng quyền theo vai trò (chỉ xem)              [1] < Về tài khoản >  │
│ (i) Tham khảo, chờ khách hàng xác nhận [2]                           │
├──────────────────────────────────────────────────────────────────────┤
│ Chức năng [3]            KH   AgT  AgTT BT   QT   CQ                 │
│ ---------------------------------------------------------------      │
│ Tra cứu KB, hỏi AI       x    x    x    x    x    -                  │
│ Tạo & theo dõi ticket    x    -    -    -    x    -                  │
│ Xử lý ticket (team)      -    x    x    -    x    -                  │
│ Tạo phiếu OneBSS         -    x    x    -    x    -                  │
│ Soạn bài KB              -    x    -    x    x    -                  │
│ Duyệt & xuất bản KB      -    -    -    -    x    -                  │
│ Quản lý TK, phân quyền   -    -    -    -    x    -                  │
│ Cấu hình AI/OneBSS/SLA   -    -    -    -    x    -                  │
│ Xem báo cáo              -    cb   x    -    x    x                  │
│ KH=Khách AgT=A.tỉnh AgTT=A.TT BT=Biên tập QT=Quản trị CQ=Chủ quản    │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Về màn trước | Link | Click | • Quay về `qt-danh-sach-tai-khoan` hoặc `qt-phan-quyen` tùy nơi mở. |
| 2 | Nhãn tham khảo | Label | ReadOnly | • "Tham khảo, chờ khách hàng xác nhận" — bảng suy ra từ mô tả vai trò trong tài liệu đề xuất (OQ-28). |
| 3 | Bảng quyền | Table | ReadOnly | • Hàng = 9 nhóm chức năng, cột = 6 vai trò (Khách hàng, Agent tỉnh, Agent trung tâm, Biên tập, Quản trị viên, Chủ quản dịch vụ). `x` = được phép, `-` = không, `cb` = chỉ xem báo cáo cơ bản của team mình (Agent tỉnh — [GIẢ ĐỊNH] theo OQ-23b).<br>• **Chỉ xem**: đổi vai trò của 1 tài khoản làm ở `qt-phan-quyen`. Chỉ Quản trị viên mở được. |

- **Đề xuất bổ sung, chờ xác nhận (OQ-28).** Vào từ `qt-phan-quyen` và `qt-danh-sach-tai-khoan`; ký hiệu: KH=Khách hàng, AgT=Agent tỉnh, AgTT=Agent trung tâm, BT=Biên tập, QT=Quản trị viên, CQ=Chủ quản dịch vụ.


---

## Screen: qt-nhat-ky-thao-tac — Nhật ký thao tác (audit log)

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│ Nhật ký thao tác (audit log)                                         │
├──────────────────────────────────────────────────────────────────────┤
│ Hành động [v: Tất cả][1] Người [______][2] Từ [__/__] Đến [__/__][3] │
├──────────────────────────────────────────────────────────────────────┤
│ Thời gian   Người    Hành động      Đối tượng      Chi tiết          │
│ -------------------------------------------------------------------- │
│ 17/09 10:20 Hoàng E  Đổi quyền      Trần Thị B     Agent -> Biên tập │
│ 17/09 09:05 Hoàng E  Đổi định tuyến UBND Q.1       Tỉnh -> TW        │
│ 16/09 15:40 Lê Văn F Xóa tài liệu   Bài #A-102     Lỗi 403 ký số     │
│                                                                      │
│ [4] Trang 1/5                    Chỉ đọc - không sửa/xóa nhật ký     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Lọc hành động | Dropdown | Select | • Các thao tác nhạy cảm được ghi tối thiểu (Đề xuất — Nhật ký thao tác): **đổi quyền, xóa tài liệu, đổi định tuyến khách hàng**. Danh sách giá trị mở rộng nếu sau này ghi thêm loại khác. |
| 2 | Lọc người thực hiện | Textbox | Text | • Theo tên/email người thực hiện. |
| 3 | Lọc thời gian | Date range | Select | • Từ ngày – đến ngày; mặc định gần đây nhất [GIẢ ĐỊNH]. Đến < Từ → báo lỗi ngay tại ô [wording chưa có]. |
| 4 | Bảng nhật ký | Table | ReadOnly | • Cột: Thời gian, Người thực hiện, Hành động, Đối tượng, Chi tiết (giá trị trước → sau) (UC45). **Chỉ Quản trị viên xem**; chỉ đọc, không sửa/xóa/xuất được từ màn này [GIẢ ĐỊNH].<br>• Thời gian lưu giữ nhật ký, có xuất file không: đã đề xuất, chờ xác nhận (OQ-20). Empty: "Không có thao tác nào phù hợp". |

- Dữ liệu mẫu chỉ minh họa; "->" thay mũi tên để không lệch cột.


---

## Đề xuất đã cập nhật (chờ khách hàng xác nhận)

| Mã | Nội dung cần chốt | Đề xuất | Trạng thái |
|----|-------------------|---------|------------|
| OQ-20a | Đầu mối | Cờ "đầu mối" trên tài khoản khách hàng (không phải vai trò riêng); mỗi đơn vị/site 1-3 đầu mối do Quản trị viên chỉ định. | Chờ khách hàng xác nhận |
| OQ-20b | Danh mục khách hàng/site | Bắt buộc: tên đơn vị, loại KH, dịch vụ, site/tenant (mã duy nhất), đầu mối (tên, email, SĐT). Không xóa cứng: hết hợp đồng chuyển "Ngừng hoạt động", khóa tài khoản, giữ dữ liệu. | Chờ khách hàng xác nhận |
| OQ-20c | Đổi loại KH; vô hiệu hóa agent đang giữ ticket | Đổi loại KH: ticket đang mở giữ team cũ đến khi đóng, ticket mới theo loại mới. Vô hiệu hóa agent: yêu cầu chuyển ticket sang agent khác, chưa chuyển thì tự về hàng đợi team. | Chờ khách hàng xác nhận |
| OQ-20d | Nhật ký thao tác | Chỉ Quản trị viên xem, chỉ đọc; giữ 12 tháng trực tuyến; xuất được Excel. | Chờ khách hàng xác nhận |
| OQ-28 | Bảng quyền vai trò × chức năng chính thức (bổ sung OQ-23b) | Dùng `qt-ma-tran-phan-quyen` làm tham khảo; Agent tỉnh chỉ xem báo cáo cơ bản của team mình. | Chờ khách hàng xác nhận |
