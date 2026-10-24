# Ghi chú nội bộ BA — URD Quản lý nhiên liệu tiêu hao (KHÔNG gửi khách)

## Nguồn hình
- Figma file `ioffice_v5` (fileKey DNSiSfrKfm7NPYxpO4Jll3), section "Nhiên liệu · Quản lý tiêu hao và biểu mẫu đơn vị", node 2633:28614.
- Ảnh PNG xuất ngày 24/10/2026 vào `docs/URD_KH_QuanLyNhienLieu_images/`:
  A1 = frame 01 (2633:26367) · A2 = 02 (2633:26487) · A3 = 03 (2633:26570) · A4 = 04 (2633:26686) · A5 = 24 he-so-ngung (2764:14962) · A6 = 05 danh-muc-xe-form (2633:26732)
  B1 = 16 so-theo-doi-linh-xe (2715:18479) · B2 = 26 them-phieu-linh-popup (2772:16861) · B3 = 12 linh-ton-log (2633:27778)
  C1 = 13 (2633:27903) · C2 = 14 (2633:28162) · C3 = 15 (2633:28398) · C4 = 18 mẫu 2 (2714:18772) · C5 = 19 mẫu 3 (2714:19106) · C6 = 20 mẫu 4 (2714:19274)
- Frame 22 "ghi-chu-review-doi-chieu-bieu-mau" là ghi chú review, không đưa vào URD.

## Thay đổi nghiệp vụ 24/10/2026
Bỏ chốt tháng, mở khóa tháng, tồn đầu bị lệch, tháng đã chốt (UR14, UR15, UR16, UR26). Lĩnh/tồn quản lý theo danh sách trên một màn B1. Q5/Q6/Q7 cũ bỏ; thêm Q5 (sửa tháng đã qua), Q6 (ngày hiệu lực quá khứ).

## Màn chưa có thiết kế Figma
Chỉ còn: hộp xác nhận kích hoạt lại hệ số, nhập số dư ban đầu (UR25).

## Cần rà lại trước khi gửi
- Màn B1 trên Figma dùng ví dụ xe 30M-51470 Fortuner 2.7 (16,0), 3.828 km → 612 lít; tồn cuối ước tính hiện 58 nhưng 46 + 620 − 612 = 54. URD đang dùng ví dụ khác (Prado, 18,7, 3.250 km → 608 lít). Nên thống nhất số liệu giữa hình và chữ.
- Các con số trong bảng "Việc khách cần quyết" Q2, Q5, Q9, Q10 là ví dụ minh họa do BA tự dựng [GIẢ ĐỊNH].

## Figma cần cập nhật theo nghiệp vụ mới
- Frame 12 "linh-ton-log" (ảnh B3) còn dòng mẫu "Chốt tháng", "Mở khóa tháng", "Sửa số liệu sau mở khóa" và chú thích nhắc chốt/mở khóa.
- Frame 16 (ảnh B1): ghi chú cuối trang còn câu "Tháng đã chốt: chỉ xem"; tồn cuối ước tính hiện 58 nhưng 46 + 620 − 612 = 54.
- Tiêu đề nhóm "B · Nhập lĩnh/tồn và chốt tháng" trên canvas.
- Frame 22 ghi chú review nhắc các quyết định cũ. Sau khi sửa Figma cần xuất lại ảnh B1, B3.

## Rà soát logic 24/10/2026 (senior BA) — đã sửa trong URD
- L1 xe chưa cập nhật tồn: Thực tế = "Chưa cập nhật", không tính Tăng/Giảm (UR18, UR19, UR21, C1, tiêu chí C4/C7/C8).
- L2 thuộc tính xe có ngày hiệu lực (UR07, UR08, Q14). L3 UR29 tổng quát. L4/L5 cảnh báo số ước tính bất thường và tồn đầu lệch (UR12).
- M1–M5: UR09, UR11, UR30, UR04, UR19, UR23 bổ sung; thêm Q14–Q18. M6: bỏ UR25 và Q4 cũ, gộp vào UR12; Q cũ đánh số lại (Q5→Q4 ... Q14→Q13).
- Ảnh B1/B3 trên Figma chưa có cảnh báo tồn đầu lệch, "Cần rà soát", "Chưa cập nhật" ở C1 — cần bổ sung nếu muốn hình khớp chữ.
