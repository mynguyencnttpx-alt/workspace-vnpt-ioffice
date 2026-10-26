---
type: api-catalog
feature: api-tich-hop-van-ban
status: draft
version: 0.6.0
updated: 2026-10-26
links: []
---

# CATALOG NGHIỆP VỤ — BỘ API CHUẨN CUNG CẤP DỮ LIỆU VĂN BẢN CHO HỆ THỐNG TÍCH HỢP

> Phiên bản 0.6.0 (bản nháp) · Cập nhật 26/10/2026 · Người lập: @mynguyen.cntt.px

## 0. Thông tin chung

### 0.1. Mục tiêu

Bộ API chuẩn cung cấp dữ liệu văn bản và danh mục dùng chung của VNPT iOffice cho các hệ thống tích hợp. Bộ API dùng chung cho mọi đơn vị:

- **Khách hàng mới:** dùng ngay bộ API này, không xây API riêng.
- **Đơn vị đang dùng các API riêng lẻ đã cấp trước đây:** chuyển dần sang bộ API này (Mục 10).

Phần khác nhau giữa các đơn vị (tập dữ liệu, trường thông tin, tiêu chí lọc, giới hạn truy cập) được khai báo trong **Hồ sơ tích hợp** của từng đơn vị (Mục 9), không phải viết code mới.

Catalog gồm 5 thành phần:

| # | Thành phần | Trả lời câu hỏi | Mục |
|---|---|---|---|
| 1 | Danh mục API chuẩn | Có những API nào, mỗi API nhận gì, trả gì | 3 |
| 2 | Danh mục trường thông tin (Field Catalog) | Hệ thống trả ra được những trường nào | 4 |
| 3 | Danh mục tiêu chí lọc (Filter Catalog) | Đơn vị được lọc theo điều kiện nào | 5 |
| 4 | Bộ mã giá trị chuẩn | Trạng thái, vai trò, loại… mang mã gì | 6 |
| 5 | Chuẩn phản hồi, mã lỗi và giới hạn truy cập | Kết quả trả về, lỗi và ngưỡng giới hạn ra sao | 7, 8 |

### 0.2. Phạm vi

| Trong phạm vi bản 1.0 | Ngoài phạm vi bản 1.0 |
|---|---|
| Văn bản đến, văn bản đi và các khối con: file đính kèm, văn bản liên quan, log xử lý, người đã xem | Công việc, trao đổi thông tin — dự kiến bản 1.1 (Phụ lục A) |
| Danh mục dùng chung: schema, đơn vị / phòng ban, người dùng, chức vụ, lĩnh vực, hình thức, độ khẩn | Ghi dữ liệu vào iOffice (bộ API này chỉ đọc) |
| Thống kê số lượng văn bản | |

### 0.3. Quyết định thiết kế đã chốt

| # | Nội dung | Chốt |
|---|---|---|
| D1 | Định dạng ngày | `dd/mm/yyyy`; ngày giờ `dd/mm/yyyy HH:mm:ss` |
| D2 | Tên trường nghiệp vụ | Tiếng Việt không dấu, chữ thường, nối bằng gạch dưới (`so_ky_hieu`) |
| D3 | Tên kỹ thuật theo thông lệ quốc tế (vỏ phản hồi, phân trang, token) | Giữ tiếng Anh: `success`, `code`, `message`, `data`, `pagination`, `page`, `page_size`, `access_token` |
| D4 | Các API riêng lẻ đã cấp trước đây | Giữ nguyên, chạy song song, không sửa. Đơn vị đang dùng chuyển dần sang bộ API này khi có yêu cầu thay đổi (Mục 10) |
| D5 | Thêm trường / tiêu chí mới | Chỉ được **thêm**, không đổi tên hay xóa trường đã công bố |
| D6 | Cách trả file đính kèm | Mặc định chỉ trả thông tin file, nội dung tải riêng qua VB-05. Hồ sơ được bật trả kèm nội dung Base64, nhưng **chỉ ở VB-02 và VB-04**, không bao giờ ở danh sách VB-01. Không cung cấp đường dẫn tải trực tiếp vì đường dẫn trần không kiểm soát được quyền truy cập |
| D7 | Phạm vi bản 1.0 | Chỉ đối tượng **văn bản** và các danh mục dùng chung. Công việc, trao đổi thông tin để sang bản 1.1, dùng Phụ lục A làm nền |
| D8 | Vỏ phản hồi chuẩn | `success` · `code` · `message` · `data` · `pagination` (Mục 7.1), dùng chung cho mọi API, kể cả khi lỗi |
| D9 | Các trường ngày của văn bản | Văn bản đi: `ngay_van_ban` + `ngay_ban_hanh`. Văn bản đến: `ngay_van_ban` + `ngay_den` |
| D10 | Trạng thái văn bản đi (tầng đơn vị) | Chỉ 2 trạng thái: `CHUA_PHAT_HANH`, `DA_PHAT_HANH` |
| D11 | Vai trò xử lý | 4 mã: `CHI_DAO`, `XU_LY_CHINH` (xử lý chính / chủ trì), `PHOI_HOP`, `XEM_DE_BIET` |
| D12 | Đồng bộ gia tăng văn bản | Không cung cấp — văn bản không có thời điểm cập nhật cuối. Hệ thống ngoài đồng bộ văn bản theo khoảng ngày (F12). Hạn chế: không phát hiện được văn bản cũ vừa thay đổi (thêm file, đổi trạng thái) nếu ngày của văn bản nằm ngoài khoảng đang quét. Danh mục đơn vị, chức vụ, người dùng vẫn đồng bộ gia tăng được (F13) |
| D13 | Tên văn bản | Tên văn bản chính là trích yếu, không có trường riêng |
| D14 | Định danh agent | Mọi API nhận agent bằng 1 trong 2 mã: `agent_id` (id agent, dạng số) hoặc `ma_schema` (tên schema, vd `qlvb_hni_schema`). Hai mã tương đương nhau |
| D15 | Yêu cầu trường / tiêu chí lọc ngoài hồ sơ | Từ chối cả yêu cầu: lỗi `FIELD_NOT_ALLOWED` / `FILTER_NOT_ALLOWED` kèm tên trường bị từ chối. Khi thu hẹp hồ sơ của đơn vị đang chạy, phải báo trước cho đơn vị đó |
| D16 | Giới hạn số lượt gọi | Có giới hạn, cấu hình theo từng hồ sơ, vượt thì trả `RATE_LIMITED`. Con số mặc định do dev đề xuất sau khi đo tải |
| D17 | Thời hạn token | Mặc định 30 phút (`expires_in` = 1800), chỉnh được theo hồ sơ |
| D18 | Chọn phạm vi trong chế độ `DON_VI` | **Toàn agent:** chỉ truyền định danh agent (F01), không truyền `id_don_vi`. **1 đơn vị con:** truyền thêm `id_don_vi`, kèm `bao_gom_cap_duoi` nếu lấy cả các đơn vị cấp dưới (F08). Áp chung cho mọi API có lọc theo đơn vị (Mục 1.3) |
| D19 | Văn bản đi của 1 đơn vị con | Đơn vị độc lập: theo sổ văn bản đi riêng của đơn vị đó. Phòng ban (độc lập phụ thuộc hoặc phụ thuộc): 2 cách tính, chọn qua `cach_tinh_van_ban_di` (F19) — theo đơn vị soạn thảo (mặc định) hoặc theo người tạo thuộc đơn vị |
| D20 | Văn bản đến chuyển xuống đơn vị độc lập | Mỗi sổ văn bản là 1 bản ghi riêng. Lấy toàn agent trả cả bản ghi ở sổ agent và bản ghi ở sổ đơn vị độc lập; mỗi bản ghi có `id_don_vi_so_huu` / `ten_don_vi_so_huu` để hệ thống ngoài phân biệt và gộp |

### 0.4. Quy ước đánh dấu

Chỗ chờ chốt được đánh dấu **[CẦN CHỐT]** (danh sách ở Mục 11); chỗ suy luận được đánh dấu **[GIẢ ĐỊNH]**.

---

## 1. Mô hình phạm vi dữ liệu

Mọi nhu cầu lấy dữ liệu văn bản đều là tổ hợp của 2 trục dưới đây. Nhờ đó 1 API danh sách (VB-01) phục vụ được mọi nhu cầu, thay vì tách API theo đến/đi, theo phòng ban, theo người dùng hay theo trạng thái.

### 1.1. Trục "Phạm vi dữ liệu" — ai đang nhìn dữ liệu

| Phạm vi | Ý nghĩa nghiệp vụ | Xác thực tương ứng | Ví dụ sử dụng |
|---|---|---|---|
| `DON_VI` | Lấy dữ liệu ở mức toàn agent hoặc 1 đơn vị con trong agent (Mục 1.3), không gắn với 1 người dùng | Tài khoản hệ thống cấp cố định cho đơn vị tích hợp | Đồng bộ văn bản sang hệ thống khác, báo cáo, lưu trữ, cổng thông tin |
| `CA_NHAN` | Lấy đúng phần dữ liệu **1 người dùng được phép thấy** hoặc **đang phải xử lý**, theo phân quyền sẵn có trên iOffice | Tài khoản người dùng đang có trên iOffice | Không gian làm việc số, ứng dụng của lãnh đạo, chuyên viên, văn thư |

