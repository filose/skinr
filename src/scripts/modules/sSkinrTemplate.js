import style from '../../styles/components/_ssknr.scss';

const template = (hasTitle, elem) => {
  const optionHtml = Array.prototype.map.call(elem.options, (option, i) => {
    return `
      <li class="c-ssknr__option js-ssknr-option" data-value="${option.value}" data-index="${option.index}">${option.text}</li>
    `;
  }).join('');
  return `
    <dl class="${style.ssknr} c-ssknr js-ssknr" data-id="${elem.id}">
      <dt class="c-ssknr__title js-ssknr-title">${elem.title}</dt>
      <dd class="${style.ssknr__content} c-ssknr__content">
        <ul class="${style.ssknr__options} c-ssknr__options">
          ${optionHtml}
        </ul>
      </dd>
    </dl>
  `;
};

export default template;
