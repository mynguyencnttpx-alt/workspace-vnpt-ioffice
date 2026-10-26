---
type: api-catalog
feature: api-tich-hop-van-ban
status: draft
version: 0.3.0
updated: 2026-10-26
links: []
---

# CATALOG NGHIỆP VỤ — BỘ API CHUẨN CUNG CẤP DỮ LIỆU VĂN BẢN CHO HỆ THỐNG TÍCH HỢP

> Phiên bản 0.3.0 (bản nháp) · Cập nhật 26/10/2026 · Người lập: @mynguyen.cntt.px

## 0. Thông tin chung

### 0.1. Mục tiêu

Thay cách làm hiện tại (mỗi đơn vị yêu cầu thì dựng 1 bộ API riêng) bằng **1 bộ API chung** dùng cho mọi đơn vị. Phần khác nhau giữa các đơn vị (tập dữ liệu, trường thông tin, tiêu chí lọc, giới hạn truy cập) được khai báo trong **Hồ sơ tích hợp** của từng đơn vị (Mục 9), không phải viết code mới.

Catalog gồm 5 thành phần dùng chung:

| # | Thành phần | Trả lời câu hỏi | Mục |
|---|---|---|---|
| 1 | Danh mục API chuẩn | Có những API nào, mỗi API làm gì | 3 |
| 2 | Danh mục trường thông tin (Field Catalog) | Hệ thống trả ra được những trường nào | 4 |
| 3 | Danh mục tiêu chí lọc (Filter Catalog) | Đơn vị được lọc theo điều kiện nào | 5 |
| 4 | Bộ mã giá trị chuẩn | Trạng thái, vai trò, loại… mang mã gì | 6 |
| 5 | Chuẩn phản hồi, mã lỗi và giới hạn truy cập | Kết quả trả về, lỗi và ngưỡng giới hạn ra sao | 7, 8 |

### 0.2. Nguồn tổng hợp

Catalog được rút từ 6 bộ API/yêu cầu thực tế đã làm hoặc đã nhận:

| Mã nguồn | Đơn vị | Tài liệu | Ghi chú |
|---|---|---|---|
| [VNP] | VNPOST | `12. VNPOST/.../10.Core/MyNT_Review_API_VNPOST_15092026.doc` (Yêu cầu API từ E-Office v1.0, 03/09/2026) | 4 API: ds văn bản đi đã ban hành, chi tiết, tải file, thống kê số lượng |
| [LSN] | LSN (Sở KH&CN) | `17.LSN/.../20.CR/Tong_hop_API_tich_hop_iOffice.docx` | 7 API: token, đơn vị, chức vụ, người dùng, chi tiết VB, log xử lý, ds VB |
| [QTI] | Quảng Trị | `API_QTI.postman_collection (2).json` | 11 request Postman, chưa có mô tả trường trả về |
| [HCM] | TP.HCM | `20260801_Tài_liệu_tích_hợp_API_Chia_sẻ_dữ_liệu_phần_mềm_IOFFICE.docx` | Tài liệu hướng dẫn kết nối có căn cứ pháp lý, mã lỗi, giới hạn truy cập |
| [LĐ] | Lâm Đồng [GIẢ ĐỊNH — suy từ tên miền `qlvb.lamdong.gov.vn` trong mẫu dữ liệu] | `CUNG CẤP API DANH SÁCH VĂN BẢN ĐẾN - ĐI.docx` | 2 API ds văn bản đến/đi, mô tả ngắn |
| [KGLV] | Nội bộ — Không gian làm việc số | `Dac_ta_API_khonggianlamvieco_LONGNG03102026.xlsx` (ảnh chụp) | 6 API theo vai trò: lãnh đạo/chuyên viên, văn thư |

### 0.3. Quyết định đã chốt

| # | Nội dung | Chốt |
|---|---|---|
| D1 | Định dạng ngày | `dd/mm/yyyy`; ngày giờ `dd/mm/yyyy HH:mm:ss` |
| D2 | Tên trường nghiệp vụ | Tiếng Việt không dấu, chữ thường, nối bằng gạch dưới (`so_ky_hieu`) |
| D3 | Tên kỹ thuật chuẩn quốc tế (vỏ phản hồi, phân trang, token) | Giữ tiếng Anh: `success`, `code`, `message`, `data`, `pagination`, `page`, `page_size`, `access_token` |
| D4 | API đã cấp cho đơn vị cũ | Giữ nguyên, không sửa (tránh làm hỏng tích hợp đang chạy). Đơn vị mới dùng bộ chuẩn; đơn vị cũ chuyển dần khi có CR |
| D5 | Thêm trường/tiêu chí mới | Chỉ được **thêm**, không đổi tên hay xóa trường đã công bố |
| D6 | Cách trả file đính kèm | Mặc định chỉ trả thông tin file, nội dung tải riêng qua VB-05. Hồ sơ được bật trả kèm nội dung Base64, nhưng **chỉ ở VB-02 và VB-04**, không bao giờ ở danh sách VB-01. Không cung cấp đường dẫn tải trực tiếp vì đường dẫn trần không kiểm soát được quyền truy cập |
| D7 | Phạm vi catalog 1.0 | Chỉ đối tượng **văn bản** và các danh mục dùng chung. Công việc, trao đổi thông tin để sang catalog 1.1, dùng Phụ lục B làm nền |
| D8 | Vỏ phản hồi chuẩn | `success` · `code` · `message` · `data` · `pagination` (Mục 7.1) — khuôn [LSN] thêm trường `code` |
| D9 | Các trường ngày của văn bản | Văn bản đi: `ngay_van_ban` + `ngay_ban_hanh`. Văn bản đến: `ngay_van_ban` + `ngay_den`. Bỏ trường gộp `ngay_den_di` |
| D10 | Trạng thái văn bản đi (tầng đơn vị) | Chỉ 2 trạng thái: `CHUA_PHAT_HANH`, `DA_PHAT_HANH` |
| D11 | Vai trò xử lý | 4 mã: `CHI_DAO`, `XU_LY_CHINH` (gộp xử lý chính và chủ trì), `PHOI_HOP`, `XEM_DE_BIET` |
| D12 | Đồng bộ gia tăng văn bản | Không cung cấp — văn bản không có thời điểm cập nhật cuối. Hệ thống ngoài đồng bộ văn bản theo khoảng ngày (F12). Hạn chế đã biết: không phát hiện được văn bản cũ vừa thay đổi (thêm file, đổi trạng thái) nếu ngày của văn bản nằm ngoài khoảng đang quét. Danh mục đơn vị, chức vụ, người dùng vẫn đồng bộ gia tăng được |
| D13 | Tên văn bản | Là trích yếu, không có trường riêng. `tenVanBan` của [LĐ] ánh xạ vào `trich_yeu` |
| D14 | Định danh schema | DM-01 trả `ma_schema`, `agent_id`, `ten_schema`, `id_don_vi_goc`, `trang_thai`. Mọi API chuẩn chỉ nhận `ma_schema`; `agent_id` chỉ để đối chiếu với tích hợp cũ |
| D15 | Yêu cầu trường / tiêu chí lọc ngoài hồ sơ | Từ chối cả yêu cầu: lỗi `FIELD_NOT_ALLOWED` / `FILTER_NOT_ALLOWED` kèm tên trường bị từ chối. Khi thu hẹp hồ sơ của đơn vị đang chạy, phải báo trước cho đơn vị đó |
| D16 | Giới hạn số lượt gọi | Có giới hạn, cấu hình theo từng hồ sơ, vượt thì trả `RATE_LIMITED`. Con số mặc định do dev đề xuất sau khi đo tải |
| D17 | Thời hạn token | Mặc định 30 phút (`expires_in` = 1800), chỉnh được theo hồ sơ |

### 0.4. Điểm còn chờ chốt

Xem Mục 11. Các chỗ chờ chốt trong tài liệu được đánh dấu **[CẦN CHỐT]**; chỗ suy luận được đánh dấu **[GIẢ ĐỊNH]**.

---

## 1. Hai trục phân biệt cốt lõi

Đối chiếu 6 nguồn cho thấy mọi yêu cầu đều là tổ hợp của 2 trục sau. Đây là cơ sở để gộp nhiều API riêng lẻ thành 1 API.

### 1.1. Trục "Phạm vi dữ liệu" — ai đang nhìn dữ liệu

| Phạm vi | Ý nghĩa nghiệp vụ | Xác thực tương ứng | Nguồn |
|---|---|---|---|
| `DON_VI` | Lấy dữ liệu ở mức toàn đơn vị/schema, không gắn với 1 người dùng. Dùng cho đồng bộ, báo cáo, lưu trữ | Tài khoản hệ thống cấp cố định cho đơn vị tích hợp | [VNP] [QTI] [HCM]-văn bản đi [LĐ] [KGLV]-văn thư (`Mã_Đơn_vị`) |
| `CA_NHAN` | Lấy đúng phần dữ liệu **1 người dùng được phép thấy** hoặc **đang phải xử lý**, theo phân quyền sẵn có trên iOffice | Tài khoản người dùng đang có trên iOffice | [LSN]-API-07 (`userid`) [HCM]-văn bản đến (`userId`) [KGLV]-lãnh đạo/chuyên viên (`User_ID/Token`) |

