# Flow: Tra cứu HDSD + FAQ lỗi

> Màn hình thuộc flow này: kb-trang-chu → kb-ket-qua-tim-kiem → kb-khong-co-ket-qua → kb-chi-tiet-bai-viet → kb-bai-viet-khong-con → kb-danh-muc-loi. Flow tổng xem `../srs/ho-tro-cskh-userflow.md` Mục 1. Header khách hàng: thanh điều hướng + chip dịch vụ/site đang xem (bản Figma dùng thanh xanh).
>
> Các mục ghi "(OQ-n)" đã được **khách hàng xác nhận (21/09/2026)** ở bảng cuối file (cập nhật 19/09/2026), cũng đã ghi vào tài liệu "Đề xuất Hệ thống Hỗ trợ & Chăm sóc Khách hàng.docx".

---

## Screen: kb-trang-chu — Trang chủ tra cứu

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi   [BĐ - iOffice] (o) A v │
├──────────────────────────────────────────────────────────────────────┤
│            Bạn cần hỗ trợ gì hôm nay?                                │
│ [2] [Nhập từ khóa: ký số, văn bản đi, lỗi 403...___] [3] [ Tìm ]     │
│     (Ký số) (Lỗi 403) (Văn bản đi) (Tải tệp đính kèm)  [8]           │
│ [1] Phạm vi nội dung: iOffice - UBND Bình Định                       │
├──────────────────────────────────────────────────────────────────────┤
│ Duyệt theo danh mục [4]  | Lỗi thường gặp [6]    | Hỏi đáp AI [9]    │
│ v Văn bản đến            | - Lỗi 403 khi ký số   | Hỏi tự nhiên, AI  │
│     - Tiếp nhận văn bản  | - Không gửi được VB   | trả lời kèm nguồn │
│     - Phân công xử lý    | - Không tải tệp       | để kiểm chứng     │
│ > Văn bản đi             |                       |                   │
│ > Ký số                  | [7] < Xem tất cả >    | [ Đặt câu hỏi ]   │
│ > Lịch công tác          |                       |                   │
│ [5] < Xem toàn bộ danh mục >                                         │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Phạm vi nội dung | Label | ReadOnly | • Hiện dịch vụ + site của khách hàng đang đăng nhập; **chỉ nội dung dùng chung của dịch vụ đó + nội dung riêng của site** được hiển thị (Đề xuất — Quản trị tài liệu đa khách hàng/site mục 1). Không chuyển được sang site/dịch vụ khác.<br>• Khách hàng dùng cả iOffice và iStorage: cách chọn dịch vụ đang xem đã chốt (OQ-9). |
| 2 | Từ khóa tìm kiếm | Textbox | Text | • Không bắt buộc về mặt hiển thị; Enter hoặc bấm [3] để tìm. Rỗng → không tìm, giữ nguyên màn.<br>• Placeholder gợi ý ví dụ từ khóa/mã lỗi. |
| 3 | Tìm | Button | Click | • Click → `kb-ket-qua-tim-kiem` với từ khóa đã nhập, kết quả đã lọc cứng theo dịch vụ + site của người dùng.<br>• Khóa khi đang tìm (chống double-submit). |
| 4 | Cây danh mục chức năng | Tree | Select | • Duyệt theo Dịch vụ → nhóm chức năng → bài viết (tận dụng cấu trúc UM đã có — Đề xuất, Quản trị tài liệu mục 2). Bấm ▶ mở/đóng nhóm; bấm tên bài → `kb-chi-tiet-bai-viet`.<br>• Chỉ hiện nhóm/bài trong phạm vi được xem; nhóm rỗng thì ẩn.<br>• Số cấp tối đa của cây: chưa có nguồn. |
| 5 | Xem toàn bộ danh mục | Link | Click | • Mở rộng toàn bộ cây danh mục (cùng màn) khi cây đang thu gọn. |
| 6 | Lỗi / tình huống thường gặp | List | Select | • Lối tắt tới các lỗi/tình huống hay gặp; bấm 1 dòng → `kb-chi-tiet-bai-viet`.<br>• Cách chọn "thường gặp" (theo lượt xem / do biên tập ghim): đã chốt (OQ-10). |
| 7 | Xem tất cả lỗi & tình huống | Link | Click | • Navigate → `kb-danh-muc-loi`. |
| 8 | Từ khóa gợi ý | Chip list | Click | • Các từ khóa hay tìm (vd Ký số, Lỗi 403, Văn bản đi, Tải tệp đính kèm); bấm 1 chip = tìm ngay từ khóa đó → `kb-ket-qua-tim-kiem`. Cách chọn từ khóa gợi ý (theo lượt tìm 30 ngày hoặc biên tập ghim): [GIẢ ĐỊNH — cùng cơ chế OQ-10], chờ xác nhận. |
| 9 | Thẻ Hỏi đáp AI | Card + Button | Click | • Lối tắt vào `ai-khung-chat` (nút "Đặt câu hỏi"); ghi rõ AI chỉ trả lời dựa trên tài liệu của đơn vị và kèm nguồn để kiểm chứng.<br>• **Ẩn cả thẻ khi chế độ Hỏi đáp AI tắt cho dịch vụ/site** (OQ-15), không để link chết. |
| 10 | Chọn dịch vụ đang xem | Radio list (menu người dùng) | Select | • Chỉ hiện khi khách hàng dùng từ 2 dịch vụ trở lên tại site (OQ-9): chọn 1 dịch vụ → nội dung, Hỏi đáp AI và tạo ticket theo dịch vụ đang chọn; mặc định dịch vụ dùng gần nhất. Xem Trạng thái phụ — menu người dùng. |

