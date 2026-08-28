# THREE-POINT ESTIMATING (PERT) — BƯỚC 3

PMBOK (Estimate Activity Durations / Estimate Costs) khuyến nghị PERT khi
có độ bất định đáng kể trong estimate. Bước này lấy **Effort Base** (M) đã
tính ở Bước 2 làm gốc, suy ra O và P, rồi tính Expected Value (E) và độ
lệch chuẩn (σ) cho từng Task.

---

## A. SUY RA O VÀ P TỪ M (Effort Base)

M (Most Likely) = Effort Base đã chọn ở Bước 2.

O và P được suy từ M bằng **hệ số biến động (variability factor)**, hệ số
này phụ thuộc vào **độ rõ ràng của yêu cầu** và **mức độ quen thuộc của
team** với loại Task — đây là nơi đưa rủi ro/độ bất định vào công thức một
cách có hệ thống, thay vì áng chừng.

### A1. Chọn hệ số biến động theo độ rõ ràng yêu cầu

| Mức độ rõ ràng yêu cầu | Hệ số O (×M) | Hệ số P (×M) |
|---|---|---|
| Rất rõ — đã có UI mockup/SRS chi tiết, team đã làm loại task này nhiều lần | ×0.85 | ×1.2 |
| Rõ vừa phải — có mô tả nghiệp vụ nhưng chưa chi tiết hết edge case | ×0.8 | ×1.4 |
| Chưa rõ — mô tả sơ sài, có `[GIẢ ĐỊNH]`, hoặc team chưa quen loại task | ×0.7 | ×1.8 |
| Rủi ro cao — phụ thuộc bên thứ 3/API chưa rõ, công nghệ mới với team | ×0.7 | ×2.2 |

```
O = M × Hệ số O
P = M × Hệ số P
```

> ⚠️ Luôn ghi rõ **đã chọn mức rõ ràng nào và vì sao** cho mỗi Task (hoặc
> theo nhóm Task có cùng đặc điểm) — đây là phần PM cần giải trình được
> khi trình bày estimate.

---

## B. CÔNG THỨC PERT CHÍNH

Với mỗi Task, sau khi có O, M, P:

```
E (Expected Value)     = (O + 4M + P) / 6
σ (Standard Deviation) = (P − O) / 6
```

**Ý nghĩa**: E là effort nên dùng để lập kế hoạch (không phải M, không
phải trung bình cộng đơn giản của O-M-P — công thức PERT có trọng số 4 cho
M vì đây là giá trị nhiều khả năng xảy ra nhất). σ thể hiện độ bất định —
σ lớn nghĩa là Task này rủi ro cao, cần theo dõi sát.

---

## C. ÁP DỤNG CHO 3 LOẠI NGUỒN LỰC (Dev / Test / BA)

Lặp lại công thức A và B riêng cho từng loại effort (Dev, Test, BA/Design)
nếu user cần tách theo vai trò. Nếu user chỉ cần tổng effort, có thể tính
PERT trên tổng Effort Base (Dev+Test+BA) của Task — nhưng nêu rõ cách đã
chọn.

---

## D. TRÌNH BÀY KẾT QUẢ BƯỚC 3

```
STT | Tên Task | M (Effort Base) | Mức rõ ràng | O | P | E = (O+4M+P)/6 | σ = (P-O)/6
```

Ví dụ minh họa 1 dòng (để Claude luôn nhớ format số):

```
1 | Tạo hồ sơ đề xuất | M=2.5 | Rõ vừa phải (O=×0.8, P=×1.4) | O=2.0 | P=3.5 | E=(2.0+10+3.5)/6=2.58 | σ=(3.5-2.0)/6=0.25
```

Sau khi có bảng E và σ cho toàn bộ Task → sang Bước 4 (Reserve Analysis).
