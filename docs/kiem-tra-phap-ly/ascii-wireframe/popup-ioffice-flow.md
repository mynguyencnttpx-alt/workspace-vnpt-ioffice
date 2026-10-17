# Flow: Popup nhúng trong iOffice

> Màn hình thuộc flow này: popup-chon-tep → popup-xu-ly-nhay-cam → popup-dang-xu-ly → popup-ket-qua-tom-tat → popup-hoi-dap, kèm popup-phien-het-han, popup-mo-trang-rieng, popup-loi-ket-noi. Flow tổng xem `../srs/kiem-tra-phap-ly-userflow.md` Mục 1. Nguồn mô tả: `../SRS.md` v1.1 (FC-023, FC-024, FC-012 đến FC-014, FC-022). Thiết bị: khung popup khoảng 480px (kéo mép để đổi, tối thiểu 320px), bố cục một cột.
>
> Khác bản web: nguồn đối chiếu là toàn bộ văn bản đủ điều kiện của các kho đã chọn (không bỏ tích từng văn bản, không "+ Thêm nguồn"); quét nhạy cảm sau khi bấm "Gửi kiểm tra". Số liệu trong khung chỉ minh họa.

---

## Screen: popup-chon-tep — Popup: chọn tệp

### Wireframe (ASCII)

> Khung popup ~480px (kéo mép để đổi, tối thiểu 320px), bố cục một cột. Nút "Mở trang riêng" luôn có ở tiêu đề.

