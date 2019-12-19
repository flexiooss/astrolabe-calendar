import '../generated/io/package'
import {deepKeyAssigner} from '@flexio-oss/js-generator-helpers'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {FlexDate} from '@flexio-oss/flex-types'

/**
 * @property {FlexDate}  FlexDate
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.astrolabe_calendar.types.DateExtended', FlexDate)
