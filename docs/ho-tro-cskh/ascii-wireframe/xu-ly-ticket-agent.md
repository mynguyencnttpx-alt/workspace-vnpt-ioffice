# Flow: Agent xử lý ticket

> Màn hình thuộc flow này: agent-hang-doi → agent-chi-tiet-ticket → agent-phan-cong → agent-tao-phieu-onebss → agent-canh-bao-sla. Flow tổng xem `../srs/ho-tro-cskh-userflow.md` Mục 1.
>
> Các mục ghi "(OQ-n)" đã được **khách hàng xác nhận (21/09/2026)** ở bảng cuối file (cập nhật 19/09/2026), cũng đã ghi vào tài liệu "Đề xuất Hệ thống Hỗ trợ & Chăm sóc Khách hàng.docx".
>
> **Cập nhật 23/09/2026 (khách hàng xác nhận, qua phiên chốt SRS):** ticket "Đã đóng" KHÔNG mở lại được trong mọi trường hợp — cả khách hàng và agent (đồng bộ với `gui-theo-doi-ticket.md`); bấm dòng ở Cảnh báo SLA mở thẳng màn Xử lý ticket; job cảnh báo SLA chỉ tính ticket còn đang mở tại thời điểm quét.
>
> **Cập nhật 24/09/2026 (v1.1 — mô hình hỗ trợ & định tuyến theo địa bàn, khách hàng xác nhận):** hàng đợi theo **tầng tiếp nhận** (Tỉnh X / Helpdesk công ty / Triển khai Line) + phạm vi phụ trách, thay "team"; **bỏ Chuyển cấp** ở màn Phân công; **bỏ màn Xác nhận tạo phiếu OneBSS** (gửi thẳng, chỉ ticket tầng Tỉnh/Helpdesk; tầng Triển khai Line chuyển Jira ở giai đoạn sau); thêm vai trò Agent helpdesk; "Hỗ trợ trung tâm" và "Hỗ trợ dịch vụ" gộp thành Triển khai của Line (24/09/2026); Triển khai của Line xử lý đầy đủ ticket mọi tầng; ghi chú nội bộ không phát sinh thông báo. Nguồn: `SRS/xu-ly-ticket-agent/SRS.md` v1.1.
>
> **Cập nhật 25/09/2026 (bố cục tiêu chí tìm kiếm):** thanh lọc ở các màn danh sách xếp theo **lưới 4 cột cố định** — nhãn nằm trên ô nhập, các ô cùng chiều rộng và thẳng cột; quá 4 tiêu chí thì xuống hàng theo lưới, checkbox chiếm 2 cột; không còn xếp nhãn + ô nhập nối tiếp theo độ dài trường. Đồng bộ với frame Figma.

---

