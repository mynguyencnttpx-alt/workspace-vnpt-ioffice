# Review snapshot — kiem-tra-phap-ly (SRS v0.1)

Tài liệu: `docs/kiem-tra-phap-ly/SRS.md` · Bước 3.5 AI tự review · 2026-10-16 · Không có context hệ thống ngoài (`[Không có context hệ thống — không kiểm tra được logic contradiction với module khác]`).

## 1. Bảng tổng hợp vấn đề

| STT | Mục SRS | Vấn đề tóm tắt | Mức độ | Góc nhìn | Gợi ý sửa ngắn |
|-----|---------|----------------|--------|----------|----------------|
| 1 | Điều kiện nghiệm thu; toàn tài liệu | Chưa có chỉ tiêu hiệu năng định lượng (số khách hàng, người dùng đồng thời, lượt/ngày, thời gian tối đa một lượt, dung lượng lưu trữ). Khách hàng chưa cung cấp | 🟠 Major | Dev | Thu thập số liệu rồi bổ sung bảng NFR có con số đo được |
| 2 | FC-014 BR-01, BR-05 | Tham số lõi quyết định chất lượng đối chiếu chưa chốt: số điều khoản ứng viên N, ngưỡng liên quan, ngưỡng chất lượng nghiệm thu | 🟠 Major | BA, Dev | Chạy thử trên bộ dự thảo mẫu có đáp án, chốt N và ngưỡng, ghi vào BR |
| 3 | FC-001, FC-014, FC-023, FC-028, FC-042 | Điểm tích hợp thiếu thông tin đối tác: cơ chế SSO với iOffice, API nhà cung cấp AI, xác thực và đường dẫn API iOffice (đều `[CẦN XÁC NHẬN]`) | 🟠 Major | Dev | Nhận tài liệu API từ iOffice và nhà cung cấp AI, bổ sung bảng mapping chính thức |
| 4 | Yêu cầu giao diện mọi module | Chưa có hình mockup (`[CẦN BỔ SUNG ẢNH]`); bảng field chưa đối chiếu với wireframe | 🟡 Minor | BA | Chạy `/wireframe-ascii` rồi chèn ảnh, đối chiếu lại bảng field |
| 5 | FC-018 BR-01, FC-017 BR-01, FC-041 | Quản trị không xem được nội dung dự thảo và kết quả của người khác (giả định bảo vệ dữ liệu). Cần khách hàng xác nhận, có thể cần chức năng hỗ trợ riêng | 🟡 Minor | BA | Xác nhận với khách hàng, ghi thành quyết định |
| 6 | FC-027 BR-02 | Cách nhận dạng "Họ tên cá nhân" và "Địa chỉ cụ thể" bằng quy tắc (không dùng AI) có độ chính xác thấp, chưa có phương án | 🟡 Minor | Dev | Chọn phương án (từ điển, mẫu, hoặc chỉ nhận dạng theo từ khóa người dùng khai) |
| 7 | FC-035, FC-036 | Chức năng báo cáo gồm cả xem, drill-down và xuất Excel (output khác nhau) trong một chức năng, lệch Rule B | 💡 Suggestion | BA | Tách "Xuất Excel" nếu quyền xuất cần khác quyền xem |
| 8 | FC-033 EX-01, FC-034 EX-01, FC-014 EX-04 | Dùng mã lỗi hiển thị cho thông tin/ghi log nội bộ | 💡 Suggestion | QA | Tách mã lỗi hiển thị khỏi thông báo log nội bộ khi viết test case |

Đã tự sửa trong vòng tự review: bỏ tham chiếu chức năng "Tính lại chi phí" chưa có đặc tả (FC-030 BR-04); thêm tùy chọn "Nhận thông báo qua email" vào FC-004 vì FC-012 và FC-033 nhắc đến; thêm Phụ lục 3 đối chiếu UC và FC.

## 2. Phân tích chi tiết (Critical và Major)

**Vấn đề 1 — Thiếu NFR định lượng**

- Vị trí: Điều kiện nghiệm thu (mục "Chỉ tiêu hiệu năng"), FC-007 Edge cases, FC-012 Edge cases.
- Rủi ro nếu không sửa: dev không có mốc để thiết kế hàng đợi, lưu trữ và đa đơn vị; không có tiêu chí nghiệm thu hiệu năng.
- Đề xuất: bổ sung các chỉ tiêu: số khách hàng, người dùng đồng thời cao điểm, số lượt kiểm tra mỗi ngày, thời gian tối đa một lượt với dự thảo 50 trang, thời gian tải danh sách, dung lượng lưu trữ.

**Vấn đề 2 — Tham số lõi của đối chiếu chưa chốt**

- Vị trí: FC-014 BR-01 (N, ngưỡng liên quan), BR-05; Điều kiện nghiệm thu.
- Rủi ro nếu không sửa: dev tự chọn giá trị khác nhau, chất lượng kết quả và chi phí token không dự đoán được.
- Đề xuất: đặt N mặc định 5, ngưỡng liên quan đo bằng bộ dự thảo mẫu có đáp án; ghi giá trị cuối vào BR.

**Vấn đề 3 — Thiếu tài liệu tích hợp**

