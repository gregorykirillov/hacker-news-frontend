import React from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

const Button = ({size = 'md', ...props}) => 
    <button
        className={cn(
            styles.button,
            styles[size]
        )}
        {...props}
    />;

export default Button;