Phạm vi được xác định từ **loại token**, đơn vị tích hợp không tự chọn được phạm vi rộng hơn token cho phép.

### 1.2. Trục "Hàng đợi xử lý" — có lọc theo việc cần làm hay không

| Kiểu | Ý nghĩa | Ví dụ |
|---|---|---|
| Danh sách theo điều kiện | Lấy văn bản theo khoảng ngày, loại, đơn vị… | "Danh sách văn bản đi đã phát hành" [HCM], "ds văn bản đến theo phòng ban" [QTI] |
| Hàng đợi của tôi | Lấy văn bản đang chờ 1 người/văn thư xử lý, đúng như menu trên iOffice | "Văn bản đến cần xử lý", "Văn bản đến cần vào sổ" [KGLV], trạng thái `CXL/DXL/DBH` [LSN] |

Hàng đợi chỉ áp dụng khi phạm vi là `CA_NHAN`, hoặc `DON_VI` với tài khoản văn thư (vào sổ, phát hành).

---

## 2. Danh mục đối tượng dữ liệu

| Mã | Đối tượng | Vai trò trong catalog | Phiên bản |
|---|---|---|---|
| OBJ-01 | Văn bản (đến và đi) | Đối tượng chính | 0.1 |
| OBJ-02 | File đính kèm | Khối con của văn bản | 0.1 |
| OBJ-03 | Văn bản liên quan | Khối con của văn bản | 0.1 |
| OBJ-04 | Log xử lý (luồng xử lý) | Khối con của văn bản | 0.1 |
| OBJ-05 | Người đã xem | Khối con của văn bản | 0.1 |
| OBJ-06 | Schema (cơ quan/đơn vị sử dụng hệ thống) | Danh mục dùng chung | 0.1 |
| OBJ-07 | Đơn vị / phòng ban | Danh mục dùng chung | 0.1 |
| OBJ-08 | Người dùng | Danh mục dùng chung | 0.1 |
| OBJ-09 | Chức vụ | Danh mục dùng chung | 0.1 |
| OBJ-10 | Danh mục nghiệp vụ (lĩnh vực, hình thức, độ khẩn) | Danh mục dùng chung | 0.1 |
| OBJ-11 | Công việc | Ngoài phạm vi 1.0 (D7) — bản nháp ở Phụ lục B | 1.1 |
| OBJ-12 | Trao đổi thông tin | Ngoài phạm vi 1.0 (D7) — bản nháp ở Phụ lục B | 1.1 |

---

## 3. Danh mục API chuẩn

> Đường dẫn dưới đây là tên nghiệp vụ đề xuất. Tiền tố đường dẫn thật (vd `/api/tich-hop/v1`) do nhóm phát triển chốt, bảo đảm không trùng API đang chạy cho [LSN]/[HCM] (đều đang dùng `/api/v1`). [GIẢ ĐỊNH]

| Mã API | Tên | Phương thức / đường dẫn | Phạm vi | Thay thế cho các API riêng lẻ |
|---|---|---|---|---|
| AUTH-01 | Cấp token | `POST /auth/token` | — | [LSN] API-00 · [QTI] connecteoffice · [HCM] third-party/login · [LĐ] `tokenAuthen` |
| DM-01 | Danh sách schema được cấp | `GET /schema` | DON_VI | [QTI] getlistschema |
| DM-02 | Cây đơn vị / phòng ban | `GET /don-vi` | DON_VI | [LSN] API-01 · [QTI] getlistunit |
| DM-03 | Danh mục chức vụ | `GET /chuc-vu` | DON_VI | [LSN] API-03 |
| DM-04 | Danh sách người dùng | `GET /nguoi-dung` | DON_VI | [LSN] API-04 |
| DM-05 | Danh mục nghiệp vụ (lĩnh vực, hình thức, độ khẩn) | `GET /danh-muc/{loai_danh_muc}` | DON_VI | Mới — [VNP] ghi rõ "cần đồng bộ danh mục lĩnh vực / hình thức của iOffice để lấy đúng mã khi lọc" nhưng chưa có API nào cung cấp |
| VB-01 | Tìm kiếm danh sách văn bản | `POST /van-ban/tim-kiem` | Cả hai | [VNP] API 1 · [LSN] API-07 · [QTI] 5 API ds văn bản đến/đi/theo phòng ban · [HCM] incoming, outgoing · [LĐ] 2 API · [KGLV] 4 API danh sách văn bản |
| VB-02 | Chi tiết 1 văn bản | `GET /van-ban/{id_van_ban}` | Cả hai | [VNP] API 2 · [LSN] API-05 |
| VB-03 | Log xử lý của văn bản | `GET /van-ban/{id_van_ban}/log-xu-ly` | Cả hai | [LSN] API-06 · [QTI] getactivitylog |
| VB-04 | Danh sách file của văn bản | `GET /van-ban/{id_van_ban}/files` | Cả hai | [QTI] getfileattach |
| VB-05 | Tải file | `GET /files/{id_file}` | Cả hai | [VNP] API 3 · [QTI] download |
| VB-06 | Thống kê số lượng văn bản | `POST /van-ban/thong-ke` | DON_VI | [VNP] API 4 |

### 3.1. AUTH-01 — Cấp token

**Nghiệp vụ:** đơn vị tích hợp đổi thông tin định danh lấy token có thời hạn; mọi API khác bắt buộc gửi kèm token ở header `Authorization: Bearer {access_token}`.

| Chế độ | Thông tin gửi lên | Token mang theo |
|---|---|---|
| `DON_VI` | `client_id`, `client_secret` | Hồ sơ tích hợp + schema/đơn vị được cấp |
| `CA_NHAN` | `client_id`, `client_secret`, `ten_dang_nhap`, `mat_khau` | Hồ sơ tích hợp + định danh người dùng → áp nguyên phân quyền của người đó trên iOffice |

**Kết quả trả về:** `access_token`, `token_type` (`Bearer`), `expires_in` (giây), `refresh_token` (nếu hồ sơ bật).

**Quy tắc:**
- Hồ sơ quy định đơn vị được dùng chế độ nào (1 trong 2, hoặc cả hai).
- Token chỉ gửi ở header, **không** gửi trong tham số đường dẫn hay thân yêu cầu (khác cách [LĐ] đang truyền `tokenAuthen` như 1 tham số).
- Khi gọi API ở chế độ `CA_NHAN`, nếu yêu cầu có trường người dùng khác với người dùng trong token → từ chối, mã `USER_MISMATCH` (theo quy tắc 403 đã có ở [HCM]).
- Ghi nhật ký mọi lượt cấp token ([LSN]).

### 3.2. DM-01 — Danh sách schema được cấp

**Nghiệp vụ:** trả danh sách schema (cơ quan/đơn vị sử dụng hệ thống) mà token được phép truy cập, để đơn vị tích hợp không phải nhận mã schema thủ công qua công văn.

**Trường trả về (D14):**

| Mã trường | Tên nghiệp vụ | Kiểu | Quy tắc lấy dữ liệu | Tên đã dùng |
|---|---|---|---|---|
| `ma_schema` | Mã schema | Chuỗi | Mã duy nhất mọi API chuẩn nhận ở tiêu chí F01 | `schema` [LSN-07] · tên schema trong đường dẫn connecteoffice [QTI] |
| `agent_id` | Mã agent | Số | Trả để đối chiếu với tích hợp cũ; API chuẩn **không** nhận mã này | `agent_id` [LSN-01, 03, 04] |
| `ten_schema` | Tên cơ quan / đơn vị dùng schema | Chuỗi | | |
| `id_don_vi_goc` | ID đơn vị gốc của schema | Chuỗi | Dùng làm điểm bắt đầu khi gọi DM-02 lấy cây đơn vị | |
| `trang_thai` | Trạng thái | Mã (Mục 6.9) | | |

### 3.3. DM-02 → DM-04 — Danh mục đơn vị, chức vụ, người dùng

Giữ nguyên nghiệp vụ đã thiết kế ở [LSN] API-01, API-03, API-04 (trường chi tiết ở Mục 4.7 → 4.9), bổ sung:
- Tham số `cap_nhat_tu` để lấy riêng bản ghi thay đổi từ 1 thời điểm (đồng bộ gia tăng — nguyên tắc chung đã nêu ở [LSN] nhưng chưa khai trong bảng tham số).
- DM-02 trả cả đơn vị và phòng ban trong cùng 1 cây (phòng ban là nút con của đơn vị — đúng cách [LSN] xác định `id_phong_ban` = đơn vị trực tiếp của người dùng). Luồng gọi của [LSN] có nhắc `/phong-ban` nhưng tài liệu không có API này → không cần API riêng.

