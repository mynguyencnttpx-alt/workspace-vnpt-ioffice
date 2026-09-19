# Flow: Quản trị nội dung tri thức

> Màn hình thuộc flow này: kb-soan-thao → kb-cho-duyet → kb-duyet-xuat-ban → kb-danh-sach-noi-dung → kb-import-um → kb-cau-hinh-dong-bo-drive → kb-tu-ticket-thanh-faq. Flow tổng xem `../srs/ho-tro-cskh-userflow.md` Mục 1.
>
> Các mục ghi "(OQ-n)" đã có **đề xuất chờ khách hàng xác nhận** ở bảng cuối file (cập nhật 19/09/2026), cũng đã ghi vào tài liệu "Đề xuất Hệ thống Hỗ trợ & Chăm sóc Khách hàng.docx".

---

## Screen: kb-soan-thao — Soạn thảo bài viết

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│ Soạn bài viết mới                               Trạng thái: Bản nháp │
├──────────────────────────────────────────────────────────────────────┤
│ Tiêu đề [1] [Hướng dẫn ký số văn bản đi__________________________]   │
│ Loại nội dung [v: Hướng dẫn sử dụng] [2]   Dịch vụ [v: iOffice] [3]  │
│ Phạm vi [4]: (*) Dùng chung mọi site   ( ) Site: [v: chọn site]      │
│ Danh mục [5] [v: Ký số > Văn bản đi]  Mã lỗi/thông báo [________]    │
│ Đối tượng xem [11]: (*) Khách hàng + Agent   ( ) Chỉ nội bộ          │
├──────────────────────────────────────────────────────────────────────┤
│ Nội dung [6]   [B] [I] [ - ] [ IMG ] [ Tải file lên ]                │
│ [Bước 1. Mở văn bản cần ký, chọn nút Ký số.                        ] │
│ [__________________________________________________________________] │
│ [__________________________________________________________________] │
├──────────────────────────────────────────────────────────────────────┤
│ [7] [ ] Không dùng cho AI (nội dung chỉ dành cho agent nội bộ)       │
│ [8] [ Lưu nháp ]   [9] [ Gửi duyệt ]   [10] [ Hủy ]                  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Tiêu đề | Textbox | Text | • **Bắt buộc**. Giới hạn độ dài: chưa có nguồn. |
| 2 | Loại nội dung | Dropdown | Select | • **Bắt buộc**: Hướng dẫn sử dụng / Câu hỏi thường gặp (FAQ) / Xử lý lỗi-sự cố / Thông báo cập nhật hệ thống (Đề xuất — Quản trị danh mục nội dung); danh sách lấy từ danh mục loại nội dung (`danhmuc-dich-vu-loai-van-de`). |
| 3 | Dịch vụ | Dropdown | Select | • **Bắt buộc**: iOffice / iStorage /… theo danh mục dịch vụ. |
| 4 | Phạm vi | Radio + Dropdown | Check / Select | • **Bắt buộc**: "Dùng chung" (áp dụng mọi site của dịch vụ) hoặc 1 site/khách hàng cụ thể (Đề xuất — Mô hình phân vùng nội dung). Khách hàng/agent chỉ thấy tài liệu dùng chung của dịch vụ họ dùng + tài liệu riêng site họ.<br>• Biên tập viên chỉ chọn được phạm vi **được gán** cho mình (KB theo phạm vi được gán); phạm vi ngoài quyền bị ẩn/vô hiệu.<br>• Sửa phạm vi của bài đã xuất bản (vd đổi riêng → chung) là thay đổi nhạy cảm, phải gửi duyệt lại. |
| 5 | Danh mục | Dropdown (cây) | Select | • Vị trí bài trong cây Dịch vụ → nhóm chức năng → bài viết (tận dụng cấu trúc UM); **Bắt buộc** [GIẢ ĐỊNH]. Mã lỗi/thông báo: chỉ áp cho loại Xử lý lỗi/sự cố, phục vụ tra cứu theo mã lỗi ở `kb-danh-muc-loi`. |
| 6 | Nội dung | Rich text editor | Text | • **Bắt buộc**. Soạn trực tiếp (định dạng cơ bản, ảnh minh họa, từng bước) hoặc tải file lên để đưa vào (biên tập viên/agent — UC11, Đề xuất — Nguồn dữ liệu đầu vào). Mọi nguồn phải theo đúng khuôn dạng bài viết KB trước khi vào chỉ mục AI.<br>• Ảnh/file: định dạng, dung lượng tối đa: đã đề xuất, chờ xác nhận (OQ-21). |
| 7 | Không dùng cho AI | Checkbox | Check | • Đánh dấu nội dung **không đưa vào chỉ mục AI Q&A** (Đề xuất — Cấu hình phạm vi cho AI). Chỉ ảnh hưởng AI; ai được xem bài do [11] quyết định. |
| 8 | Lưu nháp | Button | Click | • Lưu bản nháp (UC11), chưa hiển thị cho ai khác; ở lại màn, báo "Đã lưu nháp" (wording tạm). Chưa cần điền đủ trường bắt buộc [GIẢ ĐỊNH]. |
| 9 | Gửi duyệt | Button | Click | • **Disabled** tới khi đủ trường bắt buộc [1]-[6]. Bấm → chuyển trạng thái **chờ duyệt**, **báo Quản trị viên** (UC11), sang `kb-cho-duyet`. Quy trình biên soạn 2 bước: Soạn thảo → Duyệt & xuất bản. |
| 10 | Hủy | Button | Click | • Có thay đổi chưa lưu → hỏi xác nhận; về màn trước, không lưu. |
| 11 | Đối tượng xem | Radio group | Check | • **Bắt buộc**, mặc định "Khách hàng + Agent". "Chỉ nội bộ": bài chỉ Agent/Quản trị viên/Biên tập thấy, **ẩn khỏi khách hàng** ở tra cứu và trích dẫn AI cho khách (OQ-21c). Tách khỏi cờ [7] để nội dung nội bộ vẫn dùng được cho AI hỗ trợ soạn của agent. |

