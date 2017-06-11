window.onload = function () {
    var choses = document.getElementsByClassName('btn-block--seat__btn');
    var dialogs = document.getElementsByClassName('cinema-action-dialog');
    var closes = document.getElementsByClassName('dialog-close');

    Array.prototype.forEach.call(choses, function(item, index) {
            item.onclick = function() {
                dialogs[index].style.display = 'block';
            }
        }
    );
    Array.prototype.forEach.call(closes, function(item, index) {
            item.onclick = function() {
                dialogs[index].style.display = 'none';
            }
        }
    );

}

function addClass(obj, cls){
  var obj_class = obj.className,//获取 class 内容.
  blank = (obj_class != '') ? ' ' : '';//判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
  added = obj_class + blank + cls;//组合原来的 class 和需要添加的 class.
  obj.className = added;//替换原来的 class.
}
