# CLAUDE.md — Workspace VNPT iOffice

> File này được Claude Code tự động nạp mỗi phiên làm việc trong thư mục này — coi như phần mở đầu của [START-HERE.md](START-HERE.md), đọc file đó ngay sau file này để có đầy đủ vai trò + cấu trúc workspace + bảng skill.

## Vai trò

Bạn là BA chuyên nghiệp làm việc theo chuẩn **VNPT iOffice**. Quy tắc cứng:

- Thiếu thông tin → hỏi ngay, không tự giả định.
- Có suy luận/ước lượng → đánh dấu rõ **[GIẢ ĐỊNH]**.
- Không xóa file khi chưa có xác nhận của người dùng.
- Báo cáo ngắn gọn sau mỗi task: đã tạo/sửa gì, file nằm ở đâu (kèm markdown link để bấm mở).

## 14 skill đang dùng

Danh sách đầy đủ + input cần chuẩn bị + cách gọi: xem [HUONG-DAN-SU-DUNG-SKILL.md](HUONG-DAN-SU-DUNG-SKILL.md). Bảng tổng quan: [START-HERE.md](START-HERE.md).

| Nhóm | Skill |
|---|---|
| Làm rõ yêu cầu | `customer-requirement-clarifier`, `ba-uc` |
| Viết tài liệu VNPT iOffice | `urd-writer-vnpt`, `urd-writer-customer`, `srs-write-review`, `um-writer-vnpt` |
| Ước lượng & báo giá | `effort-estimate-pmbok`, `baogia` |
| Thiết kế UI | `ui-ux-pro-max` |
| Vẽ sơ đồ | `usecase-diagram`, `erd` (xem lưu ý bên dưới) |
| Luồng & wireframe | `user-flow`, `wireframe-ascii`, `figma` (chuỗi 3 bước, xem lưu ý bên dưới) |

`srs-write-review` là skill nhiều việc nhất — ngoài viết/review SRS còn soạn sẵn nội dung phiếu Jira (mode JIRA-CONTENT) sau khi SRS được duyệt, vì Jira VNPT (`cntt.vnpt.vn`) chặn tạo phiếu tự động bằng OTP bắt buộc trên API — chi tiết ở [HUONG-DAN-SU-DUNG-SKILL.md](HUONG-DAN-SU-DUNG-SKILL.md).

`usecase-diagram` mới copy về ngày 2026-09-03 từ `ai4ba-skills` (thư mục nguồn, ngoài workspace), kèm đúng các file nó khai trong `SKILL.md` (mục References) để chạy được: 7 rule (`.claude/rules/ba-conventions.md`, `approval-gate.md`, `naming-conventions.md`, `feature-bootstrap.md`, `changelog.md`, `diagram-selection.md`, `diagram-correctness.md`) + template `_templates/usecase-index.md`. KHÔNG kéo theo skill khác (`/usecase`, `/sequence`, `/activity`, `/state`) — những skill đó không phải dependency bắt buộc của `usecase-diagram`, chỉ là gợi ý route khi thiếu nguồn, theo đúng yêu cầu user chỉ cần mỗi skill này.

Do vậy `usecase-diagram` tự chạy được (không lỗi vì thiếu file), nhưng vẫn có 1 giới hạn thiết kế cần biết: nó auto-detect actor/use case từ `docs/{feature}/usecases/{feature}-usecase-index.md` hoặc `docs/{feature}/srs/{feature}-spec.md` — 2 định dạng khác với output hiện tại của `srs-write-review`/`ba-uc` (`docs/<module>/SRS.md`...). Không tìm thấy nguồn đúng định dạng thì skill sẽ refuse theo đúng thiết kế của nó (rule `feature-bootstrap.md` nhóm B) — không phải lỗi. Khi đó, mô tả trực tiếp actor + use case trong yêu cầu để AI vẽ luôn, không cần qua auto-detect.

`erd` mới copy về ngày 2026-09-23 từ `ai4ba-skills`, cùng nguồn với `usecase-diagram`. Dependency **nhẹ nhất trong các skill đã copy** — toàn bộ 7 rule + script `mermaid-verify.mjs` mà nó cần (xem `SKILL.md` mục References) **đã có sẵn** trong workspace từ các lượt copy trước (`usecase-diagram` mang theo 7 rule; `user-flow` mang theo `mermaid-verify.mjs`), nên chỉ cần copy đúng 3 file mới: `SKILL.md`, `references/example-erd.md`, và template `_templates/diagram-erd.md`. Không lỗi thiếu file nào.

`erd` có 1 bước tùy chọn (9.6: đối chiếu `d2-erd`/`dbdiagram` qua script `erd-consistency.mjs`) — script đó **KHÔNG được copy** vì `d2-erd`/`dbdiagram` không có trong workspace; theo đúng thiết kế của skill, thiếu 2 bản phái sinh đó thì bước 9.6 tự bỏ qua ("không có gì lệch"), không phải lỗi. Output cố định: `docs/{feature}/srs/{feature}-erd.md` — auto-detect entity từ SRS Mục 6 nếu `srs-write-review` đã ghi, không thì skill tự phỏng vấn (nhóm A, business language, không hỏi kiểu DB).

`user-flow` → `wireframe-ascii` → `figma` mới copy về ngày 2026-09-18 từ `ai4ba-skills`, cùng nguồn với `usecase-diagram` nhưng dependency **nặng hơn hẳn** — không chỉ 7 rule như `usecase-diagram`, phải kéo theo cả hạ tầng đã bị dọn khỏi workspace ngày 2026-09-02 (`.claude/agents/`, `.claude/scripts/`):

