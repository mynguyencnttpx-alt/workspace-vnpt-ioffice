# Flow: Khách hàng gửi & theo dõi ticket

> Màn hình thuộc flow này: ticket-tao-moi → ticket-goi-y-faq → ticket-danh-sach-kh → ticket-chi-tiet-kh → ticket-xac-nhan → ticket-da-dong. Flow tổng xem `../srs/ho-tro-cskh-userflow.md` Mục 1.
>
> Các mục ghi "(OQ-n)" đã được **khách hàng xác nhận (21/09/2026)** ở bảng cuối file (cập nhật 19/09/2026), cũng đã ghi vào tài liệu "Đề xuất Hệ thống Hỗ trợ & Chăm sóc Khách hàng.docx".

---

## Screen: ticket-tao-moi — Form tạo ticket

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi            (o) A v       │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│       ┌──────────────────────────────────────────────────────┐       │
│       │ Tạo yêu cầu hỗ trợ                                   │       │
│       │                                                      │       │
│       │ Dịch vụ                                              │       │
│       │ [1] [v: iOffice                     ]                │       │
│       │ Loại vấn đề                                          │       │
│       │ [2] [v: Chọn loại vấn đề            ]                │       │
│       │ Mức ưu tiên                                          │       │
│       │ [3] [v: Bình thường                 ]                │       │
│       │ Mô tả vấn đề                                         │       │
│       │ [4] [Nhập mô tả chi tiết vấn đề...                   │       │
│       │      ________________________________                │       │
│       │      ________________________________]               │       │
│       │ Đính kèm ảnh/file                                    │       │
│       │ [5] [ + Chọn tệp ]                                   │       │
│       │     [IMG] anh-loi-403.png  320 KB  <Xóa>             │       │
│       │     [PDF] bao-cao-loi.pdf  1.2 MB  <Xóa>             │       │
│       │     png, jpg, pdf, docx, xlsx, txt; tối đa 5 tệp     │       │
│       ├──────────────────────────────────────────────────────┤       │
│       │ [6] [ Gửi yêu cầu ]  [7] [   Hủy   ]                 │       │
│       └──────────────────────────────────────────────────────┘       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Dịch vụ | Dropdown | Select | • **Bắt buộc**. Chỉ liệt kê dịch vụ khách hàng đang dùng theo site (danh mục khách hàng/site); mặc định chọn sẵn khi chỉ có 1 dịch vụ. Danh sách lấy từ danh mục dịch vụ (`danhmuc-dich-vu-loai-van-de`).<br>• Khi vào từ `ai-de-xuat-tao-ticket` hoặc từ bài KB: điền sẵn dịch vụ tương ứng. |
| 2 | Loại vấn đề | Dropdown | Select | • **Bắt buộc**. Danh sách theo danh mục loại vấn đề do quản trị viên quản lý; ảnh hưởng định tuyến/xử lý [GIẢ ĐỊNH — mức ảnh hưởng do `/srs` chốt]. |
| 3 | Mức ưu tiên | Dropdown | Select | • **Bắt buộc**, khách hàng tự chọn (Đề xuất — Gửi yêu cầu hỗ trợ): Khẩn cấp / Cao / Bình thường, mặc định Bình thường [GIẢ ĐỊNH mặc định].<br>• Mức ưu tiên quyết định SLA áp cho ticket; ngưỡng thời gian: đã chốt (OQ-2). |
| 4 | Mô tả vấn đề | Textbox (multi-line) | Text | • **Bắt buộc**. Khi vào từ hỏi đáp AI: tự điền nội dung đã hỏi (khách hàng sửa được).<br>• Giới hạn độ dài: chưa có nguồn. |
| 5 | Đính kèm ảnh/file | File upload | Select | • Không bắt buộc; chọn ảnh/file, mỗi tệp hiện dạng dòng tệp gồm tên + dung lượng + <Xóa> (ảnh có hình xem trước nhỏ, tệp khác có biểu tượng loại tệp). Giới hạn đã chốt (OQ-16): png, jpg, pdf, docx, xlsx, txt; ≤5 tệp/lần, ≤10 MB/tệp, tổng ≤25 MB; chặn tệp thực thi/nén; dòng gợi ý định dạng/giới hạn hiện ngay dưới danh sách tệp.<br>• <Xóa> gỡ tệp đã chọn trước khi gửi.<br>• **Tệp sai định dạng/quá lớn** → dòng tệp đó đánh dấu (!) + báo lỗi ngay dưới ô (vd "anh-lon.png vượt quá 10 MB, không đính kèm được. Vui lòng chọn tệp nhỏ hơn."); tệp lỗi không gửi kèm, các tệp hợp lệ khác giữ nguyên (xem Trạng thái phụ bên dưới) [wording tạm, chưa có mã E-…].<br>• Tệp đã đính kèm được giữ nguyên khi đi qua `ticket-goi-y-faq` rồi quay lại chỉnh sửa. |
| 6 | Gửi yêu cầu | Button | Click | • **Disabled** tới khi [1], [2], [3], [4] có giá trị. Thiếu trường bắt buộc khi bấm → tô đỏ ô thiếu + báo "Vui lòng nhập đủ thông tin bắt buộc" (wording tạm), giữ nguyên nội dung đã nhập.<br>• Hợp lệ và **có bài gợi ý liên quan** → sang `ticket-goi-y-faq`; **không có bài gợi ý** → tạo ticket luôn. Khi tạo: hệ thống định tuyến theo loại khách hàng (KH tỉnh → team tỉnh; KH doanh nghiệp/TW → team trung tâm), báo agent phụ trách, sang `ticket-danh-sach-kh`, ticket mới ở trạng thái "Mới".<br>• Khóa nút khi submitting (chống tạo ticket trùng). |
| 7 | Hủy | Button | Click | • Bỏ form, về màn trước; đã nhập dở → hỏi xác nhận bỏ [GIẢ ĐỊNH]. |

