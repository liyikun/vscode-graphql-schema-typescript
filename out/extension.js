"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const core_1 = require("./core");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function TestEditor() {
    return __awaiter(this, void 0, void 0, function* () {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return "";
        }
        let selection = editor.selection;
        let text = editor.document.getText(selection);
        const options = yield core_1.initConfig();
        try {
            const content = yield core_1.generateTSTypesAsString(text, options);
            return content;
        }
        catch (e) {
            return e.message;
        }
    });
}
exports.TestEditor = TestEditor;
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.transform_gqltype', () => {
        TestEditor().then((text) => {
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