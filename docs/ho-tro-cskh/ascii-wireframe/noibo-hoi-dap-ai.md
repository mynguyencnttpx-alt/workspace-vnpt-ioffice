# Flow: Hỏi đáp AI cho nhân viên

> Màn hình thuộc flow này: noibo-ai-khung-chat → noibo-ai-tra-loi → noibo-ai-lich-su. Flow tổng xem `../srs/ho-tro-cskh-userflow.md` Mục 1. Khung điều hướng nội bộ dùng chung: bản Figma là sidebar trái + thanh trên có chip Site/Vai trò; ASCII vẽ gọn thành 1 dòng đầu.
>
> Toàn bộ flow này là **đề xuất bổ sung ngày 21/09/2026 (UC61, UC62), chờ khách hàng xác nhận**. Các mục ghi "(OQ-n)" có đề xuất ở bảng cuối file.

---

## Screen: noibo-ai-khung-chat — Khung chat hỏi đáp AI (nội bộ)

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Hỏi đáp AI | Nội dung | Báo cáo         (o) B v     │
├──────────────────────────────────────────────────────────────────────┤
│ Hỏi đáp AI nội bộ                          < Quay lại ticket > [7]   │
├──────────────────────────────────────────────────────────────────────┤
│ Dịch vụ [1] [v: iOffice ] Site [2] [v: UBND B.Định] [3] < Lịch sử >  │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ AI: Hỏi về nghiệp vụ để hỗ trợ khách hàng. Tôi chỉ trả lời dựa trên  │
│     tài liệu của dịch vụ và site đang chọn, kèm nguồn.               │
│                                                                      │
│ Gợi ý câu hỏi [4]:                                                   │
│   < Ký số văn bản đi như thế nào? >                                  │
│   < Cách gán quyền ký cho người dùng mới? >                          │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│ [5] [Nhập câu hỏi nghiệp vụ...__________________] [6] [ Gửi ]        │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Dịch vụ | Dropdown | Select | • Danh sách dịch vụ mà tài khoản có quyền xem; mặc định dịch vụ dùng gần nhất. Mở từ ticket (`agent-chi-tiet-ticket`) → dịch vụ của ticket chọn sẵn (vẫn đổi được). Đổi dịch vụ hoặc site → bắt đầu hội thoại mới, không trộn ngữ cảnh. |
| 2 | Site | Dropdown (có tìm) | Select | • Site theo quyền xem (OQ-34): vai trò có quyền "xem nghiệp vụ toàn bộ khách hàng" (Quản trị viên, Chủ quản dịch vụ, Agent trung tâm) thấy mọi site; vai trò khác chỉ site thuộc team mình [GIẢ ĐỊNH].<br>• AI lọc cứng theo dịch vụ + site đang chọn (nội dung dùng chung của dịch vụ + riêng của site), không trộn nhiều site trong một câu trả lời; bài đánh dấu "không dùng cho AI" không bao giờ được dùng. |
| 3 | Lịch sử | Link | Click | • Navigate → `noibo-ai-lich-su`. Vẫn hiện khi AI tắt hoặc lỗi. |
| 4 | Gợi ý câu hỏi | Link list | Click | • Câu hỏi mẫu, bấm → điền vào [5] và gửi luôn [GIẢ ĐỊNH — như `ai-khung-chat`]. |
| 5 | Ô nhập câu hỏi | Textbox (multi-line) | Text | • Như `ai-khung-chat`: Enter gửi, Shift+Enter xuống dòng; rỗng → [6] disabled; câu hỏi ≤1.000 ký tự, tối đa 30 câu/giờ/người (OQ-13); khóa ô nhập khi AI đang trả lời. |
| 6 | Gửi | Button | Click | • **Disabled** khi [5] rỗng hoặc AI đang xử lý (chống gửi trùng); gửi → `noibo-ai-tra-loi`.<br>• Câu hỏi + trả lời lưu vào lịch sử cá nhân (OQ-36) và nhật ký hội thoại AI của quản trị (`cauhinh-nhat-ky-ai`) gắn nhãn "Nội bộ" (UC49).<br>• Hỏi đáp AI tắt theo dịch vụ/site → ẩn menu; vào bằng link → trạng thái phụ. AI lỗi/quá thời gian → trạng thái phụ. |
| 7 | Quay lại ticket | Link | Click | • Chỉ hiện khi mở từ `agent-chi-tiet-ticket`; navigate về ticket đó, không mất nội dung phản hồi đang soạn. |

