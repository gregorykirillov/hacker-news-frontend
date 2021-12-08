import React from 'react';
import {observer} from 'mobx-react-lite';

import {convertToDate} from '@/utils/convertDate';

import styles from './styles.module.scss';
import {stories} from '@/store';

const StoryBlock = observer(({storyId}) => {
    const story = stories.getStory(storyId);

    const {id, by, title, url, time} = story;

    return (
        <div>
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
            </div>
        </div>
    );
});

export default StoryBlock;
