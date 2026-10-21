# TÀI LIỆU YÊU CẦU NGƯỜI DÙNG (URD)
## Quản lý nhiên liệu tiêu hao — Phiên 1/3: Định mức và hệ số

| Thông tin | Nội dung |
|---|---|
| Khách hàng | Tập đoàn CN Than - Khoáng sản Việt Nam (Đội xe văn phòng) |
| Phiên bản | v1.0 |
| Ngày | 21/10/2026 |
| Người soạn | mynguyen.cntt.px (BA VNPT-IT) |
| Trạng thái | Dự thảo — chờ chốt |
| Phiên chốt | Phiên 1/3 — Định mức và hệ số *(Phiên 2: Nhập lĩnh/tồn và chốt tháng; Phiên 3: Báo cáo và biểu mẫu in)* |

> **Ghi chú cho người đọc:** Tài liệu này mô tả **hệ thống sẽ hỗ trợ những công việc gì** và **giao diện thể hiện ở mức tổng quan**, để quý khách hàng cùng rà soát và xác nhận trước khi đội ngũ kỹ thuật xây dựng chi tiết. Tài liệu **không** đi vào chi tiết kỹ thuật (mã nguồn, cấu trúc dữ liệu, validation chi tiết) — những nội dung đó sẽ được đặc tả riêng ở giai đoạn sau (SRS).
>
> **⚠️ Lưu ý khi gửi bản chính thức:** thay các vị trí 🖼️ bằng **ảnh đã xuất từ Figma** (file `ioffice_v5`, section "Nhiên liệu · Quản lý tiêu hao và biểu mẫu đơn vị", nhóm **A · Cấu hình định mức và hệ số**).

---

## TÓM TẮT NHANH (đọc trong 3 phút)

| Mục | Nội dung |
|---|---|
| **Vấn đề đang gặp** | Định mức tiêu hao theo loại xe và các hệ số điều chỉnh (tuổi xe, xe khai trường) đang tính thủ công theo văn bản của Tập đoàn; khi văn bản đổi thì khó biết xe nào, tháng nào áp định mức nào. |
| **Mục tiêu hệ thống mới** | Lưu sẵn định mức + hệ số theo từng thời kỳ, hệ thống tự tính **định mức giao khoán** cho từng xe và giữ nguyên số của các tháng đã chốt khi quy định thay đổi. |
| **Phạm vi phiên này** | Danh mục loại xe và định mức · Cấu hình hệ số tuổi xe · Hệ số xe phục vụ khai trường · Khai báo nhiên liệu/định mức trên từng xe |
| **Số màn hình chính** | 6 màn hình |
| **Số yêu cầu cần chốt** | 8 yêu cầu (UR01–UR08) |
| **Đối tượng sử dụng** | Quản trị danh mục loại xe/hệ số, Quản lý xe (Đội trưởng), Lái xe (chỉ xem kết quả) |

🖼️ *[Chèn ảnh màn "Danh mục loại xe và định mức" — màn người dùng thấy đầu tiên]*

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
> Mỗi xe có một mức tiêu hao nhiên liệu quy định (lít/100km) theo loại xe. Mức này còn phải nhân thêm hệ số theo tuổi xe (xe trên 7 năm ×1,05; trên 14 năm ×1,10) và hệ số 1,05 cho xe phục vụ đường khai trường tại Quảng Ninh. Việc tra văn bản và tự nhân hệ số cho từng xe mỗi tháng dễ sai sót; khi Tập đoàn ban hành định mức mới cũng khó truy lại tháng nào đã tính theo mức nào.

**Mục tiêu khi có hệ thống mới**
> - Khai báo định mức và hệ số **một lần**, hệ thống tự tính định mức giao khoán cho từng xe.
> - Khi văn bản đổi, thêm mức mới **có ngày hiệu lực**, mức cũ vẫn được giữ lại để tra cứu; số liệu các tháng đã chốt không bị thay đổi.
> - Mọi lần thay đổi đều có nhật ký (ai, khi nào, từ giá trị nào sang giá trị nào) và có thể đính kèm văn bản căn cứ.

