# Đề xuất bổ sung SRS — Kiểm tra viện dẫn văn bản hết hiệu lực (K13)

Trạng thái: **ĐỀ XUẤT, chờ duyệt** — chưa sửa `SRS.md`. Sau khi duyệt sẽ gộp vào SRS (v1.2) rồi mới code K13a.
Ngày lập: 2026-10-19. Căn cứ: `KE-HOACH-K13-VIEN-DAN.md`.

Các quyết định đã chốt: danh mục dùng chung toàn hệ thống; Quản trị hệ thống duyệt mọi dòng; mức Nghiêm trọng cho hết hiệu lực, Cần chỉnh sửa cho ngưng hiệu lực; văn bản chỉ bị sửa đổi, bổ sung nằm ngoài phạm vi.

---

## A. Thêm mới: Chức năng 43 — Quản lý danh mục văn bản hết hiệu lực (FC-043)

Đặt ở Module 7 (Danh mục và quy tắc), sau FC-027. Cập nhật mô tả tóm tắt Module 7: thêm "danh mục văn bản hết hiệu lực".

### Yêu cầu giao diện

- Wireframe: bổ sung `ascii-wireframe/van-ban-het-hieu-luc-flow.md` (chưa có). Chưa có thiết kế Figma riêng `[CẦN THIẾT KẾ]`; tạm bám mẫu màn Danh mục (Figma 30-3315).
- Menu trái: nhóm "Danh mục và quy tắc", mục "Văn bản hết hiệu lực", đường dẫn `/he-thong/van-ban-het-hieu-luc`. Chỉ Quản trị hệ thống thấy.

| Tên trường thông tin | Kiểu điều khiển | Độ dài | Ràng buộc / Điều kiện | Kiểu dữ liệu |
|---|---|---|---|---|
| **Màn Danh sách (van-ban-het-hieu-luc-danh-sach)** | | | | |
| Ô tìm kiếm | Textbox | 100 | Tìm theo số hiệu hoặc tên (không phân biệt hoa thường, không dấu) | String |
| Bộ lọc Tình trạng | Combobox | - | -- Tất cả -- / Hết hiệu lực / Ngưng hiệu lực | Data list |
| Bộ lọc Trạng thái duyệt | Combobox | - | -- Tất cả -- / Đề xuất / Đã duyệt / Bị bác. Mặc định "Đề xuất" khi có dòng chờ duyệt, không thì "Tất cả" | Data list |
| Bộ lọc Nguồn | Combobox | - | -- Tất cả -- / Nhập tay / Từ kho / Nguồn chính thống | Data list |
| Bảng | Table | - | Cột: Loại, Số hiệu, Tên văn bản, Tình trạng, Từ ngày, Đến ngày, Văn bản thay thế, Nguồn, Trạng thái duyệt, Cập nhật. Sắp xếp mặc định: Đề xuất trước, rồi theo Cập nhật giảm dần. Phân trang 20 dòng. Danh sách trống → nút "Thêm" | Data list |
| Chip số "Chờ duyệt" | Label | - | Số dòng ở trạng thái Đề xuất; bấm để lọc | Number |
| **Màn Thêm hoặc sửa (van-ban-het-hieu-luc-form)** | | | | |
| Loại văn bản | Combobox | - | Không bắt buộc. Lấy từ danh mục loại văn bản đang dùng (FC-025) | Data list |
| Số hiệu | Textbox | 50 | Không bắt buộc. Dạng `số/năm/ký hiệu` (vd 72/2025/QH15). Hệ thống chuẩn hóa (bỏ khoảng trắng thừa, viết hoa ký hiệu) | String |
| Tên văn bản | Textbox | 300 | Bắt buộc. Tên không kèm số hiệu, vd "Luật Tổ chức chính quyền địa phương" | String |
| Ngày ban hành | DatePicker | - | Không bắt buộc. Cần khi không có Số hiệu | Date |
| Tình trạng | Combobox | - | Bắt buộc. Hết hiệu lực / Ngưng hiệu lực | Data list |
| Từ ngày | DatePicker | - | Bắt buộc. Ngày bắt đầu hết hoặc ngưng hiệu lực | Date |
| Đến ngày | DatePicker | - | Chỉ hiện khi Tình trạng = Ngưng hiệu lực. Không bắt buộc, trống = chưa xác định ngày hết ngưng. Phải lớn hơn Từ ngày | Date |
| Văn bản thay thế hoặc tiếp tục áp dụng | Textbox nhiều dòng | 500 | Không bắt buộc. Nhập chữ, vd "Luật Viên chức số 129/2025/QH15" | String |
| Ghi chú | Textbox nhiều dòng | 500 | Không bắt buộc | String |
| Nguồn | Label | - | Chỉ đọc. Nhập tay / Từ kho (kèm văn bản và Điều gợi ý) / Nguồn chính thống (kèm ngày tra) | String |
| **Hành động duyệt (trên danh sách và trên form)** | | | | |
| Nút Duyệt, Bác | Button | - | Chỉ hiện với dòng ở trạng thái Đề xuất (và Bị bác với nút Duyệt lại). Có thể chọn nhiều dòng để duyệt hoặc bác cùng lúc | - |
| Lý do bác | Textbox | 300 | Không bắt buộc | String |
| **Màn Xác nhận xóa** | | | | |
| Nội dung xác nhận | Label | - | Nêu tên và số hiệu. Nút "Xác nhận xóa" và "Hủy" | String |

