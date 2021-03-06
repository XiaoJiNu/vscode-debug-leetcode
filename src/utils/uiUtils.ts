import * as vscode from 'vscode';
import { leetCodeChannel } from '../leetCodeChannel';

export namespace DialogOptions {
    export const open: vscode.MessageItem = { title: 'Open' };
    export const yes: vscode.MessageItem = { title: 'Yes' };
    export const no: vscode.MessageItem = { title: 'No', isCloseAffordance: true };
    export const never: vscode.MessageItem = { title: 'Never' };
    export const singUp: vscode.MessageItem = { title: 'Sign up' };
}

export async function promptForOpenOutputChannel(message: string, type: DialogType): Promise<void> {
    let result: vscode.MessageItem | undefined;
    switch (type) {
        case DialogType.info:
            result = await vscode.window.showInformationMessage(
                message,
                DialogOptions.open,
                DialogOptions.no,
            );
            break;
        case DialogType.warning:
            result = await vscode.window.showWarningMessage(
                message,
                DialogOptions.open,
                DialogOptions.no,
            );
            break;
        case DialogType.error:
            result = await vscode.window.showErrorMessage(
                message,
                DialogOptions.open,
                DialogOptions.no,
            );
            break;
        default:
            break;
    }

    if (result === DialogOptions.open) {
        leetCodeChannel.show();
    }
}

export async function openUrl(url: string): Promise<void> {
    vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(url));
}

export enum DialogType {
    info = 'info',
    warning = 'warning',
    error = 'error',
}
