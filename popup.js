window.onload = function () {
    var bcFile = document.getElementsByClassName('background-file')[0];

    bcFile.addEventListener('input', function (e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file); // 读出 base64
        reader.onloadend = function () {
            // 图片的 base64 格式, 可以直接当成 img 的 src 属性值        
            var dataURL = reader.result;
            chrome.storage.local.set({ 'imageURL': dataURL }, function () {
                alert('更新成功，请刷新浏览器！')
            })
        };
    })

}