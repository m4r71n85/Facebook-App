app.factory('adsFilterHelper', [
    'itemsPerPage',
    function (itemsPerPage) {
        var settings = {};

        var resetSettings = function () {
            settings = { startPage: 1, pageSize: itemsPerPage, townId: '', categoryId: '', status: '' };
        }

        var setPage = function (page) {
            settings.startPage = page;
        }

        var getPage = function (page) {
            return settings.startPage;
        }

        var setCategory = function (categoryId) {
            settings.categoryId = categoryId;
            settings.startPage = 1;
        }

        var getCategory = function () {
            return settings.categoryId;
        }

        var setTown = function (townId) {
            settings.townId = townId;
            settings.startPage = 1;
        }

        var getTown = function () {
            return settings.townId;
        }

        var setStatus = function (status) {
            settings.status = status;
            settings.startPage = 1;
        }

        var getStatus = function () {
            return settings.status;
        }

        var getSettings = function () {
            return settings;
        }

        resetSettings();

        return {
            setCategory: setCategory,
            getCategory: getCategory,
            setTown: setTown,
            getTown: getTown,
            getPage: getPage,
            setPage: setPage,
            getStatus: getStatus,
            setStatus: setStatus,
            getSettings: getSettings,
            resetSettings: resetSettings
        };
    }])