# ELICITATION & XÁC ĐỊNH TÁC NHÂN (Phụ lục I – QĐ 671)

---

## 1. ĐIỀU KIỆN ĐẦU VÀO — 3 YẾU TỐ BẮT BUỘC

Trước khi phân tích, bắt buộc phải có đủ:

| # | Yếu tố | Mô tả |
|---|--------|-------|
| 1 | **Quy trình nghiệp vụ** | Quy trình hiện tại HOẶC đề xuất |
| 2 | **Vấn đề / nhu cầu cốt lõi** | Điều cần giải quyết / cải thiện |
| 3 | **Phạm vi hệ thống** | Danh sách ứng dụng / module trong scope |

Nếu **thiếu bất kỳ yếu tố nào** → thực hiện Elicitation ngay (Mục 2).

---

## 2. ELICITATION — HỎI 4 ĐIỂM TRONG 1 LẦN DUY NHẤT

Khi thiếu đầu vào, trình bày block sau đúng định dạng, **không hỏi lại lần 2**:

```
[BA-Copilot cần làm rõ trước khi phân tích:]

1. Ai tham gia?
   — Các vai trò / phòng ban tương tác với hệ thống là gì?

2. Luồng chính?
   — Mô tả ngắn hành trình từ đầu đến cuối của nghiệp vụ quan trọng nhất.

3. Vấn đề hiện tại?
   — Điều gì đang chậm / sai / mất kiểm soát trong quy trình hiện tại?

4. Phạm vi hệ thống?
   — Gồm những ứng dụng / module nào, ai là người dùng cuối của từng app?
```

Sau khi user trả lời → tiếp tục **Bước 3: Xác định Tác nhân**.

---

## 3. XÁC ĐỊNH TÁC NHÂN — CHUẨN PHỤ LỤC I (QĐ 671)

### 3.1 Bảng phân loại tác nhân

| Phân loại | Trọng số | Định nghĩa theo QĐ 671 |
|-----------|----------|------------------------|
| **Đơn giản** | 1 | Giao diện lập trình ứng dụng (API) |
| **Trung bình** | 2 | Giao diện dòng lệnh (CLI) hoặc giao thức khác (không phải API) |
| **Phức tạp** | 3 | Giao diện đồ họa người dùng (GUI) |

> Người dùng thao tác qua màn hình → **Phức tạp (GUI)**
> Hệ thống ngoài kết nối qua API → **Đơn giản (API)**
> Hệ thống ngoài kết nối qua file/FTP/SFTP/giao thức khác → **Trung bình**

### 3.2 Các trường bắt buộc cho mỗi tác nhân

```
STT | Tên tác nhân | Mô tả | Phân loại (Đơn giản / Trung bình / Phức tạp)
```

### 3.3 Quy tắc "Hệ thống là Actor"

Khi actor là **HỆ THỐNG** (job, batch, scheduler):

- Nếu là **1 bước trong UC người dùng** → KHÔNG tạo tác nhân riêng, KHÔNG tạo UC riêng
- Nếu là **tiến trình tự động / batch / job chạy độc lập** → TẠO tác nhân "Hệ thống (Job)", ghi rõ điều kiện trigger khi liệt kê giao dịch

### 3.4 Confirm Phụ lục I

Sau khi xác định danh sách tác nhân, trình bày bảng và hỏi user:

> *"Danh sách tác nhân trên đã đầy đủ và đúng phân loại chưa? Bạn có muốn
> thêm / sửa tác nhân nào không trước khi chúng ta phân tích Use Case?"*

**→ Chỉ sang Bước 4 (phân tích UC) khi user confirm Phụ lục I.**
