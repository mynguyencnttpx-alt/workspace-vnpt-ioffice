# Hướng dẫn sử dụng skill — Workspace VNPT iOffice

> Bổ sung cho `START-HERE.md`. File này tập trung vào **cách gọi từng skill** và **input cần chuẩn bị**.

## Nguyên tắc chung

- **Không cần nhớ lệnh chính xác.** Mỗi skill có sẵn danh sách từ khóa kích hoạt (trong `description` của `SKILL.md`) — chỉ cần gõ yêu cầu bằng ngôn ngữ tự nhiên có chứa từ khóa đó, Claude sẽ tự nhận diện và load đúng skill. Riêng nhóm diagram còn hỗ trợ gọi trực tiếp bằng lệnh `/tên-skill`.
- **Thiếu thông tin → skill sẽ hỏi lại 1 lần, gom hết câu hỏi** (không hỏi lắt nhắt nhiều lượt). Trả lời đủ để skill làm tiếp.
- **Approval gate:** hầu hết skill sẽ hiện bản nháp/outline để bạn duyệt (gõ `Y` hoặc xác nhận) trước khi ghi file thật.
- **Output mặc định là `.md`** cho nhóm tài liệu (URD, UM, SRS) — chỉ xuất `.docx` khi bạn yêu cầu rõ ("xuất file Word", "file docx").
- **Ngôn ngữ:** hỏi/trả lời tiếng Việt → output tiếng Việt.

---

## Nhóm 1 — Vẽ sơ đồ (11 skill, gọi bằng lệnh `/`)

Cú pháp chung: `/tên-skill "<mô tả nghiệp vụ>" --feature <slug>`

| Lệnh | Dùng khi | Ví dụ |
|---|---|---|
| `/sequence` | Vẽ trình tự gọi giữa các bên theo thời gian | `/sequence "Khách đặt món, hệ thống gọi cổng thanh toán, nhà hàng xác nhận" --feature dat-mon` |
| `/activity` | Flow đơn giản 1-2 vai, muốn nhúng thẳng vào file .md | `/activity "Duyệt đơn nghỉ phép có 2 nhánh: duyệt / từ chối" --feature nghi-phep` |
| `/activity-swimlane` ⭐ | Quy trình nhiều vai trò, tương tác chéo (mặc định nên dùng cái này) | `/activity-swimlane "Quy trình duyệt hoàn tiền qua CSKH và kế toán" --feature refund` |
| `/bpmn` | Cần chuẩn BPMN 2.0 OMG để import Camunda/Bizagi | `/bpmn "Quy trình onboarding nhân viên mới" --feature onboarding` |
| `/state` | Vòng đời 1 đối tượng có nhiều trạng thái | `/state Order --feature don-hang` |
| `/erd` | Mô hình dữ liệu, nhúng inline cho BA đọc | `/erd --feature don-hang` |
| `/d2-erd` | ERD đẹp, tách riêng, cho slide/export | `/d2-erd --feature don-hang` |
| `/dbdiagram` | Schema DBML, xuất SQL, bàn giao dev | `/dbdiagram --feature don-hang` |
| `/d2-activity` | Flow nhiều nhánh, cần hình đẹp đứng riêng | `/d2-activity "..." --feature ...` |
| `/d2-architect` | Sơ đồ kiến trúc hệ thống (component/service/DB) | `/d2-architect --feature he-thong` |
| `/usecase-diagram` | Sơ đồ tổng quan actor + use case | `/usecase-diagram --feature he-thong` |

**Quy trình khi gõ lệnh `/...`:**
1. Skill hỏi lại chỗ còn mơ hồ (ai làm bước nào, nhánh rẽ ở đâu...).
2. Hiện kế hoạch ghi file (L1 plan) → bạn gõ `Y` để đồng ý.
3. Skill vẽ, render ảnh (`.svg`/`.png`) và tự kiểm cú pháp (compile-check) trước khi báo xong.

Không biết chọn skill nào → mô tả trong chat cái bạn muốn thể hiện (trình tự thời gian? trạng thái? quy trình đa vai? data model? phạm vi hệ thống?), Claude sẽ gợi ý đúng skill dựa theo `diagram-selection.md`.

---

## Nhóm 2 — Tài liệu & nghiệp vụ (gọi bằng mô tả tự nhiên)

Không cần lệnh `/`, chỉ cần nói đúng nhu cầu — Claude tự nhận diện.

### `uc` — Xác định Use Case theo QĐ 671/QĐ-BTTTT

- **Gọi bằng:** "xác định UC", "phân tích Use Case", "lập Phụ lục I/III/V", "tính điểm UC", "QĐ 671"
- **Input cần:** mô tả nghiệp vụ + phạm vi hệ thống (skill sẽ hỏi thêm nếu thiếu 3 yếu tố bắt buộc)
- **Quy trình:** xác định tác nhân (Phụ lục I) → phân tích UC theo 7 nhóm, confirm từng nhóm → xuất Excel 3 sheet khi bạn yêu cầu
- **Output:** file Excel (Phụ lục I, III, V) khi được yêu cầu xuất