Phạm vi được xác định từ **loại token**; đơn vị tích hợp không tự chọn được phạm vi rộng hơn token cho phép.

### 1.2. Trục "Hàng đợi xử lý" — có lọc theo việc cần làm hay không

| Kiểu | Ý nghĩa | Ví dụ |
|---|---|---|
| Danh sách theo điều kiện | Lấy văn bản theo khoảng ngày, loại, đơn vị, hình thức… | Văn bản đi đã phát hành trong tháng; văn bản đến của 1 phòng ban |
| Hàng đợi của tôi | Lấy văn bản đang chờ 1 người dùng xử lý, đúng như các menu xử lý trên iOffice | Văn bản đến cần xử lý; văn bản đi cần xử lý; văn bản đến cần vào sổ |

Hàng đợi dùng trạng thái cá nhân (Mục 6.3) nên chỉ áp ở phạm vi `CA_NHAN`. Riêng văn bản đến chờ vào sổ còn lấy được ở phạm vi `DON_VI` qua trạng thái tầng đơn vị `CHO_VAO_SO` (Mục 6.2).

### 1.3. Hai trường hợp trong phạm vi `DON_VI` — toàn agent hoặc 1 đơn vị con

| Trường hợp | Truyền vào | Kết quả |
|---|---|---|
| Toàn agent | Chỉ định danh agent: `agent_id` (vd `10`) hoặc `ma_schema` (vd `qlvb_hni_schema`) — F01 | Dữ liệu của mọi đơn vị, phòng ban trong agent |
| 1 đơn vị con, chỉ riêng đơn vị đó | Định danh agent + `id_don_vi` — F08 | Dữ liệu của riêng đơn vị / phòng ban đó |
| 1 đơn vị con, gồm cả cấp dưới | Định danh agent + `id_don_vi` + `bao_gom_cap_duoi=true` — F08 | Dữ liệu của đơn vị đó và mọi đơn vị con cháu |

**Quy tắc chung (D18):**
- Áp cho mọi API có lọc theo đơn vị: VB-01, VB-06, DM-02, DM-04.
- `id_don_vi` phải thuộc agent đã chọn; đơn vị không thuộc agent → `INVALID_PARAM`.
- Hồ sơ quyết định đơn vị tích hợp được dùng trường hợp nào:
  - Hồ sơ cấp **toàn agent**: dùng được cả 3 trường hợp.
  - Hồ sơ chỉ cấp **1 nhánh đơn vị**: chỉ truyền định danh agent thì chỉ nhận dữ liệu của nhánh được cấp, không phải toàn agent. Truyền `id_don_vi` ngoài nhánh được cấp → `FORBIDDEN_SCOPE`.

**Loại đơn vị con và cách xác định văn bản của đơn vị X** (loại đơn vị lấy từ trường `loai_don_vi` của DM-02 — Mục 6.10):

| Loại đơn vị con | Đặc điểm | Văn bản đến của X | Văn bản đi của X |
|---|---|---|---|
| Đơn vị độc lập | Có văn thư và sổ văn bản riêng | Văn bản trong sổ văn bản đến của X | Văn bản trong sổ văn bản đi của X (D19) |
| Phòng ban — độc lập phụ thuộc hoặc phụ thuộc | Không có sổ văn bản riêng, dùng sổ của đơn vị cấp trên | Văn bản được chuyển tới X hoặc tới người dùng thuộc X | Tính theo `cach_tinh_van_ban_di` (F19): `DON_VI_SOAN_THAO` (mặc định) — X là phòng ban soạn thảo; `NGUOI_TAO` — người tạo văn bản thuộc X (D19) |

**Văn bản đến chuyển xuống đơn vị độc lập (D20):** văn bản đến của agent được chuyển xuống 1 đơn vị độc lập và vào sổ riêng ở đơn vị đó thì thành 2 bản ghi: 1 ở sổ của agent, 1 ở sổ của đơn vị độc lập (ID và số đến khác nhau). Lấy toàn agent sẽ trả **cả 2 bản ghi**; trường `id_don_vi_so_huu` / `ten_don_vi_so_huu` cho biết mỗi bản ghi thuộc sổ của đơn vị nào. Hệ thống ngoài muốn gộp thì dựa vào số ký hiệu, ngày văn bản và đơn vị ban hành.

---

## 2. Danh mục đối tượng dữ liệu

| Mã | Đối tượng | Vai trò trong catalog | Phiên bản |
|---|---|---|---|
| OBJ-01 | Văn bản (đến và đi) | Đối tượng chính | 1.0 |
| OBJ-02 | File đính kèm | Khối con của văn bản | 1.0 |
| OBJ-03 | Văn bản liên quan | Khối con của văn bản | 1.0 |
| OBJ-04 | Log xử lý (luồng xử lý) | Khối con của văn bản | 1.0 |
| OBJ-05 | Người đã xem | Khối con của văn bản | 1.0 |
| OBJ-06 | Schema (cơ quan / đơn vị sử dụng hệ thống) | Danh mục dùng chung | 1.0 |
| OBJ-07 | Đơn vị / phòng ban | Danh mục dùng chung | 1.0 |
| OBJ-08 | Người dùng | Danh mục dùng chung | 1.0 |
| OBJ-09 | Chức vụ | Danh mục dùng chung | 1.0 |
| OBJ-10 | Danh mục nghiệp vụ (lĩnh vực, hình thức, độ khẩn) | Danh mục dùng chung | 1.0 |
| OBJ-11 | Công việc | Ngoài phạm vi 1.0 (D7) — Phụ lục A | 1.1 |
| OBJ-12 | Trao đổi thông tin | Ngoài phạm vi 1.0 (D7) — Phụ lục A | 1.1 |

---

## 3. Danh mục API chuẩn

> Đường dẫn dưới đây là tên nghiệp vụ. Tiền tố đường dẫn thật (vd `/api/tich-hop/v1`) do nhóm phát triển chốt, bảo đảm không trùng các API riêng lẻ đang chạy. [GIẢ ĐỊNH]

| Mã API | Tên | Phương thức / đường dẫn | Phạm vi | Mô tả ngắn |
|---|---|---|---|---|
| AUTH-01 | Cấp token | `POST /auth/token` | — | Đổi thông tin định danh lấy token có thời hạn |
| DM-01 | Danh sách schema được cấp | `GET /schema` | DON_VI | Các schema token được truy cập |
| DM-02 | Cây đơn vị / phòng ban | `GET /don-vi` | DON_VI | Cây tổ chức kèm quan hệ cha – con |
| DM-03 | Danh mục chức vụ | `GET /chuc-vu` | DON_VI | Chức vụ, chức danh, vị trí công tác |
| DM-04 | Danh sách người dùng | `GET /nguoi-dung` | DON_VI | Người dùng kèm đơn vị, phòng ban, chức vụ |
| DM-05 | Danh mục nghiệp vụ | `GET /danh-muc/{loai_danh_muc}` | DON_VI | Lĩnh vực, hình thức, độ khẩn — lấy đúng mã để lọc |
| VB-01 | Tìm kiếm danh sách văn bản | `POST /van-ban/tim-kiem` | Cả hai | 1 API danh sách cho mọi nhu cầu |
| VB-02 | Chi tiết 1 văn bản | `GET /van-ban/{id_van_ban}` | Cả hai | Thông tin văn bản kèm khối con theo yêu cầu |
| VB-03 | Log xử lý của văn bản | `GET /van-ban/{id_van_ban}/log-xu-ly` | Cả hai | Người / đơn vị tham gia xử lý và vai trò |
| VB-04 | Danh sách file của văn bản | `GET /van-ban/{id_van_ban}/files` | Cả hai | Thông tin file, kèm nội dung nếu hồ sơ bật |
| VB-05 | Tải file | `GET /files/{id_file}` | Cả hai | Nội dung 1 file |
| VB-06 | Thống kê số lượng văn bản | `POST /van-ban/thong-ke` | DON_VI | Đếm văn bản theo đơn vị, trạng thái, vai trò |

**Tham số chung cho mọi API danh sách** (DM-02 → DM-04, VB-01):

| Tham số | Ý nghĩa | Mặc định | Ràng buộc |
|---|---|---|---|
| `page` | Số thứ tự trang, bắt đầu từ 1 | 1 | Số nguyên dương |
| `page_size` | Số bản ghi mỗi trang | 20 | Số nguyên dương, tối đa theo hồ sơ (mặc định 100 — NFR-03) |

### 3.1. AUTH-01 — Cấp token

**Nghiệp vụ:** đơn vị tích hợp đổi thông tin định danh lấy token có thời hạn. Mọi API khác bắt buộc gửi kèm token ở header `Authorization: Bearer {access_token}`.

**Đầu vào:**

| Tham số | Kiểu | Bắt buộc | Mô tả |
|---|---|---|---|
| `client_id` | Chuỗi | Có | Mã định danh hệ thống tích hợp, do iOffice cấp theo hồ sơ |
| `client_secret` | Chuỗi | Có | Khóa bí mật tương ứng `client_id` |
| `ten_dang_nhap` | Chuỗi | Khi dùng chế độ `CA_NHAN` | Tên đăng nhập của người dùng trên iOffice |
| `mat_khau` | Chuỗi | Khi dùng chế độ `CA_NHAN` | Mật khẩu tương ứng |

