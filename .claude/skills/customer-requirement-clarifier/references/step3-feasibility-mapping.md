# BƯỚC 3 — Đối chiếu hệ thống hiện có & nhận định khả thi sơ bộ

Gộp logic từ 3 kỹ thuật: as-is-process-investigator, constraint-detector,
requirements-gap-auditor.

**Lưu ý quan trọng:** skill này KHÔNG tự đọc source code hay tài liệu SRS
cũ của hệ thống (iOffice/iStorage...) trừ khi user cung cấp/đính kèm hoặc
skill có công cụ đọc file. Nếu chưa có thông tin hệ thống hiện có trong
cuộc trò chuyện, **hỏi user** trước khi kết luận, thay vì tự suy đoán hệ
thống đã có/chưa có chức năng gì.

## 3.1. Đối chiếu với luồng/chức năng hiện có (hiện trạng)

Chỉ thực hiện bước này với yêu cầu đã ở trạng thái `Đủ` hoặc
`Tạm đủ (có giả định)` từ Bước 2. Với mỗi yêu cầu:

- Xác định chức năng/module hệ thống hiện có liên quan trực tiếp (ví dụ:
  luồng phát hành văn bản đi, module quản lý hồ sơ lưu trữ, phân quyền theo
  vai trò...). Nếu không chắc hệ thống hiện tại có chức năng này hay không,
  ghi `[CẦN XÁC MINH]` và hỏi lại user/BA phụ trách module đó.
- So sánh yêu cầu mới với luồng hiện tại: yêu cầu này là mở rộng thêm bước
  trong luồng có sẵn, hay đòi hỏi luồng hoàn toàn mới, hay mâu thuẫn với
  luồng hiện tại (ví dụ thay đổi thứ tự phê duyệt đã được duyệt trong thiết
  kế hiện hành)?

## 3.2. Rà soát các ràng buộc

Kiểm tra yêu cầu có va vào ràng buộc nào đã biết không:
- Ràng buộc kỹ thuật: kiến trúc hiện tại, giới hạn tích hợp (ký số, LGSP,
  trục liên thông văn bản quốc gia...).
- Ràng buộc pháp lý/quy định: Nghị định 30/2020, Luật Lưu trữ, Nghị định
  82/2024, QĐ 671 — nếu yêu cầu khách đưa ra trái với quy định bắt buộc, ghi
  rõ đây là điểm cần trao đổi lại với khách, không tự ý bỏ qua ràng buộc.
- Ràng buộc tổ chức: phân quyền, cấp phê duyệt theo mô hình tổ chức của
  khách hàng (nếu khác chuẩn).

## 3.3. Nhận định khả thi sơ bộ

Dựa trên 3.1 và 3.2, gán 1 trong 4 nhận định (đúng như cột trong bảng output
ở SKILL.md):

- **Khả thi trong phạm vi hiện có** — chức năng/luồng đã có sẵn nền tảng,
  chỉ cần cấu hình hoặc mở rộng nhỏ, không vi phạm ràng buộc nào đã biết.
- **Cần mở rộng/tùy biến** — cần phát triển thêm chức năng/luồng mới, nhưng
  không mâu thuẫn với thiết kế/ràng buộc hiện tại.
- **Xung đột với thiết kế hiện tại** — yêu cầu đi ngược lại luồng/rule/ràng
  buộc đang áp dụng, cần trao đổi lại với khách hàng trước khi triển khai
  (không tự quyết định chọn hướng nào thay khách).
- **Chưa đủ căn cứ kết luận** — dùng cho yêu cầu vẫn đang `Tạm đủ (có giả
  định)` mà giả định đó ảnh hưởng trực tiếp đến kết luận khả thi, hoặc chưa
  xác minh được chức năng hệ thống liên quan.

## 3.4. Rà soát khoảng trống trước khi tổng hợp

Trước khi chốt bảng kết quả cuối cùng, rà lại toàn bộ danh sách một lượt:
- Có yêu cầu nào ảnh hưởng đến actor/vai trò chưa được nhắc tới không?
- Có yêu cầu nào ảnh hưởng đến dữ liệu/trường thông tin cần bổ sung mà chưa
  ai hỏi khách không?
- Có yêu cầu nào ảnh hưởng lẫn nhau (yêu cầu A phụ thuộc kết quả làm rõ của
  yêu cầu B) — nếu có, ghi chú liên kết giữa các ID trong bảng.

Đây là bước kiểm tra chất lượng cuối, không phải bước phân tích mới — chỉ bổ
sung câu hỏi/ghi chú còn thiếu vào bảng đã có ở Bước 1-2, không phân tích lại
từ đầu.
