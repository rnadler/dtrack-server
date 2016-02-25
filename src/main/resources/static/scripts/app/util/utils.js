// General purpose utility methdods

var showAlert = function ($timeout, alert, message) {
    alert.message = message;
    alert.enabled = true;
    $timeout(function () {
        alert.enabled = false;
        alert.message = undefined;
    }, 5000);
};
