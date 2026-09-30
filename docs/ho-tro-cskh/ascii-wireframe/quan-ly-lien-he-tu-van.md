# Flow: Quản lý khách hàng đề nghị tư vấn (nội bộ)

> Màn hình thuộc flow này: tv-danh-sach-lien-he → tv-chi-tiet-lien-he. Flow tổng xem `../srs/ho-tro-cskh-userflow-portal.md` Mục 1 (Flow 15). Nhân viên nội bộ đăng nhập qua [1]; dữ liệu do form [78] (Flow 14) tạo ra.
>
> Thiết bị: desktop 1024. Cập nhật 28/09/2026: bổ sung 2 màn [80]-[81]. Bộ lọc xếp lưới 4 cột theo quy ước 25/09/2026.

---

## Screen: tv-danh-sach-lien-he — Danh sách khách hàng đề nghị tư vấn

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket|Nội dung|Tư vấn|Người dùng|Cấu hình|Báo cáo   (o) B v │
├──────────────────────────────────────────────────────────────────────┤
│ Khách hàng đề nghị tư vấn                     [8] 2 chưa tư vấn      │
├──────────────────────────────────────────────────────────────────────┤
│ Trạng thái [1]   Giải pháp [2]    Địa bàn [3]      Người tư vấn [4]  │
│ [v: Tất cả     ] [v: Tất cả     ] [v: Tất cả     ] [v: Tất cả     ]  │
│ Tìm theo họ tên / email / SĐT [5]                                    │
│ [______________________________]                                     │
├──────────────────────────────────────────────────────────────────────┤
│ [6] Danh sách đề nghị (bấm 1 dòng để mở chi tiết)                    │
│ Khách hàng   SĐT        Địa bàn   Giải pháp Gửi lúc Trạng thái       │
│ -------------------------------------------------------------------- │
│ Nguyễn Văn A 0912345678 Bình Định QLVB      27/09   Chưa tư vấn      │
│ Trần Thị B   0987654321 Bộ ngành  Lưu trữ   26/09   Đã tư vấn: Lê C  │
│ Phạm Văn D   0901234567 Đà Nẵng   QLVB      25/09   Chưa tư vấn      │
│                                                                      │
│ [7] Trang 1/1                                                        │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Trạng thái | Dropdown | Select | • Tất cả / Chưa tư vấn / Đã tư vấn; mặc định Tất cả [GIẢ ĐỊNH]. Đổi giá trị lọc lại ngay. |
| 2 | Giải pháp | Dropdown | Select | • Tất cả / Quản lý văn bản và điều hành / Lưu trữ điện tử. |
| 3 | Địa bàn | Dropdown | Select | • Quản trị viên, Triển khai của Line: chọn 34 tỉnh/TP hoặc "Bộ, ban, ngành".<br>• **Agent tỉnh: khóa sẵn địa bàn được gán**, chỉ thấy khách thuộc địa bàn mình, không thêm giới hạn theo Dịch vụ × Đối tượng (OQ-45). Khách chọn "Bộ, ban, ngành" chỉ Quản trị viên và Triển khai của Line thấy. |
| 4 | Người tư vấn | Dropdown | Select | • Tất cả / Chưa có người tư vấn / Của tôi / từng nhân viên (tài khoản nội bộ). |
| 5 | Tìm theo họ tên / email / SĐT | Textbox | Text | • Enter để tìm; để trống là không lọc theo từ khóa. |
| 6 | Danh sách đề nghị | Table | Select | • Cột: Khách hàng, SĐT, Địa bàn, Giải pháp, Gửi lúc, Trạng thái (kèm tên người tư vấn khi đã tư vấn; người đã ngừng hoạt động ghi "(đã ngừng)"). Sắp xếp mặc định mới nhất trước [GIẢ ĐỊNH].<br>• Bấm 1 dòng sang [81]. Hai trạng thái rỗng: chưa có đề nghị nào (nút Làm mới) và lọc không ra kết quả (Xóa bộ lọc). |
| 7 | Phân trang | Pagination | Click | • Số dòng mỗi trang: chưa chốt [GIẢ ĐỊNH 10 dòng, cùng OQ-11 của màn ticket]. |
| 8 | Số đề nghị chưa tư vấn | Label | ReadOnly | • Đếm trong phạm vi người xem được. **Không có thông báo trong ứng dụng** khi có khách mới (chốt 28/09/2026): nhân viên chỉ biết khi mở màn này. |

