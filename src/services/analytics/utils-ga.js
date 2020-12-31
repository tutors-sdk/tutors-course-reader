export function initGa(id) {
  const script = document.createElement("script");
  script.text =
    "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){" +
    "(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o)," +
    "m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)" +
    "})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');";
  document.querySelector("body").appendChild(script);

  window.ga =
    window.ga ||
    function () {
      (ga.q = ga.q || []).push(arguments);
    };
  ga.l = +new Date();
  ga("create", id, "auto");
}

export function track(pageValue, titleValue) {
  ga("set", {
    page: pageValue,
    title: titleValue,
  });
  ga("send", "pageview");
}

export function initGTag(id) {
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + id;
  document.querySelector("body").appendChild(script);
  window.dataLayer = window.dataLayer || [];

  function gtag() {
    dataLayer.push(arguments);
  }

  gtag("js", new Date());

  gtag("config", id);
  // gtag('config', id, { 'send_page_view': false });
}

export function trackTag(id, pageValue, titleValue, userId) {
  window.dataLayer = window.dataLayer || [];

  function gtag() {
    dataLayer.push(arguments);
  }

  if (userId == "") {
    gtag("config", id, {
      page_title: titleValue,
      page_path: pageValue,
    });
  } else {
    gtag("config", id, {
      page_title: titleValue,
      page_path: pageValue,
      user_id: userId,
    });
  }
}

export function trackEvent(id, course, path, lo, userId) {
  window.dataLayer = window.dataLayer || [];

  function gtag() {
    dataLayer.push(arguments);
  }

  if (userId == "") {
    gtag("event", lo.type, {
      event_category: course,
      event_action: path,
      event_label: lo.title,
    });
  } else {
    gtag("event", lo.type, {
      event_category: course,
      event_action: path,
      event_label: lo.title,
      user_id: userId,
    });
  }
}
