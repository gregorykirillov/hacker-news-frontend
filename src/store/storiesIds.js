import {ADD_ITEMS_COUNT} from '@/utils/constants';
import {request} from '@/utils/request';
import {getNewStoriesUrl} from '@/utils/routes';
import {makeAutoObservable, toJS} from 'mobx';

const getNewIds = (storiesIds, json) => json.filter(el => storiesIds.indexOf(el) < 0);

class StoriesIds {
    constructor() {
        this.storiesIds = [];
        this.newStoriesIds = [];
        this.count = ADD_ITEMS_COUNT;
        
        makeAutoObservable(this);
    }

    setStoriesIds(ids) {
        this.storiesIds = ids;
    }

    setNewStoriesIds(ids) {
        this.newStoriesIds = ids;
    }

    setCount(count) {
        this.count = count;
    }

    getAll() {
        return toJS(this.storiesIds);
    }

    getNew() {
        return toJS(this.newStoriesIds);
    }

    async fetchStoriesIds() {
        const res = await request(getNewStoriesUrl());

        if (res.ok) {
            res.data.length = this.count;

            this.setNewStoriesIds(getNewIds(this.getAll(), res.data));
            this.setStoriesIds(res.data);
        }
    }
}
export default new StoriesIds();
