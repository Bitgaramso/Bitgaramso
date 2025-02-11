class 인증관리자 {
    constructor() {
        this.인증토큰 = new Map();
        this.차단목록 = new Set();
        this.설정 = {
            토큰만료시간: 3600,
            최대시도횟수: 3,
            차단시간: 1800
        };
    }

    async 인증토큰생성(지갑주소) {
        if (this.차단목록.has(지갑주소)) {
            throw new Error('차단된 지갑 주소');
        }

        const 토큰 = crypto.randomUUID();
        const 토큰정보 = {
            지갑: 지갑주소,
            생성시간: Date.now(),
            만료시간: Date.now() + (this.설정.토큰만료시간 * 1000)
        };

        this.인증토큰.set(토큰, 토큰정보);
        return 토큰;
    }
} 