### 3.4. DM-05 — Danh mục nghiệp vụ

`loai_danh_muc` nhận 1 trong: `LINH_VUC`, `HINH_THUC_VAN_BAN`, `DO_KHAN`. Trả `ma`, `ten`, `trang_thai`. Mục đích: đơn vị tích hợp lấy đúng mã để truyền vào tiêu chí lọc F10, F11 (Mục 5).

### 3.5. VB-01 — Tìm kiếm danh sách văn bản

**Nghiệp vụ:** 1 API duy nhất thay cho toàn bộ API danh sách đang tách theo đến/đi, theo phòng ban, theo người dùng, theo trạng thái. Điều kiện lọc lấy từ Filter Catalog (Mục 5), trường trả về lấy từ Field Catalog (Mục 4).

**Tham số điều khiển kết quả:**

| Tham số | Ý nghĩa | Mặc định |
|---|---|---|
| `goi_truong` | Bộ trường dựng sẵn: `CO_BAN` (nhóm Cơ bản Mục 4.1) hoặc `DAY_DU` (toàn bộ trường hồ sơ cho phép) | `CO_BAN` |
| `truong` | Danh sách trường cụ thể muốn lấy, thay cho `goi_truong` | — |
| `kem_theo` | Khối con lấy kèm mỗi văn bản: `files`, `van_ban_lien_quan`, `nguoi_xem` | Không kèm |
| `page`, `page_size` | Phân trang | 1, 20 |
| `sap_xep` | Trường sắp xếp + chiều (`ngay_tao:giam`) | Ngày tạo giảm dần ([LSN] API-07) |

**Quy tắc:**
- Trường/khối/tiêu chí nằm ngoài hồ sơ của đơn vị → từ chối với mã `FIELD_NOT_ALLOWED` / `FILTER_NOT_ALLOWED`, liệt kê tên trường bị từ chối (D15). Không trả kết quả một phần.
- Khối `log_xu_ly` **không** lấy kèm ở danh sách (nặng); dùng VB-02 hoặc VB-03.
- Danh sách không trả nội dung file (chỉ thông tin file), kể cả khi hồ sơ bật trả nội dung file (D6).

### 3.6. VB-02 — Chi tiết 1 văn bản

**Nghiệp vụ:** trả thông tin 1 văn bản theo `id_van_ban`. Nhận cùng tham số `truong` / `goi_truong` / `kem_theo` như VB-01, `kem_theo` thêm được `log_xu_ly`. Khi `kem_theo=files` và hồ sơ bật trả nội dung file, mỗi file có thêm `noi_dung_base64` (D6).

**Quy tắc:** văn bản nằm ngoài phạm vi token (khác schema, khác đơn vị được cấp, hoặc người dùng không có quyền xem) → `FORBIDDEN_SCOPE`; không tồn tại → `NOT_FOUND`. Không trả khối phân trang (khác [VNP] API 2 đang trả `Pagination` ở API chi tiết).

### 3.7. VB-03 — Log xử lý

Giữ nghiệp vụ [LSN] API-06:
- Trả mọi người dùng/đơn vị tham gia xử lý văn bản, kèm vai trò xử lý.
- Chỉ lấy log trong phạm vi đơn vị nhận theo token; văn bản đã chuyển sang đơn vị nhận độc lập khác thì **không** lấy log ở đơn vị đó.
- Thứ tự: thời gian nhận tăng dần.
- Lọc tùy chọn theo `vai_tro_xu_ly` (F17).
- Trả dạng cây khi có quan hệ chuyển tiếp: dùng `id_nguoi_dung_cha` (rỗng = cấp gốc).
- Phân biệt được vai trò chỉ đạo / chủ trì / phối hợp lấy từ toàn bộ nhật ký xử lý ([KGLV] ghi chú: "lấy toàn bộ dcm_activity_log để phân biệt tài khoản đó là chỉ đạo hay chủ trì hay phối hợp").

### 3.8. VB-04, VB-05 — File đính kèm

- VB-04 trả danh sách file của 1 văn bản (trường Mục 4.4); hồ sơ bật trả nội dung file thì mỗi file có thêm `noi_dung_base64` (D6).
- VB-05 trả nội dung file theo `id_file` — đây là cách lấy nội dung file mặc định (D6). Kiểm tra file thuộc văn bản nằm trong phạm vi token trước khi trả.
- Không cung cấp đường dẫn tải trực tiếp: mọi lượt lấy nội dung file đều đi qua VB-05 hoặc VB-02 / VB-04 để kiểm quyền và ghi nhật ký (NFR-08).
- Quy tắc chọn file: lấy file ở mục **File đính kèm**, **File phát hành** và **File tờ trình / Trình ký**; **không** lấy file của văn bản liên quan ([VNP] + [LSN] gộp lại). Thứ tự: thời gian cập nhật file giảm dần.

### 3.9. VB-06 — Thống kê số lượng văn bản

Giữ nghiệp vụ [VNP] API 4:
- Văn bản đi: đếm văn bản có đơn vị ban hành = đơn vị cần thống kê, theo ngày ban hành.
- Văn bản đến: đếm văn bản được giao cho đơn vị, theo ngày đến, tách được theo vai trò nhận (tổng, xử lý chính, phối hợp, xem để biết) và theo trạng thái (chưa xử lý, đang xử lý, đã hoàn tất — đúng số liệu Báo cáo văn bản đến).
- Lọc thêm theo lĩnh vực, hình thức.
- Trường trả về: `id_don_vi`, `ten_don_vi`, `loai_van_ban`, `trang_thai_van_ban` (rỗng với văn bản đi), `vai_tro_xu_ly`, `so_luong`.
- Tham số `nhom_theo` (đơn vị / trạng thái / vai trò) để trả nhiều dòng trong 1 lần gọi. [GIẢ ĐỊNH] — [VNP] chỉ yêu cầu trả 1 con số mỗi lần gọi.

---

## 4. Danh mục trường thông tin (Field Catalog)

**Nhóm trường** dùng để phân quyền trong hồ sơ tích hợp:
- **CB — Cơ bản:** định danh văn bản, hầu hết đơn vị đều cần; nằm trong `goi_truong=CO_BAN`.
- **MR — Mở rộng:** cấp theo nhu cầu.
- **NC — Nhạy cảm:** chứa thông tin cá nhân hoặc nội dung; chỉ cấp khi đơn vị chủ quản đồng ý bằng văn bản.

Cột **Tên đã dùng** ghi tên trường các nguồn đang dùng cho cùng khái niệm, phục vụ đối chiếu khi chuyển đơn vị cũ sang bộ chuẩn.

### 4.1. Văn bản — thông tin chung (đến và đi)

| Mã trường | Tên nghiệp vụ | Kiểu | Nhóm | Quy tắc lấy dữ liệu | Tên đã dùng |
|---|---|---|---|---|---|
| `id_van_ban` | ID văn bản | Chuỗi | CB | ID duy nhất của văn bản trên iOffice | `id_van_ban` [VNP][LSN] · `id` [LSN-07][LĐ] |
| `loai_van_ban` | Văn bản đến / đi | Mã (Mục 6.1) | CB | | `cong_van_den_di` 0/1 [VNP][LSN-05] · `congvan_dendi` [LSN-07] · `loai_vb` 1/2 [LSN-07 input] |
| `so_ky_hieu` | Số, ký hiệu | Chuỗi | CB | | `so_ky_hieu` · `soKyHieu` |
| `trich_yeu` | Trích yếu | Chuỗi | CB | Tên văn bản và trích yếu là một trường (D13) | `trich_yeu` · `trichYeu` · `tenVanBan` [LĐ] |
| `so_den_di` | Số đến / số đi | Chuỗi | CB | Văn bản đến: số đến trong sổ; văn bản đi: số đi | `so_den_di` · `soDenDi` · `soDen` [HCM] |
| `ngay_van_ban` | Ngày văn bản | Ngày | CB | Ngày ghi trên văn bản | `ngay_van_ban` · `ngayVB` · `ngayVanBan` [LĐ] |
| `ma_hinh_thuc_van_ban` | Mã hình thức | Mã (DM-05) | CB | | `ma_hinh_thuc_van_ban` · `maHinhThuc` |
| `hinh_thuc_van_ban` | Tên hình thức | Chuỗi | CB | Công văn, Quyết định, Tờ trình… | `hinh_thuc_van_ban` · `hinhThucVB` · `loaiVanBan` [HCM] · "Loại văn bản" [KGLV] (dễ nhầm với đến/đi) |
| `id_linh_vuc` | Mã lĩnh vực | Mã (DM-05) | MR | | (VNP chỉ có ở tham số lọc) |
| `linh_vuc` | Tên lĩnh vực | Chuỗi | MR | Có thể rỗng | `linh_vuc` · `linhVuc` |
| `do_khan` | Độ khẩn | Mã (Mục 6.6) | CB | Thường, Khẩn, Hỏa tốc | `do_khan` · `doKhan` · "Mức độ khẩn" [KGLV] |
| `id_don_vi_ban_hanh` | ID đơn vị ban hành | Chuỗi | CB | Có giá trị khi đơn vị ban hành nằm trong hệ thống; rỗng khi văn bản đến từ trục liên thông hoặc nhập tay từ văn bản giấy | `Id_don_vi_ban_hanh` [VNP][LSN] |
| `ten_don_vi_ban_hanh` | Tên đơn vị / cơ quan ban hành | Chuỗi | CB | | `don_vi_ban_hanh` · `coQuanBH` · `donViBanHanh` |
| `trang_thai_van_ban` | Trạng thái văn bản (tầng đơn vị) | Mã (Mục 6.2) | CB | | `trangThai` [HCM] · "Trạng thái xử lý" [VNP-API4] |
| `ngay_tao` | Ngày tạo trên hệ thống | Ngày giờ | MR | Dùng làm sắp xếp mặc định | (ngầm định ở [LSN-07]) |

