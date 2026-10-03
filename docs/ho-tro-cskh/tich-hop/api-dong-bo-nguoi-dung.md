---
type: api-contract
feature: ho-tro-cskh
status: draft
updated: 2026-10-02
links:
  - docs/ho-tro-cskh/srs/ho-tro-cskh-userflow.md
---

# API đồng bộ người dùng & đơn vị — hợp đồng tích hợp iOffice / iStorage → CSKH

Tài liệu giao cho đội iOffice và iStorage. Luồng gồm **2 API**: **API 1** — máy chủ site gọi CSKH để đồng bộ đơn vị và người dùng (`POST /api/v1/tich-hop/dong-bo-nguoi-dung`, mục 3–5); **API 2** — trình duyệt người dùng mở địa chỉ đăng nhập một lần do API 1 trả về (`GET /vao?m=…`, mục 5A). Nghiệp vụ gốc: SRS `dang-nhap-kich-hoat` v1.4 Chức năng 5 và `quan-tri-nguoi-dung` v1.4 Chức năng 1. Các mục đánh dấu `[GIẢ ĐỊNH]` là đề xuất, chờ hai bên chốt.

## 1. Mục đích và luồng

Mỗi lần người dùng đang đăng nhập iOffice/iStorage bấm "Hỗ trợ khách hàng", **máy chủ** site gọi API này để CSKH đồng bộ đơn vị và người dùng, rồi nhận về địa chỉ đăng nhập một lần và chuyển trình duyệt sang đó. Không đồng bộ hàng loạt, không SSO/LDAP, không gọi từ trình duyệt.

```
Người dùng ──(1) bấm Hỗ trợ khách hàng──► Máy chủ site
Máy chủ site ──(2) API 1: POST /api/v1/tich-hop/dong-bo-nguoi-dung (ký HMAC)──► CSKH
CSKH ──(3) xác thực, tạo/cập nhật khách hàng + tài khoản + danh tính──►
CSKH ──(4) dangNhapUrl (60 giây, 1 lần)──► Máy chủ site
Máy chủ site ──(5) trả HTTP 302 (của site) tới dangNhapUrl──► Trình duyệt
Trình duyệt ──(6) API 2: GET /vao?m=…──► CSKH ──(7) HTTP 303 + cookie phiên──► trang đầu (không hiện màn đăng nhập)
```

## 2. Điều kiện trước khi gọi (làm 1 lần cho mỗi site)

Quản trị viên CSKH đăng ký site ở danh mục Site: dịch vụ, **domain hợp lệ** (nhiều domain cùng 1 hệ thống `cloud_admin` thuộc cùng 1 site), **IP máy chủ được phép** (tùy chọn), địa bàn của site, bật tích hợp. Quản trị viên bấm **"Tạo khóa"** ở màn Sửa Site: hệ thống sinh **Khóa tích hợp** (dạng `cskh_sk_live_…`) và hiện đúng 1 lần (không xem lại được); Quản trị viên chuyển khóa và **mã site** (`X-Site-Id`) cho đội site, đội site lưu trong cấu hình máy chủ (không ghi log, không đưa xuống trình duyệt, không đưa vào mã nguồn). Khóa dài hạn, không tự hết hạn; xoay vòng khi cần (khóa cũ còn hiệu lực ngắn để kịp đổi cấu hình). Mỗi site một khóa, **không** cấp theo từng sở/ban/ngành.

## 3. Yêu cầu

- **Phương thức / đường dẫn:** `POST https://<địa chỉ CSKH>/api/v1/tich-hop/dong-bo-nguoi-dung` `[GIẢ ĐỊNH — địa chỉ theo môi trường]`
- **Giao thức:** HTTPS, `Content-Type: application/json; charset=utf-8`
- **Thời gian chờ nên đặt:** 5–10 giây; thử lại tối đa 1 lần với nonce mới (lời gọi an toàn khi gọi lặp — mục 7)

### 3.1. Tiêu đề (chốt)

| Tiêu đề | Ý nghĩa |
|---|---|
| `X-Site-Id` | Mã site do CSKH cấp lúc đăng ký |
| `X-Timestamp` | Giây Unix lúc gọi; CSKH từ chối lệch quá 60 giây |
| `X-Nonce` | Chuỗi ngẫu nhiên dùng 1 lần (vd UUID); CSKH nhớ 5 phút và từ chối nếu thấy lại |
| `X-Signature` | Chữ ký HMAC-SHA256, hex thường (mục 4) |

### 3.2. Nội dung (JSON)

