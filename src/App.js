import React from 'react';
import {observer} from 'mobx-react-lite';
import {StoryItem} from './components';
import storiesIds from './store/storiesIds';

const App = observer(() => {
    return (
        <div className="App">
            <button
                onClick={() => {
                    storiesIds.fetchStoriesIds();
                }}
            >
                Загрузить свежие новости
            </button>
            <StoryItem />
        </div>
    );
});

export default App;
