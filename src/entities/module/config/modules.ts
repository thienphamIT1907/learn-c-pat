import type { ModuleRegistry } from "../model/module.types";

export const MODULE_REGISTRY: ModuleRegistry = [
  {
    id: "basic-c-syntax",
    slug: "basic-c-syntax",
    title: "Cú pháp C cơ bản",
    order: 1,
    status: "available",
  },
  { id: "data-types", slug: "data-types", title: "Kiểu dữ liệu", order: 2, status: "available" },
  {
    id: "input-output",
    slug: "input-output",
    title: "Nhập & Xuất dữ liệu",
    order: 3,
    status: "available",
  },
  { id: "functions", slug: "functions", title: "Hàm", order: 4, status: "available" },
  {
    id: "if-statement",
    slug: "if-statement",
    title: "Câu lệnh If",
    order: 5,
    status: "available",
  },
  { id: "for-loop", slug: "for-loop", title: "Vòng lặp For", order: 6, status: "available" },
  { id: "arrays", slug: "arrays", title: "Mảng", order: 7, status: "available" },
  { id: "strings", slug: "strings", title: "Chuỗi ký tự", order: 8, status: "available" },
  {
    id: "file-handling",
    slug: "file-handling",
    title: "Xử lý tệp tin",
    order: 9,
    status: "available",
  },
  { id: "examples", slug: "examples", title: "Ví dụ", order: 10, status: "available" },
] as const;
