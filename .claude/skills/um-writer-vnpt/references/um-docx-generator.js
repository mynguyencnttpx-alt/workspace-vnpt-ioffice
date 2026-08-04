/**
 * UM DOCX Generator — VNPT iOffice BM_UM Standard
 *
 * Tái tạo chính xác cấu trúc file mẫu BM_UM_BM_AI.docx:
 * - Header trang 1 : 3 cột (trống | VNPT IOFFICE đỏ | Phiên bản)
 * - Header trang 2+: 2 cột (logo VNPT | Tên tổ chức)
 * - Nội dung       : Tổng quan + Đăng nhập + Menu + Thoát + Từng chức năng
 * - Footer         : italic trái + số trang phải
 *
 * Usage  : node um-docx-generator.js [output.docx]
 * Install: npm install docx
 * Đọc /mnt/skills/public/docx/SKILL.md trước khi sửa script này.
 */

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, ImageRun
} = require('docx');
const fs = require('fs');

// ============================================================
// DATA — BA điền dữ liệu HDSD vào đây
// ============================================================
const DATA = {
  systemName  : "iOffice v5",       // Tên hệ thống hiển thị ở header + tiêu đề
  moduleName  : "Quản lý Văn bản",  // Tên module / phân hệ
  version     : "1.0",              // Phiên bản tài liệu
  date        : "09/06/2025",       // Ngày tạo
  author      : "BA VNPT-IT",       // Người soạn
  systemUrl   : "https://ioffice.vnpt.vn", // URL truy cập hệ thống

  // Logo VNPT — base64 PNG. Để null nếu chưa có file logo.
  // Cách lấy: fs.readFileSync('vnpt_logo.png').toString('base64')
  logoBase64  : null,

  // ── Đăng nhập ──────────────────────────────────────────────
  loginSteps: [
    { step: "1", action: "Mở trình duyệt web và truy cập địa chỉ hệ thống.", sysResponse: "" },
    { step: "2", action: "Nhập Tên đăng nhập (*) và Mật khẩu (*).", sysResponse: "" },
    { step: "3", action: "Nhấn nút Đăng nhập.", sysResponse: "Hệ thống kiểm tra thông tin và chuyển vào màn hình trang chủ." }
  ],
  loginErrors: [
    { situation: "Tên đăng nhập hoặc mật khẩu sai", message: "Tên đăng nhập hoặc mật khẩu không đúng.", action: "Kiểm tra và nhập lại thông tin." },
    { situation: "Sai mật khẩu quá 5 lần liên tiếp", message: "Tài khoản đã bị tạm khóa.", action: "Liên hệ quản trị viên để mở khóa tài khoản." }
  ],

  // ── Menu hệ thống ──────────────────────────────────────────
  menuItems: [
    { menu: "Văn bản đến",    desc: "Tiếp nhận và xử lý văn bản đến từ bên ngoài hoặc nội bộ." },
    { menu: "Văn bản đi",     desc: "Soạn thảo và phát hành văn bản đi." },
    { menu: "Hồ sơ công việc",desc: "Quản lý hồ sơ, tài liệu liên quan đến công việc." },
    { menu: "Quản trị hệ thống", desc: "Cấu hình danh mục, phân quyền người dùng (chỉ Admin)." }
  ],

  // ── Danh sách chức năng hướng dẫn ──────────────────────────
  features: [
    {
      stt       : "2.1",
      name      : "Tiếp nhận văn bản đến",
      purpose   : "Cho phép cán bộ văn thư ghi nhận văn bản đến từ bên ngoài, xác lập thông tin và phân phối xử lý.",
      menuPath  : "Văn bản đến > Tiếp nhận văn bản đến",
      preConditions: [
        "Người dùng có quyền: Văn thư / Tiếp nhận văn bản đến.",
        "Đã đăng nhập hệ thống."
      ],
      steps: [
        {
          action     : "Tại menu, chọn Văn bản đến > Tiếp nhận văn bản đến.",
          sysResponse: "Hệ thống hiển thị danh sách văn bản đến."
        },
        {
          action     : "Nhấn nút Thêm mới.",
          sysResponse: "Hệ thống mở form Tiếp nhận văn bản đến."
        },
        {
          action     : "Nhập thông tin: Số hiệu văn bản (*), Ngày ban hành (*), Cơ quan ban hành (*), Trích yếu (*), File đính kèm.",
          sysResponse: ""
        },
        {
          action     : "Nhấn Lưu để hoàn tất.",
          sysResponse: "Hệ thống lưu hồ sơ và hiển thị thông báo \"Tiếp nhận văn bản thành công\"."
        }
      ],
      errors: [
        { situation: "Bỏ trống trường bắt buộc",        message: "Vui lòng nhập [tên trường].",          action: "Nhập đầy đủ thông tin các trường có dấu (*)." },
        { situation: "File đính kèm vượt kích thước",   message: "Tệp đính kèm không được vượt quá 50MB.", action: "Nén file hoặc chia nhỏ trước khi đính kèm." }
      ]
    },
    {
      stt       : "2.2",
      name      : "Tìm kiếm văn bản đến",
      purpose   : "Cho phép người dùng tra cứu nhanh văn bản đến theo nhiều tiêu chí lọc.",
      menuPath  : "Văn bản đến > Tìm kiếm văn bản đến",
      preConditions: [
        "Người dùng đã đăng nhập hệ thống."
      ],
      steps: [
        {
          action     : "Tại menu, chọn Văn bản đến > Tìm kiếm văn bản đến.",
          sysResponse: "Hệ thống hiển thị form tìm kiếm với các bộ lọc."
        },
        {
          action     : "Nhập một hoặc nhiều tiêu chí: Từ khóa, Khoảng ngày ban hành, Cơ quan ban hành, Trạng thái xử lý.",
          sysResponse: ""
        },
        {
          action     : "Nhấn Tìm kiếm.",
          sysResponse: "Hệ thống hiển thị danh sách văn bản phù hợp điều kiện."
        },
        {
          action     : "Nhấn vào Số hiệu văn bản để xem chi tiết.",
          sysResponse: "Hệ thống mở trang chi tiết văn bản đến."
        }
      ],
      errors: [
        { situation: "Không tìm thấy kết quả", message: "Không có văn bản nào phù hợp với điều kiện tìm kiếm.", action: "Kiểm tra lại từ khóa hoặc mở rộng khoảng thời gian tìm kiếm." }
      ]
    }
    // ── Thêm chức năng tiếp theo vào đây ──
    // {
    //   stt: "2.3", name: "...", purpose: "...", menuPath: "...",
    //   preConditions: [...], steps: [...], errors: [...]
    // }
  ]
};

