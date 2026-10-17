# Flow: Danh mục và quy tắc dữ liệu nhạy cảm

> Màn hình thuộc flow này: danh-muc-danh-sach → danh-muc-them-sua, danh-muc-xoa-xac-nhan; quy-tac-nhay-cam-danh-sach → quy-tac-nhay-cam-form → thu-quy-tac. Flow tổng xem `../srs/kiem-tra-phap-ly-userflow.md` Mục 1. Nguồn mô tả: `../SRS.md` v1.1 (FC-025 đến FC-027). Thiết bị: Desktop 1440, bố cục tràn khung. Số liệu trong khung chỉ minh họa.
>
> Màn dùng chung từ flow khác: `trang-chu` [1.7] (điểm vào), `truy-cap-bi-tu-choi` [1.10] (khi không đủ quyền). `danh-muc-xoa-xac-nhan` dùng chung cho danh mục và quy tắc nhạy cảm. Danh mục chỉ Quản trị hệ thống; quy tắc nhạy cảm cho cả ba vai trò theo phạm vi.

---

## Screen: danh-muc-danh-sach — Danh mục dùng chung

### Wireframe (ASCII)

> Hai khung là hai tab của cùng một màn: tab "Lĩnh vực" (và Loại văn bản, Cơ quan ban hành cùng cấu trúc cột) và tab "Quy tắc gợi ý lĩnh vực". Chỉ một tab hiển thị tại một thời điểm.

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Gửi dự thảo | Lịch sử kiểm tra | Kho văn bản                                           (o)3  [An v] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Quản trị                 │ Danh mục dùng chung                                  Quản trị hệ thống          │
│ ----------------------   │ [*Lĩnh vực][Loại văn bản][Cơ quan ban hành][Quy tắc gợi ý lĩnh vực] [1]         │
│ *Danh mục dùng chung     │ ---------------------------------------------------------------------------     │
│ Quy tắc nhạy cảm         │ Mã        Tên             Mô tả               TT  Trạng thái  Văn bản [2]       │
│                          │ THUE      Thuế            Quy định về thuế     1  Đang dùng      42             │
│ (Người dùng và Quản trị  │ DAT-DAI   Đất đai         Luật, nghị định đất  2  Đang dùng      67             │
│ đơn vị chỉ thấy Quy tắc  │ QUY-HOACH Quy hoạch       Quy hoạch đô thị     3  Đang dùng      31             │
│ nhạy cảm)                │ MOI-TRUONG Môi trường     Bảo vệ môi trường    4  Đang dùng      18             │
│                          │ XAY-DUNG  Xây dựng        Xây dựng, nhà ở      5  Ngừng dùng     9              │
│                          │                                              < Sửa > < Xóa > mỗi dòng [3]       │
│                          │                                                                                 │
│                          │                                                         [4][ + Thêm giá trị ]   │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Gửi dự thảo | Lịch sử kiểm tra | Kho văn bản                                           (o)3  [An v] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Quản trị                 │ Danh mục dùng chung                                  Quản trị hệ thống          │
│ ----------------------   │ [Lĩnh vực][Loại văn bản][Cơ quan ban hành][*Quy tắc gợi ý lĩnh vực] [1]         │
│ *Danh mục dùng chung     │ ---------------------------------------------------------------------------     │
│ Quy tắc nhạy cảm         │ Tên quy tắc        Điều kiện                Lĩnh vực đích  Ưu tiên  Trạng thái  │
│                          │ NĐ về thuế         Loại: Nghị định; "thuế"  Thuế             60     Đang dùng   │
│ (Người dùng và Quản trị  │ Quy hoạch đô thị   Từ khóa: "quy hoạch"     Quy hoạch        50     Đang dùng   │
│ đơn vị chỉ thấy Quy tắc  │ Bộ TN&MT           Cơ quan: Bộ TN&MT        Môi trường       40     Ngừng dùng  │
│ nhạy cảm)                │                                              < Sửa > < Xóa > mỗi dòng [3]       │
│                          │                                                                                 │
│                          │                                                         [4][ + Thêm quy tắc ]   │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Chọn danh mục | Tab | Select | • Bốn tab: Lĩnh vực / Loại văn bản / Cơ quan ban hành / Quy tắc gợi ý lĩnh vực (FC-025, FC-026). Mặc định "Lĩnh vực". Chỉ Quản trị hệ thống mở được màn này; vai trò khác → `truy-cap-bi-tu-choi`. |
| 2 | Bảng giá trị | Table | ReadOnly | • Cột: Mã, Tên, Mô tả, Thứ tự, Trạng thái (Đang dùng / Ngừng sử dụng), Số văn bản đang dùng. Sắp xếp mặc định theo Thứ tự tăng dần. Tab Quy tắc gợi ý: Tên quy tắc, Điều kiện, Lĩnh vực đích, Điểm ưu tiên, Trạng thái.<br>• Lỗi tải → `E-kiem-tra-phap-ly-068` "Không tải được danh mục. Vui lòng thử lại."; danh sách trống → trạng thái rỗng kèm nút Thêm.<br>• Giá trị "Ngừng sử dụng" không còn chọn được khi nạp văn bản hoặc gửi dự thảo nhưng vẫn hiện với bản ghi đã dùng và trong bộ lọc (BR-01). |
| 3 | Sửa / Xóa | Link | Click | • Sửa → `danh-muc-them-sua` với dữ liệu hiện có. Xóa → `danh-muc-xoa-xac-nhan`; giá trị đã được dùng không xóa được, chỉ chuyển Ngừng sử dụng (`E-kiem-tra-phap-ly-070`). |
| 4 | Thêm giá trị / Thêm quy tắc | Button | Click | • Mở `danh-muc-them-sua` trống theo tab đang chọn. Danh mục dùng chung toàn hệ thống, đơn vị không tự thêm (BR-04) `[GIẢ ĐỊNH]`. |