- Header nội bộ dùng chung (không đánh số); Flow 8 là khu vực menu quản trị nội dung — các màn vào độc lập, không phải wizard.


---

## Screen: kb-cho-duyet — Danh sách chờ duyệt

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│ Nội dung chờ duyệt                             [1] Nguồn [v: Tất cả] │
│ Loại [v: Tất cả] [2]   Phạm vi [v: Tất cả] [3]                       │
├──────────────────────────────────────────────────────────────────────┤
│ Tiêu đề                      Loại      Phạm vi  Nguồn     Ngày       │
│ [4] ---------------------------------------------------------------  │
│ Hướng dẫn ký số văn bản đi   HDSD      Chung    Soạn tay  17/09      │
│ Lỗi 403 khi ký số            Lỗi       site-bd  Từ ticket 17/09      │
│ UM iOffice - Văn bản đến     HDSD      Chung    Import    16/09      │
│ Quy trình gửi công văn       FAQ       site-bd  Drive     16/09      │
│                                                                      │
│ [5] Trang 1/1                                                        │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Lọc nguồn | Dropdown | Select | • Tất cả / Soạn tay / Import UM-SRS / Đồng bộ Drive / Từ ticket — cả 4 nguồn cùng vào **một hàng chờ duyệt**, không có đường tắt xuất bản thẳng. |
| 2 | Lọc loại nội dung | Dropdown | Select | • Theo 4 loại nội dung; mặc định Tất cả. |
| 3 | Lọc phạm vi | Dropdown | Select | • Dùng chung / từng site trong phạm vi người duyệt được quyền. |
| 4 | Bảng chờ duyệt | Table | Select | • Cột: Tiêu đề, Loại, Phạm vi, Nguồn, Ngày gửi. Bấm 1 dòng → `kb-duyet-xuat-ban` (UC12: xem nội dung chờ duyệt).<br>• **Nhãn nguồn** giúp người duyệt biết xuất xứ: bài từ **Đồng bộ Drive** hiện nhãn "Drive" (vẫn phải duyệt trước khi xuất bản vào KB); bài **từ ticket** phải kiểm đã loại thông tin khách hàng.<br>• Phạm vi thấy: Quản trị viên thấy tất cả; Biên tập chỉ thấy phạm vi được gán [GIẢ ĐỊNH]. Empty: "Không có nội dung chờ duyệt". |
| 5 | Phân trang | Pagination | Click | • OQ-11. |

- Dữ liệu mẫu chỉ minh họa; "HDSD/Lỗi/FAQ" là viết tắt loại nội dung.


---

