# Flow: Cấu hình AI + danh mục hệ thống

> Màn hình thuộc flow này: cauhinh-hub → cauhinh-tich-hop-ai → cauhinh-tham-so-ai → cauhinh-thu-nghiem-ai → cauhinh-nhat-ky-ai → danhmuc-dich-vu-loai-van-de → cauhinh-kenh-thongbao → cauhinh-mau-thong-bao → cauhinh-sla → cauhinh-onebss. Flow tổng xem `../srs/ho-tro-cskh-userflow.md` Mục 1. Khung điều hướng nội bộ dùng chung: bản Figma là sidebar trái + thanh trên có chip Site/Vai trò; ASCII vẽ gọn thành 1 dòng đầu.
>
> Các mục ghi "(OQ-n)" đã được **khách hàng xác nhận (21/09/2026)** ở bảng cuối file (cập nhật 19/09/2026), cũng đã ghi vào tài liệu "Đề xuất Hệ thống Hỗ trợ & Chăm sóc Khách hàng.docx".
>
> **Cập nhật 23/09/2026 (khách hàng xác nhận, qua phiên chốt SRS):** Mẫu trả lời dùng chung mọi dịch vụ (bỏ trường "dịch vụ áp dụng"); trùng tên danh mục so sánh không phân biệt hoa/thường + cắt khoảng trắng đầu-cuối; đổi tên danh mục → ticket/bài viết cũ hiển thị theo tên mới; ngưỡng cảnh báo SLA 1-90%, tắt cả 2 kênh thông báo, SLA mới chỉ áp dụng ticket sau khi lưu — xác nhận đúng bản vẽ. **Bổ sung mới:** màn `danhmuc-dich-vu-loai-van-de` có thêm modal "Thêm mục mới"/"Sửa mục" (trước đây chỉ có màn xác nhận xóa); màn `cauhinh-sla` có thêm khối "Danh sách ngày nghỉ lễ"; mức ưu tiên mới chưa cấu hình SLA bị chặn dùng ở form tạo ticket — đã vẽ bổ sung trên Figma cùng ngày.
>
> **Cập nhật 25/09/2026 (bố cục tiêu chí tìm kiếm):** thanh lọc ở các màn danh sách xếp theo **lưới 4 cột cố định** — nhãn nằm trên ô nhập, các ô cùng chiều rộng và thẳng cột; quá 4 tiêu chí thì xuống hàng theo lưới, checkbox chiếm 2 cột; không còn xếp nhãn + ô nhập nối tiếp theo độ dài trường. Đồng bộ với frame Figma.

---

## Screen: cauhinh-hub — Trung tâm cấu hình

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│ Trung tâm cấu hình                                                   │
│ Thiết lập kết nối, tri thức AI và quy tắc vận hành.                  │
├──────────────────────────────────────────────────────────────────────┤
│ ┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐ │
│ │ [1] Tích hợp AI    │ │ [2] Tham số AI     │ │ [3] Thử nghiệm AI  │ │
│ │ Đã kết nối         │ │ Đang bật           │ │ Sẵn sàng           │ │
│ └────────────────────┘ └────────────────────┘ └────────────────────┘ │
│ ┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐ │
│ │ [4] Nhật ký AI     │ │ [5] Chỉ mục AI     │ │ [6] Danh mục chung │ │
│ │ 1.240 lượt/tháng   │ │ 3 bài cần tái lập  │ │ 5 danh mục         │ │
│ └────────────────────┘ └────────────────────┘ └────────────────────┘ │
│ ┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐ │
│ │ [7] Kênh & mẫu TB  │ │ [8] Cấu hình SLA   │ │ [9] Kết nối OneBSS │ │
│ │ Email - SMS bật    │ │ Đã cấu hình        │ │ Chưa cấu hình      │ │
│ └────────────────────┘ └────────────────────┘ └────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Tích hợp AI | Card | Click | • → `cauhinh-tich-hop-ai`; huy hiệu trạng thái (Đã kết nối / Lỗi / Chưa kiểm tra). Chỉ Quản trị viên. |
| 2 | Tham số & chế độ AI | Card | Click | • → `cauhinh-tham-so-ai`; huy hiệu "Đang bật" khi có chế độ AI bật. Chỉ Quản trị viên. |
| 3 | Thử nghiệm AI | Card | Click | • → `cauhinh-thu-nghiem-ai`; Quản trị viên và **Biên tập nội dung** (như ghi ở màn đó). |
| 4 | Nhật ký hội thoại AI | Card | Click | • → `cauhinh-nhat-ky-ai`; hiện số lượt gọi trong tháng. Chỉ Quản trị viên. |
| 5 | Chỉ mục AI | Card | Click | • → `kb-chi-muc-ai` (thuộc flow quản trị nội dung); hiện số bài cần tái lập. |
| 6 | Danh mục dùng chung | Card | Click | • → `danhmuc-dich-vu-loai-van-de`; hiện số danh mục (5). |
| 7 | Kênh & mẫu thông báo | Card | Click | • → `cauhinh-kenh-thongbao` (từ đó vào `cauhinh-mau-thong-bao`); hiện kênh đang bật. |
| 8 | Cấu hình SLA | Card | Click | • → `cauhinh-sla`; **chỉ Quản trị viên**. |
| 9 | Kết nối OneBSS | Card | Click | • → `cauhinh-onebss`; huy hiệu Chưa cấu hình / Đã kết nối / Lỗi kết nối. **Chỉ Quản trị viên**. |

