# Flow: Portal giới thiệu dịch vụ & bảng giá

> Màn hình thuộc flow này: portal-trang-chu → portal-giai-phap-qlvb → portal-giai-phap-luu-tru → portal-bang-gia. Flow tổng xem `../srs/ho-tro-cskh-userflow-portal.md` Mục 1 (Flow 13). Khách chưa đăng nhập; màn dùng chung [1] đăng nhập, [61] không tìm thấy nằm ở `dang-nhap-kich-hoat-kh.md`, `thong-bao-loi-chung.md`.
>
> Thiết bị: desktop 1024. Cập nhật 28/09/2026: bổ sung 4 màn [74]-[77] theo yêu cầu BA; các điểm ghi "(OQ-n)" xem bảng cuối file.

---

## Screen: portal-trang-chu — Trang chủ portal

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ LINE [1] Trang chủ|Giải pháp v|Bảng giá|Liên hệ  [2][ Đăng nhập ]    │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   [3] Chuyển đổi số văn phòng cùng Line Văn phòng số                 │
│       Quản lý văn bản, điều hành và lưu trữ điện tử trên một nền tảng│
│                                                                      │
│       [4][ Liên hệ tư vấn ]      [5][ Xem bảng giá ]                 │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│ Giải pháp của Line                                                   │
│ ┌────────────────────────────────┐ ┌────────────────────────────────┐│
│ │ [6] Quản lý văn bản, điều hành │ │ [7] Lưu trữ điện tử            ││
│ │ Nhận, gửi, ký số, theo dõi     │ │ Lưu trữ, tra cứu hồ sơ số      ││
│ │ văn bản và công việc.          │ │ an toàn, đúng quy định.        ││
│ │ < Xem chi tiết >               │ │ < Xem chi tiết >               ││
│ └────────────────────────────────┘ └────────────────────────────────┘│
├──────────────────────────────────────────────────────────────────────┤
│ [8] Điểm nổi bật                                                     │
│  - Đúng quy định   - Triển khai nhanh   - Hỗ trợ sau triển khai      │
├──────────────────────────────────────────────────────────────────────┤
│ [9] Cần tư vấn giải pháp phù hợp?          [ Liên hệ tư vấn ]        │
├──────────────────────────────────────────────────────────────────────┤
│ [10] Line Văn phòng số | Thông tin liên hệ: [chờ Line cung cấp]      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Menu điều hướng | Menu ngang | Click | • Trang chủ; Giải pháp (xổ 2 mục: Quản lý văn bản và điều hành sang [75], Lưu trữ điện tử sang [76]); Bảng giá sang [77]; Liên hệ sang [78].<br>• Hiện trên mọi màn portal. **Không có mục Đăng ký** (đã chốt bỏ đăng ký, thống nhất quyết định "không có đăng ký công khai" của hệ thống). |
| 2 | Đăng nhập / Vào khu vực của tôi | Button | Click | • Chưa có phiên: bấm sang màn đăng nhập chung [1] (Flow 1).<br>• Đã có phiên: nút đổi thành "Vào khu vực của tôi", đưa tới trang đầu theo loại tài khoản và vai trò (khách hàng [7]; nội bộ theo OQ-18, OQ-37; người có cả hai loại vào nội bộ trước, OQ-33). Người đã đăng nhập không phải qua [1] lần nữa (OQ-41). |
| 3 | Tiêu đề và mô tả giới thiệu | Label | ReadOnly | • Giới thiệu tổng quan dịch vụ Line Văn phòng số. Nội dung cố định, do Line cung cấp. |
| 4 | Liên hệ tư vấn (đầu trang) | Button | Click | • Bấm sang [78], **chưa chọn sẵn giải pháp** (vào từ trang chủ chưa biết giải pháp nào). |
| 5 | Xem bảng giá | Button | Click | • Bấm sang [77]. |
| 6 | Thẻ Quản lý văn bản, điều hành | Card + Link | Click | • Tóm tắt giải pháp; "Xem chi tiết" sang [75]. |
| 7 | Thẻ Lưu trữ điện tử | Card + Link | Click | • Tóm tắt giải pháp; "Xem chi tiết" sang [76]. |
| 8 | Điểm nổi bật | Label list | ReadOnly | • Vài ý ngắn về lợi thế của Line; nội dung mẫu, do Line cung cấp. |
| 9 | Dải kêu gọi liên hệ | Banner + Button | Click | • Nút "Liên hệ tư vấn" sang [78], không chọn sẵn giải pháp. |
| 10 | Chân trang | Label | ReadOnly | • Thông tin liên hệ của Line: [chờ Line cung cấp]. Không có form trong chân trang. |