**Phạm vi phiên chốt này**
> - Danh mục loại xe và định mức nhiên liệu gốc (theo văn bản Tập đoàn)
> - Cấu hình hệ số tuổi xe và hệ số xe phục vụ khai trường
> - Ngừng hoạt động / kích hoạt lại hệ số khi quy định thay đổi
> - Khai báo loại nhiên liệu, dung tích thùng, xe khai trường trên từng xe và xem định mức đang áp dụng

---

## 2. Đối tượng sử dụng

### 👤 Quản trị danh mục (người có quyền quản trị loại xe và hệ số)
- **Là ai:** Cán bộ phụ trách cập nhật quy định của Đội xe/Văn phòng.
- **Công việc liên quan hệ thống:** nhập định mức khi có văn bản mới; thêm, sửa, ngừng hoạt động hệ số; đính kèm văn bản quy định.
- **Điều cần hệ thống hỗ trợ:** đổi quy định mà không làm sai số liệu cũ; biết ai đã đổi gì, lúc nào.

### 👤 Quản lý xe / Đội trưởng
- **Là ai:** Người khai báo thông tin từng chiếc xe của đơn vị.
- **Công việc liên quan hệ thống:** chọn loại xe, loại nhiên liệu, dung tích thùng cho xe; đánh dấu xe phục vụ khai trường.
- **Điều cần hệ thống hỗ trợ:** thấy ngay định mức giao khoán đang áp dụng cho xe và biết nó được tính ra sao.

### 👤 Lái xe
- **Là ai:** Lái xe biên chế phụ trách một hoặc vài xe.
- **Công việc liên quan hệ thống:** chỉ xem kết quả định mức khi nhập lĩnh/tồn (Phiên 2).
- **Điều cần hệ thống hỗ trợ:** biết xe mình được giao khoán bao nhiêu lít/100km. Lái xe **không** được sửa định mức và hệ số.

> Chỉ người có quyền quản trị mới thấy các nút Thêm/Sửa/Ngừng hoạt động; người không đủ quyền chỉ xem.

---

## 3. Luồng nghiệp vụ tổng quan

🖼️ *[Chèn sơ đồ khối: Văn bản Tập đoàn → Nhập định mức loại xe (có ngày hiệu lực) → Cấu hình hệ số tuổi / khai trường → Khai báo xe (loại xe, tuổi, khai trường) → Hệ thống tự tính định mức giao khoán]*

**Diễn giải luồng bằng lời:**
1. **Nhập quy định** — Quản trị danh mục nhập định mức theo loại xe và các hệ số theo văn bản Tập đoàn, kèm ngày hiệu lực và tệp văn bản căn cứ.
2. **Khai báo xe** — Quản lý xe chọn loại xe, loại nhiên liệu, dung tích thùng và đánh dấu "Xe phục vụ khai trường" nếu đúng.
3. **Hệ thống tự tính** — Định mức giao khoán = định mức loại xe × hệ số tuổi xe × hệ số khai trường.
   *Ví dụ: Prado 2.7 (17,0), xe trên 14 năm (×1,10), không khai trường (×1,00) → **18,7 lít/100km**.*
4. **Khi quy định đổi** — Thêm mức/hệ số mới có hiệu lực từ ngày chỉ định. Mức cũ giữ trong lịch sử. Nếu ngày đó rơi vào tháng đã chốt, hệ thống không cho áp ngược; muốn sửa phải mở khóa tháng trước (Phiên 2).

---

## 4. Màn hình & thao tác

### 🖥️ Màn hình 1 — Danh mục loại xe và định mức
**Ai dùng:** Quản trị danh mục · **Dùng để:** xem và quản lý định mức nhiên liệu gốc của từng loại xe.

🖼️ *[Figma — nhóm A, frame đầu tiên "Danh mục loại xe và định mức"]*

