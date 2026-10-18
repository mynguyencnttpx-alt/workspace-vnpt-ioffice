# Flow: Xem và xử lý kết quả kiểm tra

> Màn hình thuộc flow này: danh-sach-luot-kiem-tra → ket-qua-kiem-tra → xuat-bao-cao → xoa-luot-kiem-tra → hoi-dap-web. Flow tổng xem `../srs/kiem-tra-phap-ly-userflow.md` Mục 1. Nguồn mô tả: `../SRS.md` v1.1 (FC-017 đến FC-022). Thiết bị: Desktop 1440, bố cục tràn khung; màn kết quả hai cột (căn cứ bên trái, kết quả bên phải).
>
> Màn dùng chung từ flow khác: `trang-chu` [1.7] (điểm vào), `noi-dung-van-ban` [3.3] của flow `kho-van-ban-flow` (mở khi bấm căn cứ hoặc trích dẫn), `dang-xu-ly` của flow `kiem-tra-phap-ly-flow` (khi bấm lượt đang chạy hoặc lỗi). Màn cũ đã gộp vào `ket-qua-kiem-tra`: ket-qua-tong-quan, danh-sach-vi-pham, chi-tiet-vi-pham, danh-gia-ket-qua. Kênh popup iOffice dùng khung hỏi đáp riêng ở `popup-ioffice-flow`. Số liệu trong khung chỉ minh họa.

---

## Screen: danh-sach-luot-kiem-tra — Lịch sử kiểm tra (toàn màn hình)

### Wireframe (ASCII)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Gửi dự thảo | *Lịch sử kiểm tra | Kho văn bản                                          (o)3  [An v] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Lịch sử kiểm tra                                                                  [1][ + Gửi dự thảo mới ] │
│                                                                                                            │
│ Tổng số lượt: 18    Hoàn tất: 14    Đang xử lý: 1    Lỗi hoặc đã hủy: 3  [2]                               │
│                                                                                                            │
│ [Từ khóa_______][3] [17/09/2026 - 16/10/2026][4] [v: Trạng thái][5] [v: Lĩnh vực][6] [Tìm kiếm][7]         │
│                                                                                                            │
│ Tên lượt kiểm tra               Gửi lúc          Trạng thái   Vi phạm (NT/CC/LY)  Chi phí      Thao tác [8]│
│ -------------------------------------------------------------------------------------------------------    │
│ DuThao_NghiDinh_QuyHoachDoThi   16/10/2026 09:15  Hoàn tất     2 / 5 / 3           52.300 đ     < Xóa >    │
│ QuyetDinh_15_2026               15/10/2026 14:02  Đang xử lý   (52%)               -            < Hủy >    │
│ BaoCao_ThueTNDN                 12/10/2026 08:40  Lỗi          -                   4.100 đ      < Xóa >    │
│ ThongTu_MoiTruong               10/10/2026 16:30  Hoàn tất     0 / 1 / 4           38.900 đ     < Xóa >    │
│ QuyHoach_Phuong3_v2             08/10/2026 10:05  Hoàn tất     1 / 3 / 6           47.200 đ     < Xóa >    │
│ HopDong_ThueDat                 02/10/2026 13:20  Đã hủy       -                   9.800 đ      < Xóa >    │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Hiển thị 1-6 / 18 lượt (cột Chi phí chỉ hiện với Quản trị)                 [9] < Trước >  1  2  3  < Sau > │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Gửi dự thảo mới | Button | Click | • Sang `gui-du-thao`. Danh sách rỗng thì hiện trạng thái "Chưa có lượt kiểm tra nào" kèm nút này. |
| 2 | Thẻ thống kê | Label (4 thẻ) | ReadOnly | • Tổng lượt, Hoàn tất, Đang xử lý, Lỗi hoặc đã hủy; chỉ đếm lượt người dùng được thấy trong khoảng thời gian đang lọc `[GIẢ ĐỊNH]`. Bấm thẻ để lọc theo trạng thái tương ứng. |
| 3 | Từ khóa | Textbox | Text | • Tìm theo tên lượt và tên tệp, tìm tương đối, tối đa 200 ký tự. Mặc định trống. |
| 4 | Khoảng thời gian gửi | DatePicker khoảng | Date | • Mặc định 30 ngày gần nhất. Từ ngày ≤ Đến ngày; định dạng dd/MM/yyyy. |
| 5 | Trạng thái | Combobox | Select | • Chỉ chọn 1 giá trị: -- Tất cả -- / Chờ xử lý / Đang xử lý / Hoàn tất / Lỗi / Đã hủy / Hết hạn lưu giữ. Mặc định "-- Tất cả --". |
| 6 | Lĩnh vực | Combobox nhiều giá trị | Select | • Danh sách từ danh mục lĩnh vực (FC-025). Kết hợp AND với các tiêu chí khác. |
| 7 | Tìm kiếm | Button | Click | • Lọc theo mọi tiêu chí. Lượt đang chạy tự làm mới trạng thái định kỳ. Lỗi tải danh sách → `E-kiem-tra-phap-ly-050` "Không tải được lịch sử kiểm tra. Vui lòng thử lại." (giữ bộ lọc). |
| 8 | Bảng lượt kiểm tra | Table | Click | • Cột: Tên lượt (link), Gửi lúc, Trạng thái, Vi phạm (Nghiêm trọng / Cần chỉnh sửa / Lưu ý, chỉ khi Hoàn tất), Chi phí (chỉ Quản trị), Thao tác. Sắp xếp mặc định theo Gửi lúc giảm dần, 20 dòng mỗi trang `[GIẢ ĐỊNH]`.<br>• Click tên: Hoàn tất → `ket-qua-kiem-tra`; Đang xử lý hoặc Lỗi → `dang-xu-ly` (hiện trạng thái lỗi nếu Lỗi). Lượt người khác (Quản trị xem) hiển thị chữ thường, không mở được (FC-018 BR-01); lượt Hết hạn lưu giữ chỉ xem thông tin cơ bản.<br>• Thao tác: Xóa chỉ với lượt của chính người gửi và không đang xử lý → hộp thoại `xoa-luot-kiem-tra`; Hủy chỉ khi Chờ xử lý hoặc Đang xử lý → hộp thoại `huy-yeu-cau`. |
| 9 | Phân trang | Pager | Click | • Chuyển trang, giữ nguyên bộ lọc. |

