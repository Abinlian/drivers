// $(document).ready(function() {

//   $("#submit-button").click(function() {

//   });

// });

window.onload = function (argument) {

    var username = document.getElementById('username');
    var password_hash = document.getElementById('password_hash');
    var password_hash_comfirm = document.getElementById('password_hash_comfirm');

    var submit_button = document.getElementById('submit-button');

    submit_button.addEventListener('click', function() {

        if (password_hash.value != password_hash_comfirm.value) {
            alert("两次输入密码不一致!");
            return;
        }

        var payload = {
            username: username.value,
            password_hash: password_hash.value  
        };

        fetch('/api/users', { 
            method: 'POST',
            headers: {
                "Content-Type": "application/json" 
            },        
            body: JSON.stringify(payload)
        }).then(function(res) {
            if (res.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + res.status);           
                return;       
             }        
            // 处理响应中的文本信息        
            return res.json();
        }).then(function(data) {

            // add your code here
            if (data.status != 0) {
                alert(data.message)
                return;
            }

            window.location.href='/login';

        }).catch(function(err) {      
            console.log('Fetch Error : %S', err);   
        });

    });

}
