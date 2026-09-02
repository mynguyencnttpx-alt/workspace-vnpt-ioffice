---
name: um-writer-vnpt
description: >
  Viết tài liệu Hướng dẫn sử dụng (User Manual / UM) theo biểu mẫu chuẩn VNPT iOffice BM_UM_BM_AI.
  Kích hoạt khi user đề cập: "viết hướng dẫn sử dụng", "HDSD", "user manual", "tài liệu hướng dẫn",
  "viết UM", "BM_UM", "hướng dẫn người dùng", "manual chức năng", "viết tài liệu người dùng",
  hoặc cung cấp mô tả/đặc tả chức năng và yêu cầu chuyển thành tài liệu hướng dẫn có cấu trúc.
  Cũng kích hoạt khi user upload file SRS/URD/mô tả nghiệp vụ và muốn tạo tài liệu HDSD.
  Output mặc định là file `.md`. Chỉ tạo `.docx` khi user yêu cầu rõ ràng.
---

# MỤC ĐÍCH

Hỗ trợ viết tài liệu **Hướng dẫn Sử dụng (UM)** theo đúng biểu mẫu `BM_UM_BM_AI.docx` của VNPT iOffice — chuẩn CMMI 1.3 Level 3. Tài liệu UM mô tả cách sử dụng hệ thống **từ góc nhìn người dùng cuối**, bao gồm: tổng quan hệ thống, đăng nhập, menu, và hướng dẫn từng chức năng theo kịch bản thực tế.

---

# BƯỚC 0 — NHẬN DIỆN INPUT

| Loại input | Cách xử lý |
|---|---|
| Mô tả ngắn (1–3 câu) | Hỏi thêm theo **Checklist elicitation** bên dưới |
| Mô tả trung bình trở lên | Viết thẳng, ghi rõ `[Giả thiết]` nếu có |
| File đính kèm (.docx/.pdf/.md) | Đọc `file-reading` skill trước → phân tích actors, modules, chức năng → viết UM |
| SRS / URD / đặc tả kỹ thuật | Trích xuất luồng người dùng, tên chức năng, điều kiện lỗi → viết UM |

**Checklist elicitation** — Hỏi tối đa 1 lần, gom tất cả:

```
Để viết HDSD chính xác, mình cần thêm:
1. Tên hệ thống / phần mềm và phiên bản?
2. Đối tượng người dùng cuối (ví dụ: cán bộ văn thư, lãnh đạo, admin)?
3. Danh sách các chức năng / module cần hướng dẫn?
4. Có hình ảnh màn hình / mockup không? (nếu có, upload để mình tham chiếu)
5. Phiên bản tài liệu (mặc định 1.0)?
```

---

# BƯỚC 1 — XÁC NHẬN OUTLINE

Luôn output block xác nhận và **chờ user phê duyệt** trước khi viết full:

```
📋 OUTLINE HDSD — [Tên hệ thống] v[x.x]
─────────────────────────────────────────
Đối tượng : [Loại người dùng]
Chức năng  : [CN1, CN2, CN3 ...]
Cấu trúc   :
  1. Tổng quan hệ thống
  2. Đăng nhập / Thoát hệ thống
  3. Menu hệ thống
  4. Hướng dẫn từng chức năng (~[N] chức năng)
─────────────────────────────────────────
Xác nhận để mình viết full?
```

---

# BƯỚC 2 — VIẾT UM

**Đọc `references/um-template.md` trước khi viết.**

## Quy tắc output

| Rule | Chi tiết |
|---|---|
| **Định dạng mặc định** | File `.md` — lưu tại `docs/HDSD_[TenHT]_v[x.x].md` (tạo thư mục `docs/` ở thư mục làm việc hiện tại nếu chưa có) |
| **File Word** | Chỉ tạo khi user nói rõ: "xuất Word", "file docx", "ra word" — khi đó: (1) đọc `/mnt/skills/public/docx/SKILL.md`, (2) copy `references/um-docx-generator.js` vào `/home/claude/`, (3) điền DATA từ nội dung UM đã viết, (4) chạy `npm install docx && node um-docx-generator.js`, (5) validate và xuất file — lưu cùng `docs/` với bản `.md` |
| **Ngôn ngữ** | Tiếng Việt toàn bộ |
| **Giọng văn** | Hướng dẫn, ngôi thứ hai ("Người dùng nhấn…", "Hệ thống hiển thị…") |
| **Placeholder ảnh** | Khi không có ảnh thực, chèn `![Hình X.Y: Mô tả màn hình](placeholder)` |

---

## CẤU TRÚC TÀI LIỆU (theo mẫu BM_UM)

### Phần mở đầu (Header)

```markdown
# HƯỚNG DẪN SỬ DỤNG — [TÊN HỆ THỐNG]

| Đơn vị | TẬP ĐOÀN BƯU CHÍNH VIỄN THÔNG VIỆT NAM — CÔNG TY CÔNG NGHỆ THÔNG TIN VNPT IT |
|---|---|
| Sản phẩm | VNPT iOffice |
| Phiên bản tài liệu | [x.x] |
| Ngày tạo | [DD/MM/YYYY] |
```

---

### Mục 1 — TỔNG QUAN

