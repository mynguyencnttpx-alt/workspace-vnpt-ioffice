# Flow: Quản trị người dùng & phân quyền

> Màn hình thuộc flow này: qt-danh-muc-dia-ban (⇄ tab qt-danh-muc-khach-hang ⇄ tab qt-danh-muc-site) → qt-form-khach-hang → qt-moi-dau-moi → qt-danh-sach-tai-khoan → qt-chi-tiet-tai-khoan → qt-tao-tai-khoan-noibo → qt-phan-quyen → qt-ma-tran-phan-quyen → qt-nhat-ky-thao-tac. Flow tổng xem `../srs/ho-tro-cskh-userflow.md` Mục 1. Khung điều hướng nội bộ dùng chung: bản Figma là sidebar trái + thanh trên có chip Site/Vai trò; ASCII vẽ gọn thành 1 dòng đầu.
>
> Các mục ghi "(OQ-n)" đã được **khách hàng xác nhận (21/09/2026)** ở bảng cuối file (cập nhật 19/09/2026), cũng đã ghi vào tài liệu "Đề xuất Hệ thống Hỗ trợ & Chăm sóc Khách hàng.docx".
>
> **Cập nhật 23/09/2026 (1):** rà soát phát hiện `qt-danh-muc-khach-hang` chưa có hình minh họa cho việc "Sửa" (chỉ có link tĩnh) — đã vẽ bổ sung modal "Sửa thông tin đơn vị" trên Figma. Xem [4] ở màn đó.
>
> **Cập nhật 23/09/2026 (2) — tách Site khỏi khách hàng:** thiết kế gốc gộp "khách hàng" và "site/tenant" thành 1 khái niệm (1 site = 1 khách hàng). Khách hàng xác nhận thực tế khác: khách hàng lớn (UBND tỉnh) có site riêng, nhưng khách hàng nhỏ lẻ dùng CHUNG 1 site theo dịch vụ; 1 khách hàng dùng ≥2 dịch vụ (iOffice + iStorage) thì gắn ≥2 site khác nhau. Đã tách thành 2 tab trong `qt-danh-muc-khach-hang`: tab "Site" (mới, quản lý danh mục site) + tab "Danh mục khách hàng" (sửa, chọn ≥1 site có sẵn thay vì tự khai site/tenant mới). Xem chi tiết ở từng màn dưới + `docs/ho-tro-cskh/srs/ho-tro-cskh-erd.md` entity `SITE`/`KHACH_HANG`.
>
> **Cập nhật 24/09/2026 (v1.1/v1.2 — mô hình hỗ trợ & định tuyến theo địa bàn, vào từ site dịch vụ; khách hàng xác nhận):** thêm tab **Danh mục Địa bàn** (`qt-danh-muc-dia-ban`); khách hàng có **Địa bàn + Hình thức hỗ trợ → Tầng tiếp nhận** (thay quy tắc "loại khách hàng quyết định team"); mỗi site khách hàng dùng có **Mã đơn vị trên site**; 6 vai trò nội bộ (thêm Agent helpdesk; "Agent trung tâm" và "Hỗ trợ dịch vụ" gộp thành Triển khai của Line), bỏ ô Team, thêm **Địa bàn + Phạm vi phụ trách**; Chi tiết tài khoản hiện **Danh tính site**; bảng quyền 8 vai trò. Nguồn: `SRS/quan-tri-nguoi-dung/SRS.md` v1.2.
>
> **Cập nhật 25/09/2026 (bố cục tiêu chí tìm kiếm):** thanh lọc ở các màn danh sách xếp theo **lưới 4 cột cố định** — nhãn nằm trên ô nhập, các ô cùng chiều rộng và thẳng cột; quá 4 tiêu chí thì xuống hàng theo lưới, checkbox chiếm 2 cột; không còn xếp nhãn + ô nhập nối tiếp theo độ dài trường. Đồng bộ với frame Figma.

---

## Screen: qt-danh-muc-dia-ban — Danh mục Địa bàn (mới, 24/09/2026)

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│ [T] Địa bàn | Khách hàng | Site               [1] [ + Thêm địa bàn ] │
├──────────────────────────────────────────────────────────────────────┤
│ Tìm [2] [binh__________]                                             │
├──────────────────────────────────────────────────────────────────────┤
│ Địa bàn          Loại        Số KH đang dùng   Trạng thái            │
│ -------------------------------------------------------------------- │
│ Trung ương       Hệ thống    12                Đang dùng             │
│ Bình Định        Tỉnh/TP     4                 Đang dùng             │
│ Đà Nẵng          Tỉnh/TP     3                 Đang dùng             │
│ Quảng Ngãi       Tỉnh/TP     0                 Ngừng dùng            │
│                                                                      │
│ Dòng chọn: Bình Định [3] < Sửa >  [4] < Ngừng dùng >                 │
│ [5] Trang 1/1                                                        │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| T | Tab Địa bàn / Khách hàng / Site | Tabs | Click | • 3 tab trong cùng Chức năng 1: **Địa bàn** (mới, tạo trước), Khách hàng, Site. Địa bàn phải có trước khi chọn được ở form khách hàng. |
| 1 | + Thêm địa bàn | Button | Click | • Chỉ **Quản trị viên**. Nhập Tên địa bàn (bắt buộc, duy nhất); trùng → báo lỗi tại ô "Tên địa bàn đã tồn tại." [wording tạm]. Địa bàn thêm mới luôn là loại Tỉnh/TP, lưu → trạng thái Đang dùng. Không viết cứng số tỉnh/TP (số đơn vị hành chính có thể thay đổi). |
| 2 | Tìm kiếm | Textbox | Text | • Tìm theo tên địa bàn; rỗng → hiện tất cả. |
| 3 | Sửa | Link | Click | • Sửa tên địa bàn. Dòng **Trung ương** là mục hệ thống có sẵn: không sửa tên, không ngừng dùng. |
| 4 | Ngừng dùng | Link | Click | • Chuyển địa bàn sang "Ngừng dùng". **Chặn cứng khi còn khách hàng "Hoạt động" thuộc địa bàn đó** (đã chốt 24/09/2026): báo số khách hàng còn lại; phải chuyển các khách hàng đó sang địa bàn khác hoặc ngừng hoạt động trước. Không xóa cứng địa bàn. |
| 5 | Phân trang | Pagination | Click | • 10 bản ghi/trang (OQ-11). |

