import HelpPage = require('help');
import Workspace = require('workspace');
import Settings = require('settings');

class Application {
    Help = new HelpPage();
    Workspace: Workspace;
    Settings: Settings;

    constructor(inputEl: HTMLInputElement, outputEl: HTMLElement) {
        this.Workspace = new Workspace(inputEl, outputEl);
        this.Settings = new Settings();
    }
}

export = Application;