## Screen: agent-hang-doi — Bảng tiếp nhận ticket

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│ Hàng đợi - Tầng [v: Triển khai Line] [1]    [2] [ ! 3 cảnh báo SLA ] │
├──────────────────────────────────────────────────────────────────────┤
│ Trạng thái [3]   Ưu tiên          Dịch vụ          Khách hàng [4]    │
│ [v: Tất cả     ] [v: Tất cả     ] [v: Tất cả     ] [______________]  │
│ Địa bàn [8]                                                          │
│ [v: Tất cả     ] [ ] Chỉ ticket AI đã tự trả lời                     │
│ [x] Chỉ phạm vi của tôi [7]                                          │
├──────────────────────────────────────────────────────────────────────┤
│ Mã      Khách hàng   Vấn đề            Ưu tiên   Trạng thái   SLA [5]│
│ -------------------------------------------------------------------- │
│ #T-0123 UBND Q.1     Không ký số được  Khẩn cấp  Mới          Quá hạn│
│ #T-0121 Sở Nội vụ    Lỗi tải tệp (AI)  Bình thư  Đang xử lý   Còn 6h │
│ #T-0118 UBND P.3     Phân quyền        Cao       Chờ KH       Sắp hết│
│                                                                      │
│ [6] Trang 1/2                                                        │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Tầng đang xem | Label / Dropdown | Select | • Agent tỉnh, Agent helpdesk: nhãn cố định tầng của mình (vd "Tỉnh Bình Định", "Helpdesk công ty"), không đổi.<br>• Triển khai của Line, Quản trị viên: dropdown "Tất cả tầng" / từng tầng; mặc định Triển khai của Line → tầng Triển khai của Line và Quản trị viên → Tất cả tầng. Xem "Tất cả tầng" thì bảng thêm cột **Tầng**.<br>• Tầng của ticket ghi cố định lúc tạo theo Địa bàn + Hình thức hỗ trợ của khách hàng (`quan-tri-nguoi-dung` Chức năng 1 BR-01); đổi định tuyến sau chỉ ảnh hưởng ticket mới. Hình vẽ ở góc nhìn Triển khai của Line. |
| 2 | Cảnh báo SLA | Button (badge) | Click | • Hiện số ticket sắp/đã quá hạn SLA trong phạm vi xem của người dùng; bấm → `agent-canh-bao-sla`. Ẩn khi không có cảnh báo [GIẢ ĐỊNH]. |
| 3 | Bộ lọc trạng thái / ưu tiên / dịch vụ | Dropdown | Select | • Trạng thái: Mới / Đang xử lý / Chờ khách hàng / Chờ khách hàng xác nhận / Đã đóng. Ưu tiên: Khẩn cấp / Cao / Bình thường. Dịch vụ: iOffice/iStorage… Kết hợp được nhiều bộ lọc; đổi giá trị → lọc lại ngay. |
| 4 | Lọc khách hàng + AI đã tự trả lời | Textbox + Checkbox | Text / Check | • Ô khách hàng: tìm theo tên đơn vị/site. Checkbox **"Chỉ ticket AI đã tự trả lời"** lọc các ticket AI đã gửi phản hồi tự động (UC36) để agent review/can thiệp — chỉ có ý nghĩa khi chế độ AI tự động phản hồi được bật (`cauhinh-tham-so-ai`). |
| 5 | Bảng ticket | Table | Select | • Cột: Mã, Khách hàng, Vấn đề, Ưu tiên, Trạng thái, SLA (Còn …/Sắp hết/Quá hạn). Bấm 1 dòng → `agent-chi-tiet-ticket` (nhận xử lý). Đuôi "(AI)" = đã được AI tự trả lời.<br>• Sắp xếp mặc định: ưu tiên/hạn SLA gần nhất trước [GIẢ ĐỊNH].<br>• Ticket mới do định tuyến tự động; quá hạn SLA **chỉ cảnh báo, không tự động phân công lại** (MVP).<br>• Empty: "Không có ticket nào phù hợp". |
| 6 | Phân trang | Pagination | Click | • 10 bản ghi/trang (đã chốt, OQ-11). |
| 7 | Chỉ phạm vi của tôi | Switch | Check | • **Không hiện với Agent tỉnh** (phạm vi phụ trách là giới hạn cứng, luôn áp dụng). Agent helpdesk, Triển khai của Line: **bật mặc định**, tắt để xem phần còn lại trong quyền của vai trò (bộ lọc mặc định). Quản trị viên: không có công tắc.<br>• "Trong phạm vi" = dịch vụ của ticket trùng dòng phạm vi VÀ khách hàng thuộc đối tượng của dòng đó; nhiều dòng cộng dồn (`quan-tri-nguoi-dung` Chức năng 4 BR-08). |
| 8 | Lọc địa bàn | Dropdown | Select | • Chỉ hiện khi người xem có thể xem nhiều hơn 1 tầng (Triển khai của Line, Quản trị viên): chọn 1 tỉnh/TP hoặc Trung ương; kết hợp với các bộ lọc khác. |

- Header nội bộ dùng chung (không đánh số). Ticket mới chưa phân công hiện cho nhân viên tầng đó có phạm vi bao ticket (Agent tỉnh không xem được ticket ngoài phạm vi, mở link cũ → `loi-403`). Dữ liệu mẫu chỉ minh họa; "Bình thư" là viết tắt để vừa khung.


---

