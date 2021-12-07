import {makeAutoObservable, toJS} from 'mobx';
import {unstable_batchedUpdates} from 'react-dom';

import {fetchInfo} from '@/utils/fetchInfo';
import storiesIds from './storiesIds';
import story from './story';

const filterNewStories = (stories, json) => {
    const stIds = stories.map(el => el.id);
    
    return json.filter(el => !stIds.includes(el.id));
};

class Stories {
    constructor() {
        this.stories = [];
        
        makeAutoObservable(this);
    }

    addStories(stories) {
        this.stories.push(...filterNewStories(this.get(), stories));
    }

    setStories(stories) {
        this.stories = stories;
    }

    sortStories() {
        return this.stories.sort((a, b) => b.time - a.time);
    }

    get() {
        return toJS(this.stories);
    }

    async fetchStory(storyId) {
        const fetchStory = await fetchInfo(storyId);
        if (fetchStory) {
            story.setStory([fetchStory]);
            this.addStories([fetchStory]);
        }
        else {
            story.setError('Ошибка при загрузке статьи');
        }
    }

    async fetchStories() {
        const fetchedStories = await Promise.all(toJS(storiesIds.newStoriesIds.length)
            ? storiesIds.newStoriesIds.map(id => fetchInfo(id))
            : storiesIds.storiesIds.slice(storiesIds.oldCount, storiesIds.count).map(id => fetchInfo(id))
        );

        if (fetchedStories?.length) {
            unstable_batchedUpdates(() => {
                this.addStories(fetchedStories);
                this.sortStories();
                storiesIds.newStoriesIds.length = 0;
            });
            return;
        }
        return;
    }
}
export default new Stories();
