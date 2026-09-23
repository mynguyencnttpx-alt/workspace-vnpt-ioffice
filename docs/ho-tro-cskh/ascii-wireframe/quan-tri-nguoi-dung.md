# Flow: Quản trị người dùng & phân quyền

> Màn hình thuộc flow này: qt-danh-muc-khach-hang (⇄ tab qt-danh-muc-site) → qt-form-khach-hang → qt-moi-dau-moi → qt-danh-sach-tai-khoan → qt-chi-tiet-tai-khoan → qt-tao-tai-khoan-noibo → qt-phan-quyen → qt-ma-tran-phan-quyen → qt-nhat-ky-thao-tac. Flow tổng xem `../srs/ho-tro-cskh-userflow.md` Mục 1. Khung điều hướng nội bộ dùng chung: bản Figma là sidebar trái + thanh trên có chip Site/Vai trò; ASCII vẽ gọn thành 1 dòng đầu.
>
> Các mục ghi "(OQ-n)" đã được **khách hàng xác nhận (21/09/2026)** ở bảng cuối file (cập nhật 19/09/2026), cũng đã ghi vào tài liệu "Đề xuất Hệ thống Hỗ trợ & Chăm sóc Khách hàng.docx".
>
> **Cập nhật 23/09/2026 (1):** rà soát phát hiện `qt-danh-muc-khach-hang` chưa có hình minh họa cho việc "Sửa" (chỉ có link tĩnh) — đã vẽ bổ sung modal "Sửa thông tin đơn vị" trên Figma. Xem [4] ở màn đó.
>
> **Cập nhật 23/09/2026 (2) — tách Site khỏi khách hàng:** thiết kế gốc gộp "khách hàng" và "site/tenant" thành 1 khái niệm (1 site = 1 khách hàng). Khách hàng xác nhận thực tế khác: khách hàng lớn (UBND tỉnh) có site riêng, nhưng khách hàng nhỏ lẻ dùng CHUNG 1 site theo dịch vụ; 1 khách hàng dùng ≥2 dịch vụ (iOffice + iStorage) thì gắn ≥2 site khác nhau. Đã tách thành 2 tab trong `qt-danh-muc-khach-hang`: tab "Site" (mới, quản lý danh mục site) + tab "Danh mục khách hàng" (sửa, chọn ≥1 site có sẵn thay vì tự khai site/tenant mới). Xem chi tiết ở từng màn dưới + `docs/ho-tro-cskh/srs/ho-tro-cskh-erd.md` entity `SITE`/`KHACH_HANG`.

---

## Screen: qt-danh-muc-site — Danh mục Site (mới, 23/09/2026)

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│ < Danh mục khách hàng | [T] Site >          [1] [ + Thêm Site ]      │
├──────────────────────────────────────────────────────────────────────┤
│ Tìm [2] [site-bd______] Dịch vụ [3] [v: Tất cả]                      │
├──────────────────────────────────────────────────────────────────────┤
│ Tên Site         Dịch vụ    Số KH đang dùng   Trạng thái             │
│ ---------------------------------------------------------------------│
│ site-bd          iOffice    2                 Đang dùng              │
│ site-snv         iOffice    1                 Đang dùng              │
│ site-nho-le      iOffice    18                Đang dùng              │
│ site-bnv         iOffice    1                 Đang dùng              │
│ site-bnv-is      iStorage   1                 Đang dùng              │
│                                                                      │
│ Dòng chọn: site-nho-le [4] < Sửa >                                   │
│ [5] Trang 1/1                                                        │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| T | Tab Site / Danh mục khách hàng | Tabs | Click | • 2 tab trong cùng Chức năng 1: "Danh mục khách hàng" (mặc định) và "Site" (mới). Site tạo trước ở tab này rồi mới chọn được khi thêm khách hàng ở tab kia. |
| 1 | + Thêm Site | Button | Click | • Chỉ **Quản trị viên**. Mở form: Tên Site (textbox, bắt buộc, duy nhất), Dịch vụ (dropdown, bắt buộc, chọn đúng 1 — **1 site chỉ thuộc 1 dịch vụ**). Trùng tên → báo lỗi tại ô, không lưu [wording tạm].<br>• Site tạo xong hiện ngay trong dropdown "Site sử dụng" ở `qt-form-khach-hang` — dùng chung được cho nhiều khách hàng (đã chốt 23/09/2026). |
| 2 | Tìm kiếm | Textbox | Text | • Tìm theo tên site; rỗng → hiện tất cả. |
| 3 | Lọc dịch vụ | Dropdown | Select | • Tất cả / iOffice / iStorage. |
| 4 | Sửa | Link | Click | • Sửa tên Site (dịch vụ không sửa được sau khi tạo, vì bài viết/hội thoại AI đã lập chỉ mục theo dịch vụ đó — đổi dịch vụ phải tạo Site mới `[GIẢ ĐỊNH]`). |
| 5 | Phân trang | Pagination | Click | • 10 bản ghi/trang, đồng bộ chuẩn phân trang chung hệ thống (OQ-11). |

