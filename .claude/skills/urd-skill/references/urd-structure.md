# URD STRUCTURE REFERENCE — VNPT iOffice Standard

Tài liệu này mô tả chi tiết cấu trúc, quy tắc, và ví dụ cho từng section của URD.

---

## SECTION 1: GIỚI THIỆU

### Mục đích tài liệu
Câu mở đầu chuẩn:
> "Tài liệu này mô tả các yêu cầu người dùng (User Requirements) của [Tên hệ thống], làm cơ sở cho việc thiết kế, phát triển và kiểm thử phần mềm."

### Phạm vi
Nêu rõ:
- Tên hệ thống đầy đủ
- Các module trong phạm vi
- Những gì NGOÀI phạm vi (nếu có ranh giới cần làm rõ)

---

## SECTION 2: MÔ TẢ TỔNG QUAN

### Sơ đồ chức năng — Cách viết dạng text tree
Khi output `.md`, viết dạng ASCII tree:

```
[Tên hệ thống]
├── 1. Quản lý văn bản đến
│   ├── 1.1 Tiếp nhận văn bản
│   ├── 1.2 Phân loại và đăng ký
│   ├── 1.3 Chuyển xử lý
│   └── 1.4 Theo dõi tiến độ
├── 2. Quản lý văn bản đi
│   ├── 2.1 Soạn thảo văn bản
│   ├── 2.2 Trình ký duyệt
│   └── 2.3 Phát hành
└── 3. Quản lý hệ thống
    ├── 3.1 Quản lý người dùng
    └── 3.2 Cấu hình danh mục
```

---

## SECTION 3: YÊU CẦU CHỨC NĂNG — CHI TIẾT TỪNG TRƯỜNG

### Mã yêu cầu
- Format: `UR_[MODULE_CODE]_[NN]` — NN là số thứ tự 2 chữ số
- Ví dụ: `UR_VBD_01`, `UR_AUTH_01`, `UR_BC_03`
- Trong cùng 1 module, mã phải tăng dần và không trùng lặp

### Tên yêu cầu
- Ngắn gọn, dạng động từ + đối tượng
- Ví dụ tốt: "Đăng nhập hệ thống", "Tìm kiếm văn bản", "Xuất báo cáo tổng hợp"
- Ví dụ kém: "Login", "Search function", "Báo cáo" (quá chung)

### Mô tả — Mẫu chi tiết

```markdown
**Phát biểu yêu cầu:**
Cho phép [actor] thực hiện [hành động] để [mục đích/kết quả mong muốn].

**Thông tin đầu vào:**
- [Tên trường] (*): [Mô tả, kiểu dữ liệu, ràng buộc] — dấu (*) = bắt buộc
- [Tên trường]: [Mô tả]
*(Ghi chú giải thích thêm nếu cần)*

**Thông tin đầu ra:**
- Hệ thống [mô tả kết quả / trạng thái sau khi xử lý thành công]
- [Dữ liệu trả về / màn hình hiển thị / file xuất ra]

**Chức năng xử lý:**
- [Bước 1 — logic nghiệp vụ]
- [Bước 2 — kiểm tra, tính toán, lưu trữ]
- [Bước n — ...]

**Các ngoại lệ:**
- Nếu [điều kiện lỗi 1]: [Hệ thống phản hồi thế nào]
- Nếu [điều kiện lỗi 2]: [Hệ thống phản hồi thế nào]
- Nếu người dùng không có quyền: Hiển thị thông báo từ chối, không thực hiện thao tác
```

### Ví dụ UR đầy đủ — Đăng nhập

| STT | Mã yêu cầu | Tên yêu cầu | Mô tả | Ưu tiên | Quan trọng | Actor |
|---|---|---|---|---|---|---|
| 1 | UR_AUTH_01 | Đăng nhập hệ thống | **Phát biểu yêu cầu:** Cho phép người dùng đăng nhập vào hệ thống bằng tài khoản được cấp phát.<br>**Thông tin đầu vào:**<br>- Tên đăng nhập (*): địa chỉ email hoặc mã định danh<br>- Mật khẩu (*): tối thiểu 8 ký tự, có chữ hoa + số<br>- Nhóm truy cập (*): chọn từ danh sách nhóm được phép<br>**Thông tin đầu ra:** Hệ thống chuyển hướng vào trang chủ tương ứng với phân quyền của tài khoản.<br>**Chức năng xử lý:**<br>- Kiểm tra tài khoản tồn tại và còn hiệu lực<br>- Kiểm tra mật khẩu (hash so sánh)<br>- Tạo session/token và ghi log đăng nhập<br>- Điều hướng theo role<br>**Các ngoại lệ:**<br>- Tài khoản/mật khẩu sai: hiển thị lỗi, không tiết lộ trường nào sai<br>- Nhập sai 5 lần liên tiếp: khóa tài khoản 15 phút<br>- Tài khoản bị khóa: hiển thị thông báo liên hệ admin | Cao | Cao | Tất cả người dùng |

