// sidebar 공통요소 script
let btn = document.querySelector('#btn')

let sideBar = document.querySelector('.sideBar')

btn.onclick = function () {
    sideBar.classList.toggle('active')
}

const toggleItems = document.querySelectorAll('.toggleItem')

toggleItems.forEach(function (toggleItem) {
    const toggleTit = toggleItem.querySelector('.toggleTit')
    const subList = toggleItem.querySelector('.subList')

    toggleTit.addEventListener('click', function () {
        subList.classList.toggle('active')
        toggleTit.classList.toggle('active') // 이미지 회전을 위해 클래스 추가
    })
})

// 새 결재 진행 클릭 시 모달창 띄우는 함수
$('#startApprBtn').on('click', () => {
    // 모달창 CSS 변경
    $('.eApprModal.docuChoiModal').css({ display: 'flex' })

    // 체크박스 클릭 이벤트 핸들러
    $("input[name='docuName']").on('click', function () {
        const docu = noMultiClick(this)
        console.log(docu)
    })
    $('.next').on('click', () => {
        $('.eApprModal.docuChoiModal').css({ display: 'none' })
        $('.eApprModal.apprChoiModal').css({ display: 'flex' })
    })
    $('.cancel').on('click', () => location.reload())
})

// 모달창에서 체크박스의 다중 선택을 방지하는 함수
function noMultiClick(e) {
    const checkBoxes = $("input[name='docuName']")

    // 모든 체크박스를 초기화
    checkBoxes.prop('checked', false)

    // 선택한 체크박스만 활성화
    $(e).prop('checked', true)
    return $(e).val()
}
