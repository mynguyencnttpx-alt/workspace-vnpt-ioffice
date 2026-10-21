# TÀI LIỆU YÊU CẦU NGƯỜI DÙNG (URD)
## Quản lý nhiên liệu tiêu hao — Phiên 3/3: Báo cáo và biểu mẫu in

| Thông tin | Nội dung |
|---|---|
| Khách hàng | Tập đoàn CN Than - Khoáng sản Việt Nam (Đội xe văn phòng) |
| Phiên bản | v1.0 |
| Ngày | 21/10/2026 |
| Người soạn | mynguyen.cntt.px (BA VNPT-IT) |
| Trạng thái | Dự thảo — chờ chốt |
| Phiên chốt | Phiên 3/3 — Báo cáo và biểu mẫu in *(Phiên 1: Định mức và hệ số; Phiên 2: Nhập lĩnh/tồn và chốt tháng)* |

> **Ghi chú cho người đọc:** Tài liệu này mô tả **hệ thống cho xem và in những báo cáo nào** và **giao diện thể hiện ở mức tổng quan**, để quý khách hàng rà soát và xác nhận trước khi xây dựng chi tiết. Tài liệu không đi vào chi tiết kỹ thuật; các nội dung đó sẽ được đặc tả riêng ở giai đoạn sau (SRS).
>
> **⚠️ Lưu ý khi gửi bản chính thức:** thay các vị trí 🖼️ bằng **ảnh xuất từ Figma** (file `ioffice_v5`, section "Nhiên liệu · Quản lý tiêu hao và biểu mẫu đơn vị", nhóm **C · Báo cáo và xuất mẫu**).

---

## TÓM TẮT NHANH (đọc trong 3 phút)

| Mục | Nội dung |
|---|---|
| **Vấn đề đang gặp** | Cuối tháng phải lập tay 3 biểu mẫu của Tập đoàn (tổng hợp lĩnh–sử dụng–tồn, theo dõi lĩnh từng xe, quyết toán tiêu hao) từ nhiều sổ rời; mất thời gian và dễ lệch số giữa các biểu. |
| **Mục tiêu hệ thống mới** | Số liệu từ sổ lĩnh và định mức (Phiên 1, 2) tự tổng hợp thành báo cáo trên màn hình và xuất đúng khuôn 3 biểu mẫu giấy (PDF/Excel), số khớp nhau giữa các biểu. |
| **Phạm vi phiên này** | Báo cáo quyết toán tiêu hao · Báo cáo lĩnh–sử dụng–tồn · Chi tiết tiêu hao theo xe · Xuất 3 biểu mẫu (mẫu 2, 3, 4) |
| **Số màn hình chính** | 6 màn hình |
| **Số yêu cầu cần chốt** | 8 yêu cầu (UR17–UR24, đánh số tiếp sau Phiên 2) |
| **Đối tượng sử dụng** | Quản lý xe/Đội trưởng, Lãnh đạo đơn vị, Kế toán/người lập quyết toán, Lái xe (xem sổ xe mình) |

🖼️ *[Chèn ảnh màn "Báo cáo quyết toán tiêu hao" — báo cáo được dùng nhiều nhất]*

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
> Đơn vị lập ba biểu theo mẫu của Tập đoàn: (2) Biểu tổng hợp lĩnh, sử dụng, tồn nhiên liệu từng xe; (3) Theo dõi lĩnh nhiên liệu của từng xe; (4) Biểu tổng hợp quyết toán tiêu hao nhiên liệu từng xe. Ba biểu liên quan chặt (số "Sử dụng" ở biểu 2 kết chuyển sang cột "Thực tế" của biểu 4), nhưng đang lập riêng nên dễ lệch số và khó tra ngược khi một xe vượt định mức.

**Mục tiêu khi có hệ thống mới**
> - Một nguồn số liệu duy nhất: báo cáo tự tổng hợp từ sổ lĩnh của từng xe và định mức giao khoán.
> - Xem trên màn hình theo tháng, đơn vị, xe; bấm vào số để xem chi tiết xe.
> - Xuất đúng khuôn 3 biểu giấy (PDF để in ký tay, Excel khi cần chỉnh) mà không phải dựng lại.
> - Nhìn thấy ngay xe nào vượt định mức hoặc còn là số ước tính.

