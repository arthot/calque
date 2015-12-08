define(["require", "exports", '../core/Workspace'], function (require, exports, Workspace) {
    describe("Workspace", function () {
        context("input = 1\r\n\2", function () {
            it("should split to 2 lines", function () {
                var workspace = new Workspace();
                workspace.input("1\r\n\2");
                chai.assert.equal(workspace.lines.length, 2);
            });
        });
    });
});
//# sourceMappingURL=workspace-tests.js.map