- Vị trí: FC-001 (xác thực iOffice), FC-014 (nhà cung cấp AI), FC-023 và FC-042 (API iOffice).
- Rủi ro nếu không sửa: endpoint, cơ chế xác thực, tên field có thể sai khi triển khai.
- Đề xuất: nhận tài liệu API chính thức, thay các `[CẦN XÁC NHẬN]` bằng giá trị thật trước khi giao dev.

## 3. Điểm mạnh

- Truy vết đủ: Phụ lục 3 nối 47 UC với 42 FC; mã lỗi `E-kiem-tra-phap-ly-NNN` duy nhất, cấp tự động.
- Mỗi chức năng đủ luồng thành công, ngoại lệ, quy tắc nghiệp vụ theo cụm, thông báo và log, edge cases; các quyết định đã chốt (QĐ-11 đến QĐ-18, OQ-1 đến OQ-10) được áp dụng nhất quán.
- Phân tách trách nhiệm rõ giữa vai trò (người dùng thường không đổi phạm vi, chỉ Quản trị thấy chi phí), dữ liệu nhạy cảm không đi vào log.
- Các điểm chưa biết được đánh dấu `[CẦN XÁC NHẬN]` hoặc `[GIẢ ĐỊNH]` thay vì bịa số.

## 4. Đánh giá tổng thể

| Tiêu chí | Trọng số | Điểm (0–10) | Điểm có trọng số |
|---|---|---|---|
| Tính đầy đủ (Completeness) | 50% | 7.0 | 3.50 |
| Tính rõ ràng (Clarity) | 20% | 8.0 | 1.60 |
| Tính nhất quán (Consistency) | 20% | 8.0 | 1.60 |
| Đúng định dạng (Formatting) | 10% | 9.0 | 0.90 |
| **Tổng điểm** | 100% | | **7.6/10** |

Trạng thái phê duyệt: ⚠️ **Conditional Approval** (có Major, không có Critical).

Điều kiện để approve: (1) bổ sung chỉ tiêu hiệu năng định lượng; (2) chốt tham số đối chiếu N và ngưỡng; (3) có tài liệu tích hợp iOffice và nhà cung cấp AI. Các điều kiện này phụ thuộc thông tin từ khách hàng nên không tự sửa được.

Lưu ý: đây là bản tự chấm của người viết nên có thể thiên lệch; nên có BA khác hoặc khách hàng review lại.

## 5. Checklist sẵn sàng phát triển

- [ ] ✅ Yêu cầu có ID duy nhất (FC, EX, BR, mã lỗi) và truy vết về UC
- [ ] ⚠️ Acceptance criteria đo lường được: có cho phần chức năng, chưa có ngưỡng chất lượng AI
- [ ] ❌ NFR có con số định lượng cụ thể
- [ ] ✅ Trường thông tin cần lưu được mô tả đủ (bảng field và Phụ lục 2)
- [ ] ✅ Tiêu chí tìm kiếm có kiểu so khớp, sắp xếp mặc định, công thức field tính toán
- [ ] ⚠️ API tích hợp đã xác định hướng và loại nhưng thiếu thông tin từ đối tác
- [ ] ✅ Luồng lỗi, edge case, negative case đã mô tả
- [ ] ✅ Phân quyền và bảo mật có spec (FC-041, FC-013, FC-028)
- [ ] ❌ Chưa sign-off bởi stakeholder có thẩm quyền


---

# Vòng 2 — review độc lập và cập nhật SRS lên v0.2 (2026-10-16)

Kiểm tra cơ học: 101 mã lỗi duy nhất, không tham chiếu FC/BR/EX gãy, 8/8 sơ đồ mermaid đạt, mọi mã EX đều được trỏ từ Luồng thành công.

| STT | Vấn đề vòng 2 | Mức | Trạng thái |
|---|---|---|---|
| 1 | Thiếu Ngày hết hiệu lực, mâu thuẫn giữa lọc theo ngày và tình trạng đặt tay | 🟠 Major | Đã sửa: thêm trường, tình trạng tự tính (FC-005, FC-007, FC-008 BR-03, FC-012 BR-01) |
| 2 | Quản trị đơn vị sửa, hủy được văn bản chia sẻ nhiều đơn vị | 🟠 Major | Đã sửa: thêm "Đơn vị tạo", giới hạn quyền (FC-008 BR-01, FC-009 BR-01, EX-05) |
| 3 | Không có nơi xem thông báo, thiếu đặc tả Trang chủ | 🟠 Major | Đã sửa: bảng Trang chủ, FC-001 Bước 3, BR-08 và BR-09 |
| 4 | Đơn vị tính chi phí không xác định với Quản trị hệ thống và Quản trị đơn vị nhiều đơn vị | 🟠 Major | Đã sửa: FC-012 BR-07; vẫn `[CẦN XÁC NHẬN]` cách xử lý cho Quản trị hệ thống |
| 5 | Thiếu yêu cầu bảo mật và NFR định lượng | 🟠 Major | Một phần: đã thêm yêu cầu bảo mật `[GIẢ ĐỊNH]`; NFR định lượng chờ số liệu khách hàng |
| 6 | Tài khoản iOffice lần đầu: FC-001, FC-039, FC-023, FC-024 không thống nhất | 🟡 Minor | Đã sửa: FC-001 BR-07 và đồng bộ lời văn |
| 7 | Mã EX không được trỏ từ bước luồng | 🟡 Minor | Đã sửa: dòng "Ngoại lệ phát sinh theo điều kiện" ở 32 chức năng |
| 8 | Định nghĩa kho đối chiếu, văn bản cá nhân của quản trị | 🟡 Minor | Đã sửa: FC-012 trường Kho đối chiếu, FC-009 |
| 9 | Hành vi điều khiển Quản trị xem lượt, màn Hủy, nút "Gửi lại" | 🟡 Minor | Đã sửa: FC-017, FC-015, FC-018 |
| 10 | Căn cứ pháp lý khi gửi dữ liệu ra nước ngoài | 💡 | Đã ghi `[CẦN XÁC NHẬN với pháp chế]` ở Điều kiện nghiệm thu |

