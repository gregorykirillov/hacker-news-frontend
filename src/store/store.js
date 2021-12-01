import {MAX_ITEMS_COUNT} from '@/utils/constants';
import {getNewStoriesUrl, getStoryInfoUrl} from '@/utils/routes';
import {action, makeAutoObservable, toJS} from 'mobx';

const getNewIds = (storiesIds, json) => json.filter(el => storiesIds.indexOf(el) < 0);

const delay = ms => {
    return new Promise(resolve => setTimeout(resolve(), ms));
};

class Stories {
    constructor() {
        this.storiesIds = [];
        this.newStoriesIds = [];
        this.stories = [];
        
        makeAutoObservable(this);
    }

    fetchStoriesIds() {
        return fetch(getNewStoriesUrl())
            .then(res => res.json())
            .then(action((json) => {
                json.sort((a, b) => b - a);
                json.length = MAX_ITEMS_COUNT;

                this.newStoriesIds = getNewIds(toJS(this.storiesIds), json);
                this.storiesIds = json;
            }));
    }

    fetchStoryInfo(id) {
        fetch(getStoryInfoUrl(id))
            .then(res => res.json())
            .then(action((json) =>
                json !== null 
                    ? (
                        this.stories.push(json) &&
                        this.stories.sort((a, b) => b.time - a.time)
                    )
                    : delay(1000).then(() => this.fetchStoryInfo(id))
            ));
    }

    fetchStories() {
        this.fetchStoriesIds()
            .then(() => 
                this.newStoriesIds.forEach(id => this.fetchStoryInfo(id))
            );
    }
}
export default new Stories();
