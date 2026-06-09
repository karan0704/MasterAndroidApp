@echo off
REM Run Frontend with cache reset

echo.
echo ==========================================
echo   MASTER ANDROID APP - FRESH START
echo ==========================================
echo.
echo 📱 Starting Expo with REAL YouTube Backend
echo 🏠 Backend: Running on http://192.168.1.7:3000
echo.

echo 🧹 Clearing Metro bundler cache...
npm start -- --reset-cache

REM After npm start, you will see Expo CLI menu
REM Press 'a' to open on Android device
REM Press 'i' to open on iOS simulator
REM Press 'w' to open in browser
