/**
 * VNPT iOffice — SRS DOCX Generator
 * Cấu trúc theo BM_SRS_AI (srs-template-vnpt.md)
 *
 * Usage:
 *   npm install -g docx   (first time only)
 *   node docx-generator.js
 *
 * Output: srs-output.docx in current directory
 */

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, WidthType, BorderStyle, ShadingType,
  VerticalAlign, PageNumber, PageBreak, LevelFormat, Header, Footer,
  TabStopType, ImageRun
} = require('docx');
const fs = require('fs');

// ─── WORKFLOW PNG ─────────────────────────────────────────────────────────────
// MODEL: Sau khi chạy workflow_renderer.py, điền cw và ch từ console output.
// Ví dụ: "✅ workflow.png  (760×1024px)" → WORKFLOW_CW=760, WORKFLOW_CH=1024
// Nếu nhiều chức năng: tạo workflowImage('workflow_fc1.png', cw1, ch1) riêng.

const WORKFLOW_CW = 760;
const WORKFLOW_CH = 1024;
const DISP_W = 560;
const DISP_H = Math.round(DISP_W * WORKFLOW_CH / WORKFLOW_CW);

function workflowImage(pngPath = 'workflow.png', dispW = DISP_W, dispH = DISP_H) {
  if (!fs.existsSync(pngPath)) {
    console.warn(`⚠️  ${pngPath} không tìm thấy — dùng bảng text thay thế`);
    return workflowMainTable();
  }
  const data = fs.readFileSync(pngPath);
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 120, after: 200 },
    children: [
      new ImageRun({ data, transformation: { width: dispW, height: dispH }, type: 'png' }),
    ],
  });
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const A4_WIDTH_DXA  = 11906;
const A4_HEIGHT_DXA = 16838;
const MARGIN_DXA    = 1418;
const CONTENT_WIDTH = A4_WIDTH_DXA - MARGIN_DXA * 2;

const COLOR = {
  headerBg  : '1F497D',
  headerText: 'FFFFFF',
  rowAlt    : 'DCE6F1',
  border    : '4472C4',
  heading1  : '1F497D',
  heading2  : '2E75B6',
  heading3  : '2E75B6',
  gray      : '595959',
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const cellBorder = (color = COLOR.border) => ({
  top   : { style: BorderStyle.SINGLE, size: 4, color },
  bottom: { style: BorderStyle.SINGLE, size: 4, color },
  left  : { style: BorderStyle.SINGLE, size: 4, color },
  right : { style: BorderStyle.SINGLE, size: 4, color },
});

function hCell(text, widthDXA) {
  return new TableCell({
    width: { size: widthDXA, type: WidthType.DXA },
    borders: cellBorder(),
    shading: { fill: COLOR.headerBg, type: ShadingType.CLEAR },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text, bold: true, color: COLOR.headerText, size: 20, font: 'Times New Roman' })],
    })],
  });
}

function dCell(text, widthDXA, { alt = false, bold = false, center = false } = {}) {
  return new TableCell({
    width: { size: widthDXA, type: WidthType.DXA },
    borders: cellBorder(),
    shading: { fill: alt ? COLOR.rowAlt : 'FFFFFF', type: ShadingType.CLEAR },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({
      alignment: center ? AlignmentType.CENTER : AlignmentType.LEFT,
      children: [new TextRun({ text, bold, size: 20, font: 'Times New Roman' })],
    })],
  });
}

/** Dòng header nhóm span toàn bảng (in đậm, nền xám nhạt) */
function groupHeaderRow(text, colCount, colWidths) {
  const totalWidth = colWidths.reduce((a, b) => a + b, 0);
  return new TableRow({
    children: [
      new TableCell({
        columnSpan: colCount,
        width: { size: totalWidth, type: WidthType.DXA },
        borders: cellBorder(),
        shading: { fill: 'E2EFDA', type: ShadingType.CLEAR },
        margins: { top: 60, bottom: 60, left: 120, right: 120 },
        children: [new Paragraph({
          children: [new TextRun({ text, bold: true, size: 20, font: 'Times New Roman' })],
        })],
      }),
    ],
  });
}

