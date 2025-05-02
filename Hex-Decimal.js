(function(Scratch) {
    'use strict';

    if (!Scratch.extensions.unsandboxed) {
        alert("This extension needs to be unsandboxed to run!");
        return;
    }

    class DecHexExtension {
        getInfo() {
            return {
                id: "decHex",
                name: "Decimal and Hex",
                color1: "#002aff",
                color2: "#002ab8",
                blockIconURI: "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI1Ni4wMzcwMiIgaGVpZ2h0PSI1Ni4wMzcwMiIgdmlld0JveD0iMCwwLDU2LjAzNzAyLDU2LjAzNzAyIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjExLjk4MTQ4LC0xNTEuOTgxNDkpIj48ZyBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCI+PHBhdGggZD0iTTIxMS45ODE0OCwxODBjMCwtMTUuNDc0MiAxMi41NDQzMiwtMjguMDE4NTEgMjguMDE4NTEsLTI4LjAxODUxYzE1LjQ3NDIsMCAyOC4wMTg1MSwxMi41NDQzMiAyOC4wMTg1MSwyOC4wMTg1MWMwLDE1LjQ3NDIgLTEyLjU0NDMyLDI4LjAxODUxIC0yOC4wMTg1MSwyOC4wMTg1MWMtMTUuNDc0MiwwIC0yOC4wMTg1MSwtMTIuNTQ0MzIgLTI4LjAxODUxLC0yOC4wMTg1MXoiIGZpbGw9IiMwMDJhZmYiIHN0cm9rZT0ibm9uZSIvPjxwYXRoIGQ9Ik0yMjIuNTEwMDEsMTY5LjkwMjE1bDE3LjQ4OTk5LC0xMC4wOTc4NWwxNy40ODk5OSwxMC4wOTc4NXYyMC4xOTU3bC0xNy40ODk5OSwxMC4wOTc4NWwtMTcuNDg5OTksLTEwLjA5Nzg1ek0yMzIuMDU0ODUsMTkzLjgyNDZsNy45NDUxNSw0LjU4NzEzbDcuOTQ1MTUsLTQuNTg3MTN2LTkuMTc0MjZsLTcuOTQ1MTUsLTQuNTg3MTRsLTcuOTQ1MTUsNC41ODcxNHpNMjMyLjA1NDg1LDE3NS40NjA2NWw3Ljk0NTE1LDQuNTg3MTNsNy45NDUxNSwtNC41ODcxM3YtOS4xNzQyNmwtNy45NDUxNSwtNC41ODcxNGwtNy45NDUxNSw0LjU4NzE0eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjMDAyYWZmIi8+PHBhdGggZD0iTTIzNC41MzM1MSwxNjcuNzE3NDVsNS40NjY0OSwtMy4xNTYwOGw1LjQ2NjQ5LDMuMTU2MDh2Ni4zMTIxNWwtNS40NjY0OSwzLjE1NjA4bC01LjQ2NjQ5LC0zLjE1NjA4eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIi8+PC9nPjwvZz48L3N2Zz4=",
                blocks: [
                    {
                        opcode: "decimalToHexBlock",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "Decimal to Hexadecimal :[decToHexInput] Size :[decToHexSizeInput]",
                        arguments: {
                            decToHexInput: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 255
                            },
                            decToHexSizeInput: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 8
                            }
                        }
                    },
                    {
                        opcode: "hexToDecBlock",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "Hexadecimal to Decimal :[hexToDecInput]",
                        arguments: {
                            hexToDecInput: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "0xFF"
                            }
                        }
                    }
                ]
            };
        }

        decimalToHexBlock(args) {
            const num = Number(args.decToHexInput);
            const size = Number(args.decToHexSizeInput);
            return '0x' + num.toString(16).padStart(size, '0');
        }

        hexToDecBlock(args) {
            const input = String(args.hexToDecInput);
            const parsed = parseInt(input, 16);
            return isNaN(parsed) ? "Invalid Hexadecimal Value!" : parsed;
        }
    }

    Scratch.extensions.register(new DecHexExtension());
})(Scratch);