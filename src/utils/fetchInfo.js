import {MAX_REQUEST_COUNT} from './constants';
import {getStoryInfoUrl} from './routes';
import {request} from './request';
import {delay} from './delay';

export const fetchInfo = async(id, tryNum = 0) => {
    const res = await request(getStoryInfoUrl(id));

    if (res.ok) {
        if (res.data !== null) res.data;
        
        if (tryNum++ >= MAX_REQUEST_COUNT) return;

        await delay(1000).then(() => fetchInfo(id, tryNum));

        return null;
    }
};
