(function(Scratch) {
    'use strict';

    const EXTENSION_ID = 'iframeexample';

    class IframeExtension {
        constructor() {
            this.iframe = null;
            this.syncInterval = null;
        }

        getInfo() {
            return {
                id: EXTENSION_ID,
                name: 'Iframe Display',
                blocks: [
                    {
                        opcode: 'showIframe',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'show iframe with URL [URL]',
                        arguments: {
                            URL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'https://example.com'
                            }
                        }
                    },
                    {
                        opcode: 'hideIframe',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'hide iframe'
                    }
                ]
            };
        }

        showIframe(args) {
            this.hideIframe(); // Clean up

            const iframe = document.createElement('iframe');
            iframe.src = args.URL;
            iframe.setAttribute('id', 'scratch-iframe-overlay');

            Object.assign(iframe.style, {
                position: 'absolute',
                border: 'none',
                zIndex: '9999',
                pointerEvents: 'auto'
            });

            document.body.appendChild(iframe);
            this.iframe = iframe;

            this.startSync();
        }

        hideIframe() {
            if (this.iframe) {
                this.iframe.remove();
                this.iframe = null;
            }
            if (this.syncInterval) {
                clearInterval(this.syncInterval);
                this.syncInterval = null;
            }
        }

        startSync() {
            const updatePosition = () => {
                const canvas = this.findStageCanvas();
                if (!canvas || !this.iframe) return;

                const rect = canvas.getBoundingClientRect();
                Object.assign(this.iframe.style, {
                    top: `${rect.top + window.scrollY}px`,
                    left: `${rect.left + window.scrollX}px`,
                    width: `${rect.width}px`,
                    height: `${rect.height}px`
                });
            };

            updatePosition();
            this.syncInterval = setInterval(updatePosition, 200);
        }

        findStageCanvas() {
            // Try to find the largest canvas on the page (usually the Scratch stage)
            const canvases = Array.from(document.querySelectorAll('canvas'));
            let bestCanvas = null;
            let largestArea = 0;

            for (const canvas of canvases) {
                const rect = canvas.getBoundingClientRect();
                const area = rect.width * rect.height;
                if (area > largestArea) {
                    largestArea = area;
                    bestCanvas = canvas;
                }
            }

            return bestCanvas;
        }
    }

    Scratch.extensions.register(new IframeExtension());
})(Scratch);
    Scratch.extensions.register(new IframeExtension());
})(Scratch);
