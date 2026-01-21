(function () {
  "use strict";

  const NS = "af-chat";
  const id = (v) => `${NS}-${v}`;

  const widgetHTML = `
  <div id="${id("root")}" style="
    position:fixed;
    bottom:20px;
    right:20px;
    z-index:9999;
    font-family:Arial, sans-serif;
    box-sizing:border-box;
  ">
    <button id="${id("toggle")}" style="
      width:60px;
      height:60px;
      border-radius:50%;
      border:none;
      background:#323345;
      color:#fff;
      font-size:28px;
      cursor:pointer;
      box-shadow:0 4px 12px rgba(0,0,0,.2);
    ">💬</button>

    <div id="${id("box")}" style="
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
      font-family:Arial, sans-serif;
    ">

      <!-- HEADER -->
      <div style="
        background:#323345;
        color:#fff;
        padding:10px 20px;
      ">
        <div style="display:flex;flex-direction:row;">
          <div style="display:flex;flex-direction:column;">
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
                style="
                  display:block;
                  width:140px;
                  height:25px;
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
        </div>
      </div>

      <!-- MESSAGES -->
      <div id="${id("messages")}" style="
        padding:20px;
        height:300px;
        overflow-y:auto;
        font-size:14px;
        line-height:1.4;
        color:#555;
        box-sizing:border-box;
      ">

        <div style="display:flex;flex-direction:row;align-items:flex-start;">
          <img
            src="https://amplifin.co.za/wp-content/uploads/2025/07/Amplifin-Yellow-N-20px.png"
            width="25"
            height="25"
            style="
              width:25px;
              height:25px;
              margin:5px;
              display:block;
              flex-shrink:0;
              object-fit:contain;
            "
          >
          <div style="
            background:#f5f5f5;
            padding:10px;
            border-radius:20px;
            font-size:14px;
            line-height:1.4;
            color:#555;
            max-width:220px;
          ">
            Whether you’re looking for the right collection solution or need quick support, we’re here to help.<br><br>
            Click here to speak with our Support or Sales Team on WhatsApp.
          </div>
        </div>

        <div style="
          display:flex;
          justify-content:flex-end;
          gap:6px;
          margin-top:10px;
        ">
          <button id="${id("support")}" style="
            border:1px solid #FBC100;
            background:#fff;
            border-radius:15px;
            padding:10px 14px;
            color:#FBC100;
            font-size:14px;
            cursor:pointer;
          ">Support Team</button>

          <button id="${id("sales")}" style="
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

  if (document.getElementById(id("root"))) return;
  document.body.insertAdjacentHTML("beforeend", widgetHTML);

  const toggle = document.getElementById(id("toggle"));
  const box = document.getElementById(id("box"));
  const messages = document.getElementById(id("messages"));
  const support = document.getElementById(id("support"));
  const sales = document.getElementById(id("sales"));

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
          window.location = "https://api.whatsapp.com/send/?phone=27675974601";
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
              style="
                width:25px;
                height:25px;
                border-radius:50%;
                margin-right:8px;
                flex-shrink:0;
              "
            >
            <div style="
              background:#f5f5f5;
              padding:10px;
              border-radius:20px;
              font-size:14px;
              line-height:1.4;
              max-width:220px;
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
          width:100%;
          padding:10px;
          border-radius:15px;
          border:1px solid #FBC100;
          background:#fff;
          color:#FBC100;
          font-size:14px;
          cursor:pointer;
          margin-bottom:6px;
        `;
        meet.onclick = () => {
          window.location =
            "https://outlook.office.com/bookwithme/user/aea7a9c95b7a47668988fc5da0f9e845@amplifin.co.za?anonymous";
        };

        const sup = document.createElement("button");
        sup.textContent = "Chat with Support";
        sup.style.cssText = meet.style.cssText;
        sup.onclick = support.onclick;

        wrap.append(meet, sup);
        messages.append(msg, wrap);
        messages.scrollTop = messages.scrollHeight;
      });
  };
})();