- Dùng cho nhân viên tra cứu nghiệp vụ để hỗ trợ khách hàng. Menu "Hỏi đáp AI" thuộc khung nội bộ dùng chung: hiện với Agent, Quản trị viên, Chủ quản dịch vụ; Biên tập nội dung không dùng → `loi-403` khi vào bằng link (OQ-34). Nhân viên KHÔNG có màn Tra cứu bài viết (OQ-35).

#### Trạng thái phụ — AI chưa khả dụng hoặc lỗi

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Hỏi đáp AI | Nội dung | Báo cáo         (o) B v     │
├──────────────────────────────────────────────────────────────────────┤
│ Hỏi đáp AI nội bộ                                    < Lịch sử >     │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│       ┌──────────────────────────────────────────────────────┐       │
│       │ (!) AI chưa khả dụng hoặc chưa trả lời được. [1]     │       │
│       │                                                      │       │
│       │ Bạn có thể soạn phản hồi thủ công hoặc thử lại sau.  │       │
│       │                                                      │       │
│       │ [2] [ Thử lại ]     [3] < Về bảng tiếp nhận >        │       │
│       └──────────────────────────────────────────────────────┘       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- Hiện khi vào bằng link lúc AI đã tắt, AI tắt giữa chừng, hoặc AI lỗi/quá thời gian: [1] báo; [2] gửi lại (khi lỗi tạm thời); [3] → `agent-hang-doi` (hoặc ticket đang mở). Không đề xuất tạo ticket. Lịch sử vẫn xem/xóa được.


---

## Screen: noibo-ai-tra-loi — AI trả lời kèm trích dẫn (nội bộ)

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Hỏi đáp AI | Nội dung | Báo cáo         (o) B v     │
├──────────────────────────────────────────────────────────────────────┤
│ Hỏi đáp AI nội bộ - iOffice / UBND B.Định                            │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│                Bạn: Ký số báo lỗi 403 thì xử lý sao? [1]             │
│                                                                      │
│ AI: Lỗi 403 khi ký số thường do tài khoản chưa được cấp quyền [2]    │
│     ký. Kiểm tra vai trò ký của người dùng, rồi thử lại từ bước      │
│     chọn chứng thư số.                                               │
│                                                                      │
│ Nguồn [3]: < Lỗi 403 khi ký số >  < Hướng dẫn ký số văn bản đi >     │
│                                                                      │
│ [4] [ Sao chép ]   [5] [ Chèn vào phản hồi ]                         │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│ [6] [Nhập câu hỏi tiếp...______________________] [7] [ Gửi ]         │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Câu hỏi của nhân viên | Chat bubble | ReadOnly | • Nguyên văn câu đã gửi, căn phải; không sửa/xóa sau khi gửi [GIẢ ĐỊNH]. |
| 2 | Câu trả lời của AI | Chat bubble | ReadOnly | • Tổng hợp từ tài liệu trong phạm vi dịch vụ + site đang chọn (RAG, lọc cứng); chỉ hiện khi độ liên quan đạt ngưỡng tin cậy (`cauhinh-tham-so-ai`), dưới ngưỡng → trạng thái phụ "không đủ tự tin".<br>• Trạng thái: đang soạn / đã trả lời. AI nhớ 5 lượt gần nhất trong hội thoại (OQ-13). |
| 3 | Nguồn trích dẫn | Link list | Click | • Kèm trích dẫn nguồn bài viết gốc; bấm tên bài → **xem trước bài viết tại chỗ** (trạng thái phụ, chỉ đọc), không có màn Tra cứu cho nhân viên (OQ-35, OQ-39).<br>• Bài đã ẩn/hủy: báo "Bài không còn hiển thị". Chỉ trích bài trong phạm vi quyền xem của người hỏi. |
| 4 | Sao chép | Button | Click | • Sao chép nội dung câu trả lời (kèm tên nguồn) để dùng ở nơi khác [GIẢ ĐỊNH]. |
| 5 | Chèn vào phản hồi | Button | Click | • **Chỉ hiện khi hội thoại mở từ `agent-chi-tiet-ticket`**: đưa câu trả lời vào ô soạn phản hồi của ticket đó, agent xem/sửa rồi mới gửi — không tự gửi cho khách hàng. Hội thoại mở lại từ lịch sử nhưng không thuộc ticket hiện tại → ẩn nút. |
| 6 | Ô nhập câu hỏi tiếp | Textbox (multi-line) | Text | • Như `noibo-ai-khung-chat`; hỏi tiếp trong cùng hội thoại. |
| 7 | Gửi | Button | Click | • Disabled khi [6] rỗng hoặc AI đang xử lý; gửi → thêm cặp hỏi-đáp mới, cuộn xuống cuối. |

