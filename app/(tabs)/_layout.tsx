import { Stack } from 'expo-router';
import { MenuProvider } from '../MenuContext';

export default function RootLayout() {
  return (
    <MenuProvider>
      <Stack />
    </MenuProvider>
  );
}
