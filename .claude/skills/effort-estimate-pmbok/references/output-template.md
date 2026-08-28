# OUTPUT TEMPLATE — BƯỚC 5 (TỔNG HỢP CUỐI)

Sau khi hoàn tất Bước 2-4, tổng hợp thành deliverable cuối. **Độ dài và
chi tiết của output phải tỷ lệ với quy mô** — đây là nguyên tắc quan trọng
nhất của bước này: estimate cho 50 task không nên dài hơn estimate cho
5 task chỉ vì liệt kê lại logic công thức.

---

## A. OUTPUT CHO QUICK (1–5 task)

```
STT | Tên Task | Tier (nếu dùng) | O | M | P | E | σ
```

→ Dòng tổng:
```
ΣE = [X] | σ_tổng = [Y] | Contingency (k=1.5) = [Z] | Mgmt Reserve (10%) = [W]
TOTAL EFFORT = [TOTAL] manday
```

Có thể giải thích ngắn 1-2 câu cho từng task nếu có điểm đặc biệt cần lưu ý.

---

## B. OUTPUT CHO BATCH (6–30 task)

**Bảng chính** — gọn, chỉ cột cần thiết:

```
STT | Tên Task | Tier | E (manday)
```

(Không cần hiện O, M, P, σ riêng từng dòng — đã có sẵn trong Tier, chỉ cần
hiện ở dòng tổng)

**Dòng tổng** (lấy từ script):
```
ΣE = [X] manday | σ_tổng = [Y] | Contingency Reserve = [Z] | Management Reserve = [W]
TOTAL EFFORT = [TOTAL] manday
```

**Bảng phân bố theo Tier** (giúp user nhìn nhanh độ phức tạp tổng thể):
```
Tier | Số task | Tổng E (manday)
T1   | ...     | ...
T2   | ...     | ...
...
```

---

## C. OUTPUT CHO BULK (>30 task)

KHÔNG liệt kê toàn bộ task với đầy đủ chi tiết. Cấu trúc:

1. **Bảng phân bố theo Tier** (như Mục B) — đây là phần user nhìn vào đầu tiên
2. **3-5 task mẫu đại diện mỗi Tier có mặt** — để user kiểm chứng cách gán
   Tier có hợp lý không (không cần tất cả, chỉ mẫu)
3. **Dòng tổng effort** (như Mục A/B)
4. Nếu user muốn xem toàn bộ bảng chi tiết từng task → tạo file Excel/CSV
   riêng (dùng skill `xlsx` nếu cần) thay vì in hết ra chat

---

## D. GIẢ ĐỊNH & RỦI RO — GỘP NHÓM, KHÔNG LẶP DÒNG

Liệt kê giả định theo NHÓM, không theo từng task:

```
[GIẢ ĐỊNH CHUNG]
- Các task "Xem danh sách/chi tiết" (T1) giả định không có filter phức tạp
- Các task workflow (T3-T4) giả định tối đa 2 cấp duyệt trừ khi ghi chú khác
- Chưa tính effort hạ tầng/deploy/CI-CD (ngoài phạm vi estimate chức năng)
```

Chỉ nêu giả định riêng cho 1 task cụ thể nếu task đó có rủi ro đặc biệt
đáng chú ý (ví dụ Tier T5 — tích hợp chưa rõ).

---

## E. KHUYẾN NGHỊ CHO PM (NGẮN, 2-3 DÒNG)

- Task/nhóm Tier nào cần làm rõ requirement sớm (thường là T4-T5)
- Nếu có task vượt ngưỡng (xem `tier-table.md` Mục D) → nhắc lại ngắn

---

## F. KHI USER MUỐN QUY ĐỔI SANG CHI PHÍ/BÁO GIÁ

Skill này dừng ở effort (manday). Nếu user muốn quy đổi sang tiền → đề
xuất dùng skill `baogia` với input là bảng Total Effort vừa tính, KHÔNG tự
áp đơn giá nếu user không cung cấp.
