import HelpPage = require('help');
import Workspace = require('workspace');

class Application {
    Help = new HelpPage();
    Workspace: Workspace;

    constructor(inputEl: HTMLInputElement, outputEl: HTMLElement) {
        this.Workspace = new Workspace(inputEl, outputEl);
    }
}

export = Application;