import React from 'react';
import SsknrOption from './SsknrOption';
import style from '../../styles/components/_ssknr.scss';

class Ssknr extends React.Component {
  componentDidMount() {
    const $elem = document.querySelector(`.js-ssknr[data-id="${this.props.id}"]`);
    this.props.getElemWidth(this.props.id, $elem.clientWidth);
  }
  componentWillReceiveProps(nextProps) {
    // Check if currentElem has changed
    if (nextProps.elems[nextProps.id] !== this.props.elems[this.props.id]) {
      const previousSelectedOption = this.props.elems[this.props.id].options
        .find(o => o.selected) || {};
      const nextSelectedOption = nextProps.elems[nextProps.id].options
        .find(o => o.selected) || {};
      // Check if selected option has changed
      if (previousSelectedOption.index !== nextSelectedOption.index) {
        const { elems, id } = nextProps;
        const selectInput = document.getElementById(id);
        // Clear options
        selectInput.options.length = 0;
        // Add new option
        const option = document.createElement('option');
        option.value = nextSelectedOption.value;
        option.text = nextSelectedOption.text;
        selectInput.add(option);
      }
    }
  }
  render() {
    const { elems, id, closeSsknr, openSsknr } = this.props;
    const currentElem = elems[id];
    function handleToggle(e) {
      e.preventDefault();
      if (elems[id].open) {
        closeSsknr(id);
      } else {
        openSsknr(id);
      }
    }
    const ssknrContentOpen = currentElem.open ? ` ${style.ssknrContentOpen}` : '';
    const selectedOption = currentElem.options.find(o => o.selected);
    const title = selectedOption ? selectedOption.text : currentElem.title;
    return (
      <dl
        className={`c-ssknr js-ssknr ${style.ssknr}`}
        style={{ width: `${currentElem.width}px` }}
        data-id={id}
        onClick={handleToggle}
        tabIndex="0"
      >
        <dt className="c-ssknr__title">{title}</dt>
        <dd className={`c-ssknr__content ${style.ssknrContent}${ssknrContentOpen}`}>
          <ul className={`c-ssknr__options ${style.ssknrOptions}`}>
            {currentElem.options.map((option, i) => {
              return (
                <SsknrOption
                  key={`item-${option.index}`}
                  option={option}
                  rootId={id}
                  {...this.props}
                />
              );
            })}
          </ul>
        </dd>
      </dl>
    );
  }
}

export default Ssknr;
