import {request} from '@/utils/request';
import {getStoryInfoUrl} from '@/utils/routes';
import {makeAutoObservable, toJS} from 'mobx';
import storiesIds from './storiesIds';

const delay = ms => {
    return new Promise(resolve => setTimeout(resolve(), ms));
};

class Stories {
    constructor() {
        this.stories = [];
        
        makeAutoObservable(this);
    }

    addStory(story) {
        this.stories.push(story);
    }

    sortStories() {
        this.stories = this.stories.sort((a, b) => b.time - a.time);
    }

    get() {
        return toJS(this.stories);
    }

    async fetchStoryInfo(id) {
        const res = await request(getStoryInfoUrl(id));
        if (res.ok) {
            res.data !== null
                ? (
                    this.addStory(res.data),
                    this.sortStories()
                ) : delay(1000).then(() => this.fetchStoryInfo(id));
        }
    }

    fetchStories() {
        storiesIds.getNew()?.forEach(id => this.fetchStoryInfo(id));
    }
}
export default new Stories();
