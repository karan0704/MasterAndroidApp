# YouTube Downloader - Testing Guide

**Status:** Frontend Complete (100%) | Backend Pending  
**Date:** June 8, 2026

---

## 🎯 CURRENT STAGE

### What's Done ✅
- Frontend UI complete
- Services layer ready
- Download logic implemented
- Database schema created
- Navigation integrated
- Error handling done
- Mock mode works perfectly

### What's Waiting 🔄
- Rust backend API endpoints (2 simple endpoints)
- Your adb devices show 3 devices ready (great!)

### What Works Now
- ✅ Everything without needing backend
- ✅ Uses mock data for testing
- ✅ UI is fully functional
- ✅ Can test on your devices

---

## 🚀 HOW TO TEST (Simple Steps)

### Prerequisites Check
```
✓ You have adb devices: 23f481319807 (USB) + 2 WiFi devices
✓ That's great! Ready to test
```

### Step 1: Start Metro (Terminal 1)
```powershell
cd "D:\a) Apps\Master Android App\MasterAndroidApp"
npm start
```
**Wait for:** `Metro server started on port 8081`

### Step 2: Deploy to Device (Terminal 2)
```powershell
cd "D:\a) Apps\Master Android App\MasterAndroidApp"
npm run android
```
**Wait for:** App opens on your device

### Step 3: Test on Device
```
1. Tap "Downloads" button (on home screen)
2. Paste any YouTube URL:
   https://www.youtube.com/watch?v=dQw4w9WgXcQ
3. Tap "Fetch Metadata"
4. See mock video info appear
5. Select quality: "HD (720p)"
6. Tap "Start Download"
7. Watch 3-second progress animation
8. See "completed" status
9. Check "Completed" tab
```

---

## 📊 TESTING CHECKLIST

### Without Backend (Works Now!)
- [ ] Metro server starts
- [ ] App deploys to device
- [ ] Home screen shows "Downloads" button
- [ ] Downloads screen opens
- [ ] Can paste YouTube URL
- [ ] Fetch metadata button works
- [ ] Mock data shows (title, duration, uploader)
- [ ] Quality selector shows 7 options
- [ ] Can select quality
- [ ] Start download button works
- [ ] Progress bar shows 0→100%
- [ ] Download shows in "Completed" tab
- [ ] Can switch between 3 tabs (Active/Completed/Failed)

### With Backend (When Ready)
- [ ] Backend running on `http://localhost:3000`
- [ ] Real metadata returns (not mock)
- [ ] Real download URLs work
- [ ] Real files download
- [ ] Progress updates every 1 second
- [ ] Can pause/resume real downloads
- [ ] Can cancel downloads
- [ ] Failed downloads show error message

---

## 🖥️ SERVER COMMANDS BY LOCATION

### Backend (Rust)
**Where:** `D:\a) Apps\Master Android App\Master-Android-App-RustBE - Backend\`  
**Command:**
```powershell
cd "D:\a) Apps\Master Android App\Master-Android-App-RustBE - Backend"
cargo run --release
```
**What it does:** Starts server on `http://localhost:3000`  
**Status:** ⏳ Not yet (awaiting implementation)

### Metro (Dev Server)
**Where:** `D:\a) Apps\Master Android App\MasterAndroidApp\`  
**Command:**
```powershell
cd "D:\a) Apps\Master Android App\MasterAndroidApp"
npm start
```
**What it does:** Starts Metro on port 8081, watches for code changes  
**Status:** ✅ Ready

### Android Deploy
**Where:** `D:\a) Apps\Master Android App\MasterAndroidApp\`  
**Command:**
```powershell
npm run android
```
**What it does:** Builds and deploys app to connected device  
**Status:** ✅ Ready

---

## 📁 FILES & DOCUMENTATION

### Feature Documentation (Now in proper place!)
```
src/docs/features/youtube-downloader/
├── README.md            ← Start here
├── scope.md             ← What's included/excluded
├── architecture.md      ← How it works
├── data-model.md        ← Database schema
├── ui-behavior.md       ← UI flows
└── roadmap.md           ← Future phases
```

### Feature Code
```
src/features/youtube-downloader/
├── contracts/youtube.contract.ts
├── services/
│   ├── youtubeService.ts
│   └── downloadService.ts
├── hooks/useYoutubeDownloads.ts
├── store/downloadsStore.ts
├── ui/
│   ├── DownloadsScreen.tsx
│   └── components/
│       ├── DownloadItem.tsx
│       └── QualitySelector.tsx
└── index.ts
```

---

## 🧪 QUICK TEST (2 minutes)

```powershell
# Terminal 1
cd "D:\a) Apps\Master Android App\MasterAndroidApp"
npm start