| Chế độ | Gửi lên | Token mang theo |
|---|---|---|
| `DON_VI` | `client_id`, `client_secret` | Hồ sơ tích hợp + schema / đơn vị được cấp |
| `CA_NHAN` | `client_id`, `client_secret`, `ten_dang_nhap`, `mat_khau` | Hồ sơ tích hợp + định danh người dùng → áp nguyên phân quyền của người đó trên iOffice |

**Đầu ra (`data`):**

| Trường | Kiểu | Mô tả |
|---|---|---|
| `access_token` | Chuỗi | Token dùng cho các lần gọi API |
| `token_type` | Chuỗi | Cố định `Bearer` |
| `expires_in` | Số | Thời gian hiệu lực (giây), mặc định 1800 (D17) |
| `refresh_token` | Chuỗi | Token để xin lại `access_token` — chỉ có khi hồ sơ bật |

**Quy tắc:**
- Hồ sơ quy định đơn vị được dùng chế độ nào (1 trong 2, hoặc cả hai). Dùng chế độ hồ sơ không cho phép → `FORBIDDEN_SCOPE`.
- Sai `client_id` / `client_secret` / tài khoản → `UNAUTHORIZED`. Tài khoản người dùng đang bị khóa → `UNAUTHORIZED`.
- Token chỉ gửi ở header, **không** gửi trong tham số đường dẫn hay thân yêu cầu (NFR-09).
- Ở chế độ `CA_NHAN`, nếu yêu cầu có trường người dùng khác với người dùng trong token → từ chối, mã `USER_MISMATCH`.
- Token hết hạn → `TOKEN_EXPIRED`; hệ thống ngoài xin token mới.
- Ghi nhật ký mọi lượt cấp token, kể cả lượt thất bại (NFR-08).

Mẫu đầu vào:

```json
{
  "client_id": "he_thong_tich_hop_001",
  "client_secret": "xxxxxxxxxxxxxxxx",
  "ten_dang_nhap": "nguyenvana.snv",
  "mat_khau": "xxxxxxxxxxxxxxxx"
}
```

Mẫu đầu ra:

```json
{
  "success": true,
  "code": "OK",
  "message": "Cấp token thành công",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx.yyyyy",
    "token_type": "Bearer",
    "expires_in": 1800
  }
}
```

### 3.2. DM-01 — Danh sách schema được cấp

**Nghiệp vụ:** trả danh sách schema (cơ quan / đơn vị sử dụng hệ thống) mà token được phép truy cập, để đơn vị tích hợp tự lấy mã schema thay vì nhận thủ công qua công văn.

**Đầu vào:** không có tham số.

**Đầu ra (mỗi phần tử trong `data`):**

| Trường | Tên nghiệp vụ | Kiểu | Quy tắc lấy dữ liệu |
|---|---|---|---|
| `agent_id` | ID agent | Số | ID agent trên iOffice; dùng được ở tiêu chí F01 (D14) |
| `ma_schema` | Tên schema | Chuỗi | Vd `qlvb_hni_schema`; dùng được ở tiêu chí F01, tương đương `agent_id` (D14) |
| `ten_schema` | Tên cơ quan / đơn vị dùng schema | Chuỗi | |
| `id_don_vi_goc` | ID đơn vị gốc của schema | Chuỗi | Điểm bắt đầu khi gọi DM-02 lấy cây đơn vị |
| `trang_thai` | Trạng thái | Mã (Mục 6.9) | |

### 3.3. DM-02 — Cây đơn vị / phòng ban

**Nghiệp vụ:** trả cây tổ chức của schema. Phòng ban là nút con của đơn vị, nằm chung 1 cây, không có API phòng ban riêng.

**Đầu vào:**

| Tham số | Kiểu | Bắt buộc | Mô tả |
|---|---|---|---|
| `agent_id` hoặc `ma_schema` | Số / Chuỗi | Theo F01 | Agent cần lấy (F01) |
| `id_don_vi` | Chuỗi | Không | Chỉ trả các đơn vị con cháu của đơn vị này. Không truyền = cả cây của agent (hoặc của nhánh hồ sơ được cấp) |
| `cap_nhat_tu` | Ngày giờ | Không | Chỉ trả đơn vị thay đổi từ thời điểm này — đồng bộ gia tăng (F13) |
| `page`, `page_size` | Số | Không | Phân trang |

**Đầu ra:** trường ở Mục 4.7.

**Quy tắc:**
- Quan hệ cha – con thể hiện qua `id_don_vi_cha` và `cap_don_vi`.
- Thứ tự trả về theo cây đơn vị đang thiết lập trong quản trị iOffice.
- Trả cả đơn vị đã ngừng hoạt động và đã xóa khỏi cây (kèm trạng thái), để hệ thống ngoài đồng bộ được việc khóa / xóa.

### 3.4. DM-03 — Danh mục chức vụ

**Nghiệp vụ:** trả danh mục chức vụ, chức danh, vị trí công tác của schema, dùng để ánh xạ với thông tin người dùng.

**Đầu vào:** `agent_id` hoặc `ma_schema` (F01), `cap_nhat_tu` (F13), `page`, `page_size`.

**Đầu ra:** trường ở Mục 4.9.

**Quy tắc:** sắp xếp theo tên chức vụ, thứ tự bảng chữ cái.

### 3.5. DM-04 — Danh sách người dùng

**Nghiệp vụ:** trả người dùng của schema kèm quan hệ người dùng – đơn vị – phòng ban – chức vụ.

**Đầu vào:**

| Tham số | Kiểu | Bắt buộc | Mô tả |
|---|---|---|---|
| `agent_id` hoặc `ma_schema` | Số / Chuỗi | Theo F01 | Agent cần lấy (F01) |
| `id_don_vi` | Chuỗi | Không | Chỉ trả người dùng trực thuộc trực tiếp đơn vị / phòng ban này. Không truyền = toàn bộ người dùng của agent (hoặc của nhánh hồ sơ được cấp) |
| `bao_gom_cap_duoi` | Đúng/sai | Không | Lấy cả người dùng của đơn vị con cháu. Mặc định: không |
| `cap_nhat_tu` | Ngày giờ | Không | Đồng bộ gia tăng (F13) |
| `page`, `page_size` | Số | Không | Phân trang |

**Đầu ra:** trường ở Mục 4.8.

**Quy tắc:** trả cả tài khoản đã khóa (kèm trạng thái) để hệ thống ngoài đồng bộ được việc khóa tài khoản.

### 3.6. DM-05 — Danh mục nghiệp vụ

**Nghiệp vụ:** trả danh mục để đơn vị tích hợp lấy đúng mã truyền vào tiêu chí lọc F10, F11, F18.

**Đầu vào:** `loai_danh_muc` (đường dẫn) nhận 1 trong `LINH_VUC`, `HINH_THUC_VAN_BAN`, `DO_KHAN`; `agent_id` hoặc `ma_schema` (F01).

**Đầu ra (mỗi phần tử trong `data`):** `ma`, `ten`, `trang_thai` (Mục 6.9).

### 3.7. VB-01 — Tìm kiếm danh sách văn bản

**Nghiệp vụ:** 1 API duy nhất trả danh sách văn bản cho mọi nhu cầu: đến hoặc đi, toàn đơn vị hoặc theo phòng ban, theo người dùng, theo trạng thái, theo hàng đợi xử lý. Tiêu chí lọc lấy từ Mục 5, trường trả về lấy từ Mục 4.

**Đầu vào:** các tiêu chí lọc ở Mục 5, cộng với các tham số điều khiển kết quả:

| Tham số | Ý nghĩa | Mặc định |
|---|---|---|
| `goi_truong` | Bộ trường dựng sẵn: `CO_BAN` (các trường nhóm Cơ bản ở Mục 4.1 → 4.3) hoặc `DAY_DU` (toàn bộ trường hồ sơ cho phép) | `CO_BAN` |
| `truong` | Danh sách trường cụ thể muốn lấy, dùng thay cho `goi_truong` | — |
| `kem_theo` | Khối con lấy kèm mỗi văn bản: `files`, `van_ban_lien_quan`, `nguoi_xem` | Không kèm |
| `page`, `page_size` | Phân trang | 1, 20 |
| `sap_xep` | Trường sắp xếp và chiều, vd `ngay_tao:giam` | Ngày tạo giảm dần |

**Đầu ra:** danh sách văn bản (Mục 4) + `pagination`.

**Quy tắc:**
- Phạm vi `DON_VI`: chỉ truyền định danh agent (F01) = văn bản của toàn agent; truyền thêm `id_don_vi` (F08) = văn bản của 1 đơn vị con (Mục 1.3, D18).
- Trường / khối / tiêu chí nằm ngoài hồ sơ → từ chối cả yêu cầu với mã `FIELD_NOT_ALLOWED` / `FILTER_NOT_ALLOWED`, liệt kê tên trường bị từ chối (D15). Không trả kết quả một phần.
- Khối `log_xu_ly` **không** lấy kèm ở danh sách vì nặng; dùng VB-02 hoặc VB-03.
- Danh sách chỉ trả thông tin file, không trả nội dung file, kể cả khi hồ sơ bật trả nội dung (D6).
- Văn bản thuộc phạm vi `CA_NHAN` mà không truyền trạng thái cá nhân (F15) → trả toàn bộ văn bản người dùng được xem, tương ứng danh sách **Tra cứu văn bản** của người dùng đó trên iOffice.

