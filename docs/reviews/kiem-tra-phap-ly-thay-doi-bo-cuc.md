# Kiểm tra pháp lý: đề xuất cập nhật tài liệu theo bố cục mới (bản so sánh chờ duyệt)

> Trạng thái: **CHỜ DUYỆT, chưa ghi vào SRS, user flow, wireframe**. Nguồn thiết kế: trang "Kiểm tra pháp lý" trong file Figma "Kiểm tra pháp lý iOffice" (khung 1440, bố cục hai cột kiểu NotebookLM).
> Ngày soạn: 2026-10-17. Phạm vi: Module 4 (FC-012 đến FC-016), Module 5 (FC-017 đến FC-022), điểm vào FC-005; ảnh hưởng nhẹ Module 6 (popup).

## 1. Quyết định đã chốt (từ các lượt trao đổi)

| # | Quyết định | Nguồn |
|---|---|---|
| Q1 | Cột trái "Nguồn đối chiếu" có 4 tab: Tất cả (mặc định), Kho cá nhân, Kho đơn vị, Kho dùng chung | Bạn bổ sung |
| Q2 | Cho bỏ tích từng văn bản nguồn; mặc định chọn hết văn bản đủ điều kiện | Bạn chốt |
| Q3 | Quét dữ liệu nhạy cảm tự động ngay sau khi tải tệp (quét nội bộ, chưa gửi gì ra ngoài) | Bạn chốt |
| Q4 | Xem trước bản gửi là tùy chọn (ngăn kéo bên phải), không còn là bước bắt buộc | Bạn chốt |
| Q5 | Màn kết quả gộp tổng quan + danh sách + chi tiết + đánh giá trong một màn, bố cục hai cột | Bạn chốt |
| Q6 | Thêm nguồn nhanh từ tệp hoặc liên kết web; mặc định lưu Kho cá nhân; Kho đơn vị cần quyền quản trị; liên kết chỉ nhận trang công khai | Bạn xác nhận 2026-10-17 |
| Q7 | Mọi màn tràn khung 1440, nội dung dàn đều, không thu vào giữa | Bạn yêu cầu |

## 2. Điểm cần bạn quyết thêm (phát hiện khi đối chiếu SRS)

| # | Vấn đề | Đề xuất của tôi |
|---|---|---|
| D1 | **Thêm nguồn đang bỏ qua bước xem và sửa thông tin bóc tách** mà FC-005 bắt buộc (số hiệu, loại, cơ quan, ngày hiệu lực...). Ngày hiệu lực quyết định văn bản có được đưa vào đối chiếu không (FC-012 BR-01), tự nhận dạng sai sẽ làm sai kết quả pháp lý | Hộp thoại có **2 bước**: (1) chọn tệp hoặc liên kết, (2) xem và sửa thông tin bóc tách rồi Lưu (dùng lại xem-truoc-thong-tin của FC-005). Cần vẽ thêm 1 trạng thái hộp thoại |
| D2 | FC-005 cho nạp **một tệp mỗi lần**; hộp thoại đang vẽ nhận nhiều tệp | Giữ một tệp mỗi lần cho đúng FC-005, bỏ chọn nhiều tệp trong hộp thoại |
| D3 | FC-005 EX-02 chỉ nhận liên kết thuộc **danh sách nguồn được phép** `[CẦN XÁC NHẬN]`; bạn chọn "chỉ trang công khai" | Ghi: liên kết phải là trang công khai (không cần đăng nhập). Danh sách nguồn được phép vẫn là điểm mở của FC-005, chưa đóng |
| D4 | Văn bản vừa thêm có trạng thái "Đang chuẩn bị" (FC-005 BR-07), **chưa dùng được ngay** trong lượt kiểm tra | Hiện dòng mới trong danh sách nguồn với nhãn "Đang chuẩn bị", không tích sẵn; khi xong tự chuyển sang dùng được và báo thông báo |
| D5 | Màn "Đang xử lý" hiện **điểm vi phạm xuất hiện dần** và đoạn đang xét. FC-014 hiện chỉ cập nhật tiến độ và số đoạn | Ghi thành yêu cầu mới `[CẦN XÁC NHẬN khả thi kỹ thuật]`. Nếu không làm được: bỏ cột điểm vi phạm tạm, chỉ giữ nguồn đang đối chiếu và tiến độ |
| D6 | Thẻ thống kê trên Lịch sử (tổng, hoàn tất, đang xử lý, lỗi/hủy) là **yêu cầu mới** | Đưa vào FC-017 mức `[GIẢ ĐỊNH]`, chỉ đếm lượt của chính người dùng |
| D7 | Đổi mã màn: gộp nên một số mã cũ bị bỏ (xem Mục 3) | Dùng mã mới ở Mục 3, giữ mã cũ ghi chú "đã gộp vào" để truy vết |
| D8 | SRS đang "phê duyệt có điều kiện" v1.0; thay đổi lớn về FC-012, 013, 018 | Nâng v1.1, đặt trạng thái chờ duyệt lại, chấm lại điểm review sau khi ghi |