- Cột "Số KH đang dùng" là số khách hàng đang thuộc địa bàn; bấm số → xem nhanh danh sách khách hàng `[GIẢ ĐỊNH — hợp lý về UX]`. Địa bàn + Hình thức hỗ trợ của khách hàng quyết định tầng tiếp nhận ticket (xem `qt-danh-muc-khach-hang`).


---

## Screen: qt-danh-muc-site — Danh mục Site (mới, 23/09/2026)

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│ < Địa bàn | Khách hàng | [T] Site >         [1] [ + Thêm Site ]      │
├──────────────────────────────────────────────────────────────────────┤
│ Tìm [2]          Dịch vụ [3]                                         │
│ [site-bd_______] [v: Tất cả     ]                                    │
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
│ Địa bàn | [T] Khách hàng | Site            [1] [ + Thêm khách hàng ] │
├──────────────────────────────────────────────────────────────────────┤
│ Tìm [2]          Loại KH          Địa bàn [3]      Site              │
│ [Bình Định_____] [v: Tất cả     ] [v: Tất cả     ] [v: Tất cả     ]  │
│ Tầng tiếp nhận                                                       │
│ [v: Tất cả     ]                                                     │
├──────────────────────────────────────────────────────────────────────┤
│ Đơn vị            Địa bàn    Tầng tiếp nhận  Site đang dùng  Đầu mối │
│ -------------------------------------------------------------------- │
│ UBND tỉnh BĐ      Bình Định  Tỉnh Bình Định  site-bd         N.Văn A │
│ Sở Nội vụ         Bình Định  Tỉnh Bình Định  site-bd         (trống) │
│ Cty ABC           Đà Nẵng    Tỉnh Đà Nẵng    site-nho-le     L.Văn C │
│ Bộ Nội vụ         Trung ương Triển khai Line site-bnv +1     P.Thị D │
│ Cty XYZ           Trung ương Helpdesk CT     site-nho-le     T.Văn E │
│                                                                      │
│ Dòng chọn: UBND tỉnh BĐ [4] < Sửa > [5] < Khởi tạo đầu mối >         │
│ [6] Trang 1/3                                                        │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | + Thêm khách hàng | Button | Click | • Chỉ **Quản trị viên** (UC1). Mở form (`qt-form-khach-hang`): tên đơn vị, loại khách hàng (chỉ phân loại), **Địa bàn**, **Hình thức hỗ trợ** (khi Trung ương), tầng tiếp nhận tự tính, **Site sử dụng** (≥1, mỗi dịch vụ tối đa 1 site) kèm **Mã đơn vị trên site**, đầu mối liên hệ ban đầu (tên, email, SĐT lấy từ hợp đồng/biên bản bàn giao).<br>• Lưu → tạo khách hàng mới; **đây là dữ liệu gốc** để định tuyến ticket theo tầng (Địa bàn + Hình thức hỗ trợ) và phân vùng tài liệu theo site. Sau khi lưu hỏi "Khởi tạo tài khoản đầu mối ngay?" → `qt-moi-dau-moi`.<br>• Chưa có site cần dùng → bấm "+ Tạo Site mới" ngay trong form (xem `qt-danh-muc-site`); chưa có địa bàn cần dùng → tạo ở `qt-danh-muc-dia-ban`. |
| 2 | Tìm kiếm | Textbox | Text | • Tìm theo tên đơn vị/tên site/đầu mối; rỗng → hiện tất cả. |
| 3 | Lọc loại KH / địa bàn / site / tầng | Dropdown | Select | • Loại: Tất cả / UBND tỉnh-thành / Doanh nghiệp / Trung ương; Địa bàn: theo danh mục Địa bàn; Site: theo danh mục Site; Tầng tiếp nhận: Tỉnh X / Helpdesk công ty / Triển khai Line. Kết hợp được. |
| 4 | Sửa | Link | Click | • Mở **modal "Sửa thông tin đơn vị"** giữa màn (nền mờ phía sau) — không mở màn chi tiết riêng (UC28). Trường sửa được: Tên đơn vị, Loại khách hàng, **Địa bàn, Hình thức hỗ trợ**, đầu mối liên hệ, **Site sử dụng** (thêm/bớt site, sửa Mã đơn vị trên site). Lưu → áp dụng cho định tuyến & phân vùng tài liệu từ đó về sau; bớt 1 site chỉ gỡ liên kết của khách hàng này, KHÔNG ảnh hưởng khách hàng khác dùng chung site đó.<br>• **Đổi Địa bàn hoặc Hình thức hỗ trợ (làm đổi tầng tiếp nhận)** là thao tác nhạy cảm: cảnh báo ngay tại field, hỏi xác nhận trước khi lưu, ghi `qt-nhat-ky-thao-tac` (đổi định tuyến khách hàng); ticket đang mở **giữ tầng cũ đến khi đóng**, ticket mới theo tầng mới (OQ-20c). Đổi riêng Loại khách hàng không đổi tầng nên không cần cảnh báo.<br>• Xóa khách hàng: nguồn không nêu — không có nút xóa [GIẢ ĐỊNH]. |
| 5 | Khởi tạo đầu mối | Link | Click | • Sang `qt-moi-dau-moi` với khách hàng của dòng đã chọn. Dòng "(chưa có)" đầu mối cần làm bước này trước khi khách hàng dùng được hệ thống. |
| 6 | Phân trang | Pagination | Click | • 10 bản ghi/trang (đã chốt, OQ-11). |

- Cột "Site đang dùng" hiện tên site kèm dịch vụ; khách hàng dùng ≥2 dịch vụ hiện thêm "+N" (vd Bộ Nội vụ dùng cả iOffice và iStorage → 2 site, hiện "site-bnv (iOffice) +1" — bấm dòng để xem đủ). site-bd dùng chung cho cả UBND tỉnh Bình Định và Sở Nội vụ (site theo tỉnh); site-nho-le dùng chung cho nhiều khách hàng doanh nghiệp nhỏ lẻ cùng dịch vụ.
- Header nội bộ dùng chung (không đánh số); Flow 7/8/9 là khu vực menu quản trị — các màn truy cập độc lập, không phải wizard. Dữ liệu mẫu chỉ minh họa.