- Cột "Số KH đang dùng" > 1 nghĩa là site dùng chung (site-bd: UBND tỉnh Bình Định + Sở Nội vụ cùng dùng; site-nho-le: 18 khách hàng nhỏ lẻ dùng chung). Bấm số → xem nhanh danh sách khách hàng đang dùng site đó `[GIẢ ĐỊNH — chưa có nguồn, hợp lý về UX]`.
- Không có nút xóa Site đang có khách hàng dùng — chỉ chuyển "Ngừng dùng" (đồng bộ quy tắc "không xóa cứng dữ liệu gốc" của khách hàng, OQ-20b).

---

## Screen: qt-danh-muc-khach-hang — Danh mục khách hàng

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│ [T] Danh mục khách hàng | Site >          [1] [ + Thêm khách hàng ]  │
├──────────────────────────────────────────────────────────────────────┤
│ Tìm [2] [Bình Định___] Loại KH [v: Tất cả] [3] Site [v: Tất cả]      │
├──────────────────────────────────────────────────────────────────────┤
│ Đơn vị               Loại   Site đang dùng          Đầu mối          │
│ ---------------------------------------------------------------------│
│ UBND tỉnh Bình Định  Tỉnh   site-bd (iOffice)        Nguyễn Văn A    │
│ Sở Nội vụ            Tỉnh   site-bd (iOffice)        (chưa có)      │
│ Cty ABC              DN     site-nho-le (iOffice)    Lê Văn C       │
│ Bộ Nội vụ            TW     site-bnv (iOffice) +1    Phạm Thị D     │
│                                                                      │
│ Dòng chọn: UBND tỉnh Bình Định [4] < Sửa > [5] < Khởi tạo đầu mối >  │
│ [6] Trang 1/3                                                        │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | + Thêm khách hàng | Button | Click | • Chỉ **Quản trị viên** (UC1). Mở form (`qt-form-khach-hang`): tên đơn vị, loại khách hàng (UBND tỉnh/thành, doanh nghiệp, trung ương), **Site sử dụng** (chọn ≥1 từ danh mục Site đã có, mỗi dịch vụ chỉ chọn tối đa 1 site — đã chốt 23/09/2026), đầu mối liên hệ ban đầu (tên, email, SĐT lấy từ hợp đồng/biên bản bàn giao).<br>• Lưu → tạo bản ghi khách hàng mới; **đây là dữ liệu gốc** để định tuyến ticket (tỉnh/trung tâm) và phân vùng tài liệu theo site đã chọn (Đề xuất — Quản trị danh mục người dùng). Sau khi lưu hỏi "Khởi tạo tài khoản đầu mối ngay?" → `qt-moi-dau-moi` (theo userflow).<br>• Chưa có site cần dùng → bấm "+ Tạo Site mới" ngay trong form, không cần rời màn (xem `qt-danh-muc-site`). |
| 2 | Tìm kiếm | Textbox | Text | • Tìm theo tên đơn vị/tên site/đầu mối; rỗng → hiện tất cả. |
| 3 | Lọc loại KH / site | Dropdown | Select | • Loại: Tất cả / UBND tỉnh-thành / Doanh nghiệp / Trung ương; Site: theo danh mục Site. Kết hợp được. |
| 4 | Sửa | Link | Click | • Mở **modal "Sửa thông tin đơn vị"** giữa màn (nền mờ phía sau, đã vẽ Figma 23/09/2026) — không mở màn chi tiết riêng (UC28). Trường sửa được: Tên đơn vị, Loại khách hàng, Đầu mối liên hệ, **Site sử dụng** (thêm/bớt site — đã chốt 23/09/2026, sửa được ở đây thay vì "chỉ hiển thị" như bản gốc). Lưu → cập nhật và **áp dụng cho định tuyến & phân vùng tài liệu** từ đó về sau; bớt 1 site chỉ gỡ liên kết của khách hàng này, KHÔNG ảnh hưởng khách hàng khác đang dùng chung site đó.<br>• **Đổi loại KH (tỉnh ⇄ DN/TW) làm đổi team tiếp nhận** — thao tác nhạy cảm: modal hiện cảnh báo ngay tại field, hỏi xác nhận trước khi lưu, ghi `qt-nhat-ky-thao-tac` (đổi định tuyến khách hàng); ticket đang xử lý có chuyển team theo không: đã chốt (OQ-20).<br>• Xóa khách hàng: nguồn không nêu — không có nút xóa [GIẢ ĐỊNH]. |
| 5 | Khởi tạo đầu mối | Link | Click | • Sang `qt-moi-dau-moi` với khách hàng của dòng đã chọn. Dòng "(chưa có)" đầu mối cần làm bước này trước khi khách hàng dùng được hệ thống. |
| 6 | Phân trang | Pagination | Click | • 10 bản ghi/trang (đã chốt, OQ-11). |

