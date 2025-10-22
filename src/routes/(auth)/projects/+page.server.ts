import { redirect } from "@sveltejs/kit";
import { ProjectViewModel } from "./project-viewmodel";

export async function load({ locals }) {

    const userId = locals.user?.userId

    if (!userId) {
        throw redirect(303, '/sign-in')
    }

    const viewModel = new ProjectViewModel()

    const projects = await viewModel.fetchProjects(userId)

    return {
        projects
    }

}