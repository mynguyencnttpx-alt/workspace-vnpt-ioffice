---
module: Quản lý công việc (Web) — Đôn đốc công việc
function_ids: [FC-001, FC-002]
doc_type: new
cr_id: null
based_on: null
affected_functions: []
version: 1.0
status: approved
gate_passed: [gate-1-input, gate-2-outline, gate-3-self-review, gate-4-approval]
review_score: 8.3
approved_by: "@mynguyen.cntt.px"
approved_date: 2026-09-26
jira_ticket: null
jira_url: null
---

# NỘI DUNG

## ĐẶC TẢ YÊU CẦU CHỨC NĂNG HỆ THỐNG

### PHÂN HỆ QUẢN LÝ CÔNG VIỆC (WEB)

#### Module: Đôn đốc công việc

##### Mô tả tóm tắt

Người giao việc gửi yêu cầu đôn đốc đến từng cá nhân/đơn vị nhận việc, tại từng dòng trong box Phân công thực hiện của màn hình Chi tiết công việc đã giao, khi công việc sắp đến hạn hoặc chưa đúng tiến độ. Người nhận việc xem nội dung đôn đốc qua icon "có đôn đốc mới". Người giao việc và Lãnh đạo cấp trên xem lại nội dung đôn đốc ở Tab "Lịch sử tác động". Tài liệu thay thế mục "Chức năng Gửi đôn đốc/Xem thông tin đôn đốc" (II.2.1.9.7) của `IOFFICE_SRS_V6_QUAN_LY_CONG_VIEC_v1.0.docx`.

---

##### Bảng thuật ngữ & Actor tham gia

**Từ viết tắt & thuật ngữ**

| Từ viết tắt / Thuật ngữ | Giải thích |
|---|---|
| Dòng nhận việc | Một dòng trong box Phân công thực hiện, thể hiện 1 cá nhân hoặc 1 đơn vị được giao công việc, kèm vai trò, hạn xử lý, trạng thái |
| Đôn đốc | Yêu cầu nhắc nhở do Người giao việc gửi tới 1 dòng nhận việc, gồm loại đôn đốc, nội dung, tệp đính kèm |
| Loại đôn đốc | Nhắc nhở / Phê bình / Kiểm điểm, lấy từ danh mục tiêu chí đôn đốc; cũng là loại được thống kê ở cột "Số lần bị đôn đốc" trong báo cáo |
| Người tiếp nhận đôn đốc | Người thực tế nhận thông báo đôn đốc: với dòng cá nhân là chính cá nhân đó; với dòng đơn vị là Trưởng đơn vị hoặc người có quyền xử lý công việc trên đơn vị đó |
| Log tác động | Lịch sử tác động công việc, hiển thị tại Tab "Lịch sử tác động", ghi theo bảng "Thông tin log tác động công việc" trong SRS Quản lý công việc |

**Actor tham gia**

| Actor | Vai trò / Mô tả trong phạm vi module này |
|---|---|
| Người giao việc | Người tạo/giao công việc; người duy nhất được gửi đôn đốc cho công việc do mình giao |
| Người tiếp nhận đôn đốc | Nhận thông báo đôn đốc, xem nội dung qua icon "có đôn đốc mới" |
| Lãnh đạo cấp trên | Không có màn hình đôn đốc riêng; chỉ xem nội dung đôn đốc ở Tab "Lịch sử tác động" |

---

##### Phạm vi chỉnh sửa

- Màn hình Chi tiết công việc đã giao — Tab "Thông tin công việc" — box Phân công thực hiện (dòng nhận việc)
- Danh sách công việc — cột Thông tin (icon "có đôn đốc mới")
- Tab "Lịch sử tác động" (dòng log Nhóm 7 — Đôn đốc/Nhắc nhở)
- Báo cáo thống kê — cột "Số lần bị đôn đốc" theo loại đôn đốc (Nhắc nhở, Phê bình, Kiểm điểm)
- Ảnh hưởng gián tiếp: chức năng Xóa thông tin nhận việc (xóa đôn đốc của dòng bị xóa)

