import React from 'react';
import {Link} from 'react-router-dom';

import cn from 'classnames';
import styles from './styles.module.scss';

function Header() {
    return (
        <header className={styles.header}>
            <div className={cn('container', styles.header__section)}>
                <h2 className={styles.logo}>Hacker News</h2>

                <nav className={styles.nav}>
                    <ul className={styles.navlist}>
                        <li className={styles.navlist__item}>
                            <Link className={styles.link} to='/'>Главная</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
