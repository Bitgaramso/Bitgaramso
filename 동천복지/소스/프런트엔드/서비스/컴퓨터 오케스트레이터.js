class 연산조정관리자 {
    constructor(보안관리자, 네트워크관리자) {
        this.작업할당 = new Map();
        this.노드상태 = new Map();
        this.보안관리자 = 보안관리자;
        this.네트워크관리자 = 네트워크관리자;
    }

    async 작업조정(작업요청) {
        const 작업ID = crypto.randomUUID();
        const 가용노드 = await this.가용노드찾기();
        
        if (가용노드.length === 0) {
            throw new Error('사용 가능한 노드가 없습니다');
        }

        const 작업할당결과 = await this.작업할당하기(작업요청, 가용노드);
        this.작업할당.set(작업ID, 작업할당결과);

        return {
            작업ID,
            할당노드: 작업할당결과.노드목록,
            예상완료시간: 작업할당결과.예상시간
        };
    }

    async 가용노드찾기() {
        const 노드목록 = Array.from(this.노드상태.entries());
        return 노드목록
            .filter(([_, 상태]) => 상태.가용성 > 0.7)
            .sort((a, b) => b[1].성능점수 - a[1].성능점수);
    }
} 