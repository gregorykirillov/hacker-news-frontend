import {story} from '@/store';

export const loadComments = () => {
    if (!story.comments.length && story.get().length) {
        story.get()[0].kids?.forEach(id => {
            story.fetchComment(id);
        });
    }
};
