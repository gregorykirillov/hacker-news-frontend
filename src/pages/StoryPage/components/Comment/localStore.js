import {makeAutoObservable} from 'mobx';
import {fetchInfo} from '@/utils/fetchInfo';

export class CommentStore {
    constructor() {
        this.error = null;
        this.comment = null;
        this.isLoading = true;
        this.isFinished = false;

        makeAutoObservable(this);
    }

    setComment(comment) {
        this.comment = comment;
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

    async fetchComment(id) {
        this.setLoading(true);
        const res = await fetchInfo(id);

        if (!res.ok) {
            this.error = res.error;
        } else {
            this.setComment(res.data);
        }

        this.setFinished(true);
        this.setLoading(false);
    }
}
