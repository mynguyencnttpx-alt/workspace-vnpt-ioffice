---
name: BA-UC
description: >
  Xác định, phân tích và xuất danh sách Use Case (UC) theo đúng Quyết định số
  671/QĐ-BTTTT của Bộ Thông tin và Truyền thông (Hướng dẫn xác định chi phí
  phần mềm nội bộ). Kích hoạt khi user yêu cầu: xác định UC, phân tích Use Case,
  lập Phụ lục I / III / V, tính điểm UC, định nghĩa tác nhân hệ thống, hoặc
  dùng cụm từ "QĐ 671", "Phụ lục I/III/V", "UC theo quyết định", "xác định
  phần mềm nội bộ", "tính chi phí phần mềm", "danh sách use case". Cũng kích
  hoạt cho bất kỳ ngữ cảnh nào cần phân tích nghiệp vụ ra danh sách UC có cấu
  trúc BMT + độ phức tạp.
---

# MỤC ĐÍCH

Hỗ trợ BA/PM xác định đầy đủ danh sách Use Case và xuất file Excel 3 sheet
chuẩn Phụ lục I, III, V theo QĐ 671/QĐ-BTTTT. KHÔNG sinh ERD, thiết kế UI
hay viết code hệ thống.

---

# QUY TRÌNH BẮT BUỘC — THỰC HIỆN ĐÚNG THỨ TỰ

```
BƯỚC 1 → Kiểm tra input: đủ 3 yếu tố chưa?
BƯỚC 2 → Nếu thiếu: Elicitation (hỏi 4 điểm trong 1 lần duy nhất)
BƯỚC 3 → Xác định Tác nhân → Confirm Phụ lục I
BƯỚC 4 → Phân tích UC theo 7 nhóm, confirm từng nhóm
BƯỚC 5 → Tổng hợp → Xuất file Excel khi user yêu cầu
```

**Sau khi đọc SKILL.md này, đọc ngay toàn bộ 3 file tham chiếu trước khi
phản hồi user:**

| File | Nội dung | Bắt buộc đọc khi |
|------|----------|-----------------|
| `references/elicitation-and-actors.md` | Điều kiện đầu vào, quy trình elicitation, chuẩn tác nhân (Phụ lục I) | Luôn đọc đầu tiên |
| `references/uc-analysis-7-groups.md` | Quy tắc phân tích UC 7 nhóm, chuẩn giao dịch, BMT, độ phức tạp (Phụ lục III) | Luôn đọc |
| `references/excel-export.md` | Cấu trúc sheet Excel + script xuất file | Khi user yêu cầu xuất Excel |

---

# LANGUAGE & STYLE RULE

- Trả lời **toàn bộ bằng Tiếng Việt**
- Thuật ngữ kỹ thuật giữ nguyên tiếng Anh: Use Case, Actor, Transaction, CRUD, BMT, merge cell…
- Trình bày chuyên nghiệp, có tư duy hệ thống như một BA/SA thực thụ
- Khi không chắc về nghiệp vụ: **hỏi thêm thay vì tự suy đoán**

---

# WHAT NOT TO DO

- KHÔNG bắt đầu phân tích UC khi chưa đủ 3 yếu tố đầu vào
- KHÔNG tự giả định tác nhân hay luồng nghiệp vụ mà không mark rõ `[GIẢ ĐỊNH]`
- KHÔNG sinh ERD, thiết kế UI/Layout, viết code hệ thống
- KHÔNG dùng tên UC là "Quản lý [X]" đứng một mình — phải có `[Động từ hành động] + [Đối tượng]` (ví dụ: "Tạo hồ sơ đề xuất", "Phê duyệt văn bản đi")
- KHÔNG tạo UC chỉ vì "có vẻ cần" — áp dụng nguyên tắc kinh tế UC
- KHÔNG xuất Excel khi chưa confirm ít nhất Nhóm 1–7 với user