Điểm vòng 2: Completeness 7.2, Clarity 8.0, Consistency 8.5, Formatting 9.0 → **7.8/10**, ⚠️ Conditional Approval.

Điều kiện còn tồn (cần khách hàng): chỉ tiêu hiệu năng định lượng; tham số đối chiếu AI (N, ngưỡng); tài liệu API iOffice và nhà cung cấp AI; xác nhận cách xử lý Quản trị hệ thống khi gửi dự thảo; mockup sau khi có wireframe.

---

# Vòng 3 — review SRS v1.1 theo bố cục mới (2026-10-17)

Tài liệu: `docs/kiem-tra-phap-ly/SRS.md` v1.1 (draft) · Chế độ REVIEW · Người review: AI (cùng phiên với người viết, nên có thể thiên lệch; nên có BA khác hoặc khách hàng đọc lại).

Context đã dùng: user flow `srs/kiem-tra-phap-ly-userflow.md` (hash bce7b0d6), wireframe ASCII và Figma của flow 4 và 5. `[Không có context hệ thống iOffice — không kiểm tra được logic contradiction với module phía iOffice]`.

Kiểm tra cơ học: 101 mã lỗi duy nhất, không có mã được nhắc mà thiếu dòng định nghĩa, 8/8 sơ đồ mermaid đạt, không còn tham chiếu tới slug màn cũ (tom-luoc-du-thao, xu-ly-nhay-cam, kiem-tra-loi, ket-qua-tong-quan, danh-sach-vi-pham, chi-tiet-vi-pham, danh-gia-ket-qua) ngoài phụ lục lịch sử thay đổi và màn popup.

## 1. Bảng tổng hợp vấn đề

| STT | Mục SRS | Vấn đề tóm tắt | Mức độ | Góc nhìn | Gợi ý sửa ngắn |
|-----|---------|----------------|--------|----------|----------------|
| 1 | FC-014 và Module 4 (bảng màn Đang xử lý) | Màn Đang xử lý hiển thị trạng thái theo từng văn bản (Chờ, Đang đối chiếu, Xong kèm số điểm) nhưng FC-014 xử lý theo từng đoạn dự thảo, mỗi đoạn lấy ứng viên từ nhiều văn bản. "Văn bản đang đối chiếu" và "Xong" không xác định được; điểm vi phạm "xuất hiện dần" cũng chưa có cơ chế lưu từng phần | 🟠 Major | Dev, BA | Đổi thành "văn bản đã được tham chiếu đến nay" (đếm số đoạn, số điểm), hoặc bỏ cột trạng thái; làm POC trước khi cam kết |
| 2 | Phụ lục 2 (dữ liệu), FC-012 BR-08, FC-014, FC-016 | Danh sách nguồn đã tích của từng lượt là dữ liệu mới nhưng Phụ lục 2 vẫn ghi "Kho đối chiếu"; chưa nêu lưu bản chụp để chạy lại (FC-016 EX-03 dựa vào ảnh chụp kho) | 🟠 Major | Dev | Thêm dòng "Danh sách văn bản nguồn đã tích của lượt" vào Phụ lục 2; ghi rõ lưu mã văn bản và phiên bản tại thời điểm gửi |
| 3 | FC-024, Module 6 (bảng popup), dòng "Kho đối chiếu" | Popup vẫn mô tả "chọn tệp, lĩnh vực, kho đối chiếu rồi Gửi kiểm tra" với checkbox kho; không nêu popup có chọn từng nguồn, có "+ Thêm nguồn" hay không, và thời điểm quét nhạy cảm (web quét ngay sau tải, popup quét sau khi bấm gửi) | 🟠 Major | BA | Ghi rõ popup: giữ ba checkbox kho, mặc định tích hết văn bản đủ điều kiện, không có "+ Thêm nguồn" `[GIẢ ĐỊNH]`, quét nhạy cảm ngay khi nhận tệp |
| 4 | FC-005 BR-08 đến BR-11 | BR-10 và BR-11 chèn trước BR-09 và nằm dưới nhóm "Hiệu lực và đơn vị tạo": thứ tự 08, 10, 11, 09 sai nhóm, dễ nhầm khi trích dẫn | 🟡 Minor | BA | Tạo nhóm "Điểm vào Thêm nguồn", đặt sau BR-09 |
| 5 | FC-012 Edge cases (dòng "màn Tóm lược"), FC-018 BR-05 ("ở tổng quan và chi tiết điểm") | Còn lời văn của màn đã gộp | 🟡 Minor | BA | Sửa thành "màn Gửi dự thảo" và "màn Kết quả kiểm tra" |
| 6 | FC-019 | Đánh giá lưu tự động mỗi lần chọn nhưng không có ngoại lệ khi lưu thất bại (mất kết nối) | 🟡 Minor | QA | Thêm EX: "Chưa lưu được đánh giá", giữ lựa chọn trên thẻ, thử lại; cần mã lỗi mới |
| 7 | FC-012 EX-07, BR-09 | Tệp dự thảo tải lên chưa che ẩn được giữ tạm 24 giờ trong lúc người dùng xử lý nhạy cảm; chưa có yêu cầu mã hóa lưu tạm | 🟡 Minor | Dev, QA | Ghi yêu cầu mã hóa và xóa chắc chắn tệp tạm khi hủy hoặc hết 24 giờ |
| 8 | FC-017 thẻ thống kê | Chưa rõ thẻ có bị ảnh hưởng bởi lọc trạng thái, "Lỗi hoặc đã hủy" có gồm Hết hạn lưu giữ không | 🟡 Minor | QA | Ghi công thức từng thẻ và quan hệ với bộ lọc |
| 9 | Module 4, 5, 2 (Yêu cầu giao diện) | Vẫn ghi `[CẦN BỔ SUNG ẢNH]` dù đã có wireframe ASCII và thiết kế Figma | 💡 Suggestion | BA | Chèn ảnh hoặc link Figma vào mục mockup |
| 10 | Phụ lục 3, tệp `DanhSach_UC_KiemTraPhapLy_v2.xlsx` | Chưa có use case "Thêm nguồn nhanh khi gửi dự thảo" và "Chọn nguồn đối chiếu theo từng văn bản" | 💡 Suggestion | BA | Thêm 2 UC vào danh sách (hoặc ghi chú gộp vào UC 1, 2 và UC 3) rồi cập nhật Phụ lục 3 |