### Quy trình

Không cần vẽ sơ đồ.

### Chức năng nghiệp vụ

**① Luồng xử lý thành công**

Bước 1: Quản trị hệ thống mở danh mục, hệ thống thực hiện:
- Hiển thị danh sách theo bộ lọc, kèm số dòng chờ duyệt (→ EX-01 nếu lỗi tải)

Bước 2: Quản trị hệ thống nhấn "Thêm" hoặc chọn một dòng để sửa, nhập thông tin rồi lưu, hệ thống thực hiện:
- Kiểm tra thông tin hợp lệ và không trùng (→ EX-02, EX-03)
- Dòng nhập tay lưu ở trạng thái "Đã duyệt" (người nhập chính là Quản trị hệ thống); dòng sửa giữ nguồn cũ
- Ghi log, cập nhật danh sách

Bước 3: Quản trị hệ thống duyệt hoặc bác dòng "Đề xuất", hệ thống thực hiện:
- Duyệt → dòng bắt đầu được dùng cho các lượt kiểm tra gửi sau (BR-05); Bác → dòng giữ lại với lý do, không được dùng
- Ghi log, cập nhật danh sách

Bước 4: Quản trị hệ thống nhấn "Xóa" một dòng, hệ thống thực hiện:
- Hiển thị xác nhận rồi xóa; điểm vi phạm của lượt cũ không bị ảnh hưởng (BR-06)

Ngoại lệ phát sinh theo điều kiện, không gắn một bước riêng: EX-04 (Người dùng không phải Quản trị hệ thống), EX-05 (Hai quản trị cùng sửa).

**② Luồng xử lý ngoại lệ**

| Mã | Tình huống | Xử lý |
|----|-----------|-------|
| EX-01 | Lỗi tải danh sách | Hiển thị `E-kiem-tra-phap-ly-107`: "Không tải được danh mục văn bản hết hiệu lực. Vui lòng thử lại." |
| EX-02 | Thiếu trường bắt buộc, ngày không hợp lệ (Đến ngày không lớn hơn Từ ngày), không có Số hiệu và cũng không có Ngày ban hành, số hiệu sai dạng | Hiển thị `E-kiem-tra-phap-ly-108` tại ô: "Thông tin chưa hợp lệ. Cần Tên văn bản, Tình trạng, Từ ngày; nếu không có Số hiệu thì phải có Ngày ban hành." Không lưu |
| EX-03 | Trùng một dòng đã có (cùng số hiệu đã chuẩn hóa, hoặc cùng tên + ngày ban hành khi không có số hiệu) | Hiển thị `E-kiem-tra-phap-ly-109`: "Văn bản này đã có trong danh mục." Kèm liên kết dòng đã có. Không lưu |
| EX-04 | Người dùng không phải Quản trị hệ thống | Chuyển màn truy-cap-bi-tu-choi |
| EX-05 | Dòng đã bị người khác sửa hoặc xóa trong lúc đang mở | Hiển thị `E-CHUNG-409`: tải lại rồi thử lại |