- Cột "Site đang dùng" hiện tên site kèm dịch vụ; khách hàng dùng ≥2 dịch vụ hiện thêm "+N" (vd Bộ Nội vụ dùng cả iOffice và iStorage → 2 site, hiện "site-bnv (iOffice) +1" — bấm dòng để xem đủ). site-bd dùng chung cho cả UBND tỉnh Bình Định và Sở Nội vụ (site theo tỉnh); site-nho-le dùng chung cho nhiều khách hàng doanh nghiệp nhỏ lẻ cùng dịch vụ.
- Header nội bộ dùng chung (không đánh số); Flow 7/8/9 là khu vực menu quản trị — các màn truy cập độc lập, không phải wizard. Dữ liệu mẫu chỉ minh họa.

- Bổ sung 21/09/2026: nút "Thêm khách hàng" mở `qt-form-khach-hang` (không còn mở thẳng `qt-moi-dau-moi`). **Sửa và đổi loại khách hàng vẫn làm tại chỗ ở màn này**, có hộp xác nhận và ghi `qt-nhat-ky-thao-tac`; ticket đang mở giữ team cũ (OQ-20c). Khách hàng đã tạo nhưng bỏ dở bước tạo tài khoản đầu mối hiện nhãn "Chưa có tài khoản đầu mối" để mời sau.
- **Cập nhật 23/09/2026:** tách Site thành danh mục riêng (tab `qt-danh-muc-site`) — xem đầu file để biết lý do.


---

