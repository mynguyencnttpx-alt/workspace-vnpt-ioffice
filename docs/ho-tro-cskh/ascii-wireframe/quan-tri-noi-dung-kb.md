# Flow: Quản trị nội dung tri thức

> Màn hình thuộc flow này: kb-soan-thao → kb-cho-duyet → kb-duyet-xuat-ban → kb-danh-sach-noi-dung → kb-chi-muc-ai → kb-import-um → kb-cau-hinh-dong-bo-drive → kb-tu-ticket-thanh-faq. Flow tổng xem `../srs/ho-tro-cskh-userflow.md` Mục 1. Khung điều hướng nội bộ dùng chung: bản Figma là sidebar trái + thanh trên có chip Site/Vai trò; ASCII vẽ gọn thành 1 dòng đầu.
>
> Các mục ghi "(OQ-n)" đã được **khách hàng xác nhận (21/09/2026)** ở bảng cuối file (cập nhật 19/09/2026), cũng đã ghi vào tài liệu "Đề xuất Hệ thống Hỗ trợ & Chăm sóc Khách hàng.docx".
>
> **Cập nhật 23/09/2026:** rà soát phát hiện `kb-cau-hinh-dong-bo-drive` chưa có hình minh họa cho nút "+ Thêm thư mục" — đã vẽ bổ sung modal "Thêm thư mục đồng bộ" trên Figma. Xem [3] ở màn đó.
>
> **Cập nhật 25/09/2026 (bố cục tiêu chí tìm kiếm):** thanh lọc ở các màn danh sách xếp theo **lưới 4 cột cố định** — nhãn nằm trên ô nhập, các ô cùng chiều rộng và thẳng cột; quá 4 tiêu chí thì xuống hàng theo lưới, checkbox chiếm 2 cột; không còn xếp nhãn + ô nhập nối tiếp theo độ dài trường. Đồng bộ với frame Figma.

---

## Screen: kb-soan-thao — Soạn thảo bài viết

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket(12) | Nội dung | Người dùng | Cấu hình|Báo cáo(o) B v │
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
| 6 | Nội dung | Rich text editor | Text | • **Bắt buộc**. Soạn trực tiếp (định dạng cơ bản, ảnh minh họa, từng bước) hoặc tải file lên để đưa vào (biên tập viên/agent — UC11, Đề xuất — Nguồn dữ liệu đầu vào). Mọi nguồn phải theo đúng khuôn dạng bài viết KB trước khi vào chỉ mục AI.<br>• Ảnh/file: định dạng, dung lượng tối đa: đã chốt (OQ-21). |
| 7 | Không dùng cho AI | Checkbox | Check | • Đánh dấu nội dung **không đưa vào chỉ mục AI Q&A** (Đề xuất — Cấu hình phạm vi cho AI). Chỉ ảnh hưởng AI; ai được xem bài do [11] quyết định. |
| 8 | Lưu nháp | Button | Click | • Lưu bản nháp (UC11), chưa hiển thị cho ai khác; ở lại màn, báo "Đã lưu nháp" (wording tạm). Chưa cần điền đủ trường bắt buộc [GIẢ ĐỊNH]. |
| 9 | Gửi duyệt | Button | Click | • **Disabled** tới khi đủ trường bắt buộc [1]-[6]. Bấm → chuyển trạng thái **chờ duyệt**, **báo Quản trị viên** (UC11), sang `kb-cho-duyet`. Quy trình biên soạn 2 bước: Soạn thảo → Duyệt & xuất bản. |
| 10 | Hủy | Button | Click | • Có thay đổi chưa lưu → hỏi xác nhận; về màn trước, không lưu. |
| 11 | Đối tượng xem | Radio group | Check | • **Bắt buộc**, mặc định "Khách hàng + Agent". "Chỉ nội bộ": bài chỉ nhân viên hỗ trợ/Quản trị viên/Biên tập thấy, **ẩn khỏi khách hàng** ở tra cứu và trích dẫn AI cho khách (OQ-21c). Tách khỏi cờ [7] để nội dung nội bộ vẫn dùng được cho AI hỗ trợ soạn của agent. |

- Header nội bộ dùng chung (không đánh số); Flow 8 là khu vực menu quản trị nội dung — các màn vào độc lập, không phải wizard.

