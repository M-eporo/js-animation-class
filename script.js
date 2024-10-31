//updateメソッド作成
//Error処理

const target = Array.from(document.querySelectorAll(".js-color"));

class CreateAnimation{
  animes = [];
  
  reqIds = [];

  cb = (anime) => {
    anime.play();
  }; 

  constructor(obj){
    if(!obj.targets || obj.targets.length === 0){
      throw new Error("No targets provided for animation");
    }
    obj.targets.forEach((target, index) => {
      const anime = target.animate(obj.keyframes, obj.options);
      anime.cancel();
      anime.reqId = ++index;
      this.animes.push(anime);
    });
  }
  
  start(){
    this.animes.forEach( anime => {
      this.reqIds.push(window.requestAnimationFrame(() => this.cb(anime)));
    });
    return {
      animes: this.animes,
      reqIds: this.reqIds,
    };
  }

  stop(){
    this.reqIds.forEach(id => {
      window.cancelAnimationFrame(id);
    });
  }

  stopPartly(...ids){
    ids.forEach(id => {
      window.cancelAnimationFrame(id);
    });
  }
}

const i = new CreateAnimation({
  targets: target,
  keyframes: [
    {color: "black"},
    {color: "red"},
  ],
  options: {
    duration: 1000,
    direction: "alternate",
    iterations: Infinity
  },
});

const {animes, requestIds} = i.start();
//playState = idle になる
//window.cancelAnimationFrame(requestIds);
console.log(animes)
console.log(requestIds);
//i.stop();

//i.stopPartly(3);