## Screen: qt-form-khach-hang — Thêm khách hàng

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│     ┌──────────────────────────────────────────────────────────┐     │
│     │ Thêm khách hàng                                          │     │
│     │                                                          │     │
│     │ Tên đơn vị [1] [UBND tỉnh Bình Định_______________]      │     │
│     │ Loại khách hàng [2]                                      │     │
│     │   (*) UBND tỉnh/thành  ( ) Doanh nghiệp  ( ) Trung ương  │     │
│     │ Site sử dụng [3]                                         │     │
│     │   [x] site-bd (iOffice)      [ ] site-bnv-is (iStorage) │     │
│     │   [ ] site-nho-le (iOffice)  [ ] site-snv (iOffice)      │     │
│     │   [4] [ + Tạo Site mới ]                                 │     │
│     ├──────────────────────────────────────────────────────────┤     │
│     │ Đầu mối liên hệ chính thức (từ hợp đồng/bàn giao)        │     │
│     │ Họ tên [5] [Nguyễn Văn A__________________]              │     │
│     │ Email  [6] [a.nguyen@ubnd.gov.vn___________]             │     │
│     │ SĐT    [7] [0912345678____________________]              │     │
│     ├──────────────────────────────────────────────────────────┤     │
│     │ [8] [ Lưu và tiếp tục mời đầu mối ]  [9] [ Hủy ]         │     │
│     └──────────────────────────────────────────────────────────┘     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Tên đơn vị | Textbox | Text | • **Bắt buộc**. Tên đơn vị khách hàng (vd UBND tỉnh Bình Định). |
| 2 | Loại khách hàng | Radio group | Select | • **Bắt buộc**: UBND tỉnh/thành, Doanh nghiệp, Trung ương. **Quyết định team tiếp nhận**: khách hàng tỉnh → team tỉnh; doanh nghiệp/trung ương → team trung tâm (OQ-20c).<br>• Màn này chỉ để tạo mới; đổi loại về sau thao tác ở `qt-danh-muc-khach-hang` (xác nhận + ghi nhật ký). |
| 3 | Site sử dụng | Checkbox group (đa chọn, có tìm) | Check | • **Chọn ≥1** từ danh mục Site đã có (`qt-danh-muc-site`); mỗi ô hiện kèm dịch vụ của site đó. **Mỗi dịch vụ chỉ chọn được tối đa 1 site** — chọn 2 site cùng dịch vụ (vd 2 site đều iOffice) → báo lỗi tại nhóm (đã chốt 23/09/2026, xem Trạng thái phụ). Site chọn ở đây quyết định khách hàng thấy nội dung/tri thức của site nào (xem `quan-tri-noi-dung-kb/SRS.md`). |
| 4 | + Tạo Site mới | Link/Button | Click | • Mở nhanh modal con (Tên Site + Dịch vụ) ngay trong form này — không cần rời sang `qt-danh-muc-site` — cho trường hợp site cần dùng chưa có trong danh mục (đã chốt 23/09/2026). Tạo xong, site mới tự chọn sẵn ở [3]. |
| 5 | Họ tên đầu mối | Textbox | Text | • **Bắt buộc** (OQ-20b). Đầu mối liên hệ chính thức của đơn vị, lấy từ hồ sơ hợp đồng/biên bản bàn giao (UC1); lưu vào danh mục khách hàng. Mỗi khách hàng có 1–3 đầu mối do Quản trị viên chỉ định (OQ-20a, đã chốt 23/09/2026 — đầu mối gắn theo khách hàng, không theo site) — màn này nhập đầu mối đầu tiên. |
| 6 | Email đầu mối | Textbox | Text | • **Bắt buộc**, đúng định dạng; là nơi gửi lời mời kích hoạt ở `qt-moi-dau-moi` và là định danh đăng nhập [GIẢ ĐỊNH]. |
| 7 | SĐT đầu mối | Textbox | Text | • **Bắt buộc** (OQ-20b), định dạng số VN; dùng khi gửi lời mời qua SMS. |
| 8 | Lưu và tiếp tục mời đầu mối | Button | Click | • Disabled tới khi đủ [1]–[7] hợp lệ. Lưu khách hàng vào danh mục (UC1) rồi sang `qt-moi-dau-moi` — màn đó **điền sẵn** đầu mối vừa nhập để Quản trị viên/Agent chỉ xác nhận kênh gửi và tạo tài khoản chờ kích hoạt (UC9); ghi nhật ký thao tác. |
| 9 | Hủy | Button | Click | • Về `qt-danh-muc-khach-hang`, không lưu gì. |

- **Đề xuất bổ sung theo thiết kế Figma (21/09/2026)** — tách bước tạo khách hàng (UC1, lưu cả đầu mối liên hệ như danh mục khách hàng yêu cầu) khỏi bước tạo tài khoản đầu mối + gửi lời mời (UC9); sửa vẫn ở `qt-danh-muc-khach-hang` (UC28), qua modal (cập nhật 23/09/2026 — trước đó chưa có hình minh họa cụ thể).
- **Cập nhật 23/09/2026:** field [3]+[4] cũ ("Dịch vụ đang dùng" checkbox + "Site/tenant" textbox tự khai mã mới) đổi thành chọn trực tiếp Site có sẵn từ danh mục — vì site giờ là dữ liệu dùng chung (1 site nhiều khách hàng), không phải mỗi khách hàng luôn có 1 site/tenant riêng mới tạo.