## Screen: agent-chi-tiet-ticket — Xử lý ticket

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│ [1] < Về hàng đợi >                                                  │
├──────────────────────────────────────────────────────────────────────┤
│ #T-0123  Không ký số được  [Khẩn cấp] [2] Trạng thái [v: Đang xử lý] │
│ Khách hàng: UBND Q.1 | Tầng: Tỉnh BĐ | iOffice | Loại: Lỗi ký số     │
│ Người xử lý: Trần Thị B [3] [ Phân công ]          SLA: còn 3h [4]   │
│ [5] Đã trả lời tự động bởi AI - cần review      [ Can thiệp ]        │
├──────────────────────────────────────────────────────────────────────┤
│ Trao đổi [6]                                                         │
│ 17/09 08:02  KH: Ký số báo lỗi 403 khi ký văn bản đi.                │
│ 17/09 08:03  AI (tự động): Bạn kiểm tra vai trò ký của tài khoản...  │
│ 17/09 09:20  [Ghi chú nội bộ] Đã kiểm tra, cần cấp lại quyền ký.     │
├──────────────────────────────────────────────────────────────────────┤
│ Phiếu OneBSS: chưa có                 [7] [ Chuyển OneBSS ]          │
│ [14] < Tạo FAQ từ ticket này >   (khi ticket đã giải quyết)          │
├──────────────────────────────────────────────────────────────────────┤
│ [8] (*) Phản hồi công khai  ( ) Ghi chú nội bộ                       │
│ [9] [Nhập nội dung phản hồi...______________________________________]│
│ [10] [ Mẫu trả lời ] [11] [ AI gợi ý ] [12] [ Đính kèm ] [13] [ Gửi ]│
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Về hàng đợi | Link | Click | • Navigate → `agent-hang-doi`. |
| 2 | Trạng thái ticket | Dropdown | Select | • Người có quyền xử lý ticket cập nhật: Mới / Đang xử lý / Chờ khách hàng / Chờ khách hàng xác nhận / Đã đóng (Đề xuất — Xử lý ticket, UC5). Đổi → lưu, ghi mốc thời gian, **báo khách hàng qua Email/SMS** (theo kênh đã bật).<br>• Chọn "Chờ khách hàng xác nhận" → khách hàng thấy màn `ticket-xac-nhan`; hết thời gian cấu hình không phản hồi → hệ thống tự đóng (UC35, OQ-1).<br>• Ticket "Đã đóng" (dù khách hàng tự xác nhận hay hệ thống tự động đóng) KHÔNG mở lại được trong mọi trường hợp — cả khách hàng và agent đều không có lối mở lại (cập nhật 23/09/2026, xem `gui-theo-doi-ticket.md`). |
| 3 | Phân công | Button | Click | • Click → `agent-phan-cong` (phân công lại). Chỉ người có quyền xử lý ticket thấy nút (Agent tỉnh/Agent helpdesk cùng tầng, Triển khai của Line, Quản trị viên). Người xử lý là agent đã nhận ticket; chưa có người → hiện nút "Nhận xử lý" thay cho tên [GIẢ ĐỊNH]. |
| 4 | SLA còn lại | Label | ReadOnly | • Thời gian còn lại theo mức ưu tiên (khẩn cấp/cao/bình thường); đổi màu khi sắp/đã quá hạn. Ngưỡng cụ thể: OQ-2; màn cấu hình SLA: OQ-19. |
| 5 | Nhãn phản hồi tự động của AI | Banner + Button | Click | • **Chỉ hiện khi** ticket đã được AI tự soạn & gửi phản hồi (UC36, chế độ tự động bật). Gắn nhãn "phản hồi tự động" để agent theo dõi và **can thiệp** nếu cần (Đề xuất — AI tự động phản hồi).<br>• [ Can thiệp ] → agent nhận ticket, soạn phản hồi bổ sung/thay thế (khách hàng vẫn thấy phản hồi AI trước đó — chưa có nguồn về việc thu hồi).<br>• Ticket khẩn cấp luôn cần agent duyệt trước khi AI gửi (cấu hình ở `cauhinh-tham-so-ai`) nên không có nhãn này. |
| 6 | Trao đổi | Timeline | ReadOnly | • Toàn bộ trao đổi theo thời gian: **phản hồi công khai** (khách hàng thấy) và **ghi chú nội bộ** (chỉ agent thấy, có nhãn [Ghi chú nội bộ] và nền khác).<br>• Hiện kèm tệp đính kèm khách hàng gửi. Mỗi lần đóng thêm 1 mốc; KHÔNG còn mốc "mở lại" (ticket đã đóng không mở lại được, cập nhật 23/09/2026). |
| 7 | Chuyển OneBSS | Button | Click | • Dùng khi ticket **vượt khả năng xử lý** (lỗi hệ thống, cần đội dự án). Chỉ hiện với ticket **tầng Tỉnh hoặc Helpdesk công ty** và người có quyền xử lý ticket đó (Agent tỉnh, Agent helpdesk, Triển khai của Line, Quản trị viên) → `agent-tao-phieu-onebss` (gửi thẳng, không qua bước xác nhận trung gian; bỏ màn xác nhận từ v1.1).<br>• Ticket tầng Triển khai Line: **không** có nút OneBSS — vượt khả năng thì chuyển Jira (giai đoạn sau, ngoài MVP).<br>• **Khách hàng không có quyền** tự tạo phiếu OneBSS. Đã có phiếu → hiện mã phiếu + liên kết, ẩn nút. |
| 8 | Loại nội dung gửi | Radio group | Check | • Phản hồi công khai (mặc định) hoặc Ghi chú nội bộ — quyết định ai thấy nội dung ở [6]. Ghi chú nội bộ **không gửi thông báo cho khách hàng** và không phát sinh thông báo nào (đã chốt 24/09/2026). |
| 9 | Nội dung | Textbox (multi-line) | Text | • **Bắt buộc** khi gửi. Có thể chèn từ mẫu trả lời [10] hoặc gợi ý AI [11] rồi chỉnh sửa. Giới hạn độ dài: chưa có nguồn. |
| 10 | Mẫu trả lời | Button → Panel | Click | • Mở **panel bên phải** liệt kê thư viện mẫu trả lời dựng sẵn (do quản trị viên quản lý ở `danhmuc-dich-vu-loai-van-de`), có tìm kiếm; chọn 1 mẫu → chèn vào [9] để agent **tùy chỉnh trước khi gửi**. Cũng gắn/tham chiếu được bài KB có sẵn để trả lời nhanh (Đề xuất — Xử lý ticket). |
| 11 | AI gợi ý | Button → Panel | Click | • Agent yêu cầu AI soạn gợi ý dựa trên kho tài liệu + ticket tương tự đã xử lý (UC7). Panel hiện nội dung gợi ý kèm nguồn; agent **xem, chỉnh sửa rồi mới gửi** — không gửi tự động.<br>• Khi gửi phản hồi có dùng gợi ý AI → hệ thống lưu và **gắn nhãn "có hỗ trợ AI"**.<br>• Chế độ "AI hỗ trợ soạn" tắt (theo dịch vụ/site) → ẩn/vô hiệu nút. Lỗi kết nối AI → báo, agent soạn tay [wording chưa có, chưa có mã E-…]. Ẩn với Hỗ trợ dịch vụ (không dùng AI gợi ý phản hồi). |
| 12 | Đính kèm | File upload | Select | • Đính kèm ảnh/file vào phản hồi; định dạng/dung lượng: OQ-16. |
| 13 | Gửi | Button | Click | • **Disabled** khi [9] rỗng; khóa khi submitting. Gửi phản hồi công khai → lưu lịch sử, thông báo khách hàng qua Email/SMS; trạng thái "Mới" tự chuyển "Đang xử lý" [GIẢ ĐỊNH]. Sau khi gửi về `agent-hang-doi` hoặc ở lại màn [GIẢ ĐỊNH — userflow: quay về hàng đợi]. |
| 14 | Tạo FAQ từ ticket này | Link | Click | • Chỉ hiện với **ticket đã giải quyết** (trạng thái Chờ khách hàng xác nhận hoặc Đã đóng), dành cho Agent/Quản trị viên. Click → `kb-tu-ticket-thanh-faq` với ticket này đã chọn sẵn; bản nháp FAQ phải ẩn danh dữ liệu khách hàng và vẫn qua duyệt (OQ-21e). |