---

##### Yêu cầu giao diện

- Hình ảnh giao diện / mockup:

  `[CẦN BỔ SUNG ẢNH]` — `images/FC-001-gui-don-doc-popup.png` (popup Gửi yêu cầu đôn đốc), `images/FC-002-xem-don-doc-popup.png` (popup xem đôn đốc). Chưa có ảnh mockup từ người dùng.

- Bảng mô tả các trường thông tin trên giao diện:

| Tên trường thông tin | Kiểu điều khiển | Độ dài | Ràng buộc / Điều kiện | Kiểu dữ liệu |
|---|---|---|---|---|
| **Box Phân công thực hiện — dòng nhận việc** | | | | |
| Icon Đôn đốc | Icon Button | - | Hiển thị theo từng dòng nhận việc khi đồng thời thỏa: (1) người đăng nhập là Người giao việc/người tạo việc; (2) công việc ở trạng thái Chưa thực hiện hoặc Đang thực hiện; (3) trạng thái dòng nhận việc khác "Đã hoàn thành". Thứ tự icon: 5 (theo bảng nút chức năng theo trạng thái). Click → mở popup Gửi yêu cầu đôn đốc | Action |
| Icon "có đôn đốc mới" (dòng nhận việc) | Icon | - | Hiển thị ở dòng nhận việc có đôn đốc mà Người tiếp nhận đôn đốc đang đăng nhập chưa đọc. Click → mở popup xem đôn đốc (→ FC-002); đọc xong icon mất | Display |
| **Danh sách công việc — cột Thông tin** | | | | |
| Icon "có đôn đốc mới" (danh sách) | Icon | - | Hiển thị ở công việc có đôn đốc mới mà người đăng nhập là Người tiếp nhận đôn đốc và chưa đọc. Click → mở popup xem đôn đốc (→ FC-002); đọc xong icon mất | Display |
| **Popup Gửi yêu cầu đôn đốc** | | | | |
| Tiêu đề | Label | - | Hiển thị cố định: "Gửi yêu cầu đôn đốc" kèm icon [X] góc phải | String |
| Cá nhân/Đơn vị nhận đôn đốc | Label (readonly) | 200 | Họ tên cá nhân hoặc tên đơn vị của dòng nhận việc đang chọn; không cho sửa | String |
| Loại đôn đốc | Combobox | - | Bắt buộc; chọn 1 giá trị từ danh mục: Nhắc nhở / Phê bình / Kiểm điểm; mặc định "Nhắc nhở"; không cho nhập tự do | String |
| Lần đôn đốc | Label (readonly) | - | Bằng số lần đã đôn đốc dòng nhận việc này + 1 (dòng chưa từng đôn đốc → 1); không cho sửa (→ BR-03) | Number |
| Nội dung đôn đốc | Textarea | 1000 | Bắt buộc; 1–1000 ký tự; không cho nhập quá 1000. Bộ đếm "X/1000": màu xám khi < 900, màu cam khi từ 900 đến 1000 | String |
| File đính kèm | File upload (drag & drop) | - | Không bắt buộc; định dạng PDF, DOCX, XLSX, PNG, JPG, ZIP; tối đa 25MB/file; tối đa 3 file mỗi lần gửi (đồng bộ Tab Trao đổi thông tin); mỗi file có icon loại file và nút [X] để bỏ | File |
| Nút [Hủy] và icon [X] | Button/Icon | - | Đóng popup; nếu đã nhập dữ liệu → hiển thị xác nhận "Bạn có chắc muốn hủy? Dữ liệu đã nhập sẽ bị mất." | Action |
| Nút [Gửi đôn đốc] | Button | - | Disable khi chưa có nội dung đôn đốc hoặc đang xử lý; click → thực hiện gửi (→ FC-001, Bước 2) | Action |
| **Popup xem đôn đốc (người tiếp nhận)** | | | | |
| Danh sách đôn đốc | Accordion | - | Mỗi lần đôn đốc là 1 thẻ; sắp xếp mới nhất trước; thẻ mới nhất mở rộng, các thẻ cũ thu gọn; tải 10 thẻ mỗi lần, cuộn hoặc nhấn [Tải thêm] để tải tiếp | List |
| Lần đôn đốc | Label | - | Chỉ đọc; số lần đôn đốc của dòng nhận việc | Number |
| Loại đôn đốc | Label | - | Chỉ đọc | String |
| Người gửi đôn đốc | Label | 200 | Chỉ đọc; họ tên + chức vụ + phòng ban của Người giao việc | String |
| Thời gian gửi | Label | - | Chỉ đọc; HH:mm DD/MM/YYYY | DateTime |
| Nội dung đôn đốc | Label | 1000 | Chỉ đọc; hiển thị đầy đủ, không cắt bớt | String |
| File đính kèm | Link | 255 | Chỉ đọc; tên file + icon loại file; click → mở nội dung file; hiển thị icon lỗi nếu file không còn tồn tại | File |

