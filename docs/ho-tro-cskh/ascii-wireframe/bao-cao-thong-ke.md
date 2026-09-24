# Flow: Báo cáo & thống kê vận hành

> Màn hình thuộc flow này: baocao-tong-quan → baocao-hieusuat-sla → baocao-chatluong → baocao-xuat. Flow tổng xem `../srs/ho-tro-cskh-userflow.md` Mục 1.
>
> Các mục ghi "(OQ-n)" đã được **khách hàng xác nhận (21/09/2026)** ở bảng cuối file (cập nhật 19/09/2026), cũng đã ghi vào tài liệu "Đề xuất Hệ thống Hỗ trợ & Chăm sóc Khách hàng.docx".
>
> **Cập nhật 24/09/2026 (v1.1 — mô hình hỗ trợ & định tuyến theo địa bàn; khách hàng xác nhận):** đổi "Team" thành **Tầng tiếp nhận** (Tỉnh X / Helpdesk công ty / Hỗ trợ trung tâm); bỏ chỉ số "escalate tỉnh lên trung tâm" và ghi chú "không tự chuyển cấp" vì bỏ Chuyển cấp. Chưa có SRS riêng cho báo cáo — các thay đổi chỉ đồng bộ thuật ngữ, phạm vi báo cáo theo vai trò mới cần rà khi có SRS.

---

## Screen: baocao-tong-quan — Báo cáo tổng quan

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│ [*Tổng quan*] [Hiệu suất & SLA] [Chất lượng] [Xuất báo cáo] [1]      │
├──────────────────────────────────────────────────────────────────────┤
│ Kỳ [v: 09/2026][2] [x] So kỳ trước Tầng [v: Tất cả][3] DV [v: Tất cả]│
├──────────────────────────────────────────────────────────────────────┤
│ Đã tạo: 128 (+12%) | Đã xử lý: 110 (+8%) | Tồn đọng: 18 (-5%) [4]    │
├──────────────────────────────────────────────────────────────────────┤
│ Ticket theo trạng thái [5]                                           │
│ Mới          ####  12                                                │
│ Đang xử lý   ########  38                                            │
│ Chờ KH       ###  9                                                  │
│ Đã đóng      ################  69                                    │
├──────────────────────────────────────────────────────────────────────┤
│ Tầng           Đã tạo   Đang xử lý   Đã đóng    Tồn [6]              │
│ Hỗ trợ TT      45       12           30         8                    │
│ Tỉnh Bình Định 38       14           20         6                    │
│ Tỉnh Đà Nẵng   45       12           19         4                    │
│ Helpdesk CT    12       3            8          1                    │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Tab báo cáo | Tabs | Click | • 4 tab: Tổng quan (đang xem) / Hiệu suất & SLA / Chất lượng & nội dung / Xuất báo cáo → `baocao-hieusuat-sla` / `baocao-chatluong` / `baocao-xuat` (giữ nguyên bộ lọc kỳ/tầng/dịch vụ khi chuyển tab [GIẢ ĐỊNH]).<br>• **Phạm vi theo vai trò** (Đề xuất — Phân quyền xem báo cáo): Quản trị viên xem mọi tầng/tỉnh/dịch vụ; **Chủ quản dịch vụ** (chỉ xem) chỉ thấy phạm vi dịch vụ mình phụ trách, đây là màn landing mặc định sau đăng nhập; **Agent** chỉ xem báo cáo cơ bản trong phạm vi/tầng mình. Màn này không có nút sửa danh mục/quyền/nội dung. |
| 2 | Kỳ báo cáo + so sánh | Dropdown + Checkbox | Select / Check | • Kỳ: ngày / tuần / tháng / khoảng tùy chọn (Đề xuất — Tổng quan hoạt động hỗ trợ). Checkbox **So kỳ trước** hiện tỷ lệ tăng/giảm ở [4]; cách xác định kỳ trước: OQ-23. |
| 3 | Lọc tầng / địa bàn / dịch vụ / khách hàng | Dropdown | Select | • Tầng tiếp nhận (Tỉnh X, Helpdesk công ty, Hỗ trợ trung tâm), địa bàn, dịch vụ (iOffice/iStorage), khách hàng — chỉ liệt kê giá trị **trong phạm vi được xem**. Đổi bộ lọc → tải lại số liệu; đang tải hiện trạng thái chờ. |
| 4 | Số liệu chính | Label (KPI) | ReadOnly | • Số phiếu **đã tạo / đã xử lý / đang tồn đọng (backlog)** trong kỳ (UC50), kèm % so kỳ trước. Định nghĩa "đã xử lý"/"tồn đọng" theo trạng thái nào: OQ-23.<br>• **Không có dữ liệu trong khoảng lọc** → thay số liệu và biểu đồ bằng "Không có dữ liệu trong khoảng đã chọn" + gợi ý đổi bộ lọc. |
| 5 | Biểu đồ theo trạng thái | Chart | ReadOnly | • Số ticket theo trạng thái (Mới / Đang xử lý / Chờ khách hàng / Chờ xác nhận / Đã đóng); vẽ dạng cột ngang đơn giản. Có thể xem theo ngày/tuần/tháng. |
| 6 | Bảng theo tầng | Table | ReadOnly | • Số ticket theo tầng tiếp nhận, dịch vụ, khách hàng theo bộ lọc; bấm dòng để lọc sâu hơn [GIẢ ĐỊNH]. Chủ quản dịch vụ chỉ thấy các dòng thuộc dịch vụ mình. |

