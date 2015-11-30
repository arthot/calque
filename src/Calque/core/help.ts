export class HelpPage {
    isVisible: KnockoutObservable<boolean>;

    constructor() {
        this.isVisible = ko.observable(true);
    }

    toggle = WinJS.UI.eventHandler((e) => this.isVisible(!this.isVisible()));
}