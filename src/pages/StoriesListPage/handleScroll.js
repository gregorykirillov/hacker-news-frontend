import {storiesIds} from '@/store';
import {ADD_ITEMS_COUNT, MAX_ITEMS_COUNT} from '@/utils/constants';

export const handleScroll = () => {
    storiesIds.count + ADD_ITEMS_COUNT > MAX_ITEMS_COUNT
        ? storiesIds.count < MAX_ITEMS_COUNT && (storiesIds.setOldCount(storiesIds.count), storiesIds.setCount(MAX_ITEMS_COUNT))
        : (storiesIds.setOldCount(storiesIds.count), storiesIds.setCount(storiesIds.count + ADD_ITEMS_COUNT));
};