- Header nội bộ dùng chung (không đánh số). Số liệu, tên tầng/tỉnh là dữ liệu mẫu chỉ minh họa; biểu đồ vẽ dạng cột ngang bằng ký tự #. Đây cũng là màn landing của Chủ quản dịch vụ và là báo cáo cơ bản (giới hạn theo phạm vi) của Agent.

- Bản chính từ thiết kế Figma (21/09/2026): ngoài 3 thẻ số liệu [4] (đã tạo / đã xử lý / tồn đọng, kèm % so kỳ trước) còn hiện thêm thẻ "Quá hạn SLA" và khối "Đúng hạn SLA" + "AI deflection" — là số liệu tóm tắt của 2 tab `baocao-hieusuat-sla` và `baocao-chatluong` [GIẢ ĐỊNH, chờ khách hàng xác nhận]; bảng theo tầng hiện avatar viết tắt và nhãn Tồn theo màu.


---

## Screen: baocao-hieusuat-sla — Báo cáo hiệu suất & SLA

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│ [Tổng quan] [*Hiệu suất & SLA*] [Chất lượng] [Xuất báo cáo] [1]      │
├──────────────────────────────────────────────────────────────────────┤
│ Kỳ [v: 09/2026][2]  Xem theo [v: Tầng][3]  Phạm vi [v: Tất cả]       │
├──────────────────────────────────────────────────────────────────────┤
│ TB phản hồi: 1h20 | TB xử lý: 6h15 | Đúng hạn 91%  Quá hạn 9% [4]    │
│ Phiếu đã chuyển sang OneBSS: 9 (tầng Tỉnh/Helpdesk) [5]              │
├──────────────────────────────────────────────────────────────────────┤
│ Tầng / Tỉnh / Agent TB phản hồi  TB xử lý     Đúng hạn   Quá hạn [6] │
│ --------------------------------------------------------------       │
│ Hỗ trợ TT          1h05         7h10         88%        12%          │
│ Tỉnh Bình Định     1h30         5h40         93%        7%           │
│ Tỉnh Đà Nẵng       1h25         6h00         92%        8%           │
│                                                                      │
│ [7] Quá hạn SLA chỉ để theo dõi; không tự phân công lại.             │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Tab báo cáo | Tabs | Click | • Như `baocao-tong-quan` [1]. Chỉ **Quản trị viên và Chủ quản dịch vụ** thấy tab này (Đề xuất — Hiệu suất & SLA); Agent chỉ có báo cáo cơ bản trong phạm vi mình ở tab Tổng quan. |
| 2 | Kỳ báo cáo | Dropdown | Select | • Như tab Tổng quan. |
| 3 | Xem theo | Dropdown | Select | • Tầng / Tỉnh / Agent (đề xuất: theo tầng/tỉnh/agent). Chủ quản dịch vụ **không xem theo Agent** (thông tin cá nhân) [GIẢ ĐỊNH — nguồn chưa nói, OQ-23]. |
| 4 | Thời gian & SLA | Label (KPI) | ReadOnly | • Thời gian phản hồi trung bình, thời gian xử lý trung bình, **tỷ lệ ticket đúng hạn / quá hạn SLA** (UC51). Mốc bắt đầu/kết thúc, có trừ thời gian "Chờ khách hàng"/ngoài giờ làm việc không, ngưỡng SLA từng ưu tiên: OQ-2, OQ-19, OQ-23. |
| 5 | Chuyển OneBSS | Label (KPI) | ReadOnly | • Số phiếu đã chuyển sang OneBSS trong kỳ (chỉ ticket tầng Tỉnh/Helpdesk). Không còn chỉ số "escalate tỉnh lên trung tâm" vì bỏ Chuyển cấp từ v1.1 (đã chốt 24/09/2026). |
| 6 | Bảng chi tiết | Table | ReadOnly | • Số liệu theo lựa chọn [3]; sắp xếp theo cột; không có dữ liệu → thông báo trống như tab Tổng quan. |
| 7 | Ghi chú MVP | Label | ReadOnly | • Nhắc: MVP không tự động phân công lại theo SLA (giai đoạn 4); dữ liệu này để nhân viên/Quản trị viên tự quyết xử lý. |