function divider() {
  return new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: COLOR.heading2, space: 1 } },
    spacing: { before: 160, after: 80 },
    children: [],
  });
}

function para(text, { bold = false, size = 20, before = 60, after = 60, italic = false } = {}) {
  return new Paragraph({
    spacing: { before, after },
    children: [new TextRun({ text, bold, italic, size, font: 'Times New Roman' })],
  });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: 'bullets', level: 0 },
    children: [new TextRun({ text, size: 20, font: 'Times New Roman' })],
  });
}

function spacer(before = 120) {
  return new Paragraph({ spacing: { before, after: 0 }, children: [] });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text, font: 'Times New Roman', size: 28, bold: true, color: COLOR.heading1 })],
  });
}
function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, font: 'Times New Roman', size: 24, bold: true, color: COLOR.heading2 })],
  });
}
function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 160, after: 80 },
    children: [new TextRun({ text, font: 'Times New Roman', size: 22, bold: true, color: COLOR.heading3 })],
  });
}
function h4(text) {
  return new Paragraph({
    spacing: { before: 140, after: 60 },
    children: [new TextRun({ text, font: 'Times New Roman', size: 21, bold: true })],
  });
}

// ─── META ─────────────────────────────────────────────────────────────────────
// MODEL: điền thông tin dự án thực tế

const META = {
  version    : '1.0',
  systemName : 'VNPT iOffice',
  subsystem  : '<Tên phân hệ>',   // e.g. "Quản lý văn bản đến"
  module     : '<Tên module>',    // e.g. "Tiếp nhận văn bản đến"
};

// ─── FIELD SPEC TABLE (Yêu cầu giao diện) ────────────────────────────────────
// MODEL: thay fieldRows bằng danh sách trường thực tế.
// Dùng groupHeaderRow() để thêm dòng tiêu đề nhóm (Box tìm kiếm, Box kết quả...)

const fieldCols = [2000, 1500, 900, 2900, 1770];

const fieldRows = [
  // Ví dụ dòng header nhóm: { group: 'Box các tiêu chí tìm kiếm' }
  // Ví dụ dòng field:        { name: 'Tên công việc', control: 'Textbox', maxLen: '-', constraint: 'Cho phép nhập ký tự chữ số. Mặc định trống', type: 'String' }
  { group: 'Box các tiêu chí tìm kiếm' },
  { name: '<Tên trường>', control: 'Textbox', maxLen: '-', constraint: '<Ghi đầy đủ: mặc định, điều kiện, danh sách giá trị nếu là dropdown>', type: 'String' },
];

function fieldSpecTable() {
  const total = fieldCols.reduce((a, b) => a + b, 0);
  const headers = ['Tên trường thông tin', 'Kiểu điều khiển', 'Độ dài', 'Ràng buộc / Điều kiện', 'Kiểu dữ liệu'];
  const rows = fieldRows.map((r, i) => {
    if (r.group) return groupHeaderRow(r.group, fieldCols.length, fieldCols);
    return new TableRow({
      children: [
        dCell(r.name, fieldCols[0], { alt: i % 2 === 1 }),
        dCell(r.control, fieldCols[1], { alt: i % 2 === 1 }),
        dCell(r.maxLen, fieldCols[2], { alt: i % 2 === 1, center: true }),
        dCell(r.constraint, fieldCols[3], { alt: i % 2 === 1 }),
        dCell(r.type, fieldCols[4], { alt: i % 2 === 1 }),
      ],
    });
  });
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: fieldCols,
    rows: [
      new TableRow({ children: headers.map((h, i) => hCell(h, fieldCols[i])) }),
      ...rows,
    ],
  });
}

// ─── WORKFLOW MAIN TABLE — ① Luồng xử lý thành công ─────────────────────────
// MODEL: thay workflowSteps bằng các bước thực tế.
// Ghi ngắn "Hệ thống gửi thông báo" nếu có — chi tiết để ở notificationTable().