- Header portal (thanh menu + nút Đăng nhập) dùng chung cho mọi màn portal, chỉ đánh số ở [74]; các màn sau không lặp lại mô tả. Nội dung giới thiệu, tính năng, lợi ích, giá và thông tin liên hệ chỉ là nội dung mẫu do Line cung cấp, cố định, chưa có màn quản trị nội dung [chốt 28/09/2026].

- Địa chỉ gốc của hệ thống mở màn này, kể cả khi người dùng đã có phiên (OQ-41); đăng xuất vẫn về [1] như luồng đã duyệt.

- Bỏ đăng ký: không có nút, màn hay nhánh đăng ký nào trong portal.

#### Trạng thái phụ — người đã đăng nhập (chỉ khác nút ở góc phải)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ LINE Trang chủ|Giải pháp v|Bảng giá|Liên hệ [ Vào khu vực của tôi ]  │
├──────────────────────────────────────────────────────────────────────┤
│   (nội dung trang chủ giữ nguyên như trên)                           │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Screen: portal-giai-phap-qlvb — Giải pháp: Hệ thống Quản lý văn bản và điều hành

> Bám Figma bản mới (node 270:3887, khung 1024 × 3918): trang dài 9 khối theo thứ tự — Header, Hero, Tích hợp AI, Vòng đời văn bản, Các phân hệ chức năng, Tuân thủ quy định, Lợi ích, Kêu gọi liên hệ, Chân trang. Wireframe ASCII chỉ thể hiện bố cục; màu nền, icon, hình minh họa mô tả trong bảng.

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ (logo) Line Văn phòng số  Trang chủ|[Giải pháp v]|Bảng giá|Liên hệ    │
│                                                     [ Đăng nhập ]    │
╞══════════════════════════════════════════════════════════════════════╡
│ HERO  (nền chuyển sắc trắng → xanh nhạt)                             │
│ [1] Trang chủ / Giải pháp / Quản lý văn bản và điều hành             │
│ [2] (✎) GIẢI PHÁP CỦA LINE                    [6]                    │
│ [3] Hệ thống Quản lý văn bản                  ┌─────────────┐        │
│     và điều hành                              │▪▪ ▬▬▬▬      │ (✓) Ký │
│     Quản lý trọn vòng đời văn bản: soạn       │▪  ▬▬▬▬▬▬▬▬  │ số     │
│     thảo, trình chuyển, ký số điện tử,        │▪  ▬▬▬▬▬▬▬▬  │ thành  │
│     phát hành toàn trình.                     │   ▬▬▬  (ký) │ công   │
│     [4][ Liên hệ tư vấn ] [5][ Xem bảng giá ] └─────────────┘        │
│                                  (✉) 12 văn bản đến   (➤) Đã phát hành│
├──────────────────────────────────────────────────────────────────────┤
│ TÍCH HỢP AI  (nền xanh rất nhạt; thẻ lớn xanh đậm chuyển sắc)        │
│ (?) Hỏi đáp 24/7 [11]                                                │
│ ┌──────────────────────────────────────────────────────────────────┐ │
│ │ [7] (✦) ★ TÍNH NĂNG MỚI · TÍCH HỢP AI   [10] ┌────────────────┐  │ │
│ │ [8] Thông minh hóa văn phòng với AI          │(🤖) Trợ lý AI   │  │ │
│ │     Tự động hóa thao tác lặp lại và hỗ trợ   │  ● Đang hoạt động│ │ │
│ │     ngay khi cần, giúp cán bộ tập trung vào  │────────────────│  │ │
│ │     việc chính.                              │   Tuần này có văn│  │ │
│ │ [9] (▤) Tóm tắt văn bản                      │   bản nào sắp đến│  │ │
│ │         Nắm nhanh nội dung văn bản dài       │   hạn?           │  │ │
│ │     (⇢) Gợi ý xử lý                          │(✦)Có 3 văn bản   │  │ │
│ │         Loại văn bản, độ khẩn, người xử lý   │  sắp đến hạn...  │  │ │
│ │     (⌗) Trích xuất thông tin                 │  (Xem danh sách) │  │ │
│ │         Đọc văn bản scan: trích yếu, số ký   │  (Đặt nhắc việc) │  │ │
│ │         hiệu                                 │   Xem danh sách  │  │ │
│ │     (☑) Kiểm tra chính tả                    │(✦)Có 3 văn bản   │  │ │
│ │         Rà soát lỗi trước khi trình ký       │  sắp đến hạn:    │  │ │
│ │                                              │  1. Công văn ... │  │ │
│ │                                              │  2. Tờ trình ... │  │ │
│ │                                              │  3. Công văn ... │  │ │
│ │                                              │(Nhập câu hỏi..)>│  │ │
│ │                                              │  Ví dụ minh họa  │  │ │
│ │                                              └────────────────┘  │ │
│ └──────────────────────────────────────────────────────────────────┘ │
│ (⚡) Tóm tắt nhanh [11]                        (⇢) Gợi ý xử lý [11]   │
├──────────────────────────────────────────────────────────────────────┤
│ [12] Vòng đời văn bản                                                │
│      Từ soạn thảo đến phát hành, từ tiếp nhận đến phân công xử lý    │
│  VĂN BẢN ĐI                                                          │
│  (✎)Tạo, soạn thảo > (➤)Trình – chuyển > (✒)Lãnh đạo ký số điện tử   │
│                                          > (🚀)Phát hành toàn trình  │
│  VĂN BẢN ĐẾN                                                         │
│  (📥)Văn thư tiếp nhận > (📖)Vào sổ của đơn vị > (➤)Trình – chuyển   │
│                                          > (👥)Lãnh đạo phân công    │
├──────────────────────────────────────────────────────────────────────┤
│ [13] Các phân hệ chức năng                                           │
│      Đầy đủ nghiệp vụ văn phòng trên một nền tảng                    │
│ ┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐ │
│ │ (▤) Quản lý văn bản│ │ (☰✓) Quản lý công  │ │ (📂) Quản lý tài   │ │
│ │ ✓ Văn bản đi, đến, │ │      việc          │ │      liệu          │ │
│ │   nội bộ           │ │ ✓ Việc đã giao,    │ │ ✓ Kho tài liệu dùng│ │
│ │ ✓ Trình – chuyển,  │ │   được giao, phối  │ │   chung            │ │
│ │   ký số, phát hành │ │   hợp              │ │ ✓ Thư mục, chia sẻ │ │
│ │ ✓ Sổ văn bản, tra  │ │ ✓ Giao việc từ văn │ │   theo quyền       │ │
│ │   cứu, thống kê    │ │   bản, chỉ đạo,    │ │ ✓ Tìm kiếm nhanh   │ │
│ │                    │ │   cuộc họp         │ │   nội dung         │ │
│ │                    │ │ ✓ Theo dõi tiến độ,│ │                    │ │
│ │                    │ │   hạn xử lý, cảnh  │ │                    │ │
│ │                    │ │   báo quá hạn      │ │                    │ │
│ └────────────────────┘ └────────────────────┘ └────────────────────┘ │
│ ┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐ │
│ │ (📰) Tin tức nội bộ│ │ (⛭) Luồng quy trình│ │ (🛡✓) Quản trị &   │ │
│ │ ✓ Đăng tin, thông  │ │      động          │ │  phân quyền linh   │ │
│ │   báo, chuyên mục  │ │ ✓ Cấu hình luồng   │ │  động              │ │
│ │ ✓ Duyệt bài trước  │ │   theo loại văn bản│ │ ✓ Phân quyền theo  │ │
│ │   khi đăng         │ │ ✓ Tùy biến bước,   │ │   vai trò, đơn vị  │ │
│ │ ✓ Gửi tới đúng đối │ │   người xử lý, thời│ │ ✓ Cập nhật cơ cấu  │ │
│ │   tượng nhận       │ │   hạn              │ │   tổ chức          │ │
│ │                    │ │ ✓ Điều chỉnh không │ │ ✓ Nhật ký hệ thống,│ │
│ │                    │ │   cần lập trình    │ │   lưu vết thao tác │ │
│ └────────────────────┘ └────────────────────┘ └────────────────────┘ │
├──────────────────────────────────────────────────────────────────────┤
│ [14] (🛡✓) Tuân thủ quy định của Nhà nước                            │
│ ──────────────────────────────────────────────────────────────────── │
│ (Luật)       Luật Giao dịch điện tử 2023                             │
│              Luật số 20/2023/QH15                                    │
│ (Nghị định)  Công tác văn thư — Nghị định 30/2020/NĐ-CP              │
│ (Quyết định) Gửi, nhận văn bản điện tử giữa các cơ quan hành chính   │
│              nhà nước — Quyết định 28/2018/QĐ-TTg                    │
│ (Nghị định)  Chữ ký số và dịch vụ chứng thực chữ ký số               │
│              — Nghị định 130/2018/NĐ-CP                              │
│ (Nghị định)  Thực hiện thủ tục hành chính trên môi trường điện tử    │
│              — Nghị định 45/2020/NĐ-CP                               │
│ Danh sách tổng hợp để tham khảo, cần VNPT/pháp chế rà soát số hiệu   │
│ và hiệu lực trước khi công bố.                                       │
├──────────────────────────────────────────────────────────────────────┤
│ [15] (⏱) Giảm thời gian   (👁) Minh bạch tiến độ  (🔌) Dễ mở rộng,  │
│      xử lý                    Theo dõi từng bước       tích hợp      │
│      Rút ngắn luồng trình ký                       Liên thông hệ     │
│                                                    thống khác        │
├──────────────────────────────────────────────────────────────────────┤
│ [16] Sẵn sàng số hóa văn phòng cho đơn vị của bạn?      ( 🎧 )       │
│      [ Liên hệ tư vấn ]                       (nền xanh, vòng tròn)  │
├──────────────────────────────────────────────────────────────────────┤
│ [17] Line Văn phòng số | Giải pháp      | Liên kết   | Liên hệ       │
│  Một sản phẩm của Tập   Quản lý văn bản   Trang chủ    Địa chỉ: [chờ  │
│  đoàn VNPT.             và điều hành      Bảng giá     Line cung cấp] │
│                         Lưu trữ điện tử   Liên hệ      Điện thoại/    │
│                                           Đăng nhập    Email: [chờ…]  │
│  ────────────────────────────────────────────────────────────────    │
│  © Line Văn phòng số — thông tin bản quyền: [chờ xác nhận]           │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Đường dẫn (breadcrumb) | Link | Click | • "Trang chủ / Giải pháp / Quản lý văn bản và điều hành", chữ xám nhỏ, nằm đầu khối Hero.<br>• "Trang chủ" sang [74]; "Giải pháp" chỉ là nhãn, không bấm được; mục cuối là trang hiện tại. |
| 2 | Nhãn "GIẢI PHÁP CỦA LINE" | Badge | ReadOnly | • Viên thuốc nền trắng, viền xanh nhạt, chữ xanh đậm in hoa; icon **file-signature** (tờ giấy có bút ký) bên trái. |
| 3 | Tên giải pháp + mô tả | Label | ReadOnly | • Tiêu đề "Hệ thống Quản lý văn bản và điều hành" (chữ xanh đậm, đậm, 2 dòng).<br>• Mô tả: "Quản lý trọn vòng đời văn bản: soạn thảo, trình chuyển, ký số điện tử, phát hành toàn trình." |
| 4 | Liên hệ tư vấn (Hero) | Button | Click | • Nút đặc, nền xanh chủ đạo, chữ trắng, bo tròn.<br>• Sang [78] với **"Quản lý văn bản và điều hành" chọn sẵn**; người dùng đổi được. |
| 5 | Xem bảng giá | Button | Click | • Nút viền xanh, nền trong, chữ xanh; sang [77]. |
| 6 | Hình minh họa Hero | Image | ReadOnly | • Nền Hero chuyển sắc từ trắng (trái) sang xanh nhạt (phải). Vòng tròn lớn chuyển sắc xanh làm nền; vài chấm tròn trang trí (đỏ hồng, cam, xanh lá, xanh nhạt).<br>• Cửa sổ ứng dụng nhỏ: thanh tiêu đề 3 chấm (đỏ, cam, xanh lá), cột menu trái, các thanh xám mô phỏng nội dung, hình chữ ký ở góc dưới phải.<br>• 3 thẻ nổi bo tròn: "Ký số thành công" (icon dấu tích, nền xanh lá), "12 văn bản đến" (icon thư, nền xanh chủ đạo), "Đã phát hành" (icon gửi đi, nền cam).<br>• Chỉ mang tính minh họa, không bấm được. |
| 7 | Nhãn "★ TÍNH NĂNG MỚI · TÍCH HỢP AI" | Badge | ReadOnly | • Khối Tích hợp AI nằm trên nền xanh rất nhạt; bên trong là thẻ lớn bo góc, nền chuyển sắc xanh đậm (trái) sang xanh sáng (phải), có 2 vòng tròn mờ trang trí và vòng sáng ở góc trên trái cột trái.<br>• Nhãn dạng viên thuốc chuyển sắc đỏ hồng → đỏ, chữ trắng đậm in hoa, icon **sparkles** (tia lấp lánh) bên trái, có bóng đổ đỏ. |
| 8 | Tiêu đề + mô tả AI | Label | ReadOnly | • Tiêu đề trắng đậm "Thông minh hóa văn phòng với AI".<br>• Mô tả chữ xanh nhạt: "Tự động hóa thao tác lặp lại và hỗ trợ ngay khi cần, giúp cán bộ tập trung vào việc chính." |
| 9 | 4 tính năng AI | Label list | ReadOnly | • Mỗi dòng: icon trắng trong vòng tròn nền trắng mờ 20% (40 px) + tên (trắng, đậm vừa) + mô tả ngắn (xanh nhạt):<br>&nbsp;&nbsp;– icon **file-text** — "Tóm tắt văn bản" / "Nắm nhanh nội dung văn bản dài";<br>&nbsp;&nbsp;– icon **route** — "Gợi ý xử lý" / "Loại văn bản, độ khẩn, người xử lý";<br>&nbsp;&nbsp;– icon **scan-text** — "Trích xuất thông tin" / "Đọc văn bản scan: trích yếu, số ký hiệu";<br>&nbsp;&nbsp;– icon **clipboard-check** — "Kiểm tra chính tả" / "Rà soát lỗi trước khi trình ký". |
| 10 | Khung chat "Trợ lý AI" (ví dụ minh họa) | Card | ReadOnly | • Thẻ trắng bo góc, bóng đổ. Đầu thẻ: vòng tròn xanh chủ đạo icon **bot** + "Trợ lý AI" + chấm xanh lá "Đang hoạt động".<br>• Nền hội thoại xanh rất nhạt: (a) người dùng (bong bóng xanh, phải): "Tuần này có văn bản nào sắp đến hạn?"; (b) AI (icon **sparkles** trong vòng tròn xanh nhạt, bong bóng trắng viền): "Có 3 văn bản sắp đến hạn xử lý. Bạn muốn xem danh sách hay đặt nhắc việc?"; (c) 2 nút gợi ý viên thuốc viền xanh: "Xem danh sách", "Đặt nhắc việc"; (d) người dùng: "Xem danh sách"; (e) AI liệt kê: "Có 3 văn bản sắp đến hạn:" — 1. Công văn số [xx]/CV — hạn xử lý hôm nay; 2. Tờ trình số [xx]/TTr — còn 1 ngày; 3. Công văn số [xx]/CV — còn 2 ngày.<br>• Chân thẻ: ô "Nhập câu hỏi..." bo tròn + nút gửi tròn xanh icon **send**; dòng chú thích "Ví dụ minh họa" cỡ nhỏ.<br>• Chỉ là ảnh minh họa, không nhập/gửi được; số văn bản là dữ liệu mẫu. |
| 11 | 3 thẻ nổi quanh khối AI | Chip | ReadOnly | • Thẻ trắng bo tròn, bóng đổ, icon trắng trong vòng tròn xanh chủ đạo:<br>&nbsp;&nbsp;– "Hỏi đáp 24/7" (icon **message-circle-question**) — phía trên trái;<br>&nbsp;&nbsp;– "Tóm tắt nhanh" (icon **zap**) — phía dưới trái;<br>&nbsp;&nbsp;– "Gợi ý xử lý" (icon **route**) — phía dưới phải.<br>• Chỉ trang trí, không bấm được. |
| 12 | Vòng đời văn bản | Flow icon | ReadOnly | • Tiêu đề "Vòng đời văn bản" (gạch xanh ngắn bên dưới) + "Từ soạn thảo đến phát hành, từ tiếp nhận đến phân công xử lý".<br>• 2 làn, mỗi làn có nhãn viên thuốc; bước là icon trong ô vuông bo góc 64 px, nối nhau bằng mũi tên **chevron-right**:<br>&nbsp;&nbsp;– VĂN BẢN ĐI: **file-pen** "Tạo, soạn thảo" → **send** "Trình – chuyển" → **pen-tool** "Lãnh đạo ký số điện tử" → **rocket** "Phát hành toàn trình";<br>&nbsp;&nbsp;– VĂN BẢN ĐẾN: **inbox** "Văn thư tiếp nhận" → **book-open** "Vào sổ của đơn vị" → **send** "Trình – chuyển" → **users** "Lãnh đạo phân công".<br>• Không bấm được. |
| 13 | Các phân hệ chức năng | Card list | ReadOnly | • Tiêu đề "Các phân hệ chức năng" + "Đầy đủ nghiệp vụ văn phòng trên một nền tảng". 6 thẻ xếp 3 cột × 2 hàng; mỗi thẻ: ô icon 52 px + tên + 3 dòng có dấu tích (icon **check**):<br>&nbsp;&nbsp;– **file-text** Quản lý văn bản: Văn bản đi, đến, nội bộ; Trình – chuyển, ký số, phát hành; Sổ văn bản, tra cứu, thống kê;<br>&nbsp;&nbsp;– **list-checks** Quản lý công việc: Việc đã giao, được giao, phối hợp; Giao việc từ văn bản, chỉ đạo, cuộc họp; Theo dõi tiến độ, hạn xử lý, cảnh báo quá hạn;<br>&nbsp;&nbsp;– **folder-open** Quản lý tài liệu: Kho tài liệu dùng chung; Thư mục, chia sẻ theo quyền; Tìm kiếm nhanh nội dung;<br>&nbsp;&nbsp;– **newspaper** Tin tức nội bộ: Đăng tin, thông báo, chuyên mục; Duyệt bài trước khi đăng; Gửi tới đúng đối tượng nhận;<br>&nbsp;&nbsp;– **workflow** Luồng quy trình động: Cấu hình luồng theo loại văn bản; Tùy biến bước, người xử lý, thời hạn; Điều chỉnh không cần lập trình;<br>&nbsp;&nbsp;– **shield-check** Quản trị & phân quyền linh động: Phân quyền theo vai trò, đơn vị; Cập nhật cơ cấu tổ chức; Nhật ký hệ thống, lưu vết thao tác.<br>• Thẻ không bấm được. |
| 14 | Tuân thủ quy định của Nhà nước | Table | ReadOnly | • Khung viền, đầu khung icon **shield-check** + "Tuân thủ quy định của Nhà nước"; 5 dòng, mỗi dòng gồm nhãn loại văn bản (viên thuốc) + tên nội dung + số hiệu:<br>&nbsp;&nbsp;– Luật: Luật Giao dịch điện tử 2023 — Luật số 20/2023/QH15;<br>&nbsp;&nbsp;– Nghị định: Công tác văn thư — Nghị định 30/2020/NĐ-CP;<br>&nbsp;&nbsp;– Quyết định: Gửi, nhận văn bản điện tử giữa các cơ quan hành chính nhà nước — Quyết định 28/2018/QĐ-TTg;<br>&nbsp;&nbsp;– Nghị định: Chữ ký số và dịch vụ chứng thực chữ ký số — Nghị định 130/2018/NĐ-CP;<br>&nbsp;&nbsp;– Nghị định: Thực hiện thủ tục hành chính trên môi trường điện tử — Nghị định 45/2020/NĐ-CP.<br>• Cuối khung ghi chú: "Danh sách tổng hợp để tham khảo, cần VNPT/pháp chế rà soát số hiệu và hiệu lực trước khi công bố." [GIẢ ĐỊNH: ghi chú nội bộ này đang có trong bản Figma; cần Line/VNPT quyết định giữ hay bỏ khi công bố]. |
| 15 | Lợi ích | Icon list | ReadOnly | • 3 mục ngang, mỗi mục ô icon 48 px + tiêu đề + mô tả ngắn:<br>&nbsp;&nbsp;– **timer** "Giảm thời gian xử lý" / "Rút ngắn luồng trình ký";<br>&nbsp;&nbsp;– **eye** "Minh bạch tiến độ" / "Theo dõi từng bước";<br>&nbsp;&nbsp;– **plug-zap** "Dễ mở rộng, tích hợp" / "Liên thông hệ thống khác". |
| 16 | Dải kêu gọi liên hệ | Banner + Button | Click | • Băng nền xanh chủ đạo bo góc: "Sẵn sàng số hóa văn phòng cho đơn vị của bạn?" + nút "Liên hệ tư vấn"; bên phải là hình trang trí (2 vòng tròn mờ, vòng tròn chứa icon **headset**).<br>• Nút sang [78] với "Quản lý văn bản và điều hành" chọn sẵn. |
| 17 | Chân trang | Label + Link | Click | • Cột 1: "Line Văn phòng số" + "Một sản phẩm của Tập đoàn Bưu chính Viễn thông Việt Nam (VNPT)."<br>• Cột "Giải pháp": "Quản lý văn bản và điều hành" (trang hiện tại, sang [75]), "Lưu trữ điện tử" (sang [76]).<br>• Cột "Liên kết": Trang chủ sang [74]; Bảng giá sang [77]; Liên hệ sang [78]; Đăng nhập sang [1].<br>• Cột "Liên hệ": Địa chỉ / Điện thoại / Email: [chờ Line cung cấp].<br>• Dòng cuối: "© Line Văn phòng số — thông tin bản quyền: [chờ xác nhận]". |

