import React from "react"
const videoPreview = (props) => {
    return (<pre>{"here is how" + JSON.stringify(props)}</pre>
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
