/* global $rootScope */

angular.module('controllers', [])
    .controller('SignInCtrl', [
        '$scope', '$rootScope', '$firebaseAuth', '$window',
        
        function($scope, $rootScope, $firebaseAuth, $window,$ionicUser, $ionicPush,$state, $q, UserService, $ionicLoading, $localStorage) {
            // check session
            $rootScope.checkSession();
            $scope.create = function() {
              $rootScope.signup  = true; 
    $window.location.href = ('#/signup')
};

 $scope.forget = function() {
    $rootScope.signup  = false; 
    $window.location.href = ('#/signup')
};
  
  $scope.authenticate = function() {
  var ref = new Firebase("https://onecard2.firebaseio.com");
ref.authWithOAuthPopup("facebook", function(error, authData) {
  if (error) {
    $rootScope.notify("Authentication Failed!", error);
  } else {
    $rootScope.notify("Welcome " + authData.facebook.displayName + "");
    
     $window.location.href = ('#/menu/overview');
    
  }
});
  }


            $scope.user = {
                email: "",
                password: ""
            };
            $scope.validateUser = function() {
                $rootScope.show('Please wait.. Authenticating');
                var email = this.user.email;
                var password = this.user.password;
                if (!email || !password) {
                    $rootScope.notify("Please enter valid credentials");
                    return false;
                }
                
                

                $rootScope.auth.$login('password', {
                    email: email,
                    password: password
                }).then(function(user) {
                    $rootScope.hide();
                    $rootScope.userEmail = user.email;
                    $window.location.href = ('#/menu/overview');
                }, function(error) {
                    $rootScope.hide();
                    if (error.code == 'INVALID_EMAIL') {
                        $rootScope.notify('Invalid Email Address');
                    } else if (error.code == 'INVALID_PASSWORD') {
                        $rootScope.notify('Invalid Password');
                    } else if (error.code == 'INVALID_USER') {
                        $rootScope.notify('Invalid User');
                    } else {
                        $rootScope.notify('Oops something went wrong. Please try again later');
                    }
                });
            };
            
  //          var fbLoginSuccess = function(response) {
  //   if (!response.authResponse){
  //     fbLoginError("Cannot find the authResponse");
  //     return;
  //   }

  //   var authResponse = response.authResponse;

  //   getFacebookProfileInfo(authResponse)
  //   .then(function(profileInfo) {
  //     //for the purpose of this example I will store user data on local storage
  //     UserService.setUser({
  //       authResponse: authResponse,
	// 			userID: profileInfo.id,
	// 			name: profileInfo.name,
	// 			email: profileInfo.email,
  //       picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
  //     });

  //     $ionicLoading.hide();
  //     $state.go('menu.overview');

  //   }, function(fail){
  //     //fail get profile info
  //     console.log('profile info fail', fail);
  //   });
  // };


  // //This is the fail callback from the login method
  // var fbLoginError = function(error){
  //   console.log('fbLoginError', error);
  //   $ionicLoading.hide();
  // };

  // //this method is to get the user profile info from the facebook api
  // var getFacebookProfileInfo = function (authResponse) {
  //   var info = $q.defer();

  //   facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
  //     function (response) {
	// 			console.log(response);
  //       info.resolve(response);
  //     },
  //     function (response) {
	// 			console.log(response);
  //       info.reject(response);
  //     }
  //   );
  //   return info.promise;
  // };

  // //This method is executed when the user press the "Login with facebook" button
  // $scope.facebookSignIn = function() {

  //   facebookConnectPlugin.getLoginStatus(function(success){
  //    if(success.status === 'connected'){
  //       // the user is logged in and has authenticated your app, and response.authResponse supplies
  //       // the user's ID, a valid access token, a signed request, and the time the access token
  //       // and signed request each expire
  //       console.log('getLoginStatus', success.status);

	// 			//check if we have our user saved
	// 			var user = UserService.getUser('facebook');

	// 			if(!user.userID)
	// 			{
	// 				getFacebookProfileInfo(success.authResponse)
	// 				.then(function(profileInfo) {

	// 					//for the purpose of this example I will store user data on local storage
	// 					UserService.setUser({
	// 						authResponse: success.authResponse,
	// 						userID: profileInfo.id,
	// 						name: profileInfo.name,
	// 						email: profileInfo.email,
	// 						picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
	// 					});

	// 					$state.go('menu.oveerview');

	// 				}, function(fail){
	// 					//fail get profile info
	// 					console.log('profile info fail', fail);
	// 				});
	// 			}else{
	// 				$state.go('menu.overview');
	// 			}

  //    } else {
  //       //if (success.status === 'not_authorized') the user is logged in to Facebook, but has not authenticated your app
  //       //else The person is not logged into Facebook, so we're not sure if they are logged into this app or not.
  //       console.log('getLoginStatus', success.status);

	// 		  $ionicLoading.show({
  //         template: 'Logging in...'
  //       });

  //       //ask the permissions you need. You can learn more about FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
  //       facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
  //     }
  //   });
  
          
  //  };
     
        }])

.controller('SignUpCtrl', [
    '$scope', '$rootScope', '$firebaseAuth', '$window',
    function($scope, $rootScope, $firebaseAuth, $window, $ionicLoading) {

$scope.bSignup =  $rootScope.signup;
        $scope.user = {
            email: "",
            password: ""
        };
    
 
    
        $scope.createUser = function() {
            var email = this.user.email;
            var password = this.user.password;
            if (!email || !password) {
                $rootScope.notify("Please enter valid credentials");
                return false;
            }
            $rootScope.show('Please wait.. Registering');
            var item7 = "";
            var item8 = "";
 
            $scope.auth.$createUser(email, password, function(error, user) {
                if (!error) {
                    $rootScope.hide();
                    $rootScope.userEmail = user.email;
                    $window.location.href = ('#/menu/overview');
                     var itemRef3 = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
        itemRef3.update({
            item7 : item7,
            item8 : item8
        }, function(error) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Oops! something went wrong. Try again later');
            } else {
                $rootScope.hide();
                $rootScope.notify('Successfully updated');
            }
        });
                    
                } else {
                    $rootScope.hide();
                    if (error.code == 'INVALID_EMAIL') {
                        $rootScope.notify('Invalid Email Address');
                    } else if (error.code == 'EMAIL_TAKEN') {
                        $rootScope.notify('Email Address already taken');
                    } else {
                        $rootScope.notify('Oops something went wrong. Please try again later');
                    }
                }
            });
        }
        
        
        
         $scope.forgetPassword=function(){
           
           var firebaseRef = new Firebase("https://onecard2.firebaseio.com/");
var email = this.user.email;
   if (!email ) {
                $rootScope.notify("Please enter valid credentials");
                return false;
            }
            
            firebaseRef.resetPassword({
  email: email
}, function(error) {
  if (error) {
    switch (error.code) {
      case "INVALID_USER":
         $rootScope.notify("The specified user account does not exist.");
        break;
      default:
         $rootScope.notify("Error resetting password:", error);
    }
  } else {
     $rootScope.notify("Password reset email sent successfully!");
  }
});
           
         }
        
        // facebook
        // $scope.user = UserService.getUser();

	// $scope.showLogOutMenu = function() {
	// 	var hideSheet = $ionicActionSheet.show({
	// 		destructiveText: 'Logout',
	// 		titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
	// 		cancelText: 'Cancel',
	// 		cancel: function() {},
	// 		buttonClicked: function(index) {
	// 			return true;
	// 		},
	// 		destructiveButtonClicked: function(){
	// 			$ionicLoading.show({
	// 			  template: 'Logging out...'
	// 			});

    //     // Facebook logout
    //     facebookConnectPlugin.logout(function(){
    //       $ionicLoading.hide();
    //       $state.go('welcome');
    //     },
    //     function(fail){
    //       $ionicLoading.hide();
    //     });
	// 		}
	// 	});
	// };
    }
])

.controller('myListCtrl', function($rootScope, $scope, $window,  $ionicPlatform,$cordovaCamera, $firebase,$ionicBackdrop, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate) {
   $scope.allImages = [{
    src: 'templates/img/ionic.png'
  }, {
    src: 'templates/img/debit-card.png'
  }];
 $scope.allVideo = 
  [{
    src: 'templates/img/harshit.mp4'
  }, {
    src: 'templates/img/harshit.mp4'
  },
  {src: 'templates/img/harshit.mp4'}
  ];
  $scope.zoomMin = 1;
  
  $scope.showImages = function(index) {
  $scope.activeSlide = index;
  $scope.showModal('templates/image-popover.html');
};
 
$scope.showModal = function(templateUrl) {
  $ionicModal.fromTemplateUrl(templateUrl, {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
    $scope.modal.show();
  });
}
 
$scope.closeModal = function() {
  $scope.modal.hide();
  $scope.modal.remove()
};
 
$scope.updateSlideStatus = function(slide) {
  var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;
  if (zoomFactor == $scope.zoomMin) {
    $ionicSlideBoxDelegate.enableSlide(true);
  } else {
    $ionicSlideBoxDelegate.enableSlide(false);
  }
};


   
 
$scope.playVideo = function(index) {
   $scope.activeSlide = index;
   $scope.clipSrc = this.allVideo[index].src;
	$scope.showModal('templates/video-popover.html');
}

 $ionicPlatform.ready(function() {
     
    $scope.AddImage = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
   
                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                }
                
                $scope.AddVideo = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
   
                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                    var imageForm = {src :$scope.imgURI };
                   $scope.allImages.push(imageForm) ;
                    
                    
                    
                 }
                 
               
  });
 
 
  

  
                
        
    
    
    
   
})



