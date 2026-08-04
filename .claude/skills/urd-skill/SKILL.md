---
name: urd-writer-vnpt
description: >
  Viết tài liệu URD (User Requirements Document) theo biểu mẫu chuẩn VNPT iOffice BM_URD.
  Kích hoạt khi user đề cập: "viết URD", "tài liệu yêu cầu người dùng", "URD", "user requirements",
  "yêu cầu chức năng", "biểu mẫu URD", "BM_URD", "lập URD", "viết yêu cầu hệ thống",
  hoặc cung cấp mô tả nghiệp vụ và yêu cầu ghi thành tài liệu yêu cầu có cấu trúc.
  Cũng kích hoạt khi user upload file mô tả nghiệp vụ và muốn chuyển thành tài liệu URD.
  Output mặc định là file `.md`. Chỉ tạo `.docx` khi user yêu cầu rõ ràng.
---

# MỤC ĐÍCH

Hỗ trợ viết tài liệu **URD** theo đúng biểu mẫu `BM_URD_BM_AI.docx` của VNPT iOffice — chuẩn CMMI 1.3 Level 3. Cấu trúc tài liệu URD theo mẫu gốc rất **đơn giản**, chỉ gồm: sơ đồ cây chức năng + bảng yêu cầu theo từng module.

---

# BƯỚC 0 — NHẬN DIỆN INPUT

| Loại input | Cách xử lý |
|---|---|
| Mô tả ngắn (1–3 câu) | Hỏi thêm theo **Checklist elicitation** bên dưới |
| Mô tả trung bình trở lên | Viết thẳng, ghi rõ assumptions nếu có |
| File đính kèm | Đọc `file-reading` skill trước, sau đó phân tích và viết URD |

**Checklist elicitation** — Hỏi tối đa 1 lần, gom tất cả:
```
Để viết URD chính xác, mình cần thêm:
1. Tên hệ thống / phần mềm?
2. Các actor (đối tượng người dùng) gồm những ai?
3. Các module / phân hệ chính?
4. Phiên bản tài liệu (mặc định 1.0)?
```

---

# BƯỚC 1 — XÁC NHẬN OUTLINE

Luôn output block xác nhận và **chờ user phê duyệt** trước khi viết:

```
📋 OUTLINE URD — [Tên hệ thống] v[x.x]
─────────────────────────────────────
Actor     : [Danh sách]
Modules   : [M1, M2, M3...]
Tổng UR   : ~[N] yêu cầu
─────────────────────────────────────
Xác nhận để mình viết full?
```

---

# BƯỚC 2 — VIẾT URD

**Đọc `references/urd-template.md` trước khi viết.**

## Quy tắc output

| Rule | Chi tiết |
|---|---|
| **Định dạng mặc định** | File `.md` — lưu tại `/mnt/user-data/outputs/URD_[TenHT]_v[x.x].md` |
| **File Word** | Chỉ tạo khi user nói rõ: "xuất Word", "file docx", "file .doc" — khi đó đọc thêm `references/urd-docx-generator.js` và `/mnt/skills/public/docx/SKILL.md` |
| **Ngôn ngữ** | Tiếng Việt toàn bộ |
| **Mã yêu cầu** | `UR[STT_2digit]` — ví dụ: `UR01`, `UR02` (theo đúng mẫu gốc) |
| **Mức độ** | Cao / Trung bình / Thấp |

## 5 trường BẮT BUỘC trong cột "Mô tả"

```
**Phát biểu yêu cầu:** [Câu phát biểu rõ ràng]
**Thông tin đầu vào:** [Các field, đánh dấu (*) nếu bắt buộc]
**Thông tin đầu ra:** [Kết quả hệ thống trả về]
**Chức năng xử lý:** [Logic nghiệp vụ]
**Các ngoại lệ:** [Trường hợp lỗi, edge case]
```

---

# QUY TẮC CHẤT LƯỢNG — CHECKLIST TỰ KIỂM

- [ ] Mỗi UR đủ 5 trường mô tả
- [ ] Mã UR đúng dạng `UR[NN]`, không trùng trong cùng module
- [ ] Actor khớp với danh sách đã khai báo
- [ ] Mức độ ưu tiên và quan trọng được điền
- [ ] Sơ đồ cây chức năng có mặt ở đầu tài liệu
- [ ] File đặt tên đúng: `URD_[TenHT]_v[x.x].md`

---

# XỬ LÝ FILE ĐÍNH KÈM

| Loại | Cách xử lý |
|---|---|
| `.docx` / `.pdf` / `.md` — mô tả nghiệp vụ | Đọc `file-reading` skill → phân tích actors, modules, yêu cầu → viết URD |
| File URD cũ cần chuẩn hóa | Giữ UR hợp lệ, chuẩn format, bổ sung thiếu → output file mới |
| Hình ảnh / mockup | Suy luận yêu cầu chức năng từ giao diện |

---

# LƯU Ý

1. **Không phát minh yêu cầu** — Chỉ thêm khi có cơ sở từ nghiệp vụ, đánh dấu `[Giả thiết]`
2. **URD ≠ SRS** — Mô tả nhu cầu người dùng (cái gì), không phải giải pháp kỹ thuật (làm thế nào)
3. **Mức độ ưu tiên**: Cao = core, không có hệ thống không chạy; Trung bình = phase 2; Thấp = nice-to-have
4. **Ngoại lệ** — Tối thiểu: input rỗng/sai, người dùng không có quyền
