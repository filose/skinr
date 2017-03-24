const buildElemsObj = (target, hasTitle) => {
  const $elems = document.querySelectorAll(target);
  return [].reduce.call($elems, (obj, elem) => {
    const elemOptions = hasTitle ?
      [].filter.call(elem.options, option => option.index !== 0)
      : elem.options;
    obj[elem.id] = {
      id: elem.id,
      title: elem.options[0].text,
      options: [].map.call(elemOptions, (option) => {
        return {
          index: hasTitle ? option.index - 1 : option.index,
          text: option.text,
          value: option.value,
          highlighted: false,
          selected: false,
        };
      }),
      open: false,
    };
    return obj;
  }, {});
};

export default buildElemsObj;
