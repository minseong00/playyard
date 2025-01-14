const socket = io();

const $el = document.querySelector("#chat")


socket.on('update', function(data){
    var chat = document.getElementById('chat')
    var message = document.createElement('div')
    var node = document.createTextNode(`상대 : ${data.message}`)
    var className = ''

    // 타입에 따라 적용할 클래스를 다르게 지정
    switch(data.type){
        case 'message':
            className = 'other'
            break
        case 'connect':
            className = 'connect'
            break
        case 'disconnect':
            className = 'disconnect'
            break
    }

    message.classList.add(className)
    message.appendChild(node)
    chat.prepend(message)
})

function send(){
    // 입력되어있는 데이터 가져오기
    var sendmessage = document.getElementById('text').value
    var message = '나 : ' + document.getElementById('text').value
    // 가져왔으니 데이터 빈칸으로 변경
    document.getElementById('text').value = ''

    // 내가 전송할 메시지 클라이언트에게 표시
    var chat = document.getElementById('chat')
    var msg = document.createElement('div')
    var node = document.createTextNode(message)
    msg.classList.add('me')
    msg.appendChild(node)
    chat.prepend(msg)

    // 서버로 message 이벤트 전달 + 데이터
    socket.emit('message', {type: 'message', message: sendmessage})
}

const scrollfix = () => {
    setInterval(() => {
        const eh = $el.clientHeight + $el.scrollTop;
        const isScroll = $el.scrollHeight <= eh;
        
        // 스크롤이 최하단 일때만 고정
        if(isScroll){
            $el.scrollTop = $el.scrollHeight;
        }
    }, 800);
}
scrollfix();