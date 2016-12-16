angular.module('bucketList', ['ionic','florian.directives','ionic.service.core','ion-alpha-scroll','ionic.contrib.drawer.vertical','base64','ksSwiper','ngCordova.plugins.cardIO','chart.js','ngMap','ng-mfb','ionic.service.analytics','ngCordova','ionic-datepicker','ionic.service.push','angularReverseGeocode','ngMessages','firebase', 'ngStorage','controllers','services'])



.run( function($ionicPlatform,$rootScope,$ionicAnalytics, $firebaseAuth, $firebase, $window, $ionicLoading,$state,$localStorage) {
  
    

    
      
        $rootScope.checkSession = function() {
            var auth = new FirebaseSimpleLogin(authRef, function(error, user) {
                if (error) {
                    // no action yet.. redirect to default route
                    $rootScope.userEmail = null;
                  
                     $state.go('signin');
                } else if (user) {
                   
                    // user authenticated with Firebase
                    $rootScope.userEmail = user.email;
                   
                     $state.go('menu.overview');
                } else {
                    // user is logged out
                    $rootScope.userEmail = null;
                   
                     $state.go('signin');
                }
            });
        }
      
     $rootScope.$storage = $localStorage.$default({
      seenIntro: false
    });
    console.log($rootScope.$storage.seenIntro);

    if ($rootScope.$storage.seenIntro== false) {
      
     
      $state.go('signin');
    } 
  
  
  
      $ionicAnalytics.register();
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

  
 
        // $rootScope.userEmail = null;
        $rootScope.baseUrl = 'https://onecard2.firebaseio.com/';
        var authRef = new Firebase($rootScope.baseUrl);
        $rootScope.auth = $firebaseAuth(authRef);
        

        $rootScope.show = function(text) {
            $rootScope.loading = $ionicLoading.show({
                template: text ? text : 'Loading..',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
        };

        $rootScope.hide = function() {
            $ionicLoading.hide();
        };

        $rootScope.notify = function(text) {
            $rootScope.show(text);
            $window.setTimeout(function() {
                $rootScope.hide();
            }, 1999);
        };

        $rootScope.logout = function() {
            $rootScope.auth.$logout();
            $rootScope.checkSession();
             $window.location.href = ('#/signin');
    
        };

      
        
        
//  push  notifcation
        
        
    
        
        
    
})



  
   

  

.config(function($stateProvider, $urlRouterProvider) {
  
  
    $stateProvider
        
        .state('signin', {
            url: '/signin',
            templateUrl: 'templates/auth-signin.html',
                    controller: 'SignInCtrl'
            
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'templates/auth-signup.html',
                    controller: 'SignUpCtrl'
            
            
        })
        
        
        .state('menu', {
      url: '/menu',
      abstract:true,
      templateUrl: 'templates/menu.html'
    })
      
    
    .state('intro', {
    url: '/a',
    templateUrl: "templates/intro.html",
    controller: 'IntroCtrl'
  })
  
  
 
  
      
      
  
        
   
    
  
          
    .state('menu.account', {
      url: '/account',
      views: {
        'side-menu21': {
          templateUrl: 'templates/account.html',
          controller: 'accountCtrl'
        }
      }
    })
        
      
   .state('menu.map', {
      url: '/map',
      views: {
        'side-menu21': {
          templateUrl: 'templates/map.html',
          controller: 'mapCtrl'
        }
      }
    })
      
        
    .state('menu.settings', {
      url: '/settings',
      views: {
        'side-menu21': {
          templateUrl: 'templates/settings.html',
          controller: 'settingsCtrl'
        }
      }
    })
    
       .state('menu.notification', {
      url: '/notification',
      views: {
        'side-menu21': {
          templateUrl: 'templates/notification.html',
          controller: 'notificationCtrl'
        }
      }
    })
    
       .state('menu.card', {
      url: '/card',
      views: {
        'side-menu21': {
          templateUrl: 'templates/card.html',
          controller: 'cardCtrl'
        }
      }
    })
    
   
    
      
        
    .state('menu.feedback', {
      url: '/feedback',
      views: {
        'side-menu21': {
          templateUrl: 'templates/feedback.html',
          controller: 'feedbackCtrl'
        }
      }
    })
    
    
     .state('menu.overview', {
      url: '/overview',
      
      views: {
        'side-menu21': {
          templateUrl: 'templates/overview.html',
          controller: 'overviewCtrl'
        }
      }
    })
    
         .state('media', {
            url: '/media',
            views: {
                'bucket-list': {
                     templateUrl: 'templates/bucket-list.html',
                    controller: 'myListCtrl'
                }
            }
        })
        .state('documents', {
            url: '/documents',
            views: {
                'bucket-completed': {
                    templateUrl: 'templates/bucket-completed.html',
                    controller: 'completedCtrl'
                }
            }
        }) 
   
     $urlRouterProvider.otherwise('/menu/overview');
});



angular.module('florian.directives', [])
// Create a `ion-search-bar` directive
.directive('ionSearchBar', function($timeout) {
  return {
    restrict: 'E',
    replace: true,
    scope: { search: '=?filter' },
    link: function(scope, element, attrs) {
      scope.placeholder = attrs.placeholder || '';
      scope.search = {value: '', focus: false};
      if (attrs.class) {
        element.addClass(attrs.class);
      }

      // We need the actual input field to detect focus and blur
      var inputElement = element.find('input')[0];

      // This function is triggered when the user presses the `Cancel` button
      scope.cancelSearch = function() {
        // Manually trigger blur
        inputElement.blur();
        scope.search.value = '';
      };

      // When the user focuses the search bar
      angular.element(inputElement).bind('focus', function () {
        // We store the focus status in the model to show/hide the Cancel button
        scope.search.focus = 1;
        // Add a class to indicate focus to the search bar and the content area
        element.addClass('search-bar-focused');
        angular.element(document.querySelector('.has-search-bar')).addClass('search-bar-focused');
        // We need to call `$digest()` because we manually changed the model
        scope.$digest();
      });
      // When the user leaves the search bar
      angular.element(inputElement).bind('blur', function() {
        scope.search.focus = 0;
        element.removeClass('search-bar-focused');
        angular.element(document.querySelector('.has-search-bar')).removeClass('search-bar-focused');
      });
    },
    template: '<div class="search-bar bar bar-header item-input-inset">' +
                '<label class="item-input-wrapper">' +
                  '<i class="icon ion-ios-search placeholder-icon"></i>' +
                  '<input type="search" placeholder="" ng-model="search.value">' +
                '</label>' +
                '<button class="button button-clear button-positive" ng-show="search.focus" ng-click="cancelSearch()">' +
                  'Cancel' +
                '</button>' +
              '</div>'
  };
});