- Dữ liệu mẫu chỉ minh họa. Khi vào từ hỏi đáp AI/bài KB, dịch vụ + mô tả được điền sẵn.

#### Trạng thái phụ — tệp đính kèm lỗi

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi            (o) A v       │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│       ┌──────────────────────────────────────────────────────┐       │
│       │ Tạo yêu cầu hỗ trợ                                   │       │
│       │                                                      │       │
│       │ Dịch vụ                                              │       │
│       │ [1] [v: iOffice                     ]                │       │
│       │ Loại vấn đề                                          │       │
│       │ [2] [v: Chọn loại vấn đề            ]                │       │
│       │ Mức ưu tiên                                          │       │
│       │ [3] [v: Bình thường                 ]                │       │
│       │ Mô tả vấn đề                                         │       │
│       │ [4] [Nhập mô tả chi tiết vấn đề...                   │       │
│       │      ________________________________                │       │
│       │      ________________________________]               │       │
│       │ Đính kèm ảnh/file                                    │       │
│       │ [5] [ + Chọn tệp ]                                   │       │
│       │     [IMG] anh-loi-403.png  320 KB  <Xóa>             │       │
│       │     (!) [IMG] anh-lon.png  12 MB  <Xóa>              │       │
│       │     (!) anh-lon.png vượt quá 10 MB, không đính kèm   │       │
│       │         được. Vui lòng chọn tệp nhỏ hơn.             │       │
│       ├──────────────────────────────────────────────────────┤       │
│       │ [6] [ Gửi yêu cầu ]  [7] [   Hủy   ]                 │       │
│       └──────────────────────────────────────────────────────┘       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- Khác màn gốc: chỉ khối [5] — tệp vượt giới hạn hiện dòng (!) kèm câu báo lỗi dưới ô; nút [6] vẫn theo điều kiện bắt buộc [1]–[4]. Khách hàng bấm <Xóa> hoặc chọn tệp khác. Chưa có slug riêng trong userflow (không tách màn).


---

