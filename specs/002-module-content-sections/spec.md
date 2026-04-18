# Feature Specification: Phase 2 — Module Content Sections

**Feature Branch**: `002-module-content-sections`
**Created**: 2026-04-18
**Status**: Draft
**Input**: User description: "Add content for each module as C concept. Each content includes: What/When/How to use, code example (block code npm package), flow of code (npm package to visualize), FAQ. Easy to understand for newbies. Vietnamese for content, English for code examples."

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Người học mới tìm hiểu một khái niệm C (Priority: P1)

Một người học mới mở một module C bất kỳ (ví dụ: "Kiểu dữ liệu"). Họ thấy nội dung được
chia thành các phần rõ ràng: giải thích khái niệm bằng tiếng Việt, ví dụ mã bằng tiếng Anh
với highlight cú pháp, sơ đồ minh hoạ luồng thực thi, và phần hỏi đáp thường gặp. Họ có
thể đọc từ trên xuống và hiểu khái niệm mà không cần tra cứu thêm.

**Why this priority**: Đây là deliverable chính của Phase 2. Nếu không có nội dung thực sự,
ứng dụng chỉ là một skeleton rỗng không mang lại giá trị học tập.

**Independent Test**: Mở bất kỳ module nào, xác nhận có đủ 4 phần (Giải thích, Ví dụ code,
Sơ đồ luồng, Hỏi & Đáp), nội dung giải thích bằng tiếng Việt, code bằng tiếng Anh có
highlight cú pháp, sơ đồ hiển thị đúng luồng thực thi của ví dụ.

**Acceptance Scenarios**:

1. **Given** người dùng điều hướng vào một module, **When** trang tải xong, **Then** hiển
   thị đủ 4 phần nội dung theo thứ tự: Giải thích → Ví dụ code → Sơ đồ luồng → Hỏi & Đáp.
2. **Given** phần Giải thích, **When** người dùng đọc, **Then** nội dung giải thích "Là gì,
   Khi nào dùng, Dùng như thế nào" bằng tiếng Việt, dễ hiểu với người mới bắt đầu.
3. **Given** phần Ví dụ code, **When** người dùng nhìn vào, **Then** code C được hiển thị
   trong block có highlight cú pháp, viết bằng tiếng Anh (tên biến, comment).
4. **Given** phần Sơ đồ luồng, **When** trang hiển thị, **Then** sơ đồ minh hoạ luồng thực
   thi của ví dụ code tương ứng bằng hình ảnh/sơ đồ trực quan.
5. **Given** phần Hỏi & Đáp, **When** người dùng đọc, **Then** có ít nhất 3 câu hỏi thường
   gặp cùng câu trả lời ngắn gọn bằng tiếng Việt.
6. **Given** cả 10 module, **When** người dùng lần lượt mở từng module, **Then** mỗi module
   có nội dung riêng biệt phù hợp với khái niệm C của module đó.

---

### User Story 2 — Người học tra cứu nhanh khái niệm đã biết (Priority: P2)

Một người học đã quen sơ với C muốn tra cứu nhanh cú pháp hoặc câu trả lời cho một vấn đề
cụ thể. Họ cuộn thẳng đến phần Ví dụ code hoặc Hỏi & Đáp mà không cần đọc toàn bộ trang.

**Why this priority**: Làm cho ứng dụng hữu ích cả trong lần đầu học và trong những lần tra
cứu sau này, tăng giá trị dài hạn.

**Independent Test**: Cuộn trang module, xác nhận các phần có tiêu đề rõ ràng và nội dung
đủ ngắn gọn để đọc lướt, code block có thể đọc/copy nhanh.

**Acceptance Scenarios**:

1. **Given** trang module đã mở, **When** người dùng cuộn, **Then** mỗi phần có tiêu đề
   nổi bật, phân biệt rõ ràng với nhau.
2. **Given** phần Ví dụ code, **When** người dùng muốn copy code, **Then** nội dung code
   có thể được chọn và sao chép bằng cách bôi đen thủ công (không cần nút Copy).

---

### Edge Cases

- Điều gì xảy ra khi màn hình nhỏ (≥ 375 px) hiển thị sơ đồ luồng rộng?
  → Sơ đồ PHẢI có thể cuộn ngang hoặc tự co lại để không vỡ layout.
- Điều gì xảy ra khi sơ đồ Mermaid đang tải?
  → PHẢI hiển thị skeleton placeholder trong khi Mermaid render bất đồng bộ.
