# Flow: Tra cứu HDSD + FAQ lỗi

> Màn hình thuộc flow này: kb-trang-chu → kb-ket-qua-tim-kiem → kb-chi-tiet-bai-viet → kb-danh-muc-loi. Flow tổng xem `../srs/ho-tro-cskh-userflow.md` Mục 1.
>
> Các mục ghi "(OQ-n)" đã có **đề xuất chờ khách hàng xác nhận** ở bảng cuối file (cập nhật 19/09/2026), cũng đã ghi vào tài liệu "Đề xuất Hệ thống Hỗ trợ & Chăm sóc Khách hàng.docx".

---

## Screen: kb-trang-chu — Trang chủ tra cứu

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi            (o) A v       │
├──────────────────────────────────────────────────────────────────────┤
│ Phạm vi nội dung: iOffice - UBND Bình Định [1]                       │
├──────────────────────────────────────────────────────────────────────┤
│ [2] [Nhập từ khóa: ký số, văn bản đi, lỗi 403...___] [3] [ Tìm ]     │
├──────────────────────────────────────────────────────────────────────┤
│ Duyệt theo danh mục [4]           | Lỗi / tình huống thường gặp [6]  │
│                                   |                                  │
│ v Văn bản đến                     | - Lỗi 403 khi ký số              │
│     - Tiếp nhận văn bản           | - Không gửi được văn bản đi      │
│     - Phân công xử lý             | - Không tải được tệp đính kèm    │
│ > Văn bản đi                      |                                  │
│ > Ký số                           | [7] < Xem tất cả lỗi >           │
│ > Lịch công tác                   |                                  │
│ [5] < Xem toàn bộ danh mục >      |                                  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Phạm vi nội dung | Label | ReadOnly | • Hiện dịch vụ + site của khách hàng đang đăng nhập; **chỉ nội dung dùng chung của dịch vụ đó + nội dung riêng của site** được hiển thị (Đề xuất — Quản trị tài liệu đa khách hàng/site mục 1). Không chuyển được sang site/dịch vụ khác.<br>• Khách hàng dùng cả iOffice và iStorage: cách chọn dịch vụ đang xem đã đề xuất, chờ xác nhận (OQ-9). |
| 2 | Từ khóa tìm kiếm | Textbox | Text | • Không bắt buộc về mặt hiển thị; Enter hoặc bấm [3] để tìm. Rỗng → không tìm, giữ nguyên màn.<br>• Placeholder gợi ý ví dụ từ khóa/mã lỗi. |
| 3 | Tìm | Button | Click | • Click → `kb-ket-qua-tim-kiem` với từ khóa đã nhập, kết quả đã lọc cứng theo dịch vụ + site của người dùng.<br>• Khóa khi đang tìm (chống double-submit). |
| 4 | Cây danh mục chức năng | Tree | Select | • Duyệt theo Dịch vụ → nhóm chức năng → bài viết (tận dụng cấu trúc UM đã có — Đề xuất, Quản trị tài liệu mục 2). Bấm ▶ mở/đóng nhóm; bấm tên bài → `kb-chi-tiet-bai-viet`.<br>• Chỉ hiện nhóm/bài trong phạm vi được xem; nhóm rỗng thì ẩn.<br>• Số cấp tối đa của cây: chưa có nguồn. |
| 5 | Xem toàn bộ danh mục | Link | Click | • Mở rộng toàn bộ cây danh mục (cùng màn) khi cây đang thu gọn. |
| 6 | Lỗi / tình huống thường gặp | List | Select | • Lối tắt tới các lỗi/tình huống hay gặp; bấm 1 dòng → `kb-chi-tiet-bai-viet`.<br>• Cách chọn "thường gặp" (theo lượt xem / do biên tập ghim): đã đề xuất, chờ xác nhận (OQ-10). |
| 7 | Xem tất cả lỗi & tình huống | Link | Click | • Navigate → `kb-danh-muc-loi`. |

- Header dùng chung (không đánh số). Dữ liệu mẫu (tên nhóm, tên bài) chỉ để minh họa, do biên tập nội dung định nghĩa.


---

