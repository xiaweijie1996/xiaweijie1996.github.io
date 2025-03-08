
export async function getBaiduReply(userMessage) {
    const id = 'GDdo9jy2K3dTBgWRmvMlxwkw10qItQcK';
    const key = 'y1UitWmC2BsMcHyKydFtiyKqEStDP0xM';
    const url = `https://agentapi.baidu.com/assistant/getAnswer?appId=${id}&secretKey=${key}`;

    const headers = {
        "Content-Type": "application/json"
    };

    const data = {
        message: {
            content: {
                type: "text",
                value: {
                    showText: userMessage
                }
            }
        },
        source: "xxx",
        from: "openapi",
        openId: "xxx"
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        });

        const result = await response.json();
        return result; // Return API response
    } catch (error) {
        console.error("Error:", error);
        return { error: "Failed to get a response from the API" }; // Handle errors gracefully
    }
}
