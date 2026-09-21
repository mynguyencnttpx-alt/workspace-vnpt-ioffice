# Flow: Cấu hình AI + danh mục hệ thống

> Màn hình thuộc flow này: cauhinh-tich-hop-ai → cauhinh-tham-so-ai → cauhinh-thu-nghiem-ai → cauhinh-nhat-ky-ai → danhmuc-dich-vu-loai-van-de → cauhinh-kenh-thongbao → cauhinh-sla. Flow tổng xem `../srs/ho-tro-cskh-userflow.md` Mục 1.
>
> Các mục ghi "(OQ-n)" đã có **đề xuất chờ khách hàng xác nhận** ở bảng cuối file (cập nhật 19/09/2026), cũng đã ghi vào tài liệu "Đề xuất Hệ thống Hỗ trợ & Chăm sóc Khách hàng.docx".

---

## Screen: cauhinh-tich-hop-ai — Cấu hình provider/model AI

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│ Cấu hình tích hợp AI                      Kết nối: Chưa kiểm tra [1] │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ Nhà cung cấp [2]  [v: Anthropic Claude        ]                      │
│ Model [3]         [v: Chọn model              ]                      │
│ API key [4]       [************************] (eye)                   │
│ Endpoint [5]      [https://api.example.com/v1______]                 │
│ Giới hạn request [6]  [1000____] lượt / ngày                         │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│ [7] [ Kiểm tra kết nối ]   [8] [ Lưu ]   [9] [ Hủy ]                 │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Trạng thái kết nối | Label (badge) | ReadOnly | • Chưa kiểm tra / Đang kiểm tra / Kết nối OK / **Lỗi kết nối** (kèm lý do). Cập nhật sau mỗi lần bấm [7] hoặc [8]. |
| 2 | Nhà cung cấp | Dropdown | Select | • **Bắt buộc**. Chọn provider (ví dụ Anthropic Claude hoặc mô hình nội bộ VNPT — Đề xuất, Cấu hình tích hợp & vận hành AI). Danh sách provider hỗ trợ: đã đề xuất, chờ xác nhận (OQ-22). |
| 3 | Model | Dropdown | Select | • **Bắt buộc**, danh sách phụ thuộc [2]; đổi provider thì reset model. |
| 4 | API key | Textbox (password) | Text | • **Bắt buộc** lần đầu. Luôn che ký tự; sau khi lưu **không hiển thị lại** — chỉ cho nhập key mới để thay (ô hiện dấu * khi đã có key) [GIẢ ĐỊNH]. Chỉ Quản trị viên xem/sửa (UC13). |
| 5 | Endpoint | Textbox | Text | • **Bắt buộc** với provider tự cấu hình; sai định dạng URL → báo lỗi ngay tại ô [wording chưa có, chưa có mã E-…]. |
| 6 | Giới hạn request | Textbox (số) | Text | • Số lượt gọi AI tối đa (đề xuất: "giới hạn số lượng request"); vượt giới hạn thì AI trả lời thế nào (chuyển gợi ý tạo ticket): OQ-22. Đơn vị (ngày/tháng): chưa có nguồn. |
| 7 | Kiểm tra kết nối | Button | Click | • Gọi thử provider bằng cấu hình đang nhập (chưa lưu), báo Kết nối OK hoặc Lỗi ở [1]. Khóa khi đang kiểm tra. |
| 8 | Lưu | Button | Click | • **Disabled** khi thiếu [2]-[5]. Lưu cấu hình **và kiểm tra kết nối** (UC13). OK → sang `cauhinh-tham-so-ai` (theo userflow). Lỗi → giữ nguyên màn, báo lỗi ở [1] kèm lý do, cho sửa và thử lại — không áp dụng cấu hình lỗi cho khách hàng. |
| 9 | Hủy | Button | Click | • Bỏ thay đổi chưa lưu, về màn trước. |

- Header nội bộ dùng chung (không đánh số). Flow 9 là khu vực menu "Cấu hình": 3 màn AI nối theo trình tự cấu hình → tham số → thử nghiệm, còn danh mục dùng chung và kênh thông báo vào độc lập từ menu. Chỉ Quản trị viên (màn thử nghiệm thêm Biên tập viên).


---

## Screen: cauhinh-tham-so-ai — Tham số AI

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│ Tham số & chế độ AI                                                  │
├──────────────────────────────────────────────────────────────────────┤
│ Ngưỡng tin cậy [1] [0.70__]   Số đoạn ngữ cảnh top-k [2] [5___]      │
├──────────────────────────────────────────────────────────────────────┤
│ Bật/tắt từng chế độ AI theo phạm vi [3]                              │
│ Phạm vi                  Hỏi đáp KH   AI soạn    AI tự động          │
│ -------------------------------------------------------------------- │
│ Toàn hệ thống            [x]          [x]        [ ]                 │
│ Dịch vụ iOffice          [x]          [x]        [ ]                 │
│ Site UBND Bình Định      [x]          [x]        [ ]                 │
├──────────────────────────────────────────────────────────────────────┤
│ AI tự động áp cho: [x] Bình thường [x] Cao [ ] Khẩn cấp (khóa) [4]   │
│ [5] [ Lưu ]        [6] < Thử nghiệm AI >                             │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Ngưỡng tin cậy | Textbox (số) | Text | • Ngưỡng độ liên quan để AI **trả lời hay chuyển sang gợi ý tạo ticket** (Đề xuất — Cấu hình tham số trả lời): dưới ngưỡng → `ai-de-xuat-tao-ticket`. Khoảng giá trị hợp lệ và giá trị mặc định: đã đề xuất, chờ xác nhận (OQ-22). |
| 2 | Top-k | Textbox (số nguyên) | Text | • Số đoạn ngữ cảnh lấy từ kho RAG mỗi lần trả lời; số nguyên dương; giá trị mặc định/tối đa: OQ-22. |
| 3 | Bật/tắt chế độ theo phạm vi | Checkbox grid | Check | • 3 chế độ AI: **Hỏi đáp AI cho khách hàng** (`ai-khung-chat`), **AI hỗ trợ soạn phản hồi** (nút AI gợi ý ở `agent-chi-tiet-ticket`), **AI tự động phản hồi ticket** (UC28). Bật/tắt **theo dịch vụ/site hoặc toàn hệ thống** (UC13); dòng cụ thể ghi đè dòng chung; tắt → chức năng tương ứng ẩn/vô hiệu ở nơi dùng.<br>• Theo lộ trình, **AI tự động gửi thẳng chỉ bật ở Giai đoạn 4**, sau khi đã kiểm chứng chất lượng — mặc định tắt. |
| 4 | Phạm vi AI tự động | Checkbox group | Check | • Chọn AI tự động áp cho loại ticket/mức ưu tiên nào (đề xuất: cấu hình "theo loại ticket hoặc mức ưu tiên"). **Ticket khẩn cấp luôn cần agent duyệt trước khi gửi** → ô Khẩn cấp bị khóa, không bật được. Chọn theo loại vấn đề: đã đề xuất, chờ xác nhận (OQ-22). |
| 5 | Lưu | Button | Click | • **Disabled** khi chưa đổi gì hoặc giá trị [1]/[2] không hợp lệ; áp dụng ngay cho lần hỏi kế tiếp; báo "Đã lưu" (wording tạm). Ghi nhật ký thao tác cấu hình [GIẢ ĐỊNH]. |
| 6 | Thử nghiệm AI | Link | Click | • → `cauhinh-thu-nghiem-ai` để kiểm tra chất lượng **trước khi bật rộng rãi** (userflow: thử → đạt → quay lại bật). |

- Cột "AI soạn" = AI hỗ trợ soạn phản hồi cho agent; "AI tự động" = AI tự động phản hồi ticket.


---

## Screen: cauhinh-thu-nghiem-ai — Thử nghiệm AI

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│ Khu vực thử nghiệm AI                          [1] < Về tham số AI > │
├──────────────────────────────────────────────────────────────────────┤
│ Thử theo phạm vi [2]: Dịch vụ [v: iOffice] Site [v: UBND Bình Định]  │
├──────────────────────────────────────────────────────────────────────┤
│ [3] [Nhập câu hỏi thử...___________________________] [4] [ Hỏi thử ] │
├──────────────────────────────────────────────────────────────────────┤
│ Kết quả                                                              │
│ AI: Lỗi 403 khi ký số thường do tài khoản chưa có quyền ký... [5]    │
│ Nguồn: < Lỗi 403 khi ký số >  < Hướng dẫn ký số văn bản đi >         │
│ Độ liên quan: 0.82 (ngưỡng 0.70) -> AI sẽ trả lời [6]                │
├──────────────────────────────────────────────────────────────────────┤
│ Đoạn tài liệu đã tìm được (top-5) [7]                                │
│ 1. Lỗi 403 khi ký số - mục Nguyên nhân         0.82                  │
│ 2. Hướng dẫn ký số văn bản đi - Bước 2         0.71                  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Về tham số AI | Link | Click | • → `cauhinh-tham-so-ai`; ở đó bật rộng rãi khi kết quả thử đạt yêu cầu. |
| 2 | Phạm vi thử | Dropdown x2 | Select | • Chọn dịch vụ + site để AI trả lời **đúng như khách hàng của site đó** (lọc cứng theo phạm vi) — kiểm tra được cả việc không trả lời chéo dữ liệu. Chỉ Quản trị viên/Biên tập viên dùng (UC14); biên tập chỉ chọn được phạm vi được gán. |
| 3 | Câu hỏi thử | Textbox | Text | • **Bắt buộc**, giới hạn độ dài như `ai-khung-chat` (OQ-13). |
| 4 | Hỏi thử | Button | Click | • **Disabled** khi [3] rỗng; khóa khi đang xử lý; lỗi kết nối AI → báo, gợi ý kiểm tra `cauhinh-tich-hop-ai`. Lượt thử có tính vào giới hạn request/chi phí và ghi vào nhật ký hay không: đã đề xuất, chờ xác nhận (OQ-22). |
| 5 | Câu trả lời của AI | Label | ReadOnly | • Hiển thị câu trả lời kèm **nguồn trích dẫn** để kiểm tra chất lượng (UC14); không tạo ticket, không gửi cho khách hàng. |
| 6 | Độ liên quan / kết luận | Label | ReadOnly | • So độ liên quan với ngưỡng tin cậy hiện hành: đạt → "AI sẽ trả lời"; dưới ngưỡng → "AI sẽ đề xuất tạo ticket" (giúp chỉnh ngưỡng). |
| 7 | Đoạn tài liệu tìm được | List | ReadOnly | • Top-k đoạn RAG lấy được kèm điểm, để biết AI dựa vào đâu và phát hiện bài thiếu/sai cần sửa. Không hiện tài liệu đánh dấu "không dùng cho AI". |

- Dữ liệu mẫu chỉ minh họa; "->" thay mũi tên để không lệch cột.


---

## Screen: cauhinh-nhat-ky-ai — Nhật ký hội thoại AI + chi phí

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│ Nhật ký hội thoại AI & chi phí                                       │
├──────────────────────────────────────────────────────────────────────┤
│ Tháng [v: 09/2026][1]  Lượt gọi: 1.240  Chi phí ước tính: 320.000 d  │
│ Theo dịch vụ [2]: iOffice 980 lượt (250.000 d) | iStorage 260 lượt   │
├──────────────────────────────────────────────────────────────────────┤
│ Chế độ [v: Tất cả] [3]  Kết quả [v: Tất cả] [4]  Tìm [__________]    │
├──────────────────────────────────────────────────────────────────────┤
│ Thời gian   Người     Chế độ   Câu hỏi                  Kết quả      │
│ [5] ---------------------------------------------------------------  │
│ 17/09 10:20 KH BĐ     Hỏi đáp  Ký số báo lỗi 403...     Trả lời      │
│ 17/09 09:40 KH ABC    Hỏi đáp  Cách đối soát tệp ký...  Chuyển ticket│
│ 17/09 09:15 Agent B   AI soạn  Gợi ý trả lời #T-0123    Đã dùng      │
│                                                                      │
│ Bấm 1 dòng để xem đầy đủ câu hỏi, câu trả lời và nguồn [6]           │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Kỳ báo cáo | Dropdown | Select | • Chọn tháng theo dõi mức sử dụng: **số lượt gọi AI** và **chi phí ước tính** theo tháng (Đề xuất — Theo dõi mức sử dụng). Cách ước tính chi phí (đơn giá): đã đề xuất, chờ xác nhận (OQ-22). |
| 2 | Theo dịch vụ | Label | ReadOnly | • Tách lượt gọi/chi phí theo dịch vụ ("chi phí ước tính theo tháng/theo dịch vụ"). Theo site có cần không: chưa có nguồn. |
| 3 | Lọc chế độ | Dropdown | Select | • Hỏi đáp AI (khách hàng) / AI hỗ trợ soạn (agent) / AI tự động phản hồi. |
| 4 | Lọc kết quả | Dropdown | Select | • Trả lời / Chuyển ticket (không đủ tự tin) / Lỗi / Đã dùng (agent dùng gợi ý). |
| 5 | Bảng nhật ký | Table | Select | • Lưu **câu hỏi & câu trả lời AI đã đưa ra** cho cả khách hàng và agent, để Quản trị viên kiểm tra chất lượng, phát hiện trả lời sai (Đề xuất — Nhật ký hội thoại AI). Chỉ Quản trị viên xem; chỉ đọc.<br>• Chứa nội dung khách hàng gõ nên **không xuất/hiển thị ngoài phạm vi quản trị**; thời gian lưu giữ: OQ-22. Empty: "Chưa có hội thoại nào". |
| 6 | Xem chi tiết hội thoại | Panel | ReadOnly | • Mở panel bên phải: câu hỏi, câu trả lời, nguồn trích dẫn, độ liên quan; quản trị viên dựa vào đó sửa bài KB hoặc chỉnh ngưỡng ở `cauhinh-tham-so-ai`. |

- Dữ liệu và số liệu mẫu chỉ minh họa; chi phí ghi "d" (đồng) để không lệch cột.


---

## Screen: danhmuc-dich-vu-loai-van-de — Danh mục dùng chung

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│ Danh mục dùng chung                                                  │
│ [1] [Dịch vụ] [*Loại vấn đề*] [Ưu tiên] [Loại nội dung] [Mẫu trả lời]│
├──────────────────────────────────────────────────────────────────────┤
│ Loại vấn đề ticket                                    [2] [ + Thêm ] │
│ Tên                        Mô tả                      Trạng thái     │
│ -------------------------------------------------------------------- │
│ Lỗi ký số                  Lỗi khi ký số văn bản      Đang dùng      │
│ Không gửi được văn bản     Lỗi gửi văn bản đi/đến     Đang dùng      │
│ Hướng dẫn sử dụng          Cần hướng dẫn thao tác     Đang dùng      │
│ Khác                       Vấn đề khác                Ngừng dùng     │
│                                                                      │
│ Dòng chọn: Lỗi ký số   [3] < Sửa >   [4] < Xóa >                     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Tab danh mục | Tabs | Click | • 5 danh mục dùng chung: **Dịch vụ**, **Loại vấn đề ticket**, **Mức độ ưu tiên ticket**, **Loại nội dung tài liệu**, **Mẫu trả lời dựng sẵn** (UC32-36); mỗi tab cùng thao tác thêm/sửa/xóa. Chỉ Quản trị viên. Thay đổi **áp dụng cho các form liên quan** (`ticket-tao-moi`, `kb-soan-thao`, ...). |
| 2 | Thêm | Button | Click | • Mở form thêm nhanh ngay trên dòng/panel. Trường theo tab: **Dịch vụ / Loại vấn đề / Ưu tiên / Loại nội dung** — tên (bắt buộc, không trùng), mô tả, trạng thái; **Mẫu trả lời** — tiêu đề, nội dung mẫu, dịch vụ áp dụng [GIẢ ĐỊNH]. Mức ưu tiên gắn với SLA: cấu hình thời gian nằm ở màn SLA chưa có (OQ-19). |
| 3 | Sửa | Link | Click | • Sửa tên/mô tả/trạng thái; áp dụng ngay cho form; ticket/bài đã tạo giữ giá trị đã chọn (hiển thị theo tên mới) [GIẢ ĐỊNH]. |
| 4 | Xóa | Link | Click | • Hộp thoại xác nhận. Mục **đã được ticket/bài viết dùng** → không xóa cứng mà chuyển "Ngừng dùng" (ẩn khỏi form, giữ dữ liệu cũ) [GIẢ ĐỊNH — nguồn chỉ nói "thêm/sửa/xóa", quy tắc ràng buộc: OQ-22]. |

- Vẽ tab "Loại vấn đề" làm đại diện; 4 tab còn lại cùng bố cục bảng + Thêm/Sửa/Xóa, chỉ khác cột (Mẫu trả lời có thêm nội dung mẫu).


---

## Screen: cauhinh-kenh-thongbao — Cấu hình kênh thông báo

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│ Cấu hình kênh thông báo                                              │
├──────────────────────────────────────────────────────────────────────┤
│ Kênh: [x] Email [1]  [x] SMS [2]   Brandname SMS [3] [VNPT-CSKH___]  │
├──────────────────────────────────────────────────────────────────────┤
│ Kênh mặc định theo loại thông báo [4]                                │
│ Loại thông báo                     Email    SMS                      │
│ -------------------------------------------------------------------- │
│ Ticket có phản hồi mới             [x]      [x]                      │
│ Ticket đổi trạng thái              [x]      [ ]                      │
│ Chờ khách hàng xác nhận / tự đóng  [x]      [x]                      │
│ Lời mời kích hoạt tài khoản        [x]      [x]                      │
│ Cảnh báo SLA (nội bộ)              [x]      [ ]                      │
├──────────────────────────────────────────────────────────────────────┤
│ [5] [ Lưu ]                                                          │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Bật/tắt Email | Checkbox | Check | • Bật/tắt gửi thông báo Email toàn hệ thống (UC16). Tắt → mọi loại thông báo không gửi Email, các ô Email ở [4] bị vô hiệu. |
| 2 | Bật/tắt SMS | Checkbox | Check | • Bật/tắt gửi SMS; tắt → ô SMS ở [4] vô hiệu. Tắt cả 2 kênh: cảnh báo hộp thoại vì khách hàng không nhận được lời mời kích hoạt/phản hồi ticket [GIẢ ĐỊNH]. |
| 3 | Brandname SMS | Textbox | Text | • Tên hiển thị người gửi SMS; **bắt buộc khi SMS bật**. Định dạng/độ dài hợp lệ, brandname phải đăng ký với nhà mạng: đã đề xuất, chờ xác nhận (OQ-22). |
| 4 | Kênh theo loại thông báo | Checkbox grid | Check | • Chọn kênh nhận mặc định **theo loại thông báo** (Đề xuất — Cấu hình kênh thông báo): phản hồi mới, đổi trạng thái, chờ xác nhận/tự đóng, lời mời kích hoạt, cảnh báo SLA nội bộ. Mỗi loại ≥1 kênh. Chọn kênh riêng **theo từng khách hàng** (ghi đè) có trong đề xuất nhưng chưa có màn/nơi cấu hình: OQ-22. |
| 5 | Lưu | Button | Click | • **Disabled** khi chưa đổi gì hoặc thiếu brandname khi SMS bật; áp dụng ngay cho thông báo tiếp theo (UC16); báo "Đã lưu" (wording tạm). |


---

## Screen: cauhinh-sla — Cấu hình SLA

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│ Cấu hình SLA                                       Chỉ Quản trị viên │
├──────────────────────────────────────────────────────────────────────┤
│ Giờ làm việc [1]: T2-T6  Từ [08:00] đến [17:00]                      │
├──────────────────────────────────────────────────────────────────────┤
│ Mức ưu tiên      Phản hồi trong   Xử lý trong [2]                    │
│ ------------------------------------------------------------         │
│ Khẩn cấp         [30 phút___]     [4 giờ_____]                       │
│ Cao              [2 giờ_____]     [1 ngày LV_]                       │
│ Bình thường      [4 giờ_____]     [3 ngày LV_]                       │
├──────────────────────────────────────────────────────────────────────┤
│ Cảnh báo sắp quá hạn khi còn [20__] % thời gian [3]                  │
│ Tạm dừng đồng hồ: [x] Chờ khách hàng  [x] Chờ KH xác nhận [4]        │
│ Tự đóng ticket sau [3__] ngày làm việc kể từ "Chờ KH xác nhận" [5]   │
│ [6] [ Lưu ]                                                          │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Giờ làm việc | Textbox (giờ) x2 | Text | • Khung giờ làm việc dùng để **tính SLA** (đề xuất T2-T6, 08:00-17:00 — OQ-2); ngoài khung này đồng hồ SLA không chạy. Ngày nghỉ lễ: đã đề xuất, chờ xác nhận (OQ-19). Giờ kết thúc phải sau giờ bắt đầu, sai → báo lỗi tại ô [wording chưa có, chưa có mã E-…]. |
| 2 | Bảng SLA theo mức ưu tiên | Table (Textbox) | Text | • Mỗi mức ưu tiên (lấy từ danh mục **Mức ưu tiên** ở `danhmuc-dich-vu-loai-van-de`) có thời gian **phản hồi** và **xử lý**. Đề xuất mặc định: Khẩn cấp 30 phút / 4 giờ; Cao 2 giờ / 1 ngày làm việc; Bình thường 4 giờ / 3 ngày làm việc (OQ-2). Nhập số + đơn vị (phút/giờ/ngày làm việc); xử lý phải ≥ phản hồi. Thêm mức ưu tiên mới ở danh mục thì hiện dòng mới ở đây. |
| 3 | Ngưỡng cảnh báo | Textbox (số %) | Text | • Cảnh báo "sắp quá hạn" khi còn ngần này % thời gian (đề xuất 20%); dùng cho màn `agent-canh-bao-sla`. Khoảng hợp lệ 1-90 [GIẢ ĐỊNH]. |
| 4 | Tạm dừng đồng hồ | Checkbox group | Check | • Trạng thái ticket làm **tạm dừng** đồng hồ SLA (đề xuất: Chờ khách hàng, Chờ khách hàng xác nhận) vì đang chờ phía khách hàng. |
| 5 | Thời gian tự đóng | Textbox (số) | Text | • Số ngày làm việc từ lúc ticket ở "Chờ khách hàng xác nhận" tới khi **tự đóng** nếu khách hàng không phản hồi (đề xuất 3 ngày — OQ-1); hệ thống nhắc khách hàng trước 1 ngày. |
| 6 | Lưu | Button | Click | • **Disabled** khi chưa đổi gì hoặc có giá trị không hợp lệ; áp dụng cho ticket **tạo/cập nhật từ sau khi lưu** (ticket đang mở giữ SLA cũ) [GIẢ ĐỊNH]; báo "Đã lưu" (wording tạm). Ghi nhật ký thao tác cấu hình [GIẢ ĐỊNH]. Chỉ Quản trị viên (UC46, nhóm danh mục đầu vào). |

- Màn mới bổ sung ngày 19/09/2026 (userflow [52], UC46). Dữ liệu là giá trị đề xuất, chờ khách hàng xác nhận.


---

## Đề xuất đã cập nhật (chờ khách hàng xác nhận)

| Mã | Nội dung cần chốt | Đề xuất | Trạng thái |
|----|-------------------|---------|------------|
| OQ-22a | Provider, giới hạn, ngưỡng, top-k | Anthropic Claude + mô hình nội bộ VNPT; giới hạn request theo ngày, vượt thì AI báo bận và gợi ý ticket; ngưỡng tin cậy 0,70 (0,50-0,95); top-k 5 (1-10); AI tự động chỉ chọn theo mức ưu tiên (Bình thường/Cao). | Chờ khách hàng xác nhận |
| OQ-22b | Thử nghiệm AI | Không tính vào giới hạn của khách; có tính chi phí, ghi nhật ký nhãn "Thử nghiệm". | Chờ khách hàng xác nhận |
| OQ-22c | Chi phí, nhật ký AI | Chi phí = token × đơn giá (QT nhập); email QT khi đạt 80% ngân sách tháng; nhật ký giữ 12 tháng, chỉ QT xem. | Chờ khách hàng xác nhận |
| OQ-22d | Xóa mục danh mục | Mục đã dùng → "Ngừng dùng" (ẩn khỏi form, giữ dữ liệu); chưa dùng → xóa được. | Chờ khách hàng xác nhận |
| OQ-22e | Brandname SMS; kênh theo khách hàng | Brandname ≤11 ký tự không dấu, VNPT IT đăng ký với nhà mạng; MVP chọn kênh theo loại thông báo, ghi đè theo khách hàng để giai đoạn sau. | Chờ khách hàng xác nhận |
| OQ-19a | Màn cấu hình SLA | Đã thêm `cauhinh-sla` [52]: giờ làm việc, SLA theo mức ưu tiên, ngưỡng cảnh báo, tạm dừng đồng hồ, thời gian tự đóng ticket. | Chờ khách hàng xác nhận |
