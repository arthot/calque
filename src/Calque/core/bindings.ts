ko.bindingHandlers['prop'] = {
    update: function (element, valueAccessor, allBindingsAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor()) || {};
        for (var propName in value) {
            if (typeof propName == "string") {
                var propValue = ko.utils.unwrapObservable(value[propName]);

                element[propName] = propValue;
            }
        }
    }
};