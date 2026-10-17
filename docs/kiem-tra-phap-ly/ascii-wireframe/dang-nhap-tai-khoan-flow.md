# Flow: Đăng nhập và tài khoản cá nhân

> Màn hình thuộc flow này: dang-nhap → quen-mat-khau → dat-lai-mat-khau → dat-lai-thanh-cong; lien-ket-het-han, tai-khoan-bi-khoa, trang-chu, doi-mat-khau, thong-tin-ca-nhan, truy-cap-bi-tu-choi. Flow tổng xem `../srs/kiem-tra-phap-ly-userflow.md` Mục 1. Nguồn mô tả: `../SRS.md` v1.1 (FC-001 đến FC-004). Thiết bị: Desktop 1440. Màn chưa đăng nhập vẽ form hẹp căn giữa (không trải toàn khung).
>
> `trang-chu` [1.7] và `truy-cap-bi-tu-choi` [1.10] là màn dùng chung, được các flow khác dẫn tới. Số liệu trong khung chỉ minh họa.

---

## Screen: dang-nhap — Đăng nhập

### Wireframe (ASCII)

> Màn chưa đăng nhập: không có menu; form là hộp hẹp căn giữa. Hai cách đăng nhập là hai chế độ của cùng một màn (chọn bằng radio), không tách màn.

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Kiểm tra pháp lý văn bản dự thảo                                                                    │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                            │
│                   ┌────────────────────────────────────────────────────────────────────┐                   │
│                   │ Đăng nhập                                                          │                   │
│                   ├────────────────────────────────────────────────────────────────────┤                   │
│                   │                                                                    │                   │
│                   │ Cách đăng nhập [1]                                                 │                   │
│                   │  (*) Tài khoản iOffice     ( ) Tài khoản rời                       │                   │
│                   │                                                                    │                   │
│                   │ Tên đăng nhập (*) [2]          (chỉ hiện khi chọn Tài khoản rời)   │                   │
│                   │ [______________________________________]                           │                   │
│                   │ Mật khẩu (*) [3]                                                   │                   │
│                   │ [______________________________] (eye)                             │                   │
│                   │ (!) [6] Tên đăng nhập hoặc mật khẩu không đúng.                    │                   │
│                   │                                                                    │                   │
│                   │ [4][        Đăng nhập        ]      [5] < Quên mật khẩu >          │                   │
│                   │                                                                    │                   │
│                   └────────────────────────────────────────────────────────────────────┘                   │
│ Chọn "Tài khoản iOffice": ẩn 2 ô nhập và link Quên mật khẩu, nút đổi thành [ Đăng nhập bằng iOffice ].     │
│                                                                                                            │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Cách đăng nhập | Radio | Select | • Hai giá trị "Tài khoản iOffice" (mặc định `[GIẢ ĐỊNH]`) / "Tài khoản rời" (FC-001).<br>• Chọn iOffice: ẩn Tên đăng nhập, Mật khẩu, link Quên mật khẩu; nút thành "Đăng nhập bằng iOffice" → chuyển sang iOffice xác thực (chờ tối đa 30 giây `[GIẢ ĐỊNH]`). |
| 2 | Tên đăng nhập | Textbox | Text | • Chỉ hiện với Tài khoản rời. **Bắt buộc**, tối đa 100 ký tự, không phân biệt hoa thường.<br>• Đăng nhập chỉ so khớp, KHÔNG áp chính sách đặt tên. |
| 3 | Mật khẩu | Password | Text | • Chỉ hiện với Tài khoản rời. **Bắt buộc**, tối đa 64 ký tự, có nút (eye) ẩn/hiện ký tự. Chỉ so khớp, KHÔNG áp chính sách mật khẩu. |
| 4 | Đăng nhập | Button | Click | • Enable khi đã nhập Tên đăng nhập và Mật khẩu (tài khoản rời); disable khi đang xử lý để tránh gửi hai lần.<br>• Thành công → `trang-chu`, đặt lại bộ đếm sai về 0. Sai nhiều lần → `tai-khoan-bi-khoa`. Tài khoản/đơn vị ngừng hoạt động hoặc iOffice từ chối → `truy-cap-bi-tu-choi`. |
| 5 | Quên mật khẩu | Link | Click | • Chỉ hiện với Tài khoản rời (iOffice đổi mật khẩu trên iOffice). Click → `quen-mat-khau`. |
| 6 | Thông báo lỗi đăng nhập | Label | ReadOnly | • Sai tên đăng nhập hoặc mật khẩu (bộ đếm chưa đạt 5) → `E-kiem-tra-phap-ly-001` "Tên đăng nhập hoặc mật khẩu không đúng." cùng một câu cho cả hai trường hợp (không lộ tài khoản có tồn tại), bộ đếm +1 theo tên đăng nhập, giữ nguyên màn.<br>• Không ghi mật khẩu vào log; log ghi tên đăng nhập, địa chỉ mạng, lý do. |

