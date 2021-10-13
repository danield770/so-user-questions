import styles from './Header.module.css';

const Header = ({ text }) => <h1 className={styles['main-header']}>{text}</h1>;

export default Header;
