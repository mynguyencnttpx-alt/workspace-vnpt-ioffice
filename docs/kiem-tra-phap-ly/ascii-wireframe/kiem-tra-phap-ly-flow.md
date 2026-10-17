# Flow: Gửi dự thảo kiểm tra pháp lý

> Màn hình thuộc flow này: gui-du-thao → them-nguon → xem-truoc-ban-gui → dang-xu-ly (gồm trạng thái lỗi) → huy-yeu-cau. Flow tổng xem `../srs/kiem-tra-phap-ly-userflow.md` Mục 1. Nguồn mô tả: `../SRS.md` v1.1 (FC-005 BR-10, FC-012 đến FC-016). Thiết bị: Desktop 1440, bố cục hai cột tràn khung (nguồn bên trái, thông tin bên phải).
>
> Màn dùng chung từ flow khác: `trang-chu` [1.7] (điểm vào), `danh-sach-luot-kiem-tra` và `ket-qua-kiem-tra` của flow `ket-qua-kiem-tra-flow`. Màn cũ đã gộp: tom-luoc-du-thao, xu-ly-nhay-cam (vào gui-du-thao), kiem-tra-loi (vào dang-xu-ly). Số liệu trong khung chỉ minh họa.

---

## Screen: gui-du-thao — Gửi dự thảo (nguồn bên trái, thông tin bên phải)

### Wireframe (ASCII)