- **Lối vào và lối quay về:** mở từ mục "Cấu hình" trên menu bên trái (Quản trị viên: đủ 9 mục; Biên tập nội dung: chỉ mục [3] Thử nghiệm AI; vai trò khác → `loi-403`). Từ mọi màn cấu hình con, bấm lại mục "Cấu hình" trên menu để về màn này.
- **Đề xuất bổ sung theo thiết kế Figma (21/09/2026)** — thay node "Menu cấu hình hệ thống" của userflow bằng màn thật; mục hiển thị theo vai trò (mục không có quyền thì ẩn, không hiện rồi báo 403). Nhãn MỚI trên bản Figma đánh dấu phần bổ sung.


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
| 2 | Nhà cung cấp | Dropdown | Select | • **Bắt buộc**. Chọn provider (ví dụ Anthropic Claude hoặc mô hình nội bộ VNPT — Đề xuất, Cấu hình tích hợp & vận hành AI). Danh sách provider hỗ trợ: đã chốt (OQ-22). |
| 3 | Model | Dropdown | Select | • **Bắt buộc**, danh sách phụ thuộc [2]; đổi provider thì reset model. |
| 4 | API key | Textbox (password) | Text | • **Bắt buộc** lần đầu. Luôn che ký tự; sau khi lưu **không hiển thị lại** — chỉ cho nhập key mới để thay (ô hiện dấu * khi đã có key) [GIẢ ĐỊNH]. Chỉ Quản trị viên xem/sửa (UC13). |
| 5 | Endpoint | Textbox | Text | • **Bắt buộc** với provider tự cấu hình; sai định dạng URL → báo lỗi ngay tại ô [wording chưa có, chưa có mã E-…]. |
| 6 | Giới hạn request | Textbox (số) | Text | • Số lượt gọi AI tối đa (đề xuất: "giới hạn số lượng request"); vượt giới hạn thì AI trả lời thế nào (chuyển gợi ý tạo ticket): OQ-22. Đơn vị (ngày/tháng): chưa có nguồn. |
| 7 | Kiểm tra kết nối | Button | Click | • Gọi thử provider bằng cấu hình đang nhập (chưa lưu), báo Kết nối OK hoặc Lỗi ở [1]. Khóa khi đang kiểm tra. |
| 8 | Lưu | Button | Click | • **Disabled** khi thiếu [2]-[5]. Lưu cấu hình **và kiểm tra kết nối** (UC13). OK → sang `cauhinh-tham-so-ai` (theo userflow). Lỗi → giữ nguyên màn, báo lỗi ở [1] kèm lý do, cho sửa và thử lại — không áp dụng cấu hình lỗi cho khách hàng. |
| 9 | Hủy | Button | Click | • Bỏ thay đổi chưa lưu, về màn trước. |

- Header nội bộ dùng chung (không đánh số). Flow 9 là khu vực menu "Cấu hình": 3 màn AI nối theo trình tự cấu hình → tham số → thử nghiệm, còn danh mục dùng chung và kênh thông báo vào độc lập từ menu. Chỉ Quản trị viên (màn thử nghiệm thêm Biên tập viên).

