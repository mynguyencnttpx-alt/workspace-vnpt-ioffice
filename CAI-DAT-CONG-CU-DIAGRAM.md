# Cài đặt công cụ — Workspace VNPT iOffice

> Cập nhật 2026-09-01: file này trước đây hướng dẫn cài Mermaid/PlantUML/D2/BPMN/DBML cho gói **11 skill vẽ sơ đồ** (`/sequence /activity /bpmn /erd ...`) — gói đó đã bị gỡ khỏi `.claude/skills/`, nội dung cũ không còn áp dụng. Nội dung dưới đây thay bằng đúng nhu cầu cài đặt của **9 skill đang có** (xem danh sách trong `START-HERE.md` / `HUONG-DAN-SU-DUNG-SKILL.md`).
> Cập nhật 2026-09-18: thêm Mục 4 (`mmdc` cho `/user-flow`) và Mục 5 (MCP `reqwise-figma` cho `/figma`) sau khi copy lại 3 skill `user-flow`/`wireframe-ascii`/`figma`.
> Cập nhật 2026-09-29: server `reqwise-figma` nâng cấp lên bản 1.0.1 — bộ tool tăng từ 5 lên **8 tool** (thêm `figma_diagram`, `figma_record`, `figma_design_system`). Mục 5 viết lại theo bộ tool mới + thêm hướng dẫn nâng cấp khi có bản mới.

## Có cần cài gì không?

**Phần lớn việc dùng skill KHÔNG cần cài thêm gì.** Output mặc định của nhóm viết tài liệu (`urd-writer-vnpt`, `urd-writer-customer`, `um-writer-vnpt`, `srs-write-review`) là file `.md` thuần — kể cả khi `srs-write-review` nhúng sequence diagram, nó viết thẳng code block Mermaid trong file `.md` (render sẵn trên GitHub/VS Code/Obsidian), không cần cài Mermaid CLI để tạo file này.

Chỉ cần cài thêm công cụ trong 2 trường hợp cụ thể dưới đây — và chỉ khi bạn thật sự yêu cầu xuất theo định dạng đó.

## 1. Xuất `.docx` (Word) — `srs-write-review`, `urd-writer-vnpt`, `um-writer-vnpt`

Chỉ chạy khi bạn nói rõ "xuất file Word" / "file docx". Cần:

```powershell
winget install OpenJS.NodeJS.LTS
node --version
npm install -g docx
```

Mỗi skill có sẵn script generator riêng trong `references/` của nó (`docx-generator.js`, `urd-docx-generator.js`, `um-docx-generator.js`) — không cần tự viết, chỉ cần Node + package `docx` có sẵn để chạy script đó.

### Riêng `srs-write-review` — khi SRS có sequence diagram VÀ xuất `.docx`

Sequence diagram trong bản `.md` là Mermaid thuần (không cần cài gì). Nhưng khi xuất `.docx`, diagram phải render thành ảnh PNG trước khi nhúng vào Word — bước này cần Python:

```powershell
winget install Python.Python.3
pip install pillow --break-system-packages
```

Script tương ứng: `.claude/skills/srs-write-review/references/workflow_renderer.py`.

## 2. Xuất `.xlsx` (Excel) — `ba-uc`, `baogia`

`ba-uc` (xuất Phụ lục I/III/V) và `baogia` (xuất báo giá mẫu eGOV) đều dùng Python + thư viện `openpyxl` để dựng file Excel đúng định dạng (font, cột, công thức). Cần:

```powershell
winget install Python.Python.3
pip install openpyxl
python --version
```

## 3. Các skill còn lại — không cần cài gì

- `customer-requirement-clarifier`, `effort-estimate-pmbok` — chỉ trả kết quả trên chat, không sinh file.
- `ui-ux-pro-max` — sinh code UI (React/HTML/Tailwind...) trực tiếp trong phiên.
- `usecase-diagram`, `wireframe-ascii` — không cần cài gì local (`usecase-diagram` render `.svg` qua server công khai `plantuml.com`; `wireframe-ascii` chỉ sinh Markdown).

## 4. `/user-flow` — verify Mermaid bắt buộc (`mmdc`)

`/user-flow` **bắt buộc** chạy `.claude/scripts/mermaid-verify.mjs` sau khi ghi `userflow.md` (Phase F.5) để bắt lỗi cú pháp Mermaid trước khi báo "xong" — bỏ qua bước này thì lỗi chỉ lộ ra khi mở IDE/GitHub/Obsidian. Script gọi `mmdc` (Mermaid CLI), cần:

```powershell
winget install OpenJS.NodeJS.LTS
npm install -g @mermaid-js/mermaid-cli
npx puppeteer browsers install chrome-headless-shell
mmdc --version
```

