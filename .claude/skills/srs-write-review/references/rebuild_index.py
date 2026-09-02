"""
rebuild_index.py — Sinh lại toàn bộ index.json từ front-matter của các SRS.md

index.json KHÔNG phải nguồn sự thật — nó chỉ là bản tổng hợp lại từ front-matter
trong từng SRS.md. Nếu index bị lệch (ai đó sửa file mà quên cập nhật index),
cách sửa đúng là chạy lại script này, KHÔNG sửa tay từng dòng trong index.json.

Cấu trúc thư mục (từ 2026-08-29): mỗi SRS.md nằm trực tiếp dưới
<thư mục gốc>/<module-slug-hoặc-cr_id>/SRS.md — KHÔNG có lớp "base/"/"cr/" bao ngoài.
index.json cũng nằm ngay dưới thư mục gốc đó (KHÔNG có lớp "docs/" bao ngoài).

Cách dùng:
    pip install pyyaml --break-system-packages
    python3 rebuild_index.py [đường dẫn thư mục gốc, mặc định "."]
"""

import sys
import json
import glob
import yaml


def load_front_matter(path):
    text = open(path, encoding="utf-8").read()
    parts = text.split("---")
    if len(parts) < 3:
        return None
    return yaml.safe_load(parts[1])


def main():
    docs_root = sys.argv[1] if len(sys.argv) > 1 else "."
    modules = {}

    for path in glob.glob(f"{docs_root}/**/SRS.md", recursive=True):
        meta = load_front_matter(path)
        if not meta:
            print(f"[BỎ QUA] Không đọc được front-matter: {path}")
            continue

        module = meta.get("module")
        if not module:
            print(f"[BỎ QUA] Thiếu 'module' trong front-matter: {path}")
            continue

        status = meta.get("status")
        if status != "approved":
            # Chỉ đưa vào index các bản đã qua Gate 4 — draft/needs-revision không
            # được coi là "current" cho Dev/Tester dùng.
            continue

        existing = modules.get(module)
        # Nếu module đã có entry, chỉ ghi đè khi bản này version cao hơn
        if existing and existing.get("_version", 0) >= (meta.get("version") or 0):
            continue

        lineage = existing.get("lineage", []) if existing else []
        if meta.get("doc_type") == "cr" and meta.get("cr_id"):
            # based_on nay bắt buộc là đường dẫn tuyệt đối đầy đủ (xem writing-rules.md) —
            # fallback dưới đây chỉ dùng khi based_on bị bỏ trống, không đáng tin bằng based_on thật
            base_entry = meta.get("based_on") or module
            lineage = [base_entry, meta["cr_id"]]
        elif meta.get("doc_type") == "new":
            lineage = [path]

        modules[module] = {
            "current_approved": path,
            "status": "dev-ready",
            "function_ids": meta.get("function_ids", []),
            "lineage": lineage,
            "last_updated": meta.get("approved_date"),
            "_version": meta.get("version") or 0,
        }

    # Bỏ field nội bộ "_version" trước khi ghi ra file
    for entry in modules.values():
        entry.pop("_version", None)

    out_path = f"{docs_root}/index.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(modules, f, ensure_ascii=False, indent=2)

    print(f"Đã sinh lại {out_path} — {len(modules)} module.")


if __name__ == "__main__":
    main()
