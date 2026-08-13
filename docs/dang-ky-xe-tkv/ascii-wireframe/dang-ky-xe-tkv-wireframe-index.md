---
type: screen-index
feature: dang-ky-xe-tkv
status: draft
updated: 2026-08-13
links:
  - docs/dang-ky-xe-tkv/srs/dang-ky-xe-tkv-userflow.md
---

# Đăng ký xe TKV — Screens Index

## Screens

| # | Slug | Thuộc flow | Status | Used by functions | Figma | HTML prototype | HTML wireframe | Updated |
|---|------|------------|--------|--------------------|-------|-----------------|------------------|---------|
| 1 | [dk-xe-form](dang-ky-va-duyet-xe.md#screen-dk-xe-form--form-đăng-ký-xe) | dang-ky-va-duyet-xe | draft | — | — | — | — | 2026-08-06 |
| 2 | [dk-xe-list](dang-ky-va-duyet-xe.md#screen-dk-xe-list--danh-sách-phiếu-đăng-ký) | dang-ky-va-duyet-xe | draft | — | — | — | — | 2026-08-06 |
| 3 | [dk-xe-detail](dang-ky-va-duyet-xe.md#screen-dk-xe-detail--chi-tiết-phiếu-đăng-ký) | dang-ky-va-duyet-xe (chung với cap-xe-dieudong, xac-nhan-di-ve) | draft | — | — | — | — | 2026-08-06 |
| 4 | [lanhdao-xacnhan](dang-ky-va-duyet-xe.md#screen-lanhdao-xacnhan--lãnh-đạo-ban-xác-nhận) | dang-ky-va-duyet-xe | draft | — | — | — | — | 2026-08-06 |
| 5 | [cvp-duyet](dang-ky-va-duyet-xe.md#screen-cvp-duyet--cvppcvp-duyệt--ký-số) | dang-ky-va-duyet-xe | draft | — | — | — | — | 2026-08-06 |
| 6 | [cap-xe](cap-xe-dieudong.md#screen-cap-xe--cấp-xe--điều-động) | cap-xe-dieudong | draft | — | — | — | — | 2026-08-06 |
| 7 | [ghep-xe](cap-xe-dieudong.md#screen-ghep-xe--ghép-xe) | cap-xe-dieudong | draft | — | — | — | — | 2026-08-06 |
| 8 | [doi-laixe](cap-xe-dieudong.md#screen-doi-laixe--đổi-lái-xe) | cap-xe-dieudong | draft | — | — | — | — | 2026-08-06 |
| 9 | [laixe-xacnhan-chuyen](cap-xe-dieudong.md#screen-laixe-xacnhan-chuyen--lái-xe-xác-nhận-chuyến) | cap-xe-dieudong | draft | — | — | — | — | 2026-08-06 |
| 10 | [xacnhan-diove-nhap](xac-nhan-di-ve.md#screen-xacnhan-diove-nhap--nhập-xác-nhận-đi-về) | xac-nhan-di-ve | draft | — | — | — | — | 2026-08-12 |
| 11 | [xacnhan-diove-banxacnhan](xac-nhan-di-ve.md#screen-xacnhan-diove-banxacnhan--đại-diện-ban-xác-nhận--đánh-giá) | xac-nhan-di-ve | draft | — | — | — | — | 2026-08-12 |
| 12 | [phieu-xacnhan-diove](xac-nhan-di-ve.md#screen-phieu-xacnhan-diove--phiếu-xác-nhận-đi-về) | xac-nhan-di-ve | draft | — | — | — | — | 2026-08-12 |
| 13 | [danh-muc-xe-list](danh-muc-xe-laixe.md#screen-danh-muc-xe-list--danh-mục-xe) | danh-muc-xe-laixe | draft | — | — | — | — | 2026-08-13 |
| 14 | [danh-muc-xe-form](danh-muc-xe-laixe.md#screen-danh-muc-xe-form--thêmsửa-xe) | danh-muc-xe-laixe | draft | — | — | — | — | 2026-08-13 |
| 15 | [danh-muc-laixe-list](danh-muc-xe-laixe.md#screen-danh-muc-laixe-list--danh-mục-lái-xe) | danh-muc-xe-laixe | draft | — | — | — | — | 2026-08-13 |
| 16 | [danh-muc-laixe-form](danh-muc-xe-laixe.md#screen-danh-muc-laixe-form--thêmsửa-lái-xe) | danh-muc-xe-laixe | draft | — | — | — | — | 2026-08-13 |
| 17 | [danh-muc-laixe-detail](danh-muc-xe-laixe.md#screen-danh-muc-laixe-detail--chi-tiết-lái-xe) | danh-muc-xe-laixe | draft | — | — | — | — | 2026-08-13 |
| 18 | phan-quyen-thamso | tham-so-dinh-muc | pending | — | — | — | — | — |
| 19 | dinh-bien-km-list | tham-so-dinh-muc | pending | — | — | — | — | — |
| 20 | dinh-bien-km-form | tham-so-dinh-muc | pending | — | — | — | — | — |
| 21 | dinh-muc-xe-danhmuc | tham-so-dinh-muc | pending | — | — | — | — | — |

**Status values:** `draft` / `in-review` / `revisions` / `approved` / `shipped` / `archived` / `pending` (chưa vẽ).

**Designs columns:**
- **Figma**: URL frame trên Figma (output của `/figma`). `—` nếu chưa có.
- **HTML prototype**: link tới `dang-ky-xe-tkv-prototype.html#{slug}` (output của `/prototype-html`). `—` nếu chưa có.
- **HTML wireframe**: link tới `html-wireframe/{flow-slug}.html` (output của `/wireframe-html`, độc lập với ASCII). `—` nếu chưa có.

## Descriptions

### dk-xe-form
Chuyên viên Ban tạo phiếu đăng ký xe: chọn đơn vị tham gia, hạch toán km, backdate.

### dk-xe-list
Theo dõi trạng thái, tìm phiếu đăng ký.

### dk-xe-detail
Xem chi tiết + tiến trình duyệt + lịch sử + hành động (sửa/hủy phiếu). Dùng chung xuyên suốt cả 3 flow.

### lanhdao-xacnhan
Lãnh đạo Ban xác nhận phiếu (bước duyệt mới, cấu hình bật/tắt theo đơn vị).

### cvp-duyet
CVP/PCVP duyệt + ký số biểu mẫu đăng ký qua SignServer.

### cap-xe
Đội trưởng/phó cấp xe: gợi ý kế hoạch điều vận (xe trống + lái xe biên chế).

### ghep-xe
Gộp nhiều phiếu đăng ký cùng lộ trình vào 1 xe.

### doi-laixe
Đổi lái xe khi phát sinh, trigger được từ nhiều điểm trong flow cấp xe/điều động.

### laixe-xacnhan-chuyen
Lái xe xác nhận nhận chuyến sau khi được phân công.

### xacnhan-diove-nhap
Lái xe nhập km thực tế, chia km cho các đơn vị tham gia, hạch toán cá nhân đặc thù.

### xacnhan-diove-banxacnhan
Đại diện từng đơn vị tham gia xác nhận + đánh giá chuyến đi, ký điện tử qua SignServer.

### phieu-xacnhan-diove
Xem/tải phiếu xác nhận đi về đã hoàn tất theo biểu mẫu chuẩn.

### danh-muc-xe-list
Danh mục xe: danh sách, tìm kiếm, thêm mới.

### danh-muc-xe-form
Thêm/sửa xe: biển số, đơn vị quản lý, lái xe biên chế, chu kỳ đăng kiểm/bảo hiểm/bảo dưỡng, tổng km/km công tơ, trạng thái.

### danh-muc-laixe-list
Danh mục lái xe: danh sách, tìm kiếm.

### danh-muc-laixe-form
Thêm/sửa lái xe: thông tin cá nhân + GPLX, trạng thái.

### danh-muc-laixe-detail
Hồ sơ lái xe + tab lịch sử phục vụ/đánh giá (read-only).

## Links upstream

- [[docs/dang-ky-xe-tkv/srs/dang-ky-xe-tkv-userflow.md|User flow]]

## Changelog
