# Flow: Xác nhận đi về

> Màn hình thuộc flow này: xacnhan-diove-nhap → xacnhan-diove-banxacnhan → phieu-xacnhan-diove. Flow tổng xem `../srs/dang-ky-xe-tkv-userflow.md` Mục 1.

---

## Screen: xacnhan-diove-nhap — Nhập xác nhận đi về

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Xác nhận đi về — DKX-0231                                         │
├──────────────────────────────────────────────────────────────────┤
│  Lộ trình: Hà Nội - Hạ Long   Xe: 29A-123.45   Lái xe: Lê Văn D  │
│                                                                    │
│ Km công tơ                                                    [1]│
│  Km đầu (xuất phát) [________]   Km cuối (về) [________]         │
│  => Km thực tế chuyến: 220 km                                    │
│                                                                    │
│ Thời gian về thực tế [__/__/____ __:__]                      [2]│
│                                                                    │
│ Chia km cho các đơn vị tham gia                               [3]│
│ ┌────────────────────────────────────────────────────────────┐  │
│ │ Đơn vị          | Số người | Km chia    |                   │  │
│ │ Ban Tổ chức     | 3        | [__110__]  |                   │  │
│ │ Ban Kỹ thuật    | 2        | [__110__]  |                   │  │
│ │ (nếu ghép xe: thêm dòng cho từng phiếu gốc khác)             │  │
│ └────────────────────────────────────────────────────────────┘  │
│ (info) Hệ thống gợi ý chia đều; có thể chỉnh nếu nối/ghép chuyến│
│                                                                    │
│ Hạch toán cá nhân đặc thù (nếu áp dụng)                       [4]│
│ [ ] PGĐ Trung tâm ĐHSX Quảng Ninh — km riêng: [________]         │
│                                                                    │
│ Ghi chú chuyến đi                                                 │
│ [________________________________________________________]      │
│                                                                    │
│ [ Gửi xác nhận ]                                              [5]│
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Km công tơ (đầu/cuối) | Textbox (số) | Text | • Bắt buộc, số nguyên. Km cuối phải ≥ km đầu (validate). Km thực tế chuyến tự tính = cuối − đầu, đồng thời cộng dồn vào **tổng km theo đăng ký xe** và **số km công tơ thực tế** ở Danh mục xe — tính theo vòng đời xe, không phân biệt đơn vị quản lý (GAP A1). |
| 2 | Thời gian về thực tế | Datetime picker | Text | • Bắt buộc. **Nguyên tắc tính tháng: km tính theo ngày về** (ngày về thuộc tháng nào tính báo cáo cho tháng đó) — business rule cố định theo GAP A6, không cấu hình được. |
| 3 | Bảng chia km theo đơn vị | Label + Textbox (số, nhiều dòng) | ReadOnly + Text | • Hệ thống suggest chia đều theo số người mỗi đơn vị (lấy từ danh sách ở `dk-xe-form`); lái xe có thể điều chỉnh tay khi có nối chuyến/ghép chuyến thực tế khác với dự kiến.<br>• Nếu phiếu thuộc nhóm ghép xe (B3): mỗi phiếu đăng ký gốc là 1 dòng riêng — dữ liệu này là cơ sở để tách sinh N phiếu xác nhận đi về ở bước sau.<br>• Tổng km chia phải khớp km thực tế chuyến ở [1] (validate). |
| 4 | Hạch toán cá nhân đặc thù | Checkbox + Textbox (số) | Check + Text | • Chỉ hiện nếu phiếu đăng ký ban đầu đã chọn hạch toán "cá nhân đặc thù" (`dk-xe-form`). Km riêng của cá nhân này tách khỏi bảng chia theo đơn vị ở [3] (vd PGĐ Trung tâm ĐHSX Quảng Ninh tính định mức như 1 ban — GAP A3). |
| 5 | Gửi xác nhận | Button (primary) | Click | • Validate: km cuối ≥ km đầu, tổng km chia khớp km thực tế, đã nhập thời gian về.<br>• Thành công → sinh phiếu xác nhận đi về (1 phiếu, hoặc N phiếu nếu ghép xe — mỗi phiếu ứng với 1 đơn vị gốc), thông báo tới **tất cả** đại diện các đơn vị tham gia, điều hướng mỗi đại diện vào `xacnhan-diove-banxacnhan` tương ứng phiếu của đơn vị mình. |

