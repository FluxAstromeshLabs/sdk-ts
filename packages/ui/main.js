// plugins/global-components.js
import { defineNuxtPlugin } from '#app'
import BaseButton from './components/Button/index.vue'
import BaseTextField from './components/TextField/index.vue'
import BaseTooltip from './components/Tooltip/index.vue'
import BaseChip from './components/Chip/index.vue'
import BaseSnackbar from './components/Snackbar/index.vue'
import BaseTabs from './components/Tabs/index.vue'
import BaseModal from './components/Modal/index.vue'
import BaseCheckbox from './components/Checkbox/index.vue'
import BaseSelect from './components/Select/index.vue'
import BaseWindow from './components/Window/index.vue'
import BaseWindowItem from './components/Window/Item.vue'
import BaseSkeleton from './components/Skeleton/index.vue'
import BaseIcons from './components/Icons/index.vue'
import BaseDropdown from './components/Dropdown/index.vue'
import BaseTextArea from './components/TextArea/index.vue'
import BaseDatePicker from './components/DatePicker/index.vue'
import BaseBadge from './components/Badge/index.vue'
import BaseDropUpload from './components/DropUpload/index.vue'
import BaseAvatar from './components/Avatar/index.vue'
import BasePagination from './components/Pagination/index.vue'
import BaseProgressLinear from './components/ProgressLinear.vue'
import BaseSwitch from './components/Switch/index.vue'
import BaseProgressCircular from './components/ProgressCircular.vue'
import Autocomplete from './components/Autocomplete/index.vue'
import JsonViewer from './components/JsonViewer/index.vue'
// New Card Components
import BaseCard from './components/Card/index.vue'
import BaseCardHeader from './components/Card/Header.vue'
import BaseCardContent from './components/Card/Content.vue'
import BaseCardTitle from './components/Card/Title.vue'
import BaseCardFooter from './components/Card/Footer.vue'
import BaseProgress from './components/Progress/index.vue'
// RewardsHub Components
import RewardsHubUserRankCard from '../../../components/RewardsHub/UserRankCard.vue'
import RewardsHubStatsOverview from '../../../components/RewardsHub/StatsOverview.vue'
import RewardsHubMissionCard from '../../../components/RewardsHub/MissionCard.vue'
import RewardsHubDailyCheckinMission from '../../../components/RewardsHub/DailyCheckinMission.vue'
import RewardsHubCheckinModal from '../../../components/RewardsHub/CheckinModal.vue'
import RewardsHubRankTiers from '../../../components/RewardsHub/RankTiers.vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('BaseButton', BaseButton)
  nuxtApp.vueApp.component('BaseTextField', BaseTextField)
  nuxtApp.vueApp.component('BaseTooltip', BaseTooltip)
  nuxtApp.vueApp.component('BaseChip', BaseChip)
  nuxtApp.vueApp.component('BaseSnackbar', BaseSnackbar)
  nuxtApp.vueApp.component('BaseTabs', BaseTabs)
  nuxtApp.vueApp.component('BaseModal', BaseModal)
  nuxtApp.vueApp.component('BaseCheckbox', BaseCheckbox)
  nuxtApp.vueApp.component('BaseSelect', BaseSelect)
  nuxtApp.vueApp.component('BaseWindow', BaseWindow)
  nuxtApp.vueApp.component('BaseWindowItem', BaseWindowItem)
  nuxtApp.vueApp.component('BaseSkeleton', BaseSkeleton)
  nuxtApp.vueApp.component('BaseIcons', BaseIcons)
  nuxtApp.vueApp.component('BaseDropdown', BaseDropdown)
  nuxtApp.vueApp.component('BaseTextArea', BaseTextArea)
  nuxtApp.vueApp.component('BaseDatePicker', BaseDatePicker)
  nuxtApp.vueApp.component('BaseProgressLinear', BaseProgressLinear)
  nuxtApp.vueApp.component('BaseProgressCircular', BaseProgressCircular)
  nuxtApp.vueApp.component('BaseBadge', BaseBadge)
  nuxtApp.vueApp.component('BaseDropUpload', BaseDropUpload)
  nuxtApp.vueApp.component('BaseAvatar', BaseAvatar)
  nuxtApp.vueApp.component('BasePagination', BasePagination)
  nuxtApp.vueApp.component('BaseSwitch', BaseSwitch)
  nuxtApp.vueApp.component('BaseAutocomplete', Autocomplete)
  nuxtApp.vueApp.component('BaseJsonViewer', JsonViewer)
  // Register new components
  nuxtApp.vueApp.component('BaseCard', BaseCard)
  nuxtApp.vueApp.component('BaseCardHeader', BaseCardHeader)
  nuxtApp.vueApp.component('BaseCardContent', BaseCardContent)
  nuxtApp.vueApp.component('BaseCardTitle', BaseCardTitle)
  nuxtApp.vueApp.component('BaseCardFooter', BaseCardFooter)
  nuxtApp.vueApp.component('BaseProgress', BaseProgress)
  // RewardsHub Components
  nuxtApp.vueApp.component('RewardsHubUserRankCard', RewardsHubUserRankCard)
  nuxtApp.vueApp.component('RewardsHubStatsOverview', RewardsHubStatsOverview)
  nuxtApp.vueApp.component('RewardsHubMissionCard', RewardsHubMissionCard)
  nuxtApp.vueApp.component('RewardsHubDailyCheckinMission', RewardsHubDailyCheckinMission)
  nuxtApp.vueApp.component('RewardsHubCheckinModal', RewardsHubCheckinModal)
  nuxtApp.vueApp.component('RewardsHubRankTiers', RewardsHubRankTiers)
})