---

##### Chức năng 1: Gửi đôn đốc

###### Quy trình

```mermaid
sequenceDiagram
    actor Giao as Người giao việc
    participant System as Hệ thống
    participant DB as CSDL
    actor Nhan as Người tiếp nhận đôn đốc

    Giao->>System: (1) Click icon Đôn đốc ở dòng nhận việc
    System->>System: Kiểm tra quyền, trạng thái, người tiếp nhận đôn đốc
    alt Không hợp lệ
        System-->>Giao: Hiển thị cảnh báo EX-06 hoặc EX-07
    else Hợp lệ
        System-->>Giao: Hiển thị popup Gửi yêu cầu đôn đốc
        Giao->>System: (2) Chọn loại, nhập nội dung, đính kèm file, click Gửi đôn đốc
        System->>DB: Kiểm tra lại dòng nhận việc, tính lần đôn đốc, lưu đôn đốc
        System->>DB: Ghi log tác động Nhóm 7
        System-->>Giao: (3) Đóng popup, hiển thị thông báo đã ghi nhận
        System->>Nhan: Gửi thông báo qua tất cả kênh
        System-->>Nhan: Hiển thị icon có đôn đốc mới
        opt Có kênh gửi lỗi
            System-->>Giao: Thông báo kênh lỗi (EX-10, EX-11)
        end
    end
```

###### Chức năng nghiệp vụ

**① Luồng xử lý thành công**

Bước 1: Người giao việc click icon Đôn đốc ở dòng nhận việc trong box Phân công thực hiện, hệ thống thực hiện:

- Kiểm tra quyền, trạng thái công việc, trạng thái dòng nhận việc (→ EX-07, EX-08)
- Kiểm tra dòng nhận việc có Người tiếp nhận đôn đốc (→ EX-06)
- Tính Lần đôn đốc, hiển thị popup Gửi yêu cầu đôn đốc

Bước 2: Người giao việc chọn Loại đôn đốc, nhập nội dung, đính kèm file (nếu có) và click [Gửi đôn đốc], hệ thống thực hiện:

- Validate nội dung và file (→ EX-01 đến EX-05)
- Kiểm tra lại quyền, trạng thái công việc, trạng thái dòng nhận việc (→ EX-07)
- Tính lại Lần đôn đốc và lưu đôn đốc (→ BR-03)
- Ghi log tác động (→ BR-05)
- Đóng popup, hiển thị thông báo "Đã ghi nhận yêu cầu đôn đốc. Đang gửi thông báo..."

Bước 3: Hệ thống gửi thông báo đến Người tiếp nhận đôn đốc, thực hiện:

- Gửi thông báo qua tất cả kênh (→ BR-08)
- Hiển thị icon "có đôn đốc mới" cho Người tiếp nhận đôn đốc ở danh sách công việc và ở dòng nhận việc (→ BR-04)
- Nếu có kênh gửi lỗi → thông báo cho Người giao việc (→ EX-10, EX-11)