- Bổ sung 21/09/2026: nút "Thêm khách hàng" mở `qt-form-khach-hang` (không còn mở thẳng `qt-moi-dau-moi`). **Sửa và đổi địa bàn/hình thức hỗ trợ vẫn làm tại chỗ ở màn này**, có hộp xác nhận và ghi `qt-nhat-ky-thao-tac`; ticket đang mở giữ tầng cũ (OQ-20c). Khách hàng đã tạo nhưng bỏ dở bước tạo tài khoản đầu mối hiện nhãn "Chưa có tài khoản đầu mối" để mời sau.
- **Cập nhật 24/09/2026:** cột Địa bàn + Tầng tiếp nhận thay cho việc suy team từ loại khách hàng; thêm tab Địa bàn (`qt-danh-muc-dia-ban`).
- **Cập nhật 23/09/2026:** tách Site thành danh mục riêng (tab `qt-danh-muc-site`) — xem đầu file để biết lý do.


---

## Screen: qt-form-khach-hang — Thêm khách hàng

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│    ┌────────────────────────────────────────────────────────────┐    │
│    │ Thêm khách hàng                                            │    │
│    │                                                            │    │
│    │ Tên đơn vị [1] [UBND tỉnh Bình Định_______________]        │    │
│    │ Loại khách hàng [2]                                        │    │
│    │   (*) UBND tỉnh/thành  ( ) Doanh nghiệp  ( ) Trung ương    │    │
│    │ Địa bàn [3] [v: Bình Định                 ]                │    │
│    │ Hình thức hỗ trợ [4] (chỉ hiện khi Địa bàn = Trung ương)   │    │
│    │ Tầng tiếp nhận [5]: Tỉnh Bình Định (tự tính, chỉ đọc)      │    │
│    ├────────────────────────────────────────────────────────────┤    │
│    │ Site sử dụng [6]   (mỗi dịch vụ tối đa 1 site)             │    │
│    │   site-bd [iOffice]      Mã ĐV [7] [BD-UBND_______] [x]    │    │
│    │   site-bd-is [iStorage]  Mã ĐV [7] [______________] [x]    │    │
│    │ (o) Tìm và thêm site theo tên hoặc dịch vụ…            [v] │    │
│    │ Đã chọn 2 site                    [8] [ + Tạo Site mới ]   │    │
│    ├────────────────────────────────────────────────────────────┤    │
│    │ Đầu mối liên hệ chính thức (từ hợp đồng/bàn giao)          │    │
│    │ Họ tên [9] [Nguyễn Văn A__________________]                │    │
│    │ Email [10] [a.nguyen@ubnd.gov.vn___________]               │    │
│    │ SĐT [11] [0912345678______________________]                │    │
│    ├────────────────────────────────────────────────────────────┤    │
│    │ [12] [ Lưu và tiếp tục mời đầu mối ]  [13] [ Hủy ]         │    │
│    └────────────────────────────────────────────────────────────┘    │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Tên đơn vị | Textbox | Text | • **Bắt buộc**. Tên đơn vị khách hàng (vd UBND tỉnh Bình Định). |
| 2 | Loại khách hàng | Radio group | Select | • **Bắt buộc**: UBND tỉnh/thành, Doanh nghiệp, Trung ương — chỉ để phân loại và báo cáo, **không quyết định tầng tiếp nhận** (v1.1, thay quy tắc "loại khách hàng quyết định team" của v1.0).<br>• Màn này chỉ để tạo mới; đổi về sau thao tác ở `qt-danh-muc-khach-hang`. |
| 3 | Địa bàn | Dropdown (có tìm) | Select | • **Bắt buộc**: chọn 1 địa bàn "Đang dùng" trong `qt-danh-muc-dia-ban` (tỉnh/TP hoặc Trung ương). |
| 4 | Hình thức hỗ trợ | Radio group | Select | • **Chỉ hiện và bắt buộc khi Địa bàn = Trung ương**: Helpdesk công ty / Triển khai Line; không có giá trị mặc định (xem Trạng thái phụ Trung ương). Địa bàn tỉnh/TP → ẩn. |
| 5 | Tầng tiếp nhận | Label | ReadOnly | • Chỉ đọc, tự tính ngay khi đổi [3]/[4]: địa bàn tỉnh X → "Tỉnh X"; Trung ương + Helpdesk công ty → "Helpdesk công ty"; Trung ương + Triển khai Line → "Triển khai Line". Ticket mới của khách hàng vào đúng tầng này (`SRS` Chức năng 1 BR-01). |
| 6 | Site sử dụng | Danh sách site đã chọn + ô tìm (combobox đa chọn) | Select | • **Chọn ≥1** từ danh mục Site đã có (`qt-danh-muc-site`); **mỗi dịch vụ chỉ chọn tối đa 1 site** (đã chốt 23/09/2026, xem Trạng thái phụ). Site quyết định khách hàng thấy nội dung/tri thức của site nào; site **không** quyết định tầng tiếp nhận ticket.<br>• **Không bày sẵn cả danh mục** (cập nhật 25/09/2026): mặc định chỉ hiện các site **đã chọn**, mỗi site 1 dòng (tên site, nhãn dịch vụ, nhãn "Dùng chung n khách hàng" nếu có, ô Mã đơn vị [7], nút X để bỏ). Chưa chọn site nào → "Chưa chọn site nào.".<br>• **Thêm site:** bấm/gõ vào ô "Tìm và thêm site theo tên hoặc dịch vụ…" → khung gợi ý mở ngay dưới ô (xem Trạng thái phụ — mở khung gợi ý): nhóm theo dịch vụ, lọc theo tên site hoặc tên dịch vụ (không phân biệt hoa/thường, dấu), cao tối đa ~6 dòng rồi cuộn, dòng cuối ghi "Hiện n / tổng site khớp". Site cùng dịch vụ với site đã chọn bị **làm mờ** kèm lý do "Không chọn được — iOffice đã có site-bd"; site "Ngừng dùng" không gợi ý. Chọn xong site chuyển thành dòng ở trên, ô nhập được làm trống. Phím ↑/↓ chọn, Enter thêm, Esc đóng.<br>• Dưới ô: "Đã chọn n site · mỗi dịch vụ tối đa 1 site". |
| 7 | Mã đơn vị trên site | Textbox (nằm ngay trên dòng của mỗi site đã chọn) | Text | • **Bắt buộc với site đang dùng chung từ 2 khách hàng trở lên** (dòng hiện nhãn "Dùng chung n khách hàng" + "Mã đơn vị (bắt buộc)"), tùy chọn với site chỉ 1 khách hàng; duy nhất trong cùng 1 site (trùng → báo lỗi tại ô "Mã đơn vị này đã gán cho khách hàng khác trên site này." [wording tạm]).<br>• Là mã đơn vị của khách hàng trên chính site dịch vụ; cùng mã site dùng để xác định khách hàng khi người dùng vào CSKH từ iOffice/iStorage (`dang-nhap-kich-hoat` Chức năng 5). Đổi mã không tự đổi khách hàng của danh tính đã tạo. |
| 8 | + Tạo Site mới | Link/Button | Click | • Có ở 2 chỗ: dòng cuối khung gợi ý và cạnh dòng "Đã chọn n site". Mở nhanh modal con (Tên Site + Dịch vụ) ngay trong form — không cần rời sang `qt-danh-muc-site` (đã chốt 23/09/2026). Tạo xong, site mới tự chọn sẵn ở [6]. |
| 9 | Họ tên đầu mối | Textbox | Text | • **Bắt buộc** (OQ-20b). Đầu mối liên hệ chính thức, lấy từ hợp đồng/biên bản bàn giao (UC1). Mỗi khách hàng có 1–3 đầu mối do Quản trị viên chỉ định (OQ-20a, đầu mối gắn theo khách hàng, không theo site) — màn này nhập đầu mối đầu tiên. |
| 10 | Email đầu mối | Textbox | Text | • **Bắt buộc**, đúng định dạng; là nơi gửi lời mời kích hoạt ở `qt-moi-dau-moi` và là định danh đăng nhập [GIẢ ĐỊNH]. |
| 11 | SĐT đầu mối | Textbox | Text | • **Bắt buộc** (OQ-20b), định dạng số VN; dùng khi gửi lời mời qua SMS. |
| 12 | Lưu và tiếp tục mời đầu mối | Button | Click | • Disabled tới khi đủ [1]–[7], [9]–[11] hợp lệ. Lưu khách hàng vào danh mục (UC1) rồi sang `qt-moi-dau-moi` — màn đó **điền sẵn** đầu mối vừa nhập (UC9); ghi nhật ký thao tác. |
| 13 | Hủy | Button | Click | • Về `qt-danh-muc-khach-hang`, không lưu gì. |

