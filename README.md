# zephyr-esp

I missed the convenient UI that ESP-IDF provides, so I created this extension for personal use. It fits my workflow and helps speed up building, flashing, and monitoring Zephyr projects.

## Features


- Set the Zephyr project path and Python virtual environment path for `west`.  
- Perform a full build of the project.  
- Flash the device and start monitoring it.  
- Status bar buttons for quick access to common commands.

## Requirements

- Node.js >= 11.6.2  
- Python >= 3.12.3  
- TODO: Add any other requirements (e.g., Zephyr SDK, `west`)


## How to install

```bash
npm install -g @vscode/vsce
vsce package
```

In VS Code, go to Extensions → menu → Install from VSIX.

Select the .vsix file.

## Usage

The extension provides several commands and status bar buttons:

- Set Env: Activate the Python virtual environment to use west.

- Build Clean: Perform a full build with -p.

- Flash: Flash the device.

- Monitor: Open the Espressif monitor.

- Flash and Monitor: Flash the device and open the Espressif monitor.

- Configure Project Paths: Set the project path and the virtual environment activate file paths.


> [!NOTE]
> Status bar buttons are available in the bottom right corner of VS Code for quick access.


## Goals / Future Improvements

Currently, some `west` commands are hardcoded, especially the build command, which only works for a specific ESP32 board (`esp32_devkitc/esp32/procpu`).  

The plan is to read board options from Zephyr project files and allow the user to select the board dynamically.

---

**Enjoy!** 🚀