**② Luồng xử lý ngoại lệ**

| Mã | Tình huống | Xử lý |
|---|---|---|
| EX-01 | Nhấn [Gửi đôn đốc] khi nội dung trống hoặc chỉ có khoảng trắng | Highlight đỏ trường Nội dung; hiển thị "Yêu cầu nhập nội dung đôn đốc."; không gửi, không đóng popup |
| EX-02 | Chọn file sai định dạng | Không thêm file; hiển thị "Định dạng file "{tên file}" không hỗ trợ. Chỉ chấp nhận: PDF, DOCX, XLSX, PNG, JPG, ZIP." |
| EX-03 | Chọn file lớn hơn 25MB | Không thêm file; hiển thị "File "{tên file}" vượt quá 25MB cho phép." |
| EX-04 | Chọn quá 3 file trong 1 lần gửi | Không thêm file vượt mức; hiển thị "Chỉ được đính kèm tối đa 3 file mỗi lần gửi." `[GIẢ ĐỊNH — wording]` |
| EX-05 | Tải file lên lỗi (lỗi lưu trữ) | Hiển thị "Không thể tải lên file "{tên file}". Vui lòng thử lại."; file không được thêm; các file đã tải thành công giữ nguyên |
| EX-06 | Dòng nhận việc là đơn vị nhưng đơn vị không có Trưởng đơn vị hoặc người có quyền xử lý công việc | Hiển thị "Đơn vị này chưa có người tiếp nhận đôn đốc." `[GIẢ ĐỊNH — wording]`; không mở popup, không gửi |
| EX-07 | Khi click [Gửi đôn đốc]: dòng nhận việc đã "Đã hoàn thành" hoặc đã bị xóa, hoặc công việc đã Đã hoàn thành/Hủy | Hiển thị "Không thể đôn đốc ở trạng thái hiện tại."; đóng popup; làm mới box Phân công thực hiện |
| EX-08 | Người dùng không phải Người giao việc/người tạo việc | Ẩn icon Đôn đốc; nếu gọi trực tiếp API → trả lỗi 403, không thực hiện |
| EX-09 | Mất kết nối mạng hoặc lỗi máy chủ trước khi lưu đôn đốc | Hiển thị "Không thể gửi đôn đốc. Kiểm tra kết nối mạng và thử lại."; giữ nguyên popup và dữ liệu đã nhập; không lưu, không ghi log |
| EX-10 | Đã lưu đôn đốc, gửi thông báo lỗi ở một số kênh | Đôn đốc vẫn hợp lệ; gửi thông báo trong ứng dụng cho Người giao việc: "Đôn đốc lần {N} đến [Tên cá nhân/đơn vị] đã ghi nhận nhưng kênh {Tên kênh lỗi} gặp sự cố." |
| EX-11 | Đã lưu đôn đốc, gửi thông báo lỗi ở tất cả kênh | Đôn đốc vẫn hợp lệ; gửi thông báo trong ứng dụng cho Người giao việc: "Đôn đốc lần {N} đến [Tên cá nhân/đơn vị] gửi thất bại toàn bộ kênh. Vui lòng kiểm tra lại cấu hình thông báo." |

**③ Quy tắc nghiệp vụ**

**Điều kiện gửi và người nhận**

- BR-01: Người giao việc mở box Phân công thực hiện → hệ thống hiển thị icon Đôn đốc ở từng dòng nhận việc chỉ khi công việc ở trạng thái Chưa thực hiện/Đang thực hiện VÀ trạng thái dòng nhận việc khác "Đã hoàn thành" → các trường hợp còn lại không hiển thị (→ EX-07, EX-08).
- BR-02: Người giao việc đôn đốc 1 dòng nhận việc → hệ thống xác định Người tiếp nhận đôn đốc theo nguyên tắc nhận việc: dòng cá nhân → chính cá nhân đó; dòng đơn vị → Trưởng đơn vị hoặc người có quyền xử lý công việc trên đơn vị đó → mỗi lần đôn đốc chỉ gắn với đúng 1 dòng nhận việc, không gửi cho các dòng khác của công việc.