- Dữ liệu mẫu chỉ minh họa.


---

## Screen: baocao-chatluong — Báo cáo chất lượng & nội dung

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│ [Tổng quan] [Hiệu suất & SLA] [*Chất lượng*] [Xuất báo cáo] [1]      │
├──────────────────────────────────────────────────────────────────────┤
│ Kỳ [v: 09/2026][2]  Dịch vụ [v: Tất cả][3]  Tỉnh [v: Tất cả]         │
├──────────────────────────────────────────────────────────────────────┤
│ CSAT trung bình: 4.5/5  |  AI deflection rate: 62%  [4]              │
├──────────────────────────────────────────────────────────────────────┤
│ Top lỗi/tình huống được hỏi nhiều nhất [5]                           │
│ 1. Lỗi 403 khi ký số                        48 lượt                  │
│ 2. Không tải được tệp đính kèm              31 lượt                  │
│ 3. Quên chọn phạm vi khi gửi VB             22 lượt                  │
├──────────────────────────────────────────────────────────────────────┤
│ KB hữu ích nhiều nhất [6]        | KB hữu ích ít nhất [7]            │
│ Hướng dẫn ký số VB đi   95%      | Quy trình gửi công văn  40%       │
│ Lỗi 403 khi ký số       90%      | Cấu hình phân quyền     45%       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Tab báo cáo | Tabs | Click | • Như `baocao-tong-quan` [1]; chỉ Quản trị viên và Chủ quản dịch vụ. |
| 2 | Kỳ báo cáo | Dropdown | Select | • Như tab Tổng quan. |
| 3 | Lọc dịch vụ / tỉnh | Dropdown | Select | • Phạm vi dịch vụ/tỉnh trong quyền xem (UC52: chọn phạm vi dịch vụ/tỉnh); Chủ quản dịch vụ chỉ dịch vụ mình phụ trách. |
| 4 | CSAT & AI deflection | Label (KPI) | ReadOnly | • **CSAT** = điểm hài lòng trung bình từ đánh giá khi đóng ticket (thang: OQ-3, số 4.5/5 chỉ minh họa). **AI deflection rate** = tỷ lệ câu hỏi AI tự trả lời được so với số phải chuyển thành ticket — chỉ số đánh giá hiệu quả kho tri thức (Đề xuất — Chất lượng & nội dung); công thức chính xác: OQ-23. Chưa có đánh giá → "Chưa có dữ liệu". |
| 5 | Top lỗi / tình huống | List | ReadOnly | • Lỗi/tình huống được hỏi nhiều nhất (từ tra cứu, hỏi đáp AI, ticket) — đầu vào để bổ sung KB, giảm ticket lặp lại. Bấm 1 dòng → mở bài liên quan hoặc `kb-tu-ticket-thanh-faq` [GIẢ ĐỊNH]. Nguồn thống kê "hỏi nhiều": OQ-23. |
| 6 | KB hữu ích nhiều nhất | List | ReadOnly | • Bài KB có tỷ lệ đánh giá hữu ích cao nhất (từ nút đánh giá ở `kb-chi-tiet-bai-viet`); ngưỡng số lượt tối thiểu để xếp hạng: OQ-23. |
| 7 | KB hữu ích ít nhất | List | ReadOnly | • Bài KB bị đánh giá ít hữu ích → **gợi ý cần bổ sung/nâng cấp nội dung**; bấm tên bài → `kb-danh-sach-noi-dung` để sửa [GIẢ ĐỊNH]. |

