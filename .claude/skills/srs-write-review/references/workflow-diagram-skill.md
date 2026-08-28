# WORKFLOW DIAGRAM SKILL
# Vẽ biểu đồ Sequence Diagram cho section "Quy trình" (3.1) và tương tác giữa các actor/hệ thống

> Đọc file này thay vì dùng bảng khi render section 3.1 Quy trình.
> Renderer đã được test và verified — chỉ thay data `SEQ`, không sửa engine.
> **Vì sao đổi từ Activity Diagram (swimlane) sang Sequence Diagram:** SRS iOffice/iStorage
> chủ yếu mô tả tương tác qua lại nhiều lượt giữa actor và hệ thống (request/response,
> gọi CSDL, gọi API...) — sequence diagram thể hiện rõ **thứ tự thời gian** và
> **ai gọi ai** hơn activity diagram, vốn hợp với luồng rẽ nhánh thuần logic hơn.

---

## 1. KIẾN TRÚC PIPELINE

```
SEQ data (participants + events)
        │
        ▼
workflow_renderer.py   ←── vẽ Sequence Diagram bằng Pillow
        │
        ▼
workflow.png           ←── PNG xuất ra (kích thước tự co theo số participant/event)
        │
        ▼
docx-generator.js      ←── nhúng PNG bằng ImageRun
        │
        ▼
srs-output.docx
```

**Dependency:** `pip install pillow --break-system-packages`
Font DejaVu Sans có sẵn trên Ubuntu — không cần cài thêm.

> ⚠️ **Không dùng emoji trong label** (`"👤 Văn thư"`) — DejaVu Sans không render emoji màu,
> sẽ ra ô vuông trống (tofu box). Dùng text thuần: `"Văn thư"`.

---

## 2. DATA MODEL — Cách điền `SEQ`

```python
SEQ = {
  # ── Participant (lifeline dọc) ──────────────────────────────────────────
  # Thứ tự trong list = thứ tự trái → phải trên diagram
  "participants": [
    {"id": "user",   "label": "Văn thư"},
    {"id": "system", "label": "Hệ thống"},
    {"id": "db",     "label": "CSDL"},       # thêm participant nếu có gọi DB/API riêng
  ],

  # ── Event: danh sách tuần tự theo đúng thứ tự xuất hiện trên diagram ─────
  "events": [
    # message: 1 mũi tên giữa 2 participant
    #   style: "call"  = mũi tên liền, đầu đặc  (yêu cầu / hành động)
    #          "return"= mũi tên đứt, đầu rỗng  (phản hồi / kết quả)
    #          "self"  = from == to             (tự xử lý nội bộ)
    {"type": "message", "from": "user",   "to": "system", "label": "(1) Nhấn nút Tiếp nhận văn bản", "style": "call"},
    {"type": "message", "from": "system", "to": "db",     "label": "(2) Kiểm tra trùng số hiệu",      "style": "call"},
    {"type": "message", "from": "db",     "to": "system", "label": "Kết quả kiểm tra",                "style": "return"},
    {"type": "message", "from": "system", "to": "system", "label": "(2b) Tự validate business rule",  "style": "self"},

    # alt_start / alt_else / alt_end: khung rẽ nhánh (thay decision diamond cũ)
    #   participants: (⚪ optional) giới hạn khung chỉ bao quanh 1 vài lifeline;
    #                 bỏ qua = bao toàn bộ chiều rộng diagram
    {"type": "alt_start", "label": "Số hiệu hợp lệ"},
    {"type": "message", "from": "system", "to": "db",   "label": "(3) Lưu văn bản",                    "style": "call"},
    {"type": "message", "from": "system", "to": "user", "label": "(4) Hiển thị thông báo thành công",  "style": "return"},
    {"type": "alt_else", "label": "Số hiệu trùng"},     # có thể lặp lại alt_else nhiều lần cho >2 nhánh
    {"type": "message", "from": "system", "to": "user", "label": "(3) Hiển thị lỗi EX-01",             "style": "return"},
    {"type": "alt_end"},

    # opt_start / opt_end: khung tùy chọn — chỉ 1 nhánh, không có else
    #   dùng khi có bước "nếu có điều kiện X thì làm thêm Y" (không phải lỗi/rẽ nhánh 2 chiều)
    {"type": "opt_start", "label": "Có người duyệt tiếp theo"},
    {"type": "message", "from": "system", "to": "user", "label": "(5) Thông báo người duyệt kế", "style": "call"},
    {"type": "opt_end"},

    # loop_start / loop_end: khung lặp — dùng khi 1 bước lặp lại nhiều lần (vd. duyệt nhiều cấp)
    {"type": "loop_start", "label": "Với mỗi cấp duyệt"},
    {"type": "message", "from": "system", "to": "user", "label": "Gửi yêu cầu duyệt", "style": "call"},
    {"type": "loop_end"},

    # note: ghi chú đặt trên 1 hoặc nhiều lifeline (vd. audit log, trạng thái)
    {"type": "note", "over": ["system"], "label": "Ghi log thao tác tiếp nhận"},
  ],
}
```

