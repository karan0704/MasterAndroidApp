# Engineering Priorities

## Purpose

This file establishes the engineering values and performance targets for the Master Android App.

Every architectural and implementation decision should align with these priorities.

---

## Core Priorities (In Order of Importance)

### 1. Low RAM Usage

**Target:** 100–250 MB idle

**Why?**
- Must work on 3GB RAM devices
- Leaves room for other apps to run
- Prevents system slowdown
- Essential for low-end devices

**How to achieve:**
- Avoid large in-memory caches
- Stream large files instead of loading fully
- Lazy-load features
- Clean up listeners and subscriptions
- Use efficient data structures
- Profile memory regularly

### 2. Low Storage Size

**Target:** 80–120 MB app size (including Phase 2 features)

**Why?**
- Users have limited storage
- Fits on budget phones
- Faster download
- Reduces device strain

**How to achieve:**
- Minimize bundle size
- Remove unused dependencies
- Compress assets
- Avoid duplicate libraries
- Tree-shake unused code
- Consider code splitting

### 3. Fast Startup Speed

**Target:** Below 2 seconds cold start

**Why?**
- Users expect instant apps
- Slow startup feels broken
- Essential for good UX
- Especially important for low-end devices

**How to achieve:**
- Minimize initialization
- Defer non-critical setup
- Use code splitting
- Optimize storage access
- Profile startup time
- Avoid sync operations at start

### 4. Low CPU Usage

**Target:** Near idle when app is inactive

**Why?**
- Preserves battery life
- Allows other apps to run
- Prevents device heating
- Good for low-end device experience

**How to achieve:**
- Avoid polling loops
- Use efficient algorithms
- Batch operations
- Unsubscribe from unnecessary listeners
- Use native implementations for heavy work
- Test on low-end devices

### 5. Offline-First Functionality

**Target:** 100% offline capable for core features

**Why?**
- Works in poor connectivity
- Fast local operations
- Graceful degradation
- Privacy-first approach
- No network dependency

**How to achieve:**
- Store locally first
- Sync is enhancement, not requirement
- Don't block on network
- Queue actions for sync
- Provide offline indicators
- Test offline scenarios

### 6. Modular Architecture

**Target:** 5-10 files per focused feature change

**Why?**
- Easy to understand changes
- Minimal ripple effects
- Independent development
- Easy to test
- Easy to debug
- AI-friendly development

**How to achieve:**
- Feature-first folder structure
- Explicit contracts between features
- No tight coupling
- Clear boundaries
- Self-contained modules
- Comprehensive feature docs

### 7. Low-End Device Compatibility

**Target:** Runs smoothly on Android 8+, 3GB RAM devices

**Why?**
- Reaches broader user base
- Forces good architectural decisions
- Prevents bloat
- Inclusive design

**How to achieve:**
- Test on budget phones
- Avoid cutting-edge APIs
- Graceful degradation
- Memory profiling
- Performance testing
- Battery monitoring

### 8. Cross-Platform Support (Future)

**Target:** Easy expansion to Windows, Linux, Web

**Why?**
- Reuse business logic
- Consistent behavior
- Shared codebase where possible
- Future-proof architecture

**How to achieve:**
- Platform-agnostic business logic
- Abstracted UI layer
- Shared service layer
- Clear feature boundaries
- Test coverage

### 9. AI-Friendly Development

**Target:** Clear code, comprehensive docs, obvious patterns

**Why?**
- Faster development iteration
- Easier to add features with AI assistance
- Better code quality
- Reduced debugging time

**How to achieve:**
- Clear naming conventions
- Well-organized code
- Comprehensive documentation
- Consistent patterns
- Self-documenting code
- Feature docs before code

### 10. Minimal Maintenance Cost

**Target:** Easy to update, maintain, and extend

**Why?**
- Sustainability long-term
- Easy to onboard new developers
- Less technical debt
- Scales better

**How to achieve:**
- Avoid over-engineering
- Use proven technologies
- Keep dependencies minimal
- Regular cleanup
- Documentation first
- Test coverage

---

## Target Devices

### Primary Target (Phase 1-2)

```
Device: Budget Android phones
RAM: 3GB–4GB
Android: 8+
Screen: 5"-6"
CPU: Mid-range processor
Storage: 64GB (shared with user files)
Network: 3G/4G/WiFi
```

### Secondary Target (Future)

