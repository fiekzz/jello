import { prisma } from "$lib/services/prisma";
import type { Projects } from "@prisma/client";
import axios from "axios";

class ProjectViewModel {

    async createProject(name: string, description: string): Promise<number> {
        
        const response = await axios.post(
            '/api/projects/create',
            {
                name: name,
                description: description
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        if (response.status === 201) {
            return response.data.id;
        } else {
            throw new Error('Failed to create project');
        }
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
}

export { ProjectViewModel };