- **Đề xuất bổ sung theo thiết kế Figma (21/09/2026)** — tách bước tạo khách hàng (UC1, lưu cả đầu mối liên hệ) khỏi bước tạo tài khoản đầu mối + gửi lời mời (UC9); sửa vẫn ở `qt-danh-muc-khach-hang` (UC28), qua modal.
- **Cập nhật 23/09/2026:** chọn trực tiếp Site có sẵn từ danh mục (site dùng chung nhiều khách hàng). **Cập nhật 24/09/2026 (v1.1/v1.2):** thêm Địa bàn, Hình thức hỗ trợ, Tầng tiếp nhận tự tính và Mã đơn vị trên site.

#### Trạng thái phụ — chọn 2 site cùng dịch vụ

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│    ┌────────────────────────────────────────────────────────────┐    │
│    │ Thêm khách hàng                                            │    │
│    │                                                            │    │
│    │ Tên đơn vị [1] [UBND tỉnh Bình Định_______________]        │    │
│    │ Site sử dụng [6]                                           │    │
│    │   site-bd [iOffice]       Mã ĐV [7] [BD-UBND_______] [x]   │    │
│    │   site-nho-le [iOffice]   Mã ĐV [7] [______________] [x]   │    │
│    │   (!) Khách hàng đã có site cho dịch vụ này (iOffice),     │    │
│    │       không chọn thêm site khác cùng dịch vụ.              │    │
│    ├────────────────────────────────────────────────────────────┤    │
│    │ [12] [ Lưu và tiếp tục mời đầu mối ]  [13] [ Hủy ]         │    │
│    └────────────────────────────────────────────────────────────┘    │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- Khác màn gốc: chọn 2 site cùng dịch vụ (vd site-bd và site-nho-le đều iOffice; chỉ xảy ra với dữ liệu cũ hoặc khi server báo lỗi — khung gợi ý đã làm mờ site cùng dịch vụ) → 2 dòng tô đỏ, cảnh báo ngay dưới danh sách [6] (wording tạm, chưa có mã E-…); [12] mờ tới khi bỏ 1 trong 2 dòng.

#### Trạng thái phụ — địa bàn Trung ương, site dùng chung thiếu mã đơn vị

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│    ┌────────────────────────────────────────────────────────────┐    │
│    │ Thêm khách hàng                                            │    │
│    │                                                            │    │
│    │ Địa bàn [3] [v: Trung ương                ]                │    │
│    │ Hình thức hỗ trợ [4]                                       │    │
│    │   ( ) Helpdesk công ty   (*) Triển khai Line               │    │
│    │ Tầng tiếp nhận [5]: Triển khai Line (tự tính, chỉ đọc)     │    │
│    ├────────────────────────────────────────────────────────────┤    │
│    │ Site sử dụng [6]                                           │    │
│    │   dn-dung-chung-ioffice [iOffice] [Dùng chung 4 KH]        │    │
│    │     Mã đơn vị (bắt buộc) [7] [ ! chưa nhập ]         [x]   │    │
│    │     (!) Site dùng chung nhiều khách hàng: bắt buộc nhập    │    │
│    │         mã đơn vị.                                         │    │
│    ├────────────────────────────────────────────────────────────┤    │
│    │ [12] [ Lưu và tiếp tục mời đầu mối ] (mờ)  [13] [ Hủy ]    │    │
│    └────────────────────────────────────────────────────────────┘    │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- Khác màn gốc: Địa bàn = Trung ương → hiện [4] Hình thức hỗ trợ (bắt buộc chọn 1) và [5] cập nhật theo lựa chọn; site dùng chung nhiều khách hàng mà chưa nhập [7] → cảnh báo tại ô, [12] mờ.