const workflowSteps = [
  { step: '1', actor: '<Actor>', action: '<Mô tả thao tác>', system: '<Hệ thống xử lý gì — validate, lưu DB, v.v.>' },
];

function workflowMainTable() {
  const cols = [700, 1600, 3000, 3770];
  const total = cols.reduce((a, b) => a + b, 0);
  const dataRows = workflowSteps.map((r, i) =>
    new TableRow({
      children: [
        dCell(r.step, cols[0], { alt: i % 2 === 1, center: true }),
        dCell(r.actor, cols[1], { alt: i % 2 === 1 }),
        dCell(r.action, cols[2], { alt: i % 2 === 1 }),
        dCell(r.system, cols[3], { alt: i % 2 === 1 }),
      ],
    })
  );
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: cols,
    rows: [
      new TableRow({ children: ['Bước', 'Actor', 'Hành động', 'Xử lý hệ thống'].map((h, i) => hCell(h, cols[i])) }),
      ...dataRows,
    ],
  });
}

// ─── EXCEPTION TABLE — ② Luồng xử lý ngoại lệ ───────────────────────────────
// MODEL: thay exceptionRows bằng các tình huống lỗi / rẽ nhánh thực tế.

const exceptionRows = [
  { code: 'EX-01', situation: '<Điều kiện kích hoạt: validation fail, timeout, thiếu quyền...>', handling: '<Message hiển thị + hành động hệ thống: rollback, redirect, log...>' },
];

function exceptionTable() {
  const cols = [1100, 4000, 3970];
  const total = cols.reduce((a, b) => a + b, 0);
  const dataRows = exceptionRows.map((r, i) =>
    new TableRow({
      children: [
        dCell(r.code, cols[0], { alt: i % 2 === 1, center: true }),
        dCell(r.situation, cols[1], { alt: i % 2 === 1 }),
        dCell(r.handling, cols[2], { alt: i % 2 === 1 }),
      ],
    })
  );
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: cols,
    rows: [
      new TableRow({ children: ['Mã', 'Tình huống', 'Xử lý'].map((h, i) => hCell(h, cols[i])) }),
      ...dataRows,
    ],
  });
}

// ─── BUSINESS RULES — ③ Quy tắc nghiệp vụ ───────────────────────────────────
// MODEL: thay businessRules bằng danh sách BR thực tế.
// Format: BR-XX: <Trigger> → <Logic> → <Output>
// Không lặp lại bước đã có trong Luồng thành công hoặc điều kiện lỗi trong Luồng ngoại lệ.

const businessRules = [
  'BR-01: <Trigger> → <Logic> → <Output>',
  // 'BR-02: Số hiệu tự sinh theo format [Ký hiệu]-[YYYY]-[NNN] → NNN reset về 001 mỗi năm → Lưu vào DB',
];

// ─── NOTIFICATION TABLE (Thông báo & Log) ────────────────────────────────────
// MODEL: thay notificationRows bằng danh sách thông báo thực tế.

const notificationRows = [
  { trigger: '<Sự kiện>', receiver: '<Người nhận>', channel: 'SMS / Notify / Email', content: '<Nội dung cú pháp thông báo>' },
];

function notificationTable() {
  const cols = [2000, 1800, 1600, 3670];
  const total = cols.reduce((a, b) => a + b, 0);
  const dataRows = notificationRows.map((r, i) =>
    new TableRow({
      children: [
        dCell(r.trigger, cols[0], { alt: i % 2 === 1 }),
        dCell(r.receiver, cols[1], { alt: i % 2 === 1 }),
        dCell(r.channel, cols[2], { alt: i % 2 === 1 }),
        dCell(r.content, cols[3], { alt: i % 2 === 1 }),
      ],
    })
  );
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: cols,
    rows: [
      new TableRow({ children: ['Sự kiện kích hoạt', 'Người nhận', 'Kênh', 'Nội dung thông báo'].map((h, i) => hCell(h, cols[i])) }),
      ...dataRows,
    ],
  });
}