---

## Screen: xacnhan-diove-banxacnhan — Đại diện ban xác nhận + đánh giá

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Xác nhận đi về — Ban Tổ chức — DKX-0231                           │
├──────────────────────────────────────────────────────────────────┤
│  Lộ trình: Hà Nội - Hạ Long, 05/08/2026                          │
│  Km chia cho Ban Tổ chức: 110 km                                 │
│  Lái xe: Lê Văn D                                                 │
│                                                                    │
│ Trạng thái xác nhận các đơn vị tham gia                       [1]│
│  Ban Tổ chức  : Đang chờ bạn xác nhận                            │
│  Ban Kỹ thuật : Đã xác nhận (05/08 19:10)                        │
│                                                                    │
│ Đánh giá chuyến đi                                             [2]│
│  Đánh giá lái xe: (*)(*)(*)(*)( )                                │
│  Ý kiến: [________________________________________________]     │
│                                                                    │
│ [ Không đồng ý (phản đối km) ]      [ Đồng ý & Ký điện tử ]  [3]│
│                                     (qua SignServer)              │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Trạng thái xác nhận các đơn vị | Label (list) | ReadOnly | • Hiển thị tiến độ xác nhận của **tất cả** đơn vị tham gia — phiếu chỉ hoàn tất khi đủ hết (business rule đã chốt: bắt buộc tất cả đại diện các đơn vị đi trên chuyến xác nhận). |
| 2 | Đánh giá chuyến đi | Rating (5 sao) + Textbox | Select + Text | • Không bắt buộc. Đánh giá lái xe — mở rộng từ "đánh giá lái xe đã có" cho từng đại diện ban (GAP A6), tổng hợp hiển thị ở Danh mục lái xe (A2 "lịch sử phục vụ, đánh giá"). |
| 3 | Đồng ý & Ký điện tử / Không đồng ý | Button (primary) / Button (secondary) | Click | • "Đồng ý & Ký điện tử": gọi SignServer ký điện tử phiếu xác nhận (đại diện ban ký — **lái xe không cần ký**, theo GAP A6). Đủ tất cả đơn vị ký xong → điều hướng `phieu-xacnhan-diove`, phiếu chuyển "Hoàn tất".<br>• "Không đồng ý (phản đối km)": tách biệt với trạng thái "chưa xác nhận" — điều hướng quay lại `xacnhan-diove-nhap` để lái xe/điều vận chia lại km, sau đó gửi xác nhận lại vòng 2 cho tất cả các ban.<br>• Lỗi/timeout kết nối SignServer → thông báo lỗi + nút "Thử lại ký điện tử", không tự chuyển trạng thái khi chưa ký thành công. |

---

## Screen: phieu-xacnhan-diove — Phiếu xác nhận đi về

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Phiếu xác nhận đi về — DKX-0231 (Ban Tổ chức)                     │
├──────────────────────────────────────────────────────────────────┤
│  Trạng thái: Hoàn tất                                             │
│                                                                    │
│  Lộ trình     : Hà Nội - Hạ Long                                  │
│  Thời gian    : 05/08/2026 07:00 - 05/08/2026 19:00              │
│  Km            : 110 km (Ban Tổ chức)                             │
│  Lái xe        : Lê Văn D — đánh giá 4/5                          │
│  Chữ ký        : Đại diện Ban Tổ chức (SignServer, 05/08 19:20)  │
│                                                                    │
│ [ Tải phiếu (PDF theo biểu mẫu chuẩn) ]                       [1]│
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Tải phiếu | Button (secondary) | Click | • Gen file phiếu xác nhận đi về theo biểu mẫu chuẩn của đơn vị (template động — GAP B2, ngoài phạm vi đợt này; tạm dùng bố cục mặc định).<br>• Nếu phiếu thuộc nhóm ghép xe (B3): mỗi đơn vị gốc có 1 phiếu riêng như màn này (không gộp chung 1 file cho cả nhóm). |