- Vẽ ở trạng thái có nhãn AI tự trả lời [5] (chỉ hiện khi áp dụng). Panel "Mẫu trả lời" [10] và "AI gợi ý" [11] mở dạng panel bên phải trong cùng màn, không phải màn riêng (đúng userflow đã duyệt). Quản trị viên xem cùng màn với phạm vi toàn hệ thống (UC22).

- Bổ sung 21/09/2026: panel AI soạn phản hồi chỉ hiện khi chế độ "AI soạn" bật cho dịch vụ/site; AI tắt hoặc lỗi/quá thời gian → ẩn panel/báo lỗi ngắn, agent soạn phản hồi thủ công (OQ-15).


---

## Screen: agent-phan-cong — Phân công ticket

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│       ┌──────────────────────────────────────────────────────┐       │
│       │ Phân công ticket  #T-0123                            │       │
│       │                                                      │       │
│       │ Đang xử lý bởi: Trần Thị B (Tầng Tỉnh Bình Định)     │       │
│       ├──────────────────────────────────────────────────────┤       │
│       │ [1] (*) Phân công cho nhân viên cùng tầng            │       │
│       │         [v: Chọn nhân viên (đủ phạm vi)          ]   │       │
│       │ [2] ( ) Tự gán theo khối lượng việc                  │       │
│       │                                                      │       │
│       │ Ghi chú cho người nhận                               │       │
│       │ [3] [____________________________________________]   │       │
│       ├──────────────────────────────────────────────────────┤       │
│       │ [4] [ Xác nhận ]     [5] [   Hủy   ]                 │       │
│       └──────────────────────────────────────────────────────┘       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Phân công thủ công | Radio + Dropdown | Select | • Chọn nhân viên **cùng tầng của ticket**, đang hoạt động, có phạm vi phụ trách bao ticket (Agent tỉnh ngoài phạm vi không xem được ticket nên không chọn được). Dropdown chỉ liệt kê nhân viên đủ điều kiện.<br>• Nhân viên chỉ phân công ticket chưa có người xử lý trong tầng mình, hoặc chuyển cho đồng nghiệp đủ điều kiện; **chỉ Quản trị viên và Triển khai của Line** phân công lại được ticket đang do người khác xử lý (OQ-19b, cập nhật 24/09/2026).<br>• Không có nhân viên đủ điều kiện → xem Trạng thái phụ. |
| 2 | Tự gán theo khối lượng | Radio | Check | • Hệ thống tự chọn, trong số nhân viên đủ điều kiện ở [1], người có ít ticket đang mở nhất (Mới, Đang xử lý, Chờ khách hàng); bằng nhau thì luân phiên (OQ-19b). |
| 3 | Ghi chú | Textbox (multi-line) | Text | • Không bắt buộc [GIẢ ĐỊNH]; ghi vào lịch sử nội bộ, chỉ nhân viên nội bộ thấy. |
| 4 | Xác nhận | Button | Click | • **Disabled** khi chưa chọn tùy chọn (và chưa chọn nhân viên nếu chọn [1]). Thành công → cập nhật người phụ trách, báo nhân viên được gán (thông báo trong ứng dụng), ghi nhật ký phân công ticket, về `agent-hang-doi`.<br>• **Không có Chuyển cấp** (bỏ từ v1.1, đã chốt 24/09/2026): ticket không chuyển giữa các tầng; tầng Tỉnh/Helpdesk không xử lý được thì chuyển OneBSS (`agent-tao-phieu-onebss`), tầng Triển khai Line chuyển Jira (giai đoạn sau, ngoài MVP). |
| 5 | Hủy | Button | Click | • Đóng màn, quay về `agent-chi-tiet-ticket`, không đổi gì. |

