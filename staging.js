(function () {
  "use strict";

  const ROOT_ID = "af-chat-widget-v3";

  // 🔁 Remove any existing instance (prevents stale widget)
  const existing = document.getElementById(ROOT_ID);
  if (existing) existing.remove();

  const widgetHTML = `
  <div id="${ROOT_ID}" style="
    position:fixed;
    bottom:20px;
    right:20px;
    z-index:9999;

    font-family:Arial, sans-serif;
    font-size:14px;
    line-height:1.4;
    font-weight:400;
    color:#555;
    box-sizing:border-box;

    text-size-adjust:none;
    -webkit-text-size-adjust:none;
  ">

    <!-- TOGGLE -->
    <button id="af-chat-toggle" type="button" style="
      all:unset;
      box-sizing:border-box;
      width:60px;
      height:60px;
      border-radius:50%;
      background:#323345;
      color:#fff;
      font-size:28px;
      cursor:pointer;
      box-shadow:0 4px 12px rgba(0,0,0,.2);
      display:flex;
      align-items:center;
      justify-content:center;
    ">💬</button>

    <!-- CHAT BOX -->
    <div id="af-chat-box" style="
      box-sizing:border-box;
      width:320px;
      height:420px;
      background:#fff;
      border-radius:14px;
      box-shadow:0 4px 18px rgba(0,0,0,.15);
      position:absolute;
      bottom:70px;
      right:0;
      display:none;
      overflow:hidden;
    ">

      <!-- HEADER -->
      <div style="
        background:#323345;
        color:#fff;
        padding:10px 20px;
        box-sizing:border-box;
      ">
        <h1 style="
          margin:0;
          font-size:18px;
          font-weight:600;
          letter-spacing:-0.45px;
          line-height:1.2;
        ">
          <img
            src="https://amplifin.co.za/wp-content/uploads/2022/09/Amplifin-Logo.png"
            width="140"
            height="25"
            alt="Amplifin"
            style="
              width:140px !important;
              height:25px !important;
              max-width:none !important;
              max-height:none !important;
              display:block;
              object-fit:contain;
            "
          >
        </h1>
        <p style="
          margin:0;
          font-size:14px;
          line-height:14px;
        ">How can we Amplify your day?</p>
      </div>

      <!-- MESSAGES -->
      <div id="af-chat-messages" style="
        padding:20px;
        height:300px;
        overflow-y:auto;
        box-sizing:border-box;
      ">

        <!-- INTRO -->
        <div style="display:flex;align-items:flex-start;">
          <img
            src="https://amplifin.co.za/wp-content/uploads/2025/07/Amplifin-Yellow-N-20px.png"
            width="25"
            height="25"
            alt=""
            style="
              width:25px !important;
              height:25px !important;
              max-width:none !important;
              max-height:none !important;
              display:block;
              flex-shrink:0;
              object-fit:contain;
              margin:5px;
            "
          >
          <div style="
            background:#f5f5f5;
            padding:10px;
            border-radius:20px;
            max-width:220px;
            box-sizing:border-box;
          ">
            Whether you’re looking for the right collection solution or need quick support, we’re here to help.<br><br>
            Click here to speak with our Support or Sales Team on WhatsApp.
          </div>
        </div>

        <!-- CTA -->
        <div style="
          display:flex;
          justify-content:flex-end;
          gap:6px;
          margin-top:10px;
        ">
          <button id="af-chat-support" type="button" style="
            all:unset;
            box-sizing:border-box;
            border:1px solid #FBC100;
            background:#fff;
            border-radius:15px;
            padding:10px 14px;
            color:#FBC100;
            font-size:14px;
            cursor:pointer;
          ">Support Team</button>

          <button id="af-chat-sales" type="button" style="
            all:unset;
            box-sizing:border-box;
            border:1px solid #FBC100;
            background:#fff;
            border-radius:15px;
            padding:10px 14px;
            color:#FBC100;
            font-size:14px;
            cursor:pointer;
          ">Sales Team</button>
        </div>
      </div>
    </div>
  </div>
  `;

  document.body.insertAdjacentHTML("beforeend", widgetHTML);

  // ---- Logic ----
  const toggle = document.getElementById("af-chat-toggle");
  const box = document.getElementById("af-chat-box");
  const messages = document.getElementById("af-chat-messages");
  const support = document.getElementById("af-chat-support");
  const sales = document.getElementById("af-chat-sales");

  toggle.onclick = () => {
    box.style.display = box.style.display === "none" ? "block" : "none";
  };

  support.onclick = () => {
    window.location = "https://api.whatsapp.com/send/?phone=27675974601";
  };

  sales.onclick = () => {
    fetch("https://chat-widget-test.onrender.com/json")
      .then(r => {
        if (r.status === 400) {
          support.onclick();
          return;
        }

        const msg = document.createElement("div");
        msg.style.marginTop = "10px";
        msg.innerHTML = `
          <div style="display:flex;align-items:flex-start;">
            <img
              src="https://amplifin.zendesk.com/embeddable/avatars/20322948535964"
              width="25"
              height="25"
              alt="Sales"
              style="
                width:25px !important;
                height:25px !important;
                max-width:none !important;
                max-height:none !important;
                display:block;
                flex-shrink:0;
                border-radius:50%;
                margin-right:8px;
              "
            >
            <div style="
              background:#f5f5f5;
              padding:10px;
              border-radius:20px;
              max-width:220px;
              box-sizing:border-box;
            ">
              Hello! This is Jessica from the Sales Team.<br><br>
              I am currently unavailable.<br><br>
              You can chat with our Support Team, who will assist you and ensure that a Sales Consultant
              contacts you as soon as possible.<br><br>
              Alternatively, please click on the button below to schedule a meeting with me.
            </div>
          </div>
        `;

        const wrap = document.createElement("div");
        wrap.style.marginTop = "10px";

        const meet = document.createElement("button");
        meet.textContent = "Schedule a meeting with me";
        meet.style.cssText = `
          all:unset;
          width:100%;
          padding:10px;
          border-radius:15px;
          border:1px solid #FBC100;
          background:#fff;
          color:#FBC100;
          font-size:14px;
          cursor:pointer;
          margin-bottom:6px;
          text-align:center;
        `;
        meet.onclick = () => {
          window.location =
            "https://outlook.office.com/bookwithme/user/aea7a9c95b7a47668988fc5da0f9e845@amplifin.co.za?anonymous";
        };

        const sup = meet.cloneNode(true);
        sup.textContent = "Chat with Support";
        sup.onclick = support.onclick;

        wrap.append(meet, sup);
        messages.append(msg, wrap);
        messages.scrollTop = messages.scrollHeight;
      });
  };
})();
