/* EN <-> VI switch. English is the source text in the HTML; Vietnamese is looked up by exact text. */
(function () {
  var VI = {
    "Skip to content": "Chuyển đến nội dung",
    "Live cursors": "Con trỏ trực tiếp",
    "Replay build": "Xem lại quá trình dựng",
    "Versions": "Phiên bản",
    "Growth": "Phát triển",
    "My version history": "Lịch sử phiên bản của tôi",
    "I upgrade myself like a product: a new major version every year or two. Here is the changelog.": "Tôi nâng cấp bản thân như một sản phẩm: mỗi một đến hai năm lại có một phiên bản lớn. Đây là changelog của tôi.",
    "Manual QC": "QC thủ công",
    "2022 – 2024": "2022 – 2024",
    "Shipped": "Đã phát hành",
    "Latest": "Mới nhất",
    "Foundation: understand the product and test it by hand.": "Nền tảng: hiểu sản phẩm và tự tay kiểm thử.",
    "What's new": "Có gì mới",
    "100% manual testing: test planning, test case design, execution and regression.": "100% kiểm thử thủ công: lập kế hoạch test, thiết kế test case, thực thi và regression.",
    "Sprint demos to international clients and clear bug reports every sprint.": "Demo sprint cho khách hàng quốc tế và báo cáo lỗi rõ ràng mỗi sprint.",
    "Worked in Scrum teams that shrank from 13 people to 3, so I learned to own quality end to end.": "Làm việc trong các đội Scrum thu nhỏ từ 13 người xuống 3 người, nên học cách chịu trách nhiệm chất lượng từ đầu đến cuối.",
    "Test Automation": "Automation testing",
    "2024 – 2025": "2024 – 2025",
    "Start automating what repeats.": "Bắt đầu tự động hóa những việc lặp lại.",
    "Started test automation with Cypress and Playwright.": "Bắt đầu automation testing với Cypress và Playwright.",
    "Automated key regression flows and cut manual regression time by about 40%.": "Tự động hóa các luồng regression chính, giảm khoảng 40% thời gian regression thủ công.",
    "2025: joined AT Crew to help teams across the company adopt automation, and supported the GRIDSZ Data team with Cypress.": "2025: tham gia AT Crew giúp các đội trong công ty áp dụng automation, và hỗ trợ đội GRIDSZ Data với Cypress.",
    "AI-augmented QC": "QC tăng cường AI",
    "2025 – Present": "2025 – Nay",
    "Let AI work at every step of QC.": "Để AI hỗ trợ ở mọi bước của QC.",
    "Applying AI at every step of the QC workflow: requirement analysis, test design, exploration, automation scripts and reporting.": "Áp dụng AI ở mọi bước của quy trình QC: phân tích yêu cầu, thiết kế test, khám phá, viết script automation và báo cáo.",
    "Built a custom agent that generates test cases from Jira/Confluence via Atlassian MCP, and use Playwright MCP for exploratory testing and script generation.": "Xây dựng custom agent sinh test case từ Jira/Confluence qua Atlassian MCP, và dùng Playwright MCP cho kiểm thử khám phá và sinh script.",
    "Test AI-built products (IDEA team with Claude and Spec Kit) and judge the effectiveness of AI output on the drawing-processing solution.": "Kiểm thử sản phẩm xây bằng AI (đội IDEA với Claude và Spec Kit) và đánh giá hiệu quả kết quả AI của giải pháp xử lý bản vẽ.",
    "Drag or use the arrows": "Kéo hoặc dùng mũi tên",
    "Read article": "Đọc bài viết",
    "Open to remote & international opportunities": "Sẵn sàng làm việc từ xa & cơ hội quốc tế",
    "Nha Trang, Vietnam · UTC+7": "Nha Trang, Việt Nam · UTC+7",
    "QC Engineer": "QC Engineer",
    "About": "Giới thiệu",
    "Expertise": "Chuyên môn",
    "Work & Experience": "Dự án & Kinh nghiệm",
    "Writing": "Bài viết",
    "Contact": "Liên hệ",
    "Manual · Automation · AI-assisted QA": "Thủ công · Automation · QA hỗ trợ bởi AI",
    "QC Engineer building": "QC Engineer xây dựng",
    "reliable software": "phần mềm đáng tin cậy",
    "through smart testing.": "bằng kiểm thử thông minh.",
    "Nearly 5 years across manual testing, Cypress/Playwright automation, API testing and AI-assisted QA. I help teams catch defects earlier, shorten regression cycles and ship with confidence.": "Gần 5 năm kinh nghiệm kiểm thử thủ công, automation Cypress/Playwright, kiểm thử API và QA hỗ trợ bởi AI. Tôi giúp đội ngũ phát hiện lỗi sớm hơn, rút ngắn chu kỳ regression và phát hành tự tin.",
    "View my work": "Xem dự án của tôi",
    "Get in touch": "Liên hệ với tôi",
    "Download CV": "Tải CV",
    "yrs": "năm",
    "Hands-on QA experience": "Kinh nghiệm QA thực tế",
    "Less manual regression effort via automation": "Giảm công sức regression thủ công nhờ automation",
    "Testing disciplines: manual, UI, API, performance": "Mảng kiểm thử: thủ công, UI, API, hiệu năng",
    "Technical articles on QA & AI testing": "Bài viết kỹ thuật về QA & kiểm thử AI",
    "Exploratory Testing": "Kiểm thử khám phá",
    "Regression": "Regression",
    "API Testing": "Kiểm thử API",
    "Quality is a team habit, not a final phase.": "Chất lượng là thói quen của cả đội, không phải bước cuối cùng.",
    "I'm a Junior QC Engineer at Infodation, working on complex multi-platform products. I design test strategies, write detailed test cases, automate critical business flows and mentor junior testers.": "Tôi là Junior QC Engineer tại Infodation, làm việc với các sản phẩm đa nền tảng phức tạp. Tôi xây dựng chiến lược kiểm thử, viết test case chi tiết, tự động hóa các luồng nghiệp vụ quan trọng và hướng dẫn các bạn tester mới.",
    "Lately I focus on": "Gần đây tôi tập trung vào",
    "AI-assisted testing": "kiểm thử hỗ trợ bởi AI",
    ": using Playwright MCP, custom agents and Atlassian MCP to speed up exploratory testing, script generation and test case design, while keeping a human in the loop for judgement.": ": dùng Playwright MCP, custom agent và Atlassian MCP để tăng tốc kiểm thử khám phá, sinh script và thiết kế test case, đồng thời luôn có con người kiểm soát và đưa ra phán đoán.",
    "Outside work I play football and badminton, which keep me sharp on teamwork and quick decisions.": "Ngoài giờ làm, tôi chơi bóng đá và cầu lông, giúp tôi rèn tinh thần đồng đội và khả năng ra quyết định nhanh.",
    "Role": "Vai trò",
    "Junior QC Engineer": "Junior QC Engineer",
    "Company": "Công ty",
    "Location": "Địa điểm",
    "Nha Trang, Vietnam (UTC+7)": "Nha Trang, Việt Nam (UTC+7)",
    "Education": "Học vấn",
    "B.Sc. Information Technology, Nha Trang University": "Cử nhân Công nghệ thông tin, Đại học Nha Trang",
    "Languages": "Ngôn ngữ",
    "Vietnamese (native), English (professional)": "Tiếng Việt (bản ngữ), tiếng Anh (chuyên môn)",
    "Availability": "Sẵn sàng",
    "Open to remote roles": "Mở cho vị trí làm từ xa",
    "What I bring to a team": "Tôi mang gì đến đội ngũ",
    "A full-stack QA toolkit, from requirement analysis to automated regression and AI-powered workflows.": "Bộ công cụ QA toàn diện, từ phân tích yêu cầu đến regression tự động và quy trình có AI hỗ trợ.",
    "Manual & Exploratory Testing": "Kiểm thử thủ công & khám phá",
    "Test planning, estimation, test design (EP, BVA, decision tables), functional, UAT and exploratory testing.": "Lập kế hoạch test, ước lượng, thiết kế test (EP, BVA, bảng quyết định), kiểm thử chức năng, UAT và kiểm thử khám phá.",
    "Test Design": "Thiết kế test",
    "Exploratory": "Khám phá",
    "UI Test Automation": "Automation kiểm thử UI",
    "Maintainable E2E suites for key business flows that cut manual regression time.": "Bộ test E2E dễ bảo trì cho các luồng nghiệp vụ chính, giúp giảm thời gian regression thủ công.",
    "API & Performance Testing": "Kiểm thử API & hiệu năng",
    "REST API validation with collection runs and environment management; load testing for critical endpoints.": "Kiểm tra REST API bằng collection và quản lý môi trường; kiểm thử tải cho các endpoint quan trọng.",
    "AI-Assisted Testing": "Kiểm thử hỗ trợ bởi AI",
    "Using MCP servers and custom agents to generate test cases, explore applications and self-heal scripts.": "Dùng MCP server và custom agent để sinh test case, khám phá ứng dụng và tự sửa script.",
    "Custom Agents": "Custom Agent",
    "Leadership & Mentoring": "Dẫn dắt & hướng dẫn",
    "Peer reviews and guidance for junior QC members to keep deliverables consistent and high quality.": "Review chéo và hướng dẫn các thành viên QC mới để sản phẩm bàn giao nhất quán và chất lượng.",
    "Code & Test Review": "Review code & test",
    "Onboarding": "Hướng dẫn người mới",
    "Collaboration": "Phối hợp",
    "Close work with developers, POs and clients; clear bug reports and honest quality status.": "Làm việc sát với dev, PO và khách hàng; báo cáo lỗi rõ ràng và trạng thái chất lượng trung thực.",
    "Agile / Scrum": "Agile / Scrum",
    "Bug Reporting": "Báo cáo lỗi",
    "Analytical Thinking": "Tư duy phân tích",
    "Where I've worked": "Nơi tôi đã làm việc",
    "The products and teams I've helped ship, grouped by company. Currently at Infodation, working on 3 projects in parallel.": "Các sản phẩm và đội nhóm tôi đã cùng phát hành, nhóm theo công ty. Hiện tại ở Infodation, làm song song 3 dự án.",
    "Current employer": "Công ty hiện tại",
    "Junior QC Engineer · Feb 2022 – Present ·": "Junior QC Engineer · 02/2022 – Nay ·",
    "Nha Trang, Vietnam · Software & AI solutions for international clients": "Nha Trang, Việt Nam · Giải pháp phần mềm & AI cho khách hàng quốc tế",
    "projects & teams": "dự án & đội nhóm",
    "European client markets": "thị trường khách hàng châu Âu",
    "active right now": "đang chạy",
    "Oct 2026 – Present": "10/2026 – Nay",
    "Active": "Đang chạy",
    "QC · AI drawing-processing solution": "QC · Giải pháp AI xử lý bản vẽ",
    "AI tool that scans and processes engineering drawings for a client": "Công cụ AI quét và xử lý bản vẽ kỹ thuật cho khách hàng",
    "Responsible for the tool's effectiveness: does the AI output genuinely save the client's team time?": "Chịu trách nhiệm về hiệu quả của công cụ: kết quả AI có thực sự giúp đội của khách hàng tiết kiệm thời gian?",
    "Evaluates accuracy and usefulness of AI output, not just functional correctness.": "Đánh giá độ chính xác và tính hữu ích của kết quả AI, không chỉ tính đúng đắn về chức năng.",
    "AI Quality": "Chất lượng AI",
    "Effectiveness Testing": "Kiểm thử hiệu quả",
    "Aug – Oct 2026": "08 – 10/2026",
    "QC · IDEA team (Infodation Enterprise Application)": "QC · Đội IDEA (Infodation Enterprise Application)",
    "Internal tools for company staff, built 100% with AI": "Công cụ nội bộ cho nhân viên công ty, xây dựng 100% bằng AI",
    "Worked in an AI-first delivery flow: apps created with Claude and Spec Kit.": "Làm việc theo quy trình ưu tiên AI: ứng dụng được tạo bằng Claude và Spec Kit.",
    "Tested with AI assistance and built Playwright automation for the new apps.": "Kiểm thử có AI hỗ trợ và xây dựng automation Playwright cho các ứng dụng mới.",
    "Apr 2025 – Jul 2026": "04/2025 – 07/2026",
    "QC · AT Crew (automation enablement)": "QC · AT Crew (thúc đẩy automation)",
    "3 QC members and a management lead": "3 thành viên QC và 1 quản lý",
    "Formed when the company began rolling out automation testing across all teams.": "Thành lập khi công ty bắt đầu triển khai automation testing cho toàn bộ các đội.",
    "Guided and onboarded teams, and resolved the practical obstacles of applying automation.": "Hướng dẫn, tiếp nhận các đội và giải quyết khó khăn thực tế khi áp dụng automation.",
    "Jul – Sep 2025: embedded with the GRIDSZ Data team to support Cypress automation while they struggled to adopt it.": "07 – 09/2025: hỗ trợ trực tiếp đội GRIDSZ Data triển khai automation Cypress khi họ gặp khó khăn trong việc áp dụng.",
    "Automation Strategy": "Chiến lược automation",
    "Coaching": "Kèm cặp",
    "Oct 2023 – Present": "10/2023 – Nay",
    "QC · Belgian internet-connection management platform": "QC · Nền tảng quản lý kết nối internet (Bỉ)",
    "Team of 2 DEV + 1 QC · Belgium": "Đội 2 DEV + 1 QC · Bỉ",
    "Platform that manages and tracks the rollout of internet connections to households.": "Nền tảng quản lý và theo dõi tiến độ lắp đặt kết nối internet đến từng hộ gia đình.",
    "Same scope as the Dutch platform with a much smaller team: owns testing end to end and sprint demos for the client.": "Phạm vi như nền tảng Hà Lan nhưng đội nhỏ hơn nhiều: phụ trách kiểm thử toàn bộ và demo sprint cho khách hàng.",
    "Manual": "Thủ công",
    "Sprint Demo": "Demo sprint",
    "Small-team QA": "QA đội nhỏ",
    "Feb 2022 – Present": "02/2022 – Nay",
    "Maintenance": "Bảo trì",
    "QC · Dutch internet-connection management platform": "QC · Nền tảng quản lý kết nối internet (Hà Lan)",
    "Team scaled from 10 DEV + 3 QC down to 2 DEV + 1 QC · Netherlands": "Đội thu gọn từ 10 DEV + 3 QC xuống 2 DEV + 1 QC · Hà Lan",
    "Test planning, test case design and execution for every sprint; demo to the client every 2 weeks.": "Lập kế hoạch test, thiết kế và thực thi test case mỗi sprint; demo cho khách hàng 2 tuần một lần.",
    "Stayed through the product's growth into its maintenance phase, keeping releases stable with a shrinking team.": "Đồng hành cùng sản phẩm từ giai đoạn phát triển đến bảo trì, giữ các bản phát hành ổn định khi đội ngày càng nhỏ lại.",
    "B.Sc. in Information Technology": "Cử nhân Công nghệ thông tin",
    "Nha Trang University · Khanh Hoa, Vietnam": "Đại học Nha Trang · Khánh Hòa, Việt Nam",
    "Want the deeper dives? Read my": "Muốn xem sâu hơn? Hãy đọc",
    "articles on AI-assisted testing and automation": "các bài viết về kiểm thử hỗ trợ bởi AI và automation",
    "How I work": "Cách tôi làm việc",
    "A repeatable quality process": "Quy trình chất lượng lặp lại được",
    "Consistent steps, adapted to each team's size and delivery cadence.": "Các bước nhất quán, điều chỉnh theo quy mô và nhịp phát hành của từng đội.",
    "Analyse": "Phân tích",
    "Review requirements, flag ambiguity and risks early.": "Xem xét yêu cầu, chỉ ra điểm mơ hồ và rủi ro từ sớm.",
    "Plan": "Lập kế hoạch",
    "Test strategy, scope and estimation.": "Chiến lược test, phạm vi và ước lượng.",
    "Design": "Thiết kế",
    "Traceable test cases with EP, BVA and decision tables.": "Test case truy vết được với EP, BVA và bảng quyết định.",
    "Execute & Automate": "Thực thi & Automation",
    "Manual, exploratory and automated runs.": "Chạy test thủ công, khám phá và tự động.",
    "Report": "Báo cáo",
    "Clear defects and honest release-readiness status.": "Lỗi rõ ràng và trạng thái sẵn sàng phát hành trung thực.",
    "Technical articles": "Bài viết kỹ thuật",
    "Practical notes on test automation and AI-assisted QA.": "Ghi chép thực tế về automation testing và QA hỗ trợ bởi AI.",
    "AI Testing": "Kiểm thử AI",
    "Quality Solutions": "Giải pháp chất lượng",
    "Automation": "Automation",
    "Beyond testing": "Ngoài công việc kiểm thử",
    "Life · Aug 2025": "Đời sống · 08/2025",
    "VnExpress Marathon Nha Trang 2025": "VnExpress Marathon Nha Trang 2025",
    "Story coming soon": "Câu chuyện sắp ra mắt",
    "Life · Dec 2025": "Đời sống · 12/2025",
    "Small Liquor Store Owner": "Chủ tiệm rượu nhỏ",
    "All articles": "Tất cả bài viết",
    "Let's build quality together": "Cùng xây dựng chất lượng nhé",
    "Hiring for a QA / QC role or need help with test automation? I'd be glad to talk.": "Bạn đang tuyển vị trí QA / QC hoặc cần hỗ trợ automation testing? Rất vui được trao đổi.",
    "Name": "Tên",
    "Email": "Email",
    "Message": "Tin nhắn",
    "Send message": "Gửi tin nhắn",
    "© 2026 Phuc Tan Dinh · QC Engineer · Nha Trang, Vietnam": "© 2026 Phuc Tan Dinh · QC Engineer · Nha Trang, Việt Nam",
    "Articles & stories": "Bài viết & câu chuyện",
    "Practical notes on test automation and AI-assisted QA, plus a few stories from life outside work.": "Ghi chép thực tế về automation testing và QA hỗ trợ bởi AI, cùng vài câu chuyện đời sống ngoài công việc.",
    "All": "Tất cả",
    "QC & Tech": "QC & Công nghệ",
    "Life": "Đời sống",
    "AI Testing · Dec 2025": "Kiểm thử AI · 12/2025",
    "Quality Solutions · Apr 2026": "Giải pháp chất lượng · 04/2026",
    "Automation · Apr 2026": "Automation · 04/2026",
    "Automation · Dec 2025": "Automation · 12/2025",
    "Quality Solutions · Nov 2025": "Giải pháp chất lượng · 11/2025"
  };
  var VI_WORDS = 'phần mềm đáng tin cậy|bản phát hành nhanh hơn|những lần ra mắt tự tin|chất lượng ở tốc độ cao';
  var VI_FORM = { 'data-err-required': 'Vui lòng điền đầy đủ các ô.', 'data-sending': 'Đang gửi...', 'data-ok': 'Cảm ơn bạn! Tin nhắn đã được gửi.', 'data-fail': 'Không gửi được. Vui lòng email trực tiếp cho tôi.' };

  var originals = new Map();   // text node -> original string
  var origWords = null, origForm = {};
  var lang = 'en';

  function norm(t) { return t.replace(/\s+/g, ' ').trim(); }

  function walk(toVi) {
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode && n.parentNode.nodeName;
        return (p === 'SCRIPT' || p === 'STYLE' || !n.nodeValue.trim()) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    var n, nodes = [];
    while ((n = w.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      if (toVi) {
        var key = norm(node.nodeValue), vi = VI[key];
        if (vi === undefined) return;
        if (!originals.has(node)) originals.set(node, node.nodeValue);
        var m = node.nodeValue.match(/^(\s*)[\s\S]*?(\s*)$/);
        node.nodeValue = m[1] + vi + m[2];
      } else if (originals.has(node)) {
        node.nodeValue = originals.get(node);
        originals.delete(node);
      }
    });
  }

  function tenure() {
    document.querySelectorAll('[data-since]').forEach(function (el) {
      var p = el.getAttribute('data-since').split('-'), now = new Date();
      var m = (now.getFullYear() - +p[0]) * 12 + (now.getMonth() + 1 - +p[1]);
      if (m < 1) return;
      var y = Math.floor(m / 12), r = m % 12, out = [];
      if (lang === 'vi') { if (y) out.push(y + ' năm'); if (r) out.push(r + ' tháng'); }
      else { if (y) out.push(y + (y > 1 ? ' yrs' : ' yr')); if (r) out.push(r + (r > 1 ? ' mos' : ' mo')); }
      el.textContent = out.join(' ');
    });
  }

  function apply(next) {
    var toVi = next === 'vi';
    if (next === lang && originals.size === 0 && !toVi) { sync(); return; }
    lang = next;
    walk(toVi);
    var rot = document.querySelector('.rotator');
    if (rot) {
      if (origWords === null) origWords = rot.getAttribute('data-words');
      rot.setAttribute('data-words', toVi ? VI_WORDS : origWords);
      rot.textContent = rot.getAttribute('data-words').split('|')[0];
    }
    var form = document.getElementById('contactForm');
    if (form) Object.keys(VI_FORM).forEach(function (k) {
      if (!(k in origForm)) origForm[k] = form.getAttribute(k);
      if (toVi) form.setAttribute(k, VI_FORM[k]); else if (origForm[k] === null) form.removeAttribute(k); else form.setAttribute(k, origForm[k]);
    });
    document.documentElement.setAttribute('lang', toVi ? 'vi' : 'en');
    tenure();
    sync();
    try { localStorage.setItem('lang', next); } catch (e) {}
  }

  function sync() {
    var btn = document.getElementById('langBtn');
    if (btn) { btn.textContent = lang === 'vi' ? 'EN' : 'VI'; btn.setAttribute('aria-label', lang === 'vi' ? 'Switch to English' : 'Chuyển sang tiếng Việt'); }
  }

  var btn = document.getElementById('langBtn');
  if (btn) btn.addEventListener('click', function () { apply(lang === 'vi' ? 'en' : 'vi'); });

  var q = null, saved = null;
  try { q = new URLSearchParams(location.search).get('lang'); saved = localStorage.getItem('lang'); } catch (e) {}
  var start = q || saved;
  if (start === 'vi') apply('vi'); else sync();
})();