// ─── EDGE CASES ───────────────────────────────────────────────────────────────
// MODEL: thay edgeCases bằng danh sách tình huống bất thường thực tế.
// Chỉ ghi các tình huống UNEXPECTED chưa covered ở Luồng ngoại lệ.

const edgeCases = [
  'Người dùng thao tác đồng thời trên cùng bản ghi',
  'Mất kết nối giữa chừng khi submit',
  'Trùng dữ liệu (số hiệu, mã đối tượng,...)',
  'Upload file vượt dung lượng cho phép',
  '<Thêm edge case đặc thù của module>',
];

// ─── ACCEPTANCE CONDITIONS (Điều kiện nghiệm thu) ────────────────────────────
// MODEL: thay acceptanceConditions bằng tiêu chí nghiệm thu thực tế.

const acceptanceConditions = [
  'Hệ thống được thiết kế và vận hành theo mô tả trong tài liệu này, đồng thời đáp ứng toàn bộ các Yêu cầu Chức năng',
  'Hệ thống được hiệu chỉnh sau khi triển khai thử nghiệm',
  'Tổ chức hướng dẫn sử dụng cho người dùng',
  'Người sử dụng thao tác tốt trên hệ thống sau khi qua khóa đào tạo',
  'Tất cả tài liệu và source chương trình được bàn giao đầy đủ',
];

// ─── DOCUMENT ASSEMBLY ────────────────────────────────────────────────────────

