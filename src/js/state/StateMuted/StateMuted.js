import {StoreDateList} from '../StoreDateList'
import {StateType} from '../StateType'

export class StateMuted {
  /**
   *
   * @param {ComponentContext} componentContext
   */
  constructor(componentContext) {
    this.__componentContext = componentContext
    let storeContainer = StoreDateList.create(this.__componentContext)
    this.__storePublic = storeContainer.storePublic()
    this.__name = StateType.MUTED
  }

  build() {
    throw new Error('Not implemented yet')
  }
}