## Screen: ticket-goi-y-faq — Gợi ý FAQ liên quan

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi            (o) A v       │
├──────────────────────────────────────────────────────────────────────┤
│ Bài viết có thể giúp bạn trước khi gửi yêu cầu [1]                   │
├──────────────────────────────────────────────────────────────────────┤
│ Dựa trên mô tả: "Ký số báo lỗi 403 khi ký văn bản đi"                │
│ Đính kèm giữ nguyên: [IMG] anh-loi-403.png [PDF] bao-cao-loi.pdf [5] │
│                                                                      │
│ [2] < Lỗi 403 khi ký số >                (Xử lý lỗi/sự cố)           │
│     Khi ký số báo không có quyền, kiểm tra vai trò ký...             │
│                                                                      │
│     < Hướng dẫn ký số văn bản đi >       (Hướng dẫn sử dụng)         │
│     Các bước chọn chứng thư số và ký văn bản trước khi...            │
├──────────────────────────────────────────────────────────────────────┤
│ [3] [ Vẫn muốn gửi yêu cầu ]      [4] < Quay lại chỉnh sửa >         │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Tiêu đề gợi ý | Label | ReadOnly | • Giải thích màn này: gợi ý để giảm ticket trùng nội dung đã có trong kho (Đề xuất — Gửi yêu cầu hỗ trợ). Thông tin form vừa nhập được giữ nguyên. |
| 2 | Danh sách bài gợi ý | List | Click | • Các bài KB/FAQ liên quan nhất tới dịch vụ + loại vấn đề + mô tả vừa nhập, **chỉ trong phạm vi dịch vụ + site** của khách hàng. Bấm tên bài → mở `kb-chi-tiet-bai-viet` (khuyến nghị mở tab mới để không mất form) [GIẢ ĐỊNH].<br>• Số bài gợi ý tối đa, cách xếp hạng: đã chốt (OQ-11).<br>• **Không có bài liên quan:** bỏ qua màn này, đi thẳng bước gửi [GIẢ ĐỊNH — userflow không mô tả; cần `/user-flow` xác nhận]. |
| 3 | Vẫn muốn gửi yêu cầu | Button | Click | • **Tạo ticket luôn** (không quay lại form) rồi sang `ticket-danh-sach-kh`, ticket ở trạng thái "Mới" và định tuyến như mô tả ở `ticket-tao-moi` [6]. Khóa nút khi submitting. |
| 4 | Quay lại chỉnh sửa | Link | Click | • Quay về `ticket-tao-moi` để sửa nội dung, chưa gửi. |
| 5 | Đính kèm giữ nguyên | Label | ReadOnly | • Nhắc các tệp/ảnh đã đính kèm ở form vẫn được giữ nguyên: gửi kèm khi bấm [3] "Vẫn muốn gửi yêu cầu", không mất khi bấm [4] "Quay lại chỉnh sửa". Chỉ hiện khi form có tệp; không có tệp thì ẩn dòng này. |


---

## Screen: ticket-danh-sach-kh — Danh sách ticket của tôi

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi            (o) A v       │
├──────────────────────────────────────────────────────────────────────┤
│ Ticket của tôi                             [1] [ + Tạo yêu cầu mới ] │
├──────────────────────────────────────────────────────────────────────┤
│ Trạng thái [v: Tất cả][2] Ưu tiên [v: Tất cả][3] Dịch vụ [v: Tất cả] │
├──────────────────────────────────────────────────────────────────────┤
│ Mã       Vấn đề                  Ưu tiên     Trạng thái       Ngày   │
│ [4] ---------------------------------------------------------------  │
│ #T-0123  Không ký số được (clip) Khẩn cấp    Chờ KH xác nhận  17/09  │
│ #T-0121  Lỗi tải tệp (clip)      Bình thường Đang xử lý       16/09  │
│ #T-0118  Hướng dẫn phân quyền    Cao         Chờ khách hàng   15/09  │
│ #T-0110  Không gửi được VB đi    Cao         Đã đóng          10/09  │
│                                                                      │
│ [5] Trang 1/1              [6] (clip) = ticket có tệp/ảnh đính kèm   │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | + Tạo yêu cầu mới | Button | Click | • Navigate → `ticket-tao-moi`. Luôn hiện với khách hàng đã đăng nhập. |
| 2 | Lọc trạng thái | Dropdown | Select | • Giá trị: Tất cả / Mới / Đang xử lý / Chờ khách hàng / Chờ khách hàng xác nhận / Đã đóng (Đề xuất — Xử lý ticket). Đổi giá trị → lọc lại ngay. |
| 3 | Lọc ưu tiên / dịch vụ | Dropdown | Select | • Ưu tiên: Khẩn cấp / Cao / Bình thường; Dịch vụ: theo dịch vụ khách hàng dùng (UC21: bộ lọc trạng thái/ưu tiên/dịch vụ). Có thể kết hợp nhiều bộ lọc. |
| 4 | Bảng ticket | Table | Select | • Cột: Mã, Vấn đề, Ưu tiên, Trạng thái, Ngày cập nhật. Bấm 1 dòng → `ticket-chi-tiet-kh` (UC22).<br>• **Phạm vi dữ liệu:** khách hàng chỉ thấy ticket của mình; đầu mối có thấy ticket của thành viên khác trong đơn vị không: đã chốt (OQ-17).<br>• Dòng "Chờ khách hàng xác nhận" nên nổi bật (cần hành động) [GIẢ ĐỊNH].<br>• Empty: "Bạn chưa có yêu cầu hỗ trợ nào" + nút [1]. Định dạng mã ticket: chưa có nguồn (dữ liệu mẫu). |
| 5 | Phân trang | Pagination | Click | • 10 bản ghi/trang (đã chốt, OQ-11); ẩn khi 1 trang. |
| 6 | Biểu tượng tệp đính kèm | Icon (clip) | ReadOnly | • Hiện cạnh tiêu đề vấn đề khi ticket có ít nhất 1 tệp/ảnh đính kèm (lúc tạo hoặc trong trao đổi). Không bấm riêng — bấm dòng vẫn vào `ticket-chi-tiet-kh`; ticket không có tệp thì không hiện. |

