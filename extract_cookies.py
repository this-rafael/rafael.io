import sqlite3, os, shutil, json, sys
import win32crypt
import base64

try:
    from Crypto.Cipher import AES
except ImportError:
    import subprocess
    subprocess.run([sys.executable, '-m', 'pip', 'install', 'pycryptodome', '-q'])
    from Crypto.Cipher import AES

chrome_keys_path = os.path.expanduser('~\\AppData\\Local\\Google\\Chrome\\User Data\\Local State')
cookie_path = os.path.expanduser('~\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Network\\Cookies')

# Read encryption key
with open(chrome_keys_path, 'r') as f:
    local_state = json.load(f)

encrypted_key = base64.b64decode(local_state['os_crypt']['encrypted_key'])
encrypted_key = encrypted_key[5:]  # Remove DPAPI prefix
key = win32crypt.CryptUnprotectData(encrypted_key, None, None, None, 0)[1]

# Copy cookie DB (Chrome locks it while open)
shutil.copy2(cookie_path, 'cookies_tmp.db')
conn = sqlite3.connect('cookies_tmp.db')
cursor = conn.cursor()
cursor.execute("SELECT name, encrypted_value, host_key, path, expires_utc, is_secure, is_httponly FROM cookies WHERE host_key LIKE '%linkedin.com%'")

cookies = []
for name, enc_val, host, path, exp, secure, httponly in cursor.fetchall():
    try:
        if enc_val[:3] == b'v10':
            nonce = enc_val[3:15]
            ciphertext = enc_val[15:-16]
            tag = enc_val[-16:]
            cipher = AES.new(key, AES.MODE_GCM, nonce=nonce)
            value = cipher.decrypt_and_verify(ciphertext, tag).decode('utf-8')
        else:
            value = win32crypt.CryptUnprotectData(enc_val, None, None, None, 0)[1].decode('utf-8')
        cookies.append({
            'name': name,
            'value': value,
            'domain': host,
            'path': path,
            'secure': bool(secure),
            'httpOnly': bool(httponly)
        })
    except Exception as e:
        pass

conn.close()
os.remove('cookies_tmp.db')

with open('linkedin_cookies.json', 'w') as f:
    json.dump(cookies, f)

print(f'Extraidos {len(cookies)} cookies do LinkedIn')
