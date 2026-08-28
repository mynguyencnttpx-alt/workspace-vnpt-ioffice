---
name: customer-requirement-clarifier
description: >
  Phân tích danh sách yêu cầu nâng cấp/thay đổi thô của khách hàng: chuẩn hóa
  từng yêu cầu, xác định bản chất (functional / non-functional / business
  rule), đánh giá xem thông tin đã đủ để phân tích khả thi chưa — nếu thiếu
  thì đề xuất câu hỏi cụ thể cần hỏi lại khách hàng (elicitation) — sau đó
  đối chiếu với chức năng/luồng nghiệp vụ hiện có của hệ thống để đưa ra nhận
  định sơ bộ về tính khả thi nâng cấp. Kích hoạt khi user đưa danh sách yêu
  cầu nâng cấp/thay đổi của khách hàng và cần: "phân tích yêu cầu", "làm rõ
  yêu cầu", "yêu cầu đã đủ thông tin chưa", "cần hỏi khách gì thêm", "map với
  chức năng hiện có", "đánh giá khả thi nâng cấp", "yêu cầu nâng cấp là gì".
  Đây là bước phân tích/làm rõ TRƯỚC KHI viết URD/SRS chính thức — không thay
  thế `urd-writer-vnpt`, `srs-write-review` hay `ba-uc`, mà là input đầu vào
  cho các skill đó.
---

# MỤC ĐÍCH

Hỗ trợ BA nhận một danh sách yêu cầu nâng cấp thô (dạng mô tả tự do, chat,
email, biên bản họp...) từ khách hàng, và:

1. Chuẩn hóa + phân loại từng yêu cầu là gì (chức năng, phi chức năng,
   business rule, hay chỉ là mong muốn/ý tưởng chưa rõ).
2. Đánh giá từng yêu cầu đã đủ thông tin để phân tích khả thi chưa.
3. Nếu thiếu → sinh câu hỏi cụ thể, có định hướng, để hỏi lại khách hàng.
4. Nếu đủ (hoặc tạm đủ với giả định rõ ràng) → đối chiếu với chức năng/luồng
   hiện có của hệ thống (iOffice/iStorage/Ecabinet...) để đưa nhận định sơ bộ
   về khả thi (làm được trong phạm vi hiện có / cần mở rộng / xung đột với
   thiết kế hiện tại / chưa đủ căn cứ để kết luận).

KHÔNG viết URD/SRS đầy đủ, KHÔNG estimate effort, KHÔNG thiết kế màn hình —
đây là bước phân tích & làm rõ đầu vào.

---

# QUY TRÌNH BẮT BUỘC — THỰC HIỆN ĐÚNG THỨ TỰ

```
BƯỚC 0 → Nhận danh sách yêu cầu thô từ user (paste text / file)
BƯỚC 1 → Chuẩn hóa & phân loại từng yêu cầu (đọc references/step1-normalize-classify.md)
BƯỚC 2 → Đánh giá đủ thông tin chưa → sinh câu hỏi làm rõ nếu thiếu
          (đọc references/step2-completeness-elicitation.md)
BƯỚC 3 → Đối chiếu hệ thống hiện có → nhận định sơ bộ khả thi
          (đọc references/step3-feasibility-mapping.md)
BƯỚC 4 → Tổng hợp bảng kết quả theo đúng format output, confirm với user
```

**Ngay sau khi đọc SKILL.md này, đọc tuần tự 3 file tham chiếu dưới đây
trước khi bắt đầu phân tích** (không cần đọc trước nếu user chỉ hỏi khái
niệm, nhưng bắt buộc đọc trước khi thực sự chạy phân tích trên yêu cầu thật):

| File | Nội dung | Đọc khi |
|------|----------|---------|
| `references/step1-normalize-classify.md` | Cách tách từng yêu cầu, gắn ID, phân loại functional/non-functional/business rule, phát hiện câu mơ hồ | Luôn đọc trước khi phân tích |
| `references/step2-completeness-elicitation.md` | Checklist đánh giá "đủ thông tin chưa", cách sinh câu hỏi làm rõ có định hướng (không hỏi chung chung) | Luôn đọc |
| `references/step3-feasibility-mapping.md` | Cách đối chiếu yêu cầu với chức năng/luồng hệ thống hiện có, khung đánh giá khả thi sơ bộ | Đọc trước khi kết luận khả thi |

---

# ĐỊNH DẠNG KẾT QUẢ CHUẨN

Với mỗi yêu cầu, trình bày dưới dạng bảng:

| ID | Yêu cầu (đã chuẩn hóa) | Loại | Đủ thông tin? | Câu hỏi cần hỏi khách (nếu thiếu) | Chức năng hệ thống liên quan | Nhận định khả thi sơ bộ | Giả định đang dùng |
|----|------------------------|------|----------------|-------------------------------------|-------------------------------|---------------------------|----------------------|

- Cột "Đủ thông tin?": chỉ 3 giá trị — `Đủ` / `Thiếu` / `Tạm đủ (có giả định)`.
- Cột "Nhận định khả thi sơ bộ": chỉ 4 giá trị — `Khả thi trong phạm vi hiện có` /
  `Cần mở rộng/tùy biến` / `Xung đột với thiết kế hiện tại` /
  `Chưa đủ căn cứ kết luận`.
- Yêu cầu nào `Thiếu` thông tin thì bắt buộc có câu hỏi cụ thể ở cột tương
  ứng — không được để trống hoặc ghi chung chung kiểu "cần làm rõ thêm".
- Sau bảng, liệt kê riêng một mục **"Câu hỏi tổng hợp cần gửi khách hàng"**
  gộp toàn bộ câu hỏi theo từng yêu cầu, để BA copy gửi thẳng cho khách.

---

# QUY TẮC NGÔN NGỮ & VĂN PHONG

- Trả lời toàn bộ bằng **Tiếng Việt**, thuật ngữ kỹ thuật giữ nguyên tiếng
  Anh (functional, non-functional, business rule, feasibility...).
- Không tự suy diễn nghiệp vụ khi không có căn cứ — nếu phải giả định, luôn
  đánh dấu `[GIẢ ĐỊNH]` và liệt kê ở cột "Giả định đang dùng".
- Câu hỏi làm rõ phải cụ thể, đi thẳng vào thông tin còn thiếu (xem chi tiết
  nguyên tắc ở `references/step2-completeness-elicitation.md`), không hỏi
  kiểu mở "anh/chị có thể mô tả rõ hơn không?".

---

# NHỮNG ĐIỀU KHÔNG ĐƯỢC LÀM

- KHÔNG kết luận khả thi cho yêu cầu đang ở trạng thái `Thiếu` thông tin —
  chỉ được kết luận `Chưa đủ căn cứ kết luận`.
- KHÔNG gộp nhiều yêu cầu khác nhau thành 1 dòng chỉ để cho gọn.
- KHÔNG tự bịa ra tên chức năng/module hệ thống nếu không chắc — nếu không
  biết hệ thống hiện có chức năng đó hay không, hỏi lại user hoặc ghi rõ
  `[CẦN XÁC MINH]`.
- KHÔNG chuyển sang viết URD/SRS ngay trong skill này — nếu user muốn viết
  tiếp, đề xuất chuyển sang `urd-writer-vnpt`/`urd-writer-customer` hoặc
  `srs-write-review`, dùng chính bảng kết quả này làm input.
