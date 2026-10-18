# Flow: Quản lý kho văn bản

> Màn hình thuộc flow này: danh-sach-van-ban → chi-tiet-van-ban → noi-dung-van-ban, sua-thong-tin-van-ban, doi-pham-vi-van-ban, huy-van-ban. Flow tổng xem `../srs/kiem-tra-phap-ly-userflow.md` Mục 1. Nguồn mô tả: `../SRS.md` v1.1 (FC-006 đến FC-010). Thiết bị: Desktop 1440, bố cục tràn khung.
>
> Màn dùng chung từ flow khác: `trang-chu` [1.7], `truy-cap-bi-tu-choi` [1.10], `nap-van-ban` [2.1]; `noi-dung-van-ban` còn được mở từ `ket-qua-kiem-tra` và `hoi-dap-web`. Trạng thái rỗng, nhãn trạng thái là trạng thái của màn, không tách màn riêng. Số liệu trong khung chỉ minh họa.

---

## Screen: danh-sach-van-ban — Danh sách văn bản pháp lý (toàn màn hình)

### Wireframe (ASCII)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Gửi dự thảo | Lịch sử kiểm tra | *Kho văn bản                                          (o)3  [An v] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Kho văn bản pháp lý                                                                  [1][ + Thêm văn bản ] │
│ Số hiệu, trích yếu [2]  [________________________________________________________________________________] │
│ [v: Lĩnh vực][3]      [v: Loại][4]          [v: Cơ quan][5]       [v: Tình trạng][6]    [v: Phạm vi][7]    │
│ [ ] Chỉ hiện văn bản cần rà soát [8]                                                      [9][ Tìm kiếm ]  │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Số hiệu         Trích yếu                Loại      Cơ quan  Hiệu lực   Lĩnh vực  Phạm vi  Tình trạng   [10]│
│ --------------------------------------------------------------------------------------------------------   │
│ 11/2021/NĐ-CP   Quy định về quy hoạch... Nghị định Chính... 01/01/2022 QH, Đấ... Đơn vị   Còn hiệu lực     │
│ 05/2023/TT-BXD  Hướng dẫn thẩm định đ... Thông tư  Bộ XD    15/06/2023 QH        Đơn vị   Còn hiệu lực     │
│ 31/2024/QH15    Luật Đất đai (sửa đổi)   Luật      Quốc hội 01/08/2024 Đất đai   Hệ thống Còn hiệu lực     │
│ 37/2019/NĐ-CP   Quy định chi tiết thi... Nghị định Chính... 01/07/2019 QH        Cá nhân  Hết hiệu lực     │
│ 28/2022/QĐ-UBND Quy định về cấp phép ... Quyết ... UBND     10/05/2022 QH        Cá nhân  Đang chuẩ...     │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Hiển thị 1-5 / 38 văn bản (nhãn: Cần rà soát, Đang chuẩn bị, Chuẩn bị lỗi)    [11] < Trước > 1 2 3 < Sau > │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Thêm văn bản | Button | Click | • Sang `nap-van-ban`. Danh sách rỗng → trạng thái "Chưa có văn bản phù hợp" kèm nút này và nút "Xóa bộ lọc", không báo lỗi. |
| 2 | Số hiệu, trích yếu | Textbox | Text | • Ô nhập kéo dài hết bề ngang khung, nằm ở hàng riêng phía trên các tiêu chí khác. Tối đa 200 ký tự, tìm tương đối theo số hiệu và trích yếu, không phân biệt dấu và hoa thường. Mặc định trống. |
| 3 | Lĩnh vực | Combobox nhiều giá trị | Select | • Hàng thứ hai cùng với Loại, Cơ quan, Tình trạng, Phạm vi; năm ô chia đều bề ngang. Từ danh mục lĩnh vực, gồm giá trị "Ngừng sử dụng" nếu còn văn bản. Mặc định không chọn (tất cả). |
| 4 | Loại văn bản | Combobox | Select | • Chọn 1 giá trị, mặc định "-- Tất cả --". |
| 5 | Cơ quan ban hành | Combobox | Select | • Chọn 1 giá trị, mặc định "-- Tất cả --". |
| 6 | Tình trạng | Combobox | Select | • -- Tất cả -- / Chưa hiệu lực / Còn hiệu lực / Hết hiệu lực / Đã hủy. Mặc định "Còn hiệu lực". |
| 7 | Phạm vi | Combobox | Select | • -- Tất cả -- / Cá nhân / Đơn vị / Một số đơn vị / Toàn hệ thống; chỉ hiện văn bản người dùng có quyền xem. |
| 8 | Chỉ hiện văn bản cần rà soát | Checkbox | Check | • Mặc định không chọn; lọc văn bản có cờ "Cần rà soát" (nguồn từ đường dẫn đã thay đổi, FC-011). |
| 9 | Tìm kiếm | Button | Click | • Lọc theo mọi tiêu chí (AND). Lỗi tải → `E-kiem-tra-phap-ly-020` "Không tải được danh sách văn bản. Vui lòng thử lại.", giữ bộ lọc. |
| 10 | Bảng văn bản | Table | Click | • Cột: Số hiệu (link), Trích yếu (tối đa 2 dòng, cắt "..."), Loại, Cơ quan, Ngày hiệu lực (dd/MM/yyyy), Lĩnh vực, Phạm vi, Tình trạng kèm nhãn "Cần rà soát", "Đang chuẩn bị" hoặc "Chuẩn bị lỗi". Click số hiệu → `chi-tiet-van-ban`. |
| 11 | Phân trang | Pager | Click | • 20 bản ghi mỗi trang `[GIẢ ĐỊNH]`, giữ bộ lọc. |