| # | Khu vực | Diễn giải |
|---|---|---|
| ① | Nút **Hệ số** và **+ Thêm mới** | Hệ số: sang màn cấu hình hệ số (Màn hình 3). Thêm mới: mở form thêm loại xe (Màn hình 2). |
| ② | Bảng loại xe | Liệt kê loại xe, định mức (lít/100km), ngày hiệu lực, thao tác Sửa/Xóa. Hiện 6 loại theo quy định: Camry 2.4 = 15,0; Fortuner 2.7 = 16,0; Prado 2.7 = 17,0; Hilux 3.0 = 17,0; Pajero 3.0 = 17,1; Solati 2.5 = 17,5. Loại xe chưa có định mức hiện cảnh báo **"Chưa có (!)"**. |
| ③ | Chọn số dòng mỗi trang | Mặc định 10 dòng. |

Lưu ý: định mức ở đây là định mức **gốc**, chưa nhân hệ số. Chỉ xóa được loại xe khi chưa xe nào thuộc loại đó **[Giả thiết]**.

### 🖥️ Màn hình 2 — Thêm/sửa loại xe
**Ai dùng:** Quản trị danh mục · **Dùng để:** nhập hoặc đổi định mức của một loại xe.

🖼️ *[Figma — nhóm A, popup "Thêm/sửa loại xe"]*

| # | Khu vực | Diễn giải |
|---|---|---|
| ① | Tên loại xe | Bắt buộc, không trùng loại đã có. |
| ② | Định mức mới, Hiệu lực từ, Văn bản căn cứ, Ghi chú | Nhập mức mới và ngày bắt đầu áp dụng. **Đổi định mức không ghi đè**: hệ thống tạo mức mới từ ngày chỉ định, mức cũ giữ lại. Văn bản căn cứ (tùy chọn) đính kèm bằng nút Tải tệp lên. |
| ③ | Lịch sử định mức | Bảng các mốc đã áp dụng: định mức, khoảng hiệu lực, văn bản căn cứ (mở xem được). |

### 🖥️ Màn hình 3 — Cấu hình hệ số
**Ai dùng:** Quản trị danh mục · **Dùng để:** quản lý hệ số tuổi xe và hệ số xe phục vụ khai trường.

🖼️ *[Figma — nhóm A, màn "Cấu hình hệ số"]*

| # | Khu vực | Diễn giải |
|---|---|---|
| ① | Bảng **hệ số tuổi xe** | Nhóm A (đến 7 năm) 1,00; nhóm B (trên 7 đến 14 năm) 1,05; nhóm C (trên 14 năm) 1,10. Mỗi dòng có trạng thái Hoạt động/Không hoạt động và các biểu tượng Sửa (bút chì), Ngừng hoạt động (vòng cấm đỏ), Kích hoạt lại (mũi tên xanh). |
| ② | Bảng **hệ số xe phục vụ khai trường** | Hệ số 1,05 cho xe phục vụ Trung tâm Điều hành sản xuất tại Quảng Ninh, vận hành thường xuyên trên đường khai trường. Hệ số này **nhân thêm** ngoài hệ số tuổi. |
| ③ | Ô "Hiện cả hệ số không hoạt động" | Mặc định ẩn các dòng đã ngừng; bật lên để xem lịch sử. |
| ④ | Công thức định mức giao khoán | Hiển thị công thức và ví dụ: 17,0 × 1,10 × 1,00 = 18,7. |

Hệ số **không xóa cứng**, chỉ ngừng hoạt động, để giữ lịch sử và đối chiếu các tháng đã chốt.

### 🖥️ Màn hình 4 — Thêm/sửa hệ số
**Ai dùng:** Quản trị danh mục · **Dùng để:** thêm nhóm tuổi mới hoặc sửa hệ số.

🖼️ *[Figma — nhóm A, popup "Thêm/sửa hệ số"]*

| # | Khu vực | Diễn giải |
|---|---|---|
| ① | Loại hệ số | Chọn Tuổi xe hoặc Xe phục vụ khai trường (khóa khi sửa). |
| ② | Nhóm, Mô tả áp dụng | Tên nhóm không trùng trong cùng loại. Với hệ số khai trường, mô tả đối tượng xe là bắt buộc. |
| ③ | Tuổi xe từ – đến | Chỉ hiện với loại Tuổi xe. Các nhóm phải liền nhau, **không chồng lấn, không để hở**; để trống ô "đến" nghĩa là không giới hạn trên (nhóm cao nhất). |
| ④ | Hệ số, Hiệu lực từ | Hệ số dương, tối đa 2 chữ số thập phân. Chỉ áp dụng từ ngày hiệu lực, **không áp ngược** vào tháng đã chốt. |
| ⑤ | Văn bản căn cứ, Ghi chú | Đính kèm quyết định quy định hệ số (tùy chọn). |

