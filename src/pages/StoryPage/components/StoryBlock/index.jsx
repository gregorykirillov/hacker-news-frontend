import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {useParams} from 'react-router';

import {convertToDate} from '@/utils/convertDate';
import {story} from '@/store';
import {loadStory} from './loadStory';

import styles from './styles.module.scss';

const COMMENT_WORD_SET = ['комментарий', 'комментария', 'комментариев'];

const StoryBlock = observer(() => {
    const storyId = useParams().storyId;

    useEffect(() => loadStory(storyId), []);

    const declinationWord = (
        number,
        txt,
        cases = [2, 0, 1, 1, 1, 2]
    ) => txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];

    if (story.error) return (
        <p>{story.error}</p>
    );

    if (!story.get()?.length) return (
        <p>Loading...</p>
    );

    return (
        <div>
            {story.get().map(({id, by, title, url, time, descendants}) => (
                <div 
                    key={id + 1}
                    className={styles.card}
                >
                    <div className={styles.info}>
                        <span>{by}</span>
                        <span>{convertToDate(time)}</span>
                    </div>
                    <h2
                        className={styles.title}
                    >
                        {title}
                    </h2>
                    <a
                        target='_blank' 
                        rel="noreferrer" 
                        href={url || '/'}
                    >
                        Перейти к статье
                    </a>
                    <p>{descendants} {declinationWord(descendants, COMMENT_WORD_SET)}</p>
                </div>
            ))}
            
        </div>
    );
});

export default StoryBlock;