## 3. Bản đồ màn hình: trước và sau

| Trước (15 màn flow 4 và 5) | Sau | Loại |
|---|---|---|
| gui-du-thao, tom-luoc-du-thao, xu-ly-nhay-cam | **gui-du-thao** (không gian gửi kiểm tra: nguồn bên trái; tải tệp, tóm lược, nhạy cảm nằm cùng màn bên phải) | Màn |
| xem-truoc-ban-gui | **xem-truoc-ban-gui** | Ngăn kéo bên phải, tùy chọn |
| (mới) | **them-nguon** (từ tệp, từ liên kết, xem thông tin bóc tách nếu chọn D1) | Hộp thoại |
| dang-xu-ly | **dang-xu-ly** (nguồn đang tham chiếu bên trái; tiến độ, điểm vi phạm phát hiện dần, đoạn đang xét bên phải) | Màn |
| kiem-tra-loi | trạng thái lỗi của **dang-xu-ly** (dải cảnh báo, nút Chạy lại, Đổi tệp) | Trạng thái |
| huy-yeu-cau | **huy-yeu-cau** | Hộp thoại |
| danh-sach-luot-kiem-tra | **danh-sach-luot-kiem-tra** (tràn khung, thêm thẻ thống kê) | Màn |
| ket-qua-tong-quan, danh-sach-vi-pham, chi-tiet-vi-pham, danh-gia-ket-qua | **ket-qua-kiem-tra** (nguồn bên trái có số điểm vi phạm; bên phải tóm tắt, lọc mức độ, thẻ điểm vi phạm đầy đủ chi tiết, đánh giá ngay trên thẻ) | Màn |
| xuat-bao-cao | **xuat-bao-cao** | Hộp thoại |
| xoa-luot-kiem-tra | **xoa-luot-kiem-tra** | Hộp thoại |
| hoi-dap-web | **hoi-dap-web** | Ngăn bên phải |

Số màn đầy đủ: **15 xuống 3 màn chính** (gui-du-thao, dang-xu-ly, danh-sach-luot-kiem-tra) **cộng 1 màn kết quả**, còn lại là hộp thoại, ngăn kéo và trạng thái.

## 4. User flow (`srs/kiem-tra-phap-ly-userflow.md`)

| Mục | Trước | Sau |
|---|---|---|
| Mục 1, Flow 4 | 7 màn, chuỗi gửi, tóm lược, nhạy cảm, xem trước, đang xử lý | Gửi (tải tệp rồi tóm lược và nhạy cảm cùng màn) rồi Đang xử lý; nhánh phụ: Thêm nguồn, Xem bản gửi, Hủy, Lỗi |
| Mục 1, Flow 5 | 8 màn, tổng quan rồi danh sách rồi chi tiết rồi đánh giá | Lịch sử rồi Kết quả (một màn); nhánh phụ: Xuất, Hỏi đáp, Xóa |
| Mục 2 | 15 dòng màn của flow 4 và 5 | Cập nhật theo Mục 3 trên đây |
| Mục 3.5 | ~42 dòng chuyển màn của flow 4 và 5 | Viết lại, xem bảng dưới |
| `flow_hash`, `updated` | `6dbfc92e`, 2026-10-16 | Tính lại; `stage` giữ `flow-approved` chỉ sau khi bạn duyệt; chạy flow-reviewer và mermaid-verify |

Chuyển màn mới (rút gọn, thay các dòng cũ của flow 4 và 5):

