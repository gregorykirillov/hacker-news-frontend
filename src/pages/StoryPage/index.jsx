import React from 'react';
import {Link} from 'react-router-dom';

import {Button} from '@/uikit';
import {CommentsBlock, StoryBlock} from './components';

const StoryPage = () => {
    return (
        <>
            <Link to='/' tabIndex={-1}>
                <Button>
                    Назад
                </Button>
            </Link>
            <StoryBlock />
            <CommentsBlock />
            
        </>
    );
};

export default StoryPage;
