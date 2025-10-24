import { Auth0Client, createAuth0Client } from "@auth0/auth0-spa-js";
import { initAuth0 } from "./auth";

class AuthService {

    private static instance: AuthService;

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }

        return AuthService.instance;
    }

    async initAuth(): Promise<Auth0Client> {
        const client = await initAuth0()

        return client
    }
}

export default AuthService;