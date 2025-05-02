(function (Scratch) {
    'use strict';
  
    if (!Scratch.extensions.unsandboxed) {
      alert("This extension must be unsandboxed to work.");
      return;
    }
  
    let iframe = null;
    let container = null;
    let maximizeButton = null;
    let toggleButton = null;
    let isMaximized = false;
    let isVisible = true;

    const containerId = "iframe-extension-container";
    const buttonId = "iframe-toggle-button";
    
    function createIframeContainer(Width, Height) {
      const iframeWidth = Width;
      const iframeHeight = Height;
      container = document.createElement("div");
      container.id = containerId;
      container.style.position = "absolute";
      container.style.top = "0";
      container.style.left = "0";
      container.style.width = iframeWidth.concat("px");
      container.style.height = iframeHeight.concat("px");
      container.style.zIndex = "9999";
      container.style.pointerEvents = "auto";
      container.style.background = "white";
      container.style.transition = "all 0.3s ease";
      document.body.appendChild(container);
    }
  
    function createIframe(src, WIDTH, HEIGHT) {
      if (!container) createIframeContainer(WIDTH, HEIGHT);
  
      if (!iframe) {
        iframe = document.createElement("iframe");
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "none";
        iframe.sandbox = "allow-scripts allow-forms allow-same-origin";
        container.appendChild(iframe);
      }
  
      iframe.src = src;
    }
  
    function createMaximizeButton() {
      if (!maximizeButton) {
        maximizeButton = document.createElement("button");
        maximizeButton.style.position = "absolute";
        maximizeButton.style.top = "5px";
        maximizeButton.style.right = "5px";
        maximizeButton.style.zIndex = "10000";
        maximizeButton.style.padding = "5px";
        maximizeButton.style.backgroundColor = "#009999";
        maximizeButton.style.color = "#fff";
        maximizeButton.style.border = "none";
        maximizeButton.style.borderRadius = "4px";
        maximizeButton.style.cursor = "pointer";
        maximizeButton.textContent = "Maximize";
  
        maximizeButton.onclick = toggleMaximized;
        container.appendChild(maximizeButton);
      }
    }
  
    function toggleMaximized() {
      if (!container) return;
  
      if (isMaximized) {
        container.style.width = "480px";
        container.style.height = "360px";
        container.style.top = "0";
        container.style.left = "0";
        maximizeButton.style.display = "inline-block";
        isMaximized = false;
      } else {
        container.style.width = "100vw";
        container.style.height = "100vh";
        container.style.top = "0";
        container.style.left = "0";
        maximizeButton.style.display = "none";
        isMaximized = true;
      }
  
      updateButtonsVisibility();
    }
  
    function createToggleButton() {
      if (!toggleButton) {
        toggleButton = document.createElement("button");
        toggleButton.id = buttonId;
        toggleButton.style.position = "fixed";
        toggleButton.style.top = "10px";
        toggleButton.style.right = "10px";
        toggleButton.style.zIndex = "10000";
        toggleButton.style.padding = "8px";
        toggleButton.style.backgroundColor = "#009999";
        toggleButton.style.color = "#fff";
        toggleButton.style.border = "none";
        toggleButton.style.borderRadius = "4px";
        toggleButton.style.cursor = "pointer";
  
        toggleButton.onclick = toggleIframe;
        document.body.appendChild(toggleButton);
      }
      updateToggleButtonLabel();
    }
  
    function toggleIframe() {
        if (!container) return;
      
        if (!isVisible) {
          container.style.display = "block";
          isVisible = true;
      
          // Re-add buttons if missing
          if (!document.body.contains(toggleButton)) {
            createToggleButton();
          }
          if (!container.contains(maximizeButton)) {
            createMaximizeButton();
          }
      
          updateButtonsVisibility();
        } else {
          container.style.display = "none";
          isVisible = false;
          updateButtonsVisibility();
        }
      
        updateToggleButtonLabel();
      }
  
    function updateToggleButtonLabel() {
      const button = document.getElementById(buttonId);
      if (!button) return;
  
      if (!isVisible) {
        button.textContent = "Show Iframe";
      } else {
        button.textContent = "Hide Iframe";
      }
  
      updateButtonsVisibility();
    }
  
    function updateButtonsVisibility() {
      // If iframe is maximized, hide all buttons
      if (isMaximized) {
        maximizeButton.style.display = "none";
        toggleButton.style.display = "none";
      } else {
        maximizeButton.style.display = "inline-block";
        toggleButton.style.display = "inline-block";
      }
    }
  
    function onEscapePress(event) {
      if (event.key === "Escape" && isMaximized) {
        toggleMaximized();
      }
    }
  
    document.addEventListener("keydown", onEscapePress);
  
    class IframeExtension {
      getInfo() {
        return {
          id: "iframebutton",
          name: "Iframe with Button",
          color1: "#009999",
          blocks: [
            {
              opcode: "showURL",
              blockType: Scratch.BlockType.COMMAND,
              text: "show website :[URL] Width :[WIDTH] Height :[HEIGHT]",
              arguments: {
                URL: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "https://example.com"
                },
                WIDTH: {
                   type: Scratch.ArgumentType.NUMBER,
                   defaultValue: "480"
                },
                HEIGHT: {
                   type: Scratch.ArgumentType.NUMBER,
                   defaultValue: "360"
                }
              }
            },
            {
              opcode: "showHTML",
              blockType: Scratch.BlockType.COMMAND,
              text: "show HTML :[HTML] Width :[WIDTH] Height :[HEIGHT]",
              arguments: {
                HTML: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "<h1>Hello Scratch!</h1>"
                },
                WIDTH: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: "480"
                },
                HEIGHT: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: "360"
                }
              }
            },
            {
              opcode: "hideIframe",
              blockType: Scratch.BlockType.COMMAND,
              text: "hide iframe"
            }
          ]
        };
      }
  
      showURL(args) {
        const url = Scratch.Cast.toString(args.URL);
        createIframe(url, args.WIDTH, args.HEIGHT);
        createMaximizeButton();
        createToggleButton();
        isVisible = true;
        updateToggleButtonLabel();
        updateButtonsVisibility();
      }
  
      showHTML(args) {
        const html = Scratch.Cast.toString(args.HTML);
        const dataUrl = "data:text/html;charset=utf-8," + encodeURIComponent(html);
        createIframe(dataUrl, args.WIDTH, args.HEIGHT);
        createMaximizeButton();
        createToggleButton();
        isVisible = true;
        updateToggleButtonLabel();
        updateButtonsVisibility();
      }
  
      hideIframe() {
        const existing = document.getElementById(containerId);
        const button = document.getElementById(buttonId);
        if (existing) existing.remove();
        if (button) button.remove();
        iframe = null;
        container = null;
        maximizeButton = null;  // <-- Clear the button references
        toggleButton = null;
        isMaximized = false;
        isVisible = false;
      }
    }
  
    Scratch.extensions.register(new IframeExtension());
  })(Scratch);
  
  