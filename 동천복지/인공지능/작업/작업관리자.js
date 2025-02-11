class 작업관리자 {
    constructor() {
        this.작업목록 = new Map();
        this.우선순위큐 = [];
        this.실행중작업 = new Set();
    }

    async 작업등록(작업정보) {
        const 작업ID = crypto.randomUUID();
        const 신규작업 = {
            ...작업정보,
            ID: 작업ID,
            상태: '대기중',
            등록시간: Date.now(),
            우선순위: this.우선순위계산(작업정보)
        };

        this.작업목록.set(작업ID, 신규작업);
        this.우선순위큐.push(작업ID);
        this.우선순위큐.sort((a, b) => 
            this.작업목록.get(b).우선순위 - this.작업목록.get(a).우선순위
        );

        return 작업ID;
    }

    우선순위계산(작업정보) {
        return (
            작업정보.긴급도 * 0.4 +
            작업정보.복잡도 * 0.3 +
            작업정보.보상 * 0.3
        );
    }
} 