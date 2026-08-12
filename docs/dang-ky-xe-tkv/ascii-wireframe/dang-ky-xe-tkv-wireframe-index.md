---
type: screen-index
feature: dang-ky-xe-tkv
status: draft
updated: 2026-08-06
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
| 6 | cap-xe | cap-xe-dieudong | pending | — | — | — | — | — |
| 7 | ghep-xe | cap-xe-dieudong | pending | — | — | — | — | — |
| 8 | doi-laixe | cap-xe-dieudong | pending | — | — | — | — | — |
| 9 | laixe-xacnhan-chuyen | cap-xe-dieudong | pending | — | — | — | — | — |
| 10 | xacnhan-diove-nhap | xac-nhan-di-ve | pending | — | — | — | — | — |
| 11 | xacnhan-diove-banxacnhan | xac-nhan-di-ve | pending | — | — | — | — | — |
| 12 | phieu-xacnhan-diove | xac-nhan-di-ve | pending | — | — | — | — | — |

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

## Links upstream

- [[docs/dang-ky-xe-tkv/srs/dang-ky-xe-tkv-userflow.md|User flow]]

## Changelog