---

## Screen: quen-mat-khau — Quên mật khẩu

### Wireframe (ASCII)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Kiểm tra pháp lý văn bản dự thảo                                                                    │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                            │
│                   ┌────────────────────────────────────────────────────────────────────┐                   │
│                   │ Quên mật khẩu                                                      │                   │
│                   ├────────────────────────────────────────────────────────────────────┤                   │
│                   │                                                                    │                   │
│                   │ Nhập tên đăng nhập hoặc email đã đăng ký, hệ thống sẽ gửi          │                   │
│                   │ liên kết đặt lại mật khẩu.                                         │                   │
│                   │                                                                    │                   │
│                   │ Tên đăng nhập hoặc Email (*) [1]                                   │                   │
│                   │ [______________________________________]                           │                   │
│                   │ (info) [3] Nếu tài khoản tồn tại, hướng dẫn đặt lại mật khẩu       │                   │
│                   │        đã được gửi đến email đăng ký.   (hiện sau khi gửi)         │                   │
│                   │                                                                    │                   │
│                   │ [4] < Quay lại đăng nhập >            [2][  Gửi yêu cầu  ]         │                   │
│                   │                                                                    │                   │
│                   └────────────────────────────────────────────────────────────────────┘                   │
│                                                                                                            │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Tên đăng nhập hoặc Email | Textbox | Text | • **Bắt buộc**, tối đa 150 ký tự; chấp nhận tên đăng nhập hoặc email của tài khoản rời (FC-002).<br>• Tài khoản iOffice không dùng chức năng này; gọi trực tiếp → `E-kiem-tra-phap-ly-008` "Tài khoản iOffice đổi mật khẩu trên iOffice." |
| 2 | Gửi yêu cầu | Button | Click | • Enable khi đã nhập. Sinh liên kết hiệu lực 30 phút, dùng một lần, gửi email; liên kết cũ của cùng tài khoản bị vô hiệu hóa.<br>• Tối đa 5 yêu cầu/giờ/tài khoản `[GIẢ ĐỊNH]`; vượt vẫn hiện thông báo chung nhưng không gửi thêm email. |
| 3 | Thông báo chung | Label | ReadOnly | • Luôn hiện cùng một câu "Nếu tài khoản tồn tại, hướng dẫn đặt lại mật khẩu đã được gửi đến email đăng ký." dù tài khoản có tồn tại hay không (anti-enumeration, FC-002 BR-01).<br>• Email lỗi hoặc hộp thư đầy: ghi log gửi thất bại, người dùng vẫn thấy thông báo chung. |
| 4 | Quay lại đăng nhập | Link | Click | • Về `dang-nhap`. |

---

## Screen: dat-lai-mat-khau — Đặt lại mật khẩu (từ liên kết trong email)

