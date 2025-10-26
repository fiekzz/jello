
const CdnSettings = {
    cdnUrl: process.env.CDN_URL,
    mediaBucketName: process.env.CDN_MEDIA_BUCKET_NAME,
    cdnEndpoint: process.env.CDN_ENDPOINT,
}

interface ICdnSettings {
    cdnUrl: string;
    mediaBucketName: string;
    cdnEndpoint: string;
}

export function getCdnSettings(): ICdnSettings {

    if (!CdnSettings.cdnUrl || !CdnSettings.mediaBucketName || !CdnSettings.cdnEndpoint) {
        throw new Error('CDN settings are not properly configured.');
    }

    console.log('CDN Settings:', CdnSettings);

    return {
        cdnUrl: CdnSettings.cdnUrl,
        mediaBucketName: CdnSettings.mediaBucketName,
        cdnEndpoint: CdnSettings.cdnEndpoint
    }

}