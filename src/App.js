import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {useScroll} from '@/utils/useScroll';
import store from '@/store/store';

const convertToDate = time => {
    return new Date(time * 1000).toLocaleString();
};

const App = observer(() => {
    const {count} = useScroll();

    useEffect(() => store.fetchStories(), []);

    return (
        <div className="App">
            <h1>Hello, MobX</h1>
            <button
                onClick={() => store.fetchStories()}
            >
                Загрузить свежие новости
            </button>
            {store.stories.slice(0, count).map(({id, by, title, score, time}) =>
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

export default App;