**③ Quy tắc nghiệp vụ**

- BR-01: Danh mục dùng chung toàn hệ thống cho mọi đơn vị; đơn vị không có danh mục riêng `[GIẢ ĐỊNH]`
- BR-02: Chỉ Quản trị hệ thống thêm, sửa, xóa, duyệt, bác
- BR-03: Dòng sinh tự động (nguồn "Từ kho" hoặc "Nguồn chính thống") luôn vào ở trạng thái "Đề xuất"; chưa duyệt thì chưa dùng cho kiểm tra
- BR-04: Văn bản chỉ bị sửa đổi, bổ sung (vẫn còn hiệu lực) không thuộc danh mục này và không được gợi ý
- BR-05: Hiệu lực của một dòng tại "Ngày xét hiệu lực" của lượt (FC-012 BR-02): **Hết hiệu lực** khi Ngày xét ≥ Từ ngày; **Ngưng hiệu lực** khi Từ ngày ≤ Ngày xét và (Đến ngày trống hoặc Ngày xét ≤ Đến ngày). Ngoài các khoảng đó văn bản coi là còn hiệu lực với lượt này
- BR-06: Đổi hoặc xóa dòng chỉ ảnh hưởng các lượt kiểm tra sau; điểm vi phạm của lượt cũ giữ nguyên nội dung đã lưu
- BR-07: Số hiệu được chuẩn hóa khi lưu để so khớp ổn định (bỏ khoảng trắng, viết hoa ký hiệu, giữ dấu tiếng Việt của ký hiệu như `NĐ-CP`)

**Gợi ý từ kho (xem FC-005 bổ sung)**
- BR-08: Khi nạp một văn bản vào kho, hệ thống đọc các điều có tiêu đề "Hiệu lực thi hành", "Điều khoản thi hành", "Điều khoản chuyển tiếp"; mỗi câu chứa "hết hiệu lực", "bãi bỏ", "bị bãi bỏ", "thay thế" kèm số hiệu một văn bản khác thì tạo một dòng "Đề xuất", nguồn "Từ kho", ghi rõ văn bản nguồn và Điều đã đọc. Từ ngày = Ngày hiệu lực của văn bản đang nạp `[GIẢ ĐỊNH]`. Câu chỉ nói "sửa đổi, bổ sung" hoặc chỉ hết hiệu lực một phần (một điều, một khoản) thì không tạo dòng (BR-04)
- BR-09: Quản trị hệ thống có nút "Quét lại kho" quét lại các văn bản đã nạp; dòng đã tồn tại (cùng số hiệu) được bỏ qua, không tạo trùng. Hệ thống gửi thông báo cho Quản trị hệ thống khi có dòng Đề xuất mới

**Tra cứu nguồn chính thống (khung, chưa kết nối thật)**
- BR-10: Hệ thống có giao diện kết nối cho một nguồn tra cứu hiệu lực chính thống (hướng tới hệ thống chia sẻ dữ liệu của Cơ sở dữ liệu quốc gia về pháp luật, Bộ Tư pháp). **Chưa có thông tin kết nối** `[CẦN XÁC NHẬN: tài khoản, địa chỉ dịch vụ, giao thức, điều kiện sử dụng]`. Mặc định TẮT. Khi bật và có kết nối, chỉ số hiệu hoặc tên văn bản bị viện dẫn được gửi ra ngoài (không gửi nội dung dự thảo); kết quả lưu thành dòng "Đề xuất", nguồn "Nguồn chính thống", kèm ngày tra; ghi vào Nhật ký gửi dữ liệu ra ngoài (FC-037)

### Thông báo và thông tin lưu vết log

**Thông báo hệ thống**

Thông báo trong ứng dụng cho Quản trị hệ thống: "Có <N> văn bản hết hiệu lực đề xuất chờ duyệt" (BR-08, BR-09).