```text
┌───────────────────────────────────────────────────────┐
│ KTPL · Kiểm tra pháp lý            [Mở trang riêng][x]│
├───────────────────────────────────────────────────────┤
│ Tệp đã gửi từ iOffice [1]                             │
│ (*) HopDong_ThueDat.docx  1,1 MB  09:40               │
│ ( ) DuThao_QuyetDinh.pdf  2,3 MB  09:12               │
│ (!) [2] Tệp không được hỗ trợ (chỉ PDF hoặc           │
│     Word, tối đa 50MB).  (chỉ hiện khi lỗi)           │
│                                                       │
│ Lĩnh vực cần đối chiếu (*) [3]                        │
│ [v: Quy hoạch, Đất đai (2)               ]            │
│ Kho đối chiếu [4]                                     │
│ [x] Cá nhân  [x] Đơn vị  [x] Dùng chung               │
│ (!) [5] Đã dùng 82% hạn mức tháng.                    │
│     Bạn vẫn có thể gửi.                               │
│                                                       │
│                  [6][ Gửi kiểm tra ]                  │
└───────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Danh sách tệp đã đẩy từ iOffice | Checklist (chọn 1) | Select | • Tệp ở trạng thái "Chờ xác nhận" của người đang đăng nhập iOffice: tên, dung lượng, thời gian đẩy; chọn 1 tệp mỗi lần `[GIẢ ĐỊNH]`. Không có tệp → `E-kiem-tra-phap-ly-065` "Chưa có tệp nào được gửi sang. Vui lòng chọn chức năng kiểm tra pháp lý từ tệp đính kèm trong iOffice." |
| 2 | Cảnh báo tệp | Label | ReadOnly | • Chọn tệp không hỗ trợ → `E-kiem-tra-phap-ly-067` "Tệp không được hỗ trợ (chỉ PDF hoặc Word, tối đa 50MB)." ngay tại danh sách, ở lại màn này. |
| 3 | Lĩnh vực cần đối chiếu | Combobox nhiều giá trị | Select | • **Bắt buộc**, ít nhất 1. Mặc định lĩnh vực dùng gần nhất của người dùng `[GIẢ ĐỊNH]`. |
| 4 | Kho đối chiếu | Checkbox nhóm | Check | • Kho cá nhân, Kho đơn vị, Kho dùng chung theo quyền; mặc định chọn hết, tích hết văn bản đủ điều kiện của các kho đã chọn (FC-012 BR-01). Popup không chọn từng văn bản và không có "+ Thêm nguồn" `[GIẢ ĐỊNH]`. Kho trống → `E-kiem-tra-phap-ly-038`. |
| 5 | Cảnh báo hạn mức | Label | ReadOnly | • Hiện khi đạt 80% hoặc vượt 100%, nêu phần trăm, không hiện số tiền cho người dùng thường; không chặn gửi trừ khi hạn mức đặt "Chặn gửi" → `E-kiem-tra-phap-ly-040`. |
| 6 | Gửi kiểm tra | Button | Click | • Kiểm tra kho, hạn mức, nhà cung cấp AI (chưa có → `E-kiem-tra-phap-ly-039`). Rà soát nhạy cảm bật: tệp iOffice chỉ được quét và gửi AI sau khi bấm nút này (FC-023 BR-02); có phát hiện → `popup-xu-ly-nhay-cam`, không phát hiện → tạo lượt và sang `popup-dang-xu-ly`. Mất kết nối → `E-kiem-tra-phap-ly-041`. |

---

## Screen: popup-xu-ly-nhay-cam — Popup: xử lý nhạy cảm

### Wireframe (ASCII)

> Chỉ hiện khi rà soát bật và có phát hiện. Không có bước xem trước bản gửi trong popup `[GIẢ ĐỊNH]`.

```text
┌───────────────────────────────────────────────────────┐
│ Xử lý dữ liệu nhạy cảm             [Mở trang riêng][x]│
├───────────────────────────────────────────────────────┤
│ Phát hiện 5 loại dữ liệu nhạy cảm.                    │
│ [1][ Che ẩn tất cả ] [ Cho phép tất cả ]              │
│                                                       │
│ CCCD  012*****789 (x2, tr.3,7) [2]                    │
│  (*)Che ẩn ( )Cho phép ( )Xóa                         │
│ Email  a***@vnpt.vn (x3, tr.1,2)                      │
│  ( )Che ẩn (*)Cho phép ( )Xóa                         │
│ Họ tên  Nguyễn V. A (x4, tr.1-3)                      │
│  (*)Che ẩn ( )Cho phép ( )Xóa                         │
│ ...  (cuộn xem thêm)                                  │
│                                                       │
│      [3] < Quay lại >   [4][ Xác nhận ]               │
└───────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Che ẩn tất cả / Cho phép tất cả | Button | Click | • Đặt cùng một cách xử lý cho mọi mục; vẫn chỉnh từng mục sau đó. |
| 2 | Danh sách dữ liệu nhạy cảm | Table một cột | Select | • Bố cục một cột cho khung hẹp, cùng ràng buộc FC-013: mỗi mục có loại, giá trị che một phần, số lần, trang, ba cách xử lý (Cho phép gửi / Che ẩn / Xóa), mặc định theo quy tắc. Mục thiếu cách xử lý → `E-kiem-tra-phap-ly-042` tô nổi. |
| 3 | Quay lại | Link | Click | • Về `popup-chon-tep`, không tạo lượt, không gửi gì ra ngoài. |
| 4 | Xác nhận | Button | Click | • Lưu lựa chọn, tạo lượt "Chờ xử lý", vào hàng đợi, sang `popup-dang-xu-ly`; ghi nhật ký gửi ra AI (chỉ loại và số lượng). Quét lỗi → `E-kiem-tra-phap-ly-043`. |

---

## Screen: popup-dang-xu-ly — Popup: đang xử lý

### Wireframe (ASCII)