#### Trạng thái phụ — kiểm tra kết nối lỗi

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│ Cấu hình tích hợp AI                   Kết nối: Lỗi [1]              │
├──────────────────────────────────────────────────────────────────────┤
│ (!) Không kết nối được nhà cung cấp AI. Kiểm tra API key/endpoint.   │
│ Nhà cung cấp [2]  [v: Anthropic Claude        ]                      │
│ Model [3]         [v: Chọn model              ]                      │
│ API key [4]       [************************] (eye)                   │
│ Endpoint [5]      [https://api.example.com/v1______]                 │
│ Giới hạn request [6]  [1000____] lượt / ngày                         │
├──────────────────────────────────────────────────────────────────────┤
│ [7] [ Kiểm tra kết nối ]   [8] [ Lưu ]   [9] [ Hủy ]                 │
└──────────────────────────────────────────────────────────────────────┘
```

- Khác màn gốc: [1] Kết nối: Lỗi + dòng (!) báo không kết nối được nhà cung cấp AI (kiểm tra API key/endpoint); dữ liệu đã nhập giữ nguyên để sửa và thử lại.


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
| 1 | Ngưỡng tin cậy | Textbox (số) | Text | • Ngưỡng độ liên quan để AI **trả lời hay chuyển sang gợi ý tạo ticket** (Đề xuất — Cấu hình tham số trả lời): dưới ngưỡng → `ai-de-xuat-tao-ticket`. Khoảng giá trị hợp lệ và giá trị mặc định: đã chốt (OQ-22). |
| 2 | Top-k | Textbox (số nguyên) | Text | • Số đoạn ngữ cảnh lấy từ kho RAG mỗi lần trả lời; số nguyên dương; giá trị mặc định/tối đa: OQ-22. |
| 3 | Bật/tắt chế độ theo phạm vi | Checkbox grid | Check | • 3 chế độ AI: **Hỏi đáp AI cho khách hàng** (`ai-khung-chat`), **AI hỗ trợ soạn phản hồi** (nút AI gợi ý ở `agent-chi-tiet-ticket`), **AI tự động phản hồi ticket** (UC36). Bật/tắt **theo dịch vụ/site hoặc toàn hệ thống** (UC13); dòng cụ thể ghi đè dòng chung; tắt → chức năng tương ứng ẩn/vô hiệu ở nơi dùng.<br>• Theo lộ trình, **AI tự động gửi thẳng chỉ bật ở Giai đoạn 4**, sau khi đã kiểm chứng chất lượng — mặc định tắt. |
| 4 | Phạm vi AI tự động | Checkbox group | Check | • Chọn AI tự động áp cho loại ticket/mức ưu tiên nào (đề xuất: cấu hình "theo loại ticket hoặc mức ưu tiên"). **Ticket khẩn cấp luôn cần agent duyệt trước khi gửi** → ô Khẩn cấp bị khóa, không bật được. Chọn theo loại vấn đề: đã chốt (OQ-22). |
| 5 | Lưu | Button | Click | • **Disabled** khi chưa đổi gì hoặc giá trị [1]/[2] không hợp lệ; áp dụng ngay cho lần hỏi kế tiếp; báo "Đã lưu" (wording tạm). Ghi nhật ký thao tác cấu hình [GIẢ ĐỊNH]. |
| 6 | Thử nghiệm AI | Link | Click | • → `cauhinh-thu-nghiem-ai` để kiểm tra chất lượng **trước khi bật rộng rãi** (userflow: thử → đạt → quay lại bật). |

- Cột "AI soạn" = AI hỗ trợ soạn phản hồi cho agent; "AI tự động" = AI tự động phản hồi ticket.

#### Trạng thái phụ — giá trị không hợp lệ

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│ Tham số & chế độ AI                                                  │
├──────────────────────────────────────────────────────────────────────┤
│ Ngưỡng tin cậy [1] [1.50__]   Số đoạn ngữ cảnh top-k [2] [5___]      │
│ (!) Ngưỡng tin cậy phải nằm trong khoảng 0,50 đến 0,95.              │
├──────────────────────────────────────────────────────────────────────┤
│ Bật/tắt từng chế độ AI theo phạm vi [3]  (giữ nguyên như màn gốc)    │
├──────────────────────────────────────────────────────────────────────┤
│ [5] [ Lưu ] (mờ)        [6] < Thử nghiệm AI >                        │
└──────────────────────────────────────────────────────────────────────┘
```

- Khác màn gốc: ngưỡng tin cậy ngoài khoảng 0,50–0,95 (hoặc top-k ngoài 1–10) → (!) lỗi tại ô tương ứng; [5] Lưu mờ tới khi sửa [wording tạm, chưa có mã E-…].


---

## Screen: cauhinh-thu-nghiem-ai — Thử nghiệm AI

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│ Khu vực thử nghiệm AI                          [1] < Về tham số AI > │
├──────────────────────────────────────────────────────────────────────┤
│ [2]              Dịch vụ          Site                               │
│ Thử theo phạm vi [v: iOffice    ] [v: UBND Bình Đ]                   │
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
| 4 | Hỏi thử | Button | Click | • **Disabled** khi [3] rỗng; khóa khi đang xử lý; lỗi kết nối AI → báo, gợi ý kiểm tra `cauhinh-tich-hop-ai`. Lượt thử có tính vào giới hạn request/chi phí và ghi vào nhật ký hay không: đã chốt (OQ-22). |
| 5 | Câu trả lời của AI | Label | ReadOnly | • Hiển thị câu trả lời kèm **nguồn trích dẫn** để kiểm tra chất lượng (UC14); không tạo ticket, không gửi cho khách hàng. |
| 6 | Độ liên quan / kết luận | Label | ReadOnly | • So độ liên quan với ngưỡng tin cậy hiện hành: đạt → "AI sẽ trả lời"; dưới ngưỡng → "AI sẽ đề xuất tạo ticket" (giúp chỉnh ngưỡng). |
| 7 | Đoạn tài liệu tìm được | List | ReadOnly | • Top-k đoạn RAG lấy được kèm điểm, để biết AI dựa vào đâu và phát hiện bài thiếu/sai cần sửa. Không hiện tài liệu đánh dấu "không dùng cho AI". |

- Dữ liệu mẫu chỉ minh họa; "->" thay mũi tên để không lệch cột.

#### Trạng thái phụ — dưới ngưỡng tin cậy

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│ Khu vực thử nghiệm AI                          [1] < Về tham số AI > │
├──────────────────────────────────────────────────────────────────────┤
│ [3] [Hướng dẫn cấu hình máy chủ mail?_____________] [4] [ Hỏi thử ]  │
├──────────────────────────────────────────────────────────────────────┤
│ Kết quả                                                              │
│ AI: (không trả lời) Độ liên quan 0.41 thấp hơn ngưỡng 0.70 [6]       │
│ -> Hệ thống sẽ đề xuất tạo ticket cho khách hàng.                    │
├──────────────────────────────────────────────────────────────────────┤
│ Đoạn tài liệu đã tìm được (top-5) [7]                                │
│ 1. Cấu hình email nhận thông báo - Bước 1        0.41                │
│ 2. Danh sách văn bản đến                          0.33               │
└──────────────────────────────────────────────────────────────────────┘
```

- Khác màn gốc: độ liên quan thấp hơn ngưỡng → AI không trả lời, hệ thống sẽ đề xuất tạo ticket cho khách hàng; vẫn liệt kê đoạn tài liệu tìm được để chỉnh nội dung.


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
│ Chế độ [3]       Kết quả [4]      Tìm                                │
│ [v: Tất cả     ] [v: Tất cả     ] [______________]                   │
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
| 1 | Kỳ báo cáo | Dropdown | Select | • Chọn tháng theo dõi mức sử dụng: **số lượt gọi AI** và **chi phí ước tính** theo tháng (Đề xuất — Theo dõi mức sử dụng). Cách ước tính chi phí (đơn giá): đã chốt (OQ-22). |
| 2 | Theo dịch vụ | Label | ReadOnly | • Tách lượt gọi/chi phí theo dịch vụ ("chi phí ước tính theo tháng/theo dịch vụ"). Theo site có cần không: chưa có nguồn. |
| 3 | Lọc chế độ | Dropdown | Select | • Hỏi đáp AI (khách hàng) / AI hỗ trợ soạn (agent) / AI tự động phản hồi. |
| 4 | Lọc kết quả | Dropdown | Select | • Trả lời / Chuyển ticket (không đủ tự tin) / Lỗi / Đã dùng (agent dùng gợi ý). |
| 5 | Bảng nhật ký | Table | Select | • Lưu **câu hỏi & câu trả lời AI đã đưa ra** cho cả khách hàng và agent, để Quản trị viên kiểm tra chất lượng, phát hiện trả lời sai (Đề xuất — Nhật ký hội thoại AI). Chỉ Quản trị viên xem; chỉ đọc.<br>• Chứa nội dung khách hàng gõ nên **không xuất/hiển thị ngoài phạm vi quản trị**; thời gian lưu giữ: OQ-22. Empty: "Chưa có hội thoại nào". |
| 6 | Xem chi tiết hội thoại | Panel | ReadOnly | • Mở panel bên phải: câu hỏi, câu trả lời, nguồn trích dẫn, độ liên quan; quản trị viên dựa vào đó sửa bài KB hoặc chỉnh ngưỡng ở `cauhinh-tham-so-ai`. |

- Dữ liệu và số liệu mẫu chỉ minh họa; chi phí ghi "d" (đồng) để không lệch cột.

#### Trạng thái phụ — xem chi tiết một dòng

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│ Nhật ký hội thoại AI & chi phí                                       │
├──────────────────────────────────────────────────────────────────────┤
│ 17/09 10:20  KH BĐ  Hỏi đáp  Ký số báo lỗi 403...   Trả lời  <[5]>   │
├──────────────────────────────────────────────────────────────────────┤
│ Chi tiết [6]                                            [ Đóng ]     │
│ Câu hỏi: Ký số báo lỗi 403 thì xử lý sao?                            │
│ Trả lời: Lỗi 403 thường do tài khoản chưa có quyền ký...             │
│ Nguồn: < Lỗi 403 khi ký số >   Độ liên quan: 0.82                    │
│ Phản hồi của khách hàng: Hữu ích                                     │
└──────────────────────────────────────────────────────────────────────┘
```

- Khác màn gốc: bấm 1 dòng mở panel [6] gồm câu hỏi, câu trả lời, nguồn + độ liên quan, phản hồi của khách hàng (Hữu ích/Không); [ Đóng ] về danh sách.


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
| 1 | Tab danh mục | Tabs | Click | • 5 danh mục dùng chung: **Dịch vụ**, **Loại vấn đề ticket**, **Mức độ ưu tiên ticket**, **Loại nội dung tài liệu**, **Mẫu trả lời dựng sẵn** (UC40-44); mỗi tab cùng thao tác thêm/sửa/xóa. Chỉ Quản trị viên. Thay đổi **áp dụng cho các form liên quan** (`ticket-tao-moi`, `kb-soan-thao`, ...). |
| 2 | Thêm | Button | Click | • Mở modal "Thêm mục mới" giữa màn (nền mờ phía sau, đã vẽ Figma 23/09/2026). Trường theo tab: **Dịch vụ / Loại vấn đề / Ưu tiên / Loại nội dung** — tên (bắt buộc, không trùng — so sánh không phân biệt hoa/thường, đã cắt khoảng trắng đầu-cuối, đã chốt 23/09/2026), mô tả, trạng thái; **Mẫu trả lời** — tiêu đề, nội dung mẫu (dùng chung cho mọi dịch vụ, KHÔNG có trường "dịch vụ áp dụng" — đã chốt 23/09/2026). Mức ưu tiên gắn với SLA: cấu hình thời gian ở màn `cauhinh-sla`; mức mới thêm CHƯA có SLA thì bị chặn dùng ở form tạo ticket cho tới khi cấu hình xong (đã chốt 23/09/2026). |
| 3 | Sửa | Link | Click | • Mở lại modal ở trạng thái "Sửa mục", điền sẵn dữ liệu hiện có (đã vẽ Figma 23/09/2026); sửa tên/mô tả/trạng thái, áp dụng ngay cho form; ticket/bài đã tạo trước đó lưu theo ID tham chiếu (không lưu bản sao text) nên hiển thị theo TÊN MỚI sau khi đổi (đã chốt 23/09/2026). |
| 4 | Xóa | Link | Click | • Hộp thoại xác nhận. Mục **đã được ticket/bài viết dùng** → không xóa cứng mà chuyển "Ngừng dùng" (ẩn khỏi form, giữ dữ liệu cũ) (đã chốt, OQ-22). |

- Vẽ tab "Loại vấn đề" làm đại diện; 4 tab còn lại cùng bố cục bảng + Thêm/Sửa/Xóa, chỉ khác cột (Mẫu trả lời có thêm nội dung mẫu).

- Bản Figma có **đủ 5 tab** (Dịch vụ, Loại vấn đề, Ưu tiên, Loại nội dung, Mẫu trả lời) cùng bố cục bảng + Thêm/Sửa/Xóa; cột khác nhau theo tab (Mẫu trả lời: Tiêu đề + Nội dung mẫu). Mức ưu tiên gắn SLA ở `cauhinh-sla`.

#### Trạng thái phụ — xác nhận xóa mục đã được dùng

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│ Danh mục dùng chung                                                  │
│ [1] [Dịch vụ] [Loại vấn đề] [Ưu tiên] [*Loại nội dung*] [Mẫu trả lời]│
│ (nền mờ - danh sách loại nội dung ở phía sau)                        │
│     ┌──────────────────────────────────────────────────────────┐     │
│     │ Xóa "Câu hỏi thường gặp"?                                │     │
│     │ Mục đã được bài viết sử dụng. Hệ thống sẽ chuyển sang    │     │
│     │ "Ngừng dùng" (ẩn khỏi form, giữ dữ liệu cũ).             │     │
│     │                                                          │     │
│     │ [3] [ Chuyển sang Ngừng dùng ]  [4] [ Hủy ]              │     │
│     └──────────────────────────────────────────────────────────┘     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- Khác màn gốc: hộp xác nhận — mục đã được ticket/bài viết dùng không xóa cứng mà chuyển "Ngừng dùng" (ẩn khỏi form, giữ dữ liệu cũ) (đã chốt, OQ-22); [3] Chuyển sang Ngừng dùng / [4] Hủy; nền mờ.


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
| 2 | Bật/tắt SMS | Checkbox | Check | • Bật/tắt gửi SMS; tắt → ô SMS ở [4] vô hiệu. Tắt cả 2 kênh: cảnh báo hộp thoại vì khách hàng không nhận được lời mời kích hoạt/phản hồi ticket (đã chốt 23/09/2026). |
| 3 | Brandname SMS | Textbox | Text | • Tên hiển thị người gửi SMS; **bắt buộc khi SMS bật**. Định dạng/độ dài hợp lệ, brandname phải đăng ký với nhà mạng: đã chốt (OQ-22). |
| 4 | Kênh theo loại thông báo | Checkbox grid | Check | • Chọn kênh nhận mặc định **theo loại thông báo** (Đề xuất — Cấu hình kênh thông báo): phản hồi mới, đổi trạng thái, chờ xác nhận/tự đóng, lời mời kích hoạt, cảnh báo SLA nội bộ. Mỗi loại ≥1 kênh. Chọn kênh riêng **theo từng khách hàng** (ghi đè) có trong đề xuất nhưng chưa có màn/nơi cấu hình: OQ-22. |
| 5 | Lưu | Button | Click | • **Disabled** khi chưa đổi gì hoặc thiếu brandname khi SMS bật; áp dụng ngay cho thông báo tiếp theo (UC16); báo "Đã lưu" (wording tạm). |

- Bổ sung 21/09/2026: có link "Chỉnh mẫu nội dung Email/SMS" [6] tới `cauhinh-mau-thong-bao`.

#### Trạng thái phụ — bật SMS thiếu brandname

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│ Cấu hình kênh thông báo                                              │
├──────────────────────────────────────────────────────────────────────┤
│ Kênh: [x] Email [1]  [x] SMS [2]   Brandname SMS [3] [______________]│
│ (!) Bật SMS thì bắt buộc nhập brandname.                             │
│ Chỉnh mẫu nội dung: < Chỉnh mẫu nội dung Email/SMS > [6]             │
├──────────────────────────────────────────────────────────────────────┤
│ Kênh mặc định theo loại thông báo [4]  (giữ nguyên như màn gốc)      │
├──────────────────────────────────────────────────────────────────────┤
│ [5] [ Lưu ] (mờ)                                                     │
└──────────────────────────────────────────────────────────────────────┘
```

- Khác màn gốc: bật SMS mà brandname trống → (!) "Bật SMS thì bắt buộc nhập brandname." tại ô [3]; [5] Lưu mờ [wording tạm, chưa có mã E-…].


---

## Screen: cauhinh-mau-thong-bao — Mẫu nội dung thông báo Email/SMS

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│ Mẫu nội dung thông báo                                [7] [ Lưu mẫu ]│
│ [1] (*) Email   ( ) SMS                                              │
├──────────────────────────────────────────────────────────────────────┤
│ Loại thông báo [2]              Tiêu đề [3]                          │
│ (*) Phản hồi mới      [[CSKH] Ticket {mã_ticket} có phản hồi mới____]│
│ ( ) Đổi trạng thái    Nội dung [4]                                   │
│ ( ) Chờ xác nhận      [Kính gửi {tên_khách_hàng},                    │
│ ( ) Lời mời kích hoạt  Ticket {mã_ticket} vừa có phản hồi mới]       │
│ ( ) Cảnh báo SLA                                                     │
├──────────────────────────────────────────────────────────────────────┤
│ Biến chèn [5]: {tên_khách_hàng} {mã_ticket} {tiêu_đề} {trạng_thái}   │
│ [6] < Xem trước >   < Khôi phục mẫu mặc định >                       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Kênh | Tab/Radio | Select | • Email hoặc SMS; SMS không có ô tiêu đề. Chỉ hiện kênh đang bật ở `cauhinh-kenh-thongbao`. |
| 2 | Loại thông báo | Radio list | Select | • 5 loại như ở `cauhinh-kenh-thongbao`: ticket có phản hồi mới, đổi trạng thái, chờ khách hàng xác nhận/tự đóng, lời mời kích hoạt, cảnh báo SLA (nội bộ). |
| 3 | Tiêu đề (Email) | Textbox | Text | • Bắt buộc với Email; cho chèn biến. |
| 4 | Nội dung | Textarea | Text | • Bắt buộc; **phải giữ biến bắt buộc** của loại đó (vd lời mời kích hoạt/đặt lại phải có biến liên kết kích hoạt/đặt lại) — thiếu → không lưu được (xem Trạng thái phụ). SMS: đếm độ dài, cảnh báo khi vượt 1 tin theo nhà mạng. |
| 5 | Biến chèn | Chip list | Click | • {tên_khách_hàng}, {mã_ticket}, {tiêu_đề}, {trạng_thái}, {liên_kết…}; bấm để chèn vào vị trí con trỏ. |
| 6 | Xem trước / Khôi phục mẫu mặc định | Link | Click | • Xem trước với dữ liệu mẫu; Khôi phục đưa mẫu về nội dung mặc định (hộp xác nhận). |
| 7 | Lưu mẫu | Button | Click | • **Disabled** khi chưa đổi gì hoặc thiếu biến bắt buộc/tiêu đề; áp dụng cho thông báo gửi sau; ghi nhật ký thao tác. Về `cauhinh-kenh-thongbao` bằng breadcrumb/Quay lại. |

- **Đề xuất bổ sung, đã chốt (OQ-26).** Thông báo trung lập của `kh-quen-mat-khau` (email không có trong danh mục) **không nằm trong mẫu sửa được**. Vào từ `cauhinh-kenh-thongbao`.

#### Trạng thái phụ — thiếu biến bắt buộc

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│ Mẫu nội dung thông báo                                [7] [ Lưu mẫu ]│
│ [1] (*) Email   ( ) SMS                                              │
├──────────────────────────────────────────────────────────────────────┤
│ Loại thông báo [2]              Tiêu đề [3]                          │
│ ( ) Phản hồi mới      Tiêu đề [3]                                    │
│ ( ) Đổi trạng thái    [Kích hoạt tài khoản CSKH_______________]      │
│ ( ) Chờ xác nhận      Nội dung [4]                                   │
│ (*) Lời mời kích hoạt [Kính gửi {tên_khách_hàng}, tài khoản của bạn  │
│ ( ) Cảnh báo SLA       đã được tạo.]                                 │
├──────────────────────────────────────────────────────────────────────┤
│ Biến chèn [5]: {tên_khách_hàng} {mã_ticket} {tiêu_đề} {trạng_thái}   │
│ (!) Thiếu biến bắt buộc {liên_kết_kích_hoạt}. Không lưu được.        │
│ [6] < Khôi phục mẫu mặc định >                                       │
└──────────────────────────────────────────────────────────────────────┘
```

- Khác màn gốc: chọn "Lời mời kích hoạt" mà nội dung thiếu biến liên kết kích hoạt → (!) báo thiếu và không lưu được; có lối Khôi phục mẫu mặc định.


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
│ Danh sách ngày nghỉ lễ [2]                          [ + Thêm ngày ]  │
│ 01/01/2026  Tết Dương lịch                              <Xóa>        │
│ 29/01 – 02/02/2026  Tết Nguyên đán                      <Xóa>        │
├──────────────────────────────────────────────────────────────────────┤
│ Mức ưu tiên      Phản hồi trong   Xử lý trong [3]                    │
│ ------------------------------------------------------------         │
│ Khẩn cấp         [30 phút___]     [4 giờ_____]                       │
│ Cao              [2 giờ_____]     [1 ngày LV_]                       │
│ Bình thường      [4 giờ_____]     [3 ngày LV_]                       │
├──────────────────────────────────────────────────────────────────────┤
│ Cảnh báo sắp quá hạn khi còn [20__] % thời gian [4]                  │
│ Tạm dừng đồng hồ: [x] Chờ khách hàng  [x] Chờ KH xác nhận [5]        │
│ Tự đóng ticket sau [3__] ngày làm việc kể từ "Chờ KH xác nhận" [6]   │
│ [7] [ Lưu ]                                                          │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Giờ làm việc | Textbox (giờ) x2 | Text | • Khung giờ làm việc dùng để **tính SLA** (đề xuất T2-T6, 08:00-17:00 — OQ-2); ngoài khung này đồng hồ SLA không chạy. Giờ kết thúc phải sau giờ bắt đầu, sai → báo lỗi tại ô [wording chưa có, chưa có mã E-…]. |
| 2 | Danh sách ngày nghỉ lễ | Table (date list) + nút Thêm/Xóa | Text | • **Bổ sung mới 23/09/2026, cụ thể hóa OQ-19a.** Quản trị viên tự thêm/sửa/xóa từng ngày nghỉ lễ theo năm (ngày nghỉ lễ đổi hàng năm nên KHÔNG hard-code trong hệ thống); đồng hồ SLA loại trừ các ngày này giống ngoài giờ làm việc. Thêm ngày đã có trong danh sách → báo trùng, không thêm lần 2 [wording tạm]. |
| 3 | Bảng SLA theo mức ưu tiên | Table (Textbox) | Text | • Mỗi mức ưu tiên (lấy từ danh mục **Mức ưu tiên** ở `danhmuc-dich-vu-loai-van-de`) có thời gian **phản hồi** và **xử lý**. Đề xuất mặc định: Khẩn cấp 30 phút / 4 giờ; Cao 2 giờ / 1 ngày làm việc; Bình thường 4 giờ / 3 ngày làm việc (OQ-2). Nhập số + đơn vị (phút/giờ/ngày làm việc); xử lý phải ≥ phản hồi. Thêm mức ưu tiên mới ở danh mục thì hiện dòng **trống** ở đây; ticket KHÔNG chọn được mức đó cho tới khi Quản trị viên điền đủ 2 giá trị (đã chốt 23/09/2026 — mức ưu tiên mới bị chặn dùng ở form tạo ticket cho tới khi cấu hình xong SLA). |
| 4 | Ngưỡng cảnh báo | Textbox (số %) | Text | • Cảnh báo "sắp quá hạn" khi còn ngần này % thời gian (đề xuất 20%); dùng cho màn `agent-canh-bao-sla`. Khoảng hợp lệ 1-90 (đã chốt 23/09/2026). |
| 5 | Tạm dừng đồng hồ | Checkbox group | Check | • Trạng thái ticket làm **tạm dừng** đồng hồ SLA (đề xuất: Chờ khách hàng, Chờ khách hàng xác nhận) vì đang chờ phía khách hàng. |
| 6 | Thời gian tự đóng | Textbox (số) | Text | • Số ngày làm việc từ lúc ticket ở "Chờ khách hàng xác nhận" tới khi **tự đóng** nếu khách hàng không phản hồi (đề xuất 3 ngày — OQ-1); hệ thống nhắc khách hàng trước 1 ngày. |
| 7 | Lưu | Button | Click | • **Disabled** khi chưa đổi gì hoặc có giá trị không hợp lệ; áp dụng cho ticket **tạo/cập nhật từ sau khi lưu** — ticket đang mở giữ SLA cũ (đã chốt 23/09/2026); báo "Đã lưu" (wording tạm). Ghi nhật ký thao tác cấu hình [GIẢ ĐỊNH]. Chỉ Quản trị viên (UC45, nhóm danh mục đầu vào). |

- Màn mới bổ sung ngày 19/09/2026 (userflow [52], UC45). Dữ liệu là giá trị đề xuất, đã được khách hàng xác nhận (21/09/2026). **Cập nhật 23/09/2026:** thêm khối "Danh sách ngày nghỉ lễ" (mục [2]) — đã vẽ bổ sung trên Figma cùng ngày.

#### Trạng thái phụ — giờ làm việc không hợp lệ

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│ Cấu hình SLA                                       Chỉ Quản trị viên │
├──────────────────────────────────────────────────────────────────────┤
│ Giờ làm việc [1]: T2-T6  Từ [17:00] đến [08:00]                      │
│ (!) Giờ bắt đầu phải nhỏ hơn giờ kết thúc.                           │
├──────────────────────────────────────────────────────────────────────┤
│ Mức ưu tiên      Phản hồi trong   Xử lý trong [3]  (giữ nguyên)      │
├──────────────────────────────────────────────────────────────────────┤
│ [7] [ Lưu ] (mờ)                                                     │
└──────────────────────────────────────────────────────────────────────┘
```

- Khác màn gốc: giờ bắt đầu lớn hơn hoặc bằng giờ kết thúc → (!) lỗi tại ô [1]; [7] Lưu mờ [wording tạm, chưa có mã E-…].


---

## Screen: cauhinh-onebss — Kết nối OneBSS

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│ Kết nối OneBSS                                     [Đã kết nối]      │
├──────────────────────────────────────────────────────────────────────┤
│ Địa chỉ dịch vụ [1] [https://onebss.example.vn/api/v1_______]        │
│ Client ID [2]       [csskh-integration___________________]           │
│ Client secret [3]   [**************] (đã lưu, nhập mới để thay)      │
│ [4] (i) Kết nối OneBSS thành công                                    │
│     Phản hồi 240 ms, kiểm tra lúc 21/09 09:12                        │
│ [5] [ Kiểm tra kết nối ]   [6] [ Lưu cấu hình ]                      │
├──────────────────────────────────────────────────────────────────────┤
│ Dữ liệu đẩy sang OneBSS [7]: KH/site, mô tả + ưu tiên, lịch sử,      │
│ người tạo. Mọi agent gửi trực tiếp, không có bước xác nhận.          │
├──────────────────────────────────────────────────────────────────────┤
│ Nhật ký gửi phiếu gần đây [8]                                        │
│ 21/09 09:05  #T-0123  OB-2026-0456         Thành công                │
│ 20/09 16:40  #T-0121  OB-2026-0449         Thành công                │
│ 20/09 11:12  #T-0118  (chưa có mã)         Lỗi - không phản hồi      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Địa chỉ dịch vụ OneBSS | Textbox | Text | • **Bắt buộc**, đúng dạng địa chỉ web (https). |
| 2 | Client ID | Textbox | Text | • **Bắt buộc**; mã định danh hệ thống CSKH khi làm việc với OneBSS. |
| 3 | Client secret | Password | Text | • Che ký tự; **đã lưu thì không hiển thị lại**, chỉ nhập mới để thay (cùng cách xử lý API key ở `cauhinh-tich-hop-ai`, OQ-22a). Chỉ Quản trị viên xem/sửa. |
| 4 | Kết quả kiểm tra | Alert | ReadOnly | • Thành công: thời gian phản hồi + thời điểm kiểm tra. Thất bại: nguyên nhân chung (không phản hồi sau 30 giây, kiểm tra địa chỉ/mã client), **không lộ chi tiết kỹ thuật hay secret**. |
| 5 | Kiểm tra kết nối | Button | Click | • Gọi thử OneBSS bằng cấu hình đang nhập; khóa khi đang kiểm tra. Lỗi → giữ màn, cho sửa và thử lại. |
| 6 | Lưu cấu hình | Button | Click | • **Disabled** khi chưa đổi gì hoặc thiếu [1]/[2]; áp dụng cho lần gửi phiếu sau; ghi nhật ký thao tác. |
| 7 | Dữ liệu đẩy sang OneBSS | List | ReadOnly | • Khách hàng/site, mô tả + mức ưu tiên, lịch sử trao đổi liên quan, người tạo (Đề xuất — Tích hợp OneBSS mục 2). Người có quyền xử lý ticket tầng Tỉnh/Helpdesk gửi thẳng, không qua bước xác nhận (UC6; bỏ bước xác nhận của Agent trung tâm từ v1.1, 24/09/2026); lý do chuyển: lỗi hệ thống / cần đội dự án. |
| 8 | Nhật ký gửi phiếu gần đây | Table | ReadOnly | • Thời gian, ticket, mã phiếu OneBSS, kết quả (Thành công / Lỗi). Chứa dữ liệu khách hàng nên **chỉ Quản trị viên xem**; dòng lỗi chưa có mã phiếu. |

- **Đề xuất bổ sung theo thiết kế Figma (21/09/2026), đã chốt (OQ-29).** Trước khi Thử lại ở `agent-tao-phieu-onebss` phải kiểm tra ticket đã có mã phiếu chưa. Vào từ `cauhinh-hub`.

#### Trạng thái phụ — kết nối thất bại

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Site: Toàn hệ thống | Vai trò: Quản trị viên   (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│ Kết nối OneBSS                                     [Lỗi kết nối]     │
├──────────────────────────────────────────────────────────────────────┤
│ Địa chỉ dịch vụ [1] [https://onebss.example.vn/api/v1_______]        │
│ Client ID [2]       [csskh-integration___________________]           │
│ Client secret [3]   [**************] (đã lưu, nhập mới để thay)      │
│ [4] (!) Kết nối OneBSS thất bại                                      │
│     Không nhận phản hồi sau 30 giây. Kiểm tra địa chỉ, mã client.    │
│ [5] [ Kiểm tra kết nối ]   [6] [ Lưu cấu hình ]                      │
├──────────────────────────────────────────────────────────────────────┤
│ Dữ liệu đẩy sang OneBSS [7]: KH/site, mô tả + ưu tiên, lịch sử,      │
│ người tạo. Mọi agent gửi trực tiếp, không có bước xác nhận.          │
├──────────────────────────────────────────────────────────────────────┤
│ Nhật ký gửi phiếu gần đây [8]                                        │
│ 21/09 09:05  #T-0123  OB-2026-0456         Thành công                │
│ 20/09 16:40  #T-0121  OB-2026-0449         Thành công                │
│ 20/09 11:12  #T-0118  (chưa có mã)         Lỗi - không phản hồi      │
└──────────────────────────────────────────────────────────────────────┘
```

- Khác màn gốc: [4] báo "Kết nối OneBSS thất bại" kèm gợi ý kiểm tra địa chỉ/mã client; nhãn trạng thái "Lỗi kết nối"; các trường giữ nguyên để sửa.


---

## Đề xuất đã cập nhật (đã chốt với khách hàng 21/09/2026)

| Mã | Nội dung cần chốt | Đề xuất | Trạng thái |
|----|-------------------|---------|------------|
| OQ-22a | Provider, giới hạn, ngưỡng, top-k | Anthropic Claude + mô hình nội bộ VNPT; giới hạn request theo ngày, vượt thì AI báo bận và gợi ý ticket; ngưỡng tin cậy 0,70 (0,50-0,95); top-k 5 (1-10); AI tự động chỉ chọn theo mức ưu tiên (Bình thường/Cao). | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-22b | Thử nghiệm AI | Không tính vào giới hạn của khách; có tính chi phí, ghi nhật ký nhãn "Thử nghiệm". | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-22c | Chi phí, nhật ký AI | Chi phí = token × đơn giá (QT nhập); email QT khi đạt 80% ngân sách tháng; nhật ký giữ 12 tháng, chỉ QT xem. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-22d | Xóa mục danh mục | Mục đã dùng → "Ngừng dùng" (ẩn khỏi form, giữ dữ liệu); chưa dùng → xóa được. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-22e | Brandname SMS; kênh theo khách hàng | Brandname ≤11 ký tự không dấu, VNPT IT đăng ký với nhà mạng; MVP chọn kênh theo loại thông báo, ghi đè theo khách hàng để giai đoạn sau. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-19a | Màn cấu hình SLA | Đã thêm `cauhinh-sla` [52]: giờ làm việc, SLA theo mức ưu tiên, ngưỡng cảnh báo, tạm dừng đồng hồ, thời gian tự đóng ticket. **Bổ sung 23/09/2026:** thêm khối "Danh sách ngày nghỉ lễ" (Quản trị viên tự thêm/sửa/xóa theo năm) — đồng hồ SLA loại trừ các ngày này. | Đã chốt (khách hàng xác nhận, 21/09/2026; bổ sung 23/09/2026) |
| OQ-26 | Mẫu nội dung Email/SMS (bổ sung OQ-22e) | Quản trị viên sửa tiêu đề/nội dung; bắt buộc giữ biến liên kết kích hoạt/đặt lại; có khôi phục mẫu mặc định; SMS cảnh báo khi vượt độ dài; thông báo trung lập của `kh-quen-mat-khau` không sửa được. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-29 | Kết nối OneBSS (bổ sung OQ-22a) | Cấu hình tại `cauhinh-onebss`, chỉ Quản trị viên; bí mật client che và chỉ nhập lại để thay; nhật ký gửi phiếu chỉ Quản trị viên xem; kiểm tra mã phiếu trước khi thử lại. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
