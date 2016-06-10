angular
    .module('instagramApp')
    .factory('serviceId', getImages);

function getImages () {
    return $http.get("/images")
        .success(function(data) {
            return data;
        })
         .error(function() {
        })
}