### 4.2. Văn bản — chỉ có ở văn bản đến

| Mã trường | Tên nghiệp vụ | Kiểu | Nhóm | Quy tắc lấy dữ liệu | Tên đã dùng |
|---|---|---|---|---|---|
| `ngay_den` | Ngày đến | Ngày | CB | Ngày đơn vị tiếp nhận văn bản (D9) | `ngay_den_di` · `ngayDenDi` [VNP][LSN] · `ngayDen` [HCM][LĐ] · "Thời gian đến" [KGLV] |
| `han_xu_ly` | Hạn xử lý | Ngày | MR | | "Hạn xử lý" [KGLV] |
| `trang_thai_ca_nhan` | Trạng thái xử lý của người dùng trong token | Mã (Mục 6.3) | MR | Chỉ có ở phạm vi `CA_NHAN` | `trang_thai` CXL/DXL/DBH [LSN-07] |
| `vai_tro_cua_toi` | Vai trò của người dùng trong token với văn bản | Mã (Mục 6.4) | MR | Chỉ có ở phạm vi `CA_NHAN` | "Vai trò" [KGLV] |

### 4.3. Văn bản — chỉ có ở văn bản đi

| Mã trường | Tên nghiệp vụ | Kiểu | Nhóm | Quy tắc lấy dữ liệu | Tên đã dùng |
|---|---|---|---|---|---|
| `ngay_ban_hanh` | Ngày ban hành | Ngày | CB | Ngày văn bản đi được ban hành / phát hành (D9) | `ngay_den_di` · `ngayDenDi` [VNP][LSN] · `ngayBanHanh` [HCM][LĐ] |
| `nguoi_soan` | Người soạn thảo | Chuỗi | MR | | "Người soạn" [KGLV] |
| `id_don_vi_soan_thao` | ID phòng ban soạn thảo | Chuỗi | MR | | |
| `ten_don_vi_soan_thao` | Tên phòng ban / đơn vị soạn thảo | Chuỗi | MR | | `donViSoanThao` [HCM] · "Phòng ban soạn thảo" [KGLV] |
| `ngay_soan_thao` | Ngày soạn thảo | Ngày | MR | | `ngaySoanThao` [HCM] · [KGLV] |
| `ngay_trinh` | Ngày trình | Ngày | MR | Ngày văn bản được chuyển tới người dùng trong token ([KGLV] ghi chú) | "Ngày trình" [KGLV] |
| `nguoi_ky` | Người ký | Chuỗi | CB | Mặc định lấy người ký văn thư nhập ở ô **Người ký** trên form thông tin văn bản; văn bản lãnh đạo mới chuyển xuống thì lấy lãnh đạo gần nhất ký chuyển xuống ([KGLV] ghi chú) | `Nguoi_ky` [VNP] · "Người ký" [KGLV] |
| `ngay_ky` | Ngày ký | Ngày | MR | Ngày lãnh đạo ký số; không ký số → ngày chuyển ([KGLV] ghi chú) | "Ngày ký" [KGLV] |
| `don_vi_nhan` | Danh sách cá nhân / đơn vị nhận | Danh sách chuỗi | MR | | `donViNhan` [HCM] |

### 4.4. Khối `files[]` — file đính kèm

| Mã trường | Tên nghiệp vụ | Kiểu | Nhóm | Quy tắc lấy dữ liệu | Tên đã dùng |
|---|---|---|---|---|---|
| `id_file` | ID file | Chuỗi | CB | | `id` (mọi nguồn) |
| `ten_file` | Tên file | Chuỗi | CB | `{tên}.{đuôi}` | `name` |
| `dinh_dang` | Định dạng file | Chuỗi | CB | pdf, docx, png… | `contentType` [HCM] |
| `dung_luong` | Dung lượng (byte) | Số | CB | | `size` [HCM] |
| `is_ky_so` | Có chữ ký số | Mã 0/1 | CB | 1 nếu file có ít nhất 1 chữ ký số | `Is_ky_so` [VNP][LSN] · `isKySo` [LSN-07] |
| `nguoi_ky` | Người ký số | Chuỗi | MR | Rỗng nếu chưa ký | `Nguoi_ky` [LSN] · `nguoiKy` |
| `email_nguoi_ky` | Email người ký số | Chuỗi | NC | Lấy từ thông tin cá nhân của người ký | `Email_nguoi_ky` [LSN] · `emailNguoiKy` |
| `noi_dung_base64` | Nội dung file mã hóa Base64 | Chuỗi | NC | Chỉ trả ở VB-02 / VB-04 khi hồ sơ bật; không bao giờ trả ở VB-01 (D6) | `contentBase64` [HCM] |

Không có trường đường dẫn tải trực tiếp (D6). Đơn vị đang dùng `tepDinhKem` [LĐ] chuyển sang `id_file` + VB-05.

### 4.5. Khối `van_ban_lien_quan[]`

| Mã trường | Tên nghiệp vụ | Kiểu | Nhóm | Quy tắc lấy dữ liệu | Tên đã dùng |
|---|---|---|---|---|---|
| `id_van_ban_lien_quan` | ID văn bản liên quan | Chuỗi | MR | Văn bản gắn ở mục **Văn bản liên quan**; rỗng khi đơn vị chưa phản hồi | [VNP][LSN] |
| `so_ky_hieu` | Số, ký hiệu | Chuỗi | MR | | [VNP][LSN] |
| `trich_yeu` | Trích yếu | Chuỗi | MR | | [VNP][LSN] |
| `loai_quan_he` | Loại quan hệ | Mã (Mục 6.7) | MR | | [LSN] |
| `id_don_vi_ban_hanh` | ID đơn vị ban hành / phản hồi | Chuỗi | MR | Rỗng nếu đơn vị ngoài hệ thống | [VNP][LSN] |
| `ten_don_vi_ban_hanh` | Tên đơn vị ban hành / phản hồi | Chuỗi | MR | Vd tên xã, phường | [VNP][LSN] |
| `ngay_ban_hanh` | Ngày ban hành / phản hồi | Ngày | MR | | [VNP][LSN] |
| `trang_thai_phan_hoi` | Trạng thái phản hồi | Mã (Mục 6.8) | MR | Phục vụ theo dõi 1 công văn đã có bao nhiêu đơn vị phản hồi ([LSN]) | [LSN] |

### 4.6. Khối `log_xu_ly[]` và `nguoi_xem[]`

| Mã trường | Tên nghiệp vụ | Kiểu | Nhóm | Quy tắc lấy dữ liệu | Tên đã dùng |
|---|---|---|---|---|---|
| `id_nguoi_dung` | ID người xử lý | Chuỗi | MR | | [LSN-06] |
| `ten_dang_nhap` | Tên đăng nhập | Chuỗi | MR | | [LSN-06] |
| `ho_ten` | Họ tên | Chuỗi | MR | | [LSN-06] |
| `vai_tro_xu_ly` | Vai trò xử lý | Mã (Mục 6.4) | MR | | [LSN-06] |
| `id_don_vi`, `ten_don_vi` | Đơn vị của người xử lý | Chuỗi | MR | Đơn vị cha của phòng ban | [LSN-06] |
| `id_phong_ban`, `ten_phong_ban` | Phòng ban của người xử lý | Chuỗi | MR | Đơn vị trực tiếp người dùng trực thuộc | [LSN-06] |
| `id_don_vi_nhan`, `ten_don_vi_nhan` | Đơn vị nhận | Chuỗi | MR | Dòng log giao cho đơn vị (không phải cá nhân) | [LSN-06] |
| `id_nguoi_dung_cha` | Người chuyển cho | Chuỗi | MR | Rỗng = cấp gốc | [LSN-06] |
| `thu_tu_hien_thi` | Thứ tự | Số | MR | | [LSN-06] |
| `thoi_gian_nhan` | Thời gian nhận | Ngày giờ | MR | | [LSN-06] |
| `thoi_gian_xu_ly` | Thời gian kết thúc / chuyển tiếp | Ngày giờ | MR | | [LSN-06] |
| `nguoi_xem[]` | Danh sách tài khoản đã mở xem văn bản | Danh sách chuỗi | NC | | `nguoiXem` [LSN-07] |

