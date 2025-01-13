const 지갑버튼 = document.getElementById('메인지갑연결');
let AI에이전트 = null;
let 블록체인 = null;
let 연산관리자 = null;
let AI모델매니저 = null;
let 네트워크최적화 = null;
let 데이터검증 = null;
let 자원관리 = null;

const 지갑연결하기 = async () => {
    try {
        const { solana } = window;
        
        if (!solana || !solana.isPhantom) {
            alert('팬텀 지갑을 설치해주세요!');
            window.open('https://phantom.app/', '_blank');
            return;
        }

        const 응답 = await solana.connect();
        const 공개키 = 응답.publicKey.toString();
        
        // 시스템 초기화
        AI모델매니저 = new AI모델관리자();
        네트워크최적화 = new 네트워크최적화관리자();
        데이터검증 = new 데이터검증관리자();
        자원관리 = new 자원스케줄러();

        // 네트워크 상태 확인
        const 네트워크품질 = await 네트워크최적화.네트워크상태측정();
        console.log('네트워크 품질:', 네트워크품질);

        // AI 모델 로드
        await AI모델매니저.모델로드('기본모델');

        지갑버튼.classList.add('connected');
        지갑버튼.innerHTML = `
            <img src="phantom.jpg" alt="팬텀 지갑" class="팬텀아이콘">
            <span>${공개키.slice(0, 4)}...${공개키.slice(-4)}</span>
        `;
        
        setTimeout(() => {
            alert(`
                시스템 초기화 완료!\n
                네트워크 품질: ${네트워크품질.toFixed(2)}점\n
                AI 모델 준비 완료\n
                추가 기능은 곧 제공될 예정입니다.
            `);
        }, 1000);
        
    } catch (에러) {
        console.error(에러);
        alert('시스템 초기화 중 오류가 발생했습니다.');
    }
};

// 지갑 연결 버튼에 클릭 이벤트 추가
지갑버튼.addEventListener('click', 지갑연결하기);

// 계정 변경 처리
window.solana?.on('accountChanged', () => {
    // 계정 변경시 페이지 새로고침
    window.location.reload();
}); 