| Từ | Đến | Trigger | Điều kiện |
|---|---|---|---|
| gui-du-thao | gui-du-thao | tải tệp | Quét nhạy cảm tự động xong; hiện tóm lược và bảng nhạy cảm tại chỗ |
| gui-du-thao | them-nguon | + Thêm nguồn | — |
| them-nguon | gui-du-thao | Thêm vào nguồn hoặc Hủy | Văn bản mới hiện trong danh sách nguồn, trạng thái Đang chuẩn bị |
| gui-du-thao | xem-truoc-ban-gui | Xem bản sẽ gửi | Tùy chọn |
| gui-du-thao | dang-xu-ly | Bắt đầu kiểm tra | Đã chọn tệp, nguồn, và mọi dòng nhạy cảm đã có cách xử lý (E-042 nếu thiếu) |
| dang-xu-ly | huy-yeu-cau | Hủy yêu cầu | Chỉ người gửi |
| dang-xu-ly | dang-xu-ly (trạng thái lỗi) | lỗi AI | — |
| dang-xu-ly (lỗi) | dang-xu-ly | Chạy lại | Còn lượt chạy lại |
| dang-xu-ly (lỗi) | gui-du-thao | Đổi tệp | — |
| dang-xu-ly | ket-qua-kiem-tra | hoàn tất | Tự chuyển nếu người dùng còn ở màn |
| dang-xu-ly, huy-yeu-cau, ket-qua-kiem-tra | danh-sach-luot-kiem-tra | Rời trang, Xác nhận hủy, Về danh sách | — |
| danh-sach-luot-kiem-tra | ket-qua-kiem-tra, dang-xu-ly, xoa-luot-kiem-tra, gui-du-thao | chọn lượt, xóa, gửi mới | Theo trạng thái lượt |
| ket-qua-kiem-tra | xuat-bao-cao, hoi-dap-web, gui-du-thao | Xuất, Hỏi đáp, Gửi lại | Gửi lại chỉ khi có cảnh báo căn cứ |
| ket-qua-kiem-tra | noi-dung-van-ban [3.3] | bấm căn cứ | Căn cứ còn truy cập được |
| hoi-dap-web | noi-dung-van-ban [3.3], ket-qua-kiem-tra | chọn trích dẫn, đóng | — |

## 5. SRS (`SRS.md`, v1.0 lên v1.1): thay đổi theo chức năng

