import {makeAutoObservable} from 'mobx';
import stories from '@/store/stories';
import {fetchInfo} from '@/utils/fetchInfo';

export class Story {
    constructor() {
        this.error = null;
        this.isLoading = true;
        this.isFinished = false;

        makeAutoObservable(this);
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

    async fetchStory(id) {
        this.setLoading(true);
        const res = await fetchInfo(id);

        if (!res.ok) {
            this.setError(res.error);
        } else {
            stories.addStories([res.data]);
        }

        this.setLoading(false);
        this.setFinished(true);
    }
}
