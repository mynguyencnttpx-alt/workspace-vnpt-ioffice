# TÀI LIỆU YÊU CẦU NGƯỜI DÙNG (URD)
## [Tên hệ thống / Tên dự án]

| Thông tin | Nội dung |
|---|---|
| Khách hàng | [Tên khách hàng] |
| Phiên bản | v1.0 |
| Ngày | [dd/mm/yyyy] |
| Người soạn | [Tên BA] |
| Trạng thái | Dự thảo / Chờ chốt / Đã chốt |
| Phiên chốt | [Ví dụ: Phiên 1/3 — Module Văn bản đến] |

> **Ghi chú cho người đọc:** Tài liệu này mô tả **hệ thống sẽ hỗ trợ những công việc gì** và **giao diện thể hiện như thế nào ở mức tổng quan**, để quý khách hàng cùng rà soát và xác nhận trước khi đội ngũ kỹ thuật bắt đầu xây dựng chi tiết. Tài liệu **không** đi vào các chi tiết kỹ thuật (mã nguồn, cấu trúc dữ liệu, validation...) — những nội dung đó sẽ được đặc tả riêng ở giai đoạn sau (SRS) dành cho đội phát triển.
>
> **⚠️ Lưu ý khi gửi bản chính thức:** Trước khi gửi cho khách hàng, thay toàn bộ sơ đồ (đánh dấu 🖼️ bên dưới) bằng **ảnh đã render** (xuất từ Figma/draw.io/Mermaid Live Editor), không để lại code sơ đồ dạng chữ — khách hàng đọc file `.md`/Word/PDF thô sẽ không xem được sơ đồ dạng code.

---

## TÓM TẮT NHANH (dành cho người bận, đọc trong 3 phút)

| Mục | Nội dung |
|---|---|
| **Vấn đề đang gặp** | [1 câu] |
| **Mục tiêu hệ thống mới** | [1 câu, có con số nếu có] |
| **Phạm vi đợt này** | [Tên các module, ví dụ: Văn bản đến, Văn bản đi, Trình ký] |
| **Số lượng màn hình chính** | [N màn hình] |
| **Số lượng yêu cầu cần chốt** | [N yêu cầu] |
| **Đối tượng sử dụng** | [Liệt kê ngắn gọn các vai trò] |

🖼️ *[Chèn 1 ảnh màn hình tiêu biểu nhất — màn hình khách hàng sẽ dùng nhiều nhất, để hình dung nhanh trước khi đọc chi tiết]*

---

## MỤC LỤC

