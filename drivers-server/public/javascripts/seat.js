window.onload = function (argument) {

    //alert("请选择座位^_^")
    
    var user_select = [];
    var self_select = [];
    var others_select = [];
    var corrent_select;

    var seats = document.getElementById('seat-detail');
    var resetButton = document.getElementById('seat-reset');
    var buyButton = document.getElementById('seat-buy');
    var row = seats.getAttribute('row');
    var col = seats.getAttribute('col');
    var others_seats = JSON.parse(seats.getAttribute('others_seats'));
    var self_seats = JSON.parse(seats.getAttribute('self_seats'));

    //手动添加的已售座位
    // others_select.push({row:6,col:8});
    // others_select.push({row:6,col:9});
    // others_select.push({row:7,col:8});
    // others_select.push({row:8,col:8});

    if (self_seats.length != 0) {
        self_seats.forEach(function(item) {
            self_select.push({row:item.row_,col:item.column_});
        });
    }

    self_select.forEach(function(item) {
        seats.children[item.row-1+2].children[item.col-1].children[0].className = 'seat buy';
    });

    if (others_seats.length != 0) {
        others_seats.forEach(function(item) {
            others_select.push({row:item.row_,col:item.column_});
        });
    }

    //已售的置灰
    others_select.forEach(function(item) {
        seats.children[item.row-1+2].children[item.col-1].children[0].className = 'seat disabled';
    });

    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            corrent_select = seats.children[i+2].children[j].children[0];
            corrent_select.addEventListener('click', selectSeat);
        }
    }

    resetButton.addEventListener('click', reset);
    buyButton.addEventListener('click', buy);

    function selectSeat() {
        if (this.className == "seat active") {
            user_select.push({row:this.getAttribute('row'), col:this.getAttribute('col')});
            this.className = "seat selected";
        } else if (this.className == "seat selected") {
            user_select.pop({row:this.getAttribute('row'), col:this.getAttribute('col')});
            this.className = "seat active";
        }
    }

    function reset() {
        user_select.forEach(function(item) {
            seats.children[item.row-1+2].children[item.col-1].children[0].className = 'seat active';
        });
        user_select.length = 0;
    }

    function buy() {
        var msg = "";
        if (user_select.length == 0) {
            alert("您没有选择座位哦～");
        } else {
            // user_select.forEach(function(item) {
            //     msg += "第"+item.row+"排，"+"第"+item.col+"列。\n"
            // })
            // alert("您购买了：\n"+msg+"^_^");
            if (window.location.href[window.location.href.length-1] == '/') {
                window.location.href += 'confirm/' + JSON.stringify(user_select);
                window.location.target = '_blank';
            } else {
                window.location.href += '/confirm/' + JSON.stringify(user_select);
                window.location.target = '_blank';
            }
        }
    }
}
