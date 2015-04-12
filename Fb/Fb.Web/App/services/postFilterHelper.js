app.factory('postFilterHelper', [
    'itemsPerPage',
    function (itemsPerPage) {
        var settings = {};

        var resetSettings = function () {
            settings = { startPage: 1, pageSize: itemsPerPage };
        }

        var setPage = function (page) {
            settings.startPage = page;
        }

        var getPage = function (page) {
            return settings.startPage;
        }

        var getSettings = function () {
            return settings;
        }

        resetSettings();

        return {
            getPage: getPage,
            setPage: setPage,
            getSettings: getSettings,
            resetSettings: resetSettings
        };
    }])