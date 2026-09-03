# Hướng dẫn sử dụng skill — Workspace VNPT iOffice

> Bổ sung cho `START-HERE.md`. File này tập trung vào **cách gọi từng skill** và **input cần chuẩn bị**.
> Cập nhật 2026-09-02 theo đúng 9 skill đang có trong `.claude/skills/` — bản trước có thêm "Nhóm 1 — Vẽ sơ đồ" (11 skill `/sequence /activity /bpmn ...`) đã bị gỡ khỏi workspace, phần đó đã bỏ. Bổ sung mode JIRA-CONTENT của `srs-write-review` (soạn nội dung phiếu Jira sau khi SRS duyệt).
> Cập nhật 2026-09-03: thêm `usecase-diagram` (copy từ `ai4ba-skills` kèm đúng 7 rule + 1 template nó cần — xem mục riêng bên dưới và `CLAUDE.md`).

## Nguyên tắc chung

- **Không cần nhớ lệnh chính xác.** Mỗi skill có sẵn danh sách từ khóa kích hoạt (trong `description` của `SKILL.md`) — chỉ cần gõ yêu cầu bằng ngôn ngữ tự nhiên có chứa từ khóa đó, Claude sẽ tự nhận diện và load đúng skill. Muốn chắc chắn gọi đúng skill thì gõ thẳng `/tên-skill` (ví dụ `/srs-write-review`).
- **Thiếu thông tin → skill sẽ hỏi lại 1 lần, gom hết câu hỏi** (không hỏi lắt nhắt nhiều lượt). Trả lời đủ để skill làm tiếp.
- **Approval gate:** các skill viết tài liệu (URD/UM/SRS) đều hiện bản nháp/outline để bạn duyệt (gõ `Y` hoặc xác nhận) trước khi ghi file thật — riêng `srs-write-review` có tới **4 gate bắt buộc** (Outline → vị trí lưu → AI tự review → user phê duyệt cuối), xem chi tiết trong chính `SKILL.md` của skill đó.
- **Output mặc định là `.md`** cho nhóm tài liệu (URD, UM, SRS) — chỉ xuất `.docx` khi bạn yêu cầu rõ ("xuất file Word", "file docx"). **Mặc định chung, file lưu vào `docs/`** (ngay dưới thư mục làm việc hiện tại, tự tạo nếu chưa có) — riêng `srs-write-review` sẽ hỏi bạn chốt thư mục gốc trước, không chỉ định gì thì mới dùng `docs/`. Xem bảng "Output ở đâu" trong `START-HERE.md`.
- **Ngôn ngữ:** hỏi/trả lời tiếng Việt → output tiếng Việt.

---

## 10 skill hiện có (gọi bằng mô tả tự nhiên hoặc `/tên-skill`)

### `customer-requirement-clarifier` — Làm rõ yêu cầu nâng cấp thô của khách hàng

- **Gọi bằng:** "phân tích yêu cầu", "làm rõ yêu cầu", "yêu cầu đã đủ thông tin chưa", "cần hỏi khách gì thêm", "đánh giá khả thi nâng cấp"
- **Input cần:** danh sách yêu cầu nâng cấp/thay đổi thô của khách hàng
- **Quy trình:** chuẩn hoá từng yêu cầu → phân loại FR/NFR/Business Rule → chấm đã đủ thông tin chưa, thiếu thì đề xuất câu hỏi cụ thể cần hỏi khách → đối chiếu chức năng hiện có, nhận định sơ bộ khả thi
- **Output:** hiển thị trực tiếp trên chat, **không ghi file** — dùng làm input đầu vào trước khi chạy `urd-writer-*`/`srs-write-review`

### `ba-uc` — Xác định Use Case theo QĐ 671/QĐ-BTTTT

