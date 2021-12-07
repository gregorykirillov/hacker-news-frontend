import {stories} from '@/store';
import {story} from '@/store';

const getStoryItem = async (storyId) => {
    const res = await stories.fetchStory(storyId);
    
    return res;
};

const filterStory = storyId => {
    const filtered = stories.get().filter(st => st.id == storyId)?.[0];
    if (filtered) return filtered;
    
    return;
};

export const loadStory = storyId => {
    if (!stories.get().filter(st => st.id == storyId)?.[0]) {
        getStoryItem(storyId);

        return;
    }
    const filtered = filterStory(storyId);
    filtered && story.setStory([filtered]);
};
