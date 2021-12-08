import React from 'react';
import {observer} from 'mobx-react-lite';

import {inclineWord} from '@/utils/inclideWord';
import stories from '@/store/stories';

import {Comment} from '../Comment';

const COMMENT_WORD_SET = ['комментарий', 'комментария', 'комментариев'];

const CommentsBlock = observer(({storyId}) => {
    const story = stories.getStory(storyId);

    if (!story.kids) return null;

    return (
        <div>
            <h3>Комментарии</h3>
            <p>{story.descendants} {inclineWord(story.descendants, COMMENT_WORD_SET)}</p>
            {story.kids.map(id => <Comment key={id} commentId={id} />)}
        </div>
    );
});

export default CommentsBlock;
