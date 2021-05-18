let Title = {
  show: true,
  text: '',
  left: 'center'
};

/**
 *
 * @param EchartsTitle
 * @returns {{left: string, show: boolean, text: *}}
 */
export default function echartsTitle(EchartsTitle) {
  Title.text = EchartsTitle;
  return Title
}
