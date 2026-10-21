# TÀI LIỆU YÊU CẦU NGƯỜI DÙNG (URD)
## Quản lý nhiên liệu tiêu hao — Phiên 2/3: Nhập lĩnh/tồn và chốt tháng

| Thông tin | Nội dung |
|---|---|
| Khách hàng | Tập đoàn CN Than - Khoáng sản Việt Nam (Đội xe văn phòng) |
| Phiên bản | v1.0 |
| Ngày | 21/10/2026 |
| Người soạn | mynguyen.cntt.px (BA VNPT-IT) |
| Trạng thái | Dự thảo — chờ chốt |
| Phiên chốt | Phiên 2/3 — Nhập lĩnh/tồn và chốt tháng *(Phiên 1: Định mức và hệ số; Phiên 3: Báo cáo và biểu mẫu in)* |

> **Ghi chú cho người đọc:** Tài liệu này mô tả **hệ thống hỗ trợ những công việc gì** và **giao diện thể hiện ở mức tổng quan**, để quý khách hàng rà soát và xác nhận trước khi xây dựng chi tiết. Tài liệu không đi vào chi tiết kỹ thuật; các nội dung đó sẽ được đặc tả riêng ở giai đoạn sau (SRS).
>
> **⚠️ Lưu ý khi gửi bản chính thức:** thay các vị trí 🖼️ bằng **ảnh xuất từ Figma** (file `ioffice_v5`, section "Nhiên liệu · Quản lý tiêu hao và biểu mẫu đơn vị", nhóm **B · Nhập lĩnh/tồn và chốt tháng**).
>
> **Về phạm vi thiết kế:** nhóm B trên Figma hiện có 3 màn (Sổ theo dõi lĩnh, Popup thêm/sửa phiếu lĩnh, Nhật ký chỉnh sửa). Các thao tác **chốt tháng, mở khóa tháng, xử lý tồn đầu lệch** mới có wireframe chữ, **chưa có thiết kế Figma**; tài liệu mô tả ở mức nghiệp vụ và đánh dấu rõ để chốt thêm.

---

## TÓM TẮT NHANH (đọc trong 3 phút)

| Mục | Nội dung |
|---|---|
| **Vấn đề đang gặp** | Phiếu lĩnh, hóa đơn mua ngoài và tồn đầu/cuối của từng xe ghi trên sổ giấy, cuối tháng phải cộng tay để lập biểu; dễ trùng số phiếu, tồn âm hoặc vượt thùng mà không ai phát hiện. |
| **Mục tiêu hệ thống mới** | Mỗi xe có một sổ lĩnh theo tháng; hệ thống tự cộng, tự điền sẵn tồn đầu/cuối theo định mức, chặn trùng số phiếu và sai quy tắc tồn, cho phép chốt tháng và giữ nhật ký mọi thay đổi. |
| **Phạm vi phiên này** | Sổ theo dõi lĩnh theo xe/tháng · Thêm/sửa phiếu lĩnh và hóa đơn mua ngoài · Tồn đầu, tồn cuối do lái xe cập nhật · Nhật ký chỉnh sửa · Chốt tháng, mở khóa, tồn đầu lệch |
| **Số màn hình chính** | 3 màn có thiết kế + 4 màn/hộp thoại chưa có thiết kế Figma |
| **Số yêu cầu cần chốt** | 8 yêu cầu (UR09–UR16, đánh số tiếp sau Phiên 1) |
| **Đối tượng sử dụng** | Lái xe, Quản lý xe/Đội trưởng, Người có quyền mở khóa |

🖼️ *[Chèn ảnh màn "Sổ theo dõi lĩnh theo xe" — màn lái xe dùng nhiều nhất]*

---

## MỤC LỤC

