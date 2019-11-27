
window.onload = function () {

    var icons = document.getElementsByClassName('select-icon')[0];
    var bcPlaceholder = document.getElementsByClassName('placeholder')[0];
    var selectTemplate = document.getElementsByClassName('select-tag')[0];
    var inputBox = document.getElementsByClassName('input-search-box')[0];
    var bookmarksBox = document.getElementsByClassName('bookmarks')[0];
    var iconDeg = -45;
    var iconflag = 0;
    var bookmarks;
    var searchMethod = 'Baidu搜索';

    chrome.storage.local.get('imageURL', function (result) {
        if (result.imageURL) {
            document.getElementsByTagName('body')[0].style.backgroundImage = `url('${result.imageURL}')`
        } else {
            document.getElementsByTagName('body')[0].style.backgroundImage = `url('./bg.jpg')`
        }

    });

    //搜索框部分
    bcPlaceholder.innerHTML = searchMethod;
    inputBox.focus();
    if (inputBox.value !== '') {
        bcPlaceholder.style.display = 'none'
    }
    selectTemplate.onmousemove = function () {
        selectTemplate.style.boxShadow = '0 2px 7px #ccc'
    }
    selectTemplate.onmouseout = function () {
        selectTemplate.style.boxShadow = 'none'
    }

    inputBox.addEventListener('input', function (e) {
        if (inputBox.value !== '') {
            bcPlaceholder.style.display = 'none'
        } else {
            bcPlaceholder.style.display = 'inline-block'
        }
    })

    document.onkeydown = function (ev) {
        var event = ev || event
        if (event.keyCode == 13) {
            switch (searchMethod) {
                case 'Baidu搜索':
                    window.location.href = 'https://www.baidu.com/s?wd=' + inputBox.value
                    break;
                case 'Google搜索':
                    window.location.href = 'https://www.google.com/search?q=' + inputBox.value
                    break;
                case 'Bing搜索':
                    window.location.href = 'https://cn.bing.com/search?q=' + inputBox.value
                    break;
            }
        }
    }

    icons.onclick = function () {
        icons.style.transform = `rotate(${iconDeg}deg)`;
        switch (iconDeg) {
            case -45:
                searchMethod = 'Google搜索';
                break;
            case -90:
                searchMethod = 'Bing搜索';
                break;
            case 0:
                searchMethod = 'Baidu搜索';
                break;
        }
        bcPlaceholder.innerHTML = searchMethod

        if (iconDeg <= -90) {
            iconDeg += 45;
            iconflag = 1;
        } else if (iconDeg >= 0) {
            iconDeg -= 45;
            iconflag = 0;
        } else {
            if (iconflag == 1) {
                iconDeg += 45;
            } else {
                iconDeg -= 45;
            }
        }

    }

    //展示书签
    chrome.bookmarks.getTree(function (bookmarkArray) {
        bookmarks = bookmarkArray[0].children[0].children.reverse().slice(0, 10);
        var boomarksElement = "";
        bookmarks.forEach(item => {
            var urlList = item.url.split('/')
            boomarksElement += `<a aria-label='${item.title}' title='${item.title}' href='${item.url}' class='ele-item'><img src='${urlList[0] + '//' + urlList[2] + '/' + 'favicon.ico'}'></img>
            <div  class='website-name'>${item.title}</div></a>`
        })

        bookmarksBox.innerHTML = boomarksElement
    });
}
