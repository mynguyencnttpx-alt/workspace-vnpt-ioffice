# Flow: Quản lý nhiên liệu

> Màn hình thuộc flow này: loai-xe-list → loai-xe-form, loai-xe-list → he-so-config → he-so-form / he-so-ngung; baocao-linh-ton (tổng hợp lĩnh, sử dụng, tồn theo tháng) → so-theo-doi-linh (nhập phiếu lĩnh theo xe) → them-phieu-linh-popup, baocao-linh-ton → nhap-linh-hang-loat, chot-thang-confirm, linh-ton-log; baocao-linh-ton ↔ linh-ton-thang-da-chot (chốt tháng / mở khóa → mo-khoa-thang, ton-dau-lech); baocao-quyet-toan ↔ baocao-linh-ton → chi-tiet-xe-tieuhao; 3 màn xuất mẫu (xuat-mau-02, xuat-mau-03, xuat-mau-04). Màn nhập lĩnh/tồn tháng riêng (linh-ton-thang) đã gỡ 2026-10-19 vì trùng với báo cáo lĩnh, sử dụng, tồn. Flow tổng xem `../srs/dang-ky-xe-tkv-userflow.md` Mục 1.

> Nguồn: biểu mẫu đơn vị đang dùng (Biểu tổng hợp lĩnh, sử dụng, tồn; Theo dõi lĩnh nhiên liệu; Biểu tổng hợp quyết toán tiêu hao) + quy định định mức tiêu hao nhiên liệu của Tập đoàn (định mức theo loại xe, hệ số tuổi xe 1,05/1,10, hệ số khai trường 1,05) + thiết kế Figma `ioffice_v5`. Thay thế màn khung tạm `nhien-lieu-list` (OQ-11, đã đóng). Quy tắc đã chốt với khách hàng: số phiếu lĩnh chỉ nhập số + kiểm trùng; mua ngoài (hóa đơn) vượt hạn mức chỉ cảnh báo; biểu mẫu in ký tay, không ký số.

---

## Screen: loai-xe-list — Danh mục loại xe và định mức

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Danh mục loại xe và định mức nhiên liệu                          │
├──────────────────────────────────────────────────────────────────┤
│ [ Hệ số ]  [ + Thêm mới ]                                    [1] │
├──────────────────────────────────────────────────────────────────┤
│ STT  Loại xe        ĐM (l/100km)  Hiệu lực từ   Thao tác     [2] │
│ 1    Camry 2.4       15,0          01/01/2026    Sửa Xóa         │
│ 2    Fortuner 2.7    16,0          01/01/2026    Sửa Xóa         │
│ 3    Prado 2.7       17,0          01/01/2026    Sửa Xóa         │
│ 4    Hilux 3.0       17,0          01/01/2026    Sửa Xóa         │
│ 5    Pajero 3.0      17,1          01/01/2026    Sửa Xóa         │
│ 6    Solati 2.5      17,5          01/01/2026    Sửa Xóa         │
│ 7    Loại xe mới     Chưa có (!)   -             Sửa Xóa         │
│ Hiển thị [v 10] bản ghi                                      [3] │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Nút Hệ số / + Thêm mới | Button | Click | • Hệ số: mở `he-so-config`. + Thêm mới: mở `loai-xe-form` ở chế độ thêm. |
| 2 | Bảng loại xe | Label (bảng) + Link mỗi dòng | ReadOnly + Click | • Định mức = định mức GỐC theo văn bản của Tập đoàn, chưa nhân hệ số tuổi xe/khai trường. 6 loại theo quy định: Camry 2.4 = 15; Fortuner 2.7 = 16; Prado 2.7 = 17; Hilux 3.0 = 17; Pajero 3.0 = 17,1; Solati 2.5 = 17,5.<br>• Loại xe chưa có định mức hiện "Chưa có (!)": xe thuộc loại này chưa tính được tiêu hao theo định mức (báo cáo quyết toán hiện "Chưa có định mức").<br>• Click dòng mở `loai-xe-form` (sửa). Xóa chỉ khả dụng khi chưa có xe nào thuộc loại này [GIẢ ĐỊNH]. |
| 3 | Phân trang | Dropdown | Select | • Số bản ghi mỗi trang (mặc định 10). |

---

