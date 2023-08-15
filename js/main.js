let min;
let sec;
let countDownInterval
let startStop = document.getElementById('startStop');
let resetButton = document.getElementById('reset');
let modeTitle = document.getElementsByClassName('mode');

function start() {
    sec = 0;
    switch(document.getElementsByClassName('timer')[0].id) {
        case "work":
            min = 25;
            break;
        case "break":
            min = 5;
            break; 
    }
    startStop.innerHTML = "Stop";
    startStop.setAttribute('onclick', "stop()");
    resetButton.style.display = "inline";
    countDownInterval = setInterval(countDown, 1000);
}

function stop() {
    startStop.innerHTML = "Resume";
    startStop.setAttribute('onclick', "resume()");
    clearInterval(countDownInterval);
}

function resume() {
    startStop.innerHTML = "Stop";
    startStop.setAttribute('onclick', "stop()");
    countDownInterval = setInterval(countDown, 1000);
}

function reset() {
    switch(document.getElementsByClassName('timer')[0].id) {
        case "work":
            min = 25;
            break;
        case "break":
            min = "05";
            break; 
    }
    clearInterval(countDownInterval);
    document.getElementsByClassName('timer')[0].innerText = min + ":00";
    document.getElementsByClassName('progress-bar')[0].removeAttribute("style");
    document.getElementsByClassName('progress-bar')[0].setAttribute("aria-valuenow", 0);
    startStop.innerHTML = "Start";
    startStop.setAttribute('onclick', "start()");
}

function skip() {
    switch(document.getElementsByClassName('timer')[0].id) {
        case "work":
            min = "05";
            document.getElementsByClassName('timer')[0].id = "break";
            modeTitle[0].innerText = "Break Time";
            break;
        case "break":
            min = 25;
            document.getElementsByClassName('timer')[0].id = "work";
            modeTitle[0].innerText = "Work Time";
            break; 
    } 
    clearInterval(countDownInterval);
    document.getElementsByClassName('timer')[0].innerText = min + ":00";
    document.getElementsByClassName('progress-bar')[0].removeAttribute("style");
    document.getElementsByClassName('progress-bar')[0].setAttribute("aria-valuenow", 0);
    startStop.innerHTML = "Start";
    startStop.setAttribute('onclick', "start()");
}

//method that starts the count down given the time
function countDown() {
    let time = document.getElementsByClassName('timer');
    if (sec == 0) {
        if (min == 0) { //when time runs out
        //alert user and switch to break
            alert("Time's Up!");
            switch(time[0].id) {
                case "work":
                    min = "05";
                    time[0].id = "break";
                    modeTitle[0].innerText = "Break Time";
                    break;
                case "break":
                    min = 25;
                    time[0].id = "work";
                    modeTitle[0].innerText = "Work Time";
                    break;
            }
            clearInterval(countDownInterval);
            startStop.innerHTML = "Start";
            startStop.setAttribute('onclick', 'start()');
        }
        else{ //when seconds run out but minutes are left
           sec = 59;
           min--;
           if (min < 10) { //to add a 0 in front of single digits for formatting
            min = "0" + min;
            }
        }
    }
    else { //when there's still seconds left
        sec--;
        if (sec < 10) { //to add a 0 in front of single digits for formatting
            sec = "0" + sec;
        }
    }
    time[0].innerText = min + ":" + sec;
    progressBar();
    console.log(min + ":" + sec);
}

function getCurrentSec() {
    return (parseInt(min) * 60) + parseInt(sec);
}

function progressBar() {
    let max;
    switch(document.getElementsByClassName('timer')[0].id) {
        case "work":
            max = 25 * 60;
            break;
        case "break":
            max = 5 * 60;
            break; 
    }
    let percent = ((max - getCurrentSec()) * 100) / max ;
    document.getElementsByClassName('progress-bar')[0].setAttribute("style", "width: "+ percent + "%");
    document.getElementsByClassName('progress-bar')[0].setAttribute("aria-valuenow", percent);
}