- Mã ticket, tiêu đề, ngày là dữ liệu mẫu. Header dùng chung (không đánh số).


---

## Screen: ticket-chi-tiet-kh — Chi tiết ticket

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi            (o) A v       │
├──────────────────────────────────────────────────────────────────────┤
│ [1] < Quay lại danh sách >                                           │
├──────────────────────────────────────────────────────────────────────┤
│ #T-0123  Không ký số được                        [2] Chờ KH xác nhận │
│ Dịch vụ: iOffice | Loại: Lỗi ký số | Ưu tiên: Khẩn cấp   [3]         │
├──────────────────────────────────────────────────────────────────────┤
│ Lịch sử trao đổi [4]                                                 │
│ 17/09 08:02  Bạn: Ký số báo lỗi 403 khi ký văn bản đi.               │
│              [ IMG: anh-loi-403.png ]  [PDF] bao-cao-loi.pdf (dl)    │
│ 17/09 09:15  Hỗ trợ: Vui lòng kiểm tra vai trò ký của tài khoản.     │
│ 17/09 10:30  Hỗ trợ: Đã cấp quyền ký, bạn thử lại giúp.              │
│              [PDF] huong-dan-cap-quyen.pdf 240 KB (dl)     [10]      │
├──────────────────────────────────────────────────────────────────────┤
│ [5] Mốc: Tạo 17/09 08:02 | Phản hồi 17/09 09:15 | Đóng - | Mở lại -  │
├──────────────────────────────────────────────────────────────────────┤
│ [6] Yêu cầu của bạn chờ xác nhận kết quả  [7] [ Xác nhận kết quả ]   │
│ [8] [Nhập phản hồi...________] [11] [+ Đính kèm] [9] [ Gửi ]         │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Quay lại danh sách | Link | Click | • Navigate → `ticket-danh-sach-kh`. |
| 2 | Trạng thái ticket | Label (badge) | ReadOnly | • Một trong: Mới / Đang xử lý / Chờ khách hàng / Chờ khách hàng xác nhận / Đã đóng. Cập nhật khi agent đổi trạng thái; khách hàng nhận thông báo Email/SMS khi có phản hồi/đổi trạng thái (theo `cauhinh-kenh-thongbao`). |
| 3 | Thông tin ticket | Label | ReadOnly | • Dịch vụ, loại vấn đề, mức ưu tiên khách hàng đã chọn; không sửa được sau khi gửi [GIẢ ĐỊNH]. Không hiển thị team/agent nội bộ hay ghi chú nội bộ (chỉ agent thấy). |
| 4 | Lịch sử trao đổi | Timeline | ReadOnly | • Chỉ hiện **phản hồi công khai** giữa khách hàng và đội hỗ trợ theo thứ tự thời gian, kèm tệp đính kèm; **ghi chú nội bộ của agent không bao giờ hiện**.<br>• Có hiển thị tên agent hay chỉ "Đội hỗ trợ": đã chốt (OQ-17).<br>• Phản hồi AI tự động (khi bật) hiển thị như phản hồi thường, có nhãn "phản hồi tự động" cho khách hàng hay không: đã chốt (OQ-17).<br>• Ticket đã chuyển OneBSS: mã phiếu OneBSS có hiện cho khách hàng không: đã chốt (OQ-17).<br>• Mỗi tin có thể kèm tệp/ảnh (xem [10]); ghi chú nội bộ và tệp nội bộ của agent không bao giờ hiện cho khách hàng |
| 5 | Mốc thời gian | Label | ReadOnly | • Tạo, phản hồi, đóng, mở lại — toàn bộ mốc được lưu trong lịch sử ticket (Đề xuất — Gửi yêu cầu hỗ trợ). Mốc chưa xảy ra hiện "-". |
| 6 | Banner chờ xác nhận | Label | ReadOnly | • Chỉ hiện khi trạng thái = Chờ khách hàng xác nhận; nhắc thời hạn tự đóng nếu không phản hồi (thời gian cấu hình: OQ-1). |
| 7 | Xác nhận kết quả | Button | Click | • Chỉ hiện khi trạng thái = Chờ khách hàng xác nhận → `ticket-xac-nhan`. |
| 8 | Ô nhập phản hồi | Textbox (multi-line) | Text | • Khách hàng bổ sung thông tin/đính kèm cho đội hỗ trợ; hiển thị khi ticket chưa đóng (đặc biệt lúc "Chờ khách hàng"). Ticket đã đóng → ẩn, chuyển sang `ticket-da-dong` (mở lại).<br>• Khách hàng nhắn thêm khi đang "Chờ khách hàng xác nhận" thì trạng thái đổi thế nào: đã chốt (OQ-17).<br>• Tệp chọn qua [11] hiện thành dòng "Đính kèm:" phía trên ô nhập, mỗi tệp có (x) để gỡ (xem Trạng thái phụ — soạn phản hồi kèm tệp) |
| 9 | Gửi | Button | Click | • **Disabled** khi [8] rỗng; gửi → thêm vào lịch sử trao đổi, báo agent phụ trách; trạng thái "Chờ khách hàng" chuyển về "Đang xử lý" [GIẢ ĐỊNH]. |
| 10 | Tệp đính kèm trong lịch sử | Ảnh xem trước / File chip | Click | • Tệp/ảnh kèm theo từng tin của khách hàng và của đội hỗ trợ. Ảnh hiện hình xem trước nhỏ + tên; bấm ảnh → hộp xem ảnh [12]. Tệp khác (PDF...) hiện tên + dung lượng + (dl); bấm → tải xuống.<br>• Chỉ hiện tệp thuộc phản hồi công khai. |
| 11 | Đính kèm | Button | Click | • Mở hộp chọn tệp cho phản hồi đang soạn; chỉ hiện khi ticket chưa đóng (cùng điều kiện với [8]). Định dạng/dung lượng/số tệp như `ticket-tao-moi` [5] (OQ-16). Tệp lỗi → báo ngay tại dòng tệp, không gửi kèm. |
| 12 | Hộp xem ảnh | Modal | ReadOnly | • Mở khi bấm ảnh ở [10]; nền màn phía sau mờ đi. Hiện ảnh lớn, tên tệp, dung lượng, thời điểm gửi; chỉ xem, không sửa (xem Trạng thái phụ — xem ảnh đính kèm). |
| 13 | Đóng hộp xem ảnh | Icon button (x) | Click | • Đóng hộp, quay về màn chi tiết ticket ở vị trí cũ. |
| 14 | Tải xuống | Button | Click | • Tải ảnh gốc về máy khách hàng. |

