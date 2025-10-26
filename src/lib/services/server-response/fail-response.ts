import { json } from "@sveltejs/kit";

class FailResponse {
    constructor(public error: string, public status: number = 400) { }

    send() {
        return json({
            error: this.error
        }, { status: this.status });
    }
}

export { FailResponse };