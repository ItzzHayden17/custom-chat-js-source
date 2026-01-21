```js
(function () {
  "use strict";

  // Namespace prefix for ALL IDs used by this widget
  const NS = "afcw"; // Amplifin Chat Widget

  // Helper: safe id builder
  const id = (name) => `${NS}-${name}`;

  // ---- Inject chat widget HTML (ONLY IDs + inline styles; no classes) ----
  const widgetHTML = `
    <div id="${id("root")}" style="
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      all: initial;
      display: block;
      box-sizing: border-box;
    ">
      <div id="${id("wrapper")}" style="
        all: initial;
        display: block;
        box-sizing: border-box;
        position: relative;
      ">
        <button id="${id("toggle")}" type="button" style="
          all: unset;
          box-sizing: border-box;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: none;
          background: #323345;
          color: white;
          font-size: 28px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
        ">💬</button>

        <div id="${id("box")}" style="
          all: initial;
          box-sizing: border-box;
          width: 320px;
          height: 420px;
          background: white;
          border-radius: 14px;
          box-shadow: 0 4px 18px rgba(0,0,0,0.15);
          position: absolute;
          bottom: 70px;
          right: 0;
          display: none;
          overflow: hidden;
          font-family: Arial, sans-serif;
        ">
          <div id="${id("header")}" style="
            all: initial;
            box-sizing: border-box;
            background: #323345;
            color: white;
            padding: 10px 20px;
            font-size: 16px;
            font-weight: bold;
            display: block;
            font-family: Arial, sans-serif;
          ">
            <div id="${id("headerRow")}" style="
              all: initial;
              box-sizing: border-box;
              display: flex;
              flex-direction: row;
              font-family: Arial, sans-serif;
            ">
              <div id="${id("headerCol")}" style="
                all: initial;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                font-family: Arial, sans-serif;
              ">
                <h1 id="${id("title")}" style="
                  all: initial;
                  box-sizing: border-box;
                  display: block;
                  font-size: 1.125rem;
                  font-weight: 600;
                  letter-spacing: -0.028rem;
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                ">
                  <img id="${id("logo")}"
                       src="https://amplifin.co.za/wp-content/uploads/2022/09/Amplifin-Logo.png"
                       alt="Amplifin"
                       width="140"
                       height="25"
                       style="
                         all: initial;
                         box-sizing: border-box;
                         display: block;
                         width: 140px;
                         height: 25px;
                       ">
                </h1>

                <p id="${id("subtitle")}" style="
                  all: initial;
                  box-sizing: border-box;
                  display: block;
                  font-size: 0.875rem;
                  line-height: 0px;
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                ">How can we Amplify your day?</p>
              </div>
            </div>
          </div>

          <div id="${id("messages")}" style="
            all: initial;
            box-sizing: border-box;
            padding: 20px;
            height: 300px;
            overflow-y: auto;
            font-size: 14px;
            display: block;
            font-family: Arial, sans-serif;
          ">
            <div id="${id("introRow")}" style="
              all: initial;
              box-sizing: border-box;
              display: flex;
              flex-direction: row;
              font-family: Arial, sans-serif;
            ">
              <img id="${id("introIcon")}"
                   src="https://amplifin.co.za/wp-content/uploads/2025/07/Amplifin-Yellow-N-20px.png"
                   alt=""
                   width="25"
                   height="25"
                   style="
                     all: initial;
                     box-sizing: border-box;
                     display: block;
                     width: 25px;
                     height: 25px;
                     margin: 5px;
                   ">

              <div id="${id("introBubble")}" style="
                all: initial;
                box-sizing: border-box;
                color: #555;
                background: #f5f5f5;
                padding: 10px;
                border-radius: 20px;
                display: block;
                font-family: Arial, sans-serif;
              ">
                Whether you’re looking for the right collection solution or need quick support, we’re here to help.<br><br>
                Click here to speak with our Support or Sales Team on WhatsApp.<br>
              </div>
            </div>

            <div id="${id("ctaRow")}" style="
              all: initial;
              box-sizing: border-box;
              display: flex;
              flex-direction: row;
              justify-content: end;
              font-family: Arial, sans-serif;
              margin-top: 10px;
            ">
              <button id="${id("support")}" type="button" style="
                all: unset;
                box-sizing: border-box;
                outline: none;
                box-shadow: none;
                border: 1px solid #FBC100;
                background: #fff;
                border-radius: 15px;
                padding: 10px;
                color: #FBC100;
                cursor: pointer;
                font-family: Arial, sans-serif;
                display: inline-block;
              ">Support Team</button>

              <button id="${id("sales")}" type="button" style="
                all: unset;
                box-sizing: border-box;
                outline: none;
                box-shadow: none;
                border: 1px solid #FBC100;
                background: #fff;
                border-radius: 15px;
                padding: 10px;
                color: #FBC100;
                cursor: pointer;
                margin: 0 5px;
                font-family: Arial, sans-serif;
                display: inline-block;
              ">Sales Team</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Avoid double-inject
  if (document.getElementById(id("root"))) return;

  document.body.insertAdjacentHTML("beforeend", widgetHTML);

  // ---- Element references ----
  const chatToggle = document.getElementById(id("toggle"));
  const chatBox = document.getElementById(id("box"));
  const chatMessages = document.getElementById(id("messages"));
  const sales = document.getElementById(id("sales"));
  const support = document.getElementById(id("support"));

  // ---- Toggle Widget ----
  chatToggle.addEventListener("click", () => {
    chatBox.style.display = chatBox.style.display === "none" ? "block" : "none";
  });

  // ---- Support Button ----
  support.addEventListener("click", () => {
    window.location = "https://api.whatsapp.com/send/?phone=27675974601";
  });

  // ---- Sales Button ----
  sales.addEventListener("click", () => {
    fetch("https://chat-widget-test.onrender.com/json")
      .then((response) => {
        if (response.status == 400) {
          window.location = "https://api.whatsapp.com/send/?phone=27675974601";
          return;
        }

        // Sales response message
        const msg = document.createElement("div");
        msg.id = id("salesMsg");
        msg.style.cssText = `
          all: initial;
          box-sizing: border-box;
          display: block;
          font-family: Arial, sans-serif;
        `;
        msg.innerHTML = `
          <div id="${id("salesMsgRow")}" style="
            all: initial;
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            font-family: Arial, sans-serif;
          ">
            <img id="${id("salesAvatar")}"
                 src="https://amplifin.zendesk.com/embeddable/avatars/20322948535964"
                 alt="Sales"
                 width="25"
                 height="25"
                 style="
                   all: initial;
                   box-sizing: border-box;
                   display: block;
                   width: 25px;
                   height: 25px;
                   border-radius: 20px;
                   margin-top: 10px;
                 ">
            <div id="${id("salesBubble")}" style="
              all: initial;
              box-sizing: border-box;
              color: #555;
              background: #f5f5f5;
              padding: 10px;
              border-radius: 20px;
              margin-top: 10px;
              display: block;
              font-family: Arial, sans-serif;
            ">
              Hello! This is Jessica from the Sales Team.<br><br>
              I am currently unavailable.<br><br>
              You can chat with our Support Team, who will assist you and ensure that a Sales Consultant
              contacts you as soon as possible.<br><br>
              Alternatively, please click on the button below to schedule a meeting with me.
            </div>
          </div>
        `;

        // Buttons wrapper
        const wrapper = document.createElement("div");
        wrapper.id = id("salesBtnWrap");
        wrapper.style.cssText = `
          all: initial;
          box-sizing: border-box;
          width: auto;
          display: flex;
          flex-direction: column;
          font-family: Arial, sans-serif;
        `;

        const meetingBtn = document.createElement("button");
        meetingBtn.id = id("meetingBtn");
        meetingBtn.type = "button";
        meetingBtn.textContent = "Schedule a meeting with me";
        meetingBtn.style.cssText = `
          all: unset;
          box-sizing: border-box;
          margin-top: 10px;
          border: 1px solid #FBC100;
          border-radius: 15px;
          padding: 10px;
          background: #fff;
          color: #FBC100;
          cursor: pointer;
          width: 100%;
          font-family: Arial, sans-serif;
          text-align: center;
        `;
        meetingBtn.addEventListener("click", () => {
          window.location =
            "https://outlook.office.com/bookwithme/user/aea7a9c95b7a47668988fc5da0f9e845@amplifin.co.za?anonymous";
        });

        const supportBtn = document.createElement("button");
        supportBtn.id = id("supportBtn2");
        supportBtn.type = "button";
        supportBtn.textContent = "Chat with Support";
        supportBtn.style.cssText = `
          all: unset;
          box-sizing: border-box;
          margin-top: 10px;
          border: 1px solid #FBC100;
          border-radius: 15px;
          padding: 10px;
          background: #fff;
          color: #FBC100;
          cursor: pointer;
          width: 100%;
          font-family: Arial, sans-serif;
          text-align: center;
        `;
        supportBtn.addEventListener("click", () => {
          window.location = "https://api.whatsapp.com/send/?phone=27675974601";
        });

        wrapper.append(meetingBtn, supportBtn);
        chatMessages.append(msg, wrapper);

        // Optional: keep the scroll at the bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
      })
      .catch(() => {
        // Fail safe: go to support WhatsApp if fetch fails
        window.location = "https://api.whatsapp.com/send/?phone=27675974601";
      });
  });
})();
```
