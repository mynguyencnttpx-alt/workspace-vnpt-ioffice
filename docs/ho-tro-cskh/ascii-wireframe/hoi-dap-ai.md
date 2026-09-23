# Flow: Hỏi đáp AI

> Màn hình thuộc flow này: ai-khung-chat → ai-tra-loi → ai-de-xuat-tao-ticket → ai-lich-su. Flow tổng xem `../srs/ho-tro-cskh-userflow.md` Mục 1.
>
> Các mục ghi "(OQ-n)" đã được **khách hàng xác nhận (21/09/2026)** ở bảng cuối file (cập nhật 19/09/2026), cũng đã ghi vào tài liệu "Đề xuất Hệ thống Hỗ trợ & Chăm sóc Khách hàng.docx".
>
> **Rà soát đồng bộ Figma 23/09/2026:** đối chiếu Hỏi đáp AI (khách hàng) với Hỏi đáp AI nội bộ (`noibo-hoi-dap-ai.md`) — cấu trúc `ai-lich-su` trong wireframe này (mỗi dòng "iOffice / UBND Bình Định") vốn đã đúng; Figma bị lệch mock data ở 1 dòng (hiện "Sở Nội vụ" — site của khách hàng khác), đã sửa lại Figma khớp đúng wireframe, không cần sửa nội dung file này.

---

## Screen: ai-khung-chat — Khung chat hỏi đáp AI

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi            (o) A v       │
├──────────────────────────────────────────────────────────────────────┤
│ Hỏi đáp AI - iOffice / UBND Bình Định [1]          < Lịch sử > [5]   │
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
| 3 | Ô nhập câu hỏi | Textbox (multi-line) | Text | • Nhập câu hỏi ngôn ngữ tự nhiên; Enter gửi, Shift+Enter xuống dòng [GIẢ ĐỊNH].<br>• Rỗng → nút [4] disabled. Giới hạn độ dài câu hỏi: đã chốt (OQ-13).<br>• Khi AI đang trả lời: khóa ô nhập, tránh gửi chồng. |
| 4 | Gửi | Button | Click | • **Disabled** khi [3] rỗng hoặc AI đang xử lý; click → gửi và chuyển sang khung hội thoại `ai-tra-loi`.<br>• Câu hỏi + câu trả lời được lưu vào nhật ký hội thoại AI để quản trị viên kiểm tra chất lượng (Đề xuất — Cấu hình tích hợp AI; xem `cauhinh-nhat-ky-ai`).<br>• Chế độ "Hỏi đáp AI cho khách hàng" bị tắt cho dịch vụ/site này (quản trị viên cấu hình tại `cauhinh-tham-so-ai`): ẩn mục "Hỏi đáp AI" trên menu [GIẢ ĐỊNH — cách hiển thị: OQ-15].<br>• Lỗi kết nối AI/quá giới hạn request: báo "Chưa trả lời được lúc này" + gợi ý tạo ticket [wording chưa có nguồn, chưa có mã E-…]. |
| 5 | Lịch sử | Link | Click | • Navigate → `ai-lich-su` (UC34): xem, mở lại và xóa hội thoại của chính mình. Vẫn hiện khi Hỏi đáp AI đang tắt hoặc lỗi để người dùng xem/xóa lịch sử. |

- Header dùng chung (không đánh số). Câu chào và gợi ý câu hỏi là dữ liệu mẫu.

