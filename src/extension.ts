import * as vscode from "vscode";

type RegexListType = {
    regexString: RegExp;
    errorText: string;
    severity: vscode.DiagnosticSeverity;
};

const regexList: RegexListType[] = [
    {
        regexString: /[^\x00-\xff]/g,
        errorText: "Text Sniffer detected",
        severity: vscode.DiagnosticSeverity.Warning,
    },
];

export const unacceptableStringCheck = (fullText: string, document: vscode.TextDocument): vscode.Diagnostic[] => {
    let diagnosticArray: vscode.Diagnostic[] = [];
    regexList.forEach(({ regexString, errorText, severity }) => {
        let regex = new RegExp(regexString);
        let match;

        while ((match = regex.exec(fullText))) {
            let range = new vscode.Range(document.positionAt(match.index), document.positionAt(match.index + match[0].length));
            const diagnostic = new vscode.Diagnostic(range, errorText, severity);
            diagnosticArray.push(diagnostic);
        }
    });

    return diagnosticArray;
};

const diagnosticCollection = vscode.languages.createDiagnosticCollection("unacceptableStringCheck");

export const setDiagnosticWithUnacceptableStringCheck = (document: vscode.TextDocument, context: vscode.ExtensionContext) => {
    const diagnosticArray = unacceptableStringCheck(document.getText(), document);

    diagnosticCollection.set(document.uri, diagnosticArray);
};

export function activate(context: vscode.ExtensionContext) {
    const main = (document: vscode.TextDocument, context: vscode.ExtensionContext) => {
        setDiagnosticWithUnacceptableStringCheck(document, context);
    };

    vscode.workspace.onDidOpenTextDocument((document: vscode.TextDocument) => {
        main(document, context);
    });

    vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
        main(document, context);
    });
}

export function deactivate() {}
