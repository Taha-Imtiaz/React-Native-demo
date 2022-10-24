import React, {useEffect} from 'react';
import SettingsComponent from '../../components/SettingsComponent';

const Settings = () => {
  const [email, setEmail] = useState(null);
  const settingsOptions = [
    {title: 'My Info', subTitle: 'Setup your profile', onPress: () => {}},
    {title: 'Accounts', subTitle: null, onPress: () => {}},
    {
      title: 'Default account for new contacts',
      // subTitle: email,
      onPress: () => {},
    },
    {title: 'Contacts to display', subTitle: 'All contacts', onPress: () => {}},
    {title: 'Sort by', subTitle: 'First name', onPress: () => {}},
    {title: 'Name format', subTitle: 'First name first', onPress: () => {}},

    {title: 'Import', subTitle: null, onPress: () => {}},
    {title: 'Export', subTitle: null, onPress: () => {}},
    {title: 'Blocked numbers', subTitle: null, onPress: () => {}},
    {title: 'About RNContacts', subTitle: null, onPress: () => {}},
  ];
  useEffect(() => {}, []);
  return <SettingsComponent settingsOptions={settingsOptions} />;
};

export default Settings;
