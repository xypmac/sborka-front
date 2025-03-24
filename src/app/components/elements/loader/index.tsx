import cn from 'classnames';

import styles from './styles.module.scss';

export default function Loader({
  borderRadius = 10,
}: {
  borderRadius?: number;
}) {
  return (
    <div className={styles.content}>
      <div
        className={styles.bg}
        style={{ borderRadius: `${borderRadius}px` }}
      />
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
