import {SERVER_URL} from './settings';

export const getNewStoriesIdUrl = () => `${SERVER_URL}/topstories.json?print=pretty`;
export const getStoryInfoUrl = id => `${SERVER_URL}/item/${id}.json`;
export const getStoryUrl = id => `/story/${id}`;