- Phân quyền: Quản trị viên và Triển khai của Line thấy toàn bộ; Agent tỉnh theo địa bàn; nhân viên vai trò khác (Agent helpdesk, Chủ quản dịch vụ, Biên tập nội dung) sang [60]; khách hàng hoặc đề nghị ngoài phạm vi sang [61] (trung lập); chưa đăng nhập sang [1] rồi quay lại đúng màn cũ nếu còn quyền.

- Menu nội bộ thêm mục **Tư vấn** dẫn tới màn này. Header của các màn nội bộ khác chưa đổi trong đợt này; cần cập nhật khi vẽ lại chúng.

#### Trạng thái phụ — chưa có đề nghị nào

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket|Nội dung|Tư vấn|Người dùng|Cấu hình|Báo cáo   (o) B v │
├──────────────────────────────────────────────────────────────────────┤
│ Khách hàng đề nghị tư vấn                                            │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│            Chưa có khách hàng nào đề nghị tư vấn.                    │
│                      [ Làm mới ]                                     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

#### Trạng thái phụ — lọc không ra kết quả

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket|Nội dung|Tư vấn|Người dùng|Cấu hình|Báo cáo   (o) B v │
├──────────────────────────────────────────────────────────────────────┤
│ Khách hàng đề nghị tư vấn                                            │
├──────────────────────────────────────────────────────────────────────┤
│ (bộ lọc như màn chính)                                               │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│            Không có đề nghị nào phù hợp bộ lọc.                      │
│                 < Xóa bộ lọc >                                       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Screen: tv-chi-tiet-lien-he — Chi tiết đề nghị tư vấn

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket|Nội dung|Tư vấn|Người dùng|Cấu hình|Báo cáo   (o) B v │
├──────────────────────────────────────────────────────────────────────┤
│ [1] < Về danh sách >                                                 │
├──────────────────────────────────────────────────────────────────────┤
│ Đề nghị tư vấn của Nguyễn Văn A                  Gửi lúc 27/09 09:15 │
│ [2] Thông tin khách nhập (chỉ đọc)                                   │
│   Họ tên: Nguyễn Văn A              SĐT: 0912345678                  │
│   Email : nguyenvana@ubnd.gov.vn    Địa bàn: Bình Định               │
│   Giải pháp: Quản lý văn bản và điều hành                            │
│   Nội dung: Muốn tìm hiểu ký số và phân quyền                        │
├──────────────────────────────────────────────────────────────────────┤
│ Xử lý tư vấn                                                         │
│ Trạng thái [3]            Người tư vấn [4]                           │
│ [v: Chưa tư vấn    ]      [v: Chọn nhân viên        ]                │
│ [5][ Lưu ]   [6][ Đưa về Chưa tư vấn ] (chỉ hiện khi Đã tư vấn)      │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Về danh sách | Link | Click | • Sang [80]. |
| 2 | Thông tin khách nhập | Label group | ReadOnly | • Họ tên, email, SĐT, địa bàn, giải pháp, nội dung quan tâm, thời điểm gửi. **Chỉ đọc**, nhân viên không sửa thông tin do khách nhập. |
| 3 | Trạng thái | Dropdown | Select | • Chưa tư vấn / Đã tư vấn (chỉ 2 trạng thái, không có "Không hợp lệ/Trùng", ghi chú kết quả hay thời điểm tư vấn — OQ-46). Chọn "Đã tư vấn" **bắt buộc có người tư vấn**. |
| 4 | Người tư vấn | Dropdown | Select | • Danh sách tài khoản nội bộ đang hoạt động; **mỗi khách một người tư vấn**.<br>• Đổi người tư vấn: người tư vấn hiện tại hoặc Quản trị viên; nếu người đó đã ngừng hoạt động thì Quản trị viên hoặc Triển khai của Line đổi. Ghi Nhật ký thao tác [34] (OQ-43). |
| 5 | Lưu | Button | Click | • Lưu người tư vấn + trạng thái, quay về [80]. Nếu người khác vừa nhận trước thì hiện banner [7], không ghi đè. |
| 6 | Đưa về Chưa tư vấn | Button | Click | • Chỉ hiện khi đang "Đã tư vấn"; chỉ người tư vấn hiện tại hoặc Quản trị viên bấm được. Mở hộp xác nhận [8], xác nhận xong ghi Nhật ký thao tác [34] (OQ-43). |
| 7 | Banner vừa có người nhận trước | Banner | Click | • Hiện tên và thời điểm người vừa nhận; nút Làm mới tải lại bản mới nhất. Không cho hai người cùng nhận một khách (OQ-43). |
| 8 | Hộp xác nhận đưa về Chưa tư vấn | Modal | Click | • Xác nhận: đổi trạng thái, ghi [34]. Hủy: đóng hộp, giữ nguyên. |

