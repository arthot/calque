declare var math: any;
import utils = require('utils');

export class Expression {
    code: string;
    scopeInput: any;
    scopeOutput: any;
    line: number;
    parse: any;
    result: any;
    error: any;
    dependencies: any[];

    constructor(code: string, scope: any) {
        this.code = code;
        this.scopeInput = utils.Utils.scopeClone(scope);
        this.scopeOutput = utils.Utils.scopeClone(this.scopeInput);

        try {
            this.parse = math.parse(code);

            this.dependencies = [];
            this.parse.traverse((node) => {
                if (node.isSymbolNode || node.isFunctionNode) {
                    this.dependencies.push(node.name);
                }
            });

            this.eval(scope);
        } catch (e) {
            this.result = null;
            this.error = e;
        }

        this.line = null;
    }

    eval(scope: any): void {
        this.scopeInput = utils.Utils.scopeClone(scope);
        this.scopeOutput = utils.Utils.scopeClone(this.scopeInput);

        try {
            this.result = this.parse.eval(this.scopeOutput);
            this.error = null;
        } catch (e) {
            this.result = null;
            this.error = e;
        }
    }
}