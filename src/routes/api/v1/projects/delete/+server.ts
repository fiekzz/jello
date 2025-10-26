import { prisma } from "$lib/services/prisma";
import { FailResponse } from "$lib/services/server-response/fail-response";
import { SuccessResponse } from "$lib/services/server-response/success-response";
import type { RequestHandler } from "@sveltejs/kit";
import z from "zod";


const bodyTypes = z.object({
    projectId: z.string()
})

export const POST: RequestHandler = async ({ request, locals }) => {

    try {

        const body = await request.json()

        console.log('Request body for delete project:', body);

        const parsedBody = bodyTypes.safeParse(body);

        if (!parsedBody.success) {

            console.error(parsedBody.error);

            return new FailResponse('Invalid request body', 400).send();
        }

        if (!locals.user) {
            return new FailResponse('Unauthorized', 401).send();
        }

        const { projectId } = parsedBody.data;

        await prisma.projects.delete({
            where: {
                uuid: projectId
            }
        })

        return new SuccessResponse(null, 'Project deleted successfully', 200).send();

    } catch (error) {
        return new FailResponse('Internal Server Error', 500).send();
    }
}