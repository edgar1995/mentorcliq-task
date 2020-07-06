import { ISelectorVariables, rootSelector } from '../store/rootSelector';

export function stateSelector(selectorVariables: ISelectorVariables): any {
  return state => selectorVariables === true ?
    getAllProps(rootSelector, state) :
    getProps(selectorVariables, rootSelector, state);
}

export function getProps(variables: any, selectors: any, state: any): any {
  const keys: string[] = Object.keys(variables);
  let props: any = {};

  for (let i: number = 0; i < keys.length; i++) {
    const key: string = keys[i];

    const variable: any = variables[key];
    const selector: any = selectors[key];

    if (typeof variable === 'object' && variable.constructor === Object) {
      const tempProps: any = getProps(variable, selector, state);
      props = { ...props, ...tempProps };
      continue;
    }

    if (variable === true) {
      if (typeof selector === 'function') {
        props[key] = selector(state);
      } else if (typeof selector === 'object' && selector.constructor === Object) {
        if (selector.main) {
          const tempProps: any = selector.main(state);
          props = { ...props, ...tempProps };
        } else {
          const tempProps: any = getAllProps(selector, state);
          props = { ...props, ...tempProps };
        }
      }
    }
  }

  return props;
}

export function getAllProps(selectors: any, state: any): any {
  const keys: string[] = Object.keys(selectors);
  let props: any = {};

  for (let i: number = 0; i < keys.length; i++) {
    const key: string = keys[i];
    const selector: any = selectors[key];

    if (typeof selector === 'function') {
      props[key] = selector(state);
    } else if (typeof selector === 'object' && selector.constructor === Object) {
      if (selector.main) {
        const tempProps: any = selector.main(state);
        props = { ...props, ...tempProps };
      } else {
        props[key] = getAllProps(selector, state);
      }
    }
  }

  return props;
}
