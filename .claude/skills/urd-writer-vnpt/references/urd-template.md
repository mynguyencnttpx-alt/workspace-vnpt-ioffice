# URD TEMPLATE — Cấu trúc biểu mẫu BM_URD_BM_AI (VNPT iOffice)

Đây là cấu trúc CHÍNH XÁC của file mẫu gốc. Bám sát hoàn toàn khi output.

---

## CẤU TRÚC FILE `.md` OUTPUT

```markdown
# YÊU CẦU CHỨC NĂNG

[Tên hệ thống] — Phiên bản [x.x]

> **Sơ đồ cây chức năng tổng thể:**
>
> ```
> [Tên hệ thống]
> ├── Module 1: [Tên]
> │   ├── 1.1 [Chức năng]
> │   └── 1.2 [Chức năng]
> ├── Module 2: [Tên]
> │   ├── 2.1 [Chức năng]
> │   └── 2.2 [Chức năng]
> └── Module n: [Tên]
> ```
> *(Khi xuất file Word: vẽ dạng tree view hoặc use case model)*

---

## Module 1: [Tên module]

> Sơ đồ chức năng Module 1: *(mô tả hoặc placeholder khi xuất Word)*

| STT | Mã yêu cầu | Tên yêu cầu | Mô tả | Mức độ ưu tiên | Mức độ quan trọng | Đối tượng liên quan |
|-----|------------|-------------|-------|----------------|-------------------|---------------------|
| 1 | UR01 | [Tên ngắn gọn] | **Phát biểu yêu cầu:** [...]<br>**Thông tin đầu vào:**<br>+ [Trường] (*): [mô tả]<br>+ [Trường]: [mô tả]<br>**Thông tin đầu ra:** [...]<br>**Chức năng xử lý:** [...]<br>**Các ngoại lệ:** [...] | Cao | Cao | [Actor] |
| 2 | UR02 | ... | ... | ... | ... | ... |

---

## Module 2: [Tên module]

> Sơ đồ chức năng Module 2: *(placeholder)*

| STT | Mã yêu cầu | Tên yêu cầu | Mô tả | Mức độ ưu tiên | Mức độ quan trọng | Đối tượng liên quan |
|-----|------------|-------------|-------|----------------|-------------------|---------------------|
| 1 | UR[n] | ... | ... | ... | ... | ... |

---

## Module n: [Tên module]

*(Lặp lại pattern trên)*

---

*Sử dụng lại mẫu của bộ tài liệu CMMI 1.3 level 3 do VNPT Soft xây dựng*
```

---

## QUY TẮC BẢNG 7 CỘT

Đây là 7 cột của bảng UR — theo đúng thứ tự trong mẫu gốc:

| # | Tên cột | Nội dung |
|---|---------|---------|
| 1 | STT | Số thứ tự, tăng dần trong mỗi module |
| 2 | Mã yêu cầu | `UR01`, `UR02`... — đánh số liên tục toàn tài liệu |
| 3 | Tên yêu cầu | Ngắn gọn, dạng động từ + đối tượng |
| 4 | Mô tả | 5 trường bắt buộc (xem bên dưới) |
| 5 | Mức độ ưu tiên | Cao / Trung bình / Thấp |
| 6 | Mức độ quan trọng | Cao / Trung bình / Thấp |
| 7 | Đối tượng liên quan | Actor thực hiện yêu cầu này |

---

## CẤU TRÚC CỘT "MÔ TẢ" — MẪU CHÍNH XÁC

Theo đúng ví dụ trong file mẫu gốc (UR01 — Đăng nhập):

```
**Phát biểu yêu cầu:** <Cho phép người dùng đăng nhập vào hệ thống>

**Thông tin đầu vào:**
+ Tên tài khoản (*): dùng địa chỉ email
+ Mật khẩu (*): theo quy định chính sách mật khẩu
+ Nhóm truy cập (*): nhóm truy cập tương ứng với tài khoản

**Thông tin đầu ra:** <Hệ thống sẽ chuyển vào màn hình chức năng chính dựa theo cơ chế
phân quyền của người dùng và nhóm truy cập để chương trình sẽ hiển thị các chức năng
nghiệp vụ mà người dùng đó được phép thao tác với hệ thống>

**Chức năng xử lý:** <Đăng nhập: kiểm tra thông tin đăng nhập, điều hướng chức năng
theo thông tin đăng nhập>

**Các ngoại lệ:** <Chú ý nhập dữ liệu hợp lệ và không hợp lệ>
```

