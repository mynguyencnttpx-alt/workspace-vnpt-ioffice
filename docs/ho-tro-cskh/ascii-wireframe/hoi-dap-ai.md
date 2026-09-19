# Flow: Hỏi đáp AI

> Màn hình thuộc flow này: ai-khung-chat → ai-tra-loi → ai-de-xuat-tao-ticket. Flow tổng xem `../srs/ho-tro-cskh-userflow.md` Mục 1.
>
> Các mục ghi "(OQ-n)" đã có **đề xuất chờ khách hàng xác nhận** ở bảng cuối file (cập nhật 19/09/2026), cũng đã ghi vào tài liệu "Đề xuất Hệ thống Hỗ trợ & Chăm sóc Khách hàng.docx".

---

## Screen: ai-khung-chat — Khung chat hỏi đáp AI

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi            (o) A v       │
├──────────────────────────────────────────────────────────────────────┤
│ Hỏi đáp AI - iOffice / UBND Bình Định [1]                            │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ AI: Xin chào! Hãy hỏi về cách dùng iOffice. Tôi chỉ trả lời dựa      │
│     trên tài liệu của đơn vị bạn, kèm nguồn để bạn kiểm chứng.       │
│                                                                      │
│ Gợi ý câu hỏi [2]:                                                   │
│   < Ký số văn bản đi như thế nào? >                                  │
│   < Không tải được tệp đính kèm thì làm sao? >                       │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│ [3] [Nhập câu hỏi bằng ngôn ngữ tự nhiên...______] [4] [ Gửi ]       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Phạm vi trả lời | Label | ReadOnly | • Hiện dịch vụ + site của khách hàng đang đăng nhập — AI **chỉ dùng tài liệu trong phạm vi này** (dùng chung của dịch vụ + riêng của site), lọc cứng trước khi tìm câu trả lời; tuyệt đối không trả lời chéo dữ liệu khách hàng khác (Đề xuất — Tính năng khách hàng mục 3, Kiến trúc RAG).<br>• Tài liệu đánh dấu "không dùng cho AI" không bao giờ được dùng ở đây. |
| 2 | Gợi ý câu hỏi | Link list | Click | • Câu hỏi mẫu, bấm → điền vào [3] và gửi luôn [GIẢ ĐỊNH — nguồn không nói có gợi ý mẫu; có thể bỏ].<br>• Nguồn gợi ý (do biên tập chọn hay từ câu hỏi hay gặp): chưa có nguồn. |
| 3 | Ô nhập câu hỏi | Textbox (multi-line) | Text | • Nhập câu hỏi ngôn ngữ tự nhiên; Enter gửi, Shift+Enter xuống dòng [GIẢ ĐỊNH].<br>• Rỗng → nút [4] disabled. Giới hạn độ dài câu hỏi: đã đề xuất, chờ xác nhận (OQ-13).<br>• Khi AI đang trả lời: khóa ô nhập, tránh gửi chồng. |
| 4 | Gửi | Button | Click | • **Disabled** khi [3] rỗng hoặc AI đang xử lý; click → gửi và chuyển sang khung hội thoại `ai-tra-loi`.<br>• Câu hỏi + câu trả lời được lưu vào nhật ký hội thoại AI để quản trị viên kiểm tra chất lượng (Đề xuất — Cấu hình tích hợp AI; xem `cauhinh-nhat-ky-ai`).<br>• Chế độ "Hỏi đáp AI cho khách hàng" bị tắt cho dịch vụ/site này (quản trị viên cấu hình tại `cauhinh-tham-so-ai`): ẩn mục "Hỏi đáp AI" trên menu [GIẢ ĐỊNH — cách hiển thị: OQ-15].<br>• Lỗi kết nối AI/quá giới hạn request: báo "Chưa trả lời được lúc này" + gợi ý tạo ticket [wording chưa có nguồn, chưa có mã E-…]. |

- Header dùng chung (không đánh số). Câu chào và gợi ý câu hỏi là dữ liệu mẫu.


---