**Phạm vi phiên chốt này**
> - Báo cáo quyết toán tiêu hao theo tháng
> - Báo cáo lĩnh, sử dụng, tồn theo tháng
> - Chi tiết tiêu hao từng xe theo tháng/năm/vòng đời
> - Xuất mẫu 2, mẫu 3, mẫu 4 (PDF theo đúng khuôn, Excel)

---

## 2. Đối tượng sử dụng

### 👤 Quản lý xe / Đội trưởng
- **Là ai:** Người quản lý đội xe, ví dụ chị Lan (ql.xe01).
- **Công việc liên quan hệ thống:** xem báo cáo cuối tháng, đối chiếu xe nào vượt định mức, in biểu để ký.
- **Điều cần hệ thống hỗ trợ:** số khớp giữa ba biểu, biết xe nào còn số ước tính, xuất nhanh đúng mẫu.

### 👤 Lãnh đạo đơn vị / Kế toán quyết toán
- **Là ai:** Người ký biểu và dùng số liệu để quyết toán chi phí nhiên liệu.
- **Công việc liên quan hệ thống:** xem tổng xăng, tổng dầu, chênh lệch tăng/giảm so với định mức.
- **Điều cần hệ thống hỗ trợ:** biểu in đúng mẫu Tập đoàn, đúng tiêu đề đơn vị, có khối chữ ký.

### 👤 Lái xe
- **Là ai:** Lái xe phụ trách xe, ví dụ anh An (30M-51470).
- **Công việc liên quan hệ thống:** xuất biểu "Theo dõi lĩnh nhiên liệu" của xe mình để ký.
- **Điều cần hệ thống hỗ trợ:** biểu của xe mình in đúng khuôn, có chỗ ký "Lái xe".

---

## 3. Luồng nghiệp vụ tổng quan

🖼️ *[Chèn sơ đồ khối: Sổ lĩnh từng xe (Phiên 2) → Báo cáo lĩnh–sử dụng–tồn → (kết chuyển cột Sử dụng) → Báo cáo quyết toán tiêu hao → Chi tiết theo xe · Xuất mẫu 2 / mẫu 3 / mẫu 4 → In, ký tay]*

**Diễn giải luồng bằng lời:**
1. **Tổng hợp lĩnh–sử dụng–tồn** — Hệ thống cộng sổ lĩnh của từng xe thành bảng: thùng, tồn đầu, lĩnh tại cây xăng, mua ngoài, tổng lĩnh, sử dụng, tồn cuối; kèm Tổng xăng, Tổng dầu, Tổng cộng.
2. **Quyết toán tiêu hao** — Với mỗi xe: km hoạt động trong tháng × định mức giao khoán / 100 ra tiêu hao theo định mức; so với tiêu hao thực tế (chính là cột Sử dụng ở bước 1) ra **Tăng (+)/Giảm (−)**.
3. **Xem chi tiết** — Từ báo cáo quyết toán bấm biển số để xem từng tháng của xe đó; từ báo cáo lĩnh–sử dụng–tồn bấm số lĩnh để vào sổ lĩnh của xe (Phiên 2).
4. **Xuất biểu** — Xuất PDF theo đúng khuôn mẫu 2, 3, 4 để in ký tay, hoặc Excel. Nếu vượt định mức, biểu hiện dấu (!) để người ký chú ý.

---

## 4. Màn hình & thao tác

### 🖥️ Màn hình 1 — Báo cáo quyết toán tiêu hao
**Ai dùng:** Quản lý xe, Lãnh đạo, Kế toán · **Dùng để:** so sánh tiêu hao thực tế với định mức của từng xe.

🖼️ *[Figma — nhóm C, màn "Báo cáo quyết toán tiêu hao"]*

