import style from '../../styles/components/_ssknr.scss';

const template = (hasTitle, elem) => {
  const optionHtml = Array.prototype.map.call(elem.options, (option, i) => {
    if (hasTitle && i === 0) {
      return null;
    }
    return `
      <li class="c-ssknr__option" data-value="${option.value}">${option.text}</li>
    `;
  }).join('');
  return `
    <dl class="${style.ssknr} c-ssknr js-ssknr" data-id="${elem.id}">
      <dt class="c-ssknr__title">${elem.options[0].text}</dt>
      <dd class="${style.ssknr__content} c-ssknr__content">
        <ul class="${style.ssknr__options} c-ssknr__options">
          ${optionHtml}
        </ul>
      </dd>
    </dl>
  `;
};

export default template;
