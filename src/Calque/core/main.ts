declare var WinJSContrib: any;
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

            if (!args.detail.prelaunchActivated) {
                args.setPromise(WinJS.Promise.join({
                    ui: WinJS.UI.processAll(),
                    ko: new WinJS.Promise((c, e) => {
                        require(['app'], function (app) {
                            try {
                                app.init();

                                ko.components.register("help", {
                                    viewModel: { instance: app.help },
                                    template: { require: 'text!../pages/help.html' }
                                });

                                ko.applyBindings(app);

                                if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                                    app.restore(WinJS.Application.local);
                                } else {
                                    app.restore(WinJS.Application.local, WinJS.Application.sessionState.value);
                                }

                                var appInsight = new WinJSContrib.WinRT.AppInsight({ instrumentationKey: "053c50b0-8c79-4388-994f-de953bd3151d" });
                                appInsight.tracker.trackEvent("app start");

                                c();
                            } catch (err) {
                                e(err);
                            }
                        });
                    })
                }));
            }
        }
    };

    app.onloaded = function () {
        WinJS.Resources.processAll();
    }

    app.oncheckpoint = function (args) {
        args.setPromise(new WinJS.Promise((c, e) => {
            require(['app'], (application) => {
                try {
                    if (application.workspace)
                        app.sessionState.value = application.workspace.input();
                    c();
                }
                catch (err) {
                    e(err);
                }
            });
        }));
    };

    app.start();
})();