| Chức năng | Phần sửa | Trước | Sau |
|---|---|---|---|
| FC-012 | Quy trình (sơ đồ) | 10 bước, 4 màn, người dùng xác nhận 2 lần | Tải tệp, quét tự động, tóm lược và xử lý nhạy cảm cùng màn; một nút "Bắt đầu kiểm tra" |
| FC-012 | Bước 1 đến 3 | Gửi rồi Tóm lược rồi Bắt đầu rồi quét | Tải tệp: kiểm tra, quét, tóm lược ngay. Bắt đầu: tạo lượt, vào hàng đợi |
| FC-012 | Bảng giao diện | 4 màn riêng | 1 màn gồm: Nguồn đối chiếu (4 tab, danh sách tích, tìm, lọc lĩnh vực, ngày xét), Tệp dự thảo, Tóm lược, Bảng nhạy cảm, Thanh hành động |
| FC-012 | BR mới | — | BR-08 chọn nguồn từng văn bản (Q2); BR-09 quét nhạy cảm ngay sau tải tệp (Q3); BR-10 văn bản Đang chuẩn bị không tích được (D4) |
| FC-012 | EX-07 | Rời giữa Tóm lược và Xác nhận gửi | Rời trước khi bấm Bắt đầu: chưa tạo lượt, tệp tạm xóa sau 24 giờ `[GIẢ ĐỊNH]` |
| FC-013 | Bước 1 đến 3 | 3 màn, xem trước bắt buộc | 1 khối trong màn Gửi; xem trước tùy chọn (Q4); "Bắt đầu kiểm tra" nêu rõ nhà cung cấp và số mục che ẩn thay cho xác nhận gửi riêng |
| FC-013 | BR-02 | Không phát hiện: bỏ qua màn Xử lý và Xem trước | Không phát hiện: không hiện khối nhạy cảm |
| FC-005 | Điểm vào | Chỉ từ Kho văn bản | Thêm điểm vào "+ Thêm nguồn" ở màn Gửi (Q6); mặc định Kho cá nhân; Kho đơn vị cần quyền quản trị (BR-04, BR-05 giữ nguyên); liên kết chỉ nhận trang công khai (D3). Cần quyết D1, D2 |
| FC-014 | Giao diện tiến độ | Phần trăm, giai đoạn, số đoạn | Thêm danh sách nguồn với trạng thái đang đối chiếu, điểm vi phạm xuất hiện dần, đoạn đang xét (D5) |
| FC-015 | Màn Hủy | Màn riêng | Hộp thoại |
| FC-016 | Màn Kiểm tra lỗi | Màn riêng | Trạng thái lỗi của màn Đang xử lý |
| FC-017 | Danh sách | Bảng và bộ lọc | Thêm thẻ thống kê (D6); bố cục tràn khung |
| FC-018 | Bước 1 đến 4, bảng giao diện | Tổng quan rồi danh sách rồi chi tiết | Một màn kết quả: lọc theo mức độ và theo căn cứ ở cột trái, thẻ điểm vi phạm đầy đủ; EX-02 trạng thái rỗng giữ nguyên |
| FC-019 | Màn Đánh giá | Màn riêng, lưu hàng loạt | Đánh giá ngay trên từng thẻ (Đúng, Sai, Bỏ qua); lưu tự động khi chọn; ghi chú mở trên thẻ `[GIẢ ĐỊNH]` |
| FC-020, FC-021 | Màn Xuất, Xóa | Màn riêng | Hộp thoại, quy tắc giữ nguyên |
| FC-022 | Khung hỏi đáp | Màn hoi-dap-web | Ngăn bên phải màn kết quả, quy tắc giữ nguyên |
| FC-024 (popup) | Tham chiếu "như màn ..." | Trỏ các màn cũ | Cập nhật tham chiếu sang mã mới; bố cục popup 400px không đổi |
| Phụ lục | Bảng ma trận chức năng, danh sách màn | Mã cũ | Mã mới, giữ cột "đã gộp từ" |
| Đầu file | Phiên bản và duyệt | v1.0, approved, review 7.8 | v1.1, chờ duyệt lại, chấm lại sau khi ghi |

Mã lỗi: không thêm mã lỗi mới ngoài những mã cũ; E-042 (chưa chọn cách xử lý) và E-043 (quét nhạy cảm lỗi) vẫn giữ, nay hiển thị tại chỗ trong màn Gửi. Nếu D1 chọn 2 bước thì dùng lại mã của FC-005 (E-013 đến E-019).

## 6. Wireframe ASCII và index

| File | Hành động | Ghi chú |
|---|---|---|
| `ascii-wireframe/kiem-tra-phap-ly-flow.md` | Viết lại | 7 màn xuống: gui-du-thao, xem-truoc-ban-gui (ngăn), them-nguon (hộp thoại), dang-xu-ly (gồm lỗi), huy-yeu-cau. Khung rộng desktop 1440 (khoảng 110 cột), bảng mô tả 5 cột giữ nguyên |
| `ascii-wireframe/ket-qua-kiem-tra-flow.md` | Viết lại | 8 màn xuống: danh-sach-luot-kiem-tra, ket-qua-kiem-tra, xuat-bao-cao, xoa-luot-kiem-tra, hoi-dap-web |
| `ascii-wireframe/kiem-tra-phap-ly-wireframe-index.md` | Cập nhật | 15 dòng xuống 11 dòng; giữ link Figma theo mã khung mới |
| Figma | Đã vẽ | Cần bổ sung hộp thoại them-nguon theo D1 (bước 2) và D2 (một tệp) |

## 7. Thứ tự thực hiện sau khi bạn duyệt

1. Bạn trả lời D1 đến D8 (hoặc "theo đề xuất").
2. Cập nhật Figma cho D1 và D2 (nếu bạn chọn như đề xuất).
3. Ghi **user flow** (L1 và L2 diff, chạy flow-reviewer, mermaid-verify, tính lại `flow_hash`).
4. Ghi **SRS v1.1** theo từng Module (L1 và L2 diff từng đoạn, kiểm mermaid, đối chiếu mã lỗi), cập nhật `docs/index.json`, chấm lại review.
5. Viết lại **wireframe ASCII** (L3 duyệt từng flow) và **index**.
6. Báo cáo cuối, danh sách điểm còn `[CẦN XÁC NHẬN]`.
