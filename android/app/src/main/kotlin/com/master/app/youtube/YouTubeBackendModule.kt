package com.master.app.youtube

import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.content.ServiceConnection
import android.os.IBinder
import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

/**
 * React Native bridge to manage the Rust YouTube backend service.
 *
 * Usage from React Native:
 * ```
 * import { NativeModules } from 'react-native';
 * const { YouTubeBackendModule } = NativeModules;
 *
 * // Start backend
 * await YouTubeBackendModule.startBackend();
 *
 * // Check if running
 * const running = await YouTubeBackendModule.isBackendRunning();
 * ```
 */
class YouTubeBackendModule(private val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  companion object {
    private const val TAG = "YouTubeBackendModule"
  }

  private var backendService: RustBackendService? = null
  private var serviceConnected = false

  /**
   * Service connection callback
   */
  private val serviceConnection = object : ServiceConnection {
    override fun onServiceConnected(name: ComponentName?, service: IBinder?) {
      Log.d(TAG, "Backend service connected")
      val binder = service as RustBackendService.LocalBinder
      backendService = binder.getService()
      serviceConnected = true
    }

    override fun onServiceDisconnected(name: ComponentName?) {
      Log.d(TAG, "Backend service disconnected")
      backendService = null
      serviceConnected = false
    }
  }

  override fun getName(): String = "YouTubeBackendModule"

  /**
   * Start the Rust backend service
   *
   * React Native call:
   * ```
   * await YouTubeBackendModule.startBackend();
   * ```
   */
  @ReactMethod
  fun startBackend(promise: Promise) {
    try {
      Log.d(TAG, "Starting backend service...")

      val intent = Intent(reactContext, RustBackendService::class.java)

      // Start service
      reactContext.startService(intent)

      // Bind to service for control
      reactContext.bindService(intent, serviceConnection, Context.BIND_AUTO_CREATE)

      // Give service time to start
      Thread.sleep(2000)

      Log.d(TAG, "Backend service started")
      promise.resolve("Backend started on http://localhost:3000")
    } catch (e: Exception) {
      Log.e(TAG, "Failed to start backend: ${e.message}", e)
      promise.reject("BACKEND_START_FAILED", e.message, e)
    }
  }

  /**
   * Check if backend is running
   *
   * React Native call:
   * ```
   * const running = await YouTubeBackendModule.isBackendRunning();
   * ```
   */
  @ReactMethod
  fun isBackendRunning(promise: Promise) {
    try {
      val running = backendService?.isBackendRunning() ?: false
      Log.d(TAG, "Backend running: $running")
      promise.resolve(running)
    } catch (e: Exception) {
      Log.e(TAG, "Error checking backend status: ${e.message}", e)
      promise.reject("CHECK_FAILED", e.message, e)
    }
  }

  /**
   * Stop the backend service
   *
   * React Native call:
   * ```
   * await YouTubeBackendModule.stopBackend();
   * ```
   */
  @ReactMethod
  fun stopBackend(promise: Promise) {
    try {
      Log.d(TAG, "Stopping backend service...")

      backendService?.stopBackend()

      // Unbind service
      if (serviceConnected) {
        reactContext.unbindService(serviceConnection)
        serviceConnected = false
      }

      // Stop service
      val intent = Intent(reactContext, RustBackendService::class.java)
      reactContext.stopService(intent)

      Log.d(TAG, "Backend service stopped")
      promise.resolve("Backend stopped")
    } catch (e: Exception) {
      Log.e(TAG, "Failed to stop backend: ${e.message}", e)
      promise.reject("BACKEND_STOP_FAILED", e.message, e)
    }
  }

  /**
   * Initialize the backend on app startup
   * This is called automatically when the module is created
   */
  init {
    Log.d(TAG, "YouTubeBackendModule initialized")
    // Backend will be started when explicitly requested
  }
}
