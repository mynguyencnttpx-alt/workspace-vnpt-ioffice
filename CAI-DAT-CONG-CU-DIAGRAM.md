# Cài đặt công cụ — Workspace VNPT iOffice

> Cập nhật 2026-09-01: file này trước đây hướng dẫn cài Mermaid/PlantUML/D2/BPMN/DBML cho gói **11 skill vẽ sơ đồ** (`/sequence /activity /bpmn /erd ...`) — gói đó đã bị gỡ khỏi `.claude/skills/`, nội dung cũ không còn áp dụng. Nội dung dưới đây thay bằng đúng nhu cầu cài đặt của **9 skill đang có** (xem danh sách trong `START-HERE.md` / `HUONG-DAN-SU-DUNG-SKILL.md`).

## Có cần cài gì không?

**Phần lớn việc dùng skill KHÔNG cần cài thêm gì.** Output mặc định của nhóm viết tài liệu (`urd-writer-vnpt`, `urd-writer-customer`, `um-writer-vnpt`, `srs-write-review`) là file `.md` thuần — kể cả khi `srs-write-review` nhúng sequence diagram, nó viết thẳng code block Mermaid trong file `.md` (render sẵn trên GitHub/VS Code/Obsidian), không cần cài Mermaid CLI để tạo file này.

Chỉ cần cài thêm công cụ trong 2 trường hợp cụ thể dưới đây — và chỉ khi bạn thật sự yêu cầu xuất theo định dạng đó.

## 1. Xuất `.docx` (Word) — `srs-write-review`, `urd-writer-vnpt`, `um-writer-vnpt`

Chỉ chạy khi bạn nói rõ "xuất file Word" / "file docx". Cần:

```powershell
winget install OpenJS.NodeJS.LTS
node --version
npm install -g docx
```

Mỗi skill có sẵn script generator riêng trong `references/` của nó (`docx-generator.js`, `urd-docx-generator.js`, `um-docx-generator.js`) — không cần tự viết, chỉ cần Node + package `docx` có sẵn để chạy script đó.

### Riêng `srs-write-review` — khi SRS có sequence diagram VÀ xuất `.docx`

Sequence diagram trong bản `.md` là Mermaid thuần (không cần cài gì). Nhưng khi xuất `.docx`, diagram phải render thành ảnh PNG trước khi nhúng vào Word — bước này cần Python:

```powershell
winget install Python.Python.3
pip install pillow --break-system-packages
```

Script tương ứng: `.claude/skills/srs-write-review/references/workflow_renderer.py`.

## 2. Xuất `.xlsx` (Excel) — `ba-uc`, `baogia`

`ba-uc` (xuất Phụ lục I/III/V) và `baogia` (xuất báo giá mẫu eGOV) đều dùng Python + thư viện `openpyxl` để dựng file Excel đúng định dạng (font, cột, công thức). Cần:

```powershell
winget install Python.Python.3
pip install openpyxl
python --version
```

## 3. Các skill còn lại — không cần cài gì

- `customer-requirement-clarifier`, `effort-estimate-pmbok` — chỉ trả kết quả trên chat, không sinh file.
- `ui-ux-pro-max` — sinh code UI (React/HTML/Tailwind...) trực tiếp trong phiên.

## Kiểm tra nhanh sau khi cài

```powershell
node --version
npm --version
python --version
```

Chỉ cần dòng tương ứng với nhu cầu bạn định dùng (Word hay Excel) chạy OK là đủ — không bắt buộc cài cả hai nếu bạn chỉ dùng output `.md` mặc định.
