import vms = require('help');
import work = require('workspace');

export class Application {
    Help = new vms.HelpPage();
    Workspace: work.Workspace;

    constructor(inputEl: HTMLInputElement, outputEl: HTMLElement) {
        this.Workspace = new work.Workspace(inputEl, outputEl);
    }
}