#### Trạng thái phụ — không có nhân viên phù hợp

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│       ┌──────────────────────────────────────────────────────┐       │
│       │ Phân công ticket  #T-0121                            │       │
│       │                                                      │       │
│       │ Đang xử lý bởi: (chưa có)                            │       │
│       ├──────────────────────────────────────────────────────┤       │
│       │ [1] (*) Phân công cho nhân viên cùng tầng            │       │
│       │         [v: (không có nhân viên phù hợp)         ]   │       │
│       │ (!) Chưa có nhân viên nào được phân công phạm vi     │       │
│       │     phù hợp với ticket này. Liên hệ Quản trị viên.   │       │
│       ├──────────────────────────────────────────────────────┤       │
│       │ [4] [ Xác nhận ] (mờ)     [5] [   Hủy   ]            │       │
│       └──────────────────────────────────────────────────────┘       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- Khác màn gốc: không có nhân viên nào thuộc tầng của ticket, đang hoạt động và có phạm vi bao ticket → báo "Chưa có nhân viên nào được phân công phạm vi phù hợp với ticket này. Liên hệ Quản trị viên." (wording tạm, chưa có mã E-…); [4] mờ, ticket giữ nguyên.


---

## Screen: agent-tao-phieu-onebss — Tạo phiếu OneBSS (tầng Tỉnh/Helpdesk)

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Tầng: Tỉnh Bình Định | Vai trò: Agent tỉnh     (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│     ┌──────────────────────────────────────────────────────────┐     │
│     │ Chuyển OneBSS  #T-0123  (tầng Tỉnh)                      │     │
│     │                                                          │     │
│     │ [1] Thông tin gửi tự động sang OneBSS:                   │     │
│     │     - Khách hàng/site: UBND Q.1 - iOffice                │     │
│     │     - Mô tả vấn đề, mức ưu tiên: Khẩn cấp                │     │
│     │     - Lịch sử trao đổi liên quan (3)                     │     │
│     ├──────────────────────────────────────────────────────────┤     │
│     │ Lý do chuyển [2] [v: Lỗi hệ thống              ]         │     │
│     │ Ghi chú gửi kèm [3] [________________________]           │     │
│     ├──────────────────────────────────────────────────────────┤     │
│     │ [4] [ Gửi sang OneBSS ]   [5] [ Hủy ]                    │     │
│     └──────────────────────────────────────────────────────────┘     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Thông tin gửi | Label list | ReadOnly | • Dữ liệu đẩy sang OneBSS: thông tin khách hàng/site, mô tả vấn đề, mức ưu tiên, lịch sử trao đổi liên quan, người tạo (Đề xuất — Tích hợp OneBSS mục 2); chỉ xem, nhân viên không chỉnh. Chỉ ticket **tầng Tỉnh hoặc Helpdesk công ty** được chuyển OneBSS. |
| 2 | Lý do chuyển | Dropdown | Select | • **Bắt buộc**: Lỗi hệ thống / Cần đội dự án / Khác (OQ-19c); chưa chọn → không gửi được và báo lỗi tại ô [wording tạm, chưa có mã E-…]. Gửi kèm sang OneBSS. |
| 3 | Ghi chú gửi kèm | Textarea | Text | • Không bắt buộc; gửi kèm sang OneBSS cùng lý do (OQ-19c). |
| 4 | Gửi sang OneBSS | Button | Click | • **Gửi trực tiếp — không có bước xác nhận trung gian** (UC6, đã chốt 24/09/2026): bấm là hệ thống gọi API tạo phiếu, nhận mã phiếu, lưu liên kết vào ticket gốc và cập nhật trạng thái ticket. **Disabled** tới khi chọn [2]; khóa khi đang gửi (chống bấm đúp) — xem Trạng thái phụ Đang gửi / Đã gửi / Gửi lỗi. Chỉ người có quyền xử lý ticket đó (Agent tỉnh/Agent helpdesk cùng tầng, Triển khai của Line, Quản trị viên); Hỗ trợ dịch vụ không có quyền và xử lý phiếu trên hệ thống OneBSS. |
| 5 | Hủy | Button | Click | • Về `agent-chi-tiet-ticket`, không gửi gì, ticket giữ nguyên. |
| 6 | Kết quả gửi | Label / Message | ReadOnly | • Các trạng thái loại trừ (chỉ 1 hiện tại 1 thời điểm), xem Trạng thái phụ: **Đang gửi** (chờ, không đóng trang) → **Đã gửi**: hiện mã phiếu OneBSS, lưu liên kết để tra cứu 2 chiều và cập nhật trạng thái ticket → **Gửi lỗi** (OneBSS không phản hồi/từ chối): báo lỗi, chưa lưu liên kết, ticket giữ nguyên. MVP chỉ đẩy một chiều (push kèm mã tham chiếu). |
| 7 | Quay lại ticket | Button | Click | • Về `agent-chi-tiet-ticket`, nay hiện mã phiếu OneBSS + liên kết và ẩn nút "Chuyển OneBSS". |
| 8 | Thử lại | Button | Click | • Chỉ hiện ở trạng thái Gửi lỗi: **kiểm tra ticket đã có mã phiếu chưa** (OQ-29) — chưa có thì gửi lại; đã có thì hiện mã phiếu, không tạo phiếu thứ hai. |

- Bản Figma (21/09/2026): màn mở ra dạng **form chọn lý do** rồi gửi; các trạng thái Đang gửi / Đã gửi / Gửi lỗi vẽ ở phần Trạng thái phụ (callout [6]–[8] tính riêng cho khối kết quả).

#### Trạng thái phụ — đang gửi

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Tầng: Tỉnh Bình Định | Vai trò: Agent tỉnh     (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│     ┌──────────────────────────────────────────────────────────┐     │
│     │ Chuyển OneBSS  #T-0123  (tầng Tỉnh)                      │     │
│     │                                                          │     │
│     │ Lý do: Lỗi hệ thống - Ghi chú: (không)                   │     │
│     ├──────────────────────────────────────────────────────────┤     │
│     │ [6] Đang gửi sang OneBSS...                              │     │
│     │     Vui lòng chờ, không đóng trang.                      │     │
│     ├──────────────────────────────────────────────────────────┤     │
│     │ [7] [ Quay lại ticket ]   [ Đang gửi... ] (mờ)           │     │
│     └──────────────────────────────────────────────────────────┘     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- Khác màn gốc: form đã khóa; khối [6] hiện "Đang gửi sang OneBSS..."; nút gửi mờ để chống bấm đúp; ticket giữ nguyên tới khi có mã phiếu; không bấm được [8] Thử lại.

#### Trạng thái phụ — đã gửi thành công

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Tầng: Tỉnh Bình Định | Vai trò: Agent tỉnh     (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│     ┌──────────────────────────────────────────────────────────┐     │
│     │ Chuyển OneBSS  #T-0123  (tầng Tỉnh)                      │     │
│     │                                                          │     │
│     │ Lý do: Lỗi hệ thống - Ghi chú: (không)                   │     │
│     ├──────────────────────────────────────────────────────────┤     │
│     │ [6] Đã gửi. Mã phiếu OneBSS: OB-2026-0456                │     │
│     │     Đã lưu liên kết vào ticket #T-0123.                  │     │
│     ├──────────────────────────────────────────────────────────┤     │
│     │ [7] [ Quay lại ticket ]                                  │     │
│     └──────────────────────────────────────────────────────────┘     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- Khác màn gốc: [6] báo mã phiếu OneBSS (chỉ nội bộ, khách hàng không thấy); [7] về `agent-chi-tiet-ticket` nay hiện mã phiếu.

#### Trạng thái phụ — gửi lỗi

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB  Tầng: Tỉnh Bình Định | Vai trò: Agent tỉnh     (o) B v      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│     ┌──────────────────────────────────────────────────────────┐     │
│     │ Chuyển OneBSS  #T-0123  (tầng Tỉnh)                      │     │
│     │                                                          │     │
│     │ Lý do: Lỗi hệ thống - Ghi chú: (không)                   │     │
│     ├──────────────────────────────────────────────────────────┤     │
│     │ [6] (!) Gửi thất bại                                     │     │
│     │     OneBSS không phản hồi. Ticket giữ nguyên.            │     │
│     ├──────────────────────────────────────────────────────────┤     │
│     │ [7] [ Quay lại ticket ]   [8] [ Thử lại ]                │     │
│     └──────────────────────────────────────────────────────────┘     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- Khác màn gốc: [6] báo lỗi (OneBSS không phản hồi/từ chối), chưa lưu liên kết; hiện [8] Thử lại (kiểm tra mã phiếu trước khi gửi lại — OQ-29) và [7] Quay lại ticket (Hủy). Wording chưa có nguồn, chưa có mã E-….


---

## Screen: agent-canh-bao-sla — Cảnh báo quá hạn SLA

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│ Cảnh báo quá hạn SLA - Tầng Tỉnh Bình Định       [1] < Về hàng đợi > │
├──────────────────────────────────────────────────────────────────────┤
│ Hiển thị [2]     Ưu tiên                                             │
│ [v: Tất cả     ] [v: Tất cả     ]                                    │
├──────────────────────────────────────────────────────────────────────┤
│ Mã      Vấn đề           Ưu tiên  Hạn xử lý   Tình trạng  Xử lý [3]  │
│ -------------------------------------------------------------------- │
│ #T-0123 Không ký số được Khẩn cấp 17/09 10:00 Quá hạn 2h  Trần B     │
│ #T-0118 Phân quyền       Cao      17/09 13:30 Còn 45 phút Lê C       │
│ #T-0109 Lỗi in văn bản   Bình thư 18/09 09:00 Còn 20h     (chưa gán) │
│                                                                      │
│ [4] Ticket quá hạn chỉ cảnh báo, không tự phân công lại.             │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Về hàng đợi | Link | Click | • Navigate → `agent-hang-doi` (theo userflow: cảnh báo dẫn về hàng đợi). |
| 2 | Lọc | Dropdown | Select | • Tình trạng: Tất cả / Sắp quá hạn / Đã quá hạn; Ưu tiên: Khẩn cấp / Cao / Bình thường. Mặc định Tất cả. |
| 3 | Danh sách ticket cảnh báo | Table | Select | • Do job kiểm tra ticket theo ngưỡng SLA rồi **gửi cảnh báo cho người đang xử lý và Quản trị viên** (UC37; ticket chưa phân công thì gửi nhân viên tầng có phạm vi bao ticket); màn này tổng hợp các ticket đó. Cột: Mã, Vấn đề, Ưu tiên, Hạn xử lý, Tình trạng (Còn … / Quá hạn …), Người xử lý.<br>• Agent tỉnh, Agent helpdesk chỉ thấy ticket tầng mình (Agent tỉnh: trong phạm vi phụ trách); Triển khai của Line xem được mọi tầng (mặc định tầng mình); **Quản trị viên thấy mọi tầng** (chọn tầng ở tiêu đề).<br>• Bấm 1 dòng → mở luôn màn chi tiết Xử lý ticket (`agent-chi-tiet-ticket`) để xử lý ngay, không dừng lại ở hàng đợi (đã chốt 23/09/2026).<br>• Job chỉ tính ticket còn ở trạng thái đang mở (Mới/Đang xử lý/Chờ khách hàng) tại thời điểm quét; ticket vừa đổi trạng thái ngay lúc job đang chạy sẽ KHÔNG xuất hiện trong danh sách của lượt chạy đó (đã chốt 23/09/2026).<br>• Kênh gửi cảnh báo (trong hệ thống/Email/SMS): đã chốt (OQ-19). Empty: "Không có ticket nào sắp/quá hạn". |
| 4 | Ghi chú MVP | Label | ReadOnly | • MVP chưa tự động phân công lại theo SLA hay tự re-route khi tầng chỉ có 1 nhân viên hoạt động (nghỉ/ốm) — quá hạn chỉ cảnh báo, nhân viên/Quản trị viên xử lý thủ công. Tự động xử lý theo SLA thuộc Giai đoạn 4. |

- Dữ liệu mẫu chỉ minh họa; "Bình thư" viết tắt để vừa khung.


---

## Đề xuất đã cập nhật (đã chốt với khách hàng 21/09/2026)

| Mã | Nội dung cần chốt | Đề xuất | Trạng thái |
|----|-------------------|---------|------------|
| OQ-19a | Màn cấu hình SLA | Đã bổ sung màn `cauhinh-sla` [52] ở Flow 9 (cùng Giai đoạn 2). | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-19b | Nhận/phân công ticket; khối lượng việc | Nhân viên tự nhận ticket chưa gán trong tầng mình, chuyển được cho đồng nghiệp cùng tầng có phạm vi phụ trách bao ticket; chỉ Quản trị viên và Triển khai của Line phân công lại ticket đang do người khác xử lý (cập nhật 24/09/2026). Tự gán: chọn agent có ít ticket đang mở nhất (Mới, Đang xử lý, Chờ khách hàng), bằng nhau thì luân phiên. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-19c | Lý do chuyển OneBSS | Bắt buộc chọn (Lỗi hệ thống / Cần đội dự án / Khác) và gửi kèm ghi chú. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-19d | Kênh cảnh báo SLA | Trong hệ thống (huy hiệu + màn Cảnh báo) và Email cho agent phụ trách + Quản trị viên; SMS chỉ khi ticket Khẩn cấp quá hạn; cảnh báo khi còn 20% thời gian. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-29 | OneBSS: cấu hình kết nối và chống tạo trùng phiếu (bổ sung OQ-22a) | Cấu hình tại `cauhinh-onebss`, chỉ Quản trị viên; trước khi Thử lại kiểm tra ticket đã có mã phiếu; hủy được về ticket. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