#### Trạng thái phụ — AI chưa khả dụng

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi            (o) A v       │
├──────────────────────────────────────────────────────────────────────┤
│ Hỏi đáp AI - iOffice / UBND Bình Định               < Lịch sử >      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│       ┌──────────────────────────────────────────────────────┐       │
│       │ (!) AI chưa khả dụng lúc này. [1]                    │       │
│       │                                                      │       │
│       │ Bạn có thể tra cứu hướng dẫn hoặc gửi yêu cầu hỗ trợ.│       │
│       │                                                      │       │
│       │ [2] [ Tạo yêu cầu hỗ trợ ]                           │       │
│       │ [3] < Về trang tra cứu >                             │       │
│       └──────────────────────────────────────────────────────┘       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- Hiện khi vào bằng link hoặc bookmark lúc Hỏi đáp AI đã tắt theo dịch vụ/site, AI tắt giữa lúc đang chat, hoặc AI lỗi/quá thời gian. [1] báo; [2] → `ticket-tao-moi` (tự điền nội dung đã hỏi); [3] → `kb-trang-chu`. Người dùng vẫn mở được Lịch sử để xem/xóa. Wording chưa có nguồn, chưa có mã E-….


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
| 3 | Nguồn trích dẫn | Link list | Click | • Mỗi câu trả lời **kèm trích dẫn nguồn bài viết gốc** để khách hàng tự kiểm chứng; bấm tên bài → `kb-chi-tiet-bai-viet`.<br>• Chỉ trích bài khách hàng có quyền xem (cùng phạm vi dịch vụ + site).<br>• Số nguồn tối đa hiển thị: chưa có nguồn.<br>• Bài đã ẩn/hủy hoặc ngoài phạm vi (kể cả khi mở lại hội thoại cũ từ `ai-lich-su`) → `kb-bai-viet-khong-con`, không phân biệt hai trường hợp. |
| 4 | Ô nhập câu hỏi tiếp | Textbox (multi-line) | Text | • Như `ai-khung-chat`; hỏi tiếp trong cùng phiên hội thoại. AI có nhớ ngữ cảnh các câu trước hay mỗi câu độc lập: đã chốt (OQ-13). |
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

## Screen: ai-lich-su — Lịch sử hỏi đáp AI (khách hàng)

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi            (o) A v       │
├──────────────────────────────────────────────────────────────────────┤
│ Lịch sử hỏi đáp AI - iOffice / UBND Bình Định                        │
├──────────────────────────────────────────────────────────────────────┤
│ [1] [Tìm trong lịch sử...__________]  [2] [ + Hội thoại mới ]        │
├──────────────────────────────────────────────────────────────────────┤
│ Hôm nay                                                              │
│ [3] Ký số báo lỗi 403 thì xử lý sao?       4 lượt  10:20   [4] (x)   │
│     iOffice / UBND Bình Định                                         │
│ [3] Không tải được tệp đính kèm            2 lượt  09:15       (x)   │
│     iOffice / UBND Bình Định                                         │
│ Tuần này                                                             │
│ [3] Cách gán vai trò ký cho người dùng     6 lượt  T3 14:02    (x)   │
│     iOffice / UBND Bình Định                                         │
│                                                                      │
│ [5] Hội thoại được lưu 90 ngày rồi tự xóa; chỉ bạn xem được.         │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Ô tìm trong lịch sử | Textbox | Text | • Tìm theo từ khóa trong tiêu đề và nội dung hỏi/đáp của **chính mình**; rỗng → hiện toàn bộ. Không bao giờ tìm trong hội thoại của người khác. |
| 2 | Hội thoại mới | Button | Click | • Mở khung chat trống (`ai-khung-chat`); dịch vụ/site theo lựa chọn hiện tại. |
| 3 | Danh sách hội thoại | List | Click | • Mỗi dòng: tiêu đề (câu hỏi đầu tiên, cắt gọn), dịch vụ · site, số lượt, thời gian gần nhất; mới nhất trước, nhóm Hôm nay / Tuần này / Cũ hơn [GIẢ ĐỊNH]; tải thêm 20 hội thoại/lần.<br>• Bấm 1 dòng → mở lại đúng hội thoại ở `ai-khung-chat`/`ai-tra-loi` để hỏi tiếp trong cùng hội thoại.<br>• Site/dịch vụ đã đổi hoặc mất quyền: chỉ xem, không hỏi tiếp; bài trích dẫn đã ẩn ghi "bài không còn"; AI đang tắt: chỉ xem và xóa (OQ-36). |
| 4 | Xóa hội thoại | Icon button | Click | • Xóa từng hội thoại, luôn có hộp xác nhận (trạng thái phụ); không khôi phục. Chỉ xóa hội thoại của chính mình.<br>• Thông báo khi xóa: bản ghi phục vụ kiểm tra chất lượng của hệ thống vẫn giữ theo chính sách quản trị (nhật ký AI) (OQ-36). |
| 5 | Ghi chú thời hạn lưu | Label | ReadOnly | • "Hội thoại được lưu 90 ngày rồi tự xóa; chỉ bạn xem được" (OQ-36). Quản trị viên không xem lịch sử cá nhân của người khác. |

