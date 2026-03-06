param(
    [Parameter(Mandatory=$true)]
    [string]$ImagePath
)

$ErrorActionPreference = 'Stop'

# Ensure absolute path built properly for WinRT
if (-not (Test-Path $ImagePath)) {
    Write-Error "File not found: $ImagePath"
    exit 1
}
$absPath = (Resolve-Path $ImagePath).Path

# Load WinRT types
Add-Type -AssemblyName System.Runtime.WindowsRuntime
[Windows.Storage.StorageFile, Windows.Foundation.UniversalApiContract, ContentType=WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Foundation.UniversalApiContract, ContentType=WindowsRuntime] | Out-Null
[Windows.Media.Ocr.OcrEngine, Windows.Foundation.UniversalApiContract, ContentType=WindowsRuntime] | Out-Null

# Helper to await WinRT IAsyncOperation in PowerShell
function Await-WinRTOperation {
    param($AsyncOp, [type]$ResultType)
    $asTaskMethod = [System.WindowsRuntimeSystemExtensions].GetMethods() | 
        Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.ReturnType.Name -eq 'Task`1' } | 
        Select-Object -First 1
    $genericAsTask = $asTaskMethod.MakeGenericMethod($ResultType)
    $task = $genericAsTask.Invoke($null, @($AsyncOp))
    $task.Wait()
    return $task.Result
}

# 1. Get StorageFile
$getFileOp = [Windows.Storage.StorageFile]::GetFileFromPathAsync($absPath)
$storageFile = Await-WinRTOperation $getFileOp [Windows.Storage.StorageFile]

# 2. Open stream
$openOp = $storageFile.OpenAsync([Windows.Storage.FileAccessMode]::Read)
$stream = Await-WinRTOperation $openOp [Windows.Storage.Streams.IRandomAccessStream]

# 3. Create BitmapDecoder
$decoderOp = [Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)
$decoder = Await-WinRTOperation $decoderOp [Windows.Graphics.Imaging.BitmapDecoder]

# 4. Get SoftwareBitmap
$bitmapOp = $decoder.GetSoftwareBitmapAsync()
$softwareBitmap = Await-WinRTOperation $bitmapOp [Windows.Graphics.Imaging.SoftwareBitmap]

# 5. Create OcrEngine
$ocrEngine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
if ($null -eq $ocrEngine) {
    Write-Error "Failed to initialize OcrEngine. Check Windows OCR language support."
    exit 1
}

# 6. Recognize text
$recognizeOp = $ocrEngine.RecognizeAsync($softwareBitmap)
$ocrResult = Await-WinRTOperation $recognizeOp [Windows.Media.Ocr.OcrResult]

# Output Text
$ocrResult.Text

# Cleanup
$stream.Dispose()
