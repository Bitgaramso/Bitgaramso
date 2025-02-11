class 메시지관리자 {
    constructor() {
        this.메시지큐 = [];
        this.구독자 = new Map();
    }

    async 메시지전송(발신자, 수신자, 내용) {
        const 메시지 = {
            ID: crypto.randomUUID(),
            발신자,
            수신자,
            내용,
            시간: Date.now(),
            상태: '전송중'
        };

        this.메시지큐.push(메시지);
        await this.전송처리(메시지);
        return 메시지.ID;
    }

    async 전송처리(메시지) {
        const 구독정보 = this.구독자.get(메시지.수신자);
        if (구독정보?.활성) {
            구독정보.콜백(메시지);
            메시지.상태 = '전송완료';
        }
    }
} 