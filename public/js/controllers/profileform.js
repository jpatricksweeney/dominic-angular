myApp.controller('ProfileFormController', ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL', 
                                           
  function ($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL) {    
                                           
        $scope.tinymceOptions = {
            plugins: 'advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table contextmenu paste code',
            toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image'
        };      
      
        /* ------------------- Load profile data --------------------- */
        console.log('in profile controller!');
                
        profUID = $rootScope.currentUser.uid;
        var spinner = startSpinner();
        firebase.database().ref('/associates/' + profUID).once('value').then(function (snapshot) {
            console.log('in populate profile form');
            var myProfileActive = snapshot.val().profile;
            populateCheckbox('pf_cbActive', myProfileActive);
            $('#pf_txtFirstName').val(snapshot.val().firstname);
            $('#pf_txtLastName').val(snapshot.val().lastname);
            $('#pf_txtEmail').val(snapshot.val().email);
            $('#pf_txtMobile').val(snapshot.val().mobile);
            var myTitle = snapshot.val().title;
            populateCheckbox('pf_cbMyTitle', myTitle);
            var hairColor = snapshot.val().hairColor;
            populateCheckbox('pf_cbHairColor', hairColor);
            var hairTexturizers = snapshot.val().hairText;
            populateCheckbox('pf_cbHairTexturizers', hairTexturizers);
            var hairCuts = snapshot.val().hairCut;
            populateCheckbox('pf_cbHairCuts', hairCuts);
            var hairAddition = snapshot.val().hairAddition;
            populateCheckbox('pf_cbHairAddition', hairAddition);
            var waxing = snapshot.val().wax;
            populateCheckbox('pf_cbWax', waxing);
            var manicures = snapshot.val().mani;
            populateCheckbox('pf_cbManicures', manicures);          
            var pedicures = snapshot.val().pedi;
            populateCheckbox('pf_cbPedicures', pedicures);
            var makeup = snapshot.val().makeup;
            populateCheckbox('pf_cbMakeup', makeup);
            var brow = snapshot.val().brow;
            populateCheckbox('pf_cbBrow', brow);
            var products = snapshot.val().products;
            populateCheckbox('pf_cbProducts', products);
            var massage = snapshot.val().massage;
            populateCheckbox('pf_cbMassage', massage);
            var facial = snapshot.val().facial;
            populateCheckbox('pf_cbFacial', facial);       
                
            /* About textarea is now a tinymce editor allowing for rich text */
            $scope.tinymceModel = snapshot.val().about;
            
            var referralOn = snapshot.val().referral;
            if (referralOn == "on") {
                $("input[id='pf_cbReferral']").each(function (index, element) {
                    element.setAttribute("checked", true);
                });
            }
            var newClientOn = snapshot.val().newClient;
            if (newClientOn == "on") {
                $("input[id='pf_cbNcDiscount']").each(function (index, element) {
                    element.setAttribute("checked", true);
                });
            }
            var LoyalDiscountOn = snapshot.val().loyalty;           
            if (LoyalDiscountOn == "on") {
                $("input[id='pf_cbLoyalDiscount']").each(function (index, element) {
                    element.setAttribute("checked", true);
                });
            }
            var squareOn = snapshot.val().square;           
            if (squareOn == "on") {
                $("input[id='pf_cbSquare']").each(function (index, element) {
                    element.setAttribute("checked", true);
                });
            }
            var styleseatOn = snapshot.val().styleseat;           
            if (styleseatOn == "on") {
                $("input[id='pf_cbStyleSeat']").each(function (index, element) {
                    element.setAttribute("checked", true);
                });
            }
            $('#pf_txtRefDiscount').val(snapshot.val().refdiscountPct);
            $('#pf_txtNcDiscount').val(snapshot.val().ncdiscountPct);
            $('#pf_txtLoyalDiscount').val(snapshot.val().loyaldiscountPct);   
            $('#pf_txtSquareID').val(snapshot.val().squareID);
            $('#pf_txtStyleSeatID').val(snapshot.val().styleseatID);
            $('#pf_loyaltydp').val(snapshot.val().loyaltyDiscountExpiration);
            
            
            // Service times specify the time it takes a specialist to complete a service (ombre, men's haircut, etc)
            serviceTimes = snapshot.val().serviceTimes;
            if( serviceTimes === undefined ) {
                serviceTimes = [];
            }
            
            // Hair Color
            $scope.rzColorRetouch = loadServiceTimes(serviceTimes.rzColorRetouch);
            $scope.rzWeaving = loadServiceTimes(serviceTimes.rzWeaving);
            $scope.rzVirginHairColor = loadServiceTimes(serviceTimes.rzVirginHairColor);
            $scope.rzPartialWeaving = loadServiceTimes(serviceTimes.rzPartialWeaving);
            $scope.rzBalayage = loadServiceTimes(serviceTimes.rzBalayage);
            $scope.rzFullHighlights = loadServiceTimes(serviceTimes.rzFullHighlights);
            $scope.rzFaceFramingHighlights = loadServiceTimes(serviceTimes.rzFaceFramingHighlights);
            $scope.rzAllOverColor = loadServiceTimes(serviceTimes.rzAllOverColor);
            $scope.rzTLinePartOnlyTouchUp = loadServiceTimes(serviceTimes.rzTLinePartOnlyTouchUp);
            $scope.rz10Foil = loadServiceTimes(serviceTimes.rz10Foil);
            $scope.rzCustomColor = loadServiceTimes(serviceTimes.rzCustomColor);
            $scope.rzDimensionalHighlights = loadServiceTimes(serviceTimes.rzDimensionalHighlights);
            $scope.rzOmbre = loadServiceTimes(serviceTimes.rzOmbre);
            $scope.rzEyebrowTinting = loadServiceTimes(serviceTimes.rzEyebrowTinting);
            $scope.rzExpressColor = loadServiceTimes(serviceTimes.rzExpressColor);
            $scope.rzCorrectiveColor = loadServiceTimes(serviceTimes.rzCorrectiveColor);
            $scope.rzWeaveSlicing = loadServiceTimes(serviceTimes.rzWeaveSlicing);
            $scope.rzClearShineColorTreatment = loadServiceTimes(serviceTimes.rzClearShineColorTreatment);
            $scope.rzColorEnhancingShineTreatment = loadServiceTimes(serviceTimes.rzColorEnhancingShineTreatment);
            $scope.rzMensColor = loadServiceTimes(serviceTimes.rzMensColor);
            
            // Hair Texturizers
            $scope.rzBodyWave = loadServiceTimes(serviceTimes.rzBodyWave);
            $scope.rzPermanent = loadServiceTimes(serviceTimes.rzPermanent);
            $scope.rzPermanentWave = loadServiceTimes(serviceTimes.rzPermanentWave);
            $scope.rzKeratinTreatment = loadServiceTimes(serviceTimes.rzKeratinTreatment);
            $scope.rzKeraFusion = loadServiceTimes(serviceTimes.rzKeraFusion);
            $scope.rzRelaxer = loadServiceTimes(serviceTimes.rzRelaxer);
            $scope.rzReversePerm = loadServiceTimes(serviceTimes.rzReversePerm);
            $scope.rzNaturalHairStraighteningIronWork = loadServiceTimes(serviceTimes.rzNaturalHairStraighteningIronWork);
            
            // Hair Cuts
            $scope.rzWomensHaircutStyle = loadServiceTimes(serviceTimes.rzWomensHaircutStyle);
            $scope.rzWomensHaircut = loadServiceTimes(serviceTimes.rzWomensHaircut);
            $scope.rzBangTrim = loadServiceTimes(serviceTimes.rzBangTrim);
            $scope.rzShampooStyle = loadServiceTimes(serviceTimes.rzShampooStyle);
            $scope.rzThermalStyle = loadServiceTimes(serviceTimes.rzThermalStyle);
            $scope.rzUpdo = loadServiceTimes(serviceTimes.rzUpdo);
            $scope.rzMensHaircut = loadServiceTimes(serviceTimes.rzMensHaircut);
            $scope.rzChildrensHaircut = loadServiceTimes(serviceTimes.rzChildrensHaircut);
            $scope.rzChildrensHaircutStyle = loadServiceTimes(serviceTimes.rzChildrensHaircutStyle);   
            $scope.rzClipperCut = loadServiceTimes(serviceTimes.rzClipperCut); 
            
            
            // Retrieve profile pic URL from Google Storage
            var storageRef = firebase.storage().ref().child('/images/' + profUID);
            
            storageRef.getDownloadURL().then(function (url) {
                document.getElementById("pf_imgProfilePic").src = url;
                // profile pic handler for deleting
                $('.img-wrap .close').on('click', function () {
                    console.log(storageRef);
                    // Confirm delete
                    $('#modalDeleteConfirm').modal('show');
                    $('#pf_modalYes').on('click', function () {
                        // Delete the file
                        storageRef.delete().then(function () {
                            console.log('delete profile pic successful');
                            document.getElementById("pf_imgProfilePic").src = '/images/default_avatar.png';
                            show('#deleteProfilePicSuccess');
                        }).catch(function (error) {
                            console.log('delete profile pic NOT successful');
                        });
                    });
                });
                spinner.stop();
            }).catch(function (error) {
                console.log("error getting user's profile pic!");
                console.log(error);
                spinner.stop();
            });
        }).catch(function (error) {
            // error wil be an Object
            console.log("no associate for this user's UID!");
            firebase.database().ref('/users/' + profUID).once('value').then(function (snapshot) {
                console.log('in firebase database read user')
                firstname = snapshot.val().firstname;
                lastname = snapshot.val().lastname;
                email = snapshot.val().email
                $('#welcome-name').text(firstname + ' ' + lastname);
                $('#pf_txtFirstName').val(firstname);
                $('#pf_txtLastName').val(lastname);
                $('#pf_txtEmail').val(email);
                spinner.stop();
            }).catch(function (e) {
                console.log('in read associate error handler')
                console.log(e.message);
                spinner.stop();
            });
        });
      
      
        /* ------------------- Save profile data --------------------- */
        btnSaveProfile.addEventListener('click', function (e) {
            const pf_profileActive = getCheckedCheckboxesFor('pf_cbActive');
            const pf_firstName = pf_txtFirstName.value;
            const pf_lastName = pf_txtLastName.value;
            const pf_email = pf_txtEmail.value;
            const pf_mobile = pf_txtMobile.value;
            const pf_myTitle = getCheckedCheckboxesFor('pf_cbMyTitle');
            const pf_profilePic = pf_txtProfilePic;
            
            /* About text is created from a "tinymce" embedded editor */
            const pf_about = $scope.tinymceModel;    
            
            const pf_hairColor = getCheckedCheckboxesFor('pf_cbHairColor');
            const pf_hairTexturizer = getCheckedCheckboxesFor('pf_cbHairTexturizers');
            const pf_hairCuts = getCheckedCheckboxesFor('pf_cbHairCuts');
            const pf_hairAddition = getCheckedCheckboxesFor('pf_cbHairAddition');
            const pf_wax = getCheckedCheckboxesFor('pf_cbWax');
            const pf_massage = getCheckedCheckboxesFor('pf_cbMassage');
            const pf_facial = getCheckedCheckboxesFor('pf_cbFacial'); 
            const pf_manicures = getCheckedCheckboxesFor('pf_cbManicures');
            const pf_pedicures = getCheckedCheckboxesFor('pf_cbPedicures');
            const pf_makeup = getCheckedCheckboxesFor('pf_cbMakeup');
            const pf_brow = getCheckedCheckboxesFor('pf_cbBrow');
            const pf_products = getCheckedCheckboxesFor('pf_cbProducts');
            const pf_referral = getCheckedCheckboxesFor('pf_cbReferral');
            const pf_newClient = getCheckedCheckboxesFor('pf_cbNcDiscount');
            const pf_loyalty = getCheckedCheckboxesFor('pf_cbLoyalDiscount');
            const pf_square = getCheckedCheckboxesFor('pf_cbSquare');
            const pf_styleseat = getCheckedCheckboxesFor('pf_cbStyleSeat');
            const pf_refDiscount = pf_txtRefDiscount.value;
            const pf_ncDiscount = pf_txtNcDiscount.value;
            const pf_loyalDiscount = pf_txtLoyalDiscount.value;
            const pf_squareID = pf_txtSquareID.value;
            const pf_styleseatID = pf_txtStyleSeatID.value;
            const pf_loyaltyDiscountExpiration = pf_loyaltydp.value;
            
            
            
            // handle Service times (Advanced tab)
            srvcTimes = {};
            
            // Hair Color
            srvcTimes["rzColorRetouch"] = createServiceObj($scope.rzColorRetouch);
            srvcTimes["rzWeaving"] = createServiceObj($scope.rzWeaving);
            srvcTimes["rzVirginHairColor"] = createServiceObj($scope.rzVirginHairColor);
            srvcTimes["rzPartialWeaving"] = createServiceObj($scope.rzPartialWeaving);
            srvcTimes["rzBalayage"] = createServiceObj($scope.rzBalayage);
            srvcTimes["rzFullHighlights"] = createServiceObj($scope.rzFullHighlights);
            srvcTimes["rzFaceFramingHighlights"] = createServiceObj($scope.rzFaceFramingHighlights);
            srvcTimes["rzAllOverColor"] = createServiceObj($scope.rzAllOverColor);
            srvcTimes["rzTLinePartOnlyTouchUp"] = createServiceObj($scope.rzTLinePartOnlyTouchUp);
            srvcTimes["rz10Foil"] = createServiceObj($scope.rz10Foil);
            srvcTimes["rzCustomColor"] = createServiceObj($scope.rzCustomColor);
            srvcTimes["rzDimensionalHighlights"] = createServiceObj($scope.rzDimensionalHighlights);
            srvcTimes["rzOmbre"] = createServiceObj($scope.rzOmbre);
            srvcTimes["rzEyebrowTinting"] = createServiceObj($scope.rzEyebrowTinting);
            srvcTimes["rzExpressColor"] = createServiceObj($scope.rzExpressColor);
            srvcTimes["rzCorrectiveColor"] = createServiceObj($scope.rzCorrectiveColor);
            srvcTimes["rzWeaveSlicing"] = createServiceObj($scope.rzWeaveSlicing);
            srvcTimes["rzClearShineColorTreatment"] = createServiceObj($scope.rzClearShineColorTreatment);
            srvcTimes["rzColorEnhancingShineTreatment"] = createServiceObj($scope.rzColorEnhancingShineTreatment);
            srvcTimes["rzMensColor"] = createServiceObj($scope.rzMensColor);
            
            // Hair Texturizers
            srvcTimes["rzBodyWave"] = createServiceObj($scope.rzBodyWave);
            srvcTimes["rzPermanent"] = createServiceObj($scope.rzPermanent);
            srvcTimes["rzPermanentWave"] = createServiceObj($scope.rzPermanentWave);
            srvcTimes["rzKeratinTreatment"] = createServiceObj($scope.rzKeratinTreatment);
            srvcTimes["rzKeraFusion"] = createServiceObj($scope.rzKeraFusion);
            srvcTimes["rzRelaxer"] = createServiceObj($scope.rzRelaxer);
            srvcTimes["rzReversePerm"] = createServiceObj($scope.rzReversePerm);
            srvcTimes["rzNaturalHairStraighteningIronWork"] = createServiceObj($scope.rzNaturalHairStraighteningIronWork);
            
            // Hair Cuts
            srvcTimes["rzWomensHaircutStyle"] = createServiceObj($scope.rzWomensHaircutStyle);
            srvcTimes["rzWomensHaircut"] = createServiceObj($scope.rzWomensHaircut);
            srvcTimes["rzBangTrim"] = createServiceObj($scope.rzBangTrim);
            srvcTimes["rzShampooStyle"] = createServiceObj($scope.rzShampooStyle);
            srvcTimes["rzThermalStyle"] = createServiceObj($scope.rzThermalStyle);
            srvcTimes["rzUpdo"] = createServiceObj($scope.rzUpdo);
            srvcTimes["rzMensHaircut"] = createServiceObj($scope.rzMensHaircut);
            srvcTimes["rzChildrensHaircut"] = createServiceObj($scope.rzChildrensHaircut);
            srvcTimes["rzChildrensHaircutStyle"] = createServiceObj($scope.rzChildrensHaircutStyle);
            srvcTimes["rzClipperCut"] = createServiceObj($scope.rzClipperCut);
            
            
            // upload profile pic to Google Storage
            var fileToUpload = document.getElementById("pf_txtProfilePic").files[0];
            if (fileToUpload != null) {
                var metadata = {
                    contentType: 'image/*'
                };
                var storageRef = firebase.storage().ref().child('/images/' + profUID);
                var uploadTask = storageRef.put(fileToUpload, metadata).then(function (snapshot) {
                    console.log('Uploaded a blob or file!');
                    console.log(snapshot);
                }).catch(function (error) {
                    console.log('no file to upload');
                    console.log(error);
                });
            }
            var d = new Date();
            var now = d.toDateString();
            firebase.database().ref('/associates/' + profUID).set({
                profile: pf_profileActive
                , firstname: pf_firstName
                , lastname: pf_lastName
                , email: pf_email
                , mobile: pf_mobile
                , title: pf_myTitle
                , createdate: now
                , about: pf_about
                , hairColor: pf_hairColor
                , hairText: pf_hairTexturizer
                , hairCut: pf_hairCuts
                , hairAddition: pf_hairAddition
                , wax: pf_wax
                , massage: pf_massage
                , facial: pf_facial
                , mani: pf_manicures
                , pedi: pf_pedicures
                , makeup: pf_makeup
                , brow: pf_brow
                , products: pf_products
                , referral: pf_referral
                , newClient: pf_newClient
                , loyalty: pf_loyalty
                , square: pf_square
                , squareID: pf_squareID
                , styleseat: pf_styleseat
                , styleseatID: pf_styleseatID
                , refdiscountPct: pf_refDiscount
                , ncdiscountPct: pf_ncDiscount
                , loyaldiscountPct: pf_loyalDiscount
                , loyaltyDiscountExpiration: pf_loyaltyDiscountExpiration
                , serviceTimes: srvcTimes
                , regUID: profUID
            });
            $('#modalProfileSave-body').text('Your profile has been saved!');
            $('#modalProfileSave').modal('show');
            
            
            // return checkbox values
            function getCheckedCheckboxesFor(checkboxName) {
                var checkboxes = document.querySelectorAll('input[name="' + checkboxName + '"]:checked'), values = [];
                Array.prototype.forEach.call(checkboxes, function(el) {
                    values.push(el.value);
                });
                return values;
            }
            
        });  // Save profile data
      
      
}]); // Controller