```json
{
  "domain": "ioffice.tuyenquang.gov.vn",
  "maDonVi": "so.noivu",
  "tenDonVi": "Sở Nội vụ",
  "maNguoiDung": "u12345",
  "hoTen": "Nguyễn Văn A",
  "email": "a@tuyenquang.gov.vn",
  "sdt": "0987654321",
  "trangThai": "hoat_dong"
}
```

| Trường | Bắt buộc | Mô tả |
|---|---|---|
| `domain` | Có | Domain người dùng đang dùng; phải thuộc danh sách của site |
| `maDonVi` | Có | **Tên schema của đơn vị trên site — có thể chứa dấu chấm (vd `so.noivu`)**; duy nhất trong site; tối đa 100 ký tự; gửi đúng như trên site; CSKH so khớp không phân biệt hoa thường |
| `tenDonVi` | Có | Tên hiển thị của đơn vị; dùng khi tự tạo khách hàng mới |
| `maNguoiDung` | Có | Mã người dùng, duy nhất trong cả hệ thống `cloud_admin` |
| `hoTen` | Có | Họ tên, tối đa 100 ký tự |
| `email` | Có | Email của người dùng; nơi CSKH gửi thông báo; định danh duy nhất tài khoản CSKH |
| `sdt` | Không | Số điện thoại Việt Nam |
| `trangThai` | Có | `hoat_dong` hoặc `vo_hieu_hoa` (người dùng bị khóa/nghỉ trên site) |

Quy ước: UTF-8; không gửi trường lạ; email chuẩn hóa chữ thường phía CSKH. Mỗi người thuộc đúng 1 đơn vị tại 1 thời điểm (đã xác nhận). Chưa có cờ đầu mối `[GIẢ ĐỊNH — thêm sau nếu cần]`.

## 4. Cách tính chữ ký (chốt)

Chuỗi cần ký gồm 5 dòng nối bằng ký tự xuống dòng `\n`, **không có dòng trống ở cuối**:

```
POST
/api/v1/tich-hop/dong-bo-nguoi-dung
<X-Timestamp>
<X-Nonce>
<SHA-256 của nội dung JSON, hex thường>
```

`X-Signature = hex_thường( HMAC-SHA256( khóa tích hợp, chuỗi ký ) )`.

**Băm đúng byte đã gửi:** SHA-256 tính trên chính chuỗi JSON gửi đi (UTF-8); không dựng lại JSON sau khi băm, không đổi thứ tự trường.

### Bộ giá trị mẫu để tự kiểm tra

Khóa thử `cskh_sk_test_0123456789abcdef`; nội dung JSON đúng như mục 3.2 viết **trên một dòng, không khoảng trắng thừa** (`{"domain":"ioffice.tuyenquang.gov.vn","maDonVi":"so.noivu","tenDonVi":"Sở Nội vụ","maNguoiDung":"u12345","hoTen":"Nguyễn Văn A","email":"a@tuyenquang.gov.vn","sdt":"0987654321","trangThai":"hoat_dong"}`); `X-Timestamp = 1790899200`; `X-Nonce = b6f1c0d2-4a7e-4e0a-9c11-0d6a5d2f7a31`:

- SHA-256 nội dung = `fe92e217f7d27fd89e28fcc1fec21e1c8db1776b854493487a40b4c626319367`
- `X-Signature` = `938dfb2a5a80db54d2b695ecc489ca3544a4297542c650bb116c9b3983fb79c4`

### Mẫu mã (Java, minh họa)

```java
String body = objectMapper.writeValueAsString(payload);               // UTF-8
String ts = String.valueOf(Instant.now().getEpochSecond());
String nonce = UUID.randomUUID().toString();
String bodyHash = hex(MessageDigest.getInstance("SHA-256").digest(body.getBytes(UTF_8)));
String canon = String.join("\n", "POST", "/api/v1/tich-hop/dong-bo-nguoi-dung", ts, nonce, bodyHash);
Mac mac = Mac.getInstance("HmacSHA256");
mac.init(new SecretKeySpec(secret.getBytes(UTF_8), "HmacSHA256"));
String sig = hex(mac.doFinal(canon.getBytes(UTF_8)));
// POST body với X-Site-Id, X-Timestamp, X-Nonce, X-Signature
// Thành công → site trả HTTP 302 cho trình duyệt tới response.dangNhapUrl (API 2, mục 5A)
```

## 5. Phản hồi

### 5.1. Thành công — HTTP 200

