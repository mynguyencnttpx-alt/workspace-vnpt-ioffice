# Flow: Tham số & định mức

> Màn hình thuộc flow này: phan-quyen-thamso → dinh-bien-km-list → dinh-bien-km-form, phan-quyen-thamso → dinh-muc-xe-danhmuc. Flow tổng xem `../srs/dang-ky-xe-tkv-userflow.md` Mục 1.

---

## Screen: phan-quyen-thamso — Phân quyền & tham số

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Phân quyền & tham số                                              │
├──────────────────────────────────────────────────────────────────┤
│ Ma trận quyền theo vai trò                                    [1]│
│ ┌────────────────────────────────────────────────────────────┐  │
│ │ Quyền              |CV Ban|LĐBan|CVP|Đội trưởng|Lái xe|QTHT│  │
│ │ Đăng ký xe          | [x] | [ ] |[ ]|   [ ]    | [ ]  |[x] │  │
│ │ Duyệt phiếu         | [ ] | [x] |[x]|   [ ]    | [ ]  |[x] │  │
│ │ Cấp xe/điều động    | [ ] | [ ] |[ ]|   [x]    | [ ]  |[x] │  │
│ │ Xác nhận đi về      | [x] | [ ] |[ ]|   [ ]    | [x]  |[x] │  │
│ │ Quản trị danh mục   |     |     |   |          |      |    │  │
│ │  xe/lái xe          | [ ] | [ ] |[ ]|   [ ]    | [ ]  |[x] │  │
│ │ Nhập/điều chỉnh     |     |     |   |          |      |    │  │
│ │  định biên km       | [ ] | [ ] |[ ]|   [ ]    | [ ]  |[x] │  │
│ │ Quản trị định mức xe| [ ] | [ ] |[ ]|   [ ]    | [ ]  |[x] │  │
│ │ Xem audit log       | [ ] | [ ] |[ ]|   [ ]    | [ ]  |[x] │  │
│ └────────────────────────────────────────────────────────────┘  │
│                                                                    │
│ Phạm vi đơn vị                                                [2]│
│  VP trụ sở chính: quản lý xe/lái xe riêng                        │
│  VP Hạ Long     : quản lý xe/lái xe riêng                        │
│  (xe/lái xe khối cơ quan tập đoàn + đảng, đoàn thể: dùng chung)  │
│                                                                    │
│ Cấu hình mượn xe chéo đơn vị                                  [3]│
│ ┌────────────────────────────────────────────────────────────┐  │
│ │ Đơn vị sở hữu xe   | Đơn vị được phép mượn   | Cho phép     │  │
│ │ VP trụ sở chính    | VP Hạ Long              | [ ]          │  │
│ │ VP Hạ Long         | VP trụ sở chính         | [ ]          │  │
│ └────────────────────────────────────────────────────────────┘  │
│ [ + Thêm cấu hình mượn xe ]                                       │
│                                                                    │
│ Cấu hình "Lãnh đạo Ban xác nhận" theo đơn vị                 [4]│
│ ┌────────────────────────────────────────────────────────────┐  │
│ │ Đơn vị              | Bật bước LĐ Ban xác nhận              │  │
│ │ Ban Tổ chức         | [x]                                   │  │
│ │ Ban Kỹ thuật        | [x]                                   │  │
│ │ Ban Kế hoạch        | [ ]                                   │  │
│ └────────────────────────────────────────────────────────────┘  │
│                                                                    │
│ < Xem audit log hệ thống >                                    [5]│
│                                                                    │
│ [ Lưu thay đổi ]                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Ma trận quyền theo vai trò | Checkbox (bảng) | Check | • Mỗi ô: role có/không có quyền tương ứng. "QTHT" (Quản trị hệ thống) mặc định full quyền, không tắt được (validate).<br>• 2 quyền "quản trị biểu mẫu động" (B2) và "xem nhật ký xe" (B4) **chưa xuất hiện** trong ma trận đợt này — sẽ thêm cột khi B2/B4 được xây (GAP A10). |
| 2 | Phạm vi đơn vị | Label | ReadOnly | • Mô tả nguyên tắc: VP trụ sở chính và VP Hạ Long quản lý xe/lái xe riêng (không đăng ký chéo mặc định — GAP A1); xe/lái xe khối cơ quan tập đoàn + đảng, đoàn thể dùng chung, không tách theo văn phòng. |
| 3 | Cấu hình mượn xe chéo đơn vị | Checkbox (bảng) + Button | Check + Click | • Chính là cơ chế "cấu hình linh động" (GAP A1) đã chốt với khách hàng: bật cho phép đơn vị A đăng ký mượn xe của đơn vị B dù khác văn phòng quản lý.<br>• Khi bật, màn `dk-xe-form` (flow `dang-ky-va-duyet-xe`) và `cap-xe` (flow `cap-xe-dieudong`) sẽ hiển thị thêm xe của đơn vị được phép mượn trong danh sách gợi ý (ghi chú liên kết, không sửa nội dung 2 màn đó ở đợt này). |
| 4 | Cấu hình "Lãnh đạo Ban xác nhận" theo đơn vị | Checkbox (bảng) | Check | • Đây chính là điều kiện quyết định `d1` trong flow `dang-ky-va-duyet-xe` đã duyệt trước đó (bật/tắt bước duyệt Lãnh đạo Ban). Đổi cấu hình chỉ áp dụng cho phiếu đăng ký **mới** từ thời điểm đổi; phiếu đang chờ ở bước Lãnh đạo Ban giữ nguyên luồng đã vào (business rule đã chốt qua UX review). |
| 5 | Xem audit log hệ thống | Link | Click | • Trỏ tới module audit log dùng chung của hệ thống VNPT iOffice (ngoài phạm vi feature này) — hiển thị mọi thao tác đã ghi log (GAP A10 "ghi log mọi thao tác"). |

