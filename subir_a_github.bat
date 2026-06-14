@echo off
chcp 65001 > nul
echo ====================================================
echo      ASISTENTE DE SUBIDA A GITHUB (GrajalFelino)
echo ====================================================
echo.

:: Verificar si Git está instalado
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git no está instalado o no se encuentra en el PATH.
    echo Por favor, instala Git desde: https://git-scm.com/
    pause
    exit /b
)

:: Verificar si el repositorio ya está inicializado
if not exist .git (
    echo [INFO] Inicializando repositorio Git local...
    git init
    git branch -M main
    echo.
)

:: Verificar si ya existe un control remoto 'origin'
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo [CONFIGURACIÓN] Necesitamos vincular tu carpeta local con tu repositorio de GitHub.
    echo.
    echo 1. Ve a tu repositorio en github.com
    echo 2. Haz clic en el botón verde "Code" y copia la URL (debe terminar en .git, ej: https://github.com/tu-usuario/GrajalFelino.git)
    echo.
    set /p REPO_URL="Pega aquí la URL de tu repositorio de GitHub y presiona Enter: "
    
    if "%REPO_URL%"=="" (
        echo [ERROR] La URL no puede estar vacía.
        pause
        exit /b
    )
    
    git remote add origin %REPO_URL%
    echo.
    echo [OK] Repositorio remoto configurado correctamente.
) else (
    echo [INFO] Repositorio remoto ya configurado.
)

echo.
echo [INFO] Preparando los archivos para subir (incluyendo la carpeta assets)...
git add .

echo.
echo [INFO] Creando el punto de guardado (commit)...
git commit -m "Subida de archivos completa (incluyendo carpeta assets)"

echo.
echo [INFO] Subiendo los archivos a GitHub...
echo Nota: Si es la primera vez, es posible que GitHub te pida iniciar sesión en una ventana emergente.
echo.
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo [ATENCIÓN] Hubo un problema al subir a 'main'. Intentando subir a la rama antigua 'master'...
    git branch -M master
    git push -u origin master
)

echo.
echo ====================================================
echo              PROCESO FINALIZADO
echo ====================================================
echo.
pause