**Số lần đôn đốc**

- BR-03: Người giao việc gửi đôn đốc → hệ thống tính Lần đôn đốc = số đôn đốc đã có của dòng nhận việc đó + 1, bắt đầu từ 1, việc tính và lưu thực hiện trong cùng 1 giao dịch → 2 lần gửi gần như đồng thời cho cùng 1 dòng không được trùng số lần.

**Hiển thị và lưu vết**

- BR-04: Đôn đốc được lưu thành công → hệ thống hiển thị icon "có đôn đốc mới" cho từng Người tiếp nhận đôn đốc ở danh sách công việc và ở dòng nhận việc; người đó mở nội dung đôn đốc thì icon mất với riêng người đó `[GIẢ ĐỊNH — trạng thái đã đọc tính riêng từng Người tiếp nhận đôn đốc]`.
- BR-05: Đôn đốc được lưu thành công → hệ thống ghi log tác động Nhóm 7 "Đôn đốc/Nhắc nhở": nội dung, tệp đính kèm, số lần đôn đốc, loại đôn đốc, cá nhân/đơn vị nhận → Người giao việc và Lãnh đạo cấp trên xem lại ở Tab "Lịch sử tác động".
- BR-06: Đôn đốc đã lưu → người dùng không được sửa hoặc xóa từ giao diện; đôn đốc chỉ bị xóa cùng dòng nhận việc khi Người giao việc thực hiện Xóa thông tin nhận việc (xóa nội dung, tệp và số liệu thống kê của dòng đó; log ở Tab "Lịch sử tác động" vẫn giữ).
- BR-07: Đôn đốc được lưu thành công → hệ thống tính 1 lần vào cột "Số lần bị đôn đốc" theo Loại đôn đốc (Nhắc nhở/Phê bình/Kiểm điểm) của cá nhân/đơn vị nhận trong báo cáo thống kê.

**Gửi thông báo**

- BR-08: Đôn đốc được lưu thành công → hệ thống gửi thông báo đến Người tiếp nhận đôn đốc qua tất cả các kênh thông báo theo cấu hình thông báo chung của hệ thống (giống cách gửi của Tab Trao đổi thông tin); việc gửi thực hiện nền, không làm người giao việc phải chờ; timeout mỗi kênh 30 giây, thử lại tối đa 3 lần (cách nhau 5 giây, 10 giây, 20 giây).

###### Thông báo và thông tin lưu vết log

**Thông báo hệ thống**

| Sự kiện kích hoạt | Người nhận | Kênh | Nội dung thông báo |
|---|---|---|---|
| Lưu đôn đốc thành công | Người giao việc (người đang thao tác) | Notify (in-app, toast) | "Đã ghi nhận yêu cầu đôn đốc. Đang gửi thông báo..." |
| Lưu đôn đốc thành công | Người tiếp nhận đôn đốc | Tất cả các kênh thông báo | "[Họ tên người giao] đôn đốc công việc [Tên công việc]. Hạn: [Hạn xử lý]. Lần thứ [N]." `[CẦN XÁC NHẬN — mã sự kiện cấu hình thông báo, nội dung theo Phụ lục cấu hình thông báo QLCV]` |
| Gửi thông báo lỗi một phần hoặc toàn bộ kênh | Người giao việc | Notify (in-app) | Xem EX-10, EX-11 |

**Log hệ thống (Audit Trail)**

