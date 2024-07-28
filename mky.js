let fileToSend = null

// 주소록 토글 이벤트
const toggleItems = document.querySelectorAll('.toggleItem')

toggleItems.forEach(function (toggleItem) {
    const toggleTit = toggleItem.querySelector('.toggleTit')
    const subList = toggleItem.querySelector('.subList')

    toggleTit.addEventListener('click', function () {
        subList.classList.toggle('active')
        toggleTit.classList.toggle('active') // 이미지 회전을 위해 클래스 추가
    })
})
// 주소록 툴바
const links = document.querySelectorAll('.toolBar a')

links.forEach(function (link) {
    link.addEventListener('click', function () {
        // 모든 링크에서 active 클래스 제거
        links.forEach(function (link) {
            link.classList.remove('active')
        })

        // 클릭한 링크에 active 클래스 추가
        this.classList.add('active')
    })
})
// 주소록 사진 변경
function removePhoto() {
    document.getElementById('photo').src = 'placeholder.jpg'
}

function previewPhoto(event) {
    const reader = new FileReader()
    reader.onload = function () {
        const output = document.getElementById('photo')
        output.src = reader.result
    }
    reader.readAsDataURL(event.target.files[0])
}

// 채팅방 사이드 영역
function toggleView(view) {
    // 각 요소를 변수에 할당
    const chatList = document.getElementById('chatList')
    const addressList = document.getElementById('addressList')
    const sideTitle = document.getElementById('sideTitle')
    const chatButton = document.querySelector(
        '.toggleBtn[onclick="toggleView(\'chat\')"]'
    )
    const addressButton = document.querySelector(
        '.toggleBtn[onclick="toggleView(\'address\')"]'
    )

    if (view === 'chat') {
        // 채팅방 보기로 전환
        chatList.style.display = 'block' // 채팅방 리스트 보이기
        addressList.style.display = 'none' // 주소록 리스트 숨기기
        sideTitle.innerText = '채팅방' // 제목을 '채팅방'으로 변경
        chatButton.style.display = 'none' // '채팅방' 버튼 숨기기
        addressButton.style.display = 'inline-block' // '주소록' 버튼 보이기
    } else {
        // 주소록 보기로 전환
        chatList.style.display = 'none' // 채팅방 리스트 숨기기
        addressList.style.display = 'block' // 주소록 리스트 보이기
        sideTitle.innerText = '주소록' // 제목을 '주소록'으로 변경
        chatButton.style.display = 'inline-block' // '채팅방' 버튼 보이기
        addressButton.style.display = 'none' // '주소록' 버튼 숨기기
    }
}

function toggleCheckboxes() {
    // 주소록 항목의 체크박스와 확인 버튼을 토글
    const checkboxes = document.querySelectorAll('.addressCheckbox')
    const confirmBtn = document.querySelector('.createChatConfirmBtn')
    checkboxes.forEach(checkbox => {
        // 체크박스의 display 속성을 토글
        checkbox.style.display =
            checkbox.style.display === 'none' ? 'inline-block' : 'none'
    })
    // 확인 버튼의 display 속성을 토글
    confirmBtn.style.display =
        confirmBtn.style.display === 'none' ? 'inline-block' : 'none'
}

function toggleCheckbox(element) {
    // 체크박스를 클릭하면 체크 상태를 토글
    const checkbox = element.querySelector('.addressCheckbox')
    checkbox.checked = !checkbox.checked
}

function createChat() {
    // 선택된 주소록 항목을 수집하여 배열에 저장
    const selectedAddresses = []
    const checkboxes = document.querySelectorAll('.addressCheckbox')
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            // 체크된 항목의 이름을 배열에 추가
            selectedAddresses.push(`주소록 ${index + 1}`)
        }
    })
    console.log('선택된 주소록:', selectedAddresses)
}
// 채팅영역
// 메시지를 전송하는 함수
function sendMessage() {
    const messageInput = document.getElementById('messageInput')
    const messageHTML = messageInput.innerHTML.trim()

    if (messageHTML !== '') {
        const chatBody = document.getElementById('chatBody')

        // 새로운 메시지 요소 생성
        const messageElement = document.createElement('div')
        messageElement.classList.add('message', 'sent')
        messageElement.innerHTML = messageHTML

        // 채팅 바디에 추가
        chatBody.appendChild(messageElement)

        // 입력 필드 초기화
        messageInput.innerHTML = ''

        // 채팅 바디 스크롤을 하단으로 이동
        chatBody.scrollTop = chatBody.scrollHeight
    }
}

// 파일 입력 필드를 트리거하는 함수
function triggerFileInput() {
    document.getElementById('fileInput').click()
}

// 파일 입력을 처리하는 함수
function handleFileInput(event) {
    const file = event.target.files[0]
    if (file) {
        fileToSend = file // 전송할 파일을 설정
        document.getElementById('filePopup').style.display = 'block' // 파일 전송 여부를 묻는 팝업 표시
    }
}

// 파일 전송을 확인하는 함수
function confirmFileSend() {
    const fileReader = new FileReader()
    fileReader.onload = function (e) {
        const fileDataUrl = e.target.result
        const messageInput = document.getElementById('messageInput')

        if (fileToSend.type.startsWith('image/')) {
            messageInput.innerHTML = `<img src="${fileDataUrl}" alt="${fileToSend.name}" style="max-width: 100%; max-height: 200px;">`
        } else {
            const fileLink = document.createElement('a')
            fileLink.href = fileDataUrl
            fileLink.download = fileToSend.name
            fileLink.textContent = fileToSend.name
            messageInput.innerHTML = ''
            messageInput.appendChild(fileLink)
        }

        sendMessage()
        cancelFileSend()
    }

    fileReader.readAsDataURL(fileToSend)
}

// 파일 전송을 취소하는 함수
function cancelFileSend() {
    document.getElementById('filePopup').style.display = 'none'
    document.getElementById('fileInput').value = ''
    fileToSend = null
}

// 클립보드에서 이미지를 붙여넣는 함수
document
    .getElementById('messageInput')
    .addEventListener('paste', function (event) {
        const items = (event.clipboardData || window.clipboardData).items
        for (let item of items) {
            if (item.type.indexOf('image') !== -1) {
                const file = item.getAsFile()
                const reader = new FileReader()
                reader.onload = function (event) {
                    const messageInput = document.getElementById('messageInput')
                    messageInput.innerHTML = `<img src="${event.target.result}" alt="Pasted Image" style="max-width: 100%; max-height: 200px;">`
                }
                reader.readAsDataURL(file)
            }
        }
    })

// 키 다운 이벤트 처리
function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        sendMessage()
    }
}

// 이모티콘 컨테이너를 토글하는 함수
function toggleEmojiContainer() {
    const emojiContainer = document.getElementById('emojiContainer')
    const chatBody = document.getElementById('chatBody')

    if (emojiContainer.style.display === 'flex') {
        emojiContainer.style.display = 'none'
        chatBody.style.paddingBottom = '20px'
    } else {
        emojiContainer.style.display = 'flex'
        chatBody.style.paddingBottom = `${emojiContainer.clientHeight + 20}px`
    }
}

// 이모티콘을 메시지 입력 필드에 추가하는 함수
function addEmojiToMessageInput(imgElement) {
    const messageInput = document.getElementById('messageInput')
    const img = document.createElement('img')
    img.src = imgElement.src
    img.style.maxWidth = '100%'
    img.style.maxHeight = '100px'
    messageInput.appendChild(img)
}