| # | Khu vực | Diễn giải |
|---|---|---|
| ① | Hai tab **Quyết toán tiêu hao** / **Lĩnh, sử dụng, tồn** | Chuyển giữa hai báo cáo cùng bộ lọc. |
| ② | Bộ lọc **Kỳ, Tháng, Đơn vị, Xe** + nút **Xem** | Kỳ mặc định là Tháng. Đơn vị quản lý quyết định tiêu đề biểu khi xuất. |
| ③ | Nút **Xuất** (menu) | Excel hoặc PDF theo đúng biểu mẫu 4 "Biểu tổng hợp quyết toán tiêu hao nhiên liệu từng xe ô tô". |
| ④ | Bảng quyết toán | Mỗi xe một dòng: biển số (bấm vào xem chi tiết), **lái xe phụ trách**, km tháng, định mức giao khoán (lít/100km), tiêu hao theo định mức, tiêu hao thực tế, tăng/giảm; dòng Tổng cuối bảng. Xe chưa có định mức hiện "Chưa có định mức"; xe chưa gán lái xe hiện "Chưa gán lái xe" (màu cam). |

### 🖥️ Màn hình 2 — Báo cáo lĩnh, sử dụng, tồn
**Ai dùng:** Quản lý xe, Lãnh đạo · **Dùng để:** xem tổng lĩnh và tồn nhiên liệu của cả đội xe trong tháng.

🖼️ *[Figma — nhóm C, màn "Báo cáo lĩnh, sử dụng, tồn"]*

| # | Khu vực | Diễn giải |
|---|---|---|
| ① | Tab và bộ lọc | Như Màn hình 1. |
| ② | Nút **Xem**, **Xuất** | Xuất PDF theo đúng biểu mẫu 2 "Biểu tổng hợp lĩnh, sử dụng, tồn nhiên liệu từng xe ô tô" hoặc Excel. |
| ③ | Bảng lĩnh–sử dụng–tồn | Mỗi xe: biển số, lái xe phụ trách, thùng, tồn đầu, **lĩnh tại cây xăng** (bấm vào số để mở sổ lĩnh của xe), mua ngoài, tổng lĩnh, sử dụng, tồn cuối, ghi chú; có Tổng xăng, Tổng dầu, Tổng cộng. Dòng nào còn là số ước tính (lái xe chưa cập nhật) có dấu **\*** màu cam, chú thích cuối trang. Báo cáo chỉ xem, không có ô nhập. |

### 🖥️ Màn hình 3 — Chi tiết tiêu hao theo xe
**Ai dùng:** Quản lý xe · **Dùng để:** theo dõi từng tháng của một xe để tìm tháng bị vượt.

🖼️ *[Figma — nhóm C, màn "Chi tiết tiêu hao theo xe" (ví dụ xe 30E-930.37)]*

| # | Khu vực | Diễn giải |
|---|---|---|
| ① | Đầu trang xe | Biển số, loại xe, loại nhiên liệu, dung tích thùng, công thức định mức giao khoán (17,0 × 1,10 × 1,00 = 18,7). |
| ② | Bộ lọc **Kỳ** + nút **Xuất** | Mặc định Năm hiện tại; có kỳ **Vòng đời** (từ chuyến đầu tiên có km). Xuất Excel. |
| ③ | Bảng theo tháng | Mỗi tháng: km, định mức, theo định mức, thực tế, tăng/giảm; dấu (!) khi vượt. Tháng chưa chốt có số lý thuyết, cột Thực tế để trống; dòng Tổng chỉ cộng các tháng đã chốt. |

### 🖥️ Màn hình 4 — Xuất mẫu 2: Lĩnh, sử dụng, tồn
**Ai dùng:** Quản lý xe, Lãnh đạo · **Dùng để:** in biểu tổng hợp lĩnh–sử dụng–tồn của cả đội.

🖼️ *[Figma — nhóm C, bản xem trước "Xuất mẫu 2"]*

| # | Khu vực | Diễn giải |
|---|---|---|
| ① | Tiêu đề và bảng 10 cột | Tiêu đề hai dòng: "Tập đoàn CN Than - Khoáng sản Việt Nam" và tên đơn vị quản lý. Cột: STT, Số xe, Dung tích thùng, Tồn đầu tháng, Lĩnh trong tháng (Tổng = cây xăng + mua ngoài), Sử dụng, Tồn cuối, Ghi chú; có hàng đánh số cột và công thức. Dòng Tổng xăng, Tổng dầu, Tổng cộng. |
| ② | Ghi chú và chữ ký | 3 ghi chú theo biểu giấy; khối chữ ký "ĐỘI XE VĂN PHÒNG". |

