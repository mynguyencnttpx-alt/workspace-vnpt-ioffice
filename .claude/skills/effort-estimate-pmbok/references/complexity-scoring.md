# PARAMETRIC SIZING — COMPLEXITY SCORE

PMBOK gọi đây là **Parametric Estimating**: dùng đặc điểm đo lường được
của chức năng (số field, số luồng, số tích hợp...) để suy ra effort base,
thay vì đoán cảm tính. Bước này KHÔNG ra effort cuối — chỉ ra **Complexity
Score** và **Effort Base**, sẽ được đưa vào PERT (M = Most Likely) ở bước
sau.

---

## A. 4 YẾU TỐ TÍNH COMPLEXITY SCORE

Với mỗi Task, chấm điểm theo 4 yếu tố, mỗi yếu tố có thang điểm riêng:

### A1. Số trường dữ liệu / yếu tố input (Data Complexity)

| Số trường | Điểm |
|---|---|
| ≤ 5 trường | 1 |
| 6 – 15 trường | 2 |
| > 15 trường | 3 |

> Trường có logic đặc biệt (file đính kèm, rich text, dữ liệu lồng nhau,
> bảng con/sub-grid) tính **+1 điểm cộng thêm cho mỗi loại đặc biệt**, tối
> đa +3.

### A2. Số luồng / nhánh xử lý (Logic Complexity)

| Đặc điểm | Điểm |
|---|---|
| Luồng thẳng, không rẽ nhánh (CRUD đơn giản) | 1 |
| Có rẽ nhánh điều kiện (if/else nghiệp vụ, validate phức tạp) | 2 |
| Có workflow nhiều bước / nhiều trạng thái / nhiều cấp duyệt | 3 |

### A3. Số tích hợp (Integration Complexity)

| Đặc điểm | Điểm |
|---|---|
| Không tích hợp hệ thống ngoài | 0 |
| Tích hợp 1 hệ thống ngoài qua API chuẩn (REST/SOAP có sẵn doc) | 2 |
| Tích hợp nhiều hệ thống, hoặc API chưa có doc rõ/cần làm việc với bên thứ 3 | 4 |

### A4. Loại nghiệp vụ (Business Type Multiplier — tham khảo tinh thần BMT
của QĐ 671, áp dụng linh hoạt hơn cho ngữ cảnh ngoài QĐ 671)

| Loại | Hệ số |
|---|---|
| Nghiệp vụ thông thường (B) | ×1.0 |
| Có liên thông/chia sẻ dữ liệu hệ thống khác (M) | ×1.2 |
| Có AI/Blockchain/thuật toán đặc thù/tính toán phức tạp (T) | ×1.5 |

---

## B. CÔNG THỨC TỔNG HỢP COMPLEXITY SCORE

```
Raw Score = A1 + A2 + A3
Complexity Score = Raw Score × A4 (hệ số loại nghiệp vụ)
```

### Phân loại theo Complexity Score:

| Complexity Score | Mức độ |
|---|---|
| ≤ 3 | Đơn giản (S) |
| 3.1 – 6 | Trung bình (M) |
| 6.1 – 9 | Phức tạp (L) |
| > 9 | Rất phức tạp (XL) — cảnh báo nên tách Task |

> ⚠️ Nếu Complexity Score > 9: BẮT BUỘC cảnh báo user:
> ```
> ⚠️ Task "[Tên Task]" có Complexity Score = [X] — vượt ngưỡng khuyến nghị.
>    Đề xuất: tách thành [Task con A] và [Task con B] để estimate chính xác hơn.
> ```

---

## C. QUY ĐỔI COMPLEXITY SCORE → EFFORT BASE (MANDAY)

Effort Base là điểm khởi đầu hợp lý cho **M (Most Likely)** ở bước PERT.
Bảng quy đổi mặc định (đơn vị: manday, 1 manday = 8 giờ làm việc của 1 dev
trung cấp; PM/BA có thể điều chỉnh bảng này theo năng lực team thực tế —
nêu rõ nếu điều chỉnh):

| Mức độ | Complexity Score | Effort Base — Dev (manday) | Effort Base — Test (manday) | Effort Base — BA/Design (manday) |
|---|---|---|---|---|
| Đơn giản (S) | ≤ 3 | 0.5 – 1 | 0.25 – 0.5 | 0.25 – 0.5 |
| Trung bình (M) | 3.1 – 6 | 1.5 – 3 | 0.5 – 1 | 0.5 – 1 |
| Phức tạp (L) | 6.1 – 9 | 3 – 5 | 1 – 2 | 1 – 1.5 |
| Rất phức tạp (XL) | > 9 | 5 – 8+ | 2 – 3+ | 1.5 – 2+ |

> Đây là **bảng tham khảo mặc định**, dùng khi user chưa có dữ liệu lịch
> sử (historical data) riêng. Nếu user có sẵn dữ liệu thực tế từ project
> trước (ví dụ: "Task tương tự lần trước tốn X manday") → ưu tiên dùng
> **Analogous Estimating** (lấy theo lịch sử), ghi rõ nguồn so sánh, KHÔNG
> dùng bảng mặc định này.

**Chọn 1 giá trị cụ thể trong khoảng (không để khoảng mở)** dựa trên đặc
điểm cụ thể của Task — đây sẽ là **M (Most Likely)** cho bước PERT tiếp
theo. Giải thích ngắn lý do chọn điểm đó trong khoảng (ví dụ: "chọn 2.5/3
vì có 2 luồng rẽ nhánh, gần biên Phức tạp").

---

## D. TRÌNH BÀY KẾT QUẢ BƯỚC 2

```
STT | Tên Task | A1 | A2 | A3 | Raw Score | A4 (hệ số) | Complexity Score | Mức độ | Effort Base Dev (M) | Effort Base Test (M) | Effort Base BA (M)
```

Sau khi có bảng này cho toàn bộ Task List → sang Bước 3 (PERT).