.controller('mapCtrl', function($scope, $ionicPopup,$ionicPlatform, $rootScope,$ionicLoading,$cordovaGeolocation) {
 $ionicPlatform.ready(function(){
  $rootScope.positions = [{
    lat: 43.07493,
    lng: -89.381388
  }];

  $scope.$on('mapInitialized', function(event, map) {
    $scope.map = map;
  });

  $scope.centerOnMe= function(){
  $rootScope.positions = [];
    
    
    $ionicLoading.show({
      template: 'Loading...'
    });

 
   
   
   
        
        
      var onSuccess=  function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      $rootScope.positions.push({lat: pos.lat(),lng: pos.lng()});
      console.log(pos);
      $scope.map.setCenter(pos);
      
      
    
       
     
      };    
      
     var onError =  function onError(error) {
    $ionicPopup.alert({
     title: 'Turn on your gps',
     template: 'Could not locate your device'
   });
}
    navigator.geolocation.getCurrentPosition(onSuccess, onError,{maximumAge:6000,timeout:2000,enableHighAccuracy:true});
      
     
      $ionicLoading.hide();
      
     
  };
  });
})

.controller('newCtrl', function($rootScope, $scope, $window, $firebase,$ionicModal) {
  var key = $rootScope.key;
  if(key){
     var itemRef6 = new Firebase($rootScope.baseUrl +  "/hospitals");
    itemRef6.child($rootScope.key + "/General").on('value', function(snapshot) {
        var data = snapshot.val();
        console.log(data);
        if(data.Hospitalname ){
         $scope.Hospitalname =  data.Hospitalname ;
$scope.CategoryGovernment =  data.CategoryGovernment;

$scope.CategoryPrivate = data.CategoryPrivate;
$scope.CategoryOthers = data.CategoryOthers;
$scope.ParentOrganization    = data.ParentOrganization;
$scope.Address1 = data.Address1;
$scope.Address2 = data.Address2;
$scope.PinCode = data.PinCode;
$scope.City = data.City;
$scope. Email = data.Email;
$scope.Website = data.Website;
$scope.EmergencyContactNo = data.EmergencyContactNo;
$scope.AppointmentContactNo = data.AppointmentContactNo;
$scope.ReceptionContactNo = data.ReceptionContactNo;
$scope.InternationalPatientsContactNo = data.InternationalPatientsContactNo;
$scope.AmbulanceContactNo = data.AmbulanceContactNo;
$scope.HelplineNo = data.HelplineNo;
$scope.Fax = data.Fax
$scope.SMS = data.SMS
$scope.YearEstablished = data.YearEstablished;
$scope.Area = data.Area;
$scope.facilityOthers = data.facilityOthers;
$scope.FacilityDescription = data.FacilityDescription;
$scope.SeoKeywords = data.SeoKeywords;
$scope.AccreditationsAwards = data.AccreditationsAwards;
$scope.SelectfBeds = data.SelectfBeds;
$scope.TotalBeds = data.TotalBeds;
$scope.Physicians = data.Physicians;
$scope.OPDTimings = data.OPDTimings;
$scope.ConsultationCharges = data.ConsultationCharges;
$scope.amenities[0].AmenitiesFacilities  = data.AirAmbulance;
    $scope.amenities[1].AmenitiesFacilities  = data.Alimentation;
    $scope.amenities[2].AmenitiesFacilities  = data.Ambulance;
    $scope.amenities[3].AmenitiesFacilities  = data.Appointment;
    $scope.amenities[4].AmenitiesFacilities  = data.AppointmentsatEvening;
    $scope.amenities[5].AmenitiesFacilities  = data.AppointmentsatWeekend;
    $scope.amenities[6].AmenitiesFacilities  = data.ATM;
    $scope.amenities[7].AmenitiesFacilities  = data.Cafeteria;
    $scope.amenities[8].AmenitiesFacilities  = data.ChildCare;
    $scope.amenities[9].AmenitiesFacilities  = data.ComputersEmail;
    $scope.amenities[10].AmenitiesFacilities  = data.DiningServices;
    $scope.amenities[11].AmenitiesFacilities  = data.Heliport;
    $scope.amenities[12].AmenitiesFacilities  = data.ICAMRL;

    $scope.amenities[13].AmenitiesFacilities  = data.ICU;
    $scope.amenities[14].AmenitiesFacilities  = data.InformationCenter;
    $scope.amenities[15].AmenitiesFacilities  = data.InHouseLaboratory;
    $scope.amenities[16].AmenitiesFacilities  = data.InsuranceandPaymentMethods;
    $scope.amenities[17].AmenitiesFacilities  = data.InternetAccess;
    $scope.amenities[18].AmenitiesFacilities  = data.JointCommission;
    $scope.amenities[19].AmenitiesFacilities  = data.LanguageAssistance;
    $scope.amenities[20].AmenitiesFacilities  = data.LaundaryFacility;
    $scope.amenities[21].AmenitiesFacilities  = data.LocalAccomodationAssistance;
    $scope.amenities[22].AmenitiesFacilities  = data.ParkingFree;
    $scope.amenities[23].AmenitiesFacilities  = data.ParkingPaid;
    $scope.amenities[24].AmenitiesFacilitiesy  = data.Pharmac;

    $scope.amenities[25].AmenitiesFacilities  = data.PhysicianConsultation;
    $scope.amenities[26].AmenitiesFacilities  = data.PhysicianPortal;
    $scope.amenities[27].AmenitiesFacilities  = data.PrayerHouse;
    $scope.amenities[28].AmenitiesFacilities  = data.RegisteredandCertifiedNurseAssistants;
    $scope.amenities[29].AmenitiesFacilities  = data.Restaurant;
    $scope.amenities[30].AmenitiesFacilities  = data.RestaurantTelephone;
    $scope.amenities[31].AmenitiesFacilities  = data.Television;
    $scope.amenities[32].AmenitiesFacilities  = data.TelevisioninLobby;
    $scope.amenities[33].AmenitiesFacilities  = data.WaitingRoom;
    $scope.amenities[34].AmenitiesFacilities  = data.Wifi;
    $scope.amenities[35].AmenitiesFacilities  = data.AmenitiesFacilitiesOthers;
   $scope.AmenitiesOthers =data.AmenitiesOthers;
   $scope.NearByPlaces = data.NearByPlaces;
    $scope.LabaratoryOthers = data.LabaratoryOthers;
       $scope.OPDFee = data.OPDFee;
       $scope.RoomTariff = data.RoomTariff;
       $scope.OtherTariff = data.OtherTariff;
       $scope.TreatmentPackages = data.TreatmentPackages;
       $scope.ComprehensivePackages = data.ComprehensivePackages;
       $scope.OtherPackages = data.OtherPackages;
       


        }   
        });
        
        
         itemRef6.child($rootScope.key + "/General").on('value', function(snapshot) {
        var data = snapshot.val();
        console.log(data);
         });
  }
  
  $rootScope.OpenForm = function(){
  $rootScope.form = "General";
  $scope.General = "false";
   $scope.Facility = "true";
    $scope.Labaratory = "true";
    $scope.Price = "true";
          $scope.Insurance = "true";
           $scope.Speciality = "true";
            $scope.Doctors = "true";
     $scope.SPC = "true";
    $("#idGeneral").show();
    $("#idFacility").css('visibility','hidden');
      $("#idLaboratory").css('visibility','hidden');
      $("#idPrice").css('visibility','hidden');
       $("#idInsurance").css('visibility','hidden');
        $("#idDoctors").css('visibility','hidden');
           $("#idSPC").css('visibility','hidden');
       $("#idFormBack").css('visibility','hidden');
 
  }
   
    
   $scope.backToPreviousForm = function() {
     if($rootScope.form === "Facility"){
       
        $ionicModal.fromTemplateUrl('templates/newitem.html', function(modal) {
        $scope.newTemplate = modal;
         $scope.newTemplate.show();
  });
    
     }
     else if ($rootScope.form === "Labaratory"){
        $rootScope.GeneralForm();
     }
      else if ($rootScope.form === "Price"){
       $rootScope.FacilityForm();
     }
     else if ($rootScope.form === "Insurance"){
        $rootScope.LabaratoryForm();
       
     }
      else if ($rootScope.form === "Speciality"){
       $rootScope.PriceForm();
    
     
       
     }
     else if ($rootScope.form === "Doctors"){
       
       $rootScope.InsuranceForm();
     
       
     }
     else if ($rootScope.form === "SPC"){
       $rootScope.SpecialityForm();
       
      
       
     }
   }
   
   $scope.amenities = [{name:'Air Ambulance'},
                         {name:'Alimentation (3 meals a day)'},
                         {name:'Ambulance'},
                         {name:'Appointment before 8 A.M.'},
                         {name:'Appointments at Evening'},
                         {name:'Appointments at Weekend'},
                         {name:'ATM'},
                         {name:'Cafeteria'},
                         {name:'Child Care'},
                         {name:'Computers & E-mail'},
                         {name:'Dining Services'},
                         {name:'Heliport'},
                         {name:'ICAMRL'},
                         
                         {name:'ICU'},
                         {name:'Information Center'},
                         {name:'In House Laboratory'},
                         {name:'Insurance and Payment Methods'},
                         {name:'Internet Access'},
                         {name:'Joint Commission'},
                         {name:'Language Assistance'},
                         {name:'Laundary Facility'},
                         {name:'Local Accomodation Assistance'},
                         {name:'Parking - Free'},
                         {name:'Parking - Paid'},
                         {name:'Pharmacy'},
                         
                         {name:'Physician Consultation'},
                         {name:'Physician Portal'},
                         {name:'Prayer House'},
                         {name:'Registered and Certified Nurse + 2 Assistants 24/7'},
                         
                         {name:'Restaurant'},
                         {name:'RestaurantTelephone'},
                         {name:'Television'},
                         {name:'Television in Lobby'},
                           {name:'Waiting Room'},
                             {name:'Wifi'},
                               {name:'Others'}
                         ];
   $scope.laboratories = [{name:'Not Applicable'},
                           {name:'Blood Bank'},
                           {name:'Blood Sugar test'},
                           {name:'CT Scan'},
                           {name:'Cyber knife'},
                           {name:'ECG'},
                           
                           {name:'EEG'},
                           {name:'Electro Interstitial Scanning (EIS)'},
                           {name:'Emergency'},
                           {name:'Endosopy'},
                           {name:'Eye Bank'},
                           {name:'ICCU'},
                           {name:'ICU'},
                           {name:'IVF'},
                           {name:'Mammography'},
                           {name:'MRI'},
                           {name:'PET CT'},
                           {name:'TMT'},
                           {name:'Ultasound'},
                           {name:'4D Ultrasound'},
                           {name:'X-ray'},
                           {name:'Others'}
                          ];
   
   
   
      $scope.insurances = [{name: 'Not Applicable'},
    {name: 'Alankit Healthcare Limited'},
    {name: 'Anmol Medicare TPA Limited'},
    {name: 'Apollo Munich'},
    {name: 'Bajaj Allianze General Insurance Company Limited'},
    {name: 'Central Government Health Scheme'},
    {name: 'Cholamandalam'},
    {name: 'Cigna TTK'},
    {name: 'Dedicated Healthcare Services (I) Pvt. Limited'},
    {name: 'E-Meditek (TPA) Services Limited'},
    {name: 'East West Assist Private Limited'},
    {name: 'Family Health Plan Limited'},
    {name: 'Focus Health Services (TPA) Private Limited'},
    {name: 'Future Generali Total Insurance Solution'},
    {name: 'Genins India TPA Limited'},
    {name: 'Good Health Plan Limited'},
    {name: 'HDFC ErgoHealth India TPA Services Private Limited'},
    {name: 'Heritage Health TPA Private LimitedI-Care'},
    {name: 'ICICI LombardICICI Prudential'},
    {name: 'IFFCO Tokio General Insurance'},
    {name: 'Indus MedinetL & T InsuranceMax Bupa Health Insurance Company'},
    {name: 'MD India Healthcare Services (TPA) Private Limited'},
    {name: 'Medi Assist India TPA Private Limited'},
    {name: 'Medicare TPA Services (I) Private Limited'},
    {name: 'Medsave Healthcare Limited'},
    {name: 'National Insurance Co. Limited (Govt.)'},
    {name: 'New India Assurance Co. Limited (Govt.)'},
    {name: 'Oriental Insurance Co. Limited (Govt.)'},
    {name: 'Paramount Health Services (TPA) Private Limited'},
    {name: 'Park Mediclaim Consultants Private Limited'},
    {name: 'Raksha TPA Private Limited'},
    {name: 'Reliance General InsuranceReligare health insurance'},
    {name: 'Rothshield Healthcare (TPA) Services Limited'},
    {name: 'Safeway Mediclaim Services (P) Limited'},
    {name: 'Spurthi Meditech TPA Pvt. LimitedStar Health and Allied Insurance'},
    {name: 'TTK Healthcare Services Private Limited'},
    {name: 'United Healthcare (UHC) India Pvt. Limited'},
    {name: 'United Healthcare Parekh TPA Private Limited'},
    {name: 'United India Insurance Co. Limited (Govt.)'},
    {name: 'Vanbreda International'},
    {name :'Vidal Health (TPA) Pvt. Limited'},
    {name: 'Vipul Medcorp Private Limited'},
    {name:'Others'}
];
       
   $scope.treatments = [
     {name : 'Not Applicable'},
{name : 'Allergy & Immunology'},
{name : 'Alternative Medicine (Naturopathy/ Acupunture/ Unani)'},
{name : 'Anaesthesiology'},
{name : 'Audiology'},
{name : 'Ayurveda-Yoga'},
{name : 'Bioresonance'},
{name : 'Cancer'},
{name : 'Cardiology'},
{name : 'Cardiovascular Surgery'},
{name : 'Critical Care Medicine'},
{name : 'Dental Sciences'},
{name : 'Dermatology'},
{name : 'Early Diagnosis Disease'},
{name : 'Endocrinology'},
{name : 'ENT'},
{name : 'Family Practice'},
{name : 'Follow up Care'},
{name : 'Gastroenterology'},
{name : 'General Medicine'},
{name : 'General Surgery'},
{name : 'Genetics'},
{name : 'Geriatrics'},
{name : 'Hand Surgery'},
{name : 'Hematology'},
{name : 'Homeopathy'},
{name : 'Immunology'},
{name : 'Internal Medicine'},
{name : 'IVF'},
{name : 'Laparoscopy Surgery (Minimal Access/ Invasive Surgery)'},
{name : 'Licensed Professional Counselling'},
{name : 'Marriage and Family Therapy'},
{name : 'Maternal Fetal Medicine'},
{name : 'Meridian II'},
{name : 'Midwifery'},
{name : 'Neonatal Medicine'},
{name : 'Nephrology & Urology'},
{name : 'Neurology'},
{name : 'Nuclear Medicine'},
{name : 'Nurse Anaesthetist'},
{name : 'Obsterics & Gynaecology'},
{name : 'Occupational Therapy'},
{name : 'Oncology'},
{name : 'Opthalmology'},
{name : 'Oral Maxillofacial Surgery'},
{name : 'Organ Transplant'},
{name : 'Orthopaedics'},
{name : 'Otolaryngology'},
{name : 'Paediatrics'},
{name : 'Pathology'},
{name : 'Physiotherapy'},
{name : 'Plastic & Cosmetic Surgery'},
{name : 'Psychiatry'},
{name : 'Podiatry'},
{name : 'Pulmonology'},
{name : 'Radiation Oncology'},
{name : 'Radiology'},
{name : 'Rehabilitation Medicine'},
{name : 'Rheumatology'},
{name : 'Speech and Language Therapy'},
{name : 'Sports Medicine'},
{name : 'Stem CellTraumatology'},
{name : 'Vascular Surgery'},
{name : 'Wellness and Recovery Center'},
{name : 'Others'}];
   
   
   
   
   
   
   
   
   
   
   
   var undefinedtoalse = function(item){
     if (!item)
     {
       item = "";
      
     }
      return item;
     
   }
  
    $scope.edit = function()
    
    {
      var Hospitalname =  undefinedtoalse(this.Hospitalname) ;
    var CategoryGovernment =  undefinedtoalse(this.CategoryGovernment);
    
    var CategoryPrivate = undefinedtoalse(this.CategoryPrivate);
     var CategoryOthers = undefinedtoalse(this.CategoryOthers);
    
var ParentOrganization    = undefinedtoalse(this.ParentOrganization);
    var Address1 = undefinedtoalse(this.Address1);
    var Address2 = undefinedtoalse(this.Address2);
    var PinCode = undefinedtoalse(this.PinCode);
    var City = undefinedtoalse(this.City);
   var  Email = undefinedtoalse(this.Email);
    var Website = undefinedtoalse(this.Website);
    var EmergencyContactNo = undefinedtoalse(this.EmergencyContactNo);
    var AppointmentContactNo = undefinedtoalse(this.AppointmentContactNo);
    var ReceptionContactNo = undefinedtoalse(this.ReceptionContactNo);
    var InternationalPatientsContactNo = undefinedtoalse(this.InternationalPatientsContactNo);
    var AmbulanceContactNo = undefinedtoalse(this.AmbulanceContactNo);
    var HelplineNo = undefinedtoalse(this.HelplineNo);
    var Fax = undefinedtoalse(this.Fax)
    var SMS = undefinedtoalse(this.SMS)
   var YearEstablished = undefinedtoalse(this.YearEstablished); 
   var Area = undefinedtoalse(this.Area);
   var facilityOthers = undefinedtoalse(this.facilityOthers);
   var FacilityDescription = undefinedtoalse(this.FacilityDescription);
   var SeoKeywords = undefinedtoalse(this.SeoKeywords);
   var AccreditationsAwards = undefinedtoalse(this.AccreditationsAwards);
   var SelectfBeds = undefinedtoalse(this.SelectfBeds);
   var TotalBeds = undefinedtoalse(this.TotalBeds);
   var Physicians = undefinedtoalse(this.Physicians);
   var OPDTimings = undefinedtoalse(this.OPDTimings);
   var ConsultationCharges = undefinedtoalse(this.ConsultationCharges);

     
     
    var name  = this.Hospitalname;
       $rootScope.show("Please wait... Updating List");
      itemRef6.child($rootScope.key+ "/General").update({
            Hospitalname : Hospitalname,
             CategoryGovernment : CategoryGovernment, 
             iteCategoryPrivatem : CategoryPrivate,
             CategoryOthers : CategoryOthers,
             ParentOrganization :ParentOrganization,
    Address1 :Address1,
    Address2 :Address2,
    PinCode :PinCode,
    City :City,
    Email :Email,
    Website :Website,
    EmergencyContactNo :EmergencyContactNo,
    AppointmentContactNo :AppointmentContactNo,
    ReceptionContactNo :ReceptionContactNo,
    InternationalPatientsContactNo :InternationalPatientsContactNo,
    AmbulanceContactNo :AmbulanceContactNo,
    HelplineNo :HelplineNo,
    Fax :Fax,
    SMS :SMS,
    YearEstablished :YearEstablished,
    Area :Area,
    facilityOthers :facilityOthers,
    FacilityDescription :FacilityDescription,
    SeoKeywords :SeoKeywords,
    AccreditationsAwards :AccreditationsAwards,
    SelectfBeds :SelectfBeds,
    TotalBeds :TotalBeds,
    Physicians :Physicians,
    OPDTimings :OPDTimings,
    ConsultationCharges :ConsultationCharges
        }, function(error) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Oops! something went wrong. Try again later');
            } else {
                $rootScope.hide();
                 
       itemRef6.child($rootScope.key + "/Progress").update({
         General : "true"
        });
                $rootScope.notify('Successfully updated');
                
                 $rootScope.GeneralForm();
            }
        });
    }
   
   
 
   
     $scope.edit1 = function() {
         for (var index = 0; index < this.items.length; index++) {
    if(!this.items[index].AmenitiesFacilities)
     {
       this.items[index].AmenitiesFacilities = "";}
   }
       var form = {
         
    AirAmbulance : this.items[0].AmenitiesFacilities,
    Alimentation : this.items[1].AmenitiesFacilities,
    Ambulance : this.items[2].AmenitiesFacilities,
    Appointment : this.items[3].AmenitiesFacilities,
    AppointmentsatEvening : this.items[4].AmenitiesFacilities,
    AppointmentsatWeekend : this.items[5].AmenitiesFacilities,
    ATM : this.items[6].AmenitiesFacilities,
    Cafeteria : this.items[7].AmenitiesFacilities,
    ChildCare : this.items[8].AmenitiesFacilities,
    ComputersEmail : this.items[9].AmenitiesFacilities,
    DiningServices : this.items[10].AmenitiesFacilities,
    Heliport : this.items[11].AmenitiesFacilities,
    ICAMRL : this.items[12].AmenitiesFacilities,

    ICU : this.items[13].AmenitiesFacilities,
    InformationCenter : this.items[14].AmenitiesFacilities,
    InHouseLaboratory : this.items[15].AmenitiesFacilities,
    InsuranceandPaymentMethods : this.items[16].AmenitiesFacilities,
    InternetAccess : this.items[17].AmenitiesFacilities,
    JointCommission : this.items[18].AmenitiesFacilities,
    LanguageAssistance : this.items[19].AmenitiesFacilities,
    LaundaryFacility : this.items[20].AmenitiesFacilities,
    LocalAccomodationAssistance : this.items[21].AmenitiesFacilities,
    ParkingFree : this.items[22].AmenitiesFacilities,
    ParkingPaid : this.items[23].AmenitiesFacilities,
    Pharmac : this.items[24].AmenitiesFacilities,

    PhysicianConsultation : this.items[25].AmenitiesFacilities,
    PhysicianPortal : this.items[26].AmenitiesFacilities,
    PrayerHouse : this.items[27].AmenitiesFacilities,
    RegisteredandCertifiedNurseAssistants: this.items[28].AmenitiesFacilities,

    Restaurant : this.items[29].AmenitiesFacilities,
    RestaurantTelephone : this.items[30].AmenitiesFacilities,
    Television : this.items[31].AmenitiesFacilities,
    TelevisioninLobby : this.items[32].AmenitiesFacilities,
    WaitingRoom : this.items[33].AmenitiesFacilities,
    Wifi : this.items[34].AmenitiesFacilities,
    AmenitiesFacilitiesOthers : this.items[35].AmenitiesFacilities,
 AmenitiesOthers : undefinedtoalse(this.AmenitiesOthers),
         NearByPlaces : undefinedtoalse(this.NearByPlaces)

         
       }
       
          $rootScope.show("Please wait... Updating List");
       
        itemRef6.child($rootScope.key+ "/Amenities&Facilities").update( form
           , function(error) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Oops! something went wrong. Try again later');
            } else {
                $rootScope.hide();
                  itemRef6.child($rootScope.key + "/Progress").update({
          AmenitiesFacilities : "true"
        });
                $rootScope.notify('Successfully updated');
               $rootScope.FacilityForm();
            }
       
     
           });
     }
   
    $scope.edit2 = function() {
    
      
      var form2 = {
        LabaratoryOthers : undefinedtoalse(this.LabaratoryOthers)
      }
      
        $rootScope.show("Please wait... Updating List");
        
        itemRef6.child($rootScope.key+ "/Labaratory").update( form2
           , function(error) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Oops! something went wrong. Try again later');
            } else {
                $rootScope.hide();
                 itemRef6.child($rootScope.key + "/Progress").update({
          Labaratory : "true"
        });
                $rootScope.notify('Successfully updated');
                 $rootScope.LabaratoryForm();
            }
       
     
           });
      
    }
    
     $scope.edit3 = function() {
      
      var form3 = {
       OPDFee : undefinedtoalse(this.OPDFee),
       RoomTariff : undefinedtoalse(this.RoomTariff),
       OtherTariff : undefinedtoalse(this.OtherTariff),
       TreatmentPackages : undefinedtoalse(this.TreatmentPackages),
       ComprehensivePackages : undefinedtoalse(this.ComprehensivePackages),
       OtherPackages : undefinedtoalse(this.OtherPackages)

      }
      
        $rootScope.show("Please wait... Updating List");
     
        itemRef6.child($rootScope.key+ "/Price").update( form3
           , function(error) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Oops! something went wrong. Try again later');
            } else {
                $rootScope.hide();
                 itemRef6.child($rootScope.key + "/Progress")  .update({
          Price : "true"
        });
                $rootScope.notify('Successfully updated');
                $rootScope.PriceForm();
            }
       
     
           });
      
    }
    
       $scope.edit4 = function() {
           for (var index = 0; index < this.insurances.length; index++) {
    if(!this.insurances[index].available)
     {
       this.insurances[index].available = "";}
   }
      
      var form4 = {
       NotApplicable: this.insurances[0].available,
    HealthcareLimited: this.insurances[1].available,
    MedicareTPALimited: this.insurances[2].available,
    Munich: this.insurances[3].available,
    AllianzeGeneralInsuranceCompanyLimited: this.insurances[4].available,
    GovernmentHealthScheme: this.insurances[5].available,
    Cholamandalam : this.insurances[6].available,
    TTK: this.insurances[7].available,
    HealthcareServicesPvtLimited : this.insurances[8].available,
    EMeditekTPServicesLimited: this.insurances[9].available,
    WestAssistPrivateLimited: this.insurances[10].available,
    FamilyHealthPlanLimited: this.insurances[11].available,
    HealthServicesTPPrivateLimited: this.insurances[12].available,
    GeneraliTotalInsuranceSolution: this.insurances[13].available,
    IndiaTPALimited: this.insurances[14].available,
    GoodHealthPlanLimited : this.insurances[15].available,
    ErgoHealthIndiaTPAServicesPrivateLimited: this.insurances[16].available,
    HeritageHealthTPAPrivateLimitedICare : this.insurances[17].available,
    ICICILombardICICIPrudential : this.insurances[18].available,
    IFFCOTokioGeneralInsurance : this.insurances[19].available,
    IndusMedinetLInsuranceMaxBupa : this.insurances[20].available,
    MDIndiaHealthcareServices : this.insurances[21].available,
    MediAssistIndiaPrivateLimited : this.insurances[22].available,
    MedicareServicesPrivateLimited : this.insurances[23].available,
    MedsaveHealthcareLimited : this.insurances[24].available,
    NationalnsuranceGovt : this.insurances[25].available,
    NewIndiaAssuranceGovt: this.insurances[26].available,
    OrientalInsuranceGovt : this.insurances[27].available,
    ParamountHealth : this.insurances[28].available,
    ParkMediclaimConsultants : this.insurances[29].available,
    RakshaPrivate: this.insurances[30].available,
    RelianceGeneralInsuranceReligare : this.insurances[31].available,
    RothshieldHealthca : this.insurances[32].available,
    SafewayMediclaim : this.insurances[33].available,
    SpurthiMeditech : this.insurances[34].available,
    TTKHealthcareServices: this.insurances[35].available,
    UnitedHealthcare : this.insurances[36].available,
    UnitedHealthcareParekh  : this.insurances[37].available,
    UnitedIndiaInsurance  : this.insurances[38].available,
    VanbredaInternationalVidalHealth : this.insurances[39].available,
    VipulMedcorp  : this.insurances[40].available,
    Others : this.insurances[41].available,
InsuranceOthers : undefinedtoalse(this.InsuranceOthers)


      }
      
        $rootScope.show("Please wait... Updating List");
     
        itemRef6.child($rootScope.key+ "/Insurance").update( form4
           , function(error) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Oops! something went wrong. Try again later');
            } else {
                $rootScope.hide();
                 itemRef6.child($rootScope.key + "/Progress")  .update({
         Insurance : "true"
        });
                $rootScope.notify('Successfully updated');
               $rootScope.InsuranceForm();
            }
       
     
           });
           
       }
           
              $scope.edit5 = function() {
           for (var index = 0; index < this.treatments.length; index++) {
    if(!this.treatments[index].Available)
     {
       this.treatments[index].Available = "";}
   }
      
      var form5 = {
      NotApplicable : this.treatments[0].Available,
     AllergyImmunology : this.treatments[1].Available,
     AlternativeMedicine : this.treatments[2].Available,
     Anaesthesiology : this.treatments[3].Available,
     Audiology : this.treatments[4].Available,
     AyurvedaYoga : this.treatments[5].Available,
     Bioresonance : this.treatments[6].Available,
     Cancer : this.treatments[7].Available,
     Cardiology : this.treatments[8].Available,
     CardiovascularSurgery : this.treatments[9].Available,
     CriticalCareMedicine : this.treatments[10].Available,
     DentalSciences : this.treatments[11].Available,
     Dermatology : this.treatments[12].Available,
     EarlyDiagnosisDisease : this.treatments[13].Available,
     Endocrinology : this.treatments[14].Available,
     ENT : this.treatments[15].Available,
     FamilyPractice : this.treatments[16].Available,
     FollowupCare : this.treatments[17].Available,
     Gastroenterology : this.treatments[18].Available,
     GeneralMedicine : this.treatments[19].Available,
     GeneralSurgery : this.treatments[20].Available,
     Genetics : this.treatments[21].Available,
     Geriatrics : this.treatments[22].Available,
     HandSurgery : this.treatments[23].Available,
     Hematology : this.treatments[24].Available,
     Homeopathy : this.treatments[25].Available,
     Immunology : this.treatments[26].Available,
     InternalMedicine : this.treatments[27].Available,
     IVF : this.treatments[28].Available,
     LaparoscopySurgery : this.treatments[29].Available,
     LicensedProfessionalCounselling : this.treatments[30].Available,
     MarriageandFamilyTherapy : this.treatments[31].Available,
     MaternalFetalMedicine : this.treatments[32].Available,
     Meridian : this.treatments[33].Available,
     Midwifery : this.treatments[34].Available,
     NeonatalMedicine : this.treatments[35].Available,
     NephrologyUrology : this.treatments[36].Available,
     Neurology : this.treatments[37].Available,
     NuclearMedicine : this.treatments[38].Available,
     NurseAnaesthetist : this.treatments[39].Available,
     ObstericsGynaecology : this.treatments[40].Available,
     OccupationalTherapy : this.treatments[41].Available,
     Oncology : this.treatments[42].Available,
     Opthalmology : this.treatments[43].Available,
     OralMaxillofacialSurgery : this.treatments[44].Available,
     OrganTransplant : this.treatments[45].Available,
     Orthopaedics : this.treatments[46].Available,
     Otolaryngology : this.treatments[47].Available,
     Paediatrics : this.treatments[48].Available,
     Pathology : this.treatments[49].Available,
     Physiotherapy : this.treatments[50].Available,
     PlasticCosmeticSurgery : this.treatments[51].Available,
     Psychiatry : this.treatments[52].Available,
     Podiatry : this.treatments[53].Available,
     Pulmonology : this.treatments[54].Available,
     RadiationOncology : this.treatments[55].Available,
     Radiology : this.treatments[56].Available,
     RehabilitationMedicine : this.treatments[57].Available,
     Rheumatology : this.treatments[58].Available,
     SpeechandLanguageTherapy : this.treatments[59].Available,
     SportsMedicine : this.treatments[60].Available,
     StemCellTraumatology : this.treatments[61].Available,
     VascularSurgery : this.treatments[62].Available,
     WellnessandRecoveryCenter : this.treatments[63].Available,
     Others : undefinedtoalse(this.TreatmentOthers)

      }
      
        $rootScope.show("Please wait... Updating List");
     
        itemRef6.child($rootScope.key+ "/Speciality").update( form5
           , function(error) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Oops! something went wrong. Try again later');
            } else {
                $rootScope.hide();
                 itemRef6.child($rootScope.key + "/Progress").update({
          Speciality : "true"
        });
                $rootScope.notify('Successfully updated');
                $rootScope.SpecialityForm();
              
            }
       
     
           });
           
              }
             $scope.edit6 = function() {
          
   
      
      var form6 = {
     Doctordetails : undefinedtoalse(this.Doctordetails)

      }
      
        $rootScope.show("Please wait... Updating List");
     
        itemRef6.child($rootScope.key+ "/Doctors").update( form6
           , function(error) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Oops! something went wrong. Try again later');
            } else {
                $rootScope.hide();
                 itemRef6.child($rootScope.key + "/Progress").update({
          Doctors : "true"
        });
                $rootScope.notify('Successfully updated');
                $rootScope.DoctorsForm();
               
            }
       
     
           });
             }
      
       $scope.edit7 = function() {
          
   
      
      var form7 = {
     ContactPerson : undefinedtoalse(this.ContactPerson),
     ContactNo : undefinedtoalse(this.ContactNo),
     ContactEmail : undefinedtoalse(this.ContactEmail)

      }
      
        $rootScope.show("Please wait... Updating List");
     
        itemRef6.child($rootScope.key+ "/Contacts").update( form7
           , function(error) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Oops! something went wrong. Try again later');
            } else {
                $rootScope.hide();
                 itemRef6.child($rootScope.key + "/Progress").update({
          Contacts : "true"
        });
  $window.location.href = ('#/menu/overview');        
                $scope.close();
               
              
            }
       
     
           });
      
      
    }
   $scope.close = function() {
        $scope.modal.hide();
    };

   
   
   
   
})



