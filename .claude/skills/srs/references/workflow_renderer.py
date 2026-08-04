"""
workflow_renderer.py  v2
Vẽ Activity Diagram dạng swimlane, xuất workflow.png
Node "branch": đặt ngang hàng Y với diamond cha, sang phải/trái
"""
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

WF = {
  "lanes":[
    {"id":"user",  "label":"Người dùng"},
    {"id":"system","label":"Hệ thống"},
  ],
  "nodes":[
    {"id":"n0","type":"start",   "lane":"user",  "label":""},
    {"id":"n1","type":"action",  "lane":"user",  "label":"(1)\nNhấn nút [Gợi ý lưu\nvăn bản đi vào số]"},
    {"id":"n2","type":"action",  "lane":"system","label":"(2)\nGọi sang IC để bóc tách\nthông tin nội dung tệp\nvăn bản và kiểm tra\nvalidate các rule"},
    {"id":"n3","type":"decision","lane":"system","label":""},
    # branch node của n3 — đặt cùng hàng Y với n3, offset sang phải
    {"id":"n4","type":"action",  "lane":"system","label":"(3)\nHiển thị cảnh báo\nlên giao diện,\nkhông thực hiện gì",
     "branch_of":"n3","offset_x":245},
    {"id":"n5","type":"action",  "lane":"system","label":"(4)\nKiểm tra các văn bản\ntrên danh sách với\ncác rule"},
    {"id":"n6","type":"decision","lane":"system","label":""},
    {"id":"n7","type":"action",  "lane":"system","label":"(6)\nBỏ qua, xử lý các\nvăn bản tiếp",
     "branch_of":"n6","offset_x":245},
    {"id":"n8","type":"action",  "lane":"system","label":"(5)\nLưu văn bản đi vào số\ntheo rule đã thiết lập.\nHiển thị thông báo\nthành công"},
    {"id":"n9","type":"end",     "lane":"system","label":""},
  ],
  "edges":[
    {"from":"n0","to":"n1","label":""},
    {"from":"n1","to":"n2","label":""},
    {"from":"n2","to":"n3","label":""},
    {"from":"n3","to":"n4","label":"Thất bại",  "ex":"right","en":"left"},
    {"from":"n3","to":"n5","label":"Thành công","ex":"bottom","en":"top"},
    {"from":"n5","to":"n6","label":""},
    {"from":"n6","to":"n7","label":"Thất bại",  "ex":"right","en":"left"},
    {"from":"n6","to":"n8","label":"Thành công","ex":"bottom","en":"top"},
    {"from":"n8","to":"n9","label":""},
  ],
}

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
                bw,bh=half(bn,c)
                pos[bn["id"]]={"x":cx+bn.get("offset_x",c["lw"]),"y":cy-hh*2-c["gap"]+hh}
    max_x=max(p["x"]+c["nw"]//2+10 for p in pos.values())
    max_y=max(p["y"] for p in pos.values())
    cw=max(len(data["lanes"])*c["lw"], max_x+10)
    ch=max_y+c["nh"]//2+30
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
    p=pos[n["id"]]; x,y=p["x"],p["y"]
    hw,hh=half(n,c)
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

    # lanes
    nl=len(data["lanes"]); lw=c["lw"]*sc; lhh=c["lhh"]*sc
    for i,ln in enumerate(data["lanes"]):
        bg=c["cl0"] if i%2==0 else c["cl1"]
        dr.rectangle([i*lw,lhh,(i+1)*lw-1,H-1],fill=bg)
        if i>0: dr.line([(i*lw,0),(i*lw,H)],fill=c["cbr"],width=1)
    if cw>nl*c["lw"]:
        dr.rectangle([nl*lw,lhh,W-1,H-1],fill=c["cl1"])

    # headers
    dr.rectangle([0,0,W,lhh],fill=c["chd"])
    for i,ln in enumerate(data["lanes"]):
        cx=(i*c["lw"]+c["lw"]//2)*sc; cy=lhh//2
        tw,th=tsize(dr,ln["label"],fb)
        dr.text((cx-tw//2,cy-th//2),ln["label"],fill=c["cht"],font=fb)
    dr.line([(0,lhh),(W,lhh)],fill=c["cbr"],width=2)
    dr.rectangle([0,0,W-1,H-1],outline=c["cbr"],width=2)

    # edges
    for e in data["edges"]:
        sn=nm[e["from"]]; dn=nm[e["to"]]
        ex=e.get("ex","bottom"); en=e.get("en","top")
        x1,y1=port(pos,sn,ex,c); x2,y2=port(pos,dn,en,c)
        x1,y1,x2,y2=x1*sc,y1*sc,x2*sc,y2*sc
        if ex=="bottom" and en=="top":
            if abs(x1-x2)<3: pts=[(x1,y1),(x2,y2)]
            else:
                my=(y1+y2)//2; pts=[(x1,y1),(x1,my),(x2,my),(x2,y2)]
        elif ex=="right" and en=="left":
            pts=[(x1,y1),(x2,y2)]
        elif ex=="right":
            pts=[(x1,y1),(x2,y1),(x2,y2)]
        else:
            pts=[(x1,y1),(x2,y2)]
        for i in range(len(pts)-1):
            dr.line([pts[i],pts[i+1]],fill=c["ca"],width=2*sc)
        px,py=pts[-2]
        ahead(dr,x2,y2,math.atan2(y2-py,x2-px),c["ca"],sc)
        if e.get("label"):
            lx=min(x1,x2)+6*sc; ly=(y1+y2)//2-14*sc
            dr.text((lx,ly),e["label"],fill=c["clb"],font=fsm)

    # nodes
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