#### Trạng thái phụ — mở khung gợi ý chọn site (cập nhật 25/09/2026)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│    ┌────────────────────────────────────────────────────────────┐    │
│    │ Thêm khách hàng                                            │    │
│    │                                                            │    │
│    │ Tầng tiếp nhận [5]: Tỉnh Bình Định (tự tính, chỉ đọc)      │    │
│    ├────────────────────────────────────────────────────────────┤    │
│    │ Site sử dụng [6]                                           │    │
│    │   site-bd [iOffice]       Mã ĐV [7] [BD-UBND_______] [x]   │    │
│    │ (o) bnv_______________________________________________ [v] │    │
│    │ ┌────────────────────────────────────────────────────────┐ │    │
│    │ │ iStorage                                               │ │    │
│    │ │ > site-bnv-is            1 khách hàng đang dùng        │ │    │
│    │ │ iOffice - đã chọn site-bd cho dịch vụ này              │ │    │
│    │ │   site-bnv (mờ)   Không chọn được - iOffice đã có site │ │    │
│    │ │ Hiện 2 / 23 site khớp "bnv"      [8] + Tạo Site mới    │ │    │
│    │ └────────────────────────────────────────────────────────┘ │    │
│    ├────────────────────────────────────────────────────────────┤    │
│    │ [12] [ Lưu và tiếp tục mời đầu mối ]  [13] [ Hủy ]         │    │
│    └────────────────────────────────────────────────────────────┘    │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- Khác màn gốc: đang gõ "bnv" ở ô tìm → khung gợi ý mở đè lên phần bên dưới (không đẩy layout), nhóm theo dịch vụ; dòng "site-bnv-is" (iStorage) chọn được; "site-bnv" (iOffice) bị làm mờ vì iOffice đã có site-bd. Chỉ hiện các site khớp, tối đa ~6 dòng rồi cuộn — danh mục Site dài đến đâu giao diện cũng không vỡ. Chọn 1 dòng → thành dòng "site đã chọn" kèm ô [7]. Áp dụng cho cả modal "Sửa thông tin đơn vị" của `qt-danh-muc-khach-hang` (bố cục gọn: ô Mã đơn vị nằm dưới tên site).
- **Cập nhật 25/09/2026:** ô [6] đổi từ danh sách checkbox bày hết danh mục sang "site đã chọn + ô tìm/gợi ý" (Figma 57, 57b, 57c, 57d và modal 28b). Trong hình ASCII "Mã ĐV" viết tắt của "Mã đơn vị" cho vừa khung.


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
| 6 | Tạo & gửi lời mời | Button | Click | • Tạo tài khoản đầu mối **chờ kích hoạt** rồi gửi lời mời (UC9); khóa khi submitting. Thành công → về `qt-danh-muc-khach-hang`, dòng đơn vị hiện đầu mối trạng thái "Chờ kích hoạt". Người nhận bấm link → `kh-kich-hoat-tk`.<br>• **Ai được tạo** (cập nhật 24/09/2026): Agent tỉnh (khách hàng thuộc địa bàn tỉnh mình và nằm trong phạm vi phụ trách), Triển khai của Line (khách hàng địa bàn Trung ương), Quản trị viên (mọi khách hàng) — mỗi vai trò chỉ thấy khách hàng thuộc phạm vi mình. **Agent helpdesk không tạo đầu mối.** Không có trang đăng ký công khai.<br>• Lỗi gửi (Email/SMS lỗi) → tài khoản vẫn tạo, báo lỗi và cho gửi lại ở `qt-chi-tiet-tai-khoan` [GIẢ ĐỊNH]. |
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
│ Tìm [2]          Loại [3]         Vai trò [4]                        │
│ [nguyen________] [v: Tất cả     ] [v: Tất cả     ]                   │
├──────────────────────────────────────────────────────────────────────┤
│ Họ tên        Email            Vai trò      Đơn vị/Tầng    Trạng thái│
│ [5] ---------------------------------------------------------------- │
│ Nguyễn Văn A  a.nguyen@ubnd.vn Đầu mối      UBND BĐ        Hoạt động │
│ Trần Thị B    b.tran@vnpt.vn   Agent tỉnh   Tỉnh Bình Định Hoạt động │
│ Lê Văn C      c.le@abc.vn      Khách hàng   Cty ABC        Chờ k.hoạt│
│ Phạm G        g.pham@vnpt.vn   Agent HD     Helpdesk CT    Hoạt động │
│ Đỗ H          h.do@vnpt.vn     TK Line      Triển khai Line Hoạt động│
│ Hoàng E       e.hoang@vnpt.vn  Quản trị     Toàn HT        Vô hiệu   │
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
| 4 | Lọc vai trò / trạng thái | Dropdown | Select | • Vai trò: 7 vai trò RBAC; Trạng thái: Hoạt động / Chờ kích hoạt / Vô hiệu hóa. |
| 5 | Bảng tài khoản | Table | Select | • Cột: Họ tên, Email, Vai trò, **Đơn vị/Tầng** (khách hàng: tên đơn vị; nhân viên hỗ trợ: tầng, vd "Tỉnh Bình Định"), Trạng thái. Bấm 1 dòng → `qt-chi-tiet-tai-khoan` (UC26).<br>• **Phạm vi:** Quản trị viên thấy mọi tài khoản (nội bộ + khách hàng); màn tương tự cho đầu mối chỉ thấy đúng thành viên đơn vị mình là `kh-danh-sach-thanh-vien`.<br>• Trạng thái "Vô hiệu" hiển thị mờ. Phân trang: OQ-11. |

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
│ Vai trò: Agent tỉnh [3]        Tầng/Địa bàn: Tỉnh Bình Định [4]      │
│ Phạm vi phụ trách [5]: iOffice × Khách hàng thuộc Bình Định          │
│                        iStorage × UBND tỉnh Bình Định                │
│ Tạo ngày: 01/09/2026           Đăng nhập gần nhất: 17/09 08:00       │
├──────────────────────────────────────────────────────────────────────┤
│ [6] [ Phân quyền ]  [7] [ Vô hiệu hóa ]  [8] [ Gửi lại lời mời ]     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Quay lại danh sách | Link | Click | • Navigate → `qt-danh-sach-tai-khoan`. |
| 2 | Trạng thái tài khoản | Label (badge) | ReadOnly | • Hoạt động / Chờ kích hoạt / Vô hiệu hóa. |
| 3 | Vai trò | Label | ReadOnly | • Vai trò hiện tại (1 trong 8, UC26); đổi qua nút [6]. |
| 4 | Tầng / Địa bàn | Label | ReadOnly | • Nhân viên hỗ trợ: Agent tỉnh → "Tỉnh X" (Địa bàn được gán), Agent helpdesk → "Helpdesk công ty", Triển khai của Line → "Triển khai Line". Khách hàng: đơn vị + các site khách hàng dùng (không đổi được site của người được mời). |
| 5 | Phạm vi phụ trách | Label (danh sách) | ReadOnly | • Chỉ hiện với Agent tỉnh, Agent helpdesk, Triển khai của Line: liệt kê các dòng Dịch vụ × Đối tượng hiện có. Với Agent tỉnh là giới hạn quyền xem; với các vai trò khác là bộ lọc mặc định. Sửa qua `qt-phan-quyen`. |
| 6 | Phân quyền | Button | Click | • → `qt-phan-quyen` để gán/đổi vai trò, địa bàn, phạm vi phụ trách (UC56). |
| 7 | Vô hiệu hóa / Kích hoạt lại | Button | Click | • Nhãn đổi theo trạng thái. **Vô hiệu hóa** (nhân sự nghỉ việc UC54; tài khoản khách hàng UC55): hộp thoại xác nhận nêu rõ tên + hậu quả "khóa quyền truy cập ngay"; xác nhận → khóa, ghi nhật ký; **chặn cả cách vào từ site dịch vụ**. **Kích hoạt lại** khôi phục quyền cũ.<br>• Tài khoản nội bộ đang giữ ticket dở → yêu cầu chuyển ticket sang người khác cùng tầng; chưa chuyển thì tự về hàng đợi tầng (OQ-20).<br>• Không tự vô hiệu hóa chính mình (đã chốt 23/09/2026). |
| 8 | Gửi lại lời mời | Button | Click | • Chỉ hiện khi "Chờ kích hoạt" (kể cả link mời hết hạn): tạo link mới gửi Email/SMS. Tối đa 5 lần/ngày/tài khoản (OQ-6). |

