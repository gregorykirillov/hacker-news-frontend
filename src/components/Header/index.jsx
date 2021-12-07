import React from 'react';
import {Link} from 'react-router-dom';

import cn from 'classnames';
import styles from './styles.module.scss';

function Header() {
    return (
        <header className={styles.header}>
            <div className={cn('container', styles.header__section)}>
                <h2 className={styles.logo}>Hacker News</h2>

                <nav className={cn('container', styles.navbar)}>
                    <ul>
                        <Link className={styles.navbar__item} to='/'>Главная</Link>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