- Header dùng chung (không đánh số). Dữ liệu mẫu (tên nhóm, tên bài) chỉ để minh họa, do biên tập nội dung định nghĩa.

- Bản chính từ thiết kế Figma (21/09/2026): băng xanh có ô tìm kiếm + từ khóa gợi ý + dòng phạm vi nội dung; là **trang chủ khách hàng** — thanh điều hướng nối tới `kh-danh-sach-thanh-vien` (chỉ đầu mối), `kh-tai-khoan-ca-nhan`, `ai-khung-chat`, `ticket-danh-sach-kh`.

#### Trạng thái phụ — menu người dùng / chọn dịch vụ-site

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi   [BĐ - iOffice] (o) A v │
├──────────────────────────────────────────────────────────────────────┤
│            Bạn cần hỗ trợ gì hôm nay?                                │
├──────────────────────────────────────────────────────────────────────┤
│ (nền mờ - trang chủ tra cứu ở phía sau)                              │
│                          ┌──────────────────────────────────────┐    │
│                          │ Nguyễn Văn A - a.nguyen@ubnd.gov.vn  │    │
│                          │ [Đầu mối]                            │    │
│                          ├──────────────────────────────────────┤    │
│                          │ Đơn vị / dịch vụ đang xem [10]       │    │
│                          │ (*) UBND Bình Định - iOffice         │    │
│                          │ ( ) UBND Bình Định - iStorage        │    │
│                          ├──────────────────────────────────────┤    │
│                          │ < Tài khoản cá nhân > < Thông báo >  │    │
│                          │ < Đăng xuất >                        │    │
│                          └──────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────────┘
```

- Khác màn gốc: khi bấm avatar hiện menu gồm họ tên + email + nhãn vai trò (vd Đầu mối), danh sách đơn vị/dịch vụ đang xem [10], Tài khoản cá nhân, Thông báo (chưa có màn dành cho khách hàng — theo OQ-24), Đăng xuất. Nền màn phía sau mờ đi.


---

## Screen: kb-ket-qua-tim-kiem — Kết quả tìm kiếm

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi   [BĐ - iOffice] (o) A v │
├──────────────────────────────────────────────────────────────────────┤
│ [1] [ký số_________________________________] [ Tìm ]                 │
│     Phạm vi nội dung: iOffice - UBND Bình Định                       │
├──────────────────────────────────────────────────────────────────────┤
│ Loại nội dung [v: Tất cả] [2]  Danh mục [v: Tất cả] [3]              │
│ [4] Tìm thấy 3 kết quả cho "ký số"                                   │
│ [5] < Hướng dẫn ký số văn bản đi >           | [7] Hỏi đáp AI        │
│     Hướng dẫn sử dụng | Hữu ích 18/20        | [ Hỏi AI về ký số ]   │
│     Các bước chọn chứng thư số và ký...      |                       │
│     < Lỗi 403 khi ký số >                    | [8] Cần hỗ trợ?       │
│     Xử lý lỗi/sự cố                          | [ Tạo yêu cầu ]       │
│     Khi ký số báo không có quyền...          |                       │
│     < Cập nhật chứng thư số mới >            |                       │
│     Thông báo cập nhật                       |                       │
│     Từ 15/09 hệ thống hỗ trợ chứng...        |                       │
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
| 4 | Số kết quả | Label | ReadOnly | • Đếm kết quả **sau khi đã lọc cứng theo dịch vụ + site** của người dùng — bài của site khác không bao giờ được đếm hay hiện.<br>• **Không có kết quả** (kể cả do nội dung nằm ngoài phạm vi site): thay danh sách bằng thông báo "Không tìm thấy kết quả" + gợi ý đổi từ khóa; không tiết lộ là có/không có bài ở site khác. Từ đó khách hàng dùng menu Hỏi đáp AI hoặc tạo ticket (Flow 3/4).<br>• **Không có kết quả** (kể cả do nội dung nằm ngoài phạm vi site) → chuyển sang màn riêng `kb-khong-co-ket-qua`. |
| 5 | Kết quả tìm kiếm | List | Select | • Mỗi dòng: tiêu đề (link), loại nội dung, đoạn trích, tỷ lệ đánh giá hữu ích. Bấm tiêu đề → `kb-chi-tiet-bai-viet`.<br>• Chỉ hiện bài trạng thái đã xuất bản; bài đã ẩn/hủy không xuất hiện (UC26).<br>• Thứ tự xếp hạng: chưa có nguồn. |
| 6 | Phân trang | Pagination | Click | • 10 bản ghi/trang (đã chốt, OQ-11); ẩn khi chỉ có 1 trang. |
| 7 | Thẻ Hỏi đáp AI | Card + Button | Click | • "Hỏi AI về <từ khóa>" → `ai-khung-chat`, tự điền từ khóa làm câu hỏi đầu [GIẢ ĐỊNH]; **ẩn khi tắt Hỏi đáp AI theo dịch vụ/site** (OQ-15). |
| 8 | Thẻ Cần hỗ trợ | Card + Button | Click | • "Tạo yêu cầu hỗ trợ" → `ticket-tao-moi` (tự điền dịch vụ); bổ sung cho nút "Chưa giải quyết được" ở `kb-chi-tiet-bai-viet` và `kb-danh-muc-loi`. |

- Trạng thái "không có kết quả" đã tách thành màn riêng `kb-khong-co-ket-qua` (quy tắc trạng thái loại trừ = màn riêng); dữ liệu mẫu chỉ minh họa.


---

## Screen: kb-khong-co-ket-qua — Không có kết quả tìm kiếm

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi   [BĐ - iOffice] (o) A v │
├──────────────────────────────────────────────────────────────────────┤
│ [1] [abcxyz________________________________] [ Tìm ]                 │
│     Phạm vi nội dung: iOffice - UBND Bình Định                       │
├──────────────────────────────────────────────────────────────────────┤
│ Loại nội dung [v: Tất cả]  Danh mục [v: Tất cả]  Không có kết quả    │
│                                                                      │
│                 [ Biểu tượng tìm kiếm không có kết quả ]             │
│                     Không tìm thấy kết quả [2]                       │
│        Thử đổi từ khóa, bỏ bớt bộ lọc, hoặc dùng lựa chọn dưới đây.  │
│                                                                      │
│                  [3] Hỏi đáp AI: [ Hỏi AI ]                          │
│                  [4] [ Tạo yêu cầu hỗ trợ ]                          │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Từ khóa tìm kiếm | Textbox | Text | • Giữ lại từ khóa vừa tìm để sửa và tìm lại (Enter hoặc [ Tìm ]); rỗng → không tìm. |
| 2 | Thông báo không có kết quả | Label + Icon | ReadOnly | • Hiện khi **không có bài nào trong phạm vi dịch vụ + site** (kể cả bài chỉ tồn tại ở site khác): chỉ nói "Không tìm thấy kết quả" + gợi ý đổi từ khóa/bỏ bớt bộ lọc, **không tiết lộ** có hay không bài ở site khác.<br>• Bộ lọc loại nội dung/danh mục vẫn hiện để bỏ bớt điều kiện. |
| 3 | Hỏi đáp AI | Card + Button | Click | • "Hỏi AI" → `ai-khung-chat`, tự điền từ khóa làm câu hỏi đầu [GIẢ ĐỊNH]. **Ẩn khi tắt Hỏi đáp AI theo dịch vụ/site** (OQ-15). |
| 4 | Tạo yêu cầu hỗ trợ | Button | Click | • Sang `ticket-tao-moi`, tự điền dịch vụ; ghi nhận từ khóa đã tìm làm tham chiếu [GIẢ ĐỊNH — do `/srs` chốt]. |

- Tách khỏi `kb-ket-qua-tim-kiem` theo quy tắc: trạng thái loại trừ (có/không có kết quả) là màn riêng. Đường vào: từ `kb-ket-qua-tim-kiem` khi không có kết quả; đường ra: đổi từ khóa về `kb-trang-chu`.


---

## Screen: kb-chi-tiet-bai-viet — Chi tiết bài viết

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi   [BĐ - iOffice] (o) A v │
├──────────────────────────────────────────────────────────────────────┤
│ [1] Tra cứu > Ký số > Ký số văn bản đi                               │
├──────────────────────────────────────────────────────────────────────┤
│ Hướng dẫn ký số văn bản đi                | [6] Chưa giải quyết được?│
│ [2] (Hướng dẫn sử dụng) (iOffice)          |   [ Tạo yêu cầu hỗ trợ ]│
│     Cập nhật 12/09/2026                    |                         │
│ (1) Mở văn bản cần ký, chọn nút Ký số.     | [7] Bài viết liên quan  │
│ (2) Chọn chứng thư số trong danh sách. [3] |   < Lỗi 403 khi ký số > │
│ [ IMG: màn hình chọn chứng thư số ]       |   < Chứng thư số mới >   │
│ (3) Nhập mã PIN và xác nhận.               |                         │
├──────────────────────────────────────────────────────────────────────┤
│ [4] Bài viết có hữu ích không? [ Hữu ích ] [ Không hữu ích ]         │
│ [5] < Lưu bài viết >                                                 │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Đường dẫn danh mục | Breadcrumb | Click | • Dịch vụ → nhóm chức năng → tên bài; bấm 1 cấp → về `kb-trang-chu` mở đúng nhánh danh mục. |
| 2 | Thông tin bài viết | Label | ReadOnly | • Loại nội dung, dịch vụ, ngày cập nhật lần xuất bản gần nhất. Không hiện thông tin nội bộ (người soạn/duyệt). |
| 3 | Nội dung bài viết | Rich text | ReadOnly | • Hướng dẫn từng bước kèm ảnh minh họa (Đề xuất — Tra cứu lỗi/tình huống). Chỉ xem, không sửa.<br>• Bài chỉ đánh dấu "không dùng cho AI" vẫn xem bình thường ở đây (chỉ ảnh hưởng Hỏi đáp AI).<br>• **Truy cập ngoài phạm vi / bài đã ẩn-hủy còn link cũ** (mở link đã lưu, deep-link): thay nội dung bằng thông báo "Bài viết không còn hoặc bạn không có quyền xem" (không phân biệt hai trường hợp, tránh lộ dữ liệu site khác) + nút về `kb-trang-chu`.<br>• Bài đã ẩn/hủy hoặc ngoài phạm vi khi mở link cũ → chuyển sang màn riêng `kb-bai-viet-khong-con`. |
| 4 | Đánh giá hữu ích | Button group | Click | • Chọn 1 trong 2 (Hữu ích / Không hữu ích) → ghi nhận, nút chuyển trạng thái đã chọn, hiện "Cảm ơn bạn" (wording tạm). Đổi ý được hay chỉ đánh giá 1 lần/khách hàng/bài: đã chốt (OQ-12).<br>• Dữ liệu này nuôi báo cáo bài KB hữu ích nhiều/ít nhất (UC39). |
| 5 | Lưu bài viết | Link | Click | • Bấm → thêm bài vào "Bài viết đã lưu" trong `kh-tai-khoan-ca-nhan`; nhãn đổi thành "Bỏ lưu". Chưa có "theo dõi cập nhật" ở MVP (giai đoạn sau, OQ-8). |
| 6 | Tạo yêu cầu hỗ trợ | Button | Click | • CTA cho khách hàng đọc xong vẫn chưa giải quyết được → sang `ticket-tao-moi`; tự điền dịch vụ và gắn bài viết đang xem làm tham chiếu [GIẢ ĐỊNH — việc gắn tham chiếu do `/srs` chốt]. |
| 7 | Bài viết liên quan | Link list | Click | • [GIẢ ĐỊNH — chưa có nguồn, OQ-30] Tối đa 3 bài cùng nhóm chức năng, **chịu cùng bộ lọc cứng dịch vụ + site** (không lộ tiêu đề bài site khác); bấm → `kb-chi-tiet-bai-viet` của bài đó; bài đã ẩn dẫn tới `kb-bai-viet-khong-con`. |

- Trạng thái "bài không còn/không có quyền xem" đã tách thành màn riêng `kb-bai-viet-khong-con`. Bản Figma đặt CTA "Chưa giải quyết được" và "Bài viết liên quan" ở cột phải.

#### Trạng thái phụ — đã đánh giá hữu ích và đã lưu

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi   [BĐ - iOffice] (o) A v │
├──────────────────────────────────────────────────────────────────────┤
│ Hướng dẫn ký số văn bản đi                                           │
│ (1)... (2)... (3)...  (rút gọn như màn gốc)                          │
├──────────────────────────────────────────────────────────────────────┤
│ [4] Bài viết có hữu ích không? [*Hữu ích*] [ Không hữu ích ]         │
│     (ok) Cảm ơn bạn đã đánh giá bài viết.                            │
│ [5] < Đã lưu - Bỏ lưu >                                              │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- Khác màn gốc: nút "Hữu ích" ở trạng thái đã chọn, hiện "Cảm ơn bạn đã đánh giá bài viết." (wording tạm); [5] đổi thành "Đã lưu - Bỏ lưu". Đổi ý/đánh giá lại: OQ-12.


---

## Screen: kb-bai-viet-khong-con — Bài viết không còn hoặc không có quyền xem

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi   [BĐ - iOffice] (o) A v │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│                                                                      │
│           ┌──────────────────────────────────────────────┐           │
│           │      [ Biểu tượng tài liệu không còn ]       │           │
│           │  Bài viết không còn hoặc bạn không có        │           │
│           │  quyền xem [1]                               │           │
│           │  Liên kết có thể đã cũ hoặc bài đã được ẩn.  │           │
│           │  [2] [ Về trang tra cứu ]                    │           │
│           └──────────────────────────────────────────────┘           │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Thông báo | Label + Icon | ReadOnly | • "Bài viết không còn hoặc bạn không có quyền xem": **một thông báo gộp cho cả bài đã ẩn/hủy lẫn bài ngoài phạm vi site/dịch vụ** — không phân biệt để tránh lộ dữ liệu site khác (UC26). Không hiện tên hay đoạn trích bài. |
| 2 | Về trang tra cứu | Button | Click | • Về `kb-trang-chu` (lối ra duy nhất). Header chung giữ nguyên nên khách hàng vẫn chuyển được sang Hỏi đáp AI/Ticket. |

- Tách khỏi `kb-chi-tiet-bai-viet`. Đường vào: mở link đã lưu/deep-link tới bài không còn hoặc ngoài phạm vi. Quy tắc trang trạng thái tổng: userflow Mục 5.


---

## Screen: kb-danh-muc-loi — Danh mục lỗi / tình huống thường gặp

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi   [BĐ - iOffice] (o) A v │
├──────────────────────────────────────────────────────────────────────┤
│            Lỗi và tình huống thường gặp                              │
│ [1] [403 - Không có quyền ký số____] [ Tìm ]                         │
│     Phạm vi nội dung: iOffice - UBND Bình Định                       │
│ Module [v: Tất cả] [2]   Tình huống [v: Tất cả] [3]   3 lỗi phù hợp  │
├──────────────────────────────────────────────────────────────────────┤
│ [4] Mã / thông báo lỗi           Module          Tình huống          │
│ -------------------------------------------------------------------  │
│ < 403 - Không có quyền ký số >   Ký số           Ký văn bản          │
│ < Không gửi được văn bản đi >    Văn bản đi      Gửi văn bản         │
│ < Không tải được tệp đính kèm >  Văn bản đến     Đính kèm            │
│ Trang 1/1                                                            │
├──────────────────────────────────────────────────────────────────────┤
│ [5] Không thấy lỗi của bạn? Gửi yêu cầu để đội hỗ trợ kiểm tra.      │
│     [ Tạo yêu cầu hỗ trợ ]                                           │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Tìm theo mã/thông báo lỗi | Textbox | Text | • Lọc danh sách theo mã hoặc đoạn thông báo lỗi khách hàng thấy trên màn hình iOffice/iStorage; rỗng → hiện tất cả. |
| 2 | Lọc module | Dropdown | Select | • Danh sách module của dịch vụ trong phạm vi site; mặc định Tất cả. |
| 3 | Lọc tình huống | Dropdown | Select | • Nhóm tình huống (vd Ký văn bản, Gửi văn bản, Đính kèm) — [GIẢ ĐỊNH] nhóm do biên tập định nghĩa; nguồn chỉ nói "theo tình huống". |
| 4 | Bảng lỗi / tình huống | Table | Select | • Mỗi dòng 1 bài loại Xử lý lỗi/sự cố hoặc FAQ; bấm tên → `kb-chi-tiet-bai-viet` (hướng dẫn khắc phục từng bước kèm ảnh).<br>• Chỉ hiện mục trong phạm vi dịch vụ + site; không có kết quả lọc → "Không tìm thấy lỗi phù hợp" + gợi ý [5]. |
| 5 | Tạo yêu cầu hỗ trợ | Button | Click | • Cùng hành vi CTA ở `kb-chi-tiet-bai-viet`: sang `ticket-tao-moi` khi khách hàng không tìm thấy lỗi của mình.<br>• Bản Figma trình bày thành thẻ nổi bật cuối trang ("Không thấy lỗi của bạn?" + nút); header có ô tìm và dòng phạm vi nội dung. |

- Dữ liệu mẫu (mã lỗi, module) chỉ minh họa, không phải mã lỗi của hệ thống CSKH.


---

## Đề xuất đã cập nhật (đã chốt với khách hàng 21/09/2026)

| Mã | Nội dung cần chốt | Đề xuất | Trạng thái |
|----|-------------------|---------|------------|
| OQ-9 | Khách hàng dùng nhiều dịch vụ | Bộ chuyển dịch vụ ở đầu trang tra cứu, mặc định dịch vụ dùng gần nhất; nội dung, hỏi đáp AI, tạo ticket theo dịch vụ đang chọn. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-10 | Lỗi/tình huống thường gặp | Tự động top 5 theo lượt xem 30 ngày; biên tập được ghim tối đa 3 bài lên đầu. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-11 | Phân trang, xếp hạng tìm kiếm | 10 bản ghi/trang; xếp khớp tiêu đề trước khớp nội dung; bằng nhau thì bài riêng site trước bài dùng chung, rồi bài cập nhật gần nhất. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-12 | Đánh giá hữu ích bài viết | Mỗi khách hàng 1 đánh giá/bài, được đổi ý (ghi đè). | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-30 | Bài viết liên quan ở chi tiết bài viết | Tối đa 3 bài cùng nhóm chức năng, cùng bộ lọc site/dịch vụ; bài đã ẩn dẫn tới `kb-bai-viet-khong-con`. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
