


function getObjectURL(file) {
    　　var url = null ;
    　　if (window.createObjectURL!=undefined) {
    　　　　url = window.createObjectURL(file) ;
    　　} else if (window.URL!=undefined) {
    　　　　url = window.URL.createObjectURL(file) ;
    　　} else if (window.webkitURL!=undefined) {
    　　　　url = window.webkitURL.createObjectURL(file) ;
    　　}
    　　return url ;
}

var suofang = function(url, bili, callback) {
    var _img = new Image();
    _img.src = url;
    _img.onload = function() {
        var _canvas = document.createElement("canvas");
        var w = this.width / bili;
        var h = this.height / bili;
        _canvas.setAttribute("width", w);
        _canvas.setAttribute("height", h);
        _canvas.getContext("2d").drawImage(this, 0, 0, w, h);
        var base64 = _canvas.toDataURL("image/jpeg");
        _canvas.toBlob(function(blob) {
            console.log(blob.size)
            if(blob.size > 100*1024){
                suofang(base64, bili, callback);
            }else{
                callback(blob, base64);
            }
        }, "image/jpeg");
    }
}

function getImgBase64Data(file, callback) {
    var reader = new FileReader();
    reader.onload = function (e) {
        var base64 = e.target.result;
        var bili = 1.5;
        suofang(base64, bili, callback);
    };
    reader.readAsDataURL(file);
}
const imgToBase64 = () => {

    return new Promise((reslove,reject)=>{
    
        let fileObj = document.createElement("input");
        fileObj.type = "file";
        fileObj.accept = "image/*"
        fileObj.onchange = (obj) => {
            if(obj.target.files[0]){
                let url = getObjectURL(obj.target.files[0]);
                suofang(url, 1.5, (blob, base64)=>{
                    console.log(base64)
                    reslove({
                        blob,
                        base64
                    })
                });
            }else{
                reject(false)
            }
        }
        fileObj.click();

    });

    
}

export default imgToBase64;