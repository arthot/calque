import Utils = require('utils');
import Expression = require('expression');

class Workspace {
    inputEl: HTMLInputElement;
    outputEl: HTMLElement;

    raw: string = '';
    lines: string[] = [];
    expressions: Expression[] = [];
    activeLine: number = 0;

    constructor(inputEl: HTMLInputElement, outputEl: HTMLElement) {
        this.inputEl = inputEl;
        this.outputEl = outputEl;

        this.inputEl.addEventListener('keydown', this.handler.bind(this));
        this.inputEl.addEventListener('keyup', this.handler.bind(this));
    }

    handler() {
        try {
            this.updateActiveLine();
            this.input();

            if (this.inputEl.scrollTop !== this.outputEl.scrollTop) {
                this.outputEl.scrollTop = this.inputEl.scrollTop;
            }
        } catch (e) {
            console.log(e);
        }
    }

    select = () => {
        this.inputEl.select();
    }

    save = () => {
        var currentState = Windows.UI.ViewManagement.ApplicationView.value;
        if (currentState === Windows.UI.ViewManagement.ApplicationViewState.snapped &&
            !Windows.UI.ViewManagement.ApplicationView.tryUnsnap()) {
            return;
        }

        var savePicker = new Windows.Storage.Pickers.FileSavePicker();
        savePicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.documentsLibrary;
        savePicker.fileTypeChoices.insert('Plain Text', <any>[".txt"]);
        savePicker.suggestedFileName = "Calque";

        savePicker.pickSaveFileAsync().then((file) => {
            if (file) {
                Windows.Storage.CachedFileManager.deferUpdates(file);
                Windows.Storage.FileIO.writeTextAsync(file, this.generateText())
                    .done(() => Windows.Storage.CachedFileManager.completeUpdatesAsync(file));
            }
        });
    }

    generateText(): string {
        var text = "";

        this.lines.forEach((line, index) => {
            var expr = this.expressions.filter(e => e.line == index)[0];
            if (expr && expr.result !== undefined)
                text += line + ' = ' + expr.result + '\r\n';
        });

        return text;
    }

    updateActiveLine() {
        var value = this.inputEl.value;
        var selectionStart = this.inputEl.selectionStart;

        var match = value.substr(0, selectionStart).match(/\n/g);

        if (!match) {
            var activeLine = 1;
        } else {
            var activeLine = value.substr(0, selectionStart).match(/\n/g).length + 1;
        }

        if (this.activeLine !== activeLine) {
            this.activeLine = activeLine;
            this.repaint();
        }
    }

    input() {
        var raw = this.inputEl.value;
        if (raw !== this.raw) {
            this.raw = raw;
            this.lines = this.raw.split("\n");
            this.recalc();
        }
    }

    recalc() {
        this.expressions.forEach((expression) => {
            expression.line = null;
        });

        var scope = {
            last: null
        };

        this.lines.forEach((code, index) => {
            var oldSimilarExpressions = this.expressions.filter(function (expression) {
                if (expression.line !== null) return;
                if (expression.code !== code) return;
                return true;
            });

            if (oldSimilarExpressions.length) {
                var expression = oldSimilarExpressions[0];
                if (expression) expression.eval(scope);
            } else {
                var expression = new Expression(code, scope);
                this.expressions.push(expression);
            }

            scope = Utils.scopeClone(expression.scopeOutput);

            if (expression.result !== undefined) {
                scope.last = expression.result;
            }

            expression.line = index;
        });

        _.remove(this.expressions, { line: null });

        this.repaint();
    };

    repaint() {
        var html = '';

        this.lines.forEach((line, index) => {
            var expression = this.expressions.filter(function (expression) {
                return expression.line === index;
            })[0];

            if (expression.error) {
                if (this.activeLine === index + 1) {
                    var type = 'empty';
                } else {
                    var type = 'error';
                }
            } else if (expression.result === undefined) {
                var type = 'empty';
            } else {
                var type = 'result';
            }

            var prefix = '';
            for (var s = 0; s <= expression.code.length; s++) prefix += ' ';
            if (type === 'empty') prefix += ' ';
            if (type === 'result') {
                if (expression.result instanceof Function) {
                    prefix += 'fn';
                } else {
                    prefix += '= ';
                }
            }
            if (type === 'error') prefix += '// ';

            var data = '';
            if (type === 'result') {
                if (expression.result === null) {
                    data = 'null';
                } else if (expression.result instanceof Function) {
                    var source = expression.result.toString();
                    data = '';
                } else {
                    data = expression.result.toString();
                }
            };
            if (type === 'error') data = expression.error;

            var lineHtml = `<div class="${type}">` +
                `<span class="prefix" data-prefix="${prefix}"></span>` +
                `<span class="data">${data}</span>` +
                `</div>`;

            html += lineHtml;
        });

        this.outputEl.innerHTML = html;
    };
}

export = Workspace;