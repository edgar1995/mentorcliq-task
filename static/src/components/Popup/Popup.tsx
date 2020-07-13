import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import styles from './popUp.css';

const domBody = document.body;

interface IPopupProps {
  children: any;
  handleDismiss?: () => void;
  dismissOnEsc?: boolean;
  className?: string;
  hasOverlay?: boolean;
}

export function Popup({
  children,
  handleDismiss = null,
  dismissOnEsc = false,
  className = '',
  hasOverlay = false,
  ...props
}: IPopupProps) {
  const [domBodyOverflow, setDomBodyOverflow] = React.useState(null);

  const popUpClasses = classNames({
    [className]: !!className,
    [styles.popUp]: true,
  });

  function onDismiss() {
    if (typeof handleDismiss === 'function') {
      handleDismiss();
    }
  }

  function handleEscape(event) {
    if (event.key === 'Escape') {
      onDismiss();
    }
  }

  React.useEffect(() => {
    setDomBodyOverflow(domBody.style.overflow);

    if (hasOverlay) {
      domBody.style.overflow = 'hidden';
    }

    if (dismissOnEsc) {
      document.addEventListener('keyup', handleEscape);
    }

    return () => {
      domBody.style.overflow = domBodyOverflow || '';

      if (dismissOnEsc) {
        document.removeEventListener('keyup', handleEscape);
      }
    };
  }, []);

  const renderChild = (
    <div
      className={popUpClasses}
      {...props}
    >
      <div className={styles.wrapper}>
        <span
          className={styles.closeIcon}
          role='presentation'
          onClick={onDismiss}
        >
          X
        </span>
        {children}
      </div>
      {hasOverlay && (
        <div
          className={styles.overlay}
          onClick={onDismiss}
          role='presentation'
        />
      )}
    </div>
  );

  return ReactDOM.createPortal(
    renderChild,
    domBody,
  );
}