**Log hệ thống (Audit Trail)**

Ghi log thêm, sửa, xóa, duyệt, bác kèm giá trị trước và sau, người thực hiện; ghi log các lần quét kho (số dòng đề xuất tạo ra, số bỏ qua).

### Edge cases

- Văn bản có số hiệu đổi định dạng giữa các nguồn (có khoảng trắng, "/" thay "-"): chuẩn hóa theo BR-07 trước khi so.
- Hai văn bản mới cùng nói thay thế một văn bản cũ: chỉ một dòng, ghi nguồn đầu tiên; dòng sau bị bỏ qua (BR-09).
- Dòng Đã duyệt bị sửa Từ ngày: có hiệu lực ngay cho lượt gửi sau.
- Dòng Bị bác bị quét lại từ kho: không tạo lại dòng mới (đã có cùng số hiệu), Quản trị hệ thống vẫn có thể "Duyệt lại".

---

## B. Sửa FC-014 — Đối chiếu dự thảo với kho bằng AI

**Đổi tên** thành "Đối chiếu dự thảo với kho và kiểm tra viện dẫn" `[CẦN XÁC NHẬN tên]`, hoặc giữ tên và thêm bước sau.

**Quy trình (sơ đồ)**: thêm trước bước (3): `S->>DB: (2b) Kiểm tra viện dẫn với danh mục văn bản hết hiệu lực (không qua AI)`.

**① Luồng xử lý — thêm sau dòng "Tách dự thảo…":**
- Nhận diện các văn bản mà dự thảo viện dẫn: theo số hiệu (dạng `số/năm/ký hiệu`) hoặc theo tên kèm ngày ban hành ("Luật Viên chức ngày 15 tháng 11 năm 2010"). Đối chiếu với danh mục văn bản hết hiệu lực (FC-043) theo Ngày xét hiệu lực của lượt. Không gọi AI, không tính token và chi phí. Mỗi văn bản hết hoặc ngưng hiệu lực tạo một điểm vi phạm loại "Viện dẫn" (BR-08, BR-09)

**② Ngoại lệ — sửa EX-04:** Dự thảo không có đoạn nào có ứng viên liên quan **và** không có điểm Viện dẫn → lượt vẫn "Hoàn tất" với 0 điểm (giữ thông báo `E-045`). Có điểm Viện dẫn thì không hiện thông báo này.

**③ Quy tắc — thêm:**
- BR-08: Chỉ dòng "Đã duyệt" của danh mục (FC-043) được dùng. Hiệu lực xét theo FC-043 BR-05 tại Ngày xét hiệu lực của lượt
- BR-09: Điểm Viện dẫn: mức "Nghiêm trọng" khi văn bản hết hiệu lực, "Cần chỉnh sửa" khi ngưng hiệu lực. Mỗi văn bản bị viện dẫn một điểm, vị trí lấy lần xuất hiện đầu tiên, giải thích nêu thêm số lần xuất hiện. Vị trí, trích đoạn (cụm viện dẫn), giải thích (tình trạng, từ ngày, nguồn), đề xuất (thay bằng văn bản ghi ở "Văn bản thay thế hoặc tiếp tục áp dụng", nếu trống thì đề xuất kiểm tra lại) `[GIẢ ĐỊNH]`
- BR-10: Điểm Viện dẫn không phải qua kiểm tra trích dẫn của BR-05 (không có điều khoản căn cứ trong kho); thay vào đó trích đoạn phải xuất hiện trong dự thảo
- BR-11: Không nhận diện được số hiệu hoặc tên tin cậy (tên mơ hồ, thiếu ngày) → không tạo điểm, không đoán `[GIẢ ĐỊNH]`

**Log lượt:** thêm số văn bản bị viện dẫn nhận diện được và số điểm Viện dẫn tạo ra.

---

## C. Sửa FC-018 — Xem chi tiết kết quả kiểm tra