- Header portal (logo "Line Văn phòng số", menu Trang chủ / Giải pháp (đang chọn, có mũi tên xổ) / Bảng giá / Liên hệ, nút Đăng nhập) dùng chung cho mọi màn portal, mô tả ở [74]; màn này chỉ khác là mục "Giải pháp" đang được chọn.

- Toàn bộ nội dung (mô tả, tính năng, phân hệ, quy định, lợi ích, khung chat, thông tin liên hệ) là nội dung mẫu do Line cung cấp, cố định, chưa có màn quản trị nội dung [chốt 28/09/2026]. Đây là màn tĩnh: chỉ các nút/link [1], [4], [5], [16], [17] bấm được.

- Gõ sai đường dẫn portal (chưa đăng nhập) sang [61] biến thể khách chưa đăng nhập, có lối "Về trang chủ portal [74]" và "Đăng nhập" (OQ-42).

---

## Screen: portal-giai-phap-luu-tru — Giải pháp: Hệ thống Lưu trữ điện tử

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ LINE Trang chủ|Giải pháp v|Bảng giá|Liên hệ        [ Đăng nhập ]     │
├──────────────────────────────────────────────────────────────────────┤
│ [1] < Trang chủ > / Giải pháp / Lưu trữ điện tử                      │
├──────────────────────────────────────────────────────────────────────┤
│ [2] Hệ thống Lưu trữ điện tử                                         │
│     Lưu trữ, bảo quản và tra cứu hồ sơ, tài liệu số an toàn          │
├──────────────────────────────────────────────────────────────────────┤
│ [3] Tổng quan                             [4]                        │
│ Tập trung hồ sơ, tài liệu số; tìm       [ IMG: giao diện hệ thống ]  │
│ kiếm nhanh và kiểm soát quyền truy cập.                              │
├──────────────────────────────────────────────────────────────────────┤
│ [5] Tính tiện ích nổi bật                                            │
│ - Lưu trữ hồ sơ số   - Tra cứu nhanh     - Phân quyền truy cập       │
│ - Nộp lưu văn bản    - Bảo quản lâu dài  - Nhật ký truy cập          │
├──────────────────────────────────────────────────────────────────────┤
│ [6] Lợi ích                                                          │
│  - Tiết kiệm không gian   - Truy xuất nhanh   - Bảo mật hồ sơ        │
├──────────────────────────────────────────────────────────────────────┤
│ [7][ Liên hệ tư vấn ]  [8]< Xem bảng giá >  [9]< Quản lý văn bản >   │
├──────────────────────────────────────────────────────────────────────┤
│ Line Văn phòng số | Thông tin liên hệ: [chờ Line cung cấp]           │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Đường dẫn (breadcrumb) | Link | Click | • "Trang chủ" sang [74]; "Giải pháp" chỉ là nhãn, không bấm được. |
| 2 | Tên giải pháp | Label | ReadOnly | • "Hệ thống Lưu trữ điện tử" kèm 1 câu giới thiệu. |
| 3 | Tổng quan | Label | ReadOnly | • Nội dung mẫu, cố định, do Line cung cấp. |
| 4 | Ảnh minh họa | Image | ReadOnly | • Ảnh giao diện hệ thống do Line cung cấp. |
| 5 | Tính năng nổi bật | Label list | ReadOnly | • Danh sách mẫu (Lưu trữ hồ sơ số, Tra cứu nhanh, Phân quyền truy cập, Nộp lưu văn bản, Bảo quản lâu dài, Nhật ký truy cập); danh sách chính thức do Line chốt [GIẢ ĐỊNH]. |
| 6 | Lợi ích | Label list | ReadOnly | • Nội dung mẫu, do Line cung cấp. |
| 7 | Liên hệ tư vấn | Button | Click | • Sang [78] với **"Lưu trữ điện tử" chọn sẵn**; người dùng đổi được. |
| 8 | Xem bảng giá | Link | Click | • Sang [77]. |
| 9 | Giải pháp khác | Link | Click | • Sang [75] (Quản lý văn bản và điều hành). |

