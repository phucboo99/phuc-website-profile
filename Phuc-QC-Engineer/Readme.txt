PHUC TAN DINH - QC ENGINEER PORTFOLIO
=====================================
Website cá nhân của Phuc Tan Dinh (QC Engineer). Trang web tĩnh (HTML/CSS/JS thuần), không cần build.
Tên miền: https://phucgotest.online

XEM THỬ TRÊN MÁY
- Mở Phuc-QC-Engineer/index.html bằng trình duyệt, hoặc dùng Live Server của VS Code.
- Thử dark mode:  index.html?theme=dark     Thử tiếng Việt:  index.html?lang=vi
- Sau khi sửa CSS/JS mà trình duyệt vẫn hiện bản cũ: bấm Ctrl + F5, và tăng số trong "?v=..."
  ở các thẻ <link>/<script> (xem mục "Cache" bên dưới).


CẤU TRÚC THƯ MỤC
index.html            Trang chủ
blog.html             Danh sách bài viết (lọc: All / QC & Tech / Life)
*.html (5 bài)        Các bài viết kỹ thuật (how-to-..., custom-agent-..., self-healing-..., exploration-...)
robots.txt, sitemap.xml   Cho Google (nhớ thêm trang mới vào sitemap.xml)

assets/css/shell.css      Màu, thanh trên cùng (top bar + menu) và footer dùng chung cho mọi trang
assets/css/portfolio.css  Giao diện trang chủ + trang blog (thẻ, banner, hiệu ứng, dark mode...)
assets/css/articles.css   Chỉnh riêng cho 5 bài viết + dark mode của bài viết
assets/css/main.css       CSS cũ của template, chỉ còn dùng cho 5 bài viết
assets/js/portfolio.js    Hiệu ứng, banner tự chạy, form liên hệ, nút dark mode, thời gian làm việc
assets/js/i18n.js         Bản dịch tiếng Việt (nút VI/EN)
assets/js/theme.js        Nút dark mode cho 5 bài viết
assets/Phuc-Tan-Dinh-CV.pdf   File CV cho nút Download CV
assets/img/               Ảnh (Blog/, Skill/, ảnh cá nhân...)


CÁCH CẬP NHẬT NỘI DUNG (trong index.html)
1) Dự án / Kinh nghiệm   - mục id="work". Mỗi dự án là một <li> trong <ol class="timeline">.
                           Công ty mới: copy khối <div class="employer"> (có mẫu trong comment) và đặt công ty mới nhất lên trên.
                           Thẻ công cụ dùng class "tool t-<tên>" để có màu thương hiệu (Postman, Cypress...).
2) Phiên bản bản thân   - mục id="versions": mỗi năm copy mẫu trong comment để thêm v4.0, v5.0...; bỏ class "latest" ở thẻ cũ.
3) Banner bài viết       - mỗi bài là một <article class="slide"> trong <div class="banner">; chấm điều hướng tự sinh.
                           Banner "Beyond testing" dùng kiểu "banner photo" (nền tối, ảnh nghiêng).
4) Số liệu, About, Skills - sửa trực tiếp trong index.html (hero, mục id="about", id="expertise").
5) CV                    - thay file assets/Phuc-Tan-Dinh-CV.pdf (giữ nguyên tên, không cần sửa code).
6) Bài viết mới          - copy một bài hiện có, sửa nội dung, thêm card vào blog.html + slide vào banner (index.html) + sitemap.xml.


NHỮNG THỨ NẰM Ở NHIỀU TRANG (phải sửa ở cả 7 trang)
Menu/top bar và footer được viết lặp lại trong: index.html, blog.html và 5 bài viết.
Khi đổi link mạng xã hội, email hay mục menu, hãy tìm và sửa ở cả 7 file.
- LinkedIn và TikTok hiện đang là link tạm (trang chủ của hai nền tảng): tìm "linkedin.com" và "tiktok.com" rồi thay link cá nhân.
- Facebook:  https://www.facebook.com/phuc.boo.99/    Instagram: https://www.instagram.com/boosunofmemories/
- Trang chủ còn một hàng icon mạng xã hội nữa trong mục Contact.


