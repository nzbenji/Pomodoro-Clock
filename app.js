const App = (function() {

    const timerBtn = document.querySelector(".startToggle");
    const resetBtn = document.querySelector(".resetToggle");
    const timer = document.querySelector(".timer");
    const progressInnerEl = document.querySelector(".progress__inner");
  
    const breakToggles = document.querySelector(".breakToggles");
    const breakTime = breakToggles.querySelector(".time");
    const breakDec = breakToggles.querySelector(".decrease");
    const breakInc = breakToggles.querySelector(".increase");
  
    const taskToggles = document.querySelector(".taskToggles");
    const taskTime = taskToggles.querySelector(".time");
    const taskDec = taskToggles.querySelector(".decrease");
    const taskInc = taskToggles.querySelector(".increase");
  
    //Set default time values if not specified
    let timeCount = taskTime.innerHTML || 25
    let breakCount = breakTime.innerHTML || 5
  
    const render = {
      currTime: timeCount * 60,
      breakState: false,
      toggleRunning: false,
      runState: 0,
      //percentage: (currTime / currTime) * 100,
  
      init() {
        this.currTime = timeCount * 60;
        setValue(timer, timeCount * 60)
        setValue(taskTime, timeCount);
        setValue(breakTime, breakCount);
      },
  
      timer() {
        minutes = Math.floor(this.currTime / 60);
        seconds = this.currTime - minutes * 60;
  
        //Adds '0' in front of mins/secs if less than a 2 digit number
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
  
        setValue(timer, `${minutes}:${seconds}`);
      }
    };
  
    //sets innerHTML values
    const setValue = (elem, value) => {
      elem.innerHTML = value;
    }
  
    function startTimer() {
      if (!render.currTime) {
        render.breakState
          ? ((render.currTime = timeCount * 60), (render.breakState = false))
          : ((render.currTime = breakCount * 60), (render.breakState = true));
      }
      render.timer();
      render.currTime = render.currTime - 1;
    }
  
    function renderTask() {
      if(render.toggleRunning) 
        return;
      else {
        this.textContent === '+' ? timeCount += 1 : timeCount < 2 ? timeCount : timeCount-= 1;
        renderAll();
      }
      
    }
  
    function renderBreak() {
      if(render.toggleRunning) return;
      this.textContent === '+' ? breakCount += 1 : breakCount < 2 ? breakCount : breakCount-= 1;
      renderAll();
    }
  
    const getPercentage = () => {
  
      return Math.round((render.currTime / render.currTime) * 100)
    }
  
    const loadingBar = (width, maxPercent) => {
      if(render.currTime){
        let loadingBar = setInterval(function() {
          if (width > maxPercent) {
              clearInterval(loadingBar);
          } else {
      //If width is not greater than max %, we can increase the width for the DOM element
              width++;
              progressInnerEl.style.width = `${width}%`
          }
      }, 15000); 
      } else {
       render.breakState
      }
      
  }
  //Renders progress starting at 0% and max % at 100
  const renderProgress = () => { 
    getPercentage();
    loadingBar(0, 100)
  }
  
    const listeners = () => {
      
      timerBtn.addEventListener("click", function() {
        //Set start button to either Start or Pause 
        render.toggleRunning
          ? (clearInterval(render.runState), 
              (render.toggleRunning = false), setValue(timerBtn, 'Start'))
  
          : ((render.runState = setInterval(startTimer, 1000)), 
                (render.toggleRunning = true), setValue(timerBtn, 'Pause'));
      });
      
      resetBtn.addEventListener("click", function() {
        //reset to default state 
        timeCount = 25;
        breakCount = 5;
        renderAll();
      });
  
      taskInc.addEventListener("click", renderTask);
      taskDec.addEventListener("click", renderTask);
      breakInc.addEventListener("click", renderBreak);
      breakDec.addEventListener("click", renderBreak);
    }
  
    let renderAll = () => {
      render.init();
      render.timer();
      renderProgress();
    }
    
    return {
      listeners: listeners,
      renderAll: renderAll
    }
  
  })();
  
  App.listeners();
  App.renderAll();