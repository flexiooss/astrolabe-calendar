import {ViewContainer} from '@flexio-oss/hotballoon'
import {ViewCalendar} from './views/ViewCalendar'

export class ViewContainerCalendar extends ViewContainer {
  /**
   *
   * @param {ViewContainerParameters} viewContainerParameters
   * @param {StoreContainerCalendar} calendarStoreManager
   * @param {ActionContainerCalendar} calendarActionManager
   * @param {ComponentAstrolabePublic} dateGenerator
   * @param {DaysEnum} firstDay
   * @param {ThemeStyle} styles
   */
  constructor(viewContainerParameters, calendarStoreManager, calendarActionManager, dateGenerator, firstDay, styles) {
    super(viewContainerParameters)
    this.__stores = calendarStoreManager
    this.__actions = calendarActionManager
    this.__dateGenerator = dateGenerator
    this.__calendar = this.addView(new ViewCalendar(this, this.__stores, this.__dateGenerator, firstDay, styles))
    
    this.__handleEvents()
  }

  /**
   *
   * @private
   */
  __handleEvents() {
    this.__calendar.on()
      .nextMonth((payload) => {
        this.__actions.actionNextMonth().dispatch(
          this.__actions.actionNextMonth().payloadBuilder().build()
        )
      })
    this.__calendar.on()
      .previousMonth((payload) => {
        this.__actions.actionPreviousMonth().dispatch(
          this.__actions.actionPreviousMonth().payloadBuilder().build()
        )
      })
    this.__calendar.on()
      .updateDatePicked((payload) => {
        this.__actions.actionUpdatePickedDate().dispatch(
          this.__actions.actionUpdatePickedDate().payloadBuilder().date(payload.date).build()
        )
      })
  }
}