Các vấn đề Major tồn từ vòng 2 (cần khách hàng) vẫn mở: chỉ tiêu hiệu năng định lượng, tham số đối chiếu N và ngưỡng, tài liệu API iOffice và nhà cung cấp AI, cách xử lý Quản trị hệ thống khi gửi dự thảo.

## 2. Phân tích chi tiết (Major)

**Vấn đề 1: Trạng thái nguồn trên màn Đang xử lý**

- Vị trí: Module 4, bảng "Màn Đang xử lý" (Danh sách nguồn đang đối chiếu, Điểm vi phạm phát hiện đến nay); FC-014 Bước xử lý theo từng đoạn.
- Rủi ro nếu không sửa: dev sẽ phải tự quyết định "Xong" nghĩa là gì khi một văn bản có thể được tham chiếu bởi đoạn cuối cùng của dự thảo; có thể phải đổi kiến trúc xử lý (theo văn bản thay vì theo đoạn) hoặc ghi dữ liệu trung gian phức tạp.
- Đề xuất: viết lại dòng bảng thành "Văn bản đã được tham chiếu: tên văn bản, số đoạn đã đối chiếu, số điểm đã tìm thấy; hiển thị tăng dần theo tiến độ" và gắn `[CẦN XÁC NHẬN khả thi kỹ thuật]`; trạng thái "Chờ, Đang đối chiếu, Xong" chỉ giữ nếu POC chứng minh được.

**Vấn đề 2: Dữ liệu danh sách nguồn của lượt**

- Vị trí: Phụ lục 2, dòng "Tên lượt, Lĩnh vực, Kho đối chiếu, Ngày xét hiệu lực, Trạng thái lượt"; FC-012 BR-08; FC-016 EX-03.
- Rủi ro nếu không sửa: chạy lại lượt lỗi có thể dùng kho khác với lúc gửi, kết quả không tái lập; báo cáo hiển thị "kho đối chiếu" khác với danh sách đã tích.
- Đề xuất: sửa dòng thành "Tên lượt, Lĩnh vực, Ngày xét hiệu lực, Danh sách văn bản nguồn đã tích (mã và phiên bản văn bản), Trạng thái lượt | FC-012" và bổ sung vào FC-018 phần hiển thị căn cứ đã dùng.

**Vấn đề 3: Popup chưa đồng bộ với FC-012 mới**

- Vị trí: FC-024 Bước 2 ("chọn tệp, lĩnh vực, kho đối chiếu rồi nhấn Gửi kiểm tra"), Module 6 bảng "Kho đối chiếu Checkbox nhóm", FC-024 BR-04.
- Rủi ro nếu không sửa: hai kênh (web và popup) chạy hai logic khác nhau về nguồn đối chiếu và thời điểm quét nhạy cảm; QA không biết nên kiểm hành vi nào.
- Đề xuất: thêm BR vào FC-024: "Popup dùng danh sách nguồn mặc định (tích hết văn bản đủ điều kiện theo các kho đã chọn), không có chọn từng văn bản và không có Thêm nguồn; quét nhạy cảm thực hiện ngay khi nhận tệp, trước khi người dùng bấm Gửi kiểm tra."

## 3. Điểm mạnh

