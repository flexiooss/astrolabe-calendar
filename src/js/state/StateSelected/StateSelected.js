import {StoreDateList} from '../StoreDateList'
import {StateBuilder} from '../State'
import {DateArray} from '@flexio-oss/flex-types'
import {StateType} from '../StateType'
import {isNull} from '@flexio-oss/assert'

export class StateSelected {
  /**
   *
   * @param {ComponentContext} componentContext
   */
  constructor(componentContext) {
    this.__componentContext = componentContext
    let storeContainer = StoreDateList.create(this.__componentContext)
    this.__store = storeContainer.store()
    this.__storePublic = storeContainer.storePublic()
    this.__name = StateType.SELECTED
  }

  /**
   *
   * @param {ActionDispatcher<PickedDate, PickedDateBuilder>} action
   * @return {State}
   */
  withSelectionRadio(action) {
    action.listenWithCallback(
      /**
       *
       * @param {UpdatePickedDate} payload
       */
      (payload) => {
        let futureDateList = new DateArray()
        futureDateList.push(payload.date())
        this.__store.set(
          this.__store.state().data()
            .withDates(futureDateList)
        )
      },
      this.__componentContext
    )
    return this.__build()
  }

  /**
   *
   * @param {ActionDispatcher<PickedDate, PickedDateBuilder>} action
   * @param {int?} length
   * @return {State}
   */
  withSelectionToggle(action, length = 0) {
    action.listenWithCallback(
      /**
       *
       * @param {PickedDate} payload
       */
      (payload) => {
        let futureStore = new DateArray()

        if (isNull(this.__store.state().data().dates())) {
          futureStore.push(payload.date())
        } else {
          this.__store.state().data().dates().forEach((element) => {
            if (element !== payload.date()) {
              futureStore.push(element)
            }
          })
          if (this.__store.state().data().dates().length === futureStore.length) {
            futureStore = this.__store.state().data().dates()
            futureStore.push(payload.date())
          }
        }

        if (length === 0 || futureStore.length <= length) {
          this.__store.set(
            this.__store.state().data()
              .withDates(futureStore)
          )
        }

      },
      this.__componentContext
    )
    return this.__build()
  }

  __build() {
    return new StateBuilder()
      .store(this.__storePublic)
      .name(this.__name)
      .build()
  }
}