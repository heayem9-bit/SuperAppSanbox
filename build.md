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

 android/app/src/main/res/values/styles.xml

 <resources xmlns:tools="http://schemas.android.com/tools">
  <style name="AppTheme" parent="Theme.AppCompat.DayNight.NoActionBar">
    <item name="android:editTextBackground">@drawable/rn_edit_text_material</item>
    <item name="colorPrimary">@color/colorPrimary</item>
    <item name="android:statusBarColor">@android:color/transparent</item>
    <item name="android:navigationBarColor">@android:color/transparent</item>
  </style>

  <style name="Theme.App.SplashScreen" parent="AppTheme">
    <!-- Use solid color instead of drawable to avoid showing adaptive icon artifacts -->
    <item name="android:windowBackground">@color/splashscreen_background</item>
  </style>
</resources>