(function() {
    // 1. Load FontAwesome immediately
    const faLink = document.createElement('link');
    faLink.rel = 'stylesheet';
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    document.head.appendChild(faLink);

    // 2. Optimized CSS
    const style = document.createElement('style');
    style.innerHTML = `
        #bot-widget-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 99999;
            font-family: sans-serif;
            display: flex;
            flex-direction: column;
            align-items: flex-end; /* Keeps button and window aligned */
        }
        #bot-window-frame {
            display: none;
            width: 400px;
            height: 600px;
            max-height: 80vh;
            background: #111b21;
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
        .whatsapp-btn {
            width: 60px; /* Slightly larger for better mobile tap */
            height: 60px;
            background-color: #25d366;
            color: white;
            border-radius: 50%;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            transition: transform 0.3s ease, background-color 0.3s ease;
        }
        .whatsapp-btn:hover {
            transform: scale(1.1);
            background-color: #128c7e;
        }
    `;
    document.head.appendChild(style);

    // 3. Create the HTML Wrapper
    const widget = document.createElement('div');
    widget.id = 'bot-widget-container';
    widget.innerHTML = `
        <div id="bot-window-frame">
            <div id="bot-content-placeholder"></div>
        </div>
        <button class="whatsapp-btn" id="toggle-bot">
            <i class="fab fa-whatsapp" style="font-size:30px;"></i>
        </button>
    `;
    document.body.appendChild(widget);

    const btn = document.getElementById('toggle-bot');
    const windowFrame = document.getElementById('bot-window-frame');
    const placeholder = document.getElementById('bot-content-placeholder');

    btn.onclick = function() {
        const isActive = windowFrame.classList.toggle('active');
        if (isActive && placeholder.innerHTML === "") {
            loadBotContent();
        }
    };

    function loadBotContent() {
        fetch('bot.html')
            .then(response => response.text())
            .then(data => {
                placeholder.innerHTML = data;
                const scripts = placeholder.getElementsByTagName('script');
                for (let script of scripts) {
                    const newScript = document.createElement("script");
                    if (script.src) {
                        newScript.src = script.src;
                    } else {
                        newScript.textContent = script.textContent;
                    }
                    document.body.appendChild(newScript);
                }
            });
    }
})();
