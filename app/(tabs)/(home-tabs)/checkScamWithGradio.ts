// export async function checkScamWithGradio(userInput: string): Promise<string> {
//     const API_BASE = "https://hackerbyhobby-sms-scam-detection.hf.space/gradio_api/call/smishing_detector";
//     const payload = {
//         data: ["Text", userInput, null]
//     };

//     // Step 1: POST to get event_id
//     const postRes = await fetch(API_BASE, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload)
//     });
//     const postText = await postRes.text();
//     let postJson;
//     try {
//         postJson = JSON.parse(postText);
//     } catch (e) {
//         throw new Error('POST not JSON: ' + postText);
//     }
//     const eventId = postJson.event_id || (typeof postJson === "string" ? postJson : null);
//     if (!eventId) throw new Error("No event_id returned!");

//     // Step 2: Poll for the result
//     const pollUrl = `${API_BASE}/${eventId}`;
//     let resultJson = null;
//     for (let i = 0; i < 10; i++) {
//         const pollRes = await fetch(pollUrl);
//         const pollText = await pollRes.text();
//         // Defensive parse
//         try {
//             resultJson = JSON.parse(pollText);
//         } catch (e) {
//             if (pollText.startsWith('event: error')) {
//                 throw new Error('Gradio API backend error: ' + pollText);
//             }
//             await new Promise(res => setTimeout(res, 400));
//             continue;
//         }
//         if (
//             resultJson.status === "COMPLETE" ||
//             resultJson.status === "FINISHED" ||
//             resultJson.data
//         ) break;
//         await new Promise(res => setTimeout(res, 400));
//     }
//     if (!resultJson || !resultJson.data) throw new Error("No result data!");
//     return resultJson.data[0];
// }

export async function checkScamWithGradio(userInput: string): Promise<{ label: string, explanation: string, confidence: number }> {
    const API_BASE = "https://hackerbyhobby-sms-scam-detection.hf.space/gradio_api/call/smishing_detector";
    const payload = {
        data: ["Text", userInput, null]
    };

    // Step 1: POST to get event_id
    const postRes = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    const postText = await postRes.text();
    let postJson;
    try {
        postJson = JSON.parse(postText);
    } catch (e) {
        throw new Error('POST not JSON: ' + postText);
    }
    const eventId = postJson.event_id || (typeof postJson === "string" ? postJson : null);
    if (!eventId) throw new Error("No event_id returned!");

    // Step 2: Poll for result
    const pollUrl = `${API_BASE}/${eventId}`;
    let resultJson = null;
        for (let i = 0; i < 10; i++) {
        const pollRes = await fetch(pollUrl);
        const pollText = await pollRes.text();
        console.log("Poll Response:", pollText);

        // --- FIX: Extract JSON after `data:` if it's not already JSON ---
        let jsonText = pollText;
        // Gradio SSE style: event: complete\ndata: [{...}]
        if (pollText.startsWith('event: complete')) {
            const match = pollText.match(/data: (.*)/s);
            if (match) {
                jsonText = match[1].trim();
            }
        }

        try {
            resultJson = JSON.parse(jsonText);
        } catch (e) {
            if (pollText.startsWith('event: error')) {
                throw new Error('Gradio API backend error: ' + pollText);
            }
            await new Promise(res => setTimeout(res, 400));
            continue;
        }
        // Because the SSE only sends an array, wrap it in a fake {data: ...} object
        if (Array.isArray(resultJson)) {
            resultJson = { data: resultJson, status: "COMPLETE" };
        }
        if (
            resultJson.status === "COMPLETE" ||
            resultJson.status === "FINISHED" ||
            resultJson.data
        ) break;
        await new Promise(res => setTimeout(res, 400));
    }
    if (!resultJson || !resultJson.data || !Array.isArray(resultJson.data) || !resultJson.data[0]) {
        throw new Error("No result data!");
    }
    const resultObj = resultJson.data[0];
    console.log("Returning verdict object:", {
        label: resultObj.label,
        explanation: resultObj.final_explanation,
        confidence: resultObj.confidence
    });
    return {
        label: resultObj.label,
        explanation: resultObj.final_explanation,
        confidence: resultObj.confidence
    };
}
