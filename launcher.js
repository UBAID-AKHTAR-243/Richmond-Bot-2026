// launcher.js
(function() {
    // 1. Add CSS for the corner positioning and hidden state
    const style = document.createElement('style');
    style.innerHTML = `
        #bot-widget-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 99999;
            font-family: sans-serif;
        }
        #bot-window-frame {
            display: none; /* Hidden by default */
            width: 400px;
            height: 600px;
            max-height: 80vh;
            background: #eaf1f5;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.4);
            margin-bottom: 15px;
            overflow: hidden;
            border: 1px solid #222e35;
        }
        #bot-window-frame.active {
            display: flex;
            flex-direction: column;
            animation: slideUp 0.3s ease-out;
        }
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        /* Your FAB Button Styles (copied from your code) */
       .whatsapp-btn {
    /* Positioning */
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index:99999; /* Keeps it above other elements */

    /* Sizing & Shape */
    width: 40px; 
    height: 40px;
    background-color: #25d366; /* Standard WhatsApp Green */
    color: white;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    
    /* Centering the icon */
    display: flex;
    align-items: center;
    justify-content: center;
    
    /* Shadow & Transition */
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    transition: transform 0.3s ease, background-color 0.3s ease;
}

.whatsapp-btn:hover {
    transform: scale(1.1); /* Slight grow effect */
    background-color: #128c7e; /* Darker teal on hover */
}

    `;
    document.head.appendChild(style);

    // 2. Create the HTML Wrapper
    const widget = document.createElement('div');
    widget.id = 'bot-widget-container';
    widget.innerHTML = `
        <div id="bot-window-frame">
            <div id="bot-content-placeholder"></div>
        </div>
        <button class="whatsapp-btn" id="toggle-bot">
            <i class="fab fa-whatsapp" style="font-size:26px;"></i>
        </button>
    `;
    document.body.appendChild(widget);

    // 3. The Logic to show/hide
    const btn = document.getElementById('toggle-bot');
    const windowFrame = document.getElementById('bot-window-frame');
    const placeholder = document.getElementById('bot-content-placeholder');

    btn.onclick = function() {
        const isActive = windowFrame.classList.toggle('active');
        
        // Load the bot content only when clicked for the first time
        if (isActive && placeholder.innerHTML === "") {
            loadBotContent();
        }
    };

    function loadBotContent() {
        // We fetch your existing bot.html and place it inside the frame
        fetch('bot.html')
            .then(response => response.text())
            .then(data => {
                placeholder.innerHTML = data;
                // Re-execute scripts from bot.html if necessary
                const scripts = placeholder.getElementsByTagName('script');
                for (let script of scripts) {
                    eval(script.innerText);
                }
            });
    }
})();
