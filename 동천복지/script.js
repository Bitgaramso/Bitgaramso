const 지갑버튼 = document.getElementById('메인지갑연결');

const 지갑연결하기 = async () => {
    try {
        // 팬텀 지갑 설치 확인
        const { solana } = window;
        
        if (!solana || !solana.isPhantom) {
            alert('팬텀 지갑을 설치해주세요!');
            window.open('https://phantom.app/', '_blank');
            return;
        }

        // 지갑 연결
        const 응답 = await solana.connect();
        const 공개키 = 응답.publicKey.toString();
        
        // 버튼 상태 업데이트
        지갑버튼.classList.add('connected');
        지갑버튼.innerHTML = `
            <img src="phantom.jpg" alt="팬텀 지갑" class="팬텀아이콘">
            <span>${공개키.slice(0, 4)}...${공개키.slice(-4)}</span>
        `;
        
        // 연결 성공 후 안내 메시지
        setTimeout(() => {
            alert('지갑이 연결되었습니다! 추가 기능은 곧 제공될 예정입니다.');
        }, 1000);
        
        console.log('연결된 공개키:', 공개키);
    } catch (에러) {
        console.error(에러);
        alert('지갑 연결 중 오류가 발생했습니다.');
    }
};

// 지갑 연결 버튼에 클릭 이벤트 추가
지갑버튼.addEventListener('click', 지갑연결하기);

// 계정 변경 처리
window.solana?.on('accountChanged', () => {
    // 계정 변경시 페이지 새로고침
    window.location.reload();
}); 