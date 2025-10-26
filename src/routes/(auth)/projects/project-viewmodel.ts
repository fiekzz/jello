import { prisma } from "$lib/services/prisma";
import type { Projects, Tasks, Users } from "@prisma/client";
import axios from "axios";

// Define the correct return type for projects with tasks
type ProjectWithTasks = Projects & {
    Tasks: Tasks[];
    owner: Users
};

class ProjectViewModel {

    async createProject(name: string, description: string): Promise<number> {

        const response = await axios.post('/api/v1/projects/create', {
            name: name,
            description: description
        }, {
            withCredentials: true
        });

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
                Tasks: true,
                owner: true
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