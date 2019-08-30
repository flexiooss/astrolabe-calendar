import {ViewContainer} from '@flexio-oss/hotballoon'
import {ViewCalendar} from './views/ViewCalendar'

export class ViewContainerCalendar extends ViewContainer {
  /**
   *
   * @param {ViewContainerParameters} viewContainerParameters
   * @param {CalendarStoreManager} calendarStoreManager
   * @param {CalendarActionManager} calendarActionManager
   * @param {ComponentAstrolabePublic} dateGenerator
   */
  constructor(viewContainerParameters, calendarStoreManager, calendarActionManager, dateGenerator) {
    super(viewContainerParameters)
    this.__stores = calendarStoreManager
    this.__actions = calendarActionManager
    this.__dateGenerator = dateGenerator
    this.__calendar = this.addView(new ViewCalendar(this, this.__stores, this.__actions, this.__dateGenerator))
  }
}
