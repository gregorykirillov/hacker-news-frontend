import React, {useEffect} from 'react';
import stories from '@/store/stories';
import {useScroll} from '@/utils/useScroll';
import storiesIds from '@/store/storiesIds';
import {observer} from 'mobx-react-lite';
import {Link} from 'react-router-dom';
import {getStoryUrl} from '@/utils/routes';
import {ADD_ITEMS_COUNT, MAX_ITEMS_COUNT} from '@/utils/constants';

const convertToDate = time => new Date(time * 1000).toLocaleString();

const callback = () => {
    storiesIds.count + ADD_ITEMS_COUNT > MAX_ITEMS_COUNT
        ? storiesIds.count < MAX_ITEMS_COUNT && (storiesIds.setOldCount(storiesIds.count), storiesIds.setCount(MAX_ITEMS_COUNT))
        : (storiesIds.setOldCount(storiesIds.count), storiesIds.setCount(storiesIds.count + ADD_ITEMS_COUNT));
};

const StoryList = observer(() => {
    useEffect(() => {
        setInterval(() => storiesIds.fetchStoriesIds(true), 60000);
        
        return storiesIds.fetchStoriesIds();
    }, []);
    useEffect(() => stories.fetchStories(), [storiesIds.newStoriesIds, storiesIds.count]);
    useScroll(callback);
    
    if (!stories.get().length) return <p>Loading...</p>;

    const onRefreshButton = () => {
        
        storiesIds.fetchStoriesIds(true);
    };

    return (
        <div>
            <button
                onClick={onRefreshButton}
            >
            Загрузить свежие новости
            </button>
            {stories.get().filter(el => el).map(({id, by, title, score, time}) =>
                <div key={id} className='card--item' style={{border: '1px solid', width: '300px'}}>
                    <Link to={getStoryUrl(id)}>{title}</Link>
                    <p>Рейтинг: {score}</p>
                    <p>ID: {id}</p>
                    <p>Ник автора: {by}</p>
                    <p>Дата публикации: {convertToDate(time)}</p>
                </div>
            )}
        </div>
    );
});

export default StoryList;