- Dữ liệu mẫu chỉ minh họa; 2 cột KB hữu ích nhiều/ít nhất đặt cạnh nhau vì cùng hiện đồng thời.


---

## Screen: baocao-xuat — Xuất báo cáo

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ CSKH-NB Ticket | Nội dung | Người dùng | Cấu hình | Báo cáo (o) B v  │
├──────────────────────────────────────────────────────────────────────┤
│ [Tổng quan] [Hiệu suất & SLA] [Chất lượng] [*Xuất báo cáo*] [1]      │
├──────────────────────────────────────────────────────────────────────┤
│ Chế độ [2]:  (*) Xuất ngay     ( ) Gửi tự động theo lịch             │
├──────────────────────────────────────────────────────────────────────┤
│ Loại báo cáo [3]  [v: Tổng quan hoạt động hỗ trợ]                    │
│ Khoảng thời gian [4]  Từ [__/__/____]  Đến [__/__/____]              │
│ Phạm vi [5]  Tầng [v: Tất cả]  Dịch vụ [v: Tất cả]                   │
│ Định dạng [6]  (*) Excel   ( ) PDF                                   │
│ [7] [ Xuất file ]                                                    │
├──────────────────────────────────────────────────────────────────────┤
│ Lịch gửi tự động đã cấu hình [8]                                     │
│ Hằng tuần T2 08:00 | Tổng quan | An, Bình (QT)     < Sửa > < Xóa >   │
│ Hằng tháng ngày 1  | Chất lượng | Chủ quản iOffice  < Sửa > < Xóa >  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Tab báo cáo | Tabs | Click | • Như `baocao-tong-quan` [1]. Chỉ **Quản trị viên và Chủ quản dịch vụ** xuất/cấu hình (UC53, UC39); Chủ quản dịch vụ chỉ trong phạm vi dịch vụ mình. |
| 2 | Chế độ | Radio group | Check | • **Xuất ngay** (tức thời, tải file) hoặc **Gửi tự động theo lịch** (cấu hình lịch tuần/tháng gửi cho người nhận — Đề xuất — Xuất báo cáo). Chọn chế độ thứ 2 thì [4]-[7] đổi thành: Tần suất (Hằng tuần/Hằng tháng) + thứ/ngày + giờ, Người nhận, Loại báo cáo, Định dạng, nút **Lưu lịch** (vẽ chế độ Xuất ngay làm đại diện; 2 chế độ loại trừ nhau). |
| 3 | Loại báo cáo | Dropdown | Select | • **Bắt buộc**: Tổng quan hoạt động hỗ trợ / Hiệu suất & SLA / Chất lượng & nội dung (UC53). |
| 4 | Khoảng thời gian | Date range | Select | • **Bắt buộc** khi Xuất ngay: Từ, Đến (dd/mm/yyyy); Đến < Từ → báo lỗi tại ô [wording chưa có, chưa có mã E-…]. Khoảng tối đa: OQ-23. Ở chế độ lịch: khoảng tự tính theo tần suất (tuần trước/tháng trước) [GIẢ ĐỊNH]. |
| 5 | Phạm vi | Dropdown | Select | • Tầng/dịch vụ trong quyền xem; dữ liệu xuất **chỉ gồm phạm vi được phép** (Chủ quản dịch vụ không xuất được dịch vụ khác). |
| 6 | Định dạng | Radio group | Check | • Excel hoặc PDF (UC53: xuất file Excel/PDF); bố cục file mẫu: đã chốt (OQ-23). |
| 7 | Xuất file | Button | Click | • **Disabled** tới khi [3], [4] hợp lệ; khóa khi đang tạo file (chống bấm lặp); xong → tải file về máy, báo "Đã xuất" (wording tạm). Không có dữ liệu trong khoảng → không tạo file, báo "Không có dữ liệu để xuất". Lỗi tạo file → báo lỗi, cho thử lại [chưa có mã E-…]. |
| 8 | Lịch gửi tự động | Table | Select | • Danh sách lịch đã cấu hình: tần suất, loại báo cáo, người nhận; Sửa/Xóa (xóa có xác nhận). Job (UC39) **tổng hợp số liệu theo lịch và gửi file tới Quản trị viên/Chủ quản dịch vụ**.<br>• Người nhận là tài khoản trong hệ thống hay email ngoài, giờ gửi, gửi lỗi thì thử lại: đã chốt (OQ-23). |