// ============================================================
// FONT & STYLE CONSTANTS
// ============================================================
const FONT     = "Times New Roman";
const SZ_BODY  = 26;  // 13pt
const SZ_SMALL = 22;  // 11pt
const SZ_HEAD  = 24;  // 12pt (header/footer)
const SZ_H1    = 28;  // 14pt heading 1
const SZ_H2    = 26;  // 13pt heading 2
const SZ_H3    = 26;  // 13pt heading 3

const B_NONE = { style: BorderStyle.NONE,   size: 0, color: "auto" };
const B_THIN = { style: BorderStyle.SINGLE, size: 4, color: "auto" };
const BORDERS_NONE = { top: B_NONE, bottom: B_NONE, left: B_NONE, right: B_NONE };
const BORDERS_ALL  = { top: B_THIN, bottom: B_THIN, left: B_THIN, right: B_THIN };

// ============================================================
// PRIMITIVE BUILDERS
// ============================================================
function run(text, opts = {}) {
  return new TextRun({ text, font: FONT, size: SZ_BODY, ...opts });
}

function smallRun(text, opts = {}) {
  return new TextRun({ text, font: FONT, size: SZ_SMALL, ...opts });
}

function para(children, opts = {}) {
  if (typeof children === 'string') children = [run(children)];
  return new Paragraph({ spacing: { before: 80, after: 80 }, children, ...opts });
}

function emptyPara(spaceBefore = 120) {
  return new Paragraph({ spacing: { before: spaceBefore, after: 0 }, children: [] });
}

function notePara(text) {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    indent: { left: 300 },
    children: [run("⚠️ Lưu ý: ", { bold: true }), run(text, { italics: true })]
  });
}

function heading1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 280, after: 160 },
    children: [new TextRun({ text, font: FONT, size: SZ_H1, bold: true })]
  });
}

function heading2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text, font: FONT, size: SZ_H2, bold: true })]
  });
}

function heading3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, font: FONT, size: SZ_H3, bold: true })]
  });
}