1. [Bối cảnh & Mục tiêu](#1-bối-cảnh--mục-tiêu)
2. [Đối tượng sử dụng](#2-đối-tượng-sử-dụng)
3. [Luồng nghiệp vụ tổng quan](#3-luồng-nghiệp-vụ-tổng-quan)
4. [Màn hình & thao tác](#4-màn-hình--thao-tác)
5. [Yêu cầu chức năng chi tiết](#5-yêu-cầu-chức-năng-chi-tiết)
6. [Ngoài phạm vi](#6-ngoài-phạm-vi-phiên-này)
7. [Tiêu chí nghiệm thu](#7-tiêu-chí-nghiệm-thu)
8. [Xác nhận chốt nghiệp vụ](#8-xác-nhận-chốt-nghiệp-vụ)

---

## 1. Bối cảnh & Mục tiêu

**Vấn đề hiện tại**
> Lái xe lĩnh xăng dầu tại cây xăng được chỉ định bằng phiếu lĩnh, đôi khi phải mua ngoài bằng hóa đơn. Số liệu này, cùng tồn đầu và tồn cuối, được ghi theo từng xe trên biểu "Theo dõi lĩnh nhiên liệu" rồi tổng hợp thành biểu "Lĩnh, sử dụng, tồn" cuối tháng. Làm tay nên dễ nhập trùng số phiếu, tồn cuối âm hoặc lớn hơn dung tích thùng, và khó biết ai đã sửa số nào.

**Mục tiêu khi có hệ thống mới**
> - Mỗi xe một sổ lĩnh theo tháng; phiếu lĩnh và hóa đơn nhập **một lần**, báo cáo tự tổng hợp.
> - Tồn đầu, tồn cuối được **điền sẵn** theo định mức; lái xe chỉ sửa khi số thực tế khác.
> - Chặn ngay khi trùng số phiếu hoặc tồn sai quy tắc; sau khi chốt tháng thì không sửa được nữa nếu chưa mở khóa.
> - Mọi thay đổi có nhật ký (ai, lúc nào, số cũ, số mới).

**Phạm vi phiên chốt này**
> - Sổ theo dõi lĩnh theo xe và tháng
> - Thêm/sửa/xóa phiếu lĩnh và hóa đơn mua ngoài
> - Lái xe cập nhật tồn đầu, tồn cuối; đặt lại theo định mức
> - Nhật ký chỉnh sửa lĩnh và tồn
> - Chốt tháng, mở khóa tháng, xử lý tồn đầu các tháng sau bị lệch

---

## 2. Đối tượng sử dụng

### 👤 Lái xe
- **Là ai:** Lái xe biên chế phụ trách một hoặc vài xe, ví dụ anh An phụ trách xe 30M-51470.
- **Công việc liên quan hệ thống:** nhập phiếu lĩnh và hóa đơn mua ngoài của xe mình; cập nhật tồn đầu, tồn cuối theo số thực tế trên đồng hồ.
- **Điều cần hệ thống hỗ trợ:** chỉ thấy xe mình phụ trách; số tồn điền sẵn để đỡ gõ; báo ngay khi số phiếu trùng.

### 👤 Quản lý xe / Đội trưởng
- **Là ai:** Người quản lý đội xe của đơn vị, ví dụ chị Lan (tài khoản ql.xe01).
- **Công việc liên quan hệ thống:** xem sổ mọi xe của đơn vị, theo dõi xe nào lái xe chưa cập nhật tồn, kiểm tra nhật ký, chốt tháng.
- **Điều cần hệ thống hỗ trợ:** biết tháng đã đủ số liệu để chốt hay chưa; không bị sửa số sau khi đã chốt.

### 👤 Người có quyền mở khóa
- **Là ai:** Người được giao quyền riêng để mở lại tháng đã chốt (thường là lãnh đạo đội hoặc quản trị).
- **Công việc liên quan hệ thống:** mở khóa tháng khi phát hiện sai sót, ghi rõ lý do.
- **Điều cần hệ thống hỗ trợ:** mọi lần mở khóa và sửa sau đó đều lưu nhật ký.

---

## 3. Luồng nghiệp vụ tổng quan

🖼️ *[Chèn sơ đồ khối: Lĩnh xăng/mua ngoài → Nhập phiếu vào sổ xe → Lái xe cập nhật tồn đầu/cuối → Quản lý kiểm tra → Chốt tháng → (khi cần) Mở khóa → Sửa → Xử lý tồn đầu lệch]*

**Diễn giải luồng bằng lời:**
1. **Lĩnh nhiên liệu** — Lái xe lĩnh tại cây xăng được chỉ định (phiếu lĩnh) hoặc mua ngoài (hóa đơn).
2. **Ghi vào sổ xe** — Lái xe mở sổ theo dõi lĩnh của xe và tháng, bấm Thêm phiếu lĩnh. Hệ thống kiểm trùng số phiếu rồi ghi dòng.
3. **Cập nhật tồn** — Hệ thống đã điền sẵn tồn đầu (= tồn cuối tháng trước) và tồn cuối ước tính theo định mức. Lái xe sửa nếu số thực tế khác, rồi bấm Lưu tồn.
4. **Kiểm tra cuối tháng** — Quản lý xem báo cáo tháng; xe nào còn "ước tính" (lái xe chưa cập nhật) thì nhắc lái xe.
5. **Chốt tháng** — Khi tất cả xe đã đủ tồn cuối và đúng quy tắc, quản lý chốt. Sau khi chốt, số liệu chỉ xem.
6. **Điều chỉnh sau chốt** — Nếu phát hiện sai, người có quyền mở khóa (bắt buộc ghi lý do), sửa, rồi chốt lại. Nếu sửa làm tồn đầu các tháng sau lệch, hệ thống hỏi: tính lại hay giữ nguyên và đánh dấu lệch.

---

## 4. Màn hình & thao tác

### 🖥️ Màn hình 1 — Sổ theo dõi lĩnh theo xe/tháng
**Ai dùng:** Lái xe, Quản lý xe · **Dùng để:** nhập phiếu lĩnh, hóa đơn và cập nhật tồn của một xe trong một tháng.

🖼️ *[Figma — nhóm B, màn "Sổ theo dõi lĩnh theo xe"]*

| # | Khu vực | Diễn giải |
|---|---|---|
| ① | Bộ lọc **Tháng**, **Xe** và các nút | Chọn tháng và xe (lái xe chỉ thấy xe mình phụ trách). Nút **+ Thêm phiếu lĩnh**, **Nhật ký chỉnh sửa**, **Xuất** (PDF mẫu "Theo dõi lĩnh nhiên liệu" hoặc Excel). Tháng đã chốt hoặc không đủ quyền thì ẩn nút Thêm. |
| ② | Khối **Tồn đầu / Lĩnh / Mua ngoài / Tồn cuối** | Tồn đầu và tồn cuối **điền sẵn**; lái xe sửa theo số thực tế rồi bấm **Lưu tồn**, hoặc **Đặt lại theo định mức** để về số ước tính. Có nhãn "Ước tính theo định mức" hoặc "Lái xe đã cập nhật" kèm thời điểm. Bên dưới hiện **Sử dụng thực tế** và **Sử dụng theo định mức** (ví dụ 3.250 km × 18,7 / 100 = 608 lít). |
| ③ | Bảng **phiếu lĩnh và hóa đơn** | Mỗi dòng: ngày, số phiếu, số hóa đơn, số lít phiếu, số lít hóa đơn, tổng, ghi chú; biểu tượng Sửa và Xóa. Cuối bảng có dòng **Cộng**. Bảng chỉ xem, thêm/sửa qua popup. |

### 🖥️ Màn hình 2 — Thêm/sửa phiếu lĩnh (popup)
**Ai dùng:** Lái xe · **Dùng để:** ghi một dòng phiếu lĩnh và/hoặc hóa đơn mua ngoài.

🖼️ *[Figma — nhóm B, popup "Thêm phiếu lĩnh"]*

| # | Khu vực | Diễn giải |
|---|---|---|
| ① | Xe/Tháng, **Ngày** | Xe và tháng lấy từ sổ đang mở (khóa). Ngày bắt buộc, thuộc tháng của sổ. |
| ② | **Số phiếu lĩnh**, **Số hóa đơn** | Nhập **ít nhất một** trong hai. Số phiếu lĩnh bị kiểm trùng toàn hệ thống: trùng thì báo ngay dưới ô "Số phiếu … đã ghi cho xe … (ngày), không thể trùng" và chặn Lưu. |
| ③ | **Số lít**: phiếu lĩnh, hóa đơn, tổng | Số lít bắt buộc khi đã nhập số chứng từ tương ứng. **Tổng số** tự tính, không sửa. |
| ④ | Ghi chú, nút **Lưu** / **Đóng** | Ghi chú tùy chọn. Lưu hợp lệ thì đóng popup, bảng và khối tổng hợp cập nhật, ghi nhật ký. Sửa phiếu dùng cùng popup (tiêu đề "Sửa phiếu lĩnh"). |

### 🖥️ Màn hình 3 — Nhật ký chỉnh sửa lĩnh và tồn
**Ai dùng:** Quản lý xe, Lái xe (chỉ xe mình) · **Dùng để:** tra lại ai đã sửa gì.

🖼️ *[Figma — nhóm B, màn "Nhật ký chỉnh sửa lĩnh và tồn"]*

| # | Khu vực | Diễn giải |
|---|---|---|
| ① | Bộ lọc | Tháng, xe, thao tác, người thực hiện, khoảng ngày. Mở từ sổ xe thì lọc sẵn theo xe và tháng. |
| ② | Bảng nhật ký | Mỗi dòng: thời gian, người, xe, thao tác, trường thay đổi, giá trị cũ → mới, nguồn (Lái xe / Quản lý / Quản trị / Hệ thống), lý do. Chỉ xem, không sửa/xóa, giữ vĩnh viễn, mới nhất xếp trước. |
| ③ | Phân trang | 10/20/50 dòng mỗi trang; nút Quay lại. |

### Các màn/hộp thoại chưa có thiết kế Figma (theo wireframe chữ)

| Màn | Mô tả ngắn |
|---|---|
| **Xác nhận chốt tháng** | Hiện số xe và số xe đã nhập đủ tồn cuối (ví dụ 8/8); cảnh báo "sau khi chốt không sửa được". Chưa đủ hoặc có xe sai quy tắc tồn thì không cho chốt. |
| **Mở khóa tháng** | Hiện người và thời điểm chốt; bắt buộc nhập lý do (tối đa 500 ký tự). |
| **Tồn đầu các tháng sau bị lệch** | Liệt kê tháng/xe có tồn đầu khác tồn cuối tháng trước mới sửa; chọn **Tính lại** hoặc **Giữ nguyên, đánh dấu lệch**. |
| **Lĩnh và tồn — tháng đã chốt** | Cùng bảng số liệu nhưng chỉ xem; nút Mở khóa chỉ hiện cho người có quyền. |

> Vị trí nút **Chốt tháng** trên giao diện chưa xác định (ghi chú trong tài liệu thiết kế) — cần chốt ở buổi họp.

### Luồng chuyển giữa các màn hình

🖼️ *[Sơ đồ: Báo cáo lĩnh–sử dụng–tồn (Phiên 3) → (bấm số Lĩnh tại cây xăng) → Sổ theo dõi lĩnh → (+ Thêm phiếu lĩnh) → Popup · Sổ theo dõi lĩnh → (Nhật ký chỉnh sửa) → Nhật ký · Báo cáo → (Chốt tháng) → Xác nhận chốt → Tháng đã chốt → (Mở khóa) → Mở khóa tháng → (nếu lệch) → Tồn đầu lệch]*

### Ví dụ tình huống thực tế

> **Tình huống:** Anh An (lái xe 30M-51470) vừa đổ xăng tại cây xăng chỉ định ngày 03/08 với phiếu số 359005, 50 lít. Anh mở **Sổ theo dõi lĩnh**, chọn tháng 08/2026, xe 30M-51470, bấm **+ Thêm phiếu lĩnh**, chọn ngày 03/08, gõ số phiếu 359005, số lít 50 và Lưu. Dòng mới hiện trong bảng; nếu số phiếu đã được ghi cho xe khác, hệ thống báo ngay và không cho lưu.
> Ngày 31/08, anh xem đồng hồ: tồn cuối thực tế 54 lít trong khi hệ thống ước tính 58. Anh sửa ô Tồn cuối thành 54 rồi **Lưu tồn**; nhãn đổi thành "Lái xe đã cập nhật 31/08", sử dụng thực tế hiện 612 lít (chênh +4 so với định mức 608). Ngày 05/09, chị Lan thấy đủ 8/8 xe, bấm **Chốt tháng**. Sang tháng sau chị Hương (có quyền mở khóa) phát hiện xe 30E-930.37 sai tồn, mở khóa với lý do "Nhập sai số đồng hồ", sửa 60 thành 62 và chốt lại; hệ thống hiện danh sách xe tồn đầu tháng 09 bị lệch để chị chọn Tính lại.

---

## 5. Yêu cầu chức năng chi tiết

> Đánh số tiếp theo Phiên 1 (UR01–UR08).

### Module: Sổ theo dõi lĩnh theo xe

#### UR09 — Mỗi xe có một sổ lĩnh theo tháng

Lái xe và quản lý cần mở sổ theo dõi lĩnh của từng xe theo từng tháng, để có đúng biểu "Theo dõi lĩnh nhiên liệu" ngay trên hệ thống và xuất ra in khi cần. Lái xe chỉ thấy xe mình phụ trách, quản lý thấy mọi xe của đơn vị.

- **Lưu ý đặc biệt:** Loại nhiên liệu lấy theo khai báo của xe (Phiên 1), không nhập lại. Xe biên chế gán cho lái xe nào do danh mục xe quyết định **[Giả thiết]**.
- **Màn hình liên quan:** Màn 1
- **Mức độ ưu tiên:** Cao

#### UR10 — Nhập phiếu lĩnh và hóa đơn mua ngoài

Lái xe cần ghi mỗi lần lĩnh nhiên liệu thành một dòng (ngày, số phiếu lĩnh, số hóa đơn, số lít, ghi chú), có thể sửa hoặc xóa khi nhập nhầm, để cuối tháng không phải cộng tay. Số lít phiếu lĩnh tự cộng vào "Lĩnh tại cây xăng chỉ định", số lít hóa đơn tự cộng vào "Mua ngoài" ở báo cáo.

- **Lưu ý đặc biệt:** Mỗi dòng phải có ít nhất một trong hai số chứng từ. Số phiếu lĩnh **chỉ nhập số** (hệ thống không quản lý kho phiếu). Mua ngoài vượt dung tích thùng chỉ **cảnh báo**, vẫn lưu và ghi nhật ký. Xóa dòng có hộp xác nhận.
- **Màn hình liên quan:** Màn 1, Màn 2
- **Mức độ ưu tiên:** Cao

#### UR11 — Chặn trùng số phiếu lĩnh và số hóa đơn

Hệ thống cần kiểm trùng số phiếu lĩnh trên toàn hệ thống và báo rõ phiếu đó đã ghi cho xe nào, ngày nào, để tránh một phiếu bị dùng hai lần.

- **Lưu ý đặc biệt:** Ví dụ nhập 359009 đã ghi cho xe 30M-51952 ngày 03/08 thì hiện "Số phiếu 359009 đã ghi cho xe 30M-51952 (03/08/2026), không thể trùng" và không cho lưu. Số hóa đơn cũng kiểm trùng.
- **Màn hình liên quan:** Màn 2
- **Mức độ ưu tiên:** Cao

### Module: Tồn đầu, tồn cuối

#### UR12 — Tự điền sẵn tồn và cho lái xe cập nhật số thực tế

Lái xe cần thấy tồn đầu và tồn cuối đã được điền sẵn, và sửa lại theo số thực tế của xe mình, để đỡ phải gõ lại và vẫn có số đúng.

- **Lưu ý đặc biệt:** Tồn đầu = tồn cuối tháng trước. Tồn cuối ước tính = tồn đầu + lĩnh + mua ngoài − sử dụng theo định mức; ví dụ 46 + 620 + 0 − 608 = 58 lít. Mỗi ô phải ≥ 0 và ≤ dung tích thùng, vi phạm thì viền đỏ và chặn **Lưu tồn**. **Đặt lại theo định mức** xóa số lái xe đã nhập, về số ước tính. Sử dụng thực tế = tồn đầu + lĩnh + mua ngoài − tồn cuối, không được âm.
- **Màn hình liên quan:** Màn 1
- **Mức độ ưu tiên:** Cao

### Module: Nhật ký

#### UR13 — Nhật ký mọi thay đổi lĩnh và tồn

Quản lý cần tra lại ai đã thêm/sửa/xóa phiếu, cập nhật tồn, chốt hay mở khóa tháng, kèm số cũ và số mới, để giải trình khi kiểm tra.

- **Lưu ý đặc biệt:** Chỉ ghi khi người dùng chủ động thay đổi; số ước tính hệ thống tự tính lại thì không ghi. Không ghi nếu số không đổi. Nhật ký không sửa, không xóa. Lái xe chỉ xem nhật ký xe mình.
- **Màn hình liên quan:** Màn 3
- **Mức độ ưu tiên:** Cao

### Module: Chốt tháng

#### UR14 — Chốt tháng

Quản lý cần chốt số liệu lĩnh/tồn của tháng để khóa số trước khi lập báo cáo chính thức. Hệ thống chỉ cho chốt khi mọi xe đã có tồn cuối đúng quy tắc.

- **Lưu ý đặc biệt:** Chưa đủ (ví dụ 7/8 xe) thì hệ thống báo xe còn thiếu hoặc sai và không cho chốt. Sau khi chốt, toàn bộ sổ của tháng chỉ xem (ẩn nút Thêm, Sửa, Xóa); vẫn xuất mẫu và Excel được. Giao diện nút Chốt tháng chưa có thiết kế **[Giả thiết — chờ chốt vị trí]**.
- **Màn hình liên quan:** Xác nhận chốt tháng (chưa có Figma)
- **Mức độ ưu tiên:** Cao

#### UR15 — Mở khóa tháng đã chốt

Người có quyền mở khóa cần mở lại một tháng đã chốt khi phát hiện sai sót, bắt buộc ghi lý do, để sửa mà vẫn truy được vì sao tháng đó bị mở.

- **Lưu ý đặc biệt:** Quyền mở khóa tách riêng với quyền thông thường. Lý do bắt buộc, tối đa 500 ký tự. Mở khóa xong tháng quay về "Chưa chốt"; mọi sửa đổi sau đó đều ghi nhật ký.
- **Màn hình liên quan:** Mở khóa tháng, Nhật ký (Màn 3)
- **Mức độ ưu tiên:** Cao

#### UR16 — Xử lý tồn đầu các tháng sau khi sửa tháng cũ

Khi tồn cuối tháng đã sửa làm tồn đầu các tháng sau không còn khớp, hệ thống cần liệt kê xe/tháng bị lệch và cho chọn Tính lại hoặc Giữ nguyên đánh dấu lệch, để không có số sai ngầm.

- **Lưu ý đặc biệt:** Tính lại chỉ áp cho tháng **chưa chốt**; tháng đã chốt phải mở khóa theo thứ tự trước. Cả hai lựa chọn đều ghi nhật ký.
- **Màn hình liên quan:** Tồn đầu các tháng sau bị lệch (chưa có Figma)
- **Mức độ ưu tiên:** Trung bình

---

## 6. Ngoài phạm vi (phiên này)

- Báo cáo quyết toán, lĩnh–sử dụng–tồn, chi tiết tiêu hao theo xe và 3 biểu mẫu in → **Phiên 3**.
- Quản lý kho phiếu lĩnh (chỉ kiểm trùng số, không theo dõi phát hành/thu hồi).
- Ký số trên biểu mẫu (in ký tay).
- Nhập phiếu lĩnh hàng loạt cho nhiều xe một lần: có wireframe chữ nhưng **không nằm trong thiết kế Figma** của nhóm B; nếu khách cần thì chốt riêng **[Giả thiết: chưa làm đợt này]**.
- Cảnh báo mua ngoài theo km chuyến công tác (đã bỏ vì không còn gắn chuyến).

---

## 7. Tiêu chí nghiệm thu

| # | Tiêu chí |
|---|---|
| 1 | **Khi** lái xe mở sổ, **thì** chỉ chọn được các xe mình phụ trách; quản lý chọn được mọi xe của đơn vị. |
| 2 | **Khi** nhập số phiếu lĩnh đã ghi cho xe khác, **thì** hệ thống báo rõ xe và ngày đã dùng và không cho lưu. |
| 3 | **Khi** không nhập số phiếu lĩnh lẫn số hóa đơn, **thì** hệ thống không cho lưu dòng. |
| 4 | **Khi** hóa đơn mua ngoài vượt dung tích thùng, **thì** hệ thống chỉ cảnh báo, vẫn lưu được và ghi nhật ký. |
| 5 | **Khi** thêm một phiếu lĩnh, **thì** dòng Cộng của sổ và số "Lĩnh tại cây xăng" của xe đó tăng đúng số lít. |
| 6 | **Khi** lái xe nhập tồn cuối âm hoặc lớn hơn dung tích thùng, **thì** ô viền đỏ và không cho Lưu tồn. |
| 7 | **Khi** bấm Đặt lại theo định mức, **thì** tồn về số ước tính và nhật ký ghi dòng "Đặt lại theo định mức". |
| 8 | **Khi** chưa đủ tồn cuối của mọi xe, **thì** hệ thống không cho chốt tháng và chỉ ra xe còn thiếu. |
| 9 | **Khi** tháng đã chốt, **thì** không còn nút Thêm/Sửa/Xóa và mọi ô chỉ xem; xuất mẫu vẫn dùng được. |
| 10 | **Khi** mở khóa tháng mà không nhập lý do, **thì** hệ thống không cho mở khóa. |
| 11 | **Khi** sửa tháng cũ làm tồn đầu tháng sau lệch, **thì** hệ thống hiện danh sách xe lệch và cho chọn Tính lại hoặc Giữ nguyên đánh dấu lệch. |
| 12 | **Khi** có bất kỳ thao tác thêm/sửa/xóa/chốt/mở khóa, **thì** nhật ký ghi người, thời điểm, giá trị cũ và mới, và không ai xóa được dòng nhật ký. |

---

## 8. Xác nhận chốt nghiệp vụ

| Đại diện | Họ tên | Chữ ký | Ngày |
|---|---|---|---|
| Khách hàng | | | |
| VNPT-IT (BA/PO) | | | |

---

## PHỤ LỤC

### A. Thuật ngữ
- **Phiếu lĩnh:** chứng từ lĩnh nhiên liệu tại cây xăng được chỉ định.
- **Mua ngoài (hóa đơn):** mua nhiên liệu ngoài cây xăng chỉ định, có hóa đơn.
- **Tồn đầu / Tồn cuối:** số lít còn trong thùng đầu và cuối tháng.
- **Sử dụng thực tế:** tồn đầu + lĩnh + mua ngoài − tồn cuối.
- **Sử dụng theo định mức:** km hoạt động trong tháng × định mức giao khoán / 100.
- **Chốt tháng / Mở khóa:** khóa số liệu tháng / mở lại để sửa có lý do.

### B. Câu hỏi mở cần chốt trong buổi họp
| # | Câu hỏi | Hiện đang giả định |
|---|---|---|
| 1 | Vị trí nút **Chốt tháng** trên giao diện (báo cáo hay màn riêng)? | Chưa xác định |
| 2 | Ai được cấp quyền mở khóa tháng? | Người có quyền riêng, tách với quyền thông thường **[Giả thiết]** |
| 3 | Lái xe nào được xem là "phụ trách" xe? | Lái xe biên chế gán cho xe trong danh mục xe **[Giả thiết]** |
| 4 | Nguồn km hoạt động trong tháng dùng để tính sử dụng theo định mức | Các chuyến đã xác nhận đi về **[Giả thiết]** |
| 5 | Có cần nhập phiếu lĩnh hàng loạt cho nhiều xe? | Không làm đợt này **[Giả thiết]** |
| 6 | Xe đổi nhóm tuổi giữa tháng tính định mức thế nào (Q5 của Phiên 1)? | Chưa có |

### C. Điều đã chốt với khách hàng (ghi chú review 14/10/2026)
- Số phiếu lĩnh chỉ nhập số và kiểm trùng toàn hệ thống, không quản lý kho phiếu.
- Mua ngoài vượt hạn mức chỉ cảnh báo, vẫn lưu được, ghi nhật ký.
- Màn nhập lĩnh/tồn tháng riêng đã gỡ vì trùng với báo cáo lĩnh, sử dụng, tồn; thay bằng sổ theo dõi lĩnh theo xe/tháng.
- Dữ liệu mẫu: xe 30M-51952 tồn cuối 41 (40 + 490 − 489), bản giấy ghi 42 có thể là lỗi in tay.
