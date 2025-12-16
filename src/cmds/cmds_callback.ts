import * as vscode from 'vscode';


interface BoardPick extends vscode.QuickPickItem {
    boardChip: string;
    buildCmd: string;
    label: string;
}
let boardPicked: BoardPick | undefined;

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


    terminal.sendText(`source ${env_path}`);
    terminal.sendText(`cd ${project_path}`);
    terminal.sendText("clear");
    terminal.show();
    vscode.window.showInformationMessage("Zephyr Seted");
}

export async function build_clean() {
    if (!boardPicked) {
        vscode.window.showWarningMessage(
            "No board selected. Please select a board first."
        );
        return;
    }

    const terminal = getTerminal();
    terminal.show();

    vscode.window.showInformationMessage(
        `Building for ${boardPicked.label}...`
    );

    terminal.sendText(boardPicked.buildCmd);
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


export async function select_board() {

    const items: BoardPick[] = [
        {
            label: 'esp32_devkitc',
            buildCmd: 'west build -b esp32_devkitc/esp32/procpu -p',
            boardChip: 'esp32'
        },
        {
            label: 'esp32s3_devkitc',
            buildCmd: 'west build -b esp32s3_devkitc/esp32s3/procpu -p',
            boardChip: 'esp32s3'
        }
    ];

    const selection = await vscode.window.showQuickPick(items, {
        title: 'Zephyr Board Selection',
        placeHolder: 'Choose a target board'
    });

    if (!selection) {
        return;
    }

    boardPicked = selection;

    vscode.window.showInformationMessage(
        `Selected board: ${selection.label}`
    );

}