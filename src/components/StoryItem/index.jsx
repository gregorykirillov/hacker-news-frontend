import React, {useEffect} from 'react';
import stories from '@/store/stories';
import {useScroll} from '@/utils/useScroll';
import storiesIds from '@/store/storiesIds';
import {observer} from 'mobx-react-lite';

const convertToDate = time => new Date(time * 1000).toLocaleString();

const StoryItem = observer(() => {
    const {count} = useScroll();
    
    useEffect(() => storiesIds.fetchStoriesIds(), [count]);
    useEffect(() => stories.fetchStories(), [storiesIds.getNew()[0]]);
    
    if (!stories.get().length) return <p>Loading...</p>;

    return (
        <div>
            {stories.get()?.slice(0, count).map(({id, by, title, score, time}) =>
                <div key={id} className='card--item' style={{border: '1px solid', width: '300px'}}>
                    <p>Название: {title}</p>
                    <p>Рейтинг: {score}</p>
                    <p>Ник автора: {by}</p>
                    <p>Дата публикации: {convertToDate(time)}</p>
                </div>
            )}
        </div>
    );
});

export default StoryItem;
