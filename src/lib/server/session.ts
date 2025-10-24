import { prisma } from "$lib/services/prisma";
import { randomBytes } from "crypto";


export async function createSession(userId: string) {
    const token = randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 days

    const session = await prisma.session.create({
        data: {
            userId,
            token,
            expiresAt
        }
    })

    return session
}

export async function validateSession(token: string) {
    const session = await prisma.session.findUnique({
        where: {
            token
        },
        include: {
            user: true
        }
    })

    if (!session) {
        return null
    }

    if (session.expiresAt < new Date()) {
        await prisma.session.delete({
            where: {
                token
            }
        })
        return null
    }

    return session.user
}

export async function deleteSession(token: string) {
    await prisma.session.delete({
        where: {
            token
        }
    })
}