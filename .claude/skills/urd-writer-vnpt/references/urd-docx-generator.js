/**
 * URD DOCX Generator — VNPT iOffice BM_URD Standard
 *
 * Tái tạo chính xác cấu trúc file mẫu BM_URD_BM_AI.docx:
 * - Header trang 1: 3 cột (trống | VNPT IOFFICE đỏ | Phiên bản)
 * - Header trang 2+: 2 cột (logo VNPT | Tên tổ chức)
 * - Nội dung: Tiêu đề lớn + sơ đồ cây + heading module + bảng 7 cột
 * - Footer: italic trái + số trang phải
 *
 * Usage: node urd-docx-generator.js [output.docx]
 * Install: npm install docx
 * Đọc /mnt/skills/public/docx/SKILL.md trước khi sửa script này.
 */

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, LevelFormat, ImageRun,
  convertInchesToTwip
} = require('docx');
const fs = require('fs');

// ============================================================
// DATA — Điền dữ liệu URD vào đây
// ============================================================
const DATA = {
  systemName: "iOffice v5",       // Hiển thị ở header và tiêu đề
  version: "1.0",                 // Phiên bản tài liệu
  // Logo VNPT — base64 PNG. Để null nếu không có file logo.
  // Cách lấy: fs.readFileSync('vnpt_logo.png').toString('base64')
  logoBase64: null,

  modules: [
    {
      name: "Module 1: Xác thực và phân quyền",
      diagramNote: "Sơ đồ: Đăng nhập → Kiểm tra thông tin → Phân quyền → Vào hệ thống",
      requirements: [
        {
          stt: "1",
          code: "UR01",
          name: "Đăng nhập hệ thống",
          desc: [
            { label: "Phát biểu yêu cầu", text: "Cho phép người dùng đăng nhập vào hệ thống bằng tài khoản được cấp phát." },
            { label: "Thông tin đầu vào", items: [
              "+ Tên tài khoản (*): dùng địa chỉ email",
              "+ Mật khẩu (*): theo quy định chính sách mật khẩu",
              "+ Nhóm truy cập (*): nhóm truy cập tương ứng với tài khoản"
            ]},
            { label: "Thông tin đầu ra", text: "Hệ thống sẽ chuyển vào màn hình chức năng chính dựa theo cơ chế phân quyền của người dùng và nhóm truy cập để chương trình sẽ hiển thị các chức năng nghiệp vụ mà người dùng đó được phép thao tác với hệ thống." },
            { label: "Chức năng xử lý", text: "Đăng nhập: kiểm tra thông tin đăng nhập, điều hướng chức năng theo thông tin đăng nhập." },
            { label: "Các ngoại lệ", text: "Tài khoản/mật khẩu sai: hiển thị lỗi. Sai 5 lần liên tiếp: khóa tài khoản 15 phút." }
          ],
          priority: "Cao",
          importance: "Cao",
          actor: "Người dùng"
        }
      ]
    }
  ]
};

// ============================================================
// HELPERS
// ============================================================
const FONT = "Times New Roman";
const SZ_NORMAL = 26;   // 13pt
const SZ_SMALL  = 22;   // 11pt
const SZ_HEADER = 24;   // 12pt

const B_NONE = { style: BorderStyle.NONE, size: 0, color: "auto" };
const B_THIN = { style: BorderStyle.SINGLE, size: 4, color: "auto" };
const BORDERS_NONE = { top: B_NONE, bottom: B_NONE, left: B_NONE, right: B_NONE };
const BORDERS_ALL  = { top: B_THIN, bottom: B_THIN, left: B_THIN, right: B_THIN };

function run(text, opts = {}) {
  return new TextRun({ text, font: FONT, size: SZ_NORMAL, ...opts });
}

function smallRun(text, opts = {}) {
  return new TextRun({ text, font: FONT, size: SZ_SMALL, ...opts });
}

function para(children, opts = {}) {
  if (typeof children === 'string') children = [run(children)];
  return new Paragraph({ spacing: { before: 80, after: 80 }, children, ...opts });
}

function heading1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 240, after: 160 },
    children: [new TextRun({ text, font: FONT, size: 28, bold: true })]
  });
}

function heading2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 120 },
    children: [new TextRun({ text, font: FONT, size: SZ_NORMAL, bold: true })]
  });
}

// Cell đơn giản (text thuần)
function tcell(text, opts = {}) {
  const { width = 1000, bold = false, align = AlignmentType.LEFT,
          borders = BORDERS_ALL, bg = null, valign = VerticalAlign.TOP } = opts;
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: bg ? { fill: bg, type: ShadingType.CLEAR } : undefined,
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    verticalAlign: valign,
    children: [new Paragraph({
      alignment: align,
      spacing: { before: 60, after: 60 },
      children: [new TextRun({ text, font: FONT, size: SZ_SMALL, bold })]
    })]
  });
}

