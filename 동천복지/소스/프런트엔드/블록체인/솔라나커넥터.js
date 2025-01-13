class 솔라나커넥터 {
    constructor() {
        this.연결설정 = {
            네트워크: 'mainnet-beta',
            최대재시도: 3,
            타임아웃: 30000
        };
        this.활성연결 = null;
    }

    async 연결초기화() {
        try {
            const connection = new web3.Connection(
                'https://api.mainnet-beta.solana.com',
                'confirmed'
            );
            
            const 상태 = await connection.getHealth();
            if (상태 === 'ok') {
                this.활성연결 = connection;
                return true;
            }
            return false;
        } catch (에러) {
            console.error('솔라나 연결 실패:', 에러);
            return false;
        }
    }

    async 계정잔액확인(공개키) {
        if (!this.활성연결) {
            throw new Error('솔라나 연결이 초기화되지 않았습니다');
        }
        return await this.활성연결.getBalance(new web3.PublicKey(공개키));
    }
} 