LIVE CURSORS & CHẾ ĐỘ "XEM TRANG ĐƯỢC DỰNG" (assets/js/live-cursors.js + live-cursors.css)
- Các con trỏ nhiều màu là MÔ PHỎNG (không phải người xem thật). Tên, màu, câu thoại, nhiệm vụ của từng con nằm ở đầu file JS (mảng PEOPLE).
- Lần đầu vào trang trong một phiên (sessionStorage "lcBuilt"), trang hiện dưới dạng khung phác thảo; các con trỏ kéo khung, nội dung hiện ra
  và trang tự cuộn chậm liên tục (vừa cuộn vừa dựng, từ trên xuống). Cuộn chuột / chạm / bấm phím / bấm chuột hoặc nút "Skip" sẽ hiện toàn bộ ngay.
- Thử lại: nút "Replay build" ở góc dưới trái, hoặc thêm ?build=1 vào địa chỉ. Tắt hẳn chế độ dựng: ?build=0. Nút "Live cursors" bật/tắt tất cả.
- Chỉ chạy trên máy có chuột; tự tắt trên điện thoại và khi máy bật "giảm chuyển động".
- Nhịp dựng chỉnh ở đầu file JS: BLOCK_MS (thời gian mỗi người làm một khối), SCROLL_MIN / SCROLL_MAX (tốc độ cuộn chậm nhất / nhanh nhất), FRONTIER_Y (vị trí phần đang dựng trên màn hình).
- Mỗi người chỉ nhận loại khối hợp vai trò (Copywriter gõ vài chữ đầu của ô chữ rồi nội dung thật hiện ra; Photo cắt ảnh; ...). Header cũng được dựng.
- Danh sách khối được "dựng" là hằng BLOCKS trong JS; thêm class vào đó nếu muốn một phần tử mới cũng được dựng.

FORM LIÊN HỆ
- Dùng Formspree: thuộc tính action của <form id="contactForm"> trong index.html (https://formspree.io/f/xqppdzky).
- Lần gửi đầu tiên Formspree sẽ gửi email xác nhận, cần bấm vào link trong email đó để kích hoạt.
- Nếu action vẫn chứa YOUR_FORM_ID thì form sẽ mở ứng dụng email của người xem thay vì gửi.


NGÔN NGỮ (EN / VI)
- Trang chủ và trang blog viết bằng tiếng Anh; nút VI/EN dịch bằng bảng trong assets/js/i18n.js.
- Bảng dịch tra theo ĐÚNG câu tiếng Anh. Khi sửa hoặc thêm chữ mới trong HTML, cần sửa/thêm dòng tương ứng
  trong i18n.js, nếu không chữ đó sẽ giữ tiếng Anh ở bản tiếng Việt.
- 5 bài viết chỉ có tiếng Anh.


DARK MODE
- Nút mặt trăng/mặt trời ở thanh trên cùng, lựa chọn được lưu trong localStorage; mặc định theo cài đặt của máy.
- Biến màu nằm trong assets/css/shell.css (và dark mode của bài viết trong articles.css).


CACHE (tránh trình duyệt dùng bản cũ)
Các file CSS/JS trong HTML có dạng  assets/css/portfolio.css?v=20261102.
Sau mỗi lần sửa CSS/JS, hãy đổi số phiên bản này ở các trang để người xem tải bản mới.


GIT / ĐĂNG BÀI
- Nhánh làm việc: dinhtanphuc-patch-1  ->  gửi Pull Request vào main.
- File .pdf được đặt là nhị phân (.gitattributes) để git không làm hỏng CV khi đổi dấu xuống dòng.


GHI CÔNG
Giao diện gốc dựa trên template iBlog / iPortfolio của BootstrapMade.com (https://bootstrapmade.com/license/).
Phần giao diện hiện tại (trang chủ, banner, lịch sử phiên bản, đa ngôn ngữ, dark mode...) đã được thiết kế lại cho website này.
