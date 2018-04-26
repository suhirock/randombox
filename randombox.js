'use srtict';

/**
 * class
 */
var Randombox = (function(){

  /**
   *  constructor
   */
  var Randombox = function(args){
    // デフォルト
    this.settings = {
      container: '',
      target: '',
      columns_count: 0,
      columns: {
        3: [5,40,65],
        4: [5,30,55,80],
      },
      breakpoints: {
        835: 3,
        1600: 4,
        9999: 5,
      },
      imgMinWidth: {
        3: 200,
        4: 400,
      },
      imgMaxWidth: {
        3: 400,
        4: 600,
      },
      jumpPx: {
        x: 80,
        y: 100
      },
      posY: 0,
      loading: true,
    };
    
    // パラメータをマージ
    for(i in args){
      this.settings[i] = args[i];
    }
  }

  /**
   *  prototype defined
   */
  var prot = Randombox.prototype;

  /**
   *  function: addLoading
   */
  prot.addLoading = function(){
    var wbox = document.createElement('div');
    wbox.classList.add('randombox__loaderbox');
    wbox.style.backgroundColor = 'white';
    wbox.style.position = 'fixed';
    wbox.style.width = '100%';
    wbox.style.height = '100%';
    wbox.style.zIndex = 10;
    wbox.style.top = 0;
    wbox.style.left = 0;
    wbox.style.transition = 'all .3s ease';

    // loader
    var loader = document.createElement('div');
    loader.classList.add('loader');
    loader.classList.add('loader-3');
    wbox.appendChild(loader);
    // loader css
    var loaderCSS = document.createElement('style');
    var loaderCSSText = '.loader{position: relative;display: inline-block;top:50%;left:50%;margin: -25px 0 0 -25px;width: 50px;height: 50px;border: 2px solid #0cf;border-radius: 50%;animation: spin 0.75s infinite linear;}.loader::before, .loader::after {left: -2px;top: -2px;display: none;position: absolute;content: "";width: inherit;height: inherit;border: inherit;border-radius: inherit;}.loader-3,.loader-3::before,.loader-3::after {box-sizing: border-box;display: inline-block;border-color: transparent;border-top-color: #000;animation-duration: 1.4s;}.loader-3::before {transform: rotate(120deg);}.loader-3::after {transform: rotate(240deg);}@keyframes spin {from {transform: rotate(0deg);}to {transform: rotate(360deg);}';
    var loaderCSSRule = document.createTextNode(loaderCSSText);
    loaderCSS.media = 'screen';
    loaderCSS.type = 'text/css';
    if(loaderCSS.styleSheet){
      loaderCSS.styleSheet.cssText = loaderCSSRule.nodeValue;
    } else {
      loaderCSS.appendChild(loaderCSSRule);
    }

    document.getElementsByTagName('head')[0].appendChild(loaderCSS);
    document.body.appendChild(wbox);
  }

  /**
   *  function: get columns by window size
   */
  prot.getColumnsByWindowSize = function(){
    // param
    var pxs = Object.keys(this.settings.breakpoints),
        wi = window.innerWidth;

    for(var i=0;i<pxs.length;i++){
      if(wi <  pxs[i]){
        this.settings.columns_count = parseInt(this.settings.breakpoints[pxs[i-1]]);
        break;
      }
    }

    return this.settings.columns[this.settings.columns_count];
  }
  
  /**
   * image position & size set
   */
  prot.setObjs = function(){
    var nh = 0; // 行の最大の高さ
    this.settings.posY = this.settings.jumpPx.y; // 初期ラインを設定
    var columns = this.getColumnsByWindowSize();
    if(0 < this.settings.columns_count){
      for(var i=0;i<this.settings.target.length;i++){
        var amari = i%this.settings.columns_count;
        
        
        var maxsize = this.settings.imgMaxWidth[this.settings.columns_count];
        var minsize = this.settings.imgMinWidth[this.settings.columns_count];
        
        // リサイズ
        this.settings.target[i].style.width = (Math.floor(Math.random() * (maxsize - minsize) + minsize)+'px');
        this.settings.target[i].style.height = 'auto';
        // Y配置
        this.settings.target[i].style.top = this.settings.posY + Math.floor(Math.random() * (this.settings.jumpPx.y*2) - this.settings.jumpPx.y)+'px';
        // X配置
        this.settings.target[i].style.left = 'calc('+this.settings.columns[this.settings.columns_count][amari] + '% + ' + Math.floor(Math.random() * (this.settings.jumpPx.x*2) - this.settings.jumpPx.x)+'px)';
        // 最大画像サイズのものを設定
        if(nh < this.settings.target[i].clientHeight){
          nh = this.settings.target[i].clientHeight;
        }
        // 行の終わり
        if(amari === (this.settings.columns_count-1)){
          this.settings.posY += nh + this.settings.jumpPx.y;
          nh = 0;
        }
        // 最終処理
        if(i === this.settings.target.length-1){
          this.settings.target[0].parentNode.style.minHeight = this.settings.posY + nh + 100 + 'px';
          if(this.settings.loading){
            loader = document.querySelector('.randombox__loaderbox');
            loader.style.opacity = 0;
            loader.style.visibility = 'hidden';
          }
        }
      }
    } else {
      loader = document.querySelector('.randombox__loaderbox');
      loader.style.opacity = 0;
      loader.style.visibility = 'hidden';
    }
  }

  /**
   *  function: get columns by window size
   */
  prot.getTarget = function(){
    return this.settings.target;
  }

  /**
   *  return
   */
  return Randombox;

})();

/**
 * action
 */
rb = new Randombox({
  target: document.querySelectorAll('.artworkTail2'),
  imgMinWidth: {
    3: 200,
    4: 400,
  },
  imgMaxWidth: {
    3: 500,
    4: 680,
  },
  jumpPx: {
    x:80,
    y:180
  }
});
rb.addLoading();