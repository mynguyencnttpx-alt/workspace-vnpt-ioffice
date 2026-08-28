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
        # tag nhãn góc trái trên (hình ngũ giác đơn giản = rectangle + notch)
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

        style = e.get("style", "call")  # call | return | async
        x1, x2 = xs[e["from"]]*sc, xs[e["to"]]*sc
        dashed = style == "return"
        filled_head = style != "async"

        if e["from"] == e["to"]:
            # self-call: vòng lặp nhỏ sang phải
            sw = c["self_w"]*sc
            pts = [(x1,Y),(x1+sw,Y),(x1+sw,Y+18*sc),(x1,Y+18*sc)]
            dr.line([pts[0],pts[1]], fill=c["cl_line"], width=2*sc)
            dr.line([pts[1],pts[2]], fill=c["cl_line"], width=2*sc)
            dr.line([pts[2],pts[3]], fill=c["cl_line"], width=2*sc)
            ahead(dr, pts[3][0], pts[3][1], math.pi, c["cl_line"], sc, filled_head)
            tw,_ = tsize(dr, e["label"], fsm)
            dr.text((x1+6*sc, Y-16*sc), e["label"], fill=c["cl_lbl"], font=fsm)
            continue

        line_kwargs = {}
        if dashed:
            # vẽ nét đứt thủ công
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
