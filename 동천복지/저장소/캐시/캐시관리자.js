class 캐시관리자 {
    constructor() {
        this.캐시저장소 = new Map();
        this.설정 = {
            최대크기: 1000,
            만료시간: 3600,
            자동정리: true
        };
    }

    async 캐시저장(키, 값, 옵션 = {}) {
        const 캐시항목 = {
            값,
            생성시간: Date.now(),
            만료시간: Date.now() + (옵션.만료시간 || this.설정.만료시간) * 1000,
            접근횟수: 0
        };

        if (this.캐시저장소.size >= this.설정.최대크기) {
            this.캐시정리();
        }

        this.캐시저장소.set(키, 캐시항목);
        return true;
    }

    캐시정리() {
        const 현재시간 = Date.now();
        for (const [키, 항목] of this.캐시저장소.entries()) {
            if (항목.만료시간 < 현재시간) {
                this.캐시저장소.delete(키);
            }
        }
    }
} 