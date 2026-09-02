---
name: baogia
description: >
  Tạo file báo giá phần mềm (Excel .xlsx) theo mẫu chuẩn eGOV từ thông tin
  nghiệp vụ và dữ liệu estimate (manday). Kích hoạt khi user yêu cầu: "tạo
  báo giá", "xuất báo giá", "lập báo giá", "điền bảng báo giá", "estimate
  theo mẫu", "báo giá TP", hoặc cung cấp danh sách task/manday cần định giá.
license: Proprietary
---

<!-- skill version: 2.2 (cập nhật: bắt buộc hỏi lại khi input thiếu mô tả/
     estimate manday; thêm tỷ lệ căn chỉnh BA/Test theo Dev khi thiếu số
     liệu riêng — 1 BA = 4 Dev, 1 Tester = 3 Dev) -->

# Skill: Tạo Báo Giá Phần Mềm (Mẫu eGOV)

## Mục đích

Tạo file Excel báo giá phần mềm đúng cấu trúc mẫu chuẩn eGOV từ dữ liệu
nghiệp vụ và estimate manday do user cung cấp (hoặc nhập thủ công).

---

## Cấu trúc mẫu báo giá

### Thông tin sheet
- Sheet duy nhất: `Sheet1`
- Cột sử dụng: A–G (7 cột chính), cột H–J để trống (không có border)
- Font: **Times New Roman, size 13** cho toàn bộ

### Cấu trúc cột

| Cột | Header               | Width (chars) | Căn lề nội dung            |
|-----|----------------------|---------------|----------------------------|
| A   | TT                   | 7.43          | center                     |
| B   | Nội dung công việc   | 71.43         | left (header: center)      |
| C   | Đơn vị thực hiện     | 29.29         | center                     |
| D   | Số lượng nhân sự     | 15.43         | center                     |
| E   | Số ngày thực hiện    | 13.43         | center                     |
| F   | Manday               | 20.00         | center (dòng tổng: right)  |
| G   | Ghi chú              | 29.86         | center                     |

### Màu sắc & định dạng

| Vùng                         | Background | Font            |
|------------------------------|------------|-----------------|
| Header row (row 1)           | `D9D9D9`   | Bold, đen       |
| Row nhóm chính (1, 2, 3…)    | `D9D9D9`   | Bold, đen       |
| Row sub-group (1.1, 2.2…)    | Trắng      | Bold cột B, đen |
| Row task chi tiết            | Trắng      | Normal          |
| Cột F – task chi tiết        | `FFFF00`   | Normal          |
| Row Tổng / Đơn giá / Tổng CP | `D9D9D9`   | Bold, đen       |

### Formulas

- Task chi tiết – cột F: `=D{row}*E{row}`
- Tổng khối lượng: `=SUM(F2:F{last_task_row})`
- Tổng chi phí: `=F{tong_row}*F{dongia_row}`

### Merged cells (3 dòng tổng kết)

- `A{tong_row}:B{tong_row}` → `"Tổng khối lượng (Manday)\xa0"` (căn phải)
- `A{dongia_row}:B{dongia_row}` → `"Đơn giá (VNĐ/ Manday)"` (căn phải)
- `A{tcp_row}:B{tcp_row}` → `"Tổng chi phí\xa0(VNĐ)"` (căn phải)

### Border & Row height

- Cột A–G tất cả dòng (kể cả tổng kết): border **thin** 4 phía
- Cột H, I, J: không có border
- Header row: height **33pt**; tất cả các row dữ liệu/nhóm/tổng kết còn lại:
  height **16.5pt** (set tường minh, không để auto — đúng theo file mẫu)

---

## Quy tắc đánh số TT