## Screen: kb-duyet-xuat-ban — Duyệt & xuất bản / từ chối

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│ [1] < Về danh sách chờ duyệt >                                       │
├──────────────────────────────────────────────────────────────────────┤
│ Hướng dẫn ký số văn bản đi          [2] Nguồn: Soạn tay - Biên tập A │
│ Hướng dẫn sử dụng | iOffice | Dùng chung | Không dùng cho AI: Không  │
├──────────────────────────────────────────────────────────────────────┤
│ Xem trước như khách hàng thấy [3]                                    │
│ Bước 1. Mở văn bản cần ký, chọn nút Ký số.                           │
│ Bước 2. Chọn chứng thư số trong danh sách.                           │
│ [ IMG: màn hình chọn chứng thư số ]                                  │
│ Bước 3. Nhập mã PIN và xác nhận.                                     │
├──────────────────────────────────────────────────────────────────────┤
│ Ghi chú khi từ chối [4] [Nêu lý do để biên tập sửa lại...__________] │
│ [5] [ Phê duyệt & xuất bản ]        [6] [ Từ chối ]                  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Về danh sách chờ duyệt | Link | Click | • Navigate → `kb-cho-duyet`. |
| 2 | Thông tin nguồn | Label | ReadOnly | • Nguồn (soạn tay/import/Drive/từ ticket) và người gửi; giúp cân nhắc mức kiểm tra. |
| 3 | Nội dung xem trước | Rich text | ReadOnly | • Hiển thị đúng như khách hàng sẽ thấy ở `kb-chi-tiet-bai-viet`, kèm loại/dịch vụ/phạm vi/cờ không dùng cho AI. Người duyệt chỉ xem, không sửa trực tiếp; cần sửa thì từ chối kèm ghi chú. |
| 4 | Ghi chú từ chối | Textbox | Text | • **Bắt buộc khi bấm [6]** ("từ chối kèm ghi chú", UC12); không dùng khi phê duyệt. |
| 5 | Phê duyệt & xuất bản | Button | Click | • Cập nhật trạng thái **đã xuất bản**, bài hiển thị theo phạm vi, và **tái lập chỉ mục AI** (chunk lại + re-index) để AI không trả lời theo nội dung cũ (UC12). Về `kb-danh-sach-noi-dung`; khóa khi submitting.<br>• **Ai được duyệt:** đề xuất ghi Biên tập nội dung "soạn/duyệt" nhưng UC12 chỉ định Quản trị viên — chờ chốt (OQ-4). Không được tự duyệt bài do chính mình soạn [GIẢ ĐỊNH]. |
| 6 | Từ chối | Button | Click | • **Disabled** khi [4] rỗng. Bấm → trạng thái "bị từ chối" kèm ghi chú, báo người gửi để soạn lại (`kb-soan-thao`); bài không được xuất bản, không vào chỉ mục AI. |

- Phạm vi vai trò được duyệt chờ chốt ở OQ-4 (Quản trị viên hay cả Biên tập nội dung).


---

## Screen: kb-danh-sach-noi-dung — Danh sách nội dung đã xuất bản

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│ Nội dung đã xuất bản                          [1] [ + Soạn bài mới ] │
│ [2] < Import UM/SRS > [3] < Đồng bộ Drive > [4] < Ticket thành FAQ > │
├──────────────────────────────────────────────────────────────────────┤
│ Loại [v: Tất cả] Dịch vụ [v: Tất cả] Phạm vi [v: Tất cả] [5]         │
├──────────────────────────────────────────────────────────────────────┤
│ Tiêu đề                    Loại     Phạm vi  Cập nhật  Hữu ích       │
│ -------------------------------------------------------------------- │
│ Hướng dẫn ký số văn bản đi HDSD     Chung    17/09     18/20         │
│ Lỗi 403 khi ký số          Lỗi      site-bd  17/09     9/12          │
│ Quy trình gửi công văn     FAQ      site-bd  16/09     4/10          │
│                                                                      │
│ Dòng chọn: Lỗi 403 khi ký số   [6] < Sửa >   [7] < Ẩn >              │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | + Soạn bài mới | Button | Click | • Navigate → `kb-soan-thao`. Biên tập nội dung, Agent và Quản trị viên soạn được (UC11). |
| 2 | Import UM/SRS | Link | Click | • → `kb-import-um`. |
| 3 | Đồng bộ Drive | Link | Click | • → `kb-cau-hinh-dong-bo-drive` (chỉ Quản trị viên, UC15). |
| 4 | Ticket thành FAQ | Link | Click | • → `kb-tu-ticket-thanh-faq`. |
| 5 | Bộ lọc | Dropdown | Select | • Loại nội dung / dịch vụ / phạm vi (dùng chung hoặc site). Biên tập chỉ thấy phạm vi được gán. |
| 6 | Sửa | Link | Click | • Mở `kb-soan-thao` với nội dung hiện có; lưu và **gửi duyệt lại** → bài chuyển về trạng thái chờ duyệt (UC24). Trong lúc chờ duyệt lại, bản đang xuất bản còn hiển thị hay bị gỡ: đã đề xuất, chờ xác nhận (OQ-21). |
| 7 | Ẩn (hủy) | Link | Click | • Hộp thoại xác nhận → bài **ẩn khỏi tra cứu và khỏi AI, nhưng giữ lịch sử** (UC26); tái lập chỉ mục AI để AI ngừng dùng. Khôi phục bài đã ẩn: đã đề xuất, chờ xác nhận (OQ-21). Ghi nhật ký (xóa tài liệu) tại `qt-nhat-ky-thao-tac`. |