- Vẽ chế độ "Xuất ngay"; chế độ "Gửi tự động theo lịch" mô tả trong Description [2] (2 chế độ loại trừ nhau, userflow chưa có slug riêng).


---

## Đề xuất đã cập nhật (đã chốt với khách hàng 21/09/2026)

| Mã | Nội dung cần chốt | Đề xuất | Trạng thái |
|----|-------------------|---------|------------|
| OQ-23a | Định nghĩa chỉ số | Đã xử lý = chuyển "Chờ KH xác nhận"/"Đã đóng" trong kỳ; Tồn đọng = chưa "Đã đóng" cuối kỳ; Phản hồi = từ tạo đến phản hồi công khai đầu tiên; Xử lý = từ tạo đến lần đầu "Chờ KH xác nhận" trừ thời gian chờ khách hàng, theo giờ làm việc; AI deflection = phiên hỏi đáp AI không phát sinh ticket / tổng phiên; Kỳ trước = kỳ liền trước cùng độ dài. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-23b | Báo cáo Agent, Chủ quản dịch vụ | Agent: số ticket theo trạng thái, ticket sắp/quá hạn trong phạm vi + của chính mình. Chủ quản dịch vụ xem theo tầng/tỉnh, không theo từng agent. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-23c | Top hỏi nhiều, xếp hạng KB | Top 10 nhóm câu hỏi (AI, từ khóa tìm kiếm, loại vấn đề ticket); chỉ xếp hạng bài có ≥10 lượt đánh giá. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-23d | Xuất báo cáo | Tối đa 12 tháng/lần, ≤50.000 dòng; Excel 1 sheet tổng hợp + sheet chi tiết, PDF bản tổng hợp; tên tệp {loại}_{từ}_{đến}. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
| OQ-23e | Gửi báo cáo tự động | Người nhận là tài khoản Quản trị viên/Chủ quản dịch vụ trong hệ thống; 08:00 thứ Hai hằng tuần hoặc ngày 1 hằng tháng; lỗi gửi thử lại 3 lần cách 30 phút rồi báo Quản trị viên. | Đã chốt (khách hàng xác nhận, 21/09/2026) |