```text
┌───────────────────────────────────────────────────────┐
│ Đang kiểm tra pháp lý              [Mở trang riêng][x]│
├───────────────────────────────────────────────────────┤
│ HopDong_ThueDat.docx                                  │
│ Trạng thái: (o) Đang xử lý                            │
│                                                       │
│ Tiến độ [1]: [#######.............] 35%               │
│ Đã xử lý [2]: 12/34 đoạn                              │
│ Giai đoạn: Đối chiếu                                  │
│                                                       │
│ (info) Bạn có thể đóng popup, lượt vẫn                │
│ chạy nền; sẽ có thông báo khi xong.                   │
│                                                       │
│               [3][ Hủy yêu cầu ]                      │
└───────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Tiến độ | Progress | ReadOnly | • Phần trăm và giai đoạn hiện tại (Đọc nội dung, Tìm căn cứ, Đối chiếu, Tổng hợp); tự cập nhật. |
| 2 | Số đoạn đã xử lý | Label | ReadOnly | • Dạng "<đã xử lý>/<tổng số đoạn>". Không hiển thị chi phí cho người dùng thường. |
| 3 | Hủy yêu cầu | Button | Click | • Chỉ hiện khi lượt Chờ xử lý hoặc Đang xử lý và người xem là người gửi; hộp xác nhận ngay trong popup như `huy-yeu-cau`. Lượt đã xong, lỗi, hủy → `E-kiem-tra-phap-ly-046`; không phải người gửi → `E-kiem-tra-phap-ly-047`. Mất kết nối hoặc lỗi → `popup-loi-ket-noi`. Hoàn tất → `popup-ket-qua-tom-tat`. |

---

## Screen: popup-ket-qua-tom-tat — Popup: kết quả tóm tắt

### Wireframe (ASCII)

```text
┌───────────────────────────────────────────────────────┐
│ Kết quả kiểm tra                   [Mở trang riêng][x]│
├───────────────────────────────────────────────────────┤
│ HopDong_ThueDat.docx   [Hoàn tất]                     │
│                                                       │
│ [!NT 2] [^Cần chỉnh sửa 5] [iLưu ý 3] [1]             │
│                                                       │
│ Điểm tiêu biểu (tối đa 5) [2]                         │
│ 1. [!] Tr.12 Đ.8  ND 11/2021 Đ.15                     │
│    "Thời hạn cấp phép không quá 3 ngày..."            │
│ 2. [!] Tr.15 Đ.11 Luật QH Đ.41                        │
│    "Không cần thẩm định đối với..."                   │
│ 3. [^] Tr.20 Đ.14 TT 05/2023 Đ.6                      │
│    "Phí thẩm định thu theo..."                        │
│                                                       │
│ [3][ Hỏi đáp ][4][ Trang riêng ][5][ Đóng ]           │
└───────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Số điểm theo mức | Label (3 ô) | ReadOnly | • Nghiêm trọng / Cần chỉnh sửa / Lưu ý; màu và biểu tượng thống nhất với web `[CẦN XÁC NHẬN thiết kế]`. |
| 2 | Danh sách điểm tiêu biểu | Table | Click | • Tối đa 5 điểm mức cao nhất: vị trí, trích đoạn rút gọn (giá trị che ẩn khôi phục cho người gửi), căn cứ. Click điểm → xem chi tiết (vị trí, trích đoạn, căn cứ, giải thích, đề xuất) ngay trong popup, có nút quay lại. Không có điểm vi phạm → "Không phát hiện điểm vi phạm với các văn bản đã đối chiếu". |
| 3 | Hỏi đáp | Button | Click | • Sang `popup-hoi-dap`, ngữ cảnh "Lượt kiểm tra này". |
| 4 | Mở trang riêng | Button | Click | • Mở hệ thống ở cửa sổ khác của trình duyệt, dùng phiên iOffice, tại `ket-qua-kiem-tra` của lượt; từ đó ở lại hệ thống, không quay lại popup. Sang `popup-mo-trang-rieng`. |
| 5 | Đóng | Button | Click | • Đóng popup; kết quả xem lại được ở Lịch sử kiểm tra trên hệ thống. |

---

## Screen: popup-hoi-dap — Popup: hỏi đáp

### Wireframe (ASCII)

