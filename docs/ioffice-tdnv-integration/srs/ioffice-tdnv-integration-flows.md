---
type: srs-flows
feature: ioffice-tdnv-integration
updated: 2026-07-27
---

# Tích hợp iOffice – TDNV — Flows

## Flow: Cập nhật thuộc tính văn bản (file chính/phụ + giao nhiệm vụ)
**Trigger**: Cán bộ nghiệp vụ mở màn chi tiết văn bản (đến/đi) để đánh dấu file chính/phụ và bật/tắt cờ giao nhiệm vụ.
**Related UC**: TBD — chưa có use case
**Related FR**: TBD — chưa chạy `/srs`

```mermaid
sequenceDiagram
    actor User as Cán bộ nghiệp vụ
    participant FE as Giao diện văn bản
    participant BE as Backend iOffice
    participant DB as CSDL iOffice

    User->>FE: Mở màn chi tiết văn bản (đến/đi)
    FE->>BE: Lấy danh sách file đính kèm + trạng thái hiện tại
    BE->>DB: Truy vấn file đính kèm + cờ "Giao nhiệm vụ"
    DB-->>BE: Danh sách file + cờ
    BE-->>FE: Trả dữ liệu màn hình
    FE-->>User: Hiển thị danh sách file + checkbox "Văn bản giao nhiệm vụ"

    User->>FE: Chọn 1 file, đánh dấu "File chính"
    FE->>FE: Tự bỏ đánh dấu "File chính" ở các file khác (chỉ 1 file chính)
    User->>FE: Bật/tắt checkbox "Văn bản giao nhiệm vụ"
    User->>FE: Bấm "Lưu"
    FE->>BE: Gửi yêu cầu cập nhật (loại từng file đính kèm + cờ giao nhiệm vụ)

    alt Hợp lệ
        BE->>DB: Cập nhật loại file (chính/phụ) + cờ giao nhiệm vụ
        DB-->>BE: Cập nhật thành công
        BE-->>FE: Kết quả thành công
        FE-->>User: Thông báo "Lưu thành công"
        Note right of BE: Nếu "Giao nhiệm vụ" = true, kích hoạt đẩy metadata văn bản sang TDNV qua API hiện có (không đổi, ngoài phạm vi flow này)
    else Chưa chọn file chính khi văn bản có đính kèm
        BE-->>FE: Lỗi validation "Phải chọn 1 file chính"
        FE-->>User: Hiện thông báo lỗi, giữ nguyên lựa chọn
    end
```

## Flow: TDNV callback báo tạo nhiệm vụ thành công
**Trigger**: TDNV đã nhận metadata văn bản qua API hiện có (không đổi) và tạo xong các nhiệm vụ tương ứng với văn bản đó.
**Related UC**: TBD — chưa có use case
**Related FR**: TBD — chưa chạy `/srs`

```mermaid
sequenceDiagram
    participant TDNV as Hệ thống Theo dõi nhiệm vụ
    participant BE as Backend iOffice
    participant DB as CSDL iOffice
    participant FE as Giao diện văn bản
    actor User as Cán bộ nghiệp vụ

    TDNV->>BE: Báo tạo nhiệm vụ thành công (doc_id, link danh sách nhiệm vụ)

    alt doc_id hợp lệ
        BE->>DB: Lưu link danh sách nhiệm vụ + trạng thái "Đã tạo nhiệm vụ" gắn với văn bản
        DB-->>BE: Lưu thành công
        BE-->>TDNV: Xác nhận đã ghi nhận
    else doc_id không tồn tại
        BE-->>TDNV: Lỗi "Văn bản không tồn tại", không lưu
    end

    User->>FE: Mở màn thông tin văn bản
    FE->>BE: Lấy thông tin văn bản (bao gồm trạng thái nhiệm vụ)
    BE->>DB: Truy vấn trạng thái + link danh sách nhiệm vụ
    DB-->>BE: Trả dữ liệu
    BE-->>FE: Trả dữ liệu màn hình
    FE-->>User: Hiển thị nút/link "Xem danh sách nhiệm vụ"

    User->>FE: Bấm vào link "Xem danh sách nhiệm vụ"
    FE-->>User: Mở web view TDNV (danh sách nhiệm vụ của văn bản) để xử lý nhiệm vụ
```

## Flow: TDNV tra cứu danh sách văn bản theo tài khoản người dùng
**Trigger**: Người dùng trên TDNV đang cập nhật nhiệm vụ, cần chọn văn bản gắn với nhiệm vụ đó.
**Related UC**: TBD — chưa có use case
**Related FR**: TBD — chưa chạy `/srs`

```mermaid
sequenceDiagram
    participant TDNV as Hệ thống Theo dõi nhiệm vụ
    participant BE as Backend iOffice
    participant DB as CSDL iOffice

    TDNV->>BE: Yêu cầu danh sách văn bản theo tài khoản người dùng (user_id)

    alt Xác thực hợp lệ
        BE->>DB: Truy vấn văn bản thuộc kho tra cứu của user (văn bản đến/đi user liên quan)
        DB-->>BE: Danh sách văn bản (có thể rỗng nếu không có văn bản phù hợp)
        BE-->>TDNV: Trả danh sách văn bản (doc_id, số hiệu, trích yếu, loại văn bản)
    else Xác thực không hợp lệ
        BE-->>TDNV: Lỗi 401/403 "Không xác thực được yêu cầu"
    end
```

