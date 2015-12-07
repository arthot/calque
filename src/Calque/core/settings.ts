export class Settings {
    marker = 'class';
    markerValue = 'style';

    theme: KnockoutObservable<Theme>;

    constructor() {
        this.theme = ko.observable(Theme.light);
        this.theme.subscribe(v => this.updateTheme());
    }

    updateTheme() {
        var oldStls = document.getElementsByClassName(this.markerValue);
        while (oldStls.length != 0) {
            oldStls[0].remove();
        }

        var win_style = document.createElement('link');
        var custom_style = document.createElement('link');
        win_style.rel = custom_style.rel = 'stylesheet';

        custom_style.setAttribute(this.marker, this.markerValue);
        win_style.setAttribute(this.marker, this.markerValue);

        win_style.href = `bower_components/winjs/css/ui-${Theme[this.theme()]}.css`;
        custom_style.href = `styles/themes/${Theme[this.theme()]}.css`;

        document.head.appendChild(win_style);
        document.head.appendChild(custom_style);
    }

    toggle = () => {
        if (this.theme() == Theme.dark)
            this.theme(Theme.light);
        else
            this.theme(Theme.dark);
    }
}

export enum Theme {
    light,
    dark
}