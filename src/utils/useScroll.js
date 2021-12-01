import {useState, useEffect} from 'react';
import {MAX_ITEMS_COUNT, ADD_ITEMS_COUNT} from './constants';

export const useScroll = () => {
    const [scrolledToBottom, setScrolledToBottom] = useState(false);
    const [count, setCount] = useState(ADD_ITEMS_COUNT);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || scrolledToBottom) {
            return false;
        }

        setScrolledToBottom(true);
    };

    useEffect(() => {
        if (!scrolledToBottom) return;

        count + ADD_ITEMS_COUNT >= MAX_ITEMS_COUNT
            ? setCount(MAX_ITEMS_COUNT)
            : setCount(count + ADD_ITEMS_COUNT);

        setScrolledToBottom(false);
    }, [scrolledToBottom]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return {count};
};
