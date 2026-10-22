# Kế hoạch lát K13 — Kiểm tra viện dẫn văn bản hết hiệu lực

Trạng thái: **ĐỀ XUẤT, chờ duyệt** (chưa code). Ngày lập: 2026-10-19.

## 1. Vì sao cần

Trong bộ mẫu 50 dự thảo có 158 lỗi gài sẵn, trong đó **48 lỗi (30%)** là viện dẫn văn bản đã hết hiệu lực hoặc đang bị ngưng hiệu lực. Bộ đối chiếu điều khoản (FC-014) không bắt được nhóm này vì **0/48 văn bản bị viện dẫn có trong kho** (kho chỉ có văn bản mới thay thế, 17/48). SRS hiện chưa có chức năng nào cho việc này.

## 2. Kết quả khảo sát

**Cách 1 — rút từ kho (điều "Hiệu lực thi hành" của văn bản mới).** Thử trên 20 văn bản mẫu đọc được: rút ra 50 số hiệu được nhắc kèm các từ "hết hiệu lực / bãi bỏ / thay thế". Đối chiếu 38 lỗi viện dẫn có số hiệu: bắt được 8 (21%). Có nhiễu, ví dụ văn bản chỉ bị sửa đổi cũng bị liệt kê, nên **chỉ dùng làm đề xuất, cần quản trị duyệt**. Chỉ biết văn bản bị thay bởi văn bản đã nạp vào kho.

**Cách 2 — tra nguồn chính thống.** Cơ sở dữ liệu quốc gia về pháp luật (Bộ Tư pháp) có tính năng "xác định hiệu lực tự động" và "lịch sử hiệu lực". Có hệ thống chia sẻ dữ liệu `ws.vbpl.vn` dành cho cơ quan nhà nước và phần mềm chuyên ngành. Chưa tìm được tài liệu công khai về địa chỉ dịch vụ cụ thể, cách xác thực hay trường dữ liệu. Trang `vbpl.vn` nạp dữ liệu bằng JavaScript nên không đọc trực tiếp được bằng cách lấy HTML. **Kết luận: phải xin đăng ký kết nối với Bộ Tư pháp. Chưa thể làm kết nối thật trong lát này; chỉ làm khung (adapter) và bản giả.**

## 3. Thiết kế

1. **Danh mục văn bản hết hiệu lực** (dùng chung toàn hệ thống). Mỗi dòng: loại, số hiệu (có thể trống), tên chuẩn, ngày ban hành, tình trạng (hết hiệu lực / ngưng hiệu lực), hiệu lực từ ngày nào đến ngày nào, văn bản thay thế (chữ), nguồn (từ kho / tra cứu ngoài / nhập tay), trạng thái duyệt (đề xuất / đã duyệt / bị bác). Quản trị hệ thống thêm, sửa, duyệt, bác.
2. **Rút viện dẫn từ dự thảo** bằng quy tắc: theo số hiệu (`72/2025/QH15`) và theo tên kèm ngày ("Luật Viên chức ngày 15 tháng 11 năm 2010"). Không gọi AI.
3. **Tra danh mục theo ngày xét hiệu lực của lượt** (FC-012 BR-02). Chỉ dòng "đã duyệt" mới sinh điểm. Văn bản hết hiệu lực trước ngày xét hoặc đang ngưng thì sinh **điểm vi phạm loại "Viện dẫn"**, kèm văn bản thay thế làm đề xuất.
4. **Điểm vi phạm loại Viện dẫn** hiện chung danh sách kết quả với điểm của AI nhưng có nhãn riêng. Cần đổi dữ liệu: điểm hiện bắt buộc có điều khoản căn cứ trong kho, loại Viện dẫn thì không có.
5. **Gợi ý từ kho:** khi nạp văn bản vào kho, việc nền đọc điều "Hiệu lực thi hành" và tạo dòng "đề xuất". Có nút quét lại cho văn bản bất kỳ.
6. **Tra cứu ngoài (khung):** giao diện `TraCuuHieuLuc` và bản giả để test. Khi có tài khoản kết nối thật thì chỉ cần thêm bản kết nối, không đổi phần còn lại. Mặc định tắt. Kết quả tra được lưu vào danh mục, ghi nguồn và ngày tra.
7. **Quyền riêng tư:** chỉ có số hiệu / tên văn bản bị viện dẫn rời hệ thống (khi bật tra cứu ngoài), không có nội dung dự thảo. Ghi vào nhật ký gửi dữ liệu ra ngoài.

## 4. Chia lát

| Lát | Nội dung | Kiểm tra xong khi |
|---|---|---|
| K13a | Bảng danh mục + RLS (đọc: mọi người đăng nhập; ghi: Quản trị hệ thống) + màn quản trị (danh sách, thêm, sửa, duyệt, bác) | Test quyền và chéo đơn vị; thêm/duyệt được |
| K13b | Rút viện dẫn từ dự thảo + điểm loại Viện dẫn + hiển thị ở kết quả (FC-018) | Test từ bảng EX/BR; bộ 48 lỗi đo độ phủ khi danh mục có dữ liệu |
| K13c | Việc nền gợi ý từ kho khi nạp văn bản + nút quét lại | Nạp bộ 20 văn bản mẫu sinh đề xuất như khảo sát |
| K13d | Khung tra cứu ngoài (adapter, bản giả, cấu hình bật/tắt, nhật ký) | Gọi thử bản giả; tắt thì không có yêu cầu ra ngoài |

## 5. Cần sửa SRS (đề xuất, chờ duyệt)

- Thêm chức năng mới "Quản lý danh mục văn bản hết hiệu lực" (số tiếp theo sau FC-042) kèm màn, BR, EX, mã lỗi.
- FC-014: thêm bước kiểm tra viện dẫn không dùng AI; không tính token và chi phí.
- FC-018 / FC-019 / FC-020: điểm loại Viện dẫn (nhãn, không có trang căn cứ trong kho; đánh giá, xuất báo cáo xử lý được).
- FC-013 / nhật ký gửi AI: ghi các lần tra cứu ngoài.

## 6. Rủi ro và lưu ý

- Danh mục rỗng thì chức năng không bắt được gì. Độ phủ phụ thuộc người nhập và nguồn.
- Khi đo trên bộ 48 lỗi, nếu nạp danh mục từ chính đáp án thì kết quả bị "vòng tròn". Cần ghi rõ khi báo cáo; nên đo độ phủ của đề xuất từ kho một cách riêng.
- Văn bản viện dẫn không có số hiệu (10/48 lỗi) chỉ dò được theo tên và ngày; dễ sót hoặc khớp nhầm.
- Quy tắc nhận dạng viện dẫn cần test kỹ để giảm báo nhầm (văn bản chỉ bị sửa đổi không phải hết hiệu lực).

## 7. Câu hỏi mở

1. Ai duyệt dòng "đề xuất"? Đề xuất: Quản trị hệ thống. Dòng từ nguồn chính thống (khi có kết nối thật) có tự duyệt không?
2. Mức độ mặc định của điểm Viện dẫn: Nghiêm trọng (hết hiệu lực) và Cần chỉnh sửa (ngưng hiệu lực)? `[GIẢ ĐỊNH]`
3. Có xin được tài khoản kết nối `ws.vbpl.vn` của Bộ Tư pháp không, và ai là đầu mối?
4. Danh mục dùng chung toàn hệ thống hay đơn vị được có danh mục riêng?
5. Văn bản chỉ bị **sửa đổi, bổ sung** (vẫn còn hiệu lực) có cần cảnh báo nhẹ "đã được sửa đổi" không, hay ngoài phạm vi MVP?