.controller('MyCtrl', function($scope, $ionicGesture, $window, $interval) {
  $scope.lastEventCalled = 'Try to Drag the content up, down, left or rigth';
  var element = angular.element(document.querySelector('#eventPlaceholder'));
  var events = [{
    event: 'dragup',
    text: 'You dragged me UP!'
  },{
    event: 'dragdown',
    text: 'You dragged me Down!'
  },{
    event: 'dragleft',
    text: 'You dragged me Left!'
  },{
    event: 'dragright',
    text: 'You dragged me Right!'
  }];
  
  angular.forEach(events, function(obj){
    $ionicGesture.on(obj.event, function (event) {
      $scope.$apply(function () {
        $scope.lastEventCalled = obj.text;
      });
    }, element);
  });
})

.controller('overviewCtrl',  function($scope,$ionicPopup, $http,$rootScope,$location,$ionicModal,$firebase) {
$scope.hospitallist = [];

$scope.mediaurl = function(){
  $.ajax({
    url: 'https://hn.brickftp.com/api/rest/v1/sessions',
    
    type: 'post',
 
    
    
    data: {
 "username": "harshit886@outlook.com", 
    "password": "harshit@886"}
    }).then(function successCallback(response) {
   
    var uesrMediaId = response.id;
     console.log(uesrMediaId);
     userMediaSession(uesrMediaId);
     
     
  }, function errorCallback(response) {
    console.log("error");
  });
   
  
  
  
}





var userMediaSession = function(uesrMediaId){
  $.ajax({
    url: 'https://hn.brickftp.com/api/rest/v1/users',
    
    type: 'get',
     
  
    dataType: 'jsonp'
  
    }).then(function successCallback(response) {
   
   console.log(response);
     
     
     
  }, function errorCallback(response) {
    console.log("error");
  });
   
  
  
  
  
}


$scope.addHospital  = function(){
  
  $scope.hospital ={};
   $ionicPopup.show({
     title: "Add Hospital",
    
     
    
      template: 'Enter Hospital Name<input class="" type="name" ng-model="hospital.name">'
                      + ' Enter Id  <input  class="" type="name" ng-model="hospital.id">',
   
    
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Ok</b>',
        type: 'button-balanced',
        
      }
    ]
     });
  
  
  
  
} 