## Flow: TDNV gửi thông báo cập nhật hoàn thành nhiệm vụ
**Trigger**: Nhiệm vụ liên quan tới văn bản được cập nhật hoàn thành trên TDNV.
**Related UC**: TBD — chưa có use case
**Related FR**: TBD — chưa chạy `/srs`

```mermaid
sequenceDiagram
    participant TDNV as Hệ thống Theo dõi nhiệm vụ
    participant BE as Backend iOffice
    participant DB as CSDL iOffice
    participant FE as Giao diện văn bản
    actor User as Cán bộ nghiệp vụ

    TDNV->>BE: Gửi thông báo cập nhật hoàn thành nhiệm vụ (doc_id, nội dung thông báo)

    alt doc_id hợp lệ
        BE->>BE: Dựng bản ghi thông báo theo cấu trúc chuông thông báo hiện tại (OQ — xem Notes)
        BE->>DB: Lưu thông báo, gắn với (các) user liên quan tới văn bản
        DB-->>BE: Lưu thành công
        BE-->>TDNV: Xác nhận đã ghi nhận thông báo
    else doc_id không tồn tại
        BE-->>TDNV: Lỗi "Văn bản không tồn tại", không tạo thông báo
    end

    User->>FE: Mở chuông thông báo trên iOffice
    FE->>BE: Lấy danh sách thông báo của user
    BE->>DB: Truy vấn thông báo
    DB-->>BE: Danh sách thông báo (bao gồm thông báo mới từ TDNV)
    BE-->>FE: Trả dữ liệu
    FE-->>User: Hiển thị thông báo hoàn thành nhiệm vụ trong chuông thông báo
```

## Flow: Đẩy văn bản đi sang Theo dõi đôn đốc (tạo chỉ đạo điều hành)
**Trigger**: Cán bộ nghiệp vụ bấm "Đẩy sang Theo dõi đôn đốc" trên văn bản đi.
**Related UC**: TBD — chưa có use case
**Related FR**: TBD — chưa chạy `/srs`

```mermaid
sequenceDiagram
    actor User as Cán bộ nghiệp vụ
    participant FE as Giao diện văn bản
    participant BE as Backend iOffice
    participant DB as CSDL iOffice
    participant TDNV as Hệ thống Theo dõi nhiệm vụ (đôn đốc)

    User->>FE: Mở văn bản đi, bật checkbox "Cần tạo chỉ đạo điều hành"
    FE->>BE: Cập nhật cờ "Cần chỉ đạo điều hành"
    BE->>DB: Lưu cờ
    DB-->>BE: Lưu thành công
    BE-->>FE: Xác nhận

    User->>FE: Bấm "Đẩy sang Theo dõi đôn đốc"
    FE->>BE: Yêu cầu tạo chỉ đạo điều hành cho văn bản

    alt Đủ điều kiện (đã đánh dấu cần chỉ đạo + đã phát hành)
        BE->>TDNV: Gọi API tạo chỉ đạo điều hành (thông tin văn bản)
        alt TDNV tạo thành công
            TDNV-->>BE: Xác nhận đã tạo chỉ đạo
            BE->>DB: Cập nhật trạng thái "Đã đẩy sang đôn đốc"
            DB-->>BE: Cập nhật thành công
            BE-->>FE: Kết quả thành công
            FE-->>User: Thông báo "Đã tạo chỉ đạo điều hành"
        else TDNV trả lỗi
            TDNV-->>BE: Lỗi tạo chỉ đạo (vd timeout/lỗi hệ thống)
            BE-->>FE: Lỗi "Không tạo được chỉ đạo, thử lại sau"
            FE-->>User: Hiện thông báo lỗi
        end
    else Chưa đánh dấu "Cần chỉ đạo điều hành"
        BE-->>FE: Lỗi "Văn bản chưa được đánh dấu cần tạo chỉ đạo điều hành"
        FE-->>User: Hiện thông báo lỗi, chặn thao tác
    else Văn bản đi chưa phát hành
        BE-->>FE: Lỗi "Văn bản phải được phát hành trước khi tạo chỉ đạo điều hành"
        FE-->>User: Hiện thông báo lỗi, chặn thao tác
    end
```

## Notes

- **TDNV gộp cả module đôn đốc** — theo xác nhận, "Theo dõi đôn đốc" là cùng hệ thống TDNV (không tách participant riêng), nên flow "Đẩy sang Theo dõi đôn đốc" vẫn gọi participant `TDNV`.
- **Flow đẩy metadata sang TDNV khi tạo nhiệm vụ giữ nguyên hiện trạng** — không vẽ lại trong file này (theo yêu cầu); chỉ tham chiếu làm trigger cho *TDNV callback báo tạo nhiệm vụ thành công*.
- **OQ — cấu trúc thông báo trên chuông thông báo**: chưa xác nhận field cụ thể (tiêu đề/nội dung/loại/link...) khi TDNV gửi thông báo hoàn thành nhiệm vụ sang. Cần bổ sung khi có thông tin cấu trúc thông báo hiện tại của iOffice, rồi cập nhật lại flow *TDNV gửi thông báo cập nhật hoàn thành nhiệm vụ*.
- **Giả định — "File chính" bắt buộc chọn** khi văn bản có đính kèm (flow *Cập nhật thuộc tính văn bản*). Nếu nghiệp vụ thực tế cho phép không chọn file chính, cần sửa lại nhánh lỗi tương ứng.
- **Điều kiện phát hành trước khi tạo chỉ đạo** — validate tại thời điểm bấm nút "Đẩy sang Theo dõi đôn đốc" (theo xác nhận), không phải bước workflow trung gian riêng.
