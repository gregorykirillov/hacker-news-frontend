import {makeAutoObservable, toJS} from 'mobx';
import {fetchInfo} from '@/utils/fetchInfo';

const filterNewComments = (stories, json) => {
    const stIds = stories.map(el => el.id);
    
    return json.filter(el => !stIds.includes(el.id));
};

class Story {
    constructor() {
        this.story = [];
        this.comments = [];
        this.error = null;

        makeAutoObservable(this);
    }

    setStory(story) {
        this.story = story;
    }

    addComment(comment) {
        this.comments.push(...filterNewComments(this.getComments(), [comment]));
    }

    setComments(comments) {
        this.comments = comments;
    }

    getComments() {
        return toJS(this.comments);
    }

    setError(error) {
        this.error = error;
    }

    get() {
        return toJS(this.story);
    }
    
    async fetchComment(id) {
        const comment = await fetchInfo(id);
        this.addComment(comment);
    }
    
}

export default new Story();