#### Trạng thái phụ — thiếu trường bắt buộc

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│ Soạn bài viết mới                               Trạng thái: Bản nháp │
├──────────────────────────────────────────────────────────────────────┤
│ Tiêu đề [1] [_________________________________________________]      │
│ (!) Vui lòng nhập tiêu đề.                                           │
│ Loại nội dung [v: Hướng dẫn sử dụng] [2]   Dịch vụ [v: iOffice] [3]  │
│ Phạm vi [4]: (*) Dùng chung mọi site   ( ) Site: [v: chọn site]      │
├──────────────────────────────────────────────────────────────────────┤
│ [7] [ ] Không dùng cho AI (nội dung chỉ dành cho agent nội bộ)       │
│ [8] [ Lưu nháp ]   [9] [ Gửi duyệt ] (mờ)   [10] [ Hủy ]             │
└──────────────────────────────────────────────────────────────────────┘
```

- Khác màn gốc: ô [1] Tiêu đề trống → (!) báo lỗi tại ô; [9] Gửi duyệt mờ tới khi đủ trường bắt buộc; [8] Lưu nháp vẫn dùng được [wording tạm, chưa có mã E-…].


---

## Screen: kb-cho-duyet — Danh sách chờ duyệt

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket(12) | Nội dung | Người dùng | Cấu hình|Báo cáo(o) B v │
├──────────────────────────────────────────────────────────────────────┤
│ Nguồn [1]        Loại [2]         Phạm vi [3]                        │
│ [v: Tất cả     ] [v: Tất cả     ] [v: Tất cả     ]                   │
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
| 5 | Phân trang | Pagination | Click | • 10 bản ghi/trang (đã chốt, OQ-11). |

- Dữ liệu mẫu chỉ minh họa; "HDSD/Lỗi/FAQ" là viết tắt loại nội dung.

#### Trạng thái phụ — không có nội dung chờ duyệt

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│ Nội dung chờ duyệt                             [1] Nguồn [v: Tất cả] │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│               Không có nội dung chờ duyệt                            │
│    Bài soạn, import, đồng bộ Drive hoặc từ ticket sẽ hiện ở đây.     │
│                     [ + Soạn bài mới ]                               │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- Khác màn gốc: danh sách rỗng → "Không có nội dung chờ duyệt" + gợi ý nguồn (soạn tay, import, đồng bộ Drive, từ ticket) và nút "+ Soạn bài mới".


---

## Screen: kb-duyet-xuat-ban — Duyệt & xuất bản / từ chối

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket(12) | Nội dung | Người dùng | Cấu hình|Báo cáo(o) B v │
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

- Bổ sung 21/09/2026: sau khi phê duyệt & xuất bản có lối xem trạng thái lập chỉ mục AI ở `kb-chi-muc-ai` (chỉ xem).

#### Trạng thái phụ — từ chối kèm ghi chú

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│ [1] < Về danh sách chờ duyệt >                                       │
├──────────────────────────────────────────────────────────────────────┤
│ Hướng dẫn ký số văn bản đi          [2] Nguồn: Soạn tay - Biên tập A │
├──────────────────────────────────────────────────────────────────────┤
│ Ghi chú khi từ chối [4] [Thiếu ảnh minh họa ở bước 2. Cần bổ sung.]  │
│ [5] [ Phê duyệt & xuất bản ]        [6] [ Từ chối ]                  │
└──────────────────────────────────────────────────────────────────────┘
```

- Khác màn gốc: [4] ghi chú lý do từ chối (bắt buộc khi từ chối); [6] Từ chối gửi bài về `kb-soan-thao` với trạng thái Bị từ chối kèm ghi chú.


---

## Screen: kb-danh-sach-noi-dung — Danh sách nội dung đã xuất bản

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket(12) | Nội dung | Người dùng | Cấu hình|Báo cáo(o) B v │
├──────────────────────────────────────────────────────────────────────┤
│ Nội dung đã xuất bản                          [1] [ + Soạn bài mới ] │
│ [2] < Import UM/SRS > [3] < Đồng bộ Drive > [4] < Ticket thành FAQ > │
├──────────────────────────────────────────────────────────────────────┤
│ Loại             Dịch vụ          Phạm vi [5]                        │
│ [v: Tất cả     ] [v: Tất cả     ] [v: Tất cả     ]                   │
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
| 1 | + Soạn bài mới | Button | Click | • Navigate → `kb-soan-thao`. Biên tập nội dung (trong Dịch vụ được gán), nhân viên hỗ trợ (Agent tỉnh, Agent helpdesk, Triển khai của Line) và Quản trị viên soạn được (UC11). |
| 2 | Import UM/SRS | Link | Click | • → `kb-import-um`. |
| 3 | Đồng bộ Drive | Link | Click | • → `kb-cau-hinh-dong-bo-drive` (chỉ Quản trị viên, UC15). |
| 4 | Ticket thành FAQ | Link | Click | • → `kb-tu-ticket-thanh-faq`. |
| 5 | Bộ lọc | Dropdown | Select | • Loại nội dung / dịch vụ / phạm vi (dùng chung hoặc site). Biên tập chỉ thấy phạm vi được gán. |
| 6 | Sửa | Link | Click | • Mở `kb-soan-thao` với nội dung hiện có; lưu và **gửi duyệt lại** → bài chuyển về trạng thái chờ duyệt (UC27). Trong lúc chờ duyệt lại, bản đang xuất bản còn hiển thị hay bị gỡ: đã chốt (OQ-21). |
| 7 | Ẩn (hủy) | Link | Click | • Hộp thoại xác nhận → bài **ẩn khỏi tra cứu và khỏi AI, nhưng giữ lịch sử** (UC29); tái lập chỉ mục AI để AI ngừng dùng. Khôi phục bài đã ẩn: đã chốt (OQ-21). Ghi nhật ký (xóa tài liệu) tại `qt-nhat-ky-thao-tac`. |