1. [Bối cảnh & Mục tiêu](#1-bối-cảnh--mục-tiêu)
2. [Đối tượng sử dụng](#2-đối-tượng-sử-dụng)
3. [Luồng nghiệp vụ tổng quan](#3-luồng-nghiệp-vụ-tổng-quan)
4. [Màn hình & thao tác](#4-màn-hình--thao-tác)
5. [Yêu cầu chức năng chi tiết](#5-yêu-cầu-chức-năng-chi-tiết)
6. [Ngoài phạm vi dự án](#6-ngoài-phạm-vi-dự-án)
7. [Tiêu chí nghiệm thu](#7-tiêu-chí-nghiệm-thu)
8. [Xác nhận chốt nghiệp vụ](#8-xác-nhận-chốt-nghiệp-vụ)

---

## 1. Bối cảnh & Mục tiêu

**Vấn đề hiện tại**
> [Mô tả ngắn gọn khó khăn khách hàng đang gặp phải, bằng ngôn ngữ nghiệp vụ hàng ngày. Ví dụ: "Hiện nay việc trình ký văn bản giữa các phòng ban mất trung bình 3 ngày do phải chuyển bản giấy qua nhiều cấp lãnh đạo."]

**Mục tiêu khi có hệ thống mới**
> [Kỳ vọng cụ thể, đo lường được. Ví dụ: "Giảm thời gian trình ký xuống còn 1 ngày làm việc; lãnh đạo có thể duyệt văn bản ngay trên điện thoại."]

**Phạm vi đợt triển khai này**
> [Tóm tắt 3-5 gạch đầu dòng những nhóm nghiệp vụ chính sẽ được xây dựng trong đợt này]

---

## 2. Đối tượng sử dụng

### 👤 [Vai trò 1 — ví dụ: Văn thư]
- **Là ai:** [Mô tả ngắn, ví dụ: Chị Lan, nhân viên văn thư phòng Hành chính]
- **Công việc hàng ngày liên quan hệ thống:** [2-3 gạch đầu dòng]
- **Điều họ cần hệ thống hỗ trợ:** [2-3 gạch đầu dòng]

### 👤 [Vai trò 2 — ví dụ: Lãnh đạo]
- **Là ai:** [...]
- **Công việc hàng ngày liên quan hệ thống:** [...]
- **Điều họ cần hệ thống hỗ trợ:** [...]

*(Lặp lại cho mỗi vai trò/actor chính)*

---

## 3. Luồng nghiệp vụ tổng quan

🖼️ *[Chèn ảnh sơ đồ luồng đã render — dạng khối (box) + mũi tên đơn giản, không dùng ký hiệu BPMN phức tạp]*

**Diễn giải luồng bằng lời:**
1. [Bước 1] — [Ai làm, khi nào, để làm gì]
2. [Bước 2] — [...]
3. [Điểm quyết định] — [Câu hỏi tự nhiên, ví dụ: "Nếu lãnh đạo không đồng ý thì văn bản được trả lại cho người trình kèm lý do."]

---

## 4. Màn hình & thao tác

> Mỗi màn hình chính được trình bày gọn trong **một khối duy nhất**: ảnh minh họa + diễn giải đi kèm nhau, không tách bảng liệt kê riêng để đỡ phải lật qua lật lại.

### 🖥️ Màn hình 1 — [Tên màn hình]
**Ai dùng:** [Vai trò] · **Dùng để:** [Mục đích 1 câu]

🖼️ *[Ảnh wireframe đen trắng — bố cục tổng thể, chưa cần màu sắc/font thật]*

| # | Khu vực | Diễn giải |
|---|---|---|
| ① | [Tên khu vực, ví dụ: Ô tìm kiếm] | [Mô tả ngắn, ví dụ: "Cho phép tìm nhanh văn bản theo số hiệu hoặc trích yếu."] |
| ② | [Tên khu vực] | [...] |

*(Lặp lại khối "🖥️ Màn hình N" cho mỗi màn hình quan trọng — khuyến nghị không quá 5-7 màn hình trong 1 lần chốt, xem "Cách dùng file" ở cuối tài liệu)*

### Luồng chuyển giữa các màn hình

🖼️ *[Chèn ảnh sơ đồ: Màn hình A → (hành động) → Màn hình B → ...]*

### Ví dụ tình huống thực tế

> **Tình huống:** [Tên nhân vật] nhận [việc gì] → mở màn hình [A] → [thao tác] → hệ thống hiển thị [B] → [tiếp tục thao tác]...

---

## 5. Yêu cầu chức năng chi tiết

> Nhóm theo module nghiệp vụ khách hàng quen thuộc. Mỗi yêu cầu viết ngắn gọn theo mạch: **cần gì → vì sao → lưu ý gì**, tránh lặp khuôn câu máy móc.

### Module: [Tên module — ví dụ: Quản lý văn bản đến]

#### UR01 — [Tên yêu cầu ngắn gọn]

[Vai trò] cần [mô tả việc cần làm được], nhằm [lợi ích/mục đích]. [Nếu có ví dụ thực tế thì kể ngắn gọn trong 1-2 câu tiếp theo, không tách riêng dòng "Ví dụ:"].

- **Lưu ý đặc biệt:** [Diễn giải business rule bằng ví dụ tình huống. Ví dụ: "Nếu văn bản được đánh dấu 'Khẩn', hệ thống gửi thông báo ngay cho lãnh đạo thay vì chờ theo lịch."] *(bỏ dòng này nếu không có lưu ý gì đặc biệt)*
- **Màn hình liên quan:** [Tên màn hình ở mục 4]
- **Mức độ ưu tiên:** Cao / Trung bình / Thấp

*(Lặp lại cho mỗi yêu cầu — UR02, UR03...)*

> 💡 **Nếu module có trên 15-20 yêu cầu:** tách thành các phiên chốt riêng theo module hoặc theo nhóm chức năng (xem mục "Cách dùng file" cuối tài liệu), tránh dồn hết vào một buổi họp khiến việc rà soát bị hời hợt.

---

## 6. Ngoài phạm vi dự án

- [Nội dung không làm 1 — ví dụ: "Không tích hợp chữ ký số với nhà cung cấp X trong đợt này"]
- [Nội dung không làm 2]
- [Nội dung không làm 3]

---

## 7. Tiêu chí nghiệm thu

| # | Tiêu chí |
|---|---|
| 1 | **Khi** [tình huống], **thì** hệ thống phải [kết quả mong đợi] |
| 2 | **Khi** [tình huống], **thì** hệ thống phải [kết quả mong đợi] |

---

## 8. Xác nhận chốt nghiệp vụ

| Đại diện | Họ tên | Chữ ký | Ngày |
|---|---|---|---|
| Khách hàng | | | |
| VNPT-IT (BA/PO) | | | |

---

## PHỤ LỤC

- Bảng thuật ngữ (nếu có từ chuyên ngành khách hàng chưa quen)
- Danh sách câu hỏi mở / vấn đề cần làm rõ thêm sau buổi chốt

---

## CÁCH DÙNG FILE NÀY (hướng dẫn nội bộ cho BA — xóa mục này trước khi gửi khách hàng)

1. **Trước khi gửi khách:** render toàn bộ sơ đồ (Mermaid/draw.io/Figma) thành ảnh PNG/JPG, chèn thay cho các vị trí 🖼️. Không gửi file có code sơ đồ dạng chữ.
2. **Dự án nhiều module/màn hình (>15-20 UR hoặc >7 màn hình):** tách file này thành nhiều bản theo từng phiên chốt, ví dụ:
   - `URD_[TenHT]_Phien1_VanBanDen_v1.0.md`
   - `URD_[TenHT]_Phien2_VanBanDi_v1.0.md`
   - Mỗi bản giữ nguyên cấu trúc 8 mục, nhưng mục 4-5 chỉ chứa nội dung của module đang chốt trong phiên đó.
3. **Sau khi tất cả phiên đã chốt:** gộp lại thành 1 bản tổng hợp để lưu hồ sơ, đồng thời "dịch" sang format `BM_URD` chuẩn VNPT phục vụ audit nội bộ.
4. **Trang Tóm tắt nhanh:** luôn cập nhật lại số liệu (số màn hình, số UR) mỗi khi nội dung thay đổi, tránh để lệch với phần chi tiết.