### Wireframe (ASCII)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Kiểm tra pháp lý văn bản dự thảo                                                                    │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                            │
│                   ┌────────────────────────────────────────────────────────────────────┐                   │
│                   │ Đặt lại mật khẩu                                                   │                   │
│                   ├────────────────────────────────────────────────────────────────────┤                   │
│                   │                                                                    │                   │
│                   │ Mật khẩu mới (*) [1]                                               │                   │
│                   │ [______________________________] (eye)                             │                   │
│                   │ Tối thiểu 8 ký tự, gồm chữ hoa, chữ thường và chữ số.              │                   │
│                   │ Xác nhận mật khẩu (*) [2]                                          │                   │
│                   │ [______________________________] (eye)                             │                   │
│                   │ (!) [4] Mật khẩu xác nhận không trùng khớp.                        │                   │
│                   │                                                                    │                   │
│                   │                           [3][ Đặt lại mật khẩu ]                  │                   │
│                   │                                                                    │                   │
│                   └────────────────────────────────────────────────────────────────────┘                   │
│                                                                                                            │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Mật khẩu mới | Password | Text | • **Bắt buộc**, tối đa 64 ký tự; tối thiểu 8 ký tự, có chữ hoa, chữ thường, chữ số `[CẦN XÁC NHẬN chính sách mật khẩu]`; không trùng 3 mật khẩu gần nhất `[GIẢ ĐỊNH]`. Có nút (eye) ẩn/hiện. |
| 2 | Xác nhận mật khẩu | Password | Text | • **Bắt buộc**, phải trùng Mật khẩu mới. |
| 3 | Đặt lại mật khẩu | Button | Click | • Chỉ enable khi cả hai ô hợp lệ. Thành công: lưu mật khẩu, vô hiệu hóa liên kết, đóng mọi phiên đang mở, đặt lại bộ đếm sai và mở khóa → `dat-lai-thanh-cong`; gửi email báo đã đổi.<br>• Liên kết quá 30 phút hoặc đã dùng → `lien-ket-het-han`. |
| 4 | Thông báo lỗi ô nhập | Label | ReadOnly | • Không đạt chính sách hoặc hai ô không trùng → `E-kiem-tra-phap-ly-007` tại ô: "Mật khẩu phải có tối thiểu 8 ký tự, gồm chữ hoa, chữ thường và chữ số." hoặc "Mật khẩu xác nhận không trùng khớp." Giữ nguyên màn. |

---

## Screen: dat-lai-thanh-cong — Đặt lại mật khẩu thành công

### Wireframe (ASCII)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Kiểm tra pháp lý văn bản dự thảo                                                                    │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                            │
│                   ┌────────────────────────────────────────────────────────────────────┐                   │
│                   │ Đặt lại mật khẩu thành công                                        │                   │
│                   ├────────────────────────────────────────────────────────────────────┤                   │
│                   │                                                                    │                   │
│                   │ (ok) [1] Mật khẩu của bạn đã được đặt lại.                         │                   │
│                   │      Các phiên đăng nhập cũ đã được đóng.                          │                   │
│                   │                                                                    │                   │
│                   │                         [2][ Về đăng nhập ]                        │                   │
│                   │                                                                    │                   │
│                   └────────────────────────────────────────────────────────────────────┘                   │
│                                                                                                            │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Thông báo kết quả | Label | ReadOnly | • Báo đã đặt lại; nêu rõ các phiên cũ đã đóng và tài khoản (nếu đang khóa) đã được mở. |
| 2 | Về đăng nhập | Button | Click | • Sang `dang-nhap`. Chủ tài khoản nhận email xác nhận đổi mật khẩu kèm thời gian. |

---

## Screen: lien-ket-het-han — Liên kết đặt lại hết hạn

