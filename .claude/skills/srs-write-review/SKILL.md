---
name: srs-write-review
description: >
  Write, structure, refine, and review SRS documents following the VNPT iOffice standard.
  Activate whenever the user mentions: viết SRS, viết đặc tả, đặc tả chức năng, review SRS,
  kiểm tra tài liệu, business rule, thiết kế luồng, thiết kế màn hình, mô tả giao diện,
  phân quyền theo role, trạng thái đối tượng, chuyển trạng thái, luồng duyệt, audit log,
  đặc tả tích hợp, tích hợp API, gọi API, cung cấp API, mapping dữ liệu, webhook,
  hoặc bất kỳ yêu cầu mô tả chức năng phần mềm có cấu trúc.
  Also activate when user provides a raw feature description and wants structured
  documentation, even without saying "SRS" explicitly.
  When in doubt, activate — better to trigger unnecessarily than to miss it.
---

# MỤC ĐÍCH

Hỗ trợ toàn bộ vòng đời SRS: từ viết mới → review → cải tiến, theo chuẩn VNPT iOffice biểu mẫu **BM_SRS_AI**.
Output mặc định là file `.md`. Chỉ xuất `.docx` (Times New Roman, 12pt) khi user yêu cầu rõ.

---

# BƯỚC 0 — XÁC ĐỊNH CHẾ ĐỘ LÀM VIỆC

Đọc yêu cầu của user và xác định mode ngay lập tức:

| Dấu hiệu nhận biết | Mode | File rule cần đọc | Output |
|--------------------|------|------------------|--------|
| "viết SRS", "đặc tả", "viết chức năng", cung cấp mô tả nghiệp vụ | **WRITE** | `references/writing-rules.md` | File `.md` (mặc định) — chỉ xuất `.docx` khi user nói "xuất file Word", "file .doc", "file docx" |
| "review SRS", "kiểm tra tài liệu", đính kèm SRS có sẵn để đánh giá | **REVIEW** | `references/review-rules.md` | Bảng tổng hợp + phân tích chi tiết + điểm chất lượng X/10, hiển thị trực tiếp trên chat |
| Không rõ | Hỏi: "Bạn muốn viết SRS mới hay review SRS đã có?" | — | — |

**Sau khi xác định mode → đọc ngay file rule tương ứng trước khi làm bất cứ điều gì.**

> **Lưu ý WRITE mode:** Output mặc định là file `.md`. Chỉ xuất `.docx` khi user nói rõ "xuất file Word", "file .doc", hoặc "file docx". Mọi rule viết khác vẫn áp dụng đầy đủ cho cả hai định dạng.

---

# LANGUAGE RULE

- User viết tiếng Việt → output tiếng Việt
- User viết tiếng Anh → output tiếng Anh
- Tên trường kỹ thuật có thể giữ tiếng Anh
- Bảng thuật ngữ: Lãnh đạo = Leader | Chuyên viên = Staff | Văn thư = Clerk

---

# XỬ LÝ FILE ĐÍNH KÈM

Nếu user upload file kèm yêu cầu:

| Loại file | Hành động |
|-----------|-----------|
| `.docx` / `.pdf` (SRS cũ) | Đọc `file-reading` skill trước, sau đó xác định: refactor, review, hay chỉ lấy làm input? |
| Hình ảnh / mockup | Dùng làm input mô tả giao diện cho section 2.1 (Mockup/Layout) |
| Không rõ mục đích | Hỏi trước: "Bạn muốn mình làm gì với file này?" |

---

# DATA PRIVACY REMINDER

> Áp dụng cho cả WRITE mode và REVIEW mode — nhắc nhở trước khi xử lý tài liệu.

Nếu user upload hoặc paste nội dung SRS, nhắc nhẹ một lần (không lặp lại):

```
⚠️ Lưu ý bảo mật: Trước khi chia sẻ tài liệu với AI, hãy kiểm tra:
- Thay tên khách hàng / đơn vị thật → "Đơn vị A", "Tổ chức B"
- Không có connection string, IP nội bộ, hoặc password trong nội dung
- Không có số CCCD, thông tin cá nhân thật của người dùng cuối
Nếu dự án có NDA nghiêm ngặt → hỏi Lead trước khi dùng tool này.
```

Nếu user xác nhận đã kiểm tra hoặc bỏ qua → tiến hành bình thường, không nhắc lại.

---

# TÀI NGUYÊN THAM CHIẾU

