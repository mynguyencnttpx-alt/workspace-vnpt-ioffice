# INTEGRATION RULES — Quy tắc Viết Đặc tả Tích hợp API

> File này được đọc khi WRITE mode gặp chức năng/module có tích hợp với hệ thống khác qua API.
> Áp dụng cho 2 hướng: hệ thống **cung cấp** API (provide) và hệ thống **gọi** API của bên ngoài (consume).
> Hai hướng có bản chất khác nhau → áp dụng đúng rule tương ứng, không trộn lẫn.

---

## BƯỚC 0 — XÁC ĐỊNH HƯỚNG TÍCH HỢP

Khi phát hiện mô tả có tích hợp hệ thống khác, hỏi ngay nếu chưa rõ:

```
Tích hợp này theo hướng nào?
A. Hệ thống của mình CUNG CẤP API cho bên kia gọi vào
B. Hệ thống của mình GỌI API của bên kia để lấy/gửi dữ liệu
C. Cả 2 chiều (gồm cả A và B)
```

| Câu hỏi kiểm tra | Hướng |
|---|---|
| "Hệ thống X sẽ gọi sang hệ thống mình để lấy/gửi Y" | **A — PROVIDE** |
| "Mình cần gọi sang hệ thống X để lấy/gửi Y" | **B — CONSUME** |
| Cả hai chiều cùng tồn tại trong 1 nghiệp vụ (đồng bộ 2 chiều) | **C — Áp dụng cả 2 rule, viết riêng từng chiều** |

> **Không tự đoán hướng nếu mô tả mơ hồ.** Một câu như "tích hợp với hệ thống kế toán để đồng bộ công văn" có thể là A, B, hoặc C — phải hỏi rõ trước khi viết.

---

## HƯỚNG A — HỆ THỐNG CUNG CẤP API (PROVIDE)

### Nguyên tắc đặt vị trí

API được cung cấp = **1 chức năng độc lập**, vì có actor riêng (hệ thống/đối tác bên ngoài gọi vào), có input/output riêng, có thể có quyền truy cập riêng.

```
Đặt API expose vào danh sách Chức năng của Module, ngang hàng các chức năng UI khác:
  Chức năng N: Cung cấp API <tên nghiệp vụ> cho <tên hệ thống/đối tác tích hợp>
```

- Tên chức năng phải nêu rõ mục đích nghiệp vụ, không đặt tên kỹ thuật chung: "Cung cấp API tra cứu trạng thái văn bản", không đặt "API văn bản"
- Nếu 1 module có nhiều API cho nhiều mục đích khác nhau → tách thành nhiều chức năng riêng (áp dụng đúng nguyên tắc tách chức năng đã có ở Rule B — output khác nhau, trigger khác nhau)

### Cấu trúc 1 chức năng API — bổ sung mục con "Đặc tả API"

Chức năng dạng API vẫn giữ đủ 4 section như Rule B, nhưng **Quy trình** được thay bằng **Đặc tả API**, đặt ở đúng vị trí Quy trình (đầu tiên trong chức năng):

```
Chức năng N: Cung cấp API <tên>
  ├─ Đặc tả API                    ← thay cho mục "Quy trình"
  │   ├─ Thông tin chung
  │   ├─ Bảng Request
  │   └─ Bảng Response
  ├─ Chức năng nghiệp vụ            ← giữ nguyên: Luồng thành công / Luồng ngoại lệ / Quy tắc nghiệp vụ
  ├─ Thông báo và thông tin lưu vết log
  └─ Edge cases
```

> **Lý do không bỏ 3 mục còn lại:** API vẫn có logic xử lý sau khi nhận request (validate, ghi DB, trả response) — logic này viết theo đúng Luồng thành công / Luồng ngoại lệ / BR như chức năng UI thông thường. Chỉ phần "hợp đồng kỹ thuật" (endpoint, schema) cần mục riêng vì 4 mục cũ không có chỗ chứa.

#### 1. Thông tin chung

