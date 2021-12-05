import {useEffect} from 'react';
import {debounce} from './debounce';

export const useScroll = callback => {
    
    const handleScroll = debounce(() => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
            return false;
        }
        
        callback();
    }, 500);
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
};
