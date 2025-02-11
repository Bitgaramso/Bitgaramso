class 이상감지기 {
    constructor() {
        this.이상패턴 = new Set();
        this.경고이력 = new Map();
        this.설정 = {
            감지주기: 1000,
            경고임계값: 5,
            자동차단: true
        };
    }

    async 행동분석(행동데이터) {
        const 분석결과 = {
            시간: Date.now(),
            위험도: 0,
            감지된패턴: [],
            조치사항: []
        };

        for (const 패턴 of this.이상패턴) {
            if (this.패턴매칭(행동데이터, 패턴)) {
                분석결과.감지된패턴.push(패턴);
                분석결과.위험도 += 패턴.위험도;
            }
        }

        if (분석결과.위험도 >= this.설정.경고임계값) {
            await this.경고처리(분석결과);
        }

        return 분석결과;
    }
} 