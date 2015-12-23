(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            require.config({
                baseUrl: 'core',
                paths: {
                    text: '../bower_components/text/text',
                }
            });

            require(['app'], function (app) {

                app.init();

                ko.components.register("help", {
                    viewModel: { instance: app.help },
                    template: { require: 'text!../pages/help.html' }
                });

                args.setPromise(WinJS.UI.processAll());
                ko.applyBindings(app);

                if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                    app.restore(WinJS.Application.local);
                } else {
                    app.restore(WinJS.Application.local, WinJS.Application.sessionState.value);
                }
            });
        }
    };

    app.onloaded = function () {
        WinJS.Resources.processAll();
    }

    app.oncheckpoint = function (args) {
        require(['app'], function (app) {
            WinJS.Application.sessionState.value = app.workspace.inputEl.value;
        });
    };

    app.start();
})();