| Loại dòng     | Cột A              | Cột B    | Bold?               | Cột C (Đơn vị)             |
|---------------|--------------------|----------|---------------------|-----------------------------|
| Nhóm chính    | 1, 2, 3, 4, 5      | Tên nhóm | Cả A và B           | **Điền** (không để trống)  |
| Sub-group     | 1.1, 2.1, 2.2…     | Tên sub  | Chỉ B (A không bold)| **Điền** (không để trống)  |
| Task chi tiết | Trống              | Tên task | Không               | Điền                        |

> **Quan trọng:** Cột C (Đơn vị thực hiện) phải điền giá trị đơn vị cho
> **tất cả** các loại dòng — kể cả dòng nhóm chính và sub-group — không chỉ
> riêng task chi tiết. File mẫu chuẩn luôn có cột C nhất quán trên mọi dòng.

### 5 nhóm chuẩn (dùng khi user không chỉ định nhóm)

1. **Tiếp nhận và phân tích yêu cầu** – BA tasks: phân tích, khả thi, nghiệp vụ
2. **Phân tích thiết kế** – wireframe, đặc tả, thiết kế CSDL
3. **Lập trình** – phát triển chức năng
4. **Kiểm thử - Test** – test chức năng, UAT
5. **Deploy và Upcode** – build, upcode, triển khai

### Tỷ lệ căn chỉnh effort BA / Test theo Dev (khi thiếu số liệu riêng)

Tỷ lệ nhân sự chuẩn của tổ chức: **1 BA : 4 Dev** và **1 Tester : 3 Dev**.
Quy đổi sang effort (manday) khi user KHÔNG cung cấp sẵn số ngày riêng cho
nhóm 1+2 (BA) hoặc nhóm 4 (Test):

```
Effort BA   (gộp Nhóm 1 "Tiếp nhận và phân tích yêu cầu" + Nhóm 2 "Phân tích thiết kế")
            = Tổng effort Nhóm 3 "Lập trình" ÷ 4

Effort Test (Nhóm 4 "Kiểm thử - Test")
            = Tổng effort Nhóm 3 "Lập trình" ÷ 3
```

**Cách áp dụng:**
1. Cộng tổng Manday của toàn bộ task trong Nhóm 3 (Lập trình) trước — đây
   luôn là số liệu gốc do user cung cấp hoặc đã estimate riêng (skill
   `effort-estimate-pmbok`), KHÔNG được suy ngược lại từ BA/Test.
2. Suy ra effort BA = Dev ÷ 4, effort Test = Dev ÷ 3.
3. Khi cần tách effort BA thành 2 dòng task cụ thể cho Nhóm 1 và Nhóm 2 mà
   user không nói rõ tỷ trọng → chia đều 50/50 (hoặc nghiêng nhẹ về Nhóm 2
   nếu việc chủ yếu là thiết kế UI/CSDL) — không cần chính xác tuyệt đối
   từng dòng, chỉ cần tổng Nhóm 1 + Nhóm 2 khớp đúng công thức ở trên.
4. Nhóm 5 (Deploy và Upcode) **không** nằm trong tỷ lệ này — ước lượng
   riêng theo quy mô công việc build/upcode/triển khai thực tế, đánh dấu
   `[GIẢ ĐỊNH]` nếu chưa có input cụ thể.

**Ưu tiên số liệu user cung cấp:** nếu user đã tự đưa effort BA hoặc Test
riêng (khác với suy theo tỷ lệ) → dùng đúng số user cung cấp, KHÔNG ép ghi
đè theo công thức trên. Tỷ lệ này chỉ là **mặc định khi thiếu dữ liệu**,
không phải quy tắc bắt buộc áp cho mọi trường hợp.

### Tách đủ đầu mục lớn (sub-group theo nền tảng/phân hệ)

**Bắt buộc tách sub-group** bất cứ khi nào một nhóm chính (đặc biệt là nhóm
"Lập trình") bao gồm công việc trên **nhiều nền tảng hoặc phân hệ khác
nhau** — ví dụ Web, App/Mobile, Portal, Admin, Backend/API, hoặc nhiều
module nghiệp vụ lớn. Không được gộp phẳng tất cả task vào một nhóm chính
duy nhất khi có nhiều nền tảng/phân hệ.

