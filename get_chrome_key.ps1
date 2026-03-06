Add-Type -AssemblyName System.Security

$localState = Get-Content "$env:LOCALAPPDATA\Google\Chrome\User Data\Local State" | ConvertFrom-Json
$encKeyB64 = $localState.os_crypt.encrypted_key
$encKeyBytes = [Convert]::FromBase64String($encKeyB64)
# Remove "DPAPI" prefix (5 bytes)
$encKeyBytes = $encKeyBytes[5..($encKeyBytes.Length-1)]
# Decrypt with DPAPI
$aesKey = [System.Security.Cryptography.ProtectedData]::Unprotect($encKeyBytes, $null, 'CurrentUser')

Write-Host "AES key length: $($aesKey.Length)"

# Copy cookie file (Chrome must be running - use Shadow Copy or copy via workaround)
$cookieSrc = "$env:LOCALAPPDATA\Google\Chrome\User Data\Default\Network\Cookies"
$cookieDst = "$PWD\cookies_tmp.db"

Copy-Item $cookieSrc $cookieDst -Force 2>$null

if (-not (Test-Path $cookieDst)) {
    # Chrome is locking it, try robocopy
    robocopy "$env:LOCALAPPDATA\Google\Chrome\User Data\Default\Network" "$PWD" "Cookies" /IS /IT /B 2>$null
    if (Test-Path "$PWD\Cookies") { Move-Item "$PWD\Cookies" $cookieDst -Force }
}

Write-Host "Cookie file copied: $(Test-Path $cookieDst)"

# Now use Python for SQLite + AES-GCM decryption, passing the raw key bytes
$keyHex = ($aesKey | ForEach-Object { $_.ToString('x2') }) -join ''
Write-Host "KEY_HEX:$keyHex"
