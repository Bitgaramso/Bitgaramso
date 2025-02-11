class 연산자원관리자 {
    constructor() {
        this.자원할당상태 = new Map();
        this.대기큐 = [];
        this.설정 = {
            최대동시작업수: 10,
            작업타임아웃: 3600,
            자원회수주기: 300
        };
    }

    async 자원할당요청(작업정보) {
        const 필요자원 = this.필요자원계산(작업정보);
        
        if (!this.자원사용가능(필요자원)) {
            return this.대기큐처리(작업정보);
        }

        const 할당정보 = {
            작업ID: 작업정보.ID,
            할당시간: Date.now(),
            할당자원: 필요자원,
            만료시간: Date.now() + (this.설정.작업타임아웃 * 1000)
        };

        this.자원할당상태.set(작업정보.ID, 할당정보);
        return 할당정보;
    }

    자원사용가능(필요자원) {
        const 현재사용량 = this.현재자원사용량계산();
        return 현재사용량 + 필요자원 <= this.설정.최대동시작업수;
    }
} 