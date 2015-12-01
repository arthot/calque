declare var math: any;

export class Utils {
    static scopeClone(scope) {
        var newScope = {};

        _.each(scope, function (value, name) {
            if (value instanceof Function) {
                newScope[name] = value;
            } else {
                newScope[name] = math.clone(value);
            }
        });

        return newScope;
    }
}