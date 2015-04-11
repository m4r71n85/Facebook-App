app.factory('authSessionHelper', [
    '$cookies', '$rootScope',
    function ($cookies, $rootScope) {

    var setSession = function(data) {
        $cookies.userSession = JSON.stringify(data);
        $rootScope.$broadcast('authState');
    }

    var getSession = function () {
        if ($cookies.userSession) {
            return JSON.parse($cookies.userSession);
        }
        return false;
    }

    var clearSession = function () {
        delete $cookies.userSession;
    }

    var getToken = function() {
        return getSession().access_token;
    }

    var getUsername = function() {
        return getSession().username;
    }

    var isLoggedIn = function () {
        return !!getSession();
    }
    var isAdmin = function () {
        return !!getSession().isAdmin;
    }

    return {
        getSession: getSession,
        setSession: setSession,
        getToken: getToken,
        getUsername: getUsername,
        clearSession: clearSession,
        isLoggedIn: isLoggedIn,
        isAdmin: isAdmin,
    };
}])