Mẫu đầu vào (hàng đợi văn bản đến cần xử lý của 1 người dùng):

```json
{
  "loai_van_ban": ["DEN"],
  "trang_thai_ca_nhan": ["CHO_XU_LY"],
  "tu_ngay": "01/10/2026",
  "den_ngay": "26/10/2026",
  "truong": ["id_van_ban", "so_ky_hieu", "trich_yeu", "ten_don_vi_ban_hanh", "ngay_den", "han_xu_ly", "do_khan"],
  "page": 1,
  "page_size": 20
}
```

### 3.8. VB-02 — Chi tiết 1 văn bản

**Nghiệp vụ:** trả thông tin 1 văn bản theo `id_van_ban`.

**Đầu vào:** `id_van_ban` (đường dẫn, bắt buộc); `truong` / `goi_truong` / `kem_theo` như VB-01, `kem_theo` thêm được `log_xu_ly`.

**Đầu ra:** 1 văn bản (Mục 4), không có `pagination`. Khi `kem_theo=files` và hồ sơ bật trả nội dung file, mỗi file có thêm `noi_dung_base64` (D6).

**Quy tắc:** văn bản nằm ngoài phạm vi token (khác schema, khác đơn vị được cấp, hoặc người dùng không có quyền xem) → `FORBIDDEN_SCOPE`; không tồn tại → `NOT_FOUND`.

Mẫu đầu ra (`kem_theo=files,van_ban_lien_quan`):

```json
{
  "success": true,
  "code": "OK",
  "message": "Thành công",
  "data": {
    "id_van_ban": "100245",
    "loai_van_ban": "DI",
    "so_ky_hieu": "125/SNV-VP",
    "trich_yeu": "V/v triển khai kết nối, chia sẻ dữ liệu văn bản",
    "ngay_van_ban": "05/10/2026",
    "ngay_ban_hanh": "06/10/2026",
    "hinh_thuc_van_ban": "Công văn",
    "ten_don_vi_ban_hanh": "Sở Nội vụ",
    "nguoi_ky": "Nguyễn Văn A",
    "files": [
      { "id_file": "5501", "ten_file": "125-SNV-VP.pdf", "dinh_dang": "pdf", "dung_luong": 305000, "is_ky_so": 1 }
    ],
    "van_ban_lien_quan": [
      {
        "id_van_ban_lien_quan": "100388",
        "so_ky_hieu": "45/UBND-VP",
        "trich_yeu": "V/v phản hồi triển khai kết nối, chia sẻ dữ liệu",
        "loai_quan_he": "PHAN_HOI",
        "ten_don_vi_ban_hanh": "UBND phường A",
        "ngay_ban_hanh": "12/10/2026",
        "trang_thai_phan_hoi": "DA_PHAN_HOI"
      }
    ]
  }
}
```

### 3.9. VB-03 — Log xử lý

**Nghiệp vụ:** trả danh sách (hoặc cây) người dùng / đơn vị tham gia xử lý 1 văn bản, kèm vai trò xử lý. Tách khỏi VB-02 để hệ thống ngoài chỉ cần thông tin văn bản không phải tải log, và để theo dõi tiến độ, giám sát chỉ đạo điều hành độc lập.

**Đầu vào:** `id_van_ban` (đường dẫn, bắt buộc); `vai_tro_xu_ly` (không bắt buộc, nhiều giá trị — F17).

**Đầu ra (`data`):** `id_van_ban`, `so_ky_hieu`, `log_xu_ly[]` (trường Mục 4.6).

**Quy tắc:**
- Trả mọi người dùng / đơn vị nhận văn bản trong phạm vi đơn vị của token. Văn bản đã chuyển sang 1 đơn vị nhận độc lập khác thì **không** lấy log xử lý ở đơn vị đó.
- Mỗi dòng là 1 người dùng hoặc 1 đơn vị nhận. Dòng giao cho đơn vị có `id_don_vi_nhan` / `ten_don_vi_nhan`.
- Thứ tự: thời gian chuyển văn bản tới người dùng / đơn vị, tăng dần.
- Trả dạng cây khi có chuyển tiếp: `id_nguoi_dung_cha` là người đã chuyển cho dòng này; rỗng = cấp gốc.
- Vai trò chỉ đạo / xử lý chính / phối hợp / xem để biết lấy từ toàn bộ nhật ký xử lý của văn bản.

### 3.10. VB-04 — Danh sách file của văn bản

**Nghiệp vụ:** trả thông tin các file của 1 văn bản.

**Đầu vào:** `id_van_ban` (đường dẫn, bắt buộc).

**Đầu ra:** danh sách file (Mục 4.4). Hồ sơ bật trả nội dung file thì mỗi file có thêm `noi_dung_base64` (D6).

**Quy tắc chọn file:**
- Lấy file ở các mục **File đính kèm**, **File phát hành** và **File tờ trình / Trình ký** của văn bản.
- **Không** lấy file của văn bản liên quan.
- Thứ tự: thời gian cập nhật file giảm dần.

### 3.11. VB-05 — Tải file

**Nghiệp vụ:** trả nội dung 1 file theo `id_file`. Đây là cách lấy nội dung file mặc định (D6).

**Đầu vào:** `id_file` (đường dẫn, bắt buộc).

**Đầu ra:** nội dung file (không bọc vỏ phản hồi Mục 7.1). Lỗi thì vẫn trả vỏ phản hồi chuẩn.

**Quy tắc:**
- Kiểm tra file thuộc 1 văn bản nằm trong phạm vi token trước khi trả; ngoài phạm vi → `FORBIDDEN_SCOPE`.
- Không cung cấp đường dẫn tải trực tiếp: mọi lượt lấy nội dung file đều qua VB-05 hoặc VB-02 / VB-04 để kiểm quyền và ghi nhật ký (NFR-08).

### 3.12. VB-06 — Thống kê số lượng văn bản

**Nghiệp vụ:** đếm số văn bản của toàn agent hoặc của 1 đơn vị con trong agent (Mục 1.3).
- Văn bản của đơn vị xác định theo loại đơn vị con, giống VB-01 (Mục 1.3, D19).
- Văn bản đi: đếm theo ngày ban hành. Đơn vị là phòng ban thì tính theo `cach_tinh_van_ban_di` (F19).
- Văn bản đến: đếm theo ngày đến; tách được theo vai trò nhận và theo trạng thái xử lý, khớp số liệu **Báo cáo văn bản đến** trên iOffice.
- Thống kê toàn agent, hoặc 1 đơn vị kèm cấp dưới có đơn vị độc lập: 1 văn bản đến chuyển xuống đơn vị độc lập được đếm ở cả sổ agent và sổ đơn vị độc lập (D20). Dùng `nhom_theo=DON_VI` để tách số theo từng sổ.

**Đầu vào:**

| Tham số | Kiểu | Bắt buộc | Mô tả |
|---|---|---|---|
| `agent_id` hoặc `ma_schema` | Số / Chuỗi | Theo F01 | Agent cần thống kê (F01) |
| `id_don_vi` | Chuỗi | Không | Đơn vị con cần thống kê, phải thuộc agent và phạm vi hồ sơ. Không truyền = thống kê toàn agent |
| `bao_gom_cap_duoi` | Đúng/sai | Không | Cộng dồn cả các đơn vị con cháu của `id_don_vi`. Mặc định: không |
| `cach_tinh_van_ban_di` | Mã | Không | Chỉ áp khi `id_don_vi` là phòng ban (F19). Mặc định `DON_VI_SOAN_THAO` |
| `loai_van_ban` | Danh sách mã | Không | `DEN` / `DI` (Mục 6.1). Không truyền = cả hai |
| `id_linh_vuc` | Danh sách mã | Không | Lĩnh vực |
| `ma_hinh_thuc_van_ban` | Danh sách mã | Không | Hình thức |
| `trang_thai_van_ban` | Danh sách mã | Không | Chỉ áp cho văn bản đến (Mục 6.2). Không truyền = mọi trạng thái |
| `vai_tro_xu_ly` | Danh sách mã | Không | Vai trò nhận, chỉ áp cho văn bản đến (Mục 6.4). Không truyền = tổng mọi vai trò |
| `tu_ngay`, `den_ngay` | Ngày | Không | Văn bản đi: theo ngày ban hành; văn bản đến: theo ngày đến |
| `nhom_theo` | Danh sách | Không | Tách kết quả theo `DON_VI` / `TRANG_THAI` / `VAI_TRO` để trả nhiều dòng trong 1 lần gọi [GIẢ ĐỊNH] |

**Đầu ra (mỗi phần tử trong `data`):**

| Trường | Kiểu | Mô tả |
|---|---|---|
| `id_don_vi`, `ten_don_vi` | Chuỗi | Đơn vị được thống kê |
| `loai_van_ban` | Mã | `DEN` / `DI` |
| `trang_thai_van_ban` | Mã | Rỗng với văn bản đi hoặc khi không tách theo trạng thái |
| `vai_tro_xu_ly` | Mã | Rỗng khi không tách theo vai trò |
| `so_luong` | Số | Số văn bản |

---

## 4. Danh mục trường thông tin (Field Catalog)

