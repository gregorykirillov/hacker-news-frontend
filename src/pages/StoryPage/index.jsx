import React, {useMemo, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';

import {Button} from '@/uikit';
import {CommentsBlock, StoryBlock} from './components';
import {Story} from './localStore';
import {observer} from 'mobx-react-lite';

const StoryPage = observer(() => {
    const storyId = +useParams().storyId;
    const storyStore = useMemo(() => new Story(), []);

    useEffect(() => {storyStore.fetchStory(storyId);}, [storyId]);

    if (storyStore.isLoading || !storyStore.isFinished) return 'loading...';
    if (storyStore.error) return 'failed to load';

    return (
        <>
            <Link to='/' tabIndex={-1}>
                <Button>
                    Назад
                </Button>
            </Link>

            <StoryBlock storyId={storyId} />
            <CommentsBlock storyId={storyId} />
        </>
    );
});

export default StoryPage;
