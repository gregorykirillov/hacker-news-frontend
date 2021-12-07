import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {observer} from 'mobx-react-lite';

import {StoriesListPage} from '@/pages';
import {StoryPage} from './pages';
import Header from './components/Header';

const App = observer(() => {
    return (
        <div className="App">
            
            <Header />

            <div className="container">                
                <Routes>
                    <Route exact path="/" element={<StoriesListPage />}/>
                    <Route exact path="/story/:storyId" element={<StoryPage />}/>
                </Routes>
            </div>
        </div>
    );
});

export default App;