---

## Screen: ket-qua-kiem-tra — Kết quả kiểm tra (gộp tổng quan, danh sách, chi tiết, đánh giá)

### Wireframe (ASCII)

> Thay cho 4 màn cũ ket-qua-tong-quan, danh-sach-vi-pham, chi-tiet-vi-pham, danh-gia-ket-qua.

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ KTPL   Gửi dự thảo | *Lịch sử kiểm tra | Kho văn bản                                          (o)3  [An v] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Căn cứ đã dùng [1]                   │ Kết quả: DuThao_NghiDinh_QuyHoachDoThi [Hoàn tất][2]                │
│ Bấm văn bản để lọc điểm vi phạm      │ Gửi 16/10/2026 09:15 | Quy hoạch, Đất đai | Ngày xét 16/10/2026     │
│ ---------------------------------    │ Tóm tắt [3]: Dự thảo quy định điều kiện lập, điều chỉnh quy         │
│ (*) Tất cả căn cứ (18)  10 điểm      │ hoạch đô thị và thẩm quyền cấp phép xây dựng. 6 chương, 42 trang.   │
│ ( ) NĐ 11/2021/NĐ-CP    3 điểm       │ Lọc [4]: [Tất cả 10] [!Nghiêm trọng 2] [^Cần chỉnh sửa 5] [iLưu ý 3]│
│ ( ) Luật QH đô thị 2009 1 điểm       │ (!) [5] 1 căn cứ đã hết hiệu lực, kết quả có thể không còn đúng.    │
│ ( ) Luật Đất đai 2024   4 điểm       │ ---------------------------------------------------------------     │
│     (!) Hết hiệu lực 01/09/2026      │ 1/10 [!Nghiêm trọng] Trang 12, Điều 8 Khoản 2   [6]                 │
│ ( ) TT 05/2023/TT-BXD   2 điểm       │ Trích đoạn [14]: "Thời hạn cấp phép không quá 3 ngày làm việc ..."  │
│ ( ) QĐ 28/2022/QĐ-UBND  0 điểm       │ Căn cứ [7]: < ND 11/2021 Điều 15 Khoản 1, Tr.7 >                    │
│ ( ) TT 12/2020/TT-BTNMT 0 điểm       │   "Thời hạn giải quyết không quá 15 ngày kể từ ngày nhận hồ sơ."    │
│                                      │ Giải thích: 3 ngày ngắn hơn mức tối thiểu 15 ngày theo quy định.    │
│                                      │ Đề xuất: "... không quá 15 ngày làm việc kể từ ngày nhận đủ hồ sơ." │
│                                      │ Đánh giá [8]: (*)Đúng ( )Sai ( )Bỏ qua    [ghi chú_________] [9]    │
│                                      │ ---------------------------------------------------------------     │
│                                      │ 2/10 [!Nghiêm trọng] Trang 15, Điều 11 Khoản 1 ... (cuộn xem thêm)  │
├──────────────────────────────────────┴─────────────────────────────────────────────────────────────────────┤
│ 10 điểm vi phạm | đã đánh giá 1/10 [10]      [11][ Gửi lại kiểm tra ] [12][ Xuất báo cáo ] [13][ Hỏi đáp ] │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Danh sách căn cứ đã dùng | Radio (lọc) | Select | • Mỗi dòng: tên văn bản, số hiệu, số điểm vi phạm tham chiếu văn bản đó. Dòng đầu "Tất cả căn cứ". Bấm một văn bản → lọc các thẻ theo căn cứ; kết hợp được với chip mức độ.<br>• Căn cứ đã hủy hoặc hết hiệu lực hiện nhãn cảnh báo ngay tại dòng. Người xem không còn quyền xem văn bản căn cứ → vẫn hiện trích điều khoản đã lưu, ẩn link, ghi chú "Bạn không còn quyền xem văn bản căn cứ." |
| 2 | Thông tin lượt | Label | ReadOnly | • Tên lượt, người gửi, thời gian, lĩnh vực, kho đối chiếu, ngày xét hiệu lực, trạng thái. Chỉ người gửi mở được màn này.<br>• Không phải người gửi hoặc kết quả hết hạn lưu giữ → `E-kiem-tra-phap-ly-051` "Bạn không có quyền xem kết quả này hoặc kết quả đã hết thời hạn lưu giữ." |
| 3 | Tóm tắt nội dung dự thảo | Label | ReadOnly | • Đoạn tóm tắt do AI tạo, chỉ đọc. Giá trị che ẩn khôi phục về giá trị gốc cho người gửi. |
| 4 | Lọc theo mức độ | Chip | Select | • Tất cả / Nghiêm trọng / Cần chỉnh sửa / Lưu ý, mỗi chip kèm số điểm. Nghiêm trọng (trái quy định bắt buộc hoặc vi phạm điều cấm), Cần chỉnh sửa (chưa phù hợp, thiếu hoặc mâu thuẫn một phần), Lưu ý (có thể ảnh hưởng hoặc diễn đạt chưa rõ). Màu và biểu tượng `[CẦN XÁC NHẬN thiết kế]`. |
| 5 | Dải cảnh báo căn cứ | Label | ReadOnly | • Hiện khi có căn cứ hiện Đã hủy, Hết hiệu lực hoặc cờ Cần rà soát so với lúc kiểm tra: "Căn cứ đã thay đổi từ lúc kiểm tra, kết quả có thể không còn đúng". Điểm vi phạm vẫn hiển thị, mức không tự đổi. |
| 6 | Thẻ điểm vi phạm | Card | ReadOnly | • Mỗi điểm một thẻ đầy đủ, không mở màn khác: số thứ tự, mức độ, vị trí (trang, mục/Điều), trích đoạn dự thảo (tối đa 2000 ký tự, dài hơn có "Xem thêm"; giá trị che ẩn đã khôi phục, giá trị đã xóa hiển thị "[đã xóa trước khi gửi]"), giải thích, đề xuất chỉnh sửa (chỉ để tham khảo).<br>• Sắp xếp theo mức giảm dần rồi trang tăng dần. Không có điểm nào → trạng thái rỗng "Không phát hiện điểm vi phạm với các văn bản đã đối chiếu" kèm số văn bản đã đối chiếu; vẫn cho xuất báo cáo.<br>• Dự thảo sau tách không có đoạn nào liên quan đến các văn bản đã chọn → lượt vẫn Hoàn tất với 0 điểm, hiện thông tin `E-kiem-tra-phap-ly-045` "Không tìm thấy nội dung dự thảo liên quan đến các văn bản trong kho đã chọn." thay cho danh sách thẻ. |
| 7 | Căn cứ trên thẻ | Link + Label | Click | • Tên văn bản, số hiệu, Điều/Khoản, số trang (đã kiểm tra tồn tại thật) kèm nội dung điều khoản. Click → `noi-dung-van-ban` [3.3] tại đúng điều khoản và trang; căn cứ đã hủy hoặc hết hiệu lực vẫn mở được kèm dải cảnh báo. |
| 8 | Đánh giá từng điểm | Radio trên thẻ | Select | • Đúng / Sai / Bỏ qua, mặc định "Bỏ qua". Lưu tự động khi chọn, hiện dấu "Đã lưu"; sửa lại được bất kỳ lúc nào khi kết quả còn; chỉ để thống kê chất lượng gợi ý, không đổi kết quả.<br>• Kết quả đã hết hạn lưu giữ hoặc bị xóa → `E-kiem-tra-phap-ly-052` "Không thể đánh giá do kết quả không còn."<br>• Lưu tự động thất bại (mất kết nối, lỗi hệ thống) → `E-kiem-tra-phap-ly-102` "Chưa lưu được đánh giá. Vui lòng thử lại." hiện ngay trên thẻ, giữ lựa chọn vừa chọn, có nút "Thử lại"; các thẻ khác vẫn dùng bình thường. |
| 9 | Ghi chú đánh giá | Textbox nhiều dòng | Text | • Không bắt buộc, tối đa 500 ký tự, mở trên từng thẻ, lưu khi rời ô. Vượt → `E-kiem-tra-phap-ly-053` "Ghi chú tối đa 500 ký tự." |
| 10 | Thanh hành động (tóm tắt) | Label | ReadOnly | • Số điểm vi phạm và số điểm đã đánh giá. |
| 11 | Gửi lại kiểm tra | Button | Click | • Chỉ hiện khi có dải cảnh báo căn cứ. Click → `gui-du-thao` điền sẵn lĩnh vực và nguồn; Ngày xét hiệu lực = ngày hiện tại; người dùng chọn lại tệp dự thảo. |
| 12 | Xuất báo cáo | Button | Click | • Mở hộp thoại `xuat-bao-cao` (FC-020). |
| 13 | Hỏi đáp | Button | Click | • Mở ngăn `hoi-dap-web` bên phải với ngữ cảnh "Lượt kiểm tra này". |
| 14 | Bôi đen đoạn kết quả | Vùng chữ | Select | • Bôi đen bằng chuột hoặc phím trong vùng chữ của thẻ (trích đoạn, căn cứ, giải thích, đề xuất). Đoạn từ 5 đến 2000 ký tự → hiện thanh nổi ngay trên đoạn: [ Hỏi về đoạn này ] [ Sao chép ]; vùng chọn giữ nền nhấn. Bấm ra ngoài hoặc Esc → ẩn thanh.<br>• "Hỏi về đoạn này" → mở `hoi-dap-web` kèm trích dẫn đoạn (xem [9], [10] của màn đó). Chỉ web, popup chưa hỗ trợ `[CẦN XÁC NHẬN]`.<br>• Dưới 5 ký tự: không hiện thanh. Vượt 2000 ký tự → `E-kiem-tra-phap-ly-103` "Đoạn đã chọn tối đa 2000 ký tự. Vui lòng chọn đoạn ngắn hơn."; không mở ngăn, giữ vùng bôi đen.<br>• Không đổi mức độ, đánh giá hay kết quả của điểm vi phạm. |

