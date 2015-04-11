app.filter('emptyToDash', [function () {
    return function (input) {
        return input || "-";
    };
}]);