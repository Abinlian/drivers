window.onload = function () {
    var profile = document.getElementById('tab-desc');
    var actors = document.getElementById('tab-celebrity');
    var pictures = document.getElementById('tab-img');

    var profile_hidden = document.getElementById('tab-desc-hidden');
    var actors_hidden = document.getElementById('tab-celebrity-hidden');
    var pictures_hidden = document.getElementById('tab-img-hidden');

    profile.innerHTML = profile_hidden.value + profile.innerHTML;
    actors.innerHTML = actors_hidden.value;
    pictures.innerHTML = pictures_hidden.value;

}

function addClass(obj, cls){
  var obj_class = obj.className,//获取 class 内容.
  blank = (obj_class != '') ? ' ' : '';//判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
  added = obj_class + blank + cls;//组合原来的 class 和需要添加的 class.
  obj.className = added;//替换原来的 class.
}
