# CHUẨN HÓA INPUT — BƯỚC 0 & BƯỚC 1

Input của user có thể thuộc 1 trong 4 dạng. Nhận diện đúng dạng trước khi
chuẩn hóa thành **Task List** (đơn vị nhỏ nhất sẽ được estimate ở Bước 2-3).

---

## A. NHẬN DIỆN LOẠI INPUT

| Dạng input | Dấu hiệu nhận biết | Đơn vị Task tương ứng |
|---|---|---|
| **UC list** | Đã có bảng UC (Tên UC, Actor, Giao dịch...), có thể từ skill `ba-uc` hoặc nguồn khác | Mỗi UC = 1 Task |
| **Mô tả chức năng văn xuôi** | Đoạn văn mô tả nghiệp vụ, chưa tách UC | Cần tách Task trước (xem Mục B) |
| **Mô tả màn hình UI** | Liệt kê field, nút bấm, bảng dữ liệu trên 1 màn hình | Mỗi màn hình hoặc mỗi nhóm hành động trên màn hình = 1 Task |
| **Hỗn hợp** | Kết hợp 2-3 dạng trên trong cùng yêu cầu | Chuẩn hóa từng phần theo quy tắc tương ứng, gộp vào 1 Task List duy nhất |

---

## B. TÁCH TASK TỪ MÔ TẢ VĂN XUÔI (khi chưa có UC)

Khi user đưa mô tả chức năng dạng văn xuôi (không phải UC có cấu trúc),
thực hiện tách nhanh theo nguyên tắc:

1. Mỗi **hành động khép kín có giá trị nghiệp vụ riêng** (Actor → hệ thống
   → phản hồi) = 1 Task ứng viên
2. Áp dụng nhanh CRUD: nếu mô tả ngụ ý có dữ liệu → luôn xét có cần
   Create/Read/Update/Delete tương ứng không (không tự thêm nếu mô tả không
   gợi ý — chỉ hỏi nếu nghi ngờ thiếu)
3. KHÔNG cần phân tích sâu 7 nhóm UC như skill `ba-uc` — chỉ cần đủ để
   liệt kê task rời rạc, có thể estimate độc lập

**Nếu mô tả quá sơ sài để tách Task (ví dụ: "làm module quản lý hợp đồng"
không có chi tiết gì)** → dừng lại, hỏi user theo Mục D.

---

## C. CHUẨN HÓA TỪ MÔ TẢ MÀN HÌNH UI

Khi user đưa mô tả màn hình (ví dụ ảnh chụp, wireframe, hoặc danh sách
field):

1. Xác định **loại màn hình**: Form nhập liệu / Danh sách + filter / Dashboard
   báo cáo / Màn hình chi tiết (view-only) / Màn hình duyệt (workflow)
2. Mỗi màn hình thường tương ứng với **1-3 Task**, tùy hành vi:
   - Form nhập liệu thuần (chỉ Create) → 1 Task
   - Danh sách có search/filter/sort → 1 Task (tính riêng độ phức tạp filter)
   - Danh sách + actions (Edit/Delete/Approve theo dòng) → tách thêm Task
     cho mỗi action có logic riêng
   - Dashboard có nhiều biểu đồ/số liệu tổng hợp → 1 Task, độ phức tạp tăng
     theo số nguồn dữ liệu tổng hợp
3. Ghi nhận các yếu tố ảnh hưởng Complexity Score ngay tại bước này (số
   field, loại field đặc biệt, validation, tích hợp) — dùng tiếp ở
   `complexity-scoring.md`

---

## D. ELICITATION KHI INPUT THIẾU — HỎI 1 LẦN DUY NHẤT

Nếu sau khi áp dụng Mục B/C vẫn không đủ để tách Task hoặc tính Complexity
Score, hỏi đúng 1 lần theo block:

```
[Cần làm rõ trước khi estimate:]

1. Phạm vi chức năng?
   — Chức năng này có những hành động/màn hình cụ thể nào?

2. Dữ liệu liên quan?
   — Có bao nhiêu trường dữ liệu chính? Có trường nào logic đặc biệt
     (tính toán, validate phức tạp, file đính kèm...)?

3. Tích hợp?
   — Có cần gọi API hệ thống khác hoặc bị hệ thống khác gọi vào không?

4. Độ chắc chắn của yêu cầu?
   — Yêu cầu đã chốt hay còn có thể thay đổi? (ảnh hưởng tới P trong PERT)
```

Nếu user không trả lời được hết → estimate vẫn tiếp tục với input có sẵn,
nhưng **đánh dấu rõ `[GIẢ ĐỊNH]`** cho phần thiếu, và tăng độ bất định
(khoảng O-M-P rộng hơn) ở Bước 3 để phản ánh rủi ro chưa rõ yêu cầu.

---

## E. KẾT QUẢ BƯỚC 1 — TASK LIST CHUẨN + CHỌN QUY MÔ

Trước khi sang Bước 2, trình bày Task List dưới dạng bảng để user xác nhận:

```
STT | Tên Task | Nguồn (UC / Mô tả / UI) | Loại Task (Create/Read/Update/
Delete/Workflow/Report/Integration/Khác) | Ghi chú/Giả định
```

**Ngay sau đó, đếm tổng số Task và nêu rõ quy mô sẽ áp dụng** (xem bảng ở
đầu SKILL.md):

```
→ Tổng [N] task. Áp dụng quy mô [QUICK/BATCH/BULK]:
   [mô tả ngắn cách xử lý tương ứng]
```

Việc nêu rõ quy mô giúp user hiểu trước là sẽ không thấy O-M-P chi tiết
từng dòng nếu là BATCH/BULK — tránh hiểu lầm là "tính sơ sài".

> Hỏi: *"Danh sách Task trên đã đủ và đúng phạm vi chưa? Có Task nào cần
> tách nhỏ hơn hoặc gộp lại không, trước khi mình gán Tier/estimate?"*

**Chỉ sang Bước 2 sau khi user confirm Task List.** Nếu Task List rất dài
(BULK) và user chỉ muốn xác nhận nhanh, có thể hỏi gọn: *"Mình thấy có
[N] task, đã nhóm theo Tier sơ bộ — bạn xem nhanh phần phân bố Tier ở dưới
có hợp lý không, rồi mình tính tổng."* kèm theo bảng phân bố Tier sơ bộ
ngay trong câu hỏi confirm (không cần đợi xác nhận xong mới làm).