> Trạng thái chưa tải tệp: cột phải chỉ hiện vùng kéo thả và nút Bắt đầu kiểm tra bị khóa; không hiện tóm lược và bảng nhạy cảm.

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   *Gửi dự thảo | Lịch sử kiểm tra | Kho văn bản                                          (o)3  [An v] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Nguồn đối chiếu [+ Thêm nguồn][1]    │ Gửi dự thảo kiểm tra pháp lý                                        │
│ [Tất cả][Cá nhân][Đơn vị][Chung][2]  │ (!) [8] Tài khoản đã dùng 82% hạn mức tháng. Bạn vẫn có thể gửi.    │
│   18/24     4/5     9/12    5/7      │                                                                     │
│ [Tìm văn bản nguồn_______][3]        │ Tệp dự thảo (*) [9]                                                 │
│ [v: Quy hoạch, Đất đai (2)][4]       │ (ok) DuThao_NghiDinh_QuyHoachDoThi.docx 2,4 MB   < Đổi tệp >        │
│ Ngày xét [16/10/2026_____][5]        │ Tên lượt [10]: [DuThao_NghiDinh_QuyHoachDoThi____]                  │
│ [x] Chọn tất cả   18 được chọn [6]   │ Đơn vị tính chi phí (*) [11]: [v: Sở TN&MT]  (Quản trị HT)          │
│ ---------------------------------    │                                                                     │
│ [x] NĐ 11/2021/NĐ-CP     Đơn vị      │ Tóm lược [12]: 42 trang | Nghị định | 18 nguồn | Rà soát: Bật       │
│ [x] Luật QH đô thị 2009  Chung       │                                                                     │
│ [x] Luật Đất đai 2024    Chung       │ Dữ liệu nhạy cảm: 5 loại [13]                                       │
│ [x] TT 05/2023/TT-BXD    Đơn vị      │ [14][ Che ẩn tất cả ] [ Cho phép tất cả ]                           │
│ [x] QĐ 28/2022/QĐ-UBND   Cá nhân     │ Loại          Giá trị       SL Trang Cách xử lý [15]                │
│ [ ] NĐ 37/2019 (hết hiệu lực)        │ CCCD          012*****789    2 3,7   (*)Che ẩn ( )Cho phép ( )Xóa   │
│ [ ] Luật XD 2014 (Đang chuẩn bị)     │ Số tài khoản  190***4521     1 8     (*)Che ẩn ( )Cho phép ( )Xóa   │
│ ... (cuộn xem thêm)           [7]    │ Điện thoại    09*****321     1 5     (*)Che ẩn ( )Cho phép ( )Xóa   │
│                                      │ Email         a***@vnpt.vn   3 1,2   ( )Che ẩn (*)Cho phép ( )Xóa   │
│                                      │ Họ tên        Nguyễn V. A    4 1-3   (*)Che ẩn ( )Cho phép ( )Xóa   │
│                                      │                                                                     │
│                                      │                                                                     │
├──────────────────────────────────────┴─────────────────────────────────────────────────────────────────────┤
│ 18 nguồn | 5 mục NC | Gửi OpenAI (nước ngoài), che ẩn 4 [16]  [17][ Xem bản gửi ] [18][ Bắt đầu kiểm tra ] │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Thêm nguồn | Button | Click | • Mở hộp thoại `them-nguon` (FC-005 BR-10). Mọi vai trò đều thêm được; phạm vi sử dụng trong hộp thoại phụ thuộc vai trò. |
| 2 | Tab kho | Tab | Select | • Bốn tab: Tất cả (mặc định), Kho cá nhân, Kho đơn vị, Kho dùng chung; kèm "<đã chọn>/<tổng>". Tab nào người dùng không có quyền thì ẩn.<br>• Bộ lọc lĩnh vực và ngày xét áp cho mọi tab; tích ở tab nào thì tab Tất cả phản ánh cùng một tập văn bản được chọn. |
| 3 | Tìm văn bản nguồn | Textbox | Text | • Tối đa 200 ký tự, tìm tương đối theo tên, số hiệu, trích yếu trong tab đang xem. |
| 4 | Lĩnh vực cần đối chiếu | Combobox nhiều giá trị | Select | • **Bắt buộc**, ít nhất 1. Đổi lĩnh vực thì danh sách nguồn lọc lại ngay (FC-012 BR-01). |
| 5 | Ngày xét hiệu lực | DatePicker | Date | • Mặc định ngày hiện tại, sửa được (dd/MM/yyyy). Văn bản chỉ vào danh sách khi Ngày hiệu lực ≤ ngày này và (không có Ngày hết hiệu lực hoặc ngày này < Ngày hết hiệu lực). |
| 6 | Chọn tất cả | Checkbox | Check | • Áp cho tab đang xem; số "được chọn" ở chân cột là tổng của mọi tab. Phải còn ít nhất 1 văn bản được tích, nếu không → `E-kiem-tra-phap-ly-038` khi bắt đầu. |
| 7 | Danh sách văn bản nguồn | Checkbox mỗi dòng | Check | • Mỗi dòng: tên, số hiệu, tình trạng hiệu lực, nhãn kho. Mặc định tích hết văn bản đủ điều kiện, bỏ tích từng văn bản được (FC-012 BR-08), không đổi nội dung kho.<br>• Văn bản "Đang chuẩn bị" hoặc "Chuẩn bị lỗi" hiển thị mờ, không tích được (BR-10); chuẩn bị xong tự dùng được và có thông báo. |
| 8 | Cảnh báo hạn mức | Label | ReadOnly | • Chỉ hiện khi tài khoản hoặc đơn vị đạt 80% (cảnh báo) hoặc vượt 100% (đỏ). Người dùng thường chỉ thấy phần trăm, không thấy số tiền. Không chặn gửi trừ khi hạn mức đặt "Chặn gửi" → `E-kiem-tra-phap-ly-040` "Đã vượt hạn mức sử dụng của <đơn vị/tài khoản>. Vui lòng liên hệ quản trị." |
| 9 | Tệp dự thảo | Upload (kéo thả) | Select | • **Bắt buộc**, một tệp mỗi lần; PDF, DOC, DOCX; tối đa 50MB. Tải xong hệ thống kiểm tra và tự quét nhạy cảm (BR-09), hiện tóm lược và bảng nhạy cảm ngay bên dưới, không chuyển màn.<br>• Sai định dạng hoặc quá 50MB → `E-kiem-tra-phap-ly-036` "Chỉ nhận tệp PDF hoặc Word, tối đa 50MB." Không đọc được → `E-kiem-tra-phap-ly-037` "Không đọc được nội dung dự thảo. Vui lòng đổi tệp khác." Mất kết nối → `E-kiem-tra-phap-ly-041`. |
| 10 | Tên lượt kiểm tra | Textbox | Text | • Không bắt buộc, tối đa 200 ký tự. Mặc định lấy tên tệp bỏ phần mở rộng. |
| 11 | Đơn vị tính chi phí | Combobox | Select | • Chỉ hiện với Quản trị hệ thống; **bắt buộc**, 1 đơn vị đang hoạt động (FC-012 BR-07). Đơn vị chưa có nhà cung cấp AI mặc định → `E-kiem-tra-phap-ly-039` "Đơn vị chưa được cấu hình nhà cung cấp AI. Vui lòng liên hệ quản trị." |
| 12 | Tóm lược dự thảo | Label | ReadOnly | • Số trang, loại văn bản nhận dạng bằng quy tắc nhận dạng mẫu (không dùng AI; có thể "Chưa xác định"), số nguồn đã chọn, chế độ rà soát nhạy cảm "Bật/Tắt" theo nhà cung cấp AI mặc định của đơn vị, người dùng không tự đổi. |
| 13 | Bảng dữ liệu nhạy cảm | Table | ReadOnly | • Chỉ hiện khi rà soát bật và có phát hiện (quét tự động ngay sau khi tải tệp, chưa gửi gì ra ngoài). Cột: Loại, Giá trị che một phần, Số lần, Trang, Cách xử lý; một giá trị nhiều trang chỉ một dòng.<br>• Quét lỗi (hỏng tệp, quá thời gian) → dừng, không gửi AI, `E-kiem-tra-phap-ly-043` "Không rà soát được dữ liệu nhạy cảm nên chưa thể gửi. Vui lòng thử lại." |
| 14 | Che ẩn tất cả / Cho phép tất cả | Button | Click | • Đặt cùng một cách xử lý cho mọi dòng, vẫn chỉnh từng dòng sau đó. |
| 15 | Cách xử lý | Radio mỗi dòng | Select | • Cho phép gửi / Che ẩn / Xóa; mặc định theo quy tắc (nhiều quy tắc khớp → hạn chế nhất: Xóa > Che ẩn > Cho phép). Che ẩn: thay bằng mã tạm `[LOẠI_n]`, khôi phục khi hiển thị kết quả cho người gửi. Xóa: loại khỏi bản gửi, không khôi phục.<br>• Còn dòng chưa chọn khi bắt đầu → `E-kiem-tra-phap-ly-042` "Vui lòng chọn cách xử lý cho tất cả dữ liệu nhạy cảm.", tô nổi dòng thiếu. |
| 16 | Thanh hành động (tóm tắt) | Label | ReadOnly | • Nêu số nguồn, số mục nhạy cảm đã chọn cách xử lý, nhà cung cấp AI nhận dữ liệu và số mục che ẩn; đây là lời xác nhận thay cho màn xác nhận gửi riêng. |
| 17 | Xem bản gửi | Button | Click | • Tùy chọn. Mở ngăn xem trước `xem-truoc-ban-gui`; không bắt buộc ở mọi trường hợp. |
| 18 | Bắt đầu kiểm tra | Button | Click | • Enable khi có tệp đọc được, ít nhất 1 nguồn được tích và mọi dòng nhạy cảm đã có cách xử lý. Hai lần bấm chỉ tạo một lượt.<br>• Nguồn rỗng → `E-kiem-tra-phap-ly-038` "Kho văn bản chưa có văn bản phù hợp với lĩnh vực đã chọn. Vui lòng chọn lĩnh vực hoặc kho khác, hoặc thêm văn bản vào kho." Click → tạo lượt "Chờ xử lý", sang `dang-xu-ly`. Rời trang trước khi bấm: chưa tạo lượt, tệp tạm xóa sau 24 giờ `[GIẢ ĐỊNH]`. |

