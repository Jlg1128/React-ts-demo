import React, { useState, useEffect, useRef } from 'react';
import './fade.scss';
/**
 * 检查元素是否进入可视区域
 * @param el
 */
const checkInClient = (el: any) => {
  if (!el) return false;
  const { clientHeight } = document.documentElement;
  const contentTop = el.getBoundingClientRect().top;
  const contentHeight = el.offsetHeight;
  return (contentTop < clientHeight && contentTop >= 0) || (contentTop < 0 && (contentTop + contentHeight > 0));
};

interface Props {
  type?: string, // 'up','down','left','right', etc...
  children: any;
  className?: string;
  style?: object;
  operation: string;
}
const Fade: React.FC<Props> = (props: Props) => {
  const [visible, setVisible] = useState(false);
  const fadeRef = useRef();
  const { type, className, style, children, operation } = props;

  useEffect(() => {
    setTimeout(() => {
      checkInPage();
      window.addEventListener('scroll', checkInPage);
    });
    return () => {
      window.removeEventListener('scroll', checkInPage);
    };
  }, [checkInPage]);

  const checkInPage = () => {
    const isVisible = checkInClient(fadeRef.current);

    if (operation) {
      const vd = document.getElementById(operation);
      vd.oncontextmenu = function () {
        return false;
      };

      try {
        if (isVisible) {
          if (vd.paused) vd.play();
        } else if (!vd.paused) vd.pause();
      } catch (e) {
        console.log('video e', e);
      }
    }

    setVisible(isVisible);
  };
  return (
    <div
      ref={fadeRef}
      className={`fadeWrapper ${type || 'up'}  ${className || ''} ${visible ? 'fade-move' : ''}`}
      style={style || {}}
    >
      {children}
    </div>
  );
};

export default Fade;
