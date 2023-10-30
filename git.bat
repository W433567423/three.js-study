chcp 65001 >nul
@echo off

:: 设置背景颜色变量
set ESC_CHAR=
@for /f "delims=#" %%i in ('prompt #$E#^&echo on^&for %%a in ^(1^) do rem') do set ESC_CHAR=%%i

:: 设置git变量
set gitPath="C:\Program Files\Git\bin\git.exe"
set branchName=powo

:: 客制化commit名称
@echo %commit% 请输入commit时的名称(默认为"提交缓冲区文件")
set /p commit=""
if  "%commit%" == "" (set "commit=提交缓冲区文件")


@echo %ESC_CHAR%[38;5;2m开始执行脚本%ESC_CHAR%[m
@echo %ESC_CHAR%[38;5;226m切换到%branchName%分支...%ESC_CHAR%[m
@echo %ESC_CHAR%[38;5;3m^>git checkout powo ing...%ESC_CHAR%[m
%gitPath% checkout powo

@echo %ESC_CHAR%[38;5;226m将文件添加到缓冲区...%ESC_CHAR%[m
@echo %ESC_CHAR%[38;5;3m^>git add . ing...%ESC_CHAR%[m
%gitPath% add . >nul

@echo.
@echo %ESC_CHAR%[38;5;226m将文件提交到远程仓库...%ESC_CHAR%[m
@echo %ESC_CHAR%[38;5;3m^>git commit -m "%commit%" ing...%ESC_CHAR%[m
%gitPath% commit -m "%commit%"

@echo.
@echo %ESC_CHAR%[38;5;226m推送到%branchName%分支...%ESC_CHAR%[m
@echo %ESC_CHAR%[38;5;3m^>git push origin powo ing...%ESC_CHAR%[m
%gitPath% push origin powo

@echo.
@echo %ESC_CHAR%[38;5;226m切换到main分支...%ESC_CHAR%[m
@echo %ESC_CHAR%[38;5;3m^>git checkout main ing...%ESC_CHAR%[m
%gitPath% checkout main

@echo.
@echo %ESC_CHAR%[38;5;226mmain分支合并%branchName%分支...%ESC_CHAR%[m
@echo %ESC_CHAR%[38;5;3m^>git merge origin/powo ing...%ESC_CHAR%[m
%gitPath% merge origin/powo

@echo.
@echo %ESC_CHAR%[38;5;226m推送到main分支...%ESC_CHAR%[m
@echo %ESC_CHAR%[38;5;3m^>git push origin main ing...%ESC_CHAR%[m
%gitPath% push origin main

@echo.
@echo %ESC_CHAR%[38;5;226m切换到%branchName%分支...%ESC_CHAR%[m
@echo %ESC_CHAR%[38;5;3m^>git checkout powo ing...%ESC_CHAR%[m
%gitPath% checkout powo

@echo.
@echo %ESC_CHAR%[38;5;160m执行脚本成功%ESC_CHAR%[m

pause
