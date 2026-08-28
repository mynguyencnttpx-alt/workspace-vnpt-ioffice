# BẢNG TIER CHUẨN — GÁN NHANH, KHÔNG SUY DIỄN LẠI MỖI LẦN

Đây là file quan trọng nhất khi xử lý BATCH (6–30 task) hoặc BULK (>30
task). Mục tiêu: gán Tier cho mỗi Task trong **1 lượt đọc nhanh**, dựa vào
đặc điểm dễ nhận biết — KHÔNG tính lại 4 yếu tố Complexity Score
(`complexity-scoring.md`) cho từng task, vì làm vậy với 50 task sẽ rất
chậm và không cần thiết.

Bảng Tier đã được "nấu sẵn" O-M-P-E-σ — lấy theo Tier là dùng được ngay,
không cần tính PERT lại từng dòng.

---

## A. 5 TIER CHUẨN — DÙNG CHO MỌI LOẠI INPUT (UC / mô tả / UI)

| Tier | Đặc điểm nhận diện nhanh | O | M | P | E=(O+4M+P)/6 | σ=(P-O)/6 |
|---|---|---|---|---|---|---|
| **T1 — Rất đơn giản** | CRUD 1 chiều, < 5 field, không rẽ nhánh, không tích hợp. VD: "Xem danh sách", "Xem chi tiết" | 0.4 | 0.6 | 1.0 | 0.63 | 0.10 |
| **T2 — Đơn giản** | Create/Update cơ bản, 5–10 field, validate thông thường, không tích hợp. VD: "Tạo hồ sơ", "Sửa thông tin" | 0.8 | 1.2 | 2.0 | 1.27 | 0.20 |
| **T3 — Trung bình** | Có rẽ nhánh điều kiện hoặc 10–20 field, hoặc có 1 bước duyệt/workflow đơn giản. VD: "Duyệt yêu cầu 1 cấp", form có validate phức tạp | 1.6 | 2.5 | 4.0 | 2.60 | 0.40 |
| **T4 — Phức tạp** | Workflow nhiều bước/nhiều cấp duyệt, hoặc tích hợp 1 hệ thống ngoài qua API có doc rõ, hoặc > 20 field. VD: "Quy trình phê duyệt 3 cấp", "Đồng bộ dữ liệu với hệ thống X" | 3.0 | 5.0 | 8.0 | 5.17 | 0.83 |
| **T5 — Rất phức tạp** | Tích hợp nhiều hệ thống/bên thứ 3 chưa rõ API, hoặc có AI/thuật toán đặc thù, hoặc workflow phức tạp + tích hợp đồng thời | 5.0 | 8.0 | 14.0 | 8.67 | 1.50 |

> Đơn vị: **manday** cho 1 dev trung cấp, đã gồm cả phần code + tự kiểm
> thử cơ bản (chưa gồm Test team riêng — xem Mục C).

> Các giá trị O-M-P trong bảng đã áp hệ số biến động theo "Mức rõ ràng
> trung bình" (xem `pert-formula.md` mục A1) — phù hợp cho input dạng UC
> /mô tả thông thường. Nếu yêu cầu **rất rõ** (đã có UI mockup/SRS chi
> tiết) → có thể hạ 1 nửa Tier xuống (ví dụ task vốn là T3 nhưng có
> mockup rõ → tính như T2-T3 trung bình); nếu **rất chưa rõ/rủi ro cao** →
> nâng lên 1 Tier.

---

## B. CÁCH GÁN TIER NHANH (QUY TRÌNH 3 CÂU HỎI)

Khi đọc qua từng Task (hoặc từng UC), tự hỏi nhanh 3 câu, dừng ở câu trả
lời "Có" đầu tiên để xác định Tier — không cần đi hết cả 3 câu nếu đã rõ:

```
1. Có tích hợp hệ thống ngoài không?
   - Nhiều hệ thống / API chưa rõ / bên thứ 3      → T5
   - 1 hệ thống, API có doc rõ                      → T4 (tối thiểu)

2. Có workflow nhiều bước / nhiều cấp duyệt không?
   - ≥ 2 cấp duyệt hoặc nhiều trạng thái chuyển đổi → T4
   - 1 cấp duyệt / rẽ nhánh đơn giản                → T3

3. Số field & loại thao tác?
   - > 20 field hoặc logic tính toán phức tạp        → T4
   - 10–20 field hoặc có validate phức tạp           → T3
   - 5–10 field, CRUD cơ bản                          → T2
   - < 5 field, chỉ xem/liệt kê                       → T1
```

Nếu 1 Task có nhiều đặc điểm trộn (ví dụ vừa có rẽ nhánh vừa nhiều field)
→ lấy Tier cao hơn trong 2 kết quả, KHÔNG cộng dồn.

---

## C. HỆ SỐ QUY ĐỔI SANG TEST / BA (rút gọn từ bảng đầy đủ)

Áp dụng nếu user cần tách effort theo vai trò — nhân trực tiếp vào E (và
σ) của Dev đã có ở Mục A, KHÔNG tính PERT riêng cho Test/BA:

| Vai trò | Hệ số × E (Dev) |
|---|---|
| Test | × 0.35 |
| BA/Design | × 0.25 |

> Đây là tỷ lệ rút gọn theo kinh nghiệm thực tế (Test ~35%, BA ~25% effort
> Dev), thay cho việc tính riêng bảng Effort Base cho từng vai trò như
> trong `complexity-scoring.md` (chỉ dùng bảng đầy đủ đó khi QUICK và user
> cần độ chính xác cao hơn cho riêng Test/BA).

---

## D. KHI NÀO TASK "KHÔNG KHỚP TIER NÀO"

Nếu 1 Task có đặc điểm rất khác biệt (ví dụ: chức năng tính toán tài chính
phức tạp riêng biệt, không phải web form thông thường) → tách Task đó ra
xử lý như QUICK (đọc `complexity-scoring.md` + `pert-formula.md` để tính
riêng), còn lại trong danh sách vẫn xử lý theo Tier bình thường. Không vì
1-2 task đặc biệt mà bỏ cách làm Tier cho toàn bộ danh sách.

---

## E. VÍ DỤ GÁN TIER NHANH (để Claude tham chiếu format)

```
STT | Tên Task                              | Tier | Lý do ngắn
1   | Xem danh sách hợp đồng                | T1   | Chỉ xem, < 5 field
2   | Tạo hồ sơ đề xuất                      | T2   | Create cơ bản, 8 field
3   | Duyệt hồ sơ (1 cấp)                    | T3   | 1 cấp duyệt, có rẽ nhánh
4   | Phê duyệt văn bản đi (3 cấp)           | T4   | Workflow 3 cấp
5   | Đồng bộ dữ liệu với hệ thống VNeID     | T5   | Tích hợp bên ngoài, API chưa rõ
```

Sau khi gán Tier cho toàn bộ Task List → sang Bước 3 (lấy O-M-P-E-σ theo
Tier, dùng code để tính tổng nếu > 5 task).
