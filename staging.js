(function () {
  "use strict";

  const NS = "afcw"; // change if you want per-widget instance
  const ID = (x) => `${NS}-${x}`;

  const ROOT_ID = ID("root");

  // Remove old instance so console paste + redeploy works
  const old = document.getElementById(ROOT_ID);
  if (old) old.remove();

  const widgetHTML = `
  <div id="${ROOT_ID}" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999; font-family: Arial, sans-serif; box-sizing: border-box; text-size-adjust:none; -webkit-text-size-adjust:none;">
<button id="${ID("chatToggle")}" type="button"
  style="width:60px;height:60px;border-radius:50%;border:none;background:#323345;
         display:flex;align-items:center;justify-content:center;
         cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,0.2);outline:none;">
  <svg xmlns="http://www.w3.org/2000/svg"
       width="28" height="28"
       viewBox="0 0 24 24"
       fill="none"
       aria-hidden="true">
    <path d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7"
          stroke="white" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
</button>


    <div id="${ID("chatBox")}"
         style="width: 320px; height: 420px; background: white; border-radius: 14px;
                box-shadow: 0 4px 18px rgba(0,0,0,0.15); position: absolute; bottom: 70px; right: 0;
                display: none; overflow: hidden; font-family: Arial, sans-serif; box-sizing:border-box;">

      <div style="background: #323345; color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; box-sizing:border-box;">
        <div style="display: flex; flex-direction: row;">
          <div style="display: flex; flex-direction: column;">
            <h1 style="font-size: 1.125rem; font-weight: 600; letter-spacing: -0.028rem; margin:0 0 6px 0; padding:0; line-height:1.125rem;">
              <img
                src="https://amplifin.co.za/wp-content/uploads/2022/09/Amplifin-Logo.png"
                alt="Amplifin"
                width="140"
                height="25"
                style="
                  display:block;
                  width:140px !important;
                  height:25px !important;
                  max-width:none !important;
                  max-height:none !important;
                  object-fit:contain;
                  border:0;
                ">
            </h1>
            <p style="font-size: 0.875rem; margin:0; padding:0;">
              How can we Amplify your day?
            </p>
          </div>
        </div>
      </div>

      <div id="${ID("chatMessages")}"
           style="padding: 20px; height: 300px; overflow-y: auto; overflow-x:hidden; font-size: 14px; box-sizing:border-box;">

        <div style="display:flex; flex-direction:row; align-items:flex-start;">
          <img
            src="https://amplifin.co.za/wp-content/uploads/2025/07/Amplifin-Yellow-N-20px.png"
            width="25"
            height="25"
            alt=""
            style="
              margin: 5px;
              display:block;
              width:25px !important;
              height:25px !important;
              max-width:none !important;
              max-height:none !important;
              object-fit:contain;
              flex-shrink:0;
              border:0;
            ">
          <div style="color:#555;background:#f5f5f5;padding:10px;border-radius:20px; max-width:220px; overflow-wrap:anywhere; word-break:break-word; box-sizing:border-box;">
            Whether you’re looking for the right collection solution or need quick support, we’re here to help.<br><br>
            Click here to speak with our Support or Sales Team on WhatsApp.<br>
          </div>
        </div>

        <div style="display:flex; flex-direction:row; justify-content:end; gap:6px; margin-top:10px;">
          <button id="${ID("support")}" type="button" style="outline:none; box-shadow:none; border:1px solid #FBC100;
              background:#fff; border-radius:15px; padding:10px; color:#FBC100; cursor:pointer; font-size:14px;">
            Support Team
          </button>
          <button id="${ID("sales")}" type="button" style="outline:none; box-shadow:none; border:1px solid #FBC100;
              background:#fff; border-radius:15px; padding:10px; color:#FBC100; cursor:pointer; margin:0 5px; font-size:14px;">
            Sales Team
          </button>
        </div>

      </div>
    </div>
  </div>
  `;

  document.body.insertAdjacentHTML("beforeend", widgetHTML);

  // Select ONLY inside our widget to avoid WP collisions
  const root = document.getElementById(ROOT_ID);
  const chatToggle = root.querySelector(`#${CSS.escape(ID("chatToggle"))}`);
  const chatBox = root.querySelector(`#${CSS.escape(ID("chatBox"))}`);
  const chatMessages = root.querySelector(`#${CSS.escape(ID("chatMessages"))}`);
  const sales = root.querySelector(`#${CSS.escape(ID("sales"))}`);
  const support = root.querySelector(`#${CSS.escape(ID("support"))}`);

  function go(url) {
    // more reliable than setting window.location directly on some WP setups
    window.location.assign(url);
  }

  chatToggle.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    chatBox.style.display = (chatBox.style.display === "none" ? "block" : "none");
  }, true);

  support.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    go("https://api.whatsapp.com/send/?phone=27675974601");
  }, true);

  sales.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    fetch("https://chat-widget-test.onrender.com/json", { cache: "no-store" })
      .then(function (response) {
        if (response.status == 400) {
          go("https://api.whatsapp.com/send/?phone=27675974601");
          return;
        }

        const msg = document.createElement("div");
        msg.innerHTML = `
          <div style="display:flex;flex-direction:row; align-items:flex-start;">
            <img src="https://amplifin.zendesk.com/embeddable/avatars/20322948535964"
                 width="25" height="25" alt="Sales"
                 style="
                   border-radius:20px; margin-top:10px;
                   display:block;
                   width:25px !important; height:25px !important;
                   max-width:none !important; max-height:none !important;
                   object-fit:contain; flex-shrink:0; border:0;
                 ">
            <div style="color:#555;background:#f5f5f5;padding:10px;border-radius:20px;margin-top:10px; max-width:220px; overflow-wrap:anywhere; box-sizing:border-box;">
              Hello! This is Jessica from the Sales Team.<br><br>
              I am currently unavailable.<br><br>
              You can chat with our Support Team, who will assist you and ensure that a Sales Consultant
              contacts you as soon as possible.<br><br>
              Alternatively, please click on the button below to schedule a meeting with me.
            </div>
          </div>
        `;

        const meetingBtn = document.createElement("button");
        meetingBtn.type = "button";
        meetingBtn.textContent = "Schedule a meeting with me";
        meetingBtn.style.cssText = `
          margin-top:10px; border:1px solid #FBC100; border-radius:15px;
          padding:10px; background:#fff; color:#FBC100; cursor:pointer; width:100%; font-size:14px;
        `;
        meetingBtn.addEventListener("click", function (ev) {
          ev.preventDefault();
          ev.stopPropagation();
          go("https://outlook.office.com/bookwithme/user/aea7a9c95b7a47668988fc5da0f9e845@amplifin.co.za?anonymous");
        }, true);

        const supportBtn = document.createElement("button");
        supportBtn.type = "button";
        supportBtn.textContent = "Chat with Support";
        supportBtn.style.cssText = `
          margin-top:10px; border:1px solid #FBC100; border-radius:15px;
          padding:10px; background:#fff; color:#FBC100; cursor:pointer; width:100%; font-size:14px;
        `;
        supportBtn.addEventListener("click", function (ev) {
          ev.preventDefault();
          ev.stopPropagation();
          go("https://api.whatsapp.com/send/?phone=27675974601");
        }, true);

        const wrapper = document.createElement("div");
        wrapper.style.cssText = "width:auto; display:flex; flex-direction:column; box-sizing:border-box;";
        wrapper.append(meetingBtn, supportBtn);

        chatMessages.append(msg, wrapper);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      })
      .catch(function () {
        go("https://api.whatsapp.com/send/?phone=27675974601");
      });
  }, true);
})();