---

## Screen: danh-muc-them-sua — Thêm hoặc sửa giá trị danh mục (hộp thoại)

### Wireframe (ASCII)

> Hộp thoại phủ lên `danh-muc-danh-sach`; sửa thì hiện dữ liệu cũ, ô Mã chỉ đọc.

```text
┌────────────────────────────────────────────────────────────────────────────────────┐
│ Thêm giá trị danh mục — Lĩnh vực                                  (x)              │
├────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                    │
│ Mã (*) [1]            [QUY-HOACH____________] (không sửa được sau khi lưu)         │
│ Tên (*) [2]           [Quy hoạch_______________________________]                   │
│ Mô tả [3]             [Quy hoạch đô thị và nông thôn___________]                   │
│ Thứ tự [4]            [3___]                                                       │
│ Trạng thái [5]        [v: Đang dùng]                                               │
│ (!) [6] Mã hoặc tên đã tồn tại, hoặc thông tin chưa hợp lệ.                        │
│                                                                                    │
│                                        [7] < Hủy >    [8][ Lưu ]                   │
└────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Mã | Textbox | Text | • **Bắt buộc**, tối đa 30 ký tự; chỉ chữ, số, gạch ngang, gạch dưới; không trùng trong cùng danh mục; không sửa sau khi lưu (BR-03, để tham chiếu ổn định). |
| 2 | Tên | Textbox | Text | • **Bắt buộc**, tối đa 200 ký tự, không trùng trong cùng danh mục (không phân biệt hoa thường). Đổi tên: văn bản đã gắn hiện tên mới, kết quả kiểm tra cũ giữ tên tại thời điểm kiểm tra. |
| 3 | Mô tả | Textbox nhiều dòng | Text | • Không bắt buộc, tối đa 500 ký tự. |
| 4 | Thứ tự | Textbox số | Number | • Số nguyên ≥ 0, tối đa 4 chữ số; mặc định giá trị lớn nhất hiện có + 1. |
| 5 | Trạng thái | Combobox | Select | • Đang dùng / Ngừng sử dụng, mặc định Đang dùng. |
| 6 | Thông báo lỗi | Label | ReadOnly | • Mã hoặc tên trùng, thiếu trường bắt buộc, mã có ký tự không hợp lệ → `E-kiem-tra-phap-ly-069` "Mã hoặc tên đã tồn tại, hoặc thông tin chưa hợp lệ." tại ô; không lưu. Hai quản trị cùng sửa: lần lưu sau báo giá trị đã đổi, tải lại. |
| 7 | Hủy | Link | Click | • Đóng hộp thoại, về `danh-muc-danh-sach`, không lưu. |
| 8 | Lưu | Button | Click | • Kiểm tra rồi lưu, ghi log giá trị trước và sau, quay về danh sách đã cập nhật. |

---

## Screen: danh-muc-them-sua-quy-tac — Thêm hoặc sửa quy tắc gợi ý lĩnh vực (hộp thoại, tab 4)

### Wireframe (ASCII)

> Biến thể của `danh-muc-them-sua` khi đang ở tab "Quy tắc gợi ý lĩnh vực" (cùng slug `danh-muc-them-sua [7.2]` trong user flow).

```text
┌────────────────────────────────────────────────────────────────────────────────────┐
│ Thêm quy tắc gợi ý lĩnh vực                                       (x)              │
├────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                    │
│ Tên quy tắc (*) [1]          [Quy hoạch đô thị____________________]                │
│ Loại văn bản áp dụng [2]     [v: Nghị định, Quyết định (2)]                        │
│ Cơ quan ban hành áp dụng [3] [v: (không chọn)]                                     │
│ Từ khóa trong trích yếu [4]  [quy hoạch                     ]                      │
│                              [đô thị                        ]                      │
│ Lĩnh vực gợi ý (*) [5]       [v: Quy hoạch]                                        │
│ Điểm ưu tiên [6]             [50__]    Trạng thái [7] [v: Đang dùng]               │
│ (!) [8] Quy tắc cần ít nhất một điều kiện và một lĩnh vực đang dùng.               │
│                                                                                    │
│                                        [9] < Hủy >   [10][ Lưu ]                   │
└────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Tên quy tắc | Textbox | Text | • **Bắt buộc**, tối đa 200 ký tự. |
| 2 | Loại văn bản áp dụng | Combobox nhiều giá trị | Select | • Không bắt buộc, lấy từ danh mục loại văn bản đang dùng. |
| 3 | Cơ quan ban hành áp dụng | Combobox nhiều giá trị | Select | • Không bắt buộc, lấy từ danh mục cơ quan ban hành. |
| 4 | Từ khóa trong trích yếu | Textbox nhiều dòng | Text | • Không bắt buộc, mỗi dòng một từ khóa hoặc cụm, tối đa 50 dòng, tổng 1000 ký tự. Khớp khi trích yếu chứa bất kỳ từ khóa nào. |
| 5 | Lĩnh vực gợi ý | Combobox | Select | • **Bắt buộc**, chỉ 1 giá trị từ lĩnh vực đang dùng. |
| 6 | Điểm ưu tiên | Textbox số | Number | • Số nguyên 1 đến 100, mặc định 50. Cộng dồn khi nhiều quy tắc cùng khớp; gợi ý tối đa 3 lĩnh vực điểm cao nhất (BR-01 FC-026). |
| 7 | Trạng thái | Combobox | Select | • Đang dùng / Ngừng sử dụng. Lĩnh vực đích Ngừng sử dụng → quy tắc bị bỏ qua khi gợi ý (BR-03). |
| 8 | Thông báo lỗi | Label | ReadOnly | • Không có điều kiện nào hoặc lĩnh vực đích không còn dùng → `E-kiem-tra-phap-ly-071`; trùng hoàn toàn điều kiện và lĩnh vực với quy tắc khác → `E-kiem-tra-phap-ly-072` "Quy tắc này trùng với một quy tắc đã có." |
| 9 | Hủy | Link | Click | • Đóng hộp thoại, không lưu. |
| 10 | Lưu | Button | Click | • Phải có ít nhất một trong ba điều kiện (loại văn bản, cơ quan, từ khóa). Lưu và ghi log; xóa quy tắc không ảnh hưởng văn bản đã nạp. |

