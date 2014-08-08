'use strict';

var MYLIST = React.createClass({displayName: 'MYLIST',
            render: function() {

              var data = this.props.data;

              var rows = data.map(function(datum) {
                var clickHandler = function(ev){
                    console.log("Still in reactJs");
                    console.log(ev);
                };

                return (
                  React.DOM.tr( {onClick:clickHandler},
                    React.DOM.td(null, datum['0']),
                    React.DOM.td(null, datum['1']),
                    React.DOM.td(null, datum['2']),
                    React.DOM.td(null, datum['3']),
                    React.DOM.td(null, datum['4'])
                  )
                );
              });

              return (
                React.DOM.table(null,
                  rows
                )
              );
            }
        });
        
        
        
        
'use strict';

/*global $:false */
/*global google:false */


angular.module('ZeitfadenApp').directive('fastRepeat',function(ResponsiveService,$modal,$log){

return{
                restrict: 'E',
                scope:{
                    data: '='
                },
                link:function(scope, el, attrs){
                    scope.$watch('data', function(newValue, oldValue){
                        React.renderComponent(
                            MYLIST({data:newValue}),
                            el[0]
                        );
                    });
                }
          };

});
        
        

angular.module('ZeitfadenApp').controller('ReactCtrl', function($scope,StationService,$routeParams,$location,LoginService,$fileUploader) {
         
$scope.framework = 'ReactJs';
            $scope.data = [];
            // Fill the data map with random data
            for(var i = 0; i < 1500; ++i) {
                $scope.data[i] = {};
                for(var j = 0; j < 5; ++j) {
                    $scope.data[i][j] = Math.random();
                }
            }         
         
});
