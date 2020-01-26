alert("inside app.js");

var krview = document.getElementById("korean-language");
var enview = document.getElementById("english-language");

var app = {
    // global vars
    autoShowInterstitial: false,
    progressDialog: document.getElementById("progressDialog"),
    spinner: document.getElementById("spinner"),
    weinre: {
            enabled: false,
            ip: '', // ex. http://192.168.1.13
            port: '', // ex. 9090
            targetApp: '' // ex. see weinre docs
    },

    // Application Constructor
    initialize: function () {
            if ((/(ipad|iphone|ipod|android)/i.test(navigator.userAgent))) {
            document.addEventListener('deviceready', this.onDeviceReady, false);
            } else {
            app.onDeviceReady();
            }
    },
    // Must be called when deviceready is fired so AdMobAds plugin will be ready
    initAds: function () {
            var isAndroid = (/(android)/i.test(navigator.userAgent));
            var adPublisherIds = {
            ios: {
                    banner: 'ca-app-pub-3940256099942544/6300978111',
                    interstitial: 'ca-app-pub-9863325511078756/6709280228'
            },
            android: {
                    banner: 'ca-app-pub-3940256099942544/6300978111',
                    interstitial: 'ca-app-pub-9863325511078756/2279080628'
            }
            };
            var admobid;

            if (isAndroid) {
            admobid = adPublisherIds.android;
            } else {
            admobid = adPublisherIds.ios;
            }
            if (window.admob) {
            admob.setOptions({
                    publisherId: admobid.banner,
                    interstitialAdId: admobid.interstitial,
                    bannerAtTop: true, // set to true, to put banner at top
                    overlap: false, // set to true, to allow banner overlap webview
                    offsetStatusBar: true, // set to true to avoid ios7 status bar overlap
                    isTesting: true, // receiving test ads (do not test with real ads as your account will be banned)
                    autoShowBanner: true, // auto show banners ad when loaded
                    autoShowInterstitial: false // auto show interstitials ad when loaded
            });
            } else {
            alert('cordova-admob plugin not ready.\nAre you in a desktop browser? It won\'t work...');
            }
    },
    // Bind Event Listeners
    bindAdEvents: function () {
            if (window.admob) {
            document.addEventListener("orientationchange", this.onOrientationChange, false);
            document.addEventListener(admob.events.onAdLoaded, this.onAdLoaded, false);
            document.addEventListener(admob.events.onAdFailedToLoad, this.onAdFailedToLoad, false);
            document.addEventListener(admob.events.onAdOpened, function (e) { }, false);
            document.addEventListener(admob.events.onAdClosed, function (e) { }, false);
            document.addEventListener(admob.events.onAdLeftApplication, function (e) { }, false);
            document.addEventListener(admob.events.onInAppPurchaseRequested, function (e) { }, false);
            } else {
            alert('cordova-admob plugin not ready.\nAre you in a desktop browser? It won\'t work...');
            }
    },

    // -----------------------------------
    // Events.
    // The scope of 'this' is the event.
    // -----------------------------------
    onOrientationChange: function () {
            app.onResize();
    },
    onDeviceReady: function () {
            var weinre,
            weinreUrl;

            document.removeEventListener('deviceready', app.onDeviceReady, false);

            if (app.weinre.enabled) {
            console.log('Loading weinre...');
            weinre = document.createElement('script');
            weinreUrl = app.weinre.ip + ":" + app.weinre.port;
            weinreUrl += '/target/target-script-min.js';
            weinreUrl += '#' + app.weinre.targetApp;
            weinre.setAttribute('src', weinreUrl);
            document.head.appendChild(weinre);
            }

            if (window.admob) {
            console.log('Binding ad events...');
            app.bindAdEvents();
            console.log('Initializing ads...');
            app.initAds();
            } else {
            alert('cordova-admob plugin not ready.\nAre you in a desktop browser? It won\'t work...');
            }
    },
    onAdLoaded: function (e) {
            app.showProgress(false);
            if (window.admob && e.adType === window.admob.AD_TYPE.INTERSTITIAL) {
            if (app.autoShowInterstitial) {
                    window.admob.showInterstitialAd();
            } else {
                    alert("Interstitial is available. Click on 'Show Interstitial' to show it.");
            }
            }
    },
    onAdFailedToLoad: function (e) {
            app.showProgress(false);
            alert("Could not load ad: " + JSON.stringify(e));
    },
    // onResize: function () {
    //     var msg = 'Web view size: ' + window.innerWidth + ' x ' + window.innerHeight;
    //     document.getElementById('sizeinfo').innerHTML = msg;
    // },

    // -----------------------------------
    // App buttons functionality
    // -----------------------------------
    startBannerAds: function () {
            if (window.admob) {
            app.showProgress(true);
            window.admob.createBannerView(function () { }, function (e) {
                    alert(JSON.stringify(e));
            });
            } else {
            alert('cordova-admob plugin not ready.\nAre you in a desktop browser? It won\'t work...');
            }
    },
    removeBannerAds: function () {
            if (window.admob) {
            app.showProgress(false);
            window.admob.destroyBannerView();
            } else {
            alert('cordova-admob plugin not ready.\nAre you in a desktop browser? It won\'t work...');
            }
    },
    showBannerAds: function () {
            if (window.admob) {
            app.showProgress(false);
            window.admob.showBannerAd(true, function () { }, function (e) {
                    alert(JSON.stringify(e));
            });
            } else {
            alert('cordova-admob plugin not ready.\nAre you in a desktop browser? It won\'t work...');
            }
    },
    hideBannerAds: function () {
            if (window.admob) {
            app.showProgress(false);
            window.admob.showBannerAd(false);
            } else {
            alert('cordova-admob plugin not ready.\nAre you in a desktop browser? It won\'t work...');
            }
    },
    requestInterstitial: function (autoshow) {
            if (window.admob) {
            app.showProgress(true);
            app.autoShowInterstitial = autoshow;
            window.admob.requestInterstitialAd(function () { }, function (e) {
                    alert(JSON.stringify(e));
            });
            } else {
            alert('cordova-admob plugin not ready.\nAre you in a desktop browser? It won\'t work...');
            }
    },
    showInterstitial: function () {
            if (window.admob) {
            app.showProgress(false);
            window.admob.showInterstitialAd(function () { }, function (e) {
                    alert(JSON.stringify(e));
            });
            } else {
            alert('cordova-admob plugin not ready.\nAre you in a desktop browser? It won\'t work...');
            }
    },
    showProgress: function (show) {
            if (show) {
            addClass(app.spinner, "animated");
            removeClass(app.progressDialog, "hidden");
            } else {
            addClass(app.progressDialog, "hidden");
            removeClass(app.spinner, "animated");
            }
    }
    };

    function removeClass(elem, cls) {
    var str;
    do {
            str = " " + elem.className + " ";
            elem.className = str.replace(" " + cls + " ", " ").replace(/^\s+|\s+$/g, "");
    } while (str.match(cls));
    }

    function addClass(elem, cls) {
    elem.className += (" " + cls);
    }

function reset() {
    location.reload();
}

function krtoggle() {
        if (window.getComputedStyle(krview).display === "none") {
            krview.style.display = "block";
            enview.style.display = "none";
        }
}

function entoggle() {
        if (window.getComputedStyle(enview).display === "none") {
            enview.style.display = "block";
            krview.style.display = "none";
        }
}

$('.btn-group').on('click', '.btn', function() {
    $(this).addClass('active').removeClass('notactive').siblings().removeClass('active').addClass('notactive');
});

