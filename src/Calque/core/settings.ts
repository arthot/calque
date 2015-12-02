class Settings {
    marker = 'class';
    markerValue = 'style';
    theme: Theme = Theme.light;

    constructor() {
        this.updateTheme();
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

        win_style.href = `bower_components/winjs/css/ui-${Theme[this.theme]}.css`;
        custom_style.href = `styles/themes/${Theme[this.theme]}.css`;

        document.head.appendChild(win_style);
        document.head.appendChild(custom_style);
    }

    toggle = () => {
        if (this.theme == Theme.dark)
            this.theme = Theme.light;
        else
            this.theme = Theme.dark;

        this.updateTheme();
    }
}

enum Theme {
    light,
    dark
}

export = Settings;