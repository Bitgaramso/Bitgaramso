class 부하분산기 {
    constructor() {
        this.노드풀 = new Map();
        this.상태기록 = new Map();
        this.알고리즘 = '라운드로빈';
    }

    async 노드할당(요청) {
        const 가용노드 = this.가용노드필터링();
        if (가용노드.length === 0) {
            throw new Error('사용 가능한 노드가 없습니다');
        }

        switch (this.알고리즘) {
            case '라운드로빈':
                return this.라운드로빈할당(가용노드);
            case '최소연결':
                return this.최소연결할당(가용노드);
            case '가중치':
                return this.가중치기반할당(가용노드, 요청);
            default:
                return this.라운드로빈할당(가용노드);
        }
    }

    가용노드필터링() {
        return Array.from(this.노드풀.entries())
            .filter(([_, 노드]) => 노드.상태 === '정상' && 노드.부하 < 80)
            .map(([id, 노드]) => ({id, ...노드}));
    }
} 