### 4.7. Đơn vị / phòng ban (DM-02)

| Mã trường | Tên nghiệp vụ | Kiểu | Quy tắc lấy dữ liệu | Nguồn |
|---|---|---|---|---|
| `id_don_vi` | ID đơn vị | Chuỗi | | [LSN-01] |
| `ma_don_vi_nghiep_vu` | Mã định danh đơn vị | Chuỗi | Rỗng nếu đơn vị chưa có mã ([LSN] ghi "không có truyền 0" — đề xuất trả rỗng cho rõ nghĩa) | [LSN-01] |
| `ten_don_vi` | Tên đầy đủ | Chuỗi | | [LSN-01] |
| `ten_viet_tat` | Ký hiệu đơn vị | Chuỗi | | [LSN-01] |
| `id_don_vi_cha` | ID đơn vị cha | Chuỗi | Rỗng = cấp gốc | [LSN-01] |
| `cap_don_vi` | Cấp trong cây | Số | Gốc là cấp 1 | [LSN-01] |
| `thu_tu_hien_thi` | Thứ tự | Số | Theo cây đơn vị trong quản trị | [LSN-01] |
| `trang_thai` | Trạng thái | Mã (Mục 6.9) | | [LSN-01] |
| `ngay_cap_nhat_cuoi` | Cập nhật cuối | Ngày giờ | Không có thì lấy ngày tạo | [LSN-01] |

### 4.8. Người dùng (DM-04)

| Mã trường | Tên nghiệp vụ | Kiểu | Nhóm | Quy tắc lấy dữ liệu | Nguồn |
|---|---|---|---|---|---|
| `id_nguoi_dung` | ID người dùng | Chuỗi | CB | | [LSN-04] |
| `ten_dang_nhap` | Tên đăng nhập | Chuỗi | CB | | [LSN-04] |
| `ho_ten` | Họ tên | Chuỗi | CB | | [LSN-04] |
| `email` | Email công vụ | Chuỗi | NC | Bắt buộc là email công vụ (dùng cho đăng nhập 1 lần) | [LSN-04] |
| `so_dien_thoai` | Số điện thoại | Chuỗi | NC | | [LSN-04] |
| `id_don_vi`, `ten_don_vi` | Đơn vị | Chuỗi | CB | Đơn vị cha của phòng ban | [LSN-04] |
| `id_phong_ban`, `ten_phong_ban` | Phòng ban | Chuỗi | CB | | [LSN-04] |
| `id_chuc_vu`, `ten_chuc_vu` | Chức vụ | Chuỗi | CB | | [LSN-04] |
| `vai_tro_nghiep_vu` | Vai trò trên iOffice | Chuỗi | MR | Trưởng đơn vị, Lãnh đạo đơn vị, Văn thư, Chuyên viên | [LSN-04] |
| `trang_thai_tai_khoan` | Trạng thái tài khoản | Mã (Mục 6.9) | CB | | [LSN-04] |
| `ngay_cap_nhat_cuoi` | Cập nhật cuối | Ngày giờ | CB | | [LSN-04] |

### 4.9. Chức vụ (DM-03)

`id_chuc_vu`, `ma_chuc_vu_nghiep_vu`, `ten_chuc_vu`, `loai_vi_tri`, `cap_bac_uu_tien` (thứ tự hiển thị trong quản trị), `trang_thai`, `ngay_cap_nhat_cuoi` — giữ như [LSN-03]. Bỏ `id_don_vi_ap_dung`, `id_phong_ban_ap_dung` vì iOffice không có dữ liệu này ([LSN] ghi rõ luôn trả rỗng).

---

## 5. Danh mục tiêu chí lọc (Filter Catalog)

**Kiểu so khớp:** `BANG` (đúng 1 giá trị) · `TRONG` (thuộc danh sách nhiều giá trị) · `CHUA` (tìm tương đối, chứa chuỗi) · `KHOANG` (từ – đến).

| Mã | Tham số | Ý nghĩa | So khớp | Ràng buộc | Tên đã dùng |
|---|---|---|---|---|---|
| F01 | `ma_schema` | Schema cần lấy | BANG | Mặc định lấy từ token; chỉ truyền khi token được cấp nhiều schema, và phải thuộc hồ sơ. Chỉ nhận `ma_schema`, không nhận `agent_id` (D14) | `agent_id` [LSN] · `schema` [LSN-07] · đường dẫn connecteoffice [QTI] |
| F02 | `loai_van_ban` | Đến / đi | TRONG | Không truyền = cả hai (nếu hồ sơ cho phép) | `cong_van_den_di` [VNP] · `loai_vb` [LSN-07] · tách API [QTI][HCM][LĐ] |
| F03 | `tu_khoa` | Tìm tự do trên trích yếu + số ký hiệu | CHUA | | `tuKhoa` [LĐ] |
| F04 | `trich_yeu` | Trích yếu | CHUA | | [VNP] · `trichYeu` [LSN-07] |
| F05 | `so_ky_hieu` | Số, ký hiệu | CHUA | | [VNP] · `soKyHieu` [LSN-07] |
| F06 | `so_den_di` | Số đến / đi | CHUA | | `soDenDi` [LSN-07] |
| F07 | `id_don_vi_ban_hanh` | Đơn vị ban hành | TRONG | | [VNP] |
| F08 | `id_don_vi` + `bao_gom_cap_duoi` | Đơn vị / phòng ban sở hữu hoặc được giao văn bản; có lấy cả đơn vị con không | TRONG | Phải nằm trong phạm vi đơn vị của hồ sơ | `unitId` [QTI] · `maDonVi` [LĐ] · "Đơn vị lấy báo cáo" [VNP-API4] · `Mã_Đơn_vị` [KGLV] |
| F09 | `nguoi_ky` | Người ký ban hành | BANG | | `tenTaiKhoan` [LĐ] |
| F10 | `id_linh_vuc` | Lĩnh vực | TRONG | Mã lấy từ DM-05 | [VNP] (chỉ 1 giá trị → chuẩn cho nhiều) |
| F11 | `ma_hinh_thuc_van_ban` | Hình thức | TRONG | Mã lấy từ DM-05 | [VNP] |
| F12 | `tu_ngay`, `den_ngay`, `loai_ngay` | Khoảng ngày và loại ngày áp khoảng | KHOANG | `tu_ngay` ≤ `den_ngay`; `tu_ngay` không sau ngày hiện tại; khoảng tối đa theo hồ sơ (mặc định 30 ngày) | [VNP] · `ngayVanBan`/`denNgayVanBan` [LSN-07] · `startDate`/`endDate` [QTI][HCM] · `tuNgay`/`denNgay` [LĐ] · [KGLV] |
| F13 | `cap_nhat_tu` | Chỉ lấy bản ghi thay đổi từ thời điểm này | KHOANG | Chỉ áp cho danh mục DM-02 → DM-04; **không** áp cho văn bản (D12) | `updated_from` [LSN] |
| F14 | `trang_thai_van_ban` | Trạng thái tầng đơn vị | TRONG | | [VNP-API4] · `trangThai` [HCM] |
| F15 | `trang_thai_ca_nhan` | Trạng thái xử lý của người dùng trong token | TRONG | **Chỉ áp ở phạm vi `CA_NHAN`**; không truyền = toàn bộ văn bản người dùng được xem (danh sách Tra cứu văn bản) | `trang_thai` [LSN-07] · "Chờ xử lý" [KGLV] |
| F16 | `ten_dang_nhap` | Người dùng | BANG | Chỉ áp ở phạm vi `CA_NHAN`; khác người dùng trong token → `USER_MISMATCH` | `userid` [LSN-07] · `userId` [HCM] |
| F17 | `vai_tro_xu_ly` | Vai trò xử lý | TRONG | | [LSN-06] · vai trò nhận [VNP-API4] |
| F18 | `do_khan` | Độ khẩn | TRONG | | Mới — [GIẢ ĐỊNH] chưa nguồn nào yêu cầu lọc, chỉ trả ra |

`loai_ngay` nhận: `NGAY_VAN_BAN` (cả hai loại), `NGAY_BAN_HANH` (chỉ văn bản đi), `NGAY_DEN` (chỉ văn bản đến), `NGAY_TAO`. Mặc định: văn bản đi lọc theo ngày ban hành, văn bản đến lọc theo ngày đến (theo quy tắc [VNP-API4]). Tìm cả đến và đi cùng lúc mà không truyền `loai_ngay` thì mỗi loại áp ngày mặc định của mình (D9).

