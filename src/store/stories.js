import {MAX_REQUEST_COUNT} from '@/utils/constants';
import {request} from '@/utils/request';
import {getStoryInfoUrl} from '@/utils/routes';
import {makeAutoObservable, toJS} from 'mobx';
import {unstable_batchedUpdates} from 'react-dom';
import storiesIds from './storiesIds';

const delay = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const filterNewStories = (stories, json) => json.filter(el => {
    return stories.indexOf(el) < 0;
});

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

    async fetchStoryInfo(id, tryNum=0) {
        const res = await request(getStoryInfoUrl(id));

        if (res.ok) {
            if (res.data !== null) return res.data;
            
            if (tryNum++ == MAX_REQUEST_COUNT) return null;
                
            delay(1000).then(() => this.fetchStoryInfo(id, tryNum));
        }
    }

    async fetchStories() {
        const fetchedStories = await Promise.all(toJS(storiesIds.newStoriesIds.length)
            ? storiesIds.newStoriesIds.map(id => this.fetchStoryInfo(id))
            : storiesIds.storiesIds.slice(storiesIds.oldCount, storiesIds.count).map(id => this.fetchStoryInfo(id)));


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