function uploadProfilePicToGS(input) {
    var fileToUpload = document.getElementById("pf_txtProfilePic").files[0];
    console.log(fileToUpload);
    
    if( fileToUpload != null ) {
        var metadata = {
            contentType: 'image/*'
        };
        var storageRef = firebase.storage().ref().child('/images/temp-ok-to-delete');
        var uploadTask = storageRef.put(fileToUpload, metadata).then(function(snapshot) {
            console.log('Uploaded a blob or file!');
            storageRef.getDownloadURL().then(function(url) {
                console.log(url);
                document.getElementById("pf_imgProfilePic").src = url;
            });
        }).catch(function(error) {
            console.log('no file to upload');
            console.log(error);
        });
    }    
    
}

function populateCheckbox(checkboxID, myKwArray) {
    if (myKwArray == null) {
        return;
    }
    $("input[id='" + checkboxID + "']").each(function (index, element) {
        myKwArray.forEach(function (entry) {
            if (element.value === entry) {
                element.setAttribute("checked", true);
            }
        });
    });
}

function createServiceObj(n) {
   obj = { 'start': n.start,
           'process': n.process,
           'finish': n.finish
         };
    return obj;
}


function loadServiceTimes(serviceIn) {
    var start = 60;
    var process= 0;
    var finish = 0;
    if( serviceIn ) {
        start = serviceIn.start;
        process = serviceIn.process;
        finish = serviceIn.finish;
    }
    serviceOut = {
        'start': start,
        'process': process,
        'finish': finish
    }; 
    return serviceOut;
}
      
function startSpinner() {
    // Create the Spinner with options
    var spinner = new Spinner({
        lines: 13, 
        length: 28, 
        width: 14,
        radius: 42, 
        scale: 1, 
        corners: 1, 
        color: '#d56e2f', 
        opacity: 0.25, 
        rotate: 0, 
        direction: 1, 
        speed: 1, 
        trail: 60, 
        fps: 20, 
        zIndex: 2e9, 
        className: 'spinner', 
        top: '50%', 
        left: '50%', 
        shadow: true, 
        hwaccel: false, 
        position: 'absolute'
     }).spin(document.getElementById("spinMe"));
    
    return spinner;
}
      