```json
{
  "khachHangId": "…",
  "taiKhoanId": "…",
  "dangNhapUrl": "https://<địa chỉ CSKH>/vao?m=<mã một lần>",
  "hetHanTrong": 60,
  "ketQua": { "khachHangMoi": false, "taiKhoanMoi": true, "danhTinhMoi": true, "daChuyenDonVi": false }
}
```

`dangNhapUrl` hiệu lực 60 giây, dùng đúng 1 lần, không chứa thông tin cá nhân; máy chủ site phải chuyển hướng trình duyệt tới đó ngay.

### 5.2. Lỗi

Mã lỗi nghiệp vụ là **đề xuất `[GIẢ ĐỊNH]`**, chốt khi cài đặt. Thân lỗi: `{ "ma": "E-TH-001", "tieuDe": "…", "truong": "email" }` (`truong` chỉ có với lỗi 400).

| HTTP | Mã | Tình huống | Xử lý phía site |
|---|---|---|---|
| 401 | E-TH-001 | Thiếu tiêu đề, chữ ký sai | Kiểm tra khóa, cách ghép chuỗi ký; không thử lại tự động |
| 401 | E-TH-002 | Mốc giờ lệch quá 60 giây | Đồng bộ giờ máy chủ (NTP) rồi thử lại |
| 401 | E-TH-003 | Nonce đã dùng | Sinh nonce mới rồi thử lại |
| 403 | E-TH-004 | Site chưa đăng ký / tạm ngừng tích hợp, domain hoặc IP không thuộc site, hoặc site chưa khai địa bàn mà đơn vị gửi lên chưa có (chưa tự tạo được khách hàng) | Liên hệ Quản trị viên CSKH |
| 400 | E-TH-005 | Thiếu trường bắt buộc hoặc sai định dạng (nêu rõ `truong`) | Sửa dữ liệu gửi |
| 409 | E-TH-006 | Email trùng tài khoản nội bộ | Hiện thông báo chung cho người dùng, liên hệ Quản trị viên CSKH |
| 409 | E-TH-007 | Danh tính trỏ khách hàng khác với khách hàng hiện tại của tài khoản (trùng email giữa 2 đơn vị) | Như trên |
| 403 | E-TH-008 | Tài khoản đang bị vô hiệu hóa (do site báo hoặc do Quản trị viên CSKH) | Hiện thông báo chung |
| 429 | E-TH-009 | Vượt hạn mức gọi của site `[GIẢ ĐỊNH: 300 lời gọi/phút; 100 khách hàng tự tạo/ngày]` | Chờ rồi thử lại |
| 503 | E-TH-010 | CSKH tạm lỗi | Cho người dùng thử lại (an toàn gọi lặp) |

Người dùng cuối **không** thấy mã lỗi CSKH; site hiện thông báo của chính mình.

## 5A. API 2 — Địa chỉ đăng nhập một lần (`GET /vao`)

API 2 là bước **trình duyệt** của người dùng đi vào CSKH sau khi API 1 thành công. Phía site **không gọi** API này từ máy chủ — chỉ chuyển hướng trình duyệt tới `dangNhapUrl` đã nhận ở mục 5.1.

| Mục | Nội dung |
|---|---|
| Địa chỉ | `GET https://<địa chỉ CSKH>/vao?m=<mã một lần>` (chính là `dangNhapUrl`; không sửa, không thêm tham số) |
| Ai gọi | **Trình duyệt** của người dùng, ngay sau khi site chuyển hướng (HTTP 302 từ site tới địa chỉ này) |
| Xác thực | Không có tiêu đề/chữ ký; chỉ cần mã `m` còn hiệu lực. Mã sinh ngẫu nhiên, CSKH chỉ lưu bản băm, **không chứa thông tin cá nhân** |
| Hiệu lực mã | **60 giây** kể từ lúc API 1 trả về và **dùng đúng 1 lần** (mở lần 2 là hỏng). Mỗi lần gọi API 1 cấp 1 mã riêng, mã nào mở trước thắng |

**Kết quả:**

| Tình huống | Phản hồi của CSKH | Người dùng thấy |
|---|---|---|
| Mã hợp lệ, tài khoản đang hoạt động | **HTTP 303** tới trang đầu theo vai trò (khách hàng: `/tra-cuu`); kèm cookie phiên `cskh_phien` (HttpOnly, SameSite=Lax, Secure khi chạy thật), **tối đa 8 giờ** `[GIẢ ĐỊNH]`, không gia hạn | Vào thẳng CSKH, không hiện màn đăng nhập |
| Mã sai, hết hạn (quá 60 giây), đã dùng rồi, hoặc tài khoản không còn hoạt động | **HTTP 303** tới `/khong-vao-duoc`, **không** đặt cookie, không nói rõ lý do (không lộ thông tin tài khoản) | Màn **"Không vào được từ site dịch vụ"** của CSKH: hướng dẫn quay lại iOffice/iStorage bấm lại "Hỗ trợ khách hàng", kèm nút "Quay lại trang trước". Tài khoản đồng bộ **không có mật khẩu CSKH** nên không đăng nhập thay thế được |

