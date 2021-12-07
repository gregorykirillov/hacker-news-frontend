import {makeAutoObservable, toJS} from 'mobx';

import {request} from '@/utils/request';
import {getNewStoriesIdUrl} from '@/utils/routes';
import {ADD_ITEMS_COUNT} from '@/utils/constants';

const filterNewIds = (storiesIds, json) => {
    return json.filter(el => storiesIds.indexOf(el) < 0);
};

class StoriesIds {
    constructor() {
        this.storiesIds = [];
        this.newStoriesIds = [];
        this.oldCount = 0;
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

    setOldCount(count) {
        this.oldCount = count;
    }

    async fetchStoriesIds(isRefresh = false) {
        const res = await request(getNewStoriesIdUrl());

        if (res.ok) {
            const newIds = filterNewIds(this.storiesIds, res.data)?.slice(isRefresh ? 0 : this.oldCount, this.count);

            if (newIds.length) {
                this.setNewStoriesIds(newIds);
                this.setStoriesIds(res.data);

                if (isRefresh) {
                    this.setOldCount(this.count);
                    this.setCount(this.count + newIds.length);
                }
            }
        }
    }
}
export default new StoriesIds();