### 🖥️ Màn hình 5 — Xuất mẫu 3: Theo dõi lĩnh nhiên liệu
**Ai dùng:** Lái xe, Quản lý xe · **Dùng để:** in sổ lĩnh của từng xe.

🖼️ *[Figma — nhóm C, bản xem trước "Xuất mẫu 3"]*

| # | Khu vực | Diễn giải |
|---|---|---|
| ① | Bảng theo dõi lĩnh | STT, Ngày tháng (dạng 03-Thg8, chỉ ghi ở dòng đầu của ngày), Số hiệu chứng từ (phiếu lĩnh, hóa đơn), Số lượng lĩnh theo lít (tổng, phiếu, hóa đơn), Ghi chú. Bảng có dòng trống đến STT 18 như biểu giấy và dòng Cộng. |
| ② | Thông tin xe và chữ ký | Tên, chủng loại xe/Biển kiểm soát, loại nhiên liệu sử dụng; chữ ký "ĐỘI XE VĂN PHÒNG" và "LÁI XE". |

### 🖥️ Màn hình 6 — Xuất mẫu 4: Quyết toán tiêu hao
**Ai dùng:** Quản lý xe, Lãnh đạo, Kế toán · **Dùng để:** in biểu quyết toán tiêu hao.

🖼️ *[Figma — nhóm C, bản xem trước "Xuất mẫu 4"]*

| # | Khu vực | Diễn giải |
|---|---|---|
| ① | Bảng quyết toán 7 cột | STT, Số xe, Số km hoạt động trong tháng, Định mức giao khoán (lít/100km), Tiêu hao theo định mức (5 = 3 × 4), Tiêu hao thực tế (6), Tăng (+)/Giảm (−) (7 = 6 − 5); có hàng đánh số cột và công thức. |
| ② | Chữ ký | Khối "ĐỘI XE VĂN PHÒNG"; tiêu đề lấy theo đơn vị quản lý. |

> Cả 3 biểu mẫu **in ký tay, không ký số**. Cột "Lái xe phụ trách" chỉ có trên màn hình để tra cứu/lọc, **không in** ra mẫu 4 vì mẫu giấy không có cột này.

### Luồng chuyển giữa các màn hình

🖼️ *[Sơ đồ: Báo cáo quyết toán ↔ (tab) ↔ Báo cáo lĩnh–sử dụng–tồn · Báo cáo quyết toán → (bấm biển số) → Chi tiết theo xe · Báo cáo lĩnh–sử dụng–tồn → (bấm số lĩnh) → Sổ lĩnh của xe (Phiên 2) · Mỗi báo cáo → (Xuất) → Mẫu 2 / Mẫu 4 · Sổ lĩnh của xe → (Xuất) → Mẫu 3]*

### Ví dụ tình huống thực tế

> **Tình huống:** Sau khi chốt tháng 08/2026, chị Lan mở **Báo cáo lĩnh, sử dụng, tồn**, chọn tháng 08/2026, đơn vị Đội xe văn phòng, bấm Xem. Tổng xăng hiện lĩnh 2.985 lít, sử dụng 2.961 lít, tồn cuối 283 lít. Chị thấy xe 29B-519-65 có dấu * cam, nghĩa là lái xe chưa cập nhật tồn; chị bấm số lĩnh của xe để vào sổ, nhắc lái xe cập nhật.
> Chị chuyển sang tab **Quyết toán tiêu hao**: xe 30E-930.37 chạy 1.615 km × 18,7 / 100 ≈ 302 lít theo định mức, thực tế 302, không chênh. Xe 29X-9999 hiện "Chưa có định mức" nên không tính. Chị bấm biển số 30E-930.37 để xem từng tháng của xe, thấy tháng 05 vượt +6 lít có dấu (!). Cuối cùng chị bấm **Xuất → PDF** cho mẫu 2 và mẫu 4, in và trình lãnh đạo ký tay.