| Thông tin | Bắt buộc | Ví dụ |
|---|---|---|
| Endpoint | ✅ | `/api/v1/documents/{id}/status` |
| Method | ✅ | `GET` / `POST` / `PUT` / `DELETE` |
| Mục đích | ✅ | "Cho phép hệ thống đối tác tra cứu trạng thái xử lý văn bản theo mã văn bản" |
| Cơ chế xác thực | ✅ | API Key / OAuth2 / Token theo header `Authorization: Bearer <token>` |
| Hệ thống/đối tác được phép gọi | ✅ nếu xác định được | "Hệ thống Kế toán VNPT-IT" |
| Rate limit (nếu có) | ⚪ | "Tối đa 100 request/phút/đối tác" |

Nếu thiếu thông tin xác thực hoặc đối tác cụ thể → đánh dấu `[CẦN XÁC NHẬN]`, không tự giả định.

#### 2. Bảng Request

| Tên field | Vị trí | Kiểu dữ liệu | Bắt buộc | Mô tả / Ràng buộc | Mapping với hệ thống |
|---|---|---|---|---|---|
| `documentId` | Path / Query / Body / Header | String / Number / Date / ... | ✅ / ⚪ | Ý nghĩa nghiệp vụ + ràng buộc giá trị | Map vào trường `<TenBang>.<TenCot>` trong DB, hoặc field nào trên UI |

- **Vị trí**: ghi rõ field nằm ở Path param, Query param, Body, hay Header — sai vị trí là lỗi tích hợp phổ biến nhất
- **Mapping với hệ thống**: đây là yêu cầu bắt buộc theo BM_SRS_AI — mỗi field input phải truy được ra nó tương ứng trường/đối tượng nào trong hệ thống mình (bảng DB, hoặc field UI nếu request tạo ra thay đổi hiển thị trực tiếp)
- Field dạng object/array lồng nhau → tách thành nhiều dòng con, dùng ký hiệu `parent.child` ở cột Tên field

#### 3. Bảng Response

**Response thành công:**

| Tên field | Kiểu dữ liệu | Mô tả / Ràng buộc | Mapping với hệ thống |
|---|---|---|---|
| `status` | String | Giá trị enum: `PENDING` / `PROCESSING` / `DONE` / `REJECTED` | Map từ trường `TrangThai` trong bảng `VanBan` |

**Response lỗi** — liệt kê theo HTTP status code, không gộp chung "lỗi":

| HTTP Status | Mã lỗi nội bộ | Tình huống | Nội dung trả về |
|---|---|---|---|
| 400 | `INVALID_PARAM` | Thiếu hoặc sai kiểu dữ liệu field bắt buộc | `{"error": "INVALID_PARAM", "message": "..."}` |
| 401 | `UNAUTHORIZED` | Token không hợp lệ hoặc hết hạn | `{"error": "UNAUTHORIZED"}` |
| 404 | `NOT_FOUND` | Không tìm thấy bản ghi theo `documentId` | `{"error": "NOT_FOUND"}` |

> Bảng response lỗi này phục vụ phần **② Luồng xử lý ngoại lệ** ngay bên dưới — mỗi dòng ở đây nên có 1 EX-XX tương ứng mô tả hành vi hệ thống xử lý (log, không đổi state, v.v.), không lặp lại nguyên bảng.

### Chức năng nghiệp vụ của API (giữ nguyên Rule B.2)

- **Luồng thành công**: viết các bước xử lý backend sau khi nhận request hợp lệ — validate quyền, xử lý nghiệp vụ, build response. Actor ở bước đầu là tên hệ thống gọi vào (ví dụ: "Hệ thống Kế toán"), không phải "Hệ thống" của mình.
- **Luồng ngoại lệ**: map 1-1 với bảng Response lỗi ở trên — mỗi HTTP status lỗi → 1 EX-XX.
- **Quy tắc nghiệp vụ**: logic xử lý nghiệp vụ phức tạp không thể hiện bằng bước tuần tự (ví dụ: "Nếu văn bản đã bị thu hồi, API trả `status=REJECTED` kèm lý do thu hồi trong field `reason`").

---

## HƯỚNG B — HỆ THỐNG GỌI API CỦA BÊN NGOÀI (CONSUME)

### Nguyên tắc đặt vị trí

