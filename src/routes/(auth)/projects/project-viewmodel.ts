import { prisma } from "$lib/services/prisma";
import type { Media, Projects, Tasks, Users } from "@prisma/client";
import axios from "axios";

// Define the correct return type for projects with tasks
type ProjectWithTasks = Projects & {
    Tasks: Tasks[];
    owner: Users,
    collaborators: ({
        ProfileImage: Media | null;
    } & Users)[];
    ProjectImage: Media | null;
};

class ProjectViewModel {

    async createProject(name: string, description: string, imageFile: FileList): Promise<number> {

        const formData = new FormData()

        formData.append('name', name);
        formData.append('description', description);
        if (imageFile.length > 0) {
            formData.append('image', imageFile[0]);
        }

        const response = await axios.post(
            '/api/v1/projects/create',
            formData,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        if (response.status === 201) {
            return response.data.id;
        } else {
            throw new Error(response.data.message || 'Failed to create project');
        }
    }

    async fetchProjectsBySession(sessionToken: string): Promise<ProjectWithTasks[]> {
        const response = await prisma.projects.findMany({
            where: {
                owner: {
                    Session: {
                        token: sessionToken
                    }
                }
            },
            include: {
                ProjectImage: true,
                Tasks: true,
                owner: true,
                collaborators: {
                    include: {
                        ProfileImage: true
                    }
                },
            }
        })

        return response
    }

    async fetchProjects(userId: string): Promise<Projects[]> {

        const projects = await prisma.projects.findMany({
            where: {
                owner: {
                    userId
                }
            }
        })

        return projects

    }

    async deleteProject(projectId: string): Promise<void> {

        console.log('Deleting project with ID:', projectId);

        await axios.post(
            `/api/v1/projects/delete`, {
            projectId: projectId
        },
            {
                withCredentials: true
            }
        );
    }

    async fetchProjectById(projectId: string): Promise<Projects | null> {

        const project = await prisma.projects.findUnique({
            where: {
                uuid: projectId
            }
        });

        return project;
    }
}

export { ProjectViewModel };
export type { ProjectWithTasks };