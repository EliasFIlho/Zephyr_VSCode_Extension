import * as vscode from 'vscode';

let zephyrTerminal: vscode.Terminal | undefined;
function getTerminal(): vscode.Terminal {
    if (!zephyrTerminal || zephyrTerminal.exitStatus !== undefined) {
        zephyrTerminal = vscode.window.createTerminal("Zephyr");
    }
    return zephyrTerminal;
}

export async function set_env() {
    vscode.window.showInformationMessage("Setting Zephyr environment...");
    
    const config = vscode.workspace.getConfiguration("zephyrEsp");
    const env_path = config.get("venvPath");
    const project_path = config.get("projectPath");
    const terminal = getTerminal();
    
    
    terminal.show();
    terminal.sendText(`source ${env_path}`);
    terminal.sendText(`cd ${project_path}`);
    vscode.window.showInformationMessage("Zephyr Seted");
}

export async function build_clean() {
    const terminal = getTerminal();
    terminal.show();
    vscode.window.showInformationMessage("Building project...");
    terminal.sendText("west build -b esp32_devkitc/esp32/procpu -p");

}

export async function flash() {
    const terminal = getTerminal();
    terminal.show();
    terminal.sendText("west flash");

}

export async function monitor() {
    const terminal = getTerminal();
    terminal.show();
    terminal.sendText("west espressif monitor");

}
export async function flash_and_monitor() {
    const terminal = getTerminal();
    terminal.show();
    terminal.sendText("west flash && west espressif monitor");

}

export async function configure_paths() {
    const projUri = await vscode.window.showOpenDialog({
        canSelectFolders: true,
        canSelectFiles: false,
        openLabel: "Select Zephyr Project Folder"
    });

    if (!projUri) return;

    const projectPath = projUri[0].fsPath;

    const venvUri = await vscode.window.showOpenDialog({
        canSelectFiles: true,
        openLabel: "Select Python 'activate' Script"
    });

    if (!venvUri) return;

    const venvPath = venvUri[0].fsPath;

    // Save settings
    const config = vscode.workspace.getConfiguration("zephyrEsp");

    await config.update("projectPath", projectPath, vscode.ConfigurationTarget.Global);
    await config.update("venvPath", venvPath, vscode.ConfigurationTarget.Global);

    vscode.window.showInformationMessage("Zephyr ESP paths configured successfully!");
    vscode.window.showInformationMessage(`Project: ${config.get("projectPath")} | Venv: ${config.get("venvPath")}`);
}