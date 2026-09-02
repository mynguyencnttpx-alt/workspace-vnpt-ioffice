# XUẤT FILE EXCEL — DANH SÁCH UC (QĐ 671)
# Chuẩn format: 1 sheet, không merge cell, giá trị ở dòng đầu UC

---

## 1. CẤU TRÚC FILE

File xuất ra **1 sheet duy nhất**, tên tab: `Danh sách UC`

---

## 2. CẤU TRÚC CỘT

| Cột | Nội dung | Quy tắc ghi |
|-----|----------|-------------|
| A | TT (STT) | Dòng đầu UC có giá trị, dòng sau **bỏ trống** |
| B | (dự phòng) | Để trống toàn bộ |
| C | Tên Use Case | Dòng đầu UC có giá trị (bold), dòng sau **bỏ trống** |
| D | Tên tác nhân | Dòng đầu UC có giá trị, dòng sau **bỏ trống** |
| E | Giao dịch | **Mỗi dòng** một giao dịch — không bao giờ trống |
| F | BMT | Dòng đầu UC có giá trị, dòng sau **bỏ trống** |
| G | Độ phức tạp | Dòng đầu UC có giá trị, dòng sau **bỏ trống** |
| H | Số Transaction | Dòng đầu UC có giá trị, dòng sau **bỏ trống** |

**Không dùng merge cell ở bất kỳ đâu trong vùng dữ liệu.**

---

## 3. CHECKLIST TRƯỚC KHI XUẤT

- [ ] Đã confirm đủ 7 nhóm UC với user
- [ ] Không có UC nào > 12 giao dịch chưa xử lý
- [ ] Mọi UC có đủ: Tên, Tác nhân, Giao dịch, BMT, Độ phức tạp, Nhóm

---

## 4. SCRIPT PYTHON CHUẨN

Thay `UC_DATA` bằng dữ liệu thực tế đã confirm với user.

