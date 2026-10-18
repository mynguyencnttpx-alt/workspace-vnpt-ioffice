# Kế hoạch code MVP — Kiểm tra pháp lý (luồng gửi dự thảo → AI → kết quả)

> Ngày lập: 2026-10-18. Nguồn: `SRS.md` (FC-005/012/013/014/018/028–030), repo mẫu `D:\Project_Antigravity\CSKH_LineVPS`.
> Repo code: `D:\Project_Antigravity\KiemTraPhapLy` (tạo mới, bám cấu trúc và công nghệ của hệ thống CSKH).

## 1. Mục tiêu bản chạy đầu tiên

Quản trị cấu hình nhà cung cấp AI và đơn giá → nạp văn bản pháp lý vào kho → người dùng gửi dự thảo, quét nhạy cảm → AI đối chiếu → xem kết quả kèm căn cứ và chi phí.

- **Có trong bản này:** FC-001 (đăng nhập tối giản), FC-005 (nạp từ tệp), FC-006/007 (xem kho), FC-012, FC-013, FC-014, FC-018, FC-028, FC-029, FC-030, một phần FC-037.
- **Để sau:** nạp từ đường dẫn, FC-011, hỏi đáp FC-022, popup/API iOffice, FC-031 hạn mức, báo cáo, đa đơn vị đầy đủ.

## 2. Stack (bám CSKH)

TypeScript · Next.js App Router, API-first (route → service → Drizzle) · PGlite khi dev, Postgres + pgvector khi thật · pg-boss · embedding transformers.js · LLM qua adapter · Vitest.

**Tái dùng từ CSKH:** khung ESLint chặn import giữa các tầng; `llm*.ts`; `bi-mat.ts`; `doc-tai-lieu.ts`; `embedding*.ts`; hàng đợi/worker; `tich-hop.ts`; `chi-phi.ts`; `nhat-ky-ai.ts`; component UI; xác thực; token thiết kế.

**Viết mới:** bóc tách số hiệu/loại/ngày văn bản; tách Chương/Điều/Khoản kèm số trang; quét và che ẩn nhạy cảm; bộ đối chiếu dự thảo với kho và kiểm tra trích dẫn; các màn hình theo Figma.

## 3. Các lát

| Lát | Nội dung | SRS | Kết quả kiểm được |
|---|---|---|---|
| K00 | Dựng repo từ khung CSKH, bỏ phần ticket/kb; dựng ERD phân hệ (skill `erd`) | – | `npm run dev` chạy, lint/typecheck xanh |
| K01 | Schema, migration, RLS theo đơn vị; seed 1–2 đơn vị, 3 vai trò | – | test RLS chéo đơn vị |
| K02 | Đăng nhập, phiên, phân quyền 3 vai trò | FC-001 | test quyền |
| K03 | Danh mục lĩnh vực (seed) | FC-025 tối thiểu | chọn được lĩnh vực |
| K04 | Cấu hình AI: nhà cung cấp, kiểm tra kết nối, đơn giá, mặc định đơn vị | FC-028/029/030 | gọi thử mock và thật, khóa không lộ |
| K05 | Nạp văn bản từ tệp: đọc, bóc tách, gợi ý lĩnh vực, trùng số hiệu; nền: tách Điều/Khoản + embedding | FC-005 | nạp bộ mẫu, đúng số Điều/Khoản |
| K06 | Danh sách, chi tiết kho, mở nội dung tại đúng Điều | FC-006/007 | xem được kho đã nạp |
| K07 | Màn Gửi dự thảo: lĩnh vực, ngày xét, tích nguồn, tải tệp, kiểm tra EX, tóm lược | FC-012 | đủ các nhánh lỗi |
| K08 | Quét nhạy cảm, che ẩn `[LOAI_n]` có bảng ánh xạ mã hóa, xem bản sẽ gửi | FC-013 | nhà cung cấp chỉ nhận mã tạm, khôi phục đúng |
| K09 | Bộ đối chiếu: tách dự thảo, ứng viên (từ khóa không dấu + vector), gọi AI, kiểm tra trích dẫn, thử lại, chia phần, hủy, token và chi phí | FC-014 | mock cho test, AI thật cho thử |
| K10 | Màn Đang xử lý, danh sách lượt, màn Kết quả | FC-017/018 | khớp Figma 17-4278, 17-4607, 17-4431 |
| K11 | Chi phí lượt cho quản trị, nhật ký gửi AI | FC-014 BR-07, FC-037 | chi phí đúng đơn giá hiệu lực |
| K12 | Bộ dữ liệu mẫu có đáp án, nghiệm thu từng vai trò | – | xem mục 5 |

Thứ tự: K00 → K01 → K02 → K04 song song K03 → K05 → K06 → K07 → K08 → K09 → K10 → K11 → K12.

## 4. Dữ liệu chạy thử

- Nguồn văn bản: bộ mẫu dạng text (ví dụ Luật Đất đai 2024 trích đoạn) cho test tự động; tệp PDF/Word thật do người dùng cung cấp sau.
- Dự thảo mẫu: 3 bản, mỗi bản có một lỗi biết trước (trái quy định, thiếu nội dung, đúng quy định), có đáp án.
- AI: mock cho test; hãng AI và khóa API thật do người dùng cung cấp sau.

## 5. Nguyên tắc bắt buộc

- AI chỉ nhận đoạn dự thảo và điều khoản ứng viên, không nhận cả tệp (FC-014 BR-02).
- Nội dung dự thảo nằm trong khối dữ liệu của prompt, không làm lệnh.
- Điểm vi phạm có trích dẫn không tồn tại trong kho thì bị loại (BR-05).
- Chi phí để trống, không ghi 0, khi thiếu token hoặc đơn giá.
- Mã lỗi `E-kiem-tra-phap-ly-NNN` và câu chữ chỉ lấy một chỗ, đúng SRS.
- Khóa API không trả về trình duyệt, không ghi vào log.

**Nghiệm thu K12:** đủ luồng chính, lỗi, EX từng chức năng; gọi API trực tiếp bằng vai trò không có quyền và chéo đơn vị; đo chất lượng trên bộ mẫu (điểm đúng, báo nhầm, tỷ lệ loại do trích dẫn sai); đối chiếu từng BR.

## 6. Điểm SRS còn mở

| Điểm | Lát | Đề xuất tạm `[GIẢ ĐỊNH]` |
|---|---|---|
| N điều khoản ứng viên và ngưỡng liên quan (FC-014 BR-01) | K09 | N=5, ngưỡng đo trên bộ mẫu |
| Nhận dạng ký tự cho PDF ảnh quét | K05 | MVP chưa làm, báo EX-04, cho nhập tay |
| Mã lỗi khi dự thảo không chia được (FC-028 BR-06) | K09 | thêm mã mới, xin duyệt |
| Quản trị hệ thống chọn đơn vị khi gửi (FC-012 BR-07) | K07 | chọn trên màn Gửi dự thảo |
| Chính sách tắt rà soát với nhà cung cấp nước ngoài | K04 | giữ mặc định Bật |