- Điều gì xảy ra khi sơ đồ Mermaid gặp lỗi render?
  → PHẢI hiển thị thông báo lỗi bằng tiếng Việt thay thế (ví dụ: "Không thể hiển thị
    sơ đồ. Vui lòng thử tải lại trang."), không để màn hình trống hay crash.
- Điều gì xảy ra nếu block code có nhiều dòng?
  → Block code PHẢI có thanh cuộn dọc riêng hoặc giới hạn chiều cao với scroll,
    không đẩy vỡ layout trang.
- Điều gì xảy ra khi phần Hỏi & Đáp có câu trả lời dài?
  → Câu hỏi PHẢI luôn hiển thị đầy đủ. Câu trả lời mặc định ẩn, có thể expand khi
    người dùng click vào câu hỏi. Dùng shadcn/ui `Collapsible` hoặc tương đương.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Mỗi trong 10 module C PHẢI hiển thị đủ 4 phần nội dung: Giải thích
  (Là gì / Khi nào dùng / Dùng như thế nào), Ví dụ code, Sơ đồ luồng, Hỏi & Đáp.
- **FR-002**: Phần giải thích PHẢI viết bằng tiếng Việt, dễ hiểu cho người mới bắt đầu,
  không dùng thuật ngữ kỹ thuật nâng cao mà không giải thích.
- **FR-003**: Phần Ví dụ code PHẢI sử dụng block code có highlight cú pháp ngôn ngữ C.
  Nội dung code (tên biến, comment, output) viết bằng tiếng Anh.
- **FR-004**: Phần Sơ đồ luồng PHẢI hiển thị luồng thực thi của ví dụ code tương ứng
  bằng sơ đồ Mermaid. Trong khi đang tải PHẢI hiển thị skeleton placeholder. Nếu
  render thất bại PHẢI hiển thị thông báo lỗi bằng tiếng Việt thay thế.
- **FR-005**: Phần Hỏi & Đáp PHẢI có ít nhất 3 câu hỏi thường gặp cho mỗi module.
  Câu hỏi PHẢI luôn hiển thị. Câu trả lời mặc định ẩn, expand khi người dùng click
  vào câu hỏi tương ứng.
- **FR-006**: Mỗi module PHẢI có nội dung riêng biệt, phù hợp với khái niệm C cụ thể
  của module đó (không dùng nội dung chung/placeholder).
- **FR-007**: Bố cục trang module PHẢI hoạt động đúng trên màn hình ≥ 375 px, không vỡ
  layout khi block code hay sơ đồ có kích thước lớn.
- **FR-008**: Codebase PHẢI tuân thủ FSD — mỗi module content nằm trong feature slice
  tương ứng, không có cross-feature imports.
- **FR-009**: Toàn bộ code mới PHẢI pass Biome lint/format với zero errors.
- **FR-010**: Không được có TypeScript `any` type trong code mới.

### Non-Functional Requirements

- **NFR-001**: Thời gian tải trang module (sau khi app đã load) PHẢI dưới 500 ms trên
  kết nối broadband thông thường.
- **NFR-002**: Sơ đồ luồng PHẢI render hoàn chỉnh trong vòng 1 giây sau khi trang hiển thị.
- **NFR-003**: Toàn bộ nội dung văn bản PHẢI đạt WCAG 2.1 AA về độ tương phản màu sắc.

---

## Success Criteria *(mandatory)*

- **SC-001**: Cả 10 module đều hiển thị đủ 4 phần — có thể kiểm tra bằng cách mở từng module
  và xác nhận 4 tiêu đề phần hiện diện.
- **SC-002**: Người dùng mới (không biết C) có thể đọc phần Giải thích của bất kỳ module nào
  và hiểu được khái niệm cơ bản mà không cần tra cứu thêm.
- **SC-003**: Block code C hiển thị đúng highlight cú pháp, nội dung có thể chọn và sao chép
  bằng cách bôi đen thủ công. Không yêu cầu nút Copy.
- **SC-004**: Sơ đồ luồng hiển thị skeleton khi đang tải, hiển thị đúng sơ đồ sau khi
  render xong, và hiển thị thông báo lỗi tiếng Việt nếu render thất bại — không làm
  vỡ layout trên màn hình từ 375 px trở lên.
- **SC-005**: Phần Hỏi & Đáp có ít nhất 3 câu hỏi/trả lời cho mỗi module.
- **SC-006**: Toàn bộ text giải thích và FAQ bằng tiếng Việt; toàn bộ code bằng tiếng Anh.
- **SC-007**: Biome check trả về zero errors/warnings trên toàn bộ code mới.

---

## Key Entities *(optional — include when data structures matter)*

### ModuleContent

Cấu trúc nội dung của mỗi module:

| Field | Description |
|---|---|
| `explanation` | Phần giải thích: Là gì / Khi nào dùng / Dùng như thế nào (tiếng Việt) |
| `codeExample` | Đoạn code C ví dụ (tiếng Anh) |
| `flowDiagram` | Chuỗi Mermaid DSL (ví dụ: `"flowchart TD\n A-->B"`) — hard-coded trong source, render bằng thư viện Mermaid |
| `faq` | Danh sách câu hỏi thường gặp và câu trả lời (tiếng Việt) |

### FAQ Item

| Field | Description |
|---|---|
| `question` | Câu hỏi ngắn gọn bằng tiếng Việt |
| `answer` | Câu trả lời giải thích rõ ràng bằng tiếng Việt |

---

## Scope

### In Scope

- Nội dung cho cả 10 module: Cú pháp C cơ bản, Kiểu dữ liệu, Nhập & Xuất dữ liệu, Hàm,
  Câu lệnh If, Vòng lặp For, Mảng, Chuỗi ký tự, Xử lý tệp tin, Ví dụ.
  Module "Ví dụ" trình bày một chương trình C hoàn chỉnh tổng hợp nhiều khái niệm đã
  học (nhập dữ liệu, xử lý, xuất kết quả) — không giải thích khái niệm đơn lẻ.
- 4 phần nội dung cho mỗi module (Giải thích, Ví dụ code, Sơ đồ luồng, Hỏi & Đáp).
- Highlight cú pháp cho code C trong block code.
- Sơ đồ luồng thực thi cho từng ví dụ code.
- Nội dung hoàn toàn tĩnh (static) — không có editor tương tác hay chạy code trực tiếp.

### Out of Scope

- Live code editor / chạy code C trong trình duyệt.
- Bài tập / quiz tương tác.
- Lưu tiến độ học của người dùng.
- Nội dung nâng cao (pointer nâng cao, memory management, structs, v.v.) ngoài 10 module đã định.
- Đa ngôn ngữ động (i18n framework) — ngôn ngữ được hard-code.

---

## Dependencies & Assumptions

### Dependencies

- Phase 1 (spec 001) đã hoàn thành: sidebar, routing, và FSD structure hoạt động.
- Một npm package để render block code với syntax highlighting (ví dụ: `react-syntax-highlighter`
  hoặc tương đương) — lựa chọn cụ thể được quyết định trong phase planning.
- npm package **Mermaid** để render sơ đồ luồng từ Mermaid DSL string.

### Assumptions

- Nội dung module là hoàn toàn tĩnh (hard-coded trong source), không cần CMS hay API.
- Một ví dụ code đơn giản là đủ cho mỗi module trong Phase 2 (không cần nhiều ví dụ).
- Sơ đồ luồng thể hiện luồng thực thi của ví dụ code cụ thể đó, không phải toàn bộ
  khái niệm.
- FAQ có thể được hard-coded vào component; không cần quản lý động.
- Không cần dark/light mode toggle trong Phase 2 (kế thừa theme từ Phase 1).
- Cấu trúc FSD được giữ nguyên: mỗi feature slice chứa nội dung của module đó.

---

## Clarifications

### Session 2026-04-18

- Q: Phần `flowDiagram` trong `ModuleContent` nên lưu trữ dữ liệu ở định dạng nào? → A: Mermaid DSL string
- Q: Phần Hỏi & Đáp nên hiển thị theo kiểu nào? → A: Câu hỏi luôn hiển thị, câu trả lời mặc định ẩn và có thể expand khi click
- Q: Khi sơ đồ Mermaid đang tải hoặc gặp lỗi render, ứng dụng nên phản ứng như thế nào? → A: Skeleton loading khi đang tải, fallback text tiếng Việt khi lỗi render
- Q: Block code có cần nút "Copy" (copy to clipboard) không? → A: Không cần nút Copy — chọn text thủ công là đủ
- Q: Module "Ví dụ" (Examples) nên chứa nội dung gì? → A: Chương trình C hoàn chỉnh tổng hợp nhiều khái niệm đã học (nhập dữ liệu, xử lý, xuất kết quả)
