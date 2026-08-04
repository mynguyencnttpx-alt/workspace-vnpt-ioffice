# WORKFLOW DIAGRAM SKILL
# Vẽ biểu đồ Activity Diagram dạng swimlane cho section 3.1 SRS

> Đọc file này thay vì dùng bảng khi render section 3.1 Workflow và 3.6 Status Machine.
> Renderer đã được test và verified — chỉ thay data `WF`, không sửa engine.

---

## 1. KIẾN TRÚC PIPELINE

```
WF data (nodes + edges)
        │
        ▼
workflow_renderer.py   ←── vẽ swimlane Activity Diagram bằng Pillow
        │
        ▼
workflow.png           ←── PNG xuất ra (760×1024px điển hình)
        │
        ▼
docx-generator.js      ←── nhúng PNG bằng ImageRun
        │
        ▼
srs-output.docx
```

**Dependency:** `pip install pillow --break-system-packages`
Font DejaVu Sans có sẵn trên Ubuntu — không cần cài thêm.

---

## 2. DATA MODEL — Cách điền `WF`

```python
WF = {
  # ── Cột swimlane ───────────────────────────────────────────────────────────
  "lanes": [
    {"id": "user",   "label": "Người dùng"},
    {"id": "system", "label": "Hệ thống"},
    # Thêm lane nếu cần: {"id": "admin", "label": "Quản trị viên"}
  ],

  # ── Node ───────────────────────────────────────────────────────────────────
  # type: "start" | "end" | "action" | "decision"
  # lane: phải khớp với lanes[].id
  # label: dùng \n để xuống dòng; start/end để ""
  #
  # NHÁNH PHỤ (node đặt ngang hàng Y với diamond):
  #   "branch_of": "<id của diamond cha>"
  #   "offset_x":  khoảng cách pixel sang phải (thường 220–260)
  "nodes": [
    {"id": "n0", "type": "start",    "lane": "user",   "label": ""},
    {"id": "n1", "type": "action",   "lane": "user",   "label": "(1)\nNhấn nút..."},
    {"id": "n2", "type": "action",   "lane": "system", "label": "(2)\nHệ thống xử lý..."},
    {"id": "n3", "type": "decision", "lane": "system", "label": ""},

    # Node nhánh phụ "Thất bại" — đặt cùng hàng với n3, sang phải
    {"id": "n4", "type": "action", "lane": "system", "label": "(3)\nXử lý lỗi...",
     "branch_of": "n3", "offset_x": 245},

    {"id": "n5", "type": "action", "lane": "system", "label": "(4)\nBước tiếp..."},
    {"id": "n6", "type": "end",    "lane": "system", "label": ""},
  ],

  # ── Edge (mũi tên) ─────────────────────────────────────────────────────────
  # label: text trên mũi tên (để "" nếu không cần)
  # ex: hướng thoát từ node nguồn — "bottom"(mặc định) | "right" | "left" | "top"
  # en: hướng vào node đích   — "top"(mặc định)    | "left"  | "right"| "bottom"
  "edges": [
    {"from": "n0", "to": "n1", "label": ""},
    {"from": "n1", "to": "n2", "label": ""},
    {"from": "n2", "to": "n3", "label": ""},
    # Nhánh phụ: thoát phải từ diamond → vào trái của branch node
    {"from": "n3", "to": "n4", "label": "Thất bại",   "ex": "right",  "en": "left"},
    # Nhánh chính: xuống thẳng
    {"from": "n3", "to": "n5", "label": "Thành công", "ex": "bottom", "en": "top"},
    {"from": "n5", "to": "n6", "label": ""},
  ],
}
```

### Bảng quy tắc điền data

| Trường | Bắt buộc | Ghi chú |
|--------|----------|---------|
| `lanes[].id` | ✅ | snake_case, không dấu |
| `nodes[].type` | ✅ | `start` / `end` / `action` / `decision` |
| `nodes[].lane` | ✅ | Khớp với `lanes[].id` |
| `nodes[].label` | ✅ | `start`/`end` để `""` |
| `nodes[].branch_of` | ⚪ | Chỉ dùng khi node đặt ngang hàng Y với diamond |
| `nodes[].offset_x` | ⚪ | Khoảng cách pixel; mặc định = `lw` (270px) |
| `edges[].ex` / `en` | ⚪ | Chỉ cần khi mũi tên không đi thẳng đứng |

### Pattern mũi tên phổ biến

| Tình huống | `ex` | `en` | Kết quả |
|-----------|------|------|---------|
| Luồng chính xuống thẳng | `"bottom"` | `"top"` | Thẳng đứng hoặc elbow |
| Nhánh phụ sang phải | `"right"` | `"left"` | Mũi tên ngang thẳng |
| Sang lane khác (trái) | `"left"` | `"top"` | Elbow sang trái rồi xuống |

