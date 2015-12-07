import HelpPage = require('help');
import Workspace = require('workspace');
import Settings = require('settings');

class Application {
    help = new HelpPage();
    workspace: Workspace;
    settings: Settings.Settings;

    init(inputEl: HTMLInputElement, outputEl: HTMLElement) {
        this.workspace = new Workspace(inputEl, outputEl);
        this.settings = new Settings.Settings();

        this.help.isVisible.subscribe(v => this.save());
        this.settings.theme.subscribe(v => this.save());
    }

    restore(data: IOHelper, value: string) {
        if (value)
            this.workspace.inputEl.value = value;
        data.readText('help').done(v => v ? this.help.isVisible(v === 'true') : true);
        data.readText('theme').done(v => this.settings.theme(Settings.Theme[v]));
    }

    save() {
        WinJS.Application.local.writeText('help', String(this.help.isVisible()));
        WinJS.Application.local.writeText('theme', Settings.Theme[this.settings.theme()]);
    }
}

export = new Application();