// var bgmusicloop = document.getElementById("bgmusic");
// bgmusicloop.play();
     



$( document ).ready(function() {

    // Toggle Language //s
    // $( ".slider.round" ).click(function() {
    //     $( "#en" ).toggle();
    //     $( "#kr" ).toggle();

    //     if( $("#en").is(':visible')) {
    //         $("#english-language").css({"display":"block"})
    //         $("#korean-language").css({"display":"none"})
    //     }

    //     if( $("#kr").is(':visible')) {
    //         $("#korean-language").css({"display":"block"})
    //         $("#english-language").css({"display":"none"})
    //     }
    // });



   
    
    // LETTER A AUDIO BEGIN //
    var obj = document.createElement("audio");
    obj.src = "audio/a-audio-1.mp3";
    obj.volume = 0.1;
    obj.autoPlay = false;
    obj.preLoad = true;
    obj.controls = true;

    $("#img-1a").click(function() {
        obj.play();
    });
     // LETTER A AUDIO END //

    // AIRPLANE AUDIO BEGIN//
    var obj2 = document.createElement("audio");
    obj2.src = "audio/airplane.mp3";
    obj2.volume = 0.1;
    obj2.autoPlay = false;
    obj2.preLoad = true;
    obj2.controls = true;

    $("#img-2a").click(function() {
        obj2.play();
    });
    // AIRPLANE AUDIO END //



    // LETTER B AUDIO BEGIN //
    var obj3 = document.createElement("audio");
    obj3.src = "audio/b-audio-1.mp3";
    obj3.volume = 0.1;
    obj3.autoPlay = false;
    obj3.preLoad = true;
    obj3.controls = true;

    $("#img-1b").click(function() {
        obj3.play();
    });
     // LETTER B AUDIO END //

    // Baseball AUDIO BEGIN//
    var obj4 = document.createElement("audio");
    obj4.src = "audio/baseball.mp3";
    obj4.volume = 0.1;
    obj4.autoPlay = false;
    obj4.preLoad = true;
    obj4.controls = true;

    $("#img-2b").click(function() {
        obj4.play();
    });
    // Baseball AUDIO END //



    // LETTER C AUDIO BEGIN //
    var obj5 = document.createElement("audio");
    obj5.src = "audio/c-audio-1.mp3";
    obj5.volume = 0.1;
    obj5.autoPlay = false;
    obj5.preLoad = true;
    obj5.controls = true;

    $("#img-1c").click(function() {
        obj5.play();
    });
    // LETTER C AUDIO END //

    // Cake AUDIO BEGIN//
    var obj6 = document.createElement("audio");
    obj6.src = "audio/cake.mp3";
    obj6.volume = 0.1;
    obj6.autoPlay = false;
    obj6.preLoad = true;
    obj6.controls = true;

    $("#img-2c").click(function() {
        obj6.play();
    });
    // Cake AUDIO END //

    // LETTER D AUDIO BEGIN //
    var obj7 = document.createElement("audio");
    obj7.src = "audio/d-audio-1.mp3";
    obj7.volume = 0.1;
    obj7.autoPlay = false;
    obj7.preLoad = true;
    obj7.controls = true;

    $("#img-1d").click(function() {
        obj7.play();
    });
    // LETTER D AUDIO END //

    // Dog AUDIO BEGIN//
    var obj8 = document.createElement("audio");
    obj8.src = "audio/dog.mp3";
    obj8.volume = 0.1;
    obj8.autoPlay = false;
    obj8.preLoad = true;
    obj8.controls = true;

    $("#img-2d").click(function() {
        obj8.play();
    });
    // Dog AUDIO END //



    // LETTER E AUDIO BEGIN //
    var obj9 = document.createElement("audio");
    obj9.src = "audio/e-audio-1.mp3";
    obj9.volume = 0.1;
    obj9.autoPlay = false;
    obj9.preLoad = true;
    obj9.controls = true;

    $("#img-1e").click(function() {
        obj9.play();
    });
    // LETTER E AUDIO END //

    // Eagle AUDIO BEGIN//
    var obj10 = document.createElement("audio");
    obj10.src = "audio/eagle.mp3";
    obj10.volume = 0.1;
    obj10.autoPlay = false;
    obj10.preLoad = true;
    obj10.controls = true;

    $("#img-2e").click(function() {
        obj10.play();
    });
    // Eagle AUDIO END //

     // LETTER F AUDIO BEGIN //
     var obj11 = document.createElement("audio");
     obj11.src = "audio/f-audio-1.mp3";
     obj11.volume = 0.1;
     obj11.autoPlay = false;
     obj11.preLoad = true;
     obj11.controls = true;
 
     $("#img-1f").click(function() {
         obj11.play();
     });
     // LETTER F AUDIO END //
 
     // Firetruck AUDIO BEGIN//
     var obj12 = document.createElement("audio");
     obj12.src = "audio/firetruck.mp3";
     obj12.volume = 0.1;
     obj12.autoPlay = false;
     obj12.preLoad = true;
     obj12.controls = true;
 
     $("#img-2f").click(function() {
         obj12.play();
     });
     // Firetruck AUDIO END //



     // LETTER G AUDIO BEGIN //
     var obj13 = document.createElement("audio");
     obj13.src = "audio/g-audio-1.mp3";
     obj13.volume = 0.1;
     obj13.autoPlay = false;
     obj13.preLoad = true;
     obj13.controls = true;
 
     $("#img-1g").click(function() {
         obj13.play();
     });
     // LETTER G AUDIO END //
 
     // goose AUDIO BEGIN//
     var obj14 = document.createElement("audio");
     obj14.src = "audio/goose.mp3";
     obj14.volume = 0.1;
     obj14.autoPlay = false;
     obj14.preLoad = true;
     obj14.controls = true;
 
     $("#img-2g").click(function() {
         obj14.play();
     });
     // goose AUDIO END //



     // LETTER H AUDIO BEGIN //
     var obj15 = document.createElement("audio");
     obj15.src = "audio/h-audio-1.mp3";
     obj15.volume = 0.1;
     obj15.autoPlay = false;
     obj15.preLoad = true;
     obj15.controls = true;
 
     $("#img-1h").click(function() {
         obj15.play();
     });
     // LETTER H AUDIO END //
 
     // house AUDIO BEGIN//
     var obj16 = document.createElement("audio");
     obj16.src = "audio/house.mp3";
     obj16.volume = 0.1;
     obj16.autoPlay = false;
     obj16.preLoad = true;
     obj16.controls = true;
 
     $("#img-2h").click(function() {
         obj16.play();
     });
     // house AUDIO END //



      // LETTER I AUDIO BEGIN //
      var obj17 = document.createElement("audio");
      obj17.src = "audio/i-audio-1.mp3";
      obj17.volume = 0.1;
      obj17.autoPlay = false;
      obj17.preLoad = true;
      obj17.controls = true;
  
      $("#img-1i").click(function() {
          obj17.play();
      });
      // LETTER I AUDIO END //
  
      // iguana AUDIO BEGIN//
      var obj18 = document.createElement("audio");
      obj18.src = "audio/iguana.mp3";
      obj18.volume = 0.1;
      obj18.autoPlay = false;
      obj18.preLoad = true;
      obj18.controls = true;
  
      $("#img-2i").click(function() {
          obj18.play();
      });
      // iguana AUDIO END //


       // LETTER j AUDIO BEGIN //
     var obj19 = document.createElement("audio");
     obj19.src = "audio/j-audio-1.mp3";
     obj19.volume = 0.1;
     obj19.autoPlay = false;
     obj19.preLoad = true;
     obj19.controls = true;
 
     $("#img-1j").click(function() {
         obj19.play();
     });
     // LETTER j AUDIO END //
 
     // juice AUDIO BEGIN//
     var obj20 = document.createElement("audio");
     obj20.src = "audio/juice.mp3";
     obj20.volume = 0.1;
     obj20.autoPlay = false;
     obj20.preLoad = true;
     obj20.controls = true;
 
     $("#img-2j").click(function() {
         obj20.play();
     });
     // juice AUDIO END //



      // LETTER K AUDIO BEGIN //
      var obj21 = document.createElement("audio");
      obj21.src = "audio/k-audio-1.mp3";
      obj21.volume = 0.1;
      obj21.autoPlay = false;
      obj21.preLoad = true;
      obj21.controls = true;
  
      $("#img-1k").click(function() {
          obj21.play();
      });
      // LETTER K AUDIO END //
  
      // kite AUDIO BEGIN//
      var obj22 = document.createElement("audio");
      obj22.src = "audio/kite.mp3";
      obj22.volume = 0.1;
      obj22.autoPlay = false;
      obj22.preLoad = true;
      obj22.controls = true;
  
      $("#img-2k").click(function() {
          obj22.play();
      });
      // kite AUDIO END //



       // LETTER L AUDIO BEGIN //
     var obj23 = document.createElement("audio");
     obj23.src = "audio/l-audio-1.mp3";
     obj23.volume = 0.1;
     obj23.autoPlay = false;
     obj23.preLoad = true;
     obj23.controls = true;
 
     $("#img-1l").click(function() {
         obj23.play();
     });
     // LETTER L AUDIO END //
 
     // lamp AUDIO BEGIN//
     var obj24 = document.createElement("audio");
     obj24.src = "audio/lamp.mp3";
     obj24.volume = 0.1;
     obj24.autoPlay = false;
     obj24.preLoad = true;
     obj24.controls = true;
 
     $("#img-2l").click(function() {
         obj24.play();
     });
     // lamp AUDIO END //



      // LETTER M AUDIO BEGIN //
      var obj25 = document.createElement("audio");
      obj25.src = "audio/m-audio-1.mp3";
      obj25.volume = 0.1;
      obj25.autoPlay = false;
      obj25.preLoad = true;
      obj25.controls = true;
  
      $("#img-1m").click(function() {
          obj25.play();
      });
      // LETTER M AUDIO END //
  
      // moon AUDIO BEGIN//
      var obj26 = document.createElement("audio");
      obj26.src = "audio/moon.mp3";
      obj26.volume = 0.1;
      obj26.autoPlay = false;
      obj26.preLoad = true;
      obj26.controls = true;
  
      $("#img-2m").click(function() {
          obj26.play();
      });
      // moon AUDIO END //




       // LETTER N AUDIO BEGIN //
     var obj27 = document.createElement("audio");
     obj27.src = "audio/n-audio-1.mp3";
     obj27.volume = 0.1;
     obj27.autoPlay = false;
     obj27.preLoad = true;
     obj27.controls = true;
 
     $("#img-1n").click(function() {
         obj27.play();
     });
     // LETTER N AUDIO END //
 
     // nachos AUDIO BEGIN//
     var obj28 = document.createElement("audio");
     obj28.src = "audio/nachos.mp3";
     obj28.volume = 0.1;
     obj28.autoPlay = false;
     obj28.preLoad = true;
     obj28.controls = true;
 
     $("#img-2n").click(function() {
         obj28.play();
     });
     // nachos AUDIO END //



      // LETTER O AUDIO BEGIN //
      var obj29 = document.createElement("audio");
      obj29.src = "audio/o-audio-1.mp3";
      obj29.volume = 0.1;
      obj29.autoPlay = false;
      obj29.preLoad = true;
      obj29.controls = true;
  
      $("#img-1o").click(function() {
          obj29.play();
      });
      // LETTER O AUDIO END //
  
      // onion AUDIO BEGIN//
      var obj30 = document.createElement("audio");
      obj30.src = "audio/onion.mp3";
      obj30.volume = 0.1;
      obj30.autoPlay = false;
      obj30.preLoad = true;
      obj30.controls = true;
  
      $("#img-2o").click(function() {
          obj30.play();
      });
      // onion AUDIO END //




       // LETTER P AUDIO BEGIN //
     var obj31 = document.createElement("audio");
     obj31.src = "audio/p-audio-1.mp3";
     obj31.volume = 0.1;
     obj31.autoPlay = false;
     obj31.preLoad = true;
     obj31.controls = true;
 
     $("#img-1p").click(function() {
         obj31.play();
     });
     // LETTER P AUDIO END //
 
     // piano AUDIO BEGIN//
     var obj32 = document.createElement("audio");
     obj32.src = "audio/piano.mp3";
     obj32.volume = 0.1;
     obj32.autoPlay = false;
     obj32.preLoad = true;
     obj32.controls = true;
 
     $("#img-2p").click(function() {
         obj32.play();
     });
     // piano AUDIO END //



      // LETTER Q AUDIO BEGIN //
      var obj33 = document.createElement("audio");
      obj33.src = "audio/q-audio-1.mp3";
      obj33.volume = 0.1;
      obj33.autoPlay = false;
      obj33.preLoad = true;
      obj33.controls = true;
  
      $("#img-1q").click(function() {
          obj33.play();
      });
      // LETTER Q AUDIO END //
  
      // quail AUDIO BEGIN//
      var obj34 = document.createElement("audio");
      obj34.src = "audio/quail.mp3";
      obj34.volume = 0.1;
      obj34.autoPlay = false;
      obj34.preLoad = true;
      obj34.controls = true;
  
      $("#img-2q").click(function() {
          obj34.play();
      });
      // quail AUDIO END //



       // LETTER R AUDIO BEGIN //
     var obj35 = document.createElement("audio");
     obj35.src = "audio/r-audio-1.mp3";
     obj35.volume = 0.1;
     obj35.autoPlay = false;
     obj35.preLoad = true;
     obj35.controls = true;
 
     $("#img-1r").click(function() {
         obj35.play();
     });
     // LETTER R AUDIO END //
 
     // robot AUDIO BEGIN//
     var obj36 = document.createElement("audio");
     obj36.src = "audio/robot.mp3";
     obj36.volume = 0.1;
     obj36.autoPlay = false;
     obj36.preLoad = true;
     obj36.controls = true;
 
     $("#img-2r").click(function() {
         obj36.play();
     });
     // robot AUDIO END //



      // LETTER S AUDIO BEGIN //
      var obj37 = document.createElement("audio");
      obj37.src = "audio/s-audio-1.mp3";
      obj37.volume = 0.1;
      obj37.autoPlay = false;
      obj37.preLoad = true;
      obj37.controls = true;
  
      $("#img-1s").click(function() {
          obj37.play();
      });
      // LETTER S AUDIO END //
  
      // sandwich AUDIO BEGIN//
      var obj38 = document.createElement("audio");
      obj38.src = "audio/sandwich.mp3";
      obj38.volume = 0.1;
      obj38.autoPlay = false;
      obj38.preLoad = true;
      obj38.controls = true;
  
      $("#img-2s").click(function() {
          obj38.play();
      });
      // sandwich AUDIO END //



       // LETTER T AUDIO BEGIN //
     var obj39 = document.createElement("audio");
     obj39.src = "audio/t-audio-1.mp3";
     obj39.volume = 0.1;
     obj39.autoPlay = false;
     obj39.preLoad = true;
     obj39.controls = true;
 
     $("#img-1t").click(function() {
         obj39.play();
     });
     // LETTER T AUDIO END //
 
     // turtle AUDIO BEGIN//
     var obj40 = document.createElement("audio");
     obj40.src = "audio/turtle.mp3";
     obj40.volume = 0.1;
     obj40.autoPlay = false;
     obj40.preLoad = true;
     obj40.controls = true;
 
     $("#img-2t").click(function() {
         obj40.play();
     });
     // turtle AUDIO END //



      // LETTER U AUDIO BEGIN //
      var obj41 = document.createElement("audio");
      obj41.src = "audio/u-audio-1.mp3";
      obj41.volume = 0.1;
      obj41.autoPlay = false;
      obj41.preLoad = true;
      obj41.controls = true;
  
      $("#img-1u").click(function() {
          obj41.play();
      });
      // LETTER U AUDIO END //
  
      // umbrella AUDIO BEGIN//
      var obj42 = document.createElement("audio");
      obj42.src = "audio/umbrella.mp3";
      obj42.volume = 0.1;
      obj42.autoPlay = false;
      obj42.preLoad = true;
      obj42.controls = true;
  
      $("#img-2u").click(function() {
          obj42.play();
      });
      // umbrella AUDIO END //



       // LETTER V AUDIO BEGIN //
     var obj43 = document.createElement("audio");
     obj43.src = "audio/v-audio-1.mp3";
     obj43.volume = 0.1;
     obj43.autoPlay = false;
     obj43.preLoad = true;
     obj43.controls = true;
 
     $("#img-1v").click(function() {
         obj43.play();
     });
     // LETTER V AUDIO END //
 
     // violin AUDIO BEGIN//
     var obj44 = document.createElement("audio");
     obj44.src = "audio/violin.mp3";
     obj44.volume = 0.1;
     obj44.autoPlay = false;
     obj44.preLoad = true;
     obj44.controls = true;
 
     $("#img-2v").click(function() {
         obj44.play();
     });
     // violin AUDIO END //




      // LETTER W AUDIO BEGIN //
      var obj45 = document.createElement("audio");
      obj45.src = "audio/w-audio-1.mp3";
      obj45.volume = 0.1;
      obj45.autoPlay = false;
      obj45.preLoad = true;
      obj45.controls = true;
  
      $("#img-1w").click(function() {
          obj45.play();
      });
      // LETTER W AUDIO END //
  
      // whale AUDIO BEGIN//
      var obj46 = document.createElement("audio");
      obj46.src = "audio/whale.mp3";
      obj46.volume = 0.1;
      obj46.autoPlay = false;
      obj46.preLoad = true;
      obj46.controls = true;
  
      $("#img-2w").click(function() {
          obj46.play();
      });
      // whale AUDIO END //



       // LETTER X AUDIO BEGIN //
     var obj47 = document.createElement("audio");
     obj47.src = "audio/x-audio-1.mp3";
     obj47.volume = 0.1;
     obj47.autoPlay = false;
     obj47.preLoad = true;
     obj47.controls = true;
 
     $("#img-1x").click(function() {
         obj47.play();
     });
     // LETTER X AUDIO END //
 
     // xylophone AUDIO BEGIN//
     var obj48 = document.createElement("audio");
     obj48.src = "audio/xylophone.mp3";
     obj48.volume = 0.1;
     obj48.autoPlay = false;
     obj48.preLoad = true;
     obj48.controls = true;
 
     $("#img-2x").click(function() {
         obj48.play();
     });
     // xylophone AUDIO END //



      // LETTER Y AUDIO BEGIN //
      var obj49 = document.createElement("audio");
      obj49.src = "audio/y-audio-1.mp3";
      obj49.volume = 0.1;
      obj49.autoPlay = false;
      obj49.preLoad = true;
      obj49.controls = true;
  
      $("#img-1y").click(function() {
          obj49.play();
      });
      // LETTER Y AUDIO END //
  
      // yam AUDIO BEGIN//
      var obj50 = document.createElement("audio");
      obj50.src = "audio/yam.mp3";
      obj50.volume = 0.1;
      obj50.autoPlay = false;
      obj50.preLoad = true;
      obj50.controls = true;
  
      $("#img-2y").click(function() {
          obj50.play();
      });
      // yam AUDIO END //



       // LETTER Z AUDIO BEGIN //
     var obj51 = document.createElement("audio");
     obj51.src = "audio/z-audio-1.mp3";
     obj51.volume = 0.1;
     obj51.autoPlay = false;
     obj51.preLoad = true;
     obj51.controls = true;
 
     $("#img-1z").click(function() {
         obj51.play();
     });
     // LETTER Z AUDIO END //
 
     // zebra AUDIO BEGIN//
     var obj52 = document.createElement("audio");
     obj52.src = "audio/zebra.mp3";
     obj52.volume = 0.1;
     obj52.autoPlay = false;
     obj52.preLoad = true;
     obj52.controls = true;
 
     $("#img-2z").click(function() {
         obj52.play();
     });
     // zebra AUDIO END //



    // $(function() {
    //     $('#button-a').click(function(e){
    //         console.log( 'clicked on div' );
    //         $( "#img-2" ).toggle();
    //         $( "#img-1" ).toggle();
    //         e.stopPropagation(); // Prevent bubbling
    //     });
    // });

    // $(function() {
    //     $('#button-b').click(function(e){
    //         console.log( 'clicked on div' );
    //         $( "#img-2" ).toggle();
    //         $( "#img-1" ).toggle();
    //         e.stopPropagation(); // Prevent bubbling
    //     });
    // });
    
    // for (var i = 0; i < 27; ++i) {
    //     this["card"+i] = "add here";
    // }

    // for (var i = 0;i < 27; i++) {
    //     this["card"+i] = document.querySelector("card"+i);
    //     this["card"+i].addEventListener( 'click', function() {
    //     this["card"+i].classList.toggle('is-flipped');
    // });
    // }

   

    // let cardx = [0,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];

    // for (let value of iterable) {
    //     var card = document.querySelector('.card');
    //     card.addEventListener( 'click', function() {
    //     card.classList.toggle('is-flipped');
    // });
    // value += 1;
    // console.log(value);
    // }

    // var card = [];
    // for (var i = 0; i < 26; ++i) {
    //     card[i] = document.querySelector('.card' + i);
    //     card[i].addEventListener( 'click', function() {
    //         card[i].classList.toggle('is-flipped');
    //     });
    // }

    // English Cards
    var card = document.querySelector('.card');
    card.addEventListener( 'click', function() {
    card.classList.toggle('is-flipped');
    });

    var card2 = document.querySelector('.card2');
    card2.addEventListener( 'click', function() {
    card2.classList.toggle('is-flipped');
    });

    var card3 = document.querySelector('.card3');
    card3.addEventListener( 'click', function() {
    card3.classList.toggle('is-flipped');
    });

    var card4 = document.querySelector('.card4');
    card4.addEventListener( 'click', function() {
    card4.classList.toggle('is-flipped');
    });

    var card5 = document.querySelector('.card5');
    card5.addEventListener( 'click', function() {
    card5.classList.toggle('is-flipped');
    });

    var card6 = document.querySelector('.card6');
    card6.addEventListener( 'click', function() {
    card6.classList.toggle('is-flipped');
    });

    var card7 = document.querySelector('.card7');
    card7.addEventListener( 'click', function() {
    card7.classList.toggle('is-flipped');
    });

    var card8 = document.querySelector('.card8');
    card8.addEventListener( 'click', function() {
    card8.classList.toggle('is-flipped');
    });

    var card9 = document.querySelector('.card9');
    card9.addEventListener( 'click', function() {
    card9.classList.toggle('is-flipped');
    });

    var card10 = document.querySelector('.card10');
    card10.addEventListener( 'click', function() {
    card10.classList.toggle('is-flipped');
    });

    var card11 = document.querySelector('.card11');
    card11.addEventListener( 'click', function() {
    card11.classList.toggle('is-flipped');
    });

    var card12 = document.querySelector('.card12');
    card12.addEventListener( 'click', function() {
    card12.classList.toggle('is-flipped');
    });

    var card13 = document.querySelector('.card13');
    card13.addEventListener( 'click', function() {
    card13.classList.toggle('is-flipped');
    });

    var card14 = document.querySelector('.card14');
    card14.addEventListener( 'click', function() {
    card14.classList.toggle('is-flipped');
    });

    var card15 = document.querySelector('.card15');
    card15.addEventListener( 'click', function() {
    card15.classList.toggle('is-flipped');
    });

    var card16 = document.querySelector('.card16');
    card16.addEventListener( 'click', function() {
    card16.classList.toggle('is-flipped');
    });

    var card17 = document.querySelector('.card17');
    card17.addEventListener( 'click', function() {
    card17.classList.toggle('is-flipped');
    });

    var card18 = document.querySelector('.card18');
    card18.addEventListener( 'click', function() {
    card18.classList.toggle('is-flipped');
    });

    var card19 = document.querySelector('.card19');
    card19.addEventListener( 'click', function() {
    card19.classList.toggle('is-flipped');
    });

    var card20 = document.querySelector('.card20');
    card20.addEventListener( 'click', function() {
    card20.classList.toggle('is-flipped');
    });

    var card21 = document.querySelector('.card21');
    card21.addEventListener( 'click', function() {
    card21.classList.toggle('is-flipped');
    });

    var card22 = document.querySelector('.card22');
    card22.addEventListener( 'click', function() {
    card22.classList.toggle('is-flipped');
    });

    var card23 = document.querySelector('.card23');
    card23.addEventListener( 'click', function() {
    card23.classList.toggle('is-flipped');
    });

    var card24 = document.querySelector('.card24');
    card24.addEventListener( 'click', function() {
    card24.classList.toggle('is-flipped');
    });

    var card25 = document.querySelector('.card25');
    card25.addEventListener( 'click', function() {
    card25.classList.toggle('is-flipped');
    });

    var card26 = document.querySelector('.card26');
    card26.addEventListener( 'click', function() {
    card26.classList.toggle('is-flipped');
    });






    // Korean Cards //////////////////////////////
    var card1kr = document.querySelector('.card1kr');
    card1kr.addEventListener( 'click', function() {
    card1kr.classList.toggle('is-flipped');
    });
 
    var card2kr = document.querySelector('.card2kr');
     card2kr.addEventListener( 'click', function() {
    card2kr.classList.toggle('is-flipped');
     });

    var card3kr = document.querySelector('.card3kr');
    card3kr.addEventListener( 'click', function() {
    card3kr.classList.toggle('is-flipped');
    });

    var card4kr = document.querySelector('.card4kr');
    card4kr.addEventListener( 'click', function() {
    card4kr.classList.toggle('is-flipped');
    });

    var card5kr = document.querySelector('.card5kr');
    card5kr.addEventListener( 'click', function() {
    card5kr.classList.toggle('is-flipped');
    });

    var card6kr = document.querySelector('.card6kr');
    card6kr.addEventListener( 'click', function() {
    card6kr.classList.toggle('is-flipped');
    });

    var card7kr = document.querySelector('.card7kr');
    card7kr.addEventListener( 'click', function() {
    card7kr.classList.toggle('is-flipped');
    });

    var card8kr = document.querySelector('.card8kr');
    card8kr.addEventListener( 'click', function() {
    card8kr.classList.toggle('is-flipped');
    });

    // var card9kr = document.querySelector('.card9kr');
    // card9kr.addEventListener( 'click', function() {
    // card9kr.classList.toggle('is-flipped');
    // });

    var card10kr = document.querySelector('.card10kr');
    card10kr.addEventListener( 'click', function() {
    card10kr.classList.toggle('is-flipped');
    });

    var card11kr = document.querySelector('.card11kr');
    card11kr.addEventListener( 'click', function() {
    card11kr.classList.toggle('is-flipped');
    });

    var card12kr = document.querySelector('.card12kr');
    card12kr.addEventListener( 'click', function() {
    card12kr.classList.toggle('is-flipped');
    });

    var card13kr = document.querySelector('.card13kr');
    card13kr.addEventListener( 'click', function() {
    card13kr.classList.toggle('is-flipped');
    });

    var card14kr = document.querySelector('.card14kr');
    card14kr.addEventListener( 'click', function() {
    card14kr.classList.toggle('is-flipped');
    });

    var card15kr = document.querySelector('.card15kr');
    card15kr.addEventListener( 'click', function() {
    card15kr.classList.toggle('is-flipped');
    });

    var card16kr = document.querySelector('.card16kr');
    card16kr.addEventListener( 'click', function() {
    card16kr.classList.toggle('is-flipped');
    });

    var card17kr = document.querySelector('.card17kr');
    card17kr.addEventListener( 'click', function() {
    card17kr.classList.toggle('is-flipped');
    });

    var card18kr = document.querySelector('.card18kr');
    card18kr.addEventListener( 'click', function() {
    card18kr.classList.toggle('is-flipped');
    });

    var card19kr = document.querySelector('.card19kr');
    card19kr.addEventListener( 'click', function() {
    card19kr.classList.toggle('is-flipped');
    });

    var card20kr = document.querySelector('.card20kr');
    card20kr.addEventListener( 'click', function() {
    card20kr.classList.toggle('is-flipped');
    });

    var card21kr = document.querySelector('.card21kr');
    card21kr.addEventListener( 'click', function() {
    card21kr.classList.toggle('is-flipped');
    });

    var card22kr = document.querySelector('.card22kr');
    card22kr.addEventListener( 'click', function() {
    card22kr.classList.toggle('is-flipped');
    });

    var card23kr = document.querySelector('.card23kr');
    card23kr.addEventListener( 'click', function() {
    card23kr.classList.toggle('is-flipped');
    });

    var card24kr = document.querySelector('.card24kr');
    card24kr.addEventListener( 'click', function() {
    card24kr.classList.toggle('is-flipped');
    });

    // var card25kr = document.querySelector('.card25kr');
    // card25kr.addEventListener( 'click', function() {
    // card25kr.classList.toggle('is-flipped');
    // });

    // var card26kr = document.querySelector('.card26kr');
    // card26kr.addEventListener( 'click', function() {
    // card26kr.classList.toggle('is-flipped');
    // });

    /////////////////////////////////////////////
    // KOREAN LETTERS and WORDS ////////////////
    ///////////////////////////////////////////

    // LETTER ㄱ AUDIO BEGIN //
    var objkr = document.createElement("audio");
    objkr.src = "audio/korean/kr-gkiuk.mp3";
    objkr.volume = 0.1;
    objkr.autoPlay = false;
    objkr.preLoad = true;
    objkr.controls = true;

    $("#img-1a-kr").click(function() {
        objkr.play();
    });
    // LETTER ㄱ AUDIO END //

    // AIRPLANE AUDIO BEGIN//
    var obj2kr = document.createElement("audio");
    obj2kr.src = "audio/korean/kr-dog.mp3";
    obj2kr.volume = 0.1;
    obj2kr.autoPlay = false;
    obj2kr.preLoad = true;
    obj2kr.controls = true;

    $("#img-2a-kr").click(function() {
        obj2kr.play();
    });
    // AIRPLANE AUDIO END //

     // LETTER ㄴ AUDIO BEGIN //
     var obj3kr = document.createElement("audio");
     obj3kr.src = "audio/korean/kr-niun.mp3";
     obj3kr.volume = 0.1;
     obj3kr.autoPlay = false;
     obj3kr.preLoad = true;
     obj3kr.controls = true;
 
     $("#img-1b-kr").click(function() {
         obj3kr.play();
     });
      // LETTER ㄴ AUDIO END //
 
     // Butterfly AUDIO BEGIN//
     var obj4kr = document.createElement("audio");
     obj4kr.src = "audio/korean/kr-butterfly.mp3";
     obj4kr.volume = 0.1;
     obj4kr.autoPlay = false;
     obj4kr.preLoad = true;
     obj4kr.controls = true;
 
     $("#img-2b-kr").click(function() {
         obj4kr.play();
     });
     // Butterfly AUDIO END //
 
 
 
     // LETTER ㄷ AUDIO BEGIN //
     var obj5kr = document.createElement("audio");
     obj5kr.src = "audio/korean/kr-tigeut.mp3";
     obj5kr.volume = 0.1;
     obj5kr.autoPlay = false;
     obj5kr.preLoad = true;
     obj5kr.controls = true;
 
     $("#img-1c-kr").click(function() {
         obj5kr.play();
     });
     // LETTER ㄷ AUDIO END //
 
     // Eagle AUDIO BEGIN//
     var obj6kr = document.createElement("audio");
     obj6kr.src = "audio/korean/kr-eagle.mp3";
     obj6kr.volume = 0.1;
     obj6kr.autoPlay = false;
     obj6kr.preLoad = true;
     obj6kr.controls = true;
 
     $("#img-2c-kr").click(function() {
         obj6kr.play();
     });
     // Eagle AUDIO END //
 
     // LETTER ㄹ AUDIO BEGIN //
     var obj7kr = document.createElement("audio");
     obj7kr.src = "audio/korean/kr-liul.mp3";
     obj7kr.volume = 0.1;
     obj7kr.autoPlay = false;
     obj7kr.preLoad = true;
     obj7kr.controls = true;
 
     $("#img-1d-kr").click(function() {
         obj7kr.play();
     });
     // LETTER ㄹ AUDIO END //
 
     // Dog AUDIO BEGIN//
     var obj8kr = document.createElement("audio");
     obj8kr.src = "audio/korean/kr-lamp.mp3";
     obj8kr.volume = 0.1;
     obj8kr.autoPlay = false;
     obj8kr.preLoad = true;
     obj8kr.controls = true;
 
     $("#img-2d-kr").click(function() {
         obj8kr.play();
     });
     // Dog AUDIO END //
 
 
 
     // LETTER ㅁ AUDIO BEGIN //
     var obj9kr = document.createElement("audio");
     obj9kr.src = "audio/korean/kr-mium.mp3";
     obj9kr.volume = 0.1;
     obj9kr.autoPlay = false;
     obj9kr.preLoad = true;
     obj9kr.controls = true;
 
     $("#img-1e-kr").click(function() {
         obj9kr.play();
     });
     // LETTER ㅁ AUDIO END //
 
     // Eagle AUDIO BEGIN//
     var obj10kr = document.createElement("audio");
     obj10kr.src = "audio/korean/kr-goose.mp3";
     obj10kr.volume = 0.1;
     obj10kr.autoPlay = false;
     obj10kr.preLoad = true;
     obj10kr.controls = true;
 
     $("#img-2e-kr").click(function() {
         obj10kr.play();
     });
     // Eagle AUDIO END //
 
      // LETTER ㅂ AUDIO BEGIN //
      var obj11kr = document.createElement("audio");
      obj11kr.src = "audio/korean/kr-biup.mp3";
      obj11kr.volume = 0.1;
      obj11kr.autoPlay = false;
      obj11kr.preLoad = true;
      obj11kr.controls = true;
  
      $("#img-1f-kr").click(function() {
          obj11kr.play();
      });
      // LETTER ㅂ AUDIO END //
  
      // Firetruck AUDIO BEGIN//
      var obj12kr = document.createElement("audio");
      obj12kr.src = "audio/korean/kr-airplane.mp3";
      obj12kr.volume = 0.1;
      obj12kr.autoPlay = false;
      obj12kr.preLoad = true;
      obj12kr.controls = true;
  
      $("#img-2f-kr").click(function() {
          obj12kr.play();
      });
      // Firetruck AUDIO END //
 
 
 
      // LETTER ㅅ AUDIO BEGIN //
      var obj13kr = document.createElement("audio");
      obj13kr.src = "audio/korean/kr-shiut.mp3";
      obj13kr.volume = 0.1;
      obj13kr.autoPlay = false;
      obj13kr.preLoad = true;
      obj13kr.controls = true;
  
      $("#img-1g-kr").click(function() {
          obj13kr.play();
      });
      // LETTER ㅅ AUDIO END //
  
      // goose AUDIO BEGIN//
      var obj14kr = document.createElement("audio");
      obj14kr.src = "audio/korean/kr-firetruck.mp3";
      obj14kr.volume = 0.1;
      obj14kr.autoPlay = false;
      obj14kr.preLoad = true;
      obj14kr.controls = true;
  
      $("#img-2g-kr").click(function() {
          obj14kr.play();
      });
      // goose AUDIO END //
 
 
 
      // LETTER ㅎ AUDIO BEGIN //
      var obj15kr = document.createElement("audio");
      obj15kr.src = "audio/korean/kr-hiut.mp3";
      obj15kr.volume = 0.1;
      obj15kr.autoPlay = false;
      obj15kr.preLoad = true;
      obj15kr.controls = true;
  
      $("#img-1h-kr").click(function() {
          obj15kr.play();
      });
      // LETTER ㅎ AUDIO END //
  
      // house AUDIO BEGIN//
      var obj16kr = document.createElement("audio");
      obj16kr.src = "audio/korean/kr-school.mp3";
      obj16kr.volume = 0.1;
      obj16kr.autoPlay = false;
      obj16kr.preLoad = true;
      obj16kr.controls = true;
  
      $("#img-2h-kr").click(function() {
          obj16kr.play();
      });
      // house AUDIO END //
 
 
/* Problem  */
       // LETTER ㅈ AUDIO BEGIN //
    //    var obj17kr = document.createElement("audio");
    //    obj17kr.src = "audio/i-audio-1.mp3";
    //    obj17kr.volume = 0.1;
    //    obj17kr.autoPlay = false;
    //    obj17kr.preLoad = true;
    //    obj17kr.controls = true;
   
    //    $("#img-1i-kr").click(function() {
    //        obj17kr.play();
    //    });
    //    // LETTER ㅈ AUDIO END //
   
    //    // iguana AUDIO BEGIN//
    //    var obj18kr = document.createElement("audio");
    //    obj18kr.src = "audio/korean/kr-house.mp3";
    //    obj18kr.volume = 0.1;
    //    obj18kr.autoPlay = false;
    //    obj18kr.preLoad = true;
    //    obj18kr.controls = true;
   
    //    $("#img-2i-kr").click(function() {
    //        obj18kr.play();
    //    });
       // iguana AUDIO END //
/* Problem  */
 
 
        // LETTER ㅈ AUDIO BEGIN //
      var obj19kr = document.createElement("audio");
      obj19kr.src = "audio/korean/kr-giut.mp3";
      obj19kr.volume = 0.1;
      obj19kr.autoPlay = false;
      obj19kr.preLoad = true;
      obj19kr.controls = true;
  
      $("#img-1j-kr").click(function() {
          obj19kr.play();
      });
      // LETTER ㅈ AUDIO END //
  
      // juice AUDIO BEGIN//
      var obj20kr = document.createElement("audio");
      obj20kr.src = "audio/korean/kr-house.mp3";
      obj20kr.volume = 0.1;
      obj20kr.autoPlay = false;
      obj20kr.preLoad = true;
      obj20kr.controls = true;
  
      $("#img-2j-kr").click(function() {
          obj20kr.play();
      });
      // juice AUDIO END //
 
 
 
       // LETTER ㅊ AUDIO BEGIN //
       var obj21kr = document.createElement("audio");
       obj21kr.src = "audio/korean/kr-chiut.mp3";
       obj21kr.volume = 0.1;
       obj21kr.autoPlay = false;
       obj21kr.preLoad = true;
       obj21kr.controls = true;
   
       $("#img-1k-kr").click(function() {
           obj21kr.play();
       });
       // LETTER ㅊ AUDIO END //
   
       // kite AUDIO BEGIN//
       var obj22kr = document.createElement("audio");
       obj22kr.src = "audio/korean/kr-car.mp3";
       obj22kr.volume = 0.1;
       obj22kr.autoPlay = false;
       obj22kr.preLoad = true;
       obj22kr.controls = true;
   
       $("#img-2k-kr").click(function() {
           obj22kr.play();
       });
       // kite AUDIO END //
 
 
 
        // LETTER ㅋ AUDIO BEGIN //
      var obj23kr = document.createElement("audio");
      obj23kr.src = "audio/korean/kr-kiuk.mp3";
      obj23kr.volume = 0.1;
      obj23kr.autoPlay = false;
      obj23kr.preLoad = true;
      obj23kr.controls = true;
  
      $("#img-1l-kr").click(function() {
          obj23kr.play();
      });
      // LETTER ㅋ AUDIO END //
  
      // lamp AUDIO BEGIN//
      var obj24kr = document.createElement("audio");
      obj24kr.src = "audio/korean/kr-elephant.mp3";
      obj24kr.volume = 0.1;
      obj24kr.autoPlay = false;
      obj24kr.preLoad = true;
      obj24kr.controls = true;
  
      $("#img-2l-kr").click(function() {
          obj24kr.play();
      });
      // lamp AUDIO END //
 
 
 
       // LETTER ㅌ AUDIO BEGIN //
       var obj25kr = document.createElement("audio");
       obj25kr.src = "audio/korean/kr-tiut.mp3";
       obj25kr.volume = 0.1;
       obj25kr.autoPlay = false;
       obj25kr.preLoad = true;
       obj25kr.controls = true;
   
       $("#img-1m-kr").click(function() {
           obj25kr.play();
       });
       // LETTER ㅌ AUDIO END //
   
       // moon AUDIO BEGIN//
       var obj26kr = document.createElement("audio");
       obj26kr.src = "audio/korean/kr-rabbit.mp3";
       obj26kr.volume = 0.1;
       obj26kr.autoPlay = false;
       obj26kr.preLoad = true;
       obj26kr.controls = true;
   
       $("#img-2m-kr").click(function() {
           obj26kr.play();
       });
       // moon AUDIO END //
 
 
 

        // LETTER ㅍ AUDIO BEGIN //
      var obj27kr = document.createElement("audio");
      obj27kr.src = "audio/korean/kr-piup.mp3";
      obj27kr.volume = 0.1;
      obj27kr.autoPlay = false;
      obj27kr.preLoad = true;
      obj27kr.controls = true;
  
      $("#img-1n-kr").click(function() {
          obj27kr.play();
      });
      // LETTER ㅍ AUDIO END //
  
      // nachos AUDIO BEGIN//
      var obj28kr = document.createElement("audio");
      obj28kr.src = "audio/korean/kr-piano.mp3";
      obj28kr.volume = 0.1;
      obj28kr.autoPlay = false;
      obj28kr.preLoad = true;
      obj28kr.controls = true;
  
      $("#img-2n-kr").click(function() {
          obj28kr.play();
      });
      // nachos AUDIO END //
 
 
 
       // LETTER 아 AUDIO BEGIN //
       var obj29kr = document.createElement("audio");
       obj29kr.src = "audio/korean/kr-ah.mp3";
       obj29kr.volume = 0.1;
       obj29kr.autoPlay = false;
       obj29kr.preLoad = true;
       obj29kr.controls = true;
   
       $("#img-1o-kr").click(function() {
           obj29kr.play();
       });
       // LETTER 아 AUDIO END //
   
       // onion AUDIO BEGIN//
       var obj30kr = document.createElement("audio");
       obj30kr.src = "audio/korean/kr-baby.mp3";
       obj30kr.volume = 0.1;
       obj30kr.autoPlay = false;
       obj30kr.preLoad = true;
       obj30kr.controls = true;
   
       $("#img-2o-kr").click(function() {
           obj30kr.play();
       });
       // onion AUDIO END //
 
 
 
 
        // LETTER 야 AUDIO BEGIN //
      var obj31kr = document.createElement("audio");
      obj31kr.src = "audio/korean/kr-ya.mp3";
      obj31kr.volume = 0.1;
      obj31kr.autoPlay = false;
      obj31kr.preLoad = true;
      obj31kr.controls = true;
  
      $("#img-1p-kr").click(function() {
          obj31kr.play();
      });
      // LETTER 야 AUDIO END //
  
      // piano AUDIO BEGIN//
      var obj32kr = document.createElement("audio");
      obj32kr.src = "audio/korean/kr-baseball.mp3";
      obj32kr.volume = 0.1;
      obj32kr.autoPlay = false;
      obj32kr.preLoad = true;
      obj32kr.controls = true;
  
      $("#img-2p-kr").click(function() {
          obj32kr.play();
      });
      // piano AUDIO END //
 
 
 
       // LETTER 어 AUDIO BEGIN //
       var obj33kr = document.createElement("audio");
       obj33kr.src = "audio/korean/kr-uh.mp3";
       obj33kr.volume = 0.1;
       obj33kr.autoPlay = false;
       obj33kr.preLoad = true;
       obj33kr.controls = true;
   
       $("#img-1q-kr").click(function() {
           obj33kr.play();
       });
       // LETTER 어 AUDIO END //
   
       // quail AUDIO BEGIN//
       var obj34kr = document.createElement("audio");
       obj34kr.src = "audio/korean/kr-zebra.mp3";
       obj34kr.volume = 0.1;
       obj34kr.autoPlay = false;
       obj34kr.preLoad = true;
       obj34kr.controls = true;
   
       $("#img-2q-kr").click(function() {
           obj34kr.play();
       });
       // quail AUDIO END //
 
 
 
        // LETTER 여 AUDIO BEGIN //
      var obj35kr = document.createElement("audio");
      obj35kr.src = "audio/korean/kr-yuh.mp3";
      obj35kr.volume = 0.1;
      obj35kr.autoPlay = false;
      obj35kr.preLoad = true;
      obj35kr.controls = true;
  
      $("#img-1r-kr").click(function() {
          obj35kr.play();
      });
      // LETTER 여 AUDIO END //
  
      // robot AUDIO BEGIN//
      var obj36kr = document.createElement("audio");
      obj36kr.src = "audio/korean/kr-kite.mp3";
      obj36kr.volume = 0.1;
      obj36kr.autoPlay = false;
      obj36kr.preLoad = true;
      obj36kr.controls = true;
  
      $("#img-2r-kr").click(function() {
          obj36kr.play();
      });
      // robot AUDIO END //
 
 
 
       // LETTER 오 AUDIO BEGIN //
       var obj37kr = document.createElement("audio");
       obj37kr.src = "audio/korean/kr-oh.mp3";
       obj37kr.volume = 0.1;
       obj37kr.autoPlay = false;
       obj37kr.preLoad = true;
       obj37kr.controls = true;
   
       $("#img-1s-kr").click(function() {
           obj37kr.play();
       });
       // LETTER 오 AUDIO END //
   
       // sandwich AUDIO BEGIN//
       var obj38kr = document.createElement("audio");
       obj38kr.src = "audio/korean/kr-duck.mp3";
       obj38kr.volume = 0.1;
       obj38kr.autoPlay = false;
       obj38kr.preLoad = true;
       obj38kr.controls = true;
   
       $("#img-2s-kr").click(function() {
           obj38kr.play();
       });
       // sandwich AUDIO END //
 
 
 
        // LETTER 요 AUDIO BEGIN //
      var obj39kr = document.createElement("audio");
      obj39kr.src = "audio/korean/kr-yo.mp3";
      obj39kr.volume = 0.1;
      obj39kr.autoPlay = false;
      obj39kr.preLoad = true;
      obj39kr.controls = true;
  
      $("#img-1t-kr").click(function() {
          obj39kr.play();
      });
      // LETTER 요 AUDIO END //
  
      // turtle AUDIO BEGIN//
      var obj40kr = document.createElement("audio");
      obj40kr.src = "audio/korean/kr-chef.mp3";
      obj40kr.volume = 0.1;
      obj40kr.autoPlay = false;
      obj40kr.preLoad = true;
      obj40kr.controls = true;
  
      $("#img-2t-kr").click(function() {
          obj40kr.play();
      });
      // turtle AUDIO END //
 
 
 
       // LETTER 우 AUDIO BEGIN //
       var obj41kr = document.createElement("audio");
       obj41kr.src = "audio/korean/kr-ooh.mp3";
       obj41kr.volume = 0.1;
       obj41kr.autoPlay = false;
       obj41kr.preLoad = true;
       obj41kr.controls = true;
   
       $("#img-1u-kr").click(function() {
           obj41kr.play();
       });
       // LETTER 우 AUDIO END //
   
       // umbrella AUDIO BEGIN//
       var obj42kr = document.createElement("audio");
       obj42kr.src = "audio/korean/kr-umbrella.mp3";
       obj42kr.volume = 0.1;
       obj42kr.autoPlay = false;
       obj42kr.preLoad = true;
       obj42kr.controls = true;
   
       $("#img-2u-kr").click(function() {
           obj42kr.play();
       });
       // umbrella AUDIO END //
 
 
 
        // LETTER 유 AUDIO BEGIN //
      var obj43kr = document.createElement("audio");
      obj43kr.src = "audio/korean/kr-yoo.mp3";
      obj43kr.volume = 0.1;
      obj43kr.autoPlay = false;
      obj43kr.preLoad = true;
      obj43kr.controls = true;
  
      $("#img-1v-kr").click(function() {
          obj43kr.play();
      });
      // LETTER 유 AUDIO END //
  
      // violin AUDIO BEGIN//
      var obj44kr = document.createElement("audio");
      obj44kr.src = "audio/korean/kr-unicorn.mp3";
      obj44kr.volume = 0.1;
      obj44kr.autoPlay = false;
      obj44kr.preLoad = true;
      obj44kr.controls = true;
  
      $("#img-2v-kr").click(function() {
          obj44kr.play();
      });
      // violin AUDIO END //
 
 
 
 
       // LETTER 으 AUDIO BEGIN //
       var obj45kr = document.createElement("audio");
       obj45kr.src = "audio/korean/kr-euh.mp3";
       obj45kr.volume = 0.1;
       obj45kr.autoPlay = false;
       obj45kr.preLoad = true;
       obj45kr.controls = true;
   
       $("#img-1w-kr").click(function() {
           obj45kr.play();
       });
       // LETTER 으 AUDIO END //a
   
       // whale AUDIO BEGIN//
       var obj46kr = document.createElement("audio");
       obj46kr.src = "audio/korean/kr-growl.mp3";
       obj46kr.volume = 0.1;
       obj46kr.autoPlay = false;
       obj46kr.preLoad = true;
       obj46kr.controls = true;
   
       $("#img-2w-kr").click(function() {
           obj46kr.play();
       });
       // whale AUDIO END //
 
 
 
        // LETTER 이 AUDIO BEGIN //
      var obj47kr = document.createElement("audio");
      obj47kr.src = "audio/korean/kr-ee.mp3";
      obj47kr.volume = 0.1;
      obj47kr.autoPlay = false;
      obj47kr.preLoad = true;
      obj47kr.controls = true;
  
      $("#img-1x-kr").click(function() {
          obj47kr.play();
      });
      // LETTER 이 AUDIO END //
  
      // xylophone AUDIO BEGIN//
      var obj48kr = document.createElement("audio");
      obj48kr.src = "audio/korean/kr-iguana.mp3";
      obj48kr.volume = 0.1;
      obj48kr.autoPlay = false;
      obj48kr.preLoad = true;
      obj48kr.controls = true;
  
      $("#img-2x-kr").click(function() {
          obj48kr.play();
      });
      // xylophone AUDIO END //
 
 
 
    //    // LETTER Y AUDIO BEGIN //
    //    var obj49 = document.createElement("audio");
    //    obj49.src = "audio/y-audio-1.mp3";
    //    obj49.volume = 0.1;
    //    obj49.autoPlay = false;
    //    obj49.preLoad = true;
    //    obj49.controls = true;
   
    //    $("#img-1y").click(function() {
    //        obj49.play();
    //    });
    //    // LETTER Y AUDIO END //
   
    //    // yam AUDIO BEGIN//
    //    var obj50 = document.createElement("audio");
    //    obj50.src = "audio/yam.mp3";
    //    obj50.volume = 0.1;
    //    obj50.autoPlay = false;
    //    obj50.preLoad = true;
    //    obj50.controls = true;
   
    //    $("#img-2y").click(function() {
    //        obj50.play();
    //    });
    //    // yam AUDIO END //
 
 
 
    //     // LETTER Z AUDIO BEGIN //
    //   var obj51 = document.createElement("audio");
    //   obj51.src = "audio/z-audio-1.mp3";
    //   obj51.volume = 0.1;
    //   obj51.autoPlay = false;
    //   obj51.preLoad = true;
    //   obj51.controls = true;
  
    //   $("#img-1z").click(function() {
    //       obj51.play();
    //   });
    //   // LETTER Z AUDIO END //
  
    //   // zebra AUDIO BEGIN//
    //   var obj52 = document.createElement("audio");
    //   obj52.src = "audio/zebra.mp3";
    //   obj52.volume = 0.1;
    //   obj52.autoPlay = false;
    //   obj52.preLoad = true;
    //   obj52.controls = true;
  
    //   $("#img-2z").click(function() {
    //       obj52.play();
    //   });
    //   // zebra AUDIO END //
 
});