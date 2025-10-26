import { redirect } from '@sveltejs/kit';
import { ProjectViewModel } from '../project-viewmodel';


export async function load({ locals, cookies, params }) {

    const session = cookies.get('session');

    if (!session) {
        redirect(303, '/sign-in');
    }

    const projectId = params.projectId;

    const viewModel = new ProjectViewModel()

    const project = await viewModel.fetchProjectById(projectId)

    return {
        project
    }

}