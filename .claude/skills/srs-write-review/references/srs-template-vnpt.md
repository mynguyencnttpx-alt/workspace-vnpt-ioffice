# SRS TEMPLATE — VNPT iOffice (BM_SRS_AI)

> Đây là template chuẩn theo biểu mẫu BM_SRS_AI của VNPT iOffice.
> Dùng làm nguồn sự thật duy nhất về cấu trúc heading và layout bảng.

---

# NỘI DUNG

## ĐẶC TẢ YÊU CẦU CHỨC NĂNG HỆ THỐNG

### PHÂN HỆ <N> / MODULE <N>

[Tùy dự án, không bắt buộc vẽ sơ đồ thể hiện các chức năng của phân hệ]

- Yêu cầu tính năng chung của phân hệ
- Ví dụ: Quản lý, khai báo, định nghĩa các danh mục dùng chung cho phân hệ.
- Thực hiện quy trình nghiệp vụ theo các bước: tạo → kiểm duyệt → xuất bản.

---

#### Module <N>: <Tên module>

##### Mô tả tóm tắt

<Mô tả chức năng, mục tiêu, phạm vi của module — ai dùng, dùng để làm gì, trong bối cảnh nghiệp vụ nào>

---

##### Phạm vi chỉnh sửa

- Các chức năng và menu liên quan bị ảnh hưởng:
  - <Tên chức năng / menu 1>
  - <Tên chức năng / menu 2>

---

##### Yêu cầu giao diện

- Hình ảnh giao diện / mockup:

  <Chèn hình mockup hoặc mô tả layout. Nếu có hành vi UI/UX đặc biệt → mô tả bổ sung ngay bên dưới hình (ví dụ: kéo thả để sắp xếp, vuốt để xóa, infinite scroll, drag & drop giữa các cột, tooltip khi hover, v.v.)>

- Bảng mô tả các trường thông tin trên giao diện:

> Cột "Ràng buộc / Điều kiện" ghi đầy đủ: giá trị mặc định, điều kiện enable/disable/hiển thị, danh sách giá trị dropdown (liệt kê cụ thể), ràng buộc nhập liệu.
> Khi màn hình có nhiều khu vực → thêm dòng header nhóm span toàn bảng (in đậm).

| Tên trường thông tin | Kiểu điều khiển | Độ dài | Ràng buộc / Điều kiện | Kiểu dữ liệu |
|---------------------|----------------|--------|----------------------|--------------|
| **Box các tiêu chí tìm kiếm** | | | | |
| <Tên field> | Textbox / Combobox / DatePicker / Checkbox / ... | - | <Ghi đầy đủ: mặc định, điều kiện, danh sách giá trị nếu là dropdown> | String / Number / Date / Data list |

---

##### Chức năng <N>: <Tên chức năng>

###### Quy trình

[Vẽ luồng theo kiểu Sequence Diagram — có thể có hoặc không tùy trường hợp:
- Nếu chức năng có quy trình rõ ràng, nhiều actor/hệ thống tương tác qua lại → vẽ diagram
- Nếu chỉ là chỉnh sửa nhỏ ở nhiều màn hình → có thể không cần]

###### Chức năng nghiệp vụ

> Xác định đúng loại trước khi viết — mỗi nội dung chỉ ghi vào đúng 1 chỗ:
> - Bước thực hiện theo thứ tự → ① Luồng thành công
> - Tình huống lỗi / rẽ nhánh có xử lý định sẵn → ② Luồng ngoại lệ
> - Logic nghiệp vụ phức tạp, không phải lỗi, không phải bước tuần tự → ③ Quy tắc nghiệp vụ
> - Ràng buộc nhập liệu của 1 trường cụ thể → Bảng field (Yêu cầu giao diện), không ghi ở đây

**① Luồng xử lý thành công**

> Viết theo khối đoạn văn + gạch đầu dòng, KHÔNG dùng bảng — xem quy tắc và ví dụ đầy đủ trong `writing-rules.md` B.2.

```
[Bước N: nếu có nhiều bước] <Actor> <hành động — ngắn gọn>, hệ thống thực hiện:
- <Xử lý 1 — validate, lưu DB, v.v.>
- <Xử lý 2 — nếu có gửi thông báo ghi ngắn "Gửi thông báo", chi tiết để ở mục Thông báo & Log>
```

Chỉ 1 bước/trigger duy nhất → bỏ tiền tố "Bước N:". Nhiều bước nối tiếp → đánh số `Bước 1:`, `Bước 2:`... và viết nối tiếp từng khối.

**② Luồng xử lý ngoại lệ**