- Nội dung hỏi-đáp là dữ liệu mẫu chỉ minh họa.

#### Trạng thái phụ — không đủ tự tin

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Hỏi đáp AI | Nội dung | Báo cáo         (o) B v     │
├──────────────────────────────────────────────────────────────────────┤
│ Hỏi đáp AI nội bộ - iOffice / UBND B.Định                            │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│        Bạn: Cách đối soát tệp ký số trên máy chủ ABC là gì?          │
│                                                                      │
│ AI: Tôi chưa tìm thấy thông tin đủ chắc chắn trong tài liệu của      │
│     dịch vụ và site đang chọn. [1]                                   │
│                                                                      │
│ Gợi ý: đổi cách hỏi, thêm từ khóa, hoặc chọn site/dịch vụ khác       │
│ (nếu bạn có quyền). [2]                                              │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│ [Nhập câu hỏi tiếp...______________________] [ Gửi ]                 │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- Độ liên quan dưới ngưỡng hoặc không có trong kho của phạm vi đang chọn: [1] báo rõ; [2] gợi ý đổi cách hỏi/từ khóa hoặc chọn site/dịch vụ khác (nếu có quyền). KHÔNG có nút Tạo ticket như phía khách hàng; không tiết lộ có/không có nội dung ở site ngoài quyền.

#### Trạng thái phụ — xem trước trích dẫn

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Hỏi đáp AI | Nội dung | Báo cáo         (o) B v     │
├──────────────────────────────────────────────────────────────────────┤
│ Hỏi đáp AI nội bộ - iOffice / UBND B.Định                            │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│    ┌────────────────────────────────────────────────────────────┐    │
│    │ Xem trước bài viết (chỉ đọc)          [1] (x)              │    │
│    ├────────────────────────────────────────────────────────────┤    │
│    │ Lỗi 403 khi ký số                                          │    │
│    │ Nguồn: iOffice / Dùng chung                                │    │
│    │                                                            │    │
│    │ Nguyên nhân thường gặp: tài khoản chưa được cấp quyền ký;  │    │
│    │ chứng thư số hết hạn hoặc chưa gắn vào tài khoản...        │    │
│    │                                                            │    │
│    │ Nếu bài đã ẩn: "Bài không còn hiển thị". [2]               │    │
│    └────────────────────────────────────────────────────────────┘    │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- Cửa sổ chỉ đọc mở tại chỗ khi bấm nguồn ở [3]: [1] đóng → về câu trả lời; [2] bài đã ẩn/hủy thì hiện thông báo thay nội dung (OQ-39).


---

