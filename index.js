/**
 * @format
 */

import {AppRegistry} from 'react-native';
import ReduxProvider from './ReduxProvider';
import {name as appName} from './app.json';
import './src/utils/i18n';

AppRegistry.registerComponent(appName, () => ReduxProvider);