- Bố cục vẽ ở trạng thái "Chờ khách hàng xác nhận" (đủ cả banner [6] và nút [7]); các trạng thái khác ẩn [6][7] tương ứng.

#### Trạng thái phụ — soạn phản hồi kèm tệp

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi            (o) A v       │
├──────────────────────────────────────────────────────────────────────┤
│ [1] < Quay lại danh sách >                                           │
├──────────────────────────────────────────────────────────────────────┤
│ #T-0123  Không ký số được                        [2] Chờ KH xác nhận │
│ Dịch vụ: iOffice | Loại: Lỗi ký số | Ưu tiên: Khẩn cấp   [3]         │
├──────────────────────────────────────────────────────────────────────┤
│ Lịch sử trao đổi [4]                                                 │
│ 17/09 08:02  Bạn: Ký số báo lỗi 403 khi ký văn bản đi.               │
│              [ IMG: anh-loi-403.png ]  [PDF] bao-cao-loi.pdf (dl)    │
│ 17/09 09:15  Hỗ trợ: Vui lòng kiểm tra vai trò ký của tài khoản.     │
│ 17/09 10:30  Hỗ trợ: Đã cấp quyền ký, bạn thử lại giúp.              │
│              [PDF] huong-dan-cap-quyen.pdf 240 KB (dl)     [10]      │
├──────────────────────────────────────────────────────────────────────┤
│ [5] Mốc: Tạo 17/09 08:02 | Phản hồi 17/09 09:15 | Đóng - | Mở lại -  │
├──────────────────────────────────────────────────────────────────────┤
│ [6] Yêu cầu của bạn chờ xác nhận kết quả  [7] [ Xác nhận kết quả ]   │
│ Đính kèm: [IMG] anh-them.png 1.2 MB (x) [TXT] log-ky-so.txt 8 KB (x) │
│ [8] [Đã thêm ảnh chụp màn hình mới, nhờ hỗ trợ kiểm tra._________]   │
│ [11] [+ Đính kèm]                                       [9] [ Gửi ]  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- Khác màn gốc: dòng "Đính kèm:" hiện các tệp đã chọn (mỗi tệp có (x) gỡ được); ô [8] đã có nội dung nên nút [9] Gửi bật. Chưa có slug riêng trong userflow (không tách màn).