### Wireframe (ASCII)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Kiểm tra pháp lý văn bản dự thảo                                                                    │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                            │
│                   ┌────────────────────────────────────────────────────────────────────┐                   │
│                   │ Liên kết không còn hiệu lực                                        │                   │
│                   ├────────────────────────────────────────────────────────────────────┤                   │
│                   │                                                                    │                   │
│                   │ (!) [1] Liên kết đặt lại mật khẩu đã hết hạn hoặc                  │                   │
│                   │      đã được sử dụng. Vui lòng gửi lại yêu cầu.                    │                   │
│                   │                                                                    │                   │
│                   │                         [2][ Gửi lại liên kết ]                    │                   │
│                   │                                                                    │                   │
│                   └────────────────────────────────────────────────────────────────────┘                   │
│                                                                                                            │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Thông báo lỗi | Label | ReadOnly | • `E-kiem-tra-phap-ly-006` "Liên kết đặt lại mật khẩu đã hết hạn hoặc đã được sử dụng. Vui lòng gửi lại yêu cầu." Hiện khi liên kết quá 30 phút hoặc đã dùng; không lộ tài khoản nào. |
| 2 | Gửi lại liên kết | Button | Click | • Sang `quen-mat-khau` để gửi yêu cầu mới; liên kết mới vô hiệu hóa liên kết cũ. |

---

## Screen: tai-khoan-bi-khoa — Tài khoản bị khóa tạm

### Wireframe (ASCII)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Kiểm tra pháp lý văn bản dự thảo                                                                    │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                            │
│                   ┌────────────────────────────────────────────────────────────────────┐                   │
│                   │ Tài khoản tạm khóa                                                 │                   │
│                   ├────────────────────────────────────────────────────────────────────┤                   │
│                   │                                                                    │                   │
│                   │ (!) [1] Tài khoản tạm khóa 15 phút do nhập sai mật khẩu            │                   │
│                   │      nhiều lần. Bạn có thể đặt lại mật khẩu để mở khóa.            │                   │
│                   │                                                                    │                   │
│                   │      < Về đăng nhập >            [2][ Quên mật khẩu ]              │                   │
│                   │                                                                    │                   │
│                   └────────────────────────────────────────────────────────────────────┘                   │
│                                                                                                            │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Thông báo khóa | Label | ReadOnly | • `E-kiem-tra-phap-ly-002` "Tài khoản tạm khóa 15 phút do nhập sai mật khẩu nhiều lần. Bạn có thể đặt lại mật khẩu để mở khóa." Hiện khi sai lần thứ 5 liên tiếp hoặc đăng nhập trong lúc đang khóa (nhập đúng cũng không vào được).<br>• Hết 15 phút tự mở khóa, bộ đếm về 0. |
| 2 | Quên mật khẩu | Button | Click | • Sang `quen-mat-khau`; đặt lại thành công thì mở khóa ngay. Tài khoản iOffice không bị khóa theo cơ chế này. Có link nhỏ "Về đăng nhập". |

---

## Screen: truy-cap-bi-tu-choi — Truy cập bị từ chối

### Wireframe (ASCII)

> Màn dùng chung cho đăng nhập và các flow cần quyền. Mỗi nguyên nhân là một nội dung của cùng màn, không vẽ nhiều khối cạnh nhau.

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Kiểm tra pháp lý văn bản dự thảo                                                                    │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                            │
│                   ┌────────────────────────────────────────────────────────────────────┐                   │
│                   │ Không thể truy cập                                                 │                   │
│                   ├────────────────────────────────────────────────────────────────────┤                   │
│                   │                                                                    │                   │
│                   │ (!) [1] Tài khoản hoặc đơn vị của bạn đã ngừng hoạt động.          │                   │
│                   │      Vui lòng liên hệ quản trị.                                    │                   │
│                   │                                                                    │                   │
│                   │                         [2][ Đăng nhập lại ]                       │                   │
│                   │                                                                    │                   │
│                   └────────────────────────────────────────────────────────────────────┘                   │
│                                                                                                            │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Thông báo từ chối | Label | ReadOnly | • Nội dung theo nguyên nhân (màn dùng chung nhiều flow): `E-kiem-tra-phap-ly-003` "Tài khoản hoặc đơn vị của bạn đã ngừng hoạt động. Vui lòng liên hệ quản trị." (không tăng bộ đếm sai); `E-kiem-tra-phap-ly-004` "Không xác thực được với iOffice. Vui lòng thử lại hoặc liên hệ quản trị." (không hiện chi tiết kỹ thuật, ghi log); `E-kiem-tra-phap-ly-005` "Đơn vị của bạn chưa được cấp quyền sử dụng hệ thống. Vui lòng liên hệ quản trị." |
| 2 | Đăng nhập lại / Về trang chủ | Button | Click | • Chưa đăng nhập: "Đăng nhập lại" → `dang-nhap`. Đã đăng nhập (mất quyền giữa phiên): "Về trang chủ" → `trang-chu`. |

