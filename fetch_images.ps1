$html = (Invoke-WebRequest -Uri "https://salon-medo.com/" -UseBasicParsing).Content
$matches = [regex]::Matches($html, '<img[^>]*src=["'']([^"'']+)["'']')
$urls = @()
foreach ($match in $matches) {
    $src = $match.Groups[1].Value
    if ($src -notmatch '^https?://') {
        $src = "https://salon-medo.com/" + $src.TrimStart('/')
    }
    $urls += $src
}
$urls | Select-Object -Unique