Phản hồi đặt `Cache-Control: no-store` và `Referrer-Policy: no-referrer` để mã không bị lưu đệm hay lộ qua tiêu đề Referer. Màn "Không vào được từ site dịch vụ" (SRS `dang-nhap-kich-hoat` EX-09, Figma 62b) hiện câu chữ tạm `[GIẢ ĐỊNH]`.

**Việc phía site:** chuyển hướng ngay (trong 60 giây); không gọi lại `dangNhapUrl` từ máy chủ, không lưu hay ghi log địa chỉ này (mã còn hiệu lực trong 60 giây đầu); nếu người dùng quay lại thấy màn đăng nhập thì hiển thị hướng dẫn bấm lại nút từ site.

## 6. CSKH xử lý theo thứ tự nào

1. Site tồn tại và đang bật tích hợp → domain (và IP nếu có khai) thuộc site → mốc giờ trong 60 giây → nonce chưa dùng → tính lại chữ ký, so sánh theo thời gian không đổi → trong hạn mức → đủ trường và đúng định dạng.
2. **Đơn vị** theo (site, `maDonVi`): chưa có thì tự tạo khách hàng (tên theo `tenDonVi`, địa bàn và hình thức hỗ trợ theo site, cờ "tự tạo từ site — chưa rà soát"); site chưa khai địa bàn thì từ chối.
3. **Người dùng** theo danh tính (site, `maNguoiDung`): đã có thì dùng; chưa có thì gộp theo email nếu tài khoản cũ là khách hàng đã có danh tính site, trùng nội bộ thì chặn, còn lại tạo tài khoản thành viên **không có mật khẩu CSKH**. Mã đơn vị gửi lên khác khách hàng hiện tại thì chuyển sang khách hàng mới (phiếu cũ giữ ở đơn vị cũ) `[GIẢ ĐỊNH]`.
4. Cập nhật họ tên và trạng thái: `vo_hieu_hoa` → vô hiệu hóa tài khoản; `hoat_dong` trở lại → kích hoạt lại **nếu** trước đó do site vô hiệu hóa. Email nhận thông báo không bị ghi đè.
5. Tạo `dangNhapUrl` và trả về. Toàn bộ trong 1 giao dịch.

## 7. Quy tắc cho phía site

- Gọi từ **máy chủ**, không từ trình duyệt; không đưa khóa vào URL, trình duyệt, log hay mã nguồn.
- Giờ máy chủ chính xác (NTP); mỗi lời gọi một nonce mới.
- **Gọi lặp an toàn:** cùng nội dung cho cùng kết quả; hai lần bấm gần nhau không tạo trùng khách hàng hay tài khoản (CSKH xử lý có khóa theo đơn vị và người dùng); mỗi lần gọi cấp 1 `dangNhapUrl` riêng, địa chỉ nào mở trước thắng.
- Chuyển hướng trình duyệt tới `dangNhapUrl` ngay (60 giây) — đây là **API 2**, chi tiết mục 5A.
- Người dùng bị khóa ở site: gửi `trangThai = vo_hieu_hoa` ở lần gọi kế tiếp, hoặc không hiện nút "Hỗ trợ khách hàng". **Giai đoạn đầu chưa có API vô hiệu hóa tức thời**; phiên CSKH đang mở hết hạn trong tối đa 8 giờ `[GIẢ ĐỊNH]`.
- Tài khoản đồng bộ từ site **không có mật khẩu CSKH**; người dùng chỉ vào CSKH qua nút này; hết phiên phải bấm lại từ site.

## 8. Việc còn mở

- Địa chỉ CSKH từng môi trường (thử nghiệm/sản xuất) và cách cấp mã site, khóa.
- Cấu trúc iStorage (mỗi domain một hệ thống, chia theo tenant) — phía iStorage xác nhận; nếu khác iOffice thì bổ sung trường hoặc quy ước ánh xạ `maDonVi`.
- Chốt các mục `[GIẢ ĐỊNH]` ở SRS: đổi đơn vị, cờ đầu mối, API vô hiệu hóa tức thời, phiên 8 giờ, hạn mức.
