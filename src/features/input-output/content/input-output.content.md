## Là gì?

Nhập/xuất dữ liệu (I/O) là cơ chế giao tiếp giữa chương trình và người dùng. Trong C, thư viện `<stdio.h>` cung cấp hai hàm chính: `printf()` để xuất dữ liệu ra màn hình, và `scanf()` để đọc dữ liệu từ bàn phím. Cả hai đều dùng chuỗi định dạng (format string) với các ký tự đặc biệt như `%d`, `%f`, `%s`.

## Khi nào dùng?

Dùng `printf()` bất cứ khi nào cần hiển thị thông tin cho người dùng: thông báo, kết quả tính toán, menu lựa chọn. Dùng `scanf()` khi chương trình cần nhận dữ liệu nhập từ người dùng tại thời điểm chạy, thay vì dùng giá trị cố định trong code.

## Dùng như thế nào?

`printf(format, arg1, arg2, ...)` — in các đối số theo chuỗi format. `scanf(format, &var1, &var2, ...)` — đọc dữ liệu vào địa chỉ bộ nhớ của biến (lưu ý dấu `&` bắt buộc, trừ mảng/chuỗi). Luôn kiểm tra giá trị trả về của `scanf()` để phát hiện lỗi nhập liệu.

## Ví dụ code

**Title:** Nhập và xuất thông tin người dùng
**Language:** c

```c
#include <stdio.h>

int main(void) {
    char name[50];
    int age;
    float height;

    printf("Nhap ten: ");
    scanf("%49s", name);

    printf("Nhap tuoi: ");
    scanf("%d", &age);

    printf("Nhap chieu cao (m): ");
    scanf("%f", &height);

    printf("\n--- Thong tin ---\n");
    printf("Ten: %s\n", name);
    printf("Tuoi: %d\n", age);
    printf("Chieu cao: %.2f m\n", height);

    return 0;
}
```

**Output:**

```text
Nhap ten: An
Nhap tuoi: 20
Nhap chieu cao (m): 1.70

--- Thong tin ---
Ten: An
Tuoi: 20
Chieu cao: 1.70 m
```

## Sơ đồ

**Title:** Luồng nhập/xuất dữ liệu

```mermaid
flowchart LR
    A([Người dùng]) -->|"gõ vào bàn phím"| B["scanf()\nđọc vào biến"]
    B --> C["Xử lý\ntrong chương trình"]
    C --> D["printf()\nxuất ra màn hình"]
    D --> E([Màn hình])
```

## Hỏi & Đáp

**Q:** Tại sao scanf() cần dấu & trước tên biến?
scanf() cần biết địa chỉ bộ nhớ của biến để ghi dữ liệu vào đó. Toán tử & lấy địa chỉ của biến. Ngoại lệ: mảng ký tự (char[]) không cần & vì tên mảng đã là con trỏ đến phần tử đầu tiên.

**Q:** Tại sao dùng %49s thay vì %s khi đọc chuỗi?
Giới hạn độ dài ngăn tràn bộ đệm (buffer overflow) — một lỗ hổng bảo mật nghiêm trọng. Nếu mảng name có 50 phần tử, %49s chỉ đọc tối đa 49 ký tự (1 ký tự còn lại cho ký tự kết thúc chuỗi '\0').

**Q:** Sự khác biệt giữa printf và puts?
puts(str) in một chuỗi và tự động thêm ký tự xuống dòng, đơn giản hơn nhưng kém linh hoạt hơn printf. printf hỗ trợ format string với nhiều biến, không tự thêm xuống dòng. Dùng puts khi chỉ cần in một chuỗi đơn giản.
