import * as vscode from 'vscode';
import { registerStatusBar } from './ui/statusbar';
import { set_env, build_clean, flash, monitor, flash_and_monitor, configure_paths } from './cmds/cmds_callback';

export function activate(context: vscode.ExtensionContext) {

	registerStatusBar(context);

	const config = vscode.workspace.getConfiguration("zephyrEsp");
	const projectPath = config.get<string>("projectPath") ?? "";
	const venvPath = config.get<string>("venvPath") ?? "";

	if (!projectPath || !venvPath) {
		vscode.window.showWarningMessage(
			"Zephyr ESP paths are not configured. Would you like to configure them now?",
			"Yes", "No"
		).then(selection => {
			if (selection === "Yes") {
				configure_paths();
				set_env();
			}
		});
	}else{
		set_env();
	}

	const commands = [
		vscode.commands.registerCommand('zephyr-esp.set_env', set_env),
		vscode.commands.registerCommand('zephyr-esp.build_clean', build_clean),
		vscode.commands.registerCommand('zephyr-esp.flash', flash),
		vscode.commands.registerCommand('zephyr-esp.monitor', monitor),
		vscode.commands.registerCommand('zephyr-esp.flash_monitor', flash_and_monitor),
		vscode.commands.registerCommand('zephyr-esp.configurePaths', configure_paths)
	];
	context.subscriptions.push(...commands);
	

}

export function deactivate() { }