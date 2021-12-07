import React from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

const Button = ({size = 'md', className, ...props}) => 
    <button
        className={cn(
            className,
            styles.button,
            styles[size]
        )}
        {...props}
    />;

export default Button;
