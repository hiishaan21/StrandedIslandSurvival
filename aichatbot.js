document.addEventListener("DOMContentLoaded", () => {

    const messagesDiv = document.getElementById("messages");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const helpReturnBtn = document.getElementById("helpReturn");

   
    // OpenAI API Key (don't share)
    const OPENAI_API_KEY = "39Yq9PMyosjb35YJdZJdqqy6H2f9kykzoz215vStauIWY9KmifCEJQQJ99BAACYeBjFXJ3w3AAABACOG88am";

    // Function to send messages
    const sendMessage = async () => {
      const userMessage = userInput.value.trim();
      if (!userMessage) return;
  
      // Display user's message
      addMessage(userMessage, "user-message");
      //chatBotMessages.push(["user-message", userMessage]);

      //sampleRestCall();

      // Call Azure OpenAI API for a response
      const botResponse = await getAIResponse(userMessage);
      addMessage(botResponse, "bot-message");
      //chatBotMessages.push(["bot-message", botResponse]);      
  
      //console.log("chatBotMessages= %s", chatBotMessages);
      // Clear input field
      userInput.value = "";
    };
  
    // Function to add messages to the chat window
    const addMessage = (text, className) => {
      const messageDiv = document.createElement("div");
      messageDiv.className = `message ${className}`;
      messageDiv.textContent = text;
      messagesDiv.appendChild(messageDiv);
  
      // Scroll to the bottom of the chat window
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    };
  
    const getAIResponse = async (userMessage) => {
        console.log("Input userMessage: %s", userMessage);
        try {
          const url = "https://dineshtestopenai.openai.azure.com/openai/deployments/gpt-35-turbo/chat/completions?api-version=2024-08-01-preview";
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "api-key": OPENAI_API_KEY,              
            },
            body: JSON.stringify({              
              messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: userMessage },
              ],
              max_tokens: 1024,
            }),
          });
      
          const data = await response.json();
          return data.choices[0]?.message?.content.trim() || "I'm sorry, I couldn't understand that.";
        } catch (error) {            
            console.error("Error calling OpenAI API:", error);
            return "Oops, something went wrong. Please try again later.";
        }
      };

    // Get history of the chatBot messages
    const chatBotMessages = JSON.parse(localStorage.getItem('chatBotMessages')) || [];
    
    // Add event listeners
    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendMessage();
    });    
  });
  