---

## 5. Yêu cầu chức năng chi tiết

> Đánh số tiếp theo Phiên 2 (UR09–UR16).

### Module: Báo cáo lĩnh, sử dụng, tồn

#### UR17 — Báo cáo lĩnh, sử dụng, tồn theo tháng

Quản lý và lãnh đạo cần xem bảng tổng hợp lĩnh, sử dụng, tồn của từng xe theo tháng và đơn vị, kèm Tổng xăng, Tổng dầu, Tổng cộng, để nắm tình hình nhiên liệu cả đội mà không phải cộng tay từng sổ xe.

- **Lưu ý đặc biệt:** Sử dụng = tồn đầu + lĩnh tại cây xăng + mua ngoài − tồn cuối. Tháng chưa chốt hiện số đang nhập kèm nhãn "Chưa chốt"; tháng đã chốt số cố định. Xe chưa khai báo loại nhiên liệu không nằm trong Tổng xăng/Tổng dầu. Báo cáo chỉ xem, mọi số do hệ thống tổng hợp từ sổ xe.
- **Màn hình liên quan:** Màn 2
- **Mức độ ưu tiên:** Cao

#### UR18 — Nhận biết số ước tính và đi tới sổ xe

Quản lý cần thấy ngay dòng nào còn là số ước tính (lái xe chưa cập nhật tồn) và bấm vào số lĩnh để vào sổ của xe đó, để nhắc lái xe cập nhật trước khi chốt tháng.

- **Lưu ý đặc biệt:** Dòng ước tính có dấu * màu cam sau số và chú thích cuối trang. Xe chưa có số lĩnh (hiện "-") vẫn bấm được để vào sổ nhập phiếu.
- **Màn hình liên quan:** Màn 2
- **Mức độ ưu tiên:** Trung bình

### Module: Báo cáo quyết toán

#### UR19 — Báo cáo quyết toán tiêu hao theo định mức

Quản lý, lãnh đạo và kế toán cần so sánh tiêu hao thực tế với tiêu hao theo định mức của từng xe và thấy xe nào tăng hoặc giảm, để quyết toán chi phí nhiên liệu đúng quy định.

- **Lưu ý đặc biệt:** Tiêu hao theo định mức = km hoạt động trong tháng × định mức giao khoán / 100, làm tròn lít. Tiêu hao thực tế = số Sử dụng ở báo cáo lĩnh–sử dụng–tồn. Tăng/Giảm = thực tế − theo định mức; hiện (!) khi vượt. Km tính từ các chuyến đã xác nhận đi về **[Giả thiết — nguồn km chờ chốt]**. Xe chưa có định mức hiện "Chưa có định mức" và không tính tiêu hao. Tháng chưa chốt: cột Thực tế để trống, không tính Tăng/Giảm.
- **Màn hình liên quan:** Màn 1
- **Mức độ ưu tiên:** Cao

#### UR20 — Hiển thị lái xe phụ trách trên báo cáo

Quản lý cần thấy lái xe đang phụ trách từng xe ngay trên hai báo cáo, để biết hỏi ai khi số liệu bất thường.

- **Lưu ý đặc biệt:** Lấy từ lái xe biên chế gán cho xe trong danh mục xe **[Giả thiết]**; xe chưa gán hiện "Chưa gán lái xe" màu cam. Cột này chỉ để tra cứu/lọc, **không in** ra mẫu 4.
- **Màn hình liên quan:** Màn 1, Màn 2
- **Mức độ ưu tiên:** Trung bình

#### UR21 — Chi tiết tiêu hao theo xe

Quản lý cần xem tiêu hao của một xe theo từng tháng trong năm (hoặc cả vòng đời), để tìm tháng bị vượt định mức và đánh giá xe hoạt động bất thường.