### 🖥️ Màn hình 5 — Ngừng hoạt động hệ số
**Ai dùng:** Quản trị danh mục · **Dùng để:** ngừng áp dụng một hệ số khi quy định thay đổi.

🖼️ *[Figma — nhóm A, popup "Ngừng hoạt động hệ số"]*

| # | Khu vực | Diễn giải |
|---|---|---|
| ① | Hệ số đang chọn | Hiển thị loại, nhóm, khoảng tuổi, hệ số của dòng được chọn. |
| ② | Ngừng từ ngày, Lý do | Cả hai bắt buộc. Nếu ngày rơi vào tháng đã chốt, hệ thống báo "Tháng X đã chốt, cần mở khóa tháng trước" và chặn xác nhận. |
| ③ | Cảnh báo | Với hệ số tuổi: nếu ngừng làm **hở khoảng tuổi** (có xe không còn hệ số) thì chặn cho tới khi có nhóm thay thế cùng ngày hiệu lực. Với hệ số khai trường: xe khai trường sẽ tính hệ số 1,00 từ ngày ngừng, hệ thống báo số xe bị ảnh hưởng. |

### 🖥️ Màn hình 6 — Thêm/sửa xe (phần Định mức nhiên liệu)
**Ai dùng:** Quản lý xe · **Dùng để:** khai báo nhiên liệu của xe và xem định mức đang áp dụng.

🖼️ *[Figma — nhóm A, popup "Thêm/sửa xe", khối "Định mức nhiên liệu" cuối form]*

| # | Khu vực | Diễn giải |
|---|---|---|
| ① | Loại xe | Chọn từ danh mục loại xe; loại xe quyết định định mức gốc. |
| ② | Loại nhiên liệu, Dung tích thùng | Chọn Xăng hoặc Dầu và nhập dung tích thùng (lít). Loại nhiên liệu dùng để gom Tổng xăng/Tổng dầu ở báo cáo. |
| ③ | Ô "Xe phục vụ khai trường" | Tích chọn nếu xe thuộc diện hưởng hệ số khai trường. |
| ④ | Định mức đang áp dụng (tự tính) | Chỉ xem, hiển thị kết quả và diễn giải, ví dụ: 18,7 = 17,0 (loại xe) × 1,10 (nhóm C) × 1,00 (khai trường). Kèm liên kết "Xem lịch sử định mức". |

### Luồng chuyển giữa các màn hình

🖼️ *[Sơ đồ: Danh mục loại xe → (Thêm mới / Sửa) → Form loại xe · Danh mục loại xe → (Hệ số) → Cấu hình hệ số → (Thêm / Sửa) → Form hệ số · Cấu hình hệ số → (Ngừng hoạt động) → Màn ngừng hoạt động · Cấu hình hệ số → (Kích hoạt lại) → Hộp xác nhận]*

### Ví dụ tình huống thực tế

> **Tình huống 1 — Tập đoàn đổi định mức Prado.** Anh Hùng (quản trị danh mục) nhận văn bản mới: Prado 2.7 tăng từ 17,0 lên 17,5 từ 01/11/2026. Anh mở màn *Danh mục loại xe*, bấm Sửa dòng Prado 2.7, nhập 17,5, chọn hiệu lực 01/11/2026, đính kèm file quyết định và Lưu. Hệ thống ghi mức mới, giữ mức 17,0 trong lịch sử. Báo cáo tháng 10 vẫn tính 17,0; từ tháng 11 tính 17,5. Nhật ký ghi "Đổi định mức Prado 2.7: 17,0 sang 17,5".
>
> **Tình huống 2 — Ngừng một nhóm tuổi.** Quy định mới bỏ nhóm B. Anh Hùng bấm biểu tượng Ngừng hoạt động ở dòng nhóm B, chọn ngày 31/12/2026. Hệ thống cảnh báo xe tuổi 8–14 năm sẽ không còn hệ số và chặn xác nhận. Anh thêm nhóm thay thế có hiệu lực cùng ngày rồi mới ngừng được nhóm B.

