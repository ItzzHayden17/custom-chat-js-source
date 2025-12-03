const chatToggle = document.getElementById("chatToggle");
  const chatBox = document.getElementById("chatBox");
  const chatSend = document.getElementById("chatSend");
  const chatInput = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");

  // Open/Close chat widget
  chatToggle.onclick = () => {
    chatBox.style.display = chatBox.style.display === "none" ? "block" : "none";
  };

  // Send message
  chatSend.onclick = () => {
    const msg = chatInput.value.trim();
    if (!msg) return;

    // Add message to chat
    const bubble = document.createElement("div");
    bubble.textContent = msg;
    bubble.style.cssText = `
      background: #2563eb;
      color: white;
      padding: 8px 10px;
      margin: 6px 0;
      border-radius: 6px;
      width: fit-content;
      max-width: 80%;
      margin-left: auto;
    `;
    chatMessages.appendChild(bubble);

    // Clear input + scroll to bottom
    chatInput.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };


  const sales = document.getElementById("sales")
  const support = document.getElementById("support")

  sales.addEventListener("click", () => {
    fetch("https://chat-widget-test.onrender.com/json").then(response =>{
        statusCode = response.status
        
        if (statusCode == 400) {
            window.location = "https://api.whatsapp.com/send/?phone=27675974601";
        } else{
            const jessicaNotAvailable = document.createElement("div");
                jessicaNotAvailable.innerHTML = `
                <div style="
                display:flex;
                flex-direction:row;

                ">
                <img src="https://amplifin.zendesk.com/embeddable/avatars/20322948535964" width="25px" height="25px" alt="Company logo" style="
                border-radius: 20px;
                    margin-top: 10px;
                ">
                    <div style="
                        color: #555; 
                        background-color: #f5f5f5;
                        padding:10px;
                        border-radius: 20px;
                        margin-top: 10px;
                    ">
                        Hello! This is Jessica from the Sales Team.<br><br>
                        I am currently unavailable.<br><br>
                        You can chat with our Support Team, who will assist you and ensure that a Sales Consultant contacts you as soon as possible.<br><br>
                        Alternatively, please click on the button below to schedule a call or Microsoft Teams meeting with me.<br>
                    </div>
                </div>
                `;
            jessicaNotAvailable.style.cssText = `

            `;
            const button1 = document.createElement("button")
            button1.innerHTML = `Schedule a meeting with me<br>`
            button1.onclick = () =>{
                window.location = "https://outlook.office.com/bookwithme/user/aea7a9c95b7a47668988fc5da0f9e845@amplifin.co.za?anonymous&ismsaljsauthenabled&ep=bwmEmailSignature"
            }
            button1.style.display = "block";
            button1.style.cssText = `
                margin-top : 10px;
                outline: none;
                box-shadow: none;
                border-style: solid; 
                background-color: #ffffff; 
                border-width: 1px ;
                border-color: #FBC100; 
                border-radius: 15px; 
                padding: 10px;
                color: #FBC100;
                cursor: pointer;
            `;


            const buttonDiv = document.createElement("div")
            buttonDiv.style.cssText =`
            width:auto;
            display: flex;
            flex-direction : column;
            justify-content : flex-end
            `
            const button2 = document.createElement("button")
            button2.textContent = "Chat with Support"
            button2.onclick = () =>{
                window.location = "https://api.whatsapp.com/send/?phone=27675974601"
            }
            button2.style.display = "block";
            button2.style.cssText =`
                margin-top : 10px;
                outline: none;
                box-shadow: none;
                border-style: solid; 
                background-color: #ffffff; 
                border-width: 1px ;
                border-color: #FBC100; 
                border-radius: 15px; 
                padding: 10px;
                color: #FBC100;
                cursor: pointer;
            `

            buttonDiv.append(button1,button2)
            chatMessages.append(jessicaNotAvailable,buttonDiv)
            // window.location = "https://api.whatsapp.com/send/?phone=27675974601&text=I+see+Jessica+is+not+available%2C+will+you+be+able+to+assist+me%3F&type=phone_number&app_absent=0";
        }
        
    })
    });

    support.addEventListener("click",()=>{
        window.location = "https://api.whatsapp.com/send/?phone=27675974601"
    })