**Nhóm trường** dùng để phân quyền trong hồ sơ tích hợp:
- **CB — Cơ bản:** định danh văn bản, hầu hết đơn vị đều cần; nằm trong `goi_truong=CO_BAN`.
- **MR — Mở rộng:** cấp theo nhu cầu.
- **NC — Nhạy cảm:** chứa thông tin cá nhân hoặc nội dung; chỉ cấp khi đơn vị chủ quản đồng ý bằng văn bản (NFR-10).

### 4.1. Văn bản — thông tin chung (đến và đi)

| Mã trường | Tên nghiệp vụ | Kiểu | Nhóm | Quy tắc lấy dữ liệu |
|---|---|---|---|---|
| `id_van_ban` | ID văn bản | Chuỗi | CB | ID duy nhất của văn bản trên iOffice |
| `loai_van_ban` | Văn bản đến / đi | Mã (Mục 6.1) | CB | |
| `so_ky_hieu` | Số, ký hiệu | Chuỗi | CB | |
| `trich_yeu` | Trích yếu | Chuỗi | CB | Tên văn bản chính là trích yếu (D13) |
| `so_den_di` | Số đến / số đi | Chuỗi | CB | Văn bản đến: số đến trong sổ; văn bản đi: số đi |
| `ngay_van_ban` | Ngày văn bản | Ngày | CB | Ngày ghi trên văn bản |
| `ma_hinh_thuc_van_ban` | Mã hình thức | Mã (DM-05) | CB | |
| `hinh_thuc_van_ban` | Tên hình thức | Chuỗi | CB | Công văn, Quyết định, Tờ trình… |
| `id_linh_vuc` | Mã lĩnh vực | Mã (DM-05) | MR | |
| `linh_vuc` | Tên lĩnh vực | Chuỗi | MR | Có thể rỗng |
| `do_khan` | Độ khẩn | Mã (Mục 6.6) | CB | |
| `id_don_vi_ban_hanh` | ID đơn vị ban hành | Chuỗi | CB | Có giá trị khi đơn vị ban hành nằm trong hệ thống; rỗng khi văn bản đến từ trục liên thông hoặc nhập tay từ văn bản giấy |
| `ten_don_vi_ban_hanh` | Tên đơn vị / cơ quan ban hành | Chuỗi | CB | |
| `trang_thai_van_ban` | Trạng thái văn bản (tầng đơn vị) | Mã (Mục 6.2) | CB | |
| `id_don_vi_so_huu` | ID đơn vị sở hữu bản ghi | Chuỗi | CB | Đơn vị có sổ văn bản chứa bản ghi này — agent hoặc 1 đơn vị độc lập (D20) |
| `ten_don_vi_so_huu` | Tên đơn vị sở hữu bản ghi | Chuỗi | CB | |
| `ngay_tao` | Ngày tạo trên hệ thống | Ngày giờ | MR | Dùng làm sắp xếp mặc định |

### 4.2. Văn bản — chỉ có ở văn bản đến

| Mã trường | Tên nghiệp vụ | Kiểu | Nhóm | Quy tắc lấy dữ liệu |
|---|---|---|---|---|
| `ngay_den` | Ngày đến | Ngày | CB | Ngày đơn vị tiếp nhận văn bản (D9) |
| `han_xu_ly` | Hạn xử lý | Ngày | MR | |
| `trang_thai_ca_nhan` | Trạng thái xử lý của người dùng trong token | Mã (Mục 6.3) | MR | Chỉ có ở phạm vi `CA_NHAN` |
| `vai_tro_cua_toi` | Vai trò của người dùng trong token với văn bản | Mã (Mục 6.4) | MR | Chỉ có ở phạm vi `CA_NHAN` |

### 4.3. Văn bản — chỉ có ở văn bản đi

| Mã trường | Tên nghiệp vụ | Kiểu | Nhóm | Quy tắc lấy dữ liệu |
|---|---|---|---|---|
| `ngay_ban_hanh` | Ngày ban hành | Ngày | CB | Ngày văn bản đi được ban hành / phát hành (D9) |
| `nguoi_soan` | Người soạn thảo | Chuỗi | MR | |
| `id_nguoi_tao`, `ten_nguoi_tao` | Người tạo văn bản trên hệ thống | Chuỗi | MR | Căn cứ của cách tính `NGUOI_TAO` (F19) |
| `id_don_vi_soan_thao` | ID phòng ban soạn thảo | Chuỗi | MR | |
| `ten_don_vi_soan_thao` | Tên phòng ban / đơn vị soạn thảo | Chuỗi | MR | |
| `ngay_soan_thao` | Ngày soạn thảo | Ngày | MR | |
| `ngay_trinh` | Ngày trình | Ngày | MR | Ngày văn bản được chuyển tới người dùng trong token |
| `nguoi_ky` | Người ký | Chuỗi | CB | Mặc định lấy người ký văn thư nhập ở ô **Người ký** trên form thông tin văn bản; văn bản lãnh đạo mới chuyển xuống thì lấy lãnh đạo gần nhất ký chuyển xuống |
| `ngay_ky` | Ngày ký | Ngày | MR | Ngày lãnh đạo ký số; văn bản không ký số thì lấy ngày chuyển |
| `don_vi_nhan` | Danh sách cá nhân / đơn vị nhận | Danh sách chuỗi | MR | |

### 4.4. Khối `files[]` — file đính kèm

| Mã trường | Tên nghiệp vụ | Kiểu | Nhóm | Quy tắc lấy dữ liệu |
|---|---|---|---|---|
| `id_file` | ID file | Chuỗi | CB | Dùng để tải nội dung qua VB-05 |
| `ten_file` | Tên file | Chuỗi | CB | `{tên}.{đuôi}`, vd `cong-van.pdf` |
| `dinh_dang` | Định dạng file | Chuỗi | CB | pdf, docx, png… |
| `dung_luong` | Dung lượng (byte) | Số | CB | |
| `is_ky_so` | Có chữ ký số | Mã 0/1 | CB | 1 nếu file có ít nhất 1 chữ ký số, ngược lại 0 |
| `nguoi_ky` | Người ký số | Chuỗi | MR | Người được chọn ở ô **Người ký** trên form thông tin văn bản; rỗng nếu chưa ký |
| `email_nguoi_ky` | Email người ký số | Chuỗi | NC | Lấy từ thông tin cá nhân của người ký; rỗng nếu chưa ký |
| `noi_dung_base64` | Nội dung file mã hóa Base64 | Chuỗi | NC | Chỉ trả ở VB-02 / VB-04 khi hồ sơ bật; không bao giờ trả ở VB-01 (D6) |

Không có trường đường dẫn tải trực tiếp (D6).

### 4.5. Khối `van_ban_lien_quan[]`

Phục vụ theo dõi 1 văn bản đã ban hành có bao nhiêu đơn vị (vd xã, phường) đã phản hồi.

| Mã trường | Tên nghiệp vụ | Kiểu | Nhóm | Quy tắc lấy dữ liệu |
|---|---|---|---|---|
| `id_van_ban_lien_quan` | ID văn bản liên quan | Chuỗi | MR | Văn bản gắn ở mục **Văn bản liên quan**; rỗng khi đơn vị chưa phản hồi |
| `so_ky_hieu` | Số, ký hiệu | Chuỗi | MR | |
| `trich_yeu` | Trích yếu | Chuỗi | MR | |
| `loai_quan_he` | Loại quan hệ | Mã (Mục 6.7) | MR | |
| `id_don_vi_ban_hanh` | ID đơn vị ban hành / phản hồi | Chuỗi | MR | Rỗng nếu đơn vị ngoài hệ thống |
| `ten_don_vi_ban_hanh` | Tên đơn vị ban hành / phản hồi | Chuỗi | MR | |
| `ngay_ban_hanh` | Ngày ban hành / phản hồi | Ngày | MR | |
| `trang_thai_phan_hoi` | Trạng thái phản hồi | Mã (Mục 6.8) | MR | |

### 4.6. Khối `log_xu_ly[]` và `nguoi_xem[]`

| Mã trường | Tên nghiệp vụ | Kiểu | Nhóm | Quy tắc lấy dữ liệu |
|---|---|---|---|---|
| `id_nguoi_dung` | ID người xử lý | Chuỗi | MR | Rỗng ở dòng giao cho đơn vị |
| `ten_dang_nhap` | Tên đăng nhập | Chuỗi | MR | |
| `ho_ten` | Họ tên | Chuỗi | MR | |
| `vai_tro_xu_ly` | Vai trò xử lý | Mã (Mục 6.4) | MR | |
| `id_don_vi`, `ten_don_vi` | Đơn vị của người xử lý | Chuỗi | MR | Đơn vị cha của phòng ban |
| `id_phong_ban`, `ten_phong_ban` | Phòng ban của người xử lý | Chuỗi | MR | Đơn vị trực tiếp người dùng trực thuộc |
| `id_don_vi_nhan`, `ten_don_vi_nhan` | Đơn vị nhận | Chuỗi | MR | Chỉ có ở dòng giao cho đơn vị (không phải cá nhân) |
| `id_nguoi_dung_cha` | Người chuyển | Chuỗi | MR | Người đã chuyển văn bản cho dòng này; rỗng = cấp gốc |
| `thu_tu_hien_thi` | Thứ tự | Số | MR | |
| `thoi_gian_nhan` | Thời gian nhận | Ngày giờ | MR | Thời điểm văn bản được chuyển tới người dùng / đơn vị |
| `thoi_gian_xu_ly` | Thời gian kết thúc / chuyển tiếp | Ngày giờ | MR | Thời điểm người dùng / đơn vị kết thúc hoặc chuyển văn bản |
| `nguoi_xem[]` | Danh sách tài khoản đã mở xem văn bản | Danh sách chuỗi | NC | |