---

## 5. Yêu cầu chức năng chi tiết

### Module: Định mức loại xe

#### UR01 — Quản lý danh mục loại xe và định mức gốc

Quản trị danh mục cần xem được toàn bộ loại xe cùng định mức gốc (lít/100km) và ngày hiệu lực, đồng thời thêm, sửa, xóa loại xe, để mọi xe trong đơn vị cùng dùng một nguồn định mức thống nhất theo văn bản Tập đoàn. Loại xe chưa có định mức cần được cảnh báo rõ để không bị bỏ sót khi tính tiêu hao.

- **Lưu ý đặc biệt:** Tên loại xe không được trùng. Loại xe chỉ xóa được khi chưa có xe nào thuộc loại đó **[Giả thiết]**. Xe thuộc loại chưa có định mức sẽ hiện "Chưa có định mức" ở báo cáo, không tính tiêu hao.
- **Màn hình liên quan:** Màn 1, Màn 2
- **Mức độ ưu tiên:** Cao

#### UR02 — Đổi định mức theo ngày hiệu lực, giữ lịch sử

Khi Tập đoàn ban hành mức mới, quản trị danh mục cần nhập mức mới kèm ngày bắt đầu áp dụng mà không làm mất mức cũ, để báo cáo từng tháng luôn dùng đúng mức có hiệu lực tại thời điểm đó và có thể truy lại về sau.

- **Lưu ý đặc biệt:** Ví dụ Prado 2.7 từ 17,0 lên 17,5 hiệu lực 01/11/2026: tháng 10 vẫn tính 17,0, từ tháng 11 tính 17,5. Mỗi lần đổi đều ghi nhật ký.
- **Màn hình liên quan:** Màn 2
- **Mức độ ưu tiên:** Cao

#### UR03 — Đính kèm văn bản căn cứ

Người cập nhật cần đính kèm quyết định/văn bản quy định cho từng mức định mức và từng hệ số, để khi kiểm tra có thể mở lại đúng văn bản làm căn cứ.

- **Lưu ý đặc biệt:** Tệp chọn bằng nút **Tải tệp lên**, không hỗ trợ kéo thả. Hệ thống hiện tên tệp, dung lượng và nút xóa. Định dạng và dung lượng tối đa chờ chốt **[Giả thiết: PDF/Word]**.
- **Màn hình liên quan:** Màn 2, Màn 4
- **Mức độ ưu tiên:** Trung bình

### Module: Hệ số điều chỉnh

#### UR04 — Cấu hình hệ số theo tuổi xe

Quản trị danh mục cần cấu hình các nhóm tuổi xe và hệ số tương ứng (hiện: đến 7 năm 1,00; trên 7 đến 14 năm 1,05; trên 14 năm 1,10), nhằm tự động tăng định mức cho xe cũ hơn mà không phải tính tay.

- **Lưu ý đặc biệt:** Các nhóm tuổi phải liền nhau, không chồng lấn, không để hở. Tuổi xe tính từ **Ngày sử dụng** của xe **[Giả thiết — chờ chốt Q4]**. Hệ số mới chỉ áp từ ngày hiệu lực, không áp ngược vào tháng đã chốt.
- **Màn hình liên quan:** Màn 3, Màn 4
- **Mức độ ưu tiên:** Cao

#### UR05 — Cấu hình hệ số xe phục vụ khai trường

Quản trị danh mục cần cấu hình hệ số 1,05 cho xe phục vụ Trung tâm Điều hành sản xuất tại Quảng Ninh, vận hành thường xuyên trên đường khai trường, vì các xe này tiêu hao nhiều hơn bình thường.

- **Lưu ý đặc biệt:** Hệ số này nhân **thêm** ngoài hệ số tuổi. Tại một thời điểm chỉ có một hệ số khai trường hoạt động; thêm hệ số mới thì bản cũ tự ngừng, kết thúc trước ngày hiệu lực mới 1 ngày **[Giả thiết]**.
- **Màn hình liên quan:** Màn 3, Màn 4
- **Mức độ ưu tiên:** Cao