### Bảng quy tắc điền data

| Trường | Bắt buộc | Ghi chú |
|--------|----------|---------|
| `participants[].id` | ✅ | snake_case, không dấu |
| `participants[].label` | ✅ | Tên actor/hệ thống hiển thị — **không dùng emoji** |
| `events[].type` | ✅ | `message` / `note` / `alt_start` / `alt_else` / `alt_end` / `opt_start` / `opt_end` / `loop_start` / `loop_end` |
| `events[].style` (message) | ✅ | `call` (yêu cầu) / `return` (phản hồi) / `self` (tự xử lý, `from`==`to`) |
| `events[].label` | ✅ | Đánh số thứ tự bước `(1)`, `(2)`... khớp với số bước trong Luồng thành công |
| `alt_start/opt_start/loop_start.participants` | ⚪ | Giới hạn khung; mặc định bao toàn bộ chiều rộng |
| `note.over` | ✅ (nếu dùng note) | List id participant mà note bao qua |

### Mapping từ loại nội dung SRS sang event

| Nội dung trong Chức năng nghiệp vụ | Event tương ứng |
|---|---|
| Bước trong Luồng thành công (actor → hệ thống) | `message` style `call` |
| Hệ thống trả kết quả / hiển thị cho actor | `message` style `return` |
| Hệ thống tự xử lý nội bộ (validate, tính toán) không thấy actor khác | `message` style `self` |
| Rẽ nhánh 2 chiều có điều kiện (Thành công / Thất bại, Hợp lệ / Không hợp lệ) | `alt_start` + `alt_else` + `alt_end` — **thay hoàn toàn cho decision diamond của Activity Diagram cũ** |
| Bước chỉ xảy ra khi có điều kiện phụ, không có nhánh else | `opt_start` + `opt_end` |
| Bước lặp lại nhiều lần (duyệt nhiều cấp, gửi nhiều người nhận) | `loop_start` + `loop_end` |
| Ghi log / audit trail / trạng thái | `note` |

> **Quy tắc bắt buộc:** Mỗi `alt_start` phải có `alt_end` tương ứng (và ít nhất 1 `alt_else` nếu có ≥2 nhánh).
> Không lồng quá 1 cấp `alt`/`opt`/`loop` — nếu nghiệp vụ phức tạp hơn, tách thành nhiều diagram nhỏ theo từng chức năng.

---

## 3. RENDERER ENGINE (Không sửa — chỉ thay SEQ)

Lưu file sau thành `workflow_renderer.py` trong cùng thư mục với `docx-generator.js`:

