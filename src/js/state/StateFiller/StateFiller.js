import {StoreDateList} from '../StoreDateList'
import {StateBuilder} from '../State'
import {DateArray} from '@flexio-oss/flex-types'
import {StateType} from '../StateType'
import {isNull, isUndefined} from '@flexio-oss/assert'
import {DateExtended} from '@flexio-oss/extended-flex-types'

export class StateFiller {
  /**
   *
   * @param {ComponentContext} componentContext
   * @param {PublicStoreHandler<DateList>} storePeriods
   */
  constructor(componentContext, storePeriods) {
    this.__componentContext = componentContext
    let storeContainer = StoreDateList.create(this.__componentContext)
    this.__store = storeContainer.store()
    this.__storePublic = storeContainer.storePublic()
    this.__name = StateType.FILLER
    this.__storePeriods = storePeriods

    this.__listen()
  }

  __listen() {
    this.__storePeriods.listenChanged(
      /**
       *
       * @param {StoreState<DateList>} payload
       */
      (payload) => {
        let futureDateList = new DateArray()
        let dates = payload.data().dates().sort()
        for (let i = 0; i < dates.length; i = i + 2) {
          if (!isUndefined(dates[i]) && !isUndefined(dates[i + 1])) {
            let currentDate = DateExtended.fromFlexDate(dates[i])
            let dateEnd = DateExtended.fromFlexDate(dates[i + 1])
            currentDate.setDate(currentDate.getDate() + 1)
            while (currentDate < dateEnd) {
              futureDateList.push(currentDate.toLocaleFlexDate())
              currentDate.setDate(currentDate.getDate() + 1)
            }
          }
        }

        this.__store.set(
          this.__store.state().data()
            .withDates(futureDateList)
        )
      }
    )
  }

  build() {
    return new StateBuilder()
      .store(this.__storePublic)
      .name(this.__name)
      .build()
  }
}