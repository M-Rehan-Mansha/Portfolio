param()
# fix_encoding.ps1
# Repairs mojibake in index.html where UTF-8 multi-byte chars were saved as Latin-1 sequences.
# Each bad sequence is specified as explicit Unicode code-points so the script itself stays safe.

$filePath = Join-Path $PSScriptRoot "index.html"

# Helper: build a string from an array of Unicode code-points
function U { param([int[]]$cp) ($cp | ForEach-Object { [char]$_ }) -join "" }

# --- Mojibake map: [bad sequence]  =>  [correct sequence] ---
# Bad sequences are constructed from their Latin-1 byte values as Unicode chars,
# so this file itself never contains a garbled byte sequence.

$map = @(
    # Em dash  (UTF-8: 0xE2 0x80 0x94)  misread as Latin-1: â€"  (with trailing space variant first)
    @( (U 0xE2,0x80,0x94) + " ",  " — " ),   # "â€" " -> " — "
    @( (U 0xE2,0x80,0x94),        "—"   ),   # "â€""  -> "—"

    # Right single quote / apostrophe  (UTF-8: 0xE2 0x80 0x99)  misread: â€™
    @( (U 0xE2,0x80,0x99),  "'"  ),

    # Left single quote  (UTF-8: 0xE2 0x80 0x98)  misread: â€˜
    @( (U 0xE2,0x80,0x98),  "'"  ),

    # Left double quote  (UTF-8: 0xE2 0x80 0x9C)  misread: â€œ
    @( (U 0xE2,0x80,0x9C),  [string][char]0x201C ),

    # Right double quote (UTF-8: 0xE2 0x80 0x9D)  misread: â€ (trailing byte 0x9D is control char, often dropped)
    @( (U 0xE2,0x80,0x9D),  [string][char]0x201D ),

    # Horizontal ellipsis (UTF-8: 0xE2 0x80 0xA6)  misread: â€¦
    @( (U 0xE2,0x80,0xA6),  "…" ),

    # Bullet  (UTF-8: 0xE2 0x80 0xA2)  misread: â€¢
    @( (U 0xE2,0x80,0xA2),  "•"  ),

    # Right arrow  (UTF-8: 0xE2 0x86 0x92)  misread: â†'
    @( (U 0xE2,0x86,0x92),  "→" ),

    # Four-pointed star ✦  (UTF-8: 0xE2 0x9C 0xA6)  misread: âœ¦
    @( (U 0xE2,0x9C,0xA6),  "✦"  ),

    # Catch-all: bare leading â€ fragment not caught above
    @( (U 0xE2,0x80),       ""   )
)

# Read bytes; decode as Latin-1 (1:1 byte->char) so the mojibake bytes are preserved exactly
$bytes   = [System.IO.File]::ReadAllBytes($filePath)
$latin1  = [System.Text.Encoding]::GetEncoding(28591)   # ISO-8859-1 / Latin-1
$content = $latin1.GetString($bytes)

$total = 0
foreach ($pair in $map) {
    $needle      = $pair[0]
    $replacement = $pair[1]
    $count = ([regex]::Matches($content, [regex]::Escape($needle))).Count
    if ($count -gt 0) {
        $content = $content.Replace($needle, $replacement)
        Write-Host ("  [{0,2}x]  replaced: {1}" -f $count, $needle.ToCharArray() | ForEach-Object { "{0:X2}" -f [int]$_ } | Join-String -Separator " ")
        $total += $count
    }
}

# Write back as UTF-8 without BOM
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($filePath, $content, $utf8NoBom)

Write-Host ""
Write-Host "Done — $total replacement(s) applied."
Write-Host "Saved: $filePath"
