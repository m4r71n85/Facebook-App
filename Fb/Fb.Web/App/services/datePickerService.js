'use strict';

app.factory('datePickerService', [
    function () {
        return ({
            init: init
        });

        function init(minMode) {
            var datePicker = {
                popup: 'dd/MMM/yyyy',
                isOpen: false,
                ngClick: function ($event) {
                    $event.stopPropagation();
                    this.isOpen = true;
                },
                options: {
                    formatYear: 'yy',
                    startingDay: 1
                }
            }
            return datePicker;
        }
    }
]);