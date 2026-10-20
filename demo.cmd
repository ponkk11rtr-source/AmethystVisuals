@echo off
chcp 866 >nul
title AstroWind - демонстрация сайта
cd /d "%~dp0"

echo ==============================================
echo   AstroWind - локальная демонстрация сайта
echo ==============================================
echo.

rem Node.js может быть установлен, но ещё не виден в этом окне.
if exist "%ProgramFiles%\nodejs\node.exe" set "PATH=%ProgramFiles%\nodejs;%PATH%"

where node >nul 2>nul
if errorlevel 1 goto no_node

if not exist "node_modules\" goto install

:run
echo Запускаю сервер и открываю браузер...
echo Адрес: http://127.0.0.1:4321
echo Для остановки нажмите Ctrl+C или закройте это окно.
echo.
call npm run demo
if errorlevel 1 goto failed
goto after_run

:install
echo Зависимости не найдены. Устанавливаю...
call npm install
if errorlevel 1 goto failed
echo.
goto run

:after_run
powershell -NoProfile -Command "try { Invoke-WebRequest -Uri 'http://127.0.0.1:4321' -UseBasicParsing -TimeoutSec 3 | Out-Null; exit 0 } catch { exit 1 }"
if errorlevel 1 goto stopped
echo.
echo Сервер работает в фоне: http://127.0.0.1:4321
echo Остановить сервер: npx astro dev stop
echo.
pause
exit /b 0

:stopped
echo.
echo Сервер остановлен.
pause
exit /b 0

:no_node
echo [Ошибка] Node.js не найден.
echo Установите Node.js 22.12 или новее: https://nodejs.org
echo.
pause
exit /b 1

:failed
echo.
echo [Ошибка] Не удалось запустить демонстрацию.
echo Проверьте версию Node.js командой: node -v
echo.
pause
exit /b 1