```
Device: Low-end laptops
RAM: 4GB–8GB
OS: Windows 10+, Linux
CPU: Older processors
Screen: 13"-17"
```

### Not Primary Target

```
Device: Flagship phones
RAM: 8GB+
Storage: Unlimited
Network: Always on
Note: Optimization for low-end means flagship 
      devices will feel extra smooth
```

---

## Performance Metrics

### Startup Time

**Measure:** Cold start time
```
Target: < 2 seconds
Acceptable: 2-3 seconds
Poor: > 3 seconds
```

**How to measure:**
```
adb shell am start -W com.app
```

### Memory Usage

**Measure:** Idle RAM footprint
```
Target: 100-250 MB
Acceptable: 250-350 MB
Poor: > 350 MB
```

**How to measure:**
```
adb shell dumpsys meminfo
```

### App Size

**Measure:** APK file size
```
Target: 80-120 MB
Acceptable: 120-150 MB
Poor: > 150 MB
```

### Battery Impact

**Measure:** Battery drain rate when inactive
```
Target: < 2% per hour idle
Acceptable: 2-5% per hour
Poor: > 5% per hour
```

### Response Time

**Measure:** UI responsiveness
```
Target: < 100ms for most interactions
Acceptable: 100-300ms
Poor: > 300ms
```

---

## Design Decisions That Support These Priorities

### Why React Native (not Electron)

```
Electron app = 500MB+ RAM
React Native app = 100-250MB RAM
```

React Native is 5x more efficient.

### Why SQLite (not Firebase)

```
Firebase = network dependency
SQLite = offline, fast, local
```

SQLite supports offline-first.

### Why Zustand (not Redux)

```
Redux = boilerplate, overhead
Zustand = minimal, efficient
```

Zustand is lighter, faster.

### Why Markdown (not JSON database for notes)

```
Markdown = human readable, version friendly
JSON = larger, less portable
```

Markdown aligns with archival and backup.

### Why MMKV (not SharedPreferences)

```
SharedPreferences = synchronous, slow
MMKV = fast, async, low overhead
```

MMKV is 10x faster.

### Why Feature-First (not Layer-First)

```
Layer-first = changes touch 50 files
Feature-first = changes touch 5-10 files
```

Feature-first keeps changes minimal.

---

## Testing Priorities

### Must Test On

1. **Budget Android phone** (3GB RAM, Android 8+)
   - Most realistic use case
   - Reveals performance issues early

2. **Android Emulator** with low specs
   - Consistent testing
   - Easy to reproduce

3. **Profiling Tools**
   - Memory profiler
   - CPU profiler
   - Battery profiler
   - Network monitor

### Must Monitor

```
✓ Memory usage under load
✓ Startup time with fresh install
✓ Battery drain over 1 hour
✓ Frame rate on list scrolling
✓ Response time for touches
✓ APK/Bundle size growth
```

---

## Trade-off Philosophy

### Example: Caching

**Temptation:** Cache everything for speed
**Reality:** Caches consume RAM
**Decision:** Strategic caching (images only, recent data)

### Example: Animations

**Temptation:** Beautiful 60fps animations everywhere
**Reality:** Animations on low-end devices = jank
**Decision:** Fast animations, essential only, reduced on low-end

### Example: Features

**Temptation:** Build all features immediately
**Reality:** Each feature = more RAM, size, startup time
**Decision:** Modular, enable/disable features, lazy load

---

## Continuous Monitoring

### Automated Checks (CI/CD)

```
✓ Bundle size grows < 5% per release
✓ No new memory leaks detected
✓ Startup time < 2 seconds
✓ No hardcoded values (use theme tokens)
✓ No sync operations in startup
```

### Manual Testing Checklist

Before every release:
```
✓ Test on budget phone (3GB RAM)
✓ Cold start: timed
✓ Memory: profiled
✓ Battery: 1 hour test
✓ Network off: works?
✓ Offline then sync: works?
```

---

## Summary

These 10 priorities work together to create an app that:

1. **Runs everywhere** - low-end to modern devices
2. **Runs efficiently** - low RAM, low CPU, low battery drain
3. **Runs offline** - network optional
4. **Runs stably** - minimal crashes, predictable behavior
5. **Scales well** - easy to add features
6. **Maintains easily** - clean, documented code
7. **Debugs easily** - AI-friendly structure
8. **Expands easily** - modular, portable

Every decision should align with these values.