## Screen: kb-ket-qua-tim-kiem — Kết quả tìm kiếm

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi            (o) A v       │
├──────────────────────────────────────────────────────────────────────┤
│ [1] [ký số_________________________________] [ Tìm ]                 │
│ Loại nội dung [v: Tất cả] [2]     Danh mục [v: Tất cả] [3]           │
├──────────────────────────────────────────────────────────────────────┤
│ [4] Tìm thấy 3 kết quả cho "ký số"                                   │
│                                                                      │
│ [5] < Hướng dẫn ký số văn bản đi >          (Hướng dẫn sử dụng)      │
│     Các bước chọn chứng thư số và ký văn bản trước khi...            │
│     Hữu ích: 18/20                                                   │
│                                                                      │
│     < Lỗi 403 khi ký số >                   (Xử lý lỗi/sự cố)        │
│     Khi ký số báo không có quyền, kiểm tra vai trò ký...             │
│                                                                      │
│     < Cập nhật chứng thư số mới >           (Thông báo cập nhật)     │
│     Từ 15/09 hệ thống hỗ trợ chứng thư số của...                     │
├──────────────────────────────────────────────────────────────────────┤
│ [6] Trang 1/1                                                        │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Từ khóa tìm kiếm | Textbox | Text | • Giữ lại từ khóa vừa tìm, sửa được rồi bấm Tìm để tìm lại; rỗng → không tìm. |
| 2 | Lọc loại nội dung | Dropdown | Select | • Giá trị: Tất cả / Hướng dẫn sử dụng / Câu hỏi thường gặp (FAQ) / Xử lý lỗi/sự cố / Thông báo cập nhật hệ thống (Đề xuất — Quản trị danh mục nội dung mục 2). Đổi giá trị → lọc lại ngay, giữ từ khóa. |
| 3 | Lọc danh mục | Dropdown | Select | • Danh sách nhóm chức năng trong phạm vi được xem; mặc định Tất cả. |
| 4 | Số kết quả | Label | ReadOnly | • Đếm kết quả **sau khi đã lọc cứng theo dịch vụ + site** của người dùng — bài của site khác không bao giờ được đếm hay hiện.<br>• **Không có kết quả** (kể cả do nội dung nằm ngoài phạm vi site): thay danh sách bằng thông báo "Không tìm thấy kết quả" + gợi ý đổi từ khóa; không tiết lộ là có/không có bài ở site khác. Từ đó khách hàng dùng menu Hỏi đáp AI hoặc tạo ticket (Flow 3/4). |
| 5 | Kết quả tìm kiếm | List | Select | • Mỗi dòng: tiêu đề (link), loại nội dung, đoạn trích, tỷ lệ đánh giá hữu ích. Bấm tiêu đề → `kb-chi-tiet-bai-viet`.<br>• Chỉ hiện bài trạng thái đã xuất bản; bài đã ẩn/hủy không xuất hiện (UC26).<br>• Thứ tự xếp hạng: chưa có nguồn. |
| 6 | Phân trang | Pagination | Click | • Số bản ghi/trang: đã đề xuất, chờ xác nhận (OQ-11); ẩn khi chỉ có 1 trang. |

- Trạng thái "không có kết quả" gộp trong Description [4] (userflow chưa có slug riêng); dữ liệu mẫu chỉ minh họa.


---

## Screen: kb-chi-tiet-bai-viet — Chi tiết bài viết

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi            (o) A v       │
├──────────────────────────────────────────────────────────────────────┤
│ [1] Tra cứu > Ký số > Ký số văn bản đi                               │
├──────────────────────────────────────────────────────────────────────┤
│ Hướng dẫn ký số văn bản đi                                           │
│ [2] Hướng dẫn sử dụng | iOffice | Cập nhật 12/09/2026                │
│                                                                      │
│ Bước 1. Mở văn bản cần ký, chọn nút Ký số.                           │
│ Bước 2. Chọn chứng thư số trong danh sách.  [3]                      │
│ [ IMG: màn hình chọn chứng thư số ]                                  │
│ Bước 3. Nhập mã PIN và xác nhận.                                     │
├──────────────────────────────────────────────────────────────────────┤
│ [4] Bài viết có hữu ích không? [ Hữu ích ] [ Không hữu ích ]         │
│ [5] < Lưu bài viết >                                                 │
│ [6] Chưa giải quyết được? [ Tạo yêu cầu hỗ trợ ]                     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Đường dẫn danh mục | Breadcrumb | Click | • Dịch vụ → nhóm chức năng → tên bài; bấm 1 cấp → về `kb-trang-chu` mở đúng nhánh danh mục. |
| 2 | Thông tin bài viết | Label | ReadOnly | • Loại nội dung, dịch vụ, ngày cập nhật lần xuất bản gần nhất. Không hiện thông tin nội bộ (người soạn/duyệt). |
| 3 | Nội dung bài viết | Rich text | ReadOnly | • Hướng dẫn từng bước kèm ảnh minh họa (Đề xuất — Tra cứu lỗi/tình huống). Chỉ xem, không sửa.<br>• Bài chỉ đánh dấu "không dùng cho AI" vẫn xem bình thường ở đây (chỉ ảnh hưởng Hỏi đáp AI).<br>• **Truy cập ngoài phạm vi / bài đã ẩn-hủy còn link cũ** (mở link đã lưu, deep-link): thay nội dung bằng thông báo "Bài viết không còn hoặc bạn không có quyền xem" (không phân biệt hai trường hợp, tránh lộ dữ liệu site khác) + nút về `kb-trang-chu`. |
| 4 | Đánh giá hữu ích | Button group | Click | • Chọn 1 trong 2 (Hữu ích / Không hữu ích) → ghi nhận, nút chuyển trạng thái đã chọn, hiện "Cảm ơn bạn" (wording tạm). Đổi ý được hay chỉ đánh giá 1 lần/khách hàng/bài: đã đề xuất, chờ xác nhận (OQ-12).<br>• Dữ liệu này nuôi báo cáo bài KB hữu ích nhiều/ít nhất (UC39). |
| 5 | Lưu bài viết | Link | Click | • Bấm → thêm bài vào "Bài viết đã lưu" trong `kh-tai-khoan-ca-nhan`; nhãn đổi thành "Bỏ lưu". Chưa có "theo dõi cập nhật" ở MVP (giai đoạn sau, OQ-8). |
| 6 | Tạo yêu cầu hỗ trợ | Button | Click | • CTA cho khách hàng đọc xong vẫn chưa giải quyết được → sang `ticket-tao-moi`; tự điền dịch vụ và gắn bài viết đang xem làm tham chiếu [GIẢ ĐỊNH — việc gắn tham chiếu do `/srs` chốt]. |