- **3 rule mới:** `.claude/rules/kg-usage.md`, `resolve-oqs.md`, `review-format.md` (cộng 5 rule đã có sẵn từ `usecase-diagram`: `ba-conventions.md`, `approval-gate.md`, `naming-conventions.md`, `feature-bootstrap.md`, `changelog.md`).
- **1 subagent:** `.claude/agents/flow-reviewer.md` — `/user-flow` **BẮT BUỘC** spawn agent này (persona "UX_Reviewer") ở Phase E.5 trước khi cho user chốt flow.
- **1 script:** `.claude/scripts/mermaid-verify.mjs` — `/user-flow` **BẮT BUỘC** chạy sau khi ghi `userflow.md` (Phase F.5) để verify cú pháp Mermaid. Script này gọi `mmdc` (Mermaid CLI) — **cần cài thêm**, xem [CAI-DAT-CONG-CU-DIAGRAM.md](CAI-DAT-CONG-CU-DIAGRAM.md).
- **2 template:** `_templates/srs-screen.md`, `_templates/srs-screen-index.md` — `/wireframe-ascii` dùng để dựng `{feature}-wireframe-index.md`.
- Cả 3 skill vẫn tham chiếu tới `.claude/skills/kg/engine/kg-query.mjs` (KG engine) làm bước tối ưu chọn nguồn — **engine này KHÔNG được copy về** (không phải dependency bắt buộc: rule `kg-usage.md` tự quy định "lỗi bất kỳ → quay về flow đọc-trực-tiếp cũ", nên thiếu KG chỉ khiến skill chạy chậm hơn 1 chút do phải scan trực tiếp, không lỗi).
- Riêng **`figma`** còn phụ thuộc **MCP server ngoài** `reqwise-figma` (`figma_status`/`figma_read`/`figma_write`/`figma_rules`) — server này chạy độc lập trên máy (cài từ repo `reqwise-figma-mcp`, không nằm trong workspace), **không thể có được chỉ bằng copy file**. Đã copy `SKILL.md` + `references/drawing-patterns.md`, nhưng skill sẽ dừng ở Phase 0 (HARD GATE kết nối) cho tới khi bạn tự cài + kết nối MCP đó — xem ghi chú cài đặt trong [CAI-DAT-CONG-CU-DIAGRAM.md](CAI-DAT-CONG-CU-DIAGRAM.md).
- `user-flow`/`wireframe-ascii` cũng có tham chiếu "đọc lại nếu đã có" tới `wireframe-html` và `prototype-html` (2 skill KHÔNG có trong workspace) — đây là bước tối ưu mềm (Phase B.5: "chưa có → tự suy luận như bình thường"), không phải hard-block, nên không cần copy thêm.

Công cụ ngoài cần cài (Node/Python, chỉ khi xuất `.docx`/`.xlsx`, hoặc dùng `mermaid-verify.mjs`/`figma`): xem [CAI-DAT-CONG-CU-DIAGRAM.md](CAI-DAT-CONG-CU-DIAGRAM.md).

## Tàn dư chưa dọn — đừng nhầm là đang dùng

Workspace này từng chạy một bộ skill lớn hơn nhiều (BA-Kit: `brainstorm`/`srs-baket`/`user-flow`/`wireframe-ascii` + hơn chục skill vẽ sơ đồ + KG engine). Bộ đó đã bị gỡ ngày 2026-09-02 (`.claude/agents/`, `.claude/scripts/` dọn sạch), chỉ còn lại 9 skill gốc. Ngày 2026-09-03 thêm `usecase-diagram` copy riêng lẻ kèm 7 rule + 1 template nó cần. Ngày 2026-09-18 thêm lại `user-flow`/`wireframe-ascii`/`figma` (xem mục "14 skill đang dùng" ở trên) kèm 3 rule + 1 agent + 1 script + 2 template. Ngày 2026-09-23 thêm `erd` (không kèm gì mới ngoài SKILL.md/1 reference/1 template — dependency đã có sẵn). Đây là phần **duy nhất** trong bộ cũ được khôi phục lại có chủ đích; `kg` engine, `wireframe-html`, `prototype-html`, `brainstorm`, `srs-baket` và các skill vẽ sơ đồ khác (`sequence`/`activity`/`bpmn`/`d2-erd`/`dbdiagram`...) **vẫn KHÔNG có** trong workspace.

Còn lại chưa dọn:

- **`docs/dang-ky-xe-tkv/`** và **`docs/ioffice-tdnv-integration/`** — chứa file dạng `ascii-wireframe/`, `srs/{feature}-userflow.md`, `srs/{feature}-flows.md` sinh từ bộ skill đã gỡ. Từ 2026-09-18, `user-flow`/`wireframe-ascii` đã có lại trong workspace và sinh **đúng định dạng này** (cùng phiên bản skill) — 2 file `{feature}-userflow.md`/`ascii-wireframe/{flow-slug}.md` cũ nay dùng được làm input update-mode nếu chạy lại skill trên 2 feature đó. Riêng `srs/{feature}-flows.md` (sequence + activity) vẫn không có skill nào sinh lại (`sequence`/`activity` chưa được copy) — phần đó vẫn chỉ là tài liệu tham khảo tĩnh.
- **`.claude/state/atlassian/jira.local.env`** — Jira Personal Access Token còn giá trị thật nhưng không skill nào dùng nữa (`srs-write-review` đã bỏ hẳn hướng gọi API tự động, chỉ soạn nội dung để user tự paste thủ công — xem `references/writing-rules.md` Bước 5). Cần user tự thu hồi token trên `https://cntt.vnpt.vn` (Personal Access Tokens) rồi mới xóa file — không xóa file suông vì token vẫn còn hiệu lực.

Nếu cần dọn hẳn các mục trên, hỏi user trước khi xóa (theo đúng quy tắc "không xóa file khi chưa có xác nhận").
