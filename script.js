
$(".stopwatch-btn").click(function(){
    $(".outer-wrapper > div").slideUp();
    $(".stopwatch").slideDown();
    $(".type").html("stopwatch");
});

$(".back-btn").click(function(){
    $(".outer-wrapper > div").slideDown();
    $(".stopwatch").slideUp();
    $(".type").html("stopwatch");
});

const addTrailngZero = (num) => {
    return num < 10 ? "0" + num : num;
};

const updateTime =() =>{
    const time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM";
    let otherampm = hours >= 12 ? "AM" : "PM";

    hours = hours % 12 || 12
    hours = addTrailngZero(hours);
    minutes = addTrailngZero(minutes);
    seconds = addTrailngZero(seconds);

    $("#hour").html(hours);
    $("#min").html(minutes);
    $("#sec").html(seconds);
    $("#ampm").html(ampm);
    $("#other-ampm").html(otherampm);
};

updateTime();
setInterval(updateTime, 1000);

//stopwatch
let stopwatchHours = 0,
    stopwatchMinutes = 0,
    stopwatchSeconds = 0,
    stopwatchMiliseconds = 0,
    stopwatchRunning = false,
    laps = 0,
    stopwatchInterval;

    const stopwatch = () =>{
        stopwatchMiliseconds++;

        if(stopwatchMiliseconds == 100){
            stopwatchSeconds++;
            stopwatchMiliseconds = 0;
        }

        if(stopwatchSeconds ==60){
            stopwatchMinutes++;
            stopwatchSeconds = 0;
        }

        if(stopwatchMinutes ==60){
            stopwatchHours++;
            stopwatchMinutes = 0;
        }

        $("#stopwatch-hour").html(addTrailngZero(stopwatchHours));
        $("#stopwatch-min").html(addTrailngZero(stopwatchMinutes));
        $("#stopwatch-sec").html(addTrailngZero(stopwatchSeconds));
        $("#stopwatch-ms").html(addTrailngZero(stopwatchMiliseconds));
    };

    const startStopwatch = () => {
        if(!stopwatchRunning){
            stopwatchInterval = setInterval(stopwatch, 10);
            stopwatchRunning = true;
        }
    };

    const stopStopwatch = () => {
        clearInterval(stopwatchInterval);
        stopwatchRunning = false;
    };

    const resetStopwatch = () => {
        clearInterval(stopwatchInterval);
        stopwatchHours = 0;
        stopwatchMinutes = 0;
        stopwatchSeconds = 0;
        stopwatchMiliseconds = 0;
        stopwatchRunning = false;
        laps = 0;
        
        $("#stopwatch-hour").html("00");
        $("#stopwatch-min").html("00");
        $("#stopwatch-sec").html("00");
        $("#stopwatch-ms").html("00");
        $(".laps").html("");
    };

    $(".start-stopwatch").click(function() {
        startStopwatch();

        $(".start-stopwatch").hide();
        $(".lap-stopwatch").show();
        $(".pause-stopwatch").show();
        $(".play-stopwatch").show();
    });

    $(".reset-stopwatch").click(function(){
        resetStopwatch();
        $(".start-stopwatch").show();
        $(".lap-stopwatch").hide();
        $(".pause-stopwatch").hide();
        $(".play-stopwatch").hide();

    });

    $(".pause-stopwatch").click(function(){
        stopStopwatch();
    });

    $(".play-stopwatch").click(function(){
        startStopwatch();
    })

   $(".lap-stopwatch").click(function(){
    laps++;
    $(".lap").removeClass("active");
    $(".laps").prepend(
                `<div class="lap active">
                 <p>lap ${laps}</p>
                 <p>
                 ${addTrailngZero(stopwatchHours)} : ${addTrailngZero(stopwatchMinutes)}:
                 ${addTrailngZero(stopwatchSeconds)} : ${addTrailngZero(stopwatchMiliseconds)}  
                 </p>
                </div>`
    );
   });