- Vẽ ở tài khoản nội bộ đang hoạt động; nút [8] chỉ hiện khi "Chờ kích hoạt", nút [7] đổi nhãn theo trạng thái.

#### Trạng thái phụ — tài khoản khách hàng vào từ site dịch vụ

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│ [1] < Quay lại danh sách >                                           │
├──────────────────────────────────────────────────────────────────────┤
│ Lê Văn C  (khách hàng, vào từ site dịch vụ)            [2] Hoạt động │
├──────────────────────────────────────────────────────────────────────┤
│ Email: c.le@abc.vn             Khách hàng: Cty ABC                   │
│ Vai trò: Khách hàng [3]        Tạo ngày: 20/09/2026                  │
│ Danh tính site [9]  (site | mã người dùng | mã đơn vị | khách hàng)  │
│   site-nho-le | 10452 | ABC | Cty ABC          [10] < Gỡ >           │
│   site-bnv-is | 88    | ABC | Cty ABC               < Gỡ >           │
├──────────────────────────────────────────────────────────────────────┤
│ [6] [ Phân quyền ]  [7] [ Vô hiệu hóa ]                              │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 9 | Danh tính site | Label (danh sách) | ReadOnly | • Chỉ hiện với tài khoản khách hàng vào từ site dịch vụ (mới v1.2): mỗi dòng gồm site, mã người dùng, mã đơn vị, khách hàng xác định được; 1 người có 1 tài khoản, nhiều danh tính site. |
| 10 | Gỡ danh tính site | Link | Click | • Chỉ **Quản trị viên**; hộp xác nhận nêu site + mã người dùng; xác nhận → gỡ và ghi nhật ký thao tác (gỡ danh tính site). Lần vào tiếp theo từ site sẽ xác định lại từ đầu. Dùng để xử lý tay các ca mã đơn vị chưa khớp hoặc trỏ nhầm khách hàng (`dang-nhap-kich-hoat` Chức năng 5, EX-04/EX-05). |


---

