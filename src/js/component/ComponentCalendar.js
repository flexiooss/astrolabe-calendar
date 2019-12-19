import '../../import'
import {TypeCheck} from '@flexio-oss/hotballoon'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {StoreDatePicked} from '../stores/StoreDatePicked'
import {AstrolabeBuilder} from '@flexio-oss/astrolabe'
import {assert} from '@flexio-oss/assert'
import {ActionInitCalendar} from '../actions/ActionInitCalendar'
import {StoreSelectedMonth} from '../stores/StoreSelectedMonth'
import {ActionPreviousMonth} from '../actions/ActionPreviousMonth'
import {ActionNextMonth} from '../actions/ActionNextMonth'
import {ActionUpdatePickedDate} from '../actions/ActionUpdatePickedDate'
import {ActionContainerCalendar} from '../view/utils/ActionContainerCalendar'
import {StoreContainerCalendar} from '../view/utils/StoreContainerCalendar'
import {ViewMounterConfig} from './ViewMounter/ViewMounterConfig'

const InitCalendarBuilder = globalFlexioImport.io.flexio.astrolabe_calendar.actions.InitCalendarBuilder

export class ComponentCalendar {
  /**
   *
   * @param {ComponentContext} componentContext
   * @param {ViewMounter} viewMounter
   * @param {ThemeStyle} styles
   * @param {Element} parentNode
   * @param {DaysEnum} firstDay
   */
  constructor(componentContext, viewMounter, styles, parentNode, firstDay) {
    assert(TypeCheck.isComponentContext(componentContext),
      'ComponentAstrolabe:constructor: `componentContext` argument should be ComponentContext'
    )
    this.__componentContext = componentContext
    this.__viewMounter = viewMounter
    this.__styles = styles
    this.__parentNode = parentNode
    this.__firstDay = firstDay

    this.__actionInitCalendar = ActionInitCalendar.create(this.__componentContext.dispatcher())
    this.__actionPrevisousMonth = ActionPreviousMonth.create(this.__componentContext.dispatcher())
    this.__actionUpdatePickedDate = ActionUpdatePickedDate.create(this.__componentContext.dispatcher())
    this.__actionNextMonth = ActionNextMonth.create(this.__componentContext.dispatcher())

    this.__storeDatePiked = StoreDatePicked.create(this.__componentContext)
    this.__storeSelectedMonth = StoreSelectedMonth.create(this.__componentContext)
    
    this.__dateGenerator = new AstrolabeBuilder().application(this.__componentContext.APP()).firstDay(this.__firstDay).build()

    this.__actionInitCalendar.listen(this.__componentContext, this.__storeDatePiked.store(), this.__storeSelectedMonth.store(), this.__dateGenerator)
    this.__actionNextMonth.listen(this.__componentContext, this.__storeSelectedMonth.store(), this.__dateGenerator)
    this.__actionPrevisousMonth.listen(this.__componentContext, this.__storeSelectedMonth.store(), this.__dateGenerator)
    this.__actionUpdatePickedDate.listen(this.__componentContext, this.__storeDatePiked.store(), this.__storeSelectedMonth.store(), this.__dateGenerator)

    this.__actionInitCalendar.action().dispatch(
      new InitCalendarBuilder().build()
    )

    this.__mountView()
  }

  __mountView() {
    this.__viewContainer = this.__viewMounter.buildView(
      new ViewMounterConfig()
        .componentContext(this.__componentContext)
        .storesContainer(new StoreContainerCalendar(this.__storeDatePiked.storePublic(), this.__storeSelectedMonth.storePublic()))
        .actionsContainer(new ActionContainerCalendar(
          this.__actionNextMonth.action(),
          this.__actionPrevisousMonth.action(),
          this.__actionUpdatePickedDate.action()
        ))
        .dateGenerator(this.__dateGenerator)
        .firstDay(this.__firstDay)
        .parentNode(this.__parentNode)
        .styles(this.__styles)
    ).viewContainer()
  }

  /**
   *
   * @param {FlexDate} date
   */
  setDate(date) {
    this.__actionUpdatePickedDate.action().dispatch(
      this.__actionUpdatePickedDate.action().payloadBuilder().date(date).build()
    )
  }

  /**
   *
   * @returns {FlexDate}
   */
  getDate() {
    return this.__storeDatePiked.storePublic().data().date()
  }
}
