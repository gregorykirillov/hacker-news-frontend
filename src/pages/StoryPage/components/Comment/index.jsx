import React, {useEffect, useMemo, useState} from 'react';
import {observer} from 'mobx-react-lite';

import {convertToDate} from '@/utils/convertDate';
import {Button} from '@/uikit';

import styles from './styles.module.scss';
import {CommentStore} from './localStore';
import {Preloader} from './Preloader';

export const Comment = observer(({commentId}) => {
    const [isExpanded, setExpanded] = useState(false);

    const commentStore = useMemo(() => new CommentStore(), []);
    useEffect(() => {commentStore.fetchComment(commentId);}, [commentId]);

    const handleClick = () => setExpanded(true);

    if (!commentStore.isFinished && commentStore.isLoading) return (
        <Preloader />
    );

    if (commentStore.error) return (
        <p>Loading error</p>
    );

    const {id, by, text, time, deleted} = commentStore.comment;

    if (deleted) return null;

    return (
        <div style={{paddingLeft: '10px'}}>
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

                {!isExpanded && commentStore.comment.kids?.length && (
                    <Button
                        onClick={handleClick}
                        className={styles.button}
                        size='sm'
                    >
                        Загрузить комментарии
                    </Button>
                )}
                
                <hr
                    size='1'
                    color='lightgray'
                />

                {isExpanded && <div>
                    {commentStore.comment.kids.map(id => <Comment key={id} commentId={id} />)}
                </div>}
            </div>
        </div>
    );
});
