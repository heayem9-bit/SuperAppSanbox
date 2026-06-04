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