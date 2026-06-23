Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
dir = "C:\\Users\\victor.LAPTOP-J9VHL1A4\\Documents\\Codex\\2026-06-18\\files-mentioned-by-the-user-gemini\\frontend"

' Kill existing Vite on port 5173
WshShell.Run "cmd /c for /f ""tokens=5"" %a in ('netstat -ano ^| findstr "":5173.*LISTENING""') do taskkill /F /PID %a >nul 2>nul", 0, True

' Start Vite in hidden mode
WshShell.Run "cmd /c set PATH=D:\\Claude Code;%PATH% && cd /d " & dir & " && D:\\Claude Code\\node.exe node_modules\\vite\\bin\\vite.js --host 0.0.0.0 --port 5173", 0, False

' Wait for server to be ready (max 30 seconds)
For i = 1 To 30
    WScript.Sleep 1000
    On Error Resume Next
    Set http = CreateObject("MSXML2.ServerXMLHTTP")
    http.Open "GET", "http://localhost:5173", False
    http.Send
    If http.Status = 200 Then Exit For
    On Error Goto 0
Next

' Open browser
WshShell.Run "http://localhost:5173"