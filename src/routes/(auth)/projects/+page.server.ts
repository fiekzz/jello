import { redirect } from "@sveltejs/kit";
import { ProjectViewModel } from "./project-viewmodel";

export async function load({ locals, cookies }) {

    const session = cookies.get('session');

    if (!session) {
        redirect(303, '/sign-in');
    }

    const viewModel = new ProjectViewModel()

    const projects = await viewModel.fetchProjectsBySession(session)

    return {
        projects
    }

}