- Truy vết sau thay đổi vẫn kín: 101 mã lỗi không đổi, không phát sinh mã lỗi trùng; mọi tham chiếu BR, FC mới trỏ đúng (FC-012 BR-10 và FC-005 BR-07).
- Tài liệu, user flow, wireframe và Figma khớp nhau về mã màn (gui-du-thao, them-nguon, xem-truoc-ban-gui, dang-xu-ly, huy-yeu-cau, ket-qua-kiem-tra...) và số thứ tự callout trong wireframe khớp bảng mô tả.
- Các thay đổi mới nêu rõ nguồn quyết định và đánh dấu `[GIẢ ĐỊNH]` hoặc `[CẦN XÁC NHẬN khả thi kỹ thuật]` thay vì tự bịa; phân quyền phạm vi khi thêm nguồn bám đúng FC-005 BR-04, BR-05.
- Phụ lục 4 ghi lịch sử thay đổi v1.0 sang v1.1 đầy đủ, giúp theo dõi.

## 4. Đánh giá tổng thể

| Tiêu chí | Trọng số | Điểm (0–10) | Điểm có trọng số |
|---|---|---|---|
| Tính đầy đủ (Completeness) | 50% | 6.8 | 3.40 |
| Tính rõ ràng (Clarity) | 20% | 7.8 | 1.56 |
| Tính nhất quán (Consistency) | 20% | 7.4 | 1.48 |
| Đúng định dạng (Formatting) | 10% | 8.5 | 0.85 |
| **Tổng điểm** | 100% | | **7.3/10** |

Trạng thái phê duyệt: ⚠️ **Conditional Approval** (có Major, không có Critical). Điểm giảm 0.5 so với v1.0 (7.8) do thay đổi mới để lại khoảng trống ở màn Đang xử lý, dữ liệu lượt và popup.

Điều kiện để approve: (1) sửa 3 vấn đề Major mới ở mục 2 (tự sửa được, không cần khách hàng); (2) 4 điều kiện cần khách hàng từ vòng 2; (3) duyệt lại v1.1 sau khi các mục trên xong.

## 5. Checklist sẵn sàng phát triển

- [ ] ✅ Yêu cầu có ID duy nhất và truy vết (FC, EX, BR, mã lỗi); ⚠️ UC chưa có hai UC mới
- [ ] ⚠️ Acceptance criteria đo lường được: chưa có ngưỡng chất lượng AI; thẻ thống kê chưa có công thức
- [ ] ❌ NFR có con số định lượng cụ thể
- [ ] ⚠️ Trường thông tin cần lưu đã đủ: thiếu danh sách nguồn đã tích của lượt (vấn đề 2)
- [ ] ✅ Tiêu chí tìm kiếm có kiểu so khớp, sắp xếp mặc định
- [ ] ⚠️ API tích hợp thiếu thông tin từ đối tác (như vòng 2)
- [ ] ⚠️ Luồng lỗi, edge case: thiếu ngoại lệ lưu đánh giá tự động và popup chưa đồng bộ
- [ ] ✅ Phân quyền và bảo mật có spec; ⚠️ chưa có yêu cầu mã hóa tệp tạm (vấn đề 7)
- [ ] ❌ Chưa sign-off bởi stakeholder có thẩm quyền

---

# Vòng 4 — chấm lại SRS v1.1 sau khi sửa (2026-10-17)

Tài liệu: `docs/kiem-tra-phap-ly/SRS.md` v1.1 (draft) · Chế độ REVIEW · Người review: AI (cùng phiên với người viết, nên có thể thiên lệch). Context: user flow (hash e98bdb39), wireframe ASCII, Figma flow 4 và 5; `[Không có context hệ thống iOffice]`.

Kiểm tra cơ học: 102 mã lỗi duy nhất, không mã nào được nhắc mà thiếu định nghĩa; mọi mã EX đều được trỏ từ luồng thành công của chức năng sở hữu; 8/8 sơ đồ mermaid đạt; không còn tham chiếu tới màn cũ đã gộp; còn 9 chỗ `[CẦN BỔ SUNG ẢNH]` ở các module chưa có wireframe (1, 2, 3, 6, 7, 8, 9, 10 và nơi khác).

## 1. Tình trạng các vấn đề của vòng 3

| STT | Vấn đề vòng 3 | Mức | Trạng thái |
|---|---|---|---|
| 1 | Màn Đang xử lý hiển thị trạng thái theo từng văn bản | 🟠 Major | Đã sửa: cột "Văn bản đã được tham chiếu" (số đoạn, số điểm); khối điểm hiện dần chỉ giữ nếu thử nghiệm xác nhận được. Vẫn `[CẦN XÁC NHẬN khả thi kỹ thuật]` |
| 2 | Dữ liệu danh sách nguồn của lượt | 🟠 Major | Đã sửa: Phụ lục 2 và FC-012 BR-08 (mã và phiên bản văn bản lúc gửi), FC-016 EX-03 dùng danh sách này |
| 3 | Popup chưa đồng bộ với FC-012 | 🟠 Major | Đã sửa: FC-024 Bước 2, BR-04, bảng popup nêu rõ khác biệt (không chọn từng văn bản, không Thêm nguồn, quét sau khi bấm Gửi kiểm tra) |
| 4 | Thứ tự BR FC-005 | 🟡 Minor | Đã sửa: BR-10, BR-11 chuyển xuống nhóm "Điểm vào Thêm nguồn" sau BR-09 |
| 5 | Lời văn màn cũ | 🟡 Minor | Đã sửa (FC-012 edge case, FC-018 BR-05) |
| 6 | FC-019 lưu tự động không có ngoại lệ thất bại | 🟡 Minor | Đã sửa: EX-03, mã `E-kiem-tra-phap-ly-102` |
| 7 | Tệp tạm 24 giờ chưa nêu mã hóa | 🟡 Minor | Đã sửa: FC-012 BR-11 (lưu mã hóa, chỉ người tải xem, xóa khi hủy hoặc rời trang) |
| 8 | Thẻ thống kê chưa có công thức | 🟡 Minor | Đã sửa: FC-017 nêu cách đếm từng thẻ và quan hệ với bộ lọc `[GIẢ ĐỊNH]` |
| 9 | Mockup `[CẦN BỔ SUNG ẢNH]` | 💡 | Một phần: Module 4 và 5 đã có link wireframe và Figma; các module còn lại chờ wireframe |
| 10 | Danh sách UC | 💡 | Đã xử lý theo hướng không thêm UC mới: thêm nguồn nhanh là một điểm vào của UC 1 và 2, chọn nguồn từng văn bản là một phần UC 3. Lời giao dịch UC 1 đến 4 cập nhật ở `DanhSach_UC_KiemTraPhapLy_v3.xlsx` (47 UC, số giao dịch không đổi) |

