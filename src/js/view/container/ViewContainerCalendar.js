import {ViewContainer} from '@flexio-oss/hotballoon'
import {ViewCalendar} from './views/ViewCalendar'

export class ViewContainerCalendar extends ViewContainer {
  /**
   *
   * @param {ViewContainerParameters} viewContainerParameters
   * @param {ContainerStore} containerStores
   * @param {ContainerAction} containerActions
   * @param {ComponentAstrolabePublic} dateGenerator
   */
  constructor(viewContainerParameters, containerStores, containerActions, dateGenerator) {
    super(viewContainerParameters)
    this.__stores = containerStores
    this.__actions = containerActions
    this.__dateGenerator = dateGenerator
    this.__calendar = null
    this.__registerViews()
  }

  /**
   * @override
   */
  __registerViews() {
    this.__calendar = this.addView(
      new ViewCalendar(
        this,
        this.__stores,
        this.__actions,
        this.__dateGenerator
      )
    )
  }
}
