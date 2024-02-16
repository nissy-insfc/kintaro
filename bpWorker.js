self.addEventListener(
  "message",
  (e) => {
    let bpTmp = e.data[1];
    console.log(`【W→BPW受】自弁指令:${e.data[0]}現在BP:${e.data[1]}`);

    //BP圧力指定　後で変更
    let bpTarget;

    switch (e.data[0]) {
        case 0:
            bpTarget = 490;
            break;
        case 1:
            bpTarget = 470;
            break;
        case 2:
            bpTarget = 450;
            break;
        case 3:
            bpTarget = 430;
            break;
        case 4:
            bpTarget = 410;
            break;
        case 5:
            bpTarget = 390;
            break;
        case 6:
            bpTarget = 370;
            break;
        case 7:
            bpTarget = 350;
            break;
        case 8:
            bpTarget = 340;
            break;
        case 9:
            bpTarget = 0;
            break;
    }


    //非常
    if(bpTarget == 0){
        var timer = setInterval(function() {
            console.log(`【bpW】非常制動 元bp:${bpTmp}`);
            bpTmp = bpTmp-1;
            if(bpTmp<0){bpTmp=0;}
            console.log(`【bpW→W送】計算bpP:${bpTmp}kPa`);
            self.postMessage(bpTmp); 
            if (bpTmp==0) {
                clearInterval(timer);
              }
        }, 10);    
    }
    //減圧すべき場合
    else if(bpTmp > bpTarget){
        var timer = setInterval(function() {
            console.log(`【bpW】計算開始 元bp:${bpTmp}`);
            bpTmp = Math.floor(bpTmp-2.5);
            console.log(`【bpW→W送】計算bpP:${bpTmp}kPa`);
            self.postMessage(bpTmp); 
            if (bpTmp <= bpTarget) {
                clearInterval(timer);
              }
        }, 75);
    }
    //増圧すべき場合
    else if(bpTmp < bpTarget){
        var timer = setInterval(function() {
            console.log(`【bpW】計算開始 元bp:${bpTmp}`);
              bpTmp = Math.floor(bpTmp+2.5);
              if(bpTmp>490){bpTmp=490;}
            console.log(`【bpW→W送】計算bpP:${bpTmp}kPa`);
            self.postMessage(bpTmp);
            if (bpTmp >= bpTarget) {
                clearInterval(timer);
              }
        }, 125);
    }
  },
  false
);