---

## Screen: dinh-bien-km-list — Danh mục định biên km theo đơn vị

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Danh mục định biên km theo đơn vị          [ + Thêm định biên ]  │
├──────────────────────────────────────────────────────────────────┤
│ Đơn vị/cá nhân: [v: Tất cả          ]   Năm: [v: 2026        ][1]│
├──────────────────────────────────────────────────────────────────┤
│ Đơn vị/cá nhân      | Km/năm | Hiệu lực            | TT       [2]│
│ Ban Tổ chức         | 3.000  | 01/01/26 - 31/12/26 | Hiệu lực   │
│ Ban Kỹ thuật        | 2.500  | 01/01/26 - 31/12/26 | Hiệu lực   │
│ PGĐ TT ĐHSX Q.Ninh  | 1.200  | 01/01/26 - 31/12/26 | Hiệu lực   │
│ (scroll xuống xem thêm)                                          │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Lọc (đơn vị/cá nhân, năm) | Dropdown | Select | • Không bắt buộc. Lọc theo đơn vị hoặc cá nhân đặc thù, năm hiệu lực. |
| 2 | Bảng định biên | Label (bảng) + Link mỗi dòng | ReadOnly + Click | • Click 1 dòng → điều hướng `dinh-bien-km-form` (chế độ sửa). 1 đơn vị/cá nhân có thể có nhiều dòng theo thời gian (GAP B1 "điều chỉnh theo thời gian, không fix"); cột TT hiển thị "Hiệu lực" hoặc "Hết hiệu lực" theo ngày hiện tại so với khoảng hiệu lực. |

---

## Screen: dinh-bien-km-form — Thêm/sửa định biên km

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Thêm/sửa định biên km                                             │
├──────────────────────────────────────────────────────────────────┤
│ Đối tượng áp dụng                                             [1]│
│ (*) Đơn vị:      [v: -- chọn đơn vị --      ]                   │
│ ( ) Cá nhân đặc thù: [v: -- chọn người --   ]                    │
│                                                                    │
│ Km định biên/năm  [________]                                  [2]│
│                                                                    │
│ Hiệu lực từ ngày [__/__/____]  đến ngày [__/__/____]         [3]│
│                                                                    │
│ Văn bản quy định căn cứ                                           │
│ [ < Đính kèm văn bản > ]   Đã chọn: Không có                     │
│                                                                    │
│ [ Lưu ]                                                           │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Đối tượng áp dụng | Radio + Dropdown | Select | • Bắt buộc chọn 1 trong 2: đơn vị hoặc cá nhân đặc thù (GAP B1). Cá nhân đặc thù dùng cho trường hợp như PGĐ Trung tâm ĐHSX Quảng Ninh tính định mức như 1 ban (đối chiếu GAP A3). |
| 2 | Km định biên/năm | Textbox (số) | Text | • Bắt buộc, số nguyên dương. |
| 3 | Hiệu lực từ-đến ngày | Datepicker | Text | • Bắt buộc cả 2. Đến ngày phải sau từ ngày.<br>• Validate: không cho lưu nếu khoảng hiệu lực **trùng lấn** với bản ghi khác đã có của cùng đơn vị/cá nhân — báo rõ bản ghi đang trùng (mã + khoảng hiệu lực), chặn lưu tới khi sửa lại khoảng ngày. |

---

## Screen: dinh-muc-xe-danhmuc — Danh mục định mức xe

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Danh mục định mức xe                    [ + Thêm định mức ]      │
├──────────────────────────────────────────────────────────────────┤
│ (!) Đang chờ TKV cung cấp quy định nội bộ cụ thể — khung dưới [1]│
│     đây là tối thiểu, sẽ bổ sung khi có văn bản quy định.         │
├──────────────────────────────────────────────────────────────────┤
│ Tên định mức      [________________]                          [2]│
│ Mô tả              [________________________________________]   │
│ Hiệu lực từ ngày   [__/__/____]  đến ngày [__/__/____]           │
│ Văn bản quy định   [ < Đính kèm văn bản > ]  Đã chọn: Không có   │
│                                                                    │
│ [ Lưu ]                                                           │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Cảnh báo chờ quy định | Label (warning) | ReadOnly | • Ghi nhận Open Question OQ-4: TKV chưa cung cấp quy định nội bộ cụ thể (văn bản chị Len gửi — GAP B9). Khung field hiện tại là tối thiểu, sẽ hoàn thiện khi có quy định. |
| 2 | Tên định mức / Mô tả / Hiệu lực / Văn bản quy định | Textbox + Datepicker + Upload | Text | • Bắt buộc tên định mức. Mô tả/hiệu lực/văn bản không bắt buộc ở khung tối thiểu này.<br>• Mục đích: hệ thống dùng dữ liệu này để tự gợi ý khi điều vận (GAP B9) — logic gợi ý cụ thể để dành đợt sau khi có quy định. |
