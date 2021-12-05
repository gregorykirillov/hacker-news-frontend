import React from 'react';
import {observer} from 'mobx-react-lite';
import {Routes, Route} from 'react-router-dom';

import {StoryList, StoryItem} from './components';

const App = observer(() => {
    return (
        <div className="App">
            <Routes>
                <Route exact path="/" element={<StoryList />}/>
                <Route exact path="story/:storyId" element={<StoryItem />}/>
            </Routes>
        </div>
    );
});

export default App;
