import { json } from "@sveltejs/kit";


class SuccessResponse<T> {

    constructor(public data: T, public message: string = 'Success', public status: number = 200) { }

    send() {
        return json({
            message: this.message,
            data: this.data
        }, { status: this.status });
    }

}

export { SuccessResponse };