### Ví dụ UR — Tìm kiếm văn bản

| STT | Mã yêu cầu | Tên yêu cầu | Mô tả | Ưu tiên | Quan trọng | Actor |
|---|---|---|---|---|---|---|
| 2 | UR_TK_01 | Tìm kiếm văn bản đến | **Phát biểu yêu cầu:** Cho phép Chuyên viên và Văn thư tìm kiếm văn bản đến theo nhiều tiêu chí.<br>**Thông tin đầu vào:**<br>- Số hiệu văn bản: chuỗi ký tự, tìm kiếm gần đúng<br>- Trích yếu: từ khóa, tìm full-text<br>- Ngày nhận: từ ngày — đến ngày (date range)<br>- Loại văn bản: chọn từ danh mục<br>- Trạng thái xử lý: Chưa xử lý / Đang xử lý / Hoàn thành<br>*(Tất cả tiêu chí đều tùy chọn; có thể tìm không điều kiện để xem tất cả)*<br>**Thông tin đầu ra:** Danh sách văn bản khớp điều kiện, hiển thị dạng bảng, phân trang 20 bản/trang, có thể sort theo ngày nhận.<br>**Chức năng xử lý:**<br>- Xây dựng câu query từ các tiêu chí<br>- Lọc theo phân quyền (chỉ thấy VB trong phạm vi xử lý)<br>- Trả về danh sách kèm tổng số kết quả<br>**Các ngoại lệ:**<br>- Không tìm thấy kết quả: hiển thị "Không có văn bản phù hợp"<br>- Lỗi kết nối DB: hiển thị thông báo lỗi, ghi log | Cao | Cao | Chuyên viên, Văn thư |

---

## SECTION 4: YÊU CẦU PHI CHỨC NĂNG — HƯỚNG DẪN

### 4.1 Hiệu năng — Các chỉ số thường dùng
- Thời gian phản hồi: ≤ 2 giây với thao tác thông thường, ≤ 5 giây với báo cáo phức tạp
- Hỗ trợ đồng thời: X người dùng không giảm hiệu năng
- Dung lượng lưu trữ: giới hạn file upload (nếu có)

### 4.2 Bảo mật — Các điểm cần đề cập
- Xác thực: SSO / LDAP / form-based
- Phân quyền: RBAC (Role-Based Access Control)
- Mã hóa: HTTPS, mã hóa mật khẩu (bcrypt/SHA-256)
- Session: timeout sau X phút không hoạt động
- Audit log: ghi nhật ký thao tác người dùng

### 4.3 Tích hợp — Gợi ý với hệ thống VNPT
- iOffice ↔ iStorage: tích hợp qua API nội bộ
- LGSP / NDXP: tích hợp liên thông văn bản
- eSign / CA: ký số điện tử
- LDAP/AD: đồng bộ tài khoản

---

## SECTION 5: RÀNG BUỘC — GỢI Ý

### Ràng buộc thường gặp trong dự án VNPT/Chính phủ
- Tuân thủ Nghị định 30/2020/NĐ-CP về công tác văn thư
- Tuân thủ Thông tư 01/2019 về thể thức văn bản
- Hệ thống phải hỗ trợ Unicode (tiếng Việt có dấu)
- Tương thích với trình duyệt Chrome, Edge (2 phiên bản mới nhất)
- Hỗ trợ responsive trên mobile (nếu có yêu cầu)

---

## SECTION 6: MA TRẬN TRUY VẾT

Ma trận giúp truy vết từ UR → UC → Test Case (sau này).
Khi viết URD, chỉ cần điền UR + Module + Priority + Status:

| Mã UR | Tên yêu cầu | Module | Mức ưu tiên | Trạng thái | Ghi chú |
|---|---|---|---|---|---|
| UR_AUTH_01 | Đăng nhập | Xác thực | Cao | Mới | Cần xác nhận chính sách mật khẩu |
| UR_VBD_01 | Tiếp nhận VB đến | Văn bản đến | Cao | Mới | |

**Trạng thái UR:** Mới / Đã xác nhận / Đã thay đổi / Loại bỏ

---

## QUY ƯỚC ĐỊNH DẠNG BẢNG TRONG MARKDOWN

Với cột "Mô tả" chứa nhiều dòng, dùng `<br>` thay newline trong cell:

```markdown
| 1 | UR_AUTH_01 | Đăng nhập | **Phát biểu:** ...<br>**Đầu vào:** ...<br>**Đầu ra:** ... | Cao | Cao | User |
```

Khi render trong Word, BA sẽ định dạng lại. Trong `.md`, đây là cách dễ đọc nhất.