- Màn cửa vào của khu vực nội dung: có 3 lối tắt Import/Đồng bộ Drive/Ticket thành FAQ. Dữ liệu mẫu chỉ minh họa; cột "Hữu ích" = số lượt đánh giá hữu ích/tổng.


---

## Screen: kb-import-um — Import UM/SRS hiện có

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│       ┌──────────────────────────────────────────────────────┐       │
│       │ Import tài liệu UM/SRS hiện có                       │       │
│       │                                                      │       │
│       │ [1] [ Chọn file ]  UM_iOffice_v2.docx  <Xóa>         │       │
│       │                    UM_iStorage.docx    <Xóa>         │       │
│       │ Dịch vụ       [2] [v: iOffice             ]          │       │
│       │ Phạm vi       [3] [v: Dùng chung mọi site ]          │       │
│       │ Danh mục đích [4] [v: Tự nhận theo mục    ]          │       │
│       ├──────────────────────────────────────────────────────┤       │
│       │ [5] Xem trước: 2 file -> 14 bài nháp                 │       │
│       │     - Ký số văn bản đi        (Hướng dẫn)            │       │
│       │     - Gửi văn bản đến         (Hướng dẫn)            │       │
│       │     ... 12 bài khác                                  │       │
│       ├──────────────────────────────────────────────────────┤       │
│       │ [6] [ Import ]        [7] [  Hủy  ]                  │       │
│       └──────────────────────────────────────────────────────┘       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Chọn file | File upload | Select | • Chọn tài liệu UM/SRS đã soạn (vd theo mẫu BM_UM_BM_AI) để khởi tạo kho nhanh, tránh viết lại từ đầu (Đề xuất — Nhập liệu ban đầu). Định dạng/dung lượng/số file tối đa: đã đề xuất, chờ xác nhận (OQ-21). Sai định dạng → báo lỗi ngay [wording chưa có, chưa có mã E-…]. |
| 2 | Dịch vụ | Dropdown | Select | • **Bắt buộc**; áp cho toàn bộ bài tạo ra từ lần import này. |
| 3 | Phạm vi | Dropdown | Select | • **Bắt buộc**: Dùng chung hoặc 1 site — gắn nhãn khi nhập (không tự suy). |
| 4 | Danh mục đích | Dropdown | Select | • Mặc định tự nhận theo cấu trúc mục của tài liệu (dịch vụ → nhóm chức năng → bài); chọn tay để đưa cả lô vào 1 nhóm [GIẢ ĐỊNH]. |
| 5 | Xem trước kết quả tách | List | ReadOnly | • Hệ thống chuẩn hóa tài liệu về **đúng khuôn dạng bài viết KB** rồi tách thành các bài nháp; hiện số bài và vài tiêu đề mẫu để kiểm tra trước khi import. Cách tách bài và xử lý tài liệu không tách được: đã đề xuất, chờ xác nhận (OQ-21). |
| 6 | Import | Button | Click | • **Disabled** tới khi có file + [2], [3]. Tạo hàng loạt **bản nháp vào hàng chờ duyệt** (`kb-cho-duyet`, nhãn nguồn "Import") — **không xuất bản thẳng**, không vào chỉ mục AI cho tới khi được duyệt. Khóa khi submitting; báo số bài đã tạo/lỗi. |
| 7 | Hủy | Button | Click | • Về `kb-danh-sach-noi-dung`, không tạo gì. |


