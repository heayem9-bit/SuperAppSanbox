import { ScrollView, TextInput } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { ThemedView } from '@/components/ui/view';
import { ThemedText } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';
import { useProfile } from '../hooks/use-profile';

export function ProfileView() {
  const theme = useTheme();
  const { t } = useTranslation();
  const {
    fullname,
    setFullname,
    phone,
    setPhone,
    email,
    setEmail,
    gender,
    setGender,
    nationality,
    setNationality,
    save,
    saved,
  } = useProfile();

  const textInputStyle = {
    width: '100%' as const,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderColor: theme.backgroundSelected,
    color: theme.text,
    backgroundColor: theme.backgroundElement,
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: t('profile.title'),
          headerStyle: {
            backgroundColor: theme.primary,
          },
          headerTitleStyle: {
            color: theme.white,
          },
          headerTintColor: theme.white,
        }}
      />
      <ThemedView style={{ flex: 1 }}>
        <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            {/* Profile Input Form */}
            <ThemedText style={{ marginBottom: 8, fontWeight: '600' }}>
              {t('profile.fullName')}
            </ThemedText>
            <TextInput
              style={textInputStyle}
              value={fullname}
              onChangeText={setFullname}
              placeholder={t('profile.fullNamePlaceholder')}
              placeholderTextColor={theme.textSecondary}
            />

            <ThemedText style={{ marginBottom: 8, fontWeight: '600' }}>
              {t('profile.phone')}
            </ThemedText>
            <TextInput
              style={textInputStyle}
              value={phone}
              onChangeText={setPhone}
              placeholder={t('profile.phonePlaceholder')}
              keyboardType="phone-pad"
              placeholderTextColor={theme.textSecondary}
            />

            <ThemedText style={{ marginBottom: 8, fontWeight: '600' }}>
              {t('profile.email')}
            </ThemedText>
            <TextInput
              style={textInputStyle}
              value={email}
              onChangeText={setEmail}
              placeholder={t('profile.emailPlaceholder')}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={theme.textSecondary}
            />

            <ThemedText style={{ marginBottom: 8, fontWeight: '600' }}>
              {t('profile.gender')}
            </ThemedText>
            <TextInput
              style={textInputStyle}
              value={gender}
              onChangeText={setGender}
              placeholder={t('profile.genderPlaceholder')}
              placeholderTextColor={theme.textSecondary}
            />

            <ThemedText style={{ marginBottom: 8, fontWeight: '600' }}>
              {t('profile.nationality')}
            </ThemedText>
            <TextInput
              style={textInputStyle}
              value={nationality}
              onChangeText={setNationality}
              placeholder={t('profile.nationalityPlaceholder')}
              placeholderTextColor={theme.textSecondary}
            />

            <ThemedView style={{ marginTop: 24, alignItems: 'center' as const, gap: 12 }}>
              <Button
                onPress={save}
                title={t('profile.save')}
                variant="primary"
              />
              {saved && (
                <ThemedText themeColor="primary" style={{ fontWeight: '600', fontSize: 16 }}>
                  {t('profile.saved')}
                </ThemedText>
              )}
            </ThemedView>
          </ScrollView>
        </SafeAreaView>
      </ThemedView>
    </>
  );
}
