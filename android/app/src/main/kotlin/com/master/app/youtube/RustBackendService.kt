package com.master.app.youtube

import android.app.Service
import android.content.Intent
import android.os.Binder
import android.os.IBinder
import android.util.Log
import java.io.File
import java.io.InputStream

/**
 * Android Service that runs the Rust YouTube backend in a separate thread.
 *
 * The backend executable must be bundled in app assets and extracted to app files directory.
 * This service starts the backend on app launch and keeps it running in the background.
 *
 * Accessible from: http://localhost:3000
 */
class RustBackendService : Service() {
  companion object {
    private const val TAG = "RustBackendService"
    private const val BACKEND_BINARY_NAME = "youtube_backend"
    private const val BACKEND_PORT = 3000
  }

  private val binder = LocalBinder()
  private var backendProcess: Process? = null
  private var backendThread: Thread? = null
  private var isRunning = false

  /**
   * Binder for local service communication
   */
  inner class LocalBinder : Binder() {
    fun getService(): RustBackendService = this@RustBackendService
  }

  override fun onBind(intent: Intent?): IBinder = binder

  override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
    Log.d(TAG, "Service started")

    // Start backend if not already running
    if (!isRunning) {
      startBackend()
    }

    // Keep service running even if activity is destroyed
    return START_STICKY
  }

  /**
   * Extract backend binary from assets and run it
   */
  private fun startBackend() {
    backendThread = Thread {
      try {
        // Get app files directory for storing the binary
        val filesDir = filesDir
        val binaryPath = File(filesDir, BACKEND_BINARY_NAME)

        // Extract binary from assets if not already present
        if (!binaryPath.exists()) {
          Log.d(TAG, "Extracting backend binary from assets...")
          extractBinaryFromAssets(BACKEND_BINARY_NAME, binaryPath)
        }

        // Make binary executable
        binaryPath.setExecutable(true)

        Log.d(TAG, "Starting Rust backend at ${binaryPath.absolutePath}")
        Log.d(TAG, "Backend will listen on http://localhost:$BACKEND_PORT")

        // Start the backend process
        val processBuilder = ProcessBuilder(binaryPath.absolutePath)

        // Set environment for the backend
        val env = processBuilder.environment()
        env["PORT"] = BACKEND_PORT.toString()
        env["RUST_LOG"] = "info"

        // Start process and capture output
        backendProcess = processBuilder.start()
        isRunning = true

        // Log output from backend
        logBackendOutput(backendProcess!!)

        // Wait for process (blocks until backend stops)
        val exitCode = backendProcess!!.waitFor()
        Log.w(TAG, "Backend process exited with code: $exitCode")
        isRunning = false

      } catch (e: Exception) {
        Log.e(TAG, "Failed to start backend: ${e.message}", e)
        isRunning = false
      }
    }

    backendThread!!.start()
  }

  /**
   * Extract binary from app assets to app files directory
   */
  private fun extractBinaryFromAssets(assetName: String, targetFile: File) {
    try {
      val assetManager = assets
      val inputStream: InputStream = assetManager.open("binaries/$assetName")

      targetFile.outputStream().use { output ->
        inputStream.use { input ->
          input.copyTo(output)
        }
      }

      Log.d(TAG, "Binary extracted to ${targetFile.absolutePath}")
    } catch (e: Exception) {
      Log.e(TAG, "Failed to extract binary: ${e.message}", e)
      throw e
    }
  }

  /**
   * Log output from backend process (stdout + stderr)
   */
  private fun logBackendOutput(process: Process) {
    Thread {
      try {
        process.inputStream.bufferedReader().forEachLine { line ->
          Log.d(TAG, "[Backend] $line")
        }
      } catch (e: Exception) {
        Log.e(TAG, "Error reading backend output: ${e.message}")
      }
    }.start()

    Thread {
      try {
        process.errorStream.bufferedReader().forEachLine { line ->
          Log.w(TAG, "[Backend] $line")
        }
      } catch (e: Exception) {
        Log.e(TAG, "Error reading backend error stream: ${e.message}")
      }
    }.start()
  }

  /**
   * Check if backend is running
   */
  fun isBackendRunning(): Boolean = isRunning

  /**
   * Gracefully stop the backend
   */
  fun stopBackend() {
    try {
      if (backendProcess != null && isRunning) {
        Log.d(TAG, "Stopping backend...")
        backendProcess!!.destroy()
        backendProcess!!.waitFor()
        isRunning = false
      }
    } catch (e: Exception) {
      Log.e(TAG, "Error stopping backend: ${e.message}", e)
    }
  }

  override fun onDestroy() {
    Log.d(TAG, "Service destroyed")
    stopBackend()
    super.onDestroy()
  }
}
