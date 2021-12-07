import {makeAutoObservable, toJS} from 'mobx';

import {fetchInfo} from '@/utils/fetchInfo';
import storiesIds from './storiesIds';

const filterNewStories = (stories, json) => {
    const stIds = stories.map(el => el.id);
    
    return json.filter(el => !stIds.includes(el.id));
};

class Stories {
    constructor() {
        this.stories = [];
        this.error = null;
        this.isLoading = true;
        this.isFinished = false;
        
        makeAutoObservable(this);
    }

    addStories(stories) {
        this.stories.push(...filterNewStories(this.get(), stories));
    }

    setStories(stories) {
        this.stories = stories;
    }
    
    setLoading(loading) {
        this.isLoading = loading;
    }

    setFinished(finished) {
        this.isFinished = finished;
    }

    setError(error) {
        this.error = error;
    }

    sortStories() {
        return this.stories.sort((a, b) => b.time - a.time);
    }

    get() {
        return this.stories;
    }

    getStory(id) {
        return this.stories.find(s => s.id === id);
    }

    async fetchStories() {
        this.setLoading(true);

        const getStoriesRes = await Promise.all(storiesIds.newStoriesIds.length
            ? storiesIds.newStoriesIds.map(id => {storiesIds.setNewStoriesIds([]); return fetchInfo(id);})
            : storiesIds.storiesIds.slice(storiesIds.oldCount, storiesIds.count).map(id => fetchInfo(id))
        );

        const filtered = getStoriesRes.map(res => {
            if (!res.ok) {
                this.error = res.error;
            } else {
                return res.data;
            }
        });

        filtered && this.addStories(filtered);

        this.setLoading(false);
        this.setFinished(true);
    }
}
export default new Stories();
