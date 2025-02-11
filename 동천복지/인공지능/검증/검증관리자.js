class 검증관리자 {
    constructor() {
        this.검증이력 = new Map();
        this.검증규칙 = new Set();
    }

    async 결과검증(작업ID, 결과) {
        const 검증결과 = {
            작업ID,
            검증시작: Date.now(),
            통과여부: true,
            검증항목: []
        };

        for (const 규칙 of this.검증규칙) {
            const 항목결과 = await this.규칙검증(규칙, 결과);
            검증결과.검증항목.push(항목결과);
            
            if (!항목결과.통과) {
                검증결과.통과여부 = false;
                break;
            }
        }

        this.검증이력.set(작업ID, 검증결과);
        return 검증결과;
    }
} 