# Wait for "Metro started" (takes ~10 seconds)

# Terminal 2
cd "D:\a) Apps\Master Android App\MasterAndroidApp"
npm run android

# Wait for app to open on device (takes ~1-2 minutes)

# On device:
1. Tap "Downloads"
2. Paste: https://www.youtube.com/watch?v=dQw4w9WgXcQ
3. Tap "Fetch Metadata"
4. Select quality
5. Tap "Start Download"
6. Done! ✅
```

---

## ⚙️ WHAT SERVERS TO RUN & WHERE

### For Testing WITHOUT Backend (Works Now)

**Terminal 1: Metro**
```
cd "D:\a) Apps\Master Android App\MasterAndroidApp"
npm start
```

**Terminal 2: Deploy**
```
cd "D:\a) Apps\Master Android App\MasterAndroidApp"
npm run android
```

**Total:** 2 terminals needed

### For Testing WITH Backend (When Ready)

**Terminal 1: Backend**
```
cd "D:\a) Apps\Master Android App\Master-Android-App-RustBE - Backend"
cargo run --release
```

**Terminal 2: Metro**
```
cd "D:\a) Apps\Master Android App\MasterAndroidApp"
npm start
```

**Terminal 3: Deploy**
```
cd "D:\a) Apps\Master Android App\MasterAndroidApp"
npm run android
```

**Total:** 3 terminals needed

---

## 🎬 EXPECTED BEHAVIOR

### Mock Mode (No Backend)

**Input:** `https://www.youtube.com/watch?v=dQw4w9WgXcQ`

**Response:**
```
Title: Sample Video
Duration: 5:00
Uploader: Sample Channel
```

**Download:**
- Shows mock video data
- 3-second animation
- Marks as "completed"
- Shows in completed tab
- No actual file downloaded

### Real Mode (With Backend)

**Input:** `https://www.youtube.com/watch?v=dQw4w9WgXcQ`

**Response:**
```
Title: [Real YouTube title]
Duration: [Real duration]
Uploader: [Real uploader]
Thumbnail: [Real image]
```

**Download:**
- Real file downloaded
- Real progress updates (every 1 second)
- Real file saved to device
- Actually takes time (not instant)
- Shows real speed & ETA

---

## 🐛 TROUBLESHOOTING

### "Metro won't start"
→ Try: `npm install` first, then `npm start`

### "App won't deploy"
→ Check: `adb devices` shows your device  
→ Try: Unplug and replug USB, then retry

### "Downloads screen doesn't open"
→ Reload: Press R in Metro terminal (hot reload)

### "Downloads tab is empty"
→ Normal: Tap "Fetch Metadata" first, then start download

### "Mock data appears instead of real"
→ Expected: When backend not running, mock data shows

---

## ✅ VALIDATION CHECKLIST

Before saying "ready":

- [ ] Metro starts without errors
- [ ] App deploys to device
- [ ] Downloads screen appears
- [ ] Can paste URL and fetch metadata
- [ ] Quality selector works
- [ ] Can start mock download
- [ ] Progress bar animates
- [ ] Download marked as completed
- [ ] No crashes in console

---

## 📞 NEXT STEPS

1. **Test Now** (5 min)
   - Run Metro and deploy
   - Test mock mode
   - Verify UI works

2. **Wait for Backend** (days/weeks)
   - Check: `D:\a) Apps\Master Android App\Master-Android-App-RustBE - Backend\PROGRESS.md`
   - When ready, add these 2 endpoints

3. **Real Testing** (when backend ready)
   - Start 3 terminals (backend + metro + deploy)
   - Test with real YouTube URLs
   - Verify real downloads work

---

## 📊 Your Current Devices

```
adb devices output:
- 23f481319807         (USB connected)
- 192.168.1.28:41451   (WiFi connected)
- adb-71b25dac...      (WiFi connected)
```

✅ You have 3 devices ready! Perfect for testing.

---

**Status:** Ready to test mock mode now! 🚀  
**Next:** Implement backend APIs when ready