Gọi API bên ngoài **không phải 1 chức năng độc lập** — nó là **1 bước trong luồng xử lý** của chức năng đã có (chức năng vẫn có UI, có actor nội bộ, API chỉ là 1 bước hệ thống thực hiện ở giữa luồng).

```
Không tạo "Chức năng: Gọi API ABC" riêng.
Viết "Hệ thống gọi API <tên hệ thống đối tác> để <mục đích>" làm 1 bước
trong bảng Luồng xử lý thành công (① B.2), giữ ngắn gọn — chi tiết kỹ thuật để ở mục riêng dưới đây.
```

### Mục con "Đặc tả tích hợp API" — đặt trong Chức năng nghiệp vụ, sau bảng Luồng thành công

```
Chức năng N: <Tên chức năng nghiệp vụ, ví dụ: Tra cứu thông tin CCCD>
  ├─ Quy trình (nếu có)
  ├─ Chức năng nghiệp vụ
  │   ├─ ① Luồng xử lý thành công     (bước gọi API ghi ngắn ở đây)
  │   ├─ Đặc tả tích hợp API           ← MỤC MỚI, đặt ngay sau bảng Luồng thành công
  │   │   ├─ Thông tin chung (API bên ngoài)
  │   │   ├─ Mapping Request (hệ thống mình → API đối tác)
  │   │   └─ Mapping Response (API đối tác → hệ thống mình)
  │   ├─ ② Luồng xử lý ngoại lệ        (lỗi gọi API ghi ở đây — EX-XX)
  │   └─ ③ Quy tắc nghiệp vụ           (BR-XX cho logic mapping phức tạp)
  ├─ Thông báo và thông tin lưu vết log
  └─ Edge cases
```

#### 1. Thông tin chung (API bên ngoài)

| Thông tin | Bắt buộc | Ví dụ |
|---|---|---|
| Hệ thống đối tác | ✅ | "Hệ thống Cơ sở dữ liệu Quốc gia về Dân cư (VNeID)" |
| Endpoint được gọi | ✅ | `https://api.partner.gov.vn/v1/citizen/lookup` |
| Method | ✅ | `GET` / `POST` |
| Cơ chế xác thực | ✅ | "API Key cấp bởi đối tác, truyền qua header `X-API-Key`" |
| Thời điểm gọi (trigger) | ✅ | "Ngay khi Văn thư nhấn nút Tra cứu ở Bước 2" |
| Timeout / Retry | ⚪ nếu có | "Timeout 5s, không retry tự động" |

Nếu chưa có tài liệu API của đối tác → đánh dấu `[CẦN XÁC NHẬN — chờ tài liệu API từ <tên đối tác>]`, không tự bịa field.

#### 2. Mapping Request — hệ thống mình → API đối tác

Đây là phần **bắt buộc theo yêu cầu**: mapping dữ liệu input của API với thông tin trên hệ thống mình.

| Field gửi đi (API đối tác) | Kiểu dữ liệu | Bắt buộc | Lấy từ đâu trong hệ thống mình | Transform / Format (nếu có) |
|---|---|---|---|---|
| `citizenId` | String | ✅ | Field "Số CCCD" trên màn hình Tra cứu | Không |
| `requestDate` | String (ISO 8601) | ✅ | Ngày hiện tại của server | Format `YYYY-MM-DD` |

- Cột "Lấy từ đâu trong hệ thống mình": phải trỏ được đến field UI cụ thể, hoặc trường DB cụ thể — không ghi mơ hồ "dữ liệu liên quan"
- Field cần transform (đổi format ngày, mã hóa, nối chuỗi nhiều field...) → ghi rõ công thức ở cột cuối, nếu phức tạp thì viết thành BR riêng và tham chiếu mã BR ở đây

#### 3. Mapping Response — API đối tác → hệ thống mình

| Field nhận về (API đối tác) | Kiểu dữ liệu | Map vào đâu trong hệ thống mình | Transform / Format (nếu có) | Xử lý khi null/thiếu |
|---|---|---|---|---|
| `fullName` | String | Field "Họ tên" trên màn hình kết quả, đồng thời lưu vào `KetQuaTraCuu.HoTen` | Không | Hiển thị "Không có dữ liệu" |
| `birthDate` | String (`DD/MM/YYYY`) | Field "Ngày sinh" | Parse về `Date` theo định dạng hệ thống `YYYY-MM-DD` | Bỏ qua, không hiển thị field |

