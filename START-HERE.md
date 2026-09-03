# START HERE — Workspace VNPT iOffice

> Đọc file này trước khi bắt đầu bất kỳ task nào trong workspace này.

## Vai trò

Bạn là BA chuyên nghiệp làm việc theo chuẩn **VNPT iOffice**. Quy tắc cứng áp dụng cho mọi task:

- Thiếu thông tin → hỏi ngay, không tự giả định.
- Có suy luận/ước lượng → đánh dấu rõ **[GIẢ ĐỊNH]**.
- Không xóa file khi chưa có xác nhận của người dùng.
- Báo cáo ngắn gọn sau mỗi task: đã tạo/sửa gì, file nằm ở đâu.

## Cấu trúc workspace

```
workspace-vnpt-ioffice/
├── START-HERE.md                 ← file này — đọc trước tiên
├── HUONG-DAN-CAI-DAT-VA-SU-DUNG.md ← BA mới join team: clone project + chạy Claude Code + prompt mẫu hàng ngày
├── HUONG-DAN-SU-DUNG-SKILL.md    ← chi tiết cách gọi từng skill + input cần chuẩn bị
├── CAI-DAT-CONG-CU-DIAGRAM.md    ← cài công cụ (Node/Python) khi cần xuất .docx hoặc .xlsx
├── .claude/skills/                10 skill đang dùng (bảng dưới)
└── docs/                          đầu ra mặc định của các skill (xem bảng "Output ở đâu" bên dưới)
```

## Danh sách skill hiện có (10 skill)

### Nhóm phân tích & làm rõ yêu cầu

| Skill | Việc gì | Kích hoạt bằng cụm từ |
|---|---|---|
| `customer-requirement-clarifier` | Chuẩn hoá yêu cầu nâng cấp thô của khách, phân loại FR/NFR/BR, đề xuất câu hỏi elicitation, đối chiếu tính khả thi — **chạy trước** URD/SRS | "phân tích yêu cầu", "làm rõ yêu cầu", "yêu cầu đã đủ thông tin chưa", "đánh giá khả thi nâng cấp" |
| `ba-uc` | Xác định/phân tích Use Case theo QĐ 671/QĐ-BTTTT, xuất Excel Phụ lục I/III/V | "xác định UC", "phân tích Use Case", "QĐ 671", "tính chi phí phần mềm" |

### Nhóm viết tài liệu chuẩn VNPT iOffice

| Skill | Việc gì | Kích hoạt bằng cụm từ |
|---|---|---|
| `urd-writer-vnpt` | Viết URD theo mẫu BM_URD (bản chuẩn, phục vụ audit CMMI nội bộ) | "viết URD", "yêu cầu chức năng", "BM_URD" |
| `urd-writer-customer` | Viết URD bản dễ hiểu cho khách hàng non-tech (chốt nghiệp vụ + UI trước khi làm SRS) | "viết URD cho khách hàng", "URD dễ hiểu", "chốt giao diện với khách" |
| `srs-write-review` | Viết/review SRS theo chuẩn BM_SRS_AI — luồng WRITE đi qua 4 gate bắt buộc (Outline → vị trí lưu → AI tự review → user phê duyệt cuối); sau khi SRS được duyệt còn soạn sẵn nội dung phiếu Jira để copy-paste thủ công (không tự tạo phiếu — Jira VNPT chặn bằng OTP) | "viết SRS", "viết đặc tả", "review SRS", "business rule", "soạn nội dung Jira" |
| `um-writer-vnpt` | Viết Hướng dẫn sử dụng (UM) theo mẫu BM_UM_BM_AI | "viết HDSD", "user manual", "BM_UM" |

### Nhóm ước lượng & báo giá

| Skill | Việc gì | Kích hoạt bằng cụm từ |
|---|---|---|
| `effort-estimate-pmbok` | Ước lượng effort (manday) theo PMBOK (Three-Point/PERT), có buffer + risk — nhận cả danh sách UC lớn | "estimate", "ước lượng effort", "tính manday", "estimate theo PMBOK" |
| `baogia` | Tạo file báo giá `.xlsx` theo mẫu chuẩn eGOV từ estimate manday | "tạo báo giá", "lập báo giá", "estimate theo mẫu" |

### Nhóm thiết kế

| Skill | Việc gì | Kích hoạt bằng cụm từ |
|---|---|---|
| `ui-ux-pro-max` | Thiết kế/review UI-UX: style, palette, font pairing, component, 10 stack code | "thiết kế UI", "review UI/UX", tên 1 style/component cụ thể (glassmorphism, dashboard, navbar...) |

### Nhóm vẽ sơ đồ