const doc = new Document({
  numbering: {
    config: [
      { reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '\u2022', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ],
  },
  styles: {
    default: { document: { run: { font: 'Times New Roman', size: 20 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 28, bold: true, font: 'Times New Roman', color: COLOR.heading1 },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 24, bold: true, font: 'Times New Roman', color: COLOR.heading2 },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 } },
      { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 22, bold: true, font: 'Times New Roman', color: COLOR.heading3 },
        paragraph: { spacing: { before: 160, after: 80 }, outlineLevel: 2 } },
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: A4_WIDTH_DXA, height: A4_HEIGHT_DXA },
        margin: { top: MARGIN_DXA, right: MARGIN_DXA, bottom: MARGIN_DXA, left: MARGIN_DXA },
      },
    },

    headers: {
      default: new Header({
        children: [new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: COLOR.heading1, space: 1 } },
          spacing: { after: 120 },
          children: [new TextRun({ text: `${META.systemName} — Đặc tả yêu cầu phần mềm`, bold: true, size: 18, font: 'Times New Roman', color: COLOR.gray })],
        })],
      }),
    },

    footers: {
      default: new Footer({
        children: [new Paragraph({
          border: { top: { style: BorderStyle.SINGLE, size: 6, color: COLOR.heading1, space: 1 } },
          spacing: { before: 120 },
          tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_WIDTH }],
          children: [
            new TextRun({ text: `Phiên bản ${META.version}`, size: 16, font: 'Times New Roman', color: COLOR.gray }),
            new TextRun({ text: '\tTrang ', size: 16, font: 'Times New Roman', color: COLOR.gray }),
            new TextRun({ children: [PageNumber.CURRENT], size: 16, font: 'Times New Roman', color: COLOR.gray }),
            new TextRun({ text: '/', size: 16, font: 'Times New Roman', color: COLOR.gray }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 16, font: 'Times New Roman', color: COLOR.gray }),
          ],
        })],
      }),
    },

    children: [

      // ══ NỘI DUNG ══════════════════════════════════════════════════════════

      h1('NỘI DUNG'),
      h1('ĐẶC TẢ YÊU CẦU CHỨC NĂNG HỆ THỐNG'),

      // ── Phân hệ ──
      h2(`PHÂN HỆ: ${META.subsystem.toUpperCase()}`),
      bullet('Yêu cầu tính năng chung của phân hệ'),
      bullet('<Mô tả luồng nghiệp vụ tổng thể nếu có>'),

      divider(),

      // ── Module ──
      h2(`Module: ${META.module}`),

      // 1. Mô tả tóm tắt
      h3('Mô tả tóm tắt'),
      para('<Mô tả ai dùng + dùng để làm gì + trong bối cảnh nghiệp vụ nào>'),
      spacer(),

      // 2. Phạm vi chỉnh sửa
      h3('Phạm vi chỉnh sửa'),
      bullet('<Tên chức năng / menu bị ảnh hưởng 1>'),
      bullet('<Tên chức năng / menu bị ảnh hưởng 2>'),
      spacer(),

      // 3. Yêu cầu giao diện
      h3('Yêu cầu giao diện'),
      para('Hình ảnh giao diện / mockup:', { bold: true }),
      para('<Chèn hình mockup hoặc mô tả layout. Nếu có hành vi UI/UX đặc biệt → mô tả bổ sung ở đây (kéo thả, vuốt để xóa, infinite scroll, drag & drop, tooltip khi hover, v.v.)>', { italic: true }),
      spacer(80),
      para('Bảng mô tả các trường thông tin:', { bold: true }),
      fieldSpecTable(),
      spacer(),

      // 4. Chức năng
      h3('Chức năng <N>: <Tên chức năng>'),

      // B.1 Quy trình
      h4('Quy trình'),
      para('[Vẽ Activity Diagram nếu chức năng có quy trình nhiều bước / nhiều actor. Bỏ qua nếu chỉ là chỉnh sửa nhỏ.]', { italic: true }),
      // MODEL: workflowImage() đọc workflow.png do workflow_renderer.py tạo ra.
      // Nếu nhiều chức năng: workflowImage('workflow_fc1.png', cw1, ch1)
      workflowImage(),
      spacer(),

      // B.2 Chức năng nghiệp vụ
      h4('Chức năng nghiệp vụ'),

      para('① Luồng xử lý thành công', { bold: true }),
      workflowMainTable(),
      spacer(80),

      para('② Luồng xử lý ngoại lệ', { bold: true }),
      exceptionTable(),
      spacer(80),

      para('③ Quy tắc nghiệp vụ', { bold: true }),
      ...businessRules.map(br => bullet(br)),
      spacer(),

      // B.3 Thông báo & Log
      h4('Thông báo và thông tin lưu vết log'),
      para('Thông báo hệ thống:', { bold: true }),
      notificationTable(),
      spacer(80),
      para('Log hệ thống (Audit Trail):', { bold: true }),
      bullet('Người thao tác (user ID + tên)'),
      bullet('Thời gian (timestamp)'),
      bullet('Hành động (tạo / sửa / xóa / chuyển trạng thái)'),
      bullet('Dữ liệu trước và sau thay đổi (nếu applicable)'),
      spacer(),

      // B.4 Edge Cases
      h4('Edge cases'),
      ...edgeCases.map(e => bullet(e)),

      new Paragraph({ children: [new PageBreak()] }),

      // ══ ĐIỀU KIỆN NGHIỆM THU ══════════════════════════════════════════════

      h1('ĐIỀU KIỆN NGHIỆM THU HỆ THỐNG'),
      para('Hệ thống được nghiệm thu khi thỏa các điều kiện sau:'),
      ...acceptanceConditions.map(c => bullet(c)),
      spacer(),

      // ══ PHỤ LỤC ══════════════════════════════════════════════════════════

      h1('PHỤ LỤC (NẾU CÓ)'),
      bullet('Danh mục dùng chung (dropdown values, loại văn bản,...)'),
      bullet('Mapping dữ liệu (nếu migrate hoặc tích hợp)'),
      bullet('BPMN / Sơ đồ luồng tổng thể'),
    ],
  }],
});

// ─── WRITE FILE ───────────────────────────────────────────────────────────────

Packer.toBuffer(doc).then(buffer => {
  const filename = 'srs-output.docx';
  fs.writeFileSync(filename, buffer);
  console.log(`✅ File created: ${filename}`);
}).catch(err => {
  console.error('❌ Error generating docx:', err);
  process.exit(1);
});