// ============================================================
// TABLE HELPERS
// ============================================================
function tcell(textOrChildren, opts = {}) {
  const {
    width  = 1500,
    bold   = false,
    align  = AlignmentType.LEFT,
    bg     = null,
    valign = VerticalAlign.TOP
  } = opts;
  const children = typeof textOrChildren === 'string'
    ? [new TextRun({ text: textOrChildren, font: FONT, size: SZ_SMALL, bold })]
    : textOrChildren;
  return new TableCell({
    borders: BORDERS_ALL,
    width: { size: width, type: WidthType.DXA },
    shading: bg ? { fill: bg, type: ShadingType.CLEAR } : undefined,
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    verticalAlign: valign,
    children: [new Paragraph({ alignment: align, spacing: { before: 60, after: 60 }, children })]
  });
}

function thcell(text, width) {
  return tcell(text, { width, bold: true, align: AlignmentType.CENTER, bg: "D9D9D9" });
}

// ============================================================
// TABLE: MENU HỆ THỐNG
// ============================================================
function buildMenuTable(menuItems) {
  // Cột: Mục menu | Mô tả
  const W = [2500, 6526]; // sum ~9026 DXA
  const headerRow = new TableRow({
    tableHeader: true,
    children: [thcell("Mục menu", W[0]), thcell("Mô tả", W[1])]
  });
  const dataRows = menuItems.map(item => new TableRow({
    children: [
      tcell(item.menu, { width: W[0], bold: true }),
      tcell(item.desc, { width: W[1] })
    ]
  }));
  return new Table({
    width: { size: 9026, type: WidthType.DXA },
    columnWidths: W,
    rows: [headerRow, ...dataRows]
  });
}

// ============================================================
// TABLE: XỬ LÝ LỖI
// ============================================================
function buildErrorTable(errors) {
  const W = [2500, 3500, 3026]; // sum ~9026 DXA
  const headerRow = new TableRow({
    tableHeader: true,
    children: [
      thcell("Tình huống", W[0]),
      thcell("Thông báo hệ thống", W[1]),
      thcell("Cách xử lý", W[2])
    ]
  });
  const dataRows = errors.map(e => new TableRow({
    children: [
      tcell(e.situation, { width: W[0] }),
      tcell(e.message,   { width: W[1], align: AlignmentType.CENTER }),
      tcell(e.action,    { width: W[2] })
    ]
  }));
  return new Table({
    width: { size: 9026, type: WidthType.DXA },
    columnWidths: W,
    rows: [headerRow, ...dataRows]
  });
}

// ============================================================
// TABLE: ĐĂNG NHẬP (lỗi)
// ============================================================
function buildLoginErrorTable(errors) {
  return buildErrorTable(errors);
}