- Màn cửa vào của khu vực nội dung: có 3 lối tắt Import/Đồng bộ Drive/Ticket thành FAQ. Dữ liệu mẫu chỉ minh họa; cột "Hữu ích" = số lượt đánh giá hữu ích/tổng.

- Bổ sung 21/09/2026: bản Figma có lối "Chỉ mục AI" tới `kb-chi-muc-ai` để xem trạng thái lập chỉ mục AI của bài đã xuất bản.

#### Trạng thái phụ — xác nhận ẩn bài

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│ Nội dung đã xuất bản    [1] [ + Soạn bài ]  [2] < Chỉ mục AI >       │
│ (nền mờ - danh sách nội dung ở phía sau)                             │
│                                                                      │
│      ┌────────────────────────────────────────────────────────┐      │
│      │ Ẩn bài viết?                                           │      │
│      │ Bài "Lỗi 403 khi ký số" sẽ ẩn khỏi tra cứu và khỏi AI, │      │
│      │ nhưng vẫn giữ lịch sử. Hệ thống tái lập chỉ mục AI.    │      │
│      │                                                        │      │
│      │ [8] [ Ẩn bài ]   [9] [ Hủy ]                           │      │
│      └────────────────────────────────────────────────────────┘      │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- Khác màn gốc: hộp xác nhận "Ẩn bài viết?" — bài ẩn khỏi tra cứu và khỏi AI nhưng giữ lịch sử; hệ thống tái lập chỉ mục AI; [8] Ẩn bài / [9] Hủy. Nền màn phía sau mờ đi.


---

## Screen: kb-chi-muc-ai — Chỉ mục AI

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│ Chỉ mục AI                          [1] [ Tái lập 3 bài ]            │
├──────────────────────────────────────────────────────────────────────┤
│ Đã xuất bản 128 | Đã lập 121 | Cần tái lập 3 | Loại khỏi AI 4 [2]    │
├──────────────────────────────────────────────────────────────────────┤
│ Bài viết                    Phạm vi  Đoạn  Lập lần cuối  Trạng thái  │
│ [3] ---------------------------------------------------------------  │
│ Hướng dẫn ký số văn bản đi  Chung    12    19/09 10:20   Đã lập      │
│ Lỗi 403 khi ký số           site-bd  6     17/09 09:05   Cần tái lập │
│ Quy trình gửi công văn      site-bd  9     16/09 14:40   Đang xử lý  │
│ Ghi chú nội bộ: mẫu phản    Chung    -     -             Loại khỏi AI│
│                                                                      │
│ Chọn dòng: [4] < Tái lập bài này >  [5] < Về danh sách đã xuất bản > │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Tái lập N bài cần cập nhật | Button | Click | • Tái lập chỉ mục cho các bài đang ở trạng thái "Cần tái lập"; **hộp xác nhận** trước khi chạy hàng loạt (có chi phí gọi dịch vụ AI — xem Trạng thái phụ). Chỉ Quản trị viên (OQ-27); ẩn/mờ khi không còn bài cần tái lập. |
| 2 | Số liệu tổng quan | Stat row | ReadOnly | • Đã xuất bản / Đã lập chỉ mục / Cần tái lập / Loại khỏi AI. Bài đánh dấu "Không dùng cho AI" (đặt ở `kb-soan-thao`, OQ-21c) hoặc đã ẩn **không vào chỉ mục**. |
| 3 | Bảng bài viết | Table | Select | • Cột: bài viết, phạm vi (Chung/site), số đoạn, lập lần cuối, trạng thái (Đã lập / Cần tái lập / Đang xử lý / Lỗi tái lập / Loại khỏi AI). Chỉ hiện bài trong phạm vi của vai trò; rỗng → "Chưa có bài xuất bản". |
| 4 | Tái lập bài này | Link | Click | • Tái lập chỉ mục 1 bài; khóa khi bài đang xử lý. Lỗi từng bài → trạng thái "Lỗi tái lập" + báo lỗi, cho thử lại. |
| 5 | Về danh sách đã xuất bản | Link | Click | • Về `kb-danh-sach-noi-dung`. |

- **Đề xuất bổ sung theo thiết kế Figma (21/09/2026), đã chốt (OQ-27).** Vào từ `kb-danh-sach-noi-dung`, `kb-duyet-xuat-ban` (sau xuất bản) và trung tâm cấu hình `cauhinh-hub`. Màn này **chỉ xem trạng thái + tái lập**; cờ loại khỏi AI đặt ở `kb-soan-thao`.

#### Trạng thái phụ — xác nhận tái lập hàng loạt

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│ Chỉ mục AI                                                           │
│ (nền mờ - danh sách bài viết ở phía sau)                             │
│                                                                      │
│    ┌────────────────────────────────────────────────────────────┐    │
│    │ Tái lập chỉ mục cho 3 bài?                                 │    │
│    │ Hệ thống gọi dịch vụ AI để lập lại chỉ mục, có tính chi phí│    │
│    │ ước tính khoảng 2.000 đ.                                   │    │
│    │                                                            │    │
│    │ [6] [ Tái lập ]   [7] [ Hủy ]                              │    │
│    └────────────────────────────────────────────────────────────┘    │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- Khác màn gốc: hộp xác nhận "Tái lập chỉ mục cho N bài?" nêu chi phí ước tính; [6] Tái lập / [7] Hủy; nền mờ.