#### UR06 — Ngừng hoạt động và kích hoạt lại hệ số

Khi quy định thay đổi, quản trị danh mục cần ngừng áp dụng một hệ số (kèm lý do) và có thể kích hoạt lại khi cần, thay vì xóa mất, để vẫn đối chiếu được các tháng đã chốt.

- **Lưu ý đặc biệt:** Không cho ngừng nếu làm hở khoảng tuổi cho tới khi có nhóm thay thế cùng ngày. Nếu ngày ngừng rơi vào tháng đã chốt, phải mở khóa tháng trước. Kích hoạt lại chỉ được khi khoảng tuổi không chồng lấn với nhóm đang hoạt động; nếu chồng, hệ thống báo "Khoảng tuổi chồng lấn với nhóm X" **[Giả thiết]**.
- **Màn hình liên quan:** Màn 3, Màn 5
- **Mức độ ưu tiên:** Cao

### Module: Khai báo xe và định mức giao khoán

#### UR07 — Khai báo nhiên liệu cho từng xe

Quản lý xe cần chọn loại xe, loại nhiên liệu (Xăng/Dầu), dung tích thùng và đánh dấu "Xe phục vụ khai trường" khi thêm hoặc sửa xe, để hệ thống biết áp định mức và hệ số nào cho xe đó, đồng thời gom đúng Tổng xăng/Tổng dầu ở báo cáo.

- **Lưu ý đặc biệt:** Dung tích thùng là giới hạn cho tồn đầu/tồn cuối và mỗi hóa đơn mua ngoài (Phiên 2). Xe chưa khai báo loại nhiên liệu sẽ không nằm trong tổng xăng, tổng dầu.
- **Màn hình liên quan:** Màn 6
- **Mức độ ưu tiên:** Cao

#### UR08 — Tự tính và hiển thị định mức giao khoán của xe

Quản lý xe cần thấy ngay định mức giao khoán đang áp dụng cho xe (lít/100km) cùng cách tính, và xem lại lịch sử các mốc định mức đã áp dụng, để biết xe được giao khoán bao nhiêu mà không phải tự nhân hệ số.

- **Lưu ý đặc biệt:** Định mức giao khoán = định mức loại xe × hệ số tuổi × hệ số khai trường. Ví dụ Prado 2.7, trên 14 năm, không khai trường: 17,0 × 1,10 × 1,00 = **18,7**. Không nhập tay. Nội dung màn "Xem lịch sử định mức" của xe chưa thiết kế riêng **[Giả thiết]**. Xe đổi nhóm tuổi giữa tháng thì tính thế nào: chờ chốt Q5.
- **Màn hình liên quan:** Màn 6, Màn 3 (công thức)
- **Mức độ ưu tiên:** Cao

> Lưu ý phân quyền áp dụng cho UR01–UR06: chỉ người có quyền quản trị loại xe và hệ số mới thấy nút Thêm/Sửa/Ngừng/Kích hoạt lại; người khác chỉ xem. Mọi thao tác thêm, sửa, ngừng, kích hoạt đều ghi nhật ký (người, thời điểm, giá trị cũ/mới).

---

## 6. Ngoài phạm vi (phiên này)

- Nhập phiếu lĩnh, tồn đầu/cuối, chốt tháng, mở khóa tháng, nhật ký lĩnh/tồn → **Phiên 2**.
- Báo cáo quyết toán, báo cáo lĩnh–sử dụng–tồn, chi tiết theo xe, xuất 3 biểu mẫu in → **Phiên 3**.
- Không quản lý kho phiếu lĩnh; không ký số trên biểu mẫu (in ký tay).
- Không tự động nhập văn bản của Tập đoàn từ file: văn bản chỉ đính kèm để tra cứu, con số do người dùng nhập.

---

## 7. Tiêu chí nghiệm thu