- **Gọi bằng:** "xác định UC", "phân tích Use Case", "lập Phụ lục I/III/V", "tính điểm UC", "QĐ 671", "xác định phần mềm nội bộ"
- **Input cần:** mô tả nghiệp vụ + phạm vi hệ thống (skill hỏi thêm nếu thiếu)
- **Quy trình:** xác định tác nhân (Phụ lục I) → phân tích UC theo 7 nhóm, confirm từng nhóm → xuất Excel 3 sheet khi được yêu cầu
- **Output:** file Excel (Phụ lục I, III, V) — mặc định ra `docs/`

### `urd-writer-vnpt` — Viết URD theo mẫu BM_URD (bản nội bộ chuẩn VNPT)

- **Gọi bằng:** "viết URD", "tài liệu yêu cầu người dùng", "yêu cầu chức năng", "BM_URD"
- **Input cần (hỏi 1 lần nếu thiếu):** tên hệ thống, danh sách actor, module/phân hệ chính, phiên bản tài liệu (mặc định 1.0)
- **Quy trình:** skill xác nhận outline → chờ bạn duyệt → viết nội dung (sơ đồ cây chức năng + bảng yêu cầu theo module)
- **Output:** `.md` mặc định, `.docx` khi yêu cầu rõ — lưu tại `docs/URD_[TenHT]_v[x.x].md`

### `urd-writer-customer` — Viết URD bản dễ hiểu cho khách hàng non-tech

- **Gọi bằng:** "viết URD cho khách hàng", "URD dễ hiểu", "chốt nghiệp vụ với khách", "chốt giao diện với khách hàng"
- **Khác `urd-writer-vnpt` ở đâu:** ngôn ngữ đời thường hơn, có lồng minh hoạ màn hình/wireframe, có trang tóm tắt nhanh — dùng khi cần họp/trình bày trực tiếp với khách chứ không phải lưu hồ sơ nội bộ. Không rõ nên dùng bản nào → skill sẽ hỏi lại 1 câu.
- **Output:** `.md` mặc định — lưu tại `docs/URD_KH_[TenHT]_v[x.x].md`

### `srs-write-review` — Viết / review SRS chuẩn VNPT iOffice (BM_SRS_AI)

- **Gọi bằng:** "viết SRS", "viết đặc tả", "review SRS", "business rule", "thiết kế luồng", "phân quyền theo role", "trạng thái đối tượng", "tích hợp API"... hoặc chỉ cần đưa mô tả chức năng thô
- **3 mode:**
  - **WRITE** — cung cấp mô tả nghiệp vụ → skill viết SRS mới, đi qua 4 gate bắt buộc trước khi xuất file (xem `START-HERE.md`)
  - **REVIEW** — đính kèm SRS có sẵn → skill chấm điểm chất lượng X/10 + phân tích chi tiết, hiển thị trên chat, không ghi file
  - **JIRA-CONTENT** (gọi bằng "soạn nội dung Jira cho module XYZ", "tạo phiếu Jira cho SRS/CR XYZ") — chỉ chạy sau khi SRS đã ở trạng thái `approved`; soạn sẵn Title/Description/Labels đúng định dạng Jira để bạn tự copy-paste vào `https://cntt.vnpt.vn`. Skill **không tự tạo phiếu thật** (đã thử điều khiển trình duyệt lẫn gọi REST API bằng Personal Access Token, cả 2 đều bị Jira VNPT chặn bằng xác thực OTP bổ sung) — tuyệt đối không paste Jira token/mật khẩu vào chat. Có thể gọi độc lập, không cần lặp lại từ WRITE mode nếu SRS đã có sẵn.
  - Không nói rõ → skill hỏi bạn muốn viết mới, review, hay soạn nội dung Jira
- **Output:** `.md` mặc định, `.docx` (Times New Roman 12pt) khi yêu cầu rõ — skill hỏi bạn chốt thư mục gốc trước (Bước 2.5); không chỉ định gì thì mặc định `docs/`, rồi ghi `<thư mục gốc>/<module-slug>/SRS.md`. Mode JIRA-CONTENT ghi thêm `<module-slug>/jira-ready.md` cạnh SRS.md; khi bạn báo lại mã phiếu đã tạo, skill cập nhật mã đó vào tài liệu để tiện tra cứu sau này

