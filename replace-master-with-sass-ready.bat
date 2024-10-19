@echo off
setlocal enabledelayedexpansion

echo Replacing master branch with sass-ready

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

:: Switch to master branch
git checkout master
if %errorlevel% neq 0 (
    echo Unable to switch to master branch.
    goto :end
)

:: Replace master content with sass-ready
git reset --hard sass-ready
if %errorlevel% neq 0 (
    echo Unable to reset master to sass-ready.
    goto :end
)

:: Push changes
git push --force origin master
if %errorlevel% neq 0 (
    echo Unable to push changes to master.
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