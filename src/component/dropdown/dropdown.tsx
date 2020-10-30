import React, { PureComponent, ReactNode } from 'react';
import styles from './styles.scss';
import { withTheme } from '/imports/ui/stylesheets/theme';
import cx from 'classnames';

interface ListItem {
  key: string;
  content: ReactNode | string,
  onClick: any;
  disabled?: boolean;
  className?: string;
}

/**
 * 传入一个trigger节点，及dropdown的list
 * */
interface OwnProps {
  trigger: ReactNode;
  list: ListItem[];
  position: 'bottom' | 'top' | 'left' | 'right' | 'bottom_left' | 'bottom_right';
  theme: ThemeModel.ThemeTypings;
  className?: string;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  onShow?: () => void;
  onHide?: () => void;
}

type Props = OwnProps;

type State = Readonly<{
  show: boolean;
  clientX: number,
  clientY: number,
}>;

class Dropdown extends PureComponent<Props, State> {
  readonly state: State = {
    show: false,
    clientX: 0,
    clientY: 0,
  };

  toggleDropdown = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    console.log(e.clientX, e.clientY)
    const { onHide, onShow } = this.props;
    const { show } = this.state;
    if (show && onHide) {
      onHide();
    }

    if (!show && onShow) {
      onShow();
    }
    this.setState(state => ({
      show: !state.show,
      clientY,
      clientX
    }))
  }

  onItemClick = (item: ListItem) => {
    const { onClick } = item;
    if (onClick) {
      onClick(item)
    }
    this.hide();
  }

  hide = () => {
    const { onHide } = this.props;
    this.setState({ show: false });
    if (onHide) {
      onHide();
    }
  }

  renderItem(item: ListItem) {
    const { theme } = this.props;
    const { key, content, disabled, className = '' } = item;
    console.log('???', className)
    const itemStyle = {
      [styles.listItem]: true,
      [styles.disabled]: !!disabled,
      [styles[theme.THEME_TYPE]]: true,
      [className]: true
    };

    return (
      <div key={key} className={cx(itemStyle)} onClick={() => {this.onItemClick(item)}}>
        {typeof content === 'string' ? (<span className={styles.label}>{content}</span>) : content}
      </div>
    )
  }

  render() {
    const { list, trigger, position, className, top = 0, left = 0, right = 0, bottom } = this.props;
    const { show, clientY, clientX } = this.state;
    return (
      <div className={styles.dropdownWrapper}>
        <div
          className={styles.trigger}
          // @ts-ignored
          onClick={this.toggleDropdown}>
          {trigger}
        </div>
        {show && (
          <div className={cx(styles.list, styles[position], className)} style={{ top: (clientY + top), left: (clientX + left), right, bottom  }}>
            <div className={styles.cursor}/>
            {list.map(item => this.renderItem(item))}
          </div>
        )}
        {show && (<div className={styles.overlay} onClick={this.hide}/>)}
      </div>
    );
  }
}

export default withTheme(Dropdown);