---

## Screen: them-nguon — Thêm nguồn đối chiếu (hộp thoại một màn)

### Wireframe (ASCII)

> Hộp thoại phủ lên `gui-du-thao`. Hình minh họa vai trò Quản trị đơn vị; người dùng thường chỉ thấy lựa chọn "Cá nhân" và không có ô Chọn đơn vị.

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Thêm nguồn đối chiếu                                                           (x) [0]                 │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Chọn một tệp hoặc dán liên kết công khai; thông tin bóc tách hiện bên dưới để bạn kiểm tra và chỉnh.   │
│                                                                                                        │
│ Tải tệp (một tệp mỗi lần) [1]              hoặc     Liên kết web (trang công khai) [2]                 │
│ (ok) NghiDinh_11_2021.pdf 1,8 MB                    [https://thuvienphapluat.vn/van-ban/...___]        │
│ < Đổi tệp >  PDF, Word, tối đa 50MB                  [ Lấy nội dung ]                                  │
│                                                                                                        │
│ Thông tin bóc tách từ NghiDinh_11_2021.pdf (kiểm tra và chỉnh nếu chưa đúng) [3]                       │
│ Số hiệu (*)          Loại văn bản (*)       Cơ quan ban hành (*)                                       │
│ [11/2021/NĐ-CP___]   [v: Nghị định  ]       [v: Chính phủ    ]                                         │
│ Ngày văn bản (*)     Ngày hiệu lực (*)      Ngày hết hiệu lực                                          │
│ [10/02/2021_____]    [01/01/2022_____]      [(để trống)_____]                                          │
│ Trích yếu (*): [Quy định về quy hoạch và cấp phép xây dựng đô thị________________]                     │
│ Lĩnh vực (*) [v: Quy hoạch, Đất đai (2)]  Gợi ý: Quy hoạch                                             │
│                                                                                                        │
│ Phạm vi sử dụng (*) [4]            Vai trò của bạn: Quản trị đơn vị                                    │
│ ( ) Cá nhân  ( ) Đơn vị  (*) Một số đơn vị  ( ) Toàn hệ thống (dùng chung - mờ)                        │
│ Chọn đơn vị (*) [5]: [v: Sở TN&MT, Sở Xây dựng (2)]                                                    │
│                                                                                                        │
│ (info) Trùng số hiệu và cơ quan ban hành sẽ được cảnh báo trước khi lưu.                               │
│                                                                                                        │
│                                                  [6] < Hủy >    [7] [ Lưu vào kho ]                    │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Tải tệp | Upload | Select | • Một tệp mỗi lần, PDF/DOC/DOCX, tối đa 50MB (FC-005). Chọn tệp thì hệ thống bóc tách ngay bằng nhận dạng ký tự và quy tắc nhận dạng mẫu (không dùng AI) và hiện thông tin bên dưới.<br>• Sai định dạng hoặc quá lớn → `E-kiem-tra-phap-ly-013` "Chỉ nhận tệp PDF hoặc Word, tối đa 50MB." ngay trong hộp thoại; mất kết nối → `E-kiem-tra-phap-ly-019`. |
| 2 | Liên kết web | Textbox + Button | Text | • Tối đa 2000 ký tự, bắt đầu http:// hoặc https://, **chỉ nhận trang văn bản công khai** (không cần đăng nhập). Nút Lấy nội dung đọc trang và bóc tách.<br>• Sai định dạng, không công khai hoặc ngoài nguồn được phép → `E-kiem-tra-phap-ly-014`; không đọc được → `E-kiem-tra-phap-ly-015`. Chọn tệp thì ô liên kết bị khóa và ngược lại (một nguồn mỗi lần). |
| 3 | Thông tin bóc tách | Textbox, Combobox, DatePicker | Text | • Số hiệu, Loại, Cơ quan, Trích yếu, Ngày văn bản, Ngày hiệu lực **bắt buộc**; Ngày hết hiệu lực tùy chọn (như màn xem-truoc-thong-tin của FC-005). Trường không bóc tách được để trống cho nhập ngay tại hộp thoại (BR-11).<br>• Thiếu hoặc ngày sai → `E-kiem-tra-phap-ly-017`. Trùng số hiệu và cơ quan ban hành → `E-kiem-tra-phap-ly-018`, chọn Lưu bản mới hoặc Hủy. |
| 4 | Phạm vi sử dụng | Radio | Select | • Theo vai trò: Người dùng chỉ "Cá nhân"; Quản trị đơn vị thêm "Đơn vị", "Một số đơn vị" trong đơn vị phụ trách; Quản trị hệ thống thêm "Toàn hệ thống" (dùng chung). Mặc định "Cá nhân"; lựa chọn ngoài quyền hiện mờ, chọn không được (FC-005 BR-04, BR-05).<br>• Chọn ngoài quyền → `E-kiem-tra-phap-ly-017` "Bạn không có quyền chọn phạm vi này." |
| 5 | Chọn đơn vị | Combobox nhiều giá trị | Select | • Chỉ hiện khi Phạm vi = Đơn vị hoặc Một số đơn vị; **bắt buộc** ít nhất 1, chỉ trong đơn vị đang phụ trách. |
| 6 | Hủy | Link | Click | • Đóng hộp thoại, bỏ dữ liệu bóc tách, quay về `gui-du-thao`. |
| 7 | Lưu vào kho | Button | Click | • Kiểm tra trường bắt buộc, quyền phạm vi, trùng số hiệu rồi lưu; văn bản ở trạng thái "Đang chuẩn bị" (tách Chương, Điều, Khoản chạy nền), hiện trong danh sách nguồn của `gui-du-thao` nhưng chưa tích được cho tới khi xong (FC-012 BR-10). Lỗi chuẩn bị → thông báo `Chuẩn bị lỗi` theo FC-005. |

---

## Screen: xem-truoc-ban-gui — Xem trước bản gửi (ngăn kéo bên phải, tùy chọn)

### Wireframe (ASCII)

> Ngăn kéo mở từ cạnh phải `gui-du-thao`, che cột thông tin; nền còn lại làm mờ.

```text
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│ Bản sẽ gửi nhà cung cấp AI [1]                                 Trang 3/42 [2]   (x)      │
├──────────────────────────────────────────────────────────────────────────────────────────┤
│ Chỉ đọc. {...} = mục che ẩn; mục đã xóa không còn trong bản gửi.                         │
│ Tóm tắt [3]: 5 mục | Che ẩn 4 | Cho phép 1 | Xóa 0                                       │
│                                                                                          │
│ Điều 5. Người đại diện: {HOTEN_1}, CCCD {CCCD_1}, điện thoại {SDT_1}.                    │
│ Địa chỉ liên hệ: 12 Nguyễn Trãi, Hà Nội. Email: a***@vnpt.vn (cho phép).                 │
│ Điều 6. Bên B cung cấp {STK_1} để thực hiện thanh toán theo thỏa thuận ...               │
│ ...                                                                                      │
│                                                                                          │
│ < Trang trước >  < Trang sau >                              [4] [ Quay lại chỉnh ]       │
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Nội dung sẽ gửi | Label (vùng đọc) | ReadOnly | • Bản dự thảo sau xử lý nhạy cảm: mục che ẩn thay bằng mã tạm và tô nổi, mục xóa không còn, mục cho phép giữ nguyên. Chỉ đọc, không sửa nội dung ở đây. |
| 2 | Số trang | Pager | Click | • Duyệt từng trang của bản gửi (trang x/tổng). |
| 3 | Tóm tắt | Label | ReadOnly | • Số mục theo từng cách xử lý (Che ẩn, Cho phép, Xóa). |
| 4 | Quay lại chỉnh | Button | Click | • Đóng ngăn về `gui-du-thao`, giữ nguyên lựa chọn nhạy cảm. Ngăn là tùy chọn: người dùng bắt đầu kiểm tra được mà không mở ngăn này (FC-013 BR-02). |

---

## Screen: dang-xu-ly — Đang xử lý (văn bản đã được tham chiếu bên trái, gồm trạng thái lỗi)

### Wireframe (ASCII)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   *Gửi dự thảo | Lịch sử kiểm tra | Kho văn bản                                          (o)3  [An v] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Văn bản đã được tham chiếu [1]       │ Đang kiểm tra pháp lý        Trạng thái: (o) Đang xử lý             │
│ [Tất cả][Cá nhân][Đơn vị][Chung]     │ DuThao_NghiDinh_QuyHoachDoThi.docx | 42 trang | gửi lúc 09:15       │
│ ---------------------------------    │                                                                     │
│ NĐ 11/2021    14 đoạn | 2 điểm       │ Tiến độ [3]: [##########..........] 52%                             │
│ Luật QH 2009   6 đoạn | 1 điểm       │ Giai đoạn [4]: (ok)Đọc > (ok)Tìm căn cứ > (>>)Đối chiếu > Tổng hợp  │
│ Luật Đất đai   9 đoạn | 0 điểm [2]   │ Đã xử lý [5]: 31/60 đoạn                                            │
│ TT 05/2023     2 đoạn | 1 điểm       │                                                                     │
│ QĐ 28/2022     chưa tham chiếu       │ Điểm vi phạm phát hiện đến nay: 4 [6]                               │
│ TT 12/2020     chưa tham chiếu       │ [!] Nghiêm trọng  Tr.12 Đ.8   ND 11/2021 Đ.15                       │
│ ...                                  │ [!] Nghiêm trọng  Tr.15 Đ.11  Luật QH Đ.41                          │
│                                      │ [^] Cần chỉnh sửa Tr.20 Đ.14  TT 05/2023 Đ.6                        │
│                                      │ [i] Lưu ý         Tr.31 Đ.22  ND 11/2021 Đ.9                        │
│                                      │                                                                     │
│                                      │ Đoạn đang đối chiếu [7] (Trang 21)                                  │
│                                      │ "Điều 15. Thời hạn cấp phép xây dựng không quá 3 ngày làm việc ..." │
├──────────────────────────────────────┴─────────────────────────────────────────────────────────────────────┤
│ (info) [8] Có thể rời trang, lượt vẫn chạy nền.             [9][ Hủy yêu cầu ] [10][ Rời trang, chạy nền ] │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

```text
┌────────────────────────────────────────────────────────────────────────────────────────────┐
│ Trạng thái lỗi của màn Đang xử lý (thay cho màn Kiểm tra lỗi cũ)                           │
├────────────────────────────────────────────────────────────────────────────────────────────┤
│ (!) [11] Chưa xử lý xong do lỗi từ nhà cung cấp AI. Bạn có thể chạy lại, hệ thống chỉ      │
│     xử lý phần chưa xong.                                                                  │
│ Phần đã hoàn thành [12]: 31/60 đoạn          Số lần chạy lại còn lại [13]: 3               │
│                                                                                            │
│                                         [14][ Đổi tệp ]   [15][ Chạy lại ]                 │
└────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Văn bản đã được tham chiếu | Label (danh sách) | ReadOnly | • Cột trái chỉ đọc: cùng danh sách nguồn đã tích của lượt; mỗi dòng nêu số đoạn dự thảo đã đối chiếu với văn bản đó và số điểm vi phạm tìm thấy đến nay, tăng dần theo tiến độ. Văn bản chưa được tham chiếu hiển thị mờ. Không có trạng thái Đang đối chiếu hay Xong theo từng văn bản vì đối chiếu chạy theo từng đoạn dự thảo `[CẦN XÁC NHẬN khả thi kỹ thuật]`. |
| 2 | Chi tiết tham chiếu | Link | Click | • Bấm vào một văn bản để xem các điều khoản đã được dùng cho lượt này (không rời màn, chỉ đọc). |
| 3 | Tiến độ | Progress | ReadOnly | • Phần trăm, tự cập nhật không cần tải lại trang. |
| 4 | Giai đoạn | Label | ReadOnly | • Bốn giai đoạn: Đọc nội dung, Tìm căn cứ, Đối chiếu, Tổng hợp; giai đoạn hiện tại được đánh dấu. |
| 5 | Đã xử lý | Label | ReadOnly | • Số đoạn đã xử lý trên tổng. Người dùng thường không thấy chi phí. |
| 6 | Điểm vi phạm phát hiện đến nay | Label (danh sách) | ReadOnly | • Thêm dần khi xử lý: mức độ, vị trí, căn cứ. Chỉ đọc, không đánh giá ở đây `[CẦN XÁC NHẬN khả thi kỹ thuật]`; nếu không làm được thì ẩn khối này. |
| 7 | Đoạn dự thảo đang đối chiếu | Label | ReadOnly | • Trích đoạn đang được so, kèm số trang. Giá trị che ẩn hiển thị giá trị gốc cho người gửi. |
| 8 | Ghi chú rời trang | Label | ReadOnly | • Người dùng rời trang, lượt vẫn chạy nền; hoàn tất → tự chuyển sang `ket-qua-kiem-tra` nếu còn ở màn này; lỗi → hiện trạng thái lỗi của chính màn này. |
| 9 | Hủy yêu cầu | Button | Click | • Chỉ hiện khi lượt Chờ xử lý hoặc Đang xử lý và người xem là người gửi. Click → hộp thoại `huy-yeu-cau`. Lượt đã hoàn tất, lỗi, hủy → `E-kiem-tra-phap-ly-046` "Lượt kiểm tra này không còn ở trạng thái có thể hủy."; không phải người gửi → `E-kiem-tra-phap-ly-047` "Bạn không có quyền hủy lượt kiểm tra này." |
| 10 | Rời trang, chạy nền | Button | Click | • Sang `danh-sach-luot-kiem-tra`; lượt hiển thị "Đang xử lý" kèm phần trăm, mở lại được màn này. |
| 11 | Thông báo lỗi | Label | ReadOnly | • Lỗi nhà cung cấp AI (hết giờ, 429 hoặc 5xx, sai định dạng sau các lần thử lại) → `E-kiem-tra-phap-ly-044` "Chưa xử lý xong do lỗi từ nhà cung cấp AI. Bạn có thể chạy lại." Chi tiết kỹ thuật chỉ ghi log. |
| 12 | Phần đã hoàn thành | Label | ReadOnly | • Số đoạn đã xử lý trên tổng; phần đã xong được giữ để chạy lại tiếp. |
| 13 | Số lần chạy lại còn lại | Label | ReadOnly | • Tối đa 3 lần cho một lượt `[CẦN XÁC NHẬN]` (FC-016 BR-02). Hết lần → ẩn Chạy lại, yêu cầu gửi lại dự thảo. |
| 14 | Đổi tệp | Button | Click | • Sang `gui-du-thao` để gửi tệp khác; lượt lỗi vẫn giữ trong danh sách. |
| 15 | Chạy lại | Button | Click | • Chỉ lượt "Lỗi" của chính người gửi → ngược lại `E-kiem-tra-phap-ly-048` "Chỉ chạy lại được lượt bị lỗi của chính bạn." Nhà cung cấp AI của đơn vị ngừng hoặc mất cấu hình → `E-kiem-tra-phap-ly-049` "Nhà cung cấp AI của đơn vị hiện không khả dụng. Vui lòng liên hệ quản trị."<br>• Hợp lệ → lượt về "Chờ xử lý", chỉ xử lý đoạn chưa xong, dùng lại lựa chọn nhạy cảm; chi phí cộng dồn vào lượt. |

---

## Screen: huy-yeu-cau — Hủy yêu cầu kiểm tra (hộp thoại)

### Wireframe (ASCII)

> Hộp thoại phủ lên `dang-xu-ly`.

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ Hủy yêu cầu kiểm tra                                              (x)      │
├────────────────────────────────────────────────────────────────────────────┤
│ Bạn chắc chắn muốn hủy lượt "DuThao_NghiDinh_QuyHoachDoThi"?               │
│                                                                            │
│ Đã xử lý [1]: 31/60 đoạn                                                   │
│ Chi phí đã phát sinh [2]: 18.400 đ  (chỉ hiện nếu người gửi là Quản trị)   │
│ (!) Lượt đã hủy không chạy lại được, cần gửi lại dự thảo.                  │
│                                                                            │
│                                 [3] < Không hủy >   [4] [ Xác nhận hủy ]   │
└────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Đã xử lý | Label | ReadOnly | • Số đoạn đã xử lý trên tổng tại thời điểm mở hộp thoại. |
| 2 | Chi phí đã phát sinh | Label | ReadOnly | • Chỉ hiện khi người gửi là Quản trị đơn vị hoặc Quản trị hệ thống. Để trống (không ghi 0) khi thiếu token hoặc đơn giá. Hủy vẫn tính phần chi phí đã phát sinh. |
| 3 | Không hủy | Link | Click | • Đóng hộp thoại, về `dang-xu-ly`, lượt tiếp tục chạy. |
| 4 | Xác nhận hủy | Button | Click | • Dừng xử lý sau cặp đang chạy; lượt "Đã hủy", giữ phần đã xử lý và chi phí; sang `danh-sach-luot-kiem-tra`. Lượt đã hoàn tất đúng lúc bấm → `E-kiem-tra-phap-ly-046`, giữ kết quả. Ghi log người hủy, thời gian, tiến độ. |

---
