# Hướng dẫn cài đặt & sử dụng nhanh — Workspace VNPT iOffice

> Dành cho BA mới tham gia team, cần cài project này về máy và chạy được ngay trong ngày đầu.

---

## 1. Cài đặt (làm 1 lần)

### Bước 1 — Tải project về máy

**Cách 1 — dùng Git dòng lệnh:** bấm phím **Windows**, gõ `PowerShell`, Enter để mở **Windows PowerShell**, sau đó gõ:

```powershell
git clone https://github.com/mynguyencnttpx-alt/workspace-vnpt-ioffice.git
cd workspace-vnpt-ioffice
```

**Cách 2 — dùng GitHub Desktop (không cần biết dòng lệnh):**

1. Cài GitHub Desktop tại [desktop.github.com](https://desktop.github.com) nếu máy chưa có, đăng nhập tài khoản GitHub.
2. Menu **File → Clone repository...** → chọn tab **URL** → dán: `https://github.com/mynguyencnttpx-alt/workspace-vnpt-ioffice.git`
3. Chọn thư mục lưu (mục **Local path**) → bấm **Clone**.
4. Sau khi clone xong, bấm **Repository → Show in Explorer** (hoặc **Open in...**) để mở đúng thư mục project vừa tải — dùng thư mục này ở Bước 2 dưới đây.

### Bước 2 — Mở project bằng Claude Code

**Cách khuyến nghị — qua Claude Desktop (không cần cài thêm gì, không cần PowerShell):**

1. Mở app **Claude Desktop**, đăng nhập (dùng chung 1 tài khoản với app chat thường — không cần tài khoản riêng cho Claude Code).
2. Vào tab **Claude Code**.
3. Bấm **Open folder**, chọn đúng thư mục project vừa clone ở Bước 1 (`workspace-vnpt-ioffice`).
4. Xong — gõ yêu cầu ngay trong đó (xem prompt mẫu ở mục 3, 4 bên dưới).

**Cách khác — dùng dòng lệnh (terminal), cho máy không có Claude Desktop hoặc thích dùng CLI:**

Cần cài Claude Code CLI qua npm (npm đi kèm Node.js):

1. Bấm phím **Windows**, gõ `PowerShell`, Enter để mở **Windows PowerShell**.
2. Gõ `npm --version` để kiểm tra đã có npm chưa:
   - Hiện ra số phiên bản (vd `10.8.2`) → đã có, bỏ qua bước 3, sang thẳng bước 4.
   - Báo lỗi `npm is not recognized...` → chưa có Node.js, làm tiếp bước 3.
3. Chưa có npm → cài Node.js: vào [nodejs.org](https://nodejs.org), tải bản **LTS**, mở file `.msi` vừa tải, bấm **Next** liên tục đến **Finish**. Sau đó **đóng cửa sổ PowerShell đang mở, mở lại 1 cửa sổ mới** (bắt buộc để máy nhận lệnh `npm`), gõ lại `npm --version` để xác nhận.
4. Cài Claude Code CLI:
   ```powershell
   npm install -g @anthropic-ai/claude-code
   ```
   Gõ `claude --version` — hiện ra số phiên bản là cài thành công.

> Chỉ cần cài thêm `docx`/Python/`openpyxl` khi thật sự xuất file `.docx`/`.xlsx` — xem [CAI-DAT-CONG-CU-DIAGRAM.md](CAI-DAT-CONG-CU-DIAGRAM.md), không cần làm ngay bước này.

## 2. Chạy hàng ngày

**Qua Claude Desktop (cách chính):** mở app → tab **Claude Code** → mở lại đúng project (chọn từ danh sách gần đây, hoặc **Open folder** lại nếu chưa thấy) → gõ yêu cầu bằng tiếng Việt tự nhiên, hoặc gõ thẳng `/tên-skill` nếu muốn chắc chắn gọi đúng skill (ví dụ `/srs-write-review`).

**Qua terminal (nếu dùng CLI):** mở PowerShell, `cd` vào đúng thư mục `workspace-vnpt-ioffice`, gõ `claude`. Đóng terminal = kết thúc phiên, mở lại `claude` trong đúng thư mục project cho phiên làm việc tiếp theo.

---

## 3. Skill trọng tâm: `srs-write-review`

Skill viết/review SRS theo chuẩn VNPT iOffice — dùng nhiều nhất trong công việc hàng ngày của BA. Có **3 mode**, skill tự nhận diện qua câu lệnh.

### Mode WRITE — viết SRS mới

**Prompt mẫu (gõ 1 lần, đủ 3 thông tin bắt buộc để không bị hỏi lại):**

```
Viết SRS cho module Quản lý công văn đến.
Actor: Văn thư, Chuyên viên, Lãnh đạo
Mô tả: Văn thư tiếp nhận công văn đến, phân loại theo mức độ khẩn,
chuyển cho Chuyên viên xử lý. Chuyên viên xử lý xong trình Lãnh đạo phê duyệt.
```

3 thông tin bắt buộc: **tên hệ thống/module**, **actor**, **mô tả nghiệp vụ**. Thiếu 1 trong 3 → skill hỏi lại gộp 1 lần, không hỏi lắt nhắt.

**Luồng chạy (5 bước, mỗi bước đều dừng chờ xác nhận):**

1. **Tiếp nhận & làm rõ** — skill kiểm tra đủ 3 thông tin bắt buộc; nếu là Change Request (sửa chức năng đã có) sẽ hỏi thêm mã CR + bảng ảnh hưởng.
2. **Xác nhận outline** — skill tóm tắt lại hệ thống/actor/module/phạm vi, hỏi *"Bạn xác nhận để tôi tiến hành viết SRS?"* → gõ `Y` hoặc xác nhận để tiếp tục.
3. **Xác nhận vị trí lưu trữ** — skill hỏi lưu ở đâu. **Đây là điểm rẽ nhánh quan trọng:**

   | Trường hợp | Bạn gõ gì | Kết quả |
   |---|---|---|
   | **Mặc định** — không chỉ định thư mục | Bỏ qua, gõ "mặc định", hoặc `Y` | Lưu tại `docs/<module-slug>/SRS.md` (tự tạo `docs/` nếu chưa có, ngay dưới thư mục project) |
   | **Chỉ định thư mục riêng** | Đưa đường dẫn cụ thể ngay trong prompt ban đầu, hoặc trả lời khi được hỏi — ví dụ: `lưu vào D:\VNPT Project\iOffice\SRS\` | Lưu tại `D:\VNPT Project\iOffice\SRS\<module-slug>\SRS.md` |

   `<module-slug>` skill tự suy ra từ tên module (không dấu, kebab-case, vd "Quản lý công văn đến" → `quan-ly-cong-van-den`), có hiển thị lại ở Bước 2 để bạn kiểm tra. Nếu là CR thì thư mục là `<cr_id>/SRS.md` thay vì `<module-slug>/SRS.md`, vẫn cùng quy tắc mặc định/chỉ định như trên.

4. **AI tự review + phê duyệt cuối** — skill tự chấm điểm chất lượng, hiển thị kết quả và hỏi *"Bạn phê duyệt tài liệu này để tôi xuất file?"* → gõ `Y` để xuất file, hoặc yêu cầu sửa nếu chưa ưng.
5. **Xuất file** — ghi `SRS.md`, kèm ảnh mockup (nếu có) vào thư mục `images/` cùng cấp. Skill báo lại đường dẫn file bằng link bấm mở được + path thuần để copy.

**Output:** file `.md` (mặc định). Chỉ ra `.docx` khi gõ rõ "xuất file Word"/"file docx".

### Mode REVIEW — kiểm tra SRS đã có

**Prompt mẫu:**

```
Review giúp tôi SRS này [đính kèm file .docx/.pdf/.md]
```

**Output:** bảng tổng hợp vấn đề (phân loại theo mức độ 🔴 Critical / 🟠 Major / 🟡 Minor / 💡 Suggestion) + điểm chất lượng X/10, hiển thị **trực tiếp trên chat**, không ghi file.

### Mode JIRA-CONTENT — soạn nội dung phiếu Jira

Chỉ chạy được sau khi SRS đã ở trạng thái **approved** (đã qua Bước 4 ở trên).

**Prompt mẫu:**

```
Soạn nội dung Jira cho module quan-ly-cong-van-den
```

**Output:** file `jira-ready.md` (Title/Description/Labels đúng định dạng Jira) lưu cạnh `SRS.md`. Skill **không tự tạo phiếu thật** trên Jira (bị chặn OTP) — bạn tự copy-paste vào `https://cntt.vnpt.vn`, sau đó báo lại mã phiếu để skill cập nhật vào tài liệu.

---

## 4. Các skill khác — prompt mẫu & output

| Skill | Prompt mẫu | Output |
|---|---|---|
| `customer-requirement-clarifier` | "Phân tích các yêu cầu nâng cấp sau: 1. ... 2. ..." | Bảng phân loại + câu hỏi cần hỏi khách, hiển thị trên chat — không ghi file |
| `ba-uc` | "Xác định Use Case cho hệ thống Quản lý đăng ký xe theo QĐ 671" | File Excel Phụ lục I/III/V trong `docs/` |
| `urd-writer-vnpt` | "Viết URD cho hệ thống XYZ, actor gồm Admin, Nhân viên..." | `docs/URD_[TenHT]_v[x.x].md` |
| `urd-writer-customer` | "Viết URD cho khách hàng, hệ thống XYZ" | `docs/URD_KH_[TenHT]_v[x.x].md` |
| `um-writer-vnpt` | "Viết hướng dẫn sử dụng cho chức năng XYZ" (có thể nạp thẳng từ SRS đã có) | `docs/HDSD_[TenHT]_v[x.x].md` |
| `effort-estimate-pmbok` | "Ước lượng effort cho danh sách UC sau: ..." (dán cả danh sách dài từ Excel cũng được) | Bảng effort + buffer + rủi ro, hiển thị trên chat — không ghi file |
| `baogia` | "Tạo báo giá từ danh sách manday sau: ..." (dùng số liệu từ `effort-estimate-pmbok` nếu có) | File Excel `.xlsx` mẫu eGOV trong `docs/` |
| `ui-ux-pro-max` | "Thiết kế dashboard cho module XYZ, phong cách glassmorphism" | Code UI ngay trong phiên; chỉ ghi ra đĩa khi thêm `--persist` |

Chi tiết đầy đủ hơn từng skill: xem [HUONG-DAN-SU-DUNG-SKILL.md](HUONG-DAN-SU-DUNG-SKILL.md).

---

## 5. Lưu ý chung khi dùng

- Trả lời bằng tiếng Việt → output tiếng Việt.
- Trước khi ghi bất kỳ file nào, skill luôn dừng lại xin xác nhận (outline/plan) — đọc kỹ trước khi gõ `Y`.
- Thiếu thông tin → skill hỏi lại gộp 1 lần, trả lời đủ trong 1 lượt để đỡ mất công qua lại.
- Có suy luận/giả định do thiếu dữ kiện → skill đánh dấu rõ **[GIẢ ĐỊNH]**, kiểm tra lại trước khi dùng.
- Không có thao tác nào xóa file khi chưa xác nhận — yên tâm thử.
- File output là `.md` — mở bằng Notepad sẽ thấy nguyên ký tự `#`, `**`, `|` khó đọc. Nên cài **MarkText** hoặc **Typora** (phần mềm mở file `.md` với giao diện định dạng đẹp như Word, không cần biết cú pháp Markdown) để xem/sửa nội dung cho dễ.
