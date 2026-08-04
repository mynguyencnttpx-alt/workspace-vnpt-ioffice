# CLAUDE.md — Skill nhập từ BA-Kit (ai4ba-skills)

> File này chỉ mô tả **4 skill vừa nhập** từ BA-Kit (`brainstorm`, `srs-baket`, `user-flow`, `wireframe-ascii`) — ngày nhập 2026-08-04. Danh sách 17 skill sẵn có từ trước (nhóm vẽ sơ đồ + nhóm tài liệu VNPT iOffice) xem [START-HERE.md](START-HERE.md), không lặp lại ở đây.

## 4 skill mới

| Lệnh | Dùng khi | Output |
|---|---|---|
| `/brainstorm <ý tưởng>` hoặc `/brainstorm @<file>` | Ghi lại 1 ý tưởng thô, phỏng vấn làm rõ trước khi viết URD/PRD | `docs/{feature}/brainstorms/{idea-slug}.md` |
| `/srs-baket <feature>` hoặc `/srs-baket <feature> --spec-only` | Kỹ thuật hoá scope thành SRS 4 tầng: Core spec (FR/NFR/BR/Error/Success Criteria) → Models (use case/flows/ERD/state) → UX (user flow/wireframe) → Delivery (user story/AC) | `docs/{feature}/srs/{feature}-spec.md` (+ file các tầng sau tuỳ chọn) |
| `/user-flow <feature-slug>` hoặc `/user-flow "<mô tả tính năng>"` | Phân tích nghiệp vụ ra user flow tổng (mermaid), phủ happy/error/edge case, chia sẵn feature thành các flow trước khi vẽ wireframe | `docs/{feature}/srs/{feature}-userflow.md` |
| `/wireframe-ascii <feature>` hoặc `/wireframe-ascii <feature> --flow <flow-slug>` | Vẽ ASCII wireframe cho từng flow (cần `user-flow` chạy trước) | `docs/{feature}/ascii-wireframe/{flow-slug}.md` + `{feature}-wireframe-index.md` |

### ⚠️ `/srs-baket` — không phải `/srs`

Dự án này **đã có sẵn** skill `/srs` (chuẩn VNPT iOffice BM_SRS_AI, xem `.claude/skills/srs/`) từ trước khi nhập BA-Kit. Skill orchestrator 4-tầng của BA-Kit trùng tên gốc nên được đổi tên thành **`/srs-baket`** khi nhập để không ghi đè. Hai skill này độc lập, phục vụ mục đích khác nhau:

- `/srs` — viết/review SRS theo biểu mẫu VNPT (Word-compatible, `references/srs-template-vnpt.md`).
- `/srs-baket` — orchestrator kỹ thuật hoá PRD/brainstorm thành FR/NFR/BR có traceability ID, tuỳ chọn kéo dài tới use case/ERD/wireframe/user story.

Chọn cái nào tuỳ nhu cầu — không phải bản thay thế của nhau.

## Chuỗi làm việc gợi ý (4 skill mới)

```
/brainstorm <ý tưởng>          # chốt nghiệp vụ thô
      │
      ▼
/srs-baket <feature>           # spec.md — chọn tầng chạy tới đâu (menu hỏi ngay đầu)
      │  (chọn tầng ≥3 UX sẽ tự gọi /user-flow rồi /wireframe-ascii bên trong)
      ▼
/user-flow <feature>           # (hoặc chạy lẻ) userflow.md — chia flow, happy/error/edge
      │
      ▼
/wireframe-ascii <feature>     # ASCII wireframe theo từng flow
```

Có thể chạy lẻ từng skill (không nhất thiết qua `/srs-baket`) — mỗi skill tự kiểm upstream cần thiết và tự gọi skill trước nó nếu thiếu (vd `/wireframe-ascii` tự gọi `/user-flow` nếu chưa có `userflow.md`).

## Rule dùng chung (đã có sẵn trong dự án, áp dụng cho cả 4 skill mới)

`.claude/rules/`: `approval-gate.md` (L1/L2/L3 HITL), `ba-conventions.md` (IT-BA framing, no-re-ask), `naming-conventions.md` (path/ID convention), `feature-bootstrap.md` (feature chưa tồn tại xử lý sao), `changelog.md` (ghi log — dự án này dùng tên `docs/_shared/activity.log`, xem lưu ý dưới), `resolve-oqs.md`, `review-format.md`, `diagram-selection.md`, `kg-usage.md` (mới nhập), `project-profile.md` (mới nhập), `keyword-detection.md` (mới nhập).

## Công cụ ngoài cần cài

| Công cụ | Trạng thái | Bắt buộc cho |
|---|---|---|
| Node.js | ✅ đã có | mọi script `.mjs` |
| `mmdc` (`@mermaid-js/mermaid-cli`) + Chrome for Testing | ❌ **chưa cài** | `/user-flow` Phase F.5 (bắt buộc verify mermaid trước khi báo xong), `/srs-baket` Tầng 2 |

Chưa cài `mmdc` thì `/user-flow` vẫn chạy hết các phase phỏng vấn/duyệt, nhưng bước verify-mermaid cuối cùng sẽ báo lỗi thay vì compile OK.

## Ghi chú vận hành

- **KG engine** (`.claude/skills/kg/`) chưa cài — 3 skill (`srs-baket`, `user-flow`, `wireframe-ascii`) có bước "KG chọn nguồn trước" sẽ tự fallback sang scan tài liệu trực tiếp khi lệnh KG không chạy được. Không chặn, chỉ chậm hơn.
- **Hook `auto-changelog.sh`** chưa được khai báo trong dự án (chưa có `.claude/settings.json`) — `docs/_shared/activity.log` hiện chưa tự động ghi. Không ảnh hưởng tới việc dùng 4 skill, chỉ là lịch sử thay đổi chưa auto-log.
- Cấu trúc `docs/{feature}/...` của dự án đã khớp sẵn với convention 4 skill này mong đợi — không cần chỉnh gì.