---

## Screen: trang-chu — Trang chủ (dùng chung)

### Wireframe (ASCII)

> Màn dùng chung, hiển thị theo vai trò. Khung dưới là ngăn thông báo mở từ biểu tượng chuông ở thanh trên (không phải màn riêng).

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Gửi dự thảo | Lịch sử kiểm tra | Kho văn bản                                           (o)3  [An v] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Menu theo vai trò [1]                │ Xin chào, Nguyễn Văn A | Người dùng | Sở TN&MT                      │
│ ---------------------------------    │ Đơn vị thao tác [2]: [v: Sở TN&MT]  (Quản trị nhiều đơn vị)         │
│ *Trang chủ                           │ Thông báo (o)3 ở góc trên phải [3] - bấm để mở danh sách            │
│ Gửi dự thảo                          │ --------------------------------------------------------------      │
│ Lịch sử kiểm tra                     │ Lối tắt [4]            [ Gửi dự thảo kiểm tra ]                     │
│ Kho văn bản                          │                                                                     │
│ Thêm văn bản                         │ Lịch sử gần đây [5] (5 lượt)             < Xem tất cả >             │
│ Quy tắc nhạy cảm cá nhân             │ DuThao_NghiDinh_QuyHoachDoThi [Hoàn tất]    10 điểm 16/10           │
│ Thông tin cá nhân                    │ DuThao_QuyetDinh_UBND         [Đang xử lý]  -       16/10           │
│ Đổi mật khẩu (tài khoản rời)         │ DuThao_ThongTu_TNMT           [Hoàn tất]    3 điểm  15/10           │
│ ---------------------------------    │ DuThao_NghiQuyet_HDND         [Lỗi]         -       14/10           │
│ Quản trị đơn vị thêm: Quản lý tài    │ DuThao_KeHoach_2027           [Đã hủy]      -       12/10           │
│ khoản, Hạn mức, Báo cáo, Nhật ký.    │                                                                     │
│ Quản trị hệ thống thêm: Đơn vị,      │                                                                     │
│ Phân quyền, Danh mục, AI, Giá...     │                                                                     │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ Thông báo [3]                   [6] < Đánh dấu đã đọc tất cả >           │
├──────────────────────────────────────────────────────────────────────────┤
│ (*) Lượt "DuThao_NghiDinh..." đã hoàn tất, 10 điểm   16/10/2026 09:20    │
│ (*) Văn bản NĐ 11/2021/NĐ-CP chuẩn bị xong            16/10/2026 08:05   │
│     Lượt "DuThao_ThongTu_TNMT" đã hoàn tất, 3 điểm    15/10/2026 16:40   │
│     ... (cuộn để tải thêm, 20 thông báo mỗi lần)                         │
└──────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Menu chức năng | Menu | Click | • Chỉ hiện mục thuộc quyền của vai trò (FC-041): Người dùng — Gửi dự thảo, Lịch sử kiểm tra, Kho văn bản, Thêm văn bản, Quy tắc nhạy cảm cá nhân, Thông tin cá nhân, Đổi mật khẩu (chỉ tài khoản rời). Quản trị đơn vị thêm Quản lý tài khoản, Hạn mức tài khoản, Báo cáo theo tài khoản, Nhật ký gửi dữ liệu ra AI, Quy tắc nhạy cảm đơn vị. Quản trị hệ thống thêm Đơn vị, Tài khoản quản trị, Phân quyền, Danh mục, Quy tắc gợi ý lĩnh vực, Nhà cung cấp AI, Nhà cung cấp mặc định, Đơn giá, Hạn mức đơn vị, Lưu giữ dữ liệu, Báo cáo theo đơn vị. |
| 2 | Ô chọn đơn vị thao tác | Combobox | Select | • Chỉ hiện với Quản trị đơn vị phụ trách từ 2 đơn vị trở lên (màn dùng chung `chon-don-vi-thao-tac`, module 10); các màn quản trị khác dùng đơn vị đang chọn. |
| 3 | Biểu tượng thông báo | Icon + Badge | Click | • Số thông báo chưa đọc, tối đa hiển thị "99+". Click → mở danh sách thông báo (ngăn thả bên dưới). |
| 4 | Thẻ lối tắt | Button | Click | • "Gửi dự thảo" → `gui-du-thao`. Chỉ hiện nếu vai trò có quyền gửi. |
| 5 | Lịch sử gần đây | Table | Click | • 5 lượt kiểm tra gần nhất của người dùng: tên lượt, trạng thái (Hoàn tất, Đang xử lý, Lỗi, Đã hủy), số điểm vi phạm, ngày. Click dòng → `ket-qua-kiem-tra` (Hoàn tất) hoặc `dang-xu-ly` (đang chạy, lỗi). Chưa có lượt → "Chưa có lượt kiểm tra nào" kèm nút Gửi dự thảo. |
| 6 | Danh sách thông báo | Panel | Click | • Mới nhất ở trên, 20 thông báo mỗi lần, cuộn để tải thêm. Mỗi dòng: nội dung tóm tắt (không chứa trích đoạn dự thảo hay dữ liệu nhạy cảm), thời gian dd/MM/yyyy HH:mm, chưa đọc in đậm (dấu (*)). Click dòng → đánh dấu đã đọc và mở màn liên quan (lượt, văn bản, báo cáo). Trống → "Chưa có thông báo". Giữ 90 ngày `[GIẢ ĐỊNH]`.<br>• "Đánh dấu đã đọc tất cả": chỉ enable khi còn thông báo chưa đọc. |

