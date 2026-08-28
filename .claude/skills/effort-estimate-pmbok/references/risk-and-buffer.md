# RISK & BUFFER — RESERVE ANALYSIS (BƯỚC 4)

PMBOK phân biệt rõ 2 loại dự phòng (Reserve Analysis — Project Cost
Management 7.2.3.5 / Schedule Management):

| Loại | Tên PMBOK | Dùng cho | Ai kiểm soát |
|---|---|---|---|
| **Contingency Reserve** | Dự phòng rủi ro đã biết (Known-unknowns) | Biến động tự nhiên trong estimate (đã phản ánh qua σ ở Bước 3) | Project Manager |
| **Management Reserve** | Dự phòng rủi ro chưa biết (Unknown-unknowns) | Rủi ro không thể lường trước (scope creep ẩn, thay đổi chính sách, nhân sự nghỉ...) | Sponsor / cấp quản lý cao hơn PM |

Không gộp 2 loại này thành 1 con số mơ hồ "buffer 20%" — nhưng **chỉ cần
giải thích sự khác biệt này 1 LẦN** trong câu trả lời, không lặp lại mỗi
khi nhắc tới 2 con số này.

---

## A. DÙNG SCRIPT KHI > 5 TASK — BẮT BUỘC

Khi Task List đã có Tier (từ `tier-table.md`) và > 5 task, chạy script
Python sau bằng `bash_tool` để tính tổng — không tính tay:

```python
import math

# Dán danh sách task: (tên, Tier, E, sigma) — lấy E, sigma theo Tier từ tier-table.md mục A
tasks = [
    ("Xem danh sách hợp đồng", "T1", 0.63, 0.10),
    ("Tạo hồ sơ đề xuất", "T2", 1.27, 0.20),
    ("Duyệt hồ sơ (1 cấp)", "T3", 2.60, 0.40),
    # ... thêm task
]

sum_E = sum(t[2] for t in tasks)
sum_var = sum(t[3] ** 2 for t in tasks)
sigma_total = math.sqrt(sum_var)

k = 1.5                  # mặc định thực tế — đổi thành 2.0 nếu cam kết hợp đồng
mgmt_reserve_pct = 0.10  # mặc định 10% — đổi theo risk register nếu cần

contingency = k * sigma_total
management_reserve = mgmt_reserve_pct * (sum_E + contingency)
total_effort = sum_E + contingency + management_reserve

print(f"Số task: {len(tasks)}")
print(f"ΣE (tổng effort kỳ vọng) = {sum_E:.2f} manday")
print(f"σ_tổng = {sigma_total:.2f} manday")
print(f"Contingency Reserve (k={k}) = {contingency:.2f} manday")
print(f"Management Reserve ({mgmt_reserve_pct*100:.0f}%) = {management_reserve:.2f} manday")
print(f"TOTAL EFFORT = {total_effort:.2f} manday")

# Tổng hợp theo Tier (để trình bày bảng gọn cho BULK)
from collections import defaultdict
by_tier = defaultdict(lambda: [0, 0.0])
for name, tier, e, s in tasks:
    by_tier[tier][0] += 1
    by_tier[tier][1] += e
for tier in sorted(by_tier):
    count, total_e = by_tier[tier]
    print(f"{tier}: {count} task, tổng E = {total_e:.2f} manday")
```

> Với BULK (>30 task), nếu task list quá dài để gõ tay vào script, đọc
> Task List + Tier đã gán trực tiếp từ bảng user cung cấp (paste từ Excel)
> bằng cách parse trong Python — KHÔNG yêu cầu user nhập lại tay từng dòng.

---

## A2. NGUYÊN TẮC TỔNG HỢP σ (NỀN TẢNG CỦA SCRIPT TRÊN)

KHÔNG cộng trực tiếp các σ riêng lẻ — PMBOK áp dụng nguyên tắc thống kê:
nếu các Task được coi là **độc lập về rủi ro** với nhau:

```
σ_tổng = √( σ₁² + σ₂² + ... + σₙ² )
```

