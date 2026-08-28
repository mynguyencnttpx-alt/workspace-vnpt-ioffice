---
name: urd-writer-customer
description: >
  Viết tài liệu URD (User Requirements Document) phiên bản DỄ HIỂU CHO KHÁCH HÀNG NON-TECH,
  dùng để chốt nghiệp vụ + giao diện với khách hàng trước khi làm SRS. Khác với skill
  `urd-writer-vnpt` (bám sát biểu mẫu BM_URD chuẩn VNPT, phục vụ audit nội bộ CMMI),
  skill này ưu tiên ngôn ngữ nghiệp vụ đời thường, có lồng phần minh họa màn hình/wireframe,
  và có trang tóm tắt nhanh. Kích hoạt khi user nói: "viết URD cho khách hàng", "URD dễ hiểu",
  "tài liệu chốt nghiệp vụ với khách", "URD non-tech", "chốt giao diện với khách hàng",
  "tài liệu chốt UI với khách", hoặc khi user đang cần tài liệu để họp/trình bày trực tiếp
  với khách hàng (không phải để lưu hồ sơ nội bộ). Nếu user không nói rõ là bản cho khách hàng
  hay bản chuẩn VNPT, hỏi lại 1 câu để chọn đúng skill trước khi viết.
  Output mặc định là file `.md`. Chỉ tạo `.docx` khi user yêu cầu rõ ràng.
---

# MỤC ĐÍCH

Hỗ trợ viết tài liệu **URD phiên bản dành cho khách hàng** — dùng trong các buổi họp/workshop chốt nghiệp vụ và giao diện, nơi người đọc là khách hàng non-tech (không quen thuật ngữ BA/kỹ thuật).

**Khác biệt cốt lõi so với `urd-writer-vnpt`:**

| | `urd-writer-vnpt` | `urd-writer-customer` (skill này) |
|---|---|---|
| Mục đích | Đúng biểu mẫu BM_URD, phục vụ audit CMMI nội bộ | Dễ đọc, dễ chốt với khách hàng non-tech |
| Đối tượng đọc | QA/PM nội bộ, kiểm toán | Khách hàng, sponsor, người dùng nghiệp vụ |
| Cấu trúc | Sơ đồ cây chức năng + bảng UR 5 trường | Tóm tắt nhanh + persona + wireframe + kịch bản tình huống |
| Có phần UI/wireframe? | Không | Có (mục 4) |
| Văn phong | Chuẩn hóa, thuật ngữ BA | Ngôn ngữ đời thường, kể chuyện |

**⚠️ Nếu user không nói rõ dùng bản nào**, hỏi nhanh 1 câu trước khi viết:
```
Bạn cần bản URD nào?
1. Bản cho khách hàng (dễ hiểu, có wireframe) — dùng skill này
2. Bản chuẩn BM_URD VNPT (phục vụ audit nội bộ) — dùng skill urd-writer-vnpt
```

---

# BƯỚC 0 — NHẬN DIỆN INPUT

| Loại input | Cách xử lý |
|---|---|
| Mô tả ngắn (1–3 câu) | Hỏi thêm theo **Checklist elicitation** bên dưới |
| Mô tả trung bình trở lên | Viết thẳng, ghi rõ giả thiết nếu có |
| File đính kèm (SRS/URD cũ, mô tả nghiệp vụ) | Đọc `file-reading` skill trước, sau đó phân tích và viết lại theo văn phong khách hàng |
| Có ảnh/mockup/wireframe kèm theo | Dùng luôn ảnh đó cho mục 4, không cần vẽ lại |

**Checklist elicitation** — Hỏi tối đa 1 lần, gom tất cả:
```
Để viết URD cho khách hàng, mình cần thêm:
1. Tên hệ thống / dự án?
2. Vấn đề hiện tại & mục tiêu (nếu có số liệu càng tốt)?
3. Các vai trò người dùng chính (actor)?
4. Module/nhóm nghiệp vụ sẽ chốt trong phiên này?
5. Có sẵn wireframe/mockup nào chưa, hay cần mô tả bằng lời?
```

---

# BƯỚC 1 — XÁC NHẬN OUTLINE

Luôn output block xác nhận và **chờ user phê duyệt** trước khi viết:

```
📋 OUTLINE URD (bản khách hàng) — [Tên hệ thống] · Phiên [x/y nếu có]
─────────────────────────────────────
Module chốt lần này : [Tên module]
Vai trò liên quan    : [Danh sách]
Số màn hình dự kiến  : ~[N]
Số yêu cầu dự kiến   : ~[N]
─────────────────────────────────────
Xác nhận để mình viết full?
```

**Nếu số lượng yêu cầu ước tính > 15-20 hoặc số màn hình > 7**: chủ động đề xuất tách thành nhiều phiên chốt (theo module), không dồn hết vào 1 file — nêu rõ lý do: khách hàng dễ đọc lướt, ký cho có nếu tài liệu quá dài trong 1 lần.

---

# BƯỚC 2 — VIẾT URD

**Đọc `references/urd-customer-template.md` trước khi viết — đây là khung 8 phần bắt buộc.**