---

## 3. RENDERER ENGINE (Không sửa — chỉ thay WF)

Lưu file sau thành `workflow_renderer.py` trong cùng thư mục với `docx-generator.js`:

```python
from PIL import Image, ImageDraw, ImageFont
import math

FONT_R = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
FONT_B = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
def font(sz, bold=False):
    try: return ImageFont.truetype(FONT_B if bold else FONT_R, sz)
    except: return ImageFont.load_default()

CFG = dict(
    lhh=44, lw=270, nw=180, nh=80, ds=36, cr=18,
    gap=52, pad=28, fsz=13, sc=2,
    cl0=(245,245,245), cl1=(255,255,255),
    chd=(31,73,125),   cht=(255,255,255),
    cnb=(255,255,255), cnbd=(31,73,125), cnt=(0,0,0),
    ca=(40,40,40), clb=(70,70,70), cbr=(180,180,180),
)

# ── PASTE WF DATA TỪ MỤC 2 VÀO ĐÂY ──────────────────────────────────────────
WF = { ... }
# ─────────────────────────────────────────────────────────────────────────────

def half(n,c):
    t=n["type"]
    if t in("start","end"): return c["cr"],c["cr"]
    if t=="decision":       return c["ds"],c["ds"]
    return c["nw"]//2, c["nh"]//2

def layout(data,c):
    li={l["id"]:i for i,l in enumerate(data["lanes"])}
    pos={}; branch_ids={n["id"] for n in data["nodes"] if "branch_of" in n}
    cy=c["lhh"]+c["pad"]
    for n in data["nodes"]:
        if n["id"] in branch_ids: continue
        hw,hh=half(n,c)
        cx=li[n["lane"]]*c["lw"]+c["lw"]//2
        pos[n["id"]]={"x":cx,"y":cy+hh}
        cy+=hh*2+c["gap"]
        for bn in data["nodes"]:
            if bn.get("branch_of")==n["id"]:
                pos[bn["id"]]={"x":cx+bn.get("offset_x",c["lw"]),"y":cy-hh*2-c["gap"]+hh}
    max_x=max(p["x"]+c["nw"]//2+10 for p in pos.values())
    cw=max(len(data["lanes"])*c["lw"], max_x+10)
    ch=max(p["y"] for p in pos.values())+c["nh"]//2+30
    return pos,cw,ch

def tsize(draw,text,f):
    bb=draw.textbbox((0,0),text,font=f); return bb[2]-bb[0],bb[3]-bb[1]

def wrap(text,f,mw,draw):
    out=[]
    for hard in text.split('\n'):
        cur=""
        for w in hard.split(' '):
            t=(cur+" "+w).strip()
            if draw.textbbox((0,0),t,font=f)[2]>mw and cur: out.append(cur);cur=w
            else: cur=t
        if cur: out.append(cur)
    return out

def tc(draw,lines,cx,cy,f,col,lh):
    tot=(len(lines)-1)*lh
    for i,l in enumerate(lines):
        tw,th=tsize(draw,l,f)
        draw.text((cx-tw//2,cy-tot//2+i*lh-th//2),l,fill=col,font=f)

def ahead(draw,x2,y2,ang,col,sc):
    s=9*sc
    pts=[(x2,y2),(x2-s*math.cos(ang-math.pi/6),y2-s*math.sin(ang-math.pi/6)),
                  (x2-s*math.cos(ang+math.pi/6),y2-s*math.sin(ang+math.pi/6))]
    draw.polygon(pts,fill=col)

def port(pos,n,d,c):
    p=pos[n["id"]]; x,y=p["x"],p["y"]; hw,hh=half(n,c)
    if d=="bottom": return x,y+hh
    if d=="top":    return x,y-hh
    if d=="right":  return x+hw,y
    if d=="left":   return x-hw,y
    return x,y

def render(data,c,out="workflow.png"):
    sc=c["sc"]
    pos,cw,ch=layout(data,c)
    W,H=cw*sc,ch*sc
    img=Image.new("RGB",(W,H),(255,255,255))
    dr=ImageDraw.Draw(img)
    fn=font(c["fsz"]*sc); fb=font((c["fsz"]+1)*sc,True); fsm=font((c["fsz"]-2)*sc)
    nm={n["id"]:n for n in data["nodes"]}

    nl=len(data["lanes"]); lw=c["lw"]*sc; lhh=c["lhh"]*sc
    for i,ln in enumerate(data["lanes"]):
        bg=c["cl0"] if i%2==0 else c["cl1"]
        dr.rectangle([i*lw,lhh,(i+1)*lw-1,H-1],fill=bg)
        if i>0: dr.line([(i*lw,0),(i*lw,H)],fill=c["cbr"],width=1)
    if cw>nl*c["lw"]:
        dr.rectangle([nl*lw,lhh,W-1,H-1],fill=c["cl1"])

    dr.rectangle([0,0,W,lhh],fill=c["chd"])
    for i,ln in enumerate(data["lanes"]):
        cx=(i*c["lw"]+c["lw"]//2)*sc; cy=lhh//2
        tw,th=tsize(dr,ln["label"],fb)
        dr.text((cx-tw//2,cy-th//2),ln["label"],fill=c["cht"],font=fb)
    dr.line([(0,lhh),(W,lhh)],fill=c["cbr"],width=2)
    dr.rectangle([0,0,W-1,H-1],outline=c["cbr"],width=2)

    for e in data["edges"]:
        sn=nm[e["from"]]; dn=nm[e["to"]]
        ex=e.get("ex","bottom"); en=e.get("en","top")
        x1,y1=port(pos,sn,ex,c); x2,y2=port(pos,dn,en,c)
        x1,y1,x2,y2=x1*sc,y1*sc,x2*sc,y2*sc
        if ex=="bottom" and en=="top":
            if abs(x1-x2)<3: pts=[(x1,y1),(x2,y2)]
            else:
                my=(y1+y2)//2; pts=[(x1,y1),(x1,my),(x2,my),(x2,y2)]
        elif ex=="right" and en=="left": pts=[(x1,y1),(x2,y2)]
        elif ex=="right":  pts=[(x1,y1),(x2,y1),(x2,y2)]
        elif ex=="left":   pts=[(x1,y1),(x2,y1),(x2,y2)]
        else: pts=[(x1,y1),(x2,y2)]
        for i in range(len(pts)-1):
            dr.line([pts[i],pts[i+1]],fill=c["ca"],width=2*sc)
        px,py=pts[-2]
        ahead(dr,x2,y2,math.atan2(y2-py,x2-px),c["ca"],sc)
        if e.get("label"):
            lx=min(x1,x2)+6*sc; ly=(y1+y2)//2-14*sc
            dr.text((lx,ly),e["label"],fill=c["clb"],font=fsm)

    nw2=c["nw"]//2*sc; nh2=c["nh"]//2*sc; ds=c["ds"]*sc; cr=c["cr"]*sc
    for n in data["nodes"]:
        p=pos[n["id"]]; cx,cy=p["x"]*sc,p["y"]*sc; t=n["type"]
        if t=="start":
            dr.ellipse([cx-cr,cy-cr,cx+cr,cy+cr],fill=c["ca"])
        elif t=="end":
            dr.ellipse([cx-cr,cy-cr,cx+cr,cy+cr],fill=c["ca"])
            rr=cr+5*sc; dr.ellipse([cx-rr,cy-rr,cx+rr,cy+rr],outline=c["ca"],width=2*sc)
        elif t=="decision":
            pts=[(cx,cy-ds),(cx+ds,cy),(cx,cy+ds),(cx-ds,cy)]
            dr.polygon(pts,fill=c["cnb"]); dr.line(pts+[pts[0]],fill=c["cnbd"],width=2*sc)
        else:
            dr.rounded_rectangle([cx-nw2,cy-nh2,cx+nw2,cy+nh2],
                radius=8*sc,fill=c["cnb"],outline=c["cnbd"],width=2*sc)
            lines=wrap(n["label"],fn,nw2*2-16*sc,dr)
            tc(dr,lines,cx,cy,fn,c["cnt"],(c["fsz"]+4)*sc)

    img.resize((cw,ch),Image.LANCZOS).save(out)
    print(f"✅ {out}  ({cw}×{ch}px)")
    return cw,ch

if __name__=="__main__":
    render(WF,CFG)
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
h3('3.1 Workflow'),
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

# 2. Điền WF data vào workflow_renderer.py

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

- [ ] Mọi node có label rõ ràng (trừ start/end)
- [ ] Mỗi diamond có đúng 2 edge ra, cả 2 có label (Thành công / Thất bại hoặc Yes / No)
- [ ] Không có node cô lập (thiếu edge đến hoặc đi)
- [ ] Luồng bắt đầu bằng `start`, kết thúc bằng `end`
- [ ] Số thứ tự bước trong diagram khớp với EX-XX ở bảng ngoại lệ
- [ ] PNG hiển thị rõ khi in A4 (kiểm tra bằng mắt trước khi nhúng)