#### Trạng thái phụ — xem ảnh đính kèm

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi            (o) A v       │
├──────────────────────────────────────────────────────────────────────┤
│ (nền mờ - màn Chi tiết ticket ở phía sau)                            │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│       ┌──────────────────────────────────────────────────────┐       │
│       │ anh-loi-403.png                                 (x)  │       │
│       ├──────────────────────────────────────────────────────┤       │
│       │                                                      │       │
│       │       [ IMG: ảnh chụp lỗi 403 khi ký số ]            │       │
│       │                                                      │       │
│       ├──────────────────────────────────────────────────────┤       │
│       │ 320 KB - gửi lúc 17/09 08:02       [ Tải xuống ]     │       │
│       └──────────────────────────────────────────────────────┘       │
│         [12] Hộp xem ảnh   [13] (x) Đóng   [14] Tải xuống            │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- Khác màn gốc: hộp [12] nổi trên nền mờ của màn chi tiết ticket; [13] đóng để quay lại, [14] tải ảnh gốc. Chưa có slug riêng trong userflow (không tách màn).


---

## Screen: ticket-xac-nhan — Xác nhận đã xong + đánh giá hài lòng

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi   [BĐ - iOffice] (o) A v │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│       ┌──────────────────────────────────────────────────────┐       │
│       │ Xác nhận kết quả xử lý  #T-0123                      │       │
│       │                                                      │       │
│       │ Phản hồi gần nhất của đội hỗ trợ:                    │       │
│       │ [1] "Đã cấp quyền ký, bạn thử lại giúp."             │       │
│       │     [PDF] huong-dan-cap-quyen.pdf 240 KB [6]         │       │
│       │                                                      │       │
│       │ Vấn đề đã được giải quyết chưa?                      │       │
│       │ [2] [   Đã giải quyết xong   ]                       │       │
│       ├──────────────────────────────────────────────────────┤       │
│       │ Mức hài lòng (không bắt buộc) [3]                    │       │
│       │     (*) (*) (*) (*) ( )   4/5 sao                    │       │
│       │ Nhận xét [7] [Hỗ trợ nhanh, cảm ơn đội ngũ.____]     │       │
│       │                                            29/500    │       │
│       ├──────────────────────────────────────────────────────┤       │
│       │ [4] Không phản hồi thì ticket sẽ tự                  │       │
│       │     động đóng sau thời gian cấu hình.                │       │
│       │ [5] < Quay lại chi tiết ticket >                     │       │
│       └──────────────────────────────────────────────────────┘       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Phản hồi gần nhất | Label | ReadOnly | • Trích phản hồi công khai cuối cùng của agent làm cơ sở để khách hàng xác nhận. |
| 2 | Đã giải quyết xong | Button | Click | • Click → xác nhận ticket đã giải quyết: hệ thống **đóng ticket chính thức**, ghi mốc đóng, sang `ticket-da-dong` (Flow: chỉ 2 kết cục — xác nhận xong, hoặc không phản hồi rồi tự đóng; **không có nút "Chưa xong"**).<br>• Khóa nút khi submitting. Lỗi lưu → giữ màn, báo lỗi, cho thử lại [wording chưa có, chưa có mã E-…]. |
| 3 | Mức hài lòng | Star rating (5 sao) | Select | • Đánh giá **đơn giản** khi đóng chính thức (Đề xuất — Gửi yêu cầu hỗ trợ), **không bắt buộc** [GIẢ ĐỊNH].<br>• [GIẢ ĐỊNH] thang 1-5 chỉ để minh họa; thang thật (sao/emoji/3 mức): OQ-3. Dữ liệu nuôi báo cáo CSAT (UC52).<br>• Bản mới: thang **5 sao** (chọn sao, có nhãn "n/5 sao") + ô nhận xét tùy chọn [7]; thêm/sửa trong 7 ngày sau khi đóng, kể cả ticket tự đóng (OQ-3). |
| 4 | Nhắc tự động đóng | Label | ReadOnly | • Nhắc: không phản hồi sau khoảng thời gian cấu hình → hệ thống tự đóng ticket và báo khách hàng (UC35, trạng thái tự đóng xem `ticket-da-dong`). Thời gian cụ thể: OQ-1. |
| 5 | Quay lại chi tiết ticket | Link | Click | • Navigate → `ticket-chi-tiet-kh` để nhắn thêm cho đội hỗ trợ nếu chưa hài lòng. |
| 6 | Tệp kèm theo phản hồi | File chip | Click | • Nếu phản hồi gần nhất của đội hỗ trợ có tệp đính kèm thì hiện dòng tệp (tên + dung lượng; bấm để tải) ngay dưới trích dẫn [1] để khách hàng xem lại trước khi xác nhận; không có tệp thì ẩn. |
| 7 | Nhận xét thêm | Textarea | Text | • Không bắt buộc, **≤500 ký tự**, có bộ đếm "n/500" (OQ-3); vượt giới hạn → chặn nhập thêm và báo ngay tại ô [wording tạm, chưa có mã E-…]. Nhận xét chỉ nội bộ đội hỗ trợ xem, không hiện công khai [GIẢ ĐỊNH]. |