var addNewHospital  = function(form,hospitalId,e){
 var newHospital = new Firebase($rootScope.baseUrl + "/hospitals/")
 newHospital.on("value", function(dataSnapshot) {
 var bHospitalIdExist =  dataSnapshot.hasChild(hospitalId);
 if(bHospitalIdExist=== false){
  newHospital.child(hospitalId).update(form,function(error,e) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Oops! something went wrong. Try again later');
            } else {
                $rootScope.hide();
                $rootScope.notify('Successfully Requested');
            
            }
            });
 }
 else{
    $rootScope.notify('Hospital Unique Id already taken. Try with another Id.');
     
 }
});

  
   }    
  
	 var itemRef8 = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
    itemRef8.on('value', function(snapshot) {
        var data = snapshot.val();
        console.log(data.hospitals);
      
        var i = 0;
                $scope.hospitalAssign = [];
                 for (var key in data.hospitalAssign) {
                   data.hospitalAssign[key].key = key;
                $scope.hospitalAssign.push(data.hospitalAssign[key]);
                if($scope.hospitalAssign[i].progress){
                 
        $scope.hospitalAssign[i].progressvalue = ($scope.hospitalAssign[i].progress/9)*100;
                }   
                i = i +1;
                }
       });
        var allHospitalsFB = new Firebase($rootScope.baseUrl);
        allHospitalsFB.child("hospitals").orderByChild("hospitalAssign").equalTo(false).on('value', function(snapshot){ 
        
          var data = snapshot.val();
          console.log(data);
          $scope.hospitallist = [];
          for (var key in data) {
            data[key].key = key;
                $scope.hospitallist.push(data[key]);}
        
        
        });
   $("#idsearch").next().hide();
        $("#idsearch").prev().hide();
        
        $("#idback").hide();
	$scope.sidemenu = function(link){
		$location.path(link);
	}
  
   $scope.Sort = function() {
     if( $scope.sort ==='+name'){
        $scope.sort = '';
        $("#idsort").removeClass("button-positive");
         $("#idsort").addClass("button-calm");
     }
     else{
        $scope.sort = '+name';
         $("#idsort").removeClass("button-calm");
          $("#idsort").addClass("button-positive");
        
     }
     
      
    
    };
    
    
   
 $scope.StartMR = function(key){
     $ionicPopup.show({
     title: this.hospital.name,
    
     template: 'Are you sure you want to request for '+this.hospital.name+'',
   
    
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Yes</b>',
        type: 'button-positive',
        onTap: function() {
       requestMR(key);
          
        }
      }
    ]
     });
 }
   var requestMR = function(key){
      var allHospitalsFB = new Firebase($rootScope.baseUrl + "/hospitals"  );
      
        allHospitalsFB.child(key).update({hospitalAssign : true,  MRID : $rootScope.userEmail} ,function(error,e) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Oops! something went wrong. Try again later');
            } else {
              
            allHospitalsFB.child(key).on('value',function(snapshot){
        $scope.data = snapshot.val();
        
        
        });
      $scope.key = $scope.data.hospitalId;
       
       itemRef8.child("hospitalAssign/" + $scope.key).update($scope.data);
       $rootScope.notify('Successfully Requested');
            }
            });
 
        
        
       
    //  allHospitalsFB.child(key).remove( function(error) {
    //         if (error) {
    //             $rootScope.hide();
    //             $rootScope.notify('Oops! something went wrong. Try again later');
    //         } else {
    //             $rootScope.hide();
    //             $rootScope.notify('Successfully Requested');
    //         }
    //     });
        
        //  var allHospitalsAssign = new Firebase($rootScope.baseUrl + "/hospitalsAssign"  );
        
        //  allHospitalsAssign.push( form,function(error) {
        //     if (error) {
        //         $rootScope.hide();
        //         $rootScope.notify('Oops! something went wrong. Try again later');
        //     } else {
        //         $rootScope.hide();
        //         $rootScope.notify('Successfully Requested');
        //     }
        // });
     
    }
    
    
  
 
    
     $scope.Search = function()
      {
        
        $("#idsearch").parent().parent().prev().hide();
        $("#idback").parent().prev().hide();
        $("#idback").show();
        $("#idsearch").next().show();
        $("#idsearch").next().animate({ width: "15em"});
        
        console.log("hi");
      };
      
       $scope.back = function()
      {
         $("#idback").parent().prev().show();
        $("#idback").hide();
        
        $("#idsearch").parent().parent().prev().show();
        $("#idsearch").parent().parent().prev().prev().show();
        $("#idsearch").next().hide();
         $("#idsearch").next().css('width','0em');
        $("#idsearch").prev().hide();
        console.log("hi");
      };
      
      
  
  	$scope.hospitals = [{name:'HOSPITAL11', phone:'BELLANDUR,BANGALORE'},
                         {name:'HOSPITAL18', phone:'MARATHALI,BANGALORE'},
                         {name:'HOSPITAL2', phone:'INDIRANAGAR,BANGALORE'},
                         {name:'HOSPITAL14', phone:'HSR,BANGALORE'},
                         {name:'RAJIV GANDHI', phone:'WHITEFIELD,BANGALORE'},
                         {name:'APOLLO', phone:'YASHWANTPUR,BANGALORE'},
                         {name:'MAX', phone:'YASHWANTPUR,BANGALORE'}];
   
   

  
   
  

  var onSuccess=  function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
       $rootScope.positions =[];
      $rootScope.positions.push({lat: pos.lat(),lng: pos.lng()});
      
      console.log($rootScope.positions);
    
       
      
    
       
     
      };    
        var onError =  function (error) {
    $ionicPopup.alert({
     title: 'Turn on your gps',
     template: 'Could not locate your 1 device'
   });
   }
      
    // navigator.geolocation.getCurrentPosition(onSuccess, onError,{maximumAge:6000,timeout:2000,enableHighAccuracy:true});

    
         $scope.newTask = function(key) {
      
    
      if(43.07493 ==$rootScope.positions[0].lat)
      {
          $ionicModal.fromTemplateUrl('templates/newPass.html', function(modal) {
        $scope.newTemplate = modal;
        $scope.newTemplate.show();
        // $rootScope.OpenForm(); 
        
  //        if(!progress)
  // { 
  //   $rootScope.OpenForm(); 
  // }
    
  //    else if (progress === 1)
  //    {  $rootScope.GeneralForm();}
    
  //    else if (progress === 2)
  //    {  $rootScope.FacilityForm();}
    
  //     else if (progress === 3)
  //    {  $rootScope.LabaratoryForm();}
     
  //    else if (progress === 4)
  //    {  $rootScope.PriceForm();}
  //    else if (progress === 5)
  //    {  $rootScope.InsuranceForm();}
  //    else if (progress === 6)
  //    {  $rootScope.SpecialityForm();}
  //    else if (progress === 7)
  //    {  $rootScope.DoctorsForm();}
    });
    $rootScope.key = key;
    
    
        }
      else
      
      {  $ionicPopup.show({
     title: 'You are not on location',
    
     template: 'Click on navigate to reach desired hospital.',
   
    
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Navigate</b>',
        type: 'button-positive',
        onTap: function() {
        $scope.location();
          
        }
      }
    ]
     
     
    
     
   });
   
   }
         };
   
 
       
      
    
         
         
          $scope.location = function(key,progress) {
		 launchnavigator.navigate("London, UK");
    
          }
          
           $scope.call = function() {
          window.plugins.CallNumber.callNumber(onSuccess1, onError1, "8860065329" , true);
 
           }
           
          function onSuccess1(result){
  console.log("Success:"+result);
}

