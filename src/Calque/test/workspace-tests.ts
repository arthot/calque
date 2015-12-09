import Workspace = require('../core/Workspace');

describe("Workspace", () => {
    context("1; 2", () => {
        it("should split to 2 lines", () => {
            var workspace = new Workspace();
            workspace.input("1 \n 2");
            chai.assert.equal(workspace.lines.length, 2);
        });
    });

    context("sqrt(3^2 + 4^2)", () => {
        it(" = 5", () => {
            var workspace = new Workspace();
            workspace.input("sqrt(3^2 + 4^2)");
            chai.assert.equal(workspace.expressions[0].result, '5');
        });
    });

    context("a=1; a+1", () => {
        it(" = 2", () => {
            var workspace = new Workspace();
            workspace.input("a=1 \n a+1");
            chai.assert.equal(workspace.expressions[1].result, '2');
        });
    });

    context("a=1; b=a+1; last+1", () => {
        it(" = 4", () => {
            var workspace = new Workspace();
            workspace.input("a=1 \n b=a+1 \n last+2");
            chai.assert.equal(workspace.expressions[2].result, '4');
        });
    });

    context("a = 2 * 2 +2 # And this", () => {
        it(" = 6", () => {
            var workspace = new Workspace();
            workspace.input("a = 2 * 2 + 2 # And this = 6");
            chai.assert.equal(workspace.expressions[0].result, '6');
        });
    });

    context("pow2(x) = x ^ 2; pow2(6)", () => {
        it(" = 36", () => {
            var workspace = new Workspace();
            workspace.input("pow2(x) = x ^ 2 \n pow2(6)");
            chai.assert.equal(workspace.expressions[1].result, '36');
        });
    });

    context("input a=1;a+1", () => {
        it("should generate file: a=1 = 1; a+1 = 2", () => {
            var workspace = new Workspace();
            workspace.input("a=1 \n a+1");
            chai.assert.equal(workspace.generateText(), 'a=1  = 1\r\n a+1 = 2\r\n');
        });
    });
});