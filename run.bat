@echo off

REM http://blogs.msdn.com/b/david.wang/archive/2006/03/26/howto-detect-process-bitness.aspx
REM http://stackoverflow.com/questions/12372578/using-windows-command-in-cmd-to-test-if-32-bit-or-64-bit-and-run-a-command

SET _Bitness=64
SET port=8081

:checkPort
netstat  -ano | findstr %port% >nul

set n=%errorlevel%

if %n% == 0 (
	set /a port+=1
	GOTO checkPort
) else (
	GOTO startBat
)

:startBat
IF "%PROCESSOR_ARCHITECTURE%" == "x86" (
  IF NOT DEFINED PROCESSOR_ARCHITEW6432s (
    SET _Bitness=32
  )
)

start %_Bitness%\start_node.bat %port%
@ping localhost -n 6 > nul

set "url=http://localhost:%port%/"
start %url%