---

## 6. Bộ mã giá trị chuẩn

### 6.1. `loai_van_ban`

| Mã | Ý nghĩa | Giá trị cũ |
|---|---|---|
| `DEN` | Văn bản đến | `0` [VNP][LSN-05][LSN-07 output] · `2` [LSN-07 input] |
| `DI` | Văn bản đi | `1` [VNP][LSN-05][LSN-07 output] · `1` [LSN-07 input] |

Dùng mã chữ thay cho số vì [LSN] đang có 2 quy ước ngược nhau trong cùng 1 bộ (`0`=đến ở kết quả trả về, `2`=đến ở tham số lọc).

### 6.2. `trang_thai_van_ban` — tầng đơn vị

| Loại | Mã | Ý nghĩa | Nguồn |
|---|---|---|---|
| Đến | `CHO_VAO_SO` | Văn thư chưa vào sổ | [KGLV] |
| Đến | `CHUA_XU_LY` | Đã giao, chưa ai xử lý | [VNP-API4] Báo cáo văn bản đến |
| Đến | `DANG_XU_LY` | Đang xử lý | [VNP-API4] |
| Đến | `DA_HOAN_TAT` | Đã hoàn tất | [VNP-API4] |
| Đi | `CHUA_PHAT_HANH` | Mọi văn bản đi chưa phát hành, gồm cả đang dự thảo, trình ký, chờ văn thư phát hành (D10) | [KGLV] |
| Đi | `DA_PHAT_HANH` | Đã phát hành (D10) | [VNP][HCM][LĐ] |

Văn bản đi chỉ có 2 trạng thái ở tầng đơn vị (D10). Muốn lấy đúng văn bản đi đang chờ 1 người hoặc văn thư xử lý thì dùng trạng thái cá nhân `CHO_XU_LY` (Mục 6.3). Hồ sơ nào được thấy `CHUA_PHAT_HANH` thì sẽ thấy cả văn bản đang dự thảo, nên chỉ cấp khi đơn vị chủ quản đồng ý.

### 6.3. `trang_thai_ca_nhan` — tầng người dùng

| Mã | Ý nghĩa — tương ứng menu trên iOffice | Giá trị cũ |
|---|---|---|
| `CHO_XU_LY` | Văn bản đến/đi người dùng chưa chuyển, chưa kết thúc hoặc chưa cho ý kiến. Gồm văn bản chuyển tới cá nhân hoặc tới đơn vị mà cá nhân có quyền tiếp nhận | `CXL` [LSN-07] · "Chờ xử lý" [HCM][KGLV] |
| `DA_XU_LY` | Văn bản người dùng đã xử lý | `DXL` [LSN-07] · "Đã xử lý" [HCM] |
| `DA_BAN_HANH` | Văn bản người dùng có tham gia và đã ban hành | `DBH` [LSN-07] |
| `CHO_VAO_SO` | Văn bản đến chờ văn thư vào sổ | [KGLV] |

Tách 6.2 và 6.3 vì [VNP] (đếm theo đơn vị) và [LSN-07] (lọc theo người dùng) đang cùng gọi là "trạng thái xử lý" nhưng là 2 khái niệm khác nhau.

### 6.4. `vai_tro_xu_ly`

| Mã | Ý nghĩa | Giá trị cũ |
|---|---|---|
| `CHI_DAO` | Chỉ đạo | [KGLV] |
| `XU_LY_CHINH` | Xử lý chính / chủ trì | `XLC` [LSN-06 input] · `CHU_TRI` [LSN-06 mẫu] |
| `PHOI_HOP` | Phối hợp | `PH` [LSN-06 input] · `PHOI_HOP` [LSN-06 mẫu] |
| `XEM_DE_BIET` | Xem để biết | `XEM` [LSN-06] |

Đã chốt D11: 4 mã trên. `XLC` và `CHU_TRI` của [LSN-06] gộp chung vào `XU_LY_CHINH`.

### 6.5. Phạm vi và chế độ xác thực

`DON_VI`, `CA_NHAN` — xem Mục 1.1.

### 6.6. `do_khan`

`THUONG`, `KHAN`, `THUONG_KHAN`, `HOA_TOC` — **[CẦN CHỐT]** Mục 11 câu Q13: bộ mã đầy đủ lấy từ DM-05 của iOffice; [LSN-07] mới thấy "Thường, Khẩn, Hỏa tốc", mức "Thượng khẩn" là **[GIẢ ĐỊNH]** theo các mức độ khẩn thường dùng trong văn bản hành chính.

### 6.7. `loai_quan_he` (văn bản liên quan)

`PHAN_HOI` (văn bản phản hồi), `KHAC` (liên quan khác) — theo [LSN].

### 6.8. `trang_thai_phan_hoi`

`DA_PHAN_HOI`, `CHUA_PHAN_HOI` — theo [LSN].

### 6.9. Trạng thái danh mục

| Đối tượng | Mã | Nguồn |
|---|---|---|
| Đơn vị | `HOAT_DONG`, `NGUNG_HOAT_DONG` (đã khóa), `DA_XOA` (không còn trên cây) | [LSN-01] |
| Tài khoản | `HOAT_DONG`, `KHOA` | [LSN-04] |
| Chức vụ | `HOAT_DONG` | [LSN-03] |

---

## 7. Chuẩn phản hồi và mã lỗi

### 7.1. Vỏ phản hồi chung

Áp cho mọi API, trừ VB-05 (trả thẳng file). Đã chốt D8: theo khuôn [LSN] (gần chuẩn REST nhất trong các kiểu đang dùng — Phụ lục A6), thêm trường `code`. Mọi API chuẩn dùng chung 1 vỏ này, kể cả khi lỗi.

| Trường | Kiểu | Ý nghĩa |
|---|---|---|
| `success` | Đúng/sai | Kết quả xử lý |
| `code` | Chuỗi | `OK` khi thành công; mã lỗi Mục 7.2 khi thất bại |
| `message` | Chuỗi | Mô tả kết quả / lỗi, tiếng Việt |
| `data` | Đối tượng / danh sách | Dữ liệu trả về; rỗng khi lỗi |
| `pagination` | Đối tượng | Chỉ ở API danh sách: `page`, `page_size`, `total_records`, `total_pages` |

Mẫu thành công:

```json
{
  "success": true,
  "code": "OK",
  "message": "Thành công",
  "data": [
    {
      "id_van_ban": "2012300",
      "loai_van_ban": "DI",
      "so_ky_hieu": "349/THADS-NV",
      "trich_yeu": "V/v thống kê, báo cáo kết quả công tác",
      "ngay_van_ban": "25/03/2026",
      "ten_don_vi_ban_hanh": "Thi hành án dân sự tỉnh Lạng Sơn"
    }
  ],
  "pagination": { "page": 1, "page_size": 20, "total_records": 1, "total_pages": 1 }
}
```

Mẫu lỗi:

```json
{
  "success": false,
  "code": "INVALID_DATE_RANGE",
  "message": "Khoảng ngày tìm kiếm vượt quá 30 ngày",
  "data": null
}
```

### 7.2. Danh mục mã lỗi

| HTTP | `code` | Khi nào | Nguồn |
|---|---|---|---|
| 200 | `OK` | Thành công | Mọi nguồn |
| 400 | `INVALID_PARAM` | Thiếu tham số bắt buộc, sai định dạng | [LSN][HCM] |
| 400 | `INVALID_DATE_RANGE` | `tu_ngay` > `den_ngay`, `tu_ngay` sau hôm nay, vượt khoảng tối đa | [HCM] |
| 401 | `UNAUTHORIZED` | Thiếu token, sai thông tin đăng nhập | [LSN][HCM] |
| 401 | `TOKEN_EXPIRED` | Token hết hạn | [LSN][HCM] |
| 403 | `FORBIDDEN_SCOPE` | Văn bản / schema / đơn vị ngoài phạm vi hồ sơ, hoặc người dùng không có quyền xem | [LSN] |
| 403 | `FIELD_NOT_ALLOWED` | Yêu cầu trường hoặc khối con ngoài hồ sơ | Mới |
| 403 | `FILTER_NOT_ALLOWED` | Dùng tiêu chí lọc ngoài hồ sơ | Mới |
| 403 | `USER_MISMATCH` | Người dùng trong yêu cầu khác người dùng trong token | [HCM] |
| 403 | `IP_NOT_ALLOWED` | IP gọi không thuộc danh sách cho phép | [HCM] |
| 403 | `OUTSIDE_TIME_WINDOW` | Gọi ngoài khung giờ hồ sơ cho phép | [HCM] |
| 404 | `NOT_FOUND` | Không có văn bản / file | [LSN] |
| 429 | `RATE_LIMITED` | Vượt số lượt gọi cho phép | [HCM] |
| 500 | `INTERNAL_ERROR` | Lỗi hệ thống | [LSN][HCM] |
| 503 | `SERVICE_UNAVAILABLE` | Kho file hoặc dịch vụ phụ thuộc không sẵn sàng | [HCM] |

