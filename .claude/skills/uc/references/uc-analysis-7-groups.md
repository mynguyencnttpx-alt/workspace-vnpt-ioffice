# PHÂN TÍCH UC THEO 7 NHÓM — CHUẨN PHỤ LỤC III (QĐ 671)

---

## A. CÁC TRƯỜNG BẮT BUỘC CHO MỖI UC

| Trường | Yêu cầu |
|--------|---------|
| **Tên Use case** | `[Động từ hành động] + [Đối tượng]` — TRÁNH từ "Quản lý" đứng một mình. Ví dụ đúng: "Tạo hồ sơ đề xuất", "Phê duyệt văn bản đi", "Xem danh sách hợp đồng". Ví dụ sai: "Quản lý hợp đồng", "Xử lý văn bản" |
| **Tên tác nhân** | Tác nhân chính thực hiện UC |
| **Giao dịch (Transaction)** | Mỗi giao dịch trên 1 dòng riêng; cột Tên UC + Tác nhân được merge cell bao trùm |
| **Số lượng giao dịch** | Số nguyên — cơ sở tính độ phức tạp |
| **Phân loại theo BMT** | B / M / T — xem Mục C |
| **Độ phức tạp** | Tự suy từ số giao dịch — xem Mục D |

---

## B. QUY TẮC GIAO DỊCH (Transaction – QĐ 671, Điều 2)

Mỗi giao dịch = **1 chuỗi hành động khép kín** giữa Actor và hệ thống:

- **Bắt đầu**: hành động từ Actor → phần mềm
- **Kết thúc**: phản hồi từ phần mềm → Actor
- **KHÔNG đếm** các bước xử lý nội bộ hệ thống không có tương tác với Actor

**Ví dụ đúng**: "Văn thư nhập thông tin văn bản. Hệ thống validate và hiển thị lỗi" / "Chuyên viên chọn hồ sơ cần duyệt. Hệ thống hiển thị chi tiết hồ sơ" / "Lãnh đạo xác nhận phê duyệt. Hệ thống ghi nhận và thông báo kết quả"
**Ví dụ sai**: "Người dùng nhập thông tin. Hệ thống validate" ← KHÔNG ghi "người dùng" chung chung; phải ghi đúng tên actor ở cột Actor
**Ví dụ sai**: "Hệ thống lưu vào database" (không có tương tác với Actor)

> ⚠️ **Quy tắc đặt tên trong cột Giao dịch**: Luôn dùng **đúng tên Actor** đã khai báo ở cột Tác nhân (ví dụ: Văn thư, Chuyên viên, Lãnh đạo, Admin, Kế toán…). TUYỆT ĐỐI KHÔNG dùng "người dùng", "user", "nhân viên" chung chung khi đã xác định được actor cụ thể.

---

## C. PHÂN LOẠI BMT (QĐ 671, Phụ lục III)

| Loại | Hệ số | Định nghĩa |
|------|-------|------------|
| **B** | 1.0 | UC có giao dịch mô tả yêu cầu chức năng nghiệp vụ thông thường |
| **M** | 1.2 | UC có giao dịch kết nối, liên thông, chia sẻ dữ liệu với hệ thống khác |
| **T** | 1.5 | UC ứng dụng AI, Blockchain, VR/AR, Datamining, Digital Twin... |

---

## D. PHÂN LOẠI ĐỘ PHỨC TẠP (QĐ 671, Phụ lục III)

| Độ phức tạp | Điều kiện | Trọng số điểm |
|-------------|-----------|---------------|
| **Đơn giản** | < 4 giao dịch | 5 điểm |
| **Trung bình** | 4 – 7 giao dịch | 10 điểm |
| **Phức tạp** | > 7 giao dịch | 15 điểm |

> ⚠️ **Cảnh báo**: Nếu UC > 12 giao dịch → BẮT BUỘC cảnh báo user:
> ```
> ⚠️ UC "[Tên UC]" có [N] giao dịch > 12 — vượt ngưỡng QĐ 671.
>    Đề xuất: [Tách thành UC A và UC B] hoặc [Thu gọn giao dịch X, Y]
> ```

---

## E. NGUYÊN TẮC KINH TẾ UC

Trước khi đề xuất UC mới, tự hỏi:
> *"Nếu không có UC này, stakeholder xử lý tình huống đó bằng cách nào?"*

Nếu có phương án thủ công chấp nhận được → **cân nhắc bỏ UC**.
**Không cố sinh UC nhiều — càng nhiều càng tốn effort phát triển.**

---

## F. 7 NHÓM UC — QUY TẮC CHI TIẾT

---

### NHÓM 1 – UC PHỤC VỤ QUY TRÌNH

Phân tích từng bước **CON NGƯỜI thực hiện TRÊN HỆ THỐNG** trong quy trình:

- **Quy trình hiện tại**: bước trong hình chữ nhật → sinh UC; bước trong hình thang ngược (thủ công) → bỏ qua
- **Quy trình đề xuất**: chỉ tính bước trong lane người dùng, không tính lane hệ thống

→ **Confirm Nhóm 1 trước khi sang Nhóm 2.**

---

### NHÓM 2 – UC CRUD/RUD MỞ RỘNG

Từ mỗi UC Create đã confirm ở Nhóm 1, khai thác Read / Update / Delete:

**Read**: Chỉ sinh 2 dạng chuẩn:
- `"Xem danh sách [X]"`
- `"Xem chi tiết [X]"`

> KHÔNG tách "Xem trạng thái", "Xem lịch sử" thành UC riêng
> (đây là trường trong màn hình chi tiết)

