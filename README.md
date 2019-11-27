<!--
 * @Descripttion: 
 * @Author: quguoliang
 * @Date: 2019-11-27 10:31:39
 * @LastEditors: quguoliang
 * @LastEditTime: 2019-11-27 11:24:08
 -->
# Chrome扩展开发——美化新建标签页

### 一、项目描述
该项目主要用于美化Chrome标签页面，整体是依据我个人习惯构建。目前主要支持功能如下：
- 支持多引擎搜索，点击🔍可以动态切换搜索引擎；
- 支持最近十条收藏记录显示，便于快捷访问；
- 支持自定义背景皮肤；


### 二、目录结构

.
├── README.md                   // Help
├── background.js               // Chrome扩展的背景js文件
├── logo.png
├── manifest.json               // Chrome扩展的配置文件
├── middle.html                 // 中转文件
├── middle.js
├── newtab                      // 新建标签页面
│   ├── bg.jpg
│   ├── newtab.css
│   ├── newtab.html
│   ├── newtab.js
│   └── search.png
├── popup.html                  // 图标显示的文件
└── popup.js                

### 三、问题记录
1、Chrome扩展修改新建标签页时，页面主体无法获得正常获得焦点，经查询知目前扩展无法修改这个问题，焦点会默认到空的地址栏。

解决办法：新建一个中间过渡页面middle通过chrome.extension.getURL('newtab/newtab.html')进行打开我们的目标页面，在通过window.close()关闭middle页面，新该页面是可以进行正常获取焦点的，但是会出现一个标签的打开关闭动作，不算友好，但是已经是目前来看最好的处理方式了。


2、通过popup支持换肤功能时，没有办法获取到图片本地路径。

解决办法：经查阅发现目前浏览器是禁止任何扩展直接获取到系统文件的本机路径的。所以更改实现方式，通过缓存用户上传的图片转换成base64格式引入实现换肤，一开始使用chrome.storage.sync进行存储，因为该方法支持不同浏览器同步方法，但是实践发现该方法有大小限制，图片转换的base64超出文件显示，无法使用，后被迫使用容量大但不支持同步的chrome.storage.local进行存储换肤。


3、Chrome扩展开发过程中页面html中是不支持引入任何js方法的，只能通过js动态引入。

### 四、收获

1、复习了一遍原生js的操作，确实忘记的很多，通过本次开发也熟悉了不少。

2、了解了chrome扩展开发的流程以及整体项目逻辑，相信通过查阅资料进行开发更多有意思的扩展不是问题。