---

## 8. Yêu cầu chung về an toàn và giới hạn truy cập

| Mã | Yêu cầu | Giá trị mặc định | Cấu hình theo hồ sơ | Nguồn |
|---|---|---|---|---|
| NFR-01 | Toàn bộ kết nối qua HTTPS | Bắt buộc | Không | [LSN][HCM] |
| NFR-02 | Thời hạn token | 30 phút, tức `expires_in` = 1800 (D17) | Có | [LSN] |
| NFR-03 | Số bản ghi tối đa mỗi trang | 100 (mặc định 20) | Có | [HCM][LSN-07] |
| NFR-04 | Khoảng ngày tối đa mỗi lần tìm | 30 ngày | Có | [HCM] |
| NFR-05 | Khung giờ được gọi API lấy dữ liệu | Không giới hạn | Có (vd [HCM] chỉ cho 23h – 5h) | [HCM] |
| NFR-06 | Số lượt gọi tối đa theo thời gian | Mỗi hồ sơ có ngưỡng riêng; vượt ngưỡng trả `RATE_LIMITED` (D16). Con số mặc định chờ dev đo tải | Có | [HCM] |
| NFR-07 | Danh sách IP được phép gọi | Không giới hạn | Có | [HCM] |
| NFR-08 | Ghi nhật ký mọi lượt cấp token và gọi API (ai, lúc nào, API nào, tham số, số bản ghi trả) | Bắt buộc | Không | [LSN] |
| NFR-09 | Token chỉ truyền ở header | Bắt buộc | Không | Rút từ [LĐ] |
| NFR-10 | Trường nhóm NC chỉ cấp khi đơn vị chủ quản đồng ý bằng văn bản | Bắt buộc | Không | Mới |

**Căn cứ pháp lý** (theo [HCM]): Nghị định 47/2020/NĐ-CP về quản lý, kết nối và chia sẻ dữ liệu số; Nghị định 278/2025/NĐ-CP; Khung Kiến trúc Chính phủ điện tử Việt Nam phiên bản 3.0.

---

## 9. Hồ sơ tích hợp (Integration Profile)

Mỗi đơn vị tích hợp có 1 hồ sơ. Đây là nơi **duy nhất** chứa phần khác nhau giữa các đơn vị.

### 9.1. Nội dung hồ sơ

| Nhóm | Thông tin | Ví dụ |
|---|---|---|
| Định danh | Mã hồ sơ, tên đơn vị tích hợp, đầu mối liên hệ, văn bản đề nghị (số, ngày) | HS-LSN-01, Sở KH&CN, CV …/SKHCN-CĐS |
| Xác thực | `client_id`, chế độ được dùng (`DON_VI` / `CA_NHAN` / cả hai), danh sách IP được phép | `CA_NHAN` + `DON_VI` |
| Phạm vi dữ liệu | Schema được cấp, đơn vị gốc + có lấy đơn vị con, loại văn bản (đến / đi), trạng thái bắt buộc | Chỉ văn bản đi `DA_PHAT_HANH` |
| API được dùng | Danh sách mã API Mục 3 | VB-01, VB-02, VB-05 |
| Trường được lấy | Danh sách trường + khối con | Nhóm CB + `files` + `van_ban_lien_quan` |
| Tiêu chí được lọc | Danh sách mã F Mục 5 + giá trị lọc cố định (nếu có) | F04, F05, F07, F10, F11, F12 |
| Cách trả file | Chỉ thông tin + tải riêng qua VB-05 (mặc định) / bật kèm nội dung Base64 ở VB-02, VB-04 (D6) | Chỉ thông tin + tải riêng |
| Giới hạn | Khoảng ngày tối đa, số bản ghi/trang, khung giờ, số lượt gọi | 30 ngày, 100, 23h – 5h |
| Hiệu lực | Từ ngày – đến ngày, trạng thái hồ sơ (đang dùng / tạm dừng / thu hồi) | |

### 9.2. Kiểm chứng: dựng lại 6 nguồn bằng hồ sơ, không cần API riêng

| Nguồn – API cũ | Dựng lại bằng | Tham số / cấu hình hồ sơ |
|---|---|---|
| [VNP] API 1 – ds văn bản đi đã ban hành | VB-01 | Hồ sơ: `DON_VI`, loại `DI`, trạng thái cố định `DA_PHAT_HANH`, kèm `files` + `van_ban_lien_quan`. Lọc F04, F05, F07, F10, F11, F12 (`loai_ngay=NGAY_BAN_HANH`) |
| [VNP] API 2 – chi tiết | VB-02 | `kem_theo=files,van_ban_lien_quan` |
| [VNP] API 3 – tải file | VB-05 | |
| [VNP] API 4 – số lượng theo trạng thái | VB-06 | F08, F02, F10, F11, F14, F12 |
| [LSN] API-00 → 06 | AUTH-01, DM-02 → DM-04, VB-02, VB-03 | Giữ nghiệp vụ, đổi tên trường theo Mục 4 |
| [LSN] API-07 – ds văn bản theo người dùng | VB-01 | Token `CA_NHAN`; F02, F15 (`CHO_XU_LY` / `DA_XU_LY` / `DA_BAN_HANH`), F04, F05, F06, F12 (`NGAY_VAN_BAN`); kèm `files`, `nguoi_xem` |
| [QTI] getlistschema / getlistunit | DM-01 / DM-02 | |
| [QTI] ds văn bản đến, đi | VB-01 | F02 + F12 |
| [QTI] ds văn bản đến / đi theo phòng ban | VB-01 | F02 + F12 + F08 (`id_don_vi=100`) — 4 API cũ còn 1 |
| [QTI] getactivitylog / getfileattach / download | VB-03 / VB-04 / VB-05 | |
| [HCM] outgoing – văn bản đi đã phát hành | VB-01 | `DON_VI`, loại `DI`, `DA_PHAT_HANH`; hồ sơ: khoảng tối đa 30 ngày, khung giờ 23h – 5h, 100 bản ghi/trang, kèm `files` (chỉ thông tin file). Nội dung file lấy qua VB-04 với hồ sơ bật Base64 — khác cách [HCM] đang nhúng Base64 ngay trong danh sách (D6). [GIẢ ĐỊNH] [HCM] hiện đăng nhập bằng tài khoản người dùng cho cả 2 API; catalog đề xuất văn bản đi dùng `DON_VI` vì lấy toàn hệ thống, không theo quyền 1 người |
| [HCM] incoming – văn bản đến đã / chờ xử lý | VB-01 | Token `CA_NHAN`; F15 (`CHO_XU_LY`, `DA_XU_LY`); F12 |
| [LĐ] ds văn bản đến / đi | VB-01 + VB-05 | F02, F08, F09, F03, F12; kèm `files`. Đường dẫn `tepDinhKem` thay bằng `id_file` + VB-05 (D6) |
| [KGLV] Lãnh đạo, chuyên viên – văn bản đến cần xử lý | VB-01 | `CA_NHAN`, loại `DEN`, F15 `CHO_XU_LY`, F12; trường thêm `han_xu_ly`, `do_khan`; luồng xử lý qua VB-03 |
| [KGLV] Lãnh đạo, chuyên viên – văn bản đi cần xử lý | VB-01 | `CA_NHAN`, loại `DI`, F15 `CHO_XU_LY`; trường thêm `nguoi_soan`, `ten_don_vi_soan_thao`, `ngay_trinh`, `ngay_soan_thao` |
| [KGLV] Văn thư – văn bản đến cần vào sổ | VB-01 | `DON_VI` (tài khoản văn thư), loại `DEN`, F14 `CHO_VAO_SO` |
| [KGLV] Văn thư – văn bản đi cần xử lý | VB-01 | Token `CA_NHAN` của tài khoản văn thư, loại `DI`, F15 `CHO_XU_LY` (D10 — tầng đơn vị không có trạng thái riêng cho bước văn thư); trường `nguoi_ky`, `ngay_ky`, `hinh_thuc_van_ban` |
| [KGLV] Công việc, trao đổi thông tin | Ngoài phạm vi 1.0 (D7) | Phụ lục B — làm nền cho catalog 1.1 |

Kết quả: **31 API/request riêng lẻ** ở 6 nguồn ([VNP] 4 · [LSN] 7 · [QTI] 11 · [HCM] 3 · [LĐ] 2 · [KGLV] 4 về văn bản) quy về **12 API chuẩn** + hồ sơ cấu hình.

### 9.3. Quy trình tiếp nhận đơn vị mới

