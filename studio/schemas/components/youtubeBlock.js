import React from 'react'
import getYoutubeId from 'get-youtube-id'
const youtubePreview = (props) => {
    const yId = getYoutubeId(props.value.url);
    // console.log('get youtube id', yId)

    return (
        <iframe width="560" height="315" src={"https://www.youtube.com/embed/" + yId} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>)
}
export default {
    name: 'youtube',
    type: 'object',
    title: 'Youtube',
    fields: [
        {
            name: 'url',
            type: 'url',
            title: 'URL'
        }
    ],
    preview: { select: { url: 'url' }, component: youtubePreview }

}