---

## Screen: chi-tiet-van-ban — Chi tiết văn bản pháp lý

### Wireframe (ASCII)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Gửi dự thảo | Lịch sử kiểm tra | *Kho văn bản                                          (o)3  [An v] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Nghị định 11/2021/NĐ-CP [1]          │ Trích yếu: Quy định về quy hoạch và cấp phép xây dựng đô thị        │
│ [Còn hiệu lực] [Cần rà soát]         │                                                                     │
│ ---------------------------------    │ Văn bản liên quan [4]                                               │
│ Loại: Nghị định                      │ - Sửa đổi:    < NĐ 05/2024/NĐ-CP >                                  │
│ Cơ quan: Chính phủ                   │ - Thay thế:   < NĐ 37/2019/NĐ-CP > (đã hết hiệu lực)                │
│ Ngày văn bản: 10/02/2021             │ - Bị thay thế bởi: (không có)                                       │
│ Hiệu lực: 01/01/2022 - (chưa có)     │                                                                     │
│ Lĩnh vực: Quy hoạch, Đất đai         │ (!) Chuẩn bị lỗi: văn bản chưa sẵn sàng để đối chiếu. [5]           │
│ Phạm vi: Đơn vị (Sở TN&MT)           │ [ Thử chuẩn bị lại ]  (chỉ hiện khi Chuẩn bị lỗi)                   │
│ Chủ sở hữu: Nguyễn Văn A [2]         │                                                                     │
│ Ngày nạp: 12/10/2026                 │ Đã hủy: lý do, người hủy, ngày hủy (chỉ hiện khi văn bản đã hủy)    │
│ Nguồn: Tệp  < Tải tệp gốc > [3]      │                                                                     │
├──────────────────────────────────────┴─────────────────────────────────────────────────────────────────────┤
│ < Quay lại danh sách > [6] [7][ Xem nội dung ] [8][ Sửa thông tin ] [9][ Đổi phạm vi ] [10][ Hủy văn bản ] │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Thông tin văn bản | Label | ReadOnly | • Số hiệu, loại, cơ quan, trích yếu, ngày văn bản, ngày hiệu lực, ngày hết hiệu lực, lĩnh vực, phạm vi, chủ sở hữu, ngày nạp, nguồn (tệp hoặc đường dẫn). Không có quyền xem hoặc không tồn tại → `E-kiem-tra-phap-ly-021` "Văn bản không tồn tại hoặc bạn không có quyền xem.", về danh sách. |
| 2 | Chủ sở hữu | Label | ReadOnly | • Người nạp; dùng cho quyền sửa và hủy (FC-008 BR-01). |
| 3 | Tải tệp gốc / Mở nguồn | Button / Link | Click | • Tải tệp gốc chỉ với văn bản nạp từ tệp; văn bản nạp từ đường dẫn thay bằng link "Mở nguồn". Tệp không còn → `E-kiem-tra-phap-ly-023` "Không tìm thấy tệp gốc. Vui lòng liên hệ quản trị." |
| 4 | Văn bản liên quan | Label (link) | Click | • Sửa đổi, bổ sung, thay thế, bị thay thế bởi. Click → chi tiết văn bản đó nếu người xem có quyền xem; văn bản đã hủy hiện nhãn "Đã hủy". |
| 5 | Nhãn trạng thái | Label | ReadOnly | • Đã hủy (kèm lý do, người hủy, ngày hủy) / Chưa hiệu lực / Hết hiệu lực / Cần rà soát / Đang chuẩn bị / Chuẩn bị lỗi (`E-kiem-tra-phap-ly-022` "Văn bản chưa sẵn sàng để đối chiếu." nhưng vẫn xem được thông tin). Chuẩn bị lỗi → nút "Thử chuẩn bị lại" cho người có quyền sửa. |
| 6 | Quay lại danh sách | Link | Click | • Về `danh-sach-van-ban`. |
| 7 | Xem nội dung | Button | Click | • Sang `noi-dung-van-ban`. |
| 8 | Sửa thông tin | Button | Click | • Chỉ hiện với người có quyền sửa (chủ sở hữu hoặc quản trị trong phạm vi, FC-008) và văn bản chưa hủy. Sang `sua-thong-tin-van-ban`. |
| 9 | Đổi phạm vi | Button | Click | • Chỉ hiện với Quản trị đơn vị và Quản trị hệ thống và văn bản chưa hủy; không hiện với văn bản Cá nhân của người khác. Người dùng thường gọi trực tiếp → `truy-cap-bi-tu-choi` kèm `E-kiem-tra-phap-ly-028`. Sang `doi-pham-vi-van-ban`. |
| 10 | Hủy văn bản | Button | Click | • Chỉ hiện với người có quyền hủy và văn bản chưa hủy. Sang `huy-van-ban`. |