## 2. Vấn đề còn mở

| STT | Mục SRS | Vấn đề | Mức | Góc nhìn | Gợi ý |
|---|---|---|---|---|---|
| 1 | Điều kiện nghiệm thu | Chưa có chỉ tiêu hiệu năng định lượng (khách hàng chưa cung cấp) | 🟠 Major | Dev | Thu thập số liệu rồi bổ sung bảng NFR |
| 2 | FC-014 BR-01, BR-05 | Tham số lõi N, ngưỡng liên quan, ngưỡng nghiệm thu chưa chốt | 🟠 Major | BA, Dev | Chạy thử trên bộ dự thảo mẫu có đáp án |
| 3 | FC-001, FC-014, FC-023, FC-028, FC-042 | Thiếu tài liệu API iOffice và nhà cung cấp AI | 🟠 Major | Dev | Nhận tài liệu và thay các `[CẦN XÁC NHẬN]` |
| 4 | Màn Đang xử lý (FC-014) | Khối "Điểm vi phạm phát hiện đến nay" và số đoạn theo văn bản cần thử nghiệm lưu kết quả từng phần | 🟡 Minor | Dev | Làm POC; nếu không khả thi thì ẩn khối, giữ tiến độ |
| 5 | FC-012 BR-07 | Cách xử lý Quản trị hệ thống chọn đơn vị tính chi phí còn `[CẦN XÁC NHẬN]` | 🟡 Minor | BA | Chốt với khách hàng |
| 6 | Module 1 đến 3, 6 đến 10 | Chưa có wireframe nên chưa có mockup | 💡 | BA | Làm wireframe các flow còn lại |

Không có Critical. Ba Major còn lại đều phụ thuộc thông tin khách hàng, người viết không tự sửa được.

## 3. Điểm mạnh

- Mọi thay đổi bố cục truy vết được từ user flow, wireframe, Figma sang SRS; Phụ lục 4 ghi đủ lịch sử v1.0 sang v1.1.
- Quy tắc thêm nguồn bám đúng FC-005 (phạm vi theo vai trò, trùng số hiệu, chuẩn bị đối chiếu), có phân biệt rõ hành vi web và popup.
- Các giả định mới đều được đánh dấu `[GIẢ ĐỊNH]` hoặc `[CẦN XÁC NHẬN khả thi kỹ thuật]`, không tự bịa số liệu.
- Kiểm tra cơ học sạch: mã lỗi, tham chiếu EX, sơ đồ đều đạt.

## 4. Đánh giá tổng thể

| Tiêu chí | Trọng số | Điểm (0–10) | Điểm có trọng số |
|---|---|---|---|
| Tính đầy đủ (Completeness) | 50% | 7.2 | 3.60 |
| Tính rõ ràng (Clarity) | 20% | 8.0 | 1.60 |
| Tính nhất quán (Consistency) | 20% | 8.4 | 1.68 |
| Đúng định dạng (Formatting) | 10% | 8.8 | 0.88 |
| **Tổng điểm** | 100% | | **7.8/10** |

Trạng thái: ⚠️ **Conditional Approval** (còn 3 Major phụ thuộc khách hàng, không có Critical). Điểm bằng v1.0 (7.8) nhưng v1.1 có thêm tính năng mới và đã đóng toàn bộ vấn đề do thay đổi gây ra.

Điều kiện để approve: (1) chỉ tiêu hiệu năng định lượng; (2) chốt N và ngưỡng đối chiếu; (3) tài liệu API iOffice và nhà cung cấp AI; (4) chốt cách xử lý Quản trị hệ thống khi gửi dự thảo; (5) người có thẩm quyền ký duyệt.

## 5. Checklist sẵn sàng phát triển

- [ ] ✅ Yêu cầu có ID duy nhất và truy vết (FC, EX, BR, mã lỗi, UC v3)
- [ ] ⚠️ Acceptance criteria đo lường được: chưa có ngưỡng chất lượng AI
- [ ] ❌ NFR có con số định lượng cụ thể
- [ ] ✅ Trường thông tin cần lưu đã đủ (gồm danh sách nguồn của lượt)
- [ ] ✅ Tiêu chí tìm kiếm có kiểu so khớp, sắp xếp mặc định, công thức field tính toán (gồm thẻ thống kê)
- [ ] ⚠️ API tích hợp thiếu thông tin từ đối tác
- [ ] ✅ Luồng lỗi, edge case, negative case đã mô tả (gồm lưu đánh giá thất bại)
- [ ] ✅ Phân quyền và bảo mật có spec (gồm mã hóa tệp tạm)
- [ ] ❌ Chưa sign-off bởi stakeholder có thẩm quyền