```python
from PIL import Image, ImageDraw, ImageFont
import math

FONT_R = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
FONT_B = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
FONT_I = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Oblique.ttf'
def font(sz, bold=False, italic=False):
    try:
        p = FONT_B if bold else (FONT_I if italic else FONT_R)
        return ImageFont.truetype(p, sz)
    except: return ImageFont.load_default()

CFG = dict(
    hh=56,          # chiều cao header actor box
    lane_w=230,     # khoảng cách giữa các lifeline
    pad=40,         # lề trái/phải
    top_pad=24,     # khoảng trống trên header
    msg_gap=62,     # khoảng cách dọc giữa các message
    note_gap=50,
    frag_label_h=28,# chiều cao thanh nhãn alt/opt/loop
    frag_pad=16,    # đệm trong khung fragment
    self_w=70,      # bề rộng vòng lặp self-call
    fsz=13, sc=2,
    cl_bg=(255,255,255),
    cl_actor=(31,73,125), cl_actor_t=(255,255,255),
    cl_line=(60,60,60), cl_life=(150,150,150),
    cl_lbl=(20,20,20),
    cl_frag=(200,120,30), cl_frag_bg=(255,247,235),
    cl_note=(255,244,196), cl_note_bd=(210,180,90),
)

# ── PASTE SEQ DATA TỪ MỤC 2 VÀO ĐÂY ─────────────────────────────────────────
SEQ = { ... }
# ─────────────────────────────────────────────────────────────────────────────

def tsize(draw, text, f):
    bb = draw.textbbox((0,0), text, font=f); return bb[2]-bb[0], bb[3]-bb[1]

def wrap(text, f, mw, draw):
    out = []
    for hard in text.split('\n'):
        cur = ""
        for w in hard.split(' '):
            t = (cur+" "+w).strip()
            if draw.textbbox((0,0), t, font=f)[2] > mw and cur:
                out.append(cur); cur = w
            else: cur = t
        if cur: out.append(cur)
    return out

def tc(draw, lines, cx, cy, f, col, lh):
    tot = (len(lines)-1)*lh
    for i, l in enumerate(lines):
        tw, th = tsize(draw, l, f)
        draw.text((cx-tw//2, cy-tot//2+i*lh-th//2), l, fill=col, font=f)

def ahead(draw, x2, y2, ang, col, sc, filled=True):
    s = 9*sc
    pts = [(x2,y2),
           (x2-s*math.cos(ang-math.pi/6), y2-s*math.sin(ang-math.pi/6)),
           (x2-s*math.cos(ang+math.pi/6), y2-s*math.sin(ang+math.pi/6))]
    if filled: draw.polygon(pts, fill=col)
    else: draw.line([pts[1],pts[0],pts[2]], fill=col, width=2*sc)

def compute_layout(data, c):
    """Pass 1: tính vị trí X cho participant, và duyệt events để tính chiều cao + khung fragment."""
    parts = data["participants"]
    xs = {p["id"]: c["pad"] + i*c["lane_w"] + c["lane_w"]//2 for i, p in enumerate(parts)}
    width = c["pad"]*2 + max(0, (len(parts)-1))*c["lane_w"] + c["lane_w"]

    cy = c["hh"] + c["top_pad"]
    items = []      # ("message"/"note", event, cy)
    frag_stack = []
    frags = []       # danh sách fragment đã đóng, để vẽ khung

    for e in data["events"]:
        t = e["type"]
        if t == "message":
            items.append(("message", e, cy))
            cy += c["msg_gap"]
        elif t == "note":
            items.append(("note", e, cy))
            cy += c["note_gap"]
        elif t in ("alt_start", "opt_start", "loop_start"):
            frag_stack.append({
                "kind": t.split("_")[0],
                "start_cy": cy,
                "participants": e.get("participants") or [p["id"] for p in parts],
                "label": e.get("label", ""),
                "dividers": [],
            })
            cy += c["frag_label_h"] + c["frag_pad"]
        elif t == "alt_else":
            frag_stack[-1]["dividers"].append((cy, e.get("label", "")))
            cy += c["frag_label_h"]
        elif t in ("alt_end", "opt_end", "loop_end"):
            fr = frag_stack.pop()
            fr["end_cy"] = cy + c["frag_pad"]
            frags.append(fr)
            cy += c["frag_pad"]

    total_h = cy + c["pad"]
    return xs, width, total_h, items, frags

def render(data, c, out="workflow.png"):
    sc = c["sc"]
    xs, cw, ch, items, frags = compute_layout(data, c)
    W, H = cw*sc, ch*sc
    img = Image.new("RGB", (W, H), c["cl_bg"])
    dr = ImageDraw.Draw(img)
    fn = font(c["fsz"]*sc); fb = font((c["fsz"]+1)*sc, True)
    fsm = font((c["fsz"]-2)*sc); ffr = font((c["fsz"]-1)*sc, True)
    fnote = font((c["fsz"]-1)*sc, italic=True)

    # ── Fragment boxes (vẽ trước để nằm dưới message) ──────────────────────
    for fr in frags:
        pxs = [xs[pid] for pid in fr["participants"]]
        x1 = (min(pxs) - c["lane_w"]//2 + 18) * sc
        x2 = (max(pxs) + c["lane_w"]//2 - 18) * sc
        y1 = fr["start_cy"] * sc
        y2 = fr["end_cy"] * sc
        dr.rectangle([x1, y1, x2, y2], outline=c["cl_frag"], width=2*sc, fill=c["cl_frag_bg"])
        tag = fr["kind"].upper()
        tw, th = tsize(dr, tag, ffr)
        tagw, tagh = tw+16*sc, c["frag_label_h"]*sc-6*sc
        dr.polygon([(x1,y1),(x1+tagw,y1),(x1+tagw,y1+tagh-6*sc),(x1+tagw-8*sc,y1+tagh),(x1,y1+tagh)],
                   fill=c["cl_frag"])
        dr.text((x1+8*sc, y1+tagh//2-th//2), tag, fill=(255,255,255), font=ffr)
        if fr["label"]:
            dr.text((x1+tagw+8*sc, y1+tagh//2-th//2), f'[{fr["label"]}]', fill=c["cl_frag"], font=fsm)
        for (dy, dlabel) in fr["dividers"]:
            yy = dy*sc - c["frag_pad"]*sc//2
            dr.line([(x1, yy), (x2, yy)], fill=c["cl_frag"], width=1*sc)
            if dlabel:
                dr.text((x1+8*sc, yy+2*sc), f'[{dlabel}]', fill=c["cl_frag"], font=fsm)

    # ── Lifelines (nét đứt) ─────────────────────────────────────────────────
    for pid, x in xs.items():
        X = x*sc
        y0, y1 = c["hh"]*sc, H-c["pad"]*sc//2
        yy = y0
        while yy < y1:
            dr.line([(X,yy),(X,min(yy+6*sc,y1))], fill=c["cl_life"], width=1*sc)
            yy += 11*sc

    # ── Header actor boxes ───────────────────────────────────────────────────
    bw = (c["lane_w"]-30)*sc
    for p in data["participants"]:
        x = xs[p["id"]]*sc
        dr.rounded_rectangle([x-bw//2, 4*sc, x+bw//2, c["hh"]*sc-4*sc],
                              radius=8*sc, fill=c["cl_actor"])
        lines = wrap(p["label"], fb, bw-16*sc, dr)
        tc(dr, lines, x, c["hh"]*sc//2, fb, c["cl_actor_t"], (c["fsz"]+3)*sc)

    # ── Messages & notes ─────────────────────────────────────────────────────
    for kind, e, cy in items:
        Y = cy*sc
        if kind == "note":
            over = e.get("over") or [data["participants"][0]["id"]]
            pxs = [xs[pid] for pid in over]
            ncx = (min(pxs)+max(pxs))//2*sc
            lines = wrap(e["label"], fnote, 200*sc, dr)
            maxw = max(tsize(dr,l,fnote)[0] for l in lines)+20*sc
            nh = len(lines)*(c["fsz"]+6)*sc+10*sc
            dr.rectangle([ncx-maxw//2, Y-nh//2, ncx+maxw//2, Y+nh//2],
                         fill=c["cl_note"], outline=c["cl_note_bd"], width=1*sc)
            tc(dr, lines, ncx, Y, fnote, (80,60,10), (c["fsz"]+3)*sc)
            continue

        style = e.get("style", "call")  # call | return | self
        x1, x2 = xs[e["from"]]*sc, xs[e["to"]]*sc
        dashed = style == "return"
        filled_head = True

        if e["from"] == e["to"]:
            sw = c["self_w"]*sc
            pts = [(x1,Y),(x1+sw,Y),(x1+sw,Y+18*sc),(x1,Y+18*sc)]
            dr.line([pts[0],pts[1]], fill=c["cl_line"], width=2*sc)
            dr.line([pts[1],pts[2]], fill=c["cl_line"], width=2*sc)
            dr.line([pts[2],pts[3]], fill=c["cl_line"], width=2*sc)
            ahead(dr, pts[3][0], pts[3][1], math.pi, c["cl_line"], sc, filled_head)
            dr.text((x1+6*sc, Y-16*sc), e["label"], fill=c["cl_lbl"], font=fsm)
            continue

        if dashed:
            steps = int(abs(x2-x1)//(8*sc)) or 1
            for i in range(0, steps, 2):
                xa = x1 + (x2-x1)*i/steps
                xb = x1 + (x2-x1)*min(i+1,steps)/steps
                dr.line([(xa,Y),(xb,Y)], fill=c["cl_line"], width=2*sc)
        else:
            dr.line([(x1,Y),(x2,Y)], fill=c["cl_line"], width=2*sc)
        ahead(dr, x2, Y, 0 if x2>x1 else math.pi, c["cl_line"], sc, filled_head)

        lx = (x1+x2)//2
        tw, th = tsize(dr, e["label"], fn)
        dr.text((lx-tw//2, Y-th-6*sc), e["label"], fill=c["cl_lbl"], font=fn)

    img.resize((cw, ch), Image.LANCZOS).save(out)
    print(f"✅ {out}  ({cw}×{ch}px)")
    return cw, ch

if __name__ == "__main__":
    render(SEQ, CFG)
```

