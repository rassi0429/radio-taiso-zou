import 'dotenv/config'

export async function getBankIdFromResoniteUserId(userId: string): Promise<string> {
    const result = await fetch(`https://zoubank.resonite.love/api/user/${userId}`)
    const data = await result.json()
    return data.id as string
}

export async function getZouCoinBalance(userId: string): Promise<number> {
    const result = await fetch(`https://zoubank.resonite.love/api/user/${userId}`)
    const data = await result.json()
    return Number(data.balance)
}


export async function sendZouCoin(senderId: string, receiverId: string, amount: number, memo?: string,customData? :any) {

    if(!process.env.ZOUBANK_API_TOKEN) {
        throw new Error("ZOUBANK_API_TOKEN is not set")
    }

    console.log("Sending ZouCoin", senderId, receiverId, amount, memo, customData)

    const result = await fetch(
        "https://zoubank.resonite.love/api/transaction",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + process.env.ZOUBANK_API_TOKEN
            },
            body: JSON.stringify({
                senderId: senderId,
                recipientId: receiverId,
                amount: amount,
                memo: memo ?? "",
                customData: customData ?? {}
            })
        }
    )
    return await result.json()
}


export async function sendZouCoinAdmin(receiverId: string, amount: number, memo?: string,customData? :any) {
    const result = await fetch(
        "https://zoubank.resonite.love/api/transaction",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + process.env.ZOUBANK_API_TOKEN
            },
            body: JSON.stringify({
                recipientId: receiverId,
                amount: amount,
                memo: memo ?? "",
                customData: customData ?? {}
            })
        }
    )
    return await result.json()
}