#### Trạng thái phụ — chọn 2 site cùng dịch vụ

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│     ┌──────────────────────────────────────────────────────────┐     │
│     │ Thêm khách hàng                                          │     │
│     │                                                          │     │
│     │ Tên đơn vị [1] [UBND tỉnh Bình Định_______________]      │     │
│     │ Site sử dụng [3]                                         │     │
│     │   [x] site-bd (iOffice)      [x] site-nho-le (iOffice)  │     │
│     │   (!) Khách hàng đã có site cho dịch vụ này (iOffice),   │     │
│     │       không chọn thêm site khác cùng dịch vụ.            │     │
│     ├──────────────────────────────────────────────────────────┤     │
│     │ [8] [ Lưu và tiếp tục mời đầu mối ]  [9] [ Hủy ]         │     │
│     └──────────────────────────────────────────────────────────┘     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- Khác màn gốc: chọn 2 site cùng dịch vụ (vd site-bd và site-nho-le đều iOffice) → cảnh báo ngay dưới nhóm [3] (wording tạm, chưa có mã E-…); [8] mờ tới khi bỏ chọn 1 trong 2.


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
│       │ Khách hàng                                           │       │
│       │ [1] [v: UBND tỉnh Bình Định            ]             │       │
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
| 1 | Khách hàng | Dropdown | Select | • **Bắt buộc**. Chọn từ danh mục khách hàng (tự chọn sẵn khi đi từ `qt-danh-muc-khach-hang`; đã chốt 23/09/2026 — đầu mối gắn theo khách hàng, không cần chọn thêm site ở đây). Không có trong danh mục thì không tạo được tài khoản (neo xác thực vào dữ liệu hợp đồng/dự án, Đề xuất — Cơ chế cấp tài khoản). |
| 2 | Họ tên đầu mối | Textbox | Text | • **Bắt buộc**. Điền sẵn từ đầu mối đã lưu trong danh mục nếu có (tên/email/SĐT lấy từ hợp đồng/biên bản bàn giao); sửa ở đây thì cập nhật lại danh mục [GIẢ ĐỊNH]. |
| 3 | Email | Textbox | Text | • **Bắt buộc**, đúng định dạng; là nơi gửi lời mời và là định danh đăng nhập [GIẢ ĐỊNH]. Đã có tài khoản → báo trùng. |
| 4 | SĐT | Textbox | Text | • Bắt buộc khi chọn kênh SMS [GIẢ ĐỊNH]; định dạng số VN. |
| 5 | Kênh gửi lời mời | Checkbox group | Check | • Email / SMS (brandname) theo kênh đang bật ở `cauhinh-kenh-thongbao`; kênh đang tắt thì disabled. Ít nhất 1 kênh. |
| 6 | Tạo & gửi lời mời | Button | Click | • Tạo tài khoản đầu mối **chờ kích hoạt** rồi gửi lời mời (UC9); khóa khi submitting. Thành công → về `qt-danh-muc-khach-hang`, dòng đơn vị hiện đầu mối trạng thái "Chờ kích hoạt". Người nhận bấm link → `kh-kich-hoat-tk`.<br>• **Ai được tạo:** Agent tỉnh (với KH tỉnh) hoặc Agent trung tâm/Quản trị viên (với KH doanh nghiệp/TW) — mỗi vai trò chỉ thấy khách hàng thuộc phạm vi mình. Không có trang đăng ký công khai.<br>• Lỗi gửi (Email/SMS lỗi) → tài khoản vẫn tạo, báo lỗi và cho gửi lại ở `qt-chi-tiet-tai-khoan` [GIẢ ĐỊNH]. |
| 7 | Hủy | Button | Click | • Về `qt-danh-muc-khach-hang`, không tạo gì. |

