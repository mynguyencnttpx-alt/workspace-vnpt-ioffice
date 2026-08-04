# TEMPLATE THAM CHIẾU — HƯỚNG DẪN SỬ DỤNG (UM)

> File tham chiếu nội bộ của skill `um-writer-vnpt`.  
> Dùng để render output .md khi viết tài liệu HDSD.

---

## CẤU TRÚC ĐẦY ĐỦ

```
HDSD_[TenHT]_v[x.x].md
├── Header (Thông tin tài liệu)
├── 1. TỔNG QUAN
│   ├── 1.1 Giới thiệu hệ thống
│   ├── 1.2 Đăng nhập hệ thống
│   ├── 1.3 Menu hệ thống
│   └── 1.4 Thoát khỏi hệ thống
└── 2. HƯỚNG DẪN SỬ DỤNG CHỨC NĂNG
    ├── 2.1 [Tên chức năng 1]
    ├── 2.2 [Tên chức năng 2]
    └── 2.N [Tên chức năng N]
```

---

## TEMPLATE ĐẦY ĐỦ (copy & fill)

```markdown
# HƯỚNG DẪN SỬ DỤNG — [TÊN HỆ THỐNG]

| | |
|---|---|
| **Đơn vị** | TẬP ĐOÀN BƯU CHÍNH VIỄN THÔNG VIỆT NAM — CÔNG TY CÔNG NGHỆ THÔNG TIN VNPT IT |
| **Sản phẩm** | VNPT iOffice |
| **Module** | [Tên module] |
| **Phiên bản tài liệu** | 1.0 |
| **Ngày tạo** | DD/MM/YYYY |
| **Người soạn** | [Tên BA] |

---

## 1. TỔNG QUAN

### 1.1 Giới thiệu hệ thống

[Mô tả 3–5 câu: hệ thống dùng để làm gì, ai sử dụng, lợi ích chính]

### 1.2 Đăng nhập hệ thống

Để sử dụng hệ thống, người dùng thực hiện các bước sau:

1. Mở trình duyệt web và truy cập địa chỉ: `https://[domain]`
2. Tại màn hình đăng nhập, nhập:
   - **Tên đăng nhập** (*): Tên tài khoản được cấp
   - **Mật khẩu** (*): Mật khẩu tương ứng
3. Nhấn nút **Đăng nhập**

> ✅ **Kết quả:** Hệ thống chuyển đến màn hình trang chủ.

> ⚠️ **Lưu ý:**
> - Nếu nhập sai mật khẩu quá [N] lần, tài khoản sẽ bị khóa tạm thời.
> - Liên hệ quản trị viên để được hỗ trợ khôi phục tài khoản.

![Hình 1.1: Màn hình đăng nhập hệ thống](placeholder)

### 1.3 Menu hệ thống

Sau khi đăng nhập, menu chính hiển thị các nhóm chức năng:

| Mục menu | Mô tả |
|---|---|
| [Tên menu 1] | [Mô tả ngắn] |
| [Tên menu 2] | [Mô tả ngắn] |
| [Tên menu 3] | [Mô tả ngắn] |

![Hình 1.2: Giao diện menu hệ thống](placeholder)

### 1.4 Thoát khỏi hệ thống

Để đảm bảo an toàn dữ liệu, người dùng cần đăng xuất đúng cách:

1. Nhấn vào **[Tên tài khoản / Avatar]** ở góc trên bên phải
2. Chọn **Đăng xuất**

> ✅ **Kết quả:** Hệ thống chuyển về màn hình đăng nhập.

> ⚠️ **Lưu ý:** Không đóng trình duyệt mà không đăng xuất để tránh rủi ro bảo mật.

---

## 2. HƯỚNG DẪN SỬ DỤNG CHỨC NĂNG

### 2.1 [TÊN CHỨC NĂNG]

**Mục đích**  
[1–2 câu mô tả chức năng làm gì và ai sử dụng chủ yếu]

**Vị trí truy cập**  
Menu: `[Menu cha] > [Menu con] > [Tên chức năng]`

**Điều kiện tiên quyết** *(nếu có)*  
- Người dùng có quyền: [Tên quyền]
- [Điều kiện khác nếu có]

**Các bước thực hiện**

1. Tại menu, chọn **[Tên menu]**
   > 🖥️ Hệ thống hiển thị danh sách **[Tên đối tượng]**

2. Nhấn nút **[Tên nút]** (ví dụ: **Thêm mới**, **Tạo mới**)
   > 🖥️ Hệ thống mở form **[Tên form]**

3. Nhập thông tin vào các trường:
   - **[Tên trường 1]** (*): [Mô tả]
   - **[Tên trường 2]** (*): [Mô tả]
   - **[Tên trường 3]**: [Mô tả] *(không bắt buộc)*

4. Nhấn **[Lưu / Xác nhận / Gửi]** để hoàn tất
   > 🖥️ Hệ thống hiển thị thông báo **"[Nội dung thông báo thành công]"** và cập nhật danh sách

![Hình 2.1: Màn hình [tên chức năng]](placeholder)

**Lưu ý / Xử lý lỗi**

| Tình huống | Thông báo hệ thống | Cách xử lý |
|---|---|---|
| Bỏ trống trường bắt buộc | "Vui lòng nhập [tên trường]" | Kiểm tra và nhập đầy đủ thông tin |
| [Lỗi nghiệp vụ 1] | "[Nội dung thông báo]" | [Hướng dẫn xử lý] |
| [Lỗi nghiệp vụ 2] | "[Nội dung thông báo]" | [Hướng dẫn xử lý] |

---

### 2.2 [TÊN CHỨC NĂNG TIẾP THEO]

*(Lặp lại cấu trúc 2.1)*
```

---

## GHI CHÚ KÝ HIỆU

| Ký hiệu | Ý nghĩa |
|---|---|
| `(*)` | Trường bắt buộc nhập |
| `> 🖥️` | Phản hồi / kết quả từ hệ thống |
| `> ✅` | Kết quả thành công |
| `> ⚠️ Lưu ý:` | Cảnh báo hoặc lưu ý quan trọng |
| `![Hình X.Y: ...](placeholder)` | Vị trí chèn ảnh chụp màn hình |
| `[Giả thiết]` | Thông tin BA suy luận, cần xác nhận |

---

## ĐẶT TÊN FILE

```
HDSD_[TenHT]_v[x.x].md

Ví dụ:
- HDSD_iOffice_QuanLyVanBan_v1.0.md
- HDSD_iStorage_LuuTru_v2.1.md
- HDSD_eGOV_DangKyDichVu_v1.0.md
```
