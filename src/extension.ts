// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	//let disposable = vscode.commands.registerCommand('theme-by-branch.watch', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const wb = vscode.workspace.getConfiguration('workbench')
		const git = vscode.extensions.getExtension('vscode.git')
		// let origTheme = wb.get('colorTheme')
		const repo = git?.exports.getAPI(1).repositories[0]
		// const theme = wb.get('themeByBranch.theme')
		// const wb_color = new vscode.ThemeColor ( 'activityBar.background' )
		/**
 * Create and show a StatusBarItem
 */


		let sbItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
		sbItem.text = "🚨 WARNING ⚠️";
		sbItem.tooltip = `${repo.state.HEAD?.name} branch`;
		sbItem.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
		
		var lastBranch = ''
		setState();

		function setState() {
			let branch = repo.state.HEAD?.name
			
			if(lastBranch != branch) {
				lastBranch = branch
				// TODO: await vscode.commands.executeCommand('workbench.action.previewColorTheme', { publisher, name, version }, settingsId);
				// https://github.com/search?q=repo%3Amicrosoft%2Fvscode-theme-tester%20previewColorTheme&type=code
				switch(branch) {
					case 'main':
					case 'master':
						sbItem.show();
						// wb.update('workbench.colorCustomizations.statusBar.background', '#F00')
						// vscode.window.showInformationMessage(`Branch changed ${branch} ${theme}`)
						// wb.update('colorTheme', theme, vscode.ConfigurationTarget.Workspace)
						// "statusBar.background": "#938e04",
						break;
					default:
						sbItem.hide();
						// wb.update('colorTheme', origTheme, vscode.ConfigurationTarget.Workspace)
				}
				
			}
		}
		repo.state.onDidChange(() => {
			setState();
		})
		
		
	//}) 
		
		// (e => {
		// 	if (e.state.equals(vscode.GitRepositoryState.Idle)) {
		// 		const branch = e.repository.state.HEAD?.name;
		// 		if (branch) {
		// 			const theme = branch.replace(/[^a-z0-9]/gi, '').toLowerCase();
		// 			vscode.workspace.getConfiguration('workbench').update('colorTheme', theme, vscode.ConfigurationTarget.Global);
		// 			console.log(`Changed theme to ${theme}`);
		// 		}
		// 	}
		// });
		// context.subscriptions.push(onDidChangeGitRepository);
		//context.subscriptions.push(disposable);	
		// vscode.commands.executeCommand("workbench.colorTheme", "Solarized Dark");
	// });

	
}

// This method is called when your extension is deactivated
export function deactivate() {}