---

## Screen: danh-muc-xoa-xac-nhan — Xác nhận xóa (hộp thoại, dùng chung)

### Wireframe (ASCII)

> Hai trạng thái loại trừ: giá trị chưa dùng (nút Xác nhận xóa) hoặc đang được dùng (nút Ngừng sử dụng); khung vẽ nội dung của trường hợp đang được dùng.

```text
┌────────────────────────────────────────────────────────────────────────────────────┐
│ Xác nhận xóa                                                         (x)           │
├────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                    │
│ Bạn chắc chắn muốn xóa giá trị "Xây dựng" khỏi danh mục Lĩnh vực? [1]              │
│                                                                                    │
│ (!) [2] Giá trị đang được dùng bởi 9 bản ghi, chỉ có thể chuyển sang               │
│     Ngừng sử dụng.   (hiện thay cho nút xóa khi đang được dùng)                    │
│                                                                                    │
│           [3] < Hủy >  [4][ Xác nhận xóa ]  hoặc  [5][ Ngừng sử dụng ]             │
└────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Nội dung xác nhận | Label | ReadOnly | • Nêu tên giá trị và danh mục. Dùng chung cho xóa giá trị danh mục và xóa quy tắc nhạy cảm (đổi lại nội dung theo đối tượng). |
| 2 | Cảnh báo đang được dùng | Label | ReadOnly | • Giá trị đang được dùng → `E-kiem-tra-phap-ly-070` "Giá trị đang được dùng bởi <N> bản ghi, chỉ có thể chuyển sang Ngừng sử dụng."; ẩn nút Xác nhận xóa, hiện nút Ngừng sử dụng. |
| 3 | Hủy | Link | Click | • Đóng hộp thoại, về `danh-muc-danh-sach`. |
| 4 | Xác nhận xóa | Button | Click | • Chỉ khi chưa được dùng: xóa, ghi log, quay về danh sách. Quy tắc nhạy cảm mặc định hệ thống không xóa được (chỉ bật/tắt) → `E-kiem-tra-phap-ly-075`. |
| 5 | Ngừng sử dụng | Button | Click | • Chuyển giá trị sang Ngừng sử dụng thay cho xóa; không còn chọn được cho dữ liệu mới, bản ghi cũ vẫn giữ. |

---

## Screen: quy-tac-nhay-cam-danh-sach — Quy tắc dữ liệu nhạy cảm

### Wireframe (ASCII)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Gửi dự thảo | Lịch sử kiểm tra | Kho văn bản                                           (o)3  [An v] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Quản trị                 │ Quy tắc dữ liệu nhạy cảm                            [1][ + Thêm quy tắc ]       │
│ ----------------------   │ Áp dụng cho bạn: mặc định hệ thống + đơn vị + cá nhân                           │
│ *Danh mục dùng chung     │ ---------------------------------------------------------------------------     │
│*Quy tắc nhạy cảm         │ Tên loại          Phạm vi          Nhận dạng      Xử lý     Trạng thái [2]      │
│                          │ Số CCCD/CMND      Mặc định HT      Mẫu            Che ẩn    [Bật ]  (khóa)      │
│ (Người dùng và Quản trị  │ Mã số thuế        Mặc định HT      Mẫu            Che ẩn    [Bật ]  (khóa)      │
│ đơn vị chỉ thấy Quy tắc  │ Số tài khoản      Mặc định HT      Mẫu            Che ẩn    [Tắt ]  (khóa)      │
│ nhạy cảm)                │ Mã dự án nội bộ   Đơn vị           Từ khóa        Xóa       [Bật] <Sửa><Xóa>    │
│                          │ Tên đối tác       Cá nhân          Từ khóa        Che ẩn    [Bật] <Sửa><Xóa>    │
│                          │                                                                                 │
│                          │ (khóa) Quy tắc mặc định chỉ Quản trị hệ thống bật/tắt [3]                       │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Thêm quy tắc | Button | Click | • Mở `quy-tac-nhay-cam-form` theo vai trò: Người dùng → Cá nhân; Quản trị đơn vị → Đơn vị; Quản trị hệ thống → Mặc định hệ thống (FC-027 BR-01). |
| 2 | Bảng quy tắc | Table | Click | • Hiển thị đúng các quy tắc người xem được áp dụng: Mặc định hệ thống, của đơn vị người xem, của cá nhân. Cột: Tên loại, Phạm vi (Mặc định hệ thống / Đơn vị / Cá nhân), Cách nhận dạng (Từ khóa / Mẫu), Cách xử lý mặc định (Cho phép gửi / Che ẩn / Xóa), Trạng thái (Bật / Tắt).<br>• Bộ mặc định đề xuất: Số CCCD/CMND, Mã số thuế, Số tài khoản ngân hàng, Số điện thoại, Email, Số tiền cụ thể, Họ tên cá nhân, Địa chỉ cụ thể `[GIẢ ĐỊNH, khách hàng xác nhận]`. |
| 3 | Quy tắc mặc định (khóa) | Switch + Label | Click | • Chỉ Quản trị hệ thống bật/tắt quy tắc mặc định; đơn vị và cá nhân không tắt được (BR-02). Sửa hoặc xóa quy tắc không thuộc phạm vi mình → `E-kiem-tra-phap-ly-075` "Bạn không có quyền sửa hoặc xóa quy tắc này."<br>• Quy tắc mới/sửa/tắt chỉ có hiệu lực cho lượt gửi sau (BR-04). |

---

## Screen: quy-tac-nhay-cam-form — Thêm hoặc sửa quy tắc nhạy cảm (hộp thoại)

### Wireframe (ASCII)

> Hộp thoại phủ lên `quy-tac-nhay-cam-danh-sach`.

```text
┌────────────────────────────────────────────────────────────────────────────────────┐
│ Thêm quy tắc dữ liệu nhạy cảm                                       (x)            │
├────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                    │
│ Tên loại (*) [1]        [Mã dự án nội bộ_______________________]                   │
│ Phạm vi quy tắc [2]     Đơn vị: Sở TN&MT (chỉ đọc)                                 │
│ Cách nhận dạng (*) [3]  [v: Danh sách từ khóa]   (Mẫu nhận dạng: chỉ quản trị)     │
│ Từ khóa (mỗi dòng một)  [DA-2026-01                    ]                           │
│                         [DA-2026-02                    ]                           │
│ Cách xử lý mặc định [4] [v: Che ẩn]        Trạng thái [5] [v: Bật]                 │
│ (!) [6] Tên loại đã tồn tại hoặc chưa nhập cách nhận dạng.                         │
│                                                                                    │
│     [7] < Thử quy tắc >              [8] < Hủy >   [9][ Lưu ]                      │
└────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Tên loại | Textbox | Text | • **Bắt buộc**, tối đa 100 ký tự, không trùng trong cùng phạm vi. |
| 2 | Phạm vi quy tắc | Label | ReadOnly | • Chỉ đọc, theo người tạo: Người dùng → Cá nhân; Quản trị đơn vị → Đơn vị (chọn đơn vị phụ trách nếu nhiều đơn vị); Quản trị hệ thống → Mặc định hệ thống. |
| 3 | Cách nhận dạng | Combobox + Textbox | Select | • Hai kiểu: "Danh sách từ khóa" (mỗi dòng một từ khóa hoặc cụm, tối đa 100 dòng) hoặc "Mẫu nhận dạng" (biểu thức chính quy, tối đa 1000 ký tự). Mẫu chỉ Quản trị hệ thống và Quản trị đơn vị được chọn; Người dùng thường chỉ có từ khóa (BR-01).<br>• Từ khóa một ký tự khớp quá rộng → cảnh báo khi lưu nhưng vẫn cho lưu `[GIẢ ĐỊNH]`. |
| 4 | Cách xử lý mặc định | Combobox | Select | • Cho phép gửi / Che ẩn / Xóa; mặc định Che ẩn. Là lựa chọn gợi ý sẵn ở màn xử lý nhạy cảm, người gửi vẫn đổi được cho từng mục. |
| 5 | Trạng thái | Combobox | Select | • Bật / Tắt, mặc định Bật. |
| 6 | Thông báo lỗi | Label | ReadOnly | • Tên trống/trùng hoặc chưa nhập cách nhận dạng → `E-kiem-tra-phap-ly-073` "Tên loại đã tồn tại hoặc chưa nhập cách nhận dạng."; mẫu không biên dịch được hoặc chậm hơn 2 giây trên đoạn thử → `E-kiem-tra-phap-ly-074` "Mẫu nhận dạng không hợp lệ hoặc quá phức tạp." Không lưu. |
| 7 | Thử quy tắc | Link | Click | • Mở `thu-quy-tac` với quy tắc đang soạn (chưa cần lưu). |
| 8 | Hủy | Link | Click | • Đóng hộp thoại, về `quy-tac-nhay-cam-danh-sach`. |
| 9 | Lưu | Button | Click | • Kiểm tra rồi lưu theo phạm vi của người thêm, ghi log giá trị trước và sau (không ghi đoạn mẫu). |