`mmdc` chạy qua Puppeteer nên cần Chrome for Testing — lệnh `npx puppeteer browsers install chrome-headless-shell` tải Chrome vào `~/.puppeteer-cache` (script tự kiểm và cảnh báo nếu thiếu). Đã cài `mmdc` cho việc khác (vd bộ skill vẽ sơ đồ cũ) thì khỏi cài lại, chỉ cần `mmdc --version` chạy được là đủ.

Chưa cài `mmdc` → `/user-flow` vẫn ghi được `userflow.md`, nhưng bước verify sẽ báo lỗi rõ ràng thay vì âm thầm bỏ qua — cần cài rồi chạy lại skill để verify, hoặc tự kiểm tra Mermaid bằng tay qua [mermaid.live](https://mermaid.live).

## 5. `/figma` — MCP server `reqwise-figma` (cài + kết nối riêng, ngoài phạm vi Node/Python ở trên)

`/figma` vẽ thẳng lên Figma qua MCP server tên `reqwise-figma` — server này **không nằm trong workspace** và không cài được bằng `npm install`/`pip install` đơn giản như 2 mục trên. Từ bản **1.0.1** server có **8 tool**: `figma_status` / `figma_read` / `figma_write` / `figma_diagram` / `figma_rules` / `figma_docs` / `figma_record` / `figma_design_system` (bản 1.0.0 trước đó chỉ có 5 tool — thiếu `figma_diagram`, `figma_record`, `figma_design_system`).

### Cài lần đầu

1. Cài **Figma Desktop app** (không phải bản web) — tải tại [figma.com/downloads](https://figma.com/downloads).
2. Có sẵn source code MCP server `reqwise-figma-mcp` (repo riêng, không nằm trong workspace này) — hỏi người quản lý bộ skill nếu chưa có. Build trong thư mục đó:
   ```powershell
   npm install
   npm run build
   ```
   `npm install` tự chạy `npm run build` (script `prepare`) — sinh `dist/server/index.js` (server) + `plugin/code.js` (plugin).
3. Đăng ký MCP server trong Claude Code — có lệnh `claude` trong PATH thì dùng:
   ```powershell
   claude mcp add reqwise-figma -s user -- node "<đường-dẫn-repo>\dist\server\index.js"
   ```
   Không có lệnh `claude` (vd chỉ dùng app desktop) → sửa trực tiếp mục `mcpServers.reqwise-figma` trong `%USERPROFILE%\.claude.json`, trỏ `args` vào đúng `dist\server\index.js` của bản đang dùng. Sao lưu file này trước khi sửa tay.
4. Trong Figma Desktop: Plugins → Development → Import plugin from manifest… → chọn `plugin/manifest.json` trong repo đó. Mở 1 file Figma → Plugins → Development → chạy plugin "Reqwise Figma MCP" → giữ plugin chạy suốt phiên làm việc.
5. Khởi động lại Claude Code/Desktop để nạp MCP config mới.

Chưa hoàn tất cả 5 bước → gọi `/figma` sẽ dừng ngay ở Phase 0 (HARD GATE kết nối) và tự in lại đúng hướng dẫn kết nối này. `user-flow` và `wireframe-ascii` không phụ thuộc bước này, dùng được ngay.

### Nâng cấp lên bản mới (vd 1.0.0 → 1.0.1)

Copy bản mới về thư mục riêng (không ghi đè bản cũ — dễ rollback), rồi lặp lại bước 2-5 ở trên cho thư mục mới: build lại, trỏ MCP config sang `dist/server/index.js` của thư mục mới, import lại plugin từ `manifest.json` mới, khởi động lại Claude.

Kiểm tra đã nâng cấp đúng qua tool `figma_status`:
- `serverVersion` = version bản mới.
- `pluginBundleBuild` phải **khớp** `serverBuild` — lệch nhau nghĩa là quên import lại plugin (đang chạy code plugin cũ với server mới).
- `pluginConnected: true`, `mode: leader` (hoặc `follower` nếu có nhiều cửa sổ IDE khác đang mở cùng lúc — bình thường).

Nếu vẫn thấy bản cũ (ít tool hơn / version cũ) sau khi khởi động lại → có thể còn tiến trình `node` của server cũ giữ cổng, tắt hết tiến trình đó rồi mở lại Claude.

## Kiểm tra nhanh sau khi cài

```powershell
node --version
npm --version
python --version
mmdc --version
```

Chỉ cần dòng tương ứng với nhu cầu bạn định dùng (Word / Excel / verify Mermaid) chạy OK là đủ — không bắt buộc cài hết nếu bạn chỉ dùng output `.md` mặc định hoặc chưa dùng `/user-flow`/`/figma`.