function onError1(result) {
  console.log("Error:"+result);
  

}

 
           
  })


.controller('transactionCtrl', function($ionicPlatform,$scope,$ionicModal,$ionicLoading,$ionicPopup,$rootScope, $cordovaCamera, $cordovaFile,$firebase) {
    
      
         
         
             
          $ionicModal.fromTemplateUrl('templates/newItem.html', function(modal) {
        $scope.newTemplate = modal;
    });
         
          $scope.transaction = function() {
             $scope.modal.hide();
           $scope.newTemplate.show();
         };
         
          $scope.close = function() {
        $scope.modal.hide();
    };
         
          $scope.labels = ["General", "Speciality", "Labaratory & Equipments", "Price & Packages", "Insurances","Facillities","Doctors"];
  $scope.data = [10, 40, 20, 90, 10, 100, 50];
   $scope.labels1 = ["Completed","Not Completed"]; 
  $scope.data1 = [40,60];
         
          
 
         
      $ionicPlatform.ready(function() {   
         
   
   $scope.images = [];
 
$scope.addImage = function() {
	// 2
	var options = {
		destinationType : Camera.DestinationType.FILE_URI,
		sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
		allowEdit : false,
		encodingType: Camera.EncodingType.JPEG,
		popoverOptions: CameraPopoverOptions,
	};
	
	// 3
	$cordovaCamera.getPicture(options).then(function(imageData) {
 
		// 4
		onImageSuccess(imageData);
 
		function onImageSuccess(fileURI) {
			createFileEntry(fileURI);
		}
 
		function createFileEntry(fileURI) {
			window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
		}
 
		// 5
		function copyFile(fileEntry) {
			var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
			var newName = makeid() + name;
 
			window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
				fileEntry.copyTo(
					fileSystem2,
					newName,
					onCopySuccess,
					fail
				);
			},
			fail);
		}
		
		// 6
		function onCopySuccess(entry) {
			$scope.$apply(function () {
				$scope.images.push(entry.nativeURL);
			});
		}
 
		function fail(error) {
			console.log("fail: " + error.code);
		}
 
		function makeid() {
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 
			for (var i=0; i < 5; i++) {
				text += possible.charAt(Math.floor(Math.random() * possible.length));
			}
			return text;
		}
 
	}, function(err) {
		console.log(err);
	});
}



$scope.urlForImage = function(imageName) {
  var name = imageName.substr(imageName.lastIndexOf('/') + 1);
  var trueOrigin = cordova.file.dataDirectory + name;
  return trueOrigin;
}
                 
               
  });

})

