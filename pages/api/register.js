export const runtime = 'experimental-edge'; // Use 'edge' if not using experimental features

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default async function handler(req) {
    const { method } = req;

    // Read the request body as JSON
    let body;
    try {
        body = await req.json();
    } catch (error) {
        console.error("Failed to parse JSON:", error);
        return new Response(JSON.stringify({ message: "Invalid JSON" }), { status: 400 });
    }

    console.log(body);

    const { captcha } = body;

    if (method === "POST") {
        // If captcha is missing, return an error
        if (!captcha) {
            return new Response(JSON.stringify({
                message: "Unprocessable request, please provide the required fields",
            }), { status: 422 });
        }

        try {
            // Ping the Google reCAPTCHA verify API
            const response = await fetch(
                `https://www.google.com/recaptcha/api/siteverify`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: new URLSearchParams({
                        secret: '6Ld5fkgqAAAAAG1hd3sox_twhS7N4CKdpuNB9oxc',
                        response: captcha,
                    }).toString(),
                }
            );

            const captchaValidation = await response.json();
            console.log("reCAPTCHA validation response:", captchaValidation);

            if (captchaValidation.success) {
                // Simulate a delay
                await sleep(350);
                return new Response("OK", { status: 200 });
            }

            return new Response(JSON.stringify({
                message: "Unprocessable request, Invalid captcha code",
            }), { status: 422 });
        } catch (error) {
            console.error("Error during fetch:", error);
            return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
        }
    }

    // Return 404 if method is not POST
    return new Response("Not found", { status: 404 });
}
