import * as vscode from 'vscode';

export function registerStatusBar(context: vscode.ExtensionContext) {
    const buildButton = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Left,
        10
    );
    buildButton.text = "$(tools) Build";
    buildButton.tooltip = "Build Zephyr project";
    buildButton.command = "zephyr-esp.build_clean";
    buildButton.show();

    const FlashButton = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Left,
        9
    );

    FlashButton.text = "$(zap) Flash";
    FlashButton.tooltip = "Flash Zephyr project";
    FlashButton.command = "zephyr-esp.flash";
    FlashButton.show();

    const monitorButton = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Left,
        8
    );
    monitorButton.text = "$(terminal) Monitor";
    monitorButton.tooltip = "Open Zephyr serial monitor";
    monitorButton.command = "zephyr-esp.monitor";
    monitorButton.show();

    const buildFlashButton = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Left,
        7
    );
    buildFlashButton.text = "$(rocket) Flash + Monitor";
    buildFlashButton.command = "zephyr-esp.flash_monitor";
    buildFlashButton.show();

    const ConfigPathsButton = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Left,
        6
    );
    ConfigPathsButton.text = "$(gear) Config Project Paths";
    ConfigPathsButton.command = "zephyr-esp.configurePaths";
    ConfigPathsButton.show();

    const ConfigBoardButton = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Left,
        5
    );
    ConfigBoardButton.text = "$(gear) Config Project Board";
    ConfigBoardButton.command = "zephyr-esp.select_board";
    ConfigBoardButton.show();


    // Add items to subscriptions
    context.subscriptions.push(buildButton, FlashButton, monitorButton, buildFlashButton,ConfigPathsButton,ConfigBoardButton);
}