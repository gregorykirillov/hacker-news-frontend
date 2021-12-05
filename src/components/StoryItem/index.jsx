import React from 'react';
import {useParams} from 'react-router';

function StoryItem() {
    const storyId = useParams().storyId;

    return (
        <div>
            <p>{storyId}</p>
            
        </div>
    );
}

export default StoryItem;