Ví dụ đúng (theo file mẫu chuẩn):

```
3    Lập trình
3.1  Web
     - Lập trình chức năng đăng nhập SSO trên Web
     - Lập trình chức năng đăng xuất SSO trên Web
3.2  App
     - Lập trình chức năng đăng nhập SSO trên App
     - Lập trình chức năng đăng xuất SSO trên App
```

Nếu user liệt kê task nhưng không nói rõ nền tảng, hỏi lại hoặc suy luận từ
tên task (vd. "trên Web", "trên App", "Mobile", "Portal quản trị"...) để
tách đúng sub-group. Áp dụng nguyên tắc tương tự cho nhóm "Kiểm thử - Test"
nếu việc test cũng chia theo nền tảng/phân hệ.

---

## Quy trình tạo file

### Bước 1 – Thu thập thông tin từ user

Hỏi (hoặc đọc từ input) các thông tin sau:
- **Tên dự án / phiên bản** (dùng cho tên file output)
- **Danh sách task** kèm nhóm, số ngày, số nhân sự
- **Đơn vị thực hiện** (mặc định: `DAS`, điền cho **mọi** dòng kể cả nhóm/sub-group)
- **Đơn giá Manday** (mặc định: `1,181,800 VNĐ`)

> Nếu user chỉ cung cấp danh sách task thô (không có nhóm), tự động phân nhóm
> theo 5 nhóm chuẩn. Số nhân sự mặc định = 1 nếu không có.

#### Gate bắt buộc — dừng lại hỏi khi input chưa đủ để build file

**KHÔNG tự bịa mô tả công việc hoặc tự bịa số ngày/manday** khi input chưa
đủ. Kiểm tra đúng 2 điều kiện sau trước khi sang Bước 2:

| Thiếu gì | Dấu hiệu | Hành động |
|---|---|---|
| **Mô tả/phạm vi công việc** | User chỉ nói tên dự án hoặc yêu cầu chung chung ("làm báo giá cho module X"), không đủ để tách ra được ít nhất 1 task cụ thể của Nhóm 3 (Lập trình) | Dừng lại, hỏi user mô tả chức năng/danh sách công việc cụ thể — không tự suy đoán phạm vi |
| **Estimate manday (số ngày) cho Nhóm 3 - Lập trình** | User đưa mô tả/danh sách task nhưng không kèm số ngày cho phần lớn hoặc toàn bộ task Lập trình, và cũng chưa có sẵn kết quả estimate nào khác (vd từ skill `effort-estimate-pmbok`) | Dừng lại, hỏi user cung cấp số ngày/manday, hoặc đề xuất chạy skill `effort-estimate-pmbok` trước để ra effort rồi quay lại `/baogia` |

Câu hỏi mẫu khi thiếu:

```
Để lập báo giá, mình cần thêm:
1. [Nếu thiếu mô tả] Phạm vi công việc cụ thể — chức năng/màn hình nào cần làm?
2. [Nếu thiếu estimate] Số ngày công (manday) cho từng task Lập trình — hoặc
   bạn muốn mình chạy ước lượng effort (skill effort-estimate-pmbok) trước
   rồi mới lập báo giá?
```