#### Trạng thái phụ — có bài tái lập lỗi

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│ Chỉ mục AI                          [1] [ Tái lập 1 bài lỗi ]        │
├──────────────────────────────────────────────────────────────────────┤
│ (!) 1 bài tái lập không thành công. Thử lại hoặc liên hệ hỗ trợ.     │
├──────────────────────────────────────────────────────────────────────┤
│ Bài viết                    Phạm vi  Đoạn  Lập lần cuối  Trạng thái  │
│ Lỗi 403 khi ký số           site-bd  6     17/09 09:05   Lỗi tái lập │
│ Hướng dẫn ký số văn bản đi  Chung    12    19/09 10:20   Đã lập      │
└──────────────────────────────────────────────────────────────────────┘
```

- Khác màn gốc: banner (!) báo số bài tái lập không thành công; dòng bài đó "Lỗi tái lập"; nút [1] đổi thành "Tái lập N bài lỗi".


---

## Screen: kb-import-um — Import UM/SRS hiện có

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│ Import UM/SRS                           < Về quản lý nội dung > [10] │
├──────────────────────────────────────────────────────────────────────┤
│ 1. Chọn tài liệu                                                     │
│ [1] ┌ Kéo thả tệp vào đây hoặc bấm để chọn ┐                         │
│     └ .docx, .md, .pdf - tối đa 10 tệp, mỗi tệp <= 20.0 MB ┘         │
│ Tệp đã chọn [2]                                                      │
│   UM_iOffice_v2.docx (1.4 MB)                                   [x]  │
│   UM_iStorage.docx (0.88 MB)                                    [x]  │
├──────────────────────────────────────────────────────────────────────┤
│ 2. Cấu hình (áp cho cả lô)                                           │
│ Dịch vụ [3] [v: iOffice      ]   Phạm vi [4] [v: Dùng chung ...]     │
│ Loại nội dung [5] [v: Hướng dẫn sử dụng]                             │
│ Danh mục đích [6] [v: Tự tạo theo tiêu đề cấp 1]                     │
│                   [7] + Tạo danh mục mới                             │
│ [ ] Không dùng cho AI [8]                                            │
│ [9] [ Bắt đầu import ]                                               │
├──────────────────────────────────────────────────────────────────────┤
│ Lần import gần đây [11]                                              │
│   01/10/2026 10:15 - iOffice        2 tệp · 14 bài đã xuất bản       │
│   30/09/2026 16:40 - iStorage       1 tệp · 6 bài · 1 chờ duyệt      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Vùng kéo thả / Chọn tệp | File upload | Select | • Kéo thả hoặc bấm vùng để chọn; nhận **.docx, .md, .pdf**, tối đa **10 tệp/lần, mỗi tệp ≤ 20 MB** (OQ-21a). Tách bài theo tiêu đề cấp 1/2; phần không tách được gom vào 1 bài "Chưa phân loại". Tệp sai định dạng/quá cỡ/rỗng/trùng tên-cỡ/quá số lượng → không nhận, báo ở khung cảnh báo [12] (xem Trạng thái phụ). |
| 2 | Tệp đã chọn | List | Select | • Mỗi dòng: tên tệp (dung lượng) + nút xóa [x]; chưa chọn tệp nào thì ẩn danh sách. |
| 3 | Dịch vụ | Dropdown | Select | • **Bắt buộc**, áp cho cả lô; mặc định dịch vụ đầu tiên. Đổi dịch vụ → bỏ chọn Phạm vi và Danh mục đích. |
| 4 | Phạm vi | Dropdown | Select | • **Bắt buộc**: "Dùng chung mọi site của dịch vụ" (mặc định) hoặc "Site: ‹tên site›" của dịch vụ đã chọn; gắn nhãn khi chọn, không tự suy. Đổi phạm vi → bỏ chọn Danh mục đích. |
| 5 | Loại nội dung | Dropdown | Select | • Mặc định **"Hướng dẫn sử dụng"** (UM); chọn "Tài liệu nghiệp vụ (SRS)" cho đặc tả nghiệp vụ. Dòng giải thích dưới ô: loại hiển thị cho khách hàng ("Khách hàng tra cứu và Hỏi đáp AI dùng được sau khi xuất bản") hay loại chỉ nhân viên ("Chỉ nhân viên xem: ẩn khỏi Tra cứu và Hỏi đáp AI của khách hàng"). |
| 6 | Danh mục đích | Dropdown | Select | • Mặc định "Tự tạo theo tiêu đề cấp 1" (tiêu đề cấp 1 của tài liệu thành danh mục gốc, tìm đúng tên trong phạm vi hoặc tạo mới). Chọn 1 danh mục có sẵn → **cả lô vào đúng danh mục đó**, bỏ qua tiêu đề của tài liệu. Chỉ liệt kê danh mục trong **đúng phạm vi Dịch vụ/Site đã chọn**, hiển thị cả cây (danh mục con thụt lề "— "), danh mục con chọn làm đích được (BR-02). |
| 7 | + Tạo danh mục mới | Link button | Click | • **Mới 01/10/2026**: mở hộp thoại tạo danh mục để chủ động phân loại ngay tại màn Import (xem Trạng thái phụ). Disabled khi chưa có Dịch vụ. Tạo trong đúng phạm vi đang chọn ở [3][4]. |
| 8 | Không dùng cho AI | Checkbox | Check | • Áp cho cả lô (OQ-21c): bài tạo ra không được AI trích dẫn. |
| 9 | Bắt đầu import | Button | Click | • **Disabled** khi chưa có tệp hợp lệ, chưa có Dịch vụ, hoặc đang tải lên. Bấm → tạo lô, tải từng tệp (hiện "Đang tải lên i/n: ‹tên tệp›"), rồi chuyển sang màn tiến độ (`?lo=...`). Lỗi toàn lô → khung "Không thể import". |
| 10 | Về quản lý nội dung | Link button | Click | • Navigate → `kb-danh-sach-noi-dung`; ở góc phải tiêu đề. |
| 11 | Lần import gần đây | List | Select | • Chỉ hiện khi đã có lô: ngày giờ + dịch vụ (bấm → mở tiến độ/kết quả của lô) và tóm tắt "n tệp · x bài đã xuất bản · y chờ duyệt · z lỗi · đang xử lý". |

- **Cập nhật 01/10/2026 (đồng bộ với code + Figma 39):** màn là **1 trang** gồm 2 khung "1. Chọn tài liệu" và "2. Cấu hình (áp cho cả lô)" — **không còn quy trình 4 bước** (bản Figma 21/09/2026 có thanh bước 1-4, nút Tiếp tục/Quay lại/Hủy, khung hướng dẫn mẫu BM_UM_BM_AI; code không làm các phần đó và Figma đã vẽ lại). Tiến độ và kết quả nằm ở cùng đường dẫn với `?lo=`. **Đầu ra theo code**: bài **xuất bản ngay** khi Quản trị viên import, **trừ bài có cảnh báo nhạy cảm** (mật khẩu, khóa bí mật, IP nội bộ…) được giữ lại ở `kb-cho-duyet` (nhãn nguồn "Import") chờ duyệt tay — thay cho "luôn vào chờ duyệt" của bản 21/09/2026.

#### Trạng thái phụ — tệp không được nhận

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│ Import UM/SRS                           < Về quản lý nội dung > [10] │
├──────────────────────────────────────────────────────────────────────┤
│ 1. Chọn tài liệu                                                     │
│ [1] ┌ Kéo thả tệp vào đây hoặc bấm để chọn ┐                         │
│     └ .docx, .md, .pdf - tối đa 10 tệp, mỗi tệp <= 20.0 MB ┘         │
│ (!) Một số tệp không được nhận [12]                                  │
│     - ghi-chu-hop.txt: Định dạng không hỗ trợ (chỉ .docx, .md, .pdf).│
│     - UM_tong_hop.pdf: Vượt 20.0 MB.                                 │
│ Tệp đã chọn [2]                                                      │
│   UM_iOffice_v2.docx (1.4 MB)                                   [x]  │
│   UM_iStorage.docx (0.88 MB)                                    [x]  │
├──────────────────────────────────────────────────────────────────────┤
│ 2. Cấu hình (áp cho cả lô)                                           │
│ Dịch vụ [3] [v: iOffice      ]   Phạm vi [4] [v: Dùng chung ...]     │
│ Loại nội dung [5] [v: Hướng dẫn sử dụng]                             │
│ Danh mục đích [6] [v: Tự tạo theo tiêu đề cấp 1]                     │
│                   [7] + Tạo danh mục mới                             │
│ [ ] Không dùng cho AI [8]                                            │
│ [9] [ Bắt đầu import ]                                               │
├──────────────────────────────────────────────────────────────────────┤
│ Lần import gần đây [11]                                              │
│   01/10/2026 10:15 - iOffice        2 tệp · 14 bài đã xuất bản       │
│   30/09/2026 16:40 - iStorage       1 tệp · 6 bài · 1 chờ duyệt      │
└──────────────────────────────────────────────────────────────────────┘
```

