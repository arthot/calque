import Workspace = require('../core/Workspace');

describe("Workspace", () => {
    context("input = 1\r\n\2", () => {
        it("should split to 2 lines", () => {
            var workspace = new Workspace();
            workspace.input("1\r\n\2");

            chai.assert.equal(workspace.lines.length, 2);
        });
    });
});