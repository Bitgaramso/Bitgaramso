class 메시지브로커 {
    constructor() {
        this.구독자 = new Map();
        this.메시지큐 = new Map();
        this.설정 = {
            최대재시도: 3,
            메시지TTL: 300,
            큐크기제한: 1000
        };
    }

    async 메시지발행(토픽, 메시지) {
        const 메시지ID = crypto.randomUUID();
        const 메시지객체 = {
            ID: 메시지ID,
            데이터: 메시지,
            타임스탬프: Date.now(),
            상태: '대기'
        };

        this.메시지큐.set(메시지ID, 메시지객체);
        await this.구독자통지(토픽, 메시지객체);
        
        return 메시지ID;
    }

    async 구독자통지(토픽, 메시지) {
        const 구독자목록 = this.구독자.get(토픽) || [];
        const 통지작업 = 구독자목록.map(구독자 => 
            this.메시지전송(구독자, 메시지)
        );

        return Promise.allSettled(통지작업);
    }

    async 메시지전송(구독자, 메시지) {
        try {
            await 구독자.핸들러(메시지);
            return { 성공: true, 구독자ID: 구독자.ID };
        } catch (에러) {
            console.error('메시지 전송 실패:', 에러);
            return { 성공: false, 구독자ID: 구독자.ID, 에러 };
        }
    }
} 