# text-sniffer

"text-sniffer" extension, a VS Code plugin designed to detect special text patterns, such as Chinese characters or other predefined texts, within your workspace files. It helps you identify and handle specific content in your projects quickly and efficiently.

## Features

- **Detect Specific Text Patterns**: Scans your workspace to detect specific text patterns (e.g., Chinese characters).

## Requirements

This extension has no external dependencies, but it requires VS Code version 1.50.0 or later.

## Extension Settings

The extension contributes the following settings:

- `text-sniffer.enable`: Enable/disable the text-sniffer extension.
- `text-sniffer.patterns`: An array of regular expressions that define which text patterns to detect. For example, to detect Chinese characters, you can use `"[\u4e00-\u9fa5]"`.
- `text-sniffer.highlightColor`: Define the color used to highlight matches.

## Known Issues

- Currently, very large files may slow down when scanned for matches. Optimization is planned for future updates.
- Nested workspace folders may not be fully scanned under certain conditions.

## Release Notes

### 1.0.0

Initial release of text-sniffer. Detects special text patterns such as Chinese characters in workspace files and highlights them.