- Khác màn gốc: khung cảnh báo cam [12] "Một số tệp không được nhận" liệt kê từng tệp kèm lý do ("Định dạng không hỗ trợ (chỉ .docx, .md, .pdf).", "Vượt 20.0 MB.", "Tệp rỗng.", "đã chọn rồi.", "tối đa 10 tệp mỗi lần.") — tệp không được nhận **không vào danh sách tệp đã chọn** và không tính vào lượt import; các tệp hợp lệ vẫn giữ. Thông báo "Chưa phân loại"/wording lỗi `[wording chưa có, chưa có mã E-…]`.

#### Trạng thái phụ — hộp thoại Tạo danh mục mới (mới 01/10/2026)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│ Import UM/SRS                           < Về quản lý nội dung >      │
├──────────────────────────────────────────────────────────────────────┤
│ (nền mờ - trang Import phía sau)                                     │
│   ┌────────────────────────────────────────────────────────┐         │
│   │ Tạo danh mục mới                                       │         │
│   │ Danh mục mới thuộc phạm vi đang chọn: iOffice · Dùng   │         │
│   │ chung. Các bài import sẽ được đưa vào danh mục này.    │         │
│   │ Tên danh mục (bắt buộc) [13]                           │         │
│   │ [ Vd: Ký số & chứng thư__________________________ ]   │          │
│   │ Danh mục cha (không bắt buộc) [14]                     │         │
│   │ [v: Không có (tạo ở cấp gốc)                     ]     │         │
│   │              [15] [ Hủy ]  [16] [ Tạo danh mục ]       │         │
│   └────────────────────────────────────────────────────────┘         │
└──────────────────────────────────────────────────────────────────────┘
```

- [13] Tên danh mục (**bắt buộc**, tối đa 100 ký tự; trùng tên ở cùng cấp trong cùng phạm vi → báo lỗi tại ô "Tên danh mục đã tồn tại ở cùng cấp."); [14] Danh mục cha (không bắt buộc, mặc định "Không có (tạo ở cấp gốc)"; chỉ liệt kê danh mục của đúng phạm vi đã chọn, hiển thị cây thụt lề); [15] Hủy (đóng, không tạo); [16] Tạo danh mục (disabled khi chưa nhập tên; Enter cũng tạo). Hộp thoại nền mờ phía sau; nhắc phạm vi đang chọn "‹Dịch vụ› · Dùng chung" hoặc "‹Dịch vụ› · Site ‹tên›".

#### Trạng thái phụ — đã tạo, tự chọn làm danh mục đích

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│ Import UM/SRS                           < Về quản lý nội dung >      │
├──────────────────────────────────────────────────────────────────────┤
│ 2. Cấu hình (áp cho cả lô)                                           │
│ Dịch vụ [3] [v: iOffice      ]   Phạm vi [4] [v: Dùng chung ...]     │
│ Loại nội dung [5] [v: Hướng dẫn sử dụng]                             │
│ Danh mục đích [6] [v: Chứng thư số             ]  <- tự chọn [17]    │
│                   [7] + Tạo danh mục mới                             │
│ [ ] Không dùng cho AI [8]                                            │
│ [9] [ Bắt đầu import ]                                               │
└──────────────────────────────────────────────────────────────────────┘
```

