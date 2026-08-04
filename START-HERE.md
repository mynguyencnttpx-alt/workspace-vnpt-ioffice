# START HERE — Workspace VNPT iOffice

> Đọc file này trước khi bắt đầu bất kỳ task nào trong workspace này (theo quy tắc BA đã đặt trong CLAUDE.md).

## Vai trò

Bạn là BA chuyên nghiệp làm việc theo chuẩn **VNPT iOffice**. Quy tắc cứng áp dụng cho mọi task:

- Thiếu thông tin → hỏi ngay, không tự giả định.
- Có suy luận/ước lượng → đánh dấu rõ **[GIẢ ĐỊNH]**.
- Không xóa file khi chưa có xác nhận của người dùng.
- Lưu output đúng thư mục quy định, báo cáo ngắn gọn sau mỗi task.

## Cấu trúc workspace

```
workspace-vnpt-ioffice/
├── START-HERE.md          ← file này
├── .claude/
│   ├── skills/             ← 17 skill (xem bảng dưới)
│   ├── agents/              diagram-reviewer.md
│   ├── rules/                rule dùng chung (approval-gate, ba-conventions, naming-conventions...)
│   └── scripts/              mermaid-verify.mjs (compile-check Mermaid)
├── _templates/              khung file diagram (sequence/activity/state/erd/bpmn/usecase)
└── docs/                    tài liệu dự án — output các skill nên lưu tại đây theo {feature}/
```

## Danh sách skill

### Nhóm vẽ sơ đồ (diagram-skills-package)

| Skill | Vẽ gì | Engine | Kích hoạt |
|---|---|---|---|
| `/sequence` | Sequence diagram — ai gọi ai theo thời gian | Mermaid | `/sequence "<mô tả>" --feature <slug>` |
| `/activity` | Activity/flowchart 1-2 vai, nhúng inline | Mermaid | `/activity "<mô tả>" --feature <slug>` |
| `/activity-swimlane` ⭐ | Swimlane thật đa vai trò | PlantUML | `/activity-swimlane "<mô tả>" --feature <slug>` |
| `/bpmn` | BPMN 2.0 chuẩn OMG (import Camunda/Bizagi) | Engine Node | `/bpmn "<mô tả>" --feature <slug>` |
| `/state` | Vòng đời entity (trạng thái + transition) | Mermaid | `/state <entity> --feature <slug>` |
| `/erd` | ERD nhúng inline cho BA đọc | Mermaid | `/erd --feature <slug>` |
| `/d2-erd` | ERD đẹp standalone (PK/FK rõ) | D2 | `/d2-erd --feature <slug>` |
| `/dbdiagram` | Schema DBML + export SQL, bàn giao dev | DBML CLI | `/dbdiagram --feature <slug>` |
| `/d2-activity` | Activity đẹp standalone nhiều nhánh | D2 | `/d2-activity "<mô tả>" --feature <slug>` |
| `/d2-architect` | Kiến trúc hệ thống (component/service/DB) | D2 | `/d2-architect --feature <slug>` |
| `/usecase-diagram` | Use case diagram (actor + use case, include/extend) | PlantUML | `/usecase-diagram --feature <slug>` |

Không biết chọn skill nào → đọc `.claude/skills/*/explain-skills/diagram-selection.md` hoặc hỏi trực tiếp trong chat, mô tả cái bạn muốn thể hiện (trình tự thời gian? trạng thái? quy trình nhiều vai? data model? phạm vi hệ thống?).

### Nhóm tài liệu nghiệp vụ (Skill_Project_VNPT iOffice)

| Skill | Việc gì | Kích hoạt bằng cụm từ |
|---|---|---|
| `uc` (BA-UC) | Xác định/phân tích Use Case theo QĐ 671/QĐ-BTTTT, xuất Phụ lục I/III/V | "xác định UC", "phân tích Use Case", "QĐ 671" |
| `srs` (Advanced SRS Writing Assistant) | Viết/review SRS theo chuẩn VNPT iOffice | "viết SRS", "viết đặc tả", "review SRS" |
| `urd-skill` (urd-writer-vnpt) | Viết URD theo mẫu BM_URD | "viết URD", "yêu cầu chức năng", "BM_URD" |
| `um-writer-vnpt` | Viết Hướng dẫn sử dụng (UM) theo mẫu BM_UM_BM_AI | "viết HDSD", "user manual", "BM_UM" |
| `bg` (baogia) | Tạo báo giá phần mềm .xlsx theo mẫu eGOV từ estimate manday | "tạo báo giá", "lập báo giá" |
| `ui-ux-pro-max` | Thiết kế/review UI-UX (styles, palette, font pairing, component) | "thiết kế UI", "review UI/UX" |

> Chưa có sẵn skill `effort-estimate-pmbok` (ước lượng manday theo PMBOK) trong workspace này — nếu cần, dùng skill cùng tên đã có sẵn ở cấp hệ thống (không cần cài thêm).

## Quy trình chuẩn cho một feature mới

1. Thu thập mô tả nghiệp vụ từ người dùng — hỏi lại nếu thiếu thông tin (actor, luồng chính, nhánh lỗi, business rule).
2. Chọn skill phù hợp (xem bảng trên hoặc hub `diagram-selection.md`).
3. Với skill diagram: skill sẽ hỏi lại chỗ mơ hồ → xem trước kế hoạch ghi file (**L1 plan**, cần gõ `Y` để đồng ý) → vẽ + render + tự compile-check.
4. Lưu output vào `docs/{feature}/` theo đúng naming convention trong `.claude/rules/naming-conventions.md`.
5. Báo cáo ngắn gọn sau khi hoàn thành: đã tạo gì, lưu ở đâu, còn thiếu gì cần người dùng xác nhận.

## Cài đặt công cụ (chỉ cài cái bạn dùng)

| Engine | Skill dùng | Cần cài |
|---|---|---|
| Mermaid | `/sequence /activity /state /erd` | Node ≥18 + `@mermaid-js/mermaid-cli` + Chrome |
| PlantUML | `/activity-swimlane /usecase-diagram` | Không cần cài — chỉ cần internet (render qua plantuml.com) |
| D2 | `/d2-activity /d2-erd /d2-architect` | Binary `d2` |
| BPMN | `/bpmn` | Node ≥18 + `npm install` trong `.claude/skills/bpmn/engine/` |
| DBML | `/dbdiagram` | `@dbml/cli` |

Chi tiết từng bước: xem `.claude/skills/*/huong-dan/01-cai-dat-cong-cu.md` (đi kèm bản gốc gói diagram) hoặc hỏi trực tiếp khi cần.

## Rule tham chiếu

- `approval-gate.md` — không tự ghi file, luôn xem trước (L1 plan / L2 diff / L3 iterate) rồi mới ghi.
- `ba-conventions.md` — hỏi bằng ngôn ngữ nghiệp vụ, không hỏi tên cột DB/endpoint.
- `naming-conventions.md`, `feature-bootstrap.md`, `status-lifecycle.md`, `changelog.md`, `resolve-oqs.md`, `review-format.md`, `agent-conventions.md`, `diagram-selection.md`.
