import { CDNManager } from "$lib/services/cdn/cdn-manager";
import CDNPathSchema from "$lib/services/cdn/cdn-path-schema";
import { prisma } from "$lib/services/prisma";
import { FailResponse } from "$lib/services/server-response/fail-response";
import { SuccessResponse } from "$lib/services/server-response/success-response";
import type { RequestHandler } from "@sveltejs/kit";
import { v4 as uuidv4 } from "uuid";
import * as z from 'zod';

const bodyTypes = z.object({
    name: z.string().min(3).max(100),
    description: z.string().max(500).optional(),
    image: z.file().refine((file) => file.size > 0, { message: 'Image file is required' })
})

export const POST: RequestHandler = async ({ request, locals }) => {

    try {
        
        const body = await request.formData()

        const formBody = Object.fromEntries(body)

        const parsedBody = bodyTypes.safeParse(formBody);

        if (!parsedBody.success) {
            return new FailResponse('Invalid request body', 400).send();
        }

        if (!locals.user) {
            return new FailResponse('Unauthorized', 401).send();
        }

        const { name, description, image } = parsedBody.data;

        const cdnManager = new CDNManager()

        const projectId = uuidv4()

        const imageKey = CDNPathSchema.getInstance().projectImageKey(projectId, name)

        const imageUrl = await cdnManager.uploadImage(image, imageKey)

        if (!imageUrl) {
            console.error("Image upload failed")
            throw new FailResponse("Image upload failed", 500)
        }

        const project = await prisma.projects.create({
            data: {
                uuid: projectId,
                owner: {
                    connect: {
                        userId: locals.user.userId
                    }
                },
                name: name,
                description: description || '',
                ProjectImage: {
                    create: {
                        mediaUrl: imageUrl,
                        mediaKey: imageKey,
                        mediaType: image.type,
                    }
                }
            }
        })

        return new SuccessResponse({ id: project.uuid }, 'Project created successfully', 201).send();

    } catch (error) {
        
        console.error('Error creating project:', error);
        return new FailResponse('Internal server error', 500).send();
    }

}