- **Cột "Xử lý khi null/thiếu" là bắt buộc** — đây là lỗi tích hợp gây bug nhiều nhất khi bị bỏ qua trong SRS
- Nếu response trả về cấu trúc lồng nhau (nested object/array) → tách dòng theo `parent.child`, hoặc nếu là array cần lặp để hiển thị (ví dụ danh sách nhiều kết quả) → ghi rõ quy tắc lặp ở Quy tắc nghiệp vụ (BR)

### Luồng thành công, luồng ngoại lệ, BR (giữ nguyên Rule B.2, áp dụng thêm cho phần API)

**① Luồng thành công** — bước gọi API ghi ngắn, không nhúng bảng mapping vào đây:

| Bước | Actor | Hành động | Xử lý hệ thống |
|---|---|---|---|
| 2 | Văn thư | Nhấn nút "Tra cứu" | Hệ thống gọi API tra cứu CCCD sang VNeID — *chi tiết mapping xem mục Đặc tả tích hợp API* |
| 3 | — | — | Hệ thống nhận response, map dữ liệu vào màn hình kết quả |

**② Luồng ngoại lệ** — mọi lỗi liên quan đến gọi API đều viết EX-XX ở đây, không viết riêng "lỗi API" thành mục khác:

| Mã | Tình huống | Xử lý |
|---|---|---|
| EX-0X | API đối tác timeout hoặc không phản hồi sau thời gian quy định | Hiển thị thông báo "Không thể kết nối hệ thống tra cứu, vui lòng thử lại", không lưu kết quả rỗng |
| EX-0X | API đối tác trả lỗi xác thực (401/403) | Ghi log lỗi, hiển thị thông báo lỗi chung cho user, không hiển thị chi tiết kỹ thuật |
| EX-0X | API đối tác trả về dữ liệu không đúng định dạng dự kiến | Ghi log raw response để debug, hiển thị "Dữ liệu trả về không hợp lệ" |

**③ Quy tắc nghiệp vụ** — logic mapping phức tạp không thể hiện bằng 1 dòng bảng:

- BR-0X: `<Field response trả về nhiều giá trị>` → `<Logic chọn giá trị nào, hoặc cách gộp>` → `<Field hiển thị/lưu>`
- BR-0X: `<Điều kiện retry hoặc cache kết quả>` → `<Logic>` → `<Output>`

---

## CHECKLIST BỔ SUNG — TÍCH HỢP API

Áp dụng thêm các mục này vào FINAL CHECKLIST chung khi tài liệu có tích hợp API:

**Hướng A (Provide)**
- [ ] Mỗi API có đủ: Endpoint, Method, cơ chế xác thực
- [ ] Bảng Request ghi rõ vị trí field (Path/Query/Body/Header) và mapping với hệ thống
- [ ] Bảng Response có cả response thành công và response lỗi theo HTTP status
- [ ] Mỗi response lỗi có 1 EX-XX tương ứng ở Luồng ngoại lệ

**Hướng B (Consume)**
- [ ] Có bảng Mapping Request: field gửi đi ↔ field/nguồn dữ liệu trong hệ thống mình
- [ ] Có bảng Mapping Response: field nhận về ↔ field/nơi lưu trong hệ thống mình
- [ ] Bảng Mapping Response có cột xử lý khi null/thiếu dữ liệu
- [ ] Lỗi gọi API (timeout, lỗi xác thực, dữ liệu sai định dạng) đều có EX-XX
- [ ] Logic transform/format phức tạp được tách thành BR riêng, không nhúng trong bảng mapping
- [ ] Bước gọi API trong Luồng thành công chỉ ghi ngắn, không lặp lại nội dung mapping

**Cả 2 hướng**
- [ ] Không tự giả định thông tin API (endpoint, field, cơ chế xác thực) khi chưa có tài liệu từ đối tác — đánh dấu `[CẦN XÁC NHẬN]`
- [ ] Không trộn nội dung mapping vào bảng field UI (Yêu cầu giao diện) — 2 bảng có mục đích khác nhau
