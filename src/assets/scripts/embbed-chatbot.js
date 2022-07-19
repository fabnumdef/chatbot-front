'use strict';

class Webchat {}

Webchat.init = function (data) {
  const buttonColor = data.buttonColor ? data.buttonColor : '#6e91f0';
  const buttonSize = data.buttonSize ? data.buttonSize : '60px';
  const chatHeight = data.chatHeight ? data.chatHeight : '500px';
  const chatWidth = data.chatWidth ? data.chatWidth : '400px';
  const iconSize = data.iconSize ? data.iconSize : '30px';
  const iconColor = data.iconColor ? data.iconColor : '#ffffff';

  const boxShadow = `0 0 10px -3px rgba(0,0,0,.5)`;

  const styles = `
    #webchat {
      position: fixed;
      bottom: 20px;
      right: 20px;
    }

    #iframe-bot {
      position: absolute;
      bottom: calc(${buttonSize} + 20px);
      right: 0;
      height: ${chatHeight};
      width: ${chatWidth};
    }

    #iframe-bot iframe {
      border: 0;
      box-shadow: ${boxShadow};
      border-radius: 4px;
      height: 100%;
      width: 100%;
    }

    #iframe-bot:not(.active) {
      display: none;
    }

    #webchat button {
      height: ${buttonSize};
      width: ${buttonSize};
      border-radius: 100%;
      cursor: pointer;
      border: none;
      background: ${buttonColor};
      box-shadow: ${boxShadow};
      color: ${iconColor};
      position: relative;
    }

    #webchat button:not(.clicked) {
      animation: gelatine 2s infinite;
    }

    @keyframes gelatine {
      from, to { transform: scale(1, 1); }
      12% { transform: scale(0.95, 1.05); }
      25% { transform: scale(1.05, 0.95); }
      37% { transform: scale(0.97, 1.02); }
      50% { transform: scale(1, 1); }
    }

    #webchat button:focus {outline:0;}

    #webchat button .chat-icon, #webchat button .close-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    #webchat button .chat-icon svg, #webchat button .close-icon svg {
      transition: opacity 80ms linear 0s, transform 160ms linear 0s;
      width: ${iconSize};
      height: ${iconSize};
    }

    #webchat button.active .chat-icon svg {
      transform: rotate(30deg) scale(0);
      opacity: 0;
    }

    #webchat button:not(.active) .chat-icon svg {
      transform: rotate(0deg) scale(1);
    }

    #webchat button:not(.active) .close-icon svg {
      transform: rotate(30deg) scale(0);
      opacity: 0;
    }

    #webchat button.active .close-icon svg {
      transform: rotate(0deg) scale(1);
    }
`;

  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);

  const webchatDiv = document.getElementById('webchat');
  webchatDiv.innerHTML = `
<button>
     <div class="chat-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
        </svg>
    </div>
     <div class="close-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
    </div>
</button>
<div id="iframe-bot">
</div>
`;

  const button = document.getElementById('webchat').getElementsByTagName('button')[0];
  const iframe = document.getElementById('iframe-bot');
  button.addEventListener("click", function () {
    button.classList.add('clicked');
    if (!iframe.getElementsByTagName('iframe')[0]) {
      iframe.innerHTML = '<iframe src="' + data.botURL + '"></iframe>';
    }
    if (iframe.classList.contains('active')) {
      button.classList.remove('active');
      iframe.classList.remove('active');
    } else {
      button.classList.add('active');
      iframe.classList.add('active');
    }
  });
}
