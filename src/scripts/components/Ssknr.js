import React from 'react';
import SsknrOption from './SsknrOption';
import style from '../../styles/components/_ssknr.scss';

const Ssknr = (props) => {
  const { elems, id } = props;
  const currentElem = elems[id];
  function handleToggle(e) {
    e.preventDefault();
    const { closeSsknr, openSsknr } = props;
    if (elems[id].isOpen) {
      closeSsknr(id);
    } else {
      openSsknr(id);
    }
  }
  const ssknrContentOpen = currentElem.isOpen ? ` ${style.ssknrContentOpen}` : '';
  return (
    <dl className={style.ssknr} onClick={handleToggle}>
      <dt>{currentElem.title}</dt>
      <dd className={`${style.ssknrContent}${ssknrContentOpen}`}>
        <ul className={style.ssknrOptions}>
          {currentElem.options.map((option, i) => {
            return (
              <SsknrOption
                key={`item-${option.index}`}
                option={option}
                rootId={id}
                {...props}
              />
            );
          })}
        </ul>
      </dd>
    </dl>
  );
};

export default Ssknr;