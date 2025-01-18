import cn from 'classnames';

import styles from './styles.module.scss';

export default function Loader() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.bg} />
      <div className={styles.loader}>
        <svg
          className='svgContainer'
          height='100'
          width='100'
          viewBox='0 0 100 100'
        >
          <circle
            className={cn(styles.loaderSvg, styles.bg)}
            cx='50'
            cy='50'
            r='45'
          ></circle>
          <circle
            className={cn(styles.loaderSvg, styles.animate)}
            cx='50'
            cy='50'
            r='45'
          ></circle>
        </svg>
      </div>
    </div>
  );
}