---

## Screen: doi-mat-khau — Đổi mật khẩu

### Wireframe (ASCII)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Gửi dự thảo | Lịch sử kiểm tra | Kho văn bản                                           (o)3  [An v] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Tài khoản của tôi                    │ Đổi mật khẩu                                                        │
│ ---------------------------------    │ (Chỉ dành cho tài khoản rời)                                        │
│ < Thông tin cá nhân >                │                                                                     │
│ *Đổi mật khẩu                        │ Mật khẩu hiện tại (*) [1]     [____________________] (eye)          │
│                                      │ Mật khẩu mới (*) [2]          [____________________] (eye)          │
│                                      │ Xác nhận mật khẩu mới (*) [3] [____________________] (eye)          │
│                                      │ (!) [5] Mật khẩu hiện tại không đúng.                               │
│                                      │                                                                     │
│                                      │                                    [4][ Đổi mật khẩu ]              │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Mật khẩu hiện tại | Password | Text | • **Bắt buộc**, tối đa 64 ký tự. Chỉ tài khoản rời; tài khoản iOffice không thấy menu này (đổi mật khẩu trên iOffice).<br>• Sai → `E-kiem-tra-phap-ly-009` "Mật khẩu hiện tại không đúng." tại ô, tăng bộ đếm sai như đăng nhập (FC-001 BR-01). |
| 2 | Mật khẩu mới | Password | Text | • **Bắt buộc**, cùng chính sách với `dat-lai-mat-khau`; không được trùng mật khẩu hiện tại. |
| 3 | Xác nhận mật khẩu mới | Password | Text | • **Bắt buộc**, phải trùng Mật khẩu mới. |
| 4 | Đổi mật khẩu | Button | Click | • Thành công: lưu mật khẩu mới, đóng các phiên khác (giữ phiên hiện tại), hiện thông báo thành công và gửi email báo đổi; các thiết bị khác phải đăng nhập lại (FC-003 BR-02).<br>• Hai phiên đổi cùng lúc: lần lưu sau thắng. |
| 5 | Thông báo lỗi | Label | ReadOnly | • Mới không đạt chính sách, trùng mật khẩu hiện tại hoặc hai ô không trùng → `E-kiem-tra-phap-ly-010` "Mật khẩu mới không đạt yêu cầu hoặc trùng mật khẩu hiện tại." Giữ nguyên màn. |

