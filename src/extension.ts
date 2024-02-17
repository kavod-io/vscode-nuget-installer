import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "vscode-nuget-package-manager" is now active!');

	let disposable = vscode.commands.registerCommand('vscode-nuget-package-manager.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from vscode-nuget-package-manager!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