// Cell header bảng UR
function thcell(text, width) {
  return tcell(text, { width, bold: true, align: AlignmentType.CENTER, bg: "D9D9D9" });
}

// Cell mô tả — có cấu trúc nhiều trường
function descCell(descItems, width) {
  const children = [];
  for (const item of descItems) {
    // Label in đậm
    const labelRun = new TextRun({ text: item.label + ": ", font: FONT, size: SZ_SMALL, bold: true });

    if (item.text) {
      // Single text value
      children.push(new Paragraph({
        spacing: { before: 40, after: 40 },
        children: [labelRun, new TextRun({ text: item.text, font: FONT, size: SZ_SMALL })]
      }));
    } else if (item.items) {
      // Label on own line, then bullet items
      children.push(new Paragraph({
        spacing: { before: 40, after: 20 },
        children: [labelRun]
      }));
      for (const bullet of item.items) {
        children.push(new Paragraph({
          indent: { left: 200 },
          spacing: { before: 20, after: 20 },
          children: [new TextRun({ text: bullet, font: FONT, size: SZ_SMALL })]
        }));
      }
    }
  }
  return new TableCell({
    borders: BORDERS_ALL,
    width: { size: width, type: WidthType.DXA },
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    verticalAlign: VerticalAlign.TOP,
    children
  });
}

// ============================================================
// UR TABLE cho một module
// ============================================================
function buildURTable(requirements) {
  // Tổng width A4 với margin 2cm/3cm: 9360 DXA (ước lượng 9026 DXA content)
  // Cột: STT, Mã, Tên, Mô tả, Ưu tiên, Quan trọng, Đối tượng
  const W = [500, 900, 1400, 3426, 900, 900, 1000]; // sum = 9026
  const HEADERS = ["STT", "Mã yêu cầu", "Tên yêu cầu", "Mô tả", "Mức độ ưu tiên", "Mức độ quan trọng", "Đối tượng liên quan"];

  const headerRow = new TableRow({
    tableHeader: true,
    children: HEADERS.map((h, i) => thcell(h, W[i]))
  });

  const dataRows = requirements.map(r => new TableRow({
    children: [
      tcell(r.stt,      { width: W[0], align: AlignmentType.CENTER }),
      tcell(r.code,     { width: W[1], bold: true }),
      tcell(r.name,     { width: W[2] }),
      descCell(r.desc,  W[3]),
      tcell(r.priority, { width: W[4], align: AlignmentType.CENTER }),
      tcell(r.importance,{ width: W[5], align: AlignmentType.CENTER }),
      tcell(r.actor,    { width: W[6] })
    ]
  }));

  return new Table({
    width: { size: 9026, type: WidthType.DXA },
    columnWidths: W,
    rows: [headerRow, ...dataRows]
  });
}

// ============================================================
// HEADERS
// ============================================================
function buildHeader1(systemName, version) {
  // Trang 1: 3 cột — [trống | VNPT IOFFICE đỏ | Phiên bản: x.x]
  const W = [2384, 4426, 2480];
  return new Header({
    children: [
      new Table({
        width: { size: 9290, type: WidthType.DXA },
        columnWidths: W,
        rows: [new TableRow({
          children: [
            new TableCell({
              borders: BORDERS_ALL,
              width: { size: W[0], type: WidthType.DXA },
              children: [new Paragraph({ children: [] })]
            }),
            new TableCell({
              borders: BORDERS_ALL,
              width: { size: W[1], type: WidthType.DXA },
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { line: 276, lineRule: "auto" },
                children: [new TextRun({ text: systemName.toUpperCase(), font: FONT, size: SZ_HEADER, bold: true, color: "FF0000" })]
              })]
            }),
            new TableCell({
              borders: BORDERS_ALL,
              width: { size: W[2], type: WidthType.DXA },
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({
                spacing: { line: 276, lineRule: "auto" },
                children: [
                  new TextRun({ text: "Phiên bản: ", font: FONT, size: SZ_HEADER }),
                  new TextRun({ text: version, font: FONT, size: SZ_HEADER, color: "FF0000" })
                ]
              })]
            })
          ]
        })]
      }),
      new Paragraph({ children: [new TextRun({ text: "", size: 2 })] })
    ]
  });
}

function buildHeader2(logoBase64) {
  // Trang 2+: 2 cột — [logo VNPT | Tên tổ chức]
  const W = [1413, 8363]; // theo file gốc
  const logoCell = logoBase64
    ? new TableCell({
        borders: BORDERS_NONE,
        width: { size: W[0], type: WidthType.DXA },
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new ImageRun({
            data: Buffer.from(logoBase64, 'base64'),
            transformation: { width: 46, height: 58 }, // px ~ 657225/914400*96
            type: "png"
          })]
        })]
      })
    : new TableCell({
        borders: BORDERS_NONE,
        width: { size: W[0], type: WidthType.DXA },
        children: [new Paragraph({ children: [] })]
      });

  return new Header({
    children: [
      new Table({
        width: { size: 9776, type: WidthType.DXA },
        columnWidths: W,
        rows: [new TableRow({
          children: [
            logoCell,
            new TableCell({
              borders: BORDERS_NONE,
              width: { size: W[1], type: WidthType.DXA },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: "TẬP ĐOÀN BƯU CHÍNH VIỄN THÔNG VIỆT NAM", font: FONT, size: SZ_HEADER, bold: true })]
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: "CÔNG TY CÔNG NGHỆ THÔNG TIN VNPT IT", font: FONT, size: SZ_HEADER, bold: true })]
                })
              ]
            })
          ]
        })]
      }),
      new Paragraph({ children: [] })
    ]
  });
}

