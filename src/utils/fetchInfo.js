import {getStoryInfoUrl} from './routes';
import {request} from './request';

export const fetchInfo = async(id) => request(getStoryInfoUrl(id));