- Bổ sung 21/09/2026: khi vào từ `qt-form-khach-hang` (sau khi lưu khách hàng), các ô [2]–[4] **điền sẵn** đầu mối vừa nhập ở đó — không nhập lại; Quản trị viên/Agent chỉ xác nhận kênh gửi [5] rồi tạo tài khoản chờ kích hoạt. Bỏ dở → về `qt-danh-muc-khach-hang`, khách hàng ở trạng thái "Chưa có tài khoản đầu mối".


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
| 1 | + Tạo tài khoản nội bộ | Button | Click | • Chỉ **Quản trị viên** → `qt-tao-tai-khoan-noibo` (UC54). |
| 2 | Tìm kiếm | Textbox | Text | • Theo họ tên/email; rỗng → tất cả. |
| 3 | Lọc loại tài khoản | Dropdown | Select | • Tất cả / Nội bộ / Khách hàng (Đề xuất — phân biệt 2 nhóm tài khoản). |
| 4 | Lọc vai trò / trạng thái | Dropdown | Select | • Vai trò: 6 vai trò RBAC; Trạng thái: Hoạt động / Chờ kích hoạt / Vô hiệu hóa. |
| 5 | Bảng tài khoản | Table | Select | • Cột: Họ tên, Email, Vai trò, Đơn vị/Team, Trạng thái. Bấm 1 dòng → `qt-chi-tiet-tai-khoan` (UC26).<br>• **Phạm vi:** Quản trị viên thấy mọi tài khoản (nội bộ + khách hàng); màn tương tự cho đầu mối chỉ thấy đúng thành viên đơn vị mình là `kh-danh-sach-thanh-vien`.<br>• Trạng thái "Vô hiệu" hiển thị mờ. Phân trang: OQ-11. |

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
| 3 | Vai trò | Label | ReadOnly | • Vai trò và phạm vi/site gắn kèm (UC26); đổi qua nút [5]. |
| 4 | Team / Đơn vị-site | Label | ReadOnly | • Nội bộ: team (trung tâm hoặc tỉnh/thành cụ thể). Khách hàng: đơn vị + site (không đổi được site của người được mời). |
| 5 | Phân quyền | Button | Click | • → `qt-phan-quyen` để gán/đổi vai trò (UC56). |
| 6 | Vô hiệu hóa / Kích hoạt lại | Button | Click | • Nhãn đổi theo trạng thái. **Vô hiệu hóa** (nhân sự nghỉ việc UC54; tài khoản khách hàng UC55): hộp thoại xác nhận nêu rõ tên + hậu quả "khóa quyền truy cập ngay" (tránh vô hiệu hóa nhầm tài khoản đang hoạt động); xác nhận → khóa, ghi nhật ký. **Kích hoạt lại** khôi phục quyền cũ.<br>• Tài khoản nội bộ đang giữ ticket dở → ticket xử lý thế nào: đã chốt (OQ-20).<br>• Không tự vô hiệu hóa chính mình [GIẢ ĐỊNH]. |
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
| 6 | Ghi chú vô hiệu hóa | Label | ReadOnly | • Vô hiệu hóa (UC54) thực hiện ở `qt-chi-tiet-tai-khoan` cho thống nhất với tài khoản khách hàng; màn này chỉ tạo tài khoản (đã đổi tên từ "Tạo/vô hiệu hóa"). |
| 7 | Tạo tài khoản | Button | Click | • **Disabled** tới khi [1], [2], [4] (và [5] nếu là agent) hợp lệ. Thành công → tạo tài khoản, gán team, về `qt-danh-sach-tai-khoan`. Cách cấp mật khẩu ban đầu/gửi thông tin đăng nhập: đã chốt (OQ-18). |
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
| 1 | Danh sách vai trò | Radio group | Check | • 6 vai trò tối thiểu của đề xuất, mỗi vai trò kèm phạm vi dữ liệu: Khách hàng (site/dịch vụ của mình) · Agent tỉnh (ticket tỉnh phụ trách; xử lý, tạo phiếu OneBSS, xem KB chung + KB tỉnh) · Agent trung tâm (toàn bộ ticket KH doanh nghiệp/TW; xử lý, tạo phiếu OneBSS, xem báo cáo vận hành) · Biên tập nội dung (KB theo phạm vi gán; soạn/duyệt, không quản lý người dùng) · Quản trị viên (toàn hệ thống) · Chủ quản dịch vụ (chỉ xem báo cáo phạm vi dịch vụ phụ trách).<br>• Mỗi tài khoản 1 vai trò [GIẢ ĐỊNH]; tạo vai trò tùy chỉnh/chỉnh tay từng quyền: không có trong nguồn (chỉ gán/đổi vai trò cố định, UC56). "Đầu mối" có là vai trò riêng không: OQ-20.<br>• Không hạ quyền của quản trị viên cuối cùng (luôn còn ≥1) [GIẢ ĐỊNH]. |
| 2 | Phạm vi | Dropdown | Select | • Hiện theo vai trò: Team (agent), dịch vụ (chủ quản dịch vụ), phạm vi KB (biên tập). Khách hàng: đơn vị/site không đổi được ở đây. |
| 3 | Áp dụng | Button | Click | • Hộp thoại xác nhận nêu vai trò cũ → mới. Xác nhận → **áp dụng quyền tương ứng ngay** (UC56), về `qt-chi-tiet-tai-khoan`; **ghi nhật ký thao tác nhạy cảm (đổi quyền)**. Disabled khi chưa đổi gì. |
| 4 | Hủy | Button | Click | • Về `qt-chi-tiet-tai-khoan`, không đổi. |
| 5 | Xem nhật ký thao tác | Link | Click | • Sang `qt-nhat-ky-thao-tac` (theo userflow: từ phân quyền xem lịch sử thao tác nhạy cảm). |

