import { mapValues } from 'lodash'
import { setIn } from './utils'
const initialState = {}

const ACTION_PREFIX = 'accessor'
const ACTION_NAME_SET = 'set'
const actionTypeCreator = (reducerName, actionTypeName) => {
  return `${reducerName}.${ACTION_PREFIX}/${actionTypeName}`
}

function bindActionCreators(name, object = {}) {
  return mapValues(object, fn => {
    return (...rest) => fn(name, ...rest)
  })
}
/**
 *
 * @param {String} name 用来区分reducer
 * @param {String} field 用来区分是哪个域
 * @param {String} value
 */
function setActionCreator(name, field, value) {
  return {
    type: actionTypeCreator(name, ACTION_NAME_SET),
    payload: {
      value
    },
    meta: {
      field
    }
  }
}

export const set = setActionCreator

export default function createBundle(name) {
  if (!name) {
    throw new Error('must provide a name')
  }
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypeCreator(name, ACTION_NAME_SET):
        return setIn(state, `${action.meta.field}`, action.payload.value)
      default:
        return state
    }
  }

  const actions = bindActionCreators(name, {
    set: setActionCreator
  })

  return {
    reducer,
    actions
  }
}
