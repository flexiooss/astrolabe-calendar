import '../../../import'
import {TypeCheck, ViewContainerParameters} from '@flexio-oss/hotballoon'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {StoreDatePickedMaker} from '../stores/StoreDatePickedMaker'
import {ComponentAstrolabeBuilder} from '@flexio-oss/astrolabe'
import {DaysEnum} from '@flexio-oss/astrolabe/src/js/types/DaysEnum'
import {assert} from '@flexio-oss/assert'
import {ActionInitCalendarMaker} from '../actions/ActionInitCalendarMaker'
import {StoreSelectedMonthMaker} from '../stores/StoreSelectedMonthMaker'
import {ActionPreviousMonthMaker} from '../actions/ActionPreviousMonthMaker'
import {ActionNextMonthMaker} from '../actions/ActionNextMonthMaker'
import {ActionUpdatePickedDateMaker} from '../actions/ActionUpdatePickedDateMaker'
import {ViewContainerCalendar} from '../view/ViewContainerCalendar'
import {CalendarActionManager} from '../view/utils/CalendarActionManager'
import {CalendarStoreManager} from '../view/utils/CalendarStoreManager'

const InitCalendarBuilder = globalFlexioImport.io.flexio.astrolabe_calendar.actions.InitCalendarBuilder

export class ComponentCalendar {
  /**
   *
   * @param {ComponentContext} componentContext
   */
  constructor(componentContext) {
    assert(TypeCheck.isComponentContext(componentContext),
      'ComponentAstrolabe:constructor: `componentContext` argument should be ComponentContext'
    )
    this.__componentContext = componentContext

    this.__actionInitCalendar = ActionInitCalendarMaker.create(this.__componentContext.dispatcher())
    this.__actionPrevisousMonth = ActionPreviousMonthMaker.create(this.__componentContext.dispatcher())
    this.__actionUpdatePickedDate = ActionUpdatePickedDateMaker.create(this.__componentContext.dispatcher())
    this.__actionNextMonth = ActionNextMonthMaker.create(this.__componentContext.dispatcher())

    this.__storeDatePiked = StoreDatePickedMaker.create(this.__componentContext)
    this.__storeSelectedMonth = StoreSelectedMonthMaker.create(this.__componentContext)
    this.__dateGenerator = ComponentAstrolabeBuilder.build(this.__componentContext.APP(), DaysEnum.MON)

    this.__actionInitCalendar.listen(this.__storeDatePiked.store(), this.__storeSelectedMonth.store(), this.__dateGenerator)
    this.__actionNextMonth.listen(this.__storeSelectedMonth.store(), this.__dateGenerator)
    this.__actionPrevisousMonth.listen(this.__storeSelectedMonth.store(), this.__dateGenerator)
    this.__actionUpdatePickedDate.listen(this.__storeDatePiked.store(), this.__storeSelectedMonth.store(), this.__dateGenerator)

    this.__actionInitCalendar.action().dispatch(
      new InitCalendarBuilder().build()
    )
  }

  mountView(parentNode) {
    console.log(this.__storeSelectedMonth.storePublic())
    this.__viewContainer = new ViewContainerCalendar(
      new ViewContainerParameters(
        this.__componentContext,
        this.__componentContext.nextID(),
        parentNode
      ),
      new CalendarStoreManager(this.__storeDatePiked.storePublic(), this.__storeSelectedMonth.storePublic()),
      new CalendarActionManager(this.__actionNextMonth.action(), this.__actionPrevisousMonth.action(), this.__actionUpdatePickedDate.action()),
      this.__dateGenerator
    )
    this.__componentContext.addViewContainer(this.__viewContainer)
    this.__viewContainer.renderAndMount()
  }
}