### `um-writer-vnpt` — Viết Hướng dẫn sử dụng / User Manual (BM_UM_BM_AI)

- **Gọi bằng:** "viết hướng dẫn sử dụng", "HDSD", "user manual", "BM_UM"
- **Input cần:** tên hệ thống + phiên bản, đối tượng người dùng cuối, danh sách chức năng cần hướng dẫn, hình ảnh màn hình (nếu có)
- Có thể nạp trực tiếp từ file SRS/URD đã có — skill tự trích luồng người dùng, tên chức năng, điều kiện lỗi
- **Output:** `.md` mặc định, `.docx` khi yêu cầu rõ — lưu tại `docs/HDSD_[TenHT]_v[x.x].md`

### `effort-estimate-pmbok` — Ước lượng effort (manday) theo PMBOK

- **Gọi bằng:** "estimate", "ước lượng effort", "tính manday", "estimate theo PMBOK", "tính buffer"
- **Input cần:** danh sách Use Case / mô tả chức năng / mô tả màn hình — chấp nhận cả danh sách dài hàng chục–hàng trăm dòng dán từ Excel
- **Quy trình:** Three-Point Estimating (PERT) / Parametric Estimating + Reserve Analysis — tối ưu cho số lượng lớn, không sa vào tính toán hàn lâm từng dòng
- **Output:** bảng tổng hợp hiển thị trực tiếp trên chat, **không ghi file** — dùng làm input cho `baogia`

### `baogia` — Tạo báo giá phần mềm (.xlsx mẫu eGOV)

- **Gọi bằng:** "tạo báo giá", "lập báo giá", "estimate theo mẫu", "báo giá TP"
- **Input cần:** danh sách công việc + manday (dùng số liệu từ `effort-estimate-pmbok` nếu có)
- **Output:** file Excel đúng mẫu eGOV — mặc định ra `docs/`

### `ui-ux-pro-max` — Tư vấn/thiết kế/review UI-UX

- **Gọi bằng:** "thiết kế UI", "review giao diện", yêu cầu tạo landing page/dashboard/admin panel, chọn màu sắc/font, cải thiện trải nghiệm người dùng
- **Không cần input cố định** — mô tả loại màn hình/sản phẩm và phong cách mong muốn (nếu có)
- **Output:** code UI (React/HTML/Tailwind...) hoặc khuyến nghị thiết kế ngay trong phiên; chỉ ghi ra đĩa khi gọi kèm `--persist` (lưu design system để dùng lại các phiên sau)

### `usecase-diagram` — Vẽ use case diagram (PlantUML native)

- **Gọi bằng:** "vẽ use case diagram cho XYZ", "sơ đồ use case", `/usecase-diagram --feature <slug>`
- **Nguồn gốc:** copy ngày 2026-09-03 từ `ai4ba-skills` (thư mục nguồn ngoài workspace), kèm đúng các file skill này khai trong `SKILL.md` (mục References) để chạy được: 7 rule — `.claude/rules/ba-conventions.md`, `approval-gate.md`, `naming-conventions.md`, `feature-bootstrap.md`, `changelog.md`, `diagram-selection.md`, `diagram-correctness.md` — + template `_templates/usecase-index.md`. Không kèm skill khác (`/usecase`, `/sequence`, `/activity`, `/state`) vì đó không phải dependency bắt buộc của `usecase-diagram`, chỉ là gợi ý route khi thiếu nguồn.
- **Giới hạn cần biết trước khi dùng:**
  - Skill auto-detect actor/use case từ `docs/{feature}/usecases/{feature}-usecase-index.md` hoặc `docs/{feature}/srs/{feature}-spec.md` — 2 định dạng khác với output hiện tại của `srs-write-review` (`docs/<module>/SRS.md`) và `ba-uc`. Không có sẵn 1 trong 2 file nguồn đúng cấu trúc → skill sẽ **refuse theo đúng thiết kế** (rule `feature-bootstrap.md` nhóm B: "thiếu nguồn thì route upstream, không tự bịa"), không phải lỗi.
  - **Cách dùng thực tế:** khi refuse, mô tả trực tiếp actor + use case cần vẽ ngay trong yêu cầu (thay vì để skill tự dò file) — AI vẫn viết được `.puml`/`.svg` từ mô tả đó. Hoặc tự tạo tay `{feature}-usecase-index.md` theo đúng cấu trúc bảng `## Use cases` (xem `_templates/usecase-index.md`) để auto-detect chạy được.
