import type { CompleteMultipartUploadCommandOutput } from "@aws-sdk/client-s3";
import { fileTypeFromBuffer } from "file-type";
import { createHash } from "node:crypto";
import { getCdnSettings } from "./cdn-settings";
import { FileUploader, type IUploadTaskFile } from "./file-uploader";
import { convertWebp } from "./image-compressor";

class CDNManager {

    private cdnSettings() {
        const settings = getCdnSettings()
        return settings
    }

    async deleteObject(keys: string[]): Promise<void> {

        const uploader = new FileUploader()

        const promises: Promise<CompleteMultipartUploadCommandOutput>[] = []

        await uploader.deleteObjectFromS3({
            keys: keys
        })
    }

    async uploadFile(file: File, mediaKey: string): Promise<string> {

        const uploader = new FileUploader()

        const document: IUploadTaskFile = {
            name: file.name,
            type: file.type,
            size: file.size,
            blob: file
        }

        const arrBuf = await document.blob.arrayBuffer()
        const fileMime = await fileTypeFromBuffer(arrBuf)
        const fileHash = createHash('sha256').update(Buffer.from(arrBuf)).digest('hex');

        await uploader.uploadToS3({
            file: new Uint8Array(arrBuf),
            fileName: mediaKey,
            publicACL: true,
            contentType: fileMime?.mime ?? document.type
        })

        const settings = this.cdnSettings()

        const fullPath = `${settings.cdnUrl}/${settings.mediaBucketName}/${mediaKey}`

        return fullPath
    }

    async uploadImage(file: File, mediaKey: string): Promise<string> {

        const uploader = new FileUploader()

        const arrBuf = await file.arrayBuffer()

        const compressedArr = await convertWebp({
            buffer: new Uint8Array(arrBuf),
            quality: 85,
        })

        await uploader.uploadToS3({
            file: compressedArr,
            fileName: mediaKey,
            publicACL: true,
        })

        const settings = this.cdnSettings()

        const fullPath = `${settings.cdnUrl}/${settings.mediaBucketName}/${mediaKey}`

        return fullPath
    }
}

export { CDNManager }