| Bước | Việc | Người làm | Kết quả |
|---|---|---|---|
| 1 | Tiếp nhận văn bản đề nghị: cần dữ liệu gì, lọc theo gì, dùng để làm gì | BA | Phiếu nhu cầu |
| 2 | Đối chiếu nhu cầu với Mục 3, 4, 5 | BA | Danh sách khớp / chưa có |
| 3a | Khớp toàn bộ → lập hồ sơ tích hợp | BA + quản trị | Hồ sơ nháp |
| 3b | Có trường / tiêu chí chưa có → đánh giá bổ sung vào catalog (dùng cho mọi đơn vị, không riêng đơn vị này), nâng phiên bản catalog | BA + PO + dev | CR bổ sung catalog |
| 4 | Đơn vị chủ quản duyệt phạm vi dữ liệu, đặc biệt trường nhóm NC | Đơn vị chủ quản | Hồ sơ đã duyệt |
| 5 | Cấp `client_id` / `client_secret` trên môi trường thử nghiệm, đơn vị tích hợp kiểm thử | Quản trị + đơn vị tích hợp | Biên bản kiểm thử |
| 6 | Cấp trên môi trường chính thức, bàn giao tài liệu (sinh từ catalog + hồ sơ) | Quản trị | Đưa vào sử dụng |

---

## 10. Lộ trình áp dụng

| Giai đoạn | Nội dung |
|---|---|
| 1 | Chốt các câu Mục 11, phát hành catalog 1.0 |
| 2 | Xây 12 API chuẩn + chức năng quản trị hồ sơ tích hợp |
| 3 | Áp cho mọi đơn vị mới |
| 4 | Chuyển dần đơn vị cũ khi họ có yêu cầu thay đổi; API cũ chạy song song tới khi đơn vị cũ chuyển xong |

---

## 11. Câu hỏi cần chốt

| # | Câu hỏi | Đề xuất |
|---|---|---|
| Q1 | Cách trả file: (a) chỉ thông tin file + API tải riêng, (b) kèm nội dung Base64, (c) đường dẫn tải trực tiếp | **Đã chốt 26/10/2026 — D6** |
| Q2 | Có đưa công việc, trao đổi thông tin vào catalog không | **Đã chốt 26/10/2026 — D7** |
| Q3 | Vỏ phản hồi chuẩn | **Đã chốt 26/10/2026 — D8** |
| Q4 | `ngay_ban_hanh` và `ngay_van_ban` có phải 1 không | **Đã chốt 26/10/2026 — D9** |
| Q5 | Bộ trạng thái đầy đủ của văn bản đi (dự thảo, trình ký…) | **Đã chốt 26/10/2026 — D10** |
| Q6 | Bộ mã vai trò xử lý chuẩn | **Đã chốt 26/10/2026 — D11** |
| Q7 | Văn bản có lưu thời điểm cập nhật cuối không (để đồng bộ gia tăng F13) | **Đã chốt 26/10/2026 — D12** |
| Q8 | `tenVanBan` của [LĐ] khác `trichYeu` thế nào | **Đã chốt 26/10/2026 — D13** |
| Q9 | Trường trả về của API danh sách schema [QTI] | **Đã chốt 26/10/2026 — D14** |
| Q10 | Yêu cầu trường ngoài hồ sơ: từ chối hay bỏ qua | **Đã chốt 26/10/2026 — D15** |
| Q11 | Ngưỡng số lượt gọi (NFR-06) | **Đã chốt cơ chế 26/10/2026 — D16.** Còn mở: con số mặc định, chờ dev đo tải |
| Q12 | Thời hạn token (NFR-02) | **Đã chốt 26/10/2026 — D17** |
| Q13 | Bộ mã độ khẩn đầy đủ trên iOffice (Mục 6.6) — có mức "Thượng khẩn" không | Lấy từ danh mục độ khẩn của hệ thống |

---

## Phụ lục A. Nhật ký bất nhất phát hiện trong nguồn

Ghi lại để làm căn cứ cho việc chuẩn hóa và để rà khi chuyển đơn vị cũ.

| # | Bất nhất | Nguồn |
|---|---|---|
| A1 | Mã đến/đi ngược nhau trong cùng 1 bộ: kết quả trả `0`=đến, `1`=đi; tham số lọc `1`=đi, `2`=đến | [LSN] API-05 vs API-07 |
| A2 | Cùng chữ "trạng thái xử lý" cho 2 khái niệm: đếm theo đơn vị (chưa / đang / hoàn tất) và lọc theo người dùng (CXL / DXL / DBH) | [VNP] vs [LSN] |
| A3 | Vai trò xử lý khai `XLC/PH/XEM` nhưng mẫu trả `XLC/CHU_TRI/PHOI_HOP` | [LSN] API-06 |
| A4 | Kiểu dữ liệu ghi `Date/Time` cho hình thức, mã hình thức, độ khẩn, lĩnh vực | [LSN] API-05 |
| A5 | 4 định dạng ngày: `HH:mm:ss dd-MM-yyyy` [LSN] · `yyyy-MM-dd` [LSN][LĐ] · `dd/MM/yyyy` [LSN-07][HCM] · `dd/MM/yyyy HH:mm:ss` [QTI] | [LSN] [LĐ] [HCM] [QTI] |
| A6 | Vỏ phản hồi khác nhau: không mô tả vỏ [VNP] · `success/message/data/pagination` [LSN] · `status{code,message}` + `data`, mã thành công `"0"`, mã lỗi dạng số [LSN-07] hoặc dạng chữ [HCM] · `status` chữ + `totalRecords` [LĐ]. [QTI] chưa có mẫu phản hồi | [VNP] [LSN] [HCM] [LĐ] |
| A7 | Lẫn 2 kiểu đặt tên trường trong cùng 1 bộ (`so_ky_hieu` và `soKyHieu`; `Is_ky_so` và `isKySo`) | [LSN] |
| A8 | 5 cách xác thực: không mô tả; OAuth2 trộn `username/password` vào `client_credentials`; token tĩnh ở header + API kết nối theo schema; `userId + password + tokenId`; token truyền như tham số | [VNP] [LSN] [QTI] [HCM] [LĐ] |
| A9 | 3 cách trả file: thông tin + tải riêng; Base64 kèm trong danh sách; 1 đường dẫn duy nhất | [VNP][LSN][QTI] [HCM] [LĐ] |
| A10 | Tên tham số phân trang khác nhau: `page/page_size`, `pageNo/pageRec` | [LSN] vs [LSN-07][HCM] |
| A11 | "Loại văn bản" dùng cho hình thức (Công văn, Thông báo) — trùng chữ với đến/đi | [HCM][KGLV] |
| A12 | API ds văn bản tách theo phòng ban thành API riêng (4 API cho 2 tiêu chí đến/đi × toàn schema/theo phòng ban) | [QTI] |
| A13 | Mô tả tham số `schema` chép nhầm thành "Mã/ID văn bản cần truy vấn log xử lý" | [LSN] API-07 |
| A14 | API chi tiết 1 văn bản vẫn trả khối phân trang | [VNP] API 2 |
| A15 | Mô tả nói `data` là chuỗi mã hóa nhưng mẫu là danh sách đối tượng | [HCM] |
| A16 | Văn bản không có ID riêng — `id` = số ký hiệu; mẫu văn bản đi có `trichYeu` = số ký hiệu, nội dung trích yếu thật nằm ở `tenVanBan` (lỗi chép — D13) | [LĐ] |
| A17 | Thời hạn token ghi 30 phút nhưng mẫu `expires_in` = 3600 giây | [LSN] |
| A18 | Luồng gọi nhắc `/phong-ban` nhưng không có API này; đánh số nhảy từ API-01 sang API-03 | [LSN] |

## Phụ lục B. Đối tượng mở rộng (ngoài phạm vi 1.0 — nền cho catalog 1.1, D7)

Rút từ [KGLV]. Chỉ áp phạm vi `CA_NHAN`.

### B.1. Công việc — "Danh sách công việc cần xử lý"

| Trường | Ghi chú từ [KGLV] |
|---|---|
| Mã công việc | Hệ thống hiện chưa có mã công việc |
| Tên công việc | |
| Người giao, ngày giao | |
| Hạn hoàn thành | |
| Tiến độ (%) | Hệ thống hiện chưa có tiến độ %; không có thì trả đủ trạng thái công việc thay thế |
| Vai trò | Xử lý chính / phối hợp / theo dõi |
| Loại công việc | |
| Trạng thái | Danh sách gồm mọi trạng thái; có tham số lọc hoặc trả giá trị trạng thái |

Tiêu chí lọc: người dùng (token), trạng thái công việc, từ ngày – đến ngày.

### B.2. Trao đổi thông tin — "Danh sách trao đổi thông tin chưa đọc"

| Trường | Ghi chú từ [KGLV] |
|---|---|
| Người gửi | |
| Tiêu đề | |
| Nội dung | Nhóm NC |
| Thời gian gửi | |
| Trạng thái đọc | Đã đọc / chưa đọc |

Nguồn dữ liệu: menu **Thông tin điều hành**. Tiêu chí lọc: người dùng (token), khoảng thời gian, trạng thái đọc.
