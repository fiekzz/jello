import { Auth0Client, createAuth0Client } from "@auth0/auth0-spa-js";
import { PrismaClient } from "@prisma/client";

class Singleton {
    private static instance: Singleton;

    private prisma: PrismaClient;

    private constructor() {
        this.prisma = new PrismaClient({})
    }

    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }

        return Singleton.instance;
    }

    public getPrisma() {
        return this.prisma;
    }

}

export default Singleton;