Lưu vào log tác động công việc (Nhóm 7 — "Đôn đốc/Nhắc nhở" trong bảng "Thông tin log tác động công việc"), với các thông tin:
- Người cập nhật (user ID + tên; lưu cả thông tin đăng nhập và thông tin switch nếu có)
- Thời gian thay đổi (giờ, phút, ngày, tháng, năm)
- Thao tác: "Đôn đốc"
- Nội dung: nội dung đôn đốc, tệp đính kèm, số lần đôn đốc, loại đôn đốc, cá nhân/đơn vị nhận đôn đốc

###### Edge cases

- Người giao việc gửi đôn đốc đúng lúc người nhận chuyển dòng nhận việc sang "Đã hoàn thành" → thứ tự theo thời điểm hệ thống ghi nhận trước; bên sau nhận cảnh báo EX-07.
- Người giao việc gửi nhiều đôn đốc liên tiếp cho cùng 1 dòng → mỗi lần là 1 bản ghi riêng, đếm Lần đôn đốc tăng dần; không giới hạn số lần `[CẦN XÁC NHẬN]`.
- Người nhận việc đã chuyển tiếp công việc cho người khác → chưa rõ người được chuyển tiếp có nhận đôn đốc của dòng gốc hay không `[CẦN XÁC NHẬN]`.
- Dòng nhận việc là đơn vị và Trưởng đơn vị/người có quyền xử lý thay đổi sau khi gửi → chưa rõ người mới có thấy icon và nội dung đôn đốc cũ hay không `[CẦN XÁC NHẬN]`.
- Người tiếp nhận đôn đốc đang mở popup xem mà dòng nhận việc bị xóa → đôn đốc bị xóa theo; thao tác tiếp theo trên popup nhận thông báo "Đôn đốc này không còn tồn tại." (→ EX-13) và popup đóng.

---

##### Chức năng 2: Xem thông tin đôn đốc

###### Quy trình

```mermaid
sequenceDiagram
    actor Nhan as Người tiếp nhận đôn đốc
    participant System as Hệ thống
    participant DB as CSDL

    Nhan->>System: (1) Click icon có đôn đốc mới ở danh sách hoặc ở dòng nhận việc
    System->>DB: Kiểm tra quyền, lấy đôn đốc của dòng nhận việc
    alt Có quyền và có dữ liệu
        System->>DB: Đánh dấu đã đọc cho người dùng này
        System-->>Nhan: (2) Hiển thị popup danh sách đôn đốc, bỏ icon
        Nhan->>System: (3) Click file đính kèm
        System-->>Nhan: Mở nội dung file
    else Lỗi hoặc không còn dữ liệu
        System-->>Nhan: Hiển thị cảnh báo EX-12 hoặc EX-13
    end
```

###### Chức năng nghiệp vụ

**① Luồng xử lý thành công**

Bước 1: Người tiếp nhận đôn đốc click icon "có đôn đốc mới" ở danh sách công việc hoặc ở dòng nhận việc, hệ thống thực hiện:

- Kiểm tra người dùng là Người tiếp nhận đôn đốc của dòng nhận việc (→ BR-09, EX-14)
- Lấy danh sách đôn đốc của dòng nhận việc, sắp xếp mới nhất trước (→ BR-10)
- Hiển thị popup xem đôn đốc: thẻ mới nhất mở rộng, các thẻ cũ thu gọn
- Đánh dấu đã đọc, bỏ icon "có đôn đốc mới" của người dùng này (→ BR-04)

Bước 2: Người tiếp nhận đôn đốc cuộn xuống cuối danh sách hoặc nhấn [Tải thêm] khi có hơn 10 đôn đốc, hệ thống thực hiện:

- Tải 10 đôn đốc tiếp theo, thêm vào cuối danh sách, không tải lại toàn bộ

Bước 3: Người tiếp nhận đôn đốc click file đính kèm, hệ thống thực hiện:

- Mở nội dung file (→ EX-15 nếu file không còn tồn tại)

**② Luồng xử lý ngoại lệ**