---

## Screen: thu-quy-tac — Thử quy tắc (hộp thoại)

### Wireframe (ASCII)

> Hộp thoại phủ lên `quy-tac-nhay-cam-form`.

```text
┌────────────────────────────────────────────────────────────────────────────────────┐
│ Thử quy tắc: Mã dự án nội bộ                                         (x)           │
├────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                    │
│ Đoạn văn bản mẫu (*) [1]  (tối đa 5000 ký tự, không lưu)                           │
│ [Dự án DA-2026-01 do ông Nguyễn Văn A phụ trách, ngân sách ...    ]                │
│ [Liên quan hồ sơ DA-2026-02 đã nộp ngày 05/10/2026.               ]                │
│                                                                                    │
│                                                     [2][ Thử ]                     │
│ ---------------------------------------------------------------------------        │
│ Kết quả [3]: tìm thấy 2 phần được nhận diện                                        │
│   Dự án [[DA-2026-01]] do ông ...   Liên quan hồ sơ [[DA-2026-02]] ...             │
│                                                                                    │
│                                                  [4] < Đóng >                      │
└────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Đoạn văn bản mẫu | Textbox nhiều dòng | Text | • **Bắt buộc** khi thử, tối đa 5000 ký tự. Không lưu sau khi đóng và không ghi vào log (FC-027 Audit). |
| 2 | Thử | Button | Click | • Nhận dạng đoạn mẫu theo quy tắc đang soạn (chưa lưu). Mẫu nhận dạng không hợp lệ hoặc chậm hơn 2 giây → `E-kiem-tra-phap-ly-074`. |
| 3 | Kết quả thử | Label | ReadOnly | • Tô nổi các phần được nhận diện (đánh dấu [[...]]) và nêu số lượng; không tìm thấy → "Không có phần nào được nhận diện". |
| 4 | Đóng | Link | Click | • Đóng hộp thoại, về `quy-tac-nhay-cam-form` giữ nguyên dữ liệu đang soạn. |

---
