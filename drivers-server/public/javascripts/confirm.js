window.onload = function (argument) {

    var detail = document.getElementById('detail');
    var seats = JSON.parse(detail.getAttribute('seats'));
    var shows = JSON.parse(detail.getAttribute('shows'));
    var submit_button = document.getElementById('submit-button');
    var minute = document.getElementById('minute');
    var second = document.getElementById('second');

    var m = minute.innerHTML;
    var s = second.innerHTML;
    var time = m * 60 + s * 1;
    let timer = setInterval(function() {
        if (time > 0) {
            time--;
            m = parseInt(time/60);
            s = time%60;
            minute.innerHTML = m;
            second.innerHTML = s;
        }
        if (time <= 0) {
            clearInterval(timer);
            history.go(-1);
        }
    }, 1000);

    submit_button.addEventListener('click', function() {
        var payload = {
            seats: seats,
            shows: shows
        };

        fetch('/api/payment', { 
            method: 'POST',
            headers: {
                "Content-Type": "application/json" 
            },
            credentials: 'include',     
            body: JSON.stringify(payload)
        }).then(function(res) {
            if (res.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + res.status);           
                return;       
             }        
            // 处理响应中的文本信息        
            return res.json();
        }).then(function(data) {
            data = data.data;
            if (data.status == 530) {
                // 登录超时
                alert(data.message);
                window.location.href='/login';
            }
            if (data.status == 1001) {
                // 座位被预约
                alert(data.message);
            }
            if (data.status == 200) {
                // 预约成功
                alert(data.message)
            }

        }).catch(function(err) {      
            console.log('Fetch Error : %S', err);   
        });
    });
}
