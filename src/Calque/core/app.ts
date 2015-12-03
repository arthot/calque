import HelpPage = require('help');
import Workspace = require('workspace');
import Settings = require('settings');

class Application {
    help = new HelpPage();
    workspace: Workspace;
    settings: Settings;

    constructor(inputEl: HTMLInputElement, outputEl: HTMLElement) {
        this.workspace = new Workspace(inputEl, outputEl);
        this.settings = new Settings();
    }
}

export = Application;