---

## Screen: xuat-bao-cao — Xuất báo cáo (hộp thoại)

### Wireframe (ASCII)

> Hộp thoại phủ lên `ket-qua-kiem-tra`.

```text
┌────────────────────────────────────────────────────────────────────────────────────┐
│ Xuất báo cáo kết quả kiểm tra                                        (x)           │
├────────────────────────────────────────────────────────────────────────────────────┤
│ Định dạng [1]:  (*) Word   ( ) PDF                                                 │
│ Mức độ đưa vào [2]:  [x] Nghiêm trọng  [x] Cần chỉnh sửa  [x] Lưu ý                │
│ [x] Kèm đề xuất chỉnh sửa [3]                                                      │
│ Tên tệp: BaoCaoKiemTraPhapLy_DuThao_NghiDinh_20261016_0915.docx                    │
│ (info) Báo cáo có giá trị nhạy cảm đã khôi phục, chỉ lưu hành nội bộ.              │
│                                                                                    │
│                                           [4] < Hủy >   [5] [ Xuất và tải về ]     │
└────────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Định dạng | Radio | Select | • Word / PDF. Mặc định Word. |
| 2 | Mức độ đưa vào | Checkbox nhóm | Check | • Nghiêm trọng, Cần chỉnh sửa, Lưu ý; mặc định chọn cả ba, ít nhất 1 → ngược lại `E-kiem-tra-phap-ly-055` "Vui lòng chọn ít nhất một mức độ." Mức không có điểm ghi "Không có". |
| 3 | Kèm đề xuất chỉnh sửa | Checkbox | Check | • Mặc định chọn. Báo cáo gồm thông tin lượt, tóm tắt, bảng tổng hợp, chi tiết điểm theo mức giảm dần; không in chi phí và nhà cung cấp AI. |
| 4 | Hủy | Link | Click | • Đóng hộp thoại, về `ket-qua-kiem-tra`. |
| 5 | Xuất và tải về | Button | Click | • Tên tệp `BaoCaoKiemTraPhapLy_<tên lượt>_<yyyyMMdd_HHmm>.<docx|pdf>`. Giá trị che ẩn khôi phục trong báo cáo; hiển thị nhắc chỉ lưu hành nội bộ.<br>• Không có quyền hoặc hết hạn lưu giữ → `E-kiem-tra-phap-ly-054` "Không thể xuất báo cáo do không có quyền hoặc kết quả đã hết thời hạn lưu giữ."; lỗi tạo tệp → `E-kiem-tra-phap-ly-056` "Không tạo được báo cáo. Vui lòng thử lại.", cho thử lại. Ghi log người xuất, định dạng, mức độ. |

---

## Screen: xoa-luot-kiem-tra — Xóa lượt kiểm tra (hộp thoại)

### Wireframe (ASCII)

> Hộp thoại phủ lên `danh-sach-luot-kiem-tra`.

```text
┌────────────────────────────────────────────────────────────────────────────────┐
│ Xóa lượt kiểm tra                                              (x)             │
├────────────────────────────────────────────────────────────────────────────────┤
│ Bạn chắc chắn muốn xóa lượt "DuThao_NghiDinh_QuyHoachDoThi"?                   │
│                                                                                │
│ (!) [1] Tệp dự thảo, kết quả, đánh giá và hội thoại hỏi đáp sẽ bị xóa          │
│     và không khôi phục được. Bản ghi chi phí vẫn được giữ.                     │
│                                                                                │
│                                   [2][ Xác nhận xóa ]   [3] < Hủy >            │
└────────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Cảnh báo xóa | Label | ReadOnly | • Nêu rõ: tệp dự thảo, bản đã xử lý nhạy cảm, kết quả, đánh giá và hội thoại hỏi đáp bị xóa thật, không khôi phục; bản ghi chi phí và nhật ký gửi dữ liệu ra AI vẫn giữ để đối soát. |
| 2 | Xác nhận xóa | Button | Click | • Chỉ người gửi → ngược lại `E-kiem-tra-phap-ly-057` "Bạn không có quyền xóa lượt kiểm tra này." Lượt Chờ xử lý hoặc Đang xử lý → `E-kiem-tra-phap-ly-058` "Vui lòng hủy yêu cầu trước khi xóa lượt kiểm tra đang xử lý."<br>• Thành công → về `danh-sach-luot-kiem-tra`; lượt không còn trong danh sách. Ghi log người xóa, loại dữ liệu đã xóa. |
| 3 | Hủy | Link | Click | • Đóng hộp thoại, không xóa. |

