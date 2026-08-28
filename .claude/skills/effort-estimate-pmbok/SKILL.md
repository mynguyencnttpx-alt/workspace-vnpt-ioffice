---
name: Effort-Estimate-PMBOK
description: >
  Estimate effort (manday) cho chức năng phần mềm theo nguyên tắc PMBOK
  (Three-Point Estimating / PERT, Parametric Estimating, Reserve Analysis),
  tối ưu để chạy thiết thực với số lượng UC/task lớn (vài chục → hàng trăm)
  mà không sa vào tính toán hàn lâm từng dòng. Kích hoạt khi user yêu cầu:
  "estimate", "ước lượng effort", "tính manday", "ước lượng thời gian",
  "estimate theo PMBOK", "tính buffer", "rủi ro estimate", hoặc cung cấp
  danh sách Use Case / mô tả chức năng / mô tả màn hình UI và muốn biết
  effort cần bao nhiêu ngày công. Nhận input linh hoạt: danh sách UC
  (có/không kèm độ phức tạp), mô tả chức năng dạng văn xuôi, mô tả màn hình
  giao diện, hoặc danh sách dài hàng chục/hàng trăm UC dán từ Excel. KHÔNG
  dùng skill này để tạo báo giá tiền (đó là skill baogia) — skill này chỉ
  ra effort (manday) + risk + buffer, là input cho báo giá.
---

# MỤC ĐÍCH

Hỗ trợ PM/BA ước lượng effort (manday) cho chức năng phần mềm, dựa trên
nguyên tắc PMBOK nhưng vận hành theo cách **thiết thực với quy mô thực
tế** — đặc biệt khi có nhiều chục/trăm UC, không thể và không nên tính tay
O-M-P-σ cho từng dòng một.

Cách giải quyết: **phân loại task theo Tier độ phức tạp** (dùng bộ giá trị
O-M-P-E-σ đã chuẩn hóa sẵn cho mỗi Tier, không suy diễn lại mỗi lần), sau
đó **dùng code (bash_tool/Python) để tính tổng hợp** khi số lượng task đủ
lớn — Claude không cộng tay hàng chục con số, tránh sai số và mất thời
gian.

KHÔNG tự chốt báo giá tiền, KHÔNG tự suy đoán đơn giá nhân sự.

---

# CHỌN QUY MÔ XỬ LÝ — BƯỚC ĐẦU TIÊN, BẮT BUỘC

Đếm số Task sau khi chuẩn hóa input (Bước 1), rồi chọn đúng 1 trong 3 quy
mô — đây là quyết định quan trọng nhất để tránh "hàn lâm hóa":

| Quy mô | Số Task | Cách xử lý |
|---|---|---|
| **QUICK** | 1–5 | Tính tay từng Task, đầy đủ O-M-P-E-σ, giải thích ngắn từng dòng |
| **BATCH** | 6–30 | Gán Tier nhanh theo bảng chuẩn (không suy diễn O-M-P riêng từng task) → tính tổng bằng code |
| **BULK** | > 30 | Bắt buộc dùng code để gán Tier hàng loạt + tính tổng. Chỉ giải thích chi tiết cho 3-5 Task mẫu đại diện mỗi Tier, còn lại trình bày dạng bảng tổng hợp theo Tier |

> Nếu không chắc số Task thuộc mức nào, mặc định chọn mức xử lý cao hơn
> (an toàn hơn, tránh tính tay khi không cần) — ví dụ 28 task thì xử lý
> như BATCH chứ không cố tính tay 28 dòng.

---

# QUY TRÌNH BẮT BUỘC — THỰC HIỆN ĐÚNG THỨ TỰ

```
BƯỚC 0 → Nhận diện loại input (UC / mô tả chức năng / mô tả UI / hỗn hợp)
BƯỚC 1 → Chuẩn hóa input → Task List + ĐẾM SỐ TASK → chọn quy mô (Quick/Batch/Bulk)
BƯỚC 2 → Gán Tier độ phức tạp cho từng Task (nhanh, dùng bảng chuẩn — KHÔNG tính điểm chi tiết từng yếu tố trừ khi QUICK)
BƯỚC 3 → Lấy O-M-P-E-σ theo Tier (đã có sẵn trong bảng, không suy diễn lại) — BATCH/BULK dùng code để tính
BƯỚC 4 → Reserve Analysis: Contingency Reserve + Management Reserve — luôn dùng code khi > 5 task
BƯỚC 5 → Tổng hợp bảng estimate cuối, gọn, kèm giả định/rủi ro quan trọng (không liệt kê lan man)
```

