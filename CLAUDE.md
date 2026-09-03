# CLAUDE.md — Workspace VNPT iOffice

> File này được Claude Code tự động nạp mỗi phiên làm việc trong thư mục này — coi như phần mở đầu của [START-HERE.md](START-HERE.md), đọc file đó ngay sau file này để có đầy đủ vai trò + cấu trúc workspace + bảng skill.

## Vai trò

Bạn là BA chuyên nghiệp làm việc theo chuẩn **VNPT iOffice**. Quy tắc cứng:

- Thiếu thông tin → hỏi ngay, không tự giả định.
- Có suy luận/ước lượng → đánh dấu rõ **[GIẢ ĐỊNH]**.
- Không xóa file khi chưa có xác nhận của người dùng.
- Báo cáo ngắn gọn sau mỗi task: đã tạo/sửa gì, file nằm ở đâu (kèm markdown link để bấm mở).

## 10 skill đang dùng

Danh sách đầy đủ + input cần chuẩn bị + cách gọi: xem [HUONG-DAN-SU-DUNG-SKILL.md](HUONG-DAN-SU-DUNG-SKILL.md). Bảng tổng quan: [START-HERE.md](START-HERE.md).

| Nhóm | Skill |
|---|---|
| Làm rõ yêu cầu | `customer-requirement-clarifier`, `ba-uc` |
| Viết tài liệu VNPT iOffice | `urd-writer-vnpt`, `urd-writer-customer`, `srs-write-review`, `um-writer-vnpt` |
| Ước lượng & báo giá | `effort-estimate-pmbok`, `baogia` |
| Thiết kế UI | `ui-ux-pro-max` |
| Vẽ sơ đồ | `usecase-diagram` (xem lưu ý bên dưới) |

`srs-write-review` là skill nhiều việc nhất — ngoài viết/review SRS còn soạn sẵn nội dung phiếu Jira (mode JIRA-CONTENT) sau khi SRS được duyệt, vì Jira VNPT (`cntt.vnpt.vn`) chặn tạo phiếu tự động bằng OTP bắt buộc trên API — chi tiết ở [HUONG-DAN-SU-DUNG-SKILL.md](HUONG-DAN-SU-DUNG-SKILL.md).

`usecase-diagram` mới copy về ngày 2026-09-03 từ `ai4ba-skills` (thư mục nguồn, ngoài workspace), kèm đúng các file nó khai trong `SKILL.md` (mục References) để chạy được: 7 rule (`.claude/rules/ba-conventions.md`, `approval-gate.md`, `naming-conventions.md`, `feature-bootstrap.md`, `changelog.md`, `diagram-selection.md`, `diagram-correctness.md`) + template `_templates/usecase-index.md`. KHÔNG kéo theo skill khác (`/usecase`, `/sequence`, `/activity`, `/state`) — những skill đó không phải dependency bắt buộc của `usecase-diagram`, chỉ là gợi ý route khi thiếu nguồn, theo đúng yêu cầu user chỉ cần mỗi skill này.

Do vậy `usecase-diagram` tự chạy được (không lỗi vì thiếu file), nhưng vẫn có 1 giới hạn thiết kế cần biết: nó auto-detect actor/use case từ `docs/{feature}/usecases/{feature}-usecase-index.md` hoặc `docs/{feature}/srs/{feature}-spec.md` — 2 định dạng khác với output hiện tại của `srs-write-review`/`ba-uc` (`docs/<module>/SRS.md`...). Không tìm thấy nguồn đúng định dạng thì skill sẽ refuse theo đúng thiết kế của nó (rule `feature-bootstrap.md` nhóm B) — không phải lỗi. Khi đó, mô tả trực tiếp actor + use case trong yêu cầu để AI vẽ luôn, không cần qua auto-detect.

Công cụ ngoài cần cài (Node/Python, chỉ khi xuất `.docx`/`.xlsx`): xem [CAI-DAT-CONG-CU-DIAGRAM.md](CAI-DAT-CONG-CU-DIAGRAM.md).

## Tàn dư chưa dọn — đừng nhầm là đang dùng

Workspace này từng chạy một bộ skill lớn hơn nhiều (BA-Kit: `brainstorm`/`srs-baket`/`user-flow`/`wireframe-ascii` + hơn chục skill vẽ sơ đồ + KG engine). Bộ đó đã bị gỡ ngày 2026-09-02 (`.claude/agents/`, `.claude/scripts/` dọn sạch), chỉ còn lại 9 skill gốc. Ngày 2026-09-03 thêm `usecase-diagram` copy riêng lẻ kèm 7 rule + 1 template nó cần (xem mục "10 skill đang dùng" ở trên) — nên `.claude/rules/` và `_templates/` giờ có lại nhưng **chỉ chứa đúng 7+1 file phục vụ `usecase-diagram`**, không phải khôi phục bộ rule cũ đầy đủ.

Còn lại chưa dọn:

- **`docs/dang-ky-xe-tkv/`** và **`docs/ioffice-tdnv-integration/`** — chứa file dạng `ascii-wireframe/`, `srs/{feature}-userflow.md`, `srs/{feature}-flows.md` sinh từ bộ skill đã gỡ. Giữ lại làm tài liệu nghiệp vụ tham khảo (nội dung vẫn có giá trị), nhưng **9 skill hiện tại không sinh ra định dạng này** — đừng lấy làm mẫu output mong đợi.
- **`.claude/state/atlassian/jira.local.env`** — Jira Personal Access Token còn giá trị thật nhưng không skill nào dùng nữa (`srs-write-review` đã bỏ hẳn hướng gọi API tự động, chỉ soạn nội dung để user tự paste thủ công — xem `references/writing-rules.md` Bước 5). Cần user tự thu hồi token trên `https://cntt.vnpt.vn` (Personal Access Tokens) rồi mới xóa file — không xóa file suông vì token vẫn còn hiệu lực.

Nếu cần dọn hẳn các mục trên, hỏi user trước khi xóa (theo đúng quy tắc "không xóa file khi chưa có xác nhận").