- **Lưu ý đặc biệt:** Tháng chưa chốt có số lý thuyết, cột Thực tế để trống; dòng Tổng chỉ cộng các tháng đã chốt. Kỳ Vòng đời tính từ chuyến đầu tiên có km trong hệ thống. Chi tiết mở từ biển số ở báo cáo quyết toán.
- **Màn hình liên quan:** Màn 3
- **Mức độ ưu tiên:** Trung bình

### Module: Xuất biểu mẫu

#### UR22 — Xuất mẫu 2 "Lĩnh, sử dụng, tồn"

Quản lý cần xuất báo cáo lĩnh–sử dụng–tồn đúng khuôn biểu giấy của Tập đoàn (PDF để in, Excel để chỉnh), để dùng thay biểu lập tay hiện nay.

- **Lưu ý đặc biệt:** Đủ 10 cột, hàng đánh số cột và công thức, dòng Tổng xăng/dầu/cộng, 3 ghi chú, khối chữ ký "ĐỘI XE VĂN PHÒNG". Tiêu đề hai dòng, dòng hai lấy theo đơn vị quản lý **[chờ chốt Q6]**. In ký tay, không ký số.
- **Màn hình liên quan:** Màn 2, Màn 4
- **Mức độ ưu tiên:** Cao

#### UR23 — Xuất mẫu 3 "Theo dõi lĩnh nhiên liệu" của từng xe

Lái xe và quản lý cần xuất sổ lĩnh của một xe trong tháng đúng khuôn biểu giấy, để lái xe và đội xe ký xác nhận.

- **Lưu ý đặc biệt:** Ngày chỉ ghi ở dòng đầu của ngày, dạng 03-Thg8; bảng có dòng trống đến STT 18 như biểu giấy; dòng Cộng cuối bảng. Tên/chủng loại xe, biển kiểm soát và loại nhiên liệu lấy từ khai báo xe. Chữ ký "ĐỘI XE VĂN PHÒNG" và "LÁI XE".
- **Màn hình liên quan:** Sổ lĩnh (Phiên 2, Màn 1), Màn 5
- **Mức độ ưu tiên:** Cao

#### UR24 — Xuất mẫu 4 "Quyết toán tiêu hao"

Kế toán và quản lý cần xuất báo cáo quyết toán đúng khuôn biểu giấy 7 cột, để trình ký và quyết toán chi phí.

- **Lưu ý đặc biệt:** Cột 5 = 3 × 4 và cột 7 = 6 − 5 ghi rõ trên hàng công thức. Không có cột lái xe phụ trách. Tiêu đề theo đơn vị quản lý **[chờ chốt Q6]**. In ký tay, không ký số.
- **Màn hình liên quan:** Màn 1, Màn 6
- **Mức độ ưu tiên:** Cao

---

## 6. Ngoài phạm vi (phiên này)

- Ký số trên bất kỳ biểu mẫu nào (cả 3 biểu in ký tay).
- Biểu mẫu khác ngoài mẫu 2, 3, 4 hoặc đổi khuôn biểu của Tập đoàn.
- Tự động gửi báo cáo qua email hoặc nộp lên hệ thống của Tập đoàn.
- Báo cáo nhiều tháng gộp trên cùng một biểu (ngoài màn Chi tiết theo xe).
- Phân tích biểu đồ/dashboard tiêu hao.

---

## 7. Tiêu chí nghiệm thu