// ============================================================
// SECTION: TỔNG QUAN (Mục 1)
// ============================================================
function buildOverviewSection(data) {
  const nodes = [];

  nodes.push(heading1("1. TỔNG QUAN"));

  // 1.1 Giới thiệu
  nodes.push(heading2("1.1 Giới thiệu hệ thống"));
  nodes.push(para([
    run(`${data.systemName} là hệ thống quản lý `, {}),
    run(data.moduleName, { bold: true }),
    run(" của VNPT IT, hỗ trợ cán bộ, nhân viên thực hiện các nghiệp vụ văn phòng trên môi trường điện tử, giúp tiết kiệm thời gian và nâng cao hiệu quả công việc.")
  ]));
  nodes.push(emptyPara(80));

  // 1.2 Đăng nhập
  nodes.push(heading2("1.2 Đăng nhập hệ thống"));
  nodes.push(para("Để sử dụng hệ thống, người dùng thực hiện các bước sau:"));

  data.loginSteps.forEach(s => {
    const children = [run(`${s.step}. `, { bold: true }), run(s.action)];
    if (s.sysResponse) {
      children.push(run(""));
    }
    nodes.push(new Paragraph({
      spacing: { before: 60, after: 60 },
      indent: { left: 300 },
      children
    }));
    if (s.sysResponse) {
      nodes.push(new Paragraph({
        spacing: { before: 40, after: 40 },
        indent: { left: 600 },
        children: [run("🖥️ ", {}), run(s.sysResponse, { italics: true, color: "1F4E79" })]
      }));
    }
  });

  nodes.push(emptyPara(80));
  nodes.push(para([run("✅ ", {}), run("Kết quả: ", { bold: true }), run("Hệ thống chuyển vào màn hình trang chủ.")]));
  nodes.push(emptyPara(80));

  // Lỗi đăng nhập
  nodes.push(para([run("⚠️ Lưu ý / Xử lý lỗi:", { bold: true })]));
  nodes.push(emptyPara(60));
  nodes.push(buildLoginErrorTable(data.loginErrors));
  nodes.push(emptyPara(120));

  // Placeholder ảnh đăng nhập
  nodes.push(new Paragraph({
    spacing: { before: 80, after: 80 },
    alignment: AlignmentType.CENTER,
    children: [run("[Hình 1.1: Màn hình đăng nhập hệ thống]", { italics: true, color: "888888" })]
  }));
  nodes.push(emptyPara(120));

  // 1.3 Menu hệ thống
  nodes.push(heading2("1.3 Menu hệ thống"));
  nodes.push(para("Sau khi đăng nhập, menu chính hiển thị các nhóm chức năng:"));
  nodes.push(emptyPara(60));
  nodes.push(buildMenuTable(data.menuItems));
  nodes.push(emptyPara(80));
  nodes.push(new Paragraph({
    spacing: { before: 80, after: 80 },
    alignment: AlignmentType.CENTER,
    children: [run("[Hình 1.2: Giao diện menu hệ thống]", { italics: true, color: "888888" })]
  }));
  nodes.push(emptyPara(120));

  // 1.4 Thoát
  nodes.push(heading2("1.4 Thoát khỏi hệ thống"));
  nodes.push(para("Để đảm bảo an toàn dữ liệu, người dùng cần đăng xuất đúng cách:"));
  [
    { step: "1", text: "Nhấn vào tên tài khoản / avatar ở góc trên bên phải màn hình." },
    { step: "2", text: "Chọn Đăng xuất." }
  ].forEach(s => {
    nodes.push(new Paragraph({
      spacing: { before: 60, after: 60 },
      indent: { left: 300 },
      children: [run(`${s.step}. `, { bold: true }), run(s.text)]
    }));
  });
  nodes.push(emptyPara(80));
  nodes.push(para([run("✅ ", {}), run("Kết quả: ", { bold: true }), run("Hệ thống chuyển về màn hình đăng nhập.")]));
  nodes.push(notePara("Không đóng trình duyệt trực tiếp mà không đăng xuất để tránh rủi ro bảo mật."));
  nodes.push(emptyPara(120));

  return nodes;
}

// ============================================================
// SECTION: MỘT CHỨC NĂNG (Mục 2.x)
// ============================================================
function buildFeatureSection(feature, figureBase) {
  const nodes = [];

  nodes.push(heading2(`${feature.stt} ${feature.name}`));

  // Mục đích
  nodes.push(heading3("Mục đích"));
  nodes.push(para(feature.purpose));

  // Vị trí truy cập
  nodes.push(heading3("Vị trí truy cập"));
  nodes.push(para([run("Menu: ", { bold: true }), run(feature.menuPath, { italics: true })]));

  // Điều kiện tiên quyết
  if (feature.preConditions && feature.preConditions.length > 0) {
    nodes.push(heading3("Điều kiện tiên quyết"));
    feature.preConditions.forEach(cond => {
      nodes.push(new Paragraph({
        spacing: { before: 60, after: 60 },
        indent: { left: 300 },
        children: [run("- "), run(cond)]
      }));
    });
  }

  // Các bước thực hiện
  nodes.push(heading3("Các bước thực hiện"));
  feature.steps.forEach((s, idx) => {
    nodes.push(new Paragraph({
      spacing: { before: 80, after: 40 },
      indent: { left: 300 },
      children: [run(`${idx + 1}. `, { bold: true }), run(s.action)]
    }));
    if (s.sysResponse) {
      nodes.push(new Paragraph({
        spacing: { before: 40, after: 60 },
        indent: { left: 600 },
        children: [run("🖥️ ", {}), run(s.sysResponse, { italics: true, color: "1F4E79" })]
      }));
    }
  });

  // Placeholder ảnh
  nodes.push(emptyPara(80));
  nodes.push(new Paragraph({
    spacing: { before: 80, after: 80 },
    alignment: AlignmentType.CENTER,
    children: [run(`[Hình ${figureBase}: Màn hình ${feature.name}]`, { italics: true, color: "888888" })]
  }));

  // Bảng lỗi
  nodes.push(heading3("Lưu ý / Xử lý lỗi"));
  nodes.push(buildErrorTable(feature.errors));
  nodes.push(emptyPara(160));

  return nodes;
}