---

## Screen: kb-cau-hinh-dong-bo-drive — Cấu hình đồng bộ Google Drive

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│ Đồng bộ tài liệu từ Google Drive             [1] Kết nối: Đã kết nối │
├──────────────────────────────────────────────────────────────────────┤
│ Thư mục đồng bộ [2]                           [3] [ + Thêm thư mục ] │
│ Thư mục Drive              Dịch vụ    Phạm vi    Bật                 │
│ -------------------------------------------------------------------- │
│ /UM/iOffice                iOffice    Chung      [x]                 │
│ /KhachHang/BinhDinh        iOffice    site-bd    [x]                 │
│ /UM/iStorage               iStorage   Chung      [ ]                 │
├──────────────────────────────────────────────────────────────────────┤
│ Lịch đồng bộ [4] [v: Hằng ngày 02:00]                                │
│ Lần chạy gần nhất: 19/09 02:00 - 5 tài liệu mới chờ duyệt [5]        │
│ [6] [ Lưu cấu hình ]                                                 │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Trạng thái kết nối | Label / Button | Click | • Kết nối tới Google Drive của tổ chức (Đề xuất — Nguồn dữ liệu đầu vào). Chưa kết nối/mất kết nối → nút "Kết nối lại" và báo lỗi [wording chưa có]. Cách xác thực (tài khoản dịch vụ hay OAuth): đã đề xuất, chờ xác nhận (OQ-21). |
| 2 | Bảng thư mục đồng bộ | Table | Select | • Mỗi dòng: thư mục Drive, dịch vụ, phạm vi (dùng chung/site), bật/tắt. Chỉ **Quản trị viên** cấu hình (UC15). Tắt 1 dòng → ngừng quét thư mục đó, bài đã đưa vào KB giữ nguyên. |
| 3 | Thêm thư mục | Button | Click | • Chọn thư mục Drive cần đồng bộ và **gắn nhãn dịch vụ/site khi nhập** (bắt buộc — để bài đồng bộ có phạm vi rõ ràng, không lọt sang khách hàng khác). |
| 4 | Lịch đồng bộ | Dropdown | Select | • Chu kỳ quét định kỳ (UC15/UC30). Các lựa chọn chu kỳ: đã đề xuất, chờ xác nhận (OQ-21). |
| 5 | Kết quả lần chạy gần nhất | Label | ReadOnly | • Job đồng bộ (UC30) quét thư mục theo lịch, đưa **tài liệu mới/thay đổi vào hàng chờ duyệt** (nhãn "Drive") — không xuất bản thẳng, không đưa dữ liệu thô vào chỉ mục AI. Hiện số tài liệu, lỗi nếu có. |
| 6 | Lưu cấu hình | Button | Click | • **Disabled** khi chưa đổi gì; lưu → áp dụng từ lần quét kế tiếp; báo "Đã lưu" (wording tạm). Ghi nhật ký thao tác cấu hình [GIẢ ĐỊNH]. |


---

