# YouTube Downloader - Quick Reference Guide

## 🚀 Quick Start (30 seconds)

```powershell
C:\Users\HP\OneDrive\Desktop\Master YouTube Downloader Auto Runner.bat
# Choose: 2
# Wait for app to open on device
# Done! 🎉
```

---

## 📱 On Your Mobile Device

1. Tap **"Downloads"** button (home screen)
2. Paste YouTube URL
3. Select quality (e.g., "HD 720p")
4. Tap **"Start Download"**
5. Watch progress (0-100%)

---

## 🔧 Manual Commands (If Needed)

```powershell
# Start Backend (Terminal 1)
cd "D:\a) Apps\Master Android App\Master-Android-App-RustBE - Backend"
cargo run --release

# Start Metro (Terminal 2)
cd "D:\a) Apps\Master Android App\MasterAndroidApp"
npm start

# Deploy App (Terminal 3)
npm run android
```

---

## 📊 What's Ready

| Feature | Status |
|---------|--------|
| Batch file | ✅ Fixed |
| Frontend code | ✅ Complete |
| Download logic | ✅ Complete |
| UI components | ✅ Complete |
| Database | ✅ Ready |
| Backend APIs | 🔄 Waiting |

---

## 🎯 Working Features

✅ Deploy to device  
✅ YouTube URL input  
✅ Quality selection (7 options)  
✅ Progress tracking (1-sec updates)  
✅ Pause/Resume downloads  
✅ Cancel downloads  
✅ Error display  
✅ Mock mode (no backend needed)  

---

## 📁 Key Files

**Deployment Script:**
```
C:\Users\HP\OneDrive\Desktop\Master YouTube Downloader Auto Runner.bat
```

**Frontend Feature:**
```
src/features/youtube-downloader/
```

**Documentation:**
- `YOUTUBE_DOWNLOADER_SETUP.md` - Full setup guide
- `YOUTUBE_DOWNLOADER_PROGRESS.md` - Progress tracking
- `COMPLETION_SUMMARY.md` - What's done

---

## ❓ Troubleshooting

### "CMD window closes immediately"
→ Use the fixed batch file

### "Backend connection failed"
→ App uses mock data, refresh UI

### "Device not detected"
→ Run batch file, choose USB or WiFi option

### "Download doesn't start"
→ Check URL format, try mock mode first

---

## 📋 Backend Endpoints Needed

```
POST /api/youtube/metadata
POST /api/youtube/download-url
```

See: `YOUTUBE_DOWNLOADER_SETUP.md` for details

---

## 🎓 Documentation Map

```
Project Docs
├── CLAUDE.md (UI guidelines)
├── DESIGN_SYSTEM.md (colors, spacing)
├── YOUTUBE_DOWNLOADER_SETUP.md ← Start here
├── YOUTUBE_DOWNLOADER_PROGRESS.md
├── COMPLETION_SUMMARY.md
└── QUICK_REFERENCE.md (this file)
```

---

## ✅ Checklist

- [ ] Run batch file
- [ ] Device connects
- [ ] App opens
- [ ] Tap Downloads
- [ ] Paste URL
- [ ] Select quality
- [ ] Start download
- [ ] See progress

---

**Ready to deploy!** 🚀

Last updated: June 8, 2026