```markdown
## 1. TỔNG QUAN

### 1.1 Giới thiệu hệ thống
[Mô tả ngắn gọn mục đích, phạm vi hệ thống, đối tượng sử dụng]

### 1.2 Đăng nhập hệ thống
[Mô tả các bước đăng nhập: truy cập URL, nhập thông tin, xử lý lỗi đăng nhập]

**Các bước thực hiện:**
1. Mở trình duyệt và truy cập địa chỉ: `[URL hệ thống]`
2. Nhập **Tên đăng nhập** (*)
3. Nhập **Mật khẩu** (*)
4. Nhấn nút **Đăng nhập**

> ⚠️ **Lưu ý:** [Mô tả trường hợp lỗi và cách xử lý]

![Hình 1.1: Màn hình đăng nhập hệ thống](placeholder)

### 1.3 Menu hệ thống
[Mô tả cấu trúc menu, các cách điều hướng, thuật ngữ chính]

| Mục menu | Mô tả |
|---|---|
| [Tên menu 1] | [Chức năng tương ứng] |
| [Tên menu 2] | [Chức năng tương ứng] |

### 1.4 Thoát khỏi hệ thống
[Mô tả cách đăng xuất đúng cách để đảm bảo an toàn dữ liệu]
```

---

### Mục 2 — HƯỚNG DẪN SỬ DỤNG CHỨC NĂNG

Mỗi chức năng là một mục `2.x` với cấu trúc cố định:

```markdown
## 2. HƯỚNG DẪN SỬ DỤNG CHỨC NĂNG

### 2.1 [TÊN CHỨC NĂNG]

**Mục đích**
[1–2 câu mô tả chức năng này dùng để làm gì, ai sử dụng]

**Vị trí truy cập**
Menu: `[Đường dẫn menu > Chức năng]`

**Cấu hình / Điều kiện tiên quyết** *(nếu có)*
- [Yêu cầu quyền / cấu hình cần có trước]

**Các bước thực hiện**

1. [Bước 1 — hành động người dùng]
   > 🖥️ Hệ thống: [Phản hồi của hệ thống]

2. [Bước 2 — hành động người dùng]
   > 🖥️ Hệ thống: [Phản hồi của hệ thống]

3. Nhấn **[Tên nút]** để xác nhận
   > 🖥️ Hệ thống: Hiển thị thông báo "[Nội dung thông báo]" và [kết quả]

![Hình 2.x: Màn hình [tên chức năng]](placeholder)

**Lưu ý / Xử lý lỗi**

| Tình huống | Thông báo hệ thống | Cách xử lý |
|---|---|---|
| [Trường hợp lỗi 1] | "[Nội dung thông báo]" | [Hướng dẫn xử lý] |
| [Trường hợp lỗi 2] | "[Nội dung thông báo]" | [Hướng dẫn xử lý] |
```

---

## QUY TẮC VIẾT NỘI DUNG

| Rule | Chi tiết |
|---|---|
| **Luồng bước** | Mỗi bước = 1 hành động người dùng + 1 phản hồi hệ thống (nếu có) |
| **Tên nút/field** | In **đậm**, viết đúng như trên giao diện |
| **Trường bắt buộc** | Đánh dấu `(*)` |
| **Cảnh báo** | Dùng `> ⚠️ Lưu ý:` |
| **Placeholder ảnh** | `![Hình X.Y: Mô tả](placeholder)` — đặt sau bước liên quan |
| **Bảng lỗi** | Mỗi chức năng có ít nhất 2 dòng lỗi phổ biến |
| **Không kỹ thuật** | Không dùng thuật ngữ DB, API, backend — viết thuần người dùng |

---

# QUY TẮC CHẤT LƯỢNG — CHECKLIST TỰ KIỂM

- [ ] Header tài liệu đủ: tên hệ thống, đơn vị, phiên bản, ngày
- [ ] Mục Tổng quan có đủ: giới thiệu, đăng nhập, menu, thoát
- [ ] Mỗi chức năng có đủ: Mục đích, Vị trí, Các bước, Lỗi
- [ ] Mỗi bước có phản hồi hệ thống tương ứng
- [ ] Tên nút/field in đậm, viết đúng ngữ cảnh giao diện
- [ ] Bảng xử lý lỗi ít nhất 2 dòng mỗi chức năng
- [ ] Placeholder ảnh có chú thích rõ ràng
- [ ] Ngôn ngữ toàn tiếng Việt, không thuật ngữ kỹ thuật backend
- [ ] File đặt tên đúng: `HDSD_[TenHT]_v[x.x].md`

---

# XỬ LÝ FILE ĐÍNH KÈM

| Loại file | Cách xử lý |
|---|---|
| SRS / Đặc tả chức năng (.docx/.pdf/.md) | Đọc `file-reading` skill → trích luồng nghiệp vụ → viết HDSD |
| URD | Lấy danh sách chức năng và actor → viết HDSD tương ứng |
| Màn hình / mockup (ảnh) | Suy luận bước thao tác từ UI → viết hướng dẫn |
| HDSD cũ cần chuẩn hóa | Giữ nội dung hợp lệ, chuẩn format mẫu, bổ sung thiếu |

---

# LƯU Ý

1. **UM ≠ SRS** — UM mô tả *cách dùng* (người dùng làm gì), không mô tả *yêu cầu* (hệ thống phải làm gì)
2. **Không phát minh luồng** — Chỉ thêm khi có cơ sở từ input, đánh dấu `[Giả thiết]` nếu suy luận
3. **Ảnh là bắt buộc trong thực tế** — Khi không có ảnh, dùng placeholder có chú thích đủ ý; nhắc user bổ sung khi triển khai thực
4. **Phân chia chức năng** — Nếu chức năng phức tạp (>10 bước), chia thành sub-section `2.x.1`, `2.x.2`
5. **Audience** — Viết cho người dùng cuối không có kiến thức kỹ thuật