- [17] Tạo xong → đóng hộp thoại, danh mục mới **tự chọn làm Danh mục đích** (cả lô vào danh mục này); link [7] vẫn còn để tạo thêm. Đổi Dịch vụ/Phạm vi sau đó → bỏ chọn danh mục (không còn thuộc phạm vi).

#### Trạng thái phụ — đang xử lý (tiến độ theo từng tệp)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│ Import UM/SRS                           < Về quản lý nội dung >      │
├──────────────────────────────────────────────────────────────────────┤
│ iOffice - Dùng chung mọi site của dịch vụ         [Đang xử lý] [18]  │
│ 1/2 tệp đã xử lý · 8 bài đã xuất bản [19]                            │
├──────────────────────────────────────────────────────────────────────┤
│ UM_iOffice_v2.docx (1.4 MB)       [Đã xử lý · 8 đã xuất bản] [20]    │
│ UM_iStorage.docx (0.88 MB)                       [Đang xử lý]        │
├──────────────────────────────────────────────────────────────────────┤
│ [21] [ Import tài liệu khác ]                                        │
└──────────────────────────────────────────────────────────────────────┘
```

- [18] Tiêu đề lô "‹dịch vụ› — ‹phạm vi›" + nhãn "Đang xử lý" / "Đã xử lý xong"; [19] tóm tắt "n/m tệp đã xử lý · x bài đã xuất bản" (kèm "· y bài giữ chờ duyệt", "· z tệp lỗi", "· danh mục: …", "· không dùng cho AI" khi có); [20] mỗi tệp 1 thẻ: tên (dung lượng) + nhãn trạng thái (Chờ xử lý / Đang xử lý / Hoàn tất / Lỗi, kèm số bài đã xuất bản/chờ duyệt khi xong); [21] Import tài liệu khác → về trang 1. Màn tự làm tươi mỗi 2 giây tới khi xong; **rời trang không dừng xử lý** (xử lý nền, EX-02). Không có nút "Hủy import".

#### Trạng thái phụ — kết quả (có bài chờ duyệt và tệp lỗi)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│ Import UM/SRS                           < Về quản lý nội dung >      │
├──────────────────────────────────────────────────────────────────────┤
│ iOffice - Dùng chung mọi site của dịch vụ        [Đã xử lý xong] [18]│
│ 2/2 tệp đã xử lý · 8 bài đã xuất bản · 2 bài giữ chờ duyệt (có cảnh  │
│ báo nhạy cảm) · 1 tệp lỗi · danh mục: Chứng thư số [19]              │
│ [22] [ Xem 2 bài chờ duyệt ]  [23] [ Xem nội dung đã xuất bản ]      │
├──────────────────────────────────────────────────────────────────────┤
│ UM_iOffice_v2.docx (1.4 MB)  [Đã xử lý · 8 đã xuất bản, 2 chờ duyệt] │
│   Bài "Cấu hình tài khoản" có thể chứa thông tin nhạy cảm [24]       │
│ (!) UM_iStorage.docx (0.88 MB)                              [Lỗi]    │
│   Không đọc được nội dung tệp (tệp bị hỏng hoặc có mật khẩu).   [25] │
│   [26] [ Thử lại ]  [27] [ Xóa ]                                     │
├──────────────────────────────────────────────────────────────────────┤
│ [21] [ Import tài liệu khác ]                                        │
└──────────────────────────────────────────────────────────────────────┘
```

