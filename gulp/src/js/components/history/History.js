import { createHistory, useBasename } from 'history';
import Profile from '../../../../Profile'

var history = useBasename(createHistory)({
    basename: '/' + (Profile.basePath ? Profile.basePath : '')
});

export default history;