## Screen: noibo-ai-lich-su — Lịch sử hỏi đáp AI (nội bộ)

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Hỏi đáp AI | Nội dung | Báo cáo         (o) B v     │
├──────────────────────────────────────────────────────────────────────┤
│ Lịch sử hỏi đáp AI (nội bộ) - của tôi                                │
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
| 2 | Hội thoại mới | Button | Click | • Mở khung chat trống (`noibo-ai-khung-chat`); dịch vụ/site theo lựa chọn hiện tại. |
| 3 | Danh sách hội thoại | List | Click | • Mỗi dòng: tiêu đề (câu hỏi đầu tiên, cắt gọn), dịch vụ · site, số lượt, thời gian gần nhất; mới nhất trước, nhóm Hôm nay / Tuần này / Cũ hơn [GIẢ ĐỊNH]; tải thêm 20 hội thoại/lần.<br>• Bấm 1 dòng → mở lại đúng hội thoại ở `noibo-ai-khung-chat`/`noibo-ai-tra-loi` để hỏi tiếp trong cùng hội thoại.<br>• Site/dịch vụ đã đổi hoặc mất quyền: chỉ xem, không hỏi tiếp; bài trích dẫn đã ẩn ghi "bài không còn"; AI đang tắt: chỉ xem và xóa (OQ-36). |
| 4 | Xóa hội thoại | Icon button | Click | • Xóa từng hội thoại, luôn có hộp xác nhận (trạng thái phụ); không khôi phục. Chỉ xóa hội thoại của chính mình.<br>• Thông báo khi xóa: bản ghi phục vụ kiểm tra chất lượng của hệ thống vẫn giữ theo chính sách quản trị (nhật ký AI) (OQ-36). |
| 5 | Ghi chú thời hạn lưu | Label | ReadOnly | • "Hội thoại được lưu 90 ngày rồi tự xóa; chỉ bạn xem được" (OQ-36). Quản trị viên không xem lịch sử cá nhân của người khác. |

- Chỉ thấy hội thoại của chính mình; Quản trị viên không xem lịch sử cá nhân của người khác (OQ-36). Vào từ nút Lịch sử ở `noibo-ai-khung-chat`.

#### Trạng thái phụ — chưa có hội thoại

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Hỏi đáp AI | Nội dung | Báo cáo         (o) B v     │
├──────────────────────────────────────────────────────────────────────┤
│ Lịch sử hỏi đáp AI (nội bộ) - của tôi                                │
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

- Chưa có hội thoại nào, hoặc vừa xóa hội thoại cuối: [1] báo; [2] → `noibo-ai-khung-chat`. Không hiện danh sách.

#### Trạng thái phụ — xác nhận xóa hội thoại

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Hỏi đáp AI | Nội dung | Báo cáo         (o) B v     │
├──────────────────────────────────────────────────────────────────────┤
│ Lịch sử hỏi đáp AI (nội bộ) - của tôi                                │
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

## Đề xuất đã cập nhật (chờ khách hàng xác nhận)

| Mã | Nội dung cần chốt | Đề xuất | Trạng thái |
|----|-------------------|---------|------------|
| OQ-34 | Phạm vi nghiệp vụ nhân viên xem được trong Hỏi đáp AI | Một số vai trò được phân quyền xem nghiệp vụ của toàn bộ khách hàng/site (quyền gắn cố định theo vai trò, xem `qt-ma-tran-phan-quyen`); vai trò còn lại chỉ thấy site của team mình; nội dung dành riêng cho nội bộ chưa thuộc phạm vi. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-35 | Màn Tra cứu bài viết cho nhân viên | Không làm; nhân viên chỉ dùng Hỏi đáp AI. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-36 | Lịch sử hỏi đáp AI | Lưu tự động, chỉ chủ tài khoản xem, giữ 90 ngày rồi tự xóa, xóa được từng hội thoại; Quản trị viên không xem lịch sử cá nhân; nhật ký AI quản trị theo chính sách riêng. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-39 | Trích dẫn nguồn ở `noibo-ai-tra-loi` | Xem trước bài viết chỉ đọc tại chỗ; bài đã ẩn ghi "bài không còn". | Đã chốt (khách hàng xác nhận, 21/09/2026) |