- [22] **Xem n bài chờ duyệt** (chỉ khi xong và có bài giữ lại) → `kb-cho-duyet` lọc nguồn Import; [23] Xem nội dung đã xuất bản → `kb-danh-sach-noi-dung`; [24] cảnh báo nhạy cảm của tệp (bài bị giữ chờ duyệt) và cảnh báo trùng "Tệp giống hệt đã được import vào phạm vi này ngày …"; [25] lý do lỗi từng tệp; [26] **Thử lại** (chỉ khi nội dung tạm còn — tệp lỗi giữ tối đa **7 ngày**; quá hạn hiện "Nội dung tạm đã hết hạn sau 7 ngày — tải lại tệp ở lần import mới"); [27] Xóa tệp lỗi khỏi lô. Import lỗi từng phần không làm mất phần đã thành công.

---

## Screen: kb-cau-hinh-dong-bo-drive — Cấu hình đồng bộ Google Drive

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket(12) | Nội dung | Người dùng | Cấu hình|Báo cáo(o) B v │
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
| 1 | Trạng thái kết nối | Label / Button | Click | • Kết nối tới Google Drive của tổ chức (Đề xuất — Nguồn dữ liệu đầu vào). Chưa kết nối/mất kết nối → nút "Kết nối lại" và báo lỗi [wording chưa có]. Cách xác thực (tài khoản dịch vụ hay OAuth): đã chốt (OQ-21). |
| 2 | Bảng thư mục đồng bộ | Table | Select | • Mỗi dòng: thư mục Drive, dịch vụ, phạm vi (dùng chung/site), bật/tắt. Chỉ **Quản trị viên** cấu hình (UC15). Tắt 1 dòng → ngừng quét thư mục đó, bài đã đưa vào KB giữ nguyên. |
| 3 | Thêm thư mục | Button | Click | • Mở **modal "Thêm thư mục đồng bộ"** giữa màn (nền mờ phía sau, đã vẽ Figma 23/09/2026): đường dẫn thư mục Drive, dịch vụ, phạm vi (dùng chung/site cụ thể — **bắt buộc**, để bài đồng bộ có phạm vi rõ ràng, không lọt sang khách hàng khác), checkbox bật đồng bộ ngay. Bấm "Thêm" → đóng modal, thêm dòng vào bảng. |
| 4 | Lịch đồng bộ | Dropdown | Select | • Chu kỳ quét định kỳ (UC15/UC38). Các lựa chọn chu kỳ: đã chốt (OQ-21). |
| 5 | Kết quả lần chạy gần nhất | Label | ReadOnly | • Job đồng bộ (UC38) quét thư mục theo lịch, đưa **tài liệu mới/thay đổi vào hàng chờ duyệt** (nhãn "Drive") — không xuất bản thẳng, không đưa dữ liệu thô vào chỉ mục AI. Hiện số tài liệu, lỗi nếu có. |
| 6 | Lưu cấu hình | Button | Click | • **Disabled** khi chưa đổi gì; lưu → áp dụng từ lần quét kế tiếp; báo "Đã lưu" (wording tạm). Ghi nhật ký thao tác cấu hình [GIẢ ĐỊNH]. |

