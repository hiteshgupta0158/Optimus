////This Controler is used to read current geoLocation of user if user allows to read it else open nw user form to provide country and pincode information
'use strict';
optimusApp.controller('dialogCtrl', function ($scope, $rootScope,$uibModal, $uibModalInstance) {
    $scope.positionLat = '';
    $scope.positionLong = '';

    ////when User selects "Allow" in previous dialog
    $scope.allow = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                ////Calls angular digest method to call all wrapped methods
                $scope.$apply(function () {
                    $scope.positionLat = position.coords.latitude;
                    $scope.positionLong = position.coords.longitude;
                    $scope.SearchWeather($scope.positionLat, $scope.positionLong,'','', $uibModalInstance);
                    
                    //$scope.SearchWeather('', '', $uibModalInstance);
                });
            });
        }
    }


    ////When user selects "Deny" to real geoLocation of user
    $scope.deny = function () {
        ////close the current dialog
        $uibModalInstance.dismiss('cancel');
        ////Open new dialog
        $scope.openForm();
    }


    $scope.submit = function () {
        $scope.SearchWeather('','',$scope.Country, $scope.Pincode, $uibModalInstance);
    }


    ////Open User forms.
    $scope.openForm = function () {
        var modalInstance = $uibModal.open({
            //animation: true,// $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/common/Form.html',
            controller: 'dialogCtrl',scope:$scope.$parent,
            animation: false,
            backdrop: false,
            keyboard: false,
        });
    };
});