// ============================================================
// FOOTER
// ============================================================
function buildFooter() {
  // 2 cột — [italic trái | Trang: PAGE/NUMPAGES phải]
  const W = [7668, 1622];
  return new Footer({
    children: [
      new Table({
        width: { size: 9290, type: WidthType.DXA },
        columnWidths: W,
        rows: [new TableRow({
          children: [
            new TableCell({
              borders: BORDERS_NONE,
              width: { size: W[0], type: WidthType.DXA },
              children: [new Paragraph({
                children: [new TextRun({ text: "Sử dụng lại mẫu của bộ tài liệu CMMI 1.3 level 3 do VNPT Soft xây dựng", font: FONT, size: SZ_SMALL, italics: true })]
              })]
            }),
            new TableCell({
              borders: BORDERS_NONE,
              width: { size: W[1], type: WidthType.DXA },
              children: [new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({ text: "Trang: ", font: FONT, size: SZ_SMALL }),
                  new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: SZ_SMALL }),
                  new TextRun({ text: "/", font: FONT, size: SZ_SMALL }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES], font: FONT, size: SZ_SMALL })
                ]
              })]
            })
          ]
        })]
      }),
      new Paragraph({ children: [new TextRun({ text: "", size: 2 })] })
    ]
  });
}

// ============================================================
// BUILD DOCUMENT
// ============================================================
function buildDocument(data) {
  const bodyChildren = [];

  // Tiêu đề chính
  bodyChildren.push(heading1("YÊU CẦU CHỨC NĂNG"));
  bodyChildren.push(para([run(`${data.systemName} — Phiên bản ${data.version}`)]));
  bodyChildren.push(new Paragraph({ spacing: { before: 120, after: 80 }, children: [
    run("(Vẽ sơ đồ cây chức năng tổng thể hệ thống dạng tree view hoặc usecase model tại đây)", { italics: true, color: "666666" })
  ]}));
  bodyChildren.push(new Paragraph({ spacing: { before: 160, after: 0 }, children: [] }));

  // Từng module
  for (const mod of data.modules) {
    bodyChildren.push(heading2(mod.name));
    bodyChildren.push(para([
      run("- Vẽ sơ đồ chức năng "),
      run(mod.name, { bold: true }),
    ]));
    if (mod.diagramNote) {
      bodyChildren.push(para([run(`  ${mod.diagramNote}`, { italics: true, color: "444444" })]));
    }
    bodyChildren.push(para("- Kèm bảng mô tả yêu cầu chức năng dưới đây:"));
    bodyChildren.push(new Paragraph({ spacing: { before: 80, after: 80 }, children: [] }));
    bodyChildren.push(buildURTable(mod.requirements));
    bodyChildren.push(new Paragraph({ spacing: { before: 200, after: 0 }, children: [] }));
  }

  return new Document({
    styles: {
      default: { document: { run: { font: FONT, size: SZ_NORMAL } } },
      paragraphStyles: [
        { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 28, bold: true, font: FONT },
          paragraph: { spacing: { before: 240, after: 160 }, outlineLevel: 0 } },
        { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: SZ_NORMAL, bold: true, font: FONT },
          paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 1 } }
      ]
    },
    sections: [{
      properties: {
        page: {
          size: { width: 11906, height: 16838 }, // A4
          margin: { top: 1134, right: 851, bottom: 1134, left: 1701 } // top/bottom 2cm, left 3cm, right 1.5cm
        },
        titlePage: true  // Kích hoạt header/footer riêng cho trang 1
      },
      headers: {
        first: buildHeader1(data.systemName, data.version),  // Trang 1
        default: buildHeader2(data.logoBase64)                // Trang 2+
      },
      footers: {
        first: buildFooter(),
        default: buildFooter()
      },
      children: bodyChildren
    }]
  });
}

// ============================================================
// MAIN
// ============================================================
const outputPath = process.argv[2] || `URD_${DATA.systemName.replace(/\s+/g, '_')}_v${DATA.version}.docx`;

const doc = buildDocument(DATA);
Packer.toBuffer(doc)
  .then(buf => {
    fs.writeFileSync(outputPath, buf);
    console.log(`✅ Created: ${outputPath}`);
  })
  .catch(err => {
    console.error("❌ Error:", err.message);
    process.exit(1);
  });