.controller('testCtrl', function($scope,$rootScope, $cordovaCamera, $ionicPlatform, $firebase) {
 
 
  $ionicPlatform.ready(function() {
      var bucketListRef7 = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
    bucketListRef7.on('value', function(snapshot) {
        $scope.list = [];
        var data = snapshot.val();
        console.log(data);
         console.log($rootScope.image);
         
           $rootScope.image = data.item17;
        });
    $scope.takePhoto = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
   
                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                }
                
                $scope.choosePhoto = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
   
                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $rootScope.imgURI = "data:image/jpeg;base64," + imageData;
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                    
                    var item17 =  $rootScope.imgURI;
                    
                    
                      var itemRef4 = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
        itemRef4.update({
            item17 :  item17
            
        }, function(error) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Oops! something went wrong. Try again later');
            } else {
                $rootScope.hide();
                $rootScope.notify('Successfully updated');
            }
                }); 
                 }
                 
               
  });
 
 
  

  var bucketListRef6 = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
    bucketListRef6.on('value', function(snapshot) {
        $scope.list = [];
        var data = snapshot.val();
        console.log(data);
         console.log($rootScope.image);
          $rootScope.name = data.item14;
          $rootScope.Phonenumber = data.item15;
          $rootScope.Email = data.item16;
           
        });
      
       
                
        
    
     $scope.edit = function(){var item14 =  this.name ;
    var item15 = this.Phonenumber;
    var item16 = this.Email;
    
       $rootScope.show("Please wait... Updating List");
        var itemRef4 = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
        itemRef4.update({
            item14 : item14,
             item15 : item15, 
             item16 : item16
        }, function(error) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Oops! something went wrong. Try again later');
            } else {
                $rootScope.hide();
                $rootScope.notify('Successfully updated');
            }
        });
    }

})
.controller('AppCtrl', function($scope,$location, $window) {
	$scope.sidemenu = function(link){
		$location.path(link);
	}
  
  $scope.sidemenu('/menu/bucket/list');
   
    
})


.controller('accountCtrl', function($scope,$rootScope, $cordovaCamera, $ionicPlatform, $firebase) {
 
 
  $ionicPlatform.ready(function() {
      var bucketListRef7 = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
    bucketListRef7.on('value', function(snapshot) {
        $scope.list = [];
        var data = snapshot.val();
        console.log(data);
         console.log($rootScope.image);
         
           $rootScope.image = data.item17;
        });
    $scope.takePhoto = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
   
                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                }
                
                $scope.choosePhoto = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
   
                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $rootScope.imgURI = "data:image/jpeg;base64," + imageData;
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                    
                    var item17 =  $rootScope.imgURI;
                    
                    
                      var itemRef4 = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
        itemRef4.update({
            item17 :  item17
            
        }, function(error) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Oops! something went wrong. Try again later');
            } else {
                $rootScope.hide();
                $rootScope.notify('Successfully updated');
            }
                }); 
                 }
                 
               
  });
 
 
  

  var bucketListRef6 = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
    bucketListRef6.on('value', function(snapshot) {
        $scope.list = [];
        var data = snapshot.val();
        console.log(data);
         console.log($rootScope.image);
          $rootScope.name = data.item14;
          $rootScope.Phonenumber = data.item15;
          $rootScope.Email = data.item16;
           
        });
      
       
                
        
    
     $scope.edit = function(){var item14 =  this.name ;
    var item15 = this.Phonenumber;
    var item16 = this.Email;
    
       $rootScope.show("Please wait... Updating List");
        var itemRef4 = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
        itemRef4.update({
            item14 : item14,
             item15 : item15, 
             item16 : item16
        }, function(error) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Oops! something went wrong. Try again later');
            } else {
                $rootScope.hide();
                $rootScope.notify('Successfully updated');
            }
        });
    }

})
.controller('IntroCtrl', function($scope, $rootScope) {
  $scope.slides = {
    currentSlide: 0
  };
  $scope.title = '<i class="icon ion-android-home"></i>';

  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
    if (index == 2)
      $rootScope.$storage.seenIntro = true;
  };
})