## Screen: qt-tao-tai-khoan-noibo — Tạo tài khoản nội bộ

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │ Tạo tài khoản nội bộ                                           │  │
│  │                                                                │  │
│  │ Họ tên  [1] [Trần Thị B_______________________]                │  │
│  │ Email   [2] [b.tran@vnpt.vn____________________]               │  │
│  │ SĐT     [3] [0987654321________________________]               │  │
│  │ Vai trò [4] [v: Agent tỉnh                     ]               │  │
│  │ Địa bàn [5] [v: Bình Định                ] (chỉ Agent tỉnh)    │  │
│  ├────────────────────────────────────────────────────────────────┤  │
│  │ Phạm vi phụ trách [6]  (≥1 dòng, trừ Biên tập/QT/Chủ quản)     │  │
│  │   Dịch vụ [v: iOffice ]  Đối tượng [v: Địa bàn: Bình Định  ]   │  │
│  │   Dịch vụ [v: Tất cả  ]  Đối tượng [v: Khách hàng: UBND BĐ ]   │  │
│  │   [7] [ + Thêm dòng ]                                          │  │
│  │ Dịch vụ được gán [8] (chỉ Biên tập nội dung)                   │  │
│  ├────────────────────────────────────────────────────────────────┤  │
│  │ Vô hiệu hóa: thực hiện ở Chi tiết tài khoản [9]                │  │
│  ├────────────────────────────────────────────────────────────────┤  │
│  │ [10] [ Tạo tài khoản ]        [11] [  Hủy  ]                   │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Họ tên | Textbox | Text | • **Bắt buộc**. |
| 2 | Email | Textbox | Text | • **Bắt buộc**, đúng định dạng, duy nhất; là định danh đăng nhập nội bộ [GIẢ ĐỊNH]. Trùng → báo trùng, không tạo. |
| 3 | SĐT | Textbox | Text | • Không bắt buộc [GIẢ ĐỊNH]. |
| 4 | Vai trò | Dropdown | Select | • **Bắt buộc**: Agent tỉnh / Agent helpdesk / Triển khai của Line / Biên tập nội dung / Quản trị viên / Chủ quản dịch vụ (6 vai trò nội bộ; vai trò Khách hàng không tạo ở đây). Chi tiết quyền xem `qt-phan-quyen`, `qt-ma-tran-phan-quyen`. |
| 5 | Địa bàn | Dropdown | Select | • **Chỉ hiện và bắt buộc với Agent tỉnh**: đúng 1 địa bàn tỉnh/TP (đã chốt 24/09/2026); quyết định tầng "Tỉnh X" của Agent. Thay ô "Team" của v1.0. |
| 6 | Phạm vi phụ trách | Bảng nhiều dòng | Select | • **Chỉ hiện và bắt buộc ≥1 dòng với Agent tỉnh, Agent helpdesk, Triển khai của Line**. Mỗi dòng: Dịch vụ (Tất cả hoặc 1 dịch vụ) × Đối tượng (Tất cả / Địa bàn — đa chọn / Khách hàng cụ thể — đa chọn có tìm).<br>• Danh sách chọn giới hạn theo tầng: Agent tỉnh — Tất cả hoặc khách hàng thuộc địa bàn của mình; Agent helpdesk — Tất cả hoặc khách hàng Trung ương hình thức Helpdesk công ty; Triển khai của Line — Tất cả, địa bàn hoặc khách hàng bất kỳ (`SRS` Chức năng 3 BR-05).<br>• Agent tỉnh: giới hạn quyền xem; các vai trò khác: bộ lọc mặc định. Chủ quản dịch vụ không có phạm vi (xem báo cáo mọi site, mọi dịch vụ). |
| 7 | + Thêm dòng | Button | Click | • Thêm 1 dòng phạm vi; các dòng cộng dồn, không loại trừ nhau (`SRS` Chức năng 4 BR-08). |
| 8 | Dịch vụ được gán | Dropdown đa chọn | Select | • **Chỉ hiện và bắt buộc ≥1 với Biên tập nội dung** (đã chốt 23/09/2026). |
| 9 | Ghi chú vô hiệu hóa | Label | ReadOnly | • Vô hiệu hóa (UC54) thực hiện ở `qt-chi-tiet-tai-khoan` cho thống nhất với tài khoản khách hàng; màn này chỉ tạo tài khoản. |
| 10 | Tạo tài khoản | Button | Click | • **Disabled** tới khi [1], [2], [4] hợp lệ và đủ trường theo vai trò ([5], [6] hoặc [8]). Thành công → tạo tài khoản **chờ kích hoạt**, gửi lời mời kích hoạt qua Email (dùng chung cơ chế lời mời của `kh-kich-hoat-tk`, không cấp mật khẩu qua kênh khác — OQ-18), về `qt-danh-sach-tai-khoan`. |
| 11 | Hủy | Button | Click | • Về `qt-danh-sach-tai-khoan`, không tạo gì. |


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
│ (*) Agent tỉnh          ticket tỉnh mình, trong phạm vi phụ trách    │
│ ( ) Agent helpdesk      ticket tầng Helpdesk công ty                 │
│ ( ) Triển khai của Line  xử lý ticket mọi tầng + phiếu OneBSS        │
│ ( ) Biên tập nội dung   KB theo dịch vụ được gán                     │
│ ( ) Quản trị viên       toàn hệ thống                                │
│ ( ) Chủ quản dịch vụ    báo cáo mọi site, mọi dịch vụ                │
│ ( ) Khách hàng          chỉ site/dịch vụ của khách hàng mình         │
│                                                                      │
│ Phạm vi [2]: Địa bàn [v: Bình Định]  + các dòng Phạm vi phụ trách    │
├──────────────────────────────────────────────────────────────────────┤
│ [3] [ Áp dụng ]   [4] [  Hủy  ]   [5] < Xem nhật ký thao tác >       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Danh sách vai trò | Radio group | Check | • **7 vai trò cố định** (cập nhật 24/09/2026), mỗi vai trò kèm phạm vi dữ liệu: Khách hàng (site/dịch vụ của khách hàng mình) · Agent tỉnh (chỉ ticket tỉnh mình trong phạm vi phụ trách; xử lý, chuyển OneBSS) · Agent helpdesk (ticket tầng Helpdesk công ty; xử lý, chuyển OneBSS) · Triển khai của Line (đơn vị giải pháp: mọi ticket, xử lý đầy đủ mọi tầng, xử lý phiếu OneBSS) · Biên tập nội dung (KB theo dịch vụ được gán) · Quản trị viên (toàn hệ thống) · Chủ quản dịch vụ (xem báo cáo mọi site, mọi dịch vụ).<br>• Mỗi tài khoản đúng 1 vai trò; không tạo vai trò tùy chỉnh/chỉnh tay từng quyền (UC56). "Đầu mối" là cờ trên tài khoản khách hàng, không phải vai trò riêng (OQ-20a).<br>• Không hạ quyền của Quản trị viên cuối cùng (luôn còn ≥1, đã chốt 23/09/2026). |
| 2 | Phạm vi | Dropdown / Bảng | Select | • Hiện theo vai trò, cùng quy tắc với `qt-tao-tai-khoan-noibo`: **Địa bàn** (Agent tỉnh), **Phạm vi phụ trách** ≥1 dòng Dịch vụ × Đối tượng (Agent tỉnh, Agent helpdesk, Triển khai của Line), **Dịch vụ được gán** (Biên tập nội dung). Khách hàng: đơn vị/site không đổi được ở đây. Đổi phạm vi được ghi nhật ký (đổi phạm vi phụ trách). |
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
│ Bảng quyền theo vai trò (chỉ xem)               [1] < Về tài khoản > │
│ (i) Tham khảo, khách hàng đã xác nhận [2]                            │
├──────────────────────────────────────────────────────────────────────┤
│ Chức năng [3]             KH   AgT  AgH  TKL  BT   QT   CQ           │
│ ------------------------------------------------------------------   │
│ Tra cứu KB, hỏi AI        x    x    x    x    x    x    -            │
│ Hỏi đáp AI nội bộ         -    x    x    x    -    x    x            │
│ Xem nghiệp vụ mọi KH(AI)  -    -    -    x    -    x    x            │
│ Tạo & theo dõi ticket     x    -    -    -    -    -    -            │
│ Xem ticket (theo phạm vi) -    x    x    x    -    x    -            │
│ Phản hồi CK, đổi TT, gán  -    x    x    x    -    x    -            │
│ Ghi chú nội bộ            -    x    x    x    -    x    -            │
│ Tạo phiếu OneBSS          -    x    x    x    -    x    -            │
│ Soạn bài KB               -    x    x    x    x    x    -            │
│ Duyệt & xuất bản KB       -    -    -    -    -    x    -            │
│ Quản lý TK, phân quyền    -    -    -    -    -    x    -            │
│ Tạo TK đầu mối KH         -    x    -    x    -    x    -            │
│ Cấu hình AI/OneBSS/SLA    -    -    -    -    -    x    -            │
│ Xem báo cáo               -    cb   ?    x    -    x    x            │
│ KH=Khách AgT=A.tỉnh AgH=A.helpdesk TKL=Triển khai của Line           │
│ BT=Biên tập QT=Quản trị CQ=Chủ quản   ?=chưa có nguồn, chờ xác nhận  │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Về màn trước | Link | Click | • Quay về `qt-danh-sach-tai-khoan` hoặc `qt-phan-quyen` tùy nơi mở. |
| 2 | Nhãn tham khảo | Label | ReadOnly | • "Tham khảo, khách hàng đã xác nhận" — bảng suy ra từ mô tả vai trò trong tài liệu đề xuất (OQ-28). |
| 3 | Bảng quyền | Table | ReadOnly | • Hàng = **14 nhóm chức năng**, cột = **7 vai trò** (KH, Agent tỉnh, Agent helpdesk, Triển khai của Line, Biên tập, Quản trị viên, Chủ quản dịch vụ). `x` = được phép, `-` = không, `cb` = chỉ xem báo cáo cơ bản trong phạm vi (Agent tỉnh), **`?` = chưa có nguồn, chờ khách hàng xác nhận** (Agent helpdesk với "Xem báo cáo").<br>• Dòng ticket tách thành 3: **Xem ticket (theo phạm vi)**, **Phản hồi công khai, đổi trạng thái, phân công**, **Ghi chú nội bộ**. "Tạo phiếu OneBSS" áp dụng cho ticket tầng Tỉnh/Helpdesk. "Tạo TK đầu mối KH": Agent tỉnh, Triển khai của Line, Quản trị viên (Agent helpdesk không tạo).<br>• **Chỉ xem**: đổi vai trò của 1 tài khoản làm ở `qt-phan-quyen`. Chỉ Quản trị viên mở được. Bảng vẫn chỉ mang tính tham khảo (OQ-28); các ô của vai trò mới suy từ SRS v1.1, Agent helpdesk theo Agent tỉnh khi chưa có nguồn riêng [GIẢ ĐỊNH]. |

