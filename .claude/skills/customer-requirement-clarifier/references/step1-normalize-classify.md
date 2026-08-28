# BƯỚC 1 — Chuẩn hóa & phân loại yêu cầu

Gộp logic từ 4 kỹ thuật: proto-requirements-normalizer, ambiguity-hunter,
functional-vs-nonfunctional-splitter, business-rule-extractor.

## 1.1. Tách & gắn ID

- Đọc toàn bộ danh sách yêu cầu thô (text, chat, email, biên bản họp...).
- Tách thành các yêu cầu độc lập — một câu mô tả nhiều ý khác nhau thì tách
  thành nhiều dòng riêng, không gộp.
- Gắn ID tạm cho từng yêu cầu: `YC-01`, `YC-02`... theo đúng thứ tự xuất
  hiện trong tài liệu gốc, để dễ đối chiếu ngược lại khi cần.
- Viết lại yêu cầu bằng câu chuẩn hóa (giữ đúng ý gốc, không thêm chi tiết
  khách chưa nói), format: `[Chủ thể] muốn/cần [hành động] [đối tượng] [điều
  kiện/ngữ cảnh nếu có]`.

## 1.2. Phân loại bản chất

Với mỗi yêu cầu, xác định thuộc loại nào:

- **Functional** — mô tả hành vi hệ thống phải làm (thêm/sửa/xóa dữ liệu,
  thêm bước trong luồng, thêm loại văn bản, thêm quyền thao tác...).
- **Non-functional** — mô tả thuộc tính chất lượng: hiệu năng, bảo mật, khả
  năng chịu tải, giao diện/UX, khả năng mở rộng, thời gian phản hồi... Cảnh
  giác với các từ mơ hồ: "nhanh hơn", "dễ dùng hơn", "ổn định hơn",
  "an toàn hơn" — đây là non-functional nhưng CHƯA đo lường được, cần đẩy
  sang Bước 2 để hỏi tiêu chí cụ thể.
- **Business rule** — mô tả một quy tắc/điều kiện nghiệp vụ (điều kiện phê
  duyệt, ngoại lệ, phân quyền theo vai trò, ràng buộc dữ liệu...). Loại này
  thường ẩn bên trong câu mô tả chức năng, cần tách riêng ra vì nó ảnh hưởng
  business rule engine/luồng duyệt hiện có, không chỉ là thêm màn hình.
- **Không rõ / Ý tưởng chưa thành yêu cầu** — khách chỉ nêu mong muốn hoặc
  vấn đề (pain point) mà chưa nói rõ muốn hệ thống làm gì. Loại này gần như
  chắc chắn sẽ rơi vào trạng thái `Thiếu` thông tin ở Bước 2.

Một yêu cầu có thể vừa có phần functional vừa có phần business rule —
tách rõ hai phần đó ra, không viết chung một dòng mơ hồ.

## 1.3. Phát hiện câu chữ mơ hồ

Trước khi chuyển sang Bước 2, rà lại từng yêu cầu đã chuẩn hóa, đánh dấu nếu
có:

- Từ định lượng mơ hồ: "nhanh", "nhiều", "một số", "gần như", "thường
  xuyên"... — không thể kiểm chứng được khi nghiệm thu.
- Đại từ/tham chiếu không rõ đối tượng: "cái đó", "phần này", "như cũ"...
- Nhiều cách hiểu khác nhau đều hợp lý (ví dụ "cho phép sửa văn bản" — sửa ở
  trạng thái nào, ai được sửa, sửa gì).

Những điểm mơ hồ này là input trực tiếp cho Bước 2 (câu hỏi làm rõ) — không
tự diễn giải theo hướng có lợi cho việc phân tích, cũng không bỏ qua.
