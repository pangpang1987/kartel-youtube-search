import { connect as reduxConnect } from 'react-redux';
import { bindActionCreators } from 'redux';

const fnToString = (fn) => Function.prototype.toString.call(fn);
const isPlainObject = (obj) => {
  if (!obj || typeof obj !== 'object') {
    return false;
  };

  const proto = typeof obj.constructor === 'function'
    ? Object.getPrototypeOf(obj)
    : Object.prototype;

  if (proto === null) {
    return true;
  };

  const constructor = proto.constructor;

  return typeof constructor === 'function' &&
    constructor instanceof constructor &&
    fnToString(constructor) === fnToString(Object);
};

const defaultMapStateToProps = state => ({});
const defaultMapDispatchToProps = dispatch => ({ dispatch });

const wrapActionCreators = actionCreators =>
  dispatch => bindActionCreators(actionCreators, dispatch);

export default function connect(mapStateToProps, mapDispatchToProps, ...otherParams) {
  const finalMapStateToProps = mapStateToProps || defaultMapStateToProps;
  const finalMapDispatchToProps = isPlainObject(mapDispatchToProps)
    ? wrapActionCreators(mapDispatchToProps)
    : mapDispatchToProps || defaultMapDispatchToProps;

  return reduxConnect(finalMapStateToProps, finalMapDispatchToProps,
      ...otherParams);
}
