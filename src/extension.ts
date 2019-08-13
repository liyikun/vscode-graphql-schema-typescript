// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { generateTSTypesAsString, initConfig } from './core';



// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

export async function TestEditor() : Promise<string> {
	let editor = vscode.window.activeTextEditor;

	if(!editor) {
		return "";
	}

	let selection = editor.selection;

	let text = editor.document.getText(selection);

	const options = await initConfig();

	try {
		const content = await generateTSTypesAsString(text, options);
		return content;
	} catch(e) {
		return e.message as string;
	}
}


export function activate(context: vscode.ExtensionContext) {
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

// this method is called when your extension is deactivated
export function deactivate() {}
