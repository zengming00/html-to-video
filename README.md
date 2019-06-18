<a href="https://996.icu"><img src="https://img.shields.io/badge/link-996.icu-red.svg" alt="996.icu" /></a>

2018年1月仍在职兔展时研究出来的一种h5转视频的技术，并未在兔展实际使用

# 技术原理
1. 截图，然后合成视频
2. 直接录制

需要由前端代码控制开始时间和结束时间

# 两种方案，各有优缺点
## 截图法
test.js与aa.html

使用phantomjs，win和linux都可以用，但是效率不高，会导致丢帧，很难达到流畅的效果
在动画较少时帧率会变高，动画较多时帧率会减少，导致合成视频后播放的速度发生变化，需要控制帧率，优点是可以在CLI下运行

## 录屏法
main.js与win.html

使用electron，但因为chromium浏览器的bug导致需要在linux下使用，windows下会录成黑屏，
录屏的时候鼠标不要在上面，否则会把鼠标录下来，可以用其它方法避免这个问题比如在上面盖一个窗口，缺点可能是必需在GUI下运行

优点是效率高，不会丢帧，可以录制高清视频，录制的是webm格式，另外还兼容node，可以直接使用esee现有的视频处理模块，可以说phantomjs有的功能，它都有

```
npm install electron
npm start
```

# 通病
都无法录制实时的声音, 需要后期合成

# 安全问题
两种方案都能与本地代码进行交互，存在一定风险，electron使用的是webview一定程度上风险会小很多