- **Output:** `docs/{feature}/usecases/{feature}-usecase-diagram.puml` (source) + `.svg` (render qua server công khai `plantuml.com` — nội dung diagram gửi qua internet mỗi lần render, cân nhắc nếu nội dung nhạy cảm) + nhúng ảnh/bảng Actors/Relationships vào `{feature}-usecase-index.md`

---

## Bảng tra nhanh theo tình huống

| Bạn cần... | Gõ gì |
|---|---|
| Làm rõ yêu cầu nâng cấp thô của khách trước khi viết tài liệu | "phân tích yêu cầu nâng cấp sau: ..." |
| Danh sách Use Case + tính chi phí theo QĐ 671 | "xác định UC cho hệ thống XYZ" |
| Tài liệu yêu cầu người dùng cấp cao (nội bộ) | "viết URD cho hệ thống XYZ" |
| Tài liệu chốt nghiệp vụ/UI để họp với khách hàng | "viết URD cho khách hàng, hệ thống XYZ" |
| Viết đặc tả chức năng chi tiết | "viết SRS cho chức năng XYZ" |
| Kiểm tra chất lượng SRS đã có | đính kèm file + "review SRS này" |
| Soạn sẵn nội dung phiếu Jira từ SRS đã duyệt | "soạn nội dung Jira cho module XYZ" |
| Ước lượng effort (manday) trước khi báo giá | "estimate effort cho danh sách UC sau: ..." |
| Báo giá phần mềm | "tạo báo giá từ danh sách manday sau" |
| Hướng dẫn sử dụng cho người dùng cuối | "viết HDSD cho chức năng XYZ" |
| Thiết kế/review giao diện | "thiết kế dashboard cho module XYZ" |
| Sơ đồ tổng quan actor + use case | "vẽ use case diagram cho XYZ" |

> **Vẽ sơ đồ nghiệp vụ khác (sequence/activity/BPMN/ERD...) vẫn KHÔNG có skill nào phục vụ** — nhóm 11 skill vẽ sơ đồ gốc đã bị gỡ khỏi workspace (xem ghi chú trong `START-HERE.md`). Chỉ riêng `usecase-diagram` được copy lại kèm đúng dependency của nó (xem mục riêng ở trên) — không kéo theo `sequence`/`activity`/`state`/`bpmn`... `CAI-DAT-CONG-CU-DIAGRAM.md` vẫn cần rà lại nếu muốn dùng `usecase-diagram` thường xuyên (cần render qua `plantuml.com`, không cần cài thêm gì local trừ khi muốn render offline).

---

## Lưu ý khi làm việc

- Nếu skill hỏi lại — trả lời đủ trong 1 lượt để tránh phải qua lại nhiều lần.
- Trước khi ghi file, luôn có bước xác nhận (outline/plan) — kiểm tra kỹ trước khi gõ `Y`.
- **File output mặc định lưu vào `docs/`** (ngay dưới thư mục làm việc hiện tại) — riêng `srs-write-review` sẽ hỏi bạn chốt thư mục gốc trước, không chỉ định gì thì mới dùng `docs/`. Xem bảng "Output ở đâu" trong `START-HERE.md`; muốn file nằm đúng chỗ khác thì nói rõ đường dẫn khi giao việc.
- Có suy luận/giả định do thiếu thông tin → sẽ được đánh dấu **[GIẢ ĐỊNH]** trong output, cần bạn xác nhận lại.