| File | Mục đích | Khi nào đọc |
|------|----------|-------------|
| `references/writing-rules.md` | Toàn bộ quy tắc viết SRS | Khi WRITE mode |
| `references/integration-rules.md` | Quy tắc đặc tả tích hợp API (cung cấp API & gọi API bên ngoài, mapping dữ liệu) | Khi chức năng/module có tích hợp hệ thống khác qua API |
| `references/review-rules.md` | Toàn bộ quy tắc review SRS | Khi REVIEW mode; **và bắt buộc trong WRITE mode ở Bước 3.5 (AI tự review)** trước khi cho phép xuất file |
| `references/rebuild_index.py` | Sinh lại `docs/index.json` từ front-matter mọi SRS.md | Khi index bị lệch với thực tế file, hoặc merge nhiều CR cùng lúc — chạy để đồng bộ lại, không sửa tay |
| `references/srs-template-vnpt.md` | Cấu trúc template VNPT đầy đủ | Trong WRITE mode, trước khi viết |
| `references/workflow-diagram-skill.md` | Quy tắc vẽ Sequence Diagram (Mermaid + Python renderer) | **BẮT BUỘC** trong WRITE mode, ngay sau writing-rules.md |
| `references/workflow_renderer.py` | Script Python vẽ Sequence Diagram → PNG | Copy và điền SEQ data khi cần vẽ flow |
| `references/docx-generator.js` | Script tạo file .docx (đã tích hợp ImageRun) | **Chỉ đọc khi user yêu cầu xuất file Word** |
| `/mnt/skills/public/docx/SKILL.md` | Hướng dẫn docx-js | Khi gặp vấn đề kỹ thuật tạo file |

---

# VÍ DỤ NHANH

## Outline xác nhận (Bước 2 trong WRITE mode)

Trước khi viết, luôn output block này và **chờ user xác nhận**:

```
Hệ thống: iStorage
Actor: Văn thư, Chuyên viên, Lãnh đạo
Module: Quản lý văn bản đến
Phạm vi chỉnh sửa: Menu "Văn bản đến", màn hình "Tiếp nhận văn bản"
Chức năng sẽ đặc tả: [FC-001] Tiếp nhận văn bản, [FC-002] Phân công xử lý

→ Bạn xác nhận để tôi tiến hành viết SRS?
```

## Phân biệt BR vs Validation vs Workflow step

> Ba loại này hay bị nhầm — đặt đúng section là yêu cầu tối thiểu để tài liệu dùng được.

| Ví dụ | Loại | Section đúng |
|-------|------|-------------|
| "Số hiệu văn bản không được trùng trong năm" | Business Rule | Quy tắc nghiệp vụ (B.2) |
| "Trường Số hiệu không được để trống" | Validation | Ràng buộc trong bảng field (Yêu cầu giao diện) |
| "Sau khi tạo, hệ thống tự sinh số hiệu theo format QĐ-YYYY-NNN" | Workflow step | Luồng xử lý thành công (B.2) |
| "Chỉ Văn thư mới được tiếp nhận văn bản đến" | Quy tắc nghiệp vụ | Quy tắc nghiệp vụ (B.2) |

---

# WHAT NOT TO DO (TOÀN CỤC)

- KHÔNG bắt đầu viết SRS khi chưa có Actor và tên hệ thống
- KHÔNG tự giả định actor hay flow mà không mark rõ [GIẢ ĐỊNH]
- KHÔNG viết câu chung chung không test được: "hệ thống xử lý theo nghiệp vụ"
- KHÔNG dùng tính từ định tính mà không có con số: "nhanh", "dễ dùng", "phù hợp"
- KHÔNG trộn business rule với mô tả UI hoặc bước workflow
- KHÔNG bỏ qua luồng ngoại lệ
- KHÔNG xuất file `.docx` trừ khi user yêu cầu rõ "file Word", "file .doc", hoặc "file docx"
- KHÔNG viết toàn bộ tài liệu khi user chỉ yêu cầu 1 section cụ thể
- KHÔNG bỏ mục "Phạm vi chỉnh sửa" và "Điều kiện nghiệm thu" trong output
- KHÔNG bỏ qua Bước 3.5 (AI tự review) hoặc Bước 3.6 (Gate phê duyệt cuối cùng) — kể cả khi user không nhắc đến review, đây là gate bắt buộc trong WRITE mode
- KHÔNG xuất file (Bước 4) khi Bước 3.5 cho kết quả ❌ Needs Revision, hoặc khi user chưa phê duyệt ở Bước 3.6
- KHÔNG viết SRS cho CR khi chưa có bảng tham chiếu ảnh hưởng (FC / version gốc / section bị sửa / lý do)
- KHÔNG bỏ front-matter YAML ở đầu file, và KHÔNG paste ảnh trôi nổi thay vì lưu file thật theo convention `<FC-ID>-<mô-tả>.png`
- KHÔNG sửa tay `docs/index.json` khi phát hiện lệch — chạy `references/rebuild_index.py` để sinh lại
