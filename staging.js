(function () {
    // ---- Inject chat widget HTML ----
    const widgetHTML = `
    <div class="chat-widget" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999;">
        <button id="chatToggle"
                style="width: 60px; height: 60px; border-radius: 50%; border: none; background: #323345;
                color: white; font-size: 28px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
            💬
        </button>

        <div id="chatBox"
            style="width: 320px; height: 420px; background: white; border-radius: 14px;
            box-shadow: 0 4px 18px rgba(0,0,0,0.15); position: absolute; bottom: 70px; right: 0;
            display: none; overflow: hidden; font-family: Arial, sans-serif;">

            <div style="background: #323345; color: white; padding: 10px 20px; font-size: 16px; font-weight: bold;">
                <div style="display: flex; flex-direction: row;">
                    <div style="display: flex; flex-direction: column;">
                        <h1 style="font-size: 1.125rem; font-weight: 600; letter-spacing: -0.028rem;">
                            <img width="auto" height="25"
                                 src="https://amplifin.co.za/wp-content/uploads/2022/09/Amplifin-Logo.png">
                        </h1>
                        <p style="font-size: 0.875rem; line-height: 0px;">
                            How can we Amplify your day?
                        </p>
                    </div>
                </div>
            </div>

            <div id="chatMessages"
                style="padding: 20px; height: 300px; overflow-y: auto; font-size: 14px;">
                
                <div style="display:flex; flex-direction:row;">
                    <img src="https://amplifin.co.za/wp-content/uploads/2025/07/Amplifin-Yellow-N-20px.png"
                         width="25px" height="25px" style="margin: 5px;">
                    <div style="color:#555;background:#f5f5f5;padding:10px;border-radius:20px;">
                        Whether you’re looking for the right collection solution or need quick support, we’re here to help.<br><br>
                        Click here to speak with our Support or Sales Team on WhatsApp.<br>
                    </div>
                </div>

                <div style="display:flex; flex-direction:row; justify-content:end;">
                    <button id="support" style="outline:none; box-shadow:none; border:1px solid #FBC100;
                        background:#fff; border-radius:15px; padding:10px; color:#FBC100; cursor:pointer;">
                        Support Team
                    </button>
                    <button id="sales" style="outline:none; box-shadow:none; border:1px solid #FBC100;
                        background:#fff; border-radius:15px; padding:10px; color:#FBC100; cursor:pointer; margin:0 5px;">
                        Sales Team
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML("beforeend", widgetHTML);

    // ---- Element references ----
    const chatToggle = document.getElementById("chatToggle");
    const chatBox = document.getElementById("chatBox");
    const chatMessages = document.getElementById("chatMessages");
    const sales = document.getElementById("sales");
    const support = document.getElementById("support");

    // ---- Toggle Widget ----
    chatToggle.onclick = () => {
        chatBox.style.display = chatBox.style.display === "none" ? "block" : "none";
    };

    // ---- Support Button ----
    support.addEventListener("click", () => {
        window.location = "https://api.whatsapp.com/send/?phone=27675974601";
    });

    // ---- Sales Button ----
    sales.addEventListener("click", () => {
        fetch("https://chat-widget-test.onrender.com/json")
            .then(response => {
                if (response.status == 400) {
                    window.location = "https://api.whatsapp.com/send/?phone=27675974601";
                } else {
                    const msg = document.createElement("div");
                    msg.innerHTML = `
                    <div style="display:flex;flex-direction:row;">
                        <img src="https://amplifin.zendesk.com/embeddable/avatars/20322948535964"
                             width="25" height="25" style="border-radius:20px; margin-top:10px;">
                        <div style="color:#555;background:#f5f5f5;padding:10px;border-radius:20px;margin-top:10px;">
                            Hello! This is Jessica from the Sales Team.<br><br>
                            I am currently unavailable.<br><br>
                            You can chat with our Support Team, who will assist you and ensure that a Sales Consultant
                            contacts you as soon as possible.<br><br>
                            Alternatively, please click on the button below to schedule a meeting with me.
                        </div>
                    </div>
                    `;

                    const meetingBtn = document.createElement("button");
                    meetingBtn.innerHTML = "Schedule a meeting with me";
                    meetingBtn.style.cssText = `
                        margin-top:10px; border:1px solid #FBC100; border-radius:15px;
                        padding:10px; background:#fff; color:#FBC100; cursor:pointer; width:100%;
                    `;
                    meetingBtn.onclick = () => {
                        window.location = "https://outlook.office.com/bookwithme/user/aea7a9c95b7a47668988fc5da0f9e845@amplifin.co.za?anonymous";
                    };

                    const supportBtn = document.createElement("button");
                    supportBtn.textContent = "Chat with Support";
                    supportBtn.style.cssText = `
                        margin-top:10px; border:1px solid #FBC100; border-radius:15px;
                        padding:10px; background:#fff; color:#FBC100; cursor:pointer; width:100%;
                    `;
                    supportBtn.onclick = () => {
                        window.location = "https://api.whatsapp.com/send/?phone=27675974601";
                    };

                    const wrapper = document.createElement("div");
                    wrapper.style.cssText = "width:auto; display:flex; flex-direction:column;";
                    wrapper.append(meetingBtn, supportBtn);

                    chatMessages.append(msg, wrapper);
                }
            });
    });

})();