---

## Screen: noi-dung-van-ban — Nội dung văn bản (theo Chương, Điều, Khoản)

### Wireframe (ASCII)

> Màn dùng chung cho flow kho văn bản, flow kết quả kiểm tra và hỏi đáp.

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Gửi dự thảo | Lịch sử kiểm tra | *Kho văn bản                                          (o)3  [An v] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Mục lục [1]                          │ Nghị định 11/2021/NĐ-CP - Nội dung [2]                              │
│ ---------------------------------    │ (!) Văn bản đã hết hiệu lực từ 01/09/2026 (chỉ hiện khi áp dụng)    │
│ Chương I. Quy định chung             │                                                                     │
│   Điều 1. Phạm vi điều chỉnh         │ Điều 15. Thời hạn giải quyết                              Trang 7   │
│   Điều 2. Đối tượng áp dụng          │ ##############################################################      │
│ Chương II. Thủ tục cấp phép          │ # 1. Thời hạn giải quyết không quá 15 ngày kể từ ngày nhận  #       │
│   Điều 14. Hồ sơ đề nghị             │ #    hồ sơ hợp lệ.                                          #       │
│ > Điều 15. Thời hạn giải quyết       │ ##############################################################      │
│   Điều 16. Phí thẩm định             │ 2. Trường hợp cần kiểm tra thực địa, thời hạn có thể kéo dài        │
│ Chương III. Điều khoản thi hành      │    nhưng không quá 30 ngày.                                         │
│                                      │                                                                     │
│                                      │ Điều 16. Phí thẩm định                                    Trang 8   │
│                                      │ ...                                                                 │
│                                      │                                                                     │
│                                      │                                                    [3] < Quay lại > │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Mục lục Chương, Điều | Tree | Click | • Click mục → cuộn đến đúng Điều. Mở từ kết quả kiểm tra hoặc hỏi đáp: tự cuộn tới Điều/Khoản căn cứ và tô nổi (phần ##). |
| 2 | Nội dung văn bản | Label | ReadOnly | • Hiển thị theo Điều, Khoản, Điểm kèm số trang bản gốc, chỉ đọc. Căn cứ đã hủy hoặc hết hiệu lực vẫn mở được, kèm dải cảnh báo. |
| 3 | Quay lại | Link | Click | • Về `chi-tiet-van-ban` (hoặc `ket-qua-kiem-tra` / `hoi-dap-web` nếu mở từ đó). |

---

## Screen: sua-thong-tin-van-ban — Sửa thông tin văn bản

### Wireframe (ASCII)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Gửi dự thảo | Lịch sử kiểm tra | *Kho văn bản                                          (o)3  [An v] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Chỉnh sửa văn bản                    │ Sửa thông tin: Nghị định 11/2021/NĐ-CP                              │
│ ---------------------------------    │                                                                     │
│ Chủ sở hữu: Nguyễn Văn A             │ Số hiệu (*) [1]  [11/2021/NĐ-CP_____]                               │
│ Phạm vi giữ nguyên (đổi phạm vi      │ Loại (*) [v: Nghị định]  Cơ quan (*) [v: Chính phủ]                 │
│ dùng chức năng riêng).               │ Trích yếu (*) [Quy định về quy hoạch và cấp phép xây dựng]          │
│                                      │ Ngày văn bản (*) [10/02/2021]  Hiệu lực (*) [01/01/2022]            │
│ Sửa thông tin không đổi nội dung     │ Ngày hết hiệu lực [__________]                                      │
│ đã tách; lượt kiểm tra cũ giữ        │ Lĩnh vực (*)  [v: Quy hoạch, Đất đai (2)]                           │
│ kết quả cũ.                          │ Tình trạng hiệu lực [2]: Còn hiệu lực (tự tính, chỉ đọc)            │
│                                      │                                                                     │
│                                      │ Văn bản liên quan [3]                                               │
│                                      │ [v: Sửa đổi    ] [v: NĐ 05/2024/NĐ-CP        ]  < Xóa >             │
│                                      │ [v: Thay thế   ] [v: NĐ 37/2019/NĐ-CP        ]  < Xóa >             │
│                                      │ < + Thêm văn bản liên quan >                                        │
│                                      │                                                                     │
│                                      │                                  [4] < Hủy >      [5][ Lưu ]        │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Thông tin văn bản | Textbox, Combobox, DatePicker | Text | • Số hiệu, Loại, Cơ quan, Trích yếu, Ngày văn bản, Ngày hiệu lực, Ngày hết hiệu lực, Lĩnh vực: cùng ràng buộc như FC-005 (`xem-truoc-thong-tin`), điền sẵn giá trị hiện tại. Thiếu trường bắt buộc hoặc Ngày hết hiệu lực ≤ Ngày hiệu lực → `E-kiem-tra-phap-ly-026` "Vui lòng nhập đúng thông tin bắt buộc." Không lưu. |
| 2 | Tình trạng hiệu lực | Label | ReadOnly | • Hệ thống tự tính từ Ngày hiệu lực và Ngày hết hiệu lực (FC-008 BR-03). Muốn chuyển "Hết hiệu lực" thì nhập Ngày hết hiệu lực. |
| 3 | Văn bản liên quan | Combobox quan hệ + Combobox văn bản | Select | • Quan hệ: Sửa đổi / Bổ sung / Thay thế / Bị thay thế bởi; chọn văn bản trong kho mà người sửa có quyền xem; không tự liên kết với chính nó (vi phạm → `E-kiem-tra-phap-ly-026`). |
| 4 | Hủy | Link | Click | • Về `chi-tiet-van-ban`, không lưu. |
| 5 | Lưu | Button | Click | • Kiểm tra quyền sửa → ngược lại `E-kiem-tra-phap-ly-024` "Bạn không có quyền sửa văn bản này."; văn bản đã hủy → `E-kiem-tra-phap-ly-025` "Văn bản đã hủy, không thể sửa."; người khác vừa sửa → `E-kiem-tra-phap-ly-027` "Văn bản vừa được người khác cập nhật. Vui lòng tải lại và sửa lại." (không ghi đè).<br>• Thành công → về `chi-tiet-van-ban`. Đổi ngày hiệu lực chỉ ảnh hưởng các lượt sau (FC-008 BR-06); quyền sửa văn bản đơn vị chỉ cho quản trị đơn vị tạo (BR-01). |

---

## Screen: doi-pham-vi-van-ban — Đổi phạm vi sử dụng (hộp thoại)

### Wireframe (ASCII)

> Hộp thoại phủ lên `chi-tiet-van-ban`; chỉ Quản trị đơn vị và Quản trị hệ thống mở được.

```text
┌──────────────────────────────────────────────────────────────────────────────────┐
│ Đổi phạm vi sử dụng                                           (x)                │
├──────────────────────────────────────────────────────────────────────────────────┤
│ Văn bản: Nghị định 11/2021/NĐ-CP                                                 │
│ Phạm vi hiện tại [1]: Cá nhân                                                    │
│                                                                                  │
│ Phạm vi mới (*) [2]                                                              │
│ ( ) Đơn vị   (*) Một số đơn vị   ( ) Toàn hệ thống (chỉ Quản trị hệ thống)       │
│ Đơn vị áp dụng (*) [3]: [v: Sở TN&MT, Sở Xây dựng (2)]                           │
│ Đơn vị bị ảnh hưởng [4]: thêm: Sở Xây dựng | bớt: (không)                        │
│                                                                                  │
│                                       [5] < Hủy >    [6][ Xác nhận ]             │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Phạm vi hiện tại | Label | ReadOnly | • Chỉ đọc. |
| 2 | Phạm vi mới | Radio | Select | • Quản trị đơn vị: Đơn vị, Một số đơn vị (trong đơn vị phụ trách), kể cả khi nâng văn bản Cá nhân do chính mình nạp. Quản trị hệ thống thêm Toàn hệ thống. Không có lựa chọn Cá nhân khi đổi `[GIẢ ĐỊNH]`. Người dùng thường không thấy chức năng; gọi trực tiếp → `E-kiem-tra-phap-ly-028`. |
| 3 | Đơn vị áp dụng | Combobox nhiều giá trị | Select | • Hiện khi chọn Đơn vị hoặc Một số đơn vị; **bắt buộc** ≥ 1; chọn ngoài đơn vị phụ trách hoặc để trống → `E-kiem-tra-phap-ly-030` "Vui lòng chọn đơn vị thuộc phạm vi bạn quản lý." |
| 4 | Đơn vị bị ảnh hưởng | Label | ReadOnly | • Danh sách đơn vị sẽ được thêm và bị bớt quyền dùng, hiện trước khi xác nhận. |
| 5 | Hủy | Link | Click | • Đóng hộp thoại, về `chi-tiet-van-ban`. |
| 6 | Xác nhận | Button | Click | • Văn bản đã hủy → `E-kiem-tra-phap-ly-029` "Văn bản đã hủy, không thể đổi phạm vi."; văn bản Cá nhân của người khác → `E-kiem-tra-phap-ly-031`; văn bản do Quản trị hệ thống tạo hoặc có đơn vị ngoài phạm vi phụ trách → `E-kiem-tra-phap-ly-032` "Văn bản này không thuộc quyền quản lý của bạn." Thành công → về `chi-tiet-van-ban`. |

---

## Screen: huy-van-ban — Hủy văn bản khỏi kho (hộp thoại)

### Wireframe (ASCII)

> Hộp thoại phủ lên `chi-tiet-van-ban`.

```text
┌──────────────────────────────────────────────────────────────────────────────────┐
│ Hủy văn bản khỏi kho                                         (x)                 │
├──────────────────────────────────────────────────────────────────────────────────┤
│ Bạn chắc chắn muốn hủy văn bản "Nghị định 11/2021/NĐ-CP"?                        │
│                                                                                  │
│ Số lượt kiểm tra đã dùng văn bản này [1]: 12                                     │
│ (info) Có 1 lượt đang chạy đang dùng văn bản này, lượt không bị ảnh hưởng.       │
│                                                                                  │
│ Lý do hủy (*) [2] (tối đa 500 ký tự)                                             │
│ [Văn bản đã được thay thế bởi NĐ 05/2024/NĐ-CP______________]                    │
│                                                                                  │
│                                       [3] < Không hủy >  [4][ Xác nhận hủy ]     │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Số lượt kiểm tra đã dùng văn bản | Label | ReadOnly | • Chỉ đọc. Có lượt đang chạy dùng văn bản → vẫn cho hủy, hiển thị "Có <N> lượt đang chạy đang dùng văn bản này, chúng không bị ảnh hưởng." (lượt dùng dữ liệu lúc bắt đầu). |
| 2 | Lý do hủy | Textbox nhiều dòng | Text | • **Bắt buộc**, tối đa 500 ký tự; trống hoặc quá dài → `E-kiem-tra-phap-ly-034` "Vui lòng nhập lý do hủy (tối đa 500 ký tự)." tại ô. |
| 3 | Không hủy | Link | Click | • Đóng hộp thoại, về `chi-tiet-van-ban`. |
| 4 | Xác nhận hủy | Button | Click | • Không có quyền hủy → `E-kiem-tra-phap-ly-033` "Bạn không có quyền hủy văn bản này." Thành công: văn bản "Đã hủy", không dùng cho lượt mới, ghi lý do, người hủy, ngày hủy; về `danh-sach-van-ban`. Quan hệ với văn bản khác giữ nguyên, hiện nhãn "Đã hủy". |

---