- **Đề xuất bổ sung, đã chốt (OQ-28).** Vào từ `qt-phan-quyen` và `qt-danh-sach-tai-khoan`; ký hiệu: KH=Khách hàng, AgT=Agent tỉnh, AgH=Agent helpdesk, TKL=Triển khai của Line, BT=Biên tập, QT=Quản trị viên, CQ=Chủ quản dịch vụ.


---

## Screen: qt-nhat-ky-thao-tac — Nhật ký thao tác (audit log)

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│ Nhật ký thao tác (audit log)                                         │
├──────────────────────────────────────────────────────────────────────┤
│ Hành động [1]    Người [2]        Từ               Đến [3]           │
│ [v: Tất cả     ] [______________] [__/__/____    ] [__/__/____    ]  │
├──────────────────────────────────────────────────────────────────────┤
│ Thời gian   Người    Hành động      Đối tượng      Chi tiết          │
│ -------------------------------------------------------------------- │
│ 17/09 10:20 Hoàng E  Đổi quyền      Trần Thị B     Agent -> Biên tập │
│ 17/09 10:05 Hoàng E  Đổi phạm vi    Trần Thị B     +iStorage x BĐ    │
│ 17/09 09:05 Hoàng E  Đổi định tuyến UBND Q.1       BĐ -> Trung ương  │
│ 16/09 15:40 Lê Văn F Xóa tài liệu   Bài #A-102     Lỗi 403 ký số     │
│ 15/09 14:10 Hoàng E  Gỡ danh tính   Lê Văn C       site-nho-le       │
│                                                                      │
│ [4] Trang 1/5                    Chỉ đọc - không sửa/xóa nhật ký     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Lọc hành động | Dropdown | Select | • Các thao tác nhạy cảm được ghi tối thiểu (Đề xuất — Nhật ký thao tác): **đổi quyền, đổi phạm vi phụ trách, xóa tài liệu, đổi định tuyến khách hàng (đổi địa bàn/hình thức hỗ trợ), gỡ danh tính site**. Danh sách giá trị mở rộng nếu sau này ghi thêm loại khác. |
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
| OQ-20c | Đổi địa bàn/hình thức hỗ trợ; vô hiệu hóa agent đang giữ ticket | Đổi địa bàn hoặc hình thức hỗ trợ (đổi tầng tiếp nhận): ticket đang mở giữ tầng cũ đến khi đóng, ticket mới theo tầng mới (cập nhật 24/09/2026, thay "đổi loại KH"). Vô hiệu hóa agent: yêu cầu chuyển ticket sang nhân viên khác cùng tầng, chưa chuyển thì tự về hàng đợi tầng. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-20d | Nhật ký thao tác | Chỉ Quản trị viên xem, chỉ đọc; giữ 12 tháng trực tuyến; xuất được Excel. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-28 | Bảng quyền vai trò × chức năng chính thức (bổ sung OQ-23b) | Dùng `qt-ma-tran-phan-quyen` làm tham khảo; Agent tỉnh chỉ xem báo cáo cơ bản trong phạm vi phụ trách của mình (cập nhật 24/09/2026: bảng 7 vai trò). | Đã chốt (khách hàng xác nhận, 21/09/2026) |