- Thẻ điểm vi phạm có nhãn loại: "Đối chiếu điều khoản" hoặc "Viện dẫn".
- Thẻ Viện dẫn: phần Căn cứ hiển thị tên văn bản bị viện dẫn, số hiệu, tình trạng (Hết hiệu lực / Ngưng hiệu lực), Từ ngày, Văn bản thay thế; **không** có số trang trong kho và **không** có nút mở Nội dung văn bản.
- Cột căn cứ bên trái: nhóm "Viện dẫn văn bản hết hiệu lực" kèm số điểm, bấm để lọc.
- BR-04 (căn cứ) sửa: "Với điểm Đối chiếu điều khoản: …". Thêm BR: "Với điểm Viện dẫn, căn cứ là dòng danh mục tại thời điểm kiểm tra; nội dung được lưu cùng điểm, không đổi theo danh mục sau này (FC-043 BR-06)".
- BR-05 (cảnh báo căn cứ đã đổi) không áp cho điểm Viện dẫn.

## D. Sửa FC-019, FC-020, FC-022

- FC-019 (Đánh giá): điểm Viện dẫn đánh giá như điểm khác.
- FC-020 (Xuất báo cáo): bảng điểm có thêm cột/ghi chú loại; căn cứ của điểm Viện dẫn in thông tin dòng danh mục thay cho điều khoản kho.
- FC-022 (Hỏi đáp): ngữ cảnh "Lượt kiểm tra" gồm cả điểm Viện dẫn.

## E. Sửa FC-005 — Nạp văn bản từ tệp hoặc đường dẫn

Thêm vào luồng thành công, sau khi lưu văn bản: "Hệ thống xếp việc nền gợi ý văn bản hết hiệu lực từ nội dung vừa nạp (FC-043 BR-08)". Lỗi việc nền không làm hỏng việc nạp; ghi log và có thể quét lại ở FC-043 (BR-09).

## F. Sửa FC-037 — Nhật ký gửi dữ liệu ra AI

Mục tra cứu nguồn chính thống (FC-043 BR-10) ghi một dòng cho mỗi lần gọi ra ngoài: thời gian, nguồn, số lượng số hiệu hoặc tên gửi đi, kết quả. Khi tắt thì không có dòng nào.

## G. Sửa FC-041 — Phân quyền

Thêm quyền "Quản lý danh mục văn bản hết hiệu lực": chỉ Quản trị hệ thống. Thêm mục menu tương ứng (xem A).

## H. Mã lỗi thêm mới

| Mã | Nội dung |
|---|---|
| `E-kiem-tra-phap-ly-107` | Không tải được danh mục văn bản hết hiệu lực. Vui lòng thử lại. |
| `E-kiem-tra-phap-ly-108` | Thông tin chưa hợp lệ. Cần Tên văn bản, Tình trạng, Từ ngày; nếu không có Số hiệu thì phải có Ngày ban hành. |
| `E-kiem-tra-phap-ly-109` | Văn bản này đã có trong danh mục. |

Ghi chú rà soát: mã `E-104`, `E-105`, `E-106` đã dùng trong mã nguồn nhưng **chưa có trong `SRS.md`** (xem `src/lib/thong-diep.ts`); đề nghị bổ sung vào SRS cùng đợt này để mã 107-109 không xung đột.

## I. Cập nhật phụ lục

- Dữ liệu dùng chung: thêm "Danh mục văn bản hết hiệu lực (FC-043)": loại, số hiệu, tên, ngày ban hành, tình trạng, từ ngày, đến ngày, văn bản thay thế, nguồn, trạng thái duyệt.
- Lịch sử thay đổi SRS: thêm dòng v1.2.

## J. Điểm còn mở

| Điểm | Đề xuất tạm | Ai quyết |
|---|---|---|
| Tên FC-014 có đổi không | Giữ tên, thêm bước | BA |
| Nguồn tra cứu chính thống: tài khoản, địa chỉ, điều kiện sử dụng | Chưa kết nối; chỉ làm khung và bản giả | Khách hàng / Bộ Tư pháp |
| Từ ngày của dòng "Từ kho" | Ngày hiệu lực của văn bản đang nạp | BA |
| Một điểm hay nhiều điểm cho văn bản viện dẫn nhiều lần | Một điểm, ghi số lần | BA |
| Thiết kế Figma màn danh mục mới | Bám mẫu màn Danh mục | Thiết kế |

