$( document ).ready(function() {

    // LETTER A AUDIO BEGIN //
    var obj = document.createElement("audio");
    obj.src = "audio/letter-a.mp3";
    obj.volume = 0.1;
    obj.autoPlay = false;
    obj.preLoad = true;
    obj.controls = true;

    $("#img-1").click(function() {
        obj.play();
    // obj.pause();
    });

    // APPLE AUDIO //
    var obj2 = document.createElement("audio");
    obj2.src = "audio/apple-audio.mp3";
    obj2.volume = 0.1;
    obj2.autoPlay = false;
    obj2.preLoad = true;
    obj2.controls = true;

    $("#img-2").click(function() {
        obj2.play();
    // obj.pause();
    });
    // LETTER A AUDIO END //

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

    var card = document.querySelector('.card');
        card.addEventListener( 'click', function() {
        card.classList.toggle('is-flipped');
    });

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

        


});

    // function toggle_visibility(id) {
    //     var e = document.getElementById(id);
    //     if(e.style.display == 'block')
    //        e.style.display = 'none';
    //     else
    //        e.style.display = 'block';
    //  }