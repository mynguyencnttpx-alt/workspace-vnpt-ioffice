# Cài đặt công cụ để vẽ đủ 11 diagram (Windows)

> Chỉ cần cài đúng phần ứng với skill bạn sẽ dùng — không bắt buộc cài hết một lúc. Xem bảng skill ↔ engine trong `START-HERE.md`.

## 1. Node.js ≥18 — nền cho Mermaid, BPMN, DBML

```powershell
winget install OpenJS.NodeJS.LTS
node --version
```

## 2. Mermaid CLI — cho `/sequence /activity /state /erd`

```powershell
npm install -g @mermaid-js/mermaid-cli
npx puppeteer browsers install chrome
mmdc --version
```

Nếu `mmdc` báo thiếu Chrome, set biến môi trường trỏ tới Chrome for Testing vừa cài:

```powershell
setx PUPPETEER_EXECUTABLE_PATH "<đường dẫn tới Chrome for Testing>"
```

## 3. PlantUML — cho `/activity-swimlane` và `/usecase-diagram`

Không cần cài gì, chỉ cần internet (render qua plantuml.com). Có Python trên máy thì tốt hơn (script encode dùng Python):

```powershell
winget install Python.Python.3
```

⚠️ **Lưu ý riêng tư:** nội dung sơ đồ (tên actor, tên bước) được gửi qua internet tới plantuml.com mỗi lần render. Nếu nghiệp vụ nhạy cảm → dùng engine khác (Mermaid/D2, render offline) hoặc cài PlantUML + Java local.

## 4. D2 — cho `/d2-activity /d2-erd /d2-architect`

```powershell
winget install d2lang.d2
```

Nếu winget không có gói này, dùng Scoop:

```powershell
scoop install d2
```

Hoặc tải binary trực tiếp từ `github.com/terrastruct/d2/releases` rồi thêm vào PATH.

## 5. BPMN — cho `/bpmn` (cần Node đã cài ở bước 1)

```powershell
cd "<workspace>\.claude\skills\bpmn\engine"
npm install
```

Xem/sửa sơ đồ: mở file `.bpmn` bằng Camunda Modeler, hoặc mở editor HTML đi kèm bằng trình duyệt.

## 6. DBML — cho `/dbdiagram`

```powershell
npm install -g @dbml/cli
dbml2sql --version
```

## Kiểm tra nhanh sau khi cài

```powershell
node --version
mmdc --version
d2 --version
python --version
dbml2sql --version
```

Chỉ cần dòng tương ứng với skill bạn định dùng chạy OK là đủ.

## Bắt đầu nhanh nhất, chưa cần cài gì

Dùng `/activity-swimlane` hoặc `/usecase-diagram` trước — chỉ cần mạng.