**Sau khi đọc SKILL.md này, đọc ngay các file tham chiếu theo bảng dưới
trước khi tính toán:**

| File | Nội dung | Bắt buộc đọc khi |
|------|----------|------------------|
| `references/input-normalization.md` | Cách chuẩn hóa 3 loại input (UC/mô tả/UI) thành task list, cách đếm và chọn quy mô | Luôn đọc đầu tiên |
| `references/tier-table.md` | **Bảng Tier chuẩn** — gán nhanh Tier theo đặc điểm task, đã có sẵn O-M-P-E-σ, không cần suy diễn lại | Luôn đọc — bảng dùng chính cho BATCH/BULK |
| `references/complexity-scoring.md` | Công thức Parametric Sizing chi tiết (4 yếu tố) — CHỈ dùng cho QUICK hoặc khi Task không khớp Tier nào trong bảng chuẩn | Chỉ đọc khi QUICK hoặc Task đặc biệt |
| `references/pert-formula.md` | Công thức PERT gốc, cách suy O-M-P khi cần tính tay (QUICK) hoặc khi cần điều chỉnh Tier | Đọc khi QUICK hoặc cần giải thích công thức |
| `references/risk-and-buffer.md` | Công thức Reserve Analysis rút gọn theo thực tế + script tính bằng code | Luôn đọc khi tính buffer (Bước 4) |
| `references/output-template.md` | Bảng tổng hợp estimate cuối — bản gọn cho BATCH/BULK, bản đầy đủ cho QUICK | Luôn đọc khi tổng hợp (Bước 5) |

---

# NGUYÊN TẮC ESTIMATE — TÓM TẮT CÔNG THỨC (PMBOK, RÚT GỌN THỰC TẾ)

> Chi tiết đầy đủ nằm trong các file reference. Đây là bản tóm tắt để Claude
> luôn nhớ trong suốt quá trình tính, tránh lệch công thức giữa các bước.
> **Lưu ý quan trọng**: với BATCH/BULK, KHÔNG tự suy diễn O-M-P-σ bằng công
> thức bên dưới cho từng task — dùng trực tiếp giá trị đã chuẩn hóa sẵn
> trong `tier-table.md` theo Tier đã gán. Công thức dưới đây là nguồn gốc
> để hiểu/giải trình, và để dùng khi QUICK hoặc cần điều chỉnh Tier.

## 1. PERT — Three-Point Estimate (PMBOK, Estimate Activity Durations)

Với mỗi task, sau khi có 3 điểm:
- **O (Optimistic)** — effort nếu mọi thứ thuận lợi nhất
- **M (Most Likely)** — effort thực tế nhiều khả năng xảy ra nhất
- **P (Pessimistic)** — effort nếu gặp nhiều trở ngại

```
E (Expected)        = (O + 4M + P) / 6
σ (Standard Deviation) = (P − O) / 6
```

## 2. Tổng hợp độ bất định nhiều task (Reserve Analysis)

KHÔNG cộng trực tiếp σ của nhiều task. PMBOK dùng nguyên tắc cộng phương sai
(do các task được giả định độc lập về rủi ro):

```
σ_tổng = √( σ₁² + σ₂² + ... + σₙ² )
```

> Với > 5 task: BẮT BUỘC dùng `bash_tool` (Python) để tính tổng này, không
> cộng/tính căn bậc hai bằng tay — tránh sai số tích lũy khi số task lớn.

## 3. Contingency Reserve (dự phòng rủi ro ĐÃ BIẾT)

```
Contingency Reserve = k × σ_tổng
```
Mặc định thực tế: **k = 1.5** (giữa mức 65% và 95%, phù hợp estimate nội
bộ/giai đoạn đề xuất — không quá rộng tay, không quá liều). Dùng k = 2.0
chỉ khi estimate này dùng để **cam kết hợp đồng/báo giá chính thức** với
khách hàng bên ngoài. Xem `risk-and-buffer.md` để biết khi nào đổi k.