---

## Screen: portal-bang-gia — Bảng giá

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ LINE Trang chủ|Giải pháp v|Bảng giá|Liên hệ        [ Đăng nhập ]     │
├──────────────────────────────────────────────────────────────────────┤
│ Bảng giá                                                             │
├──────────────────────────────────────────────────────────────────────┤
│ [1] Hệ thống Quản lý văn bản và điều hành                            │
│ Gói               Phạm vi                        Giá                 │
│ [Tên gói]         [Số người dùng, chức năng]     [Giá - chờ Line]    │
│ [Tên gói]         [Số người dùng, chức năng]     [Giá - chờ Line]    │
│                                          [2][ Liên hệ tư vấn ]       │
├──────────────────────────────────────────────────────────────────────┤
│ [3] Hệ thống Lưu trữ điện tử                                         │
│ Gói               Phạm vi                        Giá                 │
│ [Tên gói]         [Dung lượng, chức năng]        [Giá - chờ Line]    │
│                                          [4][ Liên hệ tư vấn ]       │
├──────────────────────────────────────────────────────────────────────┤
│ [5] Ghi chú về giá: [chờ Line cung cấp]                              │
├──────────────────────────────────────────────────────────────────────┤
│ Line Văn phòng số | Thông tin liên hệ: [chờ Line cung cấp]           │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Khối giá Quản lý văn bản và điều hành | Table | ReadOnly | • Bảng giá là **một trang chung, chia khối theo giải pháp** (chốt 28/09/2026). Cột: Gói, Phạm vi, Giá.<br>• Dữ liệu cố định do Line cung cấp; chưa có nguồn số liệu nên giữ chỗ trống, không bịa giá. |
| 2 | Liên hệ tư vấn (khối Quản lý văn bản) | Button | Click | • Sang [78] với "Quản lý văn bản và điều hành" chọn sẵn. |
| 3 | Khối giá Lưu trữ điện tử | Table | ReadOnly | • Như [1], theo giải pháp Lưu trữ điện tử. |
| 4 | Liên hệ tư vấn (khối Lưu trữ) | Button | Click | • Sang [78] với "Lưu trữ điện tử" chọn sẵn. |
| 5 | Ghi chú về giá | Label | ReadOnly | • Điều kiện áp dụng, thuế... [chờ Line cung cấp]. |

---

## Open Questions / quyết định của flow này

| Mã | Nội dung | Trạng thái |
|----|----------|------------|
| OQ-41 | Địa chỉ gốc mở [74]; người đã có phiên vẫn xem được portal, nút đổi thành "Vào khu vực của tôi"; đăng xuất vẫn về [1] | Đã chốt (khách hàng xác nhận, 28/09/2026) |
| OQ-42 | Đường dẫn portal sai sang [61] biến thể khách chưa đăng nhập | Đã chốt (khách hàng xác nhận, 28/09/2026) |
| — | Bỏ đăng ký; nội dung portal và bảng giá cố định, bảng giá một trang chung | Đã chốt (28/09/2026) |
| — | Nội dung giới thiệu, danh sách tính năng, lợi ích, giá, thông tin liên hệ của Line | Chờ Line cung cấp |
