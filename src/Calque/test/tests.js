require.config({
    baseUrl: '../core'
});

mocha.setup('bdd');
mocha.reporter('html');

require(['../test/workspace-tests'], function () {
    mocha.run();
})