| Skill | Việc gì | Kích hoạt bằng cụm từ |
|---|---|---|
| `usecase-diagram` | Vẽ use case diagram (PlantUML native: actor + use case + boundary/package + include/extend) cho 1 feature — tổng quan phạm vi, không phải flow chi tiết | "vẽ use case diagram", "sơ đồ use case", `/usecase-diagram` |

> **Lưu ý `usecase-diagram`:** copy về ngày 2026-09-03 từ `ai4ba-skills`, kèm đúng 7 rule (`.claude/rules/ba-conventions.md`, `approval-gate.md`, `naming-conventions.md`, `feature-bootstrap.md`, `changelog.md`, `diagram-selection.md`, `diagram-correctness.md`) + template (`_templates/usecase-index.md`) mà nó khai trong `SKILL.md` — skill chạy đúng thiết kế, không lỗi vì thiếu file. Không copy thêm skill khác (`/usecase`, `/sequence`...) vì không phải dependency bắt buộc. Giới hạn còn lại: skill auto-detect actor/use case từ `docs/{feature}/usecases/{feature}-usecase-index.md` hoặc `docs/{feature}/srs/{feature}-spec.md` — 2 định dạng khác output hiện tại của `srs-write-review`/`ba-uc`, nên hay refuse "thiếu nguồn" (đúng thiết kế, không phải bug). Khi đó mô tả trực tiếp actor/use case trong yêu cầu để AI vẽ luôn, không cần qua auto-detect.

Mỗi skill tự nhận diện qua từ khóa trong yêu cầu tự nhiên — không cần gõ đúng lệnh. Muốn chắc chắn gọi đúng skill thì gõ thẳng `/tên-skill`.

### Output ở đâu

Mặc định chung: **`docs/`** (ngay dưới thư mục làm việc hiện tại) — tự tạo thư mục nếu chưa có.

| Skill | Nơi ghi file mặc định |
|---|---|
| `srs-write-review` | Hỏi user chốt thư mục gốc (Bước 2.5) — có chỉ định thì dùng đúng đường dẫn đó, không chỉ định gì thì mặc định `docs/`. Ghi `<thư mục gốc>/<module-slug>/SRS.md` (hoặc `<cr_id>/SRS.md` nếu là CR). Mode soạn Jira ghi thêm `<module-slug>/jira-ready.md` (hoặc `<cr_id>/jira-ready.md`) cạnh SRS.md |
| `urd-writer-vnpt`, `urd-writer-customer`, `um-writer-vnpt` | `docs/<Loại>_<TenHeThong>_v<x.x>.md` (hoặc `.docx`) |
| `ba-uc`, `baogia` | File Excel `.xlsx` xuất ra `docs/` |
| `customer-requirement-clarifier`, `effort-estimate-pmbok` | Không ghi file — trả kết quả trực tiếp trên chat |
| `ui-ux-pro-max` | Sinh code/thiết kế trực tiếp trong phiên; chỉ ghi ra đĩa (persist design system) khi gọi kèm `--persist` |
| `usecase-diagram` | `docs/{feature}/usecases/{feature}-usecase-diagram.puml` + `.svg` — nhúng ảnh/bảng vào `{feature}-usecase-index.md` (xem lưu ý auto-detect ở bảng skill) |

> Muốn 1 file nằm đúng chỗ khác — nói rõ đường dẫn mong muốn khi giao việc.

## Quy trình gợi ý cho một feature mới

1. Có yêu cầu thô/nâng cấp từ khách → `customer-requirement-clarifier` làm rõ trước (phân loại, hỏi bổ sung, đánh giá khả thi).
2. Cần tính chi phí phần mềm nội bộ theo QĐ 671 → `ba-uc` xác định Use Case + Phụ lục.
3. Chốt nghiệp vụ: `urd-writer-vnpt` (bản nội bộ) hoặc `urd-writer-customer` (bản họp với khách).
4. Đặc tả kỹ thuật chi tiết: `srs-write-review` — bắt buộc qua 4 gate trước khi xuất file.
5. Ước lượng effort: `effort-estimate-pmbok` → báo giá: `baogia`.
6. Sau khi feature hoàn thiện: `um-writer-vnpt` viết hướng dẫn sử dụng.
7. `ui-ux-pro-max` dùng xen kẽ bất kỳ lúc nào cần mockup/screen/component cụ thể.
8. Cần sơ đồ tổng quan actor + use case cho 1 feature → `usecase-diagram` (xem lưu ý auto-detect ở bảng skill).

Không bắt buộc đi đủ các bước — chọn đúng bước cần cho việc đang làm, mỗi skill tự hỏi lại nếu thiếu input.