| Mã | Tình huống | Xử lý |
|----|-----------|-------|
| EX-01 | <Điều kiện kích hoạt: validation fail, timeout, thiếu quyền, trùng dữ liệu...> | <Message hiển thị + hành động hệ thống: rollback, redirect, log...> |

**③ Quy tắc nghiệp vụ**

- BR-01: <Trigger> → <Logic> → <Output>
- BR-02: <Trigger> → <Logic> → <Output>

###### Thông báo và thông tin lưu vết log

**Thông báo hệ thống**

| Sự kiện kích hoạt | Người nhận | Kênh | Nội dung thông báo |
|------------------|-----------|------|-------------------|
| <Sự kiện> | <Người nhận> | SMS / Notify / Email | <Nội dung cú pháp thông báo> |

**Log hệ thống (Audit Trail)**

Lưu lại log thao tác vào cơ sở dữ liệu với các thông tin:
- Người thao tác (user ID + tên)
- Thời gian (timestamp)
- Hành động (tạo / sửa / xóa / chuyển trạng thái)
- Dữ liệu trước và sau thay đổi (nếu applicable)

###### Edge cases

- <Mô tả trường hợp bổ sung / bất thường cần chú ý>
- Người dùng thao tác đồng thời trên cùng bản ghi
- Mất kết nối giữa chừng khi submit
- Trùng dữ liệu (số hiệu, mã đối tượng,...)
- Upload file vượt dung lượng cho phép
- <Thêm edge case đặc thù của module>

---

##### Chức năng <N+1>: Cung cấp API <tên nghiệp vụ> cho <tên hệ thống/đối tác>

[Áp dụng khi hệ thống mình CUNG CẤP API cho bên ngoài gọi vào — xem chi tiết `references/integration-rules.md`]

###### Đặc tả API

**Thông tin chung**

| Thông tin | Giá trị |
|---|---|
| Endpoint | `<method> /api/v1/...` |
| Cơ chế xác thực | <API Key / OAuth2 / Token> |
| Hệ thống/đối tác được phép gọi | <Tên hệ thống đối tác> |

**Bảng Request**

| Tên field | Vị trí | Kiểu dữ liệu | Bắt buộc | Mô tả / Ràng buộc | Mapping với hệ thống |
|---|---|---|---|---|---|
| <field> | Path/Query/Body/Header | <kiểu> | ✅/⚪ | <ràng buộc> | <bảng/field tương ứng trong hệ thống mình> |

**Bảng Response**

| Tên field | Kiểu dữ liệu | Mô tả / Ràng buộc | Mapping với hệ thống |
|---|---|---|---|

| HTTP Status | Mã lỗi nội bộ | Tình huống | Nội dung trả về |
|---|---|---|---|

###### Chức năng nghiệp vụ

[Áp dụng đúng cấu trúc ① Luồng thành công / ② Luồng ngoại lệ / ③ Quy tắc nghiệp vụ như chức năng UI thông thường — mỗi dòng response lỗi ở trên cần 1 EX-XX tương ứng]

---

##### Ghi chú khi Chức năng GỌI API hệ thống khác (hướng Consume)

[Không tách chức năng riêng — bổ sung mục "Đặc tả tích hợp API" ngay trong Chức năng nghiệp vụ hiện có, sau bảng ① Luồng thành công. Xem chi tiết và bảng mẫu Mapping Request / Mapping Response tại `references/integration-rules.md`]

---

## ĐIỀU KIỆN NGHIỆM THU HỆ THỐNG

<Mô tả quy trình và các điều kiện để hệ thống được nghiệm thu>

Ví dụ — Hệ thống được nghiệm thu khi thỏa các điều kiện sau:

- Hệ thống được thiết kế và vận hành theo mô tả trong tài liệu này, đồng thời đáp ứng toàn bộ các Yêu cầu Chức năng ghi nhận trong tài liệu
- Hệ thống được hiệu chỉnh sau khi triển khai thử nghiệm
- Tổ chức hướng dẫn sử dụng cho người dùng
- Người sử dụng thao tác tốt trên hệ thống sau khi qua khóa đào tạo
- Tất cả tài liệu và source chương trình được bàn giao đầy đủ

---

# PHỤ LỤC (NẾU CÓ)

- Danh mục dùng chung (dropdown values, loại văn bản,...)
- Mapping dữ liệu tổng thể (nếu migrate dữ liệu cũ, hoặc tổng hợp lại toàn bộ mapping API đã đặc tả rải rác ở từng chức năng — xem `references/integration-rules.md`)
- BPMN / Sơ đồ luồng tổng thể
