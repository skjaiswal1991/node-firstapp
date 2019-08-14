var MYLIBRARY = MYLIBRARY || (function(){
    var _args = {}; // private
    var _data = {}; 
    return {
        init : function(Args) {
           console.log(Args);
            _args = Args;

            //document.getElementById('sharedata').innerHTML= '<iframe width="100%" height="800" src="http://localhost:3000/showwatchdata/1231123"></iframe>';
            // some other initialising
                $('#sharedata').append('<iframe width="100%" height="500px" src="http://localhost:3000/showwatchdata/'+Args[0]+'"></iframe>');

                // $.post("http://localhost:3000/showwatchdata",{data:Args[0]},function(resdata){
                //    console.log(resdata);
                //    _data = resdata;
                //     //document.getElementById('sharedata').innerHTML= responce;
                    
                //     html = '<div class="container">'+
                //                 '<div class="row">'+
                //                     '<div class="timersection">'+
                //                         '<h1>Section 1</h1>'+
                //                        '<span id="future_date"></span>'+
                //                     '</div>'+
                //                     '<div class="timersection">'+
                //                         '<h1>Section 2</h1>'+
                //                    ' </div>'+
                //                     '<div class="timersection">'+
                //                         '<h1>Section 3</h1>'+
                //                     '</div>'+
                //                     '<div class="timersection">'+
                //                         '<h1>Section 4</h1>'+
                //                     '</div>'+
                //                 '</div>'+
                //             '</div>';

                //         css = '<style>'+
                //                 '.timersection{'+
                //                     'width: auto;'+
                //                     'height: 107px;'+
                //                     'padding: 50px;'+
                //                    ' border: 1px solid gray;'+
                //                     'float: left;'+
                //                     'margin-left: 20px;'+
                //                 '}'+
                //                 'span#future_date {'+
                //                     'background-color: green;'+
                //                     'width: 115px;'+
                //                     'padding: 9px;'+
                //                     'font-size: 33px;'+
                //                     'border: 3px solid gray;'+
                //                 '}'+
                //                 '</style>';
                //         html  = html + css;
                    
                //    // $('#sharedata').append('<iframe width="100%" height="500px" src="http://localhost:3000/showwatchdata/'+Args[0]+'"></iframe>');

                // });

                // jQuery
                    // $.getScript('http://localhost:3000/js/jQuery.countdownTimer.js', function()
                    // {
                    //     // script is now loaded and executed.
                    //     // put your dependent JS here.
                    //     console.log("sanjay")
                    //     console.log(_data.houres);
                    //         $("#future_date").countdowntimer({
                    //             hours: _data.houres,
                    //             minutes : _data.minuts,
                    //             seconds : _data.second,
                    //             displayFormat : "HMS",
                    //             size : "lg",
                    //             timeSeparator : ":",
                    //             pauseButton : "pbtnId",
                    //             stopButton : "sbtnId",
                    //             timeUp : function(){
                    //                 countdowntimer("stop", "stop")
                    //             }
                    //         });
                    

                    //     //jQuery("#future_date").countdowntimer("stop", "stop");
                    // });

                    
            
            
         }//,
        // helloWorld : function() {
        //     $( "#sharedata" ).before( '<script type="text/javascript" src="http://localhost:3000/js/jQuery.countdownTimer.js" src=""></script>' );
        //      //alert('Hello World! -' + JSON.stringify(_args));
        //  }
        
    };
}());


// document.getElementById('sharedata').innerHTML= 
// '<h1 id="gashda">Hello data come from </h1>';


