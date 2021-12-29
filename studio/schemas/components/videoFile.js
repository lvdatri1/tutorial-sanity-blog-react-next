import React from "react"
import { getFile } from '@sanity/asset-utils'
import config from '../../sanity.json'
const videoPreview = (props) => {
    const tempFile = getFile(props.value.fileName.asset._ref, {
        ...config.api
    });

    return (<video width={600} height={400} src={tempFile.asset.url} autoPlay controls></video>
        // <video controls>
        //     <source src={props.value.url} type="video/mp4" />
        // </video>
    )
}
export default {
    name: 'videoFile',
    type: 'object',
    title: 'My Video File',
    fields: [
        {
            name: 'description',
            type: 'string',
            title: 'Description'
        },
        {
            name: 'fileName',
            type: 'file',
            title: 'video file name'
        },
    ],

    preview: { select: { fileName: 'fileName' }, component: videoPreview }
}