- Đường dẫn [80]/[81] với tài khoản khách hàng hoặc Agent tỉnh ngoài địa bàn sang [61] trung lập (không xác nhận đề nghị có tồn tại); vai trò không được dùng sang [60].

- Cần cập nhật khi vẽ lại các màn liên quan: [34] thêm loại hành động "đưa Đã tư vấn về Chưa tư vấn" và "đổi người tư vấn"; [58] thêm quyền "Xem và xử lý đề nghị tư vấn".

#### Trạng thái phụ — vừa có người nhận trước

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket|Nội dung|Tư vấn|Người dùng|Cấu hình|Báo cáo   (o) B v │
├──────────────────────────────────────────────────────────────────────┤
│ [1] < Về danh sách >                                                 │
├──────────────────────────────────────────────────────────────────────┤
│ (!) [7] Lê Văn C vừa nhận tư vấn khách này lúc 09:20.  [ Làm mới ]   │
│     Thông tin và người tư vấn hiển thị theo bản mới nhất.            │
├──────────────────────────────────────────────────────────────────────┤
│ Trạng thái: Đã tư vấn        Người tư vấn: Lê Văn C                  │
└──────────────────────────────────────────────────────────────────────┘
```

#### Trạng thái phụ — xác nhận đưa về Chưa tư vấn

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket|Nội dung|Tư vấn|Người dùng|Cấu hình|Báo cáo   (o) B v │
├──────────────────────────────────────────────────────────────────────┤
│ (nền mờ - màn chi tiết ở phía sau)                                   │
│        ┌────────────────────────────────────────────┐                │
│        │ [8] Đưa đề nghị này về "Chưa tư vấn"?      │                │
│        │ Thao tác được ghi vào Nhật ký thao tác.    │                │
│        │        [ Xác nhận ]     [ Hủy ]            │                │
│        └────────────────────────────────────────────┘                │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Open Questions / quyết định của flow này

| Mã | Nội dung | Trạng thái |
|----|----------|------------|
| OQ-43 | Mỗi khách một người tư vấn; đổi người tư vấn hoặc đưa về Chưa tư vấn do người tư vấn hiện tại hoặc Quản trị viên, ghi [34]; người tư vấn đã ngừng: Quản trị viên hoặc Triển khai của Line đổi | Đã chốt (khách hàng xác nhận, 28/09/2026) |
| OQ-45 | Agent tỉnh chỉ giới hạn theo địa bàn; khách "Bộ, ban, ngành" chỉ Quản trị viên và Triển khai của Line thấy; ngoài phạm vi sang [61] | Đã chốt (khách hàng xác nhận, 28/09/2026) |
| OQ-46 | Chỉ 2 trạng thái Chưa tư vấn / Đã tư vấn, không ghi chú kết quả, không "Không hợp lệ/Trùng" | Đã chốt (khách hàng xác nhận, 28/09/2026) |
| — | Không có thông báo trong ứng dụng khi có khách mới | Đã chốt (28/09/2026) |