```text
┌───────────────────────────────────────────────────────┐
│ Hỏi đáp về kết quả                 [Mở trang riêng][x]│
├───────────────────────────────────────────────────────┤
│ Ngữ cảnh [1]: [v: Lượt kiểm tra này]                  │
│ ---------------------------------------------         │
│ Bạn: Điều 8 khoản 2 vi phạm quy định nào?             │
│ AI: Thời hạn 3 ngày ngắn hơn Điều 15                  │
│     Khoản 1 NĐ 11/2021.                               │
│     Trích dẫn [2]: < ND 11/2021 Đ.15 Tr.7 >           │
│                                                       │
│ Câu hỏi [3] (tối đa 2000 ký tự)                       │
│ [Điều 12 có ngoại lệ không?_______________]           │
│ [4][ Đính kèm tệp ]  BieuMau.pdf < Xóa >              │
│                                                       │
│ [5] < Quay lại kết quả >     [6][ Gửi ]               │
└───────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Ngữ cảnh | Combobox | Select | • Mặc định "Lượt kiểm tra này"; cùng ràng buộc FC-022 (Lĩnh vực, Văn bản trong kho). |
| 2 | Trích dẫn | Link | Click | • Mở văn bản tại đúng điều khoản ngay trong popup (hoặc cửa sổ mới nếu người dùng chọn); ở lại popup (FC-022 BR-08). |
| 3 | Câu hỏi | Textbox nhiều dòng | Text | • **Bắt buộc**, tối đa 2000 ký tự → `E-kiem-tra-phap-ly-059`. Rà soát nhạy cảm như dự thảo, hộp chọn hiện trong popup nếu có phát hiện. |
| 4 | Đính kèm tệp | Upload | Select | • Một tệp mỗi câu hỏi, PDF/Word tối đa 50MB, AI đọc trực tiếp; lỗi → `E-kiem-tra-phap-ly-060`. |
| 5 | Quay lại kết quả | Link | Click | • Về `popup-ket-qua-tom-tat`. |
| 6 | Gửi | Button | Click | • Gọi AI, ghi token và chi phí, tính vào hạn mức; lỗi → `E-kiem-tra-phap-ly-061`. Mất kết nối → thử lại trong khung (không mất hội thoại). Phiên hết hạn → `popup-phien-het-han`. "Mở trang riêng" luôn có ở tiêu đề. |

---

## Screen: popup-phien-het-han — Popup: phiên hết hạn

### Wireframe (ASCII)

```text
┌───────────────────────────────────────────────────────┐
│ Phiên hết hạn                                      [x]│
├───────────────────────────────────────────────────────┤
│                                                       │
│ (!) [1] Phiên iOffice đã hết hạn. Vui lòng            │
│     đăng nhập lại iOffice rồi mở lại cửa              │
│     sổ này.                                           │
│                                                       │
│        [2][ Đăng nhập lại iOffice ]                   │
│                                                       │
└───────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Nội dung thông báo | Label | ReadOnly | • `E-kiem-tra-phap-ly-063` "Phiên iOffice đã hết hạn. Vui lòng đăng nhập lại iOffice rồi mở lại cửa sổ này." Đơn vị chưa đồng bộ, người dùng hoặc đơn vị bị vô hiệu hóa → `E-kiem-tra-phap-ly-064` "Tài khoản hoặc đơn vị của bạn chưa được cấp quyền sử dụng chức năng kiểm tra pháp lý. Vui lòng liên hệ quản trị." |
| 2 | Đăng nhập lại iOffice | Button | Click | • Đóng popup; người dùng đăng nhập lại iOffice rồi mở lại popup. |

---

## Screen: popup-mo-trang-rieng — Popup: mở trang riêng

### Wireframe (ASCII)

```text
┌───────────────────────────────────────────────────────┐
│ Đã mở ở cửa sổ khác                                [x]│
├───────────────────────────────────────────────────────┤
│                                                       │
│ (ok) [1] Hệ thống kiểm tra pháp lý đã mở ở            │
│      cửa sổ mới tại kết quả của lượt này.             │
│                                                       │
│ Từ đây thao tác tiếp trên hệ thống; không             │
│ quay lại popup.                                       │
│                                                       │
│              [2][ Đóng popup ]                        │
└───────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Thông báo chuyển sang hệ thống | Label | ReadOnly | • Người dùng chủ động bấm "Mở trang riêng" ở `popup-ket-qua-tom-tat` hoặc `popup-hoi-dap` thì mở hệ thống ở cửa sổ mới (dùng phiên iOffice) tại `ket-qua-kiem-tra` của lượt; không có đường quay lại popup (FC-024 BR-03). |
| 2 | Đóng popup | Button | Click | • Đóng popup. |

---

## Screen: popup-loi-ket-noi — Popup: lỗi kết nối

### Wireframe (ASCII)

```text
┌───────────────────────────────────────────────────────┐
│ Lỗi kết nối                                        [x]│
├───────────────────────────────────────────────────────┤
│                                                       │
│ (!) [1] Mất kết nối hoặc có lỗi. Bạn có thể           │
│     thử lại.                                          │
│                                                       │
│ Lượt kiểm tra vẫn chạy nền nếu đã được tạo.           │
│                                                       │
│      [2][ Thử lại ]     [3][ Đóng ]                   │
└───────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Nội dung thông báo | Label | ReadOnly | • `E-kiem-tra-phap-ly-066` "Mất kết nối hoặc có lỗi. Bạn có thể thử lại." |
| 2 | Thử lại | Button | Click | • Kiểm tra lại trạng thái lượt (không tạo lượt mới); quay về `popup-dang-xu-ly`. |
| 3 | Đóng | Button | Click | • Đóng popup; lượt vẫn chạy nền, xem sau ở Lịch sử kiểm tra. |

---
