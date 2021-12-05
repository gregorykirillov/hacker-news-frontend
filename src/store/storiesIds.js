import {request} from '@/utils/request';
import {getNewStoriesIdUrl} from '@/utils/routes';
import {makeAutoObservable} from 'mobx';
import {ADD_ITEMS_COUNT} from '@/utils/constants';
import {unstable_batchedUpdates} from 'react-dom';

const filterNewIds = (storiesIds, json) => json.filter(el => storiesIds.indexOf(el) < 0);

class StoriesIds {
    constructor() {
        this.storiesIds = [];
        this.newStoriesIds = [];
        this.count = ADD_ITEMS_COUNT;
        this.oldCount = 0;
        
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
                unstable_batchedUpdates(() => {
                    this.setNewStoriesIds(newIds);
                    this.setStoriesIds(res.data);
                    if (isRefresh) {
                        this.setOldCount(this.count);
                        this.setCount(this.count + newIds.length);
                    }
                });
            }
        }
    }
}
export default new StoriesIds();
