// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { TestEditor } from './core';


export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, graphql transform ts is run');

	let disposable = vscode.commands.registerCommand("graphql-transform.run", () => {
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