| Mã | Tình huống | Xử lý |
|---|---|---|
| EX-12 | Lỗi máy chủ khi tải danh sách đôn đốc | Hiển thị "Không thể tải đôn đốc. Vui lòng thử lại." kèm nút [Thử lại]; không hiển thị dữ liệu cũ |
| EX-13 | Đôn đốc không còn tồn tại (dòng nhận việc đã bị xóa) | Hiển thị "Đôn đốc này không còn tồn tại."; bỏ icon; làm mới danh sách/box Phân công thực hiện |
| EX-14 | Người dùng không phải Người tiếp nhận đôn đốc của dòng nhận việc | Không hiển thị icon; nếu gọi trực tiếp API → trả lỗi 403 |
| EX-15 | File đính kèm không còn tồn tại | Hiển thị icon lỗi cạnh file; thông báo "Không thể mở file."; không chặn xem nội dung đôn đốc |
| EX-16 | Tải danh sách chậm quá 5 giây | Hiển thị spinner và "Đang tải... Kết nối chậm, vui lòng chờ."; quá 30 giây → hiển thị EX-12 |

**③ Quy tắc nghiệp vụ**

- BR-09: Người dùng click icon "có đôn đốc mới" → hệ thống chỉ cho xem đôn đốc của dòng nhận việc mà người đó là Người tiếp nhận đôn đốc → Người giao việc, Lãnh đạo cấp trên và người nhận của dòng khác không có icon này; muốn xem lại nội dung đôn đốc thì dùng Tab "Lịch sử tác động".
- BR-10: Người tiếp nhận đôn đốc mở popup → hệ thống sắp xếp đôn đốc theo Lần đôn đốc giảm dần, tải 10 đôn đốc mỗi lần → thẻ mới nhất mở rộng, các thẻ cũ thu gọn.
- BR-11: Người tiếp nhận đôn đốc mở popup xem → hệ thống đánh dấu đã đọc toàn bộ đôn đốc của dòng nhận việc cho riêng người đó `[GIẢ ĐỊNH — đánh dấu đã đọc cả dòng khi mở popup, không đánh dấu từng thẻ]`.

###### Thông báo và thông tin lưu vết log

**Thông báo hệ thống**

Không có thông báo hệ thống cho chức năng này.

**Log hệ thống (Audit Trail)**

Không ghi log riêng cho hành động xem. Trạng thái đã đọc chỉ dùng để bỏ icon "có đôn đốc mới".

###### Edge cases

- Dòng nhận việc là đơn vị và có nhiều người cùng là Người tiếp nhận đôn đốc (Trưởng đơn vị, người có quyền xử lý) → mỗi người có icon riêng; icon của người nào mất sau khi chính người đó đọc.
- Có đôn đốc mới gửi đúng lúc người dùng đang mở popup → đôn đốc mới không tự chèn vào popup đang mở; icon xuất hiện lại khi đóng popup và làm mới.
- Người dùng chưa từng có đôn đốc nào ở dòng nhận việc → không có icon, không có màn hình xem.

---

## ĐIỀU KIỆN NGHIỆM THU HỆ THỐNG `[CẦN XÁC NHẬN]`

Hệ thống được nghiệm thu khi thỏa các điều kiện sau:

- Hệ thống được thiết kế và vận hành theo mô tả trong tài liệu này, đồng thời đáp ứng toàn bộ các Yêu cầu Chức năng ghi nhận trong tài liệu
- Hệ thống được hiệu chỉnh sau khi triển khai thử nghiệm
- Tổ chức hướng dẫn sử dụng cho người dùng
- Người sử dụng thao tác tốt trên hệ thống sau khi qua khóa đào tạo
- Tất cả tài liệu và source chương trình được bàn giao đầy đủ

---

# PHỤ LỤC

**Danh mục loại đôn đốc** (danh mục tiêu chí đôn đốc, giá trị mặc định của hệ thống)

| Giá trị | Ghi chú |
|---|---|
| Nhắc nhở | Mặc định khi mở popup Gửi yêu cầu đôn đốc |
| Phê bình | |
| Kiểm điểm | |