## Screen: loai-xe-form — Thêm/sửa loại xe

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Thêm/sửa loại xe                                                 │
├──────────────────────────────────────────────────────────────────┤
│   Tên loại xe *  [ Prado 2.7                       ]         [1] │
│                                                                  │
│ Định mức nhiên liệu (mới)                                    [2] │
│   Định mức mới   [ 17,0                  lít/100km ]             │
│   Hiệu lực từ    [ 01/01/2026                      ]             │
│   Văn bản căn cứ [ Tải tệp lên ]  QD_2026.pdf [x                 │
│   Ghi chú        [                                 ]             │
│                                                                  │
│ Lịch sử định mức                                             [3] │
│   Định mức | Hiệu lực              | Văn bản căn cứ              │
│   17,0     | 01/01/2026 - nay      | QD_Dinh_Muc_2026.pdf        │
│   14,5     | 01/01/24 - 31/12/25   | QD_Dinh_Muc_2024.pdf        │
│                                                                  │
│ [ Lưu ]  [ Đóng ]                                                │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Tên loại xe | Textbox | Text | • Bắt buộc, không trùng tên loại xe đã có. |
| 2 | Định mức mới + Hiệu lực + Văn bản + Ghi chú | Textbox (số) + Datepicker + Button Tải tệp lên | Text | • Định mức bắt buộc, số dương (lít/100km). Hiệu lực từ ngày bắt buộc.<br>• Đổi định mức KHÔNG ghi đè: tạo bản ghi mới có hiệu lực từ ngày chỉ định, bản cũ giữ trong lịch sử. Báo cáo tháng dùng định mức hiệu lực theo ngày.<br>• Mỗi lần đổi ghi vào nhật ký (vd "Đổi định mức Prado 2.7: 17,0 sang 17,5").<br>• Văn bản căn cứ: tùy chọn, chỉ chọn tệp bằng nút Tải tệp lên (mở hộp chọn tệp), KHÔNG hỗ trợ kéo thả; tệp đã chọn hiện tên tệp, dung lượng và nút xóa. Định dạng/dung lượng tối đa chờ chốt [GIẢ ĐỊNH]. |
| 3 | Lịch sử định mức | Label (bảng) | ReadOnly | • Liệt kê các mốc định mức đã áp dụng, khoảng hiệu lực và văn bản căn cứ (mở xem được). |

---

## Screen: he-so-config — Cấu hình hệ số

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ Cấu hình hệ số                                                           │
├──────────────────────────────────────────────────────────────────────────┤
│ Hệ số tuổi xe (tính từ Ngày sử dụng)       [ + Thêm hệ số ]          [1] │
│ Nhóm | Tuổi xe           | Hệ số | Hiệu lực từ | Trạng thái | Thao tác   │
│ A    | Đến 7 năm         | 1,00  | 01/01/2026  | Hoạt động  | ✎ | ⊘      │
│ B    | Trên 7 đến 14 năm | 1,05  | 01/01/2026  | Hoạt động  | ✎ | ⊘      │
│ C    | Trên 14 năm       | 1,10  | 01/01/2026  | Hoạt động  | ✎ | ⊘      │
│ B cũ | Trên 7 đến 14 năm | 1,03  | 2024-2025   | Không hoạt động | ↺     │
├──────────────────────────────────────────────────────────────────────────┤
│ Hệ số xe phục vụ khai trường                [ + Thêm hệ số ]         [2] │
│ STT | Áp dụng          | Hệ số | Hiệu lực từ | Trạng thái | Thao tác     │
│ 1   | Xe khai trường   | 1,05  | 01/01/2026  | Hoạt động  | ✎ | ⊘        │
│ [x] Hiện cả hệ số không hoạt động                                      [3] │
│                                                                          │
│ Định mức giao khoán = ĐM loại xe x hệ số tuổi                        [4] │
│ x hệ số khai trường. Vd: 17,0 x 1,10 x 1,00 = 18,7                       │
│ [ Quay lại loại xe ]                                                     │
└──────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Bảng hệ số tuổi xe + nút Thêm hệ số | Label (bảng) + Button + Icon Sửa (✎) / Ngừng hoạt động (⊘) / Kích hoạt lại (↺) | ReadOnly + Click | • Theo quy định hiện hành: nhóm A (đến 7 năm) 1,00; nhóm B (trên 7 đến 14 năm) 1,05; nhóm C (trên 14 năm) 1,10. Quy định có thể thay đổi nên được thêm nhóm/hệ số mới, sửa, ngừng hoạt động; KHÔNG xóa cứng (cần giữ lịch sử và đối chiếu tháng đã chốt).<br>• Tuổi xe tính từ Ngày sử dụng của xe, theo ngày về thực tế của từng chuyến [GIẢ ĐỊNH — mốc tính tuổi chờ chốt, OQ-13].<br>• Trạng thái: Hoạt động / Không hoạt động. Hệ số có hiệu lực từ ngày tương lai vẫn hiển thị Hoạt động, cột Hiệu lực từ cho biết ngày bắt đầu. Dòng Không hoạt động hiển thị mờ, không có icon Sửa/Ngừng hoạt động, chỉ có icon Kích hoạt lại (↺). Dòng B cũ (Không hoạt động) trong wireframe chỉ là ví dụ minh họa, không phải quy định.<br>• Thêm hệ số và icon Sửa (bút chì) mở `he-so-form`; icon Ngừng hoạt động (vòng cấm, màu đỏ) mở `he-so-ngung`; icon Kích hoạt lại (mũi tên quay lại, màu xanh lá, chỉ ở dòng Không hoạt động) mở hộp xác nhận: kiểm tra khoảng tuổi không chồng lấn với nhóm đang hoạt động, đạt thì hệ số về Hoạt động (hiệu lực từ ngày kích hoạt) và ghi nhật ký, không đạt báo "Khoảng tuổi chồng lấn với nhóm X" [GIẢ ĐỊNH]. Các icon có tooltip "Sửa" / "Ngừng hoạt động" / "Kích hoạt lại". Chỉ người có quyền quản trị loại xe và hệ số thấy các nút này (OQ-17); không đủ quyền chỉ xem. |
| 2 | Bảng hệ số xe phục vụ khai trường + nút Thêm hệ số | Label (bảng) + Button + Icon Sửa (✎) / Ngừng hoạt động (⊘) / Kích hoạt lại (↺) | ReadOnly + Click | • Hệ số 1,05 áp dụng cho xe bố trí phục vụ tại Trung tâm Điều hành sản xuất tại Quảng Ninh, thường xuyên vận hành trên đường khai trường. NHÂN THÊM ngoài hệ số nhóm tuổi.<br>• Xe được đánh dấu "Xe phục vụ khai trường" ở màn thêm/sửa xe (`danh-muc-xe-form`).<br>• Tại một thời điểm chỉ có 1 hệ số khai trường hoạt động: thêm hệ số mới khi đã có bản đang hoạt động thì bản mới có hiệu lực từ ngày chọn và bản cũ tự chuyển Không hoạt động, kết thúc trước đó 1 ngày [GIẢ ĐỊNH]. |
| 3 | Hiện cả hệ số không hoạt động | Checkbox | Boolean | • Mặc định ẩn các dòng Không hoạt động; bật lên để xem lịch sử, dòng Không hoạt động hiển thị mờ, chỉ có icon Kích hoạt lại. |
| 4 | Công thức định mức giao khoán | Label | ReadOnly | • Định mức giao khoán (lít/100km) = định mức loại xe x hệ số tuổi x hệ số khai trường. Ví dụ Prado 2.7, xe trên 14 năm, không khai trường: 17,0 x 1,10 x 1,00 = 18,7.<br>• Xe đổi nhóm tuổi giữa tháng: cách tính định mức cho báo cáo tháng chờ chốt (OQ-14). |

---

## Screen: he-so-form — Thêm/sửa hệ số

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Thêm hệ số   (Sửa hệ số khi mở từ dòng có sẵn)                   │
├──────────────────────────────────────────────────────────────────┤
│ Loại hệ số *     [ Tuổi xe                       v ]         [1] │
│ Nhóm *           [ B                               ]         [2] │
│ Mô tả áp dụng    [ Trên 7 đến 14 năm               ]         [3] │
│ Tuổi xe từ (năm) [ 7           ] đến [ 14          ]          [4] │
│ Hệ số *          [ 1,05                            ]         [5] │
│ Hiệu lực từ *    [ 01/01/2026                      ]         [6] │
│ Văn bản căn cứ   [ Tải tệp lên ]  QD_dinh_muc_2026.pdf  [7       │
│ Ghi chú          [                                 ]             │
│                                                                  │
│ [ Lưu ]  [ Đóng ]                                                │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Loại hệ số | Combobox | Text | • Bắt buộc khi thêm mới, chọn 1 trong 2 giá trị: Tuổi xe / Xe phục vụ khai trường. Mặc định theo bảng mà người dùng bấm Thêm hệ số (bảng hệ số tuổi xe thì Tuổi xe, bảng hệ số khai trường thì Xe phục vụ khai trường) [GIẢ ĐỊNH].<br>• Đổi giá trị thì các ô phụ thuộc đổi theo: chọn Tuổi xe hiện ô Tuổi xe từ - đến; chọn Xe phục vụ khai trường ẩn ô này, Mô tả áp dụng thành bắt buộc.<br>• Khi sửa thì khóa (disabled), không đổi loại. |
| 2 | Nhóm | Textbox | Text | • Bắt buộc, duy nhất trong cùng loại hệ số (đang hoạt động). Lỗi trùng: "Nhóm đã tồn tại".<br>• Khi sửa: cho đổi tên nhóm; không ảnh hưởng số liệu đã chốt vì tháng đã chốt giữ nguyên hệ số tại thời điểm chốt. |
| 3 | Mô tả áp dụng | Textbox | Text | • Tùy chọn với loại Tuổi xe (hệ thống tự gợi ý từ khoảng tuổi). Bắt buộc với loại Xe phục vụ khai trường (mô tả đối tượng xe áp dụng). |
| 4 | Tuổi xe từ - đến | Textbox (số) | Text | • Chỉ hiện với loại Tuổi xe. Các nhóm đang áp dụng tại cùng thời điểm liền nhau, không chồng lấn, không để hở [GIẢ ĐỊNH]; "đến" để trống = không giới hạn trên (chỉ cho nhóm cao nhất).<br>• Lỗi: "Khoảng tuổi chồng lấn với nhóm X" / "Khoảng tuổi để hở so với nhóm X". |
| 5 | Hệ số | Textbox (số) | Text | • Bắt buộc, số dương, tối đa 2 chữ số thập phân. |
| 6 | Hiệu lực từ ngày | Datepicker | Text | • Bắt buộc. Hệ số mới/sửa chỉ áp dụng từ ngày hiệu lực; KHÔNG áp ngược vào tháng đã chốt (muốn sửa phải mở khóa tháng). Mỗi lần thêm, sửa ghi nhật ký (người, thời điểm, giá trị cũ/mới). |
| 7 | Văn bản căn cứ | Button Tải tệp lên | File | • Tùy chọn: quyết định/văn bản quy định hệ số (PDF/Word). Chỉ chọn tệp bằng nút Tải tệp lên (mở hộp chọn tệp), KHÔNG hỗ trợ kéo thả; tệp đã chọn hiện tên tệp kèm nút xóa, hiển thị cùng lịch sử thay đổi [GIẢ ĐỊNH — theo cách làm của `loai-xe-form`]. |

---

## Screen: he-so-ngung — Ngừng hoạt động hệ số

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Ngừng hoạt động hệ số                                              │
├──────────────────────────────────────────────────────────────────┤
│ Hệ số tuổi xe - Nhóm B (trên 7 đến 14 năm), hệ số 1,05 (khóa)[1] │
│ Ngừng hoạt động từ ngày * [ 31/12/2026 ]                       [2] │
│ Lý do *       [                              ]                [3] │
│                                                                  │
│ (!) Sau ngày này xe tuổi 8 đến 14 năm sẽ không có hệ số tuổi.[4] │
│     Hãy thêm/sửa nhóm thay thế có hiệu lực cùng ngày.            │
│                                                                  │
│ [ Xác nhận ngừng hoạt động ]  [ Hủy ]                              │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Hệ số đang chọn | Label | ReadOnly | • Hiển thị loại, nhóm, khoảng tuổi và hệ số của dòng được chọn. |
| 2 | Ngừng hoạt động từ ngày | Datepicker | Text | • Bắt buộc. Không được trước ngày hiệu lực của chính hệ số này. Không áp ngược vào tháng đã chốt: nếu ngày chọn rơi vào tháng đã chốt thì báo "Tháng X đã chốt, cần mở khóa tháng trước" và chặn xác nhận. |
| 3 | Lý do | Textarea | Text | • Bắt buộc, ghi nhật ký cùng người thực hiện. Sau khi xác nhận, hệ số chuyển sang trạng thái Không hoạt động (từ ngày chọn) và chỉ còn Kích hoạt lại. |
| 4 | Cảnh báo hở khoảng tuổi | Label (cảnh báo) | ReadOnly | • Với hệ số tuổi xe: nếu ngừng làm hở khoảng tuổi (xe có tuổi trong khoảng đó không còn hệ số) thì hiện cảnh báo và chặn xác nhận cho tới khi có nhóm thay thế cùng ngày hiệu lực [GIẢ ĐỊNH].<br>• Với hệ số khai trường: ngừng hoạt động thì xe có cờ khai trường tính hệ số 1,00 từ ngày ngừng; hiện thông báo số xe bị ảnh hưởng. |

---

## Screen: linh-ton-thang-da-chot — Lĩnh và tồn - tháng đã chốt

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Lĩnh và tồn nhiên liệu                                           │
├──────────────────────────────────────────────────────────────────┤
│ Tháng [v 08/2026] Đơn vị [v Đội xe VP] NL [v Tất cả]         [1] │
│ (Đã chốt) Chốt 05/09/2026 16:00  [ Mở khóa ] [Xem nhật ký]   [2] │
├──────────────────────────────────────────────────────────────────┤
│ Biển số   |NL |Thùng|Đầu|Lĩnh CX|Mua ngoài|Tổng|Dùng|Cuối    [3] │
│ 30M-51470 |A95| 80  | 46 | 620   |   -     | 620| 612   | 54     │
│ 29Y-1731  |A95| 65  | 36 |  -    |   -     |  - |  -    | 36     │
│ (chỉ xem, các ô không nhập được)                                 │
│ Tổng xăng |   |     |259 |2.930  |  55     |2.985|2.961 | 283    │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Bộ lọc | Dropdown | Select | • Như `baocao-linh-ton`. Tách thành screen riêng vì trạng thái Chưa chốt và Đã chốt loại trừ nhau. |
| 2 | Trạng thái chốt + nút Mở khóa | Label + Button | ReadOnly + Click | • Hiển thị người chốt và thời điểm chốt. Nút Mở khóa CHỈ hiện cho người có quyền mở khóa riêng (OQ-17), mở `mo-khoa-thang`. |
| 3 | Bảng chỉ xem | Label (bảng) | ReadOnly | • Mọi ô chỉ xem, không có Lưu/Chốt tháng. Bấm biển số xem chi tiết xe. Xuất mẫu 2 và Excel vẫn dùng được. |

---

## Screen: so-theo-doi-linh — Nhập phiếu lĩnh theo xe/tháng (Sổ theo dõi lĩnh)

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Sổ theo dõi lĩnh theo xe                                         │
├──────────────────────────────────────────────────────────────────┤
│ Tháng *      Xe *                                                │
│ [v 08/2026] [v 30M-51470 Fortuner]      [+ Thêm phiếu lĩnh]      │
│                          [Nhật ký chỉnh sửa][Xuất v]         [1] │
├──────────────────────────────────────────────────────────────────┤
│ Tồn đầu 46 | Lĩnh 620 | Mua ngoài - | Tồn cuối 54 | Sử dụng 612  │
│ (chỉ xem; Tồn đầu, Tồn cuối nhập ở báo cáo lĩnh tồn)         [2] │
├──────────────────────────────────────────────────────────────────┤
│ STT|Ngày      |Số phiếu|Số HĐ|Phiếu(l)|HĐ(l)|Tổng|Ghi chú|TT [3] │
│  1 |03/08/2026|359005  |     | 50 |  50    |  -  |       |✎ ✕    │
│  2 |           |359006  |     |  50    |  -  | 50 |       |✎ ✕   │
│  5 |08/08/2026|359029  |     | 50 |  50    |  -  |       |✎ ✕    │
│ (scroll xuống xem thêm đến STT 13)                               │
│ Cộng                             | 620 |  620   |  0  |          │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Bộ lọc tháng, xe + nút chức năng | Dropdown + Button | Select + Click | • Một hàng: bên trái hai ô lọc Tháng *, Xe * (nhãn phía trên); bên phải các nút. Mỗi xe một sổ theo tháng. Loại nhiên liệu lấy theo khai báo của xe, không hiển thị. Không có nhãn trạng thái chốt trên màn này (xem ở `baocao-linh-ton`).<br>• Thêm phiếu lĩnh: mở popup `them-phieu-linh-popup`; ẩn khi tháng đã chốt hoặc không có quyền.<br>• Nhật ký chỉnh sửa: mở `linh-ton-log` lọc sẵn theo xe và tháng đang chọn (chỉ xem).<br>• Xuất (menu): Xuất PDF theo đúng khuôn "Theo dõi lĩnh nhiên liệu" (`xuat-mau-03-theo-doi-linh-xe`, in ký tay, không ký số) và Xuất Excel.<br>• Không có nút Lưu: phiếu được ghi ngay khi bấm Lưu trong popup. |
| 2 | Tổng hợp tháng của xe (Tồn đầu, Lĩnh, Mua ngoài, Tồn cuối, Sử dụng) | Label | ReadOnly | • Chỉ xem, KHÔNG có ô nhập. Tồn đầu và Tồn cuối lấy từ số đã nhập ở `baocao-linh-ton`. Lĩnh tại cây xăng: tự cộng từ cột Phiếu lĩnh của bảng. Mua ngoài: tự cộng từ cột Hóa đơn (lít) của bảng (hóa đơn mua ngoài nhập trong popup thêm phiếu lĩnh).<br>• Sử dụng (tự tính) = Tồn đầu + Lĩnh tại cây xăng + Mua ngoài − Tồn cuối, không được âm. Vd 46 + 620 + 0 − 54 = 612. |
| 3 | Bảng phiếu lĩnh và hóa đơn | Label (bảng) + Icon Sửa/Xóa | ReadOnly + Click | • Bảng chỉ xem, không có ô nhập trực tiếp. Cột theo đúng biểu mẫu mẫu 3: STT, Ngày tháng, Số hiệu chứng từ (Số phiếu lĩnh, Số hóa đơn), Số lượng lĩnh lít (Tổng số, Phiếu lĩnh, Hóa đơn), Ghi chú. Icon Sửa mở lại popup với dữ liệu dòng đó; icon Xóa có hộp xác nhận rồi ghi nhật ký. Tổng số = phiếu + hóa đơn.<br>• Hóa đơn (mua ngoài) nhập ở `them-phieu-linh-popup`, hiển thị cùng bảng theo thứ tự ngày.<br>• Dòng Cộng cuối bảng: tổng cột Phiếu lĩnh chính là số "Lĩnh tại cây xăng chỉ định" ở `baocao-linh-ton` (vd 620).<br>• Tháng đã chốt: toàn màn chỉ xem, ẩn nút Thêm phiếu lĩnh và icon Sửa/Xóa. |

---

## Screen: them-phieu-linh-popup — Thêm/sửa phiếu lĩnh

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ THÊM PHIẾU LĨNH                                          [x]     │
├──────────────────────────────────────────────────────────────────┤
│ Xe / Tháng        [ 30M-51470 · Fortuner 2.7 · 08/2026 ] (khóa)  │
│ Ngày *            [ dd/mm/yyyy                         ]     [1] │
│ SỐ HIỆU CHỨNG TỪ (nhập ít nhất 1 trong 2)                    [2] │
│ Số phiếu lĩnh     [ 359009                             ]         │
│                   (!) Đã ghi cho xe 30M-51952, không thể trùng   │
│ Số hóa đơn        [ Số hóa đơn (nếu có)                ]         │
│ SỐ LƯỢNG LĨNH (LÍT)                                          [3] │
│ Phiếu lĩnh (lít)  [ lít                                ]         │
│ Hóa đơn (lít)     [ lít                                ]         │
│ Tổng số (tự tính) [ 0                                  ] (khóa)  │
│ Ghi chú           [ Ghi chú của phiếu                  ]     [4] │
│                                                                  │
│ [ Lưu ]  [ Đóng ]                                                │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

> Các nhóm thông tin theo đúng khuôn biểu mẫu "Theo dõi lĩnh nhiên liệu" (mẫu 3): STT, Ngày tháng, Số hiệu chứng từ (Phiếu lĩnh, Hóa đơn), Số lượng lĩnh (Lít) gồm Tổng số, Phiếu lĩnh, Hóa đơn, và Ghi chú. STT do hệ thống tự đánh theo thứ tự ngày.

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Xe / Tháng + Ngày tháng | Label + Datepicker | ReadOnly + Text | • Xe và tháng lấy từ màn `so-theo-doi-linh`, khóa không sửa. Ngày tháng bắt buộc, thuộc tháng của sổ đang mở; in ra biểu mẫu dạng "03-Thg8". |
| 2 | Số hiệu chứng từ: Số phiếu lĩnh, Số hóa đơn | Textbox | Text | • Phải nhập ÍT NHẤT MỘT trong hai. Một dòng có thể chỉ có phiếu lĩnh (lĩnh tại cây xăng chỉ định), chỉ có hóa đơn (mua ngoài) hoặc cả hai.<br>• Số phiếu lĩnh: kiểm TRÙNG toàn hệ thống (quy tắc đã chốt, không quản lý kho phiếu). Trùng thì báo ngay dưới ô: "Số phiếu {số} đã ghi cho xe {biển số} ({ngày}), không thể trùng" và chặn Lưu.<br>• Số hóa đơn: kiểm trùng toàn hệ thống ("Thiếu hoặc trùng số hóa đơn"). Quy tắc theo quy định: mỗi hóa đơn không quá dung tích thùng của xe; vượt thì CHỈ CẢNH BÁO, vẫn lưu được, ghi nhật ký (không chặn). Popup Mua ngoài riêng đã gỡ, nên hóa đơn mua ngoài nhập thẳng tại đây; không còn gắn chuyến công tác nên bỏ cảnh báo so với định mức theo km của chuyến [GIẢ ĐỊNH]. |
| 3 | Số lượng lĩnh (lít): Phiếu lĩnh, Hóa đơn, Tổng số | Textbox (số) + Label | Text + ReadOnly | • Phiếu lĩnh (lít): bắt buộc khi đã nhập Số phiếu lĩnh; số dương. Hóa đơn (lít): bắt buộc khi đã nhập Số hóa đơn; số dương. Ô không có số chứng từ tương ứng thì để trống/khóa.<br>• Tổng số (tự tính, khóa) = Phiếu lĩnh (lít) + Hóa đơn (lít). Phiếu lĩnh (lít) cộng vào "Lĩnh tại cây xăng chỉ định", Hóa đơn (lít) cộng vào "Mua ngoài" của `baocao-linh-ton`. |
| 4 | Ghi chú + Lưu / Đóng | Textbox + Button | Text + Click | • Ghi chú không bắt buộc, hiện ở cột Ghi chú của dòng và gộp vào cột Ghi chú của `baocao-linh-ton` [GIẢ ĐỊNH].<br>• Lưu hợp lệ: ghi dòng, đóng popup, bảng và khối tổng hợp của `so-theo-doi-linh` cập nhật, ghi nhật ký. Sửa phiếu dùng cùng popup, tiêu đề "SỬA PHIẾU LĨNH". |

---

## Screen: nhap-linh-hang-loat — Nhập phiếu lĩnh hàng loạt theo tháng

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ Nhập phiếu lĩnh hàng loạt                                                │
├──────────────────────────────────────────────────────────────────────────┤
│ Tháng [v 08/2026] Đơn vị [v Đội xe VP] (Chưa chốt)  [Lưu][Xuất Excel]    │
├──────────────────────────────────────────────────────────────────────────┤
│ (!) Số phiếu lĩnh 359009 đã ghi cho xe 30M-51952 (03/08/2026)        [2] │
├──────────────────────────────────────────────────────────────────────────┤
│ STT|Ngày      |Xe        |Số phiếu|Lít |Nhiên liệu|Lũy kế|Ghi chú|TT [3] │
│  1 |03/08/2026|30M-51470 |359005  | 50 |Xăng A95  |  50  |       |✎ ✕    │
│  2 |03/08/2026|29A-235.14|359010  | 50 |Xăng A95  |  50  |       |✎ ✕    │
│  3 |03/08/2026|29B-519-65|359011  | 50 |Dầu DO    |  50  |       |✎ ✕    │
│  4 |05/08/2026|30E-930.37|359012  | 60 |Xăng A95  |  60  |       |✎ ✕    │
│ Cộng                              | 400|                                 │
├──────────────────────────────────────────────────────────────────────────┤
│ Thêm dòng: [dd/mm/yyyy][v Chọn xe][Số phiếu][lít][Ghi chú] [ Thêm ]      │
└──────────────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Bộ lọc tháng, đơn vị quản lý + nút Lưu / Xuất Excel | Dropdown + Button | Select + Click | • Nhập nhiều phiếu lĩnh cho nhiều xe trong cùng tháng và đơn vị. Mặc định tháng đang chọn ở `baocao-linh-ton`; phạm vi xe theo đơn vị quản lý và quyền người dùng.<br>• Lưu: ghi các dòng mới/sửa; số lít tự cộng vào cột Lĩnh tại cây xăng của `baocao-linh-ton` và vào sổ của từng xe (`so-theo-doi-linh`). Hai màn dùng chung một nguồn dữ liệu, không nhập hai lần.<br>• Tháng đã chốt: màn chỉ xem, ẩn dòng thêm và nút Lưu [GIẢ ĐỊNH — nhập bổ sung phải mở khóa tháng trước, theo `mo-khoa-thang`]. |
| 2 | Thông báo lỗi trùng số phiếu | Label (error) | ReadOnly | • Cùng quy tắc `so-theo-doi-linh`: chỉ nhập số phiếu lĩnh và kiểm TRÙNG toàn hệ thống (kể cả trùng giữa các dòng đang nhập trên màn này). Trùng thì báo "Số phiếu lĩnh {số} đã ghi cho xe {biển số} ({ngày}) — không thể lưu trùng số phiếu" và chặn lưu dòng đó, các dòng hợp lệ khác vẫn lưu được. |
| 3 | Bảng phiếu lĩnh theo xe | Label (bảng) + Icon Sửa/Xóa | ReadOnly + Click | • Mỗi dòng: ngày, xe (biển số), số phiếu lĩnh, số lít, ghi chú. Nhiên liệu tự lấy theo khai báo của xe, không sửa tại đây. Xe chưa khai báo loại nhiên liệu: chặn chọn, báo "Xe chưa khai báo nhiên liệu".<br>• Lũy kế tháng: tổng số lít đã lĩnh của xe đó trong tháng sau dòng này (tự tính, chỉ xem).<br>• Dòng Cộng: tổng số lít các dòng đang hiển thị.<br>• Sắp xếp theo ngày; lọc/tìm theo xe, số phiếu [GIẢ ĐỊNH]. |
| 4 | Dòng thêm mới | Datepicker + Combobox + Textbox + Button | Text | • Ngày, xe, số phiếu, số lít bắt buộc; số lít là số dương; ngày thuộc tháng đang chọn. Ghi chú không bắt buộc.<br>• Xe: combobox chọn biển số, tìm gõ được; chỉ liệt kê xe thuộc đơn vị đã chọn. |

---

## Screen: chot-thang-confirm — Xác nhận chốt tháng

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ XÁC NHẬN CHỐT THÁNG                                      [x]     │
├──────────────────────────────────────────────────────────────────┤
│ Chốt số liệu tháng 08/2026?                                      │
│ Số xe: 8  ·  Đã nhập đủ tồn cuối: 8/8                        [1] │
│ Tháng trước 07/2026: (Đã chốt)                                   │
│ (!) Sau khi chốt không sửa được số liệu tháng này.           [2] │
│     Chỉ người có quyền mở khóa mới mở lại; mọi thay đổi          │
│     đều ghi nhật ký.                                             │
│ [ Chốt tháng ]  [ Hủy ]                                          │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Tóm tắt chốt | Label | ReadOnly | • Hiển thị số xe và số xe đã nhập đủ tồn cuối. Chưa đủ (vd 7/8) hoặc có ô vi phạm quy tắc tồn: KHÔNG cho Chốt tháng, báo xe còn thiếu/sai. |
| 2 | Cảnh báo hậu quả chốt | Label (warning) + Button | ReadOnly + Click | • Chốt xong, tháng chuyển sang `linh-ton-thang-da-chot`; ghi nhật ký hành động Chốt (người, thời điểm). |

---

## Screen: mo-khoa-thang — Mở khóa tháng đã chốt

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ MỞ KHÓA THÁNG                                            [x]     │
├──────────────────────────────────────────────────────────────────┤
│ Mở khóa tháng 08/2026                                            │
│ Chốt bởi ql.xe01 lúc 05/09/2026 16:00                            │
│ Lý do mở khóa *  [                             ]             [1] │
│                  Bắt buộc, tối đa 500 ký tự.                     │
│ (!) Mọi chỉnh sửa sau khi mở khóa được ghi nhật ký.          [2] │
│ [ Mở khóa ]  [ Hủy ]  < Xem nhật ký >                            │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Lý do mở khóa | Textarea | Text | • Bắt buộc, tối đa 500 ký tự. Thiếu lý do không cho Mở khóa. |
| 2 | Mở khóa + cảnh báo | Button + Label | Click | • Mở khóa xong tháng quay về Chưa chốt (`baocao-linh-ton`), cho sửa tồn cuối. Ghi nhật ký (người, lý do). Nếu sửa làm tồn các tháng sau lệch, hệ thống mở `ton-dau-lech`. Link Xem nhật ký mở `linh-ton-log`. |

---

## Screen: ton-dau-lech — Tồn đầu các tháng sau bị lệch

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ TỒN ĐẦU CÁC THÁNG SAU BỊ LỆCH                            [x]     │
├──────────────────────────────────────────────────────────────────┤
│ Tháng 08/2026 vừa được sửa. Tồn đầu các tháng sau đang           │
│ lệch so với tồn cuối mới.                                        │
│ Tháng  |Xe         |Tồn đầu cũ|Tồn cuối tháng trước          [1] │
│ 09/2026|29A-235.14 |    35    |      33                          │
│ 09/2026|30E-930.37 |    60    |      62                          │
│ Tháng chưa chốt: Tính lại sẽ tự cập nhật tồn đầu.            [2] │
│ Tháng đã chốt: phải mở khóa theo thứ tự rồi mới tính lại.        │
│ [ Tính lại ]  [ Giữ nguyên, đánh dấu lệch ]                      │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Bảng xe bị lệch | Label (bảng) | ReadOnly | • Liệt kê tháng, xe, tồn đầu hiện có và tồn cuối tháng trước (theo số vừa sửa). |
| 2 | Hướng dẫn + nút xử lý | Label + Button | Click | • Tính lại: cập nhật tồn đầu các tháng sau theo tồn cuối mới (chỉ tháng chưa chốt). Giữ nguyên, đánh dấu lệch: không đổi số, các dòng lệch được đánh dấu để rà soát. Cả hai lựa chọn đều ghi nhật ký. |

---

## Screen: linh-ton-log — Nhật ký chỉnh sửa lĩnh và tồn

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Nhật ký chỉnh sửa lĩnh và tồn                                    │
├──────────────────────────────────────────────────────────────────┤
│ Xe [v Tất cả] Từ ngày [dd/mm/yyyy] Đến [dd/mm/yyyy] [Tìm]    [1] │
├──────────────────────────────────────────────────────────────────┤
│ Thời gian      |Người  |Hành động  |Nội dung / lý do         [2] │
│ 08/10/26 09:25 |ql.xe01|Chốt       |Tháng 08/2026                │
│ 08/10/26 09:20 |ql.xe01|Sửa số liệu|30E-930.37 cuối 60->62       │
│ 08/10/26 09:15 |ql.xe01|Mở khóa    |08/2026, nhập sai tồn cuối   │
│ 05/09/26 16:00 |ql.xe01|Chốt       |Tháng 08/2026                │
│ 01/09/26 08:30 |qt.xe02|Đổi ĐM     |Prado 2.7: 17,0 -> 17,5      │
│ Hiển thị [v 10] bản ghi                      [ Quay lại ]        │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Bộ lọc xe, khoảng ngày | Dropdown + Datepicker + Button | Select | • Không bắt buộc. Tìm theo xe và khoảng thời gian thao tác. |
| 2 | Bảng nhật ký | Label (bảng) | ReadOnly | • Chỉ xem, không sửa/xóa. Ghi các hành động: Chốt, Mở khóa (kèm lý do), Sửa số liệu (giá trị cũ sang mới), Đổi định mức/hệ số, Mua ngoài vượt hạn mức, Tính lại/giữ nguyên tồn đầu lệch. |

---

## Screen: baocao-quyet-toan — Báo cáo quyết toán tiêu hao

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Báo cáo quyết toán tiêu hao                                      │
│ [Quyết toán tiêu hao] | Lĩnh, sử dụng, tồn                   [1] │
├──────────────────────────────────────────────────────────────────┤
│ Kỳ [v Tháng] [v 08/2026] Đơn vị [v Tất cả] Xe [v Tất cả]     [2] │
│ [Xem] [Xuất Excel] [Xuất PDF mẫu 4] (Tháng 08/2026: Đã chốt) [3] │
├──────────────────────────────────────────────────────────────────┤
│ STT|Biển số   |Km tháng|ĐM giao khoán|Theo ĐM|Thực tế|+/-    [4] │
│  1 |30M-51470 | 3.828  |    16,0     |  612  |  612  | -         │
│  3 |30E-930.37| 1.615  |    18,7     |  302  |  302  | -         │
│  9 |29X-9999  |   0    |Chưa có ĐM   |   -   |   -   | -         │
│ Tổng             |19.508 |             | 3.249 | 3.249 | -       │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Tab báo cáo | Tab | Click | • Chuyển giữa Quyết toán tiêu hao (màn này) và Lĩnh, sử dụng, tồn (`baocao-linh-ton`). |
| 2 | Bộ lọc kỳ, tháng, đơn vị, xe | Dropdown | Select | • Kỳ mặc định Tháng. Đơn vị quản lý quyết định tiêu đề biểu mẫu khi xuất (OQ-15). |
| 3 | Nút Xem / Xuất Excel / Xuất PDF + trạng thái chốt | Button + Label | Click | • Xuất PDF theo đúng biểu mẫu "Biểu tổng hợp quyết toán tiêu hao nhiên liệu từng xe ô tô" (`xuat-mau-04-quyet-toan`), in ký tay.<br>• Tháng chưa chốt: cột Thực tế để trống, Tăng/Giảm không tính. |
| 4 | Bảng quyết toán | Label (bảng) + Link biển số | ReadOnly + Click | • Km hoạt động trong tháng: tổng km các chuyến đã xác nhận đi về của xe trong tháng [GIẢ ĐỊNH — nguồn km chờ chốt, OQ-19].<br>• Định mức giao khoán = định mức loại xe x hệ số tuổi x hệ số khai trường (lít/100km).<br>• Tiêu hao theo định mức (cột 5 = 3 x 4) = Km x Định mức / 100, làm tròn lít. Tiêu hao thực tế (cột 6) = số Sử dụng của `baocao-linh-ton` (kết chuyển từ cột 8 biểu lĩnh-sử dụng-tồn). Tăng (+)/Giảm (-) (cột 7 = 6 − 5); (!) khi vượt định mức.<br>• Xe chưa có định mức: "Chưa có định mức", không tính tiêu hao. Bấm biển số mở `chi-tiet-xe-tieuhao`. |

---

## Screen: baocao-linh-ton — Báo cáo lĩnh, sử dụng, tồn

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Báo cáo lĩnh, sử dụng, tồn                                       │
│ Quyết toán tiêu hao | [Lĩnh, sử dụng, tồn]                   [1] │
├──────────────────────────────────────────────────────────────────┤
│ Kỳ [v Tháng] [v 08/2026] Đơn vị [v Tất cả] Xe [v Tất cả]     [2] │
│ [Xem][Lưu][Nhập phiếu lĩnh][Chốt tháng][Xem nhật ký]         [3] │
│ [Xuất Excel][Xuất PDF mẫu 2] (Tháng 08/2026: Chưa chốt)          │
├──────────────────────────────────────────────────────────────────┤
│ STT|Biển số|NL|Thùng|[Đầu]|Lĩnh CX|Mua ngoài|Tổng|Dùng|[Cuối]  [4] │
│  1 |30M-51470 |A95|80 |[46]| 620 ✎ |   -     | 620| 612|[54]     │
│  5 |29B-519-65|DO |80 |[44]| 250   |   -     | 250| 288|[ 6]     │
│ Tổng xăng       |     |259|2.930  |  55     |2.985|2.961|283     │
│ Tổng dầu        |     | 44| 250   |   -     | 250| 288|  6       │
│ Tổng cộng       |     |   |3.180  |  55     |3.235|              │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Tab báo cáo | Tab | Click | • Như `baocao-quyet-toan`. |
| 2 | Bộ lọc | Dropdown | Select | • Như `baocao-quyet-toan`. |
| 3 | Nút Xem / Lưu / Nhập phiếu lĩnh / Chốt tháng / Xem nhật ký / Xuất Excel / Xuất PDF mẫu 2 | Button + Label | Click | • Lưu: ghi Tồn đầu và Tồn cuối đã nhập (kiểm tra quy tắc tồn, ghi nhật ký). Chỉ hiện khi tháng chưa chốt và có quyền nhập.<br>• Nhập phiếu lĩnh: mở `nhap-linh-hang-loat` nhập phiếu cho nhiều xe trong tháng. Chốt tháng: mở `chot-thang-confirm` (chỉ khi kỳ là Tháng chưa chốt, có quyền). Xem nhật ký: mở `linh-ton-log`. Các nút Lưu, Nhập phiếu lĩnh, Chốt tháng ẩn/khóa khi tháng đã chốt hoặc không có quyền.<br>• Xuất PDF theo đúng biểu mẫu "Biểu tổng hợp lĩnh, sử dụng, tồn nhiên liệu từng xe ô tô" (`xuat-mau-02-linh-su-dung-ton`). |
| 4 | Bảng lĩnh - sử dụng - tồn | Label (bảng) | ReadOnly | • Số liệu tổng hợp theo tháng từ sổ lĩnh, tồn của từng xe (tháng chưa chốt hiển thị số đang nhập, nhãn "Chưa chốt"; tháng đã chốt: mọi ô chỉ xem); có STT, Tổng số lĩnh, Ghi chú, Tổng xăng/Tổng dầu/Tổng cộng như biểu mẫu giấy.<br>• Sử dụng = Tồn đầu + Lĩnh tại cây xăng + Mua ngoài − Tồn cuối. Xe chưa khai báo loại nhiên liệu không nằm trong tổng xăng, tổng dầu.<br>• Cột Lĩnh tại cây xăng có icon nhập (✎): bấm mở `so-theo-doi-linh` của xe đó để nhập phiếu lĩnh, tồn cuối, ghi chú (hiện cả ở xe chưa có số lĩnh). Tồn đầu và Tồn cuối là HAI CỘT DUY NHẤT cho nhập tay trên báo cáo này (khi tháng chưa chốt, có quyền): ô nhập số lít, ≥ 0 và ≤ dung tích thùng của xe, vi phạm viền đỏ và chặn Lưu/Chốt tháng. Tồn đầu mặc định gợi ý bằng tồn cuối tháng trước, cho sửa; tháng đầu tiên của xe bắt buộc nhập tay; sửa khác tồn cuối tháng trước thì ghi nhật ký và cảnh báo lệch [GIẢ ĐỊNH]. Mọi cột còn lại (Thùng, Lĩnh tại cây xăng, Mua ngoài, Tổng số lĩnh, Sử dụng, Ghi chú, các dòng Tổng) tự tổng hợp, KHÔNG nhập tay; Ghi chú lấy từ sổ của từng xe. |

---

## Screen: chi-tiet-xe-tieuhao — Chi tiết tiêu hao theo xe

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ Xe 30E-930.37  Prado 2.7 · Xăng · Thùng 87 lít                   │
│ Định mức giao khoán: 17,0 x 1,10 (nhóm C) x 1,00 = 18,7          │
├──────────────────────────────────────────────────────────────────┤
│ Kỳ [v Năm 2026]  [ Xuất Excel ]                              [1] │
├──────────────────────────────────────────────────────────────────┤
│ Tháng  |  Km  |ĐM  |Theo ĐM|Thực tế|Tăng/Giảm|Đã chốt        [2] │
│ 04/2026|1.402 |18,7|  262  |  262  |    -    | Rồi               │
│ 05/2026|1.730 |18,7|  324  |  330  |  +6 (!) | Rồi               │
│ 09/2026|  520 |18,7|   97  |   -   |    -    | Chưa              │
│ Tổng (đã chốt)|7.945|    | 1.486 | 1.492 |   +6                  │
│ [ Quay lại báo cáo ]                                             │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Bộ lọc kỳ | Dropdown | Select | • Mặc định Năm hiện tại; có kỳ Vòng đời (từ chuyến đầu tiên có km trong hệ thống). |
| 2 | Bảng theo tháng | Label (bảng) | ReadOnly | • Mỗi tháng một dòng: km, định mức, tiêu hao theo định mức, thực tế, tăng/giảm, trạng thái chốt.<br>• Tháng chưa chốt: có số lý thuyết, cột Thực tế để trống. Dòng Tổng chỉ cộng các tháng đã chốt. (!) khi vượt định mức. |

---

## Screen: xuat-mau-02-linh-su-dung-ton — Xuất mẫu 2 - Lĩnh, sử dụng, tồn

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ TẬP ĐOÀN CN THAN - KHOÁNG SẢN VIỆT NAM                           │
│      ĐỘI XE VĂN PHÒNG                                            │
│    Biểu tổng hợp lĩnh, sử dụng, tồn nhiên liệu                   │
│           từng xe ô tô - Tháng 08 năm 2026                       │
├──────────────────────────────────────────────────────────────────┤
│ STT|Số xe|Thùng|Tồn đầu|Lĩnh:Tổng|CX|Mua|Sử dụng|Cuối|GC     [1] │
│  1    2     3     4     5=6+7   6   7  8=4+5-9  9   10           │
│  1 |30M-51470| 80 | 46 | 620 | 620 | - | 612 | 54                │
│ Tổng xăng           | 259 |2.985|2.985| - |2.961| 283            │
│ Tổng dầu            |  44 | 250 | 250 | - | 288 |   6            │
│ Tổng cộng                 |3.235|3.235| -                        │
│ Ghi chú: 3 gạch đầu dòng theo biểu mẫu                       [2] │
│                                   ĐỘI XE VĂN PHÒNG               │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Bảng biểu mẫu 10 cột | Label (bảng) | ReadOnly | • Đúng khuôn biểu giấy: STT; Số xe; Dung tích thùng; Tồn đầu tháng; Lĩnh trong tháng (Tổng số = 6 + 7, Lĩnh tại cây xăng dầu được chỉ định, Mua nhiên liệu ngoài cây xăng dầu được chỉ định); Sử dụng (8 = 4 + 5 − 9); Tồn cuối (9); Ghi chú (10). Có hàng đánh số cột và công thức.<br>• Dòng Tổng xăng, Tổng dầu, Tổng cộng. Tiêu đề hai dòng: "Tập đoàn CN Than - Khoáng sản Việt Nam" và tên đơn vị quản lý (OQ-15). |
| 2 | Ghi chú + chữ ký | Label | ReadOnly | • 3 ghi chú theo biểu giấy: số lượng cột 8 kết chuyển sang cột 6 biểu quyết toán; quy định mua ngoài (cột 7); tồn cột 4 và 9 là tồn thực tế, không âm, không vượt dung tích thùng.<br>• Khối chữ ký "ĐỘI XE VĂN PHÒNG". Quy tắc đã chốt: in ký tay, KHÔNG ký số. Xuất PDF và Excel cùng khuôn. |

---

## Screen: xuat-mau-03-theo-doi-linh-xe — Xuất mẫu 3 - Theo dõi lĩnh nhiên liệu

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ TẬP ĐOÀN CN THAN - KHOÁNG SẢN VIỆT NAM                           │
│      ĐỘI XE VĂN PHÒNG                                            │
│      Theo dõi lĩnh nhiên liệu - Tháng 08 năm 2026                │
│ Tên, chủng loại xe ô tô/Biển kiểm soát: 30M-51470                │
│ Loại nhiên liệu sử dụng: Xăng A95                                │
├──────────────────────────────────────────────────────────────────┤
│ STT|Ngày tháng|Phiếu lĩnh|Hóa đơn|Tổng|Phiếu|Hóa đơn|GC      [1] │
│  1 | 03-Thg8  | 359005  |        | 50  | 50  |                   │
│  2 |          | 359006  |        | 50  | 50  |                   │
│ Cộng                             | 620 | 620 |  0                │
│ ĐỘI XE VĂN PHÒNG                              LÁI XE         [2] │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Bảng theo dõi lĩnh | Label (bảng) | ReadOnly | • Đúng khuôn biểu giấy: STT; Ngày tháng (dạng 03-Thg8, chỉ ghi ở dòng đầu của ngày); Số hiệu chứng từ (Phiếu lĩnh, Hóa đơn); Số lượng lĩnh theo lít (Tổng số, Phiếu lĩnh, Hóa đơn); Ghi chú. Bảng có các dòng trống đến STT 18 như biểu giấy; dòng Cộng cuối bảng. |
| 2 | Khối thông tin xe + chữ ký | Label | ReadOnly | • Tên, chủng loại xe/Biển kiểm soát và Loại nhiên liệu sử dụng lấy từ khai báo xe. Chữ ký "ĐỘI XE VĂN PHÒNG" và "LÁI XE"; in ký tay, không ký số. |

---

## Screen: xuat-mau-04-quyet-toan — Xuất mẫu 4 - Quyết toán tiêu hao

### Wireframe (ASCII)

```text
┌──────────────────────────────────────────────────────────────────┐
│ TẬP ĐOÀN CN THAN - KHOÁNG SẢN VIỆT NAM                           │
│      ĐỘI XE VĂN PHÒNG                                            │
│    Biểu tổng hợp quyết toán tiêu hao nhiên liệu                  │
│           từng xe ô tô - Tháng 08 năm 2026                       │
├──────────────────────────────────────────────────────────────────┤
│ STT|Số xe     |Km tháng|ĐM giao khoán|Theo ĐM|Thực tế|+/-    [1] │
│  1      2         3          4        5=3x4     6     7=6-5      │
│  1 |30M-51470 | 3.828  |    16,0     |  612  |  612  | -         │
│  3 |30E-930.37| 1.615  |    18,7     |  302  |  302  | -         │
│ ĐỘI XE VĂN PHÒNG                                             [2] │
└──────────────────────────────────────────────────────────────────┘
```

### Screen description

| # | Items | Control type | Data type | Description |
|---|-------|--------------|-----------|--------------|
| 1 | Bảng quyết toán 7 cột | Label (bảng) | ReadOnly | • Đúng khuôn biểu giấy: STT; Số xe; Số Km hoạt động trong tháng; Định mức nhiên liệu giao khoán (lít/100km); Tiêu hao theo định mức (5 = 3 x 4); Tiêu hao thực tế (6); Tăng (+)/Giảm (-) (7 = 6 − 5). Có hàng đánh số cột và công thức. |
| 2 | Chữ ký | Label | ReadOnly | • Khối "ĐỘI XE VĂN PHÒNG"; in ký tay, không ký số. Tiêu đề lấy theo đơn vị quản lý (OQ-15). |