- Bổ sung 21/09/2026: có link "Xem bảng quyền tổng quan" tới `qt-ma-tran-phan-quyen`.

- Quyền "Xem nghiệp vụ toàn bộ khách hàng trong Hỏi đáp AI" và "Dùng Hỏi đáp AI nội bộ" gắn cố định theo vai trò (xem `qt-ma-tran-phan-quyen`); màn này chỉ gán/đổi vai trò cho tài khoản, chỉnh quyền theo vai trò ngoài MVP [GIẢ ĐỊNH] (OQ-34).


---

## Screen: qt-ma-tran-phan-quyen — Bảng quyền theo vai trò (chỉ xem)

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│ Bảng quyền theo vai trò (chỉ xem)              [1] < Về tài khoản >  │
│ (i) Tham khảo, khách hàng đã xác nhận [2]                            │
├──────────────────────────────────────────────────────────────────────┤
│ Chức năng [3]            KH   AgT  AgTT BT   QT   CQ                 │
│ ---------------------------------------------------------------      │
│ Tra cứu KB, hỏi AI       x    x    x    x    x    -                  │
│ Hỏi đáp AI nội bộ        -    x    x    -    x    x                  │
│ Xem nghiệp vụ mọi KH(AI) -    -    x    -    x    x                  │
│ Tạo & theo dõi ticket    x    -    -    -    -    -                  │
│ Xử lý ticket (team)      -    x    x    -    x    -                  │
│ Tạo phiếu OneBSS         -    x    x    -    x    -                  │
│ Soạn bài KB              -    x    x    x    x    -                  │
│ Duyệt & xuất bản KB      -    -    -    -    x    -                  │
│ Quản lý TK, phân quyền   -    -    -    -    x    -                  │
│ Tạo TK đầu mối KH        -    x    x    -    x    -                  │
│ Cấu hình AI/OneBSS/SLA   -    -    -    -    x    -                  │
│ Xem báo cáo              -    cb   x    -    x    x                  │
│ KH=Khách AgT=A.tỉnh AgTT=A.TT BT=Biên tập QT=Quản trị CQ=Chủ quản    │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Về màn trước | Link | Click | • Quay về `qt-danh-sach-tai-khoan` hoặc `qt-phan-quyen` tùy nơi mở. |
| 2 | Nhãn tham khảo | Label | ReadOnly | • "Tham khảo, khách hàng đã xác nhận" — bảng suy ra từ mô tả vai trò trong tài liệu đề xuất (OQ-28). |
| 3 | Bảng quyền | Table | ReadOnly | • Hàng = 12 nhóm chức năng, cột = 6 vai trò (Khách hàng, Agent tỉnh, Agent trung tâm, Biên tập, Quản trị viên, Chủ quản dịch vụ). `x` = được phép, `-` = không, `cb` = chỉ xem báo cáo cơ bản của team mình (Agent tỉnh — [GIẢ ĐỊNH] theo OQ-23b). Soạn bài KB: Biên tập và Agent (UC11); tạo ticket: chỉ Khách hàng.<br>• **Chỉ xem**: đổi vai trò của 1 tài khoản làm ở `qt-phan-quyen`. Chỉ Quản trị viên mở được.<br>• Thêm 2 dòng Hỏi đáp AI nội bộ (OQ-34): "Hỏi đáp AI nội bộ" cho Agent tỉnh, Agent trung tâm, Quản trị viên, Chủ quản dịch vụ; "Xem nghiệp vụ mọi KH (AI)" cho Agent trung tâm, Quản trị viên, Chủ quản dịch vụ — Agent tỉnh chỉ site của team [GIẢ ĐỊNH]. Hàng 10 nhóm chức năng nay thành 12. Dòng cũ "Tra cứu KB, hỏi AI" chỉ nghĩa khách hàng tra cứu và hỏi AI; nhân viên không có màn Tra cứu (OQ-35) — cần khách hàng xác nhận lại các ô x của nhân viên ở dòng này. |