> ⚠️ Giả định "độc lập" chỉ đúng khi rủi ro của Task này không kéo theo
> rủi ro Task khác. Nếu nhiều Task **cùng phụ thuộc 1 rủi ro chung** (ví
> dụ: tất cả đều chờ 1 API bên thứ 3 chưa ổn định) → xử lý rủi ro đó riêng
> như 1 dòng trong Risk Register (Mục C), KHÔNG gộp vào σ_tổng.

---

## B. CHỌN k (CONTINGENCY RESERVE) — MẶC ĐỊNH THỰC TẾ, KHÔNG HỎI LẠI MỖI LẦN

```
Contingency Reserve = k × σ_tổng
```

| Ngữ cảnh estimate | k | Khi nào dùng |
|---|---|---|
| **Mặc định (đề xuất sơ bộ, estimate nội bộ, ROM)** | **1.5** | Dùng khi user không nêu rõ — đây là mức cân bằng, không cần hỏi lại |
| Cam kết hợp đồng/báo giá chính thức với khách hàng | 2.0 | Chỉ đổi khi user xác nhận đây là estimate để ký hợp đồng |
| Dự án có yêu cầu an toàn cao (ít chấp nhận trễ) | 3.0 | Hiếm dùng — chỉ khi user yêu cầu rõ |

> Dùng k=1.5 làm mặc định và NÊU 1 LẦN trong output rằng đây là mặc định
> có thể đổi nếu cần — không dừng lại hỏi user chọn k trước khi tính,
> trừ khi ngữ cảnh rõ ràng là báo giá hợp đồng chính thức.

---

## C. RISK REGISTER RÚT GỌN — CHỈ KHI CẦN, KHÔNG BẮT BUỘC MỖI LẦN

Risk register đầy đủ chỉ cần làm khi **BULK** hoặc khi user yêu cầu rõ
phần phân tích rủi ro. Với QUICK/BATCH thông thường, dùng % Management
Reserve mặc định theo bảng sau, không cần liệt kê risk register trước:

| Mức rủi ro tổng quan (đánh giá nhanh bằng quan sát) | % Management Reserve |
|---|---|
| **Mặc định khi chưa có dấu hiệu rủi ro đặc biệt** | **10%** |
| Có dấu hiệu rủi ro rõ (nhiều task T4/T5, phụ thuộc bên ngoài, yêu cầu chưa chốt) | 15% |
| Yêu cầu đã rất rõ, team quen thuộc, ít phụ thuộc ngoài | 5% |

```
Management Reserve = % × (ΣE + Contingency Reserve)
```

**Chỉ làm risk register chi tiết** (bảng Rủi ro / Khả năng / Ảnh hưởng) khi:
- User yêu cầu rõ, HOẶC
- BULK (>30 task) và có nhiều task T4/T5 — lúc này risk register giúp giải
  trình tại sao chọn 15% chứ không phải 10%

```
STT | Rủi ro | Khả năng xảy ra (Thấp/TB/Cao) | Mức ảnh hưởng (Thấp/TB/Cao)
```

> Nếu tổ chức đã có chính sách % Management Reserve cố định (ví dụ quy
> định nội bộ VNPT-IT) → dùng số đó, không áp bảng trên.

---

## D. TỔNG EFFORT CUỐI CÙNG

```
Total Effort = ΣE + Contingency Reserve + Management Reserve
```

Script ở Mục A đã tính sẵn — chỉ cần lấy kết quả `total_effort` để trình
bày, không tính lại bằng tay.

---

## E. TRÌNH BÀY KẾT QUẢ BƯỚC 4 (GỌN — DÙNG CHO MỌI QUY MÔ)

```
ΣE (tổng effort kỳ vọng)        = [X] manday
σ_tổng                           = [Y] manday
Contingency Reserve (k=1.5)      = [Z] manday
Management Reserve (10%)         = [W] manday
─────────────────────────────────────────
TOTAL EFFORT                     = [TOTAL] manday
```

1 câu giải thích ngắn (không cần lặp lại định nghĩa PMBOK đầy đủ): ví dụ
*"Contingency Reserve phản ánh biến động tự nhiên giữa các task; Management
Reserve (10%, mặc định) dự phòng rủi ro phát sinh chưa lường hết."*
