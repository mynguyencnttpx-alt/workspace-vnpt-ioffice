# Design System — VNPT iOffice

> Nguồn: màu thương hiệu `#005baa` + trắng (do BA cung cấp). Các giá trị đánh dấu **[GIẢ ĐỊNH]** là đề xuất, chờ xác nhận từ VNPT. Tỷ lệ tương phản là số tự tính theo công thức WCAG, cần kiểm lại bằng công cụ đo trước khi giao dev.

## 1. Màu sắc

### 1.1 Thương hiệu
| Token | Mã màu | Dùng cho | Tương phản với trắng |
|---|---|---|---|
| primary | `#005baa` | Nút chính, liên kết, viền focus, mục đang chọn | 6.8:1 |
| primary-hover | `#004a8a` **[GIẢ ĐỊNH]** | Rê chuột, bấm nút chính | 9.0:1 |
| primary-tint | `#e6eff7` **[GIẢ ĐỊNH]** | Nền dòng đang chọn, huy hiệu thông tin | nền |
| white | `#ffffff` | Bề mặt thẻ, bảng, ô nhập; chữ trên nút primary | nền |

### 1.2 Trung tính
| Token | Mã màu | Dùng cho | Tương phản với trắng |
|---|---|---|---|
| bg-page | `#f8fafc` | Nền trang | nền |
| bg-hover | `#f1f5f9` | Hover hàng bảng, nền thành phần vô hiệu | nền |
| border-subtle | `#e2e8f0` | Viền thẻ, đường kẻ (chỉ trang trí) | nền |
| border-input | `#64748b` | Viền ô nhập | 4.8:1 |
| text-primary | `#0f172a` | Tiêu đề | 17:1 |
| text-body | `#334155` | Nội dung | 10:1 |
| text-muted | `#64748b` | Chú thích, placeholder (chỉ trên nền trắng) | 4.8:1 |
| text-muted-on-tint | `#475569` | Chữ phụ trên nền xám hoặc nền màu | 7.6:1 |
| text-disabled | `#94a3b8` | Chữ vô hiệu (miễn chuẩn tương phản, phải kèm dấu hiệu khác) | 2.6:1 |

### 1.3 Trạng thái
Huy hiệu dùng cặp nền nhạt + chữ đậm + biểu tượng. Màu đặc dùng cho biểu tượng và nút.

| Trạng thái | Nền nhạt | Chữ trên nền nhạt | Màu đặc | Tương phản (chữ/nền nhạt) | Tương phản (đặc/trắng) |
|---|---|---|---|---|---|
| Thành công | `#dcfce7` | `#166534` | `#15803d` | 6.5:1 | 5.0:1 |
| Cảnh báo | `#fef3c7` | `#92400e` | `#b45309` | 6.4:1 | 5.0:1 |
| Lỗi | `#fee2e2` | `#b91c1c` | `#dc2626` | 5.3:1 | 4.8:1 |
| Thông tin | `#e6eff7` | `#005baa` | `#005baa` | 5.9:1 | 6.8:1 |

### 1.4 Quy tắc dùng màu
- Trạng thái luôn kèm biểu tượng và chữ, không dựa vào màu một mình (3 màu đặc có độ sáng gần bằng nhau, người khó phân biệt màu sẽ nhầm).
- Ô nhập dùng viền `border-input`; `border-subtle` chỉ cho đường kẻ trang trí.
- Dòng đang chọn: nền `primary-tint` + thanh `primary` 3px bên trái + chữ `primary` đậm.
- Focus bàn phím: viền `primary` 2px, cách phần tử 2px (khoảng trắng bằng nền).
- Chữ phụ trên nền xám hoặc nền màu dùng `text-muted-on-tint`, không dùng `text-muted`.
- Thẻ trên `bg-page` có viền `border-subtle`.
- Không có chế độ tối.

## 2. Font chữ
| Vai trò | Font | Trọng số |
|---|---|---|
| Tiêu đề | Be Vietnam Pro | 600–700 |
| Nội dung, nhãn, nút | Noto Sans | 400 (nội dung), 500–600 (nhãn, nút) |

Cả hai là font Google Fonts, hỗ trợ đầy đủ dấu tiếng Việt.

### Thang cỡ chữ **[GIẢ ĐỊNH]**
| Cỡ | Dùng cho |
|---|---|
| 32 | Tiêu đề trang lớn (hiếm dùng) |
| 24 | Tiêu đề trang |
| 20 | Tiêu đề mục |
| 16 | Nội dung nhấn mạnh, tiêu đề thẻ |
| 14 | Nội dung mặc định, nhãn, nút |
| 12 | Chú thích (không dùng cho chữ quan trọng) |

Chiều cao dòng nội dung: 1.5.

## 3. Hình khối **[GIẢ ĐỊNH]**
- Bo góc: 4 (huy hiệu, ô nhỏ) / 6 (nút, ô nhập) / 8 (thẻ) / 12 (hộp thoại).
- Khoảng cách theo lưới 4px: 4 / 8 / 12 / 16 / 24 / 32.
- Bóng đổ: nhẹ cho thẻ; rõ hơn cho hộp thoại và menu nổi.

## 4. Thiết bị và bố cục
- Thiết bị chính: **Desktop**, khung 1024. Nội dung tối đa 1280 **[GIẢ ĐỊNH]**.
- Responsive: tablet 768, mobile 375.
- Form, đăng nhập, hộp thoại nằm trong khung hẹp căn giữa (khoảng 380–460px), input và nút full-width trong khung đó, không kéo hết bề ngang.
- Màn danh sách, bảng, dashboard trải theo độ rộng nội dung.

## 5. Component cốt lõi
Tên và trạng thái để bước dựng Figma bám theo. Bộ component đặc thù iOffice (thanh điều hướng, thẻ văn bản, bộ lọc) chưa có thông tin, sẽ bổ sung sau.

| Component | Trạng thái |
|---|---|
| Nút | chính, phụ, vô hiệu (mỗi loại: thường, hover, focus) |
| Ô nhập | thường, focus, lỗi, vô hiệu |
| Huy hiệu trạng thái | thành công, cảnh báo, lỗi, thông tin, nháp |
| Dòng bảng | thường, hover, đang chọn |
| Thẻ | thường |
| Hộp thoại | thường |
| Banner thông báo | thành công, cảnh báo, lỗi, thông tin |

## 6. Việc còn mở
- [ ] Xác nhận với VNPT: màu dẫn xuất, thang cỡ chữ, bo góc, độ rộng khung.
- [ ] Kiểm lại tỷ lệ tương phản bằng công cụ đo.
- [ ] Bổ sung component đặc thù iOffice.