---

## 4. NHÚNG PNG VÀO DOCX

Trong `docx-generator.js`, thêm vào đầu file:

```javascript
const { ImageRun } = require('docx');
const fs = require('fs');
const workflowPng = fs.readFileSync('workflow.png');

// Kích thước hiển thị — tính từ tỉ lệ PNG gốc
// cw, ch lấy từ output của renderer (in ra console)
const DISP_W = 560;                         // px ≈ 14.8cm, vừa cột nội dung A4
const DISP_H = Math.round(DISP_W * ch/cw); // giữ tỉ lệ
```

Trong `children[]`, thay workflowTable() bằng:

```javascript
h3('3.1 Quy trình'),
new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 120, after: 200 },
  children: [
    new ImageRun({
      data: workflowPng,
      transformation: { width: DISP_W, height: DISP_H },
      type: 'png',
    }),
  ],
}),
```

---

## 5. BUILD SEQUENCE HOÀN CHỈNH

```bash
# 1. Cài Pillow (một lần)
pip install pillow --break-system-packages

# 2. Điền SEQ data vào workflow_renderer.py

# 3. Render diagram → PNG
python3 workflow_renderer.py
# Output: workflow.png (cw×ch px) — ghi lại cw, ch để tính DISP_H

# 4. Build docx (tự động đọc workflow.png)
npm install -g docx && node docx-generator.js

# 5. Validate
python scripts/office/validate.py srs-output.docx

# 6. Xuất
cp srs-output.docx /mnt/user-data/outputs/<ten-module>-srs.docx
```

---

## 6. CHECKLIST TRƯỚC KHI NHÚNG

- [ ] Mọi participant có label rõ ràng, không dùng emoji
- [ ] Mỗi message có số thứ tự bước khớp với số bước trong Luồng thành công (VD: "(1) ...")
- [ ] Mỗi `alt_start` có đúng `alt_end` tương ứng; nếu có rẽ nhánh 2 chiều → có ít nhất 1 `alt_else` với label rõ (VD: "Thành công" / "Thất bại")
- [ ] Không lồng quá 1 cấp `alt`/`opt`/`loop` trong cùng 1 diagram
- [ ] Số thứ tự bước trong diagram khớp với EX-XX ở bảng ngoại lệ (message style `return` dẫn tới lỗi → khớp EX-XX)
- [ ] PNG hiển thị rõ khi in A4 (kiểm tra bằng mắt trước khi nhúng) — nếu quá nhiều participant (>4) khiến diagram quá rộng, cân nhắc tách thành nhiều diagram nhỏ theo từng chức năng
