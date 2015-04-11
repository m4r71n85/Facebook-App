app.filter('adStatus', [function () {
    return function (input) {
        switch (input) {
            case "WaitingApproval":
                return "Waiting Approval";
            default:
                return input;
        }
    };
}]);