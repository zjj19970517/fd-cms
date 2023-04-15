import { MenuLocales } from './menu.locale';
import { SettingsLocales } from './settings.locale';
import { MessageLocales } from './message.locale';
import { NavBarLocales } from './navbar.locale';

const i18n = {
  'en-US': {
    ...MenuLocales['en-US'],
    ...SettingsLocales['en-US'],
    ...MessageLocales['en-US'],
    ...NavBarLocales['en-US'],
  },
  'zh-CN': {
    ...MenuLocales['zh-CN'],
    ...SettingsLocales['zh-CN'],
    ...MessageLocales['zh-CN'],
    ...NavBarLocales['zh-CN'],
  },
};

export default i18n;