| # | Tiêu chí |
|---|---|
| 1 | **Khi** chọn tháng và đơn vị, **thì** báo cáo lĩnh–sử dụng–tồn liệt kê đủ các xe của đơn vị kèm Tổng xăng, Tổng dầu, Tổng cộng. |
| 2 | **Khi** số liệu một xe là ước tính (lái xe chưa cập nhật), **thì** dòng đó có dấu * cam và có chú thích cuối trang. |
| 3 | **Khi** bấm số "Lĩnh tại cây xăng" của một xe, **thì** hệ thống mở sổ lĩnh của đúng xe và tháng đó. |
| 4 | **Khi** xem báo cáo quyết toán, **thì** cột "Thực tế" của mỗi xe bằng cột "Sử dụng" của xe đó ở báo cáo lĩnh–sử dụng–tồn. |
| 5 | **Khi** thực tế lớn hơn theo định mức, **thì** cột Tăng/Giảm là số dương và hiện dấu (!). |
| 6 | **Khi** xe chưa có định mức, **thì** báo cáo hiện "Chưa có định mức" và không tính tiêu hao. |
| 7 | **Khi** tháng chưa chốt, **thì** cột Thực tế để trống và không tính Tăng/Giảm ở báo cáo quyết toán. |
| 8 | **Khi** bấm biển số ở báo cáo quyết toán, **thì** mở màn Chi tiết theo xe; dòng Tổng chỉ cộng các tháng đã chốt. |
| 9 | **Khi** xuất PDF mẫu 2, 3, 4, **thì** biểu có đúng các cột, hàng đánh số cột và công thức, ghi chú và khối chữ ký như biểu giấy. |
| 10 | **Khi** xuất mẫu 4, **thì** không có cột "Lái xe phụ trách". |
| 11 | **Khi** xuất cho đơn vị quản lý khác, **thì** dòng tiêu đề thứ hai đổi theo tên đơn vị đó. |
| 12 | **Khi** số liệu ở ba biểu cùng tháng và cùng đơn vị, **thì** tổng các số liên quan (lĩnh, sử dụng, tồn) khớp nhau giữa các biểu. |

---

## 8. Xác nhận chốt nghiệp vụ

| Đại diện | Họ tên | Chữ ký | Ngày |
|---|---|---|---|
| Khách hàng | | | |
| VNPT-IT (BA/PO) | | | |

---

## PHỤ LỤC

### A. Thuật ngữ
- **Mẫu 2:** Biểu tổng hợp lĩnh, sử dụng, tồn nhiên liệu từng xe ô tô.
- **Mẫu 3:** Theo dõi lĩnh nhiên liệu (của từng xe).
- **Mẫu 4:** Biểu tổng hợp quyết toán tiêu hao nhiên liệu từng xe ô tô.
- **Tiêu hao theo định mức:** km × định mức giao khoán / 100.
- **Tiêu hao thực tế:** số lít sử dụng thực tế trong tháng.
- **Tăng (+) / Giảm (−):** thực tế trừ theo định mức; tăng nghĩa là vượt định mức.

### B. Câu hỏi mở cần chốt trong buổi họp
| # | Câu hỏi | Hiện đang giả định |
|---|---|---|
| Q6 | Đơn vị nào ngoài Đội xe văn phòng dùng chung biểu mẫu? Tiêu đề biểu lấy theo Đơn vị quản lý? | Tiêu đề theo đơn vị quản lý **[Giả thiết]** |
| 1 | Nguồn km hoạt động trong tháng | Các chuyến đã xác nhận đi về **[Giả thiết]** |
| 2 | Danh mục loại nhiên liệu cụ thể (Xăng A95, Xăng 95, Dầu DO…) nhóm lên Xăng/Dầu thế nào để cộng tổng? | Chờ khách hàng cung cấp danh mục |
| 3 | Xe đổi nhóm tuổi giữa tháng thì báo cáo quyết toán tách dòng hay lấy định mức bình quân (Q5 Phiên 1)? | Chưa có |
| 4 | Chữ ký, ghi chú và tiêu đề cố định của mẫu 2, 3, 4 có cần thay đổi theo từng đơn vị? | Giữ đúng biểu giấy hiện hành |

### C. Điều đã chốt với khách hàng (ghi chú review 14/10/2026)
- Ba biểu mẫu mẫu 2, 3, 4 in ký tay, không ký số.
- Các màn xem trước xuất mẫu đã làm đúng khuôn biểu: tiêu đề đơn vị, hàng số cột và công thức, tổng xăng/dầu/cộng, ghi chú, chữ ký.
- Dữ liệu mẫu cần lưu ý: xe 30M-51952 tồn cuối 41 (40 + 490 − 489) trong khi bản giấy ghi 42, tổng xăng tồn cuối 283 khớp 41 nên có thể là lỗi in tay. Xe 30E-930.37 trong dữ liệu minh họa có mua ngoài 55 lít (245 + 55 = 300 lít lĩnh) để khớp Sử dụng 302.
