import HelpPage = require('help');
import Workspace = require('workspace');
import Settings = require('settings');

class Application {
    help = new HelpPage();
    workspace: Workspace;
    settings: Settings.Settings;

    init() {
        this.workspace = new Workspace();
        this.settings = new Settings.Settings();

        this.help.isVisible.subscribe(v => this.save());
        this.settings.theme.subscribe(v => this.save());
    }

    restore(data: IOHelper, value: string) {
        if (value) {
            this.workspace.input(value);
            this.workspace.handler();
        }

        data.readText('help').done(v => v ? this.help.isVisible(v === 'true') : true);
        data.readText('theme').done(v => { if (v != "undefined") this.settings.theme(Settings.Theme[v]) });
    }

    save() {
        WinJS.Application.local.writeText('help', String(this.help.isVisible()));
        WinJS.Application.local.writeText('theme', Settings.Theme[this.settings.theme()]);
    }
}

export = new Application();