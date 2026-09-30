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

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ LINE Trang chủ|Giải pháp v|Bảng giá|Liên hệ        [ Đăng nhập ]     │
├──────────────────────────────────────────────────────────────────────┤
│ [1] < Trang chủ > / Giải pháp / Quản lý văn bản và điều hành         │
├──────────────────────────────────────────────────────────────────────┤
│ [2] Hệ thống Quản lý văn bản và điều hành                            │
│     Số hóa toàn bộ vòng đời văn bản và công việc của cơ quan         │
├──────────────────────────────────────────────────────────────────────┤
│ [3] Tổng quan                             [4]                        │
│ Nhận, xử lý, ký số và lưu vết văn bản     [ IMG: giao diện hệ thống ]│
│ trên một hệ thống thống nhất.                                        │
├──────────────────────────────────────────────────────────────────────┤
│ [5] Tính tiện ích nổi bật                                            │
│ - Văn bản đến        - Văn bản đi        - Ký số                     │
│ - Lịch công tác      - Hồ sơ công việc   - Báo cáo                   │
├──────────────────────────────────────────────────────────────────────┤
│ [6] Lợi ích                                                          │
│  - Giảm thời gian xử lý   - Minh bạch tiến độ   - Dễ mở rộng         │
├──────────────────────────────────────────────────────────────────────┤
│ [7][ Liên hệ tư vấn ]  [8]< Xem bảng giá >  [9]< Lưu trữ điện tử >   │
├──────────────────────────────────────────────────────────────────────┤
│ Line Văn phòng số | Thông tin liên hệ: [chờ Line cung cấp]           │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Đường dẫn (breadcrumb) | Link | Click | • "Trang chủ" sang [74]; "Giải pháp" chỉ là nhãn, không bấm được. |
| 2 | Tên giải pháp | Label | ReadOnly | • "Hệ thống Quản lý văn bản và điều hành" kèm 1 câu giới thiệu. |
| 3 | Tổng quan | Label | ReadOnly | • Nội dung mẫu, cố định, do Line cung cấp. |
| 4 | Ảnh minh họa | Image | ReadOnly | • Ảnh giao diện hệ thống do Line cung cấp. |
| 5 | Tính năng nổi bật | Label list | ReadOnly | • Danh sách mẫu (Văn bản đến, Văn bản đi, Ký số, Lịch công tác, Hồ sơ công việc, Báo cáo) — lấy theo các chức năng đã nêu trong tài liệu CSKH; danh sách chính thức do Line chốt [GIẢ ĐỊNH]. |
| 6 | Lợi ích | Label list | ReadOnly | • Nội dung mẫu, do Line cung cấp. |
| 7 | Liên hệ tư vấn | Button | Click | • Sang [78] với **"Quản lý văn bản và điều hành" chọn sẵn**; người dùng đổi được. |
| 8 | Xem bảng giá | Link | Click | • Sang [77]. |
| 9 | Giải pháp khác | Link | Click | • Sang [76] (Lưu trữ điện tử). |

- Header portal (thanh menu + nút Đăng nhập) dùng chung cho mọi màn portal, chỉ đánh số ở [74]; các màn sau không lặp lại mô tả. Nội dung giới thiệu, tính năng, lợi ích, giá và thông tin liên hệ chỉ là nội dung mẫu do Line cung cấp, cố định, chưa có màn quản trị nội dung [chốt 28/09/2026].

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
