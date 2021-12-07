import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';

import {convertToDate} from '@/utils/convertDate';
import {loadComments} from './loadComments';
import {Button} from '@/uikit';
import {story} from '@/store';

import styles from './styles.module.scss';

const StoryBlock = observer(() => {
    useEffect(() => loadComments(), [story.get().length && story.get()[0]?.id]);

    if (story.error) return (
        <p>{story.error}</p>
    );

    if (!story.get()?.length) return (
        <p>Loading comments...</p>
    );

    return (
        <div>
            <h3>Комментарии</h3>
            {story.getComments().map(({id, by, text, time}) => {
                return (
                    <div
                        id={id}
                        key={id}
                        className={styles.commentBlock}
                    >
                        <div className={styles.authorInfo}>
                            <b className={styles.authorName}>{by} </b>
                            <data>{convertToDate(time)}</data>
                        </div>
                        <div 
                            className={styles.commentText}
                            dangerouslySetInnerHTML={{__html: text}} 
                        />
                        <Button
                            size='sm'
                        >
                            Загрузить комментарии
                        </Button>
                    </div>
                );
            })}
        </div>
    );
});

export default StoryBlock;