### Lưu ý format:
- Dấu `(*)` = trường bắt buộc
- Dùng `+` thay `-` cho bullet trong đầu vào (theo mẫu gốc)
- Trong `.md`, các trường cách nhau bằng `<br>` khi trong cell bảng
- Trong `.docx`, mỗi trường là một bullet/paragraph riêng trong cell

---

## HEADER & FOOTER (chỉ áp dụng khi xuất `.docx`)

### Header trang 1 (trang bìa):
Bảng 3 cột, không border ngoài:
- Cột trái: trống (logo placeholder)
- Cột giữa: **VNPT IOFFICE** (đỏ, căn giữa)
- Cột phải: *Phiên bản: 1.0*

### Header trang 2+:
Bảng 2 cột, không border:
- Cột trái: Logo VNPT (image1.png — 657225 × 828675 EMU)
- Cột phải (căn giữa, bold):
  - TẬP ĐOÀN BƯU CHÍNH VIỄN THÔNG VIỆT NAM
  - CÔNG TY CÔNG NGHỆ THÔNG TIN VNPT IT

### Footer (tất cả trang):
Bảng 2 cột, không border:
- Cột trái (italic): *Sử dụng lại mẫu của bộ tài liệu CMMI 1.3 level 3 do VNPT Soft xây dựng*
- Cột phải (căn phải): Trang: [PAGE]/[NUMPAGES]

---

## VÍ DỤ ĐẦY ĐỦ — MODULE QUẢN LÝ VĂN BẢN ĐẾN

```markdown
## Module 1: Quản lý văn bản đến

> Sơ đồ chức năng Module 1: Tiếp nhận → Phân loại → Đăng ký → Chuyển xử lý → Theo dõi

| STT | Mã yêu cầu | Tên yêu cầu | Mô tả | Mức độ ưu tiên | Mức độ quan trọng | Đối tượng liên quan |
|-----|------------|-------------|-------|----------------|-------------------|---------------------|
| 1 | UR01 | Tiếp nhận văn bản đến | **Phát biểu yêu cầu:** Cho phép Văn thư tiếp nhận và đăng ký văn bản đến vào hệ thống.<br>**Thông tin đầu vào:**<br>+ Số đến (*): số tiếp nhận tự động theo quy tắc<br>+ Số hiệu văn bản (*): số hiệu trên văn bản gốc<br>+ Ngày đến (*): ngày nhận văn bản<br>+ Trích yếu (*): nội dung tóm tắt<br>+ Loại văn bản (*): chọn từ danh mục<br>+ File đính kèm: scan PDF văn bản gốc<br>**Thông tin đầu ra:** Hệ thống tạo hồ sơ văn bản đến mới, sinh số đến tự động, lưu vào CSDL.<br>**Chức năng xử lý:** Kiểm tra trùng số hiệu; sinh số đến tự động theo năm; lưu metadata và file đính kèm; ghi log tạo mới.<br>**Các ngoại lệ:** Số hiệu trùng: cảnh báo, cho phép tiếp tục hoặc hủy. File đính kèm > 20MB: từ chối, hiển thị lỗi. Trường bắt buộc trống: không lưu, highlight lỗi. | Cao | Cao | Văn thư |
| 2 | UR02 | Tìm kiếm văn bản đến | **Phát biểu yêu cầu:** Cho phép người dùng tìm kiếm văn bản đến theo nhiều tiêu chí.<br>**Thông tin đầu vào:**<br>+ Số hiệu / số đến: tìm kiếm gần đúng<br>+ Trích yếu: tìm full-text<br>+ Ngày đến: khoảng từ ngày — đến ngày<br>+ Loại văn bản: chọn từ danh mục<br>+ Trạng thái: Chưa xử lý / Đang xử lý / Hoàn thành<br>*(Tất cả tiêu chí tùy chọn)*<br>**Thông tin đầu ra:** Danh sách văn bản khớp điều kiện, phân trang 20 bản/trang, có thể sort.<br>**Chức năng xử lý:** Lọc theo phân quyền xem; xây dựng query từ tiêu chí; trả về danh sách kèm tổng số kết quả.<br>**Các ngoại lệ:** Không có kết quả: hiển thị "Không tìm thấy văn bản phù hợp". Lỗi kết nối: hiển thị thông báo lỗi. | Cao | Cao | Văn thư, Chuyên viên |
```
