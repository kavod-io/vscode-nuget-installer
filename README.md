# VS Code NuGet Installer

## Overview

The VS Code NuGet Installer is a Visual Studio Code extension designed to provide a graphical user interface (GUI) for managing NuGet packages within your .NET projects. It allows users to easily add, update, or remove NuGet packages from .csproj, .vbproj, .fsproj, or .sln files directly within the VS Code environment.

## Features

Manage NuGet Packages: Add, update, and remove NuGet packages from your .NET projects.
Project Detection: Automatically detects .csproj, .vbproj, .fsproj, or .sln files in your workspace.
NuGet Source Management: Configure and use multiple NuGet sources for package management.
Webview UI: A dedicated frontend interface for managing packages, built with modern web technologies.

## Getting Started

1. Installation: Install the extension from the Visual Studio Code Marketplace.
2. Open a .NET Project: Open your .NET project folder in VS Code.
3. Access the GUI: Right-click on a .csproj, .vbproj, .fsproj, or .sln file in the Explorer panel and select "Manage Nuget Packages".

## Configuration

The extension allows configuration of NuGet sources and other settings through the VS Code settings.json file. For example, to specify a custom NuGet source:
Refer to the package.json file for a full list of configurable settings.

## Development

### Prerequisites

* Node.js
* npm

### Setup

1. Clone the repository.
2. Install dependencies by running npm install in the root directory and the webview-ui directory.
Running Locally
To start the webview UI in development mode, run npm run start:webview from the root directory.
To compile the TypeScript source, run npm run compile.

### Building

To build the webview UI, run npm run build:webview.
To package the extension for distribution, run npm run vscode:prepublish.

## Contributing
Contributions are welcome! Please read the contributing guidelines before submitting pull requests.

## License
This project is licensed under the MIT License - see the LICENSE file for details.