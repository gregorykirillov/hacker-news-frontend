import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {observer} from 'mobx-react-lite';

import {stories} from '@/store';
import {useScroll} from '@/utils/useScroll';
import {storiesIds} from '@/store';
import {getStoryUrl} from '@/utils/routes';
import {ADD_ITEMS_COUNT, MAX_ITEMS_COUNT} from '@/utils/constants';
import {convertToDate} from '@/utils/convertDate';
import {Button} from '@/uikit';

import styles from './styles.module.scss';

const callback = () => {
    storiesIds.count + ADD_ITEMS_COUNT > MAX_ITEMS_COUNT
        ? storiesIds.count < MAX_ITEMS_COUNT && (storiesIds.setOldCount(storiesIds.count), storiesIds.setCount(MAX_ITEMS_COUNT))
        : (storiesIds.setOldCount(storiesIds.count), storiesIds.setCount(storiesIds.count + ADD_ITEMS_COUNT));
};

const StoriesListPage = observer(() => {
    useEffect(() => {
        setInterval(() => storiesIds.fetchStoriesIds(true), 60000);
        storiesIds.fetchStoriesIds();
    }, []);
    useEffect(() => stories.fetchStories(), [storiesIds.newStoriesIds, storiesIds.count]);
    
    useScroll(callback);
    
    if (!stories.get().length) return <p>Loading...</p>;

    const onRefreshButton = () => {
        storiesIds.fetchStoriesIds(true);
    };

    return (
        <div>
            <Button
                onClick={onRefreshButton}
            >
                Загрузить свежие новости
            </Button>
            {stories.get().map(({id, by, title, score, time}) =>
                <Link key={id} to={getStoryUrl(id)} className={styles.row}>
                    <div className={styles.card}>
                        <p>{title}</p>
                        <div className={styles.cardInfo}>
                            <span>Рейтинг: {score}</span>
                            <span>Автор: {by}</span>
                            <div>
                                <span>{convertToDate(time)}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            )}
        </div>
    );
});

export default StoriesListPage;
