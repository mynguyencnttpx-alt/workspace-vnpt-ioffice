# Design System — VPS Support Portal

> Hệ thống hỗ trợ khách hàng trong quá trình sử dụng các dịch vụ do đơn vị quản lý. Nguồn: màu thương hiệu VNPT `#005baa` + trắng (do BA cung cấp). Các giá trị đánh dấu **[GIẢ ĐỊNH]** là đề xuất, chờ xác nhận. Tỷ lệ tương phản là số tự tính theo công thức WCAG, cần kiểm lại bằng công cụ đo trước khi giao dev.

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

Chiều cao dòng nội dung: 1.5. Trên mobile, ô nhập dùng chữ 16 để trình duyệt điện thoại không tự phóng to khi bấm vào.

## 3. Hình khối **[GIẢ ĐỊNH]**
- Bo góc: 4 (huy hiệu, ô nhỏ) / 6 (nút, ô nhập) / 8 (thẻ) / 12 (hộp thoại).
- Khoảng cách theo lưới 4px: 4 / 8 / 12 / 16 / 24 / 32.
- Bóng đổ: nhẹ cho thẻ; rõ hơn cho hộp thoại và menu nổi.

## 4. Thiết bị và bố cục
- Nền tảng: **web có responsive**, không làm app riêng. Khách hàng dùng trực tiếp trên trình duyệt điện thoại.
- Phía **khách hàng**: ưu tiên **mobile 375** (thiết kế trước), sau đó tablet 768 và desktop.
- Phía **nhân viên hỗ trợ và quản trị viên**: ưu tiên **desktop 1024** trở lên, nội dung tối đa 1280 **[GIẢ ĐỊNH]**; vẫn xem được trên tablet 768.
- Vùng bấm tối thiểu 44px (nút, ô nhập, dòng danh sách) trên mọi màn khách hàng.
- Form, đăng nhập, hộp thoại nằm trong khung hẹp căn giữa (khoảng 380–460px), input và nút full-width trong khung đó. Trên mobile khung chiếm toàn bề ngang trừ lề 16px.
- Màn danh sách, bảng, dashboard trải theo độ rộng nội dung. Trên mobile bảng chuyển thành danh sách thẻ.

## 5. Người dùng
| Vai trò | Việc chính | Thiết bị ưu tiên |
|---|---|---|
| Khách hàng | Gửi yêu cầu hỗ trợ, theo dõi trạng thái, trao đổi với nhân viên | Mobile, có desktop |
| Nhân viên hỗ trợ | Nhận, xử lý, phản hồi yêu cầu | Desktop |
| Quản trị viên | Xem báo cáo, cấu hình hệ thống | Desktop |

## 6. Component
Bộ dựng trên Figma gồm nhóm **Form** (mọi ô nhập, chọn, tải tệp và phản hồi đi kèm) và nhóm **Dashboard** (điều hướng, bảng, bộ lọc, thẻ số liệu, trạng thái, phân trang).

### 6.1 Component đặc thù của cổng hỗ trợ (vẽ riêng sau khi có token)
| Component | Trạng thái |
|---|---|
| Huy hiệu trạng thái yêu cầu | mới, đang xử lý, chờ khách phản hồi, đã giải quyết, đã đóng **[GIẢ ĐỊNH]** |
| Huy hiệu mức ưu tiên | thấp, trung bình, cao, khẩn cấp **[GIẢ ĐỊNH]** |
| Thẻ yêu cầu (dùng trên mobile) | thường, đang chọn |
| Dòng thời gian trao đổi | tin nhắn khách hàng, tin nhắn nhân viên, ghi chú nội bộ (chỉ nhân viên thấy) |
| Form gửi yêu cầu | thường, lỗi, đang gửi, gửi thành công |

## 7. Việc còn mở
- [ ] Xác nhận: danh sách trạng thái yêu cầu, mức ưu tiên, các loại dịch vụ hỗ trợ.
- [ ] Xác nhận: màu dẫn xuất, thang cỡ chữ, bo góc, độ rộng khung.
- [ ] Kiểm lại tỷ lệ tương phản bằng công cụ đo.