### `srs` — Viết / review SRS chuẩn VNPT iOffice (BM_SRS_AI)

- **Gọi bằng:** "viết SRS", "viết đặc tả", "review SRS", "business rule", "thiết kế luồng", "phân quyền theo role", "trạng thái đối tượng", "tích hợp API"... hoặc chỉ cần đưa mô tả chức năng thô
- **2 mode:**
  - **WRITE** — cung cấp mô tả nghiệp vụ → skill viết SRS mới
  - **REVIEW** — đính kèm SRS có sẵn → skill chấm điểm chất lượng X/10 + phân tích chi tiết
  - Không nói rõ → skill sẽ hỏi bạn muốn viết mới hay review
- **Output:** `.md` mặc định, `.docx` (Times New Roman 12pt) khi yêu cầu rõ

### `urd-skill` — Viết URD (BM_URD)

- **Gọi bằng:** "viết URD", "tài liệu yêu cầu người dùng", "yêu cầu chức năng", "BM_URD"
- **Input cần (hỏi 1 lần nếu thiếu):** tên hệ thống, danh sách actor, module/phân hệ chính, phiên bản tài liệu (mặc định 1.0)
- **Quy trình:** skill xác nhận outline → chờ bạn duyệt → viết nội dung (sơ đồ cây chức năng + bảng yêu cầu theo module)
- **Output:** `.md` mặc định, `.docx` khi yêu cầu rõ

### `um-writer-vnpt` — Viết Hướng dẫn sử dụng / User Manual (BM_UM_BM_AI)

- **Gọi bằng:** "viết hướng dẫn sử dụng", "HDSD", "user manual", "BM_UM"
- **Input cần:** tên hệ thống + phiên bản, đối tượng người dùng cuối, danh sách chức năng cần hướng dẫn, hình ảnh màn hình (nếu có), phiên bản tài liệu
- Có thể nạp trực tiếp từ file SRS/URD đã có — skill tự trích luồng người dùng, tên chức năng, điều kiện lỗi
- **Output:** `.md` mặc định, `.docx` khi yêu cầu rõ

### `bg` (baogia) — Tạo báo giá phần mềm (.xlsx mẫu eGOV)

- **Gọi bằng:** "tạo báo giá", "lập báo giá", "estimate theo mẫu", "báo giá TP"
- **Input cần:** danh sách công việc + manday (hoặc số liệu estimate đã có từ `effort-estimate-pmbok`)
- **Output:** file Excel đúng mẫu eGOV (font Times New Roman 13, cột A–G chuẩn)

### `ui-ux-pro-max` — Tư vấn/thiết kế/review UI-UX

- **Gọi bằng:** "thiết kế UI", "review giao diện", yêu cầu tạo landing page/dashboard/admin panel, chọn màu sắc/font, cải thiện trải nghiệm người dùng
- **Không cần input cố định** — mô tả loại màn hình/sản phẩm và phong cách mong muốn (nếu có)
- **Output:** code UI (React/HTML/Tailwind...) hoặc khuyến nghị thiết kế tùy yêu cầu

---

## Bảng tra nhanh theo tình huống

| Bạn cần... | Gõ gì |
|---|---|
| Vẽ sơ đồ nghiệp vụ | `/tên-skill "..." --feature <slug>` (xem bảng Nhóm 1) |
| Danh sách Use Case + tính chi phí theo QĐ 671 | "xác định UC cho hệ thống XYZ" |
| Viết đặc tả chức năng chi tiết | "viết SRS cho chức năng XYZ" |
| Kiểm tra chất lượng SRS đã có | đính kèm file + "review SRS này" |
| Tài liệu yêu cầu người dùng cấp cao | "viết URD cho hệ thống XYZ" |
| Hướng dẫn sử dụng cho người dùng cuối | "viết HDSD cho chức năng XYZ" |
| Báo giá phần mềm | "tạo báo giá từ danh sách manday sau" |
| Thiết kế/review giao diện | "thiết kế dashboard cho module XYZ" |

---

## Lưu ý khi làm việc

- Nếu skill hỏi lại — trả lời đủ trong 1 lượt để tránh phải qua lại nhiều lần.
- Trước khi ghi file, luôn có bước xác nhận (outline/plan) — kiểm tra kỹ trước khi gõ `Y`.
- File output nên lưu vào `docs/{feature}/` theo `naming-conventions.md` để dễ tra cứu về sau.
- Có suy luận/giả định do thiếu thông tin → sẽ được đánh dấu **[GIẢ ĐỊNH]** trong output, cần bạn xác nhận lại.