- Trạng thái "bài không còn/không có quyền xem" gộp trong Description [3] (userflow chưa có slug riêng).


---

## Screen: kb-danh-muc-loi — Danh mục lỗi / tình huống thường gặp

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi            (o) A v       │
├──────────────────────────────────────────────────────────────────────┤
│ Lỗi & tình huống thường gặp                                          │
├──────────────────────────────────────────────────────────────────────┤
│ Mã/lỗi [1] [403___] Module [v: Tất cả] [2] Tình huống [v: Tất cả] [3]│
├──────────────────────────────────────────────────────────────────────┤
│ [4] Mã / thông báo lỗi           Module          Tình huống          │
│ -------------------------------------------------------------------  │
│ < 403 - Không có quyền ký số >   Ký số           Ký văn bản          │
│ < Không gửi được văn bản đi >    Văn bản đi      Gửi văn bản         │
│ < Không tải được tệp đính kèm >  Văn bản đến     Đính kèm            │
│                                                                      │
│ Trang 1/1                                                            │
├──────────────────────────────────────────────────────────────────────┤
│ [5] Không thấy lỗi của bạn? [ Tạo yêu cầu hỗ trợ ]                   │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Tìm theo mã/thông báo lỗi | Textbox | Text | • Lọc danh sách theo mã hoặc đoạn thông báo lỗi khách hàng thấy trên màn hình iOffice/iStorage; rỗng → hiện tất cả. |
| 2 | Lọc module | Dropdown | Select | • Danh sách module của dịch vụ trong phạm vi site; mặc định Tất cả. |
| 3 | Lọc tình huống | Dropdown | Select | • Nhóm tình huống (vd Ký văn bản, Gửi văn bản, Đính kèm) — [GIẢ ĐỊNH] nhóm do biên tập định nghĩa; nguồn chỉ nói "theo tình huống". |
| 4 | Bảng lỗi / tình huống | Table | Select | • Mỗi dòng 1 bài loại Xử lý lỗi/sự cố hoặc FAQ; bấm tên → `kb-chi-tiet-bai-viet` (hướng dẫn khắc phục từng bước kèm ảnh).<br>• Chỉ hiện mục trong phạm vi dịch vụ + site; không có kết quả lọc → "Không tìm thấy lỗi phù hợp" + gợi ý [5]. |
| 5 | Tạo yêu cầu hỗ trợ | Button | Click | • Cùng hành vi CTA ở `kb-chi-tiet-bai-viet`: sang `ticket-tao-moi` khi khách hàng không tìm thấy lỗi của mình. |

- Dữ liệu mẫu (mã lỗi, module) chỉ minh họa, không phải mã lỗi của hệ thống CSKH.


---

## Đề xuất đã cập nhật (chờ khách hàng xác nhận)

| Mã | Nội dung cần chốt | Đề xuất | Trạng thái |
|----|-------------------|---------|------------|
| OQ-9 | Khách hàng dùng nhiều dịch vụ | Bộ chuyển dịch vụ ở đầu trang tra cứu, mặc định dịch vụ dùng gần nhất; nội dung, hỏi đáp AI, tạo ticket theo dịch vụ đang chọn. | Chờ khách hàng xác nhận |
| OQ-10 | Lỗi/tình huống thường gặp | Tự động top 5 theo lượt xem 30 ngày; biên tập được ghim tối đa 3 bài lên đầu. | Chờ khách hàng xác nhận |
| OQ-11 | Phân trang, xếp hạng tìm kiếm | 20 bản ghi/trang; xếp khớp tiêu đề trước khớp nội dung; bằng nhau thì bài riêng site trước bài dùng chung, rồi bài cập nhật gần nhất. | Chờ khách hàng xác nhận |
| OQ-12 | Đánh giá hữu ích bài viết | Mỗi khách hàng 1 đánh giá/bài, được đổi ý (ghi đè). | Chờ khách hàng xác nhận |