```python
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side

# ══════════════════════════════════════════════════════════════════════════════
# 1. DỮ LIỆU ĐẦU VÀO — thay bằng dữ liệu thực tế
# ══════════════════════════════════════════════════════════════════════════════

UC_DATA = [
    # {
    #   "nhom": "I",              # Số La Mã nhóm
    #   "nhom_ten": "TÊN NHÓM",   # In hoa
    #   "ucs": [
    #     {
    #       "stt": 1,
    #       "ten": "Tên Use Case",
    #       "actor": "Tên tác nhân",
    #       "bmt": "B",           # B / M / T
    #       "transactions": [
    #         "Actor làm gì. Hệ thống phản hồi gì",
    #       ],
    #     },
    #   ],
    # },
]

# ══════════════════════════════════════════════════════════════════════════════
# 2. STYLES
# ══════════════════════════════════════════════════════════════════════════════
HEADER_FILL = PatternFill("solid", fgColor="BDD6EE")
GROUP_FILL  = PatternFill("solid", fgColor="A8D08D")
WHITE_FILL  = PatternFill("solid", fgColor="FFFFFF")

FONT_HEADER   = Font(name="Times New Roman", size=14, bold=True)
FONT_HEADER_R = Font(name="Times New Roman", size=14, bold=True, color="FF0000")
FONT_GROUP    = Font(name="Times New Roman", size=13, bold=True)
FONT_STT      = Font(name="Times New Roman", size=14, bold=True)
FONT_TNR      = Font(name="Times New Roman", size=14)
FONT_AR       = Font(name="Arial", size=12)
FONT_AR_BOLD  = Font(name="Arial", size=12, bold=True)

ALIGN_CC  = Alignment(horizontal="center", vertical="center", wrap_text=True)
ALIGN_LC  = Alignment(horizontal="left",   vertical="center", wrap_text=True)
ALIGN_CC0 = Alignment(horizontal="center", vertical="center", wrap_text=False)

def _border():
    s = Side(border_style="medium")
    return Border(left=s, right=s, top=s, bottom=s)
BORDER = _border()

def do_phuc_tap(n):
    if n < 4:  return "Đơn giản"
    if n <= 7: return "Trung bình"
    return "Phức tạp"

# ══════════════════════════════════════════════════════════════════════════════
# 3. TẠO WORKBOOK — 1 SHEET, KHÔNG MERGE CELL
# ══════════════════════════════════════════════════════════════════════════════
wb = openpyxl.Workbook()
ws = wb.active
ws.title = "Danh sách UC"

ws.column_dimensions["A"].width = 5
ws.column_dimensions["B"].width = 5
ws.column_dimensions["C"].width = 43
ws.column_dimensions["D"].width = 30
ws.column_dimensions["E"].width = 58
ws.column_dimensions["F"].width = 17
ws.column_dimensions["G"].width = 19
ws.column_dimensions["H"].width = 18

# Header row
ws.row_dimensions[1].height = 113
for col_letter, text, font in [
    ("A", "TT",                        FONT_HEADER),
    ("B", None,                         FONT_HEADER),
    ("C", "Tên Use-case",               FONT_HEADER),
    ("D", "Tên tác nhân",               FONT_HEADER),
    ("E", "Giao dịch (Transaction)",    FONT_HEADER),
    ("F", "Phân loại theo BMT",         FONT_HEADER_R),
    ("G", "Phân loại theo độ phức tạp", FONT_HEADER),
    ("H", "Số Transaction",             FONT_HEADER),
]:
    c = ws[f"{col_letter}1"]
    c.value = text; c.font = font
    c.fill = HEADER_FILL; c.border = BORDER; c.alignment = ALIGN_CC

# Data rows
row = 2
for nhom in UC_DATA:
    # Group header row
    ws.row_dimensions[row].height = 19.5
    for col in range(1, 9):
        ws.cell(row=row, column=col).fill   = GROUP_FILL
        ws.cell(row=row, column=col).border = BORDER
    ws.cell(row=row, column=1, value=nhom["nhom"]).font     = FONT_GROUP
    ws.cell(row=row, column=1).alignment = ALIGN_CC0
    ws.cell(row=row, column=3, value=nhom["nhom_ten"]).font = FONT_GROUP
    row += 1

    for uc in nhom["ucs"]:
        n_gd     = len(uc["transactions"])
        dpt      = do_phuc_tap(n_gd)

        for i, gd_text in enumerate(uc["transactions"]):
            is_first = (i == 0)

            # Col A — STT: dòng đầu có giá trị, dòng sau trống
            ca = ws.cell(row=row, column=1)
            ca.value = uc["stt"] if is_first else None
            ca.font = FONT_STT; ca.border = BORDER; ca.alignment = ALIGN_CC

            # Col B — để trống
            ws.cell(row=row, column=2).border = BORDER
            ws.cell(row=row, column=2).fill   = WHITE_FILL

            # Col C — Tên UC: dòng đầu có giá trị, dòng sau trống
            cc = ws.cell(row=row, column=3)
            cc.value = uc["ten"] if is_first else None
            cc.font = FONT_AR_BOLD if is_first else FONT_AR
            cc.fill = WHITE_FILL; cc.border = BORDER; cc.alignment = ALIGN_LC

            # Col D — Tác nhân: dòng đầu có giá trị, dòng sau trống
            cd = ws.cell(row=row, column=4)
            cd.value = uc["actor"] if is_first else None
            cd.font = FONT_AR; cd.fill = WHITE_FILL
            cd.border = BORDER; cd.alignment = ALIGN_LC

            # Col E — Giao dịch: mỗi dòng một giao dịch
            ce = ws.cell(row=row, column=5, value=gd_text)
            ce.font = FONT_AR; ce.fill = WHITE_FILL
            ce.border = BORDER; ce.alignment = ALIGN_LC

            # Col F — BMT: dòng đầu có giá trị, dòng sau trống
            cf = ws.cell(row=row, column=6)
            cf.value = uc["bmt"] if is_first else None
            cf.font = FONT_TNR; cf.border = BORDER; cf.alignment = ALIGN_CC

            # Col G — Độ phức tạp: dòng đầu có giá trị, dòng sau trống
            cg = ws.cell(row=row, column=7)
            cg.value = dpt if is_first else None
            cg.font = FONT_TNR; cg.border = BORDER; cg.alignment = ALIGN_CC

            # Col H — Số giao dịch: dòng đầu có giá trị, dòng sau trống
            ch = ws.cell(row=row, column=8)
            ch.value = n_gd if is_first else None
            ch.font = FONT_TNR; ch.border = BORDER; ch.alignment = ALIGN_CC

            ws.row_dimensions[row].height = 46.5 if len(gd_text) > 80 else 31.5
            row += 1

OUTPUT = "docs/DanhSach_UC.xlsx"  # tạo thư mục docs/ ở thư mục làm việc hiện tại nếu chưa có
wb.save(OUTPUT)
print(f"✅ Đã xuất: {OUTPUT}")
```

---

## 5. GHI CHÚ KỸ THUẬT

- **Không dùng `merge_cells()`** ở bất kỳ đâu trong vùng dữ liệu
- Giá trị STT, Tên UC, Tác nhân, BMT, Độ phức tạp, Số Transaction chỉ ghi **1 lần duy nhất** ở dòng đầu tiên của mỗi UC
- Các dòng giao dịch tiếp theo của cùng UC: cột A, C, D, F, G, H để **trống hoàn toàn** — chỉ cột E có nội dung giao dịch
- **Cảnh báo UC > 12 giao dịch**: BA phải xử lý (tách UC) trước khi xuất
