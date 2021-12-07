import React from 'react';
import {observer} from 'mobx-react-lite';

import stories from '@/store/stories';

import {Comment} from '../Comment';

const CommentsBlock = observer(({storyId}) => {
    const story = stories.getStory(storyId);

    if (!story.kids) return null;

    return (
        <div>
            <h3>Комментарии</h3>
            {story.kids.map(id => <Comment key={id} commentId={id} />)}
        </div>
    );
});

export default CommentsBlock;
