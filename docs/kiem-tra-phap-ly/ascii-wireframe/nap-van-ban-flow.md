# Flow: Nạp văn bản vào kho

> Màn hình thuộc flow này: nap-van-ban → xem-truoc-thong-tin → nap-van-ban-thanh-cong, nap-van-ban-loi, nhap-tay-thong-tin. Flow tổng xem `../srs/kiem-tra-phap-ly-userflow.md` Mục 1. Nguồn mô tả: `../SRS.md` v1.1 (FC-005). Thiết bị: Desktop 1440, bố cục tràn khung hai cột (các bước bên trái, nội dung bên phải).
>
> Màn dùng chung từ flow khác: `trang-chu` [1.7] (điểm vào), `danh-sach-van-ban` [3.1]. Hộp thoại Thêm nguồn ở `gui-du-thao` dùng cùng logic FC-005 nhưng gộp vào một hộp thoại (xem flow kiểm tra pháp lý). Số liệu trong khung chỉ minh họa.

---

## Screen: nap-van-ban — Nạp văn bản (chọn tệp hoặc đường dẫn)

### Wireframe (ASCII)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Gửi dự thảo | Lịch sử kiểm tra | *Kho văn bản                                          (o)3  [An v] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Thêm văn bản vào kho                 │ Nạp văn bản vào kho                                                 │
│ ---------------------------------    │ [Từ tệp][1]   Từ đường dẫn [2]                                      │
│ (>>) 1. Chọn tệp hoặc liên kết       │                                                                     │
│ ( )  2. Kiểm tra thông tin           │ +--------------------------------------------------------------+    │
│ ( )  3. Lưu vào kho                  │ |                                                              |    │
│                                      │ |      Kéo thả tệp vào đây hoặc [ Chọn tệp ]  [3]              |    │
│ Hệ thống tự đọc số hiệu, loại,       │ |      PDF, DOC, DOCX, tối đa 50MB, một tệp mỗi lần            |    │
│ ngày hiệu lực, gợi ý lĩnh vực;       │ |                                                              |    │
│ bạn kiểm tra trước khi lưu.          │ +--------------------------------------------------------------+    │
│                                      │ Đường dẫn [4] (chỉ hiện ở tab Từ đường dẫn)                         │
│                                      │ [https://thuvienphapluat.vn/van-ban/...____________________]        │
│                                      │                                                                     │
│                                      │ (info) Đường dẫn chỉ nhận trang văn bản công khai.                  │
│                                      │                                                                     │
│                                      │                                                                     │
│                                      │                                            [5][ Tiếp tục ]          │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Từ tệp / Từ đường dẫn | Tab | Select | • Hai tab "Từ tệp" / "Từ đường dẫn". Mặc định "Từ tệp". |
| 2 | Tệp văn bản | Upload (kéo thả) | Select | • Chỉ ở tab Từ tệp. **Bắt buộc**, một tệp mỗi lần `[GIẢ ĐỊNH]`; PDF, DOC, DOCX, tối đa 50MB.<br>• Sai định dạng hoặc quá lớn → `E-kiem-tra-phap-ly-013` "Chỉ nhận tệp PDF hoặc Word, tối đa 50MB.", sang `nap-van-ban-loi`. Mất kết nối khi tải → `E-kiem-tra-phap-ly-019` "Tải tệp bị gián đoạn. Vui lòng thử lại.", không lưu dữ liệu nửa chừng. |
| 3 | Đường dẫn | Textbox | Text | • Chỉ ở tab Từ đường dẫn. **Bắt buộc**, tối đa 2000 ký tự, bắt đầu http:// hoặc https://, chỉ nhận trang công khai thuộc nguồn được phép `[CẦN XÁC NHẬN danh sách nguồn]`.<br>• Sai định dạng hoặc ngoài nguồn → `E-kiem-tra-phap-ly-014` "Đường dẫn không hợp lệ hoặc chưa được hỗ trợ." ngay tại ô. |
| 4 | Tiếp tục | Button | Click | • Enable khi đã chọn tệp hoặc nhập đường dẫn hợp lệ. Click → đọc nội dung, nhận dạng ký tự, bóc tách số hiệu, loại, cơ quan, trích yếu, các ngày bằng quy tắc nhận dạng mẫu (không dùng AI) và gợi ý lĩnh vực (FC-026).<br>• Đủ thông tin → `xem-truoc-thong-tin`; thiếu quá nhiều → `nhap-tay-thong-tin` kèm `E-kiem-tra-phap-ly-016`; không đọc được đường dẫn → `nap-van-ban-loi` kèm `E-kiem-tra-phap-ly-015`. |

---

## Screen: xem-truoc-thong-tin — Xem trước thông tin bóc tách

### Wireframe (ASCII)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Gửi dự thảo | Lịch sử kiểm tra | *Kho văn bản                                          (o)3  [An v] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Thêm văn bản vào kho                 │ Kiểm tra thông tin bóc tách từ NghiDinh_11_2021.pdf                 │
│ ---------------------------------    │                                                                     │
│ (ok) 1. Chọn tệp hoặc liên kết       │ Số hiệu (*) [1]       [11/2021/NĐ-CP__________]                     │
│ (>>) 2. Kiểm tra thông tin           │ Loại văn bản (*) [2]  [v: Nghị định      ]                          │
│ ( )  3. Lưu vào kho                  │ Cơ quan ban hành (*)  [v: Chính phủ       ] [3]                     │
│                                      │ Trích yếu (*) [4]     [Quy định về quy hoạch và cấp phép xây dựng]  │
│ Hệ thống tự đọc số hiệu, loại,       │ Ngày văn bản (*) [5] [10/02/2021] Ngày hiệu lực (*) [6] [01/01/2022]│
│ ngày hiệu lực, gợi ý lĩnh vực;       │ Ngày hết hiệu lực [7] [(để trống)_]                                 │
│ bạn kiểm tra trước khi lưu.          │ Lĩnh vực (*) [8]      [v: Quy hoạch, Đất đai (2)] Gợi ý: Quy hoạch  │
│                                      │ Phạm vi sử dụng (*) [9]  (*) Cá nhân ( ) Đơn vị ( ) Một số đơn vị   │
│                                      │ Chọn đơn vị [10]: (chỉ hiện khi chọn Đơn vị hoặc Một số đơn vị)     │
│                                      │ Nguồn: NghiDinh_11_2021.pdf (hoặc đường dẫn, chỉ đọc) [11]          │
│                                      │                                                                     │
│                                      │ [12] < Quay lại >      [13] < Hủy >      [14][ Lưu vào kho ]        │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Số hiệu | Textbox | Text | • **Bắt buộc**, tối đa 100 ký tự. Điền từ kết quả bóc tách; để trống ở `nhap-tay-thong-tin`. Trùng số hiệu và cơ quan ban hành → `E-kiem-tra-phap-ly-018` "Đã có văn bản trùng số hiệu và cơ quan ban hành." cho chọn Lưu bản mới hoặc Hủy, không ghi đè. |
| 2 | Loại văn bản | Combobox | Select | • **Bắt buộc**, danh sách từ danh mục loại văn bản (FC-025), điền sẵn nếu khớp. |
| 3 | Cơ quan ban hành | Combobox | Select | • **Bắt buộc**, danh sách từ danh mục cơ quan ban hành, điền sẵn nếu khớp. |
| 4 | Trích yếu | Textbox nhiều dòng | Text | • **Bắt buộc**, tối đa 1000 ký tự. |
| 5 | Ngày văn bản | DatePicker | Date | • **Bắt buộc**, dd/MM/yyyy, không lớn hơn ngày hiện tại. |
| 6 | Ngày hiệu lực | DatePicker | Date | • **Bắt buộc**, dd/MM/yyyy, không nhỏ hơn Ngày văn bản `[GIẢ ĐỊNH]`. Dùng để tính tình trạng hiệu lực (FC-008 BR-03), không nhập tay tình trạng. |
| 7 | Ngày hết hiệu lực | DatePicker | Date | • Không bắt buộc; để trống = chưa có. Phải lớn hơn Ngày hiệu lực; tự điền nếu bóc tách được. |
| 8 | Lĩnh vực | Combobox nhiều giá trị | Select | • **Bắt buộc**, ít nhất 1. Hiển thị tối đa 3 lĩnh vực gợi ý ở đầu danh sách kèm nhãn "Gợi ý"; mặc định chọn gợi ý đầu tiên (FC-026). |
| 9 | Phạm vi sử dụng | Radio | Select | • Theo vai trò (FC-005 BR-04, BR-05): Người dùng chỉ "Cá nhân"; Quản trị đơn vị thêm "Đơn vị", "Một số đơn vị" (trong đơn vị phụ trách); Quản trị hệ thống thêm "Toàn hệ thống". Mặc định "Cá nhân". Chọn ngoài quyền → `E-kiem-tra-phap-ly-017` "Bạn không có quyền chọn phạm vi này." |
| 10 | Chọn đơn vị | Combobox nhiều giá trị | Select | • Chỉ hiện khi Phạm vi = Đơn vị hoặc Một số đơn vị; **bắt buộc** ít nhất 1, chỉ trong đơn vị đang phụ trách. |
| 11 | Nguồn | Label | ReadOnly | • Tên tệp gốc hoặc đường dẫn nguồn, chỉ đọc. |
| 12 | Quay lại | Link | Click | • Về `nap-van-ban`, giữ dữ liệu bóc tách trong phiên (mất khi đóng trình duyệt hoặc Hủy). |
| 13 | Hủy | Link | Click | • Hủy toàn bộ, bỏ dữ liệu bóc tách, về `nap-van-ban`. |
| 14 | Lưu vào kho | Button | Click | • Kiểm tra trường bắt buộc, quyền phạm vi, trùng số hiệu rồi lưu văn bản, tệp gốc hoặc đường dẫn nguồn, chủ sở hữu; trạng thái "Đang chuẩn bị" (tách Chương, Điều, Khoản chạy nền, FC-005 BR-07). Thành công → `nap-van-ban-thanh-cong`. Lưu văn bản phạm vi Đơn vị do Quản trị đơn vị nạp ghi "Đơn vị tạo" (BR-09). |

---

## Screen: nap-van-ban-thanh-cong — Nạp văn bản thành công

### Wireframe (ASCII)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Gửi dự thảo | Lịch sử kiểm tra | *Kho văn bản                                          (o)3  [An v] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Thêm văn bản vào kho                 │ Đã thêm văn bản vào kho                                             │
│ ---------------------------------    │                                                                     │
│ (ok) 1. Chọn tệp hoặc liên kết       │ (ok) Nghị định 11/2021/NĐ-CP đã được lưu. [1]                       │
│ (ok) 2. Kiểm tra thông tin           │ Trạng thái: Đang chuẩn bị (tách Chương, Điều, Khoản).               │
│ (ok) 3. Lưu vào kho                  │ Văn bản dùng được làm nguồn đối chiếu sau khi chuẩn bị xong;        │
│                                      │ bạn sẽ nhận thông báo nếu chuẩn bị lỗi.                             │
│ Hệ thống tự đọc số hiệu, loại,       │                                                                     │
│ ngày hiệu lực, gợi ý lĩnh vực;       │ Phạm vi: Cá nhân     Lĩnh vực: Quy hoạch, Đất đai                   │
│ bạn kiểm tra trước khi lưu.          │                                                                     │
│                                      │                                                                     │
│                                      │                    [2][ Thêm văn bản khác ]  [3][ Xem kho văn bản ] │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Thông báo kết quả | Label | ReadOnly | • Nêu số hiệu văn bản đã lưu, trạng thái "Đang chuẩn bị" và khi nào dùng được. Chuẩn bị lỗi → "Chuẩn bị lỗi" kèm thông báo "Văn bản <số hiệu> chưa chuẩn bị xong để đối chiếu. Vui lòng mở chi tiết và thử lại." |
| 2 | Thêm văn bản khác | Button | Click | • Về `nap-van-ban` trống. |
| 3 | Xem kho văn bản | Button | Click | • Sang `danh-sach-van-ban` (flow kho văn bản). |

---

## Screen: nap-van-ban-loi — Nạp văn bản lỗi

### Wireframe (ASCII)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Gửi dự thảo | Lịch sử kiểm tra | *Kho văn bản                                          (o)3  [An v] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Thêm văn bản vào kho                 │ Không nạp được văn bản                                              │
│ ---------------------------------    │                                                                     │
│ (>>) 1. Chọn tệp hoặc liên kết       │ (!) [1] Chỉ nhận tệp PDF hoặc Word, tối đa 50MB.          (lỗi tệp) │
│ ( )  2. Kiểm tra thông tin           │ (!) [1] Không đọc được nội dung từ đường dẫn. Bạn có thể chọn       │
│ ( )  3. Lưu vào kho                  │     lại hoặc nhập tay thông tin.                    (lỗi đường dẫn) │
│                                      │                                                                     │
│ Hệ thống tự đọc số hiệu, loại,       │ Chỉ hiện một thông báo theo nguyên nhân (hai dòng trên là minh họa).│
│ ngày hiệu lực, gợi ý lĩnh vực;       │                                                                     │
│ bạn kiểm tra trước khi lưu.          │                                                                     │
│                                      │                [2][ Chọn lại ]      [3][ Nhập tay thông tin ]       │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Thông báo lỗi | Label | ReadOnly | • Nêu đúng nguyên nhân. Tệp sai định dạng hoặc quá lớn → `E-kiem-tra-phap-ly-013`. Không đọc được từ đường dẫn (không truy cập được, hết thời gian chờ, trang không có nội dung văn bản) → `E-kiem-tra-phap-ly-015`. Chi tiết kỹ thuật chỉ ghi log. |
| 2 | Chọn lại | Button | Click | • Về `nap-van-ban`, giữ nguyên tab đang dùng. |
| 3 | Nhập tay thông tin | Button | Click | • Chỉ hiện khi lỗi đọc nội dung (không hiện khi sai định dạng hoặc quá lớn). Sang `nhap-tay-thong-tin`. |

---

## Screen: nhap-tay-thong-tin — Nhập tay thông tin văn bản

### Wireframe (ASCII)

> Cùng bố cục với `xem-truoc-thong-tin`, các ô để trống hoặc điền phần đã bóc tách được.

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Gửi dự thảo | Lịch sử kiểm tra | *Kho văn bản                                          (o)3  [An v] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Thêm văn bản vào kho                 │ Nhập tay thông tin văn bản                                          │
│ ---------------------------------    │                                                                     │
│ (ok) 1. Chọn tệp hoặc liên kết       │ Số hiệu (*) [1]       [_________________________]                   │
│ (>>) 2. Kiểm tra thông tin           │ Loại văn bản (*) [2]  [v: -- Chọn --      ]                         │
│ ( )  3. Lưu vào kho                  │ Cơ quan ban hành (*)  [v: -- Chọn --       ] [3]                    │
│                                      │ Trích yếu (*) [4]     [____________________________________]        │
│ Hệ thống tự đọc số hiệu, loại,       │ Ngày văn bản (*) [5] [__/__/____] Ngày hiệu lực (*) [6] [__/__/____]│
│ ngày hiệu lực, gợi ý lĩnh vực;       │ Ngày hết hiệu lực [7] [(để trống)_]                                 │
│ bạn kiểm tra trước khi lưu.          │ Lĩnh vực (*) [8]      [v: Quy hoạch, Đất đai (2)] Gợi ý: Quy hoạch  │
│                                      │ Phạm vi sử dụng (*) [9]  (*) Cá nhân ( ) Đơn vị ( ) Một số đơn vị   │
│                                      │ Chọn đơn vị [10]: (chỉ hiện khi chọn Đơn vị hoặc Một số đơn vị)     │
│                                      │ Nguồn: NghiDinh_11_2021.pdf (hoặc đường dẫn, chỉ đọc) [11]          │
│                                      │                                                                     │
│                                      │ [12] < Quay lại >      [13] < Hủy >      [14][ Lưu vào kho ]        │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Số hiệu | Textbox | Text | • **Bắt buộc**, tối đa 100 ký tự; để trống vì không bóc tách được (`E-kiem-tra-phap-ly-016` "Không tự nhận dạng được thông tin văn bản. Vui lòng nhập tay."). Trường nào bóc tách được thì điền sẵn. |
| 2 | Các trường còn lại | Như màn xem-truoc-thong-tin | - | • Loại văn bản, Cơ quan ban hành, Trích yếu, Ngày văn bản, Ngày hiệu lực, Ngày hết hiệu lực, Lĩnh vực, Phạm vi sử dụng, Chọn đơn vị: cùng ràng buộc như `xem-truoc-thong-tin` (xem màn đó). |
| 3 | Nhập đủ rồi lưu | Button | Click | • Lưu vào kho như `xem-truoc-thong-tin`; thiếu trường bắt buộc hoặc ngày sai → `E-kiem-tra-phap-ly-017`. |
| 4 | Hủy | Link | Click | • Về `nap-van-ban`. |

---