#### Trạng thái phụ — mất kết nối

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│ Đồng bộ tài liệu từ Google Drive  [1] Kết nối: Mất kết nối           │
│ (!) Không kết nối được Google Drive.            [ Kết nối lại ]      │
├──────────────────────────────────────────────────────────────────────┤
│ Lịch đồng bộ [4] [v: Hằng ngày 02:00]                                │
│ Lần chạy gần nhất: 19/09 02:00 - lỗi kết nối, chưa quét được [5]     │
│ [6] [ Lưu cấu hình ] (mờ)                                            │
└──────────────────────────────────────────────────────────────────────┘
```

- Khác màn gốc: [1] Kết nối: Mất kết nối + dòng (!) kèm nút Kết nối lại; [6] Lưu mờ; "Lần chạy gần nhất" ghi lỗi kết nối, chưa quét được.


---

## Screen: kb-tu-ticket-thanh-faq — Chuyển ticket thành FAQ nháp

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket(12) | Nội dung | Người dùng | Cấu hình|Báo cáo(o) B v │
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
| 1 | Gợi ý câu hỏi lặp lại | Table | Select | • Hệ thống **gợi ý tự động** các ticket đã xử lý có câu hỏi lặp nhiều lần (Đề xuất — Từ chính các yêu cầu hỗ trợ); agent cũng chọn được ticket hữu ích bất kỳ. Cột: chọn, mã ticket, câu hỏi, số lần lặp. Ngưỡng "lặp nhiều": đã chốt (OQ-21). |
| 2 | Chọn ticket | Checkbox | Check | • Chọn 1 ticket làm nguồn cho 1 bài FAQ; chọn nhiều ticket cùng câu hỏi thì gộp thành 1 bài [GIẢ ĐỊNH]. |
| 3 | Bản nháp FAQ | Textbox (multi-line) x2 | Text | • Câu hỏi + câu trả lời tự rút từ ticket, **đã loại thông tin nhận diện khách hàng** (tên đơn vị, người, số liệu riêng) để **không lộ dữ liệu ticket của khách hàng này sang khách hàng khác** (Đề xuất — Không đưa thẳng dữ liệu thô). Agent chỉnh sửa; cách tự ẩn danh: đã chốt (OQ-21). |
| 4 | Phạm vi & AI | Dropdown + Checkbox | Select / Check | • Mặc định phạm vi = **site của ticket gốc** (an toàn); chọn "Dùng chung" chỉ khi người soạn xác nhận nội dung không chứa dữ liệu riêng. Cờ "Không dùng cho AI" như `kb-soan-thao`. |
| 5 | Tạo FAQ nháp | Button | Click | • **Disabled** khi chưa chọn ticket hoặc [3] rỗng. Tạo bài FAQ nháp và đưa vào `kb-cho-duyet` (nhãn "Từ ticket") — **vẫn phải qua duyệt** trước khi vào kho AI (UC: quy trình soạn → duyệt → xuất bản). Khóa khi submitting. |
| 6 | Hủy | Button | Click | • Về `kb-danh-sach-noi-dung`, không tạo gì. |

- Màn này cần một lối vào cho agent (menu Nội dung hoặc nút trên `agent-chi-tiet-ticket`) — userflow chỉ có đường từ `kb-danh-sach-noi-dung`; chốt ở OQ-21.

#### Trạng thái phụ — chưa chọn ticket

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│ Chuyển ticket đã xử lý thành FAQ nháp                                │
├──────────────────────────────────────────────────────────────────────┤
│ [ ] #T-0123   Ký số báo lỗi 403 thì xử lý sao?         x5 [2]        │
│ [ ] #T-0098   Không tải được tệp đính kèm              x3            │
├──────────────────────────────────────────────────────────────────────┤
│ Câu hỏi: [Chọn ticket ở trên để rút câu hỏi...___________________]   │
│ [5] [ Tạo FAQ nháp ] (mờ)   [6] [ Hủy ]                              │
└──────────────────────────────────────────────────────────────────────┘
```

- Khác màn gốc: chưa tích ticket nào → ô câu hỏi/trả lời còn placeholder, [5] Tạo FAQ nháp mờ.


---

## Đề xuất đã cập nhật (đã chốt với khách hàng 21/09/2026)

| Mã | Nội dung cần chốt | Đề xuất | Trạng thái |
|----|-------------------|---------|------------|
| OQ-4 | Ai được duyệt và xuất bản | Chỉ Quản trị viên; Biên tập soạn và gửi duyệt, không tự duyệt bài mình soạn. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-21a | Tệp tải lên, import, tách bài | Ảnh png/jpg ≤5 MB; docx, md, pdf văn bản ≤20 MB/tệp, ≤10 tệp/lần; tách bài theo tiêu đề cấp 1/2, phần không tách được gom vào bài nháp "Chưa phân loại". | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-21b | Bài của tôi, sửa, khôi phục | Biên tập xem "Bài của tôi" theo Nháp / Chờ duyệt / Bị từ chối / Đã xuất bản; bản đang xuất bản vẫn hiển thị đến khi bản sửa được duyệt; Quản trị viên khôi phục bài đã ẩn (tái lập chỉ mục AI). | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-21c | Bài "không dùng cho AI" | Thêm trường "Đối tượng xem" (Khách hàng + Agent / Chỉ nội bộ), tách khỏi cờ "Không dùng cho AI" (chỉ loại khỏi chỉ mục AI). | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-21d | Google Drive | Tài khoản dịch vụ được chia sẻ thư mục; quét mặc định hằng ngày 02:00 (chọn hằng giờ/ngày/tuần); hỗ trợ Google Docs, docx, pdf văn bản, md. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-21e | Ticket → FAQ | "Lặp nhiều" = ≥3 ticket hỏi tương tự trong 30 ngày; tự thay tên đơn vị/người/email/SĐT/số hợp đồng bằng [ẩn], agent rà lại; phạm vi mặc định là site của ticket; lối vào thêm nút "Tạo FAQ từ ticket này" ở `agent-chi-tiet-ticket`. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-27 | Chỉ mục AI: ai tái lập, loại bài khỏi AI ở đâu (bổ sung OQ-21b/c) | Chỉ Quản trị viên tái lập; loại khỏi AI đặt ở `kb-soan-thao`; `kb-chi-muc-ai` chỉ xem trạng thái + tái lập, xác nhận khi hàng loạt. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
