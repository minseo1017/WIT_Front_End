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

    // 다음 버튼 클릭 시 결재선 선택 모달창 활성화
    $('.next').on('click', () => {
        $('.eApprModal.docuChoiModal').css({ display: 'none' })
        $('.eApprModal.apprChoiModal').css({ display: 'flex' })

        // 완료 버튼 클릭 시

        // 이전 버튼 클릭 시
        $('.prev').on('click', () => {
            $('.eApprModal.docuChoiModal').css({ display: 'flex' })
            $('.eApprModal.apprChoiModal').css({ display: 'none' })
        })
    })

    // 취소 버튼 클릭 시 페이지 새로고침
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

// 모달창에서 X 버튼 클릭 시 페이지 새로고침
$('.closeModal').on('click', () => location.reload())

// 결재 or 전결 버튼 클릭 시 결재 코멘트 입력 모달창 활성화
$('.apprBtn').on('click', () => {
    $('.apprModal').css({ display: 'flex' })

    // 반려 버튼 클릭 시 반려 코멘트 모달창 활성화
    $('.noApprBtn').on('click', () => {
        $('.apprModal').css({ display: 'none' })
        $('.cancelModal').css({ display: 'flex' })
    })

    // 취소 버튼 클릭 시 해당 모달창 비활성화
    $('.closeModal').on('click', () => {
        $('.apprModal').css({ display: 'none' })
    })
})

// 반려 버튼 클릭 시 반려 코멘트 모달창 활성화
$('.noApprBtn').on('click', () => {
    $('.cancelModal').css({ display: 'flex' })

    // 취소 버튼 클릭 시 해당 모달창 비활성화
    $('.closeModal').on('click', () => {
        $('.cancelModal').css({ display: 'none' })
    })
})