## Screen: ai-tra-loi — AI trả lời kèm trích dẫn

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi            (o) A v       │
├──────────────────────────────────────────────────────────────────────┤
│ Hỏi đáp AI - iOffice / UBND Bình Định                                │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│                 Bạn: Ký số báo lỗi 403 thì xử lý sao? [1]            │
│                                                                      │
│ AI: Lỗi 403 khi ký số thường do tài khoản chưa được cấp quyền ký. [2]│
│     Bạn kiểm tra vai trò ký với quản trị viên đơn vị, sau đó thử lại │
│     từ bước chọn chứng thư số.                                       │
│                                                                      │
│ Nguồn [3]:                                                           │
│   < Lỗi 403 khi ký số >     < Hướng dẫn ký số văn bản đi >           │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│ [4] [Nhập câu hỏi tiếp...________________________] [5] [ Gửi ]       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Câu hỏi của khách hàng | Chat bubble | ReadOnly | • Hiển thị nguyên văn câu đã gửi, căn phải; không sửa/xóa được sau khi gửi [GIẢ ĐỊNH]. |
| 2 | Câu trả lời của AI | Chat bubble | ReadOnly | • AI tổng hợp từ các đoạn tài liệu tìm được trong phạm vi dịch vụ + site (RAG: chunk → lọc metadata → semantic search top-k → tổng hợp).<br>• Chỉ hiện khi **độ liên quan đạt ngưỡng tin cậy** do quản trị viên cấu hình; dưới ngưỡng → chuyển sang `ai-de-xuat-tao-ticket` thay vì trả lời liều.<br>• Trạng thái: đang soạn (hiệu ứng chờ) / đã trả lời. Thời gian chờ tối đa: chưa có nguồn.<br>• Câu trả lời do AI tạo, không có nhãn "phản hồi tự động" (nhãn đó chỉ dùng cho ticket ở luồng agent). |
| 3 | Nguồn trích dẫn | Link list | Click | • Mỗi câu trả lời **kèm trích dẫn nguồn bài viết gốc** để khách hàng tự kiểm chứng; bấm tên bài → `kb-chi-tiet-bai-viet`.<br>• Chỉ trích bài khách hàng có quyền xem (cùng phạm vi dịch vụ + site).<br>• Số nguồn tối đa hiển thị: chưa có nguồn. |
| 4 | Ô nhập câu hỏi tiếp | Textbox (multi-line) | Text | • Như `ai-khung-chat`; hỏi tiếp trong cùng phiên hội thoại. AI có nhớ ngữ cảnh các câu trước hay mỗi câu độc lập: đã đề xuất, chờ xác nhận (OQ-13). |
| 5 | Gửi | Button | Click | • Disabled khi [4] rỗng hoặc AI đang xử lý; gửi → thêm cặp hỏi-đáp mới vào khung, cuộn xuống cuối. |

- Nội dung hỏi-đáp là dữ liệu mẫu chỉ minh họa; không phải câu trả lời thật.


---

## Screen: ai-de-xuat-tao-ticket — Đề xuất tạo ticket

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi            (o) A v       │
├──────────────────────────────────────────────────────────────────────┤
│ Hỏi đáp AI - iOffice / UBND Bình Định                                │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│        Bạn: Cách đối soát tệp ký số trên máy chủ ABC là gì?          │
│                                                                      │
│ AI: Tôi chưa tìm thấy thông tin đủ chắc chắn trong tài liệu của bạn  │
│     để trả lời câu hỏi này. [1]                                      │
│                                                                      │
│ Bạn có muốn gửi yêu cầu hỗ trợ cho đội hỗ trợ không?                 │
│ Nội dung câu hỏi ở trên sẽ được đính kèm tự động. [2]                │
│                                                                      │
│ [3] [ Tạo yêu cầu hỗ trợ ]      [4] [ Hỏi câu khác ]                 │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│ [Nhập câu hỏi tiếp...________________________] [ Gửi ]               │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Thông báo AI không đủ tự tin | Chat bubble | ReadOnly | • Hiện khi độ liên quan giữa câu hỏi và nội dung tìm được **thấp hơn ngưỡng tin cậy** hoặc **không có trong kho tri thức** của phạm vi dịch vụ + site — AI không trả lời liều (Đề xuất — RAG, mục 5).<br>• Không tiết lộ là có/không có nội dung ở site khác.<br>• Ngưỡng do quản trị viên chỉnh (`cauhinh-tham-so-ai`); giá trị mặc định: chưa có nguồn. |
| 2 | Nội dung sẽ đính kèm | Label | ReadOnly | • Nhắc rõ câu hỏi vừa nhập sẽ được đính kèm vào ticket (khách hàng thấy trước, chưa gửi). |
| 3 | Tạo yêu cầu hỗ trợ | Button | Click | • Click → `ticket-tao-moi`, **tự điền mô tả bằng nội dung đã hỏi** (và trao đổi trong phiên) để khách hàng bổ sung dịch vụ/loại vấn đề/mức ưu tiên (UC3: "tạo ticket từ khung chat kèm nội dung đã hỏi").<br>• Không tự tạo ticket khi chưa có xác nhận của khách hàng. |
| 4 | Hỏi câu khác | Button | Click | • Không tạo ticket, quay về khung hội thoại `ai-khung-chat` để hỏi tiếp (đúng userflow: nhánh "không tạo, hỏi tiếp"). |

- 3 màn của flow này cùng 1 khung hội thoại nhưng ở 3 trạng thái loại trừ (mới vào / có câu trả lời / không đủ tự tin), đúng theo userflow — vẽ tách từng màn.


---

## Đề xuất đã cập nhật (chờ khách hàng xác nhận)

| Mã | Nội dung cần chốt | Đề xuất | Trạng thái |
|----|-------------------|---------|------------|
| OQ-13 | Giới hạn hỏi đáp AI, ngữ cảnh, lịch sử | Câu hỏi ≤1.000 ký tự; AI nhớ ngữ cảnh 5 lượt gần nhất trong phiên; tối đa 30 câu/giờ/người; khách xem lại hội thoại của mình 30 ngày. | Chờ khách hàng xác nhận |
| OQ-14 | Đánh giá câu trả lời AI | Có nút "Hữu ích / Không hữu ích" dưới mỗi câu trả lời AI; đưa vào nhật ký AI và báo cáo chất lượng. | Chờ khách hàng xác nhận |
| OQ-15 | Khi tắt chế độ Hỏi đáp AI | Ẩn mục "Hỏi đáp AI" khỏi menu của dịch vụ/site đó. | Chờ khách hàng xác nhận |