### 4.7. Đơn vị / phòng ban (DM-02)

| Mã trường | Tên nghiệp vụ | Kiểu | Quy tắc lấy dữ liệu |
|---|---|---|---|
| `id_don_vi` | ID đơn vị | Chuỗi | ID trên iOffice |
| `ma_don_vi_nghiep_vu` | Mã định danh đơn vị | Chuỗi | Rỗng nếu đơn vị chưa có mã |
| `ten_don_vi` | Tên đầy đủ | Chuỗi | |
| `ten_viet_tat` | Ký hiệu đơn vị | Chuỗi | |
| `id_don_vi_cha` | ID đơn vị cha | Chuỗi | Rỗng = cấp gốc |
| `loai_don_vi` | Loại đơn vị | Mã (Mục 6.10) | Độc lập / độc lập phụ thuộc / phụ thuộc — quyết định cách xác định văn bản của đơn vị (Mục 1.3) |
| `cap_don_vi` | Cấp trong cây | Số | Gốc là cấp 1, tăng dần theo cây |
| `thu_tu_hien_thi` | Thứ tự | Số | Theo cây đơn vị trong quản trị |
| `trang_thai` | Trạng thái | Mã (Mục 6.9) | |
| `ngay_cap_nhat_cuoi` | Cập nhật cuối | Ngày giờ | Thời điểm cập nhật bản ghi; chưa từng cập nhật thì lấy ngày tạo |

### 4.8. Người dùng (DM-04)

| Mã trường | Tên nghiệp vụ | Kiểu | Nhóm | Quy tắc lấy dữ liệu |
|---|---|---|---|---|
| `id_nguoi_dung` | ID người dùng | Chuỗi | CB | |
| `ten_dang_nhap` | Tên đăng nhập | Chuỗi | CB | |
| `ho_ten` | Họ tên | Chuỗi | CB | |
| `email` | Email công vụ | Chuỗi | NC | Bắt buộc là email công vụ — dùng cho đăng nhập 1 lần |
| `so_dien_thoai` | Số điện thoại | Chuỗi | NC | Có thể rỗng |
| `id_don_vi`, `ten_don_vi` | Đơn vị | Chuỗi | CB | Đơn vị cha của phòng ban người dùng trực thuộc |
| `id_phong_ban`, `ten_phong_ban` | Phòng ban | Chuỗi | CB | Đơn vị trực tiếp người dùng trực thuộc |
| `id_chuc_vu`, `ten_chuc_vu` | Chức vụ | Chuỗi | CB | |
| `vai_tro_nghiep_vu` | Vai trò trên iOffice | Chuỗi | MR | Theo vai trò gán trên iOffice: Trưởng đơn vị, Lãnh đạo đơn vị, Văn thư, Chuyên viên |
| `trang_thai_tai_khoan` | Trạng thái tài khoản | Mã (Mục 6.9) | CB | |
| `ngay_cap_nhat_cuoi` | Cập nhật cuối | Ngày giờ | CB | Chưa từng cập nhật thì lấy ngày tạo |

### 4.9. Chức vụ (DM-03)

| Mã trường | Tên nghiệp vụ | Kiểu | Quy tắc lấy dữ liệu |
|---|---|---|---|
| `id_chuc_vu` | ID chức vụ | Chuỗi | |
| `ma_chuc_vu_nghiep_vu` | Mã chức vụ | Chuỗi | |
| `ten_chuc_vu` | Tên chức vụ | Chuỗi | Vd Giám đốc, Phó Giám đốc, Trưởng phòng, Chuyên viên |
| `loai_vi_tri` | Loại vị trí | Chuỗi | Vd lãnh đạo, văn thư, chuyên viên |
| `cap_bac_uu_tien` | Thứ tự ưu tiên | Số | Thứ tự hiển thị của chức vụ thiết lập trong quản trị |
| `trang_thai` | Trạng thái | Mã (Mục 6.9) | |
| `ngay_cap_nhat_cuoi` | Cập nhật cuối | Ngày giờ | Chưa từng cập nhật thì lấy ngày tạo |

Chức vụ trên iOffice không gắn riêng cho đơn vị hay phòng ban nào, nên danh mục không có trường đơn vị / phòng ban áp dụng.

---

## 5. Danh mục tiêu chí lọc (Filter Catalog)

Áp cho VB-01. VB-06 dùng 1 phần (Mục 3.12).

**Kiểu so khớp:** `BANG` (đúng 1 giá trị) · `TRONG` (thuộc danh sách nhiều giá trị) · `CHUA` (tìm tương đối, chứa chuỗi) · `KHOANG` (từ – đến).

| Mã | Tham số | Ý nghĩa | So khớp | Ràng buộc |
|---|---|---|---|---|
| F01 | `agent_id` hoặc `ma_schema` | Agent cần lấy — truyền 1 trong 2 mã (D14) | BANG | Token được cấp 1 agent: không bắt buộc, mặc định là agent đó. Token được cấp nhiều agent: bắt buộc. Truyền cả 2 mã mà không cùng 1 agent → `INVALID_PARAM`. Agent ngoài hồ sơ → `FORBIDDEN_SCOPE`. Chỉ truyền F01, không truyền F08 = lấy toàn agent (D18) |
| F02 | `loai_van_ban` | Đến / đi | TRONG | Không truyền = cả hai (nếu hồ sơ cho phép) |
| F03 | `tu_khoa` | Tìm tự do trên trích yếu và số ký hiệu | CHUA | |
| F04 | `trich_yeu` | Trích yếu | CHUA | |
| F05 | `so_ky_hieu` | Số, ký hiệu | CHUA | |
| F06 | `so_den_di` | Số đến / đi | CHUA | |
| F07 | `id_don_vi_ban_hanh` | Đơn vị ban hành | TRONG | |
| F08 | `id_don_vi` + `bao_gom_cap_duoi` | Lấy văn bản của 1 (hoặc vài) đơn vị con trong agent; có lấy cả đơn vị con cháu không. Cách xác định văn bản của đơn vị theo loại đơn vị con: Mục 1.3 | TRONG | Không truyền = toàn agent (D18). Phải thuộc agent đã chọn và thuộc phạm vi hồ sơ (Mục 1.3). `bao_gom_cap_duoi` mặc định: không |
| F09 | `nguoi_ky` | Người ký ban hành | BANG | Truyền tên đăng nhập của người ký |
| F10 | `id_linh_vuc` | Lĩnh vực | TRONG | Mã lấy từ DM-05 |
| F11 | `ma_hinh_thuc_van_ban` | Hình thức | TRONG | Mã lấy từ DM-05 |
| F12 | `tu_ngay`, `den_ngay`, `loai_ngay` | Khoảng ngày và loại ngày áp khoảng | KHOANG | `tu_ngay` ≤ `den_ngay`; `tu_ngay` không sau ngày hiện tại; khoảng tối đa theo hồ sơ (mặc định 30 ngày — NFR-04) |
| F13 | `cap_nhat_tu` | Chỉ lấy bản ghi thay đổi từ thời điểm này | KHOANG | Chỉ áp cho danh mục DM-02 → DM-04; **không** áp cho văn bản (D12) |
| F14 | `trang_thai_van_ban` | Trạng thái tầng đơn vị | TRONG | Mục 6.2 |
| F15 | `trang_thai_ca_nhan` | Trạng thái xử lý của người dùng trong token | TRONG | **Chỉ áp ở phạm vi `CA_NHAN`**. Không truyền = toàn bộ văn bản người dùng được xem |
| F16 | `ten_dang_nhap` | Người dùng | BANG | Chỉ áp ở phạm vi `CA_NHAN`; khác người dùng trong token → `USER_MISMATCH` |
| F17 | `vai_tro_xu_ly` | Vai trò xử lý | TRONG | Mục 6.4 |
| F18 | `do_khan` | Độ khẩn | TRONG | Mã lấy từ DM-05 |
| F19 | `cach_tinh_van_ban_di` | Cách xác định văn bản đi của 1 phòng ban | BANG | Chỉ có tác dụng khi lọc văn bản đi theo F08 mà đơn vị là phòng ban (độc lập phụ thuộc hoặc phụ thuộc). Nhận `DON_VI_SOAN_THAO` (mặc định) hoặc `NGUOI_TAO` (D19). Đơn vị độc lập luôn tính theo sổ riêng, bỏ qua tham số này |

`loai_ngay` nhận: `NGAY_VAN_BAN` (cả hai loại), `NGAY_BAN_HANH` (chỉ văn bản đi), `NGAY_DEN` (chỉ văn bản đến), `NGAY_TAO`. Mặc định: văn bản đi lọc theo ngày ban hành, văn bản đến lọc theo ngày đến. Tìm cả đến và đi cùng lúc mà không truyền `loai_ngay` thì mỗi loại áp ngày mặc định của mình (D9).

---

## 6. Bộ mã giá trị chuẩn

