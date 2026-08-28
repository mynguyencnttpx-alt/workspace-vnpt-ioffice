# BƯỚC 2 — Đánh giá đủ thông tin & sinh câu hỏi làm rõ

Gộp logic từ 3 kỹ thuật: requirements-interrogator, assumption-extractor,
probe-question-generator.

## 2.1. Checklist đánh giá "đủ thông tin chưa"

Với mỗi yêu cầu đã phân loại ở Bước 1, kiểm tra lần lượt các khía cạnh sau.
Yêu cầu chỉ được đánh giá `Đủ` khi trả lời được (hoặc rõ ràng không áp dụng)
tất cả các mục liên quan đến loại của nó:

**Với yêu cầu Functional:**
- Ai là người thực hiện (actor/vai trò)?
- Thực hiện trên đối tượng dữ liệu/loại văn bản nào?
- Điều kiện/trạng thái nào thì được phép thực hiện?
- Kết quả mong đợi sau khi thực hiện là gì?
- Có ngoại lệ/trường hợp đặc biệt nào khách đã đề cập nhưng chưa nói rõ?

**Với yêu cầu Non-functional:**
- Tiêu chí đo lường cụ thể là gì (con số, ngưỡng, thời gian...)? Nếu khách
  chỉ nói "nhanh hơn", "ổn định hơn" mà không có con số → luôn `Thiếu`.
- Áp dụng trong điều kiện/quy mô nào (số user đồng thời, khối lượng dữ liệu...)?

**Với Business rule:**
- Điều kiện áp dụng rule là gì, có ngoại lệ không?
- Rule này thay thế hay bổ sung cho rule hiện tại của hệ thống?
- Ai có quyền override/xử lý ngoại lệ?

**Với yêu cầu "Không rõ/Ý tưởng":**
- Gần như chắc chắn `Thiếu` — cần hỏi lại khách muốn hệ thống thay đổi cụ
  thể điều gì, không cố suy diễn thành yêu cầu chức năng.

## 2.2. Nguyên tắc phát hiện giả định ẩn

Ngay cả khi yêu cầu "nghe có vẻ đủ", vẫn kiểm tra xem có đang ngầm giả định
điều gì không, ví dụ:
- Giả định về dữ liệu/hệ thống hiện tại (ví dụ: giả định trường dữ liệu đó
  đã tồn tại, giả định quy trình hiện tại chỉ có 1 luồng).
- Giả định về phạm vi người dùng (chỉ áp dụng nội bộ hay cả đối tác ngoài).
- Giả định về thời gian/ưu tiên triển khai.

Nếu phát hiện giả định có rủi ro cao (nếu sai sẽ làm thay đổi đáng kể cách
phân tích khả thi), hạ trạng thái yêu cầu đó xuống `Tạm đủ (có giả định)` và
ghi rõ giả định vào cột tương ứng, đồng thời vẫn nên đưa câu hỏi xác nhận
giả định vào phần câu hỏi gửi khách (ưu tiên thấp hơn câu hỏi bắt buộc).

## 2.3. Nguyên tắc viết câu hỏi làm rõ

- Câu hỏi phải **cụ thể, đóng được bằng câu trả lời ngắn** — không hỏi mở
  kiểu "anh/chị mô tả rõ hơn được không?".
  - Sai: "Yêu cầu này cần làm rõ thêm."
  - Đúng: "Chức năng duyệt văn bản mới áp dụng cho vai trò nào — chỉ Lãnh
    đạo phòng hay cả Lãnh đạo đơn vị? Có áp dụng khi văn bản đã ở trạng thái
    'Đang xử lý' không?"
- Ưu tiên hỏi theo hướng lấy ví dụ thực tế/số liệu cụ thể thay vì khái niệm
  chung (ví dụ hỏi "bao nhiêu văn bản/ngày" thay vì "khối lượng lớn là bao
  nhiêu").
- Mỗi câu hỏi gắn với đúng ID yêu cầu (`YC-01`, `YC-02`...) để khách dễ trả
  lời theo từng mục, không gộp nhiều yêu cầu vào 1 câu hỏi chung chung.
- Nếu một yêu cầu có nhiều điểm thiếu, ưu tiên hỏi tối đa 2-3 câu quan trọng
  nhất trước (câu hỏi nào ảnh hưởng lớn nhất đến việc xác định phạm vi/khả
  thi), không liệt kê tràn lan làm khách ngại trả lời.