---

# Vòng 5 — chấm lại SRS v1.1 sau khi thêm bôi đen để hỏi sâu (2026-10-17)

Tài liệu: `docs/kiem-tra-phap-ly/SRS.md` v1.1 · Chế độ REVIEW · Phạm vi thay đổi: FC-022 (Bước 1b, EX-07, BR-09 đến BR-13), bảng UI Module 5, Phụ lục 4, mã lỗi E-103. Người review: AI (cùng phiên với người viết, có thể thiên lệch). `[Không có context hệ thống iOffice]`.

Kiểm tra cơ học: 103 mã lỗi duy nhất, liên tục 001 đến 103, E-103 có định nghĩa (EX-07) và được trỏ từ Bước 1b; 8/8 sơ đồ mermaid giữ nguyên; user flow (hash e98bdb39) và wireframe đã đồng bộ callout [14], [9], [10].

## 1. Vấn đề phát hiện

| STT | Mục SRS | Vấn đề | Mức | Góc nhìn | Gợi ý |
|---|---|---|---|---|---|
| 1 | FC-022 Quy tắc nghiệp vụ | Nhóm "Kênh popup" (BR-08) nằm sau BR-09 đến BR-13, thứ tự BR bị đảo | 🟡 Minor | BA | Đưa nhóm popup lên trước nhóm bôi đen |
| 2 | FC-022 BR-10 | Chưa nêu chip có tự xóa sau khi gửi không, và khi đổi ngữ cảnh khác "Lượt kiểm tra này" thì chip ra sao | 🟡 Minor | Dev, QC | Chip tự xóa sau gửi; đổi ngữ cảnh thì bỏ chip `[GIẢ ĐỊNH]` |
| 3 | FC-022 BR-09 | Chưa phân biệt bấm link căn cứ (mở văn bản) với kéo chọn chữ trong cùng vùng; chưa nêu đoạn chứa "[đã xóa trước khi gửi]" gửi gì | 🟡 Minor | Dev, QC | Bấm link vẫn mở văn bản, chỉ kéo chọn mới hiện thanh; gửi đúng chữ hiển thị |
| 4 | Phụ lục 4 | Dòng "1.1 (bổ sung)" chèn trước "1.1 (hoàn tất)", sai thứ tự thời gian | 🟡 Minor | BA | Đổi chỗ |
| 5 | FC-022 BR-10, BR-13 | Giả định chưa được khách hàng xác nhận (một đoạn mỗi câu hỏi; popup chưa hỗ trợ) | 💡 | BA | Chốt khi họp khách hàng |

Không có Critical, không có Major mới. Ba Major cũ (hiệu năng định lượng, tham số lõi AI, tài liệu API) vẫn mở như vòng 4.

## 2. Đánh giá tổng thể

| Tiêu chí | Trọng số | Điểm (0–10) | Điểm có trọng số |
|---|---|---|---|
| Tính đầy đủ (Completeness) | 50% | 7.2 | 3.60 |
| Tính rõ ràng (Clarity) | 20% | 8.0 | 1.60 |
| Tính nhất quán (Consistency) | 20% | 8.2 | 1.64 |
| Đúng định dạng (Formatting) | 10% | 8.8 | 0.88 |
| **Tổng điểm** | 100% | | **7.7/10** |

Trạng thái: ⚠️ **Conditional Approval**. Điểm giảm 0.1 so với vòng 4 do 4 Minor mới; nếu áp dụng diff `srs-select-fix.diff` thì các Minor 1 đến 4 đóng, điểm trở lại 7.8.

---

# Vòng 6 — chấm lại SRS v1.1 sau khi gắn đủ wireframe và Figma (2026-10-17)

Tài liệu: `docs/kiem-tra-phap-ly/SRS.md` v1.1 · Chế độ REVIEW · Người review: AI (cùng phiên với người viết, có thể thiên lệch). Context: user flow (hash e98bdb39), 10 file wireframe ASCII, Figma trang "Kiểm tra pháp lý". `[Không có context hệ thống iOffice]`.

Kiểm tra cơ học (chạy bằng script): 103 mã lỗi, liên tục 001 đến 103, mỗi mã có đúng một dòng EX định nghĩa, không trùng; 42 chức năng, mọi tham chiếu EX trong luồng thành công đều có dòng định nghĩa và mọi dòng EX đều được trỏ tới; 8/8 sơ đồ mermaid giữ nguyên; không còn `[CẦN BỔ SUNG ẢNH]` ở mục Yêu cầu giao diện (10/10 module có link wireframe và Figma); 98/103 mã lỗi có mặt trong wireframe, 5 mã còn lại là E-035, E-045, E-086, E-087, E-102.

## 1. Vấn đề phát hiện