---

# Kế hoạch kỹ thuật K13a (chỉ làm sau khi duyệt đề xuất trên)

**Phạm vi K13a:** bảng danh mục + RLS + service + API + màn quản trị (danh sách, thêm/sửa, duyệt/bác, xóa) + menu + quyền. **Chưa** có quét viện dẫn (K13b), gợi ý từ kho (K13c), tra cứu ngoài (K13d).

1. **Schema + migration mới** (không sửa migration cũ): bảng `van_ban_het_hieu_luc` — `id`, `loai_van_ban_id` (null, tham chiếu danh mục), `so_hieu` (null), `so_hieu_chuan` (null, để so khớp), `ten`, `ngay_ban_hanh` (null), `tinh_trang` (enum `het_hieu_luc`/`ngung_hieu_luc`), `tu_ngay`, `den_ngay` (null), `van_ban_thay_the` (null), `ghi_chu` (null), `nguon` (enum `nhap_tay`/`tu_kho`/`nguon_chinh_thong`), `nguon_chi_tiet` (null, jsonb: văn bản kho + Điều, hoặc ngày tra), `trang_thai_duyet` (enum `de_xuat`/`da_duyet`/`bi_bac`), `ly_do_bac` (null), người tạo/duyệt, `created_at`, `updated_at`. Ràng buộc: có `so_hieu` hoặc `ngay_ban_hanh`; `den_ngay` > `tu_ngay`; chỉ `ngung_hieu_luc` mới có `den_ngay`; duy nhất theo `so_hieu_chuan` khi có số hiệu và theo (`ten` thường, `ngay_ban_hanh`) khi không có.
2. **RLS:** bật; đọc cho mọi người dùng đã đăng nhập (K13b cần đọc khi kiểm tra, qua `voiHeThong` ở worker), ghi chỉ Quản trị hệ thống. Thêm test vào `rls.test.ts` (chéo vai trò).
3. **Quyền:** thêm mã quyền `van_ban_het_hieu_luc` chỉ cho `quan_tri_he_thong` trong `lib/quyen-vai-tro.ts`; thêm mục menu trong nhóm "Danh mục và quy tắc" (route mới, bỏ cờ `sapCo` cho mục này nếu có).
4. **Service** `services/van-ban-het-hieu-luc/`: danh sách + lọc + phân trang, thêm, sửa (có kiểm tra phiên bản để EX-05), xóa, duyệt/bác (một hoặc nhiều dòng), chuẩn hóa số hiệu (dùng chung hàm với `nghiem-thu/cham-diem.ts` hoặc đưa lên thư mục chung), ghi nhật ký thao tác. Service là nơi duy nhất truy cập DB.
5. **API** `/api/v1/van-ban-het-hieu-luc` (GET danh sách, POST), `/{id}` (GET, PUT, DELETE), `/duyet` (POST danh sách id + hành động). Route handler chỉ xác thực, kiểm đầu vào, gọi service.
6. **Màn** `/he-thong/van-ban-het-hieu-luc`: bảng + bộ lọc + chip chờ duyệt + biểu mẫu (dialog) + duyệt/bác hàng loạt + xác nhận xóa; mã lỗi 107-109 vào `lib/thong-diep.ts`.
7. **Test viết trước từ EX/BR:** EX-01..05, BR-02, BR-03, BR-05 (hàm tính hiệu lực tại ngày xét: hết, ngưng có/không có Đến ngày, ranh giới ngày), BR-07 (chuẩn hóa), trùng số hiệu/tên+ngày, phân quyền (người dùng, quản trị đơn vị bị từ chối cả UI và API), RLS.
8. **Tự nghiệm thu theo vai trò** (Người dùng, Quản trị đơn vị, Quản trị hệ thống) rồi đối chiếu từng BR; commit `K13a: danh mục văn bản hết hiệu lực (FC-043)`.

Tiêu chí xong K13a: Quản trị hệ thống thêm/sửa/duyệt/bác/xóa được; hai vai trò còn lại bị chặn ở cả menu, trang và API; test và lint xanh.
