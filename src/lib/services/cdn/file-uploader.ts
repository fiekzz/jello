import https from "https";
import http from "http";
import {
    PutObjectCommand,
    S3Client,
    DeleteObjectsCommand,
    type DeleteObjectsCommandOutput,
    GetObjectCommand,
    S3,
    type CompleteMultipartUploadCommandOutput,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Upload } from "@aws-sdk/lib-storage";
import { getCdnSettings } from "./cdn-settings";
// import { settings } from "$lib/constants/global-settings";

interface IS3Upload {
    fileName: string;
    file: Buffer | Uint8Array;
    publicACL?: boolean;
    contentType?: string;
}

export interface IS3UploadResponse {
    $metadata: Metadata;
    ETag: string;
    Bucket: string;
    Key: string;
    Location: string;
}

export interface Metadata {
    httpStatusCode: number;
    requestId: string;
    attempts: number;
    totalRetryDelay: number;
}

export interface IUploadedMedia {
    mediaURL: string;
    fileType: "image" | "video" | "cover" | "document" | any;
    fileRelation?: string;
    relatedFileKey?: string;
    hasCover?: boolean;
    position?: number;
    fileName?: string;
    mediaName?: string;
    fileHash?: string;
}

export interface IUploadTaskFile {
    name: string;
    type: string;
    size: number;
    blob: Blob | File;
}

export class FileUploader {
    client: S3Client

    constructor() {

        const settings = getCdnSettings()

        this.client = new S3Client({
            region: "apac",
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID!,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
            },
            endpoint: settings.cdnEndpoint,
            forcePathStyle: false
        })
    }

    deleteObjectFromS3 = ({ keys }: { keys: string[] }) => {
        return new Promise<DeleteObjectsCommandOutput>(
            async (resolve, reject) => {
                const command = new DeleteObjectsCommand({
                    Bucket: process.env.CDN_MEDIA_BUCKET_NAME,
                    Delete: {
                        Objects: keys.map((item) => ({
                            Key: item
                        }))
                    }
                })

                try {

                    const response = await this.client.send(command)
                    resolve(response)

                } catch (err) {
                    console.error(err)
                    reject(err)
                }
            }
        )
    }

    getPresignedURL = (mediaKey: string) => {

        const settings = getCdnSettings()

        const command = new GetObjectCommand({
            Bucket: settings.mediaBucketName,
            Key: mediaKey,
        });
        return getSignedUrl(this.client, command, { expiresIn: 3600 });
    };

    uploadToS3 = async ({
        fileName,
        file,
        publicACL = false,
        contentType = "image/webp",
    }: IS3Upload) => {
        return new Promise<CompleteMultipartUploadCommandOutput>(async (resolve, reject) => {
            try {

                const settings = getCdnSettings()

                const parallelUploads3 = new Upload({
                    client: this.client,
                    params: {
                        Bucket: settings.mediaBucketName,
                        Key: fileName,
                        Body: file,
                        ContentType: contentType,
                        ACL: publicACL ? "public-read" : "private",
                    },

                    // optional tags
                    tags: [
                        /*...*/
                    ],

                    // additional optional fields show default values below:

                    // (optional) concurrency configuration
                    queueSize: 4,

                    // (optional) size of each part, in bytes, at least 5MB
                    partSize: 1024 * 1024 * 5,

                    // (optional) when true, do not automatically call AbortMultipartUpload when
                    // a multipart upload fails to complete. You should then manually handle
                    // the leftover parts.
                    leavePartsOnError: false,
                });

                parallelUploads3.on("httpUploadProgress", (progress) => {
                    console.log(progress);
                });

                const res = await parallelUploads3.done();

                resolve(res)
            } catch (e) {
                console.log(e);
                reject(e)
            }
        })
    }

    createPresignedUrlWithClient = ({
        bucket,
        key,
    }: {
        bucket: string;
        key: string;
    }) => {
        const client = new S3Client({
            region: "ap-southeast-1",
            credentials: {
                accessKeyId: process.env.DO_SPACES_ACCESS_KEY!,
                secretAccessKey: process.env.DO_SPACES_SECRET_KEY!,
            },
            endpoint: process.env.CDN_ENDPOINT,
            forcePathStyle: false,
        });
        const command = new PutObjectCommand({ Bucket: bucket, Key: key });
        return getSignedUrl(client, command, { expiresIn: 3600 });
    };

}

export function httpRequestPut(url: string, data: any) {
    return new Promise((resolve, reject) => {
        const req = http.request(
            url,
            {
                method: "PUT",
                headers: { "Content-Length": new Blob([data]).size },
            },
            (res) => {
                let responseBody = "";
                res.on("data", (chunk) => {
                    responseBody += chunk;
                });
                res.on("end", () => {
                    resolve(responseBody);
                });
            }
        );
        req.on("error", (err) => {
            reject(err);
        });
        req.write(data);
        req.end();
    });
}