- **Đề xuất bổ sung, đã chốt (OQ-28).** Vào từ `qt-phan-quyen` và `qt-danh-sach-tai-khoan`; ký hiệu: KH=Khách hàng, AgT=Agent tỉnh, AgTT=Agent trung tâm, BT=Biên tập, QT=Quản trị viên, CQ=Chủ quản dịch vụ.


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
| 4 | Bảng nhật ký | Table | ReadOnly | • Cột: Thời gian, Người thực hiện, Hành động, Đối tượng, Chi tiết (giá trị trước → sau) (UC58). **Chỉ Quản trị viên xem**; chỉ đọc, không sửa/xóa/xuất được từ màn này [GIẢ ĐỊNH].<br>• Thời gian lưu giữ nhật ký, có xuất file không: đã chốt (OQ-20). Empty: "Không có thao tác nào phù hợp". |

- Dữ liệu mẫu chỉ minh họa; "->" thay mũi tên để không lệch cột.


---

## Đề xuất đã cập nhật (đã chốt với khách hàng 21/09/2026)

| Mã | Nội dung cần chốt | Đề xuất | Trạng thái |
|----|-------------------|---------|------------|
| OQ-20a | Đầu mối | Cờ "đầu mối" trên tài khoản khách hàng (không phải vai trò riêng); mỗi khách hàng có 1-3 đầu mối do Quản trị viên chỉ định (cập nhật 23/09/2026 — theo khách hàng, không theo site). | Đã chốt (khách hàng xác nhận, 21/09/2026; cập nhật 23/09/2026) |
| OQ-20b | Danh mục khách hàng/site | Bắt buộc: tên đơn vị, loại KH, ≥1 site sử dụng (mỗi site 1 dịch vụ), đầu mối (tên, email, SĐT). Không xóa cứng: hết hợp đồng chuyển "Ngừng hoạt động", khóa tài khoản, giữ dữ liệu. **Cập nhật 23/09/2026:** Site tách thành danh mục riêng dùng chung được cho nhiều khách hàng — xem `qt-danh-muc-site` + đầu file. | Đã chốt (khách hàng xác nhận, 21/09/2026; cập nhật 23/09/2026) |
| OQ-20c | Đổi loại KH; vô hiệu hóa agent đang giữ ticket | Đổi loại KH: ticket đang mở giữ team cũ đến khi đóng, ticket mới theo loại mới. Vô hiệu hóa agent: yêu cầu chuyển ticket sang agent khác, chưa chuyển thì tự về hàng đợi team. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-20d | Nhật ký thao tác | Chỉ Quản trị viên xem, chỉ đọc; giữ 12 tháng trực tuyến; xuất được Excel. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-28 | Bảng quyền vai trò × chức năng chính thức (bổ sung OQ-23b) | Dùng `qt-ma-tran-phan-quyen` làm tham khảo; Agent tỉnh chỉ xem báo cáo cơ bản của team mình. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