| # | Tiêu chí |
|---|---|
| 1 | **Khi** xem danh mục loại xe, **thì** hệ thống hiện đủ 6 loại và định mức gốc theo quy định (Camry 15,0; Fortuner 16,0; Prado 17,0; Hilux 17,0; Pajero 17,1; Solati 17,5). |
| 2 | **Khi** đổi định mức một loại xe với ngày hiệu lực mới, **thì** mức cũ vẫn xem được trong lịch sử và tháng trước ngày hiệu lực vẫn tính theo mức cũ. |
| 3 | **Khi** thêm nhóm tuổi có khoảng chồng lấn hoặc để hở với nhóm đang hoạt động, **thì** hệ thống báo lỗi và không lưu. |
| 4 | **Khi** ngừng hoạt động một hệ số làm hở khoảng tuổi, **thì** hệ thống cảnh báo và chặn cho tới khi có nhóm thay thế cùng ngày. |
| 5 | **Khi** ngày hiệu lực/ngày ngừng rơi vào tháng đã chốt, **thì** hệ thống chặn và yêu cầu mở khóa tháng trước. |
| 6 | **Khi** khai báo xe Prado 2.7 thuộc nhóm trên 14 năm, không khai trường, **thì** định mức giao khoán hiển thị 18,7 lít/100km kèm diễn giải. |
| 7 | **Khi** người dùng không có quyền quản trị, **thì** không thấy nút Thêm/Sửa/Ngừng/Kích hoạt lại ở danh mục loại xe và hệ số. |
| 8 | **Khi** thêm, sửa, ngừng, kích hoạt lại bất kỳ định mức/hệ số nào, **thì** nhật ký ghi người, thời điểm, giá trị cũ và mới. |

---

## 8. Xác nhận chốt nghiệp vụ

| Đại diện | Họ tên | Chữ ký | Ngày |
|---|---|---|---|
| Khách hàng | | | |
| VNPT-IT (BA/PO) | | | |

---

## PHỤ LỤC

### A. Thuật ngữ
- **Định mức gốc:** mức tiêu hao theo loại xe do Tập đoàn quy định (lít/100km), chưa nhân hệ số.
- **Định mức giao khoán:** định mức gốc × hệ số tuổi xe × hệ số xe khai trường; là mức dùng để tính tiêu hao cho từng xe.
- **Hệ số tuổi xe:** hệ số tăng định mức theo nhóm tuổi xe (A, B, C).
- **Xe phục vụ khai trường:** xe bố trí phục vụ Trung tâm Điều hành sản xuất tại Quảng Ninh, thường xuyên chạy đường khai trường.
- **Chốt tháng:** khóa số liệu tháng, sau đó không sửa được nếu chưa mở khóa (Phiên 2).

### B. Câu hỏi mở cần chốt trong buổi họp
| # | Câu hỏi | Hiện đang giả định |
|---|---|---|
| Q4 | Tuổi xe tính từ ngày sử dụng, năm sản xuất hay ngày đăng ký lần đầu? | Ngày sử dụng **[Giả thiết]** |
| Q5 | Xe đổi nhóm tuổi (A→B, B→C) giữa tháng: tách dòng theo chuyến hay lấy định mức bình quân gia quyền? | Chưa có |
| Q6 | Đơn vị nào ngoài Đội xe văn phòng dùng chung biểu mẫu? Tiêu đề biểu lấy theo Đơn vị quản lý? | Chưa có (ảnh hưởng Phiên 3) |
| — | Định dạng và dung lượng tối đa của tệp văn bản căn cứ | PDF/Word **[Giả thiết]** |
| — | Quy tắc xóa loại xe khi đã có xe thuộc loại đó | Chặn xóa **[Giả thiết]** |

### C. Điều đã chốt với khách hàng (ghi chú review 14/10/2026)
- Số phiếu lĩnh chỉ nhập số và kiểm trùng toàn hệ thống (Phiên 2).
- Mua ngoài vượt hạn mức chỉ cảnh báo, vẫn lưu được, ghi nhật ký (Phiên 2).
- Ba biểu mẫu in ký tay, không ký số (Phiên 3).
- Danh mục loại xe đã bổ sung Hilux 3.0 (17,0) và Pajero 3.0 (17,1); ô "Xe phục vụ khai trường" là ô tích chọn.
