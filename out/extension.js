"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const core_1 = require("./core");
function activate(context) {
    console.log('Congratulations, graphql transform ts is run');
    let disposable = vscode.commands.registerCommand("graphql-transform.run", () => {
        core_1.TestEditor().then((text) => {
            vscode.env.clipboard.writeText(text);
            vscode.window.showInformationMessage("success transform and copy your clipboard");
        }).catch(e => {
            let errorText = `
				Generate type error
				errorMessage: ${e.message}
				stack: ${e.stack}
			`;
            vscode.window.showInformationMessage(errorText);
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map