## 4. Management Reserve (dự phòng rủi ro CHƯA BIẾT — Unknown-unknowns)

```
Management Reserve = % (mặc định 10% nếu chưa rõ rủi ro cụ thể) × (ΣE + Contingency Reserve)
```

## 5. Tổng Effort cuối cùng

```
Total Effort = ΣE + Contingency Reserve + Management Reserve
```

## 6. Nguyên tắc "đủ dùng" (Good-enough estimate)

PMBOK cũng nhấn mạnh: **mức độ chính xác của estimate phải phù hợp với
mục đích sử dụng** (Progressive Elaboration / Rolling Wave Planning). Một
estimate cho đề xuất sơ bộ (ROM — Rough Order of Magnitude) không cần độ
chi tiết như estimate chốt hợp đồng. → Khi BATCH/BULK, ưu tiên **tốc độ
và nhất quán theo Tier** hơn là độ chính xác tuyệt đối từng task — vì sai
số từng task sẽ tự triệt tiêu phần nào ở mức tổng (luật số lớn), trong khi
nếu cố tính tay từng task thì tốn effort của Claude không tương xứng với
lợi ích, và dễ lệch công thức giữa các dòng.

---

# LANGUAGE & STYLE RULE

- Trả lời **toàn bộ bằng Tiếng Việt**
- Thuật ngữ PMBOK giữ nguyên tiếng Anh khi cần chính xác: PERT, Contingency
  Reserve, Management Reserve, Tier, O/M/P
- QUICK (≤5 task): trình bày công thức kèm số liệu thay vào cho từng task
- BATCH/BULK (>5 task): trình bày bảng Tier tổng hợp + công thức ở mức
  TỔNG (ΣE, σ_tổng, Reserve) — KHÔNG diễn giải công thức cho từng task
  riêng lẻ, vì sẽ rất dài và không ai đọc hết
- Khi không chắc về độ phức tạp/giả định: **hỏi thêm hoặc đánh dấu rõ
  `[GIẢ ĐỊNH]`**, nhưng gộp các giả định giống nhau lại thành 1 dòng
  chung (không lặp lại [GIẢ ĐỊNH] riêng cho từng task cùng loại)

---

# WHAT NOT TO DO

- KHÔNG estimate khi chưa xác định được đơn vị task rõ ràng (xem Bước 1)
- KHÔNG tính chi tiết Complexity Score (4 yếu tố) cho từng task khi đang ở
  BATCH/BULK — chỉ gán Tier nhanh theo `tier-table.md`; chỉ tính chi tiết
  khi QUICK hoặc khi 1 task cụ thể không khớp Tier nào và user cần rõ lý do
- KHÔNG tính tay tổng σ/Reserve khi > 5 task — PHẢI dùng `bash_tool` để
  chạy script, tránh sai số và mất thời gian
- KHÔNG cộng trực tiếp σ của nhiều task (phải dùng căn bậc hai tổng phương sai)
- KHÔNG gộp Contingency Reserve và Management Reserve thành một số mơ hồ —
  phải tách bạch, nhưng KHÔNG cần giải thích lại nguồn gốc lý thuyết mỗi
  lần — chỉ nêu số và % đã dùng, giải thích đầy đủ 1 lần đầu trong câu trả lời
- KHÔNG tự đưa ra đơn giá/tiền — skill này CHỈ ra effort (manday/man-hour)
- KHÔNG estimate "áng chừng" mà không liệt kê giả định kèm theo — nhưng
  giả định trình bày GỘP NHÓM, không lặp dòng cho từng task
- KHÔNG seal output bằng % buffer tùy tiện không có k hoặc % do user thống
  nhất — nếu chưa thống nhất, dùng mặc định thực tế (k=1.5, Management
  Reserve=10%) và NÊU RÕ 1 lần là mặc định, không nhắc lại nhiều lần
- KHÔNG để output dài hơn mức cần thiết: với BULK, ưu tiên bảng tổng hợp
  theo Tier + vài task mẫu, KHÔNG liệt kê tất cả task với đầy đủ chi tiết
