---
type: srs-userflow
feature: dang-ky-xe-tkv
updated: 2026-08-04
primary_device: desktop
stage: flow-approved
flow_approved_at: 2026-08-04
flow_hash: "65f2c5ba"
---

# Đăng ký xe TKV — User Flow

> Nguồn chia flow DUY NHẤT cho feature này. `/wireframe-ascii` và `/wireframe-html` đọc file này để biết flow nào gồm những màn nào — KHÔNG tự chia flow riêng.

> Phạm vi đợt này: luồng lõi theo GAP Analysis mục A3 (Form đăng ký), A4 (Luồng duyệt 5 bước), A5 (Cấp xe/Điều động), A6 (Xác nhận đi về), B3 (Ghép xe). Nguồn: `GAP_Analysis_QLDKXe_TKV.md`. Các mục khác (A1/A2/A7-A10, B1/B2/B4-B10) chưa nằm trong đợt này.

## 1. User Flow (tổng)

> Phủ happy / error / edge cases. `[n]` = số màn hình đối chiếu Mục 2.

```mermaid
flowchart TD
    n1["[1] Form đăng ký xe<br/>(dk-xe-form)"]
    n2["[2] Danh sách phiếu đăng ký<br/>(dk-xe-list)"]
    n3["[3] Chi tiết phiếu đăng ký<br/>(dk-xe-detail)"]
    n9["Hủy phiếu đăng ký<br/>(trạng thái Đã hủy)"]
    n19["Tính lại km cho các phiếu<br/>còn lại trong nhóm ghép"]
    d1{"Đơn vị có cấu hình<br/>Lãnh đạo Ban xác nhận?"}
    n4["[4] Lãnh đạo Ban xác nhận<br/>(lanhdao-xacnhan)"]
    d2{"Lãnh đạo Ban xử lý"}
    n6a["Yêu cầu bổ sung<br/>thông tin"]
    n7a["Từ chối dứt điểm<br/>(đóng phiếu)"]
    n5["[5] CVP/PCVP duyệt + ký số<br/>qua SignServer<br/>(cvp-duyet)"]
    d3{"CVP/PCVP xử lý"}
    n6b["Yêu cầu bổ sung<br/>thông tin"]
    n7b["Từ chối dứt điểm<br/>(đóng phiếu)"]
    n8["Lỗi kết nối SignServer,<br/>thử lại ký số"]
    d4{"Đăng ký backdate<br/>(xe/lái xe đã dùng thực tế)?"}
    n10["[6] Cấp xe / điều động<br/>(cap-xe)"]
    d5{"Nhiều phiếu<br/>cùng lộ trình?"}
    n11["[7] Ghép xe<br/>(ghep-xe)"]
    n12["[8] Đổi lái xe<br/>(doi-laixe)"]
    n13["[9] Lái xe xác nhận chuyến<br/>(laixe-xacnhan-chuyen)"]
    n14["[10] Nhập xác nhận đi về<br/>(xacnhan-diove-nhap)"]
    n15["[11] Đại diện ban xác nhận<br/>+ đánh giá, ký SignServer<br/>(xacnhan-diove-banxacnhan)"]
    d6{"Tất cả ban<br/>đã xác nhận?"}
    n16["Ban phản đối km<br/>(không đồng ý)"]
    n17["Lỗi kết nối SignServer,<br/>thử lại ký điện tử"]
    n18["[12] Phiếu xác nhận đi về<br/>(phieu-xacnhan-diove)"]

    n1 -->|"submit phiếu"| n2
    n2 -->|"chọn phiếu"| n3
    n3 -->|"hủy phiếu"| n9
    n9 -.->|"phiếu thuộc nhóm ghép xe"| n19
    n19 -.-> n11
    n3 --> d1
    d1 -->|"có cấu hình"| n4
    d1 -->|"không cấu hình"| n5
    n4 --> d2
    d2 -->|"duyệt"| n5
    d2 -->|"yêu cầu bổ sung"| n6a
    d2 -->|"từ chối dứt điểm"| n7a
    n6a -.->|"sửa lại"| n1
    n5 --> d3
    d3 -->|"duyệt + ký số OK"| d4
    d3 -->|"yêu cầu bổ sung"| n6b
    d3 -->|"từ chối dứt điểm"| n7b
    d3 -->|"lỗi SignServer"| n8
    n8 -.->|"thử lại"| n5
    n6b -.->|"sửa lại"| n1
    d4 -->|"backdate"| n14
    d4 -->|"không backdate"| n10
    n10 --> d5
    d5 -->|"có, gộp"| n11
    d5 -->|"không"| n13
    n11 --> n13
    n10 -.->|"phát sinh đổi lái xe"| n12
    n11 -.->|"phát sinh đổi lái xe"| n12
    n13 -.->|"phát sinh đổi lái xe<br/>(trước khi khởi hành)"| n12
    n12 -.-> n13
    n13 -->|"lái xe xác nhận"| n14
    n14 -->|"nhập đủ km/hạch toán<br/>(tách N phiếu nếu ghép xe)"| n15
    n15 --> d6
    d6 -->|"đủ tất cả, đồng ý"| n18
    d6 -->|"còn ban chưa xác nhận"| n15
    d6 -->|"ban phản đối km"| n16
    n16 -.->|"chia lại km"| n14
    d6 -->|"lỗi SignServer"| n17
    n17 -.->|"thử lại"| n15

    classDef happy fill:#d4edda,stroke:#28a745
    classDef error fill:#f8d7da,stroke:#dc3545
    classDef edge fill:#fff3cd,stroke:#ffc107

    class n1,n2,n3,n4,n5,n10,n13,n14,n15,n18 happy
    class n7a,n7b,n8,n17 error
    class n9,n6a,n6b,n11,n12,n16,n19 edge
```