// ============================================================
// HEADERS
// ============================================================
function buildHeader1(systemName, version) {
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
                children: [new TextRun({ text: systemName.toUpperCase(), font: FONT, size: SZ_HEAD, bold: true, color: "FF0000" })]
              })]
            }),
            new TableCell({
              borders: BORDERS_ALL,
              width: { size: W[2], type: WidthType.DXA },
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({
                children: [
                  new TextRun({ text: "Phiên bản: ", font: FONT, size: SZ_HEAD }),
                  new TextRun({ text: version,       font: FONT, size: SZ_HEAD, color: "FF0000" })
                ]
              })]
            })
          ]
        })]
      }),
      new Paragraph({ children: [] })
    ]
  });
}

function buildHeader2(logoBase64) {
  const W = [1413, 8363];
  const logoCell = logoBase64
    ? new TableCell({
        borders: BORDERS_NONE,
        width: { size: W[0], type: WidthType.DXA },
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new ImageRun({
            data: Buffer.from(logoBase64, 'base64'),
            transformation: { width: 46, height: 58 },
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
                  children: [new TextRun({ text: "TẬP ĐOÀN BƯU CHÍNH VIỄN THÔNG VIỆT NAM", font: FONT, size: SZ_HEAD, bold: true })]
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: "CÔNG TY CÔNG NGHỆ THÔNG TIN VNPT IT",     font: FONT, size: SZ_HEAD, bold: true })]
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
                  new TextRun({ text: "/",        font: FONT, size: SZ_SMALL }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES], font: FONT, size: SZ_SMALL })
                ]
              })]
            })
          ]
        })]
      }),
      new Paragraph({ children: [] })
    ]
  });
}

// ============================================================
// BUILD DOCUMENT
// ============================================================
function buildDocument(data) {
  const body = [];

  // ── Tiêu đề tài liệu ──
  body.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 200, after: 160 },
    children: [new TextRun({
      text: `HƯỚNG DẪN SỬ DỤNG — ${data.systemName.toUpperCase()}`,
      font: FONT, size: 32, bold: true
    })]
  }));
  body.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 80, after: 80 },
    children: [run(`Module: ${data.moduleName}  |  Phiên bản: ${data.version}  |  Ngày: ${data.date}`, { italics: true, color: "444444" })]
  }));
  body.push(emptyPara(200));

  // ── Mục 1: Tổng quan ──
  buildOverviewSection(data).forEach(n => body.push(n));

  // ── Mục 2: Từng chức năng ──
  body.push(heading1("2. HƯỚNG DẪN SỬ DỤNG CHỨC NĂNG"));

  data.features.forEach((feature, idx) => {
    const figureBase = `${feature.stt}.1`;
    buildFeatureSection(feature, figureBase).forEach(n => body.push(n));
  });

  return new Document({
    styles: {
      default: { document: { run: { font: FONT, size: SZ_BODY } } },
      paragraphStyles: [
        {
          id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: SZ_H1, bold: true, font: FONT },
          paragraph: { spacing: { before: 280, after: 160 }, outlineLevel: 0 }
        },
        {
          id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: SZ_H2, bold: true, font: FONT },
          paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 }
        },
        {
          id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: SZ_H3, bold: true, font: FONT, italics: false },
          paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 }
        }
      ]
    },
    sections: [{
      properties: {
        page: {
          size: { width: 11906, height: 16838 },                                // A4
          margin: { top: 1134, right: 851, bottom: 1134, left: 1701 }           // 2cm/3cm
        },
        titlePage: true
      },
      headers: {
        first  : buildHeader1(data.systemName, data.version),
        default: buildHeader2(data.logoBase64)
      },
      footers: {
        first  : buildFooter(),
        default: buildFooter()
      },
      children: body
    }]
  });
}

// ============================================================
// MAIN
// ============================================================
const safeName   = DATA.systemName.replace(/\s+/g, '_');
const outputPath = process.argv[2] || `HDSD_${safeName}_v${DATA.version}.docx`;

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