---

## Screen: ticket-da-dong — Ticket đã đóng

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi            (o) A v       │
├──────────────────────────────────────────────────────────────────────┤
│ < Quay lại danh sách >                                               │
├──────────────────────────────────────────────────────────────────────┤
│ #T-0123  Không ký số được                                [1] Đã đóng │
│ [2] Lý do đóng: Bạn đã xác nhận đã giải quyết xong (17/09 10:45)     │
│ [3] Đánh giá của bạn: 5/5                                            │
├──────────────────────────────────────────────────────────────────────┤
│ Lịch sử trao đổi (chỉ đọc)                                           │
│ 17/09 08:02  Bạn: Ký số báo lỗi 403 khi ký văn bản đi.               │
│              [ IMG: anh-loi-403.png ]  [PDF] bao-cao-loi.pdf (dl)    │
│ 17/09 10:30  Hỗ trợ: Đã cấp quyền ký, bạn thử lại giúp.              │
│              [PDF] huong-dan-cap-quyen.pdf 240 KB (dl)     [6]       │
│ Mốc: Tạo 17/09 08:02 | Đóng 17/09 10:45 | Mở lại -  [4]              │
├──────────────────────────────────────────────────────────────────────┤
│ [5] Vấn đề chưa hết hẳn?  [ Mở lại ticket ]                          │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Trạng thái Đã đóng | Label (badge) | ReadOnly | • Ticket đã đóng chính thức, không nhắn thêm được (ô phản hồi ẩn). |
| 2 | Lý do đóng | Label | ReadOnly | • Phân biệt 2 lý do để khách hàng hiểu: **"Bạn đã xác nhận đã giải quyết xong (ngày giờ)"** hoặc **"Tự động đóng do không phản hồi sau thời gian quy định"** (UC35). Cùng bố cục, chỉ khác dòng chữ này (không tách màn). |
| 3 | Đánh giá hài lòng | Label | ReadOnly | • Hiện mức đã đánh giá; nếu khách hàng bỏ qua hoặc ticket tự đóng thì hiện "Chưa đánh giá" [GIẢ ĐỊNH]; sau khi đóng có cho đánh giá bổ sung không: OQ-3. |
| 4 | Mốc thời gian | Label | ReadOnly | • Tạo, đóng, mở lại — lưu đầy đủ trong lịch sử ticket; mỗi lần mở lại/đóng lại thêm 1 mốc. |
| 5 | Mở lại ticket | Button | Click | • Mở lại ngay ticket đã đóng khi vấn đề chưa hết, **không cần tạo ticket mới**; hệ thống khôi phục trạng thái xử lý (UC4), ghi mốc "mở lại", báo agent phụ trách, sang `ticket-chi-tiet-kh`.<br>• Giới hạn thời hạn cho phép mở lại / số lần mở lại: đã chốt (OQ-16).<br>• Chỉ người gửi ticket hoặc đầu mối đơn vị mở lại được [GIẢ ĐỊNH]. |
| 6 | Tệp đính kèm trong lịch sử | Ảnh xem trước / File chip | Click | • Như `ticket-chi-tiet-kh` [10] nhưng chỉ đọc: ảnh/tệp trong lịch sử vẫn xem và tải xuống được sau khi ticket đóng; không thêm tệp mới (ô phản hồi ẩn). |

