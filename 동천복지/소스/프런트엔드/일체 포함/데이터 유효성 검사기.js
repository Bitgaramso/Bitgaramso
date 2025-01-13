class 데이터검증관리자 {
    constructor() {
        this.검증규칙 = new Map();
        this.검증이력 = [];
        this.해시캐시 = new Map();
    }

    규칙추가(규칙ID, 검증함수) {
        this.검증규칙.set(규칙ID, 검증함수);
    }

    async 데이터검증(데이터, 필수규칙 = []) {
        const 검증결과 = {
            성공: true,
            오류목록: [],
            검증시간: Date.now(),
            데이터해시: await this.해시생성(데이터)
        };

        for (const 규칙ID of 필수규칙) {
            const 규칙함수 = this.검증규칙.get(규칙ID);
            if (!규칙함수) {
                검증결과.오류목록.push(`존재하지 않는 규칙: ${규칙ID}`);
                continue;
            }

            try {
                const 규칙결과 = await 규칙함수(데이터);
                if (!규칙결과.성공) {
                    검증결과.성공 = false;
                    검증결과.오류목록.push(규칙결과.메시지);
                }
            } catch (에러) {
                검증결과.성공 = false;
                검증결과.오류목록.push(`규칙 실행 오류 ${규칙ID}: ${에러.message}`);
            }
        }

        this.검증이력.push(검증결과);
        return 검증결과;
    }

    async 해시생성(데이터) {
        const 텍스트 = JSON.stringify(데이터);
        const 인코더 = new TextEncoder();
        const 데이터버퍼 = 인코더.encode(텍스트);
        const 해시버퍼 = await crypto.subtle.digest('SHA-256', 데이터버퍼);
        return Array.from(new Uint8Array(해시버퍼))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }
} 