---

## Screen: thong-tin-ca-nhan — Thông tin cá nhân

### Wireframe (ASCII)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Gửi dự thảo | Lịch sử kiểm tra | Kho văn bản                                           (o)3  [An v] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Tài khoản của tôi                    │ Thông tin cá nhân                                                   │
│ ---------------------------------    │                                                                     │
│ *Thông tin cá nhân                   │ Tên đăng nhập [1]             nguyenvana                            │
│ < Đổi mật khẩu >                     │ Họ tên (*) [2]                [Nguyễn Văn A___________]             │
│                                      │ Email (*) [3]                 [nguyenvana@sotnmt.gov.vn]            │
│                                      │ Số điện thoại [4]             [0912345678__]                        │
│                                      │ Đơn vị [6]                    Sở TN&MT                              │
│                                      │ Vai trò [7]                   Người dùng                            │
│                                      │ [x] Nhận thông báo qua email [5]                                    │
│                                      │ (!) [8] Email đã được sử dụng bởi tài khoản khác.                   │
│                                      │                                                                     │
│                                      │                                          [9][ Lưu ]                 │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Tên đăng nhập | Label | ReadOnly | • Chỉ đọc. |
| 2 | Họ tên | Textbox | Text | • **Bắt buộc**, tối đa 150 ký tự. Tài khoản iOffice: chỉ đọc (lấy từ iOffice, đồng bộ lại ở lần đăng nhập sau); tài khoản rời: được sửa. |
| 3 | Email | Textbox | Text | • **Bắt buộc**, tối đa 150 ký tự, đúng định dạng, không trùng email tài khoản khác. Tài khoản iOffice: chỉ đọc. |
| 4 | Số điện thoại | Textbox | Text | • Không bắt buộc, tối đa 15 ký tự, chỉ chữ số, dấu + ở đầu. |
| 5 | Nhận thông báo qua email | Checkbox | Check | • Mặc định không chọn. Chọn → thông báo của FC-012 và FC-033 gửi thêm qua email đăng ký; cần có Email hợp lệ, Email trống thì không cho lưu (FC-004 BR-03). Thông báo trong ứng dụng luôn gửi bất kể lựa chọn này. |
| 6 | Đơn vị | Label | ReadOnly | • Chỉ đọc. Quản trị đơn vị phụ trách nhiều đơn vị: hiện danh sách các đơn vị. Người dùng không tự sửa đơn vị, vai trò. |
| 7 | Vai trò | Label | ReadOnly | • Chỉ đọc: Người dùng / Quản trị đơn vị / Quản trị hệ thống. |
| 8 | Thông báo lỗi | Label | ReadOnly | • Email hoặc số điện thoại sai định dạng → `E-kiem-tra-phap-ly-011` "Email hoặc số điện thoại không hợp lệ." tại ô; email trùng → `E-kiem-tra-phap-ly-012` "Email đã được sử dụng bởi tài khoản khác." Không lưu. |
| 9 | Lưu | Button | Click | • Kiểm tra rồi lưu, hiện thông báo thành công. Ghi log giá trị trước và sau từng trường đổi. Hai phiên cùng sửa: lần lưu sau ghi đè, tải lại hiện giá trị mới nhất. |

---