## Quy tắc output

| Rule | Chi tiết |
|---|---|
| **Định dạng mặc định** | File `.md` — lưu tại `/mnt/user-data/outputs/URD_KH_[TenHT]_v[x.x].md` (thêm `_Phien[N]` nếu có tách phiên) |
| **File Word** | Chỉ tạo khi user nói rõ "xuất Word/docx" — khi đó đọc thêm `/mnt/skills/public/docx/SKILL.md` |
| **Ngôn ngữ** | Tiếng Việt, văn phong đời thường — tránh thuật ngữ BA (Actor, Pre-condition, Business Rule...) |
| **Mã yêu cầu** | `UR[STT_2digit]` — ví dụ `UR01`, giữ nguyên số nếu có UR gốc từ bản VNPT để dễ đối chiếu |
| **Sơ đồ** | Dùng Mermaid khi soạn thảo, nhưng LUÔN nhắc user render thành ảnh trước khi gửi bản chính thức cho khách (xem ghi chú trong template) |

## Nguyên tắc viết nội dung (bắt buộc tuân theo)

1. **Mục 2 (Đối tượng sử dụng)**: viết theo persona thực tế ("Chị Lan là văn thư..."), không dùng bảng Actor–Role–Permission
2. **Mục 4 (Màn hình)**: mỗi màn hình là 1 khối gồm ảnh + bảng annotation đi liền nhau — không tách rời danh sách màn hình và mô tả chi tiết ra 2 bảng khác nhau
3. **Mục 4.4 (Kịch bản)**: luôn có ít nhất 1 kịch bản tình huống thực tế kể theo trình tự — đây là phần khách hàng dễ hình dung nhất, không được bỏ qua
4. **Mục 5 (Yêu cầu chức năng)**: viết liền mạch theo mạch "cần gì → vì sao → lưu ý gì", KHÔNG lặp cứng khuôn "Là... tôi cần... để..." liên tục qua nhiều UR liên tiếp (gây nhàm, đọc lướt)
5. **Business Rule**: luôn diễn giải bằng ví dụ tình huống cụ thể, không viết dạng công thức/điều kiện logic
6. **Luôn có "Tóm tắt nhanh"** ở đầu tài liệu — tối đa nửa trang, để người bận đọc trong 3 phút

## Việc KHÔNG được làm (ranh giới với SRS)

- Không đặc tả field-level (kiểu dữ liệu, độ dài, validation chi tiết)
- Không mô tả UI ở mức pixel/màu sắc/font — chỉ bố cục tổng thể (wireframe đen trắng)
- Không viết API, cấu trúc dữ liệu, logic xử lý phía hệ thống

---

# QUY TẮC CHẤT LƯỢNG — CHECKLIST TỰ KIỂM

- [ ] Có trang "Tóm tắt nhanh" ở đầu
- [ ] Mục 2 viết theo persona, không phải bảng Actor khô khan
- [ ] Mục 4: mỗi màn hình có ảnh + annotation trong cùng 1 khối, có ít nhất 1 kịch bản tình huống
- [ ] Mục 5: không lặp khuôn câu máy móc quá 3-4 lần liên tiếp
- [ ] Có mục "Ngoài phạm vi" rõ ràng
- [ ] Nếu >15-20 UR hoặc >7 màn hình: đã đề xuất tách phiên chốt
- [ ] Đã nhắc user render sơ đồ thành ảnh trước khi gửi bản chính thức
- [ ] File đặt tên đúng: `URD_KH_[TenHT]_v[x.x].md`

---

# XỬ LÝ FILE ĐÍNH KÈM

| Loại | Cách xử lý |
|---|---|
| File URD chuẩn VNPT (từ skill `urd-writer-vnpt`) cần "dịch" sang bản khách hàng | Đọc nội dung, giữ nguyên mã UR, viết lại theo văn phong đời thường + bổ sung mục 3-4 (luồng, màn hình) nếu chưa có |
| Mô tả nghiệp vụ thô / SRS cũ | Đọc `file-reading` skill → trích xuất actor, luồng, yêu cầu → viết theo khung khách hàng |
| Ảnh/mockup/wireframe có sẵn | Dùng trực tiếp cho mục 4, không tự vẽ lại |

---

# LƯU Ý

1. **Không phát minh yêu cầu** — chỉ thêm khi có cơ sở, đánh dấu `[Giả thiết]` nếu suy luận
2. **URD khách hàng ≠ SRS** — chỉ nói khách hàng cần gì và thấy gì, không nói hệ thống làm thế nào
3. **Sau khi khách hàng ký chốt bản này**, đề xuất user chạy thêm skill `urd-writer-vnpt` để tạo bản đối chiếu theo `BM_URD` chuẩn, phục vụ lưu hồ sơ/audit nội bộ — hai bản nên khớp nội dung, chỉ khác cách trình bày
4. **Dự án nhiều module (như fleet management 12 subsystem)**: luôn ưu tiên tách file theo từng phiên chốt thay vì gộp 1 file khổng lồ