- Đề xuất bổ sung ngày 21/09/2026 (UC34, OQ-36), đã được khách hàng xác nhận. Vào từ nút Lịch sử ở `ai-khung-chat`.

#### Trạng thái phụ — chưa có hội thoại

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi            (o) A v       │
├──────────────────────────────────────────────────────────────────────┤
│ Lịch sử hỏi đáp AI - iOffice / UBND Bình Định                        │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│       ┌──────────────────────────────────────────────────────┐       │
│       │ Chưa có hội thoại nào. [1]                           │       │
│       │                                                      │       │
│       │ Hãy đặt câu hỏi đầu tiên cho AI.                     │       │
│       │                                                      │       │
│       │ [2] [ Bắt đầu hỏi AI ]                               │       │
│       │                                                      │       │
│       │ Hội thoại được lưu 90 ngày rồi tự xóa.               │       │
│       └──────────────────────────────────────────────────────┘       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- Chưa có hội thoại nào, hoặc vừa xóa hội thoại cuối: [1] báo; [2] → `ai-khung-chat`. Không hiện danh sách.

#### Trạng thái phụ — xác nhận xóa hội thoại

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH  Tra cứu | Hỏi đáp AI | Ticket của tôi            (o) A v       │
├──────────────────────────────────────────────────────────────────────┤
│ Lịch sử hỏi đáp AI - iOffice / UBND Bình Định                        │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│       ┌──────────────────────────────────────────────────────┐       │
│       │ Xóa hội thoại này? [1]                               │       │
│       │                                                      │       │
│       │ "Ký số báo lỗi 403 thì xử lý sao?"                   │       │
│       │                                                      │       │
│       │ Xóa khỏi lịch sử của bạn, không khôi phục được.      │       │
│       │                                                      │       │
│       │ [2] [ Xóa ]      [3] [ Hủy ]                         │       │
│       └──────────────────────────────────────────────────────┘       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- Hộp xác nhận: [2] Xóa → xóa hội thoại và quay lại danh sách (về trạng thái rỗng nếu là hội thoại cuối); [3] Hủy → đóng hộp, giữ nguyên.


---

## Đề xuất đã cập nhật (đã chốt với khách hàng 21/09/2026)

| Mã | Nội dung cần chốt | Đề xuất | Trạng thái |
|----|-------------------|---------|------------|
| OQ-13 | Giới hạn hỏi đáp AI, ngữ cảnh, lịch sử | Câu hỏi ≤1.000 ký tự; AI nhớ ngữ cảnh 5 lượt gần nhất trong phiên; tối đa 30 câu/giờ/người; khách xem lại, mở lại và xóa hội thoại của mình trong `ai-lich-su`, lưu 90 ngày (OQ-36). | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-14 | Đánh giá câu trả lời AI | Có nút "Hữu ích / Không hữu ích" dưới mỗi câu trả lời AI; đưa vào nhật ký AI và báo cáo chất lượng. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-15 | Khi tắt chế độ Hỏi đáp AI | Ẩn mục "Hỏi đáp AI" khỏi menu của dịch vụ/site đó. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-36 | Lịch sử hỏi đáp AI (cập nhật OQ-13) | Lưu tự động, chỉ chủ tài khoản xem, giữ 90 ngày rồi tự xóa, xóa được từng hội thoại; Quản trị viên không xem lịch sử cá nhân; nhật ký AI quản trị theo chính sách riêng, khi xóa có thông báo bản ghi phục vụ kiểm tra chất lượng vẫn được giữ. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
