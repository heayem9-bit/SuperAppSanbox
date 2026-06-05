npx expo prebuild

.\gradlew.bat assembleDebug

create file android/local.propertie if fail
past sdk.dir=C:/Users/Admin/AppData/Local/Android/Sdk

.\gradlew.bat assembleDebug


<!-- Youtube -->
npx expo prebuild
cd android
./gradlew assembleRelease
./gradlew assembleDebug
./gradlew bundlerelease


## Splash Screen Setup & Configuration (Project Specific)

This project uses a custom two-stage splash screen architecture tailored to its prebuilt structure:

### 1. Stage 1: Native Android Splash Screen
This runs immediately on app launch while the React Native JS bundle is loading. It is configured manually in the native files:

- **Theme Configuration**: Defined in [styles.xml](file:///d:/dev/SuperAppSanbox/android/app/src/main/res/values/styles.xml#L8-L10) under the style `Theme.App.SplashScreen` with parent `AppTheme`. It sets `android:windowBackground` to `@drawable/splashscreen_logo`.

- **Drawable Configuration**: In [ic_launcher_background.xml](file:///d:/dev/SuperAppSanbox/android/app/src/main/res/drawable/ic_launcher_background.xml), the background color is defined by `@color/splashscreen_background` (which is `#FFFFFF` in [colors.xml](file:///d:/dev/SuperAppSanbox/android/app/src/main/res/values/colors.xml#L2)), and the splash logo is centered using `@drawable/splashscreen_logo`.

- **Activity Binding**: In [AndroidManifest.xml](file:///d:/dev/SuperAppSanbox/android/app/src/main/AndroidManifest.xml#L19), `MainActivity` starts with the theme `Theme.App.SplashScreen`.

- **Theme Transition**: In [MainActivity.kt](file:///d:/dev/SuperAppSanbox/android/app/src/main/java/com/anonymous/SuperAppSanbox/MainActivity.kt#L14-L20), the theme is set back to `R.style.AppTheme` inside `onCreate()` before calling `super.onCreate()` to swap the splash screen for the main app container.

*Note: Since these assets and settings are manually modified in the native `/android` folder, running `npx expo prebuild --clean` will overwrite these changes unless they are also configured in `app.json`.*

---

### 2. Stage 2: Custom Animated JS Splash Screen
Once the React Native bundle loads, the app renders a custom animated transition screen in JS:

- **Component**: [splash-screen.tsx](file:///d:/dev/SuperAppSanbox/src/features/splash/components/splash-screen.tsx) (located in `src/features/splash/components/`).

- **Layout Integration**: Mounted at the root level in [_layout.tsx](file:///d:/dev/SuperAppSanbox/src/app/_layout.tsx#L9-L21) based on the `showSplash` state:
  ```tsx

  const [showSplash, setShowSplash] = useState(true);
  
  // Renders on top of the stack when showSplash is true
  {showSplash && (
    <SplashScreen onAnimationComplete={() => setShowSplash(false)} />
  )}
  
  ```
- **Animation Details**: Uses `react-native-reanimated` to:
  1. Slide up the background card container (`cardTranslateY`).
  2. Scale up and fade in the logo (`logoScale` and `logoOpacity`).
  3. Fade out the entire container after **2 seconds** (configured via `withDelay(2000, ...)` on `containerOpacity`) and call `onAnimationComplete()` to show the app.

---

### How to Modify Splash Screen Elements

#### To Change the Splash Logo:

1. **JS/TS Custom Splash**: Replace [app-logo.png](file:///d:/dev/SuperAppSanbox/assets/logos/app-logo.png).

2. **Native Android Splash**: Update the logo files under [drawable-hdpi](file:///d:/dev/SuperAppSanbox/android/app/src/main/res/drawable-hdpi) (and other dpi folders) named `splashscreen_logo.png`.

#### To Change the Background Color:

1. **JS/TS Custom Splash**: Modify the background color in [splash-screen.tsx](file:///d:/dev/SuperAppSanbox/src/features/splash/components/splash-screen.tsx#L109) (`theme.primary` or custom styling).

2. **Native Android Splash**: Modify the `<color name="splashscreen_background">` value in [colors.xml](file:///d:/dev/SuperAppSanbox/android/app/src/main/res/values/colors.xml#L2).

#### To Change the Animation Duration:
- Edit the delay or duration in the exit animation configuration within [splash-screen.tsx](file:///d:/dev/SuperAppSanbox/src/features/splash/components/splash-screen.tsx#L53-L64).

