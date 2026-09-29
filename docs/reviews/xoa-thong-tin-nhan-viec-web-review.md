# Review snapshot — xoa-thong-tin-nhan-viec-web (SRS v0.1, 2026-09-26)

## 1. Bảng tổng hợp vấn đề

| STT | Mục SRS | Vấn đề tóm tắt | Mức độ | Góc nhìn | Gợi ý sửa ngắn |
|---|---|---|---|---|---|
| 1 | Chức năng 1 — BR-06 | ~~Trạng thái chung có thể đổi khi xóa dòng~~ — ĐÃ CHỐT 2026-09-26: hệ thống tính lại trạng thái | ✅ Resolved | BA/QA | - |
| 2 | Edge cases / BR-07, BR-08 | ĐÃ CHỐT 2026-09-26: xóa yêu cầu gia hạn; hủy công việc con kèm lý do. Còn mở: yêu cầu báo cáo tiến độ [GIẢ ĐỊNH]; công việc con khi xóa dòng đơn vị [CẦN XÁC NHẬN] | 🟡 Minor | BA | Xác nhận 2 điểm còn lại |
| 3 | Thông báo | Có gửi Notify cho người/đơn vị bị xóa hay không và nội dung: [GIẢ ĐỊNH] | 🟡 Minor | BA | Xác nhận với khách hàng |
| 4 | Yêu cầu giao diện | Chưa có ảnh mockup ([CẦN BỔ SUNG ẢNH]) | 🟡 Minor | Dev/QA | Bổ sung `images/FC-001-xoa-thong-tin-nhan-viec-mockup.png` |
| 5 | Popup / EX-01 | Wording popup và cảnh báo là [GIẢ ĐỊNH] | 🟡 Minor | QA | Khách hàng duyệt wording |
| 6 | Điều kiện nghiệm thu | Dùng nội dung mẫu, đánh dấu [CẦN XÁC NHẬN] | 💡 Suggestion | BA | Xác nhận theo hợp đồng |

## 2. Quality Gate

| Tiêu chí | Trọng số | Điểm | Có trọng số |
|---|---|---|---|
| Completeness | 50% | 8.5 | 4.25 |
| Clarity | 20% | 8.0 | 1.6 |
| Consistency | 20% | 8.5 | 1.7 |
| Formatting | 10% | 9.0 | 0.9 |
| **Tổng** | | | **8.45 ≈ 8.5/10** |

Trạng thái: ✅ Approved (vòng 2 — không còn Critical/Major, ≥ 7.0).

Lưu ý: còn các điểm Minor dạng [GIẢ ĐỊNH]/[CẦN XÁC NHẬN] khi bàn giao.

Không có context hệ thống ngoài SRS gốc web (đã đối chiếu: bảng nút chức năng theo trạng thái, bảng log Nhóm 5, mẫu "Hủy công việc").