**Update**: Chỉ sinh khi đáp ứng ĐỦ 3 điều kiện — trình bày rõ bằng block:
```
📋 Phân tích điều kiện [Tên UC]:
   • Điều kiện được thực hiện: ...
   • Actor được phép: ...
   • Phạm vi thông tin có thể thao tác: ...
   • Rủi ro nếu không kiểm soát: ...
   • Kết luận: [SINH UC / KHÔNG SINH — lý do]
```

**Delete**: Phân biệt "Xóa" vs "Hủy":
- Ưu tiên **"Hủy"** (soft delete) vì bảo toàn lịch sử, dữ liệu phân tích, bằng chứng tranh chấp
- Khi sinh UC Xóa: nêu rõ điều kiện (ví dụ: chỉ xóa khi chưa có record con)

→ **Confirm Nhóm 2 trước khi sang Nhóm 3.**

---

### NHÓM 3 – UC TÌNH HUỐNG PHÁT SINH

Chỉ tạo UC nếu đáp ứng **ÍT NHẤT 1 tiêu chí**:
- Tần suất ≥ 1 lần/tuần, **HOẶC**
- Ảnh hưởng nghiêm trọng: mất dữ liệu, sai lệch tài chính, trải nghiệm KH

Nếu hiếm và có thể xử lý thủ công → ghi chú `"Xử lý thủ công, không cần UC"`.

→ **Confirm Nhóm 3 trước khi sang Nhóm 4.**

---

### NHÓM 4 – UC DANH MỤC ĐẦU VÀO

Các dữ liệu xuất hiện trong **combobox / dropdown** cần cho phép Admin cấu hình
linh động (thêm / sửa / xóa giá trị). Sinh UC CRUD danh mục tương ứng.

> Ví dụ: "Thêm / Sửa / Xóa loại hợp đồng", "Thêm / Sửa / Xóa phòng ban" — KHÔNG đặt tên "Admin quản lý danh mục [X]"

→ **Confirm Nhóm 4 trước khi sang Nhóm 5.**

---

### NHÓM 5 – UC BÁO CÁO

- Tên cụ thể: `"Xem báo cáo [tên cụ thể]"` — KHÔNG dùng "Xem Báo cáo" chung chung
- **KHÔNG sinh** UC "Tạo báo cáo" hay "Xóa báo cáo"
- Với mỗi UC báo cáo: nêu **Actor xem là ai**, báo cáo phục vụ **quyết định gì**

→ **Confirm Nhóm 5 trước khi sang Nhóm 6.**

---

### NHÓM 6 – UC TRA CỨU (không bắt buộc)

Chỉ sinh khi: cần tách riêng chức năng tra cứu cho một nhóm actor cụ thể mà
**KHÔNG thể tận dụng** màn hình Danh sách của nhóm actor khác.

→ **Confirm Nhóm 6 trước khi sang Nhóm 7.**

---

### NHÓM 7 – UC QUẢN LÝ USER VÀ PHÂN QUYỀN

Luôn xem xét. **Tối thiểu** gồm:

| STT | UC tối thiểu |
|-----|-------------|
| 1 | Admin tạo / vô hiệu hóa tài khoản người dùng |
| 2 | Admin phân quyền theo vai trò (role-based) |
| 3 | Người dùng đổi mật khẩu / thông tin cá nhân |

→ **Confirm Nhóm 7. Hỏi user có muốn tổng hợp và xuất Excel không.**

---

## G. FORMAT BẢNG UC KHI CONFIRM TỪNG NHÓM

```
STT | Tên Use case | Tác nhân | Giao dịch | Số GD | BMT | Độ phức tạp | Nhóm
```

- Cột "Tên Use case" và "Tên tác nhân": merge cell theo chiều dọc bao trùm tất cả dòng giao dịch của cùng 1 UC
- Mỗi giao dịch chiếm **1 dòng riêng**
- Sắp xếp UC theo thứ tự **Nhóm 1 → 7**, nhóm UC cùng đối tượng CRUD gần nhau

---

## H. VÍ DỤ UC MẪU ĐẦY ĐỦ

Input: "Hệ thống quản lý đặt bàn nhà hàng"

| STT | Tên Use case | Tác nhân | Giao dịch | Số GD | BMT | Độ phức tạp | Nhóm |
|-----|-------------|----------|-----------|-------|-----|-------------|------|
| 1 | Khách hàng tạo đặt bàn mới | Khách hàng | Khách hàng nhập thông tin đặt bàn. Hệ thống hiển thị form | 3 | B | Đơn giản | Nhóm 1 |
| | | | Khách hàng chọn bàn. Hệ thống kiểm tra tình trạng bàn | | | | |
| | | | Khách hàng xác nhận. Hệ thống lưu và gửi SMS xác nhận | | | | |
| 2 | Lễ tân chỉnh sửa đặt bàn | Lễ tân | Lễ tân tìm đặt bàn cần sửa. Hệ thống hiển thị thông tin | 3 | B | Đơn giản | Nhóm 2 – Update |
| | | | Lễ tân chỉnh số khách / ghi chú. Hệ thống validate | | | | |
| | | | Lễ tân xác nhận lưu. Hệ thống cập nhật và ghi log | | | | |
| 3 | Hệ thống gửi reminder tự động trước giờ đặt | Hệ thống (Job) | Hệ thống kiểm tra lịch đặt bàn trong 2h tới. Hệ thống gửi SMS nhắc khách | 2 | B | Đơn giản | Nhóm 3 – Job |
| | | | Hệ thống cập nhật trạng thái "Đã nhắc" | | | | |