.controller('patternCtrl', function($scope, LoginService, $ionicPopup, $state) {
    // 1
    $scope.log_pattern = LoginService.getLoginPattern();

    // 2
    var lock = new PatternLock("#lockPattern", {
        // 3
        onDraw:function(pattern){
            // 4
            if ($scope.log_pattern) {
                
                
          LoginService.checkLoginPattern(pattern).success(function(data) {
                    lock.reset();
                     
                    
                    
                }).error(function(data) {
                    lock.error();
                   
                $rootScope.show("Invalid Pattern");
           
                    
                });
                       
                
            } else {
                // 6
                LoginService.setLoginPattern(pattern);
                lock.reset();
                $scope.$apply(function() {
                    $scope.log_pattern = LoginService.getLoginPattern();    
                });
               $rootScope.show("Succesfully Created");
                $state.go('menu.settings');
            }
           
        }
    });
    
    
       var lock1 = new PatternLock("#lockPattern1", {  
        // 3
        onDraw:function(pattern){
            // 4
            if (LoginService.checkLoginPattern(pattern)) {
                 LoginService.setLoginPattern(pattern);
                lock1.reset();
                $scope.$apply(function() {
                    $scope.log_pattern = LoginService.getLoginPattern();    
                });
                 $state.go('menu.settings');
            }
        }
    });
    
    
     

    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('tab.dash');
        }).error(function(data) {
          $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})







.controller('alwaysCtrl',  function($scope, $rootScope, $ionicUser, $ionicPush) { 
    $scope.identifyUser = function() {
	var user = $ionicUser.get();
	if(!user.user_id) {
		// Set your user_id here, or generate a random one.
		user.user_id = $ionicUser.generateGUID();
	};
 
	// Metadata
	
 
	// Identify your user with the Ionic User Service
	$ionicUser.identify(user).then(function(){
		$scope.identified = true;
		console.log('Identified user ' + user.name + '\n ID ' + user.user_id);
	});
};

$scope.pushRegister = function() {
 console.log('Ionic Push: Registering user');
 
 // Register with the Ionic Push service.  All parameters are optional.
 $ionicPush.register({
   canShowAlert: true, //Can pushes show an alert on your screen?
   canSetBadge: true, //Can pushes update app icon badges?
   canPlaySound: true, //Can notifications play a sound?
   canRunActionsOnWake: true, //Can run actions outside the app,
   onNotification: function(notification) {
     // Handle new push notifications here
     return true;
   }
 });
};
        

})
.controller('MainCtrl', function($scope) {
    $scope.confirmed = '1';
 
  $scope.selectChange = function() {
    switch($scope.confirmed) {
      case '1': $scope.selected = '1';break;
  
      case '2': $scope.selected = '2';break;
    }
  }
  $scope.selectChange();
  
})

.controller('newPassCtrl',  function($rootScope, $scope, $window, $ionicModal, $firebase) {
    var key = $rootScope.key;
  if(key){
     var itemRef6 = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail) + "/hospitalAssign");
    itemRef6.child($rootScope.key).on('value', function(snapshot) {
        var data = snapshot.val();
        console.log(data);
        if(data.name ){
         $scope.Hospitalname =  data.name ;
        }
    });
    
  }
  
   var itemRef7 = new Firebase($rootScope.baseUrl + "/hospitals");
    itemRef7.child($rootScope.key + "/Progress").on('value', function(snapshot) {
        var data = snapshot.val();
        console.log(data);
       $scope.Form = data ;
    });
    
  
  
 
    
    $scope.openForm = function(){
      $ionicModal.fromTemplateUrl('templates/newItem.html', function(modal) {
        $scope.newTemplate = modal;
        $scope.newTemplate.show();
        $rootScope.OpenForm(); 
      
    });
    }
    
    $rootScope.GeneralForm = function(){
  $scope.modal.hide();
  $ionicModal.fromTemplateUrl('templates/facility.html', function(modal) {
        $scope.newTemplate = modal;
         $scope.newTemplate.show();
  });
  
      $rootScope.form = "Facility";
    
     
     
   }
   $rootScope.FacilityForm = function(){
     $scope.modal.hide();
    $ionicModal.fromTemplateUrl('templates/laboratory.html', function(modal) {
        $scope.newTemplate = modal;
         $scope.newTemplate.show();
  });
      $rootScope.form = "Labaratory"
     
     
   }
    $rootScope.LabaratoryForm = function(){
      $scope.modal.hide();
    $ionicModal.fromTemplateUrl('templates/price.html', function(modal) {
        $scope.newTemplate = modal;
         $scope.newTemplate.show();
  });
  
      $rootScope.form = "Price"
     
     
   }
   
   
    $rootScope.PriceForm = function(){
      $scope.modal.hide();
   $ionicModal.fromTemplateUrl('templates/insurance.html', function(modal) {
        $scope.newTemplate = modal;
         $scope.newTemplate.show();
  });
    
      
      $rootScope.form = "Insurance";
     
     
   }
   
   
    $rootScope.InsuranceForm = function(){
      $scope.modal.hide();
     $ionicModal.fromTemplateUrl('templates/speciality.html', function(modal) {
        $scope.newTemplate = modal;
         $scope.newTemplate.show();
  });
    
    
      
      $rootScope.form = "Speciality";
     
     
   }
   
   
    $rootScope.SpecialityForm = function(){
      $scope.modal.hide();
    $ionicModal.fromTemplateUrl('templates/doctors.html', function(modal) {
        $scope.newTemplate = modal;
         $scope.newTemplate.show();
  });
   
      
      $rootScope.form = "Doctors";
     
     
   }
   
   
   
    $rootScope.DoctorsForm = function(){
      $scope.modal.hide();
     $ionicModal.fromTemplateUrl('templates/SPC.html', function(modal) {
        $scope.newTemplate = modal;
         $scope.newTemplate.show();
  });
     
     
      
      $rootScope.form = "SPC";
     
     
   }
   
    
    $scope.FacilityForm = function() {
      $rootScope.GeneralForm()
    } 
    
     $scope.LabaratoryForm = function() {
     $rootScope.FacilityForm()
    } 
    
     $scope.PriceForm = function() {
      $rootScope.LabaratoryForm()
    } 
    
      $scope.InsuranceForm = function() {
     $rootScope.PriceForm()
    } 
      $scope.SpecialityForm = function() {
       $rootScope.InsuranceForm()
    } 
      $scope.DoctorsForm = function() {
      $rootScope.SpecialityForm()
    } 
    
      $scope.SPCForm = function() {
      $rootScope.DoctorsForm()
    } 
    
   
   
   
 
   
     $scope.openMedia = function(){
      $ionicModal.fromTemplateUrl('templates/newPass1.html', function(modal) {
        $scope.newTemplate = modal;
        $scope.newTemplate.show();
        
      
    });
    }
    
     $scope.data = {
        item7: ""
    };
     $scope.noData = function() {
         var bucketListRef2 = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
    bucketListRef2.on('value', function(snapshot) {
       
        var data = snapshot.val();
         console.log(data);
       
        $rootScope.item11= data.item7 ;

        if (!data.item7=="") {
            $scope.noData3 = true;
             console.log("yes");
        } else {
            $scope.noData3 = false;
            console.log("no");
        }
       
    });
return !$scope.noData3;
       
    };

    $scope.close = function() {
        $scope.modal.hide();
    };
     $scope.createNew = function(key) {
          var item7 = this.data.item7;
          var item9 = this.data.item9;
          console.log(item7);
          console.log(item9);
          console.log($rootScope.item11);
          
          if(!item9=="" && $rootScope.item11=== item7)
          { 
               item7 = item9;}
               
               else{
                    $scope.modal.hide();
                  $rootScope.notify('Invalid Pin. Try it again.');
                  
                  
                  return ;
                   
                   
               }
         $scope.modal.hide();
        $rootScope.show("Please wait... Updating List");
        var itemRef2 = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
        itemRef2.update({
            item7 : item7
        }, function(error) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Oops! something went wrong. Try again later');
            } else {
                $rootScope.hide();
                $rootScope.notify('Successfully updated');
            }
        });
    };
    
    
    
    
})