Mọi bộ mã dùng chữ in hoa, không dấu (không dùng số) để đọc là hiểu, tránh nhầm giữa các hệ thống.

### 6.1. `loai_van_ban`

| Mã | Ý nghĩa |
|---|---|
| `DEN` | Văn bản đến |
| `DI` | Văn bản đi |

### 6.2. `trang_thai_van_ban` — tầng đơn vị

| Loại | Mã | Ý nghĩa |
|---|---|---|
| Đến | `CHO_VAO_SO` | Văn thư chưa vào sổ |
| Đến | `CHUA_XU_LY` | Đã giao, chưa xử lý |
| Đến | `DANG_XU_LY` | Đang xử lý |
| Đến | `DA_HOAN_TAT` | Đã hoàn tất |
| Đi | `CHUA_PHAT_HANH` | Mọi văn bản đi chưa phát hành, gồm cả đang dự thảo, trình ký, chờ văn thư phát hành (D10) |
| Đi | `DA_PHAT_HANH` | Đã phát hành (D10) |

Trạng thái văn bản đến khớp với số liệu **Báo cáo văn bản đến** trên iOffice. Văn bản đi chỉ có 2 trạng thái ở tầng đơn vị (D10); muốn lấy đúng văn bản đi đang chờ 1 người hoặc văn thư xử lý thì dùng trạng thái cá nhân `CHO_XU_LY` (Mục 6.3). Hồ sơ nào được thấy `CHUA_PHAT_HANH` thì sẽ thấy cả văn bản đang dự thảo, nên chỉ cấp khi đơn vị chủ quản đồng ý.

### 6.3. `trang_thai_ca_nhan` — tầng người dùng

| Mã | Ý nghĩa — tương ứng menu trên iOffice |
|---|---|
| `CHO_XU_LY` | Văn bản đến / đi người dùng chưa chuyển, chưa kết thúc hoặc chưa cho ý kiến. Gồm văn bản chuyển tới cá nhân hoặc tới đơn vị mà cá nhân có quyền tiếp nhận |
| `DA_XU_LY` | Văn bản đến / đi người dùng đã xử lý |
| `DA_BAN_HANH` | Văn bản người dùng có tham gia và đã ban hành |
| `CHO_VAO_SO` | Văn bản đến chờ văn thư vào sổ (tài khoản văn thư) |

Trạng thái tầng đơn vị (6.2) và tầng người dùng (6.3) là 2 khái niệm khác nhau: 6.2 mô tả văn bản đang ở đâu trong quy trình của đơn vị, 6.3 mô tả việc của riêng 1 người dùng với văn bản đó.

### 6.4. `vai_tro_xu_ly`

| Mã | Ý nghĩa |
|---|---|
| `CHI_DAO` | Chỉ đạo |
| `XU_LY_CHINH` | Xử lý chính (chủ trì) |
| `PHOI_HOP` | Phối hợp |
| `XEM_DE_BIET` | Xem để biết |

### 6.5. Phạm vi dữ liệu

`DON_VI`, `CA_NHAN` — xem Mục 1.1.

### 6.6. `do_khan`

`THUONG`, `KHAN`, `THUONG_KHAN`, `HOA_TOC` — **[CẦN CHỐT]** Mục 11 câu Q2: bộ mã đầy đủ lấy từ danh mục độ khẩn của iOffice; mức "Thượng khẩn" là **[GIẢ ĐỊNH]** theo các mức độ khẩn thường dùng trong văn bản hành chính.

### 6.7. `loai_quan_he` (văn bản liên quan)

| Mã | Ý nghĩa |
|---|---|
| `PHAN_HOI` | Văn bản phản hồi của đơn vị nhận |
| `KHAC` | Văn bản liên quan khác |

### 6.8. `trang_thai_phan_hoi`

| Mã | Ý nghĩa |
|---|---|
| `DA_PHAN_HOI` | Đơn vị đã gửi văn bản phản hồi |
| `CHUA_PHAN_HOI` | Đơn vị chưa phản hồi |

### 6.9. Trạng thái danh mục

| Đối tượng | Mã |
|---|---|
| Schema | `HOAT_DONG`, `NGUNG_HOAT_DONG` |
| Đơn vị | `HOAT_DONG`, `NGUNG_HOAT_DONG` (đã khóa), `DA_XOA` (không còn trên cây đơn vị) |
| Tài khoản người dùng | `HOAT_DONG` (được phép sử dụng), `KHOA` (không được phép sử dụng) |
| Chức vụ, danh mục nghiệp vụ | `HOAT_DONG`, `NGUNG_HOAT_DONG` |

### 6.10. `loai_don_vi`

| Mã | Ý nghĩa | Sổ văn bản |
|---|---|---|
| `DOC_LAP` | Đơn vị độc lập | Có văn thư, sổ văn bản riêng |
| `DOC_LAP_PHU_THUOC` | Đơn vị độc lập phụ thuộc | Dùng sổ của đơn vị cấp trên |
| `PHU_THUOC` | Đơn vị phụ thuộc (phòng ban) | Dùng sổ của đơn vị cấp trên |

### 6.11. `cach_tinh_van_ban_di`

| Mã | Ý nghĩa |
|---|---|
| `DON_VI_SOAN_THAO` | Văn bản đi có phòng ban soạn thảo là đơn vị được lọc (mặc định) |
| `NGUOI_TAO` | Văn bản đi có người tạo thuộc đơn vị được lọc |

---

## 7. Chuẩn phản hồi và mã lỗi

### 7.1. Vỏ phản hồi chung

Áp cho mọi API, kể cả khi lỗi (D8). Riêng VB-05 trả thẳng nội dung file khi thành công.

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
      "id_van_ban": "100245",
      "loai_van_ban": "DI",
      "so_ky_hieu": "125/SNV-VP",
      "trich_yeu": "V/v triển khai kết nối, chia sẻ dữ liệu văn bản",
      "ngay_van_ban": "05/10/2026",
      "ngay_ban_hanh": "06/10/2026",
      "ten_don_vi_ban_hanh": "Sở Nội vụ"
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

| HTTP | `code` | Khi nào |
|---|---|---|
| 200 | `OK` | Thành công |
| 400 | `INVALID_PARAM` | Thiếu tham số bắt buộc, sai định dạng |
| 400 | `INVALID_DATE_RANGE` | `tu_ngay` > `den_ngay`, `tu_ngay` sau hôm nay, vượt khoảng tối đa |
| 401 | `UNAUTHORIZED` | Thiếu token, sai thông tin đăng nhập, tài khoản bị khóa |
| 401 | `TOKEN_EXPIRED` | Token hết hạn |
| 403 | `FORBIDDEN_SCOPE` | Văn bản / file / schema / đơn vị ngoài phạm vi hồ sơ, hoặc người dùng không có quyền xem |
| 403 | `FIELD_NOT_ALLOWED` | Yêu cầu trường hoặc khối con ngoài hồ sơ |
| 403 | `FILTER_NOT_ALLOWED` | Dùng tiêu chí lọc ngoài hồ sơ |
| 403 | `USER_MISMATCH` | Người dùng trong yêu cầu khác người dùng trong token |
| 403 | `IP_NOT_ALLOWED` | IP gọi không thuộc danh sách cho phép |
| 403 | `OUTSIDE_TIME_WINDOW` | Gọi ngoài khung giờ hồ sơ cho phép |
| 404 | `NOT_FOUND` | Không có văn bản / file |
| 429 | `RATE_LIMITED` | Vượt số lượt gọi cho phép |
| 500 | `INTERNAL_ERROR` | Lỗi hệ thống |
| 503 | `SERVICE_UNAVAILABLE` | Kho file hoặc dịch vụ phụ thuộc không sẵn sàng |

---

## 8. Yêu cầu chung về an toàn và giới hạn truy cập

| Mã | Yêu cầu | Giá trị mặc định | Cấu hình theo hồ sơ |
|---|---|---|---|
| NFR-01 | Toàn bộ kết nối qua HTTPS | Bắt buộc | Không |
| NFR-02 | Thời hạn token | 30 phút, tức `expires_in` = 1800 (D17) | Có |
| NFR-03 | Số bản ghi tối đa mỗi trang | 100 (mặc định 20) | Có |
| NFR-04 | Khoảng ngày tối đa mỗi lần tìm | 30 ngày | Có |
| NFR-05 | Khung giờ được gọi API lấy dữ liệu | Không giới hạn | Có — vd chỉ cho gọi 23h – 5h để không ảnh hưởng hiệu năng giờ làm việc |
| NFR-06 | Số lượt gọi tối đa theo thời gian | Mỗi hồ sơ có ngưỡng riêng; vượt ngưỡng trả `RATE_LIMITED` (D16). **[CẦN CHỐT]** con số mặc định — Mục 11 câu Q1 | Có |
| NFR-07 | Danh sách IP được phép gọi | Không giới hạn | Có |
| NFR-08 | Ghi nhật ký mọi lượt cấp token và gọi API (ai, lúc nào, API nào, tham số, số bản ghi trả) | Bắt buộc | Không |
| NFR-09 | Token chỉ truyền ở header `Authorization` | Bắt buộc | Không |
| NFR-10 | Trường nhóm NC chỉ cấp khi đơn vị chủ quản đồng ý bằng văn bản | Bắt buộc | Không |

