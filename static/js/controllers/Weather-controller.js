////Weather controller is main controller used to fetch weather information using Web API
'use strict';
optimusApp.controller('WeatherCtrl', function ($scope, $rootScope, $http, $uibModal) {
    $scope.Country = '';
    $scope.Pincode='';
    $scope.objWeather;
    $scope.WeatherIcon = '';
    $scope.Temprature = '';
    $scope.url = '';



    ////Method to fetch data using Web API
    $scope.SearchWeather = function (posLatitude, posLongitude,Country,Pincode,currentModelInstance) {
        
        ////Set default value of API url
        $scope.url = "http://api.openweathermap.org/data/2.5/weather?";

        if (!$scope.IsNull(Country))
            $scope.Country = Country;


        if (!$scope.IsNull(Pincode))
            $scope.Pincode = Pincode;


        ////If user will allow to access the current location then latitude and longitude location will be passed in url
        ////Else Country or pincode provided by user in user form
        if ($scope.IsNull(posLatitude) == false && $scope.IsNull(posLongitude) == false)
            $scope.url += "lat=" + posLatitude + "&lon=" + posLongitude;
        else if (!$scope.IsNull($scope.Pincode)) {
            $scope.url += "q=" + $scope.Pincode;
            if (!$scope.IsNull($scope.Country))
                $scope.url += "," + $scope.Country;
        }
        else if (!$scope.IsNull($scope.Country))
            $scope.url += "q=" + $scope.Country;

        ////Provide Units Measure and API Key ID in parameter
        $scope.url += "&units=metric&appid=93e24f8dee8bbaf1e81cba7799eb0db4";

        ////Make the Call the API 
        $http.get($scope.url)
        .then(function mySucces(response) {
            /////IF got response successfully from API Calll
            $scope.objWeather = response.data;
            $scope.WeatherIcon = "http://openweathermap.org/img/w/" + $scope.objWeather.weather[0].icon + ".png";
            $scope.Temprature = $scope.objWeather.main.temp;
        }, function myError(response) {
            /////IF got response with error from API Calll
            alert(response.data.message);
            $scope.WeatherIcon = '';
            $scope.Temprature = '';
            $scope.objWeather = undefined;
        });

        ////Close the Dialoge box
        currentModelInstance.close();
    }



    ////Check if object is null or not
    $scope.IsNull = function (obj) {
        if (obj == null || obj == undefined || obj == '')
            return true;
        else
            return false;
    }


    ////Convert Unix time stamp to normal Date Time Stamp
    $scope.unixToTimeString = function (unixTimestamp) {
        var d = new Date(unixTimestamp * 1000);
        var year = d.getFullYear();
        var monthStrings = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var month = monthStrings[d.getMonth()];
        var date = ('0' + d.getDate()).substr(-2);
        var hour = ('0' + d.getHours()).substr(-2);
        var min = ('0' + d.getMinutes()).substr(-2);
        var sec = ('0' + d.getSeconds()).substr(-2);

        return date + '. ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    }


    
    ////function to open the dialoge to read current location
    $scope.open = function () {
        var modalInstance = $uibModal.open({
            //animation: true,// $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views/common/dialog.html',
            controller: 'dialogCtrl',scope:$scope,
            animation : false, 
            backdrop : false, 
            keyboard : false,
        });
    };


    ////open dialog 
    $scope.open();
});