- Bổ sung 21/09/2026: từ màn này có lối "Đánh giá / sửa đánh giá" quay về `ticket-xac-nhan` trong 7 ngày sau khi đóng (kể cả ticket tự đóng do quá hạn) — userflow Mục 3.5.


---

## Đề xuất đã cập nhật (đã chốt với khách hàng 21/09/2026)

| Mã | Nội dung cần chốt | Đề xuất | Trạng thái |
|----|-------------------|---------|------------|
| OQ-1 | Thời gian tự đóng ticket | 3 ngày làm việc kể từ "Chờ khách hàng xác nhận", nhắc 1 lần trước 1 ngày; khách nhắn thêm thì về "Đang xử lý". Cấu hình ở màn Cấu hình SLA. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-2 | Ngưỡng SLA | Khẩn cấp: phản hồi 30 phút, xử lý 4 giờ; Cao: 2 giờ, 1 ngày làm việc; Bình thường: 4 giờ, 3 ngày làm việc (giờ làm việc T2-T6 08:00-17:00, tạm dừng khi chờ khách hàng). | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-3 | Thang đánh giá hài lòng | 5 sao + nhận xét tùy chọn (≤500 ký tự); không bắt buộc; sửa/bổ sung trong 7 ngày sau khi đóng; ticket mở lại thì tính lần đóng cuối. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-16 | Tệp đính kèm; mở lại ticket | png, jpg, pdf, docx, xlsx, txt; ≤5 tệp/lần, ≤10 MB/tệp, tổng ≤25 MB; chặn tệp thực thi/nén. Mở lại trong 7 ngày sau khi đóng, không giới hạn số lần; quá 7 ngày tạo ticket mới tham chiếu ticket cũ. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-17 | Quyền xem, cách hiển thị, khách nhắn thêm | Thành viên chỉ thấy ticket mình gửi, đầu mối thấy (và phản hồi) mọi ticket của đơn vị/site; hiện "Đội hỗ trợ – tên agent"; nhãn "Phản hồi tự động" hiển thị cho khách; mã phiếu OneBSS chỉ nội bộ; khách nhắn thêm khi chờ xác nhận thì ticket về "Đang xử lý". | Đã chốt (khách hàng xác nhận, 21/09/2026) |
