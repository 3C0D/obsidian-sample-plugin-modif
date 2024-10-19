@echo off
setlocal enabledelayedexpansion

echo This script will replace the main branch with the content of the sass-ready branch.

:: Ask for confirmation
set /p CONFIRM=Are you sure you want to proceed? (Y/N): 
if /i "%CONFIRM%" neq "Y" goto :end

echo Replacing main branch with sass-ready

:: Check if we're in a Git repo
git rev-parse --is-inside-work-tree >nul 2>&1
if %errorlevel% neq 0 (
    echo This is not a valid Git repository.
    goto :end
)

:: Check if sass-ready branch exists
git show-ref --verify --quiet refs/heads/sass-ready
if %errorlevel% neq 0 (
    echo The sass-ready branch does not exist.
    goto :end
)

:: Switch to main branch
git checkout main
if %errorlevel% neq 0 (
    echo Unable to switch to main branch.
    goto :end
)

:: Replace main content with sass-ready
git reset --hard sass-ready
if %errorlevel% neq 0 (
    echo Unable to reset main to sass-ready.
    goto :end
)

:: Push changes
git push --force origin main
if %errorlevel% neq 0 (
    echo Unable to push changes to main.
    goto :end
)

:: Delete local sass-ready branch
git branch -d sass-ready
if %errorlevel% neq 0 (
    echo Unable to delete local sass-ready branch.
    goto :end
)

:: Delete remote sass-ready branch
git push origin --delete sass-ready
if %errorlevel% neq 0 (
    echo Unable to delete remote sass-ready branch.
    goto :end
)

echo Operation completed successfully.

:end
pause