---

## Screen: hoi-dap-web — Hỏi đáp trong trang kết quả (ngăn bên phải)

### Wireframe (ASCII)

> Ngăn mở từ cạnh phải `ket-qua-kiem-tra`, giữ nguyên nội dung kết quả ở bên trái.

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ Hỏi đáp về kết quả                          [2] < Xóa hội thoại >  (x)     │
├────────────────────────────────────────────────────────────────────────────┤
│ Ngữ cảnh [1]: [v: Lượt kiểm tra này]                                       │
│ ---------------------------------------------------------------            │
│ [10] Đã chọn · Điểm 1/10, Giải thích: "Thời hạn 3 ngày ngắn hơn mức ..."   │
│ [3] Bạn: Điều 8 khoản 2 vi phạm quy định nào?                              │
│     AI: Thời hạn 3 ngày ngắn hơn Điều 15 Khoản 1 NĐ 11/2021.               │
│     Trích dẫn [4]: < ND 11/2021 Đ.15 Tr.7 >                                │
│                                                                            │
│     Bạn: Điều 12 có ngoại lệ cho hồ sơ khẩn không?                         │
│     AI: Chưa đủ căn cứ trong kho văn bản đã chọn để trả lời.               │
│ ---------------------------------------------------------------            │
│ [9] Đang hỏi về: "Thời hạn 3 ngày ngắn hơn mức tối thiểu ..."   < Bỏ x >   │
│ Câu hỏi (tối đa 2000 ký tự) [5]                                            │
│ [Điều 12 có ngoại lệ cho hồ sơ khẩn không?_____________________]           │
│ [6][ Đính kèm tệp ]  BieuMau.pdf (1,2 MB) < Xóa >                          │
│                                  [7] < Đóng >    [8][ Gửi ]                │
└────────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|-------------|
| 1 | Ngữ cảnh | Combobox | Select | • "Lượt kiểm tra này" (mặc định khi mở từ kết quả) / "Lĩnh vực" (hiện ô chọn lĩnh vực) / "Văn bản trong kho" (hiện ô chọn văn bản, chỉ văn bản có quyền xem).<br>• Lượt hết hạn lưu giữ hoặc bị xóa → `E-kiem-tra-phap-ly-062` "Kết quả của lượt kiểm tra này không còn, vui lòng chọn ngữ cảnh khác." |
| 2 | Xóa hội thoại | Button | Click | • Xóa toàn bộ hội thoại của ngữ cảnh hiện tại sau khi xác nhận. |
| 3 | Hội thoại | Label | ReadOnly | • Câu hỏi và trả lời theo thứ tự thời gian; chỉ trả lời dựa trên điều khoản trong ngữ cảnh và tệp đính kèm. Không đủ căn cứ → "Chưa đủ căn cứ trong kho văn bản đã chọn để trả lời câu hỏi này." và không gọi AI nếu chưa có điều khoản ứng viên. |
| 4 | Trích dẫn | Link | Click | • Mỗi câu trả lời kèm trích dẫn (văn bản, Điều, trang) đã kiểm tra tồn tại; click → `noi-dung-van-ban` [3.3] tại đúng điều khoản. Trích dẫn không kiểm tra được bị loại. |
| 5 | Câu hỏi | Textbox nhiều dòng | Text | • **Bắt buộc**, tối đa 2000 ký tự; gửi bằng nút hoặc Ctrl+Enter. Trống hoặc vượt → `E-kiem-tra-phap-ly-059` "Vui lòng nhập câu hỏi (tối đa 2000 ký tự)."<br>• Câu hỏi và tệp đính kèm được rà soát nhạy cảm như dự thảo (hiện lựa chọn Cho phép / Che ẩn / Xóa nếu có phát hiện). |
| 6 | Đính kèm tệp | Upload | Select | • Không bắt buộc, một tệp mỗi câu hỏi, PDF hoặc Word, tối đa 50MB; AI đọc trực tiếp, tệp không vào kho. Sai định dạng, quá lớn hoặc không đọc được → `E-kiem-tra-phap-ly-060` "Tệp đính kèm phải là PDF hoặc Word, tối đa 50MB, và đọc được nội dung." |
| 7 | Đóng | Link | Click | • Đóng ngăn, về `ket-qua-kiem-tra`; hội thoại vẫn lưu cùng lượt. |
| 8 | Gửi | Button | Click | • Gọi AI theo nhà cung cấp mặc định của đơn vị; ghi token, chi phí, tính vào hạn mức. Lỗi nhà cung cấp → `E-kiem-tra-phap-ly-061` "Chưa trả lời được do lỗi từ nhà cung cấp AI. Vui lòng thử lại." Chưa có nhà cung cấp mặc định hoặc hạn mức chế độ Chặn đã vượt → chặn gửi như màn Gửi dự thảo. |
| 9 | Chip Đang hỏi về | Chip | Click | • Chỉ hiện khi mở từ bôi đen (màn kết quả [14]). Rút gọn đoạn đã chọn; "Bỏ" xóa chip, câu hỏi trở thành câu hỏi thường. Mỗi câu hỏi gắn tối đa một đoạn; bôi đoạn khác thì thay đoạn cũ.<br>• Đoạn đã khôi phục giá trị gốc → che ẩn lại hoặc loại bỏ theo lựa chọn nhạy cảm của lượt trước khi gửi AI. |
| 10 | Thẻ trích dẫn đoạn đã chọn | Card | ReadOnly | • Hiện đầu hội thoại và lưu cùng câu hỏi: điểm vi phạm nguồn, nơi bôi đen, đoạn chữ (tối đa 2000 ký tự). Ngữ cảnh luôn "Lượt kiểm tra này", trả lời vẫn chỉ dựa điều khoản trong ngữ cảnh. |

---