| STT | Mục | Vấn đề | Mức | Góc nhìn | Gợi ý |
|---|---|---|---|---|---|
| 1 | User flow Mục 3.5 (flow 1, 7 đến 10) | Bảng chuyển màn còn mô hình "từ Trang chủ vào, lưu xong về Trang chủ", trong khi wireframe và Figma dùng menu bên trái và hộp thoại quay về màn danh sách | 🟡 Minor | BA, Dev | Soạn diff cập nhật Mục 3.5 theo wireframe, không đổi Mục 1 nên `flow_hash` giữ nguyên |
| 2 | FC-040 Bước 2 | Sửa danh sách đơn vị của tài khoản quản trị cần màn danh sách tài khoản quản trị; user flow, wireframe chưa có (hiện chỉ có hộp thoại tạo/sửa) | 🟡 Minor | BA | Chốt dùng lại danh sách tài khoản với bộ lọc vai trò hay thêm màn riêng `[CẦN XÁC NHẬN]` |
| 3 | FC-019 EX-03, FC-014 EX-04 | `E-kiem-tra-phap-ly-102` (lưu đánh giá thất bại) và `E-kiem-tra-phap-ly-045` (không có đoạn liên quan, thông tin) chưa có trên wireframe `ket-qua-kiem-tra` và Figma | 🟡 Minor | QC, Dev | Bổ sung hai trạng thái khi soạn diff wireframe |
| 4 | Điều kiện nghiệm thu | Chỉ tiêu hiệu năng định lượng (khách hàng chưa cung cấp) | 🟠 Major | Dev | Thu thập số liệu rồi bổ sung bảng NFR |
| 5 | FC-014 BR-01, BR-05 | Tham số lõi N, ngưỡng liên quan, ngưỡng nghiệm thu chưa chốt | 🟠 Major | BA, Dev | Chạy thử trên bộ dự thảo mẫu có đáp án |
| 6 | FC-001, FC-014, FC-023, FC-028, FC-042 | Thiếu tài liệu API iOffice và nhà cung cấp AI | 🟠 Major | Dev | Nhận tài liệu và thay các `[CẦN XÁC NHẬN]` |
| 7 | FC-012 BR-07, FC-014 (màn Đang xử lý) | Cách Quản trị hệ thống chọn đơn vị tính chi phí; khả thi kỹ thuật của khối "điểm vi phạm phát hiện đến nay" | 🟡 Minor | BA, Dev | Chốt với khách hàng, làm POC |
| 8 | FC-022 BR-10, BR-13 | Giả định về bôi đen để hỏi sâu chưa được khách hàng xác nhận | 💡 | BA | Chốt khi họp khách hàng |

Không có Critical. Ba Major còn lại (4 đến 6) đều phụ thuộc khách hàng, người viết không tự sửa được. Vấn đề 1 đến 3 là việc đồng bộ tài liệu phụ trợ, không đổi nội dung SRS.

## 2. Điểm mạnh

- Mọi module đã có mockup truy vết được: SRS dẫn tới wireframe ASCII và khung Figma theo từng màn; wireframe, index (68 dòng) và Figma cùng slug.
- Mã lỗi và EX nhất quán tuyệt đối (103 mã, không thiếu, không trùng, không treo).
- Mọi giả định mới đều gắn `[GIẢ ĐỊNH]` hoặc `[CẦN XÁC NHẬN]`, không bịa số liệu.
- Quy tắc riêng tư (nhật ký không chứa giá trị gốc, tệp tạm mã hóa, khóa kết nối không hiển thị lại) có mặt xuyên suốt từ SRS đến wireframe.

## 3. Đánh giá tổng thể

| Tiêu chí | Trọng số | Điểm (0–10) | Điểm có trọng số |
|---|---|---|---|
| Tính đầy đủ (Completeness) | 50% | 7.3 | 3.65 |
| Tính rõ ràng (Clarity) | 20% | 8.0 | 1.60 |
| Tính nhất quán (Consistency) | 20% | 8.3 | 1.66 |
| Đúng định dạng (Formatting) | 10% | 9.0 | 0.90 |
| **Tổng điểm** | 100% | | **7.8/10** |

Trạng thái: ⚠️ **Conditional Approval** (không có Critical, còn 3 Major phụ thuộc khách hàng). Điểm giữ 7.8 (Completeness +0.1 nhờ đủ mockup, Consistency −0.1 vì user flow chưa đồng bộ với wireframe flow 1, 7 đến 10).

Điều kiện để approve: (1) chỉ tiêu hiệu năng định lượng; (2) chốt N và ngưỡng đối chiếu; (3) tài liệu API iOffice và nhà cung cấp AI; (4) chốt cách xử lý Quản trị hệ thống khi gửi dự thảo; (5) người có thẩm quyền ký duyệt.

## 4. Checklist sẵn sàng phát triển

- [ ] ✅ Yêu cầu có ID duy nhất và truy vết (FC, EX, BR, mã lỗi, UC v3, mockup)
- [ ] ⚠️ Acceptance criteria đo lường được: chưa có ngưỡng chất lượng AI
- [ ] ❌ NFR có con số định lượng cụ thể
- [ ] ✅ Trường thông tin cần lưu đã đủ
- [ ] ✅ Tiêu chí tìm kiếm, sắp xếp, công thức field tính toán đã có
- [ ] ⚠️ API tích hợp thiếu thông tin từ đối tác
- [ ] ✅ Luồng lỗi, edge case, negative case đã mô tả
- [ ] ✅ Phân quyền và bảo mật có spec
- [ ] ⚠️ User flow Mục 3.5 chưa đồng bộ với wireframe flow 1, 7 đến 10