**Căn cứ pháp lý:** Nghị định 47/2020/NĐ-CP về quản lý, kết nối và chia sẻ dữ liệu số của cơ quan nhà nước; Nghị định 278/2025/NĐ-CP; Khung Kiến trúc Chính phủ điện tử Việt Nam phiên bản 3.0.

---

## 9. Hồ sơ tích hợp (Integration Profile)

Mỗi đơn vị tích hợp có 1 hồ sơ. Đây là nơi **duy nhất** chứa phần khác nhau giữa các đơn vị.

### 9.1. Nội dung hồ sơ

| Nhóm | Thông tin | Ví dụ |
|---|---|---|
| Định danh | Mã hồ sơ, tên đơn vị tích hợp, đầu mối liên hệ, văn bản đề nghị (số, ngày) | HS-001, Sở X, Công văn số …/SX-VP |
| Xác thực | `client_id`, chế độ được dùng (`DON_VI` / `CA_NHAN` / cả hai), danh sách IP được phép | `DON_VI` |
| Phạm vi dữ liệu | Agent được cấp; cấp toàn agent hay chỉ 1 nhánh đơn vị (đơn vị gốc của nhánh) — Mục 1.3; loại văn bản (đến / đi); trạng thái bắt buộc | Toàn agent `qlvb_hni_schema`, chỉ văn bản đi `DA_PHAT_HANH` |
| API được dùng | Danh sách mã API Mục 3 | VB-01, VB-02, VB-05 |
| Trường được lấy | Danh sách trường + khối con | Nhóm CB + `files` + `van_ban_lien_quan` |
| Tiêu chí được lọc | Danh sách mã F Mục 5 + giá trị lọc cố định (nếu có) | F04, F05, F07, F10, F11, F12 |
| Cách trả file | Chỉ thông tin + tải riêng qua VB-05 (mặc định) / bật kèm nội dung Base64 ở VB-02, VB-04 (D6) | Chỉ thông tin + tải riêng |
| Giới hạn | Khoảng ngày tối đa, số bản ghi/trang, khung giờ, số lượt gọi, thời hạn token | 30 ngày, 100, 23h – 5h |
| Hiệu lực | Từ ngày – đến ngày, trạng thái hồ sơ (đang dùng / tạm dừng / thu hồi) | |

### 9.2. Mẫu cấu hình cho các nhu cầu thường gặp

| # | Nhu cầu | API | Hồ sơ / tham số |
|---|---|---|---|
| 1 | Đồng bộ văn bản đi đã phát hành sang hệ thống khác | VB-01 → VB-02 → VB-05 | `DON_VI`, loại `DI`, trạng thái cố định `DA_PHAT_HANH`, kèm `files` + `van_ban_lien_quan`. Lọc F04, F05, F07, F10, F11, F12 (`loai_ngay=NGAY_BAN_HANH`) |
| 2 | Đồng bộ văn bản đến của 1 phòng ban | VB-01 | `DON_VI`, loại `DEN`, F08 (`id_don_vi` = phòng ban), F12 |
| 3 | Theo dõi phản hồi của các đơn vị cho 1 văn bản đã ban hành | VB-02 | `kem_theo=van_ban_lien_quan` |
| 4 | Theo dõi tiến độ, giám sát chỉ đạo điều hành 1 văn bản | VB-03 | Lọc `vai_tro_xu_ly` khi cần |
| 5 | Thống kê số lượng văn bản đến / đi theo trạng thái — toàn agent hoặc 1 đơn vị con | VB-06 | Định danh agent; thêm `id_don_vi` (+ `bao_gom_cap_duoi`) khi thống kê 1 đơn vị con; lọc `loai_van_ban`, `id_linh_vuc`, `ma_hinh_thuc_van_ban`, `trang_thai_van_ban`, `tu_ngay` / `den_ngay` |
| 6 | Lãnh đạo / chuyên viên — văn bản đến cần xử lý | VB-01 + VB-03 | Token `CA_NHAN`, loại `DEN`, F15 `CHO_XU_LY`, F12; trường thêm `han_xu_ly`, `do_khan`; luồng xử lý qua VB-03 |
| 7 | Lãnh đạo / chuyên viên — văn bản đi cần xử lý | VB-01 | Token `CA_NHAN`, loại `DI`, F15 `CHO_XU_LY`; trường thêm `nguoi_soan`, `ten_don_vi_soan_thao`, `ngay_trinh`, `ngay_soan_thao` |
| 8 | Văn thư — văn bản đến cần vào sổ | VB-01 | `DON_VI` (tài khoản văn thư), loại `DEN`, F14 `CHO_VAO_SO` |
| 9 | Văn thư — văn bản đi cần xử lý | VB-01 | Token `CA_NHAN` của tài khoản văn thư, loại `DI`, F15 `CHO_XU_LY`; trường `nguoi_ky`, `ngay_ky`, `hinh_thuc_van_ban` |
| 10 | Tra cứu toàn bộ văn bản 1 người dùng được xem | VB-01 | Token `CA_NHAN`, không truyền F15; lọc F02, F04, F05, F06, F12 (`NGAY_VAN_BAN`); kèm `files`, `nguoi_xem` |
| 11 | Đồng bộ danh mục tổ chức, người dùng | DM-01 → DM-02 → DM-03 → DM-04 | `DON_VI`; lần đầu lấy toàn bộ, các lần sau truyền `cap_nhat_tu` (F13) |

### 9.3. Quy trình tiếp nhận đơn vị mới

| Bước | Việc | Người làm | Kết quả |
|---|---|---|---|
| 1 | Tiếp nhận văn bản đề nghị: cần dữ liệu gì, lọc theo gì, dùng để làm gì | BA | Phiếu nhu cầu |
| 2 | Đối chiếu nhu cầu với Mục 3, 4, 5 và các mẫu Mục 9.2 | BA | Danh sách khớp / chưa có |
| 3a | Khớp toàn bộ → lập hồ sơ tích hợp | BA + quản trị | Hồ sơ nháp |
| 3b | Có trường / tiêu chí chưa có → đánh giá bổ sung vào catalog (dùng cho mọi đơn vị, không riêng đơn vị này), nâng phiên bản catalog | BA + PO + dev | CR bổ sung catalog |
| 4 | Đơn vị chủ quản duyệt phạm vi dữ liệu, đặc biệt trường nhóm NC và trạng thái `CHUA_PHAT_HANH` | Đơn vị chủ quản | Hồ sơ đã duyệt |
| 5 | Cấp `client_id` / `client_secret` trên môi trường thử nghiệm, đơn vị tích hợp kiểm thử | Quản trị + đơn vị tích hợp | Biên bản kiểm thử |
| 6 | Cấp trên môi trường chính thức, bàn giao tài liệu (sinh từ catalog + hồ sơ) | Quản trị | Đưa vào sử dụng |

---

## 10. Lộ trình áp dụng

| Giai đoạn | Nội dung |
|---|---|
| 1 | Chốt các câu Mục 11, phát hành catalog 1.0 |
| 2 | Xây 12 API chuẩn + chức năng quản trị hồ sơ tích hợp |
| 3 | Áp cho mọi khách hàng mới |
| 4 | Chuyển dần đơn vị đang dùng API riêng lẻ khi đơn vị có yêu cầu thay đổi |

**Chuyển 1 đơn vị đang dùng API riêng lẻ sang bộ API chuẩn:**

| Bước | Việc |
|---|---|
| 1 | Lập hồ sơ tích hợp bao trùm đúng phạm vi dữ liệu đơn vị đang được cấp — không rộng hơn |
| 2 | Lập bảng ánh xạ trường, mã giá trị, định dạng ngày cũ sang trường chuẩn (Mục 4, 6) cho riêng đơn vị đó, làm tài liệu kèm hồ sơ |
| 3 | Đơn vị kiểm thử trên môi trường thử nghiệm, API cũ vẫn chạy |
| 4 | Đơn vị chuyển hẳn sang bộ API chuẩn trên môi trường chính thức |
| 5 | Thông báo ngày dừng và dừng API cũ của đơn vị đó |

---

## 11. Câu hỏi còn mở

| # | Câu hỏi | Hướng xử lý |
|---|---|---|
| Q1 | Con số mặc định của ngưỡng số lượt gọi (NFR-06) | Dev đề xuất sau khi đo tải |
| Q2 | Bộ mã độ khẩn đầy đủ trên iOffice (Mục 6.6) — có mức "Thượng khẩn" không | Lấy từ danh mục độ khẩn của hệ thống |
---

## Phụ lục A. Đối tượng mở rộng (dự kiến bản 1.1 — D7)

Chỉ áp phạm vi `CA_NHAN`, phục vụ không gian làm việc số.

### A.1. Công việc — "Danh sách công việc cần xử lý"

| Trường | Ghi chú |
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

### A.2. Trao đổi thông tin — "Danh sách trao đổi thông tin chưa đọc"

| Trường | Ghi chú |
|---|---|
| Người gửi | |
| Tiêu đề | |
| Nội dung | Nhóm NC |
| Thời gian gửi | |
| Trạng thái đọc | Đã đọc / chưa đọc |

Nguồn dữ liệu: menu **Thông tin điều hành** trên iOffice. Tiêu chí lọc: người dùng (token), khoảng thời gian, trạng thái đọc.
