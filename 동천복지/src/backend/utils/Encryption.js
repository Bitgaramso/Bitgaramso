class 암호화관리자 {
    constructor() {
        this.알고리즘 = {
            대칭: 'AES-GCM',
            비대칭: 'RSA-OAEP'
        };
        this.키저장소 = new Map();
    }

    async 키생성(용도 = '대칭') {
        if (용도 === '대칭') {
            return await crypto.subtle.generateKey(
                {
                    name: this.알고리즘.대칭,
                    length: 256
                },
                true,
                ['encrypt', 'decrypt']
            );
        } else {
            return await crypto.subtle.generateKey(
                {
                    name: this.알고리즘.비대칭,
                    modulusLength: 4096,
                    publicExponent: new Uint8Array([1, 0, 1]),
                    hash: 'SHA-256'
                },
                true,
                ['encrypt', 'decrypt']
            );
        }
    }

    async 데이터암호화(데이터, 키) {
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const 암호화데이터 = await crypto.subtle.encrypt(
            {
                name: this.알고리즘.대칭,
                iv
            },
            키,
            데이터
        );
        return { 암호화데이터, iv };
    }
} 