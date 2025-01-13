class AI모델레지스트리 {
    constructor() {
        this.등록된모델 = new Map();
        this.모델메타데이터 = new Map();
        this.버전이력 = new Map();
    }

    async 모델등록(모델정보) {
        const 모델ID = `${모델정보.이름}_${Date.now()}`;
        const 메타데이터 = {
            ...모델정보,
            등록일시: new Date(),
            해시: await this.모델해시생성(모델정보),
            상태: '검증대기'
        };

        await this.모델검증(메타데이터);
        this.등록된모델.set(모델ID, 모델정보);
        this.모델메타데이터.set(모델ID, 메타데이터);
        
        return 모델ID;
    }

    async 모델해시생성(모델정보) {
        const 데이터 = JSON.stringify(모델정보);
        const 버퍼 = new TextEncoder().encode(데이터);
        const 해시버퍼 = await crypto.subtle.digest('SHA-256', 버퍼);
        return Array.from(new Uint8Array(해시버퍼))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }
} 