## 2. Danh sách màn hình

| [#] | Slug | Màn hình | Mục đích | Thuộc flow |
|-----|------|----------|----------|------------|
| 1 | dk-xe-form | Form đăng ký xe | Chuyên viên Ban tạo phiếu đăng ký: chọn nhiều đơn vị tham gia + số người mỗi đơn vị, link văn bản liên quan, chọn hạch toán (chung/ban/cá nhân đặc thù), nhập backdate, gen biểu mẫu đăng ký | dang-ky-va-duyet-xe |
| 2 | dk-xe-list | Danh sách phiếu đăng ký | Theo dõi trạng thái, tìm phiếu | dang-ky-va-duyet-xe |
| 3 | dk-xe-detail | Chi tiết phiếu đăng ký | Xem toàn bộ thông tin + trạng thái luồng duyệt + lịch sử + hành động theo role (kể cả hủy phiếu). Dùng chung xuyên suốt cả 3 flow (mọi role tra cứu 1 phiếu tại đây trong bất kỳ giai đoạn nào) | dang-ky-va-duyet-xe (chung với cap-xe-dieudong, xac-nhan-di-ve) |
| 4 | lanhdao-xacnhan | Lãnh đạo Ban xác nhận | Bước duyệt mới (cấu hình bật/tắt theo đơn vị): duyệt / yêu cầu bổ sung / từ chối dứt điểm | dang-ky-va-duyet-xe |
| 5 | cvp-duyet | CVP/PCVP duyệt + ký số | Duyệt + ký số trên biểu mẫu đăng ký qua SignServer; xử lý lỗi kết nối ký số | dang-ky-va-duyet-xe |
| 6 | cap-xe | Cấp xe / điều động | Đội trưởng/phó phân xe: gợi ý kế hoạch điều vận (xe trống + lái xe biên chế cố định theo xe, cho phép chọn khác) | cap-xe-dieudong |
| 7 | ghep-xe | Ghép xe | Gộp nhiều phiếu đăng ký (có thể khác đơn vị) cùng lộ trình vào 1 xe | cap-xe-dieudong |
| 8 | doi-laixe | Đổi lái xe | Đổi lái xe khi phát sinh — trigger được từ cấp xe, ghép xe, hoặc sau khi lái xe đã xác nhận chuyến (trước khi khởi hành) | cap-xe-dieudong |
| 9 | laixe-xacnhan-chuyen | Lái xe xác nhận chuyến | Lái xe + người đăng ký tiếp nhận; lái xe xác nhận chuyến (trạng thái "Lái xe đã xác nhận") | cap-xe-dieudong |
| 10 | xacnhan-diove-nhap | Nhập xác nhận đi về | Lái xe nhập km thực tế; hệ thống suggest chia km cho các đơn vị tham gia (chia đều, điều chỉnh nếu ghép/nối chuyến); chọn hạch toán cá nhân đặc thù; tính tháng theo ngày về | xac-nhan-di-ve |
| 11 | xacnhan-diove-banxacnhan | Đại diện ban xác nhận + đánh giá | Đại diện từng đơn vị tham gia xác nhận + đánh giá chuyến đi, ký điện tử qua SignServer. Bắt buộc đủ TẤT CẢ các ban mới hoàn tất; có thể phản đối km (không đồng ý) | xac-nhan-di-ve |
| 12 | phieu-xacnhan-diove | Phiếu xác nhận đi về | Xem/tải phiếu xác nhận đi về đã gen theo biểu mẫu chuẩn (ghép xe → mỗi đơn vị gốc có 1 phiếu riêng) | xac-nhan-di-ve |

## 3. Danh sách flow

| Flow-slug | Tên flow | Màn hình gồm | Cases phủ |
|-----------|----------|--------------|-----------|
| dang-ky-va-duyet-xe | Đăng ký & duyệt xe | dk-xe-form → dk-xe-list → dk-xe-detail → lanhdao-xacnhan → cvp-duyet | happy (duyệt qua 2 cấp); error (yêu cầu bổ sung, từ chối dứt điểm, lỗi SignServer, hủy phiếu); edge (cấu hình Lãnh đạo Ban tắt, backdate) |
| cap-xe-dieudong | Cấp xe & điều động | cap-xe → ghep-xe → doi-laixe → laixe-xacnhan-chuyen | happy (cấp xe đơn); edge (ghép nhiều phiếu cùng lộ trình, đổi lái xe phát sinh đa điểm) |
| xac-nhan-di-ve | Xác nhận đi về | xacnhan-diove-nhap → xacnhan-diove-banxacnhan → phieu-xacnhan-diove | happy (đủ tất cả ban đồng ý); error (lỗi SignServer); edge (phản đối km, tách N phiếu khi ghép xe, tính lại km khi hủy phiếu trong nhóm ghép) |

## 3.5. Chuyển màn (transitions)

| Từ màn [#] | Đến màn [#] | Trigger | Điều kiện |
|-----------|------------|---------|-----------|
| Form đăng ký xe [1] | Danh sách phiếu đăng ký [2] | Submit phiếu | - |
| Danh sách phiếu đăng ký [2] | Chi tiết phiếu đăng ký [3] | Chọn phiếu | - |
| Chi tiết phiếu đăng ký [3] | (giữ nguyên) [3] | Hủy phiếu | Trạng thái chuyển "Đã hủy"; nếu thuộc nhóm ghép xe → tính lại km cho các phiếu còn lại theo phần còn tham gia |
| Chi tiết phiếu đăng ký [3] | Lãnh đạo Ban xác nhận [4] | Điều hướng duyệt | Đơn vị có cấu hình Lãnh đạo Ban xác nhận |
| Chi tiết phiếu đăng ký [3] | CVP/PCVP duyệt [5] | Điều hướng duyệt | Đơn vị KHÔNG cấu hình Lãnh đạo Ban xác nhận |
| Lãnh đạo Ban xác nhận [4] | CVP/PCVP duyệt [5] | Duyệt | - |
| Lãnh đạo Ban xác nhận [4] | Form đăng ký xe [1] | Yêu cầu bổ sung / Từ chối dứt điểm | Chuyên viên sửa lại và submit lại |
| CVP/PCVP duyệt [5] | Cấp xe/điều động [6] | Duyệt + ký số OK | Không backdate |
| CVP/PCVP duyệt [5] | Nhập xác nhận đi về [10] | Duyệt + ký số OK | Backdate (xe/lái xe đã dùng thực tế, bỏ qua cấp xe/điều động) |
| CVP/PCVP duyệt [5] | Form đăng ký xe [1] | Yêu cầu bổ sung / Từ chối dứt điểm | Chuyên viên sửa lại và submit lại |
| CVP/PCVP duyệt [5] | (giữ nguyên) [5] | Lỗi kết nối SignServer | Thử lại ký số |
| Cấp xe/điều động [6] | Ghép xe [7] | Điều hướng | Nhiều phiếu cùng lộ trình |
| Cấp xe/điều động [6] | Lái xe xác nhận chuyến [9] | Điều hướng | Không ghép xe |
| Ghép xe [7] | Lái xe xác nhận chuyến [9] | Gán xe/lái xe chung | - |
| Cấp xe/điều động [6] | Đổi lái xe [8] | Phát sinh đổi lái xe | - |
| Ghép xe [7] | Đổi lái xe [8] | Phát sinh đổi lái xe | - |
| Lái xe xác nhận chuyến [9] | Đổi lái xe [8] | Phát sinh đổi lái xe | Trước khi khởi hành |
| Đổi lái xe [8] | Lái xe xác nhận chuyến [9] | Xác nhận đổi lái xe | - |
| Lái xe xác nhận chuyến [9] | Nhập xác nhận đi về [10] | Lái xe xác nhận | - |
| Nhập xác nhận đi về [10] | Đại diện ban xác nhận [11] | Nhập đủ km/hạch toán | Ghép xe → tách N phiếu xác nhận tương ứng N phiếu đăng ký gốc |
| Đại diện ban xác nhận [11] | Phiếu xác nhận đi về [12] | Tất cả ban đồng ý | - |
| Đại diện ban xác nhận [11] | Nhập xác nhận đi về [10] | Ban phản đối km | Chia lại km |
| Đại diện ban xác nhận [11] | (giữ nguyên) [11] | Lỗi kết nối SignServer | Thử lại ký điện tử |

## 4. Open Questions

(Trống — cả 3 OQ đã được khách hàng chốt qua các vòng trao đổi: bắt buộc tất cả ban xác nhận, ký qua SignServer, tính lại km khi hủy phiếu trong nhóm ghép.)