Chỉ áp dụng gate này cho **Nhóm 3 (Lập trình)** — effort của Nhóm 1+2 (BA)
và Nhóm 4 (Test) có thể tự suy ra theo tỷ lệ chuẩn khi thiếu (xem mục "Tỷ
lệ căn chỉnh effort BA / Test theo Dev" bên dưới), không cần hỏi lại riêng
cho 2 nhóm này. Nhóm 5 (Deploy) thiếu số liệu → ước lượng nhỏ hợp lý và
đánh dấu `[GIẢ ĐỊNH]`, cũng không cần dừng lại hỏi.

**Chỉ sang Bước 2 sau khi đã đủ mô tả + đủ estimate Nhóm 3**, hoặc user xác
nhận dùng số liệu tạm/giả định (khi đó đánh dấu rõ `[GIẢ ĐỊNH]` trong cột
Ghi chú của các dòng liên quan, không im lặng bịa số).

### Bước 2 – Xây dựng danh sách rows

```python
# Mỗi phần tử là dict với keys:
#   type      – "group" | "subgroup" | "task"
#   tt        – str, vd "1", "2.1", "" (task con không số)
#   noi_dung  – str
#   don_vi    – str (mặc định "DAS") — điền cho MỌI loại dòng, kể cả group/subgroup
#   so_nhan_su – int | None
#   so_ngay    – float | None
#   ghi_chu   – str (mặc định "")

rows_data = [
    {"type": "group",   "tt": "1",   "noi_dung": "Tiếp nhận và phân tích yêu cầu", "don_vi": "DAS", "so_nhan_su": None, "so_ngay": None},
    {"type": "task",    "tt": "",    "noi_dung": "Phân tích yêu cầu nghiệp vụ",    "don_vi": "DAS", "so_nhan_su": 1,    "so_ngay": 3.0},
    {"type": "task",    "tt": "",    "noi_dung": "Nghiên cứu giải pháp",            "don_vi": "DAS", "so_nhan_su": 1,    "so_ngay": 2.0},
    {"type": "group",   "tt": "2",   "noi_dung": "Phân tích thiết kế",             "don_vi": "DAS", "so_nhan_su": None, "so_ngay": None},
    {"type": "subgroup","tt": "2.1", "noi_dung": "Thiết kế UI/UX",                 "don_vi": "DAS", "so_nhan_su": None, "so_ngay": None},
    {"type": "task",    "tt": "",    "noi_dung": "Vẽ wireframe",                    "don_vi": "DAS", "so_nhan_su": 1,    "so_ngay": 2.0},
    {"type": "group",   "tt": "3",   "noi_dung": "Lập trình",                      "don_vi": "DAS", "so_nhan_su": None, "so_ngay": None},
    {"type": "subgroup","tt": "3.1", "noi_dung": "Web",                            "don_vi": "DAS", "so_nhan_su": None, "so_ngay": None},
    {"type": "task",    "tt": "",    "noi_dung": "Lập trình chức năng X trên Web",  "don_vi": "DAS", "so_nhan_su": 1,    "so_ngay": 5.0},
    {"type": "subgroup","tt": "3.2", "noi_dung": "App",                            "don_vi": "DAS", "so_nhan_su": None, "so_ngay": None},
    {"type": "task",    "tt": "",    "noi_dung": "Lập trình chức năng X trên App",  "don_vi": "DAS", "so_nhan_su": 1,    "so_ngay": 5.0},
    # ... tiếp tục — luôn tách sub-group 3.1/3.2... khi có nhiều nền tảng
]
```

### Bước 3 – Code tạo file (openpyxl)

```python
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
import os
from datetime import datetime

FONT_NAME = "Times New Roman"
FONT_SIZE = 13

# ── Helpers ──────────────────────────────────────────────────────────────────

def thin_border():
    s = Side(style="thin")
    return Border(left=s, right=s, top=s, bottom=s)

def fill_gray():
    return PatternFill("solid", fgColor="FFD9D9D9")

def fill_yellow():
    return PatternFill("solid", fgColor="FFFFFF00")

def fill_white():
    return PatternFill("solid", fgColor="FFFFFFFF")

def make_font(bold=False):
    return Font(name=FONT_NAME, size=FONT_SIZE, bold=bold, color="FF000000")

# ── Header row ────────────────────────────────────────────────────────────────

def apply_header(ws):
    headers = [
        "TT", "Nội dung công việc", "Đơn vị thực hiện",
        "Số lượng nhân sự", "Số ngày thực hiện", "Manday", "Ghi chú"
    ]
    for col, h in enumerate(headers, 1):
        c = ws.cell(row=1, column=col, value=h)
        c.font      = make_font(bold=True)
        c.fill      = fill_gray()
        c.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
        c.border    = thin_border()
    ws.row_dimensions[1].height = 33

# ── Column widths ─────────────────────────────────────────────────────────────

def set_col_widths(ws):
    for col, w in zip("ABCDEFG", [7.43, 71.43, 29.29, 15.43, 13.43, 20.0, 29.86]):
        ws.column_dimensions[col].width = w

# ── Data row ──────────────────────────────────────────────────────────────────

def apply_row(ws, excel_row, row_type, tt, noi_dung,
              don_vi="DAS", so_ns=None, so_ngay=None, ghi_chu=""):
    is_group   = row_type == "group"
    is_sub     = row_type == "subgroup"
    is_task    = row_type == "task"
    bg         = fill_gray() if is_group else fill_white()
    ws.row_dimensions[excel_row].height = 16.5

    # A – TT
    a = ws.cell(row=excel_row, column=1, value=tt or None)
    a.font = make_font(bold=is_group); a.fill = bg
    a.alignment = Alignment(horizontal="center", vertical="center")
    a.border = thin_border()

    # B – Nội dung
    b = ws.cell(row=excel_row, column=2, value=noi_dung)
    b.font = make_font(bold=(is_group or is_sub)); b.fill = bg
    b.alignment = Alignment(horizontal="left", vertical="center", wrap_text=True)
    b.border = thin_border()

    # C – Đơn vị
    c = ws.cell(row=excel_row, column=3, value=don_vi or None)
    c.font = make_font(bold=is_group); c.fill = bg
    c.alignment = Alignment(horizontal="center", vertical="center")
    c.border = thin_border()

    # D – Số nhân sự
    d = ws.cell(row=excel_row, column=4, value=so_ns)
    d.font = make_font(); d.fill = fill_white() if is_task else bg
    d.alignment = Alignment(horizontal="center", vertical="center")
    d.border = thin_border()

    # E – Số ngày
    e = ws.cell(row=excel_row, column=5, value=so_ngay)
    e.font = make_font(); e.fill = fill_white() if is_task else bg
    e.alignment = Alignment(horizontal="center", vertical="center")
    e.border = thin_border()

    # F – Manday (formula nếu là task có đủ dữ liệu)
    f_val = f"=D{excel_row}*E{excel_row}" if (is_task and so_ns is not None and so_ngay is not None) else None
    f = ws.cell(row=excel_row, column=6, value=f_val)
    f.font = make_font(); f.fill = fill_yellow() if is_task else bg
    f.alignment = Alignment(horizontal="center", vertical="center")
    f.border = thin_border()

    # G – Ghi chú
    g = ws.cell(row=excel_row, column=7, value=ghi_chu or None)
    g.font = make_font(); g.fill = bg
    g.alignment = Alignment(horizontal="center", vertical="center")
    g.border = thin_border()

# ── Summary rows ──────────────────────────────────────────────────────────────

def apply_summary_rows(ws, next_row, don_gia=1181800):
    """Thêm 3 dòng tổng kết ngay sau dòng data cuối cùng."""
    last_data = next_row - 1
    tong_row  = next_row
    dg_row    = next_row + 1
    tcp_row   = next_row + 2

    gray = fill_gray()
    bf   = make_font(bold=True)
    ra   = Alignment(horizontal="right", vertical="center")

    def _base_row(r, label):
        ws.row_dimensions[r].height = 16.5
        ws.merge_cells(f"A{r}:B{r}")
        lbl = ws.cell(row=r, column=1, value=label)
        lbl.font = bf; lbl.fill = gray; lbl.alignment = ra
        for col in range(1, 8):
            ws.cell(row=r, column=col).border = thin_border()

    # Tổng Manday
    _base_row(tong_row, "Tổng khối lượng (Manday)\xa0")
    f_t = ws.cell(row=tong_row, column=6, value=f"=SUM(F2:F{last_data})")
    f_t.font = bf; f_t.fill = gray
    f_t.alignment = Alignment(horizontal="right", vertical="center")

    # Đơn giá
    _base_row(dg_row, "Đơn giá (VNĐ/ Manday)")
    f_dg = ws.cell(row=dg_row, column=6, value=don_gia)
    f_dg.font = bf; f_dg.fill = gray
    f_dg.alignment = Alignment(horizontal="right", vertical="center")
    f_dg.number_format = "#,##0"

    # Tổng chi phí
    _base_row(tcp_row, "Tổng chi phí\xa0(VNĐ)")
    f_tcp = ws.cell(row=tcp_row, column=6, value=f"=F{tong_row}*F{dg_row}")
    f_tcp.font = bf; f_tcp.fill = gray
    f_tcp.alignment = Alignment(horizontal="right", vertical="center")
    f_tcp.number_format = "#,##0"

# ── Entry point ───────────────────────────────────────────────────────────────

def build_baogia(rows_data, output_path, don_gia=1181800):
    """
    rows_data : list[dict] – xem cấu trúc ở Bước 2
    output_path : đường dẫn file .xlsx đầu ra
    don_gia : đơn giá VNĐ/manday (mặc định 1,181,800)
    """
    wb = Workbook()
    ws = wb.active
    ws.title = "Sheet1"

    set_col_widths(ws)
    apply_header(ws)

    excel_row = 2
    for r in rows_data:
        apply_row(
            ws, excel_row,
            row_type   = r["type"],
            tt         = r.get("tt", ""),
            noi_dung   = r["noi_dung"],
            don_vi     = r.get("don_vi", "DAS"),
            so_ns      = r.get("so_nhan_su"),
            so_ngay    = r.get("so_ngay"),
            ghi_chu    = r.get("ghi_chu", ""),
        )
        excel_row += 1

    apply_summary_rows(ws, excel_row, don_gia)

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    wb.save(output_path)
    print(f"✅ Saved: {output_path}")
    return output_path
```

### Bước 4 – Recalculate formulas (bắt buộc)

Sau khi lưu file, chạy recalc để Excel hiển thị đúng giá trị công thức:

```python
import subprocess, sys

def recalc_xlsx(path, timeout=30):
    """Dùng LibreOffice headless để force-recalculate formulas."""
    result = subprocess.run(
        ["python3", "scripts/recalc.py", path, str(timeout)],
        capture_output=True, text=True
    )
    if result.returncode != 0:
        print(f"⚠️  recalc warning: {result.stderr}")
    else:
        print(f"✅ recalc OK")
    return result.returncode == 0
```

> **Lưu ý:** Nếu môi trường không có `recalc.py`, bỏ qua bước này — file vẫn hợp lệ,
> formulas sẽ tính khi mở trong Excel/LibreOffice.

---

## Tên file output

Lưu tại `docs/` ở thư mục làm việc hiện tại (tạo thư mục nếu chưa có):

```
docs/BaoGia_{TenDuAn/TenTP}_{YYYYMMDD}.xlsx
```

Ví dụ: `docs/BaoGia_iStorage_TP5_20250520.xlsx`

---

## Ví dụ input từ user

### Dạng 1 – Danh sách task thô (phổ biến nhất)

```
Phân tích yêu cầu: 3 ngày
Viết đặc tả: 4 ngày
Lập trình chức năng A: 10 ngày
Lập trình chức năng B: 8 ngày
Test: 4 ngày
Deploy: 3 ngày
Đơn giá: 1,200,000 VNĐ/manday
```

→ Phân nhóm theo 5 nhóm chuẩn (tách sub-group theo nền tảng nếu có nhiều
nền tảng), số nhân sự mặc định = 1, đơn vị = DAS (điền cho mọi dòng).

### Dạng 2 – Dữ liệu có sẵn theo nhóm/sub-group

User cung cấp JSON hoặc bảng Markdown có sẵn cấu trúc nhóm → map trực tiếp,
không cần phân nhóm lại.

### Dạng 3 – Chỉnh sửa file đã có

```python
from openpyxl import load_workbook

wb = load_workbook(uploaded_path)
ws = wb.active
# Tìm đúng cell cần sửa, giữ nguyên format các cell khác
ws["E5"] = 5.0   # ví dụ cập nhật số ngày
wb.save(output_path)
```

---

## Xử lý lỗi thường gặp

| Lỗi | Nguyên nhân | Xử lý |
|-----|-------------|-------|
| `IllegalCharacterError` | Ký tự đặc biệt trong chuỗi | Dùng `re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]', '', text)` |
| Merge cell bị lỗi khi chỉnh sửa | Cell đã merged từ trước | Gọi `ws.unmerge_cells(...)` trước khi merge lại |
| Formula không tính | openpyxl không chạy engine | Chạy recalc.py hoặc mở file trong Excel/LibreOffice |
| Font không hiển thị | Máy không cài Times New Roman | Chấp nhận được, font fallback tự động |

---

## Checklist trước khi xuất file

- [ ] Font Times New Roman size 13 toàn bộ
- [ ] Header row: gray `D9D9D9`, bold, height 33pt
- [ ] Group rows: gray `D9D9D9`, bold cả A và B, cột C có điền đơn vị
- [ ] Sub-group rows: white, bold chỉ B, cột C có điền đơn vị
- [ ] Task rows: white, cột F yellow `FFFF00`, formula `=D*E`, cột C có điền đơn vị
- [ ] Đã tách sub-group riêng cho từng nền tảng/phân hệ (Web, App…) nếu nhóm
      chính có nhiều hơn 1 nền tảng — không gộp phẳng
- [ ] Row height: header 33pt, tất cả các row khác (kể cả tổng kết) 16.5pt
- [ ] 3 dòng tổng kết: merge A:B, gray, bold, căn phải
- [ ] Đơn giá: number_format `#,##0`
- [ ] Tổng chi phí: formula `=F_tong * F_dongia`, number_format `#,##0`
- [ ] Border thin 4 phía cột A–G; cột H–J không border
- [ ] Column widths đúng theo bảng chuẩn
- [ ] Tên file: `BaoGia_{Ten}_{YYYYMMDD}.xlsx`

---

## Lưu ý quan trọng

1. **Không hardcode manday** – luôn dùng `=D{row}*E{row}` để file còn chỉnh sửa được.
2. **Không hardcode tổng chi phí** – dùng `=F_tong*F_dongia`.
3. Đơn giá mặc định: **1,181,800 VNĐ/manday** (override nếu user chỉ định).
4. Đơn vị mặc định: **DAS** (override nếu user chỉ định đơn vị khác) —
   điền cho **mọi** loại dòng (group, subgroup, task), không để trống cột C
   ở dòng nhóm/sub-group.
5. Sub-group chỉ có tên, bold, không có formula cột F (vì không có số ngày riêng).
6. Khi user upload file mẫu (.xlsx), dùng `load_workbook` để đọc rồi cập nhật — **không tạo lại từ đầu** để giữ format gốc.
7. **Không tự bịa mô tả công việc hoặc số ngày/manday** khi input thiếu — dừng lại hỏi user theo gate ở Bước 1, trừ khi user xác nhận dùng số liệu tạm (đánh dấu `[GIẢ ĐỊNH]`).
8. Effort Nhóm 1+2 (BA) và Nhóm 4 (Test) khi thiếu số liệu riêng → suy ra theo tỷ lệ chuẩn **BA = Dev ÷ 4, Test = Dev ÷ 3** (dựa trên tổng effort Nhóm 3 - Lập trình), không tự đặt số tùy ý. Nếu user đã cho sẵn số riêng thì ưu tiên dùng số đó.
