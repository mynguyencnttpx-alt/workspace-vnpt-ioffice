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
├── HUONG-DAN-SU-DUNG-SKILL.md    ← chi tiết cách gọi từng skill + input cần chuẩn bị
├── CAI-DAT-CONG-CU-DIAGRAM.md    ← cài công cụ (Node/Python) khi cần xuất .docx hoặc .xlsx
├── .claude/skills/                9 skill đang dùng (bảng dưới)
└── docs/                          đầu ra mặc định của các skill (xem bảng "Output ở đâu" bên dưới)
```

## Danh sách skill hiện có (9 skill)

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
| `srs-write-review` | Viết/review SRS theo chuẩn BM_SRS_AI — luồng WRITE đi qua 4 gate bắt buộc (Outline → vị trí lưu → AI tự review → user phê duyệt cuối) | "viết SRS", "viết đặc tả", "review SRS", "business rule" |
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

Mỗi skill tự nhận diện qua từ khóa trong yêu cầu tự nhiên — không cần gõ đúng lệnh. Muốn chắc chắn gọi đúng skill thì gõ thẳng `/tên-skill`.

### Output ở đâu

Mặc định chung: **`docs/`** (ngay dưới thư mục làm việc hiện tại) — tự tạo thư mục nếu chưa có.

| Skill | Nơi ghi file mặc định |
|---|---|
| `srs-write-review` | Hỏi user chốt thư mục gốc (Bước 2.5) — có chỉ định thì dùng đúng đường dẫn đó, không chỉ định gì thì mặc định `docs/`. Ghi `<thư mục gốc>/<module-slug>/SRS.md` (hoặc `<cr_id>/SRS.md` nếu là CR) |
| `urd-writer-vnpt`, `urd-writer-customer`, `um-writer-vnpt` | `docs/<Loại>_<TenHeThong>_v<x.x>.md` (hoặc `.docx`) |
| `ba-uc`, `baogia` | File Excel `.xlsx` xuất ra `docs/` |
| `customer-requirement-clarifier`, `effort-estimate-pmbok` | Không ghi file — trả kết quả trực tiếp trên chat |
| `ui-ux-pro-max` | Sinh code/thiết kế trực tiếp trong phiên; chỉ ghi ra đĩa (persist design system) khi gọi kèm `--persist` |

> Muốn 1 file nằm đúng chỗ khác — nói rõ đường dẫn mong muốn khi giao việc.

## Quy trình gợi ý cho một feature mới

1. Có yêu cầu thô/nâng cấp từ khách → `customer-requirement-clarifier` làm rõ trước (phân loại, hỏi bổ sung, đánh giá khả thi).
2. Cần tính chi phí phần mềm nội bộ theo QĐ 671 → `ba-uc` xác định Use Case + Phụ lục.
3. Chốt nghiệp vụ: `urd-writer-vnpt` (bản nội bộ) hoặc `urd-writer-customer` (bản họp với khách).
4. Đặc tả kỹ thuật chi tiết: `srs-write-review` — bắt buộc qua 4 gate trước khi xuất file.
5. Ước lượng effort: `effort-estimate-pmbok` → báo giá: `baogia`.
6. Sau khi feature hoàn thiện: `um-writer-vnpt` viết hướng dẫn sử dụng.
7. `ui-ux-pro-max` dùng xen kẽ bất kỳ lúc nào cần mockup/screen/component cụ thể.

Không bắt buộc đi đủ 7 bước — chọn đúng bước cần cho việc đang làm, mỗi skill tự hỏi lại nếu thiếu input.
