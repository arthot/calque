declare var math: any;

class Utils {
    static scopeClone(scope): any {
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

export = Utils;