## Screen: kb-tu-ticket-thanh-faq — Chuyển ticket thành FAQ nháp

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│ Chuyển ticket đã xử lý thành FAQ nháp                                │
├──────────────────────────────────────────────────────────────────────┤
│ Gợi ý từ các câu hỏi lặp lại nhiều [1]                               │
│ [ ] Ticket    Câu hỏi                                  Lặp           │
│ -------------------------------------------------------------------- │
│ [x] #T-0123   Ký số báo lỗi 403 thì xử lý sao?         x5 [2]        │
│ [ ] #T-0098   Không tải được tệp đính kèm              x3            │
│ [ ] #T-0087   Quên chọn phạm vi khi gửi VB             x3            │
├──────────────────────────────────────────────────────────────────────┤
│ Bản nháp FAQ - đã ẩn thông tin khách hàng [3]                        │
│ Câu hỏi: [Ký số báo lỗi 403 thì xử lý sao?______________________]    │
│ Trả lời: [Kiểm tra vai trò ký với quản trị viên đơn vị..._______]    │
│ Phạm vi [4] [v: Site của ticket]  [ ] Không dùng cho AI              │
│ [5] [ Tạo FAQ nháp ]   [6] [ Hủy ]                                   │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Gợi ý câu hỏi lặp lại | Table | Select | • Hệ thống **gợi ý tự động** các ticket đã xử lý có câu hỏi lặp nhiều lần (Đề xuất — Từ chính các yêu cầu hỗ trợ); agent cũng chọn được ticket hữu ích bất kỳ. Cột: chọn, mã ticket, câu hỏi, số lần lặp. Ngưỡng "lặp nhiều": đã đề xuất, chờ xác nhận (OQ-21). |
| 2 | Chọn ticket | Checkbox | Check | • Chọn 1 ticket làm nguồn cho 1 bài FAQ; chọn nhiều ticket cùng câu hỏi thì gộp thành 1 bài [GIẢ ĐỊNH]. |
| 3 | Bản nháp FAQ | Textbox (multi-line) x2 | Text | • Câu hỏi + câu trả lời tự rút từ ticket, **đã loại thông tin nhận diện khách hàng** (tên đơn vị, người, số liệu riêng) để **không lộ dữ liệu ticket của khách hàng này sang khách hàng khác** (Đề xuất — Không đưa thẳng dữ liệu thô). Agent chỉnh sửa; cách tự ẩn danh: đã đề xuất, chờ xác nhận (OQ-21). |
| 4 | Phạm vi & AI | Dropdown + Checkbox | Select / Check | • Mặc định phạm vi = **site của ticket gốc** (an toàn); chọn "Dùng chung" chỉ khi người soạn xác nhận nội dung không chứa dữ liệu riêng. Cờ "Không dùng cho AI" như `kb-soan-thao`. |
| 5 | Tạo FAQ nháp | Button | Click | • **Disabled** khi chưa chọn ticket hoặc [3] rỗng. Tạo bài FAQ nháp và đưa vào `kb-cho-duyet` (nhãn "Từ ticket") — **vẫn phải qua duyệt** trước khi vào kho AI (UC: quy trình soạn → duyệt → xuất bản). Khóa khi submitting. |
| 6 | Hủy | Button | Click | • Về `kb-danh-sach-noi-dung`, không tạo gì. |

- Màn này cần một lối vào cho agent (menu Nội dung hoặc nút trên `agent-chi-tiet-ticket`) — userflow chỉ có đường từ `kb-danh-sach-noi-dung`; chốt ở OQ-21.


---

## Đề xuất đã cập nhật (chờ khách hàng xác nhận)

| Mã | Nội dung cần chốt | Đề xuất | Trạng thái |
|----|-------------------|---------|------------|
| OQ-4 | Ai được duyệt và xuất bản | Chỉ Quản trị viên; Biên tập soạn và gửi duyệt, không tự duyệt bài mình soạn. | Chờ khách hàng xác nhận |
| OQ-21a | Tệp tải lên, import, tách bài | Ảnh png/jpg ≤5 MB; docx, md, pdf văn bản ≤20 MB/tệp, ≤10 tệp/lần; tách bài theo tiêu đề cấp 1/2, phần không tách được gom vào bài nháp "Chưa phân loại". | Chờ khách hàng xác nhận |
| OQ-21b | Bài của tôi, sửa, khôi phục | Biên tập xem "Bài của tôi" theo Nháp / Chờ duyệt / Bị từ chối / Đã xuất bản; bản đang xuất bản vẫn hiển thị đến khi bản sửa được duyệt; Quản trị viên khôi phục bài đã ẩn (tái lập chỉ mục AI). | Chờ khách hàng xác nhận |
| OQ-21c | Bài "không dùng cho AI" | Thêm trường "Đối tượng xem" (Khách hàng + Agent / Chỉ nội bộ), tách khỏi cờ "Không dùng cho AI" (chỉ loại khỏi chỉ mục AI). | Chờ khách hàng xác nhận |
| OQ-21d | Google Drive | Tài khoản dịch vụ được chia sẻ thư mục; quét mặc định hằng ngày 02:00 (chọn hằng giờ/ngày/tuần); hỗ trợ Google Docs, docx, pdf văn bản, md. | Chờ khách hàng xác nhận |
| OQ-21e | Ticket → FAQ | "Lặp nhiều" = ≥3 ticket hỏi tương tự trong 30 ngày; tự thay tên đơn vị/người/email/SĐT/số hợp đồng bằng [ẩn], agent rà lại; phạm vi mặc định là site của ticket; lối vào thêm nút "Tạo FAQ từ ticket này" ở `agent-chi-tiet-ticket`. | Chờ khách hàng xác nhận |
