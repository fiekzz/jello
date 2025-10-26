class CDNPathSchema {

    private static instance: CDNPathSchema;

    private constructor() { }

    public static getInstance(): CDNPathSchema {
        if (!CDNPathSchema.instance) {
            CDNPathSchema.instance = new CDNPathSchema();
        }

        return CDNPathSchema.instance;
    }

    projectImageKey(projectId: string, projectName: string): string {

        const fileName = projectName.toLowerCase().replace(/\s+/g, '-');

        return `images/projects/${projectId}/${fileName}-cover.webp`;
    }
}

export default CDNPathSchema;