.controller('newPass1Ctrl', function($rootScope, $scope, $location,$window, $ionicModal, $firebase) {
    
    $scope.sidemenu = function(link){
		$location.path(link);
	}
    
     $scope.data = {
        item: ""
    };
     $scope.noData1 = function() {
         var bucketListRef3 = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
    bucketListRef3.on('value', function(snapshot) {
       
        var data = snapshot.val();
         console.log(data);
       
        $rootScope.item12= data.item8 ;

        if (!data.item8=="") {
            $scope.noData2 = true;
             console.log("yes");
        } else {
            $scope.noData2 = false;
            console.log("no");
        }
       
    });
    console.log(!$scope.noData2);
return !$scope.noData2;

       
    };

    $scope.close = function() {
        $scope.modal.hide();
    };
     $scope.createNew1 = function(key) {
          var item8 = this.data.item8;
          var item10 = this.data.item10;
          
          if(!item10=="" && $rootScope.item12== item8)
          { 
               item8 = item10;
            }
               else{
                    $scope.modal.hide();
                  $rootScope.notify('Invalid Password. Try it again.');
                  
                  
                  return ;
                   
                   
               }
         
         $scope.modal.hide();
        $rootScope.show("Please wait... Updating List");
        var itemRef3 = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
        itemRef3.update({
            item8 : item8
        }, function(error) {
            if (error) {
                $rootScope.hide();
                $rootScope.notify('Oops! something went wrong. Try again later');
            } else {
                $rootScope.hide();
                $rootScope.notify('Successfully updated');
            }
        });
    };
    
    
})   
.controller('settingsCtrl', function($scope,$window, $ionicPopup, $rootScope,$ionicLoading,$ionicModal, $cordovaGeolocation) {
    
  
     $scope.searchText="0";
    
      
   $scope.check = function (searchText) {
    console.log(searchText);
    if(searchText=="1")
   {$window.location.href = ('#/pattern');
    }
     if(searchText=="2")
   
  { $ionicModal.fromTemplateUrl('templates/newPass.html', function(modal) {
        $scope.newTemplate = modal;
    });
$scope.newTemplate.show();
       
   }
}

  
    
  $scope.ni_toggle = $window.localStorage.getItem('ni_toggle') === 'false';
    $scope.updateLocalStorage = function() {
        $window.localStorage.setItem('ni_toggle', $scope.ni_toggle);
        console.log($scope.ni_toggle);
        if($scope.ni_toggle==false){
              
   
     
       $rootScope.positions = [{
    lat: 43.07493,
    lng: -89.381388
  }];

  $scope.$on('mapInitialized', function(event, map) {
    $scope.map = map;
  });

  
  $rootScope.positions = [];
    
    
    $ionicLoading.show({
      template: 'Loading...'
    });

     var onSuccess=  function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      $rootScope.positions.push({lat: pos.lat(),lng: pos.lng()});
      console.log(pos);
      $scope.map.setCenter(pos);
      
      
    
       
     
      };    
      
     var onError =  function onError(error) {
    $ionicPopup.alert({
     title: 'Turn on your gps',
     template: 'Could not locate your device'
   });
}
    navigator.geolocation.getCurrentPosition(onSuccess, onError,{maximumAge:6000,timeout:2000,enableHighAccuracy:true});

      $ionicLoading.hide();
    
        }
        else
        {
             $rootScope.positions = [{
    lat: 43.07493,
    lng: -89.381388
  }];
            
            
            
        }
        
        };
        
     if($scope.ni_toggle==true){
              
   
     
       $rootScope.positions = [{
    lat: 43.07493,
    lng: -89.381388
  }];

  $scope.$on('mapInitialized', function(event, map) {
    $scope.map = map;
  });

  
  $rootScope.positions = [];
    
    
    $ionicLoading.show({
      template: 'Loading...'
    });

    var onSuccess=  function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      $rootScope.positions.push({lat: pos.lat(),lng: pos.lng()});
      console.log(pos);
      $scope.map.setCenter(pos);
      
      
    
       
     
      };    
      
     var onError =  function onError(error) {
    $ionicPopup.alert({
     title: 'Turn on your gps',
     template: 'Could not locate your device'
   });
}
    navigator.geolocation.getCurrentPosition(onSuccess, onError,{maximumAge:6000,timeout:2000,enableHighAccuracy:true});

      $ionicLoading.hide();
    
        }
        else
        {
             $rootScope.positions = [{
    lat: 43.07493,
    lng: -89.381388
  }];
            
            
            
        }
        
       
    
    
    
    

}) 


.controller('feedbackCtrl', function($scope) {
     $scope.numberSelection = 5;
    //  $scope.slider = 10* $scope.numberSelection;
     

})

.controller('scanCtrl', function($scope) {
    
    //  $scope.slider = 10* $scope.numberSelection;
      $scope.modalClasses = ['slide-in-up', 'slide-in-down', 'fade-in-scale', 'fade-in-right', 'fade-in-left', 'newspaper', 'jelly', 'road-runner', 'splat', 'spin', 'swoosh', 'fold-unfold'];


})

.controller('notificationCtrl', function($scope,$ionicPopup, $http, $cordovaLocalNotification, $ionicPlatform) {
   $scope.popup =  function () {
     console.log("hello");
    $ionicPopup.alert({
     title: 'Turn on your gps',
     template: 'Could not locate your 1 device'
   });
   }
  $scope.uploadFile = function(files) {
   
    //Take the first selected file
    $scope.file = files[0];
    console.log(files);
  }
   $scope.onClickUpload  = function(params) {
     var data1 = new FormData();

data1.append("file", $scope.file);
      
  console.log($scope.file);
   
      $http({
          method  : 'POST',
          url     : 'http://192.168.1.38:8080/upload',
          data    : data1, //forms user object
          headers: {'Content-Type': undefined },
        transformRequest: angular.identity,
        onProgress: function(event) {
					console.log("loaded " + ((event.loaded/event.total) * 100) + "%");
				}
           
         })
          .success(function(data) {
           $rootScope.notify("File Uploaded Successfully", data.name);
            
          });
   }
})

 .controller('bluetoothCtrl',function ($ionicPopup,$ionicModal,$rootScope,$ionicPlatform,$scope,$timeout) {
  
     $ionicPlatform.ready(function() {
  $scope.checkBT = (function () {
    ble.isEnabled(
         function() {
             $ionicPopup.alert({
     title: 'Your sync starts.',
     template: ' When sync done notification will appear.'
   });
         
      },
      function() {
           $ionicPopup.show({
     title: 'Turn on bluetooth',
    
     template: 'Bluetooth is not enabled. Click on settings to turn on and to start sync.',
   
    
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Settings</b>',
        type: 'button-positive',
        onTap: function() {
        ble.showBluetoothSettings();
          
        }
      }
    ]
     
     
    
     
   });
       
      }
        
        
        );
        
        
  });
  
  
  
//  $ionicPopup.alert({
//      title: '<b>Scan Devices</b>',
    
    
//      template:   '<b class="scan">Select The OneCard</b> </br>'+'<button  class=" button-block item item-divider" ng-mousedown="goMyLocation()">Current Location</button>'+
// '<button class="  button-block item item-divider" ng-mousedown="goMyLocation()">Current Location</button>'+
// '<button class=" button-block item item-divider" ng-mousedown="goMyLocation()">Current Location</button>'

   
    
    
   
     
//    });
    



  
  
  $scope.connectBT= (function () {
ble.startScan([], function(device) {
    console.log(JSON.stringify(device));
    console.log(device);
    $scope.scandevices = device.name;
     $ionicPopup.show({
     title: 'Scan Devices',
    
     template: 'Select The OneCard </br> ' +'<button ng-repeat="class in scandevices" class="button-clear item  button-full button-dark" ng-click="connectBT1()">{{ class }}</button>',
   
    
    scope: $scope,
    buttons: [
      { text:  $scope.scandevices,
      type: 'button-positive',
      onTap: function() {
           
         console.log("hello");
         $scope.connectBT1();
         $scope.connectBT2();
          
        }
        }]
    
     
   });
    
}, function() {
  console.log("Error");
});

setTimeout(ble.stopScan,
    5000,
    function() { console.log("Scan complete"); },
    function() { console.log("stopScan failed"); }
);


  

  });
  
 
     
    

 
     
  
  
   $scope.connectBT1= (function () {
  ble.connect('D0:39:72:B7:80:4C', function() {
  console.log("Connected");
  
}, function() {
  console.log("Error in connecting");
  
});


  
   });
   
 
   $(function() {
  $scope.box = $('.box');
  var button = $('.box button');
  button.on('click', function(){
    $scope.box.toggleClass('active');
    if( $scope.box.hasClass('active'))
      console.log("yup");
    else
     ble.disconnect('D0:39:72:B7:80:4C', function() {
  console.log("Disconnected");
  
}, function() {
  console.log("Cannot disconnect");
  
});
 
   
  });
});
  
 
   
    $scope.connectBT2= (function () {
  
$scope.list = [];

    var bucketListRef = new Firebase($rootScope.baseUrl + escapeEmailAddress($rootScope.userEmail));
    bucketListRef.on('value', function(snapshot) {
        $scope.list = [];
        var data = snapshot.val();
  

        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                
        
                
                if (data[key].item5== $rootScope.positions[0].lat ) {
                    data[key].key = key;
                    $scope.list.push(data[key]);
                }
            }
        }
        if ($scope.list.length == 0) {
            $scope.noData = true;
        } else {
            $scope.noData = false;
        }

        $rootScope.hide();
    });

    console.log($scope.list);
     console.log($scope.list[0]);
     for (var x = 0; x < $scope.list.length; x++) {
    
       var y = 0;
       
     var s = [];
     s[y] =  $scope.list[x];
    
   console.log(s[y].item56);
    var someString = s[y].item56;
	var j;
  var i = 0;
 var data = new Uint8Array(someString.length);
   for(j = 0; j < someString.length; j++) {
	
   data[i] = someString.charCodeAt(j);

   i++
	}
  ble.write('D0:39:72:B7:80:4C', "FFF0", "FFF2", data.buffer,  function() {
  console.log("Success data");
  
}, function() {
  console.log("Error data");
  
}); 
setTimeout(function(){
  //your code to be executed after 1 seconds
}, 500); 
  y++
  console.log(data);
  }

ble.disconnect('D0:39:72:B7:80:4C', function() {
  console.log("Disconnected");
  
}, function() {
  console.log("Cannot disconnect");
  
});
 setTimeout(function(){
  //your code to be executed after 1 seconds
}, 2000); 

 $scope.box.toggleClass('active');
$ionicPopup.alert({
    
     template: 'Sync done. Your OneCard is ready'
   });
 
   var d = new Date()
console.log(d.toLocaleString());
var f = d.toString();
console.log(d.toString());
console.log(d);
$scope.e = "";
$scope.g = "";
for (var index = 0; index <10; index++) {
   $scope.e += f.charAt(index);
  
  
}
for (var index = 16; index <21; index++) {
  $scope.g += f.charAt(index);
  
  }
console.log($scope.e);
console.log($scope.g);
localStorage.e = $scope.e;

localStorage.g = $scope.g;
 $scope.m = localStorage.e ;
 $scope.n = localStorage.g ;


 });
 $scope.m = localStorage.e ;
 $scope.n = localStorage.g ;
 
 
  $scope.connectBT3= (function () {
  
ble.read('D0:39:72:B7:80:4C', "FFF0", "FFF1", function(response) {
  console.log("Success read data");
  console.log(response);
  
  
  
}, function() {
  console.log("Error read data");
  
});

 });
});
 })


.controller('completedCtrl', function($rootScope, $scope, $window, $firebase) {
   
});






function escapeEmailAddress(email) {
    if (!email) return false
    // Replace '.' (not allowed in a Firebase key) with ','
    email = email.toLowerCase();
    email = email.replace(/\./g, ',');
    return email.trim();
}
