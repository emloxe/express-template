@echo off
SET _Bitness=64

IF "%PROCESSOR_ARCHITECTURE%" == "x86" (
  IF NOT DEFINED PROCESSOR_ARCHITEW6432s (
    SET _Bitness=32
  )
)

start %_Bitness%\start_